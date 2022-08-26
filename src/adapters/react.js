import Oni from 'onijs'
import { useEffect, useState } from 'react'

export const createStore = ( initialState, actions ) => {

	const store = Oni( initialState, actions )

	return {
		store,
		useStore() {
			const [data, setData] = useState({
				state: store.getState(),
				action: '',
				payload: null
			})

			const update = (s, { action, payload }) => {
				setData({ state: s, action, payload })
			}

			useEffect(() => {
				store.subscribe(update)
				return () => {
					store.unsubscribe(update)
				}
			}, [])

			return {
				state: data.state,
				action: data.action,
				payload: data.payload,
				dispatch: store.dispatch,
				getState: store.getState
			}
		}
	}
}
