import { useEffect, useState } from 'react'

export const useStore = (store) => {

	const [data, setData] = useState({
		state: store.getState(),
		action: '',
		payload: null
	})

	const update = (s, { action, payload }) => {
		setData({ state: s, action, payload })
	}

	useEffect(_ => {
		store.subscribe(update)
		return _ => store.unsubscribe(update)
	})

	return {
		state: data.state,
		action: data.action,
		payload: data.payload,
		dispatch: store.dispatch,
		unsubscribe: store.unsubscribe,
		subscribe: store.subscribe
	}
}
