import Oni, { Store, State, Actions } from '../../'
import { useEffect, useState } from 'react'

interface useStoreInterface {
	state	: State,
	payload	: object,
	action	: keyof Actions,
	dispatch( action: keyof Actions, payload?: object ) : Promise<unknown>
}

export const createStore = ( initialState: State, actions: Actions ) => {

	const store: Store = Oni( initialState, actions )

	return {
		store,
		useStore( restrictedActions?: Array<keyof Actions> ) {
			const [s, set] = useState({
				state  : store.getState(),
				payload: null,
				action : null
			})

			useEffect(() => {
				const unsubscribe = store.subscribe((state, { action, payload }) => {
					if( restrictedActions && restrictedActions.includes(action) ) {
						set({ state, payload, action })
					}else if( !restrictedActions ) {
						set({ state, payload, action })
					}
				})
				return () => {
					unsubscribe()
				}
			}, [])

			return {
				state: s.state,
				payload: s.payload,
				action: s.action,
				dispatch: store.dispatch
			} as useStoreInterface
		}
	}
}

