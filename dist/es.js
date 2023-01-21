import W from "postcss-value-parser";
const b = (s = {}) => ({
  postcssPlugin: "postcss-responsive",
  Declaration: (r) => {
    var d;
    let w = r.value, o = (d = s.funcName) != null ? d : "responsive", M = `(^|[^\\w-])(${o})\\(`;
    if (!new RegExp(M, "i").test(w.toLowerCase()))
      return;
    let h = W(w), l = (e, i) => {
      if (e === void 0 || i === void 0)
        return;
      let t;
      if (typeof e == "number" ? (t = "px", e = `${e}${t}`) : t = e.replace(/(-)?\d+(\.\d+)?/g, ""), !["px", "em", "rem"].includes(t))
        throw r.error(`Invalid unit ${t}. Try to use px or rem.`, {
          word: t
        });
      let n = parseFloat(e);
      return t === "px" ? n / i : n;
    }, c = (e) => parseFloat(e.toFixed(4)), a = (e) => !Number.isFinite(e);
    h.walk((e) => {
      var g, F, y, z;
      if (e.type !== "function" || e.value !== o)
        return;
      let i = e.nodes.filter((p) => p.type === "word").map((p) => p.value), t = (g = s.root) != null ? g : 16, n = l(i[0], t), u = l(i[1], t), m = l((F = i[2]) != null ? F : s.minWidth, t), f = l((y = i[3]) != null ? y : s.maxWidth, t), N = (z = i[4]) != null ? z : s.noClamp;
      if (a(m))
        throw r.error(`Missing min width in ${o} function.`);
      if (a(f))
        throw r.error(`Missing max width in ${o} function.`);
      if (a(n))
        throw r.error(`Missing min font size in ${o} function.`);
      if (a(u))
        throw r.error(`Missing max font size in ${o} function.`);
      if (f < m)
        throw r.error("Max width must be greater than the minimum.");
      let x = (u - n) / (f - m), $ = `${c(-m * x + n)}rem + ${c(x * 100)}vw`, S = N ? `calc(${$})` : `clamp(${n}rem, ${$}, ${u}rem)`, v = e;
      v.type = "word", v.value = S;
    }), r.cloneBefore({ value: h.toString() }), r.remove();
  }
});
b.postcss = !0;
export {
  b as default
};
