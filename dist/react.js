import i from "./index.js";
import { useState as p, useEffect as f } from "react";
const S = (n, c) => {
  const t = i(n, c);
  return {
    store: t,
    useStore(e) {
      const [s, r] = p({
        state: t.getState(),
        payload: null,
        action: null
      });
      return f(() => {
        const l = t.subscribe((a, { action: o, payload: u }) => {
          e && e.includes(o) ? r({ state: a, payload: u, action: o }) : e || r({ state: a, payload: u, action: o });
        });
        return () => {
          l();
        };
      }, []), {
        state: s.state,
        payload: s.payload,
        action: s.action,
        dispatch: t.dispatch
      };
    }
  };
};
export {
  S as createStore
};
