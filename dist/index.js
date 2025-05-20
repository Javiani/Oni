function m(r, i) {
  let a = [];
  const l = /* @__PURE__ */ new Set(), o = y(r), d = () => o, c = (t) => {
    if (t.call)
      return l.add(t), () => {
        l.delete(t);
      };
    {
      const n = (s, { action: e, payload: u }) => {
        e in t && t[e].call(null, s, { action: e, payload: u });
      };
      return () => {
        l.delete(n);
      };
    }
  }, p = (t, n) => (a.push({ action: t, payload: n }), new Promise((s) => g((e) => w({ action: t, payload: n }, s)))), f = (t) => new Promise((n) => {
    c((s, { action: e, payload: u }) => {
      e in t && g((h) => {
        t[e].call(null, s, { action: e, payload: u }), n(s);
      });
    });
  }), w = ({ action: t, payload: n = {} }, s) => {
    a.forEach(({ action: e, payload: u = {} }) => {
      if (!(e in i))
        console.log(`[Oni] Error -> No action [ ${e} ] found.`);
      else {
        const h = i[e].call(null, o, u, { getState: d, subscribe: c, dispatch: p, patternMatch: f });
        Object.assign(o, h);
      }
    }), a.length && (l.forEach((e) => e(o, { action: t, payload: n })), a = []), s(o);
  };
  return {
    getState: d,
    subscribe: c,
    dispatch: p,
    patternMatch: f,
    destroy: () => l.clear()
  };
}
const y = (r) => JSON.parse(JSON.stringify(r)), g = typeof window > "u" ? (r) => r() : (r) => requestAnimationFrame(r);
export {
  m as default
};
