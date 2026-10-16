// ==UserScript==
// @name           Undiscord Remake
// @namespace      https://github.com/FroZnito/Undiscord-remake
// @version        1.0.0
// @description    Supprime en masse tes messages Discord (salons, MP, serveurs, package de données) — Undiscord Remake by FroZn.
// @description:en Bulk delete your Discord messages (channels, DMs, servers, data package) — Undiscord Remake by FroZn.
// @author         FroZn
// @copyright      2026, FroZn
// @license        MIT
// @homepageURL    https://github.com/FroZnito/Undiscord-remake
// @supportURL     https://github.com/FroZnito/Undiscord-remake/issues
// @icon           data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzc5ODNmNSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM1ODY1ZjIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0MDQ5YzkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTYiIGZpbGw9InVybCgjZykiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgo8cGF0aCBkPSJNMTYgMjJoMzJNMjYgMjJ2LTVoMTJ2NU00NCAyMmwtMi41IDI2aC0xOUwyMCAyMk0yOSAzMHYxMU0zNSAzMHYxMSIvPjwvZz48L3N2Zz4=
// @match          https://discord.com/*
// @match          https://ptb.discord.com/*
// @match          https://canary.discord.com/*
// @run-at         document-start
// @grant          none
// @inject-into    page
// @noframes
// @downloadURL    https://raw.githubusercontent.com/FroZnito/Undiscord-remake/main/dist/undiscord-remake.user.js
// @updateURL      https://raw.githubusercontent.com/FroZnito/Undiscord-remake/main/dist/undiscord-remake.user.js
// ==/UserScript==

// Undiscord Remake by FroZn — https://github.com/FroZnito/Undiscord-remake
// MIT License — Copyright (c) 2026 FroZn

"use strict";
(() => {
  // node_modules/preact/dist/preact.mjs
  var n;
  var t;
  var i;
  var r;
  var u;
  var f;
  var o;
  var e;
  var l;
  var c;
  var a;
  var s;
  var h = {};
  var p = [];
  var v = /^m(i|n|o|s|text|space)$/;
  var y = Array.isArray;
  var d = p.slice;
  var w = Object.assign;
  function _(n3) {
    n3 && n3.parentNode && n3.remove();
  }
  function b(i5, r4, u5, f4, o5) {
    var e4 = { type: i5, props: r4, key: u5, ref: f4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o5 || ++t, __i: -1, __u: 0 };
    return !o5 && n.vnode && n.vnode(e4), e4;
  }
  function M(n3) {
    return n3.children;
  }
  function $(n3, t5) {
    this.props = n3, this.context = t5, this.__g = 0;
  }
  function x(n3, t5) {
    if (null == t5) return n3.__ ? x(n3.__, n3.__i + 1) : null;
    for (var i5; t5 < n3.__k.length; t5++) if ((i5 = n3.__k[t5]) && i5.__e) return i5.__e;
    return "function" != typeof n3.type || n3.props.__P ? null : x(n3);
  }
  function S(n3) {
    if ((n3 = n3.__) && n3.__c && !n3.props.__P) return n3.__e = null, n3.__k.some(function(t5) {
      return t5 && (n3.__e = t5.__e);
    }), S(n3);
  }
  function C(t5) {
    (8 & t5.__g || !(t5.__g |= 8) || !r.push(t5) || f++) && u == n.debounceRendering || ((u = n.debounceRendering) || queueMicrotask)(j);
  }
  function j() {
    var t5, i5, u5, e4, l5, c4, a4, s4, h5;
    try {
      for (i5 = 1; r.length; ) r.length > i5 && r.sort(o), t5 = r.shift(), i5 = r.length, 8 & t5.__g && (e4 = void 0, l5 = void 0, c4 = (l5 = (u5 = t5).__v).__e, a4 = [], s4 = [], (h5 = u5.__P) && ((e4 = w({ constructor: void 0 }, l5)).__v = l5.__v + 1, n.vnode && n.vnode(e4), N(h5, e4, l5, u5.__n, h5.namespaceURI, 32 & l5.__u ? [c4] : null, a4, c4 || x(l5), 32 & l5.__u, s4), e4.__v = l5.__v, e4.__.__k[e4.__i] = e4, z(a4, e4, s4), l5.__ = l5.__e = null, e4.__e != c4 && S(e4)));
    } finally {
      r.length = f = 0;
    }
  }
  function L(n3, t5, i5, r4, u5, f4, o5, e4, l5, c4, a4) {
    var s4, v4, y5, d5, w4, _5, g4 = r4.__k || p, k2 = t5.length;
    for (l5 = H(i5, t5, g4, l5, k2), s4 = 0; s4 < k2; s4++) null != (y5 = i5.__k[s4]) && (v4 = ~y5.__i && g4[y5.__i] || h, y5.__i = s4, _5 = N(n3, y5, v4, u5, f4, o5, e4, l5, c4, a4), d5 = y5.__e, (v4.ref != y5.ref || 8 & v4.__u) && (v4.ref && D(v4.ref, null, y5, v4), y5.ref && a4.push(y5.ref, y5.__c || d5, y5)), w4 = w4 || d5, 4 & y5.__u ? (l5 = I(y5, l5, n3, !v4.__v), v4.__e && (v4.__e = null)) : "function" == typeof y5.type && void 0 !== _5 ? l5 = _5 : d5 && (l5 = d5.nextSibling), y5.__u &= -7);
    return i5.__e = w4, l5;
  }
  function H(n3, t5, i5, r4, u5) {
    var f4, o5, e4, l5, c4, a4, s4, h5, p5, v4, d5 = i5.length, w4 = d5, _5 = 0, g4 = false, k2 = n3.__k = Array(u5);
    for (f4 = 0; f4 < u5; f4++) null != (o5 = t5[f4]) && "boolean" != typeof o5 && "function" != typeof o5 ? ("object" != typeof o5 || o5.constructor == String ? o5 = k2[f4] = b(null, o5) : y(o5) ? o5 = k2[f4] = b(M, { children: o5 }) : void 0 === o5.constructor && o5.__b ? o5 = k2[f4] = b(o5.type, o5.props, o5.key, o5.ref, o5.__v) : k2[f4] = o5, l5 = f4 + _5, o5.__ = n3, o5.__b = n3.__b + 1, e4 = null, ~(c4 = o5.__i = O(o5, i5, l5, w4)) && (w4--, (e4 = i5[c4]) && (e4.__u |= 2)), e4 && e4.__v ? (o5.__u |= 2, c4 == l5 - 1 ? _5-- : c4 == l5 + 1 ? _5++ : c4 != l5 && (c4 > l5 ? _5-- : _5++, g4 = true)) : (~c4 || (u5 > d5 ? _5-- : u5 < d5 && _5++), "function" != typeof o5.type && (o5.__u |= 4))) : k2[f4] = null;
    if (g4) {
      for (a4 = [], s4 = [], f4 = 0; f4 < u5; f4++) if ((o5 = k2[f4]) && 2 & o5.__u) {
        for (h5 = 0, p5 = a4.length; h5 < p5; ) a4[v4 = h5 + p5 >> 1] < o5.__i ? h5 = v4 + 1 : p5 = v4;
        a4[h5] = o5.__i, s4[f4] = h5 + 1;
      }
      for (_5 = a4.length; f4--; ) s4[f4] && (s4[f4] == _5 ? _5-- : k2[f4].__u |= 4);
    }
    if (w4) for (f4 = 0; f4 < d5; f4++) !(e4 = i5[f4]) || 2 & e4.__u || (e4.__e == r4 && (r4 = x(e4)), E(e4, e4));
    return r4;
  }
  function I(n3, t5, i5, r4) {
    var u5, f4, o5;
    if ("function" == typeof n3.type) {
      if (n3.props.__P) return t5;
      if (u5 = n3.__k) for (f4 = 0; f4 < u5.length; f4++) u5[f4] && (u5[f4].__ = n3, t5 = I(u5[f4], t5, i5, false));
      return t5;
    }
    for (t5 && !t5.parentNode && (t5 = x(n3)) && !t5.parentNode && (t5 = null), o5 = t5; o5 && 8 == o5.nodeType; ) o5 = o5.nextSibling;
    for (n3.__e != o5 && (!r4 && i5.moveBefore && n3.__e.parentNode ? i5.moveBefore(n3.__e, t5) : i5.insertBefore(n3.__e, t5 || null)), t5 = n3.__e; (t5 = t5 && t5.nextSibling) && 8 == t5.nodeType; ) ;
    return t5;
  }
  function O(n3, t5, i5, r4) {
    var u5, f4, o5, e4 = n3.key, l5 = n3.type, c4 = t5[i5], a4 = c4 && !(2 & c4.__u);
    if (null === c4 && null == e4 || a4 && e4 == c4.key && l5 == c4.type) return i5;
    if (r4 > (a4 ? 1 : 0)) {
      for (u5 = i5 - 1, f4 = i5 + 1; u5 >= 0 || f4 < t5.length; ) if ((c4 = t5[o5 = u5 >= 0 ? u5-- : f4++]) && !(2 & c4.__u) && e4 == c4.key && l5 == c4.type) return o5;
    }
    return -1;
  }
  function P(n3, t5, i5) {
    null == i5 && (i5 = ""), "-" == t5[0] ? n3.setProperty(t5, i5) : n3[t5] = i5;
  }
  function T(n3, t5, i5, r4, u5) {
    var f4, o5;
    n: if ("style" == t5) if ("string" == typeof i5) n3.style.cssText = i5;
    else {
      if ("string" == typeof r4 && (n3.style.cssText = r4 = ""), r4) for (t5 in r4) i5 && t5 in i5 || P(n3.style, t5, "");
      if (i5) for (t5 in i5) r4 && i5[t5] == r4[t5] || P(n3.style, t5, i5[t5]);
    }
    else if ("o" == t5[0] && "n" == t5[1]) (n3.__e || (n3.__e = {}))[t5] = i5, i5 && r4 || (o5 = a[t5] || (a[t5] = q(t5)), (n3.__a || (n3.__a = {}))[t5] = c, f4 = t5 != (t5 = t5.replace(l, "$1")), (t5 = t5.slice(2))[0] < "a" && (t5 = t5.toLowerCase()), i5 ? n3.addEventListener(t5, o5, f4) : n3.removeEventListener(t5, o5, f4));
    else {
      if ("http://www.w3.org/2000/svg" == u5) t5 = t5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != t5 && "height" != t5 && "href" != t5 && "list" != t5 && "form" != t5 && "tabIndex" != t5 && "download" != t5 && "rowSpan" != t5 && "colSpan" != t5 && "role" != t5 && "popover" != t5 && t5 in n3) try {
        n3[t5] = null == i5 ? "" : i5;
        break n;
      } catch (n4) {
      }
      "function" == typeof i5 || (null == i5 || false === i5 && "-" != t5[4] ? n3.removeAttribute(t5) : n3.setAttribute(t5, "popover" == t5 && 1 == i5 ? "" : i5));
    }
  }
  function q(t5) {
    return function(i5) {
      if (this.__e) {
        var r4 = this.__e[t5];
        if (null == i5[e]) i5[e] = c++;
        else if (i5[e] < this.__a[t5]) return;
        return r4(n.event ? n.event(i5) : i5);
      }
    };
  }
  function N(t5, i5, r4, u5, f4, o5, e4, l5, c4, a4) {
    var s4, h5, v4, d5, g4, k2, b5, m3, S3, C4, j3, H2, I2, A2, O2, P2, T4, q3, N2, z3, D3 = i5.type;
    if (void 0 !== i5.constructor) return null;
    if (128 & r4.__u && (c4 = 32 & r4.__u, s4 = r4.__c.__z)) {
      if (i5.__u |= c4, h5 = o5 = [], 8 == s4.nodeType) for (v4 = 1, d5 = s4.nextSibling; d5; d5 = d5.nextSibling) {
        if (8 == d5.nodeType) {
          if (d5.data.startsWith("$s")) v4++;
          else if (d5.data.startsWith("/$s") && !--v4) break;
        }
        o5.push(d5);
      }
      else o5.push(s4);
      l5 = o5[0];
    }
    (s4 = n.__b) && s4(i5);
    n: if ("function" == typeof D3) {
      g4 = e4.length;
      try {
        if (C4 = i5.props, j3 = (s4 = D3.prototype) && s4.render, H2 = (s4 = D3.contextType) && u5[s4.__c], I2 = s4 ? H2 ? H2.props.value : s4.__ : u5, r4.__c ? 2 & (k2 = i5.__c = r4.__c).__g && (k2.__g |= 1) : (j3 ? i5.__c = k2 = new D3(C4, I2) : (i5.__c = k2 = new $(C4, I2), k2.constructor = D3, k2.render = F), H2 && H2.sub(k2), k2.state || (k2.state = {}), k2.__n = u5, k2.__g |= 8, k2.__h = [], k2.__k = []), j3 && (k2.__s || (k2.__s = k2.state), D3.getDerivedStateFromProps && (k2.__s == k2.state && (k2.__s = w({}, k2.__s)), w(k2.__s, D3.getDerivedStateFromProps(C4, k2.__s)))), b5 = k2.props, m3 = k2.state, k2.__v = i5, r4.__c) {
          if (j3 && !D3.getDerivedStateFromProps && C4 !== b5 && k2.componentWillReceiveProps && k2.componentWillReceiveProps(C4, I2), i5.__v == r4.__v && !(8 & k2.__g) || !(4 & k2.__g) && k2.shouldComponentUpdate && false === k2.shouldComponentUpdate(C4, k2.__s, I2)) {
            i5.__v != r4.__v && (k2.props = C4, k2.state = k2.__s, k2.__g &= -9), i5.__e = r4.__e, i5.__k = r4.__k, i5.__k.some(function(n3) {
              n3 && (n3.__ = i5);
            }), p.push.apply(k2.__h, k2.__k), k2.__k = [], k2.__h.length && e4.push(k2), l5 = x(r4);
            break n;
          }
          k2.componentWillUpdate && k2.componentWillUpdate(C4, k2.__s, I2), j3 && k2.componentDidUpdate && k2.__h.push(function() {
            k2.componentDidUpdate(b5, m3, S3);
          });
        } else j3 && !D3.getDerivedStateFromProps && k2.componentWillMount && k2.componentWillMount(), j3 && k2.componentDidMount && k2.__h.push(k2.componentDidMount);
        if (k2.context = I2, k2.props = C4, k2.__P = t5, k2.__g &= -5, A2 = n.__r, O2 = 0, j3) k2.state = k2.__s, k2.__g &= -9, A2 && A2(i5), s4 = k2.render(k2.props, k2.state, k2.context), p.push.apply(k2.__h, k2.__k), k2.__k = [];
        else do {
          k2.__g &= -9, A2 && A2(i5), s4 = k2.render(k2.props, k2.state, k2.context), k2.state = k2.__s;
        } while (8 & k2.__g && ++O2 < 25);
        k2.state = k2.__s, k2.getChildContext && (u5 = w({}, u5, k2.getChildContext())), j3 && r4.__c && k2.getSnapshotBeforeUpdate && (S3 = k2.getSnapshotBeforeUpdate(b5, m3)), P2 = s4 && s4.type === M && null == s4.key ? s4.props.children : s4, C4.__P && (s4 = l5, f4 = (t5 = C4.__P).namespaceURI, c4 = o5 = null, r4.props && r4.props.__P != t5 && (r4.__k.some(function(n3) {
          n3 && E(n3, n3);
        }), r4.__k = null), l5 = r4.__k ? x(r4, 0) : null), l5 = L(t5, y(P2) ? P2 : [P2], i5, r4, u5, f4, o5, e4, l5, c4, a4), C4.__P && (i5.__e = null, l5 = s4), i5.__u &= -161, 128 & r4.__u && (k2.__z = null), h5 && h5.some(_), k2.__h.length && e4.push(k2), 1 & k2.__g && (k2.__g &= -4);
      } catch (t6) {
        if (e4.length = g4, i5.__v = null, c4 || o5) if (t6.then) {
          if (T4 = 0, i5.__u |= c4 ? 160 : 128, o5) {
            for (~(N2 = o5.indexOf(l5 || void 0)) || (N2 = o5.length); (z3 = o5[N2 - 1]) && 8 == z3.nodeType; ) N2--;
            for (; N2 < o5.length; N2++) if (z3 = o5[N2]) {
              if (o5[N2] = null, 8 == z3.nodeType) {
                if (z3.data.startsWith("$s")) T4++ || (q3 = z3);
                else if (T4 && z3.data.startsWith("/$s") && !--T4) {
                  l5 = z3;
                  break;
                }
              } else if (!T4) break;
            }
          }
          if (!q3) {
            for (; l5 && 8 == l5.nodeType && l5.nextSibling; ) l5 = l5.nextSibling;
            q3 = l5;
          }
          i5.__c.__z || (i5.__c.__z = q3), i5.__e = l5;
        } else o5 && o5.some(_);
        else i5.__e = r4.__e;
        i5.__k || (i5.__k = r4.__k || []), t6.then || V(i5), n.__e(t6, i5, r4);
      }
    } else l5 = i5.__e = B(r4.__e, i5, r4, u5, f4, o5, e4, c4, a4, t5);
    return (s4 = n.diffed) && s4(i5), 128 & i5.__u ? void 0 : l5;
  }
  function V(n3) {
    n3 && (n3.__c && (n3.__c.__g |= 4), n3.__k && n3.__k.some(V));
  }
  function z(t5, i5, r4) {
    for (var u5 = 0; u5 < r4.length; ) D(r4[u5++], r4[u5++], r4[u5++]);
    n.__c && n.__c(i5, t5), t5.some(function(i6) {
      try {
        t5 = i6.__h, i6.__h = [], t5.some(function(n3) {
          n3.call(i6);
        });
      } catch (t6) {
        n.__e(t6, i6.__v);
      }
    });
  }
  function B(t5, i5, r4, u5, f4, o5, e4, l5, c4, a4) {
    var s4, p5, w4, g4, k2, b5, m3, M2, $2, S3 = r4.props || h, C4 = i5.props, j3 = i5.type;
    if ("svg" == j3 ? f4 = "http://www.w3.org/2000/svg" : "math" == j3 ? f4 = "http://www.w3.org/1998/Math/MathML" : f4 || (f4 = "http://www.w3.org/1999/xhtml"), o5) {
      for (s4 = 0; s4 < o5.length; s4++) if ((k2 = o5[s4]) && (j3 ? k2.localName == j3 : 3 == k2.nodeType)) {
        t5 = k2, o5[s4] = null;
        break;
      }
    }
    if (!t5) {
      if (M2 = a4.ownerDocument || document, !j3) return M2.createTextNode(C4);
      t5 = M2.createElementNS(f4, j3, C4.is && C4), l5 && (n.__m && n.__m(i5, o5), l5 = false), o5 = null;
    }
    if (j3) {
      if (a4 = "template" == j3 ? t5.content : t5, o5 = "textarea" == j3 && null != C4.defaultValue ? null : o5 && d.call(a4.childNodes), !l5 && o5) for (S3 = {}, s4 = 0; s4 < t5.attributes.length; s4++) S3[(k2 = t5.attributes[s4]).name] = k2.value;
      for (s4 in S3) k2 = S3[s4], "dangerouslySetInnerHTML" == s4 ? w4 = k2 : "children" == s4 || s4 in C4 || "value" == s4 && "defaultValue" in C4 || "checked" == s4 && "defaultChecked" in C4 || T(t5, s4, null, k2, f4);
      for (s4 in $2 = 1 & r4.__u, C4) k2 = C4[s4], "children" == s4 ? g4 = k2 : "dangerouslySetInnerHTML" == s4 ? p5 = k2 : "value" == s4 ? b5 = k2 : "checked" == s4 ? m3 = k2 : l5 && "function" != typeof k2 || !(S3[s4] !== k2 || $2 && null != k2) || T(t5, s4, k2, S3[s4], f4);
      p5 ? (l5 || w4 && (p5.__html == w4.__html || p5.__html == t5.innerHTML) || (t5.innerHTML = p5.__html), i5.__k = []) : (w4 && (t5.textContent = ""), ("foreignObject" == j3 || "http://www.w3.org/1998/Math/MathML" == f4 && v.test(j3)) && (f4 = "http://www.w3.org/1999/xhtml"), L(a4, y(g4) ? g4 : [g4], i5, r4, u5, f4, o5, e4, o5 ? o5[0] : r4.__k && x(r4, 0), l5, c4), o5 && o5.some(_)), l5 && "textarea" != j3 || (s4 = "value", "progress" == j3 && null == b5 ? t5.removeAttribute(s4) : null == b5 || b5 === t5[s4] && ("progress" != j3 || b5) || T(t5, s4, b5, S3[s4], f4), s4 = "checked", null != m3 && m3 != t5[s4] && T(t5, s4, m3, S3[s4], f4));
    } else S3 === C4 || l5 && t5.data == C4 || (t5.data = C4);
    return t5;
  }
  function D(t5, i5, r4, u5) {
    try {
      "function" == typeof t5 ? i5 ? i5.__x = t5(i5) || 1 : u5 && (u5 = u5.__c || u5.__e) && (i5 = u5.__x) && (u5.__x = null, "function" == typeof i5 ? i5() : t5(null)) : t5.current = i5;
    } catch (t6) {
      n.__e(t6, r4);
    }
  }
  function E(t5, i5, r4) {
    var u5, f4;
    if (n.unmount && n.unmount(t5), !(u5 = t5.ref) || u5.current && u5.current != t5.__e || D(u5, null, i5, t5), u5 = t5.__c) {
      if (u5.componentWillUnmount) try {
        u5.componentWillUnmount();
      } catch (t6) {
        n.__e(t6, i5);
      }
      u5.__P = u5.__n = null;
    }
    if (u5 = t5.__k) for (f4 = 0; f4 < u5.length; f4++) u5[f4] && E(u5[f4], i5, "function" != typeof t5.type || r4 && !t5.props.__P);
    (u5 = t5.__e) && (r4 || _(u5), u5.__e && (u5.__e = null)), t5.__e = t5.__c = t5.__ = null;
  }
  function F(n3, t5, i5) {
    return this.constructor(n3, i5);
  }
  function G(t5, i5) {
    var r4, u5, f4, o5;
    n.__ && n.__(t5, i5), 9 == i5.nodeType && (i5 = i5.documentElement), u5 = (r4 = t5 && 32 & t5.__u) ? null : i5.__k, i5.__k = b(M, { children: [t5] }), f4 = [], o5 = [], N(i5, i5.__k, u5 || h, h, i5.namespaceURI, u5 ? null : i5.firstChild ? d.call(i5.childNodes) : null, f4, u5 ? u5.__e : i5.firstChild, r4, o5), z(f4, i5.__k, o5), i5.__k.props.children = null;
  }
  n = { __e: function(n3, t5, i5, r4) {
    for (var u5, o5, e4; t5 = t5.__; ) if ((u5 = t5.__c) && !(1 & u5.__g)) {
      u5.__g |= 4;
      try {
        if ((o5 = u5.constructor) && o5.getDerivedStateFromError && (u5.setState(o5.getDerivedStateFromError(n3)), e4 = 8 & u5.__g), u5.componentDidCatch && (u5.componentDidCatch(n3, r4 || {}), e4 = 8 & u5.__g), e4) return void (u5.__g |= 2);
      } catch (t6) {
        n3 = t6, e4 = 0;
      }
    }
    throw f = 0, n3;
  } }, t = 0, i = function(n3) {
    return null != n3 && void 0 === n3.constructor;
  }, $.prototype.setState = function(n3, t5) {
    var i5 = this.__s;
    i5 && i5 != this.state || (i5 = this.__s = w({}, this.state)), "function" == typeof n3 && (n3 = n3(w({}, i5), this.props)), n3 && (w(i5, n3), this.__v && (t5 && this.__k.push(t5), C(this)));
  }, $.prototype.forceUpdate = function(n3) {
    this.__v && (this.__g |= 4, n3 && this.__h.push(n3), C(this));
  }, $.prototype.render = M, r = [], f = 0, o = function(n3, t5) {
    return n3.__v.__b - t5.__v.__b;
  }, e = /* @__PURE__ */ Symbol(), l = /(PointerCapture)$|Capture$/i, c = 0, a = {}, s = 0;

  // node_modules/preact/hooks/dist/hooks.mjs
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = Object.is;
  var f2 = 0;
  var c2 = [];
  var e2 = [];
  var a2 = n;
  var v2 = a2.__b;
  var l2 = a2.__r;
  var m = a2.diffed;
  var s2 = a2.__c;
  var h2 = a2.unmount;
  var p2 = a2.__;
  function y2(n3, t5) {
    a2.__h && a2.__h(r2, n3, f2 || t5), f2 = 0;
    var u5 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n3 >= u5.__.length && u5.__.push({}), u5.__[n3];
  }
  function d2(n3) {
    return f2 = 1, _2(G2, n3);
  }
  function _2(n3, u5, i5) {
    var f4 = y2(t2++, 2);
    if (f4.t = n3, !f4.__c && (f4.__ = [i5 ? i5(u5) : G2(void 0, u5), function(n4) {
      var t5 = f4.__N ? f4.__N[0] : f4.__[0], r4 = f4.t(t5, n4);
      o2(t5, r4) || (f4.__N = [r4, f4.__[1]], f4.__c.setState({}));
    }], f4.__c = r2, !r2.__f)) {
      r2.__f = true;
      var c4 = r2.shouldComponentUpdate;
      r2.shouldComponentUpdate = function(n4, t5, r4) {
        var u6 = this.__H;
        if (!u6) return true;
        var i6 = false, f5 = this.props != n4;
        if (u6.__.some(function(n5) {
          n5.__N && (i6 = true, o2(n5.__[0], n5.__N[0]) || (f5 = true));
        }), c4) {
          var e4 = c4.call(this, n4, t5, r4);
          return i6 ? e4 || f5 : e4;
        }
        return !i6 || f5;
      };
    }
    return f4.__;
  }
  function A(n3, u5) {
    var i5 = y2(t2++, 3);
    !a2.__s && E2(i5.__H, u5) && (i5.__P = true, i5.__ = n3, i5.u = u5, r2.__H.__h.push(i5));
  }
  function T2(n3) {
    return f2 = 5, b2(function() {
      return { current: n3 };
    }, []);
  }
  function b2(n3, r4) {
    var u5 = y2(t2++, 7);
    return E2(u5.__H, r4) && (u5.__ = n3(), u5.__H = r4), u5.__;
  }
  function g() {
    var n3;
    do {
      for (; n3 = e2.shift(); ) try {
        C2(n3);
      } catch (t6) {
        a2.__e(t6, { __: (n3 = n3.__P) && n3.__v });
      }
      for (; n3 = c2.shift(); ) {
        var t5 = n3.__H;
        if (n3.__P && t5) try {
          t5.__h.some(C2), t5.__h.some(D2), t5.__h = [];
        } catch (r4) {
          t5.__h = [], a2.__e(r4, n3.__v);
        }
      }
    } while (e2.length);
  }
  a2.__b = function(n3) {
    r2 = null, v2 && v2(n3);
  }, a2.__ = function(n3, t5) {
    n3 && t5.__k && t5.__k.__m && (n3.__m = t5.__k.__m), p2 && p2(n3, t5);
  }, a2.__r = function(n3) {
    l2 && l2(n3), t2 = 0;
    var i5 = (r2 = n3.__c).__H;
    i5 && (u2 == r2 ? r2.__h = [] : (i5.__h.some(C2), i5.__h.some(D2), t2 = 0), i5.__h = [], i5.__.some(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.u = n4.__N = void 0;
    })), u2 = r2;
  }, a2.diffed = function(n3) {
    m && m(n3);
    var t5 = n3.__c;
    t5 && t5.__H && (t5.__H.__h.length && B2(c2.push(t5)), t5.__H.__.some(function(n4) {
      n4.u && (n4.__H = n4.u);
    })), u2 = r2 = null;
  }, a2.__c = function(n3, t5) {
    t5.some(function(n4) {
      try {
        n4.__h.some(C2), n4.__h = n4.__h.filter(function(n5) {
          return !n5.__ || D2(n5);
        });
      } catch (r4) {
        t5.some(function(n5) {
          n5.__h && (n5.__h = []);
        }), t5 = [], a2.__e(r4, n4.__v);
      }
    }), s2 && s2(n3, t5);
  }, a2.unmount = function(n3) {
    h2 && h2(n3);
    var t5, r4, u5 = n3.__c;
    u5 && u5.__H && (u5.__H.__.some(function(u6) {
      try {
        if (u6.__P && u6.__c) {
          if (void 0 === r4) {
            for (r4 = n3.__; r4 && (!r4.__c || !r4.__c.__P); ) r4 = r4.__;
            r4 = r4 && r4.__c;
          }
          u6.__P = r4, B2(e2.push(u6));
        } else C2(u6);
      } catch (n4) {
        t5 = n4;
      }
    }), u5.__H = void 0, t5 && a2.__e(t5, u5.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function z2(n3) {
    var t5, r4 = function() {
      clearTimeout(u5), k && cancelAnimationFrame(t5), setTimeout(n3);
    }, u5 = setTimeout(r4, 35);
    k && (t5 = requestAnimationFrame(r4));
  }
  function B2(n3) {
    1 != n3 && i2 == a2.requestAnimationFrame || ((i2 = a2.requestAnimationFrame) || z2)(g);
  }
  function C2(n3) {
    var t5 = r2, u5 = n3.__c;
    "function" == typeof u5 && (n3.__c = void 0, u5()), r2 = t5;
  }
  function D2(n3) {
    var t5 = r2;
    n3.__c = n3.__(), r2 = t5;
  }
  function E2(n3, t5) {
    return !n3 || n3.length != t5.length || t5.some(function(t6, r4) {
      return !o2(t6, n3[r4]);
    });
  }
  function G2(n3, t5) {
    return "function" == typeof t5 ? t5(n3) : t5;
  }

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  var i3 = /* @__PURE__ */ Symbol.for("preact-signals");
  function t3() {
    if (!(v3 > 1)) {
      var i5, t5 = false;
      !(function() {
        var i6 = c3;
        c3 = void 0;
        while (void 0 !== i6) {
          var t6 = i6.S;
          if (t6.v === i6.v) {
            for (var n4 = t6.t; void 0 !== n4; n4 = n4.x) if (n4.i === i6.i) n4.i = t6.i;
          }
          i6 = i6.o;
        }
      })();
      while (void 0 !== h3) {
        var n3 = h3;
        h3 = void 0;
        s3++;
        while (void 0 !== n3) {
          var r4 = n3.u;
          n3.u = void 0;
          n3.f &= -3;
          if (!(8 & n3.f) && w2(n3)) try {
            n3.c();
          } catch (n4) {
            if (!t5) {
              i5 = n4;
              t5 = true;
            }
          }
          n3 = r4;
        }
      }
      s3 = 0;
      v3--;
      if (t5) throw i5;
    } else v3--;
  }
  function n2(i5) {
    if (v3 > 0) return i5();
    e3 = ++u3;
    v3++;
    try {
      return i5();
    } finally {
      t3();
    }
  }
  var r3;
  var o3 = void 0;
  function f3(i5) {
    var t5 = o3, n3 = r3;
    o3 = void 0;
    r3 = void 0;
    try {
      return i5();
    } finally {
      o3 = t5;
      r3 = n3;
    }
  }
  var h3 = void 0;
  var v3 = 0;
  var s3 = 0;
  var u3 = 0;
  var e3 = 0;
  var c3 = void 0;
  var d3 = 0;
  function a3(i5) {
    if (void 0 !== o3) {
      var t5 = i5.n;
      if (void 0 === t5 || t5.t !== o3) {
        t5 = { i: 0, S: i5, p: o3.s, n: void 0, t: o3, e: void 0, x: void 0, r: t5 };
        if (void 0 !== o3.s) o3.s.n = t5;
        o3.s = t5;
        i5.n = t5;
        if (32 & o3.f) i5.S(t5);
        return t5;
      } else if (-1 === t5.i) {
        t5.i = 0;
        if (void 0 !== t5.n) {
          t5.n.p = t5.p;
          if (void 0 !== t5.p) t5.p.n = t5.n;
          t5.p = o3.s;
          t5.n = void 0;
          o3.s.n = t5;
          o3.s = t5;
        }
        return t5;
      }
    }
  }
  function l3(i5, t5) {
    this.v = i5;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.l = 0;
    this.W = null == t5 ? void 0 : t5.watched;
    this.Z = null == t5 ? void 0 : t5.unwatched;
    this.name = null == t5 ? void 0 : t5.name;
  }
  l3.prototype.brand = i3;
  l3.prototype.h = function() {
    return true;
  };
  l3.prototype.S = function(i5) {
    var t5 = this, n3 = this.t;
    if (n3 !== i5 && void 0 === i5.e) {
      i5.x = n3;
      this.t = i5;
      if (void 0 !== n3) n3.e = i5;
      else f3(function() {
        var i6;
        null == (i6 = t5.W) || i6.call(t5);
      });
    }
  };
  l3.prototype.U = function(i5) {
    var t5 = this;
    if (void 0 !== this.t) {
      var n3 = i5.e, r4 = i5.x;
      if (void 0 !== n3) {
        n3.x = r4;
        i5.e = void 0;
      }
      if (void 0 !== r4) {
        r4.e = n3;
        i5.x = void 0;
      }
      if (i5 === this.t) {
        this.t = r4;
        if (void 0 === r4) f3(function() {
          var i6;
          null == (i6 = t5.Z) || i6.call(t5);
        });
      }
    }
  };
  l3.prototype.subscribe = function(i5) {
    var t5 = this;
    return j2(function() {
      var n3 = t5.value;
      f3(function() {
        return i5(n3);
      });
    }, { name: "sub" });
  };
  l3.prototype.valueOf = function() {
    return this.value;
  };
  l3.prototype.toString = function() {
    return this.value + "";
  };
  l3.prototype.toJSON = function() {
    return this.value;
  };
  l3.prototype.peek = function() {
    var i5 = this;
    return f3(function() {
      return i5.value;
    });
  };
  Object.defineProperty(l3.prototype, "value", { get: function() {
    var i5 = a3(this);
    if (void 0 !== i5) i5.i = this.i;
    return this.v;
  }, set: function(i5) {
    if (i5 !== this.v) {
      if (s3 > 100) throw new Error("Cycle detected");
      !(function(i6) {
        if (0 !== v3 && 0 === s3) {
          if (i6.l !== e3) {
            i6.l = e3;
            c3 = { S: i6, v: i6.v, i: i6.i, o: c3 };
          }
        }
      })(this);
      this.v = i5;
      this.i++;
      d3++;
      v3++;
      try {
        for (var n3 = this.t; void 0 !== n3; n3 = n3.x) n3.t.N();
      } finally {
        t3();
      }
    }
  } });
  function y3(i5, t5) {
    return new l3(i5, t5);
  }
  function w2(i5) {
    for (var t5 = i5.s; void 0 !== t5; t5 = t5.n) if (t5.S.i !== t5.i || !t5.S.h() || t5.S.i !== t5.i) return true;
    return false;
  }
  function _3(i5) {
    for (var t5 = i5.s; void 0 !== t5; t5 = t5.n) {
      var n3 = t5.S.n;
      if (void 0 !== n3) t5.r = n3;
      t5.S.n = t5;
      t5.i = -1;
      if (void 0 === t5.n) {
        i5.s = t5;
        break;
      }
    }
  }
  function b3(i5) {
    var t5 = i5.s, n3 = void 0;
    while (void 0 !== t5) {
      var r4 = t5.p;
      if (-1 === t5.i) {
        t5.S.U(t5);
        if (void 0 !== r4) r4.n = t5.n;
        if (void 0 !== t5.n) t5.n.p = r4;
      } else n3 = t5;
      t5.S.n = t5.r;
      if (void 0 !== t5.r) t5.r = void 0;
      t5 = r4;
    }
    i5.s = n3;
  }
  function p3(i5, t5) {
    l3.call(this, void 0, t5);
    this.x = i5;
    this.s = void 0;
    this.g = d3 - 1;
    this.f = 4;
  }
  p3.prototype = new l3();
  p3.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === d3) return true;
    this.g = d3;
    this.f |= 1;
    if (this.i > 0 && !w2(this)) {
      this.f &= -2;
      return true;
    }
    var i5 = o3;
    try {
      _3(this);
      o3 = this;
      var t5 = this.x();
      if (16 & this.f || this.v !== t5 || 0 === this.i) {
        this.v = t5;
        this.f &= -17;
        this.i++;
      }
    } catch (i6) {
      this.v = i6;
      this.f |= 16;
      this.i++;
    }
    o3 = i5;
    b3(this);
    this.f &= -2;
    return true;
  };
  p3.prototype.S = function(i5) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t5 = this.s; void 0 !== t5; t5 = t5.n) t5.S.S(t5);
    }
    l3.prototype.S.call(this, i5);
  };
  p3.prototype.U = function(i5) {
    if (void 0 !== this.t) {
      l3.prototype.U.call(this, i5);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t5 = this.s; void 0 !== t5; t5 = t5.n) t5.S.U(t5);
      }
    }
  };
  p3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i5 = this.t; void 0 !== i5; i5 = i5.x) i5.t.N();
    }
  };
  Object.defineProperty(p3.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i5 = a3(this);
    this.h();
    if (void 0 !== i5) i5.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function g2(i5, t5) {
    return new p3(i5, t5);
  }
  function S2(i5) {
    var n3 = i5.m;
    i5.m = void 0;
    if ("function" == typeof n3) {
      v3++;
      var r4 = o3;
      o3 = void 0;
      try {
        n3();
      } catch (t5) {
        i5.f &= -2;
        i5.f |= 8;
        m2(i5);
        throw t5;
      } finally {
        o3 = r4;
        t3();
      }
    }
  }
  function m2(i5) {
    for (var t5 = i5.s; void 0 !== t5; t5 = t5.n) t5.S.U(t5);
    i5.x = void 0;
    i5.s = void 0;
    S2(i5);
  }
  function x2(i5) {
    if (o3 !== this) throw new Error("Out-of-order effect");
    b3(this);
    o3 = i5;
    this.f &= -2;
    if (8 & this.f) m2(this);
    t3();
  }
  function E3(i5, t5) {
    this.x = i5;
    this.m = void 0;
    this.s = void 0;
    this.u = void 0;
    this.f = 32;
    this.name = null == t5 ? void 0 : t5.name;
    if (r3) r3.push(this);
  }
  E3.prototype.c = function() {
    var i5 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t5 = this.x();
      if ("function" == typeof t5) this.m = t5;
    } finally {
      i5();
    }
  };
  E3.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    S2(this);
    _3(this);
    v3++;
    var i5 = o3;
    o3 = this;
    return x2.bind(this, i5);
  };
  E3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.u = h3;
      h3 = this;
    }
  };
  E3.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) m2(this);
  };
  E3.prototype.dispose = function() {
    this.d();
  };
  function j2(i5, t5) {
    var n3 = new E3(i5, t5);
    try {
      n3.c();
    } catch (i6) {
      n3.d();
      throw i6;
    }
    var r4 = n3.d.bind(n3);
    r4[Symbol.dispose] = r4;
    return r4;
  }

  // node_modules/@preact/signals/dist/signals.module.js
  var l4;
  var h4;
  var d4;
  var p4 = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__;
  var _4 = [];
  j2(function() {
    l4 = this.N;
  })();
  function g3(i5, r4) {
    n[i5] = r4.bind(null, n[i5] || function() {
    });
  }
  function b4(i5) {
    if (d4) {
      var n3 = d4;
      d4 = void 0;
      n3();
    }
    d4 = i5 && i5.S();
  }
  function y4(i5) {
    var n3 = this, t5 = i5.data, f4 = useSignal(t5);
    f4.name = "ReactiveDom";
    f4.value = t5;
    var e4 = b2(function() {
      var i6 = n3, t6 = n3.__v;
      while (t6 = t6.__) if (t6.__c) {
        t6.__c.__$f |= 4;
        break;
      }
      var o5 = g2(function() {
        var i7 = f4.value.value;
        return 0 === i7 ? 0 : true === i7 ? "" : i7 || "";
      }), e5 = g2(function() {
        return !Array.isArray(o5.value) && !i(o5.value);
      }), a5 = j2(function() {
        this.N = F2;
        if (e5.value) {
          var n4 = o5.value;
          if (i6.__v && i6.__v.__e && 3 === i6.__v.__e.nodeType) i6.__v.__e.data = n4;
        }
      }), v5 = n3.__$u.d;
      n3.__$u.d = function() {
        a5();
        v5.call(this);
      };
      return [e5, o5];
    }, []), a4 = e4[0], v4 = e4[1];
    return a4.value ? v4.peek() : v4.value;
  }
  y4.displayName = "ReactiveTextNode";
  Object.defineProperties(l3.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: y4 }, props: { configurable: true, get: function() {
    var i5 = this;
    return { data: { get value() {
      return i5.value;
    } } };
  } }, __b: { configurable: true, value: 1 } });
  g3("__b", function(i5, n3) {
    b4();
    h4 = void 0;
    if ("string" == typeof n3.type) {
      var r4, t5 = n3.props;
      for (var o5 in t5) if ("children" !== o5) {
        var f4 = t5[o5];
        if (f4 instanceof l3) {
          if (!r4) n3.__np = r4 = {};
          r4[o5] = f4;
          t5[o5] = f4.peek();
        }
      }
    }
    i5(n3);
  });
  g3("__r", function(i5, n3) {
    i5(n3);
    if (n3.type !== M) {
      b4();
      var r4, o5 = n3.__c;
      if (o5) {
        o5.__$f &= -2;
        if (void 0 === (r4 = o5.__$u)) o5.__$u = r4 = (function(i6, n4) {
          var r5;
          j2(function() {
            r5 = this;
          }, { name: n4 });
          r5.c = i6;
          return r5;
        })(/* @__PURE__ */ (function(i6) {
          return function() {
            var n4;
            if (p4) null == (n4 = this.y) || n4.call(this);
            i6.__$f |= 1;
            i6.setState({});
          };
        })(o5), "function" == typeof n3.type ? n3.type.displayName || n3.type.name : "");
      }
      h4 = o5;
      b4(r4);
    }
  });
  g3("__e", function(i5, n3, r4, t5) {
    b4();
    h4 = void 0;
    i5(n3, r4, t5);
  });
  g3("diffed", function(i5, n3) {
    b4();
    h4 = void 0;
    var r4;
    if ("string" == typeof n3.type && (r4 = n3.__e)) {
      var t5 = n3.__np, o5 = n3.props, f4 = r4.U;
      if (f4) for (var e4 in f4) {
        var u5 = f4[e4];
        if (!(void 0 === u5 || t5 && e4 in t5)) {
          u5.d();
          f4[e4] = void 0;
        }
      }
      if (t5) {
        if (!f4) {
          f4 = {};
          r4.U = f4;
        }
        for (var a4 in t5) {
          var c4 = f4[a4], v4 = t5[a4];
          if (void 0 === c4) {
            c4 = w3(r4, a4, v4, o5);
            f4[a4] = c4;
          } else c4.o(v4, o5);
        }
      }
    }
    i5(n3);
  });
  function w3(i5, n3, r4, t5) {
    var o5 = n3 in i5 && void 0 === i5.ownerSVGElement, f4 = y3(r4);
    return { o: function(i6, n4) {
      f4.value = i6;
      t5 = n4;
    }, d: j2(function() {
      this.N = F2;
      var r5 = f4.value.value;
      if (t5[n3] !== r5) {
        t5[n3] = r5;
        if (o5) i5[n3] = r5;
        else if (null != r5 && (false !== r5 || "-" === n3[4])) i5.setAttribute(n3, r5);
        else i5.removeAttribute(n3);
      }
    }) };
  }
  g3("unmount", function(i5, n3) {
    if ("string" == typeof n3.type) {
      var r4 = n3.__e;
      if (r4) {
        var t5 = r4.U;
        if (t5) {
          r4.U = void 0;
          for (var o5 in t5) {
            var f4 = t5[o5];
            if (f4) f4.d();
          }
        }
      }
      var e4 = n3.__np;
      if (e4) {
        var u5 = n3.props;
        for (var a4 in e4) u5[a4] = e4[a4];
      }
      n3.__np = void 0;
    } else {
      var c4 = n3.__c;
      if (c4) {
        c4.__$f |= 8;
        var v4 = c4.__$u;
        if (v4) {
          c4.__$u = void 0;
          v4.d();
        }
      }
    }
    i5(n3);
  });
  g3("__h", function(i5, n3, r4, t5) {
    if (t5 < 3) n3.__$f |= 2;
    i5(n3, r4, t5);
  });
  $.prototype.shouldComponentUpdate = function(i5, n3) {
    if (this.__R) return true;
    var r4 = this.__$u, t5 = r4 && void 0 !== r4.s;
    for (var o5 in n3) return true;
    if (this.__f || "boolean" == typeof this.u && true === this.u) {
      var f4 = 2 & this.__$f;
      if (!(t5 || f4 || 4 & this.__$f)) return true;
      if (1 & this.__$f) return true;
    } else {
      if (!(t5 || 4 & this.__$f)) return true;
      if (3 & this.__$f) return true;
    }
    for (var e4 in i5) if ("__source" !== e4 && i5[e4] !== this.props[e4]) return true;
    for (var u5 in this.props) if (!(u5 in i5)) return true;
    return false;
  };
  function useSignal(i5, n3) {
    return b2(function() {
      return y3(i5, n3);
    }, []);
  }
  var q2 = function(i5) {
    queueMicrotask(function() {
      queueMicrotask(i5);
    });
  };
  function x3() {
    n2(function() {
      var i5;
      while (i5 = _4.shift()) l4.call(i5);
    });
  }
  function F2() {
    if (1 === _4.push(this)) (n.requestAnimationFrame || q2)(x3);
  }

  // src/i18n/en.ts
  var en = {
    "app.tagline": "Message cleanup",
    "nav.wipe": "Cleanup",
    "nav.package": "Data package",
    "nav.archive": "Archive",
    "nav.logs": "Log",
    "nav.settings": "Settings",
    "status.idle": "Ready",
    "status.running": "Running",
    "status.paused": "Paused",
    "status.stopping": "Stopping…",
    "status.finished": "Finished",
    "account.detecting": "Looking for your token…",
    "account.missing": "Token not found",
    "account.missingHint": "Switch channels in Discord so it gets detected, or paste it in Settings → Account.",
    "account.invalid": "Discord rejected the token",
    "account.as": "Signed in: {name}",
    "target.title": "Target",
    "target.channel": "Current channel",
    "target.guild": "Current server",
    "target.dms": "Direct messages",
    "target.guilds": "Servers",
    "target.custom": "IDs",
    "target.noChannel": "Open a channel or a direct message in Discord.",
    "target.noGuild": "Open a server in Discord to target all of it.",
    "target.channelDesc": "Deletes your messages in this channel / conversation.",
    "target.guildDesc": "Deletes your messages in every channel and thread of this server.",
    "target.dm": "DM with {name}",
    "target.group": "Group {name}",
    "target.unknownChannel": "Channel {id}",
    "target.loading": "Loading…",
    "target.filterList": "Filter the list…",
    "target.all": "All",
    "target.none": "None",
    "target.count": "Count my messages",
    "target.counting": "Counting… ({done}/{total})",
    "target.selected": "{n} selected",
    "target.empty": "Nothing here.",
    "target.customHint": "One channel per line: channel ID, server_ID/channel_ID, or a discord.com/channels/… link",
    "target.customCount": "{n} channel(s) recognised",
    "target.refresh": "Refresh",
    "target.countHint": "Counting uses Discord search with the current filters.",
    "target.sortByCount": "Sort by message count",
    "filters.title": "Filters",
    "filters.active": "{n} active",
    "filters.reset": "Reset",
    "filters.author": "Author",
    "filters.authorMe": "Me",
    "filters.authorCustom": "Other ID(s)",
    "filters.authorCustomPh": "User IDs, comma separated",
    "filters.authorCustomHint": "Deleting other people’s messages requires the “Manage Messages” permission.",
    "filters.content": "Contains text",
    "filters.contentPh": "word or phrase",
    "filters.pattern": "Regular expression",
    "filters.patternPh": "e.g. ^(lol|lmao)$",
    "filters.patternInvalid": "Invalid regex: {error}",
    "filters.patternHint": "Applied locally, case-insensitive. /pattern/flags syntax accepted.",
    "filters.has": "Must contain",
    "filters.exclude": "Skip if it contains",
    "filters.pinned": "Pinned messages",
    "filters.period": "Period",
    "filters.after": "After",
    "filters.before": "Before",
    "filters.olderThan": "Older than",
    "filters.range": "Between two messages",
    "filters.afterMessage": "After message",
    "filters.beforeMessage": "Before message",
    "filters.messageIdPh": "Message ID",
    "filters.pick": "Pick",
    "filters.pickBanner": "Click a message in the chat",
    "filters.nsfw": "Include NSFW channels",
    "has.link": "Link",
    "has.file": "File",
    "has.image": "Image",
    "has.video": "Video",
    "has.embed": "Embed",
    "has.sound": "Audio",
    "has.sticker": "Sticker",
    "has.poll": "Poll",
    "pinned.exclude": "Skip",
    "pinned.include": "Include",
    "pinned.only": "Only",
    "preset.1d": "1 day",
    "preset.7d": "7 days",
    "preset.30d": "30 days",
    "preset.1y": "1 year",
    "mode.title": "Method",
    "mode.search": "Search",
    "mode.searchDesc": "Fast. Uses Discord’s search index.",
    "mode.history": "Full history",
    "mode.historyDesc": "Reads the whole channel. Slower but misses nothing. Single channels only.",
    "action.preview": "Preview",
    "action.delete": "Delete",
    "action.pause": "Pause",
    "action.resume": "Resume",
    "action.stop": "Stop",
    "action.back": "Back",
    "action.close": "Close",
    "action.cancel": "Cancel",
    "action.export": "Export",
    "action.clear": "Clear",
    "action.copy": "Copy",
    "action.details": "Details",
    "action.deleteSelection": "Delete selection ({n})",
    "action.deleteN": "Delete {n} message(s)",
    "action.newRun": "New cleanup",
    "run.deleted": "Deleted",
    "run.failed": "Failed",
    "run.skipped": "Skipped",
    "run.matched": "Found",
    "run.speed": "Speed",
    "run.perMin": "{n}/min",
    "run.eta": "Remaining",
    "run.elapsed": "Elapsed",
    "run.delay": "Current delay",
    "run.rateLimits": "Rate limits",
    "run.jobs": "Targets",
    "run.recent": "Recently deleted",
    "run.recentPreview": "Recently found",
    "run.waiting": "Waiting for the first results…",
    "run.of": "{done} / {total}",
    "run.scanned": "{n} scanned",
    "run.unknownTotal": "estimating total",
    "run.finishedTitle": "Cleanup finished",
    "run.finishedBody": "{deleted} deleted · {failed} failed",
    "run.previewTitle": "Preview finished",
    "run.previewBody": "{n} message(s) found",
    "job.pending": "Pending",
    "job.running": "Running",
    "job.done": "Done",
    "job.skipped": "Inaccessible",
    "job.failed": "Failed",
    "job.stopped": "Stopped",
    "confirm.title": "Confirm deletion",
    "confirm.count": "Up to {count} message(s) in {targets} target(s) will be deleted.",
    "confirm.countUnknown": "Your messages matching the filters in {targets} target(s) will be deleted.",
    "confirm.counting": "Estimating the number of messages…",
    "confirm.irreversible": "This is permanent: Discord has no way to restore a deleted message.",
    "confirm.archive": "Keep an exportable copy of deleted messages",
    "confirm.typeToConfirm": "More than {n} messages: type DELETE to confirm",
    "confirm.word": "DELETE",
    "session.found": "A cleanup was interrupted ({n} target(s) left).",
    "session.resume": "Resume",
    "session.discard": "Dismiss",
    "results.title": "Preview results",
    "results.empty": "No message matches the filters.",
    "results.selected": "{n} selected out of {total}",
    "results.more": "… and {n} more (all included in the selection)",
    "results.running": "Searching, results are coming in…",
    "results.hint": "Nothing was deleted. Untick what you want to keep, then delete the selection.",
    "pkg.intro": "Discord’s data package lists the ID of every message you ever sent, including closed conversations and forgotten servers. It is the most thorough method.",
    "pkg.howTo": "How to get it",
    "pkg.step1": "User Settings → Data & Privacy",
    "pkg.step2": "“Request all of my data” (tick at least “Messages”)",
    "pkg.step3": "Discord emails you a link within a few days: download the .zip",
    "pkg.chooseZip": "Choose the .zip file",
    "pkg.chooseFolder": "or the extracted folder",
    "pkg.local": "The file is read locally in your browser, nothing is uploaded.",
    "pkg.parsing": "Reading the package…",
    "pkg.error": "Could not read this file: {error}",
    "pkg.noMessages": "No messages found. Did you tick “Messages” when requesting it?",
    "pkg.summary": "{channels} conversations · {messages} messages",
    "pkg.kind.all": "All",
    "pkg.kind.dm": "DMs",
    "pkg.kind.group": "Groups",
    "pkg.kind.guild": "Servers",
    "pkg.kind.unknown": "Other",
    "pkg.matching": "{n} selected message(s) match the filters",
    "pkg.filtersNote": "Filters from the Cleanup tab (text, regex, period, contains / skip, pinned) apply here too.",
    "pkg.change": "Use another package",
    "pkg.indexOnly": "index only",
    "pkg.colName": "Conversation",
    "pkg.colTotal": "Total",
    "archive.desc": "Copy of the messages deleted during this session. It is not saved: export it before reloading Discord.",
    "archive.disabled": "Archiving is turned off (Settings → Safety).",
    "archive.empty": "Nothing yet.",
    "archive.search": "Search the archive…",
    "archive.count": "{n} message(s)",
    "archive.showMore": "Show more",
    "logs.empty": "The log is empty.",
    "logs.autoscroll": "Auto-scroll",
    "level.debug": "Details",
    "level.info": "Info",
    "level.success": "Success",
    "level.warn": "Warnings",
    "level.error": "Errors",
    "settings.general": "General",
    "settings.lang": "Language",
    "lang.auto": "Auto",
    "settings.theme": "Theme",
    "theme.auto": "Match Discord",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "settings.fab": "Floating button",
    "fab.auto": "Auto",
    "fab.always": "Always",
    "fab.never": "Never",
    "settings.fabDesc": "In “Auto”, it only shows up when Discord’s toolbar button can’t be placed.",
    "settings.shortcut": "Keyboard shortcut",
    "settings.shortcutDesc": "Open / close the window",
    "settings.speed": "Speed",
    "speed.safe": "Careful",
    "speed.balanced": "Balanced",
    "speed.fast": "Fast",
    "speed.custom": "Custom",
    "settings.searchDelay": "Delay between searches",
    "settings.deleteDelay": "Delay between deletions",
    "settings.adaptive": "Adaptive speed",
    "settings.adaptiveDesc": "Slows down by itself when Discord rate limits, then speeds back up.",
    "settings.maxAttempts": "Attempts per message",
    "settings.emptyRetries": "Retries on empty page",
    "settings.speedWarning": "Going too fast means more rate limits and more attention from Discord.",
    "settings.safety": "Safety & privacy",
    "settings.confirm": "Confirm before deleting",
    "settings.privacy": "Privacy mode",
    "settings.privacyDesc": "Blurs contents and names (handy when streaming or taking screenshots).",
    "settings.archive": "Archive deleted messages",
    "settings.archiveDesc": "Keeps an in-memory copy you can export as JSON, CSV or HTML.",
    "settings.end": "When finished",
    "settings.notify": "Browser notification",
    "settings.notifyDesc": "Shown when the Discord tab is in the background.",
    "settings.sound": "Sound",
    "settings.account": "Account",
    "settings.token": "Token",
    "settings.redetect": "Detect again",
    "settings.manualToken": "Manual token",
    "settings.manualTokenPh": "Paste your token here",
    "settings.manualTokenHint": "Only if automatic detection fails. NEVER share your token: it gives full access to your account. It stays in memory and is never saved.",
    "settings.useToken": "Use",
    "settings.forgetToken": "Forget",
    "settings.about": "About",
    "settings.madeBy": "Made by {author}",
    "settings.aboutDesc": "A complete, modernised rewrite of Undiscord (victornpb, MIT licence).",
    "settings.tos": "Automating a user account is against Discord’s Terms of Service. Keep sensible delays: you are responsible for how you use this tool.",
    "settings.reset": "Reset settings",
    "token.network": "detected automatically",
    "token.webpack": "detected through Discord",
    "token.storage": "detected in local storage",
    "token.manual": "entered manually",
    "toast.copied": "Copied to clipboard",
    "toast.tokenOk": "Token is valid",
    "toast.tokenBad": "That does not look like a Discord token.",
    "toast.tokenRejected": "Discord rejected this token.",
    "toast.noTarget": "Pick at least one target.",
    "toast.noAccount": "Your account is not loaded yet (token missing?).",
    "toast.badRegex": "The regular expression is invalid.",
    "toast.badAuthor": "No valid author ID.",
    "toast.historyGuild": "History mode only applies to channels: servers will use search.",
    "toast.busy": "Something is already running.",
    "toast.resetDone": "Settings reset.",
    "toast.nothingSelected": "Nothing selected.",
    "log.start": "Starting deletion ({jobs} target(s)).",
    "log.previewStart": "Starting preview ({jobs} target(s)) — nothing will be deleted.",
    "log.jobStart": "[{index}/{count}] {label}",
    "log.jobDone": "{label} — deleted: {deleted}, found: {matched}, failed: {failed}, skipped: {skipped}",
    "log.jobInaccessible": "{label}: inaccessible (deleted channel, left server or no access), skipped.",
    "log.jobFailed": "{label}: error — {error}",
    "log.unauthorized": "Discord rejected the token (401). Reload the page or enter it manually in Settings.",
    "log.rateLimited": "Rate limited by Discord: waiting {seconds} s (delay adjusted to {delay} ms).",
    "log.rateLimitedGlobal": "Global Discord rate limit: waiting {seconds} s.",
    "log.indexing": "Discord is still indexing these messages, retrying in {seconds} s…",
    "log.retry": "Network issue ({reason}), attempt {attempt} in {seconds} s…",
    "log.emptyPage": "Empty page while messages remain, retry {attempt}/{max}…",
    "log.paused": "Paused.",
    "log.resumed": "Resumed.",
    "log.stopped": "Stopped.",
    "log.unexpected": "Unexpected error: {error}",
    "log.finished": "Finished — {deleted} deleted, {failed} failed, {skipped} skipped.",
    "log.previewFinished": "Preview finished — {matched} message(s) found.",
    "log.threadArchived": "Message {id} is in an archived thread: cannot delete.",
    "log.forbidden": "Access denied for message {id}.",
    "log.deleteFailed": "Could not delete message {id}.",
    "log.pinsUnavailable": "Could not read the pins of {label}.",
    "log.message": "{where} · {date} · {content}",
    "log.tokenFound": "Token {source}.",
    "log.loggedIn": "Signed in as {name}.",
    "log.packageLoaded": "Package loaded: {channels} conversations, {messages} messages.",
    "log.ready": "{brand} v{version} ready. Shortcut: {shortcut}.",
    "target.channels": "Server channels",
    "target.excludedCount": "{n} channel(s) spared",
    "target.allChannels": "All channels",
    "target.channelsHint": "Untick the channels to spare: their threads are spared too. This choice is remembered for this server.",
    "target.noCategory": "No category",
    "target.loadChannelsError": "Could not load this server’s channels.",
    "target.excludedShort": "−{n} channel(s)",
    "filters.relativeHint": "Recomputed at every run (great in a preset).",
    "presets.title": "Presets",
    "presets.save": "Save",
    "presets.saveCurrent": "Save this setup",
    "presets.namePh": "Preset name",
    "presets.empty": "Save your target, filters and method to reuse them in one click.",
    "presets.applied": "Preset “{name}” applied.",
    "presets.saved": "Preset “{name}” saved.",
    "presets.delete": "Delete this preset"
  };

  // src/i18n/fr.ts
  var fr = {
    "app.tagline": "Nettoyage de messages",
    "nav.wipe": "Nettoyage",
    "nav.package": "Package de données",
    "nav.archive": "Archive",
    "nav.logs": "Journal",
    "nav.settings": "Paramètres",
    "status.idle": "Prêt",
    "status.running": "En cours",
    "status.paused": "En pause",
    "status.stopping": "Arrêt…",
    "status.finished": "Terminé",
    "account.detecting": "Recherche du token…",
    "account.missing": "Token introuvable",
    "account.missingHint": "Change de salon dans Discord pour qu’il soit détecté, ou colle-le dans Paramètres → Compte.",
    "account.invalid": "Token refusé par Discord",
    "account.as": "Connecté : {name}",
    "target.title": "Cible",
    "target.channel": "Salon actuel",
    "target.guild": "Serveur actuel",
    "target.dms": "Messages privés",
    "target.guilds": "Serveurs",
    "target.custom": "IDs",
    "target.noChannel": "Ouvre un salon ou une conversation privée dans Discord.",
    "target.noGuild": "Ouvre un serveur dans Discord pour le cibler en entier.",
    "target.channelDesc": "Supprime tes messages dans ce salon / cette conversation.",
    "target.guildDesc": "Supprime tes messages dans tous les salons et fils de ce serveur.",
    "target.dm": "MP avec {name}",
    "target.group": "Groupe {name}",
    "target.unknownChannel": "Salon {id}",
    "target.loading": "Chargement…",
    "target.filterList": "Filtrer la liste…",
    "target.all": "Tout",
    "target.none": "Aucun",
    "target.count": "Compter mes messages",
    "target.counting": "Comptage… ({done}/{total})",
    "target.selected": "{n} sélectionné(s)",
    "target.empty": "Aucun élément.",
    "target.customHint": "Un salon par ligne : ID du salon, ID_serveur/ID_salon, ou un lien discord.com/channels/…",
    "target.customCount": "{n} salon(s) reconnu(s)",
    "target.refresh": "Actualiser",
    "target.countHint": "Le comptage utilise la recherche Discord avec les filtres actuels.",
    "target.sortByCount": "Trier par nombre de messages",
    "filters.title": "Filtres",
    "filters.active": "{n} actif(s)",
    "filters.reset": "Réinitialiser",
    "filters.author": "Auteur",
    "filters.authorMe": "Moi",
    "filters.authorCustom": "Autre(s) ID(s)",
    "filters.authorCustomPh": "ID d’utilisateur, séparés par des virgules",
    "filters.authorCustomHint": "Supprimer les messages d’autres personnes nécessite la permission « Gérer les messages ».",
    "filters.content": "Contient le texte",
    "filters.contentPh": "mot ou phrase",
    "filters.pattern": "Expression régulière",
    "filters.patternPh": "ex : ^(lol|mdr)$",
    "filters.patternInvalid": "Regex invalide : {error}",
    "filters.patternHint": "Appliquée localement, insensible à la casse. Format /motif/flags accepté.",
    "filters.has": "Doit contenir",
    "filters.exclude": "Exclure s’il contient",
    "filters.pinned": "Messages épinglés",
    "filters.period": "Période",
    "filters.after": "Après le",
    "filters.before": "Avant le",
    "filters.olderThan": "Plus ancien que",
    "filters.range": "Entre deux messages",
    "filters.afterMessage": "Après le message",
    "filters.beforeMessage": "Avant le message",
    "filters.messageIdPh": "ID du message",
    "filters.pick": "Choisir",
    "filters.pickBanner": "Clique sur un message dans le chat",
    "filters.nsfw": "Inclure les salons NSFW",
    "has.link": "Lien",
    "has.file": "Fichier",
    "has.image": "Image",
    "has.video": "Vidéo",
    "has.embed": "Intégration",
    "has.sound": "Audio",
    "has.sticker": "Sticker",
    "has.poll": "Sondage",
    "pinned.exclude": "Ignorer",
    "pinned.include": "Inclure",
    "pinned.only": "Uniquement",
    "preset.1d": "1 jour",
    "preset.7d": "7 jours",
    "preset.30d": "30 jours",
    "preset.1y": "1 an",
    "mode.title": "Méthode",
    "mode.search": "Recherche",
    "mode.searchDesc": "Rapide. Utilise l’index de recherche de Discord.",
    "mode.history": "Historique complet",
    "mode.historyDesc": "Lit tout le salon. Plus lent mais ne rate rien. Salons individuels uniquement.",
    "action.preview": "Aperçu",
    "action.delete": "Supprimer",
    "action.pause": "Pause",
    "action.resume": "Reprendre",
    "action.stop": "Arrêter",
    "action.back": "Retour",
    "action.close": "Fermer",
    "action.cancel": "Annuler",
    "action.export": "Exporter",
    "action.clear": "Effacer",
    "action.copy": "Copier",
    "action.details": "Détails",
    "action.deleteSelection": "Supprimer la sélection ({n})",
    "action.deleteN": "Supprimer {n} message(s)",
    "action.newRun": "Nouveau nettoyage",
    "run.deleted": "Supprimés",
    "run.failed": "Échecs",
    "run.skipped": "Ignorés",
    "run.matched": "Trouvés",
    "run.speed": "Vitesse",
    "run.perMin": "{n}/min",
    "run.eta": "Restant",
    "run.elapsed": "Écoulé",
    "run.delay": "Délai actuel",
    "run.rateLimits": "Limitations",
    "run.jobs": "Cibles",
    "run.recent": "Derniers messages supprimés",
    "run.recentPreview": "Derniers messages trouvés",
    "run.waiting": "En attente des premiers résultats…",
    "run.of": "{done} / {total}",
    "run.scanned": "{n} analysé(s)",
    "run.unknownTotal": "total en cours d’estimation",
    "run.finishedTitle": "Nettoyage terminé",
    "run.finishedBody": "{deleted} supprimé(s) · {failed} échec(s)",
    "run.previewTitle": "Aperçu terminé",
    "run.previewBody": "{n} message(s) trouvé(s)",
    "job.pending": "En attente",
    "job.running": "En cours",
    "job.done": "Terminé",
    "job.skipped": "Inaccessible",
    "job.failed": "Échec",
    "job.stopped": "Arrêté",
    "confirm.title": "Confirmer la suppression",
    "confirm.count": "Jusqu’à {count} message(s) dans {targets} cible(s) vont être supprimés.",
    "confirm.countUnknown": "Tes messages correspondant aux filtres dans {targets} cible(s) vont être supprimés.",
    "confirm.counting": "Estimation du nombre de messages…",
    "confirm.irreversible": "C’est définitif : Discord ne permet pas de récupérer un message supprimé.",
    "confirm.archive": "Garder une copie exportable des messages supprimés",
    "confirm.typeToConfirm": "Plus de {n} messages : tape SUPPRIMER pour confirmer",
    "confirm.word": "SUPPRIMER",
    "session.found": "Un nettoyage a été interrompu ({n} cible(s) restante(s)).",
    "session.resume": "Reprendre",
    "session.discard": "Ignorer",
    "results.title": "Résultats de l’aperçu",
    "results.empty": "Aucun message ne correspond aux filtres.",
    "results.selected": "{n} sélectionné(s) sur {total}",
    "results.more": "… et {n} autre(s) (tous inclus dans la sélection)",
    "results.running": "Recherche en cours, les résultats arrivent…",
    "results.hint": "Rien n’a été supprimé. Décoche ce que tu veux garder, puis supprime la sélection.",
    "pkg.intro": "Le package de données de Discord contient l’ID de chaque message que tu as envoyé, y compris dans des conversations fermées ou des serveurs oubliés. C’est la méthode la plus complète.",
    "pkg.howTo": "Comment l’obtenir",
    "pkg.step1": "Paramètres utilisateur → Données et confidentialité",
    "pkg.step2": "« Demander toutes mes données » (coche au moins « Messages »)",
    "pkg.step3": "Discord t’envoie un lien par e-mail sous quelques jours : télécharge le .zip",
    "pkg.chooseZip": "Choisir le fichier .zip",
    "pkg.chooseFolder": "ou le dossier extrait",
    "pkg.local": "Le fichier est lu localement dans ton navigateur, rien n’est envoyé ailleurs.",
    "pkg.parsing": "Lecture du package…",
    "pkg.error": "Impossible de lire ce fichier : {error}",
    "pkg.noMessages": "Aucun message trouvé. As-tu coché « Messages » lors de la demande ?",
    "pkg.summary": "{channels} conversations · {messages} messages",
    "pkg.kind.all": "Tout",
    "pkg.kind.dm": "MP",
    "pkg.kind.group": "Groupes",
    "pkg.kind.guild": "Serveurs",
    "pkg.kind.unknown": "Autre",
    "pkg.matching": "{n} message(s) sélectionné(s) correspondent aux filtres",
    "pkg.filtersNote": "Les filtres de l’onglet Nettoyage (texte, regex, période, contient / exclure, épinglés) s’appliquent aussi ici.",
    "pkg.change": "Changer de package",
    "pkg.indexOnly": "index seul",
    "pkg.colName": "Conversation",
    "pkg.colTotal": "Total",
    "archive.desc": "Copie des messages supprimés pendant cette session. Elle n’est pas sauvegardée : exporte-la avant de recharger Discord.",
    "archive.disabled": "L’archivage est désactivé (Paramètres → Sécurité).",
    "archive.empty": "Rien pour l’instant.",
    "archive.search": "Rechercher dans l’archive…",
    "archive.count": "{n} message(s)",
    "archive.showMore": "Afficher plus",
    "logs.empty": "Le journal est vide.",
    "logs.autoscroll": "Défilement auto",
    "level.debug": "Détails",
    "level.info": "Infos",
    "level.success": "Succès",
    "level.warn": "Alertes",
    "level.error": "Erreurs",
    "settings.general": "Général",
    "settings.lang": "Langue",
    "lang.auto": "Auto",
    "settings.theme": "Thème",
    "theme.auto": "Comme Discord",
    "theme.dark": "Sombre",
    "theme.light": "Clair",
    "settings.fab": "Bouton flottant",
    "fab.auto": "Auto",
    "fab.always": "Toujours",
    "fab.never": "Jamais",
    "settings.fabDesc": "En « Auto », il n’apparaît que si le bouton de la barre d’outils de Discord est introuvable.",
    "settings.shortcut": "Raccourci clavier",
    "settings.shortcutDesc": "Ouvrir / fermer la fenêtre",
    "settings.speed": "Vitesse",
    "speed.safe": "Prudente",
    "speed.balanced": "Équilibrée",
    "speed.fast": "Rapide",
    "speed.custom": "Perso",
    "settings.searchDelay": "Délai entre recherches",
    "settings.deleteDelay": "Délai entre suppressions",
    "settings.adaptive": "Vitesse adaptative",
    "settings.adaptiveDesc": "Ralentit tout seul quand Discord limite les requêtes, puis réaccélère.",
    "settings.maxAttempts": "Tentatives par message",
    "settings.emptyRetries": "Réessais sur page vide",
    "settings.speedWarning": "Aller trop vite multiplie les limitations et attire l’attention de Discord.",
    "settings.safety": "Sécurité & confidentialité",
    "settings.confirm": "Confirmer avant de supprimer",
    "settings.privacy": "Mode confidentialité",
    "settings.privacyDesc": "Floute contenus et noms (pratique en stream ou pour des captures).",
    "settings.archive": "Archiver les messages supprimés",
    "settings.archiveDesc": "Garde une copie en mémoire, exportable en JSON, CSV ou HTML.",
    "settings.end": "Fin de tâche",
    "settings.notify": "Notification du navigateur",
    "settings.notifyDesc": "Affichée si l’onglet Discord n’est pas au premier plan.",
    "settings.sound": "Son de fin",
    "settings.account": "Compte",
    "settings.token": "Token",
    "settings.redetect": "Re-détecter",
    "settings.manualToken": "Token manuel",
    "settings.manualTokenPh": "Colle ton token ici",
    "settings.manualTokenHint": "Seulement si la détection automatique échoue. Ne partage JAMAIS ton token : il donne un accès complet à ton compte. Il reste en mémoire et n’est jamais enregistré.",
    "settings.useToken": "Utiliser",
    "settings.forgetToken": "Oublier",
    "settings.about": "À propos",
    "settings.madeBy": "Créé par {author}",
    "settings.aboutDesc": "Réécriture complète et modernisée d’Undiscord (victornpb, licence MIT).",
    "settings.tos": "Automatiser un compte utilisateur est contraire aux conditions d’utilisation de Discord. Garde des délais raisonnables : tu restes responsable de l’usage de cet outil.",
    "settings.reset": "Réinitialiser les paramètres",
    "token.network": "détecté automatiquement",
    "token.webpack": "détecté via Discord",
    "token.storage": "détecté via le stockage local",
    "token.manual": "saisi manuellement",
    "toast.copied": "Copié dans le presse-papiers",
    "toast.tokenOk": "Token valide",
    "toast.tokenBad": "Ce texte ne ressemble pas à un token Discord.",
    "toast.tokenRejected": "Discord a refusé ce token.",
    "toast.noTarget": "Choisis au moins une cible.",
    "toast.noAccount": "Ton compte n’est pas encore chargé (token introuvable ?).",
    "toast.badRegex": "L’expression régulière est invalide.",
    "toast.badAuthor": "Aucun ID d’auteur valide.",
    "toast.historyGuild": "Le mode historique ne s’applique qu’aux salons : la recherche sera utilisée pour les serveurs.",
    "toast.busy": "Une opération est déjà en cours.",
    "toast.resetDone": "Paramètres réinitialisés.",
    "toast.nothingSelected": "Rien de sélectionné.",
    "log.start": "Début de la suppression ({jobs} cible(s)).",
    "log.previewStart": "Début de l’aperçu ({jobs} cible(s)) — rien ne sera supprimé.",
    "log.jobStart": "[{index}/{count}] {label}",
    "log.jobDone": "{label} — supprimés : {deleted}, trouvés : {matched}, échecs : {failed}, ignorés : {skipped}",
    "log.jobInaccessible": "{label} : inaccessible (salon supprimé, serveur quitté ou accès refusé), ignoré.",
    "log.jobFailed": "{label} : erreur — {error}",
    "log.unauthorized": "Discord refuse le token (401). Recharge la page ou saisis-le manuellement dans Paramètres.",
    "log.rateLimited": "Limité par Discord : pause de {seconds} s (délai ajusté à {delay} ms).",
    "log.rateLimitedGlobal": "Limitation globale de Discord : pause de {seconds} s.",
    "log.indexing": "Discord indexe encore ces messages, nouvel essai dans {seconds} s…",
    "log.retry": "Problème réseau ({reason}), tentative {attempt} dans {seconds} s…",
    "log.emptyPage": "Page vide alors qu’il reste des messages, nouvel essai {attempt}/{max}…",
    "log.paused": "En pause.",
    "log.resumed": "Reprise.",
    "log.stopped": "Arrêté.",
    "log.unexpected": "Erreur inattendue : {error}",
    "log.finished": "Terminé — {deleted} supprimé(s), {failed} échec(s), {skipped} ignoré(s).",
    "log.previewFinished": "Aperçu terminé — {matched} message(s) trouvé(s).",
    "log.threadArchived": "Message {id} dans un fil archivé : suppression impossible.",
    "log.forbidden": "Accès refusé pour le message {id}.",
    "log.deleteFailed": "Impossible de supprimer le message {id}.",
    "log.pinsUnavailable": "Impossible de lire les épinglés de {label}.",
    "log.message": "{where} · {date} · {content}",
    "log.tokenFound": "Token {source}.",
    "log.loggedIn": "Connecté en tant que {name}.",
    "log.packageLoaded": "Package chargé : {channels} conversations, {messages} messages.",
    "log.ready": "{brand} v{version} prêt. Raccourci : {shortcut}.",
    "target.channels": "Salons du serveur",
    "target.excludedCount": "{n} salon(s) épargné(s)",
    "target.allChannels": "Tous les salons",
    "target.channelsHint": "Décoche les salons à épargner : leurs fils de discussion sont épargnés aussi. Ce choix est mémorisé pour ce serveur.",
    "target.noCategory": "Sans catégorie",
    "target.loadChannelsError": "Impossible de charger les salons de ce serveur.",
    "target.excludedShort": "−{n} salon(s)",
    "filters.relativeHint": "Recalculé à chaque lancement (idéal dans un préréglage).",
    "presets.title": "Préréglages",
    "presets.save": "Enregistrer",
    "presets.saveCurrent": "Enregistrer la configuration",
    "presets.namePh": "Nom du préréglage",
    "presets.empty": "Enregistre ta cible, tes filtres et ta méthode pour les réutiliser en un clic.",
    "presets.applied": "Préréglage « {name} » appliqué.",
    "presets.saved": "Préréglage « {name} » enregistré.",
    "presets.delete": "Supprimer ce préréglage"
  };

  // src/i18n/index.ts
  var dictionaries = { fr, en };
  var currentLang = y3("fr");
  function t4(key, params) {
    const dict = dictionaries[currentLang.value];
    let text = dict[key] ?? fr[key] ?? key;
    if (params) {
      text = text.replace(/\{(\w+)\}/g, (m3, k2) => params[k2] !== void 0 ? String(params[k2]) : m3);
    }
    return text;
  }
  var fmt = (n3) => n3.toLocaleString(currentLang.value);
  function detectLang() {
    const lang = document.documentElement.lang || navigator.language || "en";
    return lang.toLowerCase().startsWith("fr") ? "fr" : "en";
  }

  // src/platform/discordDom.ts
  function readLocation() {
    const m3 = /\/channels\/(@me|\d+)(?:\/(\d+))?/.exec(location.pathname);
    return m3 ? { guildId: m3[1], channelId: m3[2] ?? null } : { guildId: null, channelId: null };
  }
  function watchLocation(cb) {
    let last = "";
    const tick = () => {
      if (location.pathname !== last) {
        last = location.pathname;
        cb(readLocation());
      }
    };
    tick();
    const timer = setInterval(tick, 700);
    return () => clearInterval(timer);
  }
  var discordPrefersLight = () => document.documentElement.classList.contains("theme-light");
  function watchDiscordTheme(cb) {
    const obs = new MutationObserver(() => cb(discordPrefersLight()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    cb(discordPrefersLight());
    return () => obs.disconnect();
  }
  var TOOLBAR_SELECTORS = [
    'section[class*="title_"] [class^="toolbar_"]',
    'section[class*="title_"] [class*=" toolbar_"]',
    '[class^="toolbar_"]',
    '[class*=" toolbar_"]',
    '[class*="-toolbar"]',
    '[class*="toolbar-"]'
  ];
  function findToolbar() {
    for (const sel of TOOLBAR_SELECTORS) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.closest("#undiscord-remake")) continue;
        const r4 = el.getBoundingClientRect();
        if (r4.width > 0 && r4.height > 0 && r4.top >= 0 && r4.top < 140) return el;
      }
    }
    return null;
  }
  function keepInToolbar(el, onMounted) {
    let mounted = null;
    const check = () => {
      if (!el.isConnected || !el.parentElement?.matches(TOOLBAR_SELECTORS.join(","))) {
        const toolbar = findToolbar();
        if (toolbar) toolbar.prepend(el);
        else el.remove();
      }
      const now = el.isConnected;
      if (now !== mounted) {
        mounted = now;
        onMounted(now);
      }
    };
    check();
    const timer = setInterval(check, 1500);
    return () => {
      clearInterval(timer);
      el.remove();
    };
  }
  var globalStyle = null;
  function injectGlobalStyle(css) {
    if (!globalStyle) {
      globalStyle = document.createElement("style");
      globalStyle.id = "undiscord-remake-global";
      (document.head ?? document.documentElement).appendChild(globalStyle);
    }
    globalStyle.textContent = css;
  }
  var MESSAGE_SELECTOR = 'li[id^="chat-messages-"], [id^="chat-messages-"], [id^="message-content-"]';
  function pickMessage(bannerText, cancelText) {
    return new Promise((resolve) => {
      const root = document.documentElement;
      root.classList.add("udr-picking");
      const banner = document.createElement("div");
      banner.className = "udr-pick-banner";
      const label = document.createElement("span");
      label.textContent = bannerText;
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = cancelText;
      banner.append(label, cancel);
      document.body.appendChild(banner);
      const finish = (id) => {
        root.classList.remove("udr-picking");
        banner.remove();
        document.removeEventListener("click", onClick, true);
        document.removeEventListener("keydown", onKey, true);
        resolve(id);
      };
      const onClick = (e4) => {
        const target2 = e4.target;
        if (!target2) return;
        if (banner.contains(target2)) {
          if (target2 === cancel) finish(null);
          return;
        }
        const el = target2.closest?.(MESSAGE_SELECTOR);
        if (!el) return;
        e4.preventDefault();
        e4.stopPropagation();
        e4.stopImmediatePropagation();
        finish(/(\d{15,21})$/.exec(el.id)?.[1] ?? null);
      };
      const onKey = (e4) => {
        if (e4.key !== "Escape") return;
        e4.preventDefault();
        e4.stopPropagation();
        finish(null);
      };
      document.addEventListener("click", onClick, true);
      document.addEventListener("keydown", onKey, true);
    });
  }
  function shieldEventsFrom(isOurs) {
    const swallow = (e4) => {
      if (!isOurs(e4)) return;
      e4.stopImmediatePropagation();
    };
    const blockDrop = (e4) => {
      if (!isOurs(e4)) return;
      e4.preventDefault();
      e4.stopImmediatePropagation();
    };
    for (const type of ["paste", "copy", "cut"]) window.addEventListener(type, swallow, true);
    for (const type of ["dragenter", "dragover", "drop"]) window.addEventListener(type, blockDrop, true);
  }
  function stopBubblingFrom(host) {
    for (const type of ["keydown", "keyup", "keypress", "beforeinput", "input", "contextmenu"]) {
      host.addEventListener(type, (e4) => e4.stopPropagation());
    }
  }
  var PICKER_CSS = `
html.udr-picking li[id^="chat-messages-"] { cursor: crosshair !important; }
html.udr-picking li[id^="chat-messages-"]:hover {
  outline: 2px solid #5865f2 !important; outline-offset: -2px; border-radius: 6px;
  background: rgba(88, 101, 242, .12) !important;
}
.udr-pick-banner {
  position: fixed; top: 14px; left: 50%; transform: translateX(-50%); z-index: 2147483646;
  display: flex; gap: 12px; align-items: center; padding: 10px 12px 10px 16px;
  background: #5865f2; color: #fff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.35);
  font: 600 14px/1.3 "gg sans", "Noto Sans", system-ui, sans-serif;
}
.udr-pick-banner button {
  all: unset; cursor: pointer; padding: 6px 12px; border-radius: 8px; background: rgba(255,255,255,.18);
}
.udr-pick-banner button:hover { background: rgba(255,255,255,.3); }
`;

  // src/platform/storage.ts
  var PREFIX = "undiscord-remake:";
  var store = null;
  var memory = /* @__PURE__ */ new Map();
  function initStorage() {
    if (store) return;
    try {
      store = window.localStorage;
      store.getItem(`${PREFIX}probe`);
      return;
    } catch {
      store = null;
    }
    try {
      const frame = document.createElement("iframe");
      frame.style.display = "none";
      frame.setAttribute("aria-hidden", "true");
      (document.body ?? document.documentElement).appendChild(frame);
      store = frame.contentWindow?.localStorage ?? null;
    } catch {
      store = null;
    }
  }
  function readStorageRaw(key) {
    try {
      return store?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }
  function load(key, fallback) {
    try {
      const raw = store ? store.getItem(PREFIX + key) : memory.get(key) ?? null;
      if (raw == null) return fallback;
      const parsed = JSON.parse(raw);
      if (fallback && typeof fallback === "object" && !Array.isArray(fallback) && parsed && typeof parsed === "object") {
        return { ...fallback, ...parsed };
      }
      return parsed;
    } catch {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      const raw = JSON.stringify(value);
      if (store) store.setItem(PREFIX + key, raw);
      else memory.set(key, raw);
    } catch {
    }
  }
  function remove(key) {
    try {
      if (store) store.removeItem(PREFIX + key);
      else memory.delete(key);
    } catch {
    }
  }

  // src/platform/token.ts
  var TOKEN_RE = /^(mfa\.[\w-]{20,}|[\w-]{20,}\.[\w-]{4,}\.[\w-]{20,})$/;
  var looksLikeToken = (v4) => typeof v4 === "string" && TOKEN_RE.test(v4.trim());
  var captured = null;
  var listeners = /* @__PURE__ */ new Set();
  var nativeFetch = (input, init) => window.fetch(input, init);
  var isApiUrl = (url) => /\/api\/v\d+\//.test(url);
  function capture(token) {
    if (token === captured) return;
    captured = token;
    for (const l5 of listeners) l5(token);
  }
  function onTokenCaptured(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }
  function authFromHeaders(h5) {
    if (!h5) return null;
    if (h5 instanceof Headers) return h5.get("authorization");
    if (Array.isArray(h5)) return h5.find(([k2]) => k2.toLowerCase() === "authorization")?.[1] ?? null;
    for (const [k2, v4] of Object.entries(h5)) if (k2.toLowerCase() === "authorization") return v4;
    return null;
  }
  function installTokenCapture(win = window) {
    const flag2 = win;
    if (flag2.__undiscordRemakeHooked) return;
    flag2.__undiscordRemakeHooked = true;
    const proto = win.XMLHttpRequest.prototype;
    const open = proto.open;
    const setHeader = proto.setRequestHeader;
    proto.open = function(...args) {
      this.__udrUrl = String(args[1]);
      return open.apply(this, args);
    };
    proto.setRequestHeader = function(name, value) {
      try {
        if (name.toLowerCase() === "authorization" && isApiUrl(this.__udrUrl ?? "") && looksLikeToken(value)) capture(value);
      } catch {
      }
      return setHeader.call(this, name, value);
    };
    const originalFetch = win.fetch;
    nativeFetch = (input, init) => originalFetch.call(win, input, init);
    win.fetch = function(input, init) {
      try {
        const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        if (isApiUrl(url)) {
          const auth = authFromHeaders(init?.headers) ?? (input instanceof Request ? input.headers.get("authorization") : null);
          if (looksLikeToken(auth)) capture(auth);
        }
      } catch {
      }
      return originalFetch.call(win, input, init);
    };
  }
  function findTokenViaWebpack() {
    const chunk = window.webpackChunkdiscord_app;
    if (!Array.isArray(chunk)) return null;
    let req;
    try {
      chunk.push([[/* @__PURE__ */ Symbol("undiscord-remake")], {}, (r4) => {
        req = r4;
      }]);
      chunk.pop();
    } catch {
      return null;
    }
    for (const mod of Object.values(req?.c ?? {})) {
      const exp = mod?.exports;
      if (!exp || typeof exp !== "object" && typeof exp !== "function") continue;
      const candidates = [exp];
      try {
        for (const key of Object.keys(exp).slice(0, 40)) candidates.push(exp[key]);
      } catch {
      }
      for (const c4 of candidates) {
        try {
          const getToken = c4?.getToken;
          if (typeof getToken === "function") {
            const t5 = getToken.call(c4);
            if (looksLikeToken(t5)) return t5;
          }
        } catch {
        }
      }
    }
    return null;
  }
  function findTokenViaStorage() {
    try {
      const raw = readStorageRaw("token");
      if (!raw) return null;
      const t5 = JSON.parse(raw);
      return looksLikeToken(t5) ? t5 : null;
    } catch {
      return null;
    }
  }
  function resolveToken(manual) {
    if (manual && looksLikeToken(manual)) return { token: manual.trim(), source: "manual" };
    if (captured) return { token: captured, source: "network" };
    const fromWebpack = findTokenViaWebpack();
    if (fromWebpack) return { token: fromWebpack, source: "webpack" };
    const fromStorage = findTokenViaStorage();
    if (fromStorage) return { token: fromStorage, source: "storage" };
    return null;
  }

  // src/core/util.ts
  var AbortedError = class extends Error {
    constructor() {
      super("Aborted");
      this.name = "AbortError";
    }
  };
  var isAbortError = (err2) => err2 instanceof Error && (err2.name === "AbortError" || err2 instanceof AbortedError);
  function throwIfAborted(signal) {
    if (signal?.aborted) throw new AbortedError();
  }
  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(new AbortedError());
      if (ms <= 0) return resolve();
      const timer = setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);
        resolve();
      }, ms);
      const onAbort = () => {
        clearTimeout(timer);
        reject(new AbortedError());
      };
      signal?.addEventListener("abort", onAbort, { once: true });
    });
  }
  var clamp = (v4, min, max2) => Math.min(max2, Math.max(min, v4));
  function formatDuration(ms) {
    if (!Number.isFinite(ms) || ms < 0) return "—";
    const s4 = Math.round(ms / 1e3);
    const h5 = Math.floor(s4 / 3600);
    const m3 = Math.floor(s4 % 3600 / 60);
    const sec = s4 % 60;
    if (h5) return `${h5}h ${String(m3).padStart(2, "0")}m`;
    if (m3) return `${m3}m ${String(sec).padStart(2, "0")}s`;
    return `${sec}s`;
  }
  var escapeHtml = (s4) => s4.replace(/[&<>"']/g, (c4) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c4]);
  var csvCell = (v4) => {
    const s4 = String(v4 ?? "");
    return /[",\n\r;]/.test(s4) ? `"${s4.replace(/"/g, '""')}"` : s4;
  };
  function downloadFile(content, filename, type = "application/octet-stream") {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a4 = document.createElement("a");
    a4.href = url;
    a4.download = filename;
    a4.style.display = "none";
    document.body.appendChild(a4);
    a4.click();
    a4.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e4);
  }
  var timestampForFile = (d5 = /* @__PURE__ */ new Date()) => d5.toISOString().slice(0, 19).replace(/[:T]/g, "-");

  // src/core/api.ts
  var API_BASE = "https://discord.com/api/v9";
  var ErrorCode = {
    UNKNOWN_CHANNEL: 10003,
    UNKNOWN_MESSAGE: 10008,
    MISSING_ACCESS: 50001,
    MISSING_PERMISSIONS: 50013,
    SYSTEM_MESSAGE: 50021,
    THREAD_ARCHIVED: 50083
  };
  var DiscordApiError = class extends Error {
    constructor(status, code, message, body) {
      super(message);
      this.status = status;
      this.code = code;
      this.body = body;
      this.name = "DiscordApiError";
    }
    status;
    code;
    body;
  };
  function routeKey(method, path) {
    let seen = false;
    return `${method} ${path.replace(/\d{15,}/g, (id) => {
      if (seen) return ":id";
      seen = true;
      return id;
    })}`;
  }
  async function readJson(resp) {
    const text = await resp.text().catch(() => "");
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return { message: text.slice(0, 200) };
    }
  }
  var DiscordApi = class {
    constructor(cfg) {
      this.cfg = cfg;
      this.fetchImpl = cfg.fetch ?? ((input, init) => window.fetch(input, init));
      this.sleep = cfg.sleep ?? sleep;
      this.now = cfg.now ?? Date.now;
    }
    cfg;
    stats = { requests: 0, rateLimits: 0, rateLimitedMs: 0, lastPing: 0, avgPing: 0 };
    bucketUntil = /* @__PURE__ */ new Map();
    globalUntil = 0;
    fetchImpl;
    sleep;
    now;
    set hooks(h5) {
      this.cfg.hooks = h5;
    }
    buildUrl(path, query) {
      const params = new URLSearchParams();
      if (Array.isArray(query)) for (const [k2, v4] of query) params.append(k2, v4);
      else if (query) {
        for (const [k2, v4] of Object.entries(query)) if (v4 !== void 0) params.append(k2, String(v4));
      }
      const qs = params.toString();
      return `${this.cfg.baseUrl ?? API_BASE}${path}${qs ? `?${qs}` : ""}`;
    }
    async waitForBucket(route, signal) {
      const until = Math.max(this.globalUntil, this.bucketUntil.get(route) ?? 0);
      const wait = until - this.now();
      if (wait > 0) await this.sleep(wait, signal);
    }
    trackBucket(route, headers) {
      const remaining = headers.get("x-ratelimit-remaining");
      const resetAfter = Number(headers.get("x-ratelimit-reset-after"));
      if (remaining === "0" && resetAfter > 0) {
        this.bucketUntil.set(route, this.now() + resetAfter * 1e3 + 50);
      }
    }
    recordPing(ms) {
      this.stats.lastPing = ms;
      this.stats.avgPing = this.stats.avgPing ? Math.round(this.stats.avgPing * 0.85 + ms * 0.15) : ms;
    }
    async request(method, path, opts = {}) {
      const url = this.buildUrl(path, opts.query);
      const route = routeKey(method, path);
      const maxRetries = opts.maxRetries ?? 4;
      const hooks = () => this.cfg.hooks;
      let failures = 0;
      let rateLimits = 0;
      let indexing = 0;
      for (; ; ) {
        throwIfAborted(opts.signal);
        await this.waitForBucket(route, opts.signal);
        const token = this.cfg.getToken();
        if (!token) throw new DiscordApiError(401, void 0, "NO_TOKEN");
        const headers = { Authorization: token };
        if (opts.body !== void 0) headers["Content-Type"] = "application/json";
        const started = this.now();
        let resp;
        try {
          resp = await this.fetchImpl(url, {
            method,
            headers,
            body: opts.body !== void 0 ? JSON.stringify(opts.body) : void 0,
            signal: opts.signal
          });
        } catch (err2) {
          if (isAbortError(err2) || opts.signal?.aborted) throw err2;
          if (++failures > maxRetries) {
            throw new DiscordApiError(0, void 0, `Network error: ${err2.message}`);
          }
          const wait = 1e3 * 2 ** failures;
          hooks()?.onRetry?.("network", failures, wait);
          await this.sleep(wait, opts.signal);
          continue;
        }
        this.stats.requests++;
        this.recordPing(this.now() - started);
        this.trackBucket(route, resp.headers);
        if (resp.status === 429) {
          const body2 = await readJson(resp);
          const retryAfter = Number(body2?.retry_after ?? resp.headers.get("retry-after") ?? 1) || 1;
          const waitMs = Math.ceil(retryAfter * 1e3) + 250;
          const global = !!body2?.global;
          if (global) this.globalUntil = this.now() + waitMs;
          else this.bucketUntil.set(route, this.now() + waitMs);
          this.stats.rateLimits++;
          this.stats.rateLimitedMs += waitMs;
          hooks()?.onRateLimit?.({ waitMs, global, route });
          if (++rateLimits > 25) throw new DiscordApiError(429, void 0, "Rate limited too many times in a row");
          continue;
        }
        if (resp.status === 202) {
          const body2 = await readJson(resp);
          const waitMs = Math.max(1500, Math.ceil(Number(body2?.retry_after ?? 2) * 1e3));
          if (++indexing > 40) throw new DiscordApiError(202, body2?.code, "Search index not available");
          hooks()?.onIndexing?.(waitMs);
          await this.sleep(waitMs, opts.signal);
          continue;
        }
        if (resp.status >= 500) {
          if (++failures > maxRetries) throw new DiscordApiError(resp.status, void 0, `Server error ${resp.status}`);
          const wait = 1e3 * 2 ** failures;
          hooks()?.onRetry?.(`HTTP ${resp.status}`, failures, wait);
          await this.sleep(wait, opts.signal);
          continue;
        }
        if (resp.status === 204) return void 0;
        const body = await readJson(resp);
        if (!resp.ok) {
          throw new DiscordApiError(resp.status, body?.code, body?.message ?? `HTTP ${resp.status}`, body);
        }
        return body;
      }
    }
    // ---- endpoints ---------------------------------------------------------
    me(signal) {
      return this.request("GET", "/users/@me", { signal });
    }
    guilds(signal) {
      return this.request("GET", "/users/@me/guilds", { signal, query: { with_counts: false } });
    }
    guildChannels(guildId, signal) {
      return this.request("GET", `/guilds/${guildId}/channels`, { signal });
    }
    dmChannels(signal) {
      return this.request("GET", "/users/@me/channels", { signal });
    }
    channel(id, signal) {
      return this.request("GET", `/channels/${id}`, { signal, maxRetries: 1 });
    }
    /** Guild-wide search when `guildId` is a real guild, otherwise a single (DM) channel search. */
    search(scope, query, signal) {
      const path = scope.guildId && scope.guildId !== "@me" ? `/guilds/${scope.guildId}/messages/search` : `/channels/${scope.channelId}/messages/search`;
      return this.request("GET", path, { query, signal });
    }
    messages(channelId, opts, signal) {
      return this.request("GET", `/channels/${channelId}/messages`, {
        signal,
        query: { before: opts.before, limit: opts.limit ?? 100 }
      });
    }
    deleteMessage(channelId, messageId, signal) {
      return this.request("DELETE", `/channels/${channelId}/messages/${messageId}`, { signal, maxRetries: 2 });
    }
    /** Ids of pinned messages. Uses the paginated endpoint, falling back to the legacy one. */
    async pinnedIds(channelId, signal) {
      const ids = /* @__PURE__ */ new Set();
      try {
        let before;
        for (let page = 0; page < 40; page++) {
          const res = await this.request(
            "GET",
            `/channels/${channelId}/messages/pins`,
            { signal, query: { limit: 50, before } }
          );
          for (const item of res.items ?? []) ids.add(item.message.id);
          if (!res.has_more || !res.items?.length) break;
          before = res.items[res.items.length - 1].pinned_at;
        }
        return ids;
      } catch (err2) {
        if (isAbortError(err2)) throw err2;
        const legacy = await this.request("GET", `/channels/${channelId}/pins`, { signal });
        for (const m3 of legacy ?? []) ids.add(m3.id);
        return ids;
      }
    }
  };

  // src/core/archive.ts
  function archiveToJson(records, credit) {
    return JSON.stringify({
      exportedWith: credit ? `${credit.text} (${credit.url})` : void 0,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      count: records.length,
      messages: records
    }, null, 2);
  }
  function archiveToCsv(records) {
    const header = ["id", "timestamp", "where", "channel_id", "guild_id", "author", "content", "attachments", "status"];
    const rows = records.map((r4) => [
      r4.id,
      r4.timestamp,
      r4.where,
      r4.channelId,
      r4.guildId ?? "",
      r4.author,
      r4.content,
      r4.attachments.map((a4) => a4.url).join(" "),
      r4.status
    ].map(csvCell).join(","));
    return `\uFEFF${header.join(",")}
${rows.join("\n")}`;
  }
  function archiveToHtml(records, title, credit) {
    const groups = /* @__PURE__ */ new Map();
    for (const r4 of records) {
      const list = groups.get(r4.where) ?? [];
      list.push(r4);
      groups.set(r4.where, list);
    }
    const sections = [...groups].map(([where, list]) => {
      const items = [...list].sort((a4, b5) => a4.timestamp.localeCompare(b5.timestamp)).map((r4) => {
        const atts = r4.attachments.map((a4) => `<a href="${escapeHtml(a4.url)}" target="_blank" rel="noopener">📎 ${escapeHtml(a4.filename)}</a>`).join(" ");
        return `<div class="msg"><time>${escapeHtml(new Date(r4.timestamp).toLocaleString())}</time>` + (r4.author ? `<b>${escapeHtml(r4.author)}</b>` : "") + `<p>${escapeHtml(r4.content).replace(/\n/g, "<br>") || "<i>(vide)</i>"}</p>${atts ? `<div class="att">${atts}</div>` : ""}</div>`;
      }).join("\n");
      return `<section><h2>${escapeHtml(where)} <small>${list.length}</small></h2>${items}</section>`;
    }).join("\n");
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><style>
body{margin:0;background:#1e1f22;color:#dbdee1;font:15px/1.45 system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:24px 16px}h1{color:#fff;font-size:22px}
h2{color:#fff;font-size:16px;margin:28px 0 8px;border-bottom:1px solid #3f4147;padding-bottom:6px}
small{color:#949ba4;font-weight:400}.msg{padding:8px 12px;border-radius:8px}.msg:hover{background:#2b2d31}
time{color:#949ba4;font-size:12px;margin-right:8px}b{color:#fff}p{margin:2px 0;white-space:pre-wrap;word-wrap:break-word}
a{color:#00a8fc}.att{font-size:13px}footer{margin-top:40px;padding-top:14px;border-top:1px solid #3f4147;color:#949ba4;font-size:13px}
</style></head><body><main><h1>${escapeHtml(title)}</h1><p>${records.length} messages · ${escapeHtml((/* @__PURE__ */ new Date()).toLocaleString())}</p>
${sections}${credit ? `<footer>Export : <a href="${escapeHtml(credit.url)}" target="_blank" rel="noopener">${escapeHtml(credit.text)}</a></footer>` : ""}</main></body></html>`;
  }

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b5 = new u16(31);
    for (var i5 = 0; i5 < 31; ++i5) {
      b5[i5] = start += 1 << eb[i5 - 1];
    }
    var r4 = new i32(b5[30]);
    for (var i5 = 1; i5 < 30; ++i5) {
      for (var j3 = b5[i5]; j3 < b5[i5 + 1]; ++j3) {
        r4[j3] = j3 - b5[i5] << 5 | i5;
      }
    }
    return { b: b5, r: r4 };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i4 = 0; i4 < 32768; ++i4) {
    x4 = (i4 & 43690) >> 1 | (i4 & 21845) << 1;
    x4 = (x4 & 52428) >> 2 | (x4 & 13107) << 2;
    x4 = (x4 & 61680) >> 4 | (x4 & 3855) << 4;
    rev[i4] = ((x4 & 65280) >> 8 | (x4 & 255) << 8) >> 1;
  }
  var x4;
  var i4;
  var hMap = (function(cd, mb, r4) {
    var s4 = cd.length;
    var i5 = 0;
    var l5 = new u16(mb);
    for (; i5 < s4; ++i5) {
      if (cd[i5])
        ++l5[cd[i5] - 1];
    }
    var le = new u16(mb);
    for (i5 = 1; i5 < mb; ++i5) {
      le[i5] = le[i5 - 1] + l5[i5 - 1] << 1;
    }
    var co;
    if (r4) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i5 = 0; i5 < s4; ++i5) {
        if (cd[i5]) {
          var sv = i5 << 4 | cd[i5];
          var r_1 = mb - cd[i5];
          var v4 = le[cd[i5] - 1]++ << r_1;
          for (var m3 = v4 | (1 << r_1) - 1; v4 <= m3; ++v4) {
            co[rev[v4] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s4);
      for (i5 = 0; i5 < s4; ++i5) {
        if (cd[i5]) {
          co[i5] = rev[le[cd[i5] - 1]++] >> 15 - cd[i5];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i4 = 0; i4 < 144; ++i4)
    flt[i4] = 8;
  var i4;
  for (i4 = 144; i4 < 256; ++i4)
    flt[i4] = 9;
  var i4;
  for (i4 = 256; i4 < 280; ++i4)
    flt[i4] = 7;
  var i4;
  for (i4 = 280; i4 < 288; ++i4)
    flt[i4] = 8;
  var i4;
  var fdt = new u8(32);
  for (i4 = 0; i4 < 32; ++i4)
    fdt[i4] = 5;
  var i4;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a4) {
    var m3 = a4[0];
    for (var i5 = 1; i5 < a4.length; ++i5) {
      if (a4[i5] > m3)
        m3 = a4[i5];
    }
    return m3;
  };
  var bits = function(d5, p5, m3) {
    var o5 = p5 / 8 | 0;
    return (d5[o5] | d5[o5 + 1] << 8) >> (p5 & 7) & m3;
  };
  var bits16 = function(d5, p5) {
    var o5 = p5 / 8 | 0;
    return (d5[o5] | d5[o5 + 1] << 8 | d5[o5 + 2] << 16) >> (p5 & 7);
  };
  var shft = function(p5) {
    return (p5 + 7) / 8 | 0;
  };
  var slc = function(v4, s4, e4) {
    if (s4 == null || s4 < 0)
      s4 = 0;
    if (e4 == null || e4 > v4.length)
      e4 = v4.length;
    return new u8(v4.subarray(s4, e4));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    // determined by compression function
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e4 = new Error(msg || ec[ind]);
    e4.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e4, err);
    if (!nt)
      throw e4;
    return e4;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l6) {
      var bl = buf.length;
      if (l6 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l6));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s4 = shft(pos) + 4, l5 = dat[s4 - 4] | dat[s4 - 3] << 8, t5 = s4 + l5;
          if (t5 > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l5);
          buf.set(dat.subarray(s4, t5), bt);
          st.b = bt += l5, st.p = pos = t5 * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i5 = 0; i5 < hcLen; ++i5) {
            clt[clim[i5]] = bits(dat, pos + i5 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i5 = 0; i5 < tl; ) {
            var r4 = clm[bits(dat, pos, clbmsk)];
            pos += r4 & 15;
            var s4 = r4 >> 4;
            if (s4 < 16) {
              ldt[i5++] = s4;
            } else {
              var c4 = 0, n3 = 0;
              if (s4 == 16)
                n3 = 3 + bits(dat, pos, 3), pos += 2, c4 = ldt[i5 - 1];
              else if (s4 == 17)
                n3 = 3 + bits(dat, pos, 7), pos += 3;
              else if (s4 == 18)
                n3 = 11 + bits(dat, pos, 127), pos += 7;
              while (n3--)
                ldt[i5++] = c4;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c4 = lm[bits16(dat, pos) & lms], sym = c4 >> 4;
        pos += c4 & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c4)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i5 = sym - 257, b5 = fleb[i5];
            add = bits(dat, pos, (1 << b5) - 1) + fl[i5];
            pos += b5;
          }
          var d5 = dm[bits16(dat, pos) & dms], dsym = d5 >> 4;
          if (!d5)
            err(3);
          pos += d5 & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b5 = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b5) - 1, pos += b5;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var b22 = function(d5, b5) {
    return d5[b5] | d5[b5 + 1] << 8;
  };
  var b42 = function(d5, b5) {
    return (d5[b5] | d5[b5 + 1] << 8 | d5[b5 + 2] << 16 | d5[b5 + 3] << 24) >>> 0;
  };
  var b8 = function(d5, b5) {
    return b42(d5, b5) + b42(d5, b5 + 4) * 4294967296;
  };
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e4) {
  }
  var dutf8 = function(d5) {
    for (var r4 = "", i5 = 0; ; ) {
      var c4 = d5[i5++];
      var eb = (c4 > 127) + (c4 > 223) + (c4 > 239);
      if (i5 + eb > d5.length)
        return { s: r4, r: slc(d5, i5 - 1) };
      if (!eb)
        r4 += String.fromCharCode(c4);
      else if (eb == 3) {
        c4 = ((c4 & 15) << 18 | (d5[i5++] & 63) << 12 | (d5[i5++] & 63) << 6 | d5[i5++] & 63) - 65536, r4 += String.fromCharCode(55296 | c4 >> 10, 56320 | c4 & 1023);
      } else if (eb & 1)
        r4 += String.fromCharCode((c4 & 31) << 6 | d5[i5++] & 63);
      else
        r4 += String.fromCharCode((c4 & 15) << 12 | (d5[i5++] & 63) << 6 | d5[i5++] & 63);
    }
  };
  function strFromU8(dat, latin1) {
    if (latin1) {
      var r4 = "";
      for (var i5 = 0; i5 < dat.length; i5 += 16384)
        r4 += String.fromCharCode.apply(null, dat.subarray(i5, i5 + 16384));
      return r4;
    } else if (td) {
      return td.decode(dat);
    } else {
      var _a2 = dutf8(dat), s4 = _a2.s, r4 = _a2.r;
      if (r4.length)
        err(8);
      return s4;
    }
  }
  var slzh = function(d5, b5) {
    return b5 + 30 + b22(d5, b5 + 26) + b22(d5, b5 + 28);
  };
  var zh = function(d5, b5, z3) {
    var fnl = b22(d5, b5 + 28), efl = b22(d5, b5 + 30), fn = strFromU8(d5.subarray(b5 + 46, b5 + 46 + fnl), !(b22(d5, b5 + 8) & 2048)), es = b5 + 46 + fnl;
    var _a2 = z64hs(d5, es, efl, z3, b42(d5, b5 + 20), b42(d5, b5 + 24), b42(d5, b5 + 42)), sc = _a2[0], su = _a2[1], off = _a2[2];
    return [b22(d5, b5 + 10), sc, su, fn, es + efl + b22(d5, b5 + 32), off];
  };
  var z64hs = function(d5, b5, l5, z3, sc, su, off) {
    var nsc = sc == 4294967295, nsu = su == 4294967295, noff = off == 4294967295, e4 = b5 + l5;
    var nf = nsc + nsu + noff;
    if (z3 && nf) {
      for (; b5 + 4 < e4; b5 += 4 + b22(d5, b5 + 2)) {
        if (b22(d5, b5) == 1) {
          return [
            nsc ? b8(d5, b5 + 4 + 8 * nsu) : sc,
            nsu ? b8(d5, b5 + 4) : su,
            noff ? b8(d5, b5 + 4 + 8 * (nsu + nsc)) : off,
            1
          ];
        }
      }
      if (z3 < 2)
        err(13);
    }
    return [sc, su, off, 0];
  };
  function unzipSync(data, opts) {
    var files = {};
    var e4 = data.length - 22;
    for (; b42(data, e4) != 101010256; --e4) {
      if (!e4 || data.length - e4 > 65558)
        err(13);
    }
    ;
    var c4 = b22(data, e4 + 8);
    if (!c4)
      return {};
    var o5 = b42(data, e4 + 16);
    var z3 = b42(data, e4 - 20) == 117853008;
    if (z3) {
      var ze = b42(data, e4 - 12);
      z3 = b42(data, ze) == 101075792;
      if (z3) {
        c4 = b42(data, ze + 32);
        o5 = b42(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    for (var i5 = 0; i5 < c4; ++i5) {
      var _a2 = zh(data, o5, z3), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b5 = slzh(data, off);
      o5 = no;
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_2
      })) {
        if (!c_2)
          files[fn] = slc(data, b5, b5 + sc);
        else if (c_2 == 8)
          files[fn] = inflateSync(data.subarray(b5, b5 + sc), { out: new u8(su) });
        else
          err(14, "unknown compression type " + c_2);
      }
    }
    return files;
  }

  // src/core/snowflake.ts
  var DISCORD_EPOCH = 1420070400000n;
  function isSnowflake(value) {
    return typeof value === "string" && /^\d{15,21}$/.test(value);
  }
  function dateToSnowflake(date) {
    const ms = BigInt(new Date(date).getTime());
    if (ms < DISCORD_EPOCH) return "0";
    return (ms - DISCORD_EPOCH << 22n).toString();
  }
  function snowflakeToDate(id) {
    return new Date(Number((BigInt(id) >> 22n) + DISCORD_EPOCH));
  }
  function compareSnowflakes(a4, b5) {
    const x5 = BigInt(a4);
    const y5 = BigInt(b5);
    return x5 < y5 ? -1 : x5 > y5 ? 1 : 0;
  }
  function minSnowflake(ids) {
    return ids.reduce((min, id) => compareSnowflakes(id, min) < 0 ? id : min);
  }
  function maxSnowflake(ids) {
    return ids.reduce((max2, id) => compareSnowflakes(id, max2) > 0 ? id : max2);
  }
  function sortNewestFirst(items) {
    return [...items].sort((a4, b5) => compareSnowflakes(b5.id, a4.id));
  }

  // src/core/datapackage.ts
  var quoteBigIds = (text) => text.replace(/("(?:id|ID|Id|channel_id|guild_id)"\s*:\s*)(\d{15,})/g, '$1"$2"');
  var stripBom = (s4) => s4.charCodeAt(0) === 65279 ? s4.slice(1) : s4;
  function parseJson(text) {
    try {
      return JSON.parse(quoteBigIds(stripBom(text)));
    } catch {
      return null;
    }
  }
  function parseCsv(text) {
    const src = stripBom(text);
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    for (let i5 = 0; i5 < src.length; i5++) {
      const c4 = src[i5];
      if (quoted) {
        if (c4 === '"') {
          if (src[i5 + 1] === '"') {
            field += '"';
            i5++;
          } else quoted = false;
        } else field += c4;
      } else if (c4 === '"') quoted = true;
      else if (c4 === ",") {
        row.push(field);
        field = "";
      } else if (c4 === "\n" || c4 === "\r") {
        if (c4 === "\r" && src[i5 + 1] === "\n") i5++;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else field += c4;
    }
    if (field || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }
  function lowerKeys(obj) {
    const out = {};
    for (const [k2, v4] of Object.entries(obj)) out[k2.toLowerCase()] = v4;
    return out;
  }
  function toMessage(raw) {
    const r4 = lowerKeys(raw);
    const id = String(r4.id ?? "");
    if (!isSnowflake(id)) return null;
    return {
      id,
      timestamp: r4.timestamp ? String(r4.timestamp) : void 0,
      content: r4.contents != null ? String(r4.contents) : r4.content != null ? String(r4.content) : "",
      attachments: r4.attachments ? String(r4.attachments) : ""
    };
  }
  function parseMessagesJson(text) {
    const data = parseJson(text);
    if (!Array.isArray(data)) return [];
    return data.map((m3) => m3 && typeof m3 === "object" ? toMessage(m3) : null).filter((m3) => !!m3);
  }
  function parseMessagesCsv(text) {
    const rows = parseCsv(text).filter((r4) => r4.length > 1 || r4[0]);
    if (!rows.length) return [];
    const header = rows[0].map((h5) => h5.trim().toLowerCase());
    const col = (name) => header.indexOf(name);
    const [idCol, tsCol, contentCol, attCol] = [col("id"), col("timestamp"), col("contents"), col("attachments")];
    if (idCol < 0) return [];
    return rows.slice(1).map((r4) => toMessage({
      id: r4[idCol],
      timestamp: tsCol >= 0 ? r4[tsCol] : void 0,
      contents: contentCol >= 0 ? r4[contentCol] : "",
      attachments: attCol >= 0 ? r4[attCol] : ""
    })).filter((m3) => !!m3);
  }
  function channelKind(info) {
    if (!info) return "unknown";
    if (info.guild) return "guild";
    const t5 = info.type;
    if (t5 === 1 || t5 === "DM") return "dm";
    if (t5 === 3 || t5 === "GROUP_DM") return "group";
    if (typeof t5 === "number" || typeof t5 === "string") return "guild";
    return "unknown";
  }
  var CHANNEL_FILE_RE = /(?:^|\/)messages\/c?(\d{15,21})\/(channel\.json|messages\.json|messages\.csv)$/i;
  var INDEX_RE = /(?:^|\/)messages\/index\.json$/i;
  function parsePackageFiles(files) {
    let index = {};
    const byId = /* @__PURE__ */ new Map();
    const entry = (id) => {
      let e4 = byId.get(id);
      if (!e4) byId.set(id, e4 = { messages: [] });
      return e4;
    };
    for (const [rawPath, text] of files) {
      const path = rawPath.replace(/\\/g, "/");
      if (INDEX_RE.test(path)) {
        index = parseJson(text) ?? {};
        continue;
      }
      const m3 = CHANNEL_FILE_RE.exec(path);
      if (!m3) continue;
      const [, id, file] = m3;
      const e4 = entry(id);
      const lower = file.toLowerCase();
      if (lower === "channel.json") e4.info = parseJson(text);
      else if (lower === "messages.json") e4.messages.push(...parseMessagesJson(text));
      else e4.messages.push(...parseMessagesCsv(text));
    }
    for (const id of Object.keys(index)) if (isSnowflake(id)) entry(id);
    const channels = [];
    for (const [id, e4] of byId) {
      const info = e4.info;
      const indexName = index[id];
      const kind = channelKind(info);
      channels.push({
        id,
        kind,
        name: (indexName && indexName !== "None" ? indexName : "") || info?.name || id,
        guildId: info?.guild?.id ? String(info.guild.id) : null,
        guildName: info?.guild?.name ?? null,
        messages: dedupe(e4.messages)
      });
    }
    channels.sort((a4, b5) => b5.messages.length - a4.messages.length);
    return { channels, totalMessages: channels.reduce((n3, c4) => n3 + c4.messages.length, 0) };
  }
  function dedupe(messages) {
    const seen = /* @__PURE__ */ new Set();
    return messages.filter((m3) => seen.has(m3.id) ? false : (seen.add(m3.id), true));
  }
  var WANTED_RE = /(?:^|\/)messages\/.*\.(json|csv)$/i;
  function parsePackageZip(data) {
    const files = unzipSync(data, { filter: (f4) => WANTED_RE.test(f4.name) });
    const map = /* @__PURE__ */ new Map();
    for (const [name, bytes] of Object.entries(files)) map.set(name, strFromU8(bytes));
    return parsePackageFiles(map);
  }
  async function parsePackageInput(files) {
    if (files.length === 1 && /\.zip$/i.test(files[0].name)) {
      return parsePackageZip(new Uint8Array(await files[0].arrayBuffer()));
    }
    const map = /* @__PURE__ */ new Map();
    for (const f4 of files) {
      const path = f4.webkitRelativePath || f4.name;
      const normalised = /index\.json$/i.test(path) && !/messages\//i.test(path) ? `messages/${path}` : path;
      if (WANTED_RE.test(normalised)) map.set(normalised, await f4.text());
    }
    return parsePackageFiles(map);
  }

  // src/core/filters.ts
  var HAS_KINDS = ["link", "file", "image", "video", "embed", "sound", "sticker", "poll"];
  function defaultFilter() {
    return {
      authorIds: [],
      content: "",
      pattern: "",
      has: [],
      exclude: [],
      pinned: "exclude",
      includeNsfw: true,
      afterId: "",
      beforeId: "",
      afterDate: "",
      beforeDate: ""
    };
  }
  var NON_DELETABLE_TYPES = /* @__PURE__ */ new Set([1, 2, 3, 4, 5, 21]);
  var isDeletableType = (type) => !NON_DELETABLE_TYPES.has(type);
  function computeBounds(f4) {
    const lows = [];
    const highs = [];
    if (isSnowflake(f4.afterId.trim())) lows.push(f4.afterId.trim());
    if (isSnowflake(f4.beforeId.trim())) highs.push(f4.beforeId.trim());
    if (f4.afterDate && !Number.isNaN(Date.parse(f4.afterDate))) lows.push(dateToSnowflake(f4.afterDate));
    if (f4.beforeDate && !Number.isNaN(Date.parse(f4.beforeDate))) highs.push(dateToSnowflake(f4.beforeDate));
    return {
      minId: lows.length ? lows.reduce((a4, b5) => compareSnowflakes(a4, b5) > 0 ? a4 : b5) : void 0,
      maxId: highs.length ? highs.reduce((a4, b5) => compareSnowflakes(a4, b5) < 0 ? a4 : b5) : void 0
    };
  }
  function inBounds(id, b5) {
    if (b5.minId && compareSnowflakes(id, b5.minId) <= 0) return false;
    if (b5.maxId && compareSnowflakes(id, b5.maxId) >= 0) return false;
    return true;
  }
  function compileRegex(pattern) {
    const src = pattern.trim();
    if (!src) return { regex: null };
    try {
      const literal = /^\/(.+)\/([dgimsuvy]*)$/s.exec(src);
      if (literal) return { regex: new RegExp(literal[1], literal[2].replace("g", "")) };
      return { regex: new RegExp(src, "i") };
    } catch (err2) {
      return { regex: null, error: err2.message };
    }
  }
  var normalizeText = (s4) => s4.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  var LINK_RE = /https?:\/\/\S+/i;
  var IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|bmp|heic)(\?|$)/i;
  var VIDEO_RE = /\.(mp4|mov|webm|mkv|avi|m4v)(\?|$)/i;
  var SOUND_RE = /\.(mp3|ogg|wav|flac|m4a|opus|aac)(\?|$)/i;
  function messageHas(m3, kind) {
    const atts = m3.attachments ?? [];
    const embeds = m3.embeds ?? [];
    const attIs = (mime, re) => atts.some((a4) => a4.content_type?.startsWith(mime) || re.test(a4.filename) || re.test(a4.url));
    switch (kind) {
      case "link":
        return LINK_RE.test(m3.content) || embeds.some((e4) => !!e4.url);
      case "embed":
        return embeds.length > 0;
      case "file":
        return atts.length > 0;
      case "image":
        return attIs("image/", IMAGE_RE) || embeds.some((e4) => e4.type === "image" || e4.type === "gifv");
      case "video":
        return attIs("video/", VIDEO_RE) || embeds.some((e4) => e4.type === "video");
      case "sound":
        return attIs("audio/", SOUND_RE);
      case "sticker":
        return (m3.sticker_items?.length ?? 0) > 0;
      case "poll":
        return !!m3.poll;
    }
  }
  function packageMessageHas(m3, kind) {
    const urls = (m3.attachments ?? "").split(/\s+/).filter(Boolean);
    switch (kind) {
      case "link":
        return LINK_RE.test(m3.content ?? "");
      case "file":
        return urls.length > 0;
      case "image":
        return urls.some((u5) => IMAGE_RE.test(u5));
      case "video":
        return urls.some((u5) => VIDEO_RE.test(u5));
      case "sound":
        return urls.some((u5) => SOUND_RE.test(u5));
      default:
        return null;
    }
  }
  function createMatcher(f4, opts) {
    const bounds = computeBounds(f4);
    const { regex } = compileRegex(f4.pattern);
    const content = normalizeText(f4.content.trim());
    const authors = new Set(f4.authorIds.filter(Boolean));
    return (m3) => {
      if (!isDeletableType(m3.type)) return "system";
      if (authors.size && !authors.has(m3.author?.id)) return "author";
      if (!inBounds(m3.id, bounds)) return "range";
      if (f4.pinned === "exclude" && m3.pinned) return "pinned";
      if (f4.pinned === "only" && !m3.pinned) return "pinned";
      if (!opts.serverFiltered) {
        if (content && !normalizeText(m3.content ?? "").includes(content)) return "content";
        if (f4.has.some((k2) => !messageHas(m3, k2))) return "has";
      }
      if (f4.exclude.some((k2) => messageHas(m3, k2))) return "exclude";
      if (regex && !regex.test(m3.content ?? "")) return "pattern";
      return null;
    };
  }
  function createPackageMatcher(f4) {
    const bounds = computeBounds(f4);
    const { regex } = compileRegex(f4.pattern);
    const content = normalizeText(f4.content.trim());
    return (m3) => {
      if (!inBounds(m3.id, bounds)) return "range";
      if (content && !normalizeText(m3.content ?? "").includes(content)) return "content";
      for (const k2 of f4.has) {
        const v4 = packageMessageHas(m3, k2);
        if (v4 === null) return "unverifiable";
        if (!v4) return "has";
      }
      if (f4.exclude.some((k2) => packageMessageHas(m3, k2) === true)) return "exclude";
      if (regex && !regex.test(m3.content ?? "")) return "pattern";
      return null;
    };
  }
  function buildSearchQuery(f4, cursor, channelId) {
    const q3 = [];
    for (const a4 of f4.authorIds.filter(Boolean)) q3.push(["author_id", a4]);
    if (channelId) q3.push(["channel_id", channelId]);
    if (f4.content.trim()) q3.push(["content", f4.content.trim()]);
    for (const h5 of f4.has) q3.push(["has", h5]);
    if (f4.pinned === "only") q3.push(["pinned", "true"]);
    if (cursor.minId) q3.push(["min_id", cursor.minId]);
    if (cursor.maxId) q3.push(["max_id", cursor.maxId]);
    if (f4.includeNsfw) q3.push(["include_nsfw", "true"]);
    q3.push(["sort_by", "timestamp"], ["sort_order", "desc"]);
    if (cursor.offset) q3.push(["offset", String(cursor.offset)]);
    return q3;
  }

  // src/core/engine.ts
  function createJob(target2, id) {
    return { id, target: target2, status: "pending", deleted: 0, failed: 0, skipped: 0, matched: 0, scanned: 0, total: null };
  }
  var jobProcessed = (j3) => j3.deleted + j3.failed + j3.skipped + j3.matched;
  var AdaptiveDelay = class {
    constructor(floor, adaptive, ceiling = 3e4) {
      this.floor = floor;
      this.adaptive = adaptive;
      this.ceiling = ceiling;
      this.current = floor;
    }
    floor;
    adaptive;
    ceiling;
    current;
    streak = 0;
    onSuccess() {
      if (!this.adaptive || this.current <= this.floor) return;
      if (++this.streak >= 15) {
        this.current = Math.max(this.floor, Math.round(this.current * 0.85));
        this.streak = 0;
      }
    }
    onRateLimit(waitMs) {
      this.streak = 0;
      if (!this.adaptive) return;
      this.current = clamp(Math.round(Math.max(this.current * 1.5, waitMs / 4)), this.floor, this.ceiling);
    }
  };
  function extractHits(res) {
    const out = [];
    for (const group of res?.messages ?? []) {
      if (!Array.isArray(group)) {
        if (group && typeof group === "object") out.push(group);
        continue;
      }
      if (!group.length) continue;
      out.push(group.length === 1 ? group[0] : group.find((m3) => m3.hit) ?? group[Math.floor(group.length / 2)]);
    }
    return out;
  }
  var fromDiscord = (m3) => ({
    id: m3.id,
    channelId: m3.channel_id,
    content: m3.content ?? "",
    timestamp: m3.timestamp,
    author: m3.author?.global_name || m3.author?.username || "",
    attachments: (m3.attachments ?? []).map((a4) => ({ filename: a4.filename, url: a4.url }))
  });
  var fromPackage = (m3, channelId) => ({
    id: m3.id,
    channelId,
    content: m3.content ?? "",
    // The snowflake carries the exact creation time; package timestamps have no timezone.
    timestamp: snowflakeToDate(m3.id).toISOString(),
    author: "",
    attachments: (m3.attachments ?? "").split(/\s+/).filter(Boolean).map((url) => ({ url, filename: decodeURIComponent(url.split("?")[0].split("/").pop() || "file") }))
  });
  async function countMessages(api2, target2, filter2, signal) {
    if (target2.kind === "ids") return target2.messages?.length ?? 0;
    const bounds = computeBounds(filter2);
    const channelParam = target2.kind === "channel" && target2.guildId && target2.guildId !== "@me" ? target2.channelId : void 0;
    const res = await api2.search(
      { guildId: target2.guildId, channelId: target2.channelId },
      buildSearchQuery(filter2, { minId: bounds.minId, maxId: bounds.maxId }, channelParam),
      signal
    );
    return res.total_results ?? 0;
  }
  var WipeEngine = class _WipeEngine {
    constructor(api2, events = {}, deps = {}) {
      this.api = api2;
      this.events = events;
      this.sleep = deps.sleep ?? sleep;
      this.now = deps.now ?? Date.now;
    }
    api;
    events;
    status = "idle";
    jobs = [];
    currentJob = null;
    lastRecord = null;
    stats = _WipeEngine.emptyStats();
    options;
    controller = null;
    pauseGate = null;
    releasePause = null;
    delay = new AdaptiveDelay(1e3, false);
    recent = [];
    activeSince = 0;
    activeAccum = 0;
    sleep;
    now;
    static emptyStats() {
      return {
        deleted: 0,
        failed: 0,
        skipped: 0,
        matched: 0,
        scanned: 0,
        rateLimits: 0,
        rateLimitedMs: 0,
        elapsedMs: 0,
        delay: 0,
        speedPerMin: 0,
        etaMs: null,
        total: null,
        processed: 0
      };
    }
    get isActive() {
      return this.status === "running" || this.status === "paused" || this.status === "stopping";
    }
    get dryRun() {
      return this.options?.dryRun ?? false;
    }
    // ---- control --------------------------------------------------------------
    pause() {
      if (this.status !== "running") return;
      this.status = "paused";
      this.activeAccum += this.now() - this.activeSince;
      this.pauseGate = new Promise((resolve) => this.releasePause = resolve);
      this.log("info", "log.paused");
      this.emit();
    }
    resume() {
      if (this.status !== "paused") return;
      this.status = "running";
      this.activeSince = this.now();
      this.releasePause?.();
      this.pauseGate = null;
      this.releasePause = null;
      this.log("info", "log.resumed");
      this.emit();
    }
    stop() {
      if (!this.isActive) return;
      if (this.status === "paused") this.activeSince = this.now();
      this.status = "stopping";
      this.controller?.abort();
      this.releasePause?.();
      this.pauseGate = null;
      this.emit();
    }
    /** Lets the UI change speed while a run is in progress. */
    updateSpeed(searchDelay, deleteDelay, adaptive) {
      if (!this.options) return;
      this.options.searchDelay = searchDelay;
      this.options.deleteDelay = deleteDelay;
      this.options.adaptive = adaptive;
      this.delay = new AdaptiveDelay(deleteDelay, adaptive);
      this.emit();
    }
    // ---- main loop ------------------------------------------------------------
    async run(jobs, options) {
      if (this.isActive) throw new Error("Engine already running");
      this.options = { ...options };
      this.jobs = jobs;
      this.stats = _WipeEngine.emptyStats();
      this.recent = [];
      this.lastRecord = null;
      this.activeAccum = 0;
      this.activeSince = this.now();
      this.delay = new AdaptiveDelay(options.deleteDelay, options.adaptive);
      this.controller = new AbortController();
      this.status = "running";
      this.api.hooks = {
        onRateLimit: (info) => {
          this.stats.rateLimits++;
          this.stats.rateLimitedMs += info.waitMs;
          this.delay.onRateLimit(info.waitMs);
          this.log("warn", info.global ? "log.rateLimitedGlobal" : "log.rateLimited", {
            seconds: (info.waitMs / 1e3).toFixed(1),
            delay: this.delay.current
          });
          this.emit();
        },
        onIndexing: (waitMs) => this.log("info", "log.indexing", { seconds: (waitMs / 1e3).toFixed(1) }),
        onRetry: (reason, attempt, waitMs) => this.log("warn", "log.retry", { reason, attempt, seconds: (waitMs / 1e3).toFixed(1) })
      };
      this.log("info", options.dryRun ? "log.previewStart" : "log.start", { jobs: jobs.length });
      this.emit();
      let fatal = false;
      try {
        for (const job of jobs) {
          if (job.status === "done" || job.status === "skipped") continue;
          await this.checkpoint();
          this.currentJob = job;
          job.status = "running";
          job.error = void 0;
          this.log("info", "log.jobStart", { label: job.target.label, index: jobs.indexOf(job) + 1, count: jobs.length });
          this.emit();
          try {
            await this.runJob(job);
            job.status = "done";
            this.log("success", "log.jobDone", {
              label: job.target.label,
              deleted: job.deleted,
              matched: job.matched,
              failed: job.failed,
              skipped: job.skipped
            });
          } catch (err2) {
            if (isAbortError(err2)) {
              job.status = "stopped";
              throw err2;
            }
            if (err2 instanceof DiscordApiError && err2.status === 401) {
              job.status = "failed";
              job.error = "unauthorized";
              fatal = true;
              this.log("error", "log.unauthorized");
              throw err2;
            }
            if (err2 instanceof DiscordApiError && (err2.status === 403 || err2.status === 404)) {
              job.status = "skipped";
              job.error = "inaccessible";
              this.log("warn", "log.jobInaccessible", { label: job.target.label });
            } else {
              job.status = "failed";
              job.error = err2.message;
              this.log("error", "log.jobFailed", { label: job.target.label, error: err2.message });
            }
          } finally {
            if (job.status !== "stopped") job.total = jobProcessed(job);
            this.events.onCheckpoint?.();
            this.emit();
          }
        }
      } catch (err2) {
        if (isAbortError(err2)) this.log("warn", "log.stopped");
        else if (!fatal) this.log("error", "log.unexpected", { error: err2.message });
      } finally {
        this.activeAccum += this.now() - this.activeSince;
        this.status = "finished";
        this.currentJob = null;
        this.api.hooks = void 0;
        this.computeStats();
        this.log("success", this.options.dryRun ? "log.previewFinished" : "log.finished", {
          deleted: this.stats.deleted,
          matched: this.stats.matched,
          failed: this.stats.failed,
          skipped: this.stats.skipped
        });
        this.events.onCheckpoint?.();
        this.emit();
      }
    }
    runJob(job) {
      switch (job.target.kind) {
        case "ids":
          return this.runIdsJob(job);
        case "guild":
          return this.runSearchJob(job);
        case "channel":
          return this.options.mode === "history" ? this.runHistoryJob(job) : this.runSearchJob(job);
      }
    }
    /** Search mode: walks Discord's search index from newest to oldest using a max_id cursor. */
    async runSearchJob(job) {
      const { filter: filter2 } = this.options;
      const t5 = job.target;
      if (t5.kind === "channel" && t5.guildId === null && t5.channelId) {
        try {
          const ch = await this.api.channel(t5.channelId, this.signal);
          t5.guildId = ch.guild_id ?? "@me";
        } catch (err2) {
          if (isAbortError(err2) || err2 instanceof DiscordApiError && [401, 403, 404].includes(err2.status)) throw err2;
          t5.guildId = "@me";
        }
      }
      const scope = { guildId: t5.guildId, channelId: t5.channelId };
      const channelParam = t5.kind === "channel" && t5.guildId && t5.guildId !== "@me" ? t5.channelId : void 0;
      const bounds = computeBounds(filter2);
      const matcher = createMatcher(filter2, { serverFiltered: true });
      const excluded = new Set(t5.kind === "guild" ? t5.excludeChannelIds ?? [] : []);
      const parents = /* @__PURE__ */ new Map();
      const seen = /* @__PURE__ */ new Set();
      let cursor = job.cursor ?? bounds.maxId;
      let emptyStreak = 0;
      for (; ; ) {
        await this.checkpoint();
        const res = await this.api.search(
          scope,
          buildSearchQuery(filter2, { minId: bounds.minId, maxId: cursor }, channelParam),
          this.signal
        );
        const hits = extractHits(res).filter((m3) => !cursor || compareSnowflakes(m3.id, cursor) < 0);
        job.total = jobProcessed(job) + (res.total_results ?? 0);
        this.emit();
        if (!hits.length) {
          if ((res.total_results ?? 0) > 0 && emptyStreak < this.options.emptyPageRetries) {
            emptyStreak++;
            this.log("warn", "log.emptyPage", { attempt: emptyStreak, max: this.options.emptyPageRetries });
            await this.wait(this.options.searchDelay * (emptyStreak + 1));
            continue;
          }
          break;
        }
        emptyStreak = 0;
        cursor = minSnowflake(hits.map((m3) => m3.id));
        for (const th of res.threads ?? []) parents.set(th.id, th.parent_id ?? null);
        for (const msg of sortNewestFirst(hits)) {
          if (seen.has(msg.id)) continue;
          seen.add(msg.id);
          job.scanned++;
          this.stats.scanned++;
          let reason = matcher(msg);
          if (!reason && excluded.size && await this.inExcludedChannel(msg.channel_id, excluded, parents)) reason = "channel";
          await this.handle(job, fromDiscord(msg), reason);
        }
        job.cursor = cursor;
        this.events.onCheckpoint?.();
        await this.wait(this.options.searchDelay);
      }
    }
    /** True when a message's channel, or the parent of its thread, is excluded. */
    async inExcludedChannel(channelId, excluded, parents) {
      if (excluded.has(channelId)) return true;
      if (!parents.has(channelId)) {
        try {
          parents.set(channelId, (await this.api.channel(channelId, this.signal)).parent_id ?? null);
        } catch (err2) {
          if (isAbortError(err2)) throw err2;
          parents.set(channelId, null);
        }
      }
      const parent = parents.get(channelId);
      return !!parent && excluded.has(parent);
    }
    /** History mode: reads the whole channel 100 messages at a time. Slow but independent of search. */
    async runHistoryJob(job) {
      const { filter: filter2 } = this.options;
      const channelId = job.target.channelId;
      const bounds = computeBounds(filter2);
      const matcher = createMatcher(filter2, { serverFiltered: false });
      const authors = new Set(filter2.authorIds.filter(Boolean));
      let before = job.cursor ?? bounds.maxId;
      if (job.total === null) {
        try {
          job.total = await countMessages(this.api, job.target, filter2, this.signal);
        } catch (err2) {
          if (isAbortError(err2)) throw err2;
        }
      }
      for (; ; ) {
        await this.checkpoint();
        const page = await this.api.messages(channelId, { before, limit: 100 }, this.signal);
        if (!page?.length) break;
        let reachedStart = false;
        for (const msg of sortNewestFirst(page)) {
          if (bounds.minId && compareSnowflakes(msg.id, bounds.minId) <= 0) {
            reachedStart = true;
            break;
          }
          job.scanned++;
          this.stats.scanned++;
          if (authors.size && !authors.has(msg.author?.id)) continue;
          await this.handle(job, fromDiscord(msg), matcher(msg));
        }
        before = minSnowflake(page.map((m3) => m3.id));
        job.cursor = before;
        if (job.total !== null && jobProcessed(job) > job.total) job.total = jobProcessed(job);
        this.events.onCheckpoint?.();
        this.emit();
        if (reachedStart || page.length < 100) break;
        await this.wait(Math.max(300, Math.round(this.options.searchDelay / 2)));
      }
    }
    /** Ids mode: deletes a known list of messages (data package or preview selection). */
    async runIdsJob(job) {
      const t5 = job.target;
      const channelId = t5.channelId;
      const messages = sortNewestFirst(t5.messages ?? []);
      const { filter: filter2 } = this.options;
      job.total = messages.length;
      this.emit();
      try {
        await this.api.channel(channelId, this.signal);
      } catch (err2) {
        if (isAbortError(err2) || err2 instanceof DiscordApiError && [401, 403, 404].includes(err2.status)) throw err2;
      }
      let pinned = null;
      if (t5.checkPins && filter2.pinned !== "include") {
        try {
          pinned = await this.api.pinnedIds(channelId, this.signal);
        } catch (err2) {
          if (isAbortError(err2)) throw err2;
          this.log("warn", "log.pinsUnavailable", { label: t5.label });
          if (filter2.pinned === "only") return;
        }
      }
      let forbiddenStreak = 0;
      for (let i5 = Number(job.cursor ?? 0) || 0; i5 < messages.length; i5++) {
        await this.checkpoint();
        const pm = messages[i5];
        job.scanned++;
        this.stats.scanned++;
        let reason = null;
        if (pinned) {
          const isPinned = pinned.has(pm.id);
          if (filter2.pinned === "exclude" && isPinned || filter2.pinned === "only" && !isPinned) reason = "pinned";
        }
        const outcome = await this.handle(job, fromPackage(pm, channelId), reason);
        job.cursor = String(i5 + 1);
        if (outcome === "forbidden") {
          if (++forbiddenStreak >= 3) throw new DiscordApiError(403, ErrorCode.MISSING_ACCESS, "Missing access");
        } else if (outcome) {
          forbiddenStreak = 0;
        }
        if (i5 % 25 === 24) this.events.onCheckpoint?.();
      }
    }
    // ---- per message ----------------------------------------------------------
    async handle(job, c4, reason) {
      const where = job.target.label;
      if (reason) {
        job.skipped++;
        this.stats.skipped++;
        this.tick();
        return null;
      }
      if (this.options.dryRun) {
        job.matched++;
        this.stats.matched++;
        this.record(c4, where, job.target.guildId, "matched");
        this.tick();
        return null;
      }
      await this.checkpoint();
      const outcome = await this.deleteOne(c4.channelId, c4.id);
      switch (outcome) {
        case "deleted":
          job.deleted++;
          this.stats.deleted++;
          this.record(c4, where, job.target.guildId, "deleted");
          break;
        case "gone":
        case "system":
          job.skipped++;
          this.stats.skipped++;
          break;
        case "archived":
          job.failed++;
          this.stats.failed++;
          this.log("warn", "log.threadArchived", { id: c4.id });
          break;
        case "forbidden":
          job.failed++;
          this.stats.failed++;
          this.log("warn", "log.forbidden", { id: c4.id });
          break;
        case "failed":
          job.failed++;
          this.stats.failed++;
          this.log("error", "log.deleteFailed", { id: c4.id });
          break;
      }
      this.tick();
      await this.wait(this.delay.current);
      return outcome;
    }
    async deleteOne(channelId, messageId) {
      for (let attempt = 1; ; attempt++) {
        try {
          await this.api.deleteMessage(channelId, messageId, this.signal);
          this.delay.onSuccess();
          return "deleted";
        } catch (err2) {
          if (isAbortError(err2)) throw err2;
          if (err2 instanceof DiscordApiError) {
            if (err2.status === 401) throw err2;
            if (err2.status === 404 || err2.code === ErrorCode.UNKNOWN_MESSAGE) return "gone";
            if (err2.code === ErrorCode.THREAD_ARCHIVED) return "archived";
            if (err2.code === ErrorCode.SYSTEM_MESSAGE) return "system";
            if (err2.status === 403) return "forbidden";
          }
          if (attempt >= this.options.maxAttempts) return "failed";
          await this.wait(this.delay.current * attempt);
        }
      }
    }
    record(c4, where, guildId, status) {
      const rec = {
        id: c4.id,
        channelId: c4.channelId,
        guildId: guildId && guildId !== "@me" ? guildId : null,
        where,
        author: c4.author,
        content: c4.content,
        timestamp: c4.timestamp,
        attachments: c4.attachments,
        status
      };
      this.lastRecord = rec;
      this.events.onMessage?.(rec);
    }
    // ---- plumbing -------------------------------------------------------------
    get signal() {
      return this.controller?.signal;
    }
    async checkpoint() {
      const signal = this.signal;
      if (signal?.aborted) throw new AbortedError();
      while (this.pauseGate) {
        await this.pauseGate;
        if (signal?.aborted) throw new AbortedError();
      }
    }
    wait(ms) {
      return this.sleep(ms, this.signal);
    }
    tick() {
      const now = this.now();
      this.recent.push(now);
      while (this.recent.length > 2 && now - this.recent[0] > 9e4) this.recent.shift();
      if (this.recent.length > 200) this.recent.shift();
      this.emit();
    }
    computeStats() {
      const s4 = this.stats;
      s4.processed = s4.deleted + s4.failed + s4.skipped + s4.matched;
      s4.elapsedMs = this.activeAccum + (this.status === "running" ? this.now() - this.activeSince : 0);
      s4.delay = this.delay.current;
      const r4 = this.recent;
      const span = r4.length >= 2 ? r4[r4.length - 1] - r4[0] : 0;
      s4.speedPerMin = span > 0 ? Math.round((r4.length - 1) / span * 6e4) : 0;
      const known = this.jobs.filter((j3) => j3.total !== null);
      s4.total = known.length ? known.reduce((sum, j3) => sum + (j3.total ?? 0), 0) : null;
      const remaining = s4.total !== null ? Math.max(0, s4.total - s4.processed) : null;
      s4.etaMs = remaining !== null && s4.speedPerMin > 0 ? remaining / s4.speedPerMin * 6e4 : null;
    }
    emit() {
      this.computeStats();
      this.events.onUpdate?.();
    }
    log(level, key, params) {
      this.events.onLog?.(level, key, params);
    }
  };

  // src/platform/notify.ts
  function playChime() {
    try {
      const Ctx = window.AudioContext ?? window.webkitAudioContext;
      const ctx = new Ctx();
      const notes = [660, 880, 1320];
      notes.forEach((freq, i5) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const t5 = ctx.currentTime + i5 * 0.12;
        gain.gain.setValueAtTime(1e-4, t5);
        gain.gain.exponentialRampToValueAtTime(0.18, t5 + 0.02);
        gain.gain.exponentialRampToValueAtTime(1e-4, t5 + 0.35);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t5);
        osc.stop(t5 + 0.4);
      });
      setTimeout(() => ctx.close(), 1200);
    } catch {
    }
  }
  async function requestNotificationPermission() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;
    return await Notification.requestPermission() === "granted";
  }
  function desktopNotify(title, body) {
    try {
      if ("Notification" in window && Notification.permission === "granted" && document.hidden) {
        new Notification(title, { body, silent: true });
      }
    } catch {
    }
  }

  // src/ui/format.ts
  var CDN = "https://cdn.discordapp.com";
  function avatarUrl(user) {
    if (!user) return null;
    if (user.avatar) return `${CDN}/avatars/${user.id}/${user.avatar}.webp?size=64`;
    try {
      return `${CDN}/embed/avatars/${Number((BigInt(user.id) >> 22n) % 6n)}.png`;
    } catch {
      return null;
    }
  }
  var guildIconUrl = (g4) => g4?.icon ? `${CDN}/icons/${g4.id}/${g4.icon}.webp?size=64` : null;
  var userName = (u5) => u5?.global_name || u5?.username || "?";
  function describeChannel(ch) {
    if (ch.type === 1) {
      const other = ch.recipients?.[0];
      return { kind: "dm", name: userName(other), iconUrl: avatarUrl(other) };
    }
    if (ch.type === 3) {
      const name = ch.name || (ch.recipients ?? []).map(userName).join(", ") || ch.id;
      return {
        kind: "group",
        name,
        iconUrl: ch.icon ? `${CDN}/channel-icons/${ch.id}/${ch.icon}.webp?size=64` : null
      };
    }
    return { kind: "guild", name: `#${ch.name ?? ch.id}`, iconUrl: null };
  }
  function channelLabel(info, guildName) {
    if (info.kind === "dm") return t4("target.dm", { name: info.name });
    if (info.kind === "group") return t4("target.group", { name: info.name });
    return guildName ? `${info.name} — ${guildName}` : info.name;
  }
  function packageChannelLabel(ch) {
    if (ch.kind === "guild" && ch.guildName && !ch.name.includes(ch.guildName)) return `${ch.name} — ${ch.guildName}`;
    return ch.name;
  }
  var initials = (name) => name.replace(/^#/, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w4) => [...w4][0]?.toUpperCase() ?? "").join("") || "?";
  var truncate = (s4, n3) => s4.length > n3 ? `${s4.slice(0, n3 - 1)}…` : s4;
  var formatDate = (iso) => new Date(iso).toLocaleString(currentLang.value, { dateStyle: "short", timeStyle: "short" });
  var formatDay = (iso) => new Date(iso).toLocaleDateString(currentLang.value, { dateStyle: "medium" });
  function daysAgoLocal(days) {
    const d5 = new Date(Date.now() - days * 864e5);
    d5.setSeconds(0, 0);
    const pad = (n3) => String(n3).padStart(2, "0");
    return `${d5.getFullYear()}-${pad(d5.getMonth() + 1)}-${pad(d5.getDate())}T${pad(d5.getHours())}:${pad(d5.getMinutes())}`;
  }

  // src/ui/state.ts
  var SPEED_PRESETS = {
    safe: { searchDelay: 3e3, deleteDelay: 1600 },
    balanced: { searchDelay: 1500, deleteDelay: 1e3 },
    fast: { searchDelay: 900, deleteDelay: 450 }
  };
  var defaultSettings = {
    lang: "auto",
    theme: "auto",
    fab: "auto",
    speed: "balanced",
    searchDelay: SPEED_PRESETS.balanced.searchDelay,
    deleteDelay: SPEED_PRESETS.balanced.deleteDelay,
    adaptive: true,
    maxAttempts: 3,
    emptyPageRetries: 3,
    mode: "search",
    confirm: true,
    privacy: false,
    archive: true,
    notify: true,
    sound: true
  };
  function defaultUiFilter() {
    const { authorIds: _ignored, ...rest } = defaultFilter();
    return { authorMode: "me", authorCustom: "", ...rest, olderThanDays: null };
  }
  var settings = y3(defaultSettings);
  var filter = y3(defaultUiFilter());
  var updateSettings = (patch) => settings.value = { ...settings.value, ...patch };
  var updateFilter = (patch) => filter.value = { ...filter.value, ...patch };
  function activeFilterCount(f4) {
    return [
      f4.authorMode === "custom",
      !!f4.content.trim(),
      !!f4.pattern.trim(),
      f4.has.length > 0,
      f4.exclude.length > 0,
      f4.pinned !== "exclude",
      !f4.includeNsfw,
      !!(f4.afterDate || f4.beforeDate || f4.olderThanDays),
      !!(f4.afterId || f4.beforeId)
    ].filter(Boolean).length;
  }
  var MIN_W = 460;
  var MIN_H = 380;
  function defaultRect() {
    const w4 = Math.min(860, window.innerWidth - 32);
    const h5 = Math.min(640, window.innerHeight - 48);
    return { x: Math.max(16, window.innerWidth - w4 - 24), y: 56, w: w4, h: h5 };
  }
  function clampRect(r4) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w4 = Math.max(Math.min(MIN_W, vw - 16), Math.min(r4.w, vw - 16));
    const h5 = Math.max(Math.min(MIN_H, vh - 16), Math.min(r4.h, vh - 16));
    return {
      w: w4,
      h: h5,
      x: Math.min(Math.max(8, r4.x), Math.max(8, vw - w4 - 8)),
      y: Math.min(Math.max(8, r4.y), Math.max(8, vh - h5 - 8))
    };
  }
  var ui = {
    open: y3(false),
    tab: y3("wipe"),
    rect: y3({ x: 0, y: 0, w: 860, h: 640 }),
    wipeView: y3("form"),
    filtersOpen: y3(true),
    discordLight: y3(false),
    toolbarMounted: y3(false)
  };
  var isLight = g2(() => {
    const theme = settings.value.theme;
    return theme === "auto" ? ui.discordLight.value : theme === "light";
  });
  var target = {
    mode: y3("channel"),
    dms: y3([]),
    guilds: y3([]),
    custom: y3(""),
    /** Channels to spare when wiping a whole server, remembered per server id. */
    excluded: y3({})
  };
  var presets = y3([]);
  var discord = {
    token: y3(null),
    tokenState: y3("detecting"),
    manualToken: y3(""),
    me: y3(null),
    location: y3({ guildId: null, channelId: null }),
    channelInfo: y3(null),
    guilds: y3(null),
    guildsLoading: y3(false),
    guildChannels: y3({}),
    dms: y3(null),
    dmsLoading: y3(false),
    counts: y3({}),
    counting: y3(null)
  };
  var currentGuild = g2(() => {
    const id = discord.location.value.guildId;
    if (!id || id === "@me") return null;
    return discord.guilds.value?.find((g4) => g4.id === id) ?? { id, name: id, icon: null };
  });
  var ListStore = class {
    constructor(cap = Infinity) {
      this.cap = cap;
    }
    cap;
    items = [];
    version = y3(0);
    timer = 0;
    push(item) {
      this.items.push(item);
      if (this.items.length > this.cap) this.items.splice(0, this.items.length - this.cap);
      if (!this.timer) {
        this.timer = window.setTimeout(() => {
          this.timer = 0;
          this.version.value++;
        }, 150);
      }
    }
    clear() {
      this.items = [];
      this.version.value++;
    }
  };
  var run = {
    status: y3("idle"),
    kind: y3("delete"),
    stats: y3(WipeEngine.emptyStats()),
    jobs: y3([]),
    recent: new ListStore(40)
  };
  var logs = new ListStore(3e3);
  var archive = new ListStore();
  var preview = {
    results: new ListStore(),
    /** Ids the user unticked; everything else is selected. */
    excluded: y3(/* @__PURE__ */ new Set())
  };
  var savedSession = y3(null);
  var pkg = {
    data: y3(null),
    selected: y3(/* @__PURE__ */ new Set()),
    loading: y3(false),
    error: y3(null),
    kind: y3("all"),
    query: y3("")
  };
  var toasts = y3([]);
  var confirmDialog = y3(null);
  function initState() {
    settings.value = load("settings", defaultSettings);
    filter.value = load("filter", defaultUiFilter());
    ui.rect.value = clampRect(load("rect", defaultRect()));
    ui.tab.value = load("tab", "wipe");
    ui.filtersOpen.value = load("filtersOpen", true);
    target.mode.value = load("targetMode", "channel");
    target.custom.value = load("customTargets", "");
    target.excluded.value = load("excludedChannels", {});
    presets.value = load("presets", []);
    savedSession.value = load("session", null);
    j2(() => save("settings", settings.value));
    j2(() => save("filter", filter.value));
    j2(() => save("tab", ui.tab.value));
    j2(() => save("filtersOpen", ui.filtersOpen.value));
    j2(() => save("targetMode", target.mode.value));
    j2(() => save("customTargets", target.custom.value));
    j2(() => save("excludedChannels", target.excluded.value));
    j2(() => save("presets", presets.value));
    j2(() => {
      const lang = settings.value.lang;
      currentLang.value = lang === "auto" ? detectLang() : lang;
    });
  }
  var saveRect = () => save("rect", ui.rect.value);

  // src/ui/constants.ts
  var VERSION = true ? "1.0.0" : "dev";
  var APP_NAME = "Undiscord Remake";
  var AUTHOR = "FroZn";
  var BRAND = `${APP_NAME} by ${AUTHOR}`;
  var REPO_URL = "https://github.com/FroZnito/Undiscord-remake";
  var SHORTCUT_LABEL = "Alt + Shift + U";
  var isShortcut = (e4) => e4.altKey && e4.shiftKey && !e4.ctrlKey && !e4.metaKey && e4.code === "KeyU";

  // src/ui/controller.ts
  var api = new DiscordApi({
    getToken: () => discord.token.value?.token ?? null,
    fetch: (input, init) => nativeFetch(input, init)
  });
  var logId = 0;
  function log(level, key, params, sensitive = false) {
    logs.push({ id: ++logId, time: Date.now(), level, key, params, sensitive });
  }
  var toastId = 0;
  function toast(kind, key, params) {
    const id = ++toastId;
    toasts.value = [...toasts.value, { id, kind, text: t4(key, params) }].slice(-4);
    setTimeout(() => dismissToast(id), 4500);
  }
  var dismissToast = (id) => toasts.value = toasts.value.filter((x5) => x5.id !== id);
  var lastOptions = null;
  var engine = new WipeEngine(api, {
    onLog: (level, key, params) => log(level, key, params),
    onUpdate: () => scheduleSync(),
    onMessage: (rec) => onRecord(rec),
    onCheckpoint: () => schedulePersist()
  });
  var syncTimer = 0;
  function scheduleSync() {
    if (syncTimer) return;
    syncTimer = window.setTimeout(() => {
      syncTimer = 0;
      syncNow();
    }, 120);
  }
  function syncNow() {
    n2(() => {
      run.status.value = engine.status;
      run.stats.value = { ...engine.stats };
      run.jobs.value = engine.jobs.map((j3) => ({ ...j3 }));
    });
  }
  function onRecord(rec) {
    if (rec.status === "deleted") {
      if (settings.value.archive) archive.push(rec);
    } else {
      preview.results.push(rec);
    }
    run.recent.push(rec);
    const content = rec.content || rec.attachments.map((a4) => `📎 ${a4.filename}`).join(" ");
    log("debug", "log.message", { where: rec.where, date: formatDate(rec.timestamp), content: truncate(content, 140) }, true);
  }
  var pause = () => engine.pause();
  var resume = () => engine.resume();
  var stop = () => engine.stop();
  function speedValues() {
    const s4 = settings.value;
    return s4.speed === "custom" ? { searchDelay: s4.searchDelay, deleteDelay: s4.deleteDelay } : SPEED_PRESETS[s4.speed];
  }
  j2(() => {
    const { searchDelay, deleteDelay } = speedValues();
    const adaptive = settings.value.adaptive;
    if (engine.isActive) engine.updateSpeed(searchDelay, deleteDelay, adaptive);
  });
  var checkingToken = false;
  async function refreshToken() {
    if (checkingToken) return false;
    const found = resolveToken(discord.manualToken.value);
    if (!found) {
      if (discord.tokenState.value !== "invalid") discord.tokenState.value = "missing";
      return false;
    }
    if (discord.token.value?.token === found.token && discord.tokenState.value === "ok") return true;
    checkingToken = true;
    discord.token.value = found;
    try {
      const me = await api.me();
      n2(() => {
        discord.me.value = me;
        discord.tokenState.value = "ok";
      });
      log("info", "log.tokenFound", { source: t4(`token.${found.source}`) });
      log("success", "log.loggedIn", { name: me.global_name || me.username });
      return true;
    } catch (err2) {
      if (err2 instanceof DiscordApiError && err2.status === 401) {
        n2(() => {
          discord.me.value = null;
          discord.tokenState.value = "invalid";
        });
      }
      return false;
    } finally {
      checkingToken = false;
    }
  }
  async function useManualToken(value) {
    if (!looksLikeToken(value)) return toast("error", "toast.tokenBad");
    discord.manualToken.value = value.trim();
    discord.tokenState.value = "detecting";
    const ok = await refreshToken();
    toast(ok ? "success" : "error", ok ? "toast.tokenOk" : "toast.tokenRejected");
  }
  function forgetManualToken() {
    discord.manualToken.value = "";
    discord.token.value = null;
    discord.tokenState.value = "detecting";
    void refreshToken();
  }
  var channelCache = /* @__PURE__ */ new Map();
  async function resolveLocation(loc) {
    discord.channelInfo.value = null;
    if (discord.tokenState.value !== "ok") return;
    if (loc.guildId && loc.guildId !== "@me") void loadGuilds();
    if (!loc.channelId) return;
    const id = loc.channelId;
    try {
      let ch = channelCache.get(id);
      if (!ch) {
        ch = await api.channel(id);
        channelCache.set(id, ch);
      }
      if (discord.location.value.channelId === id) discord.channelInfo.value = describeChannel(ch);
    } catch {
      if (discord.location.value.channelId === id) {
        discord.channelInfo.value = { kind: loc.guildId === "@me" ? "dm" : "guild", name: t4("target.unknownChannel", { id }), iconUrl: null };
      }
    }
  }
  async function loadGuilds(force = false) {
    if (discord.guilds.value && !force || discord.guildsLoading.value) return;
    discord.guildsLoading.value = true;
    try {
      const list = await api.guilds();
      discord.guilds.value = [...list].sort((a4, b5) => a4.name.localeCompare(b5.name));
    } catch {
      discord.guilds.value ??= [];
    } finally {
      discord.guildsLoading.value = false;
    }
  }
  async function loadDms(force = false) {
    if (discord.dms.value && !force || discord.dmsLoading.value) return;
    discord.dmsLoading.value = true;
    try {
      const list = await api.dmChannels();
      for (const ch of list) channelCache.set(ch.id, ch);
      discord.dms.value = [...list].sort((a4, b5) => (b5.last_message_id ?? "0").padStart(20, "0").localeCompare((a4.last_message_id ?? "0").padStart(20, "0")));
    } catch {
      discord.dms.value ??= [];
    } finally {
      discord.dmsLoading.value = false;
    }
  }
  function initDiscord() {
    watchLocation((loc) => {
      discord.location.value = loc;
      void resolveLocation(loc);
    });
    onTokenCaptured(() => {
      if (discord.tokenState.value !== "ok") void refreshToken();
    });
    j2(() => {
      if (discord.tokenState.value === "ok") void resolveLocation(discord.location.peek());
    });
    void refreshToken();
    setInterval(() => {
      if (discord.tokenState.value === "missing" || discord.tokenState.value === "detecting") void refreshToken();
    }, 3e3);
  }
  function buildFilter() {
    const f4 = filter.value;
    let authorIds;
    if (f4.authorMode === "me") {
      const me = discord.me.value;
      if (!me) return { error: "toast.noAccount" };
      authorIds = [me.id];
    } else {
      authorIds = f4.authorCustom.split(/[\s,;]+/).filter(isSnowflake);
      if (!authorIds.length) return { error: "toast.badAuthor" };
    }
    if (compileRegex(f4.pattern).error) return { error: "toast.badRegex" };
    const { authorMode: _m, authorCustom: _c, olderThanDays, ...rest } = f4;
    const beforeDate = olderThanDays ? daysAgoLocal(olderThanDays) : rest.beforeDate;
    return { filter: { ...rest, beforeDate, authorIds } };
  }
  function parseCustomTargets(text) {
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    for (const raw of text.split(/[\n,]+/)) {
      const line = raw.trim();
      if (!line) continue;
      let guildId = null;
      let channelId = null;
      const link = /channels\/(@me|\d{15,21})\/(\d{15,21})/.exec(line);
      const pair = /^(\d{15,21})\s*[/:]\s*(\d{15,21})$/.exec(line);
      if (link) [, guildId, channelId] = link;
      else if (pair) [, guildId, channelId] = pair;
      else if (isSnowflake(line)) channelId = line;
      if (!channelId || seen.has(channelId)) continue;
      seen.add(channelId);
      const cached = channelCache.get(channelId);
      out.push({
        kind: "channel",
        guildId,
        channelId,
        label: cached ? channelLabel(describeChannel(cached)) : t4("target.unknownChannel", { id: channelId })
      });
    }
    return out;
  }
  var dmLabel = (ch) => channelLabel(describeChannel(ch));
  var excludedIn = (guildId) => {
    const ids = target.excluded.value[guildId] ?? [];
    return ids.length ? ids : void 0;
  };
  async function loadGuildChannels(guildId, force = false) {
    const current = discord.guildChannels.value[guildId];
    if (current === "loading" || Array.isArray(current) && !force) return;
    const set = (v4) => discord.guildChannels.value = { ...discord.guildChannels.value, [guildId]: v4 };
    set("loading");
    try {
      const list = await api.guildChannels(guildId);
      for (const ch of list) channelCache.set(ch.id, ch);
      set(list);
    } catch {
      set("error");
    }
  }
  function toggleExcludedChannel(guildId, channelIds, exclude) {
    const all = target.excluded.peek();
    const next = new Set(all[guildId] ?? []);
    for (const id of channelIds) exclude ? next.add(id) : next.delete(id);
    const copy = { ...all };
    if (next.size) copy[guildId] = [...next];
    else delete copy[guildId];
    target.excluded.value = copy;
  }
  function savePreset(name) {
    const clean = name.trim().slice(0, 40);
    if (!clean) return;
    const preset = {
      id: `p-${Date.now().toString(36)}`,
      name: clean,
      filter: { ...filter.peek() },
      targetMode: target.mode.peek(),
      dms: [...target.dms.peek()],
      guilds: [...target.guilds.peek()],
      custom: target.custom.peek(),
      mode: settings.peek().mode
    };
    presets.value = [...presets.peek().filter((p5) => p5.name !== clean), preset];
    toast("success", "presets.saved", { name: clean });
  }
  function applyPreset(id) {
    const p5 = presets.peek().find((x5) => x5.id === id);
    if (!p5 || engine.isActive) return;
    n2(() => {
      filter.value = { ...defaultUiFilter(), ...p5.filter };
      target.mode.value = p5.targetMode;
      target.dms.value = p5.dms;
      target.guilds.value = p5.guilds;
      target.custom.value = p5.custom;
      updateSettings({ mode: p5.mode });
    });
    toast("info", "presets.applied", { name: p5.name });
  }
  var deletePreset = (id) => presets.value = presets.peek().filter((p5) => p5.id !== id);
  function buildTargets() {
    const loc = discord.location.value;
    switch (target.mode.value) {
      case "channel": {
        if (!loc.channelId) return [];
        const info = discord.channelInfo.value;
        const label = info ? channelLabel(info, currentGuild.value?.name) : t4("target.unknownChannel", { id: loc.channelId });
        return [{ kind: "channel", guildId: loc.guildId, channelId: loc.channelId, label }];
      }
      case "guild": {
        const g4 = currentGuild.value;
        return g4 ? [{ kind: "guild", guildId: g4.id, label: g4.name, excludeChannelIds: excludedIn(g4.id) }] : [];
      }
      case "dms": {
        const dms = discord.dms.value ?? [];
        return target.dms.value.flatMap((id) => {
          const ch = dms.find((c4) => c4.id === id);
          return ch ? [{ kind: "channel", guildId: "@me", channelId: id, label: dmLabel(ch) }] : [];
        });
      }
      case "guilds": {
        const guilds = discord.guilds.value ?? [];
        return target.guilds.value.flatMap((id) => {
          const g4 = guilds.find((x5) => x5.id === id);
          return g4 ? [{ kind: "guild", guildId: id, label: g4.name, excludeChannelIds: excludedIn(id) }] : [];
        });
      }
      case "custom":
        return parseCustomTargets(target.custom.value);
    }
  }
  function engineOptions(filter2, dryRun) {
    const s4 = settings.value;
    return {
      filter: filter2,
      mode: s4.mode,
      dryRun,
      ...speedValues(),
      adaptive: s4.adaptive,
      maxAttempts: s4.maxAttempts,
      emptyPageRetries: s4.emptyPageRetries
    };
  }
  var TYPE_TO_CONFIRM_ABOVE = 1e3;
  function confirmDeletion(targets, filter2) {
    const known = targets.every((x5) => x5.kind === "ids");
    const countable = !known && targets.length <= 6;
    const controller = new AbortController();
    return new Promise((resolve) => {
      confirmDialog.value = {
        targets: targets.length,
        count: known ? targets.reduce((n3, x5) => n3 + (x5.messages?.length ?? 0), 0) : null,
        counting: countable,
        resolve: (ok) => {
          controller.abort();
          confirmDialog.value = null;
          resolve(ok);
        }
      };
      if (!countable) return;
      void (async () => {
        let total = 0;
        try {
          for (const target2 of targets) total += await countMessages(api, target2, filter2, controller.signal);
          if (confirmDialog.value) confirmDialog.value = { ...confirmDialog.value, count: total, counting: false };
        } catch {
          if (confirmDialog.value) confirmDialog.value = { ...confirmDialog.value, counting: false };
        }
      })();
    });
  }
  var jobSeq = 0;
  async function runJobs(targets, kind, options, existing) {
    const jobs = existing ?? targets.map((target2) => createJob(target2, `job-${++jobSeq}`));
    lastOptions = options;
    n2(() => {
      run.kind.value = kind;
      run.recent.clear();
      if (kind === "preview") {
        preview.results.clear();
        preview.excluded.value = /* @__PURE__ */ new Set();
      }
      ui.tab.value = "wipe";
      ui.wipeView.value = kind === "preview" ? "results" : "run";
      if (kind === "delete") savedSession.value = null;
    });
    await engine.run(jobs, options);
    syncNow();
    if (kind === "delete") persistSession(true);
    announceEnd(kind);
  }
  function announceEnd(kind) {
    const s4 = engine.stats;
    const s22 = settings.value;
    const [title, body] = kind === "delete" ? [t4("run.finishedTitle"), t4("run.finishedBody", { deleted: s4.deleted, failed: s4.failed })] : [t4("run.previewTitle"), t4("run.previewBody", { n: s4.matched })];
    if (s22.sound) playChime();
    if (s22.notify) desktopNotify(`${APP_NAME} — ${title}`, body);
  }
  async function startWipe(kind) {
    if (engine.isActive) return toast("warn", "toast.busy");
    const built = buildFilter();
    if ("error" in built) return toast("error", built.error);
    const targets = buildTargets();
    if (!targets.length) return toast("warn", "toast.noTarget");
    if (settings.value.mode === "history" && targets.some((x5) => x5.kind === "guild")) toast("info", "toast.historyGuild");
    if (kind === "delete" && settings.value.confirm && !await confirmDeletion(targets, built.filter)) return;
    await runJobs(targets, kind, engineOptions(built.filter, kind === "preview"));
  }
  async function deletePreviewSelection() {
    if (engine.isActive) return toast("warn", "toast.busy");
    const excluded = preview.excluded.value;
    const chosen = preview.results.items.filter((r4) => !excluded.has(r4.id));
    if (!chosen.length) return toast("warn", "toast.nothingSelected");
    const built = buildFilter();
    if ("error" in built) return toast("error", built.error);
    const byChannel = /* @__PURE__ */ new Map();
    for (const r4 of chosen) byChannel.set(r4.channelId, [...byChannel.get(r4.channelId) ?? [], r4]);
    const targets = [...byChannel].map(([channelId, list]) => ({
      kind: "ids",
      guildId: list[0].guildId ?? "@me",
      channelId,
      label: list[0].where,
      messages: list.map((r4) => ({ id: r4.id, content: r4.content, attachments: r4.attachments.map((a4) => a4.url).join(" ") })),
      checkPins: false
    }));
    if (settings.value.confirm && !await confirmDeletion(targets, built.filter)) return;
    await runJobs(targets, "delete", engineOptions(built.filter, false));
  }
  var toggleExcluded = (id) => {
    const next = new Set(preview.excluded.value);
    if (!next.delete(id)) next.add(id);
    preview.excluded.value = next;
  };
  var countController = null;
  async function countList(kind) {
    if (engine.isActive || discord.counting.value) return;
    const built = buildFilter();
    if ("error" in built) return toast("error", built.error);
    const selected = kind === "dms" ? target.dms.value : target.guilds.value;
    const all = kind === "dms" ? (discord.dms.value ?? []).map((c4) => c4.id) : (discord.guilds.value ?? []).map((g4) => g4.id);
    const ids = selected.length ? selected : all;
    countController = new AbortController();
    const signal = countController.signal;
    discord.counting.value = { done: 0, total: ids.length };
    try {
      for (const [i5, id] of ids.entries()) {
        discord.counts.value = { ...discord.counts.value, [id]: "loading" };
        const target2 = kind === "dms" ? { kind: "channel", guildId: "@me", channelId: id, label: id } : { kind: "guild", guildId: id, label: id };
        let value;
        try {
          value = await countMessages(api, target2, built.filter, signal);
        } catch (err2) {
          if (isAbortError(err2)) throw err2;
          value = "error";
        }
        discord.counts.value = { ...discord.counts.value, [id]: value };
        discord.counting.value = { done: i5 + 1, total: ids.length };
        await sleep(speedValues().searchDelay, signal);
      }
    } catch (err2) {
      if (!isAbortError(err2)) throw err2;
      const counts = { ...discord.counts.value };
      for (const [id, v4] of Object.entries(counts)) if (v4 === "loading") delete counts[id];
      discord.counts.value = counts;
    } finally {
      discord.counting.value = null;
      countController = null;
    }
  }
  var cancelCount = () => countController?.abort();
  async function pickBound(which) {
    ui.open.value = false;
    const id = await pickMessage(t4("filters.pickBanner"), t4("action.cancel"));
    ui.open.value = true;
    if (id) updateFilter(which === "after" ? { afterId: id } : { beforeId: id });
  }
  async function loadPackage(files) {
    if (!files.length) return;
    n2(() => {
      pkg.loading.value = true;
      pkg.error.value = null;
    });
    await sleep(30);
    try {
      const data = await parsePackageInput(files);
      if (!data.channels.length) throw new Error(t4("pkg.noMessages"));
      n2(() => {
        pkg.data.value = data;
        pkg.selected.value = new Set(data.channels.map((c4) => c4.id));
      });
      log("success", "log.packageLoaded", { channels: data.channels.length, messages: data.totalMessages });
    } catch (err2) {
      pkg.error.value = err2.message || String(err2);
    } finally {
      pkg.loading.value = false;
    }
  }
  function packageMatcher() {
    const built = buildFilter();
    const filter2 = "filter" in built ? built.filter : { ...filter.value, authorIds: [] };
    if (compileRegex(filter2.pattern).error) return null;
    const match = createPackageMatcher(filter2);
    return (ch) => ch.messages.filter((m3) => match(m3) === null);
  }
  async function startPackageWipe(kind) {
    if (engine.isActive) return toast("warn", "toast.busy");
    const data = pkg.data.value;
    if (!data) return;
    const built = buildFilter();
    if ("error" in built) return toast("error", built.error);
    const matcher = packageMatcher();
    const selected = pkg.selected.value;
    const targets = [];
    for (const ch of data.channels) {
      if (!selected.has(ch.id)) continue;
      const label = packageChannelLabel(ch);
      if (!ch.messages.length) {
        targets.push({ kind: "channel", guildId: ch.kind === "guild" ? ch.guildId : ch.kind === "unknown" ? null : "@me", channelId: ch.id, label });
        continue;
      }
      const messages = matcher(ch);
      if (messages.length) {
        targets.push({ kind: "ids", guildId: ch.guildId ?? "@me", channelId: ch.id, label, messages, checkPins: true });
      }
    }
    if (!targets.length) return toast("warn", "toast.nothingSelected");
    if (kind === "delete" && settings.value.confirm && !await confirmDeletion(targets, built.filter)) return;
    await runJobs(targets, kind, engineOptions(built.filter, kind === "preview"));
  }
  var MAX_SAVED_IDS = 6e4;
  var persistTimer = 0;
  function schedulePersist() {
    if (persistTimer || engine.dryRun) return;
    persistTimer = window.setTimeout(() => {
      persistTimer = 0;
      persistSession(false);
    }, 2500);
  }
  function persistSession(final) {
    if (!lastOptions || lastOptions.dryRun) return;
    const unfinished = engine.jobs.filter((j3) => j3.status !== "done" && j3.status !== "skipped");
    if (!unfinished.length) {
      remove("session");
      savedSession.value = null;
      return;
    }
    let budget = MAX_SAVED_IDS;
    const jobs = [];
    for (const j3 of engine.jobs) {
      if (j3.target.kind !== "ids" || j3.status === "done" || j3.status === "skipped") {
        jobs.push({ ...j3, target: { ...j3.target, messages: void 0 } });
        continue;
      }
      const rest = sortNewestFirst(j3.target.messages ?? []).slice(Number(j3.cursor ?? 0) || 0);
      if (rest.length > budget) continue;
      budget -= rest.length;
      jobs.push({ ...j3, cursor: void 0, target: { ...j3.target, messages: rest.map((m3) => ({ id: m3.id })) } });
    }
    const snapshot = { savedAt: Date.now(), options: lastOptions, jobs };
    save("session", snapshot);
    if (final) savedSession.value = snapshot;
  }
  async function resumeSession() {
    const snap = savedSession.value;
    if (!snap || engine.isActive) return;
    const jobs = snap.jobs.map((j3) => j3.status === "done" || j3.status === "skipped" ? j3 : { ...j3, status: "pending" });
    const options = {
      ...snap.options,
      ...speedValues(),
      adaptive: settings.value.adaptive
    };
    await runJobs(jobs.map((j3) => j3.target), "delete", options, jobs);
  }
  function discardSession() {
    remove("session");
    savedSession.value = null;
  }
  function exportRecords(records, format, name) {
    const file = `${name}-${timestampForFile()}`;
    const credit = { text: BRAND, url: REPO_URL };
    if (format === "json") downloadFile(archiveToJson(records, credit), `${file}.json`, "application/json");
    else if (format === "csv") downloadFile(archiveToCsv(records), `${file}.csv`, "text/csv;charset=utf-8");
    else downloadFile(archiveToHtml(records, name, credit), `${file}.html`, "text/html;charset=utf-8");
  }
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("success", "toast.copied");
    } catch {
    }
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
  var o4 = 0;
  function u4(t5, e4, n3, f4, u5, i5) {
    e4 || (e4 = {});
    var a4, c4, l5 = e4;
    if ("ref" in l5 && "function" != typeof t5) for (c4 in l5 = {}, e4) "ref" == c4 ? a4 = e4[c4] : l5[c4] = e4[c4];
    var p5 = { type: t5, props: l5, key: n3, ref: a4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --o4, __i: -1, __u: 0 };
    return (u5 || i5) && (p5.__source = u5, p5.__self = i5), n.vnode && n.vnode(p5), p5;
  }

  // src/ui/components/Icon.tsx
  var CIRCLE = "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z";
  var PATHS = {
    trash: ["M3 6h18", "M8 6V4h8v2", "M19 6l-1 14H6L5 6", "M10 11v6", "M14 11v6"],
    sparkles: ["M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z", "M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"],
    hash: ["M4 9h16", "M4 15h16", "M10 3L8 21", "M16 3l-2 18"],
    message: ["M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"],
    users: ["M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1", "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0", "M22 20v-1a4 4 0 0 0-3-3.9", "M16 3.1a4 4 0 0 1 0 7.8"],
    server: ["M6 3h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M6 14h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z", "M8 6.5h.01", "M8 17.5h.01"],
    list: ["M9 6h12", "M9 12h12", "M9 18h12", "M4 6h.01", "M4 12h.01", "M4 18h.01"],
    package: ["M21 8l-9-5-9 5 9 5 9-5z", "M3 8v8l9 5 9-5V8", "M12 13v8", "M7.5 5.5l9 5"],
    archive: ["M3 4h18v4H3z", "M5 8v12h14V8", "M10 12h4"],
    log: ["M14 3H6v18h12V7z", "M14 3v4h4", "M9 13h6", "M9 17h6", "M9 9h1"],
    sliders: ["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"],
    x: ["M18 6L6 18", "M6 6l12 12"],
    minus: ["M5 12h14"],
    play: ["M7 4l13 8-13 8z"],
    pause: ["M7 4h3v16H7z", "M14 4h3v16h-3z"],
    stop: ["M6 6h12v12H6z"],
    eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"],
    filter: ["M3 5h18l-7 8v6l-4 2v-8z"],
    chevronDown: ["M6 9l6 6 6-6"],
    chevronLeft: ["M15 18l-6-6 6-6"],
    check: ["M5 12l5 5 9-10"],
    search: ["M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z", "M21 21l-5-5"],
    refresh: ["M21 12a9 9 0 1 1-2.6-6.4", "M21 3v6h-6"],
    download: ["M12 3v12", "M7 10l5 5 5-5", "M5 21h14"],
    copy: ["M9 9h11v11H9z", "M5 15H4V4h11v1"],
    crosshair: [CIRCLE, "M12 2v5", "M12 17v5", "M2 12h5", "M17 12h5"],
    clock: [CIRCLE, "M12 7v5l3 2"],
    alert: ["M12 3l10 18H2z", "M12 10v4", "M12 17h.01"],
    info: [CIRCLE, "M12 11v5", "M12 8h.01"],
    checkCircle: [CIRCLE, "M8 12l3 3 5-6"],
    xCircle: [CIRCLE, "M9 9l6 6", "M15 9l-6 6"],
    skip: [CIRCLE, "M8 12h8"],
    upload: ["M12 21V9", "M7 14l5-5 5 5", "M5 3h14"],
    folder: ["M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],
    shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", "M9 12l2 2 4-4"],
    zap: ["M13 2L4 14h7l-1 8 9-12h-7z"],
    key: ["M8 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8z", "M11 13l9-9", "M16 8l3 3", "M18 6l2 2"],
    history: ["M3 12a9 9 0 1 0 3-6.7L3 8", "M3 3v5h5", "M12 7v5l4 2"],
    external: ["M14 4h6v6", "M20 4l-9 9", "M18 14v6H4V6h6"],
    bell: ["M18 16H6l1.5-2V10a4.5 4.5 0 0 1 9 0v4z", "M10 19a2 2 0 0 0 4 0"],
    calendar: ["M4 6h16v15H4z", "M4 10h16", "M9 3v4", "M15 3v4"],
    paperclip: ["M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7"],
    pin: ["M9 4h6l-1 6 4 3H6l4-3z", "M12 13v8"],
    user: ["M20 21a8 8 0 0 0-16 0", "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0"],
    globe: [CIRCLE, "M3 12h18", "M12 3a14 14 0 0 1 0 18", "M12 3a14 14 0 0 0 0 18"],
    plus: ["M12 5v14", "M5 12h14"],
    bookmark: ["M6 3h12v18l-6-4-6 4z"],
    sort: ["M7 4v16", "M3 16l4 4 4-4", "M14 6h7", "M14 12h5", "M14 18h3"]
  };
  function Icon({ name, size, class: cls }) {
    return /* @__PURE__ */ u4(
      "svg",
      {
        class: `icon${size ? ` ${size}` : ""}${cls ? ` ${cls}` : ""}`,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true",
        children: PATHS[name].map((d5) => /* @__PURE__ */ u4("path", { d: d5 }))
      }
    );
  }

  // src/ui/components/primitives.tsx
  function Button({ variant, small, icon, children, class: cls, ...rest }) {
    const classes = ["btn", variant, small && "sm", !children && icon && "icon-only", cls].filter(Boolean).join(" ");
    return /* @__PURE__ */ u4("button", { type: "button", class: classes, ...rest, children: [
      icon && /* @__PURE__ */ u4(Icon, { name: icon, size: small ? "sm" : void 0 }),
      children
    ] });
  }
  function Segmented(props) {
    return /* @__PURE__ */ u4("div", { class: `seg${props.full ? " full" : ""}`, role: "radiogroup", "aria-label": props.label, children: props.options.map((o5) => /* @__PURE__ */ u4(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": o5.value === props.value,
        class: o5.value === props.value ? "on" : "",
        title: o5.title,
        onClick: () => props.onChange(o5.value),
        children: [
          o5.icon && /* @__PURE__ */ u4(Icon, { name: o5.icon, size: "sm" }),
          o5.label
        ]
      }
    )) });
  }
  function Chip(props) {
    return /* @__PURE__ */ u4(
      "button",
      {
        type: "button",
        class: `chip${props.on ? " on" : ""}${props.negative ? " neg" : ""}`,
        "aria-pressed": props.on,
        onClick: props.onClick,
        children: [
          props.on ? /* @__PURE__ */ u4(Icon, { name: props.negative ? "x" : "check", size: "sm" }) : props.icon && /* @__PURE__ */ u4(Icon, { name: props.icon, size: "sm" }),
          props.children
        ]
      }
    );
  }
  function Switch(props) {
    return /* @__PURE__ */ u4("label", { class: `switch${props.checked ? " on" : ""}`, children: [
      /* @__PURE__ */ u4("input", { type: "checkbox", checked: props.checked, onChange: (e4) => props.onChange(e4.currentTarget.checked) }),
      /* @__PURE__ */ u4("span", { class: "track" }),
      /* @__PURE__ */ u4("span", { class: "text", children: [
        /* @__PURE__ */ u4("b", { children: props.label }),
        props.desc && /* @__PURE__ */ u4("span", { class: "hint", children: props.desc })
      ] })
    ] });
  }
  function Field(props) {
    return /* @__PURE__ */ u4("div", { class: "field", children: [
      /* @__PURE__ */ u4("label", { children: props.label }),
      props.children,
      props.error ? /* @__PURE__ */ u4("span", { class: "hint error", children: props.error }) : props.hint && /* @__PURE__ */ u4("span", { class: "hint", children: props.hint })
    ] });
  }
  function Section(props) {
    const collapsible = props.onToggle !== void 0;
    const open = props.open ?? true;
    return /* @__PURE__ */ u4("section", { class: "section", children: [
      /* @__PURE__ */ u4("div", { class: "section-head", children: [
        collapsible ? /* @__PURE__ */ u4("button", { type: "button", class: `toggle${open ? "" : " closed"}`, onClick: props.onToggle, "aria-expanded": open, children: [
          /* @__PURE__ */ u4(Icon, { name: "chevronDown", size: "sm" }),
          /* @__PURE__ */ u4("h3", { children: props.title })
        ] }) : /* @__PURE__ */ u4("h3", { children: props.title }),
        /* @__PURE__ */ u4("div", { class: "spacer" }),
        props.aside
      ] }),
      open && props.children
    ] });
  }
  function Avatar(props) {
    const [broken, setBroken] = d2(false);
    const cls = `avatar priv${props.square ? " square" : ""}${props.size ? ` ${props.size}` : ""}`;
    return /* @__PURE__ */ u4("span", { class: cls, "aria-hidden": "true", children: props.url && !broken ? /* @__PURE__ */ u4("img", { src: props.url, alt: "", loading: "lazy", referrerpolicy: "no-referrer", onError: () => setBroken(true) }) : props.icon ? /* @__PURE__ */ u4(Icon, { name: props.icon, size: "sm" }) : initials(props.name) });
  }
  function Progress(props) {
    const indeterminate = props.value === null;
    const cls = ["progress", props.tone, indeterminate && "indeterminate", props.paused && "paused", props.small && "sm"].filter(Boolean).join(" ");
    return /* @__PURE__ */ u4("div", { class: cls, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": props.value ?? void 0, children: /* @__PURE__ */ u4("i", { style: { width: `${Math.max(0, Math.min(100, props.value ?? 0))}%` } }) });
  }
  function Stat(props) {
    return /* @__PURE__ */ u4("div", { class: `stat${props.tone ? ` ${props.tone}` : ""}`, children: [
      /* @__PURE__ */ u4("span", { children: props.label }),
      /* @__PURE__ */ u4("b", { children: props.value })
    ] });
  }
  function Banner(props) {
    return /* @__PURE__ */ u4("div", { class: `banner ${props.tone}`, role: props.tone === "info" ? "status" : "alert", children: [
      /* @__PURE__ */ u4(Icon, { name: props.icon ?? (props.tone === "info" ? "info" : "alert") }),
      /* @__PURE__ */ u4("div", { children: [
        props.title && /* @__PURE__ */ u4("b", { children: props.title }),
        props.children && /* @__PURE__ */ u4("div", { class: "hint", children: props.children })
      ] }),
      props.actions && /* @__PURE__ */ u4("div", { class: "row", children: props.actions })
    ] });
  }
  function Empty(props) {
    return /* @__PURE__ */ u4("div", { class: "empty", children: [
      /* @__PURE__ */ u4(Icon, { name: props.icon }),
      /* @__PURE__ */ u4("div", { children: props.children })
    ] });
  }
  function RangeField(props) {
    return /* @__PURE__ */ u4(Field, { label: props.label, children: /* @__PURE__ */ u4("div", { class: "range", children: [
      /* @__PURE__ */ u4(
        "input",
        {
          type: "range",
          min: props.min,
          max: props.max,
          step: props.step,
          value: props.value,
          onInput: (e4) => props.onChange(Number(e4.currentTarget.value)),
          "aria-label": props.label
        }
      ),
      /* @__PURE__ */ u4("output", { children: [
        props.value,
        props.unit ?? " ms"
      ] })
    ] }) });
  }

  // src/ui/pages/FilterForm.tsx
  var HAS_ICONS = {
    link: "external",
    file: "paperclip",
    image: "eye",
    video: "play",
    embed: "list",
    sound: "bell",
    sticker: "sparkles",
    poll: "checkCircle"
  };
  var PRESETS = [["preset.1d", 1], ["preset.7d", 7], ["preset.30d", 30], ["preset.1y", 365]];
  function FilterForm() {
    const f4 = filter.value;
    const me = discord.me.value;
    const set = updateFilter;
    const regexError = compileRegex(f4.pattern).error;
    const toggleKind = (list, k2) => {
      const current = f4[list];
      const next = current.includes(k2) ? current.filter((x5) => x5 !== k2) : [...current, k2];
      const other = list === "has" ? "exclude" : "has";
      set({ [list]: next, [other]: f4[other].filter((x5) => x5 !== k2) });
    };
    return /* @__PURE__ */ u4("div", { class: "card stack", children: [
      /* @__PURE__ */ u4(Field, { label: t4("filters.author"), hint: f4.authorMode === "custom" ? t4("filters.authorCustomHint") : void 0, children: /* @__PURE__ */ u4("div", { class: "row wrap", children: [
        /* @__PURE__ */ u4(
          Segmented,
          {
            value: f4.authorMode,
            onChange: (v4) => set({ authorMode: v4 }),
            options: [
              { value: "me", label: me ? /* @__PURE__ */ u4("span", { class: "priv", children: [
                t4("filters.authorMe"),
                " · ",
                userName(me)
              ] }) : t4("filters.authorMe"), icon: "user" },
              { value: "custom", label: t4("filters.authorCustom"), icon: "users" }
            ]
          }
        ),
        f4.authorMode === "custom" && /* @__PURE__ */ u4(
          "input",
          {
            class: "input mono grow",
            value: f4.authorCustom,
            placeholder: t4("filters.authorCustomPh"),
            onInput: (e4) => set({ authorCustom: e4.currentTarget.value })
          }
        )
      ] }) }),
      /* @__PURE__ */ u4("div", { class: "grid-2", children: [
        /* @__PURE__ */ u4(Field, { label: t4("filters.content"), children: /* @__PURE__ */ u4("input", { class: "input priv", value: f4.content, placeholder: t4("filters.contentPh"), onInput: (e4) => set({ content: e4.currentTarget.value }) }) }),
        /* @__PURE__ */ u4(
          Field,
          {
            label: t4("filters.pattern"),
            error: regexError ? t4("filters.patternInvalid", { error: regexError }) : null,
            hint: t4("filters.patternHint"),
            children: /* @__PURE__ */ u4(
              "input",
              {
                class: `input mono priv${regexError ? " invalid" : ""}`,
                value: f4.pattern,
                spellcheck: false,
                placeholder: t4("filters.patternPh"),
                onInput: (e4) => set({ pattern: e4.currentTarget.value })
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ u4(Field, { label: t4("filters.has"), children: /* @__PURE__ */ u4("div", { class: "chips", children: HAS_KINDS.map((k2) => /* @__PURE__ */ u4(Chip, { on: f4.has.includes(k2), icon: HAS_ICONS[k2], onClick: () => toggleKind("has", k2), children: t4(`has.${k2}`) })) }) }),
      /* @__PURE__ */ u4(Field, { label: t4("filters.exclude"), children: /* @__PURE__ */ u4("div", { class: "chips", children: HAS_KINDS.map((k2) => /* @__PURE__ */ u4(Chip, { on: f4.exclude.includes(k2), negative: true, icon: HAS_ICONS[k2], onClick: () => toggleKind("exclude", k2), children: t4(`has.${k2}`) })) }) }),
      /* @__PURE__ */ u4(Field, { label: t4("filters.pinned"), children: /* @__PURE__ */ u4(
        Segmented,
        {
          value: f4.pinned,
          onChange: (v4) => set({ pinned: v4 }),
          options: [
            { value: "exclude", label: t4("pinned.exclude") },
            { value: "include", label: t4("pinned.include") },
            { value: "only", label: t4("pinned.only") }
          ]
        }
      ) }),
      /* @__PURE__ */ u4("hr", { class: "sep" }),
      /* @__PURE__ */ u4(Field, { label: t4("filters.period"), children: [
        /* @__PURE__ */ u4("div", { class: "grid-2", children: [
          /* @__PURE__ */ u4("div", { class: "field", children: [
            /* @__PURE__ */ u4("span", { class: "hint", children: t4("filters.after") }),
            /* @__PURE__ */ u4("input", { type: "datetime-local", class: "input", value: f4.afterDate, onInput: (e4) => set({ afterDate: e4.currentTarget.value }) })
          ] }),
          /* @__PURE__ */ u4("div", { class: "field", children: [
            /* @__PURE__ */ u4("span", { class: "hint", children: t4("filters.before") }),
            /* @__PURE__ */ u4(
              "input",
              {
                type: "datetime-local",
                class: "input",
                value: f4.olderThanDays ? daysAgoLocal(f4.olderThanDays) : f4.beforeDate,
                disabled: !!f4.olderThanDays,
                onInput: (e4) => set({ beforeDate: e4.currentTarget.value, olderThanDays: null })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ u4("div", { class: "row wrap", children: [
          /* @__PURE__ */ u4("span", { class: "hint", children: t4("filters.olderThan") }),
          PRESETS.map(([key, days]) => /* @__PURE__ */ u4(
            Chip,
            {
              on: f4.olderThanDays === days,
              icon: "clock",
              onClick: () => set({ olderThanDays: f4.olderThanDays === days ? null : days, beforeDate: "" }),
              children: t4(key)
            }
          )),
          (f4.afterDate || f4.beforeDate || f4.olderThanDays) && /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "x", onClick: () => set({ afterDate: "", beforeDate: "", olderThanDays: null }), children: t4("action.clear") })
        ] }),
        f4.olderThanDays && /* @__PURE__ */ u4("span", { class: "hint", children: t4("filters.relativeHint") })
      ] }),
      /* @__PURE__ */ u4(Field, { label: t4("filters.range"), children: /* @__PURE__ */ u4("div", { class: "grid-2", children: [
        /* @__PURE__ */ u4("div", { class: "row", children: [
          /* @__PURE__ */ u4("input", { class: "input mono", value: f4.afterId, placeholder: `${t4("filters.afterMessage")} — ${t4("filters.messageIdPh")}`, onInput: (e4) => set({ afterId: e4.currentTarget.value.trim() }) }),
          /* @__PURE__ */ u4(Button, { small: true, icon: "crosshair", title: t4("filters.pickBanner"), onClick: () => pickBound("after"), children: t4("filters.pick") })
        ] }),
        /* @__PURE__ */ u4("div", { class: "row", children: [
          /* @__PURE__ */ u4("input", { class: "input mono", value: f4.beforeId, placeholder: `${t4("filters.beforeMessage")} — ${t4("filters.messageIdPh")}`, onInput: (e4) => set({ beforeId: e4.currentTarget.value.trim() }) }),
          /* @__PURE__ */ u4(Button, { small: true, icon: "crosshair", title: t4("filters.pickBanner"), onClick: () => pickBound("before"), children: t4("filters.pick") })
        ] })
      ] }) }),
      /* @__PURE__ */ u4("label", { class: "row small", style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: f4.includeNsfw, onChange: (e4) => set({ includeNsfw: e4.currentTarget.checked }) }),
        t4("filters.nsfw")
      ] })
    ] });
  }

  // src/ui/pages/TargetPanel.tsx
  function TargetPanel() {
    const mode = target.mode.value;
    return /* @__PURE__ */ u4("div", { class: "stack tight", children: [
      /* @__PURE__ */ u4(
        Segmented,
        {
          label: t4("target.title"),
          value: mode,
          onChange: (v4) => target.mode.value = v4,
          options: [
            { value: "channel", label: t4("target.channel"), icon: "hash" },
            { value: "guild", label: t4("target.guild"), icon: "server" },
            { value: "dms", label: t4("target.dms"), icon: "message" },
            { value: "guilds", label: t4("target.guilds"), icon: "globe" },
            { value: "custom", label: t4("target.custom"), icon: "list" }
          ]
        }
      ),
      mode === "channel" && /* @__PURE__ */ u4(CurrentChannel, {}),
      mode === "guild" && /* @__PURE__ */ u4(CurrentGuild, {}),
      mode === "dms" && /* @__PURE__ */ u4(DmList, {}),
      mode === "guilds" && /* @__PURE__ */ u4(GuildList, {}),
      mode === "custom" && /* @__PURE__ */ u4(CustomTargets, {})
    ] });
  }
  function CurrentChannel() {
    const loc = discord.location.value;
    const info = discord.channelInfo.value;
    if (!loc.channelId) return /* @__PURE__ */ u4("div", { class: "current", children: /* @__PURE__ */ u4(Empty, { icon: "hash", children: t4("target.noChannel") }) });
    const icon = info?.kind === "dm" ? "message" : info?.kind === "group" ? "users" : "hash";
    const label = info ? channelLabel(info, currentGuild.value?.name) : t4("target.loading");
    return /* @__PURE__ */ u4("div", { class: "current", children: [
      /* @__PURE__ */ u4(Avatar, { url: info?.iconUrl, name: info?.name ?? "#", icon: info?.iconUrl ? void 0 : icon, size: "lg", square: info?.kind === "guild" }),
      /* @__PURE__ */ u4("div", { class: "meta", children: [
        /* @__PURE__ */ u4("b", { class: "priv", children: label }),
        /* @__PURE__ */ u4("span", { children: t4("target.channelDesc") })
      ] })
    ] });
  }
  function CurrentGuild() {
    const g4 = currentGuild.value;
    if (!g4) return /* @__PURE__ */ u4("div", { class: "current", children: /* @__PURE__ */ u4(Empty, { icon: "server", children: t4("target.noGuild") }) });
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4("div", { class: "current", children: [
        /* @__PURE__ */ u4(Avatar, { url: guildIconUrl(g4), name: g4.name, square: true, size: "lg" }),
        /* @__PURE__ */ u4("div", { class: "meta", children: [
          /* @__PURE__ */ u4("b", { class: "priv", children: g4.name }),
          /* @__PURE__ */ u4("span", { children: t4("target.guildDesc") })
        ] })
      ] }),
      /* @__PURE__ */ u4(ChannelExclusions, { guildId: g4.id })
    ] });
  }
  var MESSAGE_CHANNEL_TYPES = /* @__PURE__ */ new Set([0, 2, 5, 13, 15, 16]);
  var channelIcon = (type) => type === 2 || type === 13 ? "users" : type === 15 || type === 16 ? "list" : "hash";
  function groupChannels(all) {
    const byPos = (a4, b5) => (a4.position ?? 0) - (b5.position ?? 0);
    const categories = all.filter((c4) => c4.type === 4).sort(byPos);
    const channels = all.filter((c4) => MESSAGE_CHANNEL_TYPES.has(c4.type)).sort(byPos);
    const groups = [
      { id: "none", name: null, channels: channels.filter((c4) => !c4.parent_id || !categories.some((k2) => k2.id === c4.parent_id)) },
      ...categories.map((k2) => ({ id: k2.id, name: k2.name ?? "", channels: channels.filter((c4) => c4.parent_id === k2.id) }))
    ];
    return groups.filter((gr) => gr.channels.length);
  }
  function ChannelExclusions({ guildId }) {
    const [open, setOpen] = d2(false);
    const state = discord.guildChannels.value[guildId];
    const excluded = new Set(target.excluded.value[guildId] ?? []);
    A(() => {
      if (open) void loadGuildChannels(guildId);
    }, [open, guildId]);
    const groups = b2(() => groupChannels(Array.isArray(state) ? state : []), [state]);
    return /* @__PURE__ */ u4("div", { class: "card flat", children: [
      /* @__PURE__ */ u4(
        "div",
        {
          class: "list-row",
          role: "button",
          tabIndex: 0,
          "aria-expanded": open,
          onClick: () => setOpen(!open),
          onKeyDown: (e4) => (e4.key === "Enter" || e4.key === " ") && (e4.preventDefault(), setOpen(!open)),
          children: [
            /* @__PURE__ */ u4(Icon, { name: "filter", size: "sm", class: "muted" }),
            /* @__PURE__ */ u4("span", { class: "name", children: t4("target.channels") }),
            /* @__PURE__ */ u4("span", { class: `pill${excluded.size ? " warn" : ""}`, children: excluded.size ? t4("target.excludedCount", { n: excluded.size }) : t4("target.allChannels") }),
            /* @__PURE__ */ u4(Icon, { name: "chevronDown", size: "sm", class: open ? void 0 : "rot" })
          ]
        }
      ),
      open && /* @__PURE__ */ u4(M, { children: [
        /* @__PURE__ */ u4("div", { class: "list-foot", style: { borderTop: "1px solid var(--line)" }, children: t4("target.channelsHint") }),
        /* @__PURE__ */ u4("div", { class: "list scroll", children: state === "loading" || state === void 0 ? /* @__PURE__ */ u4("div", { class: "empty", children: [
          /* @__PURE__ */ u4("div", { class: "spinner" }),
          t4("target.loading")
        ] }) : state === "error" ? /* @__PURE__ */ u4(Empty, { icon: "alert", children: t4("target.loadChannelsError") }) : groups.map((gr) => {
          const ids = gr.channels.map((c4) => c4.id);
          const off = ids.filter((id) => excluded.has(id)).length;
          return /* @__PURE__ */ u4("div", { children: [
            /* @__PURE__ */ u4("label", { class: "list-group", children: [
              /* @__PURE__ */ u4(
                "input",
                {
                  type: "checkbox",
                  class: "check",
                  checked: off === 0,
                  ref: (el) => {
                    if (el) el.indeterminate = off > 0 && off < ids.length;
                  },
                  onChange: () => toggleExcludedChannel(guildId, ids, off === 0)
                }
              ),
              /* @__PURE__ */ u4("span", { class: "priv", children: gr.name ?? t4("target.noCategory") })
            ] }),
            gr.channels.map((ch) => {
              const on = !excluded.has(ch.id);
              return /* @__PURE__ */ u4("label", { class: `list-row sub-row${on ? "" : " off"}`, children: [
                /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: on, onChange: () => toggleExcludedChannel(guildId, [ch.id], on) }),
                /* @__PURE__ */ u4(Icon, { name: channelIcon(ch.type), size: "sm", class: "muted" }),
                /* @__PURE__ */ u4("span", { class: "name priv", children: ch.name })
              ] }, ch.id);
            })
          ] }, gr.id);
        }) })
      ] })
    ] });
  }
  function DmList() {
    A(() => void loadDms(), []);
    const dms = discord.dms.value;
    const items = b2(() => (dms ?? []).map((ch) => {
      const info = describeChannel(ch);
      return {
        id: ch.id,
        name: dmLabel(ch),
        sub: ch.type === 3 ? `${ch.recipients?.length ?? 0} 👤` : void 0,
        iconUrl: info.iconUrl ?? (ch.type === 1 ? avatarUrl(ch.recipients?.[0]) : null),
        icon: ch.type === 3 ? "users" : void 0
      };
    }), [dms]);
    return /* @__PURE__ */ u4(
      SelectList,
      {
        kind: "dms",
        items,
        loading: discord.dmsLoading.value && !dms,
        selection: target.dms,
        onRefresh: () => loadDms(true)
      }
    );
  }
  function GuildList() {
    A(() => void loadGuilds(), []);
    const guilds = discord.guilds.value;
    const excluded = target.excluded.value;
    const items = b2(
      () => (guilds ?? []).map((g4) => ({
        id: g4.id,
        name: g4.name,
        iconUrl: guildIconUrl(g4),
        square: true,
        badge: excluded[g4.id]?.length ? t4("target.excludedShort", { n: excluded[g4.id].length }) : void 0
      })),
      [guilds, excluded]
    );
    return /* @__PURE__ */ u4(
      SelectList,
      {
        kind: "guilds",
        items,
        loading: discord.guildsLoading.value && !guilds,
        selection: target.guilds,
        onRefresh: () => loadGuilds(true)
      }
    );
  }
  function SelectList(props) {
    const [query, setQuery] = d2("");
    const [byCount, setByCount] = d2(false);
    const counts = discord.counts.value;
    const counting = discord.counting.value;
    const selectedIds = props.selection.value;
    const selected = new Set(selectedIds);
    const update = (fn) => {
      const next = new Set(props.selection.peek());
      fn(next);
      props.selection.value = [...next];
    };
    const visible = b2(() => {
      const q3 = query.trim().toLowerCase();
      const list = q3 ? props.items.filter((i5) => i5.name.toLowerCase().includes(q3)) : props.items;
      if (!byCount) return list;
      const n3 = (id) => typeof counts[id] === "number" ? counts[id] : -1;
      return [...list].sort((a4, b5) => n3(b5.id) - n3(a4.id));
    }, [props.items, query, byCount, counts]);
    const toggle = (id) => update((s4) => {
      if (!s4.delete(id)) s4.add(id);
    });
    const allVisibleSelected = visible.length > 0 && visible.every((i5) => selected.has(i5.id));
    const selectVisible = (on) => update((s4) => {
      for (const i5 of visible) on ? s4.add(i5.id) : s4.delete(i5.id);
    });
    const totalCounted = selectedIds.reduce((n3, id) => n3 + (typeof counts[id] === "number" ? counts[id] : 0), 0);
    return /* @__PURE__ */ u4("div", { class: "card flat", children: [
      /* @__PURE__ */ u4("div", { class: "list-toolbar", children: [
        /* @__PURE__ */ u4("div", { class: "input-wrap", children: [
          /* @__PURE__ */ u4(Icon, { name: "search", size: "sm" }),
          /* @__PURE__ */ u4("input", { class: "input", value: query, placeholder: t4("target.filterList"), onInput: (e4) => setQuery(e4.currentTarget.value) })
        ] }),
        /* @__PURE__ */ u4(Button, { small: true, onClick: () => selectVisible(!allVisibleSelected), children: allVisibleSelected ? t4("target.none") : t4("target.all") }),
        /* @__PURE__ */ u4(Button, { small: true, variant: byCount ? void 0 : "ghost", icon: "sort", title: t4("target.sortByCount"), onClick: () => setByCount(!byCount) }),
        counting ? /* @__PURE__ */ u4(Button, { small: true, icon: "x", onClick: cancelCount, children: t4("target.counting", { done: counting.done, total: counting.total }) }) : /* @__PURE__ */ u4(Button, { small: true, icon: "zap", title: t4("target.countHint"), onClick: () => countList(props.kind), children: t4("target.count") }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "refresh", title: t4("target.refresh"), onClick: props.onRefresh })
      ] }),
      /* @__PURE__ */ u4("div", { class: "list scroll", children: props.loading ? /* @__PURE__ */ u4("div", { class: "empty", children: [
        /* @__PURE__ */ u4("div", { class: "spinner" }),
        t4("target.loading")
      ] }) : visible.length === 0 ? /* @__PURE__ */ u4(Empty, { icon: "search", children: t4("target.empty") }) : visible.map((item) => {
        const on = selected.has(item.id);
        const c4 = counts[item.id];
        return /* @__PURE__ */ u4("div", { class: `list-row${on ? " on" : ""}`, onClick: () => toggle(item.id), children: [
          /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: on, onClick: (e4) => e4.stopPropagation(), onChange: () => toggle(item.id), "aria-label": item.name }),
          /* @__PURE__ */ u4(Avatar, { url: item.iconUrl, name: item.name, square: item.square, icon: item.iconUrl ? void 0 : item.icon }),
          /* @__PURE__ */ u4("span", { class: "name priv", children: item.name }),
          item.sub && /* @__PURE__ */ u4("span", { class: "sub", children: item.sub }),
          item.badge && /* @__PURE__ */ u4("span", { class: "pill warn", children: item.badge }),
          c4 === "loading" ? /* @__PURE__ */ u4("div", { class: "spinner" }) : c4 === "error" ? /* @__PURE__ */ u4(Icon, { name: "alert", size: "sm", class: "muted" }) : typeof c4 === "number" ? /* @__PURE__ */ u4("span", { class: `pill${c4 > 0 ? " accent" : ""}`, children: fmt(c4) }) : null
        ] }, item.id);
      }) }),
      /* @__PURE__ */ u4("div", { class: "list-foot", children: [
        /* @__PURE__ */ u4("span", { children: t4("target.selected", { n: selectedIds.length }) }),
        totalCounted > 0 && /* @__PURE__ */ u4("span", { children: [
          "· ",
          fmt(totalCounted),
          " msg"
        ] })
      ] })
    ] });
  }
  function CustomTargets() {
    const text = target.custom.value;
    const parsed = b2(() => parseCustomTargets(text), [text]);
    return /* @__PURE__ */ u4("div", { class: "field", children: [
      /* @__PURE__ */ u4(
        "textarea",
        {
          class: "textarea",
          rows: 5,
          value: text,
          spellcheck: false,
          placeholder: "123456789012345678\n111111111111111111/222222222222222222\nhttps://discord.com/channels/@me/333333333333333333",
          onInput: (e4) => target.custom.value = e4.currentTarget.value
        }
      ),
      /* @__PURE__ */ u4("span", { class: "hint", children: t4("target.customHint") }),
      text.trim() && /* @__PURE__ */ u4("span", { class: "pill accent", style: { alignSelf: "flex-start" }, children: t4("target.customCount", { n: parsed.length }) })
    ] });
  }

  // src/ui/pages/WipePage.tsx
  function WipePage() {
    const view = ui.wipeView.value;
    if (view === "run") return /* @__PURE__ */ u4(RunView, {});
    if (view === "results") return /* @__PURE__ */ u4(ResultsView, {});
    return /* @__PURE__ */ u4(WipeForm, {});
  }
  function AccountBanner() {
    const state = discord.tokenState.value;
    if (state === "ok") return null;
    if (state === "detecting") {
      return /* @__PURE__ */ u4(Banner, { tone: "info", icon: "key", title: t4("account.detecting") });
    }
    return /* @__PURE__ */ u4(
      Banner,
      {
        tone: state === "invalid" ? "danger" : "warn",
        icon: "key",
        title: state === "invalid" ? t4("account.invalid") : t4("account.missing"),
        actions: /* @__PURE__ */ u4(Button, { small: true, onClick: () => ui.tab.value = "settings", children: t4("nav.settings") }),
        children: t4("account.missingHint")
      }
    );
  }
  function SessionBanner() {
    const snap = savedSession.value;
    if (!snap || run.status.value === "running" || run.status.value === "paused") return null;
    const left = snap.jobs.filter((j3) => j3.status !== "done" && j3.status !== "skipped").length;
    if (!left) return null;
    return /* @__PURE__ */ u4(
      Banner,
      {
        tone: "info",
        icon: "history",
        title: t4("session.found", { n: left }),
        actions: /* @__PURE__ */ u4(M, { children: [
          /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", onClick: discardSession, children: t4("session.discard") }),
          /* @__PURE__ */ u4(Button, { small: true, variant: "primary", icon: "play", onClick: () => void resumeSession(), children: t4("session.resume") })
        ] })
      }
    );
  }
  function WipeForm() {
    const f4 = filter.value;
    const active = activeFilterCount(f4);
    const mode = settings.value.mode;
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4(AccountBanner, {}),
      /* @__PURE__ */ u4(SessionBanner, {}),
      /* @__PURE__ */ u4(PresetsBar, {}),
      /* @__PURE__ */ u4(Section, { title: t4("target.title"), children: /* @__PURE__ */ u4(TargetPanel, {}) }),
      /* @__PURE__ */ u4(
        Section,
        {
          title: t4("filters.title"),
          open: ui.filtersOpen.value,
          onToggle: () => ui.filtersOpen.value = !ui.filtersOpen.value,
          aside: /* @__PURE__ */ u4(M, { children: [
            active > 0 && /* @__PURE__ */ u4("span", { class: "pill accent", children: t4("filters.active", { n: active }) }),
            active > 0 && /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", onClick: () => filter.value = { ...defaultUiFilter(), authorMode: f4.authorMode, authorCustom: f4.authorCustom }, children: t4("filters.reset") })
          ] }),
          children: /* @__PURE__ */ u4(FilterForm, {})
        }
      ),
      /* @__PURE__ */ u4(Section, { title: t4("mode.title"), children: /* @__PURE__ */ u4("div", { class: "mode-cards", children: [
        /* @__PURE__ */ u4(ModeCard, { on: mode === "search", icon: "zap", title: t4("mode.search"), desc: t4("mode.searchDesc"), onClick: () => updateSettings({ mode: "search" }) }),
        /* @__PURE__ */ u4(ModeCard, { on: mode === "history", icon: "history", title: t4("mode.history"), desc: t4("mode.historyDesc"), onClick: () => updateSettings({ mode: "history" }) })
      ] }) })
    ] });
  }
  function PresetsBar() {
    const list = presets.value;
    const busy = run.status.value === "running" || run.status.value === "paused";
    const [naming, setNaming] = d2(false);
    const [name, setName] = d2("");
    const inputRef = T2(null);
    A(() => {
      if (naming) inputRef.current?.focus();
    }, [naming]);
    const close = () => {
      setNaming(false);
      setName("");
    };
    const submit = () => {
      if (!name.trim()) return;
      savePreset(name);
      close();
    };
    return /* @__PURE__ */ u4("div", { class: "presets", children: [
      /* @__PURE__ */ u4("span", { class: "label", children: [
        /* @__PURE__ */ u4(Icon, { name: "bookmark", size: "sm" }),
        t4("presets.title")
      ] }),
      list.map((p5) => /* @__PURE__ */ u4("span", { class: "preset-chip", children: [
        /* @__PURE__ */ u4("button", { type: "button", disabled: busy, onClick: () => applyPreset(p5.id), children: p5.name }),
        /* @__PURE__ */ u4("button", { type: "button", class: "x", title: t4("presets.delete"), "aria-label": t4("presets.delete"), onClick: () => deletePreset(p5.id), children: /* @__PURE__ */ u4(Icon, { name: "x", size: "sm" }) })
      ] }, p5.id)),
      naming ? /* @__PURE__ */ u4("span", { class: "row", children: [
        /* @__PURE__ */ u4(
          "input",
          {
            ref: inputRef,
            class: "input sm",
            value: name,
            maxLength: 40,
            placeholder: t4("presets.namePh"),
            onInput: (e4) => setName(e4.currentTarget.value),
            onKeyDown: (e4) => {
              if (e4.key === "Enter") submit();
              if (e4.key === "Escape") close();
            }
          }
        ),
        /* @__PURE__ */ u4(Button, { small: true, variant: "primary", disabled: !name.trim(), onClick: submit, children: t4("presets.save") }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "x", "aria-label": t4("action.cancel"), onClick: close })
      ] }) : /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "plus", onClick: () => setNaming(true), children: t4("presets.saveCurrent") }),
      !list.length && !naming && /* @__PURE__ */ u4("span", { class: "hint", children: t4("presets.empty") })
    ] });
  }
  function ModeCard(props) {
    return /* @__PURE__ */ u4("button", { type: "button", class: `mode-card${props.on ? " on" : ""}`, "aria-pressed": props.on, onClick: props.onClick, children: [
      /* @__PURE__ */ u4(Icon, { name: props.icon }),
      /* @__PURE__ */ u4("div", { children: [
        /* @__PURE__ */ u4("b", { children: props.title }),
        /* @__PURE__ */ u4("span", { children: props.desc })
      ] })
    ] });
  }
  function percentDone(stats = run.stats.value) {
    if (stats.total === null || stats.total === 0) return stats.total === 0 && run.status.value === "finished" ? 100 : null;
    return Math.min(100, stats.processed / stats.total * 100);
  }
  function RunView() {
    const status = run.status.value;
    const stats = run.stats.value;
    const jobs = run.jobs.value;
    const preview2 = run.kind.value === "preview";
    const pct = percentDone(stats);
    const finished = status === "finished";
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4("div", { class: "hero", children: [
        /* @__PURE__ */ u4("div", { class: "row", children: [
          /* @__PURE__ */ u4(StatusPill, {}),
          /* @__PURE__ */ u4("span", { class: "muted small", children: [
            t4("run.elapsed"),
            " ",
            formatDuration(stats.elapsedMs)
          ] }),
          /* @__PURE__ */ u4("div", { class: "spacer" }),
          finished && /* @__PURE__ */ u4(Button, { small: true, icon: "chevronLeft", onClick: () => ui.wipeView.value = "form", children: t4("action.newRun") })
        ] }),
        /* @__PURE__ */ u4("div", { class: "hero-top", children: [
          /* @__PURE__ */ u4("div", { class: "hero-pct", children: pct === null ? "—" : `${Math.floor(pct)}%` }),
          /* @__PURE__ */ u4("div", { class: "hero-sub", children: [
            stats.total !== null ? t4("run.of", { done: fmt(stats.processed), total: fmt(stats.total) }) : t4("run.unknownTotal"),
            stats.etaMs !== null && !finished && /* @__PURE__ */ u4(M, { children: [
              " · ",
              t4("run.eta"),
              " ~",
              formatDuration(stats.etaMs)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u4(Progress, { value: finished ? 100 : pct, tone: preview2 ? void 0 : "danger", paused: status === "paused" })
      ] }),
      /* @__PURE__ */ u4("div", { class: "stats", children: [
        preview2 ? /* @__PURE__ */ u4(Stat, { label: t4("run.matched"), value: fmt(stats.matched), tone: "success" }) : /* @__PURE__ */ u4(Stat, { label: t4("run.deleted"), value: fmt(stats.deleted), tone: "success" }),
        /* @__PURE__ */ u4(Stat, { label: t4("run.failed"), value: fmt(stats.failed), tone: stats.failed ? "danger" : void 0 }),
        /* @__PURE__ */ u4(Stat, { label: t4("run.skipped"), value: fmt(stats.skipped) }),
        /* @__PURE__ */ u4(Stat, { label: t4("run.speed"), value: t4("run.perMin", { n: fmt(stats.speedPerMin) }) }),
        /* @__PURE__ */ u4(Stat, { label: t4("run.delay"), value: `${fmt(stats.delay)} ms` }),
        /* @__PURE__ */ u4(Stat, { label: t4("run.rateLimits"), value: fmt(stats.rateLimits) })
      ] }),
      /* @__PURE__ */ u4("div", { class: "two-col", children: [
        /* @__PURE__ */ u4(JobList, { jobs }),
        /* @__PURE__ */ u4(RecentFeed, { preview: preview2 })
      ] })
    ] });
  }
  function StatusPill() {
    const status = run.status.value;
    const tone = status === "running" ? "accent" : status === "paused" ? "warn" : status === "finished" ? "success" : "";
    return /* @__PURE__ */ u4("span", { class: `pill ${tone}`, children: [
      /* @__PURE__ */ u4("span", { class: `dot${status === "running" ? " pulse" : ""}` }),
      t4(`status.${status}`)
    ] });
  }
  var JOB_ICON = {
    pending: "clock",
    running: "zap",
    done: "checkCircle",
    skipped: "skip",
    failed: "xCircle",
    stopped: "stop"
  };
  function JobList({ jobs }) {
    const done = jobs.filter((j3) => j3.status === "done" || j3.status === "skipped").length;
    return /* @__PURE__ */ u4("div", { class: "card flat", children: [
      /* @__PURE__ */ u4("div", { class: "panel-title", children: [
        /* @__PURE__ */ u4(Icon, { name: "list", size: "sm" }),
        t4("run.jobs"),
        /* @__PURE__ */ u4("span", { class: "pill", children: [
          done,
          "/",
          jobs.length
        ] })
      ] }),
      /* @__PURE__ */ u4("div", { class: "panel-body scroll", children: jobs.map((j3) => {
        const total = j3.total;
        const processed = jobProcessed(j3);
        return /* @__PURE__ */ u4("div", { class: `job${j3.status === "running" ? " running" : ""}`, children: [
          /* @__PURE__ */ u4("div", { class: "row", children: [
            /* @__PURE__ */ u4(Icon, { name: JOB_ICON[j3.status], size: "sm", class: j3.status === "failed" ? "muted" : void 0 }),
            /* @__PURE__ */ u4("b", { class: "priv", title: j3.target.label, children: j3.target.label }),
            /* @__PURE__ */ u4("span", { class: "nums", children: t4(`job.${j3.status}`) })
          ] }),
          (j3.status === "running" || processed > 0) && /* @__PURE__ */ u4(M, { children: [
            /* @__PURE__ */ u4(Progress, { small: true, value: total ? processed / total * 100 : j3.status === "running" ? null : 100 }),
            /* @__PURE__ */ u4("div", { class: "nums", children: [
              total !== null ? `${fmt(processed)} / ${fmt(total)}` : t4("run.scanned", { n: fmt(j3.scanned) }),
              j3.deleted > 0 && ` · ${t4("run.deleted").toLowerCase()} ${fmt(j3.deleted)}`,
              j3.failed > 0 && ` · ${t4("run.failed").toLowerCase()} ${fmt(j3.failed)}`
            ] })
          ] })
        ] }, j3.id);
      }) })
    ] });
  }
  function RecentFeed({ preview: preview2 }) {
    run.recent.version.value;
    const items = [...run.recent.items].reverse().slice(0, 30);
    return /* @__PURE__ */ u4("div", { class: "card flat", children: [
      /* @__PURE__ */ u4("div", { class: "panel-title", children: [
        /* @__PURE__ */ u4(Icon, { name: preview2 ? "eye" : "trash", size: "sm" }),
        preview2 ? t4("run.recentPreview") : t4("run.recent")
      ] }),
      /* @__PURE__ */ u4("div", { class: "panel-body scroll", children: items.length === 0 ? /* @__PURE__ */ u4("div", { class: "empty", children: [
        run.status.value === "running" && /* @__PURE__ */ u4("div", { class: "spinner" }),
        t4("run.waiting")
      ] }) : items.map((r4) => /* @__PURE__ */ u4("div", { class: "feed-item", children: [
        /* @__PURE__ */ u4(Icon, { name: r4.status === "deleted" ? "trash" : "eye", size: "sm", class: "muted" }),
        /* @__PURE__ */ u4("div", { class: "body", children: [
          /* @__PURE__ */ u4("div", { class: "where", children: [
            /* @__PURE__ */ u4("span", { class: "priv ellipsis", children: r4.where }),
            /* @__PURE__ */ u4("span", { class: "nowrap", children: [
              "· ",
              formatDate(r4.timestamp)
            ] })
          ] }),
          /* @__PURE__ */ u4("div", { class: `text priv${r4.status === "deleted" ? " strike" : ""}`, children: recordText(r4) })
        ] })
      ] }, r4.id)) })
    ] });
  }
  var recordText = (r4) => truncate(r4.content || r4.attachments.map((a4) => `📎 ${a4.filename}`).join(" ") || "—", 300);
  var RESULT_LIMIT = 1500;
  function ResultsView() {
    preview.results.version.value;
    const results = preview.results.items;
    const excluded = preview.excluded.value;
    const status = run.status.value;
    const running = status === "running" || status === "paused";
    const selectedCount = results.length - results.filter((r4) => excluded.has(r4.id)).length;
    const shown = results.slice(0, RESULT_LIMIT);
    const allOn = excluded.size === 0;
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4("div", { class: "row", children: [
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "chevronLeft", onClick: () => ui.wipeView.value = "form", disabled: running, children: t4("action.back") }),
        /* @__PURE__ */ u4("h3", { style: { margin: 0, fontSize: "16px" }, children: t4("results.title") }),
        /* @__PURE__ */ u4(StatusPill, {}),
        /* @__PURE__ */ u4("div", { class: "spacer" }),
        /* @__PURE__ */ u4(ExportMenu, { records: () => results.filter((r4) => !excluded.has(r4.id)), name: "undiscord-apercu", disabled: !results.length })
      ] }),
      running ? /* @__PURE__ */ u4("div", { class: "stack tight", children: [
        /* @__PURE__ */ u4(Progress, { value: percentDone() }),
        /* @__PURE__ */ u4("span", { class: "hint", children: t4("results.running") })
      ] }) : /* @__PURE__ */ u4("span", { class: "hint", children: t4("results.hint") }),
      /* @__PURE__ */ u4("div", { class: "card flat", children: [
        /* @__PURE__ */ u4("div", { class: "list-toolbar", children: [
          /* @__PURE__ */ u4(
            "input",
            {
              type: "checkbox",
              class: "check",
              checked: allOn && results.length > 0,
              ref: (el) => {
                if (el) el.indeterminate = !allOn && excluded.size < results.length;
              },
              onChange: () => preview.excluded.value = allOn ? new Set(results.map((r4) => r4.id)) : /* @__PURE__ */ new Set(),
              "aria-label": t4("target.all")
            }
          ),
          /* @__PURE__ */ u4("span", { class: "small muted", children: t4("results.selected", { n: fmt(selectedCount), total: fmt(results.length) }) })
        ] }),
        /* @__PURE__ */ u4("div", { class: "scroll", style: { maxHeight: "420px" }, children: [
          results.length === 0 ? running ? /* @__PURE__ */ u4("div", { class: "empty", children: [
            /* @__PURE__ */ u4("div", { class: "spinner" }),
            t4("run.waiting")
          ] }) : /* @__PURE__ */ u4(Empty, { icon: "search", children: t4("results.empty") }) : shown.map((r4) => {
            const on = !excluded.has(r4.id);
            return /* @__PURE__ */ u4("label", { class: `msg-row${on ? "" : " off"}`, children: [
              /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: on, onChange: () => toggleExcluded(r4.id) }),
              /* @__PURE__ */ u4("div", { class: "body", children: [
                /* @__PURE__ */ u4("div", { class: "top", children: [
                  /* @__PURE__ */ u4("b", { class: "priv", children: r4.where }),
                  /* @__PURE__ */ u4("span", { class: "nowrap", children: formatDate(r4.timestamp) })
                ] }),
                /* @__PURE__ */ u4("div", { class: "text priv", children: r4.content || /* @__PURE__ */ u4("i", { class: "muted", children: "—" }) }),
                r4.attachments.length > 0 && /* @__PURE__ */ u4("div", { class: "att priv", children: r4.attachments.map((a4) => `📎 ${a4.filename}`).join("  ") })
              ] })
            ] }, r4.id);
          }),
          results.length > RESULT_LIMIT && /* @__PURE__ */ u4("div", { class: "list-foot", children: t4("results.more", { n: fmt(results.length - RESULT_LIMIT) }) })
        ] })
      ] })
    ] });
  }
  function ExportMenu(props) {
    const [open, setOpen] = d2(false);
    const ref = T2(null);
    A(() => {
      if (!open) return;
      const close = (e4) => {
        if (!e4.composedPath().includes(ref.current)) setOpen(false);
      };
      const root = ref.current.getRootNode();
      root.addEventListener("pointerdown", close);
      return () => root.removeEventListener("pointerdown", close);
    }, [open]);
    return /* @__PURE__ */ u4("div", { ref, style: { position: "relative" }, children: [
      /* @__PURE__ */ u4(Button, { small: true, icon: "download", disabled: props.disabled, onClick: () => setOpen(!open), children: t4("action.export") }),
      open && /* @__PURE__ */ u4("div", { class: "card", style: { position: "absolute", right: 0, top: "36px", zIndex: 5, padding: "6px", display: "flex", flexDirection: "column", gap: "2px", minWidth: "140px", boxShadow: "var(--shadow-sm)" }, children: ["html", "json", "csv"].map((fmtName) => /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", onClick: () => {
        exportRecords(props.records(), fmtName, props.name);
        setOpen(false);
      }, children: fmtName.toUpperCase() })) })
    ] });
  }

  // src/ui/pages/ArchivePage.tsx
  var PAGE = 300;
  function ArchivePage() {
    const version = archive.version.value;
    const [query, setQuery] = d2("");
    const [limit, setLimit] = d2(PAGE);
    const all = archive.items;
    const filtered = b2(() => {
      const q3 = normalizeText(query.trim());
      const list = q3 ? all.filter((r4) => normalizeText(`${r4.content} ${r4.where}`).includes(q3)) : all;
      return [...list].reverse();
    }, [version, query]);
    return /* @__PURE__ */ u4(M, { children: [
      !settings.value.archive && /* @__PURE__ */ u4(Banner, { tone: "warn", title: t4("archive.disabled") }),
      /* @__PURE__ */ u4("p", { class: "hint", style: { margin: 0 }, children: t4("archive.desc") }),
      /* @__PURE__ */ u4("div", { class: "row wrap", children: [
        /* @__PURE__ */ u4("input", { class: "input grow", style: { minWidth: "180px" }, value: query, placeholder: t4("archive.search"), onInput: (e4) => setQuery(e4.currentTarget.value) }),
        /* @__PURE__ */ u4("span", { class: "pill", children: t4("archive.count", { n: fmt(filtered.length) }) }),
        /* @__PURE__ */ u4(ExportMenu, { records: () => [...filtered].reverse(), name: "undiscord-archive", disabled: !filtered.length }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "trash", disabled: !all.length, onClick: () => archive.clear(), children: t4("action.clear") })
      ] }),
      /* @__PURE__ */ u4("div", { class: "card flat", children: filtered.length === 0 ? /* @__PURE__ */ u4(Empty, { icon: "archive", children: t4("archive.empty") }) : /* @__PURE__ */ u4("div", { class: "scroll", style: { maxHeight: "480px" }, children: [
        filtered.slice(0, limit).map((r4) => /* @__PURE__ */ u4("div", { class: "msg-row", children: /* @__PURE__ */ u4("div", { class: "body", children: [
          /* @__PURE__ */ u4("div", { class: "top", children: [
            /* @__PURE__ */ u4("b", { class: "priv", children: r4.where }),
            /* @__PURE__ */ u4("span", { class: "nowrap", children: formatDate(r4.timestamp) })
          ] }),
          /* @__PURE__ */ u4("div", { class: "text priv", children: r4.content || /* @__PURE__ */ u4("i", { class: "muted", children: "—" }) }),
          r4.attachments.length > 0 && /* @__PURE__ */ u4("div", { class: "att priv", children: r4.attachments.map((a4) => /* @__PURE__ */ u4("a", { href: a4.url, target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", marginRight: "10px" }, children: [
            "📎 ",
            a4.filename
          ] })) })
        ] }) }, r4.id)),
        filtered.length > limit && /* @__PURE__ */ u4("div", { class: "list-foot", children: /* @__PURE__ */ u4(Button, { small: true, onClick: () => setLimit(limit + PAGE), children: t4("archive.showMore") }) })
      ] }) })
    ] });
  }

  // src/ui/pages/LogsPage.tsx
  var LEVELS = ["debug", "info", "success", "warn", "error"];
  var SHOWN = 1200;
  var lineText = (e4) => `${new Date(e4.time).toLocaleTimeString()} [${e4.level}] ${t4(e4.key, e4.params)}`;
  function LogsPage() {
    logs.version.value;
    const [hidden, setHidden] = d2(/* @__PURE__ */ new Set());
    const [auto, setAuto] = d2(true);
    const boxRef = T2(null);
    const entries = logs.items.filter((e4) => !hidden.has(e4.level));
    const shown = entries.slice(-SHOWN);
    A(() => {
      if (auto && boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
    });
    const toggle = (l5) => {
      const next = new Set(hidden);
      if (!next.delete(l5)) next.add(l5);
      setHidden(next);
    };
    const all = () => logs.items.map(lineText).join("\n");
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4("div", { class: "row wrap", children: [
        /* @__PURE__ */ u4("div", { class: "chips", children: LEVELS.map((l5) => /* @__PURE__ */ u4(Chip, { on: !hidden.has(l5), onClick: () => toggle(l5), children: t4(`level.${l5}`) })) }),
        /* @__PURE__ */ u4("div", { class: "spacer" }),
        /* @__PURE__ */ u4("label", { class: "row small", style: { cursor: "pointer" }, children: [
          /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: auto, onChange: (e4) => setAuto(e4.currentTarget.checked) }),
          t4("logs.autoscroll")
        ] })
      ] }),
      /* @__PURE__ */ u4("div", { class: "row", children: [
        /* @__PURE__ */ u4(Button, { small: true, icon: "copy", onClick: () => copyText(all()), children: t4("action.copy") }),
        /* @__PURE__ */ u4(Button, { small: true, icon: "download", onClick: () => downloadFile(all(), `undiscord-log-${timestampForFile()}.txt`, "text/plain"), children: t4("action.export") }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "trash", onClick: () => logs.clear(), children: t4("action.clear") })
      ] }),
      /* @__PURE__ */ u4("div", { class: "card flat", children: shown.length === 0 ? /* @__PURE__ */ u4(Empty, { icon: "log", children: t4("logs.empty") }) : /* @__PURE__ */ u4("div", { class: "scroll log", style: { maxHeight: "460px" }, ref: boxRef, children: shown.map((e4) => /* @__PURE__ */ u4("div", { class: `log-row ${e4.level}`, children: [
        /* @__PURE__ */ u4("span", { class: "lvl" }),
        /* @__PURE__ */ u4("time", { children: new Date(e4.time).toLocaleTimeString() }),
        /* @__PURE__ */ u4("span", { class: e4.sensitive ? "priv" : void 0, children: t4(e4.key, e4.params) })
      ] }, e4.id)) }) })
    ] });
  }

  // src/ui/pages/PackagePage.tsx
  var KIND_ICON = { dm: "message", group: "users", guild: "hash", unknown: "list" };
  function PackagePage() {
    const data = pkg.data.value;
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4(AccountBanner, {}),
      data ? /* @__PURE__ */ u4(PackageTable, {}) : /* @__PURE__ */ u4(PackageIntro, {})
    ] });
  }
  function PackageIntro() {
    const zipRef = T2(null);
    const dirRef = T2(null);
    const loading = pkg.loading.value;
    const error = pkg.error.value;
    const onFiles = (list) => void loadPackage(list ? [...list] : []);
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4("div", { class: "card stack", children: [
        /* @__PURE__ */ u4("p", { style: { margin: 0 }, children: t4("pkg.intro") }),
        /* @__PURE__ */ u4("div", { children: [
          /* @__PURE__ */ u4("div", { class: "label", style: { marginBottom: "6px" }, children: t4("pkg.howTo") }),
          /* @__PURE__ */ u4("ol", { class: "steps", children: [
            /* @__PURE__ */ u4("li", { children: t4("pkg.step1") }),
            /* @__PURE__ */ u4("li", { children: t4("pkg.step2") }),
            /* @__PURE__ */ u4("li", { children: t4("pkg.step3") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u4("div", { class: "picker", children: [
        /* @__PURE__ */ u4("div", { class: "big", children: /* @__PURE__ */ u4(Icon, { name: "package", size: "lg" }) }),
        loading ? /* @__PURE__ */ u4("div", { class: "row", children: [
          /* @__PURE__ */ u4("div", { class: "spinner" }),
          t4("pkg.parsing")
        ] }) : /* @__PURE__ */ u4(M, { children: [
          /* @__PURE__ */ u4(Button, { variant: "primary", icon: "upload", onClick: () => zipRef.current?.click(), children: t4("pkg.chooseZip") }),
          /* @__PURE__ */ u4("button", { type: "button", class: "link small", onClick: () => dirRef.current?.click(), children: t4("pkg.chooseFolder") })
        ] }),
        /* @__PURE__ */ u4("span", { class: "hint", children: [
          /* @__PURE__ */ u4(Icon, { name: "shield", size: "sm", class: "muted" }),
          " ",
          t4("pkg.local")
        ] }),
        /* @__PURE__ */ u4("input", { ref: zipRef, type: "file", accept: ".zip,application/zip,.json", hidden: true, onChange: (e4) => onFiles(e4.currentTarget.files) }),
        /* @__PURE__ */ u4("input", { ref: dirRef, type: "file", hidden: true, ...{ webkitdirectory: "" }, multiple: true, onChange: (e4) => onFiles(e4.currentTarget.files) })
      ] }),
      error && /* @__PURE__ */ u4(Banner, { tone: "danger", title: t4("pkg.error", { error }) })
    ] });
  }
  function PackageTable() {
    const data = pkg.data.value;
    const kind = pkg.kind.value;
    const query = pkg.query.value.trim().toLowerCase();
    const selected = pkg.selected.value;
    const filterValue = filter.value;
    discord.me.value;
    const matches = b2(() => {
      const matcher = packageMatcher();
      const out = /* @__PURE__ */ new Map();
      for (const ch of data.channels) out.set(ch.id, matcher ? matcher(ch).length : 0);
      return out;
    }, [data, filterValue]);
    const kinds = b2(() => {
      const c4 = { dm: 0, group: 0, guild: 0, unknown: 0 };
      for (const ch of data.channels) c4[ch.kind]++;
      return c4;
    }, [data]);
    const rows = data.channels.filter((ch) => (kind === "all" || ch.kind === kind) && (!query || packageChannelLabel(ch).toLowerCase().includes(query)));
    const setSelected = (s4) => pkg.selected.value = s4;
    const toggle = (id) => {
      const next = new Set(pkg.selected.peek());
      if (!next.delete(id)) next.add(id);
      setSelected(next);
    };
    const allRowsOn = rows.length > 0 && rows.every((r4) => selected.has(r4.id));
    const toggleRows = () => {
      const next = new Set(pkg.selected.peek());
      for (const r4 of rows) allRowsOn ? next.delete(r4.id) : next.add(r4.id);
      setSelected(next);
    };
    const matchingSelected = data.channels.reduce((n3, ch) => n3 + (selected.has(ch.id) ? matches.get(ch.id) ?? 0 : 0), 0);
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4("div", { class: "row wrap", children: [
        /* @__PURE__ */ u4("span", { class: "pill accent", children: [
          /* @__PURE__ */ u4(Icon, { name: "package", size: "sm" }),
          t4("pkg.summary", { channels: fmt(data.channels.length), messages: fmt(data.totalMessages) })
        ] }),
        /* @__PURE__ */ u4("div", { class: "spacer" }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "refresh", onClick: () => pkg.data.value = null, children: t4("pkg.change") })
      ] }),
      /* @__PURE__ */ u4(Banner, { tone: "info", icon: "filter", children: t4("pkg.filtersNote") }),
      /* @__PURE__ */ u4("div", { class: "card flat", children: [
        /* @__PURE__ */ u4("div", { class: "list-toolbar", children: [
          /* @__PURE__ */ u4("div", { class: "input-wrap", children: [
            /* @__PURE__ */ u4(Icon, { name: "search", size: "sm" }),
            /* @__PURE__ */ u4("input", { class: "input", value: pkg.query.value, placeholder: t4("target.filterList"), onInput: (e4) => pkg.query.value = e4.currentTarget.value })
          ] }),
          /* @__PURE__ */ u4(
            Segmented,
            {
              value: kind,
              onChange: (v4) => pkg.kind.value = v4,
              options: [
                { value: "all", label: t4("pkg.kind.all") },
                { value: "dm", label: `${t4("pkg.kind.dm")} ${kinds.dm}` },
                { value: "group", label: `${t4("pkg.kind.group")} ${kinds.group}` },
                { value: "guild", label: `${t4("pkg.kind.guild")} ${kinds.guild}` }
              ]
            }
          )
        ] }),
        /* @__PURE__ */ u4("div", { class: "scroll", style: { maxHeight: "380px" }, children: rows.length === 0 ? /* @__PURE__ */ u4(Empty, { icon: "search", children: t4("target.empty") }) : /* @__PURE__ */ u4("table", { class: "table", children: [
          /* @__PURE__ */ u4("thead", { children: /* @__PURE__ */ u4("tr", { children: [
            /* @__PURE__ */ u4("th", { style: { width: "34px" }, children: /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: allRowsOn, onChange: toggleRows, "aria-label": t4("target.all") }) }),
            /* @__PURE__ */ u4("th", { children: t4("pkg.colName") }),
            /* @__PURE__ */ u4("th", { class: "num", children: t4("run.matched") }),
            /* @__PURE__ */ u4("th", { class: "num", children: t4("pkg.colTotal") })
          ] }) }),
          /* @__PURE__ */ u4("tbody", { children: rows.map((ch) => /* @__PURE__ */ u4(PackageRow, { ch, on: selected.has(ch.id), matching: matches.get(ch.id) ?? 0, onToggle: () => toggle(ch.id) }, ch.id)) })
        ] }) }),
        /* @__PURE__ */ u4("div", { class: "list-foot", children: [
          /* @__PURE__ */ u4(Icon, { name: "filter", size: "sm" }),
          /* @__PURE__ */ u4("b", { children: t4("pkg.matching", { n: fmt(matchingSelected) }) })
        ] })
      ] })
    ] });
  }
  function PackageRow(props) {
    const { ch } = props;
    const range = b2(() => {
      if (!ch.messages.length) return null;
      const ids = ch.messages.map((m3) => m3.id);
      return `${formatDay(snowflakeToDate(minSnowflake(ids)))} → ${formatDay(snowflakeToDate(maxSnowflake(ids)))}`;
    }, [ch]);
    return /* @__PURE__ */ u4("tr", { onClick: props.onToggle, style: { cursor: "pointer" }, children: [
      /* @__PURE__ */ u4("td", { children: /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: props.on, onClick: (e4) => e4.stopPropagation(), onChange: props.onToggle }) }),
      /* @__PURE__ */ u4("td", { class: "name", children: /* @__PURE__ */ u4("div", { class: "row", children: [
        /* @__PURE__ */ u4(Icon, { name: KIND_ICON[ch.kind], size: "sm", class: "muted" }),
        /* @__PURE__ */ u4("div", { class: "grow", children: [
          /* @__PURE__ */ u4("div", { class: "ellipsis priv", children: packageChannelLabel(ch) }),
          /* @__PURE__ */ u4("div", { class: "muted", children: range ?? t4("pkg.indexOnly") })
        ] })
      ] }) }),
      /* @__PURE__ */ u4("td", { class: "num", children: ch.messages.length ? fmt(props.matching) : "—" }),
      /* @__PURE__ */ u4("td", { class: "num muted", children: fmt(ch.messages.length) })
    ] });
  }

  // src/ui/pages/SettingsPage.tsx
  function SettingsPage() {
    const s4 = settings.value;
    const set = updateSettings;
    const speed = speedValues();
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4(Section, { title: t4("settings.account"), children: /* @__PURE__ */ u4(AccountCard, {}) }),
      /* @__PURE__ */ u4(Section, { title: t4("settings.speed"), children: /* @__PURE__ */ u4("div", { class: "card stack", children: [
        /* @__PURE__ */ u4(
          Segmented,
          {
            full: true,
            value: s4.speed,
            onChange: (v4) => set(v4 === "custom" ? { speed: v4, ...speed } : { speed: v4 }),
            options: [
              { value: "safe", label: t4("speed.safe"), icon: "shield" },
              { value: "balanced", label: t4("speed.balanced") },
              { value: "fast", label: t4("speed.fast"), icon: "zap" },
              { value: "custom", label: t4("speed.custom"), icon: "sliders" }
            ]
          }
        ),
        /* @__PURE__ */ u4("div", { class: "grid-2", children: [
          /* @__PURE__ */ u4(
            RangeField,
            {
              label: t4("settings.searchDelay"),
              value: speed.searchDelay,
              min: 300,
              max: 15e3,
              step: 100,
              onChange: (v4) => set({ speed: "custom", searchDelay: v4, deleteDelay: speed.deleteDelay })
            }
          ),
          /* @__PURE__ */ u4(
            RangeField,
            {
              label: t4("settings.deleteDelay"),
              value: speed.deleteDelay,
              min: 150,
              max: 1e4,
              step: 50,
              onChange: (v4) => set({ speed: "custom", deleteDelay: v4, searchDelay: speed.searchDelay })
            }
          )
        ] }),
        speed.deleteDelay < 500 && /* @__PURE__ */ u4(Banner, { tone: "warn", title: t4("settings.speedWarning") }),
        /* @__PURE__ */ u4(Switch, { checked: s4.adaptive, onChange: (v4) => set({ adaptive: v4 }), label: t4("settings.adaptive"), desc: t4("settings.adaptiveDesc") }),
        /* @__PURE__ */ u4("div", { class: "grid-2", children: [
          /* @__PURE__ */ u4(RangeField, { label: t4("settings.maxAttempts"), value: s4.maxAttempts, min: 1, max: 8, step: 1, unit: "", onChange: (v4) => set({ maxAttempts: v4 }) }),
          /* @__PURE__ */ u4(RangeField, { label: t4("settings.emptyRetries"), value: s4.emptyPageRetries, min: 0, max: 10, step: 1, unit: "", onChange: (v4) => set({ emptyPageRetries: v4 }) })
        ] })
      ] }) }),
      /* @__PURE__ */ u4(Section, { title: t4("settings.safety"), children: /* @__PURE__ */ u4("div", { class: "card stack tight", children: [
        /* @__PURE__ */ u4(Switch, { checked: s4.confirm, onChange: (v4) => set({ confirm: v4 }), label: t4("settings.confirm") }),
        /* @__PURE__ */ u4(Switch, { checked: s4.privacy, onChange: (v4) => set({ privacy: v4 }), label: t4("settings.privacy"), desc: t4("settings.privacyDesc") }),
        /* @__PURE__ */ u4(Switch, { checked: s4.archive, onChange: (v4) => set({ archive: v4 }), label: t4("settings.archive"), desc: t4("settings.archiveDesc") })
      ] }) }),
      /* @__PURE__ */ u4(Section, { title: t4("settings.end"), children: /* @__PURE__ */ u4("div", { class: "card stack tight", children: [
        /* @__PURE__ */ u4(
          Switch,
          {
            checked: s4.notify,
            onChange: async (v4) => {
              set({ notify: v4 });
              if (v4) await requestNotificationPermission();
            },
            label: t4("settings.notify"),
            desc: t4("settings.notifyDesc")
          }
        ),
        /* @__PURE__ */ u4(Switch, { checked: s4.sound, onChange: (v4) => set({ sound: v4 }), label: t4("settings.sound") })
      ] }) }),
      /* @__PURE__ */ u4(Section, { title: t4("settings.general"), children: /* @__PURE__ */ u4("div", { class: "card stack", children: [
        /* @__PURE__ */ u4("div", { class: "grid-2", children: [
          /* @__PURE__ */ u4(Field, { label: t4("settings.lang"), children: /* @__PURE__ */ u4(
            Segmented,
            {
              value: s4.lang,
              onChange: (v4) => set({ lang: v4 }),
              options: [
                { value: "auto", label: t4("lang.auto") },
                { value: "fr", label: "Français" },
                { value: "en", label: "English" }
              ]
            }
          ) }),
          /* @__PURE__ */ u4(Field, { label: t4("settings.theme"), children: /* @__PURE__ */ u4(
            Segmented,
            {
              value: s4.theme,
              onChange: (v4) => set({ theme: v4 }),
              options: [
                { value: "auto", label: t4("theme.auto") },
                { value: "dark", label: t4("theme.dark") },
                { value: "light", label: t4("theme.light") }
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ u4(Field, { label: t4("settings.fab"), hint: t4("settings.fabDesc"), children: /* @__PURE__ */ u4(
          Segmented,
          {
            value: s4.fab,
            onChange: (v4) => set({ fab: v4 }),
            options: [
              { value: "auto", label: t4("fab.auto") },
              { value: "always", label: t4("fab.always") },
              { value: "never", label: t4("fab.never") }
            ]
          }
        ) }),
        /* @__PURE__ */ u4("div", { class: "row", children: [
          /* @__PURE__ */ u4("span", { class: "grow", children: t4("settings.shortcutDesc") }),
          /* @__PURE__ */ u4("kbd", { children: SHORTCUT_LABEL })
        ] })
      ] }) }),
      /* @__PURE__ */ u4(Section, { title: t4("settings.about"), children: /* @__PURE__ */ u4("div", { class: "card stack tight", children: [
        /* @__PURE__ */ u4("div", { class: "row", children: [
          /* @__PURE__ */ u4("div", { class: "logo", children: /* @__PURE__ */ u4(Icon, { name: "trash", size: "sm" }) }),
          /* @__PURE__ */ u4("div", { class: "grow", children: [
            /* @__PURE__ */ u4("b", { children: APP_NAME }),
            " ",
            /* @__PURE__ */ u4("span", { class: "muted small", children: [
              "v",
              VERSION
            ] }),
            /* @__PURE__ */ u4("div", { class: "small", children: t4("settings.madeBy", { author: AUTHOR }) }),
            /* @__PURE__ */ u4("div", { class: "hint", children: t4("settings.aboutDesc") })
          ] })
        ] }),
        /* @__PURE__ */ u4(Banner, { tone: "warn", icon: "shield", children: t4("settings.tos") }),
        /* @__PURE__ */ u4("div", { class: "row end", children: [
          /* @__PURE__ */ u4("a", { class: "btn sm ghost", href: REPO_URL, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ u4(Icon, { name: "external", size: "sm" }),
            "GitHub"
          ] }),
          /* @__PURE__ */ u4(
            Button,
            {
              small: true,
              variant: "ghost",
              icon: "refresh",
              onClick: () => {
                settings.value = defaultSettings;
                toast("success", "toast.resetDone");
              },
              children: t4("settings.reset")
            }
          )
        ] })
      ] }) })
    ] });
  }
  function AccountCard() {
    const me = discord.me.value;
    const state = discord.tokenState.value;
    const source = discord.token.value?.source;
    const [draft, setDraft] = d2("");
    const [show, setShow] = d2(false);
    const submit = () => {
      if (!draft.trim()) return;
      void useManualToken(draft);
      setDraft("");
    };
    return /* @__PURE__ */ u4("div", { class: "card stack", children: [
      /* @__PURE__ */ u4("div", { class: "row", children: [
        /* @__PURE__ */ u4(Avatar, { url: avatarUrl(me), name: userName(me), size: "lg", icon: me ? void 0 : "user" }),
        /* @__PURE__ */ u4("div", { class: "grow", children: [
          /* @__PURE__ */ u4("b", { class: "priv", children: me ? userName(me) : "—" }),
          /* @__PURE__ */ u4("div", { class: "hint", children: state === "ok" && source ? /* @__PURE__ */ u4("span", { class: "pill success", children: [
            /* @__PURE__ */ u4(Icon, { name: "check", size: "sm" }),
            t4("settings.token"),
            " ",
            t4(`token.${source}`)
          ] }) : state === "invalid" ? /* @__PURE__ */ u4("span", { class: "pill danger", children: t4("account.invalid") }) : state === "missing" ? /* @__PURE__ */ u4("span", { class: "pill warn", children: t4("account.missing") }) : /* @__PURE__ */ u4("span", { class: "pill", children: t4("account.detecting") }) })
        ] }),
        /* @__PURE__ */ u4(Button, { small: true, icon: "refresh", onClick: () => void refreshToken(), children: t4("settings.redetect") })
      ] }),
      /* @__PURE__ */ u4(Field, { label: t4("settings.manualToken"), hint: t4("settings.manualTokenHint"), children: /* @__PURE__ */ u4("div", { class: "row", children: [
        /* @__PURE__ */ u4("div", { class: "input-wrap grow", children: [
          /* @__PURE__ */ u4(Icon, { name: "key", size: "sm" }),
          /* @__PURE__ */ u4(
            "input",
            {
              class: "input mono",
              type: show ? "text" : "password",
              name: "undiscord-manual-token",
              autocomplete: "off",
              "data-1p-ignore": true,
              "data-lpignore": "true",
              "data-bwignore": true,
              spellcheck: false,
              value: draft,
              placeholder: t4("settings.manualTokenPh"),
              onInput: (e4) => setDraft(e4.currentTarget.value),
              onKeyDown: (e4) => e4.key === "Enter" && submit()
            }
          )
        ] }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "eye", onClick: () => setShow(!show) }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "primary", disabled: !draft.trim(), onClick: submit, children: t4("settings.useToken") }),
        source === "manual" && /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", onClick: forgetManualToken, children: t4("settings.forgetToken") })
      ] }) })
    ] });
  }

  // src/ui/App.tsx
  function App() {
    const s4 = settings.value;
    const rect = ui.rect.value;
    const classes = ["root", rect.w < 680 && "compact", rect.w < 600 && "narrow", s4.privacy && "privacy"].filter(Boolean).join(" ");
    return /* @__PURE__ */ u4("div", { class: classes, "data-theme": isLight.value ? "light" : "dark", children: [
      ui.open.value && /* @__PURE__ */ u4(Window, {}),
      /* @__PURE__ */ u4(Fab, {}),
      /* @__PURE__ */ u4(Toasts, {})
    ] });
  }
  var toggleWindow = () => ui.open.value = !ui.open.value;
  var NAV = [
    { tab: "wipe", icon: "trash", label: "nav.wipe" },
    { tab: "package", icon: "package", label: "nav.package" },
    { tab: "archive", icon: "archive", label: "nav.archive" },
    { tab: "logs", icon: "log", label: "nav.logs" },
    { tab: "settings", icon: "sliders", label: "nav.settings" }
  ];
  function startPointerDrag(e4, onMove) {
    const el = e4.currentTarget;
    const x0 = e4.clientX;
    const y0 = e4.clientY;
    el.setPointerCapture(e4.pointerId);
    const move = (ev) => onMove(ev.clientX - x0, ev.clientY - y0);
    const end = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      saveRect();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }
  function Window() {
    const rect = ui.rect.value;
    const tab = ui.tab.value;
    A(() => {
      const onResize = () => ui.rect.value = clampRect(ui.rect.value);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);
    const onHeaderDown = (e4) => {
      if (e4.button !== 0 || e4.target.closest("button")) return;
      const start = ui.rect.value;
      startPointerDrag(e4, (dx, dy) => ui.rect.value = clampRect({ ...start, x: start.x + dx, y: start.y + dy }));
    };
    const onResizeDown = (e4) => {
      if (e4.button !== 0) return;
      const start = ui.rect.value;
      startPointerDrag(e4, (dx, dy) => ui.rect.value = clampRect({ ...start, w: start.w + dx, h: start.h + dy }));
    };
    return /* @__PURE__ */ u4("div", { class: "win", style: { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.w}px`, height: `${rect.h}px` }, role: "dialog", "aria-label": BRAND, children: [
      /* @__PURE__ */ u4("header", { class: "win-header", onPointerDown: onHeaderDown, children: [
        /* @__PURE__ */ u4("div", { class: "logo", children: /* @__PURE__ */ u4(Icon, { name: "trash", size: "sm" }) }),
        /* @__PURE__ */ u4("div", { class: "win-title", children: [
          /* @__PURE__ */ u4("b", { children: APP_NAME }),
          /* @__PURE__ */ u4("span", { children: [
            "by ",
            AUTHOR,
            " · ",
            t4("app.tagline")
          ] })
        ] }),
        /* @__PURE__ */ u4(StatusPill, {}),
        /* @__PURE__ */ u4("div", { class: "spacer" }),
        /* @__PURE__ */ u4("kbd", { title: t4("settings.shortcutDesc"), class: "muted", style: { fontSize: "11px" }, children: SHORTCUT_LABEL }),
        /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", icon: "x", title: t4("action.close"), "aria-label": t4("action.close"), onClick: () => ui.open.value = false })
      ] }),
      /* @__PURE__ */ u4("div", { class: "win-body", children: [
        /* @__PURE__ */ u4("nav", { class: "nav", "aria-label": APP_NAME, children: [
          NAV.map((n3) => /* @__PURE__ */ u4("button", { type: "button", class: `nav-item${tab === n3.tab ? " active" : ""}`, onClick: () => ui.tab.value = n3.tab, title: t4(n3.label), "aria-current": tab === n3.tab ? "page" : void 0, children: [
            /* @__PURE__ */ u4(Icon, { name: n3.icon }),
            /* @__PURE__ */ u4("span", { class: "nav-label", children: t4(n3.label) }),
            /* @__PURE__ */ u4(NavCount, { tab: n3.tab })
          ] })),
          /* @__PURE__ */ u4(AccountChip, {})
        ] }),
        /* @__PURE__ */ u4("main", { class: "content scroll", children: [
          tab === "wipe" && /* @__PURE__ */ u4(WipePage, {}),
          tab === "package" && /* @__PURE__ */ u4(PackagePage, {}),
          tab === "archive" && /* @__PURE__ */ u4(ArchivePage, {}),
          tab === "logs" && /* @__PURE__ */ u4(LogsPage, {}),
          tab === "settings" && /* @__PURE__ */ u4(SettingsPage, {})
        ] }, tab)
      ] }),
      /* @__PURE__ */ u4(Footer, {}),
      /* @__PURE__ */ u4("div", { class: "resize", onPointerDown: onResizeDown, "aria-hidden": "true" }),
      /* @__PURE__ */ u4(ConfirmDialog, {})
    ] });
  }
  function NavCount({ tab }) {
    if (tab === "archive") {
      archive.version.value;
      const n3 = archive.items.length;
      return n3 ? /* @__PURE__ */ u4("span", { class: "count", children: n3 > 999 ? `${Math.floor(n3 / 1e3)}k` : n3 }) : null;
    }
    if (tab === "logs") {
      logs.version.value;
      const errors = logs.items.filter((e4) => e4.level === "error").length;
      return errors ? /* @__PURE__ */ u4("span", { class: "count", style: { background: "var(--danger-soft)", color: "var(--danger-text)" }, children: errors }) : null;
    }
    return null;
  }
  function AccountChip() {
    const me = discord.me.value;
    const state = discord.tokenState.value;
    const color = state === "ok" ? "var(--success)" : state === "invalid" ? "var(--danger)" : "var(--warn)";
    return /* @__PURE__ */ u4("div", { class: "account", onClick: () => ui.tab.value = "settings", title: me ? t4("account.as", { name: userName(me) }) : t4(`account.${state === "ok" ? "detecting" : state}`), children: [
      /* @__PURE__ */ u4(Avatar, { url: avatarUrl(me), name: userName(me), size: "sm", icon: me ? void 0 : "user" }),
      /* @__PURE__ */ u4("div", { class: "who", children: [
        /* @__PURE__ */ u4("b", { class: "priv", children: me ? userName(me) : "—" }),
        /* @__PURE__ */ u4("span", { children: [
          /* @__PURE__ */ u4("span", { class: "dot", style: { display: "inline-block", color, marginRight: "5px", width: "7px", height: "7px" } }),
          state === "ok" ? "Discord" : t4(`account.${state}`)
        ] })
      ] })
    ] });
  }
  function Footer() {
    const status = run.status.value;
    const active = status === "running" || status === "paused" || status === "stopping";
    const tab = ui.tab.value;
    const view = ui.wipeView.value;
    let content = null;
    if (active) content = /* @__PURE__ */ u4(RunBar, {});
    else if (tab === "wipe" && view === "form") content = /* @__PURE__ */ u4(WipeActions, {});
    else if (tab === "wipe" && view === "results") content = /* @__PURE__ */ u4(ResultsActions, {});
    else if (tab === "package" && pkg.data.value) content = /* @__PURE__ */ u4(PackageActions, {});
    if (!content) return null;
    return /* @__PURE__ */ u4("footer", { class: "win-footer", children: content });
  }
  function RunBar() {
    const status = run.status.value;
    const stats = run.stats.value;
    const pct = percentDone(stats);
    const preview2 = run.kind.value === "preview";
    return /* @__PURE__ */ u4("div", { class: "runbar", children: [
      /* @__PURE__ */ u4(Progress, { value: pct, tone: preview2 ? void 0 : "danger", paused: status === "paused" }),
      /* @__PURE__ */ u4("span", { class: "txt", children: [
        fmt(preview2 ? stats.matched : stats.deleted),
        stats.total !== null && ` / ${fmt(stats.total)}`,
        stats.etaMs !== null && ` · ~${formatDuration(stats.etaMs)}`
      ] }),
      status === "paused" ? /* @__PURE__ */ u4(Button, { small: true, variant: "primary", icon: "play", onClick: resume, children: t4("action.resume") }) : /* @__PURE__ */ u4(Button, { small: true, icon: "pause", onClick: pause, disabled: status !== "running", children: t4("action.pause") }),
      /* @__PURE__ */ u4(Button, { small: true, variant: "danger", icon: "stop", onClick: stop, disabled: status === "stopping", children: t4("action.stop") }),
      (ui.tab.value !== "wipe" || ui.wipeView.value === "form") && /* @__PURE__ */ u4(Button, { small: true, variant: "ghost", title: t4("action.details"), icon: "chevronLeft", onClick: () => {
        ui.tab.value = "wipe";
        ui.wipeView.value = preview2 ? "results" : "run";
      } })
    ] });
  }
  function WipeActions() {
    discord.channelInfo.value;
    discord.dms.value;
    discord.guilds.value;
    const targets = buildTargets();
    const ready = discord.tokenState.value === "ok";
    const summary = targets.length === 0 ? t4("toast.noTarget") : targets.length === 1 ? targets[0].label : `${targets.length} ${t4("run.jobs").toLowerCase()}`;
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4(Icon, { name: targets.length ? "checkCircle" : "info", class: "muted" }),
      /* @__PURE__ */ u4("span", { class: "summary grow priv", children: summary }),
      /* @__PURE__ */ u4(Button, { icon: "eye", disabled: !ready || !targets.length, onClick: () => void startWipe("preview"), children: t4("action.preview") }),
      /* @__PURE__ */ u4(Button, { variant: "danger", icon: "trash", disabled: !ready || !targets.length, onClick: () => void startWipe("delete"), children: t4("action.delete") })
    ] });
  }
  function ResultsActions() {
    preview.results.version.value;
    const excluded = preview.excluded.value;
    const n3 = preview.results.items.length - preview.results.items.filter((r4) => excluded.has(r4.id)).length;
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4(Button, { variant: "ghost", icon: "chevronLeft", onClick: () => ui.wipeView.value = "form", children: t4("action.back") }),
      /* @__PURE__ */ u4("div", { class: "spacer" }),
      /* @__PURE__ */ u4(Button, { variant: "danger", icon: "trash", disabled: !n3 || discord.tokenState.value !== "ok", onClick: () => void deletePreviewSelection(), children: t4("action.deleteSelection", { n: fmt(n3) }) })
    ] });
  }
  function PackageActions() {
    const data = pkg.data.value;
    const selected = pkg.selected.value;
    filter.value;
    discord.me.value;
    const matcher = packageMatcher();
    const n3 = matcher ? data.channels.reduce((sum, ch) => sum + (selected.has(ch.id) ? matcher(ch).length : 0), 0) : 0;
    const ready = discord.tokenState.value === "ok";
    return /* @__PURE__ */ u4(M, { children: [
      /* @__PURE__ */ u4(Icon, { name: "package", class: "muted" }),
      /* @__PURE__ */ u4("span", { class: "summary grow", children: t4("target.selected", { n: selected.size }) }),
      /* @__PURE__ */ u4(Button, { icon: "eye", disabled: !ready || !selected.size, onClick: () => void startPackageWipe("preview"), children: t4("action.preview") }),
      /* @__PURE__ */ u4(Button, { variant: "danger", icon: "trash", disabled: !ready || !selected.size, onClick: () => void startPackageWipe("delete"), children: t4("action.deleteN", { n: fmt(n3) }) })
    ] });
  }
  function ConfirmDialog() {
    const d5 = confirmDialog.value;
    const [typed, setTyped] = d2("");
    const cancelRef = T2(null);
    A(() => {
      setTyped("");
      if (d5) cancelRef.current?.focus();
    }, [!!d5]);
    if (!d5) return null;
    const needsWord = d5.count !== null && d5.count > TYPE_TO_CONFIRM_ABOVE;
    const word = t4("confirm.word");
    const canConfirm = !needsWord || typed.trim().toUpperCase() === word;
    return /* @__PURE__ */ u4("div", { class: "overlay", onClick: (e4) => e4.target === e4.currentTarget && d5.resolve(false), onKeyDown: (e4) => e4.key === "Escape" && d5.resolve(false), children: /* @__PURE__ */ u4("div", { class: "dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "udr-confirm-title", children: [
      /* @__PURE__ */ u4("h2", { id: "udr-confirm-title", children: [
        /* @__PURE__ */ u4("span", { class: "danger-icon", children: /* @__PURE__ */ u4(Icon, { name: "trash" }) }),
        t4("confirm.title")
      ] }),
      d5.counting ? /* @__PURE__ */ u4("p", { class: "row", children: [
        /* @__PURE__ */ u4("span", { class: "spinner" }),
        t4("confirm.counting")
      ] }) : /* @__PURE__ */ u4("p", { class: "big-num", children: d5.count !== null ? t4("confirm.count", { count: fmt(d5.count), targets: d5.targets }) : t4("confirm.countUnknown", { targets: d5.targets }) }),
      /* @__PURE__ */ u4("p", { children: t4("confirm.irreversible") }),
      /* @__PURE__ */ u4("label", { class: "row small", style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ u4("input", { type: "checkbox", class: "check", checked: settings.value.archive, onChange: (e4) => updateSettings({ archive: e4.currentTarget.checked }) }),
        t4("confirm.archive")
      ] }),
      needsWord && /* @__PURE__ */ u4("div", { class: "field", children: [
        /* @__PURE__ */ u4("label", { children: t4("confirm.typeToConfirm", { n: fmt(TYPE_TO_CONFIRM_ABOVE) }) }),
        /* @__PURE__ */ u4("input", { class: "input mono", value: typed, placeholder: word, onInput: (e4) => setTyped(e4.currentTarget.value), onKeyDown: (e4) => e4.key === "Enter" && canConfirm && d5.resolve(true) })
      ] }),
      /* @__PURE__ */ u4("div", { class: "row end", children: [
        /* @__PURE__ */ u4("button", { type: "button", ref: cancelRef, class: "btn", onClick: () => d5.resolve(false), children: t4("action.cancel") }),
        /* @__PURE__ */ u4(Button, { variant: "danger", icon: "trash", disabled: !canConfirm || d5.counting, onClick: () => d5.resolve(true), children: t4("action.delete") })
      ] })
    ] }) });
  }
  function Fab() {
    const mode = settings.value.fab;
    const visible = mode === "always" || mode === "auto" && !ui.toolbarMounted.value;
    if (!visible) return null;
    const status = run.status.value;
    const active = status === "running" || status === "paused";
    const pct = active ? percentDone() : null;
    const r4 = 26;
    const c4 = 2 * Math.PI * r4;
    return /* @__PURE__ */ u4("button", { type: "button", class: "fab", title: `${BRAND} (${SHORTCUT_LABEL})`, "aria-label": BRAND, onClick: toggleWindow, children: [
      /* @__PURE__ */ u4(Icon, { name: "trash" }),
      active && /* @__PURE__ */ u4("svg", { class: "ring", viewBox: "0 0 56 56", "aria-hidden": "true", children: [
        /* @__PURE__ */ u4("circle", { cx: "28", cy: "28", r: r4, stroke: "rgba(255,255,255,.18)" }),
        /* @__PURE__ */ u4(
          "circle",
          {
            cx: "28",
            cy: "28",
            r: r4,
            stroke: "#fff",
            "stroke-linecap": "round",
            transform: "rotate(-90 28 28)",
            "stroke-dasharray": `${c4}`,
            "stroke-dashoffset": `${c4 * (1 - (pct ?? 15) / 100)}`,
            children: pct === null && /* @__PURE__ */ u4("animateTransform", { attributeName: "transform", type: "rotate", from: "0 28 28", to: "360 28 28", dur: "1.2s", repeatCount: "indefinite" })
          }
        )
      ] })
    ] });
  }
  var TOAST_ICON = { info: "info", success: "checkCircle", warn: "alert", error: "xCircle" };
  function Toasts() {
    return /* @__PURE__ */ u4("div", { class: "toasts", role: "status", "aria-live": "polite", children: toasts.value.map((x5) => /* @__PURE__ */ u4("div", { class: `toast ${x5.kind}`, onClick: () => dismissToast(x5.id), children: [
      /* @__PURE__ */ u4(Icon, { name: TOAST_ICON[x5.kind] }),
      x5.text
    ] }, x5.id)) });
  }

  // src/ui/styles.css
  var styles_default = '/* Lives inside a shadow root: nothing here leaks into Discord and vice versa. */\n\n:host { all: initial; }\n\n.root {\n  --font: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;\n  --mono: "gg mono", "JetBrains Mono", Consolas, "Courier New", monospace;\n  --radius: 10px;\n  --radius-lg: 14px;\n  font: 400 14px/1.45 var(--font);\n  color: var(--text);\n  -webkit-font-smoothing: antialiased;\n}\n\n.root[data-theme="dark"] {\n  color-scheme: dark;\n  --bg: #1b1c1f;\n  --bg-2: #222327;\n  --bg-3: #2b2d31;\n  --bg-4: #35373c;\n  --line: rgba(255, 255, 255, 0.07);\n  --line-strong: rgba(255, 255, 255, 0.13);\n  --text: #f2f3f5;\n  --text-2: #b5bac1;\n  --text-3: #80848e;\n  --accent: #5865f2;\n  --accent-2: #4752c4;\n  --accent-soft: rgba(88, 101, 242, 0.16);\n  --accent-text: #c9cdfb;\n  --danger: #e5484d;\n  --danger-2: #c93d42;\n  --danger-soft: rgba(229, 72, 77, 0.14);\n  --danger-text: #ff9b9e;\n  --success: #2bb673;\n  --success-soft: rgba(43, 182, 115, 0.15);\n  --success-text: #7ee2ae;\n  --warn: #f0b232;\n  --warn-soft: rgba(240, 178, 50, 0.14);\n  --warn-text: #f8d48a;\n  --shadow: 0 24px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.07);\n  --shadow-sm: 0 6px 18px rgba(0, 0, 0, 0.35);\n  --overlay: rgba(10, 10, 12, 0.6);\n}\n\n.root[data-theme="light"] {\n  color-scheme: light;\n  --bg: #ffffff;\n  --bg-2: #f6f7f9;\n  --bg-3: #ebedf0;\n  --bg-4: #dfe1e6;\n  --line: rgba(0, 0, 0, 0.07);\n  --line-strong: rgba(0, 0, 0, 0.13);\n  --text: #1d1f23;\n  --text-2: #4e5058;\n  --text-3: #7b7e86;\n  --accent: #5865f2;\n  --accent-2: #4752c4;\n  --accent-soft: rgba(88, 101, 242, 0.12);\n  --accent-text: #3a43b0;\n  --danger: #da373c;\n  --danger-2: #b92d31;\n  --danger-soft: rgba(218, 55, 60, 0.1);\n  --danger-text: #b3262b;\n  --success: #1f9d5f;\n  --success-soft: rgba(31, 157, 95, 0.12);\n  --success-text: #157046;\n  --warn: #c98a0b;\n  --warn-soft: rgba(201, 138, 11, 0.12);\n  --warn-text: #8a5d00;\n  --shadow: 0 24px 70px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.08);\n  --shadow-sm: 0 6px 18px rgba(0, 0, 0, 0.12);\n  --overlay: rgba(30, 31, 34, 0.35);\n}\n\n*, *::before, *::after { box-sizing: border-box; }\nbutton, input, select, textarea { font: inherit; color: inherit; }\nbutton { cursor: pointer; }\n:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n::selection { background: var(--accent-soft); }\n\n.scroll { overflow: auto; scrollbar-width: thin; scrollbar-color: var(--bg-4) transparent; }\n.scroll::-webkit-scrollbar { width: 10px; height: 10px; }\n.scroll::-webkit-scrollbar-thumb { background: var(--bg-4); border-radius: 10px; border: 3px solid transparent; background-clip: padding-box; }\n\n/* ---- window ---------------------------------------------------------- */\n\n.win {\n  position: fixed;\n  z-index: 2147483000;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n  background: var(--bg);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow);\n  overflow: hidden;\n  animation: win-in 0.16s ease-out;\n}\n@keyframes win-in { from { opacity: 0; transform: translateY(6px) scale(0.99); } }\n\n.win-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  height: 52px;\n  padding: 0 8px 0 14px;\n  border-bottom: 1px solid var(--line);\n  cursor: grab;\n  user-select: none;\n  touch-action: none;\n}\n.win-header:active { cursor: grabbing; }\n.win-title { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }\n.win-title b { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }\n.win-title span { font-size: 12px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.win-header kbd { white-space: nowrap; }\n.root.compact .win-header kbd { display: none; }\n.logo {\n  width: 30px; height: 30px; border-radius: 9px; flex: none;\n  display: grid; place-items: center; color: #fff;\n  background: linear-gradient(135deg, #7983f5 0%, #5865f2 45%, #4049c9 100%);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 4px 12px rgba(88,101,242,.35);\n}\n.spacer { flex: 1; }\n\n.win-body { display: grid; grid-template-columns: 196px minmax(0, 1fr); min-height: 0; }\n.root.compact .win-body { grid-template-columns: 58px minmax(0, 1fr); }\n\n.nav {\n  display: flex; flex-direction: column; gap: 2px;\n  padding: 10px 8px; background: var(--bg-2); border-right: 1px solid var(--line); min-height: 0;\n}\n.nav-item {\n  all: unset; box-sizing: border-box; cursor: pointer;\n  display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 11px;\n  border-radius: 9px; color: var(--text-2); font-weight: 500; position: relative;\n}\n.nav-item:hover { background: var(--bg-3); color: var(--text); }\n.nav-item.active { background: var(--accent-soft); color: var(--text); }\n.nav-item.active svg { color: var(--accent); }\n.nav-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.nav-item .count {\n  margin-left: auto; font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: 99px;\n  background: var(--bg-4); color: var(--text-2);\n}\n.root.compact .nav-item { justify-content: center; padding: 0; }\n.root.compact .nav-item .nav-label, .root.compact .nav-item .count, .root.compact .account .who { display: none; }\n\n.account {\n  margin-top: auto; display: flex; align-items: center; gap: 9px; padding: 8px;\n  border-radius: 10px; background: var(--bg-3); min-width: 0; cursor: pointer;\n}\n.account:hover { background: var(--bg-4); }\n.root.compact .account { justify-content: center; padding: 6px 0; background: none; }\n.account .who { min-width: 0; display: flex; flex-direction: column; line-height: 1.2; }\n.account .who b { font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.account .who span { font-size: 11px; color: var(--text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n\n.content { padding: 18px 20px 28px; min-height: 0; }\n.content > * + * { margin-top: 18px; }\n\n.win-footer {\n  display: flex; align-items: center; gap: 10px; padding: 10px 14px;\n  border-top: 1px solid var(--line); background: var(--bg); min-height: 58px;\n}\n.win-footer .summary { min-width: 0; color: var(--text-2); font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\n.resize {\n  position: absolute; right: 0; bottom: 0; width: 18px; height: 18px; cursor: nwse-resize; touch-action: none;\n  background: linear-gradient(135deg, transparent 50%, var(--line-strong) 50%, var(--line-strong) 58%, transparent 58%, transparent 70%, var(--line-strong) 70%, var(--line-strong) 78%, transparent 78%);\n}\n\n/* ---- primitives ---------------------------------------------------------- */\n\n.icon { width: 18px; height: 18px; flex: none; display: block; }\n.icon.sm { width: 15px; height: 15px; }\n.icon.lg { width: 22px; height: 22px; }\n\n.btn {\n  all: unset; box-sizing: border-box; cursor: pointer; user-select: none;\n  display: inline-flex; align-items: center; justify-content: center; gap: 7px;\n  height: 36px; padding: 0 14px; border-radius: 9px; font-weight: 600; font-size: 14px; white-space: nowrap;\n  background: var(--bg-3); color: var(--text); transition: background 0.12s, transform 0.06s, opacity 0.12s;\n}\n.btn:hover { background: var(--bg-4); }\n.btn:active { transform: translateY(1px); }\n.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n.btn[disabled] { opacity: 0.45; pointer-events: none; }\n.btn.primary { background: var(--accent); color: #fff; }\n.btn.primary:hover { background: var(--accent-2); }\n.btn.danger { background: var(--danger); color: #fff; }\n.btn.danger:hover { background: var(--danger-2); }\n.btn.ghost { background: transparent; color: var(--text-2); }\n.btn.ghost:hover { background: var(--bg-3); color: var(--text); }\n.btn.sm { height: 30px; padding: 0 10px; font-size: 13px; border-radius: 8px; gap: 6px; }\n.btn.icon-only { width: 36px; padding: 0; }\n.btn.sm.icon-only { width: 30px; }\n\n.input, .textarea, .select {\n  width: 100%; height: 36px; padding: 0 11px; border-radius: 9px; border: 1px solid var(--line);\n  background: var(--bg-2); color: var(--text); outline: none; transition: border-color 0.12s, box-shadow 0.12s;\n}\n.textarea { height: auto; min-height: 92px; padding: 9px 11px; resize: vertical; font-family: var(--mono); font-size: 13px; }\n.input:hover, .textarea:hover { border-color: var(--line-strong); }\n.input:focus, .textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }\n.input.invalid { border-color: var(--danger); box-shadow: 0 0 0 3px var(--danger-soft); }\n.input::placeholder, .textarea::placeholder { color: var(--text-3); }\n.input-wrap { position: relative; display: flex; align-items: center; }\n.input-wrap > .icon { position: absolute; left: 10px; color: var(--text-3); pointer-events: none; }\n.input-wrap > .input { padding-left: 34px; }\n.input.mono { font-family: var(--mono); font-size: 13px; }\n\n.field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }\n.field > label, .label {\n  font-size: 12px; font-weight: 700; color: var(--text-2); text-transform: uppercase; letter-spacing: 0.04em;\n}\n.hint { font-size: 12.5px; color: var(--text-3); line-height: 1.4; }\n.hint.error { color: var(--danger-text); }\n.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }\n.row { display: flex; align-items: center; gap: 8px; min-width: 0; }\n.row.wrap { flex-wrap: wrap; }\n.row.end { justify-content: flex-end; }\n.root.narrow .grid-2 { grid-template-columns: minmax(0, 1fr); }\n\n.seg {\n  display: inline-flex; flex-wrap: wrap; gap: 3px; padding: 3px; border-radius: 11px; background: var(--bg-2);\n  border: 1px solid var(--line);\n}\n.seg button {\n  all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: 7px;\n  height: 32px; padding: 0 12px; border-radius: 8px; font-weight: 600; font-size: 13px; color: var(--text-2);\n}\n.seg button:hover { color: var(--text); background: var(--bg-3); }\n.seg button.on { background: var(--bg-4); color: var(--text); box-shadow: var(--shadow-sm); }\n.root[data-theme="light"] .seg button.on { background: var(--bg); }\n.seg button:focus-visible { outline: 2px solid var(--accent); }\n.seg.full { display: flex; }\n.seg.full button { flex: 1; justify-content: center; }\n\n.chips { display: flex; flex-wrap: wrap; gap: 6px; }\n.chip {\n  all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;\n  height: 30px; padding: 0 11px; border-radius: 99px; border: 1px solid var(--line-strong);\n  font-size: 13px; font-weight: 500; color: var(--text-2); transition: all 0.12s;\n}\n.chip:hover { color: var(--text); border-color: var(--text-3); }\n.chip.on { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }\n.chip.on.neg { background: var(--danger-soft); border-color: var(--danger); }\n.chip:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n.switch { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; padding: 4px 0; }\n.switch .track {\n  position: relative; flex: none; width: 38px; height: 22px; border-radius: 99px; margin-top: 1px;\n  background: var(--bg-4); transition: background 0.15s;\n}\n.switch .track::after {\n  content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%;\n  background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.3); transition: transform 0.15s;\n}\n.switch.on .track { background: var(--accent); }\n.switch.on .track::after { transform: translateX(16px); }\n.switch input { position: absolute; opacity: 0; pointer-events: none; }\n.switch .text { display: flex; flex-direction: column; gap: 2px; }\n.switch .text b { font-weight: 600; font-size: 14px; }\n.switch:focus-within .track { box-shadow: 0 0 0 3px var(--accent-soft); }\n\n.check {\n  appearance: none; -webkit-appearance: none; flex: none; width: 18px; height: 18px; margin: 0; border-radius: 5px;\n  border: 2px solid var(--text-3); display: grid; place-items: center; cursor: pointer; transition: all 0.1s;\n}\n.check:checked { background: var(--accent); border-color: var(--accent); }\n.check:checked::after {\n  content: ""; width: 9px; height: 5px; border: 2px solid #fff; border-top: 0; border-right: 0;\n  transform: translateY(-1px) rotate(-45deg);\n}\n.check:indeterminate { background: var(--accent); border-color: var(--accent); }\n.check:indeterminate::after { content: ""; width: 8px; height: 2px; background: #fff; border-radius: 2px; }\n\n.section { display: flex; flex-direction: column; gap: 12px; }\n.section-head { display: flex; align-items: center; gap: 8px; min-height: 26px; }\n.section-head h3 {\n  margin: 0; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3);\n}\n.section-head .toggle { all: unset; cursor: pointer; display: flex; align-items: center; gap: 8px; }\n.section-head .toggle .icon { color: var(--text-3); transition: transform 0.15s; }\n.section-head .toggle.closed .icon { transform: rotate(-90deg); }\n\n.card {\n  background: var(--bg-2); border: 1px solid var(--line); border-radius: 12px; padding: 14px;\n}\n.card.flat { padding: 0; overflow: hidden; }\n.stack { display: flex; flex-direction: column; gap: 14px; }\n.stack.tight { gap: 8px; }\n\n.pill {\n  display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 9px; border-radius: 99px;\n  font-size: 12px; font-weight: 700; background: var(--bg-3); color: var(--text-2); white-space: nowrap;\n}\n.pill.accent { background: var(--accent-soft); color: var(--accent-text); }\n.pill.success { background: var(--success-soft); color: var(--success-text); }\n.pill.warn { background: var(--warn-soft); color: var(--warn-text); }\n.pill.danger { background: var(--danger-soft); color: var(--danger-text); }\n.dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; flex: none; }\n.dot.pulse { animation: pulse 1.4s ease-in-out infinite; }\n@keyframes pulse { 50% { opacity: 0.35; } }\n\n.avatar {\n  width: 32px; height: 32px; border-radius: 50%; flex: none; overflow: hidden; display: grid; place-items: center;\n  background: var(--bg-4); color: var(--text-2); font-size: 12px; font-weight: 700;\n}\n.avatar.square { border-radius: 10px; }\n.avatar.sm { width: 26px; height: 26px; font-size: 11px; }\n.avatar.lg { width: 44px; height: 44px; font-size: 15px; }\n.avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }\n\n.banner { display: flex; gap: 12px; align-items: flex-start; padding: 12px 14px; border-radius: 12px; border: 1px solid; }\n.banner .icon { margin-top: 1px; }\n.banner > div { flex: 1; min-width: 0; }\n.banner b { display: block; margin-bottom: 2px; }\n.banner.warn { background: var(--warn-soft); border-color: color-mix(in srgb, var(--warn) 35%, transparent); color: var(--warn-text); }\n.banner.info { background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 35%, transparent); color: var(--accent-text); }\n.banner.danger { background: var(--danger-soft); border-color: color-mix(in srgb, var(--danger) 35%, transparent); color: var(--danger-text); }\n.banner .hint { color: inherit; opacity: 0.85; }\n\n.empty {\n  display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 10px;\n  padding: 28px 16px; color: var(--text-3);\n}\n.empty .icon { width: 30px; height: 30px; opacity: 0.6; }\n\n.spinner {\n  width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--bg-4); border-top-color: var(--accent);\n  animation: spin 0.7s linear infinite; flex: none;\n}\n@keyframes spin { to { transform: rotate(360deg); } }\n\n/* ---- target ---------------------------------------------------------------- */\n\n.current {\n  display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 12px;\n  background: var(--bg-2); border: 1px solid var(--line);\n}\n.current .meta { min-width: 0; flex: 1; }\n.current .meta b { display: block; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.current .meta span { font-size: 13px; color: var(--text-3); }\n\n.list { max-height: 280px; }\n.list-toolbar { display: flex; gap: 6px; padding: 8px; border-bottom: 1px solid var(--line); flex-wrap: wrap; align-items: center; }\n.list-toolbar .input-wrap { flex: 1; min-width: 160px; }\n.list-toolbar .input { height: 32px; }\n.list-row {\n  display: flex; align-items: center; gap: 11px; padding: 7px 12px; cursor: pointer; min-height: 46px;\n  border-bottom: 1px solid var(--line);\n}\n.list-row:last-child { border-bottom: 0; }\n.list-row:hover { background: var(--bg-3); }\n.list-row.on { background: var(--accent-soft); }\n.list-row .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }\n.list-row .sub { font-size: 12px; color: var(--text-3); }\n.list-row .num { font-variant-numeric: tabular-nums; font-size: 12.5px; font-weight: 700; color: var(--text-2); }\n.list-row.sub-row { min-height: 38px; padding-left: 30px; }\n.list-row.off .name { color: var(--text-3); text-decoration: line-through; }\n.list-group {\n  display: flex; align-items: center; gap: 11px; padding: 10px 12px 6px; cursor: pointer;\n  font-size: 11.5px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-3);\n}\n.icon.rot { transform: rotate(-90deg); }\n.list-foot { padding: 7px 12px; font-size: 12px; color: var(--text-3); border-top: 1px solid var(--line); display: flex; gap: 8px; align-items: center; }\n\n.presets {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 10px;\n  border-radius: 12px; background: var(--bg-2); border: 1px solid var(--line);\n}\n.presets > .label { display: inline-flex; align-items: center; gap: 6px; margin-right: 4px; }\n.preset-chip {\n  display: inline-flex; align-items: center; height: 30px; border-radius: 99px; overflow: hidden;\n  background: var(--accent-soft); border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);\n}\n.preset-chip button {\n  all: unset; box-sizing: border-box; cursor: pointer; height: 100%; display: inline-flex; align-items: center;\n  padding: 0 4px 0 12px; font-size: 13px; font-weight: 600; color: var(--text);\n}\n.preset-chip button:hover { color: var(--accent-text); }\n.preset-chip button[disabled] { opacity: 0.5; pointer-events: none; }\n.preset-chip button.x { padding: 0 9px 0 6px; color: var(--text-3); }\n.preset-chip button.x:hover { color: var(--danger-text); }\n.preset-chip button:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }\n.input.sm { height: 30px; width: 190px; }\n\n.mode-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }\n.root.narrow .mode-cards { grid-template-columns: minmax(0, 1fr); }\n.mode-card {\n  all: unset; box-sizing: border-box; cursor: pointer; display: flex; gap: 11px; align-items: flex-start;\n  padding: 12px 13px; border-radius: 12px; border: 1px solid var(--line-strong); background: var(--bg-2);\n}\n.mode-card:hover { border-color: var(--text-3); }\n.mode-card.on { border-color: var(--accent); background: var(--accent-soft); }\n.mode-card.on > .icon { color: var(--accent); }\n.mode-card b { display: block; font-size: 14px; }\n.mode-card span { font-size: 12.5px; color: var(--text-3); }\n.mode-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\n\n/* ---- run dashboard ------------------------------------------------------------- */\n\n.hero { display: flex; flex-direction: column; gap: 12px; }\n.hero-top { display: flex; align-items: flex-end; gap: 14px; }\n.hero-pct { font-size: 40px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }\n.hero-sub { color: var(--text-2); font-size: 13px; padding-bottom: 4px; }\n.progress { height: 10px; border-radius: 99px; background: var(--bg-3); overflow: hidden; position: relative; }\n.progress > i {\n  display: block; height: 100%; border-radius: inherit; transition: width 0.4s ease;\n  background: linear-gradient(90deg, var(--accent) 0%, #8b93ff 100%);\n}\n.progress.danger > i { background: linear-gradient(90deg, #e5484d 0%, #ff7b6b 100%); }\n.progress.indeterminate > i { width: 35% !important; animation: indet 1.3s ease-in-out infinite; }\n.progress.paused > i { background: var(--warn); animation: none; }\n.progress.sm { height: 6px; }\n@keyframes indet { 0% { transform: translateX(-100%); } 100% { transform: translateX(290%); } }\n\n.stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 10px; }\n.stat { padding: 11px 13px; border-radius: 12px; background: var(--bg-2); border: 1px solid var(--line); min-width: 0; }\n.stat span { display: block; font-size: 11.5px; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.04em; }\n.stat b { display: block; margin-top: 3px; font-size: 20px; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.stat.success b { color: var(--success-text); }\n.stat.danger b { color: var(--danger-text); }\n\n.two-col { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 14px; }\n.root.narrow .two-col { grid-template-columns: minmax(0, 1fr); }\n\n.job { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; border-bottom: 1px solid var(--line); }\n.job:last-child { border-bottom: 0; }\n.job .row b { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; font-size: 13.5px; }\n.job .nums { font-size: 12px; color: var(--text-3); font-variant-numeric: tabular-nums; }\n.job.running { background: var(--accent-soft); }\n\n.feed-item { display: flex; gap: 10px; padding: 9px 12px; border-bottom: 1px solid var(--line); animation: feed-in 0.25s ease-out; }\n.feed-item:last-child { border-bottom: 0; }\n@keyframes feed-in { from { opacity: 0; transform: translateY(-4px); } }\n.feed-item .body { min-width: 0; flex: 1; }\n.feed-item .where { font-size: 12px; color: var(--text-3); display: flex; gap: 6px; }\n.feed-item .text { font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.feed-item .text.strike { text-decoration: line-through; text-decoration-color: var(--danger); color: var(--text-2); }\n.feed-item .icon { margin-top: 2px; }\n\n.panel-title { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--line); font-weight: 700; font-size: 13px; }\n.panel-title .pill { margin-left: auto; }\n.panel-body { max-height: 300px; }\n\n/* ---- footer run bar -------------------------------------------------------------- */\n\n.runbar { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }\n.runbar .progress { flex: 1; min-width: 60px; }\n.runbar .txt { font-size: 13px; color: var(--text-2); white-space: nowrap; font-variant-numeric: tabular-nums; }\n\n/* ---- results / archive / logs ------------------------------------------------------ */\n\n.msg-row { display: flex; gap: 11px; align-items: flex-start; padding: 9px 12px; border-bottom: 1px solid var(--line); }\n.msg-row:last-child { border-bottom: 0; }\n.msg-row:hover { background: var(--bg-3); }\n.msg-row.off { opacity: 0.5; }\n.msg-row .check { margin-top: 2px; }\n.msg-row .body { flex: 1; min-width: 0; }\n.msg-row .top { display: flex; gap: 8px; font-size: 12px; color: var(--text-3); }\n.msg-row .top b { color: var(--text-2); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.msg-row .text { white-space: pre-wrap; word-break: break-word; font-size: 13.5px; max-height: 4.4em; overflow: hidden; }\n.msg-row .att { font-size: 12px; color: var(--accent-text); margin-top: 2px; }\n\n.log { font-family: var(--mono); font-size: 12.5px; }\n.log-row { display: flex; gap: 10px; padding: 4px 12px; border-bottom: 1px solid var(--line); line-height: 1.5; }\n.log-row time { color: var(--text-3); flex: none; }\n.log-row .lvl { flex: none; width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; }\n.log-row.debug { color: var(--text-2); }\n.log-row.debug .lvl { background: var(--text-3); }\n.log-row.info .lvl { background: var(--accent); }\n.log-row.success { color: var(--success-text); }\n.log-row.success .lvl { background: var(--success); }\n.log-row.warn { color: var(--warn-text); }\n.log-row.warn .lvl { background: var(--warn); }\n.log-row.error { color: var(--danger-text); }\n.log-row.error .lvl { background: var(--danger); }\n.log-row span { word-break: break-word; }\n\n.table { width: 100%; border-collapse: collapse; font-size: 13.5px; }\n.table th {\n  position: sticky; top: 0; z-index: 1; background: var(--bg-2); text-align: left; font-size: 11.5px; font-weight: 700;\n  text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-3); padding: 9px 10px; border-bottom: 1px solid var(--line);\n}\n.table td { padding: 8px 10px; border-bottom: 1px solid var(--line); vertical-align: middle; }\n.table tr:hover td { background: var(--bg-3); }\n.table td.num, .table th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }\n.table .name { max-width: 0; width: 100%; }\n.table .name > div { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.table .muted { color: var(--text-3); font-size: 12px; }\n\n.steps { margin: 0; padding-left: 20px; color: var(--text-2); display: flex; flex-direction: column; gap: 4px; }\n.picker {\n  display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 26px 16px; text-align: center;\n  border: 2px dashed var(--line-strong); border-radius: 14px; background: var(--bg-2);\n}\n.picker .big { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }\n\n.kv { display: grid; grid-template-columns: auto 1fr; gap: 6px 14px; font-size: 13px; }\n.kv dt { color: var(--text-3); }\n.kv dd { margin: 0; }\n\n/* ---- range ---------------------------------------------------------------------- */\n\n.range { display: flex; align-items: center; gap: 12px; }\n.range input[type="range"] { flex: 1; accent-color: var(--accent); }\n.range output { width: 70px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 600; font-size: 13px; }\n\n/* ---- overlays ---------------------------------------------------------------------- */\n\n.overlay {\n  position: absolute; inset: 0; z-index: 20; display: grid; place-items: center; padding: 16px;\n  background: var(--overlay); backdrop-filter: blur(3px); animation: fade 0.12s ease-out;\n}\n@keyframes fade { from { opacity: 0; } }\n.dialog {\n  width: min(460px, 100%); background: var(--bg); border-radius: 16px; box-shadow: var(--shadow); padding: 20px;\n  display: flex; flex-direction: column; gap: 14px; animation: win-in 0.16s ease-out;\n}\n.dialog h2 { margin: 0; font-size: 18px; display: flex; align-items: center; gap: 10px; }\n.dialog .danger-icon { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; background: var(--danger-soft); color: var(--danger); }\n.dialog p { margin: 0; color: var(--text-2); }\n.dialog .big-num { font-size: 15px; color: var(--text); font-weight: 600; }\n\n.toasts { position: fixed; right: 20px; bottom: 20px; z-index: 2147483600; display: flex; flex-direction: column; gap: 8px; align-items: flex-end; pointer-events: none; }\n.toast {\n  pointer-events: auto; display: flex; align-items: center; gap: 10px; max-width: 360px; padding: 10px 14px;\n  border-radius: 12px; background: var(--bg); box-shadow: var(--shadow); font-weight: 500; cursor: pointer;\n  animation: toast-in 0.2s ease-out; border-left: 4px solid var(--accent);\n}\n.toast.success { border-left-color: var(--success); }\n.toast.warn { border-left-color: var(--warn); }\n.toast.error { border-left-color: var(--danger); }\n@keyframes toast-in { from { opacity: 0; transform: translateX(12px); } }\n\n.fab {\n  all: unset; box-sizing: border-box; cursor: pointer; position: fixed; right: 22px; bottom: 92px; z-index: 2147482999;\n  width: 48px; height: 48px; border-radius: 16px; display: grid; place-items: center; color: #fff;\n  background: linear-gradient(135deg, #7983f5 0%, #5865f2 45%, #4049c9 100%);\n  box-shadow: 0 10px 28px rgba(88, 101, 242, 0.45), inset 0 1px 0 rgba(255,255,255,.25);\n  transition: transform 0.15s;\n}\n.fab:hover { transform: translateY(-2px) scale(1.04); }\n.fab .ring { position: absolute; inset: -4px; }\n.fab .ring circle { fill: none; stroke-width: 3; }\n\n/* ---- privacy -------------------------------------------------------------------------- */\n\n.root.privacy .priv { filter: blur(6px); transition: filter 0.15s; }\n.root.privacy .priv:hover { filter: none; }\n\n.muted { color: var(--text-3); }\n.small { font-size: 12.5px; }\n.nowrap { white-space: nowrap; }\n.tabular { font-variant-numeric: tabular-nums; }\n.grow { flex: 1; min-width: 0; }\n.ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.link { all: unset; cursor: pointer; color: var(--accent-text); font-weight: 600; }\n.link:hover { text-decoration: underline; }\nhr.sep { border: 0; border-top: 1px solid var(--line); margin: 4px 0; }\nkbd {\n  font-family: var(--mono); font-size: 12px; padding: 2px 7px; border-radius: 6px;\n  background: var(--bg-3); border: 1px solid var(--line-strong); border-bottom-width: 2px;\n}\n';

  // src/main.tsx
  var TRASH_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/>
  <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
  var TOOLBAR_CSS = `
#udr-toolbar-btn {
  position: relative; display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
  width: 24px; height: 24px; margin: 0 8px; cursor: pointer; border-radius: 4px;
  color: var(--interactive-normal, var(--icon-secondary, #b5bac1));
}
#udr-toolbar-btn:hover { color: var(--interactive-hover, var(--icon-primary, #dbdee1)); }
#udr-toolbar-btn.open { color: var(--interactive-active, #fff); }
#udr-toolbar-btn:focus-visible { outline: 2px solid #5865f2; }
#udr-toolbar-btn .udr-dot {
  position: absolute; right: -3px; bottom: -3px; width: 9px; height: 9px; border-radius: 50%;
  background: #f23f43; box-shadow: 0 0 0 2px var(--background-primary, var(--bg-base-primary, #313338));
  animation: udr-pulse 1.4s ease-in-out infinite;
}
#udr-toolbar-btn.paused .udr-dot { background: #f0b232; animation: none; }
@keyframes udr-pulse { 50% { opacity: .35; } }
`;
  function mountToolbarButton() {
    const btn = document.createElement("div");
    btn.id = "udr-toolbar-btn";
    btn.setAttribute("role", "button");
    btn.tabIndex = 0;
    btn.innerHTML = TRASH_SVG;
    const dot = document.createElement("span");
    dot.className = "udr-dot";
    btn.addEventListener("click", toggleWindow);
    btn.addEventListener("keydown", (e4) => {
      if (e4.key === "Enter" || e4.key === " ") {
        e4.preventDefault();
        toggleWindow();
      }
    });
    j2(() => {
      const status = run.status.value;
      const active = status === "running" || status === "paused";
      btn.classList.toggle("open", ui.open.value);
      btn.classList.toggle("paused", status === "paused");
      if (active) btn.appendChild(dot);
      else dot.remove();
      const label = `${BRAND} — ${t4(`status.${status}`)} (${SHORTCUT_LABEL})`;
      btn.title = label;
      btn.setAttribute("aria-label", label);
    });
    keepInToolbar(btn, (mounted) => ui.toolbarMounted.value = mounted);
  }
  function boot(setHost) {
    initState();
    const host = document.createElement("div");
    host.id = "undiscord-remake";
    setHost(host);
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styles_default;
    const mount = document.createElement("div");
    shadow.append(style, mount);
    document.body.appendChild(host);
    stopBubblingFrom(host);
    G(/* @__PURE__ */ u4(App, {}), mount);
    setInterval(() => {
      if (!host.isConnected) document.body.appendChild(host);
    }, 2e3);
    injectGlobalStyle(PICKER_CSS + TOOLBAR_CSS);
    mountToolbarButton();
    watchDiscordTheme((light) => ui.discordLight.value = light);
    window.addEventListener("keydown", (e4) => {
      if (!isShortcut(e4)) return;
      e4.preventDefault();
      e4.stopPropagation();
      toggleWindow();
    }, true);
    initDiscord();
    log("info", "log.ready", { brand: BRAND, version: VERSION, shortcut: SHORTCUT_LABEL });
    console.info(
      `%c ${APP_NAME} %c by ${AUTHOR} %c v${VERSION} · ${REPO_URL}`,
      "background:#5865f2;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px",
      "background:#2b2d31;color:#fff;border-radius:0 4px 4px 0;padding:2px 4px",
      "color:#80848e"
    );
  }
  var flag = window;
  if (!flag.__undiscordRemake) {
    flag.__undiscordRemake = true;
    initStorage();
    installTokenCapture();
    let host = null;
    shieldEventsFrom((e4) => !!host && e4.composedPath().includes(host));
    const start = () => boot((el) => host = el);
    if (document.body) start();
    else document.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();
