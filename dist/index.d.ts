export type Subscription = (state: State, params: SubscriptionParams) => unknown;
export type Action = (state: object, payload: object) => State;
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
