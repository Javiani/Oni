export type Action<State> = (state: State, payload: any, helpers: {
    getState(): State;
    subscribe: any;
    dispatch: any;
}) => Partial<State> | void;
export interface Store<State, A> {
    getState(): State;
    dispatch<T extends keyof A>(action: T, payload?: any): Promise<State>;
    subscribe(fn: any): () => void;
    destroy(): void;
    Actions: {
        [K in keyof A]: K;
    };
}
export default function Oni<State extends object, A extends {
    [K in keyof A]: Action<State>;
}>(initialState: State, actions: A): Store<State, A>;
