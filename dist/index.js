function S(c, a) {
  let s = [], r = !1;
  const n = /* @__PURE__ */ new Set(), e = j(c), l = () => e, f = (t) => (n.add(t), () => n.delete(t)), d = (t, i = {}) => (s.push({ action: t, payload: i }), new Promise((o) => {
    r || b(o);
  })), b = (t) => {
    for (r = !0; s.length; ) {
      const i = s.slice();
      s = [];
      for (const { action: o, payload: p } of i) {
        const h = a[o];
        if (!h) continue;
        const u = h(e, p, {
          getState: l,
          subscribe: f,
          dispatch: d
        });
        u && typeof u == "object" && Object.assign(e, u), n.forEach(
          (y) => y(e, { action: o, payload: p })
        );
      }
    }
    r = !1, t(e);
  }, O = () => n.clear(), g = Object.fromEntries(
    Object.keys(a).map((t) => [t, t])
  );
  return {
    getState: l,
    dispatch: d,
    subscribe: f,
    destroy: O,
    Actions: g
  };
}
const j = (c) => JSON.parse(JSON.stringify(c));
export {
  S as default
};
