
export type Subscription = ( state: State, params: SubscriptionParams ) => unknown
export type Action = ( state: object, payload: object ) => State

export interface State {
	[key:string] :any
}

export interface Actions {
	[key:string] : Action
}

export interface SubscriptionParams {
	action	: string
	payload	: object
}

export interface Store {
	getState() : State
	subscribe( fn: Subscription ) : Function
	dispatch( action: keyof Actions, payload?: object ) : Promise<unknown>
	patternMatch( mapfn: any )
	destroy(): void
}

export default function Oni(initialState: State, actions: Actions ) {

	let updates : Array<object> = []
	const topics: Set<Function> = new Set()
	const state = dup(initialState)

	const getState = () => {
		return state
	}

	const subscribe = (fnorObject) => {
		if ( fnorObject.call ) {
			topics.add(fnorObject)
			return () => {
				topics.delete(fnorObject)
			}
		} else {
			return () => {
				patternMatch(fnorObject)
					.then(({ __unsubscribe}) => __unsubscribe())
			}
		}
	}

	const dispatch = (action, payload) => {
		updates.push({ action, payload })
		return new Promise((resolve) => rAF((_) => update({ action, payload } as SubscriptionParams, resolve)))
	}

	const patternMatch = (mapfn) => {
		return new Promise((resolve) => {
			let unsubscribe = subscribe((s, { action, payload }) => {
				if ( action in mapfn ) {
					rAF((_) => {
						mapfn[action].call(null, s, { action, payload })
						s.__unsubscribe = unsubscribe
						resolve(s,)
					})
				}
			})
		})
	}

	const update = ({ action, payload = {} }, resolve)  => {
		updates.forEach(({ action, payload = {} }: SubscriptionParams) => {
			if (!(action in actions)) {
				console.log(`[Oni] Error -> No action [ ${action} ] found.`)
			} else {
				const data = actions[action].call(null, state, payload, { getState, subscribe, dispatch, patternMatch })
				Object.assign(state, data)
			}
		})

		if (updates.length) {
			topics.forEach((topic) => topic(state, { action, payload }))
			updates = []
		}

		resolve(state)
	}

	const destroy = () => topics.clear()

	return {
		getState,
		subscribe,
		dispatch,
		patternMatch,
		destroy
	} as Store
}

const dup = (object: State): State => {
	return JSON.parse(JSON.stringify(object))
}

const rAF = typeof window === 'undefined'
	? (fn) => fn()
	: (fn) => requestAnimationFrame(fn)
