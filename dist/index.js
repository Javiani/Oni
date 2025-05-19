function _(s, p) {
  let l = [];
  const c = /* @__PURE__ */ new Set(), r = b(s), f = () => r, i = (e) => e.call ? (c.add(e), () => {
    c.delete(e);
  }) : () => {
    a(e).then(({ __unsubscribe: n }) => n());
  }, h = (e, n) => (l.push({ action: e, payload: n }), new Promise((u) => g((t) => w({ action: e, payload: n }, u)))), a = (e) => new Promise((n) => {
    let u = i((t, { action: o, payload: d }) => {
      o in e && g((S) => {
        e[o].call(null, t, { action: o, payload: d }), t.__unsubscribe = u, n(t);
      });
    });
  }), w = ({ action: e, payload: n = {} }, u) => {
    l.forEach(({ action: t, payload: o = {} }) => {
      if (!(t in p))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const d = p[t].call(null, r, o, { getState: f, subscribe: i, dispatch: h, patternMatch: a });
        Object.assign(r, d);
      }
    }), l.length && (c.forEach((t) => t(r, { action: e, payload: n })), l = []), u(r);
  };
  return {
    getState: f,
    subscribe: i,
    dispatch: h,
    patternMatch: a,
    destroy: () => c.clear()
  };
}
const b = (s) => JSON.parse(JSON.stringify(s)), g = typeof window > "u" ? (s) => s() : (s) => requestAnimationFrame(s);
export {
  _ as default
};
