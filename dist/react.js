import { useState as g, useEffect as m } from "react";
function w(n, f) {
  let r = [];
  const s = /* @__PURE__ */ new Set(), l = y(n), c = () => l, i = (e) => {
    if (e.call)
      return s.add(e), () => {
        s.delete(e);
      };
    {
      const u = (o, { action: t, payload: p }) => {
        t in e && e[t].call(null, o, { action: t, payload: p });
      };
      return s.add(u), () => {
        s.delete(u);
      };
    }
  }, d = (e, u) => (r.push({ action: e, payload: u }), new Promise((o) => h({ action: e, payload: u }, o))), a = (e) => new Promise((u) => {
    i((o, { action: t, payload: p }) => {
      t in e && b((S) => {
        e[t].call(null, o, { action: t, payload: p }), u(o);
      });
    });
  }), h = ({ action: e, payload: u = {} }, o) => {
    r.forEach(({ action: t, payload: p = {} }) => {
      if (!(t in f))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const S = f[t].call(null, l, p, {
          getState: c,
          subscribe: i,
          dispatch: d,
          patternMatch: a
        });
        Object.assign(l, S);
      }
    }), r.length && (s.forEach((t) => t(l, { action: e, payload: u })), r = []), o(l);
  };
  return {
    getState: c,
    subscribe: i,
    dispatch: d,
    patternMatch: a,
    destroy: () => s.clear()
  };
}
const y = (n) => JSON.parse(JSON.stringify(n)), b = typeof window > "u" ? (n) => n() : (n) => requestAnimationFrame(n), F = (n, f) => {
  const r = w(n, f);
  return {
    store: r,
    useStore(s) {
      const [l, c] = g({
        state: r.getState(),
        payload: null,
        action: null
      });
      return m(() => {
        const i = r.subscribe((d, { action: a, payload: h }) => {
          s && s.includes(a) ? c({ state: d, payload: h, action: a }) : s || c({ state: d, payload: h, action: a });
        });
        return () => {
          i();
        };
      }, []), {
        state: l.state,
        payload: l.payload,
        action: l.action,
        dispatch: r.dispatch
      };
    }
  };
};
export {
  F as createStore
};
