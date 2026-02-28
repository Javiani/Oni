import { useState as O, useEffect as m } from "react";
function j(r, a) {
  let t = [], o = !1;
  const s = /* @__PURE__ */ new Set(), n = w(r), i = () => n, u = (e) => (s.add(e), () => s.delete(e)), c = (e, p = {}) => (t.push({ action: e, payload: p }), new Promise((f) => {
    o || l(f);
  })), l = (e) => {
    for (o = !0; t.length; ) {
      const p = t.slice();
      t = [];
      for (const { action: f, payload: b } of p) {
        const h = a[f];
        if (!h)
          continue;
        const d = h(n, b, {
          getState: i,
          subscribe: u,
          dispatch: c
        });
        d && typeof d == "object" && Object.assign(n, d), s.forEach((g) => g(n, { action: f, payload: b }));
      }
    }
    o = !1, e(n);
  }, S = () => s.clear(), y = Object.fromEntries(Object.keys(a).map((e) => [e, e]));
  return {
    getState: i,
    dispatch: c,
    subscribe: u,
    destroy: S,
    Actions: y
  };
}
const w = (r) => JSON.parse(JSON.stringify(r)), J = (r, a) => {
  const t = j(r, a);
  return {
    store: t,
    useStore(o) {
      const [s, n] = O({
        state: t.getState(),
        payload: null,
        action: null
      });
      return m(() => {
        const i = t.subscribe((u, { action: c, payload: l }) => {
          o && o.includes(c) ? n({ state: u, payload: l, action: c }) : o || n({ state: u, payload: l, action: c });
        });
        return () => {
          i();
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
  J as createStore
};
