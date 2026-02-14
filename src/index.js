export default function Oni(initialState, actions) {
    let updates = [];
    let isFlushing = false;
    const topics = new Set();
    const state = dup(initialState);
    const getState = () => {
        return state;
    };
    const subscribe = (fnorObject) => {
        if (fnorObject.call) {
            topics.add(fnorObject);
            return () => {
                topics.delete(fnorObject);
            };
        }
        else {
            const callback = (s, { action, payload }) => {
                if (action in fnorObject) {
                    fnorObject[action].call(null, s, { action, payload });
                }
            };
            topics.add(callback);
            return () => {
                topics.delete(callback);
            };
        }
    };
    const dispatch = (action, payload = {}) => {
        updates.push({ action, payload });
        return new Promise((resolve) => {
            if (!isFlushing) {
                flushQueue(resolve);
            }
        });
    };
    const flushQueue = (resolve) => {
        isFlushing = true;
        while (updates.length) {
            const queue = updates.slice();
            updates = [];
            for (const { action, payload } of queue) {
                if (!(action in actions)) {
                    console.log(`[Oni] Error -> No action [ ${action} ] found.`);
                    continue;
                }
                const data = actions[action].call(null, state, payload, {
                    getState,
                    subscribe,
                    dispatch
                });
                Object.assign(state, data);
                // notify subscribers PER ACTION
                topics.forEach((topic) => topic(state, { action, payload }));
            }
        }
        isFlushing = false;
        resolve(state);
    };
    const destroy = () => topics.clear();
    return {
        getState,
        subscribe,
        dispatch,
        destroy,
    };
}
const dup = (object) => {
    return JSON.parse(JSON.stringify(object));
};
const rAF = typeof window === 'undefined'
    ? (fn) => fn()
    : (fn) => requestAnimationFrame(fn);
