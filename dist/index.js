function w(a, i) {
  let u = [], c = !1;
  const s = /* @__PURE__ */ new Set(), o = y(a), d = () => o, f = (e) => {
    if (e.call)
      return s.add(e), () => {
        s.delete(e);
      };
    {
      const n = (t, { action: l, payload: r }) => {
        l in e && e[l].call(null, t, { action: l, payload: r });
      };
      return s.add(n), () => {
        s.delete(n);
      };
    }
  }, p = (e, n = {}) => (u.push({ action: e, payload: n }), new Promise((t) => {
    c || h(t);
  })), h = (e) => {
    for (c = !0; u.length; ) {
      const n = u.slice();
      u = [];
      for (const { action: t, payload: l } of n) {
        if (!(t in i)) {
          console.log(`[Oni] Error -> No action [ ${t} ] found.`);
          continue;
        }
        const r = i[t].call(null, o, l, {
          getState: d,
          subscribe: f,
          dispatch: p
        });
        Object.assign(o, r), s.forEach((g) => g(o, { action: t, payload: l }));
      }
    }
    c = !1, e(o);
  };
  return {
    getState: d,
    subscribe: f,
    dispatch: p,
    destroy: () => s.clear()
  };
}
const y = (a) => JSON.parse(JSON.stringify(a));
export {
  w as default
};
