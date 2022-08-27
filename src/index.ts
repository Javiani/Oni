interface Params {
	action: string
	payload: object | null | undefined
}

interface MapFn {
	[key: string]: Function
}

export default function Oni(initialState: Object, actions: Object) {

	let updates: Array<any> = []
	let state: Object = dup(initialState)
	const topics: Set<Function> = new Set()

	const getState = (): Object => {
		return state
	}

	const subscribe = (fn: Function): Function => {
		if (fn.call) {
			topics.add(fn)
			return () => {
				topics.delete(fn)
			}
		}
	}

	const dispatch = (action: string, payload: object = {}) => {
		updates.push({ action, payload })
		return new Promise((resolve) => rAF((_) => update({ action, payload }, resolve)))
	}

	const patternMatch = (mapfn: MapFn) => {
		subscribe((s, { action, payload }) => {
			if (action in mapfn) {
				mapfn[action].call(null, s, { action, payload })
			}
		})
	}

	const update = ({ action, payload = {} }: Params, resolve): void => {
		updates.forEach(({ action, payload = {} }: Params) => {
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
	}
}

const dup = (object: Object): object => {
	return JSON.parse(JSON.stringify(object))
}

const rAF = (fn: FrameRequestCallback): number => {
	return requestAnimationFrame ? requestAnimationFrame(fn) : 0
}
