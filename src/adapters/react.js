import { useEffect, useState } from 'react'

export const useStore = (store) => {

	const [state, setState] = useState({
		state: store.getState(),
		action: { type: null, payload: null }
	})

	const update = (s, { action, payload }) => {
		setState({ state: s, action: { type: action, payload } })
	}

	useEffect(_ => {
		store.subscribe(update)
		return _ => store.unsubscribe(update)
	})

	return {
		data: state,
		dispatch: store.dispatch,
		unsubscribe: store.unsubscribe,
		subscribe: store.subscribe
	}
}
