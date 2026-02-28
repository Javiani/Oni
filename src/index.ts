export type Action<State> = (
  state: State,
  payload: any,
  helpers: {
    getState(): State
    subscribe: any
    dispatch: any
  }
) => Partial<State> | void

export interface Store<State, A> {
  getState(): State

  dispatch<T extends keyof A>(
    action: T,
    payload?: any
  ): Promise<State>

  subscribe(fn: any): () => void

  destroy(): void

  Actions: {
    [K in keyof A]: K
  }
}

export default function Oni<
  State extends object,
  A extends { [K in keyof A]: Action<State> }
>(
  initialState: State,
  actions: A
): Store<State, A> {

  type Key = keyof A

  let updates: { action: Key; payload: any }[] = []
  let isFlushing = false
  const topics = new Set<Function>()
  const state = dup(initialState)

  const getState = () => state

  const subscribe = (fn: any) => {
    topics.add(fn)
    return () => topics.delete(fn)
  }

  const dispatch: Store<State, A>["dispatch"] = (
    action,
    payload = {}
  ) => {
    updates.push({ action, payload })

    return new Promise<State>((resolve) => {
      if (!isFlushing) flushQueue(resolve)
    })
  }

  const flushQueue = (resolve: (state: State) => void) => {
    isFlushing = true

    while (updates.length) {
      const queue = updates.slice()
      updates = []

      for (const { action, payload } of queue) {
        const handler = actions[action]
        if (!handler) continue

        const result = handler(state, payload, {
          getState,
          subscribe,
          dispatch
        })

        if (result && typeof result === "object") {
          Object.assign(state, result)
        }

        topics.forEach((t) =>
          t(state, { action, payload })
        )
      }
    }

    isFlushing = false
    resolve(state)
  }

  const destroy = () => topics.clear()

  const Actions = Object.fromEntries(
    Object.keys(actions).map(k => [k, k])
  ) as { [K in keyof A]: K }

  return {
    getState,
    dispatch,
    subscribe,
    destroy,
    Actions
  }
}

const dup = <T>(obj: T): T =>
  JSON.parse(JSON.stringify(obj))
