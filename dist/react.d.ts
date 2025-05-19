export declare const createStore: (initialState: any, actions: any) => {
    store: import("./index").Store;
    useStore(restrictedActions?: Array<String>): {
        state: any;
        payload: any;
        action: any;
        dispatch: (action: keyof import("./index").Actions, payload?: object) => Promise<unknown>;
    };
};
