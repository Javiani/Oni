import Oni from './index'
import { useEffect, useState } from 'react'

export const createStore = ( initialState, actions ) => {

	const store = Oni( initialState, actions )

	return {
		store,
		useStore( restrictedActions?: Array<String> ) {
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
			}
		}
	}
}

