function m(n, d) {
  let l = [];
  const u = /* @__PURE__ */ new Set(), o = y(n), p = () => o, a = (e) => {
    if (e.call)
      return u.add(e), () => {
        u.delete(e);
      };
    c(e);
  }, f = (e, s) => (l.push({ action: e, payload: s }), new Promise((r) => g((t) => w({ action: e, payload: s }, r)))), c = (e) => new Promise((s) => {
    a((r, { action: t, payload: i }) => {
      t in e && g((h) => {
        e[t].call(null, r, { action: t, payload: i }), s(r);
      });
    });
  }), w = ({ action: e, payload: s = {} }, r) => {
    l.forEach(({ action: t, payload: i = {} }) => {
      if (!(t in d))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const h = d[t].call(null, o, i, { getState: p, subscribe: a, dispatch: f, patternMatch: c });
        Object.assign(o, h);
      }
    }), l.length && (u.forEach((t) => t(o, { action: e, payload: s })), l = []), r(o);
  };
  return {
    getState: p,
    subscribe: a,
    dispatch: f,
    patternMatch: c,
    destroy: () => u.clear()
  };
}
const y = (n) => JSON.parse(JSON.stringify(n)), g = typeof window > "u" ? (n) => n() : (n) => requestAnimationFrame(n);
export {
  m as default
};
