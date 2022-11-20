export declare type Subscription = (state: State, params: SubscriptionParams) => unknown;
export declare type Action = (state: State, payload: object) => State;
export interface State {
    [key: string]: any;
}
export interface Actions {
    [key: string]: Action;
}
export interface SubscriptionParams {
    action: string;
    payload: object;
}
export interface Store {
    getState(): State;
    subscribe(fn: Subscription): Function;
    dispatch(action: keyof Actions, payload?: object): Promise<unknown>;
    patternMatch(mapfn: any): any;
    destroy(): void;
}
export default function Oni(initialState: State, actions: Actions): Store;

interface useStoreInterface {
    state: State;
    payload: object;
    action: keyof Actions;
    dispatch(action: keyof Actions, payload?: object): Promise<unknown>;
}
export declare const createStore: (initialState: State, actions: Actions) => {
    store: Store;
    useStore(actions?: Array<keyof Actions>): useStoreInterface;
};
