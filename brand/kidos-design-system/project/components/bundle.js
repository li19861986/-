/* @ds-bundle: {"format":4,"namespace":"Kidos","components":[{"name":"Button"},{"name":"Badge"},{"name":"SloganRibbon"},{"name":"PhonePill"},{"name":"ColorHeadline"},{"name":"Sticker"},{"name":"Tabs"},{"name":"PackageCard"},{"name":"PriceRow"}]} */
(function () {
  var R = window.React, h = R.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function money(v) { return typeof v === "number" ? "₪" + v.toLocaleString("en-US") : v; }

  function Button(p) {
    var variant = p.variant || "candy", size = p.size || "l";
    var rest = Object.assign({}, p); delete rest.variant; delete rest.size; delete rest.className;
    return h("button", Object.assign({ type: "button" }, rest, { className: cx("kd-btn", "kd-btn-" + variant, "kd-btn-" + size, p.className) }), p.children);
  }

  function Badge(p) {
    return h("span", { className: cx("kd-badge", "kd-badge-" + (p.tone || "neutral"), p.className) },
      p.icon ? h("span", { className: "kd-badge-icon", "aria-hidden": "true" }, p.icon) : null, p.children);
  }

  function Sparks(p) {
    return h("span", { className: cx("kd-sparks", p.side === "end" ? "kd-sparks-end" : null), "aria-hidden": "true" },
      h("i", { className: "kd-spark kd-spark-a" }), h("i", { className: "kd-spark kd-spark-b" }), h("i", { className: "kd-spark kd-spark-c" }));
  }

  function SloganRibbon(p) {
    return h("div", { className: cx("kd-ribbon-wrap", p.className) },
      h(Sparks, null),
      h("span", { className: "kd-ribbon" }, p.children || "אירועים שלא שוכחים!"),
      h(Sparks, { side: "end" }));
  }

  function PhonePill(p) {
    var num = p.number || "055-5570173";
    return h("a", { className: cx("kd-phone", p.className), href: "tel:" + num.replace(/[^0-9+]/g, "") },
      h("span", { className: "kd-phone-icon", "aria-hidden": "true" },
        h("svg", { viewBox: "0 0 24 24", width: 18, height: 18 },
          h("path", { d: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z", fill: "currentColor" }))),
      h("span", { className: "kd-phone-num", dir: "ltr" }, num));
  }

  var LETTER_TONES = ["blue", "pink", "pink", "blue", "lime"];
  function ColorHeadline(p) {
    var text = p.children || "קידוס", tones = p.tones || LETTER_TONES, i = 0;
    var parts = Array.from(String(text)).map(function (ch, k) {
      if (ch === " ") return h("span", { key: k }, " ");
      var t = tones[i++ % tones.length];
      return h("span", { key: k, className: "kd-ch kd-ch-" + t }, ch);
    });
    return h(p.as || "h1", { className: cx("kd-colorhead", p.className), "aria-label": text }, parts);
  }

  function Sticker(p) {
    var size = p.size || 160;
    return h("span", { className: cx("kd-sticker", "kd-sticker-" + (p.ring || "pink"), p.className), style: { width: size, height: size } },
      p.src ? h("img", { src: p.src, alt: p.alt || "" }) : p.children);
  }

  function Tabs(p) {
    var st = R.useState(p.defaultValue || (p.items && p.items[0] && p.items[0].value));
    var active = p.value !== undefined ? p.value : st[0];
    function pick(v) { if (p.value === undefined) st[1](v); if (p.onChange) p.onChange(v); }
    return h("div", { className: cx("kd-tabs", p.className), role: "tablist" },
      (p.items || []).map(function (it) {
        var on = it.value === active;
        return h("button", { key: it.value, type: "button", role: "tab", "aria-selected": on, className: cx("kd-tab", on ? "kd-tab-on" : null), onClick: function () { pick(it.value); } }, it.label);
      }));
  }

  function PackageCard(p) {
    return h("article", { className: cx("kd-pkg", p.featured ? "kd-pkg-featured" : null, p.className) },
      p.featured ? h("span", { className: "kd-pkg-flag" }, typeof p.featured === "string" ? p.featured : "הכי משתלם") : null,
      h("header", { className: "kd-pkg-head" },
        h("h3", { className: "kd-pkg-name" }, p.name),
        p.tagline ? h("p", { className: "kd-pkg-tag" }, p.tagline) : null,
        h("p", { className: "kd-pkg-price" }, money(p.price))),
      p.features && p.features.length ? h("ul", { className: "kd-pkg-list" }, p.features.map(function (f, k) {
        return h("li", { key: k }, h("span", { className: "kd-tick", "aria-hidden": "true" }), f);
      })) : null,
      h("div", { className: "kd-pkg-meta" },
        p.participants ? h(Badge, { tone: "lime" }, "עד " + p.participants + " משתתפים") : null,
        p.duration ? h(Badge, { tone: "sky" }, p.duration) : null),
      p.perk ? h("p", { className: "kd-pkg-perk" }, p.perk) : null,
      p.note ? h("p", { className: "kd-pkg-note" }, p.note) : null,
      p.action !== false ? h(Button, { variant: p.featured ? "candy" : "blue", size: "l", className: "kd-pkg-cta", onClick: p.onSelect }, p.action || "לחצו לפרטים") : null);
  }

  function PriceRow(p) {
    return h("div", { className: cx("kd-row", p.className) },
      h("div", { className: "kd-row-text" }, h("span", { className: "kd-row-name" }, p.name), p.note ? h("span", { className: "kd-row-note" }, p.note) : null),
      h("span", { className: "kd-row-dots", "aria-hidden": "true" }),
      h("span", { className: "kd-row-price" }, money(p.price)));
  }

  window.Kidos = Object.assign(window.Kidos || {}, { Button: Button, Badge: Badge, SloganRibbon: SloganRibbon, PhonePill: PhonePill, ColorHeadline: ColorHeadline, Sticker: Sticker, Tabs: Tabs, PackageCard: PackageCard, PriceRow: PriceRow });
})();
