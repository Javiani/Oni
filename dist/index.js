function m(r, d) {
  let a = [];
  const l = /* @__PURE__ */ new Set(), o = w(r), i = () => o, c = (e) => {
    if (e.call)
      return l.add(e), () => {
        l.delete(e);
      };
    {
      const n = (s, { action: t, payload: u }) => {
        t in e && e[t].call(null, s, { action: t, payload: u });
      };
      return l.add(n), () => {
        l.delete(n);
      };
    }
  }, p = (e, n) => (a.push({ action: e, payload: n }), new Promise(
    (s) => g({ action: e, payload: n }, s)
  )), f = (e) => new Promise((n) => {
    c((s, { action: t, payload: u }) => {
      t in e && y((h) => {
        e[t].call(null, s, { action: t, payload: u }), n(s);
      });
    });
  }), g = ({ action: e, payload: n = {} }, s) => {
    a.forEach(({ action: t, payload: u = {} }) => {
      if (!(t in d))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const h = d[t].call(null, o, u, {
          getState: i,
          subscribe: c,
          dispatch: p,
          patternMatch: f
        });
        Object.assign(o, h);
      }
    }), a.length && (l.forEach((t) => t(o, { action: e, payload: n })), a = []), s(o);
  };
  return {
    getState: i,
    subscribe: c,
    dispatch: p,
    patternMatch: f,
    destroy: () => l.clear()
  };
}
const w = (r) => JSON.parse(JSON.stringify(r)), y = typeof window > "u" ? (r) => r() : (r) => requestAnimationFrame(r);
export {
  m as default
};
