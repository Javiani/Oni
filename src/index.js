export default function Oni(initialState, actions) {
    let updates = [];
    let isFlushing = false;
    const topics = new Set();
    const state = dup(initialState);
    const getState = () => state;
    const subscribe = (fn) => {
        topics.add(fn);
        return () => topics.delete(fn);
    };
    const dispatch = (action, payload = {}) => {
        updates.push({ action, payload });
        return new Promise((resolve) => {
            if (!isFlushing)
                flushQueue(resolve);
        });
    };
    const flushQueue = (resolve) => {
        isFlushing = true;
        while (updates.length) {
            const queue = updates.slice();
            updates = [];
            for (const { action, payload } of queue) {
                const handler = actions[action];
                if (!handler)
                    continue;
                const result = handler(state, payload, {
                    getState,
                    subscribe,
                    dispatch
                });
                if (result && typeof result === "object") {
                    Object.assign(state, result);
                }
                topics.forEach((t) => t(state, { action, payload }));
            }
        }
        isFlushing = false;
        resolve(state);
    };
    const destroy = () => topics.clear();
    const Actions = Object.fromEntries(Object.keys(actions).map(k => [k, k]));
    return {
        getState,
        dispatch,
        subscribe,
        destroy,
        Actions
    };
}
const dup = (obj) => JSON.parse(JSON.stringify(obj));
