export default function Oni(initialState, actions) {
    let updates = [];
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
    const dispatch = (action, payload) => {
        updates.push({ action, payload });
        return new Promise((resolve) => update({ action, payload }, resolve));
    };
    const patternMatch = (mapfn) => {
        return new Promise((resolve) => {
            subscribe((s, { action, payload }) => {
                if (action in mapfn) {
                    rAF((_) => {
                        mapfn[action].call(null, s, { action, payload });
                        resolve(s);
                    });
                }
            });
        });
    };
    const update = ({ action, payload = {} }, resolve) => {
        updates.forEach(({ action, payload = {} }) => {
            if (!(action in actions)) {
                console.log(`[Oni] Error -> No action [ ${action} ] found.`);
            }
            else {
                const data = actions[action].call(null, state, payload, {
                    getState,
                    subscribe,
                    dispatch,
                    patternMatch,
                });
                Object.assign(state, data);
            }
        });
        if (updates.length) {
            topics.forEach((topic) => topic(state, { action, payload }));
            updates = [];
        }
        resolve(state);
    };
    const destroy = () => topics.clear();
    return {
        getState,
        subscribe,
        dispatch,
        patternMatch,
        destroy,
    };
}
const dup = (object) => {
    return JSON.parse(JSON.stringify(object));
};
const rAF = typeof window === 'undefined'
    ? (fn) => fn()
    : (fn) => requestAnimationFrame(fn);
