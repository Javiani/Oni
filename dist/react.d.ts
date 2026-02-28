export declare const createStore: (initialState: any, actions: any) => {
    store: import("./index").Store<any, any>;
    useStore(restrictedActions?: Array<String>): {
        state: any;
        payload: any;
        action: any;
        dispatch: <T extends string | number | symbol>(action: T, payload?: any) => Promise<any>;
    };
};
