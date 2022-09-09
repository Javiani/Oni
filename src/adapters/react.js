import Oni from '../../'
import { useEffect, useState } from 'react'

export const createStore = (initialState = {}, actions) => {

	const store = Oni(initialState, actions)

	return {
		store,
		useStore( actions ) {
			const [s, set] = useState({
				state: initialState,
				payload: null,
				action: null
			})

			useEffect(() => {
				const unsubscribe = store.subscribe((state, { action, payload }) => {
					if( actions && actions.includes(action) ) {
						set({ state, payload, action })
					}else if( !actions ) {
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
