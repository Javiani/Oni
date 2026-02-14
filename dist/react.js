import { useState as g, useEffect as y } from "react";
function b(c, d) {
  let t = [], o = !1;
  const e = /* @__PURE__ */ new Set(), n = m(c), f = () => n, i = (s) => {
    if (s.call)
      return e.add(s), () => {
        e.delete(s);
      };
    {
      const a = (l, { action: r, payload: h }) => {
        r in s && s[r].call(null, l, { action: r, payload: h });
      };
      return e.add(a), () => {
        e.delete(a);
      };
    }
  }, u = (s, a = {}) => (t.push({ action: s, payload: a }), new Promise((l) => {
    o || p(l);
  })), p = (s) => {
    for (o = !0; t.length; ) {
      const a = t.slice();
      t = [];
      for (const { action: l, payload: r } of a) {
        if (!(l in d)) {
          console.log(`[Oni] Error -> No action [ ${l} ] found.`);
          continue;
        }
        const h = d[l].call(null, n, r, {
          getState: f,
          subscribe: i,
          dispatch: u
        });
        Object.assign(n, h), e.forEach((S) => S(n, { action: l, payload: r }));
      }
    }
    o = !1, s(n);
  };
  return {
    getState: f,
    subscribe: i,
    dispatch: u,
    destroy: () => e.clear()
  };
}
const m = (c) => JSON.parse(JSON.stringify(c)), N = (c, d) => {
  const t = b(c, d);
  return {
    store: t,
    useStore(o) {
      const [e, n] = g({
        state: t.getState(),
        payload: null,
        action: null
      });
      return y(() => {
        const f = t.subscribe((i, { action: u, payload: p }) => {
          o && o.includes(u) ? n({ state: i, payload: p, action: u }) : o || n({ state: i, payload: p, action: u });
        });
        return () => {
          f();
        };
      }, []), {
        state: e.state,
        payload: e.payload,
        action: e.action,
        dispatch: t.dispatch
      };
    }
  };
};
export {
  N as createStore
};
