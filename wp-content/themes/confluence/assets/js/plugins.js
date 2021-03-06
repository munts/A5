! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var n = "animsition",
        i = {
            init: function(a) {
                a = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function(t) {
                        window.location.href = t
                    }
                }, a), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var o = i.supportCheck.call(this, a);
                if (!o && a.browser.length > 0 && (!o || !this.length)) return "console" in window || (window.console = {}, window.console.log = function(t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var e = i.optionCheck.call(this, a);
                return e && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a), a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a), this.each(function() {
                    var o = this,
                        e = t(this),
                        s = t(window),
                        r = t(document),
                        l = e.data(n);
                    l || (a = t.extend({}, a), e.data(n, {
                        options: a
                    }), a.timeout && i.addTimer.call(o), a.onLoadEvent && s.on("load." + n, function() {
                        i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(o)
                    }), s.on("pageshow." + n, function(t) {
                        t.originalEvent.persisted && i["in"].call(o)
                    }), s.on("unload." + n, function() {}), r.on("click." + n, a.linkElement, function(n) {
                        n.preventDefault();
                        var a = t(this),
                            e = a.attr("href");
                        2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e)
                    }))
                })
            },
            addOverlay: function(n) {
                t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>')
            },
            addLoading: function(n) {
                t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>")
            },
            removeLoading: function() {
                var i = t(this),
                    a = i.data(n).options,
                    o = t(a.loadingParentElement).children("." + a.loadingClass);
                o.fadeOut().remove()
            },
            addTimer: function() {
                var a = this,
                    o = t(this),
                    e = o.data(n).options;
                i.settings.timer = setTimeout(function() {
                    i["in"].call(a), t(window).off("load." + n)
                }, e.timeoutCountdown)
            },
            supportCheck: function(n) {
                var i = t(this),
                    a = n.browser,
                    o = a.length,
                    e = !1;
                0 === o && (e = !0);
                for (var s = 0; o > s; s++)
                    if ("string" == typeof i.css(a[s])) {
                        e = !0;
                        break
                    }
                return e
            },
            optionCheck: function(n) {
                var a, o = t(this);
                return a = !(!n.overlay && !o.data(i.settings.data.overlay))
            },
            animationCheck: function(i, a, o) {
                var e = t(this),
                    s = e.data(n).options,
                    r = typeof i,
                    l = !a && "number" === r,
                    d = a && "string" === r && i.length > 0;
                return l || d ? i = i : a && o ? i = s.inClass : !a && o ? i = s.inDuration : a && !o ? i = s.outClass : a || o || (i = s.outDuration), i
            },
            "in": function() {
                var a = this,
                    o = t(this),
                    e = o.data(n).options,
                    s = o.data(i.settings.data.inDuration),
                    r = o.data(i.settings.data.inClass),
                    l = i.animationCheck.call(a, s, !1, !0),
                    d = i.animationCheck.call(a, r, !0, !0),
                    u = i.optionCheck.call(a, e),
                    c = o.data(n).outClass;
                e.loading && i.removeLoading.call(a), c && o.removeClass(c), u ? i.inOverlay.call(a, d, l) : i.inDefault.call(a, d, l)
            },
            inDefault: function(n, a) {
                var o = t(this);
                o.css({
                    "animation-duration": a + "ms"
                }).addClass(n).trigger(i.settings.events.inStart).animateCallback(function() {
                    o.removeClass(n).css({
                        opacity: 1
                    }).trigger(i.settings.events.inEnd)
                })
            },
            inOverlay: function(a, o) {
                var e = t(this),
                    s = e.data(n).options;
                e.css({
                    opacity: 1
                }).trigger(i.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({
                    "animation-duration": o + "ms"
                }).addClass(a).animateCallback(function() {
                    e.trigger(i.settings.events.inEnd)
                })
            },
            out: function(a, o) {
                var e = this,
                    s = t(this),
                    r = s.data(n).options,
                    l = a.data(i.settings.data.outClass),
                    d = s.data(i.settings.data.outClass),
                    u = a.data(i.settings.data.outDuration),
                    c = s.data(i.settings.data.outDuration),
                    m = l ? l : d,
                    g = u ? u : c,
                    f = i.animationCheck.call(e, m, !0, !1),
                    v = i.animationCheck.call(e, g, !1, !1),
                    h = i.optionCheck.call(e, r);
                s.data(n).outClass = f, h ? i.outOverlay.call(e, f, v, o) : i.outDefault.call(e, f, v, o)
            },
            outDefault: function(a, o, e) {
                var s = t(this),
                    r = s.data(n).options;
                s.css({
                    "animation-duration": o + 1 + "ms"
                }).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                    s.trigger(i.settings.events.outEnd), r.transition(e)
                })
            },
            outOverlay: function(a, o, e) {
                var s = this,
                    r = t(this),
                    l = r.data(n).options,
                    d = r.data(i.settings.data.inClass),
                    u = i.animationCheck.call(s, d, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({
                    "animation-duration": o + 1 + "ms"
                }).removeClass(u).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                    r.trigger(i.settings.events.outEnd), l.transition(e)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = t(this);
                    t(window).off("." + n), i.css({
                        opacity: 1
                    }).removeData(n)
                })
            }
        };
    t.fn.animateCallback = function(n) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var a = t(this);
            a.on(i, function() {
                return a.off(i), n.call(this)
            })
        })
    }, t.fn.animsition = function(a) {
        return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments)
    }
});
! function(e) {
    e.fn.autogrow = function(i) {
        function t(t) {
            var n, s = e(this),
                o = s.innerHeight(),
                a = this.scrollHeight,
                h = s.data("autogrow-start-height") || 0;
            if (o < a) this.scrollTop = 0, i.animate ? s.stop().animate({
                height: a
            }, i.speed) : s.innerHeight(a);
            else if (!t || 8 == t.which || 46 == t.which || t.ctrlKey && 88 == t.which)
                if (o > h) {
                    n = s.clone().addClass(i.cloneClass).css({
                        position: "absolute",
                        zIndex: -10,
                        height: ""
                    }).val(s.val()), s.after(n);
                    do a = n[0].scrollHeight - 1, n.innerHeight(a); while (a === n[0].scrollHeight);
                    a++, n.remove(), s.focus(), a < h && (a = h), o > a && i.animate ? s.stop().animate({
                        height: a
                    }, i.speed) : s.innerHeight(a)
                } else s.innerHeight(h)
        }
        var n = e(this).css({
                overflow: "hidden",
                resize: "none"
            }),
            s = n.selector,
            o = {
                context: e(document),
                animate: !0,
                speed: 200,
                fixMinHeight: !0,
                cloneClass: "autogrowclone",
                onInitialize: !1
            };
        return i = e.isPlainObject(i) ? i : {
            context: i ? i : e(document)
        }, i = e.extend({}, o, i), n.each(function(n, s) {
            var o, a;
            s = e(s), s.is(":visible") || parseInt(s.css("height"), 10) > 0 ? o = parseInt(s.css("height"), 10) || s.innerHeight() : (a = s.clone().addClass(i.cloneClass).val(s.val()).css({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }), e("body").append(a), o = a.innerHeight(), a.remove()), i.fixMinHeight && s.data("autogrow-start-height", o), s.css("height", o), i.onInitialize && s.length && t.call(s[0])
        }), i.context.on("keyup paste", s, t), n
    }
}(jQuery);
! function(e) {
    e.fn.hoverIntent = function(t, n, o) {
        var r = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        r = "object" == typeof t ? e.extend(r, t) : e.isFunction(n) ? e.extend(r, {
            over: t,
            out: n,
            selector: o
        }) : e.extend(r, {
            over: t,
            out: t,
            selector: n
        });
        var v, u, i, s, h = function(e) {
                v = e.pageX, u = e.pageY
            },
            a = function(t, n) {
                return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), Math.abs(i - v) + Math.abs(s - u) < r.sensitivity ? (e(n).off("mousemove.hoverIntent", h), n.hoverIntent_s = 1, r.over.apply(n, [t])) : (i = v, s = u, n.hoverIntent_t = setTimeout(function() {
                    a(t, n)
                }, r.interval), void 0)
            },
            I = function(e, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = 0, r.out.apply(t, [e])
            },
            c = function(t) {
                var n = jQuery.extend({}, t),
                    o = this;
                o.hoverIntent_t && (o.hoverIntent_t = clearTimeout(o.hoverIntent_t)), "mouseenter" == t.type ? (i = n.pageX, s = n.pageY, e(o).on("mousemove.hoverIntent", h), 1 != o.hoverIntent_s && (o.hoverIntent_t = setTimeout(function() {
                    a(n, o)
                }, r.interval))) : (e(o).off("mousemove.hoverIntent", h), 1 == o.hoverIntent_s && (o.hoverIntent_t = setTimeout(function() {
                    I(n, o)
                }, r.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": c,
            "mouseleave.hoverIntent": c
        }, r.selector)
    }
}(jQuery);
! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }(window, function(t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function n(t) {
            var e = [];
            if (Array.isArray(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function o(t, e, r) {
            return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
                this.check()
            }.bind(this))) : new o(t, e, r)
        }

        function r(t) {
            this.img = t
        }

        function s(t, e) {
            this.url = t, this.element = e, this.img = new Image
        }
        var h = t.jQuery,
            a = t.console;
        o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, o.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && d[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var o = i[n];
                    this.addImage(o)
                }
                if ("string" == typeof this.options.background) {
                    var r = t.querySelectorAll(this.options.background);
                    for (n = 0; n < r.length; n++) {
                        var s = r[n];
                        this.addElementBackgroundImages(s)
                    }
                }
            }
        };
        var d = {
            1: !0,
            9: !0,
            11: !0
        };
        return o.prototype.addElementBackgroundImages = function(t) {
            var e = getComputedStyle(t);
            if (e)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                    var o = n && n[2];
                    o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
                }
        }, o.prototype.addImage = function(t) {
            var e = new r(t);
            this.images.push(e)
        }, o.prototype.addBackground = function(t, e) {
            var i = new s(t, e);
            this.images.push(i)
        }, o.prototype.check = function() {
            function t(t, i, n) {
                setTimeout(function() {
                    e.progress(t, i, n)
                })
            }
            var e = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
                e.once("progress", t), e.check()
            }) : void this.complete()
        }, o.prototype.progress = function(t, e, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
        }, o.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
            var t = this.getIsImageComplete();
            return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, r.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, r.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
        }, r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, r.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, r.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, r.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
            var t = this.getIsImageComplete();
            t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, s.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, s.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
        }, o.makeJQueryPlugin = function(e) {
            e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
                var i = new o(this, t, e);
                return i.jqDeferred.promise(h(this))
            })
        }, o.makeJQueryPlugin(), o
    });
! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, n) {
            var o, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, n);
                o = void 0 === o ? l : o
            }), void 0 !== o ? o : t
        }

        function h(t, e) {
            t.each(function(t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return n(e || t.jQuery), i
}),
    function(t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, function() {
        function t() {}
        var e = t.prototype;
        return e.on = function(t, e) {
            if (t && e) {
                var i = this._events = this._events || {},
                    n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e), this
            }
        }, e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {},
                    n = i[t] = i[t] || {};
                return n[e] = !0, this
            }
        }, e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this
            }
        }, e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0,
                    o = i[n];
                e = e || [];
                for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                    var r = s && s[o];
                    r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
                }
                return this
            }
        }, t
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
            return e()
        }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
    }(window, function() {
        "use strict";

        function t(t) {
            var e = parseFloat(t),
                i = -1 == t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function e() {}

        function i() {
            for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; h > e; e++) {
                var i = u[e];
                t[i] = 0
            }
            return t
        }

        function n(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
        }

        function o() {
            if (!d) {
                d = !0;
                var e = document.createElement("div");
                e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var o = n(e);
                s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e)
            }
        }

        function s(e) {
            if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                var s = n(e);
                if ("none" == s.display) return i();
                var a = {};
                a.width = e.offsetWidth, a.height = e.offsetHeight;
                for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; h > l; l++) {
                    var f = u[l],
                        c = s[f],
                        m = parseFloat(c);
                    a[f] = isNaN(m) ? 0 : m
                }
                var p = a.paddingLeft + a.paddingRight,
                    y = a.paddingTop + a.paddingBottom,
                    g = a.marginLeft + a.marginRight,
                    v = a.marginTop + a.marginBottom,
                    _ = a.borderLeftWidth + a.borderRightWidth,
                    I = a.borderTopWidth + a.borderBottomWidth,
                    z = d && r,
                    x = t(s.width);
                x !== !1 && (a.width = x + (z ? 0 : p + _));
                var S = t(s.height);
                return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
            }
        }
        var r, a = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            },
            u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            h = u.length,
            d = !1;
        return s
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
    }(window, function() {
        "use strict";
        var t = function() {
            var t = Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i],
                    o = n + "MatchesSelector";
                if (t[o]) return o
            }
        }();
        return function(e, i) {
            return e[t](i)
        }
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
    }(window, function(t, e) {
        var i = {};
        i.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }, i.modulo = function(t, e) {
            return (t % e + e) % e
        }, i.makeArray = function(t) {
            var e = [];
            if (Array.isArray(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e
        }, i.removeFrom = function(t, e) {
            var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
        }, i.getParent = function(t, i) {
            for (; t != document.body;)
                if (t = t.parentNode, e(t, i)) return t
        }, i.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, i.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, i.filterFindElements = function(t, n) {
            t = i.makeArray(t);
            var o = [];
            return t.forEach(function(t) {
                if (t instanceof HTMLElement) {
                    if (!n) return void o.push(t);
                    e(t, n) && o.push(t);
                    for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) o.push(i[s])
                }
            }), o
        }, i.debounceMethod = function(t, e, i) {
            var n = t.prototype[e],
                o = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[o];
                t && clearTimeout(t);
                var e = arguments,
                    s = this;
                this[o] = setTimeout(function() {
                    n.apply(s, e), delete s[o]
                }, i || 100)
            }
        }, i.docReady = function(t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t)
        }, i.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var n = t.console;
        return i.htmlInit = function(e, o) {
            i.docReady(function() {
                var s = i.toDashed(o),
                    r = "data-" + s,
                    a = document.querySelectorAll("[" + r + "]"),
                    u = document.querySelectorAll(".js-" + s),
                    h = i.makeArray(a).concat(i.makeArray(u)),
                    d = r + "-options",
                    l = t.jQuery;
                h.forEach(function(t) {
                    var i, s = t.getAttribute(r) || t.getAttribute(d);
                    try {
                        i = s && JSON.parse(s)
                    } catch (a) {
                        return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                    }
                    var u = new e(t, i);
                    l && l.data(t, o, u)
                })
            })
        }, i
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
    }(window, function(t, e) {
        "use strict";

        function i(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function n(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function o(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }
        var s = document.documentElement.style,
            r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
            a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
            u = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            }[r],
            h = {
                transform: a,
                transition: r,
                transitionDuration: r + "Duration",
                transitionProperty: r + "Property",
                transitionDelay: r + "Delay"
            },
            d = n.prototype = Object.create(t.prototype);
        d.constructor = n, d._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, d.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, d.getSize = function() {
            this.size = e(this.element)
        }, d.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var n = h[i] || i;
                e[n] = t[i]
            }
        }, d.getPosition = function() {
            var t = getComputedStyle(this.element),
                e = this.layout._getOption("originLeft"),
                i = this.layout._getOption("originTop"),
                n = t[e ? "left" : "right"],
                o = t[i ? "top" : "bottom"],
                s = this.layout.size,
                r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10),
                a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
            r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
        }, d.layoutPosition = function() {
            var t = this.layout.size,
                e = {},
                i = this.layout._getOption("originLeft"),
                n = this.layout._getOption("originTop"),
                o = i ? "paddingLeft" : "paddingRight",
                s = i ? "left" : "right",
                r = i ? "right" : "left",
                a = this.position.x + t[o];
            e[s] = this.getXValue(a), e[r] = "";
            var u = n ? "paddingTop" : "paddingBottom",
                h = n ? "top" : "bottom",
                d = n ? "bottom" : "top",
                l = this.position.y + t[u];
            e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
        }, d.getXValue = function(t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
        }, d.getYValue = function(t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
        }, d._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                o = parseInt(t, 10),
                s = parseInt(e, 10),
                r = o === this.position.x && s === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
            var a = t - i,
                u = e - n,
                h = {};
            h.transform = this.getTranslate(a, u), this.transition({
                to: h,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, d.getTranslate = function(t, e) {
            var i = this.layout._getOption("originLeft"),
                n = this.layout._getOption("originTop");
            return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
        }, d.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, d._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, d.transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var l = "opacity," + o(a);
        d.enableTransition = function() {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                t = "number" == typeof t ? t + "ms" : t, this.css({
                    transitionProperty: l,
                    transitionDuration: t,
                    transitionDelay: this.staggerDelay || 0
                }), this.element.addEventListener(u, this, !1)
            }
        }, d.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, d.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var f = {
            "-webkit-transform": "transform"
        };
        d.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn,
                    n = f[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                    var o = e.onEnd[n];
                    o.call(this), delete e.onEnd[n]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, d.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
        }, d._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var c = {
            transitionProperty: "",
            transitionDuration: "",
            transitionDelay: ""
        };
        return d.removeTransitionStyles = function() {
            this.css(c)
        }, d.stagger = function(t) {
            t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
        }, d.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, d.remove = function() {
            return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
                this.removeElem()
            }), void this.hide()) : void this.removeElem()
        }, d.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            e[i] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, d.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, d.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i
        }, d.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            e[i] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, d.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, d.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, s) {
            return e(t, i, n, o, s)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, function(t, e, i, n, o) {
        "use strict";

        function s(t, e) {
            var i = n.getQueryElement(t);
            if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
            var o = ++l;
            this.element.outlayerGUID = o, f[o] = this, this._create();
            var s = this._getOption("initLayout");
            s && this.layout()
        }

        function r(t) {
            function e() {
                t.apply(this, arguments)
            }
            return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
        }

        function a(t) {
            if ("number" == typeof t) return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                n = e && e[2];
            if (!i.length) return 0;
            i = parseFloat(i);
            var o = m[n] || 1;
            return i * o
        }
        var u = t.console,
            h = t.jQuery,
            d = function() {},
            l = 0,
            f = {};
        s.namespace = "outlayer", s.Item = o, s.defaults = {
            containerStyle: {
                position: "relative"
            },
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        };
        var c = s.prototype;
        n.extend(c, e.prototype), c.option = function(t) {
            n.extend(this.options, t)
        }, c._getOption = function(t) {
            var e = this.constructor.compatOptions[t];
            return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
        }, s.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        }, c._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
            var t = this._getOption("resize");
            t && this.bindResize()
        }, c.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, c._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                var s = e[o],
                    r = new i(s, this);
                n.push(r)
            }
            return n
        }, c._filterFindItemElements = function(t) {
            return n.filterFindElements(t, this.options.itemSelector)
        }, c.getItemElements = function() {
            return this.items.map(function(t) {
                return t.element
            })
        }, c.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = this._getOption("layoutInstant"),
                e = void 0 !== t ? t : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0
        }, c._init = c.layout, c._resetLayout = function() {
            this.getSize()
        }, c.getSize = function() {
            this.size = i(this.element)
        }, c._getMeasurement = function(t, e) {
            var n, o = this.options[t];
            o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
        }, c.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, c._getItemsForLayout = function(t) {
            return t.filter(function(t) {
                return !t.isIgnored
            })
        }, c._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                var i = [];
                t.forEach(function(t) {
                    var n = this._getItemLayoutPosition(t);
                    n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
                }, this), this._processLayoutQueue(i)
            }
        }, c._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, c._processLayoutQueue = function(t) {
            this.updateStagger(), t.forEach(function(t, e) {
                this._positionItem(t.item, t.x, t.y, t.isInstant, e)
            }, this)
        }, c.updateStagger = function() {
            var t = this.options.stagger;
            return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
        }, c._positionItem = function(t, e, i, n, o) {
            n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
        }, c._postLayout = function() {
            this.resizeContainer()
        }, c.resizeContainer = function() {
            var t = this._getOption("resizeContainer");
            if (t) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, c._emitCompleteOnItems = function(t, e) {
            function i() {
                o.dispatchEvent(t + "Complete", null, [e])
            }

            function n() {
                r++, r == s && i()
            }
            var o = this,
                s = e.length;
            if (!e || !s) return void i();
            var r = 0;
            e.forEach(function(e) {
                e.once(t, n)
            })
        }, c.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), h)
                if (this.$element = this.$element || h(this.element), e) {
                    var o = h.Event(e);
                    o.type = t, this.$element.trigger(o, i)
                } else this.$element.trigger(t, i)
        }, c.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, c.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, c.stamp = function(t) {
            t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
        }, c.unstamp = function(t) {
            t = this._find(t), t && t.forEach(function(t) {
                n.removeFrom(this.stamps, t), this.unignore(t)
            }, this)
        }, c._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
        }, c._manageStamps = function() {
            this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
        }, c._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(),
                e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, c._manageStamp = d, c._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(),
                n = this._boundingRect,
                o = i(t),
                s = {
                    left: e.left - n.left - o.marginLeft,
                    top: e.top - n.top - o.marginTop,
                    right: n.right - e.right - o.marginRight,
                    bottom: n.bottom - e.bottom - o.marginBottom
                };
            return s
        }, c.handleEvent = n.handleEvent, c.bindResize = function() {
            t.addEventListener("resize", this), this.isResizeBound = !0
        }, c.unbindResize = function() {
            t.removeEventListener("resize", this), this.isResizeBound = !1
        }, c.onresize = function() {
            this.resize()
        }, n.debounceMethod(s, "onresize", 100), c.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, c.needsResizeLayout = function() {
            var t = i(this.element),
                e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, c.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, c.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, c.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, c.reveal = function(t) {
            if (this._emitCompleteOnItems("reveal", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function(t, i) {
                    t.stagger(i * e), t.reveal()
                })
            }
        }, c.hide = function(t) {
            if (this._emitCompleteOnItems("hide", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function(t, i) {
                    t.stagger(i * e), t.hide()
                })
            }
        }, c.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, c.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e)
        }, c.getItem = function(t) {
            for (var e = 0; e < this.items.length; e++) {
                var i = this.items[e];
                if (i.element == t) return i
            }
        }, c.getItems = function(t) {
            t = n.makeArray(t);
            var e = [];
            return t.forEach(function(t) {
                var i = this.getItem(t);
                i && e.push(i)
            }, this), e
        }, c.remove = function(t) {
            var e = this.getItems(t);
            this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
                t.remove(), n.removeFrom(this.items, t)
            }, this)
        }, c.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
                t.destroy()
            }), this.unbindResize();
            var e = this.element.outlayerGUID;
            delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
        }, s.data = function(t) {
            t = n.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && f[e]
        }, s.create = function(t, e) {
            var i = r(s);
            return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
        };
        var m = {
            ms: 1,
            s: 1e3
        };
        return s.Item = o, s
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window, function(t) {
        "use strict";

        function e() {
            t.Item.apply(this, arguments)
        }
        var i = e.prototype = Object.create(t.Item.prototype),
            n = i._create;
        i._create = function() {
            this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
        }, i.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var t = this.layout.options.getSortData,
                    e = this.layout._sorters;
                for (var i in t) {
                    var n = e[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var o = i.destroy;
        return i.destroy = function() {
            o.apply(this, arguments), this.css({
                display: ""
            })
        }, e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window, function(t, e) {
        "use strict";

        function i(t) {
            this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
        }
        var n = i.prototype,
            o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
        return o.forEach(function(t) {
            n[t] = function() {
                return e.prototype[t].apply(this.isotope, arguments)
            }
        }), n.needsVerticalResizeLayout = function() {
            var e = t(this.isotope.element),
                i = this.isotope.size && e;
            return i && e.innerHeight != this.isotope.size.innerHeight
        }, n._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, n.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, n.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, n.getSegmentSize = function(t, e) {
            var i = t + e,
                n = "outer" + e;
            if (this._getMeasurement(i, n), !this[i]) {
                var o = this.getFirstItemSize();
                this[i] = o && o[n] || this.isotope.size["inner" + e]
            }
        }, n.getFirstItemSize = function() {
            var e = this.isotope.filteredItems[0];
            return e && e.element && t(e.element)
        }, n.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, n.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(t, e) {
            function o() {
                i.apply(this, arguments)
            }
            return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
        }, i
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window, function(t, e) {
        var i = t.create("masonry");
        return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
            for (var t = 0; t < this.cols; t++) this.colYs.push(0);
            this.maxY = 0
        }, i.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0],
                    i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter,
                o = this.containerWidth + this.gutter,
                s = o / n,
                r = n - o % n,
                a = r && 1 > r ? "round" : "floor";
            s = Math[a](s), this.cols = Math.max(s, 1)
        }, i.prototype.getContainerWidth = function() {
            var t = this._getOption("fitWidth"),
                i = t ? this.element.parentNode : this.element,
                n = e(i);
            this.containerWidth = n && n.innerWidth
        }, i.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                i = e && 1 > e ? "round" : "ceil",
                n = Math[i](t.size.outerWidth / this.columnWidth);
            n = Math.min(n, this.cols);
            for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = {
                x: this.columnWidth * r,
                y: s
            }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; h > d; d++) this.colYs[r + d] = u;
            return a
        }, i.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, o)
            }
            return e
        }, i.prototype._manageStamp = function(t) {
            var i = e(t),
                n = this._getElementOffset(t),
                o = this._getOption("originLeft"),
                s = o ? n.left : n.right,
                r = s + i.outerWidth,
                a = Math.floor(s / this.columnWidth);
            a = Math.max(0, a);
            var u = Math.floor(r / this.columnWidth);
            u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
            for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; u >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
        }, i.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
        }, i.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, i.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t != this.containerWidth
        }, i
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window, function(t, e) {
        "use strict";
        var i = t.create("masonry"),
            n = i.prototype,
            o = {
                _getElementOffset: !0,
                layout: !0,
                _getMeasurement: !0
            };
        for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
        var r = n.measureColumns;
        n.measureColumns = function() {
            this.items = this.isotope.filteredItems, r.call(this)
        };
        var a = n._getOption;
        return n._getOption = function(t) {
            return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
        }, i
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("fitRows"),
            i = e.prototype;
        return i._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, i._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
        }, i._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("vertical", {
                horizontalAlignment: 0
            }),
            i = e.prototype;
        return i._resetLayout = function() {
            this.y = 0
        }, i._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += t.size.outerHeight, {
                x: e,
                y: i
            }
        }, i._getContainerSize = function() {
            return {
                height: this.y
            }
        }, e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, n, o, s, r, a) {
            return e(t, i, n, o, s, r, a)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window, function(t, e, i, n, o, s, r) {
        function a(t, e) {
            return function(i, n) {
                for (var o = 0; o < t.length; o++) {
                    var s = t[o],
                        r = i.sortData[s],
                        a = n.sortData[s];
                    if (r > a || a > r) {
                        var u = void 0 !== e[s] ? e[s] : e,
                            h = u ? 1 : -1;
                        return (r > a ? 1 : -1) * h
                    }
                }
                return 0
            }
        }
        var u = t.jQuery,
            h = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            d = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        d.Item = s, d.LayoutMode = r;
        var l = d.prototype;
        l._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var t in r.modes) this._initLayoutMode(t)
        }, l.reloadItems = function() {
            this.itemGUID = 0, e.prototype.reloadItems.call(this)
        }, l._itemize = function() {
            for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
                var n = t[i];
                n.id = this.itemGUID++
            }
            return this._updateItemsSortData(t), t
        }, l._initLayoutMode = function(t) {
            var e = r.modes[t],
                i = this.options[t] || {};
            this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
        }, l.layout = function() {
            return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
        }, l._layout = function() {
            var t = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
        }, l.arrange = function(t) {
            this.option(t), this._getIsInstant();
            var e = this._filter(this.items);
            this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
        }, l._init = l.arrange, l._hideReveal = function(t) {
            this.reveal(t.needReveal), this.hide(t.needHide)
        }, l._getIsInstant = function() {
            var t = this._getOption("layoutInstant"),
                e = void 0 !== t ? t : !this._isLayoutInited;
            return this._isInstant = e, e
        }, l._bindArrangeComplete = function() {
            function t() {
                e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
            }
            var e, i, n, o = this;
            this.once("layoutComplete", function() {
                e = !0, t()
            }), this.once("hideComplete", function() {
                i = !0, t()
            }), this.once("revealComplete", function() {
                n = !0, t()
            })
        }, l._filter = function(t) {
            var e = this.options.filter;
            e = e || "*";
            for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
                var a = t[r];
                if (!a.isIgnored) {
                    var u = s(a);
                    u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a)
                }
            }
            return {
                matches: i,
                needReveal: n,
                needHide: o
            }
        }, l._getFilterTest = function(t) {
            return u && this.options.isJQueryFiltering ? function(e) {
                return u(e.element).is(t)
            } : "function" == typeof t ? function(e) {
                return t(e.element)
            } : function(e) {
                return n(e.element, t)
            }
        }, l.updateSortData = function(t) {
            var e;
            t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
        }, l._getSorters = function() {
            var t = this.options.getSortData;
            for (var e in t) {
                var i = t[e];
                this._sorters[e] = f(i)
            }
        }, l._updateItemsSortData = function(t) {
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.updateSortData()
            }
        };
        var f = function() {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = h(t).split(" "),
                    n = i[0],
                    o = n.match(/^\[(.+)\]$/),
                    s = o && o[1],
                    r = e(s, n),
                    a = d.sortDataParsers[i[1]];
                return t = a ? function(t) {
                    return t && a(r(t))
                } : function(t) {
                    return t && r(t)
                }
            }

            function e(t, e) {
                return t ? function(e) {
                    return e.getAttribute(t)
                } : function(t) {
                    var i = t.querySelector(e);
                    return i && i.textContent
                }
            }
            return t
        }();
        d.sortDataParsers = {
            parseInt: function(t) {
                return parseInt(t, 10)
            },
            parseFloat: function(t) {
                return parseFloat(t)
            }
        }, l._sort = function() {
            var t = this.options.sortBy;
            if (t) {
                var e = [].concat.apply(t, this.sortHistory),
                    i = a(e, this.options.sortAscending);
                this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
            }
        }, l._mode = function() {
            var t = this.options.layoutMode,
                e = this.modes[t];
            if (!e) throw new Error("No layout mode: " + t);
            return e.options = this.options[t], e
        }, l._resetLayout = function() {
            e.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, l._getItemLayoutPosition = function(t) {
            return this._mode()._getItemLayoutPosition(t)
        }, l._manageStamp = function(t) {
            this._mode()._manageStamp(t)
        }, l._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, l.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, l.appended = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i = this._filterRevealAdded(e);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, l.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(e);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
            }
        }, l._filterRevealAdded = function(t) {
            var e = this._filter(t);
            return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
        }, l.insert = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i, n, o = e.length;
                for (i = 0; o > i; i++) n = e[i], this.element.appendChild(n.element);
                var s = this._filter(e).matches;
                for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
                this.reveal(s)
            }
        };
        var c = l.remove;
        return l.remove = function(t) {
            t = o.makeArray(t);
            var e = this.getItems(t);
            c.call(this, t);
            for (var i = e && e.length, n = 0; i && i > n; n++) {
                var s = e[n];
                o.removeFrom(this.filteredItems, s)
            }
        }, l.shuffle = function() {
            for (var t = 0; t < this.items.length; t++) {
                var e = this.items[t];
                e.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, l._noTransition = function(t, e) {
            var i = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var n = t.apply(this, e);
            return this.options.transitionDuration = i, n
        }, l.getFilteredItemElements = function() {
            return this.filteredItems.map(function(t) {
                return t.element
            })
        }, d
    });
! function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                d = document.createElement("div");
            d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", r.appendChild(d.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function() {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var r = ".fitvidsignore";
            i.ignore && (r = r + ", " + i.ignore);
            var a = t(this).find(e.join(","));
            a = a.not("object object"), a = a.not(r), a.each(function() {
                var e = t(this);
                if (!(e.parents(r).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
                        a = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
                        d = i / a;
                    if (!e.attr("name")) {
                        var o = "fitvid" + t.fn.fitVids._count;
                        e.attr("name", o), t.fn.fitVids._count++
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * d + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }, t.fn.fitVids._count = 0
}(window.jQuery || window.Zepto);
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    var o = !1,
        t = !1,
        i = 0,
        r = 2e3,
        n = 0,
        s = ["webkit", "ms", "moz", "o"],
        l = window.requestAnimationFrame || !1,
        a = window.cancelAnimationFrame || !1;
    if (!l)
        for (var c in s) {
            var d = s[c];
            if (l = window[d + "RequestAnimationFrame"]) {
                a = window[d + "CancelAnimationFrame"] || window[d + "CancelRequestAnimationFrame"];
                break
            }
        }
    var u = window.MutationObserver || window.WebKitMutationObserver || !1,
        h = {
            zindex: "auto",
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorcolor: "#424242",
            cursorwidth: "6px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 60,
            mousescrollstep: 24,
            touchbehavior: !1,
            hwacceleration: !0,
            usetransition: !0,
            boxzoom: !1,
            dblclickzoom: !0,
            gesturezoom: !0,
            grabcursorenabled: !0,
            autohidemode: !0,
            background: "",
            iframeautoresize: !0,
            cursorminheight: 32,
            preservenativescrolling: !0,
            railoffset: !1,
            railhoffset: !1,
            bouncescroll: !0,
            spacebarenabled: !0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: !0,
            horizrailenabled: !0,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: !0,
            enablemousewheel: !0,
            enablekeyboard: !0,
            smoothscroll: !0,
            sensitiverail: !0,
            enablemouselockapi: !0,
            cursorfixedheight: !1,
            directionlockdeadzone: 6,
            hidecursordelay: 400,
            nativeparentscrolling: !0,
            enablescrollonselection: !0,
            overflowx: !0,
            overflowy: !0,
            cursordragspeed: .3,
            rtlmode: "auto",
            cursordragontouch: !1,
            oneaxismousemode: "auto",
            scriptpath: function() {
                var e = document.getElementsByTagName("script"),
                    e = e.length ? e[e.length - 1].src.split("?")[0] : "";
                return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : ""
            }(),
            preventmultitouchscrolling: !0,
            disablemutationobserver: !1
        },
        p = !1,
        m = function() {
            if (p) return p;
            var e = document.createElement("DIV"),
                o = e.style,
                t = navigator.userAgent,
                i = navigator.platform,
                r = {
                    haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document
                };
            r.isopera = "opera" in window, r.isopera12 = r.isopera && "getUserMedia" in navigator, r.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini), r.isie = "all" in document && "attachEvent" in e && !r.isopera, r.isieold = r.isie && !("msInterpolationMode" in o), r.isie7 = r.isie && !r.isieold && (!("documentMode" in document) || 7 == document.documentMode), r.isie8 = r.isie && "documentMode" in document && 8 == document.documentMode, r.isie9 = r.isie && "performance" in window && 9 == document.documentMode, r.isie10 = r.isie && "performance" in window && 10 == document.documentMode, r.isie11 = "msRequestFullscreen" in e && 11 <= document.documentMode, r.isieedge12 = navigator.userAgent.match(/Edge\/12\./), r.isieedge = "msOverflowStyle" in e, r.ismodernie = r.isie11 || r.isieedge, r.isie9mobile = /iemobile.9/i.test(t), r.isie9mobile && (r.isie9 = !1), r.isie7mobile = !r.isie9mobile && r.isie7 && /iemobile/i.test(t), r.ismozilla = "MozAppearance" in o, r.iswebkit = "WebkitAppearance" in o, r.ischrome = "chrome" in window, r.ischrome38 = r.ischrome && "touchAction" in o, r.ischrome22 = !r.ischrome38 && r.ischrome && r.haspointerlock, r.ischrome26 = !r.ischrome38 && r.ischrome && "transition" in o, r.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window, r.hasw3ctouch = (window.PointerEvent || !1) && (0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints), r.hasmstouch = !r.hasw3ctouch && (window.MSPointerEvent || !1), r.ismac = /^mac$/i.test(i), r.isios = r.cantouch && /iphone|ipad|ipod/i.test(i), r.isios4 = r.isios && !("seal" in Object), r.isios7 = r.isios && "webkitHidden" in document, r.isios8 = r.isios && "hidden" in document, r.isandroid = /android/i.test(t), r.haseventlistener = "addEventListener" in e, r.trstyle = !1, r.hastransform = !1, r.hastranslate3d = !1, r.transitionstyle = !1, r.hastransition = !1, r.transitionend = !1, i = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
            for (t = 0; t < i.length; t++)
                if (void 0 !== o[i[t]]) {
                    r.trstyle = i[t];
                    break
                }
            r.hastransform = !!r.trstyle, r.hastransform && (o[r.trstyle] = "translate3d(1px,2px,3px)", r.hastranslate3d = /translate3d/.test(o[r.trstyle])), r.transitionstyle = !1, r.prefixstyle = "", r.transitionend = !1;
            for (var i = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "), n = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "), s = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "), t = 0; t < i.length; t++)
                if (i[t] in o) {
                    r.transitionstyle = i[t], r.prefixstyle = n[t], r.transitionend = s[t];
                    break
                }
            r.ischrome26 && (r.prefixstyle = n[1]), r.hastransition = r.transitionstyle;
            e: {
                for (t = ["grab", "-webkit-grab", "-moz-grab"], (r.ischrome && !r.ischrome38 || r.isie) && (t = []), i = 0; i < t.length; i++)
                    if (n = t[i], o.cursor = n, o.cursor == n) {
                        o = n;
                        break e
                    }
                o = "url(//patriciaportfolio.googlecode.com/files/openhand.cur),n-resize"
            }
            return r.cursorgrabvalue = o, r.hasmousecapture = "setCapture" in e, r.hasMutationObserver = !1 !== u, p = r
        },
        f = function(s, c) {
            function d() {
                var e = b.doc.css(S.trstyle);
                return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/)
            }

            function p() {
                var e = b.win;
                if ("zIndex" in e) return e.zIndex();
                for (; 0 < e.length && 9 != e[0].nodeType;) {
                    var o = e.css("zIndex");
                    if (!isNaN(o) && 0 != o) return parseInt(o);
                    e = e.parent()
                }
                return !1
            }

            function f(e, o, t) {
                return o = e.css(o), e = parseFloat(o), isNaN(e) ? (e = M[o] || 0, t = 3 == e ? t ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1, b.isie8 && e && (e += 1), t ? e : 0) : e
            }

            function w(e, o, t, i) {
                b._bind(e, o, function(i) {
                    i = i ? i : window.event;
                    var r = {
                        original: i,
                        target: i.target || i.srcElement,
                        type: "wheel",
                        deltaMode: "MozMousePixelScroll" == i.type ? 0 : 1,
                        deltaX: 0,
                        deltaZ: 0,
                        preventDefault: function() {
                            return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
                        },
                        stopImmediatePropagation: function() {
                            i.stopImmediatePropagation ? i.stopImmediatePropagation() : i.cancelBubble = !0
                        }
                    };
                    return "mousewheel" == o ? (i.wheelDeltaX && (r.deltaX = -.025 * i.wheelDeltaX), i.wheelDeltaY && (r.deltaY = -.025 * i.wheelDeltaY), r.deltaY || r.deltaX || (r.deltaY = -.025 * i.wheelDelta)) : r.deltaY = i.detail, t.call(e, r)
                }, i)
            }

            function v(e, o, t) {
                var i, r;
                if (0 == e.deltaMode ? (i = -Math.floor(b.opt.mousescrollstep / 54 * e.deltaX), r = -Math.floor(b.opt.mousescrollstep / 54 * e.deltaY)) : 1 == e.deltaMode && (i = -Math.floor(e.deltaX * b.opt.mousescrollstep), r = -Math.floor(e.deltaY * b.opt.mousescrollstep)), o && b.opt.oneaxismousemode && 0 == i && r && (i = r, r = 0, t && (0 > i ? b.getScrollLeft() >= b.page.maxw : 0 >= b.getScrollLeft()) && (r = i, i = 0)), b.isrtlmode && (i = -i), i && (b.scrollmom && b.scrollmom.stop(), b.lastdeltax += i, b.debounced("mousewheelx", function() {
                        var e = b.lastdeltax;
                        b.lastdeltax = 0, b.rail.drag || b.doScrollLeftBy(e)
                    }, 15)), r) {
                    if (b.opt.nativeparentscrolling && t && !b.ispage && !b.zoomactive)
                        if (0 > r) {
                            if (b.getScrollTop() >= b.page.maxh) return !0
                        } else if (0 >= b.getScrollTop()) return !0;
                    b.scrollmom && b.scrollmom.stop(), b.lastdeltay += r, b.synched("mousewheely", function() {
                        var e = b.lastdeltay;
                        b.lastdeltay = 0, b.rail.drag || b.doScrollBy(e)
                    }, 15)
                }
                return e.stopImmediatePropagation(), e.preventDefault()
            }
            var b = this;
            if (this.version = "3.6.8", this.name = "nicescroll", this.me = c, this.opt = {
                    doc: e("body"),
                    win: !1
                }, e.extend(this.opt, h), this.opt.snapbackspeed = 80, s)
                for (var y in b.opt) void 0 !== s[y] && (b.opt[y] = s[y]);
            if (b.opt.disablemutationobserver && (u = !1), this.iddoc = (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /^BODY|HTML/.test(b.opt.win ? b.opt.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== b.opt.win, this.win = b.opt.win || (this.ispage ? e(window) : this.doc), this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win, this.body = e("body"), this.iframe = this.isfixed = this.viewport = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != b.opt.autohidemode, this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1, this.scroll = {
                    x: 0,
                    y: 0
                }, this.scrollratio = {
                    x: 0,
                    y: 0
                }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == this.opt.rtlmode) {
                y = this.win[0] == window ? this.body : this.win;
                var x = y.css("writing-mode") || y.css("-webkit-writing-mode") || y.css("-ms-writing-mode") || y.css("-moz-writing-mode");
                "horizontal-tb" == x || "lr-tb" == x || "" == x ? (this.isrtlmode = "rtl" == y.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == x || "tb" == x || "tb-rl" == x || "rl-tb" == x, this.isvertical = "vertical-rl" == x || "tb" == x || "tb-rl" == x)
            } else this.isrtlmode = !0 === this.opt.rtlmode, this.isvertical = !1;
            this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;
            do this.id = "ascrail" + r++; while (document.getElementById(this.id));
            this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1, this.visibility = !0, this.hidden = this.locked = this.railslocked = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = b.opt.overflowx, this.overflowy = b.opt.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltay = this.lastdeltax = 0, this.detected = m();
            var S = e.extend({}, this.detected);
            this.ishwscroll = (this.canhwscroll = S.hastransform && b.opt.hwacceleration) && b.haswrapper, this.hasreversehr = !!this.isrtlmode && (this.isvertical ? !(S.iswebkit || S.isie || S.isie11) : !(S.iswebkit || S.isie && !S.isie10 && !S.isie11)), this.istouchcapable = !1, S.cantouch || !S.hasw3ctouch && !S.hasmstouch ? !S.cantouch || S.isios || S.isandroid || !S.iswebkit && !S.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0, b.opt.enablemouselockapi || (S.hasmousecapture = !1, S.haspointerlock = !1), this.debounced = function(e, o, t) {
                b && (b.delaylist[e] || (o.call(b), b.delaylist[e] = {
                    h: l(function() {
                        b.delaylist[e].fn.call(b), b.delaylist[e] = !1
                    }, t)
                }), b.delaylist[e].fn = o)
            };
            var z = !1;
            this.synched = function(e, o) {
                return b.synclist[e] = o,
                    function() {
                        z || (l(function() {
                            if (b) {
                                z = !1;
                                for (var e in b.synclist) {
                                    var o = b.synclist[e];
                                    o && o.call(b), b.synclist[e] = !1
                                }
                            }
                        }), z = !0)
                    }(), e
            }, this.unsynched = function(e) {
                b.synclist[e] && (b.synclist[e] = !1)
            }, this.css = function(e, o) {
                for (var t in o) b.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
            }, this.scrollTop = function(e) {
                return void 0 === e ? b.getScrollTop() : b.setScrollTop(e)
            }, this.scrollLeft = function(e) {
                return void 0 === e ? b.getScrollLeft() : b.setScrollLeft(e)
            };
            var T = function(e, o, t, i, r, n, s) {
                this.st = e, this.ed = o, this.spd = t, this.p1 = i || 0, this.p2 = r || 1, this.p3 = n || 0, this.p4 = s || 1, this.ts = (new Date).getTime(), this.df = this.ed - this.st
            };
            if (T.prototype = {
                    B2: function(e) {
                        return 3 * e * e * (1 - e)
                    },
                    B3: function(e) {
                        return 3 * e * (1 - e) * (1 - e)
                    },
                    B4: function(e) {
                        return (1 - e) * (1 - e) * (1 - e)
                    },
                    getNow: function() {
                        var e = 1 - ((new Date).getTime() - this.ts) / this.spd,
                            o = this.B2(e) + this.B3(e) + this.B4(e);
                        return 0 > e ? this.ed : this.st + Math.round(this.df * o)
                    },
                    update: function(e, o) {
                        return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = (new Date).getTime(), this.df = this.ed - this.st, this
                    }
                }, this.ishwscroll) {
                this.doc.translate = {
                    x: 0,
                    y: 0,
                    tx: "0px",
                    ty: "0px"
                }, S.hastranslate3d && S.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function(e) {
                    if (!e) {
                        if (e = d()) return 16 == e.length ? -e[13] : -e[5];
                        if (b.timerscroll && b.timerscroll.bz) return b.timerscroll.bz.getNow()
                    }
                    return b.doc.translate.y
                }, this.getScrollLeft = function(e) {
                    if (!e) {
                        if (e = d()) return 16 == e.length ? -e[12] : -e[4];
                        if (b.timerscroll && b.timerscroll.bh) return b.timerscroll.bh.getNow()
                    }
                    return b.doc.translate.x
                }, this.notifyScrollEvent = function(e) {
                    var o = document.createEvent("UIEvents");
                    o.initUIEvent("scroll", !1, !0, window, 1), o.niceevent = !0, e.dispatchEvent(o)
                };
                var k = this.isrtlmode ? 1 : -1;
                S.hastranslate3d && b.opt.enabletranslate3d ? (this.setScrollTop = function(e, o) {
                    b.doc.translate.y = e, b.doc.translate.ty = -1 * e + "px", b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)"), o || b.notifyScrollEvent(b.win[0])
                }, this.setScrollLeft = function(e, o) {
                    b.doc.translate.x = e, b.doc.translate.tx = e * k + "px", b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)"), o || b.notifyScrollEvent(b.win[0])
                }) : (this.setScrollTop = function(e, o) {
                    b.doc.translate.y = e, b.doc.translate.ty = -1 * e + "px", b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")"), o || b.notifyScrollEvent(b.win[0])
                }, this.setScrollLeft = function(e, o) {
                    b.doc.translate.x = e, b.doc.translate.tx = e * k + "px", b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")"), o || b.notifyScrollEvent(b.win[0])
                })
            } else this.getScrollTop = function() {
                return b.docscroll.scrollTop()
            }, this.setScrollTop = function(e) {
                return setTimeout(function() {
                    b && b.docscroll.scrollTop(e)
                }, 1)
            }, this.getScrollLeft = function() {
                return b.hasreversehr ? b.detected.ismozilla ? b.page.maxw - Math.abs(b.docscroll.scrollLeft()) : b.page.maxw - b.docscroll.scrollLeft() : b.docscroll.scrollLeft()
            }, this.setScrollLeft = function(e) {
                return setTimeout(function() {
                    if (b) return b.hasreversehr && (e = b.detected.ismozilla ? -(b.page.maxw - e) : b.page.maxw - e), b.docscroll.scrollLeft(e)
                }, 1)
            };
            this.getTarget = function(e) {
                return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
            }, this.hasParent = function(e, o) {
                if (!e) return !1;
                for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
                return !1 !== t
            };
            var M = {
                thin: 1,
                medium: 3,
                thick: 5
            };
            this.getDocumentScrollOffset = function() {
                return {
                    top: window.pageYOffset || document.documentElement.scrollTop,
                    left: window.pageXOffset || document.documentElement.scrollLeft
                }
            }, this.getOffset = function() {
                if (b.isfixed) {
                    var e = b.win.offset(),
                        o = b.getDocumentScrollOffset();
                    return e.top -= o.top, e.left -= o.left, e
                }
                return e = b.win.offset(), b.viewport ? (o = b.viewport.offset(), {
                    top: e.top - o.top,
                    left: e.left - o.left
                }) : e
            }, this.updateScrollBar = function(e) {
                var o, t, i;
                if (b.ishwscroll) b.rail.css({
                    height: b.win.innerHeight() - (b.opt.railpadding.top + b.opt.railpadding.bottom)
                }), b.railh && b.railh.css({
                    width: b.win.innerWidth() - (b.opt.railpadding.left + b.opt.railpadding.right)
                });
                else {
                    var r = b.getOffset();
                    o = r.top, t = r.left - (b.opt.railpadding.left + b.opt.railpadding.right), o += f(b.win, "border-top-width", !0), t += b.rail.align ? b.win.outerWidth() - f(b.win, "border-right-width") - b.rail.width : f(b.win, "border-left-width"), (i = b.opt.railoffset) && (i.top && (o += i.top), i.left && (t += i.left)), b.railslocked || b.rail.css({
                        top: o,
                        left: t,
                        height: (e ? e.h : b.win.innerHeight()) - (b.opt.railpadding.top + b.opt.railpadding.bottom)
                    }), b.zoom && b.zoom.css({
                        top: o + 1,
                        left: 1 == b.rail.align ? t - 20 : t + b.rail.width + 4
                    }), b.railh && !b.railslocked && (o = r.top, t = r.left, (i = b.opt.railhoffset) && (i.top && (o += i.top), i.left && (t += i.left)), e = b.railh.align ? o + f(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : o + f(b.win, "border-top-width", !0), t += f(b.win, "border-left-width"), b.railh.css({
                        top: e - (b.opt.railpadding.top + b.opt.railpadding.bottom),
                        left: t,
                        width: b.railh.width
                    }))
                }
            }, this.doRailClick = function(e, o, t) {
                var i;
                b.railslocked || (b.cancelEvent(e), o ? (o = t ? b.doScrollLeft : b.doScrollTop, i = t ? (e.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (e.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, o(i)) : (o = t ? b.doScrollLeftBy : b.doScrollBy, i = t ? b.scroll.x : b.scroll.y, e = t ? e.pageX - b.railh.offset().left : e.pageY - b.rail.offset().top, t = t ? b.view.w : b.view.h, o(i >= e ? t : -t)))
            }, b.hasanimationframe = l, b.hascancelanimationframe = a, b.hasanimationframe ? b.hascancelanimationframe || (a = function() {
                b.cancelAnimationFrame = !0
            }) : (l = function(e) {
                return setTimeout(e, 15 - Math.floor(+new Date / 1e3) % 16)
            }, a = clearTimeout), this.init = function() {
                if (b.saved.css = [], S.isie7mobile || S.isoperamini) return !0;
                S.hasmstouch && b.css(b.ispage ? e("html") : b.win, {
                    _touchaction: "none"
                });
                var r = S.ismodernie || S.isie10 ? {
                    "-ms-overflow-style": "none"
                } : {
                    "overflow-y": "hidden"
                };
                if (b.zindex = "auto", b.zindex = b.ispage || "auto" != b.opt.zindex ? b.opt.zindex : p() || "auto", !b.ispage && "auto" != b.zindex && b.zindex > n && (n = b.zindex), b.isie && 0 == b.zindex && "auto" == b.opt.zindex && (b.zindex = "auto"), !b.ispage || !S.cantouch && !S.isieold && !S.isie9mobile) {
                    var s = b.docscroll;
                    b.ispage && (s = b.haswrapper ? b.win : b.doc), S.isie9mobile || b.css(s, r), b.ispage && S.isie7 && ("BODY" == b.doc[0].nodeName ? b.css(e("html"), {
                        "overflow-y": "hidden"
                    }) : "HTML" == b.doc[0].nodeName && b.css(e("body"), r)), !S.isios || b.ispage || b.haswrapper || b.css(e("body"), {
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var l = e(document.createElement("div"));
                    l.css({
                        position: "relative",
                        top: 0,
                        "float": "right",
                        width: b.opt.cursorwidth,
                        height: 0,
                        "background-color": b.opt.cursorcolor,
                        border: b.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": b.opt.cursorborderradius,
                        "-moz-border-radius": b.opt.cursorborderradius,
                        "border-radius": b.opt.cursorborderradius
                    }), l.hborder = parseFloat(l.outerHeight() - l.innerHeight()), l.addClass("nicescroll-cursors"), b.cursor = l;
                    var a = e(document.createElement("div"));
                    a.attr("id", b.id), a.addClass("nicescroll-rails nicescroll-rails-vr");
                    var c, d, h, m = ["left", "right", "top", "bottom"];
                    for (h in m) d = m[h], (c = b.opt.railpadding[d]) ? a.css("padding-" + d, c + "px") : b.opt.railpadding[d] = 0;
                    a.append(l), a.width = Math.max(parseFloat(b.opt.cursorwidth), l.outerWidth()), a.css({
                        width: a.width + "px",
                        zIndex: b.zindex,
                        background: b.opt.background,
                        cursor: "default"
                    }), a.visibility = !0, a.scrollable = !0, a.align = "left" == b.opt.railalign ? 0 : 1, b.rail = a, l = b.rail.drag = !1, !b.opt.boxzoom || b.ispage || S.isieold || (l = document.createElement("div"), b.bind(l, "click", b.doZoom), b.bind(l, "mouseenter", function() {
                        b.zoom.css("opacity", b.opt.cursoropacitymax)
                    }), b.bind(l, "mouseleave", function() {
                        b.zoom.css("opacity", b.opt.cursoropacitymin)
                    }), b.zoom = e(l), b.zoom.css({
                        cursor: "pointer",
                        zIndex: b.zindex,
                        backgroundImage: "url(" + b.opt.scriptpath + "zoomico.png)",
                        height: 18,
                        width: 18,
                        backgroundPosition: "0px 0px"
                    }), b.opt.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), S.cantouch && b.opt.gesturezoom && (b.ongesturezoom = function(e) {
                        return 1.5 < e.scale && b.doZoomIn(e), .8 > e.scale && b.doZoomOut(e), b.cancelEvent(e)
                    }, b.bind(b.win, "gestureend", b.ongesturezoom))), b.railh = !1;
                    var f;
                    if (b.opt.horizrailenabled && (b.css(s, {
                            overflowX: "hidden"
                        }), l = e(document.createElement("div")), l.css({
                            position: "absolute",
                            top: 0,
                            height: b.opt.cursorwidth,
                            width: 0,
                            backgroundColor: b.opt.cursorcolor,
                            border: b.opt.cursorborder,
                            backgroundClip: "padding-box",
                            "-webkit-border-radius": b.opt.cursorborderradius,
                            "-moz-border-radius": b.opt.cursorborderradius,
                            "border-radius": b.opt.cursorborderradius
                        }), S.isieold && l.css("overflow", "hidden"), l.wborder = parseFloat(l.outerWidth() - l.innerWidth()), l.addClass("nicescroll-cursors"), b.cursorh = l, f = e(document.createElement("div")), f.attr("id", b.id + "-hr"), f.addClass("nicescroll-rails nicescroll-rails-hr"), f.height = Math.max(parseFloat(b.opt.cursorwidth), l.outerHeight()), f.css({
                            height: f.height + "px",
                            zIndex: b.zindex,
                            background: b.opt.background
                        }), f.append(l), f.visibility = !0, f.scrollable = !0, f.align = "top" == b.opt.railvalign ? 0 : 1, b.railh = f, b.railh.drag = !1), b.ispage ? (a.css({
                            position: "fixed",
                            top: 0,
                            height: "100%"
                        }), a.align ? a.css({
                            right: 0
                        }) : a.css({
                            left: 0
                        }), b.body.append(a), b.railh && (f.css({
                            position: "fixed",
                            left: 0,
                            width: "100%"
                        }), f.align ? f.css({
                            bottom: 0
                        }) : f.css({
                            top: 0
                        }), b.body.append(f))) : (b.ishwscroll ? ("static" == b.win.css("position") && b.css(b.win, {
                            position: "relative"
                        }), s = "HTML" == b.win[0].nodeName ? b.body : b.win, e(s).scrollTop(0).scrollLeft(0), b.zoom && (b.zoom.css({
                            position: "absolute",
                            top: 1,
                            right: 0,
                            "margin-right": a.width + 4
                        }), s.append(b.zoom)), a.css({
                            position: "absolute",
                            top: 0
                        }), a.align ? a.css({
                            right: 0
                        }) : a.css({
                            left: 0
                        }), s.append(a), f && (f.css({
                            position: "absolute",
                            left: 0,
                            bottom: 0
                        }), f.align ? f.css({
                            bottom: 0
                        }) : f.css({
                            top: 0
                        }), s.append(f))) : (b.isfixed = "fixed" == b.win.css("position"), s = b.isfixed ? "fixed" : "absolute", b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, 0 == /fixed|absolute/.test(b.viewport.css("position")) && b.css(b.viewport, {
                            position: "relative"
                        })), a.css({
                            position: s
                        }), b.zoom && b.zoom.css({
                            position: s
                        }), b.updateScrollBar(), b.body.append(a), b.zoom && b.body.append(b.zoom), b.railh && (f.css({
                            position: s
                        }), b.body.append(f))), S.isios && b.css(b.win, {
                            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                            "-webkit-touch-callout": "none"
                        }), S.isie && b.opt.disableoutline && b.win.attr("hideFocus", "true"), S.iswebkit && b.opt.disableoutline && b.win.css("outline", "none")), !1 === b.opt.autohidemode ? (b.autohidedom = !1, b.rail.css({
                            opacity: b.opt.cursoropacitymax
                        }), b.railh && b.railh.css({
                            opacity: b.opt.cursoropacitymax
                        })) : !0 === b.opt.autohidemode || "leave" === b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), b.railh && S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == b.opt.autohidemode ? (b.autohidedom = e().add(b.cursor), b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == b.opt.autohidemode && (b.autohidedom = !1, b.hide(), b.railslocked = !1), S.isie9mobile) b.scrollmom = new g(b), b.onmangotouch = function() {
                        var e = b.getScrollTop(),
                            o = b.getScrollLeft();
                        if (e == b.scrollmom.lastscrolly && o == b.scrollmom.lastscrollx) return !0;
                        var t = e - b.mangotouch.sy,
                            i = o - b.mangotouch.sx;
                        if (0 != Math.round(Math.sqrt(Math.pow(i, 2) + Math.pow(t, 2)))) {
                            var r = 0 > t ? -1 : 1,
                                n = 0 > i ? -1 : 1,
                                s = +new Date;
                            b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy), 80 < s - b.mangotouch.tm || b.mangotouch.dry != r || b.mangotouch.drx != n ? (b.scrollmom.stop(), b.scrollmom.reset(o, e), b.mangotouch.sy = e, b.mangotouch.ly = e, b.mangotouch.sx = o, b.mangotouch.lx = o, b.mangotouch.dry = r, b.mangotouch.drx = n, b.mangotouch.tm = s) : (b.scrollmom.stop(), b.scrollmom.update(b.mangotouch.sx - i, b.mangotouch.sy - t), b.mangotouch.tm = s, t = Math.max(Math.abs(b.mangotouch.ly - e), Math.abs(b.mangotouch.lx - o)), b.mangotouch.ly = e, b.mangotouch.lx = o, 2 < t && (b.mangotouch.lazy = setTimeout(function() {
                                b.mangotouch.lazy = !1, b.mangotouch.dry = 0, b.mangotouch.drx = 0, b.mangotouch.tm = 0, b.scrollmom.doMomentum(30)
                            }, 100)))
                        }
                    }, a = b.getScrollTop(), f = b.getScrollLeft(), b.mangotouch = {
                        sy: a,
                        ly: a,
                        dry: 0,
                        sx: f,
                        lx: f,
                        drx: 0,
                        lazy: !1,
                        tm: 0
                    }, b.bind(b.docscroll, "scroll", b.onmangotouch);
                    else {
                        if (S.cantouch || b.istouchcapable || b.opt.touchbehavior || S.hasmstouch) {
                            b.scrollmom = new g(b), b.ontouchstart = function(o) {
                                if (o.pointerType && 2 != o.pointerType && "touch" != o.pointerType) return !1;
                                if (b.hasmoving = !1, !b.railslocked) {
                                    var t;
                                    if (S.hasmstouch)
                                        for (t = !!o.target && o.target; t;) {
                                            var i = e(t).getNiceScroll();
                                            if (0 < i.length && i[0].me == b.me) break;
                                            if (0 < i.length) return !1;
                                            if ("DIV" == t.nodeName && t.id == b.id) break;
                                            t = !!t.parentNode && t.parentNode
                                        }
                                    if (b.cancelScroll(), (t = b.getTarget(o)) && /INPUT/i.test(t.nodeName) && /range/i.test(t.type)) return b.stopPropagation(o);
                                    if (!("clientX" in o) && "changedTouches" in o && (o.clientX = o.changedTouches[0].clientX, o.clientY = o.changedTouches[0].clientY), b.forcescreen && (i = o, o = {
                                            original: o.original ? o.original : o
                                        }, o.clientX = i.screenX, o.clientY = i.screenY), b.rail.drag = {
                                            x: o.clientX,
                                            y: o.clientY,
                                            sx: b.scroll.x,
                                            sy: b.scroll.y,
                                            st: b.getScrollTop(),
                                            sl: b.getScrollLeft(),
                                            pt: 2,
                                            dl: !1
                                        }, b.ispage || !b.opt.directionlockdeadzone) b.rail.drag.dl = "f";
                                    else {
                                        var i = e(window).width(),
                                            r = e(window).height(),
                                            r = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - r),
                                            i = Math.max(0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - i);
                                        b.rail.drag.ck = !b.rail.scrollable && b.railh.scrollable ? 0 < r && "v" : !(!b.rail.scrollable || b.railh.scrollable) && (0 < i && "h"), b.rail.drag.ck || (b.rail.drag.dl = "f")
                                    }
                                    if (b.opt.touchbehavior && b.isiframe && S.isie && (i = b.win.position(), b.rail.drag.x += i.left, b.rail.drag.y += i.top), b.hasmoving = !1, b.lastmouseup = !1, b.scrollmom.reset(o.clientX, o.clientY), !S.cantouch && !this.istouchcapable && !o.pointerType) {
                                        if (!t || !/INPUT|SELECT|TEXTAREA/i.test(t.nodeName)) return !b.ispage && S.hasmousecapture && t.setCapture(), b.opt.touchbehavior ? (t.onclick && !t._onclick && (t._onclick = t.onclick, t.onclick = function(e) {
                                            return !b.hasmoving && void t._onclick.call(this, e)
                                        }), b.cancelEvent(o)) : b.stopPropagation(o);
                                        /SUBMIT|CANCEL|BUTTON/i.test(e(t).attr("type")) && (pc = {
                                            tg: t,
                                            click: !1
                                        }, b.preventclick = pc)
                                    }
                                }
                            }, b.ontouchend = function(e) {
                                if (!b.rail.drag) return !0;
                                if (2 == b.rail.drag.pt) {
                                    if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
                                    if (b.scrollmom.doMomentum(), b.rail.drag = !1, b.hasmoving && (b.lastmouseup = !0, b.hideCursor(), S.hasmousecapture && document.releaseCapture(), !S.cantouch)) return b.cancelEvent(e)
                                } else if (1 == b.rail.drag.pt) return b.onmouseup(e)
                            };
                            var w = b.opt.touchbehavior && b.isiframe && !S.hasmousecapture;
                            b.ontouchmove = function(o, t) {
                                if (!b.rail.drag || o.targetTouches && b.opt.preventmultitouchscrolling && 1 < o.targetTouches.length || o.pointerType && 2 != o.pointerType && "touch" != o.pointerType) return !1;
                                if (2 == b.rail.drag.pt) {
                                    if (S.cantouch && S.isios && void 0 === o.original) return !0;
                                    if (b.hasmoving = !0, b.preventclick && !b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick || !1, b.preventclick.tg.onclick = b.onpreventclick), o = e.extend({
                                            original: o
                                        }, o), "changedTouches" in o && (o.clientX = o.changedTouches[0].clientX, o.clientY = o.changedTouches[0].clientY), b.forcescreen) {
                                        var i = o;
                                        o = {
                                            original: o.original ? o.original : o
                                        }, o.clientX = i.screenX, o.clientY = i.screenY
                                    }
                                    var r, i = r = 0;
                                    w && !t && (r = b.win.position(), i = -r.left, r = -r.top);
                                    var n = o.clientY + r;
                                    r = n - b.rail.drag.y;
                                    var s = o.clientX + i,
                                        l = s - b.rail.drag.x,
                                        a = b.rail.drag.st - r;
                                    b.ishwscroll && b.opt.bouncescroll ? 0 > a ? a = Math.round(a / 2) : a > b.page.maxh && (a = b.page.maxh + Math.round((a - b.page.maxh) / 2)) : (0 > a && (n = a = 0), a > b.page.maxh && (a = b.page.maxh, n = 0));
                                    var c;
                                    if (b.railh && b.railh.scrollable && (c = b.isrtlmode ? l - b.rail.drag.sl : b.rail.drag.sl - l, b.ishwscroll && b.opt.bouncescroll ? 0 > c ? c = Math.round(c / 2) : c > b.page.maxw && (c = b.page.maxw + Math.round((c - b.page.maxw) / 2)) : (0 > c && (s = c = 0), c > b.page.maxw && (c = b.page.maxw, s = 0))), i = !1, b.rail.drag.dl) i = !0, "v" == b.rail.drag.dl ? c = b.rail.drag.sl : "h" == b.rail.drag.dl && (a = b.rail.drag.st);
                                    else {
                                        r = Math.abs(r);
                                        var l = Math.abs(l),
                                            d = b.opt.directionlockdeadzone;
                                        if ("v" == b.rail.drag.ck) {
                                            if (r > d && l <= .3 * r) return b.rail.drag = !1, !0;
                                            l > d && (b.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()))
                                        } else if ("h" == b.rail.drag.ck) {
                                            if (l > d && r <= .3 * l) return b.rail.drag = !1, !0;
                                            r > d && (b.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()))
                                        }
                                    }
                                    if (b.synched("touchmove", function() {
                                            b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.prepareTransition(0), b.rail.scrollable && b.setScrollTop(a), b.scrollmom.update(s, n), b.railh && b.railh.scrollable ? (b.setScrollLeft(c), b.showCursor(a, c)) : b.showCursor(a), S.isie10 && document.selection.clear())
                                        }), S.ischrome && b.istouchcapable && (i = !1), i) return b.cancelEvent(o)
                                } else if (1 == b.rail.drag.pt) return b.onmousemove(o)
                            }
                        }
                        if (b.onmousedown = function(e, o) {
                                if (!b.rail.drag || 1 == b.rail.drag.pt) {
                                    if (b.railslocked) return b.cancelEvent(e);
                                    b.cancelScroll(), b.rail.drag = {
                                        x: e.clientX,
                                        y: e.clientY,
                                        sx: b.scroll.x,
                                        sy: b.scroll.y,
                                        pt: 1,
                                        hr: !!o
                                    };
                                    var t = b.getTarget(e);
                                    return !b.ispage && S.hasmousecapture && t.setCapture(), b.isiframe && !S.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, {
                                        "pointer-events": "none"
                                    })), b.hasmoving = !1, b.cancelEvent(e)
                                }
                            }, b.onmouseup = function(e) {
                                if (b.rail.drag) return 1 != b.rail.drag.pt || (S.hasmousecapture && document.releaseCapture(), b.isiframe && !S.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), b.rail.drag = !1, b.hasmoving && b.triggerScrollEnd(), b.cancelEvent(e))
                            }, b.onmousemove = function(e) {
                                if (b.rail.drag) {
                                    if (1 == b.rail.drag.pt) {
                                        if (S.ischrome && 0 == e.which) return b.onmouseup(e);
                                        if (b.cursorfreezed = !0, b.hasmoving = !0, b.rail.drag.hr) {
                                            b.scroll.x = b.rail.drag.sx + (e.clientX - b.rail.drag.x), 0 > b.scroll.x && (b.scroll.x = 0);
                                            var o = b.scrollvaluemaxw;
                                            b.scroll.x > o && (b.scroll.x = o)
                                        } else b.scroll.y = b.rail.drag.sy + (e.clientY - b.rail.drag.y), 0 > b.scroll.y && (b.scroll.y = 0), o = b.scrollvaluemax, b.scroll.y > o && (b.scroll.y = o);
                                        return b.synched("mousemove", function() {
                                            b.rail.drag && 1 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.hasreversehr ? b.doScrollLeft(b.scrollvaluemaxw - Math.round(b.scroll.x * b.scrollratio.x), b.opt.cursordragspeed) : b.doScrollLeft(Math.round(b.scroll.x * b.scrollratio.x), b.opt.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), b.opt.cursordragspeed))
                                        }), b.cancelEvent(e)
                                    }
                                } else b.checkarea = 0
                            }, S.cantouch || b.opt.touchbehavior) b.onpreventclick = function(e) {
                            if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = !1, b.cancelEvent(e)
                        }, b.bind(b.win, "mousedown", b.ontouchstart), b.onclick = !S.isios && function(e) {
                                return !b.lastmouseup || (b.lastmouseup = !1, b.cancelEvent(e))
                            }, b.opt.grabcursorenabled && S.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, {
                            cursor: S.cursorgrabvalue
                        }), b.css(b.rail, {
                            cursor: S.cursorgrabvalue
                        }));
                        else {
                            var v = function(e) {
                                if (b.selectiondrag) {
                                    if (e) {
                                        var o = b.win.outerHeight();
                                        e = e.pageY - b.selectiondrag.top, 0 < e && e < o && (e = 0), e >= o && (e -= o), b.selectiondrag.df = e
                                    }
                                    0 != b.selectiondrag.df && (b.doScrollBy(2 * -Math.floor(b.selectiondrag.df / 6)), b.debounced("doselectionscroll", function() {
                                        v()
                                    }, 50))
                                }
                            };
                            b.hasTextSelected = "getSelection" in document ? function() {
                                return 0 < document.getSelection().rangeCount
                            } : "selection" in document ? function() {
                                return "None" != document.selection.type
                            } : function() {
                                return !1
                            }, b.onselectionstart = function(e) {
                                b.ispage || (b.selectiondrag = b.win.offset())
                            }, b.onselectionend = function(e) {
                                b.selectiondrag = !1
                            }, b.onselectiondrag = function(e) {
                                b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function() {
                                    v(e)
                                }, 250)
                            }
                        }
                        S.hasw3ctouch ? (b.css(b.rail, {
                            "touch-action": "none"
                        }), b.css(b.cursor, {
                            "touch-action": "none"
                        }), b.bind(b.win, "pointerdown", b.ontouchstart), b.bind(document, "pointerup", b.ontouchend), b.bind(document, "pointermove", b.ontouchmove)) : S.hasmstouch ? (b.css(b.rail, {
                            "-ms-touch-action": "none"
                        }), b.css(b.cursor, {
                            "-ms-touch-action": "none"
                        }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(document, "MSPointerUp", b.ontouchend), b.bind(document, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(e) {
                            e.preventDefault()
                        }), b.bind(b.cursor, "contextmenu", function(e) {
                            e.preventDefault()
                        })) : this.istouchcapable && (b.bind(b.win, "touchstart", b.ontouchstart), b.bind(document, "touchend", b.ontouchend), b.bind(document, "touchcancel", b.ontouchend), b.bind(document, "touchmove", b.ontouchmove)), (b.opt.cursordragontouch || !S.cantouch && !b.opt.touchbehavior) && (b.rail.css({
                            cursor: "default"
                        }), b.railh && b.railh.css({
                            cursor: "default"
                        }), b.jqbind(b.rail, "mouseenter", function() {
                            return !(!b.ispage && !b.win.is(":visible")) && (b.canshowonmouseevent && b.showCursor(), void(b.rail.active = !0))
                        }), b.jqbind(b.rail, "mouseleave", function() {
                            b.rail.active = !1, b.rail.drag || b.hideCursor()
                        }), b.opt.sensitiverail && (b.bind(b.rail, "click", function(e) {
                            b.doRailClick(e, !1, !1)
                        }), b.bind(b.rail, "dblclick", function(e) {
                            b.doRailClick(e, !0, !1)
                        }), b.bind(b.cursor, "click", function(e) {
                            b.cancelEvent(e)
                        }), b.bind(b.cursor, "dblclick", function(e) {
                            b.cancelEvent(e)
                        })), b.railh && (b.jqbind(b.railh, "mouseenter", function() {
                            return !(!b.ispage && !b.win.is(":visible")) && (b.canshowonmouseevent && b.showCursor(), void(b.rail.active = !0))
                        }), b.jqbind(b.railh, "mouseleave", function() {
                            b.rail.active = !1, b.rail.drag || b.hideCursor()
                        }), b.opt.sensitiverail && (b.bind(b.railh, "click", function(e) {
                            b.doRailClick(e, !1, !0)
                        }), b.bind(b.railh, "dblclick", function(e) {
                            b.doRailClick(e, !0, !0)
                        }), b.bind(b.cursorh, "click", function(e) {
                            b.cancelEvent(e)
                        }), b.bind(b.cursorh, "dblclick", function(e) {
                            b.cancelEvent(e)
                        })))), S.cantouch || b.opt.touchbehavior ? (b.bind(S.hasmousecapture ? b.win : document, "mouseup", b.ontouchend), b.bind(document, "mousemove", b.ontouchmove), b.onclick && b.bind(document, "click", b.onclick), b.opt.cursordragontouch ? (b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mouseup", b.onmouseup), b.cursorh && b.bind(b.cursorh, "mousedown", function(e) {
                            b.onmousedown(e, !0)
                        }), b.cursorh && b.bind(b.cursorh, "mouseup", b.onmouseup)) : (b.bind(b.rail, "mousedown", function(e) {
                            e.preventDefault()
                        }), b.railh && b.bind(b.railh, "mousedown", function(e) {
                            e.preventDefault()
                        }))) : (b.bind(S.hasmousecapture ? b.win : document, "mouseup", b.onmouseup), b.bind(document, "mousemove", b.onmousemove), b.onclick && b.bind(document, "click", b.onclick), b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mouseup", b.onmouseup), b.railh && (b.bind(b.cursorh, "mousedown", function(e) {
                            b.onmousedown(e, !0)
                        }), b.bind(b.cursorh, "mouseup", b.onmouseup)), !b.ispage && b.opt.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), b.bind(document, "mouseup", b.onselectionend), b.bind(b.cursor, "mouseup", b.onselectionend), b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(document, "mousemove", b.onselectiondrag)), b.zoom && (b.jqbind(b.zoom, "mouseenter", function() {
                            b.canshowonmouseevent && b.showCursor(), b.rail.active = !0
                        }), b.jqbind(b.zoom, "mouseleave", function() {
                            b.rail.active = !1, b.rail.drag || b.hideCursor()
                        }))), b.opt.enablemousewheel && (b.isiframe || b.mousewheel(S.isie && b.ispage ? document : b.win, b.onmousewheel),
                            b.mousewheel(b.rail, b.onmousewheel), b.railh && b.mousewheel(b.railh, b.onmousewheelhr)), b.ispage || S.cantouch || /HTML|^BODY/.test(b.win[0].nodeName) || (b.win.attr("tabindex") || b.win.attr({
                            tabindex: i++
                        }), b.jqbind(b.win, "focus", function(e) {
                            o = b.getTarget(e).id || !0, b.hasfocus = !0, b.canshowonmouseevent && b.noticeCursor()
                        }), b.jqbind(b.win, "blur", function(e) {
                            o = !1, b.hasfocus = !1
                        }), b.jqbind(b.win, "mouseenter", function(e) {
                            t = b.getTarget(e).id || !0, b.hasmousefocus = !0, b.canshowonmouseevent && b.noticeCursor()
                        }), b.jqbind(b.win, "mouseleave", function() {
                            t = !1, b.hasmousefocus = !1, b.rail.drag || b.hideCursor()
                        }))
                    }
                    if (b.onkeypress = function(i) {
                            if (b.railslocked && 0 == b.page.maxh) return !0;
                            i = i ? i : window.e;
                            var r = b.getTarget(i);
                            if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!r.getAttribute("type") && !r.type || !/submit|button|cancel/i.tp) || e(r).attr("contenteditable")) return !0;
                            if (b.hasfocus || b.hasmousefocus && !o || b.ispage && !o && !t) {
                                if (r = i.keyCode, b.railslocked && 27 != r) return b.cancelEvent(i);
                                var n = i.ctrlKey || !1,
                                    s = i.shiftKey || !1,
                                    l = !1;
                                switch (r) {
                                    case 38:
                                    case 63233:
                                        b.doScrollBy(72), l = !0;
                                        break;
                                    case 40:
                                    case 63235:
                                        b.doScrollBy(-72), l = !0;
                                        break;
                                    case 37:
                                    case 63232:
                                        b.railh && (n ? b.doScrollLeft(0) : b.doScrollLeftBy(72), l = !0);
                                        break;
                                    case 39:
                                    case 63234:
                                        b.railh && (n ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72), l = !0);
                                        break;
                                    case 33:
                                    case 63276:
                                        b.doScrollBy(b.view.h), l = !0;
                                        break;
                                    case 34:
                                    case 63277:
                                        b.doScrollBy(-b.view.h), l = !0;
                                        break;
                                    case 36:
                                    case 63273:
                                        b.railh && n ? b.doScrollPos(0, 0) : b.doScrollTo(0), l = !0;
                                        break;
                                    case 35:
                                    case 63275:
                                        b.railh && n ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh), l = !0;
                                        break;
                                    case 32:
                                        b.opt.spacebarenabled && (s ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h), l = !0);
                                        break;
                                    case 27:
                                        b.zoomactive && (b.doZoom(), l = !0)
                                }
                                if (l) return b.cancelEvent(i)
                            }
                        }, b.opt.enablekeyboard && b.bind(document, S.isopera && !S.isopera12 ? "keypress" : "keydown", b.onkeypress), b.bind(document, "keydown", function(e) {
                            e.ctrlKey && (b.wheelprevented = !0)
                        }), b.bind(document, "keyup", function(e) {
                            e.ctrlKey || (b.wheelprevented = !1)
                        }), b.bind(window, "blur", function(e) {
                            b.wheelprevented = !1
                        }), b.bind(window, "resize", b.lazyResize), b.bind(window, "orientationchange", b.lazyResize), b.bind(window, "load", b.lazyResize), S.ischrome && !b.ispage && !b.haswrapper) {
                        var y = b.win.attr("style"),
                            a = parseFloat(b.win.css("width")) + 1;
                        b.win.css("width", a), b.synched("chromefix", function() {
                            b.win.attr("style", y)
                        })
                    }
                    b.onAttributeChange = function(e) {
                        b.lazyResize(b.isieold ? 250 : 30)
                    }, b.isie11 || !1 === u || (b.observerbody = new u(function(o) {
                        if (o.forEach(function(o) {
                                if ("attributes" == o.type) return e("body").hasClass("modal-open") && e("body").hasClass("modal-dialog") && !e.contains(e(".modal-dialog")[0], b.doc[0]) ? b.hide() : b.show()
                            }), document.body.scrollHeight != b.page.maxh) return b.lazyResize(30)
                    }), b.observerbody.observe(document.body, {
                        childList: !0,
                        subtree: !0,
                        characterData: !1,
                        attributes: !0,
                        attributeFilter: ["class"]
                    })), b.ispage || b.haswrapper || (!1 !== u ? (b.observer = new u(function(e) {
                        e.forEach(b.onAttributeChange)
                    }), b.observer.observe(b.win[0], {
                        childList: !0,
                        characterData: !1,
                        attributes: !0,
                        subtree: !1
                    }), b.observerremover = new u(function(e) {
                        e.forEach(function(e) {
                            if (0 < e.removedNodes.length)
                                for (var o in e.removedNodes)
                                    if (b && e.removedNodes[o] == b.win[0]) return b.remove()
                        })
                    }), b.observerremover.observe(b.win[0].parentNode, {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (b.bind(b.win, S.isie && !S.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), S.isie9 && b.win[0].attachEvent("onpropertychange", b.onAttributeChange), b.bind(b.win, "DOMNodeRemoved", function(e) {
                        e.target == b.win[0] && b.remove()
                    }))), !b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom), b.istextarea && (b.bind(b.win, "keydown", b.lazyResize), b.bind(b.win, "mouseup", b.lazyResize)), b.lazyResize(30)
                }
                if ("IFRAME" == this.doc[0].nodeName) {
                    var x = function() {
                        b.iframexd = !1;
                        var o;
                        try {
                            o = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
                        } catch (t) {
                            b.iframexd = !0, o = !1
                        }
                        if (b.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                        if (b.forcescreen = !0, b.isiframe && (b.iframe = {
                                doc: e(o),
                                html: b.doc.contents().find("html")[0],
                                body: b.doc.contents().find("body")[0]
                            }, b.getContentSize = function() {
                                return {
                                    w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
                                    h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight)
                                }
                            }, b.docscroll = e(b.iframe.body)), !S.isios && b.opt.iframeautoresize && !b.isiframe) {
                            b.win.scrollTop(0), b.doc.height("");
                            var i = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
                            b.doc.height(i)
                        }
                        b.lazyResize(30), S.isie7 && b.css(e(b.iframe.html), r), b.css(e(b.iframe.body), r), S.isios && b.haswrapper && b.css(e(o.body), {
                            "-webkit-transform": "translate3d(0,0,0)"
                        }), "contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(o, "scroll", b.onscroll), b.opt.enablemousewheel && b.mousewheel(o, b.onmousewheel), b.opt.enablekeyboard && b.bind(o, S.isopera ? "keypress" : "keydown", b.onkeypress), (S.cantouch || b.opt.touchbehavior) && (b.bind(o, "mousedown", b.ontouchstart), b.bind(o, "mousemove", function(e) {
                            return b.ontouchmove(e, !0)
                        }), b.opt.grabcursorenabled && S.cursorgrabvalue && b.css(e(o.body), {
                            cursor: S.cursorgrabvalue
                        })), b.bind(o, "mouseup", b.ontouchend), b.zoom && (b.opt.dblclickzoom && b.bind(o, "dblclick", b.doZoom), b.ongesturezoom && b.bind(o, "gestureend", b.ongesturezoom))
                    };
                    this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                        x.call(b.doc[0], !1)
                    }, 500), b.bind(this.doc, "load", x)
                }
            }, this.showCursor = function(e, o) {
                if (b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0), b.rail) {
                    if (b.autohidedom && (b.autohidedom.stop().css({
                            opacity: b.opt.cursoropacitymax
                        }), b.cursoractive = !0), b.rail.drag && 1 == b.rail.drag.pt || (void 0 !== e && !1 !== e && (b.scroll.y = Math.round(1 * e / b.scrollratio.y)), void 0 !== o && (b.scroll.x = Math.round(1 * o / b.scrollratio.x))), b.cursor.css({
                            height: b.cursorheight,
                            top: b.scroll.y
                        }), b.cursorh) {
                        var t = b.hasreversehr ? b.scrollvaluemaxw - b.scroll.x : b.scroll.x;
                        !b.rail.align && b.rail.visibility ? b.cursorh.css({
                            width: b.cursorwidth,
                            left: t + b.rail.width
                        }) : b.cursorh.css({
                            width: b.cursorwidth,
                            left: t
                        }), b.cursoractive = !0
                    }
                    b.zoom && b.zoom.stop().css({
                        opacity: b.opt.cursoropacitymax
                    })
                }
            }, this.hideCursor = function(e) {
                b.cursortimeout || !b.rail || !b.autohidedom || b.hasmousefocus && "leave" == b.opt.autohidemode || (b.cursortimeout = setTimeout(function() {
                    b.rail.active && b.showonmouseevent || (b.autohidedom.stop().animate({
                        opacity: b.opt.cursoropacitymin
                    }), b.zoom && b.zoom.stop().animate({
                        opacity: b.opt.cursoropacitymin
                    }), b.cursoractive = !1), b.cursortimeout = 0
                }, e || b.opt.hidecursordelay))
            }, this.noticeCursor = function(e, o, t) {
                b.showCursor(o, t), b.rail.active || b.hideCursor(e)
            }, this.getContentSize = b.ispage ? function() {
                return {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
            } : b.haswrapper ? function() {
                return {
                    w: b.doc.outerWidth() + parseInt(b.win.css("paddingLeft")) + parseInt(b.win.css("paddingRight")),
                    h: b.doc.outerHeight() + parseInt(b.win.css("paddingTop")) + parseInt(b.win.css("paddingBottom"))
                }
            } : function() {
                return {
                    w: b.docscroll[0].scrollWidth,
                    h: b.docscroll[0].scrollHeight
                }
            }, this.onResize = function(e, o) {
                if (!b || !b.win) return !1;
                if (!b.haswrapper && !b.ispage) {
                    if ("none" == b.win.css("display")) return b.visibility && b.hideRail().hideRailHr(), !1;
                    b.hidden || b.visibility || b.showRail().showRailHr()
                }
                var t = b.page.maxh,
                    i = b.page.maxw,
                    r = b.view.h,
                    n = b.view.w;
                if (b.view = {
                        w: b.ispage ? b.win.width() : parseInt(b.win[0].clientWidth),
                        h: b.ispage ? b.win.height() : parseInt(b.win[0].clientHeight)
                    }, b.page = o ? o : b.getContentSize(), b.page.maxh = Math.max(0, b.page.h - b.view.h), b.page.maxw = Math.max(0, b.page.w - b.view.w), b.page.maxh == t && b.page.maxw == i && b.view.w == n && b.view.h == r) {
                    if (b.ispage) return b;
                    if (t = b.win.offset(), b.lastposition && (i = b.lastposition, i.top == t.top && i.left == t.left)) return b;
                    b.lastposition = t
                }
                return 0 == b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, b.cursorheight = 0, b.setScrollTop(0), b.rail && (b.rail.scrollable = !1)) : (b.page.maxh -= b.opt.railpadding.top + b.opt.railpadding.bottom, b.rail.scrollable = !0), 0 == b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, b.cursorwidth = 0, b.setScrollLeft(0), b.railh && (b.railh.scrollable = !1)) : (b.page.maxw -= b.opt.railpadding.left + b.opt.railpadding.right, b.railh && (b.railh.scrollable = b.opt.horizrailenabled)), b.railslocked = b.locked || 0 == b.page.maxh && 0 == b.page.maxw, b.railslocked ? (b.ispage || b.updateScrollBar(b.view), !1) : (b.hidden || b.visibility ? !b.railh || b.hidden || b.railh.visibility || b.showRailHr() : b.showRail().showRailHr(), b.istextarea && b.win.css("resize") && "none" != b.win.css("resize") && (b.view.h -= 20), b.cursorheight = Math.min(b.view.h, Math.round(b.view.h / b.page.h * b.view.h)), b.cursorheight = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorheight), b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w / b.page.w * b.view.w)), b.cursorwidth = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorwidth), b.scrollvaluemax = b.view.h - b.cursorheight - b.cursor.hborder - (b.opt.railpadding.top + b.opt.railpadding.bottom), b.railh && (b.railh.width = 0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w, b.scrollvaluemaxw = b.railh.width - b.cursorwidth - b.cursorh.wborder - (b.opt.railpadding.left + b.opt.railpadding.right)), b.ispage || b.updateScrollBar(b.view), b.scrollratio = {
                    x: b.page.maxw / b.scrollvaluemaxw,
                    y: b.page.maxh / b.scrollvaluemax
                }, b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)), b.cursoractive && b.noticeCursor()), b.scroll.y && 0 == b.getScrollTop() && b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y)), b)
            }, this.resize = b.onResize, this.hlazyresize = 0, this.lazyResize = function(e) {
                return b.haswrapper || b.hide(), b.hlazyresize && clearTimeout(b.hlazyresize), b.hlazyresize = setTimeout(function() {
                    b && b.show().resize()
                }, 240), b
            }, this.jqbind = function(o, t, i) {
                b.events.push({
                    e: o,
                    n: t,
                    f: i,
                    q: !0
                }), e(o).bind(t, i)
            }, this.mousewheel = function(e, o, t) {
                if (e = "jquery" in e ? e[0] : e, "onwheel" in document.createElement("div")) b._bind(e, "wheel", o, t || !1);
                else {
                    var i = void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    w(e, i, o, t || !1), "DOMMouseScroll" == i && w(e, "MozMousePixelScroll", o, t || !1)
                }
            }, S.haseventlistener ? (this.bind = function(e, o, t, i) {
                b._bind("jquery" in e ? e[0] : e, o, t, i || !1)
            }, this._bind = function(e, o, t, i) {
                b.events.push({
                    e: e,
                    n: o,
                    f: t,
                    b: i,
                    q: !1
                }), e.addEventListener(o, t, i || !1)
            }, this.cancelEvent = function(e) {
                return !!e && (e = e.original ? e.original : e, e.cancelable && e.preventDefault(), e.stopPropagation(), e.preventManipulation && e.preventManipulation(), !1)
            }, this.stopPropagation = function(e) {
                return !!e && (e = e.original ? e.original : e, e.stopPropagation(), !1)
            }, this._unbind = function(e, o, t, i) {
                e.removeEventListener(o, t, i)
            }) : (this.bind = function(e, o, t, i) {
                var r = "jquery" in e ? e[0] : e;
                b._bind(r, o, function(e) {
                    return (e = e || window.event || !1) && e.srcElement && (e.target = e.srcElement), "pageY" in e || (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop), !1 !== t.call(r, e) && !1 !== i || b.cancelEvent(e)
                })
            }, this._bind = function(e, o, t, i) {
                b.events.push({
                    e: e,
                    n: o,
                    f: t,
                    b: i,
                    q: !1
                }), e.attachEvent ? e.attachEvent("on" + o, t) : e["on" + o] = t
            }, this.cancelEvent = function(e) {
                return !!(e = window.event || !1) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1)
            }, this.stopPropagation = function(e) {
                return !!(e = window.event || !1) && (e.cancelBubble = !0, !1)
            }, this._unbind = function(e, o, t, i) {
                e.detachEvent ? e.detachEvent("on" + o, t) : e["on" + o] = !1
            }), this.unbindAll = function() {
                for (var e = 0; e < b.events.length; e++) {
                    var o = b.events[e];
                    o.q ? o.e.unbind(o.n, o.f) : b._unbind(o.e, o.n, o.f, o.b)
                }
            }, this.showRail = function() {
                return 0 == b.page.maxh || !b.ispage && "none" == b.win.css("display") || (b.visibility = !0, b.rail.visibility = !0, b.rail.css("display", "block")), b
            }, this.showRailHr = function() {
                return b.railh ? (0 == b.page.maxw || !b.ispage && "none" == b.win.css("display") || (b.railh.visibility = !0, b.railh.css("display", "block")), b) : b
            }, this.hideRail = function() {
                return b.visibility = !1, b.rail.visibility = !1, b.rail.css("display", "none"), b
            }, this.hideRailHr = function() {
                return b.railh ? (b.railh.visibility = !1, b.railh.css("display", "none"), b) : b
            }, this.show = function() {
                return b.hidden = !1, b.railslocked = !1, b.showRail().showRailHr()
            }, this.hide = function() {
                return b.hidden = !0, b.railslocked = !0, b.hideRail().hideRailHr()
            }, this.toggle = function() {
                return b.hidden ? b.show() : b.hide()
            }, this.remove = function() {
                b.stop(), b.cursortimeout && clearTimeout(b.cursortimeout);
                for (var o in b.delaylist) b.delaylist[o] && a(b.delaylist[o].h);
                for (b.doZoomOut(), b.unbindAll(), S.isie9 && b.win[0].detachEvent("onpropertychange", b.onAttributeChange), !1 !== b.observer && b.observer.disconnect(), !1 !== b.observerremover && b.observerremover.disconnect(), !1 !== b.observerbody && b.observerbody.disconnect(), b.events = null, b.cursor && b.cursor.remove(), b.cursorh && b.cursorh.remove(), b.rail && b.rail.remove(), b.railh && b.railh.remove(), b.zoom && b.zoom.remove(), o = 0; o < b.saved.css.length; o++) {
                    var t = b.saved.css[o];
                    t[0].css(t[1], void 0 === t[2] ? "" : t[2])
                }
                b.saved = !1, b.me.data("__nicescroll", "");
                var i = e.nicescroll;
                i.each(function(e) {
                    if (this && this.id === b.id) {
                        delete i[e];
                        for (var o = ++e; o < i.length; o++, e++) i[e] = i[o];
                        i.length--, i.length && delete i[i.length]
                    }
                });
                for (var r in b) b[r] = null, delete b[r];
                b = null
            }, this.scrollstart = function(e) {
                return this.onscrollstart = e, b
            }, this.scrollend = function(e) {
                return this.onscrollend = e, b
            }, this.scrollcancel = function(e) {
                return this.onscrollcancel = e, b
            }, this.zoomin = function(e) {
                return this.onzoomin = e, b
            }, this.zoomout = function(e) {
                return this.onzoomout = e, b
            }, this.isScrollable = function(o) {
                if (o = o.target ? o.target : o, "OPTION" == o.nodeName) return !0;
                for (; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                    var t = e(o),
                        t = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(t)) return o.clientHeight != o.scrollHeight;
                    o = !!o.parentNode && o.parentNode
                }
                return !1
            }, this.getViewport = function(o) {
                for (o = !(!o || !o.parentNode) && o.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                    var t = e(o);
                    if (/fixed|absolute/.test(t.css("position"))) return t;
                    var i = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(i) && o.clientHeight != o.scrollHeight || 0 < t.getNiceScroll().length) return t;
                    o = !!o.parentNode && o.parentNode
                }
                return !1
            }, this.triggerScrollEnd = function() {
                if (b.onscrollend) {
                    var e = b.getScrollLeft(),
                        o = b.getScrollTop();
                    b.onscrollend.call(b, {
                        type: "scrollend",
                        current: {
                            x: e,
                            y: o
                        },
                        end: {
                            x: e,
                            y: o
                        }
                    })
                }
            }, this.onmousewheel = function(e) {
                if (!b.wheelprevented) {
                    if (b.railslocked) return b.debounced("checkunlock", b.resize, 250), !0;
                    if (b.rail.drag) return b.cancelEvent(e);
                    if ("auto" == b.opt.oneaxismousemode && 0 != e.deltaX && (b.opt.oneaxismousemode = !1), b.opt.oneaxismousemode && 0 == e.deltaX && !b.rail.scrollable) return !b.railh || !b.railh.scrollable || b.onmousewheelhr(e);
                    var o = +new Date,
                        t = !1;
                    return b.opt.preservenativescrolling && b.checkarea + 600 < o && (b.nativescrollingarea = b.isScrollable(e), t = !0), b.checkarea = o, !!b.nativescrollingarea || ((e = v(e, !1, t)) && (b.checkarea = 0), e)
                }
            }, this.onmousewheelhr = function(e) {
                if (!b.wheelprevented) {
                    if (b.railslocked || !b.railh.scrollable) return !0;
                    if (b.rail.drag) return b.cancelEvent(e);
                    var o = +new Date,
                        t = !1;
                    return b.opt.preservenativescrolling && b.checkarea + 600 < o && (b.nativescrollingarea = b.isScrollable(e), t = !0), b.checkarea = o, !!b.nativescrollingarea || (b.railslocked ? b.cancelEvent(e) : v(e, !0, t))
                }
            }, this.stop = function() {
                return b.cancelScroll(), b.scrollmon && b.scrollmon.stop(), b.cursorfreezed = !1, b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.noticeCursor(), b
            }, this.getTransitionSpeed = function(e) {
                return e = Math.min(Math.round(10 * b.opt.scrollspeed), Math.round(e / 20 * b.opt.scrollspeed)), 20 < e ? e : 0
            }, b.opt.smoothscroll ? b.ishwscroll && S.hastransition && b.opt.usetransition && b.opt.smoothscroll ? (this.prepareTransition = function(e, o) {
                var t = o ? 20 < e ? e : 0 : b.getTransitionSpeed(e),
                    i = t ? S.prefixstyle + "transform " + t + "ms ease-out" : "";
                return b.lasttransitionstyle && b.lasttransitionstyle == i || (b.lasttransitionstyle = i, b.doc.css(S.transitionstyle, i)), t
            }, this.doScrollLeft = function(e, o) {
                var t = b.scrollrunning ? b.newscrolly : b.getScrollTop();
                b.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
                b.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var i = b.getScrollTop(),
                    r = b.getScrollLeft();
                return (0 > (b.newscrolly - i) * (o - i) || 0 > (b.newscrollx - r) * (e - r)) && b.cancelScroll(), 0 == b.opt.bouncescroll && (0 > o ? o = 0 : o > b.page.maxh && (o = b.page.maxh), 0 > e ? e = 0 : e > b.page.maxw && (e = b.page.maxw)), (!b.scrollrunning || e != b.newscrollx || o != b.newscrolly) && (b.newscrolly = o, b.newscrollx = e, b.newscrollspeed = t || !1, !b.timer && void(b.timer = setTimeout(function() {
                    var t = b.getScrollTop(),
                        i = b.getScrollLeft(),
                        r = Math.round(Math.sqrt(Math.pow(e - i, 2) + Math.pow(o - t, 2))),
                        r = b.newscrollspeed && 1 < b.newscrollspeed ? b.newscrollspeed : b.getTransitionSpeed(r);
                    b.newscrollspeed && 1 >= b.newscrollspeed && (r *= b.newscrollspeed), b.prepareTransition(r, !0), b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm), 0 < r && (!b.scrollrunning && b.onscrollstart && b.onscrollstart.call(b, {
                        type: "scrollstart",
                        current: {
                            x: i,
                            y: t
                        },
                        request: {
                            x: e,
                            y: o
                        },
                        end: {
                            x: b.newscrollx,
                            y: b.newscrolly
                        },
                        speed: r
                    }), S.transitionend ? b.scrollendtrapped || (b.scrollendtrapped = !0, b.bind(b.doc, S.transitionend, b.onScrollTransitionEnd, !1)) : (b.scrollendtrapped && clearTimeout(b.scrollendtrapped), b.scrollendtrapped = setTimeout(b.onScrollTransitionEnd, r)), b.timerscroll = {
                        bz: new T(t, b.newscrolly, r, 0, 0, .58, 1),
                        bh: new T(i, b.newscrollx, r, 0, 0, .58, 1)
                    }, b.cursorfreezed || (b.timerscroll.tm = setInterval(function() {
                        b.showCursor(b.getScrollTop(), b.getScrollLeft())
                    }, 60))), b.synched("doScroll-set", function() {
                        b.timer = 0, b.scrollendtrapped && (b.scrollrunning = !0), b.setScrollTop(b.newscrolly), b.setScrollLeft(b.newscrollx), b.scrollendtrapped || b.onScrollTransitionEnd()
                    })
                }, 50)))
            }, this.cancelScroll = function() {
                if (!b.scrollendtrapped) return !0;
                var e = b.getScrollTop(),
                    o = b.getScrollLeft();
                return b.scrollrunning = !1, S.transitionend || clearTimeout(S.transitionend), b.scrollendtrapped = !1, b._unbind(b.doc[0], S.transitionend, b.onScrollTransitionEnd), b.prepareTransition(0), b.setScrollTop(e), b.railh && b.setScrollLeft(o), b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm), b.timerscroll = !1, b.cursorfreezed = !1, b.showCursor(e, o), b
            }, this.onScrollTransitionEnd = function() {
                b.scrollendtrapped && b._unbind(b.doc[0], S.transitionend, b.onScrollTransitionEnd), b.scrollendtrapped = !1, b.prepareTransition(0), b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm), b.timerscroll = !1;
                var e = b.getScrollTop(),
                    o = b.getScrollLeft();
                return b.setScrollTop(e), b.railh && b.setScrollLeft(o), b.noticeCursor(!1, e, o), b.cursorfreezed = !1, 0 > e ? e = 0 : e > b.page.maxh && (e = b.page.maxh), 0 > o ? o = 0 : o > b.page.maxw && (o = b.page.maxw), e != b.newscrolly || o != b.newscrollx ? b.doScrollPos(o, e, b.opt.snapbackspeed) : (b.onscrollend && b.scrollrunning && b.triggerScrollEnd(), void(b.scrollrunning = !1))
            }) : (this.doScrollLeft = function(e, o) {
                var t = b.scrollrunning ? b.newscrolly : b.getScrollTop();
                b.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
                b.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                function i() {
                    if (b.cancelAnimationFrame) return !0;
                    if (b.scrollrunning = !0, u = 1 - u) return b.timer = l(i) || 1;
                    var e, o, t = 0,
                        r = o = b.getScrollTop();
                    b.dst.ay ? (r = b.bzscroll ? b.dst.py + b.bzscroll.getNow() * b.dst.ay : b.newscrolly, e = r - o, (0 > e && r < b.newscrolly || 0 < e && r > b.newscrolly) && (r = b.newscrolly), b.setScrollTop(r), r == b.newscrolly && (t = 1)) : t = 1, o = e = b.getScrollLeft(), b.dst.ax ? (o = b.bzscroll ? b.dst.px + b.bzscroll.getNow() * b.dst.ax : b.newscrollx, e = o - e, (0 > e && o < b.newscrollx || 0 < e && o > b.newscrollx) && (o = b.newscrollx), b.setScrollLeft(o), o == b.newscrollx && (t += 1)) : t += 1, 2 == t ? (b.timer = 0, b.cursorfreezed = !1, b.bzscroll = !1, b.scrollrunning = !1, 0 > r ? r = 0 : r > b.page.maxh && (r = Math.max(0, b.page.maxh)), 0 > o ? o = 0 : o > b.page.maxw && (o = b.page.maxw), o != b.newscrollx || r != b.newscrolly ? b.doScrollPos(o, r) : b.onscrollend && b.triggerScrollEnd()) : b.timer = l(i) || 1
                }
                if (o = void 0 === o || !1 === o ? b.getScrollTop(!0) : o, b.timer && b.newscrolly == o && b.newscrollx == e) return !0;
                b.timer && a(b.timer), b.timer = 0;
                var r = b.getScrollTop(),
                    n = b.getScrollLeft();
                (0 > (b.newscrolly - r) * (o - r) || 0 > (b.newscrollx - n) * (e - n)) && b.cancelScroll(), b.newscrolly = o, b.newscrollx = e, b.bouncescroll && b.rail.visibility || (0 > b.newscrolly ? b.newscrolly = 0 : b.newscrolly > b.page.maxh && (b.newscrolly = b.page.maxh)), b.bouncescroll && b.railh.visibility || (0 > b.newscrollx ? b.newscrollx = 0 : b.newscrollx > b.page.maxw && (b.newscrollx = b.page.maxw)), b.dst = {}, b.dst.x = e - n, b.dst.y = o - r, b.dst.px = n, b.dst.py = r;
                var s = Math.round(Math.sqrt(Math.pow(b.dst.x, 2) + Math.pow(b.dst.y, 2)));
                b.dst.ax = b.dst.x / s, b.dst.ay = b.dst.y / s;
                var c = 0,
                    d = s;
                if (0 == b.dst.x ? (c = r, d = o, b.dst.ay = 1, b.dst.py = 0) : 0 == b.dst.y && (c = n, d = e, b.dst.ax = 1, b.dst.px = 0), s = b.getTransitionSpeed(s), t && 1 >= t && (s *= t), b.bzscroll = 0 < s && (b.bzscroll ? b.bzscroll.update(d, s) : new T(c, d, s, 0, 1, 0, 1)), !b.timer) {
                    (r == b.page.maxh && o >= b.page.maxh || n == b.page.maxw && e >= b.page.maxw) && b.checkContentSize();
                    var u = 1;
                    b.cancelAnimationFrame = !1, b.timer = 1, b.onscrollstart && !b.scrollrunning && b.onscrollstart.call(b, {
                        type: "scrollstart",
                        current: {
                            x: n,
                            y: r
                        },
                        request: {
                            x: e,
                            y: o
                        },
                        end: {
                            x: b.newscrollx,
                            y: b.newscrolly
                        },
                        speed: s
                    }), i(), (r == b.page.maxh && o >= r || n == b.page.maxw && e >= n) && b.checkContentSize(), b.noticeCursor()
                }
            }, this.cancelScroll = function() {
                return b.timer && a(b.timer), b.timer = 0, b.bzscroll = !1, b.scrollrunning = !1, b
            }) : (this.doScrollLeft = function(e, o) {
                var t = b.getScrollTop();
                b.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = b.getScrollLeft();
                b.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var i = e > b.page.maxw ? b.page.maxw : e;
                0 > i && (i = 0);
                var r = o > b.page.maxh ? b.page.maxh : o;
                0 > r && (r = 0), b.synched("scroll", function() {
                    b.setScrollTop(r), b.setScrollLeft(i)
                })
            }, this.cancelScroll = function() {}), this.doScrollBy = function(e, o) {
                var t = 0,
                    t = o ? Math.floor((b.scroll.y - e) * b.scrollratio.y) : (b.timer ? b.newscrolly : b.getScrollTop(!0)) - e;
                if (b.bouncescroll) {
                    var i = Math.round(b.view.h / 2);
                    t < -i ? t = -i : t > b.page.maxh + i && (t = b.page.maxh + i)
                }
                return b.cursorfreezed = !1, i = b.getScrollTop(!0), 0 > t && 0 >= i ? b.noticeCursor() : t > b.page.maxh && i >= b.page.maxh ? (b.checkContentSize(), b.noticeCursor()) : void b.doScrollTop(t)
            }, this.doScrollLeftBy = function(e, o) {
                var t = 0,
                    t = o ? Math.floor((b.scroll.x - e) * b.scrollratio.x) : (b.timer ? b.newscrollx : b.getScrollLeft(!0)) - e;
                if (b.bouncescroll) {
                    var i = Math.round(b.view.w / 2);
                    t < -i ? t = -i : t > b.page.maxw + i && (t = b.page.maxw + i)
                }
                return b.cursorfreezed = !1, i = b.getScrollLeft(!0), 0 > t && 0 >= i || t > b.page.maxw && i >= b.page.maxw ? b.noticeCursor() : void b.doScrollLeft(t)
            }, this.doScrollTo = function(e, o) {
                b.cursorfreezed = !1, b.doScrollTop(e)
            }, this.checkContentSize = function() {
                var e = b.getContentSize();
                e.h == b.page.h && e.w == b.page.w || b.resize(!1, e)
            }, b.onscroll = function(e) {
                b.rail.drag || b.cursorfreezed || b.synched("scroll", function() {
                    b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.railh && (b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x))), b.noticeCursor()
                })
            }, b.bind(b.docscroll, "scroll", b.onscroll), this.doZoomIn = function(o) {
                if (!b.zoomactive) {
                    b.zoomactive = !0, b.zoomrestore = {
                        style: {}
                    };
                    var t, i = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                        r = b.win[0].style;
                    for (t in i) {
                        var s = i[t];
                        b.zoomrestore.style[s] = void 0 !== r[s] ? r[s] : ""
                    }
                    return b.zoomrestore.style.width = b.win.css("width"), b.zoomrestore.style.height = b.win.css("height"), b.zoomrestore.padding = {
                        w: b.win.outerWidth() - b.win.width(),
                        h: b.win.outerHeight() - b.win.height()
                    }, S.isios4 && (b.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0)), b.win.css({
                        position: S.isios4 ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        zIndex: n + 100,
                        margin: 0
                    }), i = b.win.css("backgroundColor"), ("" == i || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(i)) && b.win.css("backgroundColor", "#fff"), b.rail.css({
                        zIndex: n + 101
                    }), b.zoom.css({
                        zIndex: n + 102
                    }), b.zoom.css("backgroundPosition", "0px -18px"), b.resizeZoom(), b.onzoomin && b.onzoomin.call(b), b.cancelEvent(o)
                }
            }, this.doZoomOut = function(o) {
                if (b.zoomactive) return b.zoomactive = !1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), S.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop), b.rail.css({
                    "z-index": b.zindex
                }), b.zoom.css({
                    "z-index": b.zindex
                }), b.zoomrestore = !1, b.zoom.css("backgroundPosition", "0px 0px"), b.onResize(), b.onzoomout && b.onzoomout.call(b), b.cancelEvent(o)
            }, this.doZoom = function(e) {
                return b.zoomactive ? b.doZoomOut(e) : b.doZoomIn(e)
            }, this.resizeZoom = function() {
                if (b.zoomactive) {
                    var o = b.getScrollTop();
                    b.win.css({
                        width: e(window).width() - b.zoomrestore.padding.w + "px",
                        height: e(window).height() - b.zoomrestore.padding.h + "px"
                    }), b.onResize(), b.setScrollTop(Math.min(b.page.maxh, o))
                }
            }, this.init(), e.nicescroll.push(this)
        },
        g = function(e) {
            var o = this;
            this.nc = e, this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0, this.snapy = this.snapx = !1, this.demuly = this.demulx = 0, this.lastscrolly = this.lastscrollx = -1, this.timer = this.chky = this.chkx = 0, this.time = function() {
                return +new Date
            }, this.reset = function(e, t) {
                o.stop();
                var i = o.time();
                o.steptime = 0, o.lasttime = i, o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.update = function(e, t) {
                var i = o.time();
                o.steptime = i - o.lasttime, o.lasttime = i;
                var i = t - o.lasty,
                    r = e - o.lastx,
                    n = o.nc.getScrollTop(),
                    s = o.nc.getScrollLeft(),
                    n = n + i,
                    s = s + r;
                o.snapx = 0 > s || s > o.nc.page.maxw, o.snapy = 0 > n || n > o.nc.page.maxh, o.speedx = r, o.speedy = i, o.lastx = e, o.lasty = t
            }, this.stop = function() {
                o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.doSnapy = function(e, t) {
                var i = !1;
                0 > t ? (t = 0, i = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, i = !0), 0 > e ? (e = 0, i = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, i = !0), i ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd()
            }, this.doMomentum = function(e) {
                var t = o.time(),
                    i = e ? t + e : o.lasttime;
                e = o.nc.getScrollLeft();
                var r = o.nc.getScrollTop(),
                    n = o.nc.page.maxh,
                    s = o.nc.page.maxw;
                if (o.speedx = 0 < s ? Math.min(60, o.speedx) : 0, o.speedy = 0 < n ? Math.min(60, o.speedy) : 0, i = i && 60 >= t - i, (0 > r || r > n || 0 > e || e > s) && (i = !1), e = !(!o.speedx || !i) && o.speedx, o.speedy && i && o.speedy || e) {
                    var l = Math.max(16, o.steptime);
                    50 < l && (e = l / 50, o.speedx *= e, o.speedy *= e, l = 50), o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;
                    var a = o.lastscrollx,
                        c = o.lastscrolly,
                        d = function() {
                            var e = 600 < o.time() - t ? .04 : .02;
                            o.speedx && (a = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = a, 0 > a || a > s) && (e = .1), o.speedy && (c = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = c, 0 > c || c > n) && (e = .1), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function() {
                                o.speedx && (o.nc.getScrollLeft(), o.chkx = a, o.nc.setScrollLeft(a)), o.speedy && (o.nc.getScrollTop(), o.chky = c, o.nc.setScrollTop(c)), o.timer || (o.nc.hideCursor(), o.doSnapy(a, c))
                            }), 1 > o.demulxy ? o.timer = setTimeout(d, l) : (o.stop(), o.nc.hideCursor(), o.doSnapy(a, c))
                        };
                    d()
                } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
            }
        },
        w = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(o, t, i) {
            return (t = e.data(o, "__nicescroll") || !1) && t.ishwscroll ? t.getScrollTop() : w.call(o)
        },
        set: function(o, t) {
            var i = e.data(o, "__nicescroll") || !1;
            return i && i.ishwscroll ? i.setScrollTop(parseInt(t)) : w.call(o, t), this
        }
    }, e.fn.scrollTop = function(o) {
        if (void 0 === o) {
            var t = !!this[0] && (e.data(this[0], "__nicescroll") || !1);
            return t && t.ishwscroll ? t.getScrollTop() : w.call(this)
        }
        return this.each(function() {
            var t = e.data(this, "__nicescroll") || !1;
            t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : w.call(e(this), o)
        })
    };
    var v = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function(o, t, i) {
            return (t = e.data(o, "__nicescroll") || !1) && t.ishwscroll ? t.getScrollLeft() : v.call(o)
        },
        set: function(o, t) {
            var i = e.data(o, "__nicescroll") || !1;
            return i && i.ishwscroll ? i.setScrollLeft(parseInt(t)) : v.call(o, t), this
        }
    }, e.fn.scrollLeft = function(o) {
        if (void 0 === o) {
            var t = !!this[0] && (e.data(this[0], "__nicescroll") || !1);
            return t && t.ishwscroll ? t.getScrollLeft() : v.call(this)
        }
        return this.each(function() {
            var t = e.data(this, "__nicescroll") || !1;
            t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : v.call(e(this), o)
        })
    };
    var b = function(o) {
        var t = this;
        if (this.length = 0, this.name = "nicescrollarray", this.each = function(o) {
                return e.each(t, o), t
            }, this.push = function(e) {
                t[t.length] = e, t.length++
            }, this.eq = function(e) {
                return t[e]
            }, o)
            for (var i = 0; i < o.length; i++) {
                var r = e.data(o[i], "__nicescroll") || !1;
                r && (this[this.length] = r, this.length++)
            }
        return this
    };
    ! function(e, o, t) {
        for (var i = 0; i < o.length; i++) t(e, o[i])
    }(b.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(e, o) {
        e[o] = function() {
            var e = arguments;
            return this.each(function() {
                this[o].apply(this, e)
            })
        }
    }), e.fn.getNiceScroll = function(o) {
        return void 0 === o ? new b(this) : this[o] && e.data(this[o], "__nicescroll") || !1
    }, e.expr[":"].nicescroll = function(o) {
        return void 0 !== e.data(o, "__nicescroll")
    }, e.fn.niceScroll = function(o, t) {
        void 0 !== t || "object" != typeof o || "jquery" in o || (t = o, o = !1), t = e.extend({}, t);
        var i = new b;
        void 0 === t && (t = {}), o && (t.doc = e(o), t.win = e(this));
        var r = !("doc" in t);
        return r || "win" in t || (t.win = e(this)), this.each(function() {
            var o = e(this).data("__nicescroll") || !1;
            o || (t.doc = r ? e(this) : t.doc, o = new f(t, e(this)), e(this).data("__nicescroll", o)), i.push(o)
        }), 1 == i.length ? i[0] : i
    }, window.NiceScroll = {
        getjQuery: function() {
            return e
        }
    }, e.nicescroll || (e.nicescroll = new b, e.nicescroll.options = h)
});
! function(t, i, o, e) {
    function n(i, o) {
        this.el = i, this.$el = t(this.el), this.options = t.extend({}, l, o), this._defaults = l, this._name = a, this.init()
    }
    var a = "nivoLightbox",
        l = {
            effect: "fade",
            theme: "default",
            keyboardNav: !0,
            clickOverlayToClose: !0,
            onInit: function() {},
            beforeShowLightbox: function() {},
            afterShowLightbox: function(t) {},
            beforeHideLightbox: function() {},
            afterHideLightbox: function() {},
            onPrev: function(t) {},
            onNext: function(t) {},
            errorMessage: "The requested content cannot be loaded. Please try again later."
        };
    n.prototype = {
        init: function() {
            var i = this;
            t("html").hasClass("nivo-lightbox-notouch") || t("html").addClass("nivo-lightbox-notouch"), "ontouchstart" in o && t("html").removeClass("nivo-lightbox-notouch"), this.$el.on("click", function(t) {
                i.showLightbox(t)
            }), this.options.keyboardNav && t("body").off("keyup").on("keyup", function(o) {
                var e = o.keyCode ? o.keyCode : o.which;
                27 == e && i.destructLightbox(), 37 == e && t(".nivo-lightbox-prev").trigger("click"), 39 == e && t(".nivo-lightbox-next").trigger("click")
            }), this.options.onInit.call(this)
        },
        showLightbox: function(i) {
            var o = this,
                e = this.$el,
                n = this.checkContent(e);
            if (n) {
                i.preventDefault(), this.options.beforeShowLightbox.call(this);
                var a = this.constructLightbox();
                if (a) {
                    var l = a.find(".nivo-lightbox-content");
                    if (l) {
                        if (t("body").addClass("nivo-lightbox-body-effect-" + this.options.effect), this.processContent(l, e), this.$el.attr("data-lightbox-gallery")) {
                            var h = t('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
                            t(".nivo-lightbox-nav").show(), t(".nivo-lightbox-prev").off("click").on("click", function(i) {
                                i.preventDefault();
                                var n = h.index(e);
                                e = h.eq(n - 1), t(e).length || (e = h.last()), o.processContent(l, e), o.options.onPrev.call(this, [e])
                            }), t(".nivo-lightbox-next").off("click").on("click", function(i) {
                                i.preventDefault();
                                var n = h.index(e);
                                e = h.eq(n + 1), t(e).length || (e = h.first()), o.processContent(l, e), o.options.onNext.call(this, [e])
                            })
                        }
                        setTimeout(function() {
                            a.addClass("nivo-lightbox-open"), o.options.afterShowLightbox.call(this, [a])
                        }, 1)
                    }
                }
            }
        },
        checkContent: function(t) {
            var i = t.attr("href"),
                o = i.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            return null !== i.match(/\.(jpeg|jpg|gif|png)$/i) || (!!o || ("ajax" == t.attr("data-lightbox-type") || ("#" == i.substring(0, 1) && "inline" == t.attr("data-lightbox-type") || "iframe" == t.attr("data-lightbox-type"))))
        },
        processContent: function(o, e) {
            var n = this,
                a = e.attr("href"),
                l = a.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            if (o.html("").addClass("nivo-lightbox-loading"), this.isHidpi() && e.attr("data-lightbox-hidpi") && (a = e.attr("data-lightbox-hidpi")), null !== a.match(/\.(jpeg|jpg|gif|png)$/i)) {
                var h = t("<img>", {
                    src: a
                });
                h.one("load", function() {
                    var e = t('<div class="nivo-lightbox-image" />');
                    e.append(h), o.html(e).removeClass("nivo-lightbox-loading"), e.css({
                        "line-height": t(".nivo-lightbox-content").height() + "px",
                        height: t(".nivo-lightbox-content").height() + "px"
                    }), t(i).resize(function() {
                        e.css({
                            "line-height": t(".nivo-lightbox-content").height() + "px",
                            height: t(".nivo-lightbox-content").height() + "px"
                        })
                    })
                }).each(function() {
                    this.complete && t(this).load()
                }), h.error(function() {
                    var i = t('<div class="nivo-lightbox-error"><p>' + n.options.errorMessage + "</p></div>");
                    o.html(i).removeClass("nivo-lightbox-loading")
                })
            } else if (l) {
                var s = "",
                    r = "nivo-lightbox-video";
                if ("youtube" == l[1] && (s = "http://www.youtube.com/embed/" + l[4], r = "nivo-lightbox-youtube"), "youtu" == l[1] && (s = "http://www.youtube.com/embed/" + l[3], r = "nivo-lightbox-youtube"), "vimeo" == l[1] && (s = "http://player.vimeo.com/video/" + l[3], r = "nivo-lightbox-vimeo"), s) {
                    var c = t("<iframe>", {
                        src: s,
                        "class": r,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: "auto"
                    });
                    o.html(c), c.load(function() {
                        o.removeClass("nivo-lightbox-loading")
                    })
                }
            } else if ("ajax" == e.attr("data-lightbox-type")) t.ajax({
                url: a,
                cache: !1,
                success: function(e) {
                    var n = t('<div class="nivo-lightbox-ajax" />');
                    n.append(e), o.html(n).removeClass("nivo-lightbox-loading"), n.outerHeight() < o.height() && n.css({
                        position: "relative",
                        top: "50%",
                        "margin-top": -(n.outerHeight() / 2) + "px"
                    }), t(i).resize(function() {
                        n.outerHeight() < o.height() && n.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(n.outerHeight() / 2) + "px"
                        })
                    })
                },
                error: function() {
                    var i = t('<div class="nivo-lightbox-error"><p>' + n.options.errorMessage + "</p></div>");
                    o.html(i).removeClass("nivo-lightbox-loading")
                }
            });
            else if ("#" == a.substring(0, 1) && "inline" == e.attr("data-lightbox-type"))
                if (t(a).length) {
                    var v = t('<div class="nivo-lightbox-inline" />');
                    v.append(t(a).clone().show()), o.html(v).removeClass("nivo-lightbox-loading"), v.outerHeight() < o.height() && v.css({
                        position: "relative",
                        top: "50%",
                        "margin-top": -(v.outerHeight() / 2) + "px"
                    }), t(i).resize(function() {
                        v.outerHeight() < o.height() && v.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(v.outerHeight() / 2) + "px"
                        })
                    })
                } else {
                    var g = t('<div class="nivo-lightbox-error"><p>' + n.options.errorMessage + "</p></div>");
                    o.html(g).removeClass("nivo-lightbox-loading")
                } else {
                if ("iframe" != e.attr("data-lightbox-type")) return !1;
                var b = t("<iframe>", {
                    src: a,
                    "class": "nivo-lightbox-item",
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: "auto"
                });
                o.html(b), b.load(function() {
                    o.removeClass("nivo-lightbox-loading")
                })
            }
            if (e.attr("title")) {
                var x = t("<span>", {
                    "class": "nivo-lightbox-title"
                });
                x.text(e.attr("title")), t(".nivo-lightbox-title-wrap").html(x)
            } else t(".nivo-lightbox-title-wrap").html("")
        },
        constructLightbox: function() {
            if (t(".nivo-lightbox-overlay").length) return t(".nivo-lightbox-overlay");
            var i = t("<div>", {
                    "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
                }),
                o = t("<div>", {
                    "class": "nivo-lightbox-wrap"
                }),
                e = t("<div>", {
                    "class": "nivo-lightbox-content"
                }),
                n = t('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),
                a = t('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),
                l = t("<div>", {
                    "class": "nivo-lightbox-title-wrap"
                }),
                h = 0;
            h && i.addClass("nivo-lightbox-ie"), o.append(e), o.append(l), i.append(o), i.append(n), i.append(a), t("body").append(i);
            var s = this;
            return s.options.clickOverlayToClose && i.on("click", function(i) {
                (i.target === this || t(i.target).hasClass("nivo-lightbox-content") || t(i.target).hasClass("nivo-lightbox-image")) && s.destructLightbox()
            }), a.on("click", function(t) {
                t.preventDefault(), s.destructLightbox()
            }), i
        },
        destructLightbox: function() {
            var i = this;
            this.options.beforeHideLightbox.call(this), t(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"), t(".nivo-lightbox-nav").hide(), t("body").removeClass("nivo-lightbox-body-effect-" + i.options.effect);
            var o = 0;
            o && (t(".nivo-lightbox-overlay iframe").attr("src", " "), t(".nivo-lightbox-overlay iframe").remove()), t(".nivo-lightbox-prev").off("click"), t(".nivo-lightbox-next").off("click"), t(".nivo-lightbox-content").empty(), this.options.afterHideLightbox.call(this)
        },
        isHidpi: function() {
            var t = "(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";
            return i.devicePixelRatio > 1 || !(!i.matchMedia || !i.matchMedia(t).matches)
        }
    }, t.fn[a] = function(i) {
        return this.each(function() {
            t.data(this, a) || t.data(this, a, new n(this, i))
        })
    }
}(jQuery, window, document);
"function" != typeof Object.create && (Object.create = function(t) {
    function i() {}
    return i.prototype = t, new i
}),
    /*function(t, i, s) {
        var e = {
            init: function(i, s) {
                this.$elem = t(s), this.options = t.extend({}, t.fn.owlCarousel.options, this.$elem.data(), i), this.userOptions = i, this.loadContent()
            },
            loadContent: function() {
                function i(t) {
                    var i, s = "";
                    if ("function" == typeof e.options.jsonSuccess) e.options.jsonSuccess.apply(this, [t]);
                    else {
                        for (i in t.owl) t.owl.hasOwnProperty(i) && (s += t.owl[i].item);
                        e.$elem.html(s)
                    }
                    e.logIn()
                }
                var s, e = this;
                "function" == typeof e.options.beforeInit && e.options.beforeInit.apply(this, [e.$elem]), "string" == typeof e.options.jsonPath ? (s = e.options.jsonPath, t.getJSON(s, i)) : e.logIn()
            },
            logIn: function() {
                this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), this.$elem.css({
                    opacity: 0
                }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars()
            },
            setVars: function() {
                return 0 !== this.$elem.children().length && (this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), void this.onStartup())
            },
            onStartup: function() {
                this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
            },
            eachMoveUpdate: function() {
                !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
            },
            updateVars: function() {
                "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
            },
            reload: function() {
                var t = this;
                i.setTimeout(function() {
                    t.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var t = this;
                return !1 === t.$elem.is(":visible") && (t.$elem.css({
                        opacity: 0
                    }), i.clearInterval(t.autoPlayInterval), i.clearInterval(t.checkVisible), void(t.checkVisible = i.setInterval(function() {
                        t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
                            opacity: 1
                        }, 200), i.clearInterval(t.checkVisible))
                    }, 500)))
            },
            wrapItems: function() {
                this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block")
            },
            baseClass: function() {
                var t = this.$elem.hasClass(this.options.baseClass),
                    i = this.$elem.hasClass(this.options.theme);
                t || this.$elem.addClass(this.options.baseClass), i || this.$elem.addClass(this.options.theme)
            },
            updateItems: function() {
                var i, s;
                if (!1 === this.options.responsive) return !1;
                if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
                if (i = t(this.options.responsiveBaseWidth).width(), i > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)
                    for (this.options.itemsCustom.sort(function(t, i) {
                        return t[0] - i[0]
                    }), s = 0; s < this.options.itemsCustom.length; s += 1) this.options.itemsCustom[s][0] <= i && (this.options.items = this.options.itemsCustom[s][1]);
                else i <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), i <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), i <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), i <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), i <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
                this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
            },
            response: function() {
                var s, e, o = this;
                return !0 === o.options.responsive && (e = t(i).width(), o.resizer = function() {
                        t(i).width() !== e && (!1 !== o.options.autoPlay && i.clearInterval(o.autoPlayInterval), i.clearTimeout(s), s = i.setTimeout(function() {
                            e = t(i).width(), o.updateVars()
                        }, o.options.responsiveRefreshRate))
                    }, void t(i).resize(o.resizer))
            },
            updatePosition: function() {
                this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp()
            },
            appendItemsSizes: function() {
                var i = this,
                    s = 0,
                    e = i.itemsAmount - i.options.items;
                i.$owlItems.each(function(o) {
                    var n = t(this);
                    n.css({
                        width: i.itemWidth
                    }).data("owl-item", Number(o)), 0 !== o % i.options.items && o !== e || o > e || (s += 1), n.data("owl-roundPages", s)
                })
            },
            appendWrapperSizes: function() {
                this.$owlWrapper.css({
                    width: this.$owlItems.length * this.itemWidth * 2,
                    left: 0
                }), this.appendItemsSizes()
            },
            calculateAll: function() {
                this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max()
            },
            calculateWidth: function() {
                this.itemWidth = Math.round(this.$elem.width() / this.options.items)
            },
            max: function() {
                var t = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
                return this.options.items > this.itemsAmount ? this.maximumPixels = t = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = t), t
            },
            min: function() {
                return 0
            },
            loops: function() {
                var i, s, e = 0,
                    o = 0;
                for (this.positionsInArray = [0], this.pagesInArray = [], i = 0; i < this.itemsAmount; i += 1) o += this.itemWidth, this.positionsInArray.push(-o), !0 === this.options.scrollPerPage && (s = t(this.$owlItems[i]), s = s.data("owl-roundPages"), s !== e && (this.pagesInArray[e] = this.positionsInArray[i], e = s))
            },
            buildControls: function() {
                !0 !== this.options.navigation && !0 !== this.options.pagination || (this.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons()
            },
            buildButtons: function() {
                var i = this,
                    s = t('<div class="owl-buttons"/>');
                i.owlControls.append(s), i.buttonPrev = t("<div/>", {
                    "class": "owl-prev",
                    html: i.options.navigationText[0] || ""
                }), i.buttonNext = t("<div/>", {
                    "class": "owl-next",
                    html: i.options.navigationText[1] || ""
                }), s.append(i.buttonPrev).append(i.buttonNext), s.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) {
                    t.preventDefault()
                }), s.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(s) {
                    s.preventDefault(), t(this).hasClass("owl-next") ? i.next() : i.prev()
                })
            },
            buildPagination: function() {
                var i = this;
                i.paginationWrapper = t('<div class="owl-pagination"/>'), i.owlControls.append(i.paginationWrapper), i.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(s) {
                    s.preventDefault(), Number(t(this).data("owl-page")) !== i.currentItem && i.goTo(Number(t(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var i, s, e, o, n, a;
                if (!1 === this.options.pagination) return !1;
                for (this.paginationWrapper.html(""), i = 0, s = this.itemsAmount - this.itemsAmount % this.options.items, o = 0; o < this.itemsAmount; o += 1) 0 === o % this.options.items && (i += 1, s === o && (e = this.itemsAmount - this.options.items), n = t("<div/>", {
                    "class": "owl-page"
                }), a = t("<span></span>", {
                    text: !0 === this.options.paginationNumbers ? i : "",
                    "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
                }), n.append(a), n.data("owl-page", s === o ? e : o), n.data("owl-roundPages", i), this.paginationWrapper.append(n));
                this.checkPagination()
            },
            checkPagination: function() {
                var i = this;
                return !1 !== i.options.pagination && void i.paginationWrapper.find(".owl-page").each(function() {
                        t(this).data("owl-roundPages") === t(i.$owlItems[i.currentItem]).data("owl-roundPages") && (i.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
                    })
            },
            checkNavigation: function() {
                return !1 !== this.options.navigation && void(!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
            },
            destroyControls: function() {
                this.owlControls && this.owlControls.remove()
            },
            next: function(t) {
                if (this.isTransition) return !1;
                if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
                    if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;
                    this.currentItem = 0, t = "rewind"
                }
                this.goTo(this.currentItem, t)
            },
            prev: function(t) {
                if (this.isTransition) return !1;
                if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {
                    if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;
                    this.currentItem = this.maximumItem, t = "rewind"
                }
                this.goTo(this.currentItem, t)
            },
            goTo: function(t, s, e) {
                var o = this;
                return !o.isTransition && ("function" == typeof o.options.beforeMove && o.options.beforeMove.apply(this, [o.$elem]), t >= o.maximumItem ? t = o.maximumItem : 0 >= t && (t = 0), o.currentItem = o.owl.currentItem = t, !1 !== o.options.transitionStyle && "drag" !== e && 1 === o.options.items && !0 === o.browser.support3d ? (o.swapSpeed(0), !0 === o.browser.support3d ? o.transition3d(o.positionsInArray[t]) : o.css2slide(o.positionsInArray[t], 1), o.afterGo(), o.singleItemTransition(), !1) : (t = o.positionsInArray[t], !0 === o.browser.support3d ? (o.isCss3Finish = !1, !0 === s ? (o.swapSpeed("paginationSpeed"), i.setTimeout(function() {
                        o.isCss3Finish = !0
                    }, o.options.paginationSpeed)) : "rewind" === s ? (o.swapSpeed(o.options.rewindSpeed), i.setTimeout(function() {
                        o.isCss3Finish = !0
                    }, o.options.rewindSpeed)) : (o.swapSpeed("slideSpeed"), i.setTimeout(function() {
                        o.isCss3Finish = !0
                    }, o.options.slideSpeed)), o.transition3d(t)) : !0 === s ? o.css2slide(t, o.options.paginationSpeed) : "rewind" === s ? o.css2slide(t, o.options.rewindSpeed) : o.css2slide(t, o.options.slideSpeed), void o.afterGo()))
            },
            jumpTo: function(t) {
                "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), t >= this.maximumItem || -1 === t ? t = this.maximumItem : 0 >= t && (t = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[t]) : this.css2slide(this.positionsInArray[t], 1), this.currentItem = this.owl.currentItem = t, this.afterGo()
            },
            afterGo: function() {
                this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
            },
            stop: function() {
                this.apStatus = "stop", i.clearInterval(this.autoPlayInterval)
            },
            checkAp: function() {
                "stop" !== this.apStatus && this.play()
            },
            play: function() {
                var t = this;
                return t.apStatus = "play", !1 !== t.options.autoPlay && (i.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = i.setInterval(function() {
                    t.next(!0)
                }, t.options.autoPlay)))
            },
            swapSpeed: function(t) {
                "slideSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof t && this.$owlWrapper.css(this.addCssSpeed(t))
            },
            addCssSpeed: function(t) {
                return {
                    "-webkit-transition": "all " + t + "ms ease",
                    "-moz-transition": "all " + t + "ms ease",
                    "-o-transition": "all " + t + "ms ease",
                    transition: "all " + t + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(t) {
                return {
                    "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                    transform: "translate3d(" + t + "px, 0px,0px)"
                }
            },
            transition3d: function(t) {
                this.$owlWrapper.css(this.doTranslate(t))
            },
            css2move: function(t) {
                this.$owlWrapper.css({
                    left: t
                })
            },
            css2slide: function(t, i) {
                var s = this;
                s.isCssFinish = !1, s.$owlWrapper.stop(!0, !0).animate({
                    left: t
                }, {
                    duration: i || s.options.slideSpeed,
                    complete: function() {
                        s.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var t = s.createElement("div");
                t.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", t = t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
                    support3d: null !== t && 1 === t.length,
                    isTouch: "ontouchstart" in i || i.navigator.msMaxTouchPoints
                }
            },
            moveEvents: function() {
                !1 === this.options.mouseDrag && !1 === this.options.touchDrag || (this.gestures(), this.disabledEvents())
            },
            eventTypes: function() {
                var t = ["s", "e", "x"];
                this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = t[0], this.ev_types.move = t[1], this.ev_types.end = t[2]
            },
            disabledEvents: function() {
                this.$elem.on("dragstart.owl", function(t) {
                    t.preventDefault()
                }), this.$elem.on("mousedown.disableTextSelect", function(i) {
                    return t(i.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function e(t) {
                    if (void 0 !== t.touches) return {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    };
                    if (void 0 === t.touches) {
                        if (void 0 !== t.pageX) return {
                            x: t.pageX,
                            y: t.pageY
                        };
                        if (void 0 === t.pageX) return {
                            x: t.clientX,
                            y: t.clientY
                        }
                    }
                }

                function o(i) {
                    "on" === i ? (t(s).on(r.ev_types.move, n), t(s).on(r.ev_types.end, a)) : "off" === i && (t(s).off(r.ev_types.move), t(s).off(r.ev_types.end))
                }

                function n(o) {
                    o = o.originalEvent || o || i.event, r.newPosX = e(o).x - l.offsetX, r.newPosY = e(o).y - l.offsetY, r.newRelativeX = r.newPosX - l.relativePos, "function" == typeof r.options.startDragging && !0 !== l.dragging && 0 !== r.newRelativeX && (l.dragging = !0, r.options.startDragging.apply(r, [r.$elem])), (8 < r.newRelativeX || -8 > r.newRelativeX) && !0 === r.browser.isTouch && (void 0 !== o.preventDefault ? o.preventDefault() : o.returnValue = !1, l.sliding = !0), (10 < r.newPosY || -10 > r.newPosY) && !1 === l.sliding && t(s).off("touchmove.owl"), r.newPosX = Math.max(Math.min(r.newPosX, r.newRelativeX / 5), r.maximumPixels + r.newRelativeX / 5), !0 === r.browser.support3d ? r.transition3d(r.newPosX) : r.css2move(r.newPosX)
                }

                function a(s) {
                    s = s.originalEvent || s || i.event;
                    var e;
                    s.target = s.target || s.srcElement, l.dragging = !1, !0 !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing"), r.dragDirection = 0 > r.newRelativeX ? r.owl.dragDirection = "left" : r.owl.dragDirection = "right", 0 !== r.newRelativeX && (e = r.getNewPosition(), r.goTo(e, !1, "drag"), l.targetElement === s.target && !0 !== r.browser.isTouch && (t(s.target).on("click.disable", function(i) {
                        i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault(), t(i.target).off("click.disable")
                    }), s = t._data(s.target, "events").click, e = s.pop(), s.splice(0, 0, e))), o("off")
                }
                var r = this,
                    l = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                r.isCssFinish = !0, r.$elem.on(r.ev_types.start, ".owl-wrapper", function(s) {
                    s = s.originalEvent || s || i.event;
                    var n;
                    if (3 === s.which) return !1;
                    if (!(r.itemsAmount <= r.options.items)) {
                        if (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish || !1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish) return !1;
                        !1 !== r.options.autoPlay && i.clearInterval(r.autoPlayInterval), !0 === r.browser.isTouch || r.$owlWrapper.hasClass("grabbing") || r.$owlWrapper.addClass("grabbing"), r.newPosX = 0, r.newRelativeX = 0, t(this).css(r.removeTransition()), n = t(this).position(), l.relativePos = n.left, l.offsetX = e(s).x - n.left, l.offsetY = e(s).y - n.top, o("on"), l.sliding = !1, l.targetElement = s.target || s.srcElement
                    }
                })
            },
            getNewPosition: function() {
                var t = this.closestItem();
                return t > this.maximumItem ? t = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = t = 0), t
            },
            closestItem: function() {
                var i = this,
                    s = !0 === i.options.scrollPerPage ? i.pagesInArray : i.positionsInArray,
                    e = i.newPosX,
                    o = null;
                return t.each(s, function(n, a) {
                    e - i.itemWidth / 20 > s[n + 1] && e - i.itemWidth / 20 < a && "left" === i.moveDirection() ? (o = a, i.currentItem = !0 === i.options.scrollPerPage ? t.inArray(o, i.positionsInArray) : n) : e + i.itemWidth / 20 < a && e + i.itemWidth / 20 > (s[n + 1] || s[n] - i.itemWidth) && "right" === i.moveDirection() && (!0 === i.options.scrollPerPage ? (o = s[n + 1] || s[s.length - 1], i.currentItem = t.inArray(o, i.positionsInArray)) : (o = s[n + 1], i.currentItem = n + 1))
                }), i.currentItem
            },
            moveDirection: function() {
                var t;
                return 0 > this.newRelativeX ? (t = "right", this.playDirection = "next") : (t = "left", this.playDirection = "prev"), t
            },
            customEvents: function() {
                var t = this;
                t.$elem.on("owl.next", function() {
                    t.next()
                }), t.$elem.on("owl.prev", function() {
                    t.prev()
                }), t.$elem.on("owl.play", function(i, s) {
                    t.options.autoPlay = s, t.play(), t.hoverStatus = "play"
                }), t.$elem.on("owl.stop", function() {
                    t.stop(), t.hoverStatus = "stop"
                }), t.$elem.on("owl.goTo", function(i, s) {
                    t.goTo(s)
                }), t.$elem.on("owl.jumpTo", function(i, s) {
                    t.jumpTo(s)
                })
            },
            stopOnHover: function() {
                var t = this;
                !0 === t.options.stopOnHover && !0 !== t.browser.isTouch && !1 !== t.options.autoPlay && (t.$elem.on("mouseover", function() {
                    t.stop()
                }), t.$elem.on("mouseout", function() {
                    "stop" !== t.hoverStatus && t.play()
                }))
            },
            lazyLoad: function() {
                var i, s, e, o, n;
                if (!1 === this.options.lazyLoad) return !1;
                for (i = 0; i < this.itemsAmount; i += 1) s = t(this.$owlItems[i]), "loaded" !== s.data("owl-loaded") && (e = s.data("owl-item"), o = s.find(".lazyOwl"), "string" != typeof o.data("src") ? s.data("owl-loaded", "loaded") : (void 0 === s.data("owl-loaded") && (o.hide(), s.addClass("loading").data("owl-loaded", "checked")), (n = !0 !== this.options.lazyFollow || e >= this.currentItem) && e < this.currentItem + this.options.items && o.length && this.lazyPreload(s, o)))
            },
            lazyPreload: function(t, s) {
                function e() {
                    t.data("owl-loaded", "loaded").removeClass("loading"), s.removeAttr("data-src"), "fade" === a.options.lazyEffect ? s.fadeIn(400) : s.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
                }

                function o() {
                    r += 1, a.completeImg(s.get(0)) || !0 === n ? e() : 100 >= r ? i.setTimeout(o, 100) : e()
                }
                var n, a = this,
                    r = 0;
                "DIV" === s.prop("tagName") ? (s.css("background-image", "url(" + s.data("src") + ")"), n = !0) : s[0].src = s.data("src"), o()
            },
            autoHeight: function() {
                function s() {
                    var s = t(n.$owlItems[n.currentItem]).height();
                    n.wrapperOuter.css("height", s + "px"), n.wrapperOuter.hasClass("autoHeight") || i.setTimeout(function() {
                        n.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function e() {
                    o += 1, n.completeImg(a.get(0)) ? s() : 100 >= o ? i.setTimeout(e, 100) : n.wrapperOuter.css("height", "")
                }
                var o, n = this,
                    a = t(n.$owlItems[n.currentItem]).find("img");
                void 0 !== a.get(0) ? (o = 0, e()) : s()
            },
            completeImg: function(t) {
                return !(!t.complete || "undefined" != typeof t.naturalWidth && 0 === t.naturalWidth)
            },
            onVisibleItems: function() {
                var i;
                for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], i = this.currentItem; i < this.currentItem + this.options.items; i += 1) this.visibleItems.push(i), !0 === this.options.addClassActive && t(this.$owlItems[i]).addClass("active");
                this.owl.visibleItems = this.visibleItems
            },
            transitionTypes: function(t) {
                this.outClass = "owl-" + t + "-out", this.inClass = "owl-" + t + "-in"
            },
            singleItemTransition: function() {
                var t = this,
                    i = t.outClass,
                    s = t.inClass,
                    e = t.$owlItems.eq(t.currentItem),
                    o = t.$owlItems.eq(t.prevItem),
                    n = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem],
                    a = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2;
                t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": a + "px",
                    "-moz-perspective-origin": a + "px",
                    "perspective-origin": a + "px"
                }), o.css({
                    position: "relative",
                    left: n + "px"
                }).addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                    t.endPrev = !0, o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(o, i)
                }), e.addClass(s).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                    t.endCurrent = !0, e.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(e, s)
                })
            },
            clearTransStyle: function(t, i) {
                t.css({
                    position: "",
                    left: ""
                }).removeClass(i), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
            },
            owlStatus: function() {
                this.owl = {
                    userOptions: this.userOptions,
                    baseElement: this.$elem,
                    userItems: this.$userItems,
                    owlItems: this.$owlItems,
                    currentItem: this.currentItem,
                    prevItem: this.prevItem,
                    visibleItems: this.visibleItems,
                    isTouch: this.browser.isTouch,
                    browser: this.browser,
                    dragDirection: this.dragDirection
                }
            },
            clearEvents: function() {
                this.$elem.off(".owl owl mousedown.disableTextSelect"), t(s).off(".owl owl"), t(i).off("resize", this.resizer)
            },
            unWrap: function() {
                0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                this.stop(), i.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData()
            },
            reinit: function(i) {
                i = t.extend({}, this.userOptions, i), this.unWrap(), this.init(i, this.$elem)
            },
            addItem: function(t, i) {
                var s;
                return !!t && (0 === this.$elem.children().length ? (this.$elem.append(t), this.setVars(), !1) : (this.unWrap(), s = void 0 === i || -1 === i ? -1 : i, s >= this.$userItems.length || -1 === s ? this.$userItems.eq(-1).after(t) : this.$userItems.eq(s).before(t), void this.setVars()))
            },
            removeItem: function(t) {
                return 0 !== this.$elem.children().length && (t = void 0 === t || -1 === t ? -1 : t, this.unWrap(), this.$userItems.eq(t).remove(), void this.setVars())
            }
        };
        t.fn.owlCarousel = function(i) {
            return this.each(function() {
                if (!0 === t(this).data("owl-init")) return !1;
                t(this).data("owl-init", !0);
                var s = Object.create(e);
                s.init(i, this), t.data(this, "owlCarousel", s)
            })
        }, t.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: i,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document);*/
! function(e, s) {
    "use strict";
    var n = function() {
        var n = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            },
            o = function() {
                var s = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
                return s && e("html").css("cursor", "pointer").on("click", e.noop), s
            }(),
            t = function() {
                var e = document.documentElement.style;
                return "behavior" in e && "fill" in e && /iemobile/i.test(navigator.userAgent)
            }(),
            i = function() {
                return !!s.PointerEvent
            }(),
            r = function(e, s, o) {
                var t, i = n.menuClass;
                s.cssArrows && (i += " " + n.menuArrowClass), t = o ? "addClass" : "removeClass", e[t](i)
            },
            a = function(s, o) {
                return s.find("li." + o.pathClass).slice(0, o.pathLevels).addClass(o.hoverClass + " " + n.bcClass).filter(function() {
                    return e(this).children(o.popUpSelector).hide().show().length
                }).removeClass(o.pathClass)
            },
            l = function(e, s) {
                var o = s ? "addClass" : "removeClass";
                e.children("a")[o](n.anchorClass)
            },
            h = function(e) {
                var s = e.css("ms-touch-action"),
                    n = e.css("touch-action");
                n = n || s, n = "pan-y" === n ? "auto" : "pan-y", e.css({
                    "ms-touch-action": n,
                    "touch-action": n
                })
            },
            u = function(e) {
                return e.closest("." + n.menuClass)
            },
            p = function(e) {
                return u(e).data("sfOptions")
            },
            c = function() {
                var s = e(this),
                    n = p(s);
                clearTimeout(n.sfTimer), s.siblings().superfish("hide").end().superfish("show")
            },
            f = function(s) {
                s.retainPath = e.inArray(this[0], s.$path) > -1, this.superfish("hide"), this.parents("." + s.hoverClass).length || (s.onIdle.call(u(this)), s.$path.length && e.proxy(c, s.$path)())
            },
            d = function() {
                var s = e(this),
                    n = p(s);
                o ? e.proxy(f, s, n)() : (clearTimeout(n.sfTimer), n.sfTimer = setTimeout(e.proxy(f, s, n), n.delay))
            },
            v = function(s) {
                var n = e(this),
                    o = p(n),
                    t = n.siblings(s.data.popUpSelector);
                return o.onHandleTouch.call(t) === !1 ? this : void(t.length > 0 && t.is(":hidden") && (n.one("click.superfish", !1), "MSPointerDown" === s.type || "pointerdown" === s.type ? n.trigger("focus") : e.proxy(c, n.parent("li"))()))
            },
            m = function(s, n) {
                var r = "li:has(" + n.popUpSelector + ")";
                e.fn.hoverIntent && !n.disableHI ? s.hoverIntent(c, d, r) : s.on("mouseenter.superfish", r, c).on("mouseleave.superfish", r, d);
                var a = "MSPointerDown.superfish";
                i && (a = "pointerdown.superfish"), o || (a += " touchend.superfish"), t && (a += " mousedown.superfish"), s.on("focusin.superfish", "li", c).on("focusout.superfish", "li", d).on(a, "a", n, v)
            };
        return {
            hide: function(s) {
                if (this.length) {
                    var n = this,
                        o = p(n);
                    if (!o) return this;
                    var t = o.retainPath === !0 ? o.$path : "",
                        i = n.find("li." + o.hoverClass).add(this).not(t).removeClass(o.hoverClass).children(o.popUpSelector),
                        r = o.speedOut;
                    if (s && (i.show(), r = 0), o.retainPath = !1, o.onBeforeHide.call(i) === !1) return this;
                    i.stop(!0, !0).animate(o.animationOut, r, function() {
                        var s = e(this);
                        o.onHide.call(s)
                    })
                }
                return this
            },
            show: function() {
                var e = p(this);
                if (!e) return this;
                var s = this.addClass(e.hoverClass),
                    n = s.children(e.popUpSelector);
                return e.onBeforeShow.call(n) === !1 ? this : (n.stop(!0, !0).animate(e.animation, e.speed, function() {
                    e.onShow.call(n)
                }), this)
            },
            destroy: function() {
                return this.each(function() {
                    var s, o = e(this),
                        t = o.data("sfOptions");
                    return !!t && (s = o.find(t.popUpSelector).parent("li"), clearTimeout(t.sfTimer), r(o, t), l(s), h(o), o.off(".superfish").off(".hoverIntent"), s.children(t.popUpSelector).attr("style", function(e, s) {
                            return s.replace(/display[^;]+;?/g, "")
                        }), t.$path.removeClass(t.hoverClass + " " + n.bcClass).addClass(t.pathClass), o.find("." + t.hoverClass).removeClass(t.hoverClass), t.onDestroy.call(o), void o.removeData("sfOptions"))
                })
            },
            init: function(s) {
                return this.each(function() {
                    var o = e(this);
                    if (o.data("sfOptions")) return !1;
                    var t = e.extend({}, e.fn.superfish.defaults, s),
                        i = o.find(t.popUpSelector).parent("li");
                    t.$path = a(o, t), o.data("sfOptions", t), r(o, t, !0), l(i, !0), h(o), m(o, t), i.not("." + n.bcClass).superfish("hide", !0), t.onInit.call(this)
                })
            }
        }
    }();
    e.fn.superfish = function(s, o) {
        return n[s] ? n[s].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof s && s ? e.error("Method " + s + " does not exist on jQuery.fn.superfish") : n.init.apply(this, arguments)
    }, e.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop,
        onHandleTouch: e.noop
    }
}(jQuery, window);
! function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e(require, exports, module) : t.Tether = e()
}(this, function(t, e, o) {
    "use strict";

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t) {
        var e = t.getBoundingClientRect(),
            o = {};
        for (var i in e) o[i] = e[i];
        if (t.ownerDocument !== document) {
            var r = t.ownerDocument.defaultView.frameElement;
            if (r) {
                var s = n(r);
                o.top += s.top, o.bottom += s.top, o.left += s.left, o.right += s.left
            }
        }
        return o
    }

    function r(t) {
        var e = getComputedStyle(t) || {},
            o = e.position,
            i = [];
        if ("fixed" === o) return [t];
        for (var n = t;
             (n = n.parentNode) && n && 1 === n.nodeType;) {
            var r = void 0;
            try {
                r = getComputedStyle(n)
            } catch (s) {}
            if ("undefined" == typeof r || null === r) return i.push(n), i;
            var a = r,
                f = a.overflow,
                l = a.overflowX,
                h = a.overflowY;
            /(auto|scroll)/.test(f + h + l) && ("absolute" !== o || ["relative", "absolute", "fixed"].indexOf(r.position) >= 0) && i.push(n)
        }
        return i.push(t.ownerDocument.body), t.ownerDocument !== document && i.push(t.ownerDocument.defaultView), i
    }

    function s() {
        A && document.body.removeChild(A), A = null
    }

    function a(t) {
        var e = void 0;
        t === document ? (e = document, t = document.documentElement) : e = t.ownerDocument;
        var o = e.documentElement,
            i = n(t),
            r = P();
        return i.top -= r.top, i.left -= r.left, "undefined" == typeof i.width && (i.width = document.body.scrollWidth - i.left - i.right), "undefined" == typeof i.height && (i.height = document.body.scrollHeight - i.top - i.bottom), i.top = i.top - o.clientTop, i.left = i.left - o.clientLeft, i.right = e.body.clientWidth - i.width - i.left, i.bottom = e.body.clientHeight - i.height - i.top, i
    }

    function f(t) {
        return t.offsetParent || document.documentElement
    }

    function l() {
        if (M) return M;
        var t = document.createElement("div");
        t.style.width = "100%", t.style.height = "200px";
        var e = document.createElement("div");
        h(e.style, {
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            visibility: "hidden",
            width: "200px",
            height: "150px",
            overflow: "hidden"
        }), e.appendChild(t), document.body.appendChild(e);
        var o = t.offsetWidth;
        e.style.overflow = "scroll";
        var i = t.offsetWidth;
        o === i && (i = e.clientWidth), document.body.removeChild(e);
        var n = o - i;
        return M = {
            width: n,
            height: n
        }
    }

    function h() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            e = [];
        return Array.prototype.push.apply(e, arguments), e.slice(1).forEach(function(e) {
            if (e)
                for (var o in e)({}).hasOwnProperty.call(e, o) && (t[o] = e[o])
        }), t
    }

    function d(t, e) {
        if ("undefined" != typeof t.classList) e.split(" ").forEach(function(e) {
            e.trim() && t.classList.remove(e)
        });
        else {
            var o = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
                i = c(t).replace(o, " ");
            g(t, i)
        }
    }

    function u(t, e) {
        if ("undefined" != typeof t.classList) e.split(" ").forEach(function(e) {
            e.trim() && t.classList.add(e)
        });
        else {
            d(t, e);
            var o = c(t) + (" " + e);
            g(t, o)
        }
    }

    function p(t, e) {
        if ("undefined" != typeof t.classList) return t.classList.contains(e);
        var o = c(t);
        return new RegExp("(^| )" + e + "( |$)", "gi").test(o)
    }

    function c(t) {
        return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString ? t.className.baseVal : t.className
    }

    function g(t, e) {
        t.setAttribute("class", e)
    }

    function m(t, e, o) {
        o.forEach(function(o) {
            -1 === e.indexOf(o) && p(t, o) && d(t, o)
        }), e.forEach(function(e) {
            p(t, e) || u(t, e)
        })
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function v(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function y(t, e) {
        var o = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
        return t + o >= e && e >= t - o
    }

    function b() {
        return "undefined" != typeof performance && "undefined" != typeof performance.now ? performance.now() : +new Date
    }

    function w() {
        for (var t = {
            top: 0,
            left: 0
        }, e = arguments.length, o = Array(e), i = 0; e > i; i++) o[i] = arguments[i];
        return o.forEach(function(e) {
            var o = e.top,
                i = e.left;
            "string" == typeof o && (o = parseFloat(o, 10)), "string" == typeof i && (i = parseFloat(i, 10)), t.top += o, t.left += i
        }), t
    }

    function C(t, e) {
        return "string" == typeof t.left && -1 !== t.left.indexOf("%") && (t.left = parseFloat(t.left, 10) / 100 * e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = parseFloat(t.top, 10) / 100 * e.height), t
    }

    function O(t, e) {
        return "scrollParent" === e ? e = t.scrollParents[0] : "window" === e && (e = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]), e === document && (e = e.documentElement), "undefined" != typeof e.nodeType && ! function() {
            var t = e,
                o = a(e),
                i = o,
                n = getComputedStyle(e);
            if (e = [i.left, i.top, o.width + i.left, o.height + i.top], t.ownerDocument !== document) {
                var r = t.ownerDocument.defaultView;
                e[0] += r.pageXOffset, e[1] += r.pageYOffset, e[2] += r.pageXOffset, e[3] += r.pageYOffset
            }
            G.forEach(function(t, o) {
                t = t[0].toUpperCase() + t.substr(1), "Top" === t || "Left" === t ? e[o] += parseFloat(n["border" + t + "Width"]) : e[o] -= parseFloat(n["border" + t + "Width"])
            })
        }(), e
    }
    var E = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var i = e[o];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, o, i) {
                return o && t(e.prototype, o), i && t(e, i), e
            }
        }(),
        x = void 0;
    "undefined" == typeof x && (x = {
        modules: []
    });
    var A = null,
        T = function() {
            var t = 0;
            return function() {
                return ++t
            }
        }(),
        S = {},
        P = function() {
            var t = A;
            t || (t = document.createElement("div"), t.setAttribute("data-tether-id", T()), h(t.style, {
                top: 0,
                left: 0,
                position: "absolute"
            }), document.body.appendChild(t), A = t);
            var e = t.getAttribute("data-tether-id");
            return "undefined" == typeof S[e] && (S[e] = n(t), k(function() {
                delete S[e]
            })), S[e]
        },
        M = null,
        W = [],
        k = function(t) {
            W.push(t)
        },
        _ = function() {
            for (var t = void 0; t = W.pop();) t()
        },
        B = function() {
            function t() {
                i(this, t)
            }
            return E(t, [{
                key: "on",
                value: function(t, e, o) {
                    var i = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
                    "undefined" == typeof this.bindings && (this.bindings = {}), "undefined" == typeof this.bindings[t] && (this.bindings[t] = []), this.bindings[t].push({
                        handler: e,
                        ctx: o,
                        once: i
                    })
                }
            }, {
                key: "once",
                value: function(t, e, o) {
                    this.on(t, e, o, !0)
                }
            }, {
                key: "off",
                value: function(t, e) {
                    if ("undefined" != typeof this.bindings && "undefined" != typeof this.bindings[t])
                        if ("undefined" == typeof e) delete this.bindings[t];
                        else
                            for (var o = 0; o < this.bindings[t].length;) this.bindings[t][o].handler === e ? this.bindings[t].splice(o, 1) : ++o
                }
            }, {
                key: "trigger",
                value: function(t) {
                    if ("undefined" != typeof this.bindings && this.bindings[t]) {
                        for (var e = 0, o = arguments.length, i = Array(o > 1 ? o - 1 : 0), n = 1; o > n; n++) i[n - 1] = arguments[n];
                        for (; e < this.bindings[t].length;) {
                            var r = this.bindings[t][e],
                                s = r.handler,
                                a = r.ctx,
                                f = r.once,
                                l = a;
                            "undefined" == typeof l && (l = this), s.apply(l, i), f ? this.bindings[t].splice(e, 1) : ++e
                        }
                    }
                }
            }]), t
        }();
    x.Utils = {
        getActualBoundingClientRect: n,
        getScrollParents: r,
        getBounds: a,
        getOffsetParent: f,
        extend: h,
        addClass: u,
        removeClass: d,
        hasClass: p,
        updateClasses: m,
        defer: k,
        flush: _,
        uniqueId: T,
        Evented: B,
        getScrollBarSize: l,
        removeUtilElements: s
    };
    var z = function() {
            function t(t, e) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                } catch (f) {
                    n = !0, r = f
                } finally {
                    try {
                        !i && a["return"] && a["return"]()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        E = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var i = e[o];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, o, i) {
                return o && t(e.prototype, o), i && t(e, i), e
            }
        }(),
        j = function(t, e, o) {
            for (var i = !0; i;) {
                var n = t,
                    r = e,
                    s = o;
                i = !1, null === n && (n = Function.prototype);
                var a = Object.getOwnPropertyDescriptor(n, r);
                if (void 0 !== a) {
                    if ("value" in a) return a.value;
                    var f = a.get;
                    if (void 0 === f) return;
                    return f.call(s)
                }
                var l = Object.getPrototypeOf(n);
                if (null === l) return;
                t = l, e = r, o = s, i = !0, a = l = void 0
            }
        };
    if ("undefined" == typeof x) throw new Error("You must include the utils.js file before tether.js");
    var Y = x.Utils,
        r = Y.getScrollParents,
        a = Y.getBounds,
        f = Y.getOffsetParent,
        h = Y.extend,
        u = Y.addClass,
        d = Y.removeClass,
        m = Y.updateClasses,
        k = Y.defer,
        _ = Y.flush,
        l = Y.getScrollBarSize,
        s = Y.removeUtilElements,
        L = function() {
            if ("undefined" == typeof document) return "";
            for (var t = document.createElement("div"), e = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], o = 0; o < e.length; ++o) {
                var i = e[o];
                if (void 0 !== t.style[i]) return i
            }
        }(),
        D = [],
        X = function() {
            D.forEach(function(t) {
                t.position(!1)
            }), _()
        };
    ! function() {
        var t = null,
            e = null,
            o = null,
            i = function n() {
                return "undefined" != typeof e && e > 16 ? (e = Math.min(e - 16, 250), void(o = setTimeout(n, 250))) : void("undefined" != typeof t && b() - t < 10 || (null != o && (clearTimeout(o), o = null), t = b(), X(), e = b() - t))
            };
        "undefined" != typeof window && "undefined" != typeof window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function(t) {
            window.addEventListener(t, i)
        })
    }();
    var F = {
            center: "center",
            left: "right",
            right: "left"
        },
        H = {
            middle: "middle",
            top: "bottom",
            bottom: "top"
        },
        N = {
            top: 0,
            left: 0,
            middle: "50%",
            center: "50%",
            bottom: "100%",
            right: "100%"
        },
        U = function(t, e) {
            var o = t.left,
                i = t.top;
            return "auto" === o && (o = F[e.left]), "auto" === i && (i = H[e.top]), {
                left: o,
                top: i
            }
        },
        V = function(t) {
            var e = t.left,
                o = t.top;
            return "undefined" != typeof N[t.left] && (e = N[t.left]), "undefined" != typeof N[t.top] && (o = N[t.top]), {
                left: e,
                top: o
            }
        },
        R = function(t) {
            var e = t.split(" "),
                o = z(e, 2),
                i = o[0],
                n = o[1];
            return {
                top: i,
                left: n
            }
        },
        q = R,
        I = function(t) {
            function e(t) {
                var o = this;
                i(this, e), j(Object.getPrototypeOf(e.prototype), "constructor", this).call(this), this.position = this.position.bind(this), D.push(this), this.history = [], this.setOptions(t, !1), x.modules.forEach(function(t) {
                    "undefined" != typeof t.initialize && t.initialize.call(o)
                }), this.position()
            }
            return v(e, t), E(e, [{
                key: "getClass",
                value: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
                        e = this.options.classes;
                    return "undefined" != typeof e && e[t] ? this.options.classes[t] : this.options.classPrefix ? this.options.classPrefix + "-" + t : t
                }
            }, {
                key: "setOptions",
                value: function(t) {
                    var e = this,
                        o = arguments.length <= 1 || void 0 === arguments[1] || arguments[1],
                        i = {
                            offset: "0 0",
                            targetOffset: "0 0",
                            targetAttachment: "auto auto",
                            classPrefix: "tether"
                        };
                    this.options = h(i, t);
                    var n = this.options,
                        s = n.element,
                        a = n.target,
                        f = n.targetModifier;
                    if (this.element = s, this.target = a, this.targetModifier = f, "viewport" === this.target ? (this.target = document.body, this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"), ["element", "target"].forEach(function(t) {
                            if ("undefined" == typeof e[t]) throw new Error("Tether Error: Both element and target must be defined");
                            "undefined" != typeof e[t].jquery ? e[t] = e[t][0] : "string" == typeof e[t] && (e[t] = document.querySelector(e[t]))
                        }), u(this.element, this.getClass("element")), this.options.addTargetClasses !== !1 && u(this.target, this.getClass("target")), !this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                    this.targetAttachment = q(this.options.targetAttachment), this.attachment = q(this.options.attachment), this.offset = R(this.options.offset), this.targetOffset = R(this.options.targetOffset), "undefined" != typeof this.scrollParents && this.disable(), "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = r(this.target), this.options.enabled !== !1 && this.enable(o)
                }
            }, {
                key: "getTargetBounds",
                value: function() {
                    if ("undefined" == typeof this.targetModifier) return a(this.target);
                    if ("visible" === this.targetModifier) {
                        if (this.target === document.body) return {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        };
                        var t = a(this.target),
                            e = {
                                height: t.height,
                                width: t.width,
                                top: t.top,
                                left: t.left
                            };
                        return e.height = Math.min(e.height, t.height - (pageYOffset - t.top)), e.height = Math.min(e.height, t.height - (t.top + t.height - (pageYOffset + innerHeight))), e.height = Math.min(innerHeight, e.height), e.height -= 2, e.width = Math.min(e.width, t.width - (pageXOffset - t.left)), e.width = Math.min(e.width, t.width - (t.left + t.width - (pageXOffset + innerWidth))), e.width = Math.min(innerWidth, e.width), e.width -= 2, e.top < pageYOffset && (e.top = pageYOffset), e.left < pageXOffset && (e.left = pageXOffset), e
                    }
                    if ("scroll-handle" === this.targetModifier) {
                        var t = void 0,
                            o = this.target;
                        o === document.body ? (o = document.documentElement, t = {
                            left: pageXOffset,
                            top: pageYOffset,
                            height: innerHeight,
                            width: innerWidth
                        }) : t = a(o);
                        var i = getComputedStyle(o),
                            n = o.scrollWidth > o.clientWidth || [i.overflow, i.overflowX].indexOf("scroll") >= 0 || this.target !== document.body,
                            r = 0;
                        n && (r = 15);
                        var s = t.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - r,
                            e = {
                                width: 15,
                                height: .975 * s * (s / o.scrollHeight),
                                left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15
                            },
                            f = 0;
                        408 > s && this.target === document.body && (f = -11e-5 * Math.pow(s, 2) - .00727 * s + 22.58), this.target !== document.body && (e.height = Math.max(e.height, 24));
                        var l = this.target.scrollTop / (o.scrollHeight - s);
                        return e.top = l * (s - e.height - f) + t.top + parseFloat(i.borderTopWidth), this.target === document.body && (e.height = Math.max(e.height, 24)), e
                    }
                }
            }, {
                key: "clearCache",
                value: function() {
                    this._cache = {}
                }
            }, {
                key: "cache",
                value: function(t, e) {
                    return "undefined" == typeof this._cache && (this._cache = {}), "undefined" == typeof this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t]
                }
            }, {
                key: "enable",
                value: function() {
                    var t = this,
                        e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                    this.options.addTargetClasses !== !1 && u(this.target, this.getClass("enabled")), u(this.element, this.getClass("enabled")), this.enabled = !0, this.scrollParents.forEach(function(e) {
                        e !== t.target.ownerDocument && e.addEventListener("scroll", t.position)
                    }), e && this.position()
                }
            }, {
                key: "disable",
                value: function() {
                    var t = this;
                    d(this.target, this.getClass("enabled")), d(this.element, this.getClass("enabled")), this.enabled = !1, "undefined" != typeof this.scrollParents && this.scrollParents.forEach(function(e) {
                        e.removeEventListener("scroll", t.position)
                    })
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = this;
                    this.disable(), D.forEach(function(e, o) {
                        e === t && D.splice(o, 1)
                    }), 0 === D.length && s()
                }
            }, {
                key: "updateAttachClasses",
                value: function(t, e) {
                    var o = this;
                    t = t || this.attachment, e = e || this.targetAttachment;
                    var i = ["left", "top", "bottom", "right", "middle", "center"];
                    "undefined" != typeof this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length), "undefined" == typeof this._addAttachClasses && (this._addAttachClasses = []);
                    var n = this._addAttachClasses;
                    t.top && n.push(this.getClass("element-attached") + "-" + t.top), t.left && n.push(this.getClass("element-attached") + "-" + t.left), e.top && n.push(this.getClass("target-attached") + "-" + e.top), e.left && n.push(this.getClass("target-attached") + "-" + e.left);
                    var r = [];
                    i.forEach(function(t) {
                        r.push(o.getClass("element-attached") + "-" + t), r.push(o.getClass("target-attached") + "-" + t)
                    }), k(function() {
                        "undefined" != typeof o._addAttachClasses && (m(o.element, o._addAttachClasses, r), o.options.addTargetClasses !== !1 && m(o.target, o._addAttachClasses, r), delete o._addAttachClasses)
                    })
                }
            }, {
                key: "position",
                value: function() {
                    var t = this,
                        e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                    if (this.enabled) {
                        this.clearCache();
                        var o = U(this.targetAttachment, this.attachment);
                        this.updateAttachClasses(this.attachment, o);
                        var i = this.cache("element-bounds", function() {
                                return a(t.element)
                            }),
                            n = i.width,
                            r = i.height;
                        if (0 === n && 0 === r && "undefined" != typeof this.lastSize) {
                            var s = this.lastSize;
                            n = s.width, r = s.height
                        } else this.lastSize = {
                            width: n,
                            height: r
                        };
                        var h = this.cache("target-bounds", function() {
                                return t.getTargetBounds()
                            }),
                            d = h,
                            u = C(V(this.attachment), {
                                width: n,
                                height: r
                            }),
                            p = C(V(o), d),
                            c = C(this.offset, {
                                width: n,
                                height: r
                            }),
                            g = C(this.targetOffset, d);
                        u = w(u, c), p = w(p, g);
                        for (var m = h.left + p.left - u.left, v = h.top + p.top - u.top, y = 0; y < x.modules.length; ++y) {
                            var b = x.modules[y],
                                O = b.position.call(this, {
                                    left: m,
                                    top: v,
                                    targetAttachment: o,
                                    targetPos: h,
                                    elementPos: i,
                                    offset: u,
                                    targetOffset: p,
                                    manualOffset: c,
                                    manualTargetOffset: g,
                                    scrollbarSize: S,
                                    attachment: this.attachment
                                });
                            if (O === !1) return !1;
                            "undefined" != typeof O && "object" == typeof O && (v = O.top, m = O.left)
                        }
                        var E = {
                                page: {
                                    top: v,
                                    left: m
                                },
                                viewport: {
                                    top: v - pageYOffset,
                                    bottom: pageYOffset - v - r + innerHeight,
                                    left: m - pageXOffset,
                                    right: pageXOffset - m - n + innerWidth
                                }
                            },
                            A = this.target.ownerDocument,
                            T = A.defaultView,
                            S = void 0;
                        return T.innerHeight > A.documentElement.clientHeight && (S = this.cache("scrollbar-size", l), E.viewport.bottom -= S.height), T.innerWidth > A.documentElement.clientWidth && (S = this.cache("scrollbar-size", l), E.viewport.right -= S.width), (-1 === ["", "static"].indexOf(A.body.style.position) || -1 === ["", "static"].indexOf(A.body.parentElement.style.position)) && (E.page.bottom = A.body.scrollHeight - v - r, E.page.right = A.body.scrollWidth - m - n), "undefined" != typeof this.options.optimizations && this.options.optimizations.moveElement !== !1 && "undefined" == typeof this.targetModifier && ! function() {
                            var e = t.cache("target-offsetparent", function() {
                                    return f(t.target)
                                }),
                                o = t.cache("target-offsetparent-bounds", function() {
                                    return a(e)
                                }),
                                i = getComputedStyle(e),
                                n = o,
                                r = {};
                            if (["Top", "Left", "Bottom", "Right"].forEach(function(t) {
                                    r[t.toLowerCase()] = parseFloat(i["border" + t + "Width"])
                                }), o.right = A.body.scrollWidth - o.left - n.width + r.right, o.bottom = A.body.scrollHeight - o.top - n.height + r.bottom, E.page.top >= o.top + r.top && E.page.bottom >= o.bottom && E.page.left >= o.left + r.left && E.page.right >= o.right) {
                                var s = e.scrollTop,
                                    l = e.scrollLeft;
                                E.offset = {
                                    top: E.page.top - o.top + s - r.top,
                                    left: E.page.left - o.left + l - r.left
                                }
                            }
                        }(), this.move(E), this.history.unshift(E), this.history.length > 3 && this.history.pop(), e && _(), !0
                    }
                }
            }, {
                key: "move",
                value: function(t) {
                    var e = this;
                    if ("undefined" != typeof this.element.parentNode) {
                        var o = {};
                        for (var i in t) {
                            o[i] = {};
                            for (var n in t[i]) {
                                for (var r = !1, s = 0; s < this.history.length; ++s) {
                                    var a = this.history[s];
                                    if ("undefined" != typeof a[i] && !y(a[i][n], t[i][n])) {
                                        r = !0;
                                        break
                                    }
                                }
                                r || (o[i][n] = !0)
                            }
                        }
                        var l = {
                                top: "",
                                left: "",
                                right: "",
                                bottom: ""
                            },
                            d = function(t, o) {
                                var i = "undefined" != typeof e.options.optimizations,
                                    n = i ? e.options.optimizations.gpu : null;
                                if (n !== !1) {
                                    var r = void 0,
                                        s = void 0;
                                    if (t.top ? (l.top = 0, r = o.top) : (l.bottom = 0, r = -o.bottom), t.left ? (l.left = 0, s = o.left) : (l.right = 0, s = -o.right), window.matchMedia) {
                                        var a = window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches;
                                        a || (s = Math.round(s), r = Math.round(r))
                                    }
                                    l[L] = "translateX(" + s + "px) translateY(" + r + "px)", "msTransform" !== L && (l[L] += " translateZ(0)")
                                } else t.top ? l.top = o.top + "px" : l.bottom = o.bottom + "px", t.left ? l.left = o.left + "px" : l.right = o.right + "px"
                            },
                            u = !1;
                        if ((o.page.top || o.page.bottom) && (o.page.left || o.page.right) ? (l.position = "absolute", d(o.page, t.page)) : (o.viewport.top || o.viewport.bottom) && (o.viewport.left || o.viewport.right) ? (l.position = "fixed", d(o.viewport, t.viewport)) : "undefined" != typeof o.offset && o.offset.top && o.offset.left ? ! function() {
                                l.position = "absolute";
                                var i = e.cache("target-offsetparent", function() {
                                    return f(e.target)
                                });
                                f(e.element) !== i && k(function() {
                                    e.element.parentNode.removeChild(e.element), i.appendChild(e.element)
                                }), d(o.offset, t.offset), u = !0
                            }() : (l.position = "absolute", d({
                                top: !0,
                                left: !0
                            }, t.page)), !u) {
                            for (var p = !0, c = this.element.parentNode; c && 1 === c.nodeType && "BODY" !== c.tagName;) {
                                if ("static" !== getComputedStyle(c).position) {
                                    p = !1;
                                    break
                                }
                                c = c.parentNode
                            }
                            p || (this.element.parentNode.removeChild(this.element), this.element.ownerDocument.body.appendChild(this.element))
                        }
                        var g = {},
                            m = !1;
                        for (var n in l) {
                            var v = l[n],
                                b = this.element.style[n];
                            b !== v && (m = !0, g[n] = v)
                        }
                        m && k(function() {
                            h(e.element.style, g), e.trigger("repositioned")
                        })
                    }
                }
            }]), e
        }(B);
    I.modules = [], x.position = X;
    var $ = h(I, x),
        z = function() {
            function t(t, e) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                } catch (f) {
                    n = !0, r = f
                } finally {
                    try {
                        !i && a["return"] && a["return"]()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        Y = x.Utils,
        a = Y.getBounds,
        h = Y.extend,
        m = Y.updateClasses,
        k = Y.defer,
        G = ["left", "top", "right", "bottom"];
    x.modules.push({
        position: function(t) {
            var e = this,
                o = t.top,
                i = t.left,
                n = t.targetAttachment;
            if (!this.options.constraints) return !0;
            var r = this.cache("element-bounds", function() {
                    return a(e.element)
                }),
                s = r.height,
                f = r.width;
            if (0 === f && 0 === s && "undefined" != typeof this.lastSize) {
                var l = this.lastSize;
                f = l.width, s = l.height
            }
            var d = this.cache("target-bounds", function() {
                    return e.getTargetBounds()
                }),
                u = d.height,
                p = d.width,
                c = [this.getClass("pinned"), this.getClass("out-of-bounds")];
            this.options.constraints.forEach(function(t) {
                var e = t.outOfBoundsClass,
                    o = t.pinnedClass;
                e && c.push(e), o && c.push(o)
            }), c.forEach(function(t) {
                ["left", "top", "right", "bottom"].forEach(function(e) {
                    c.push(t + "-" + e)
                })
            });
            var g = [],
                v = h({}, n),
                y = h({}, this.attachment);
            return this.options.constraints.forEach(function(t) {
                var r = t.to,
                    a = t.attachment,
                    l = t.pin;
                "undefined" == typeof a && (a = "");
                var h = void 0,
                    d = void 0;
                if (a.indexOf(" ") >= 0) {
                    var c = a.split(" "),
                        m = z(c, 2);
                    d = m[0], h = m[1]
                } else h = d = a;
                var b = O(e, r);
                ("target" === d || "both" === d) && (o < b[1] && "top" === v.top && (o += u, v.top = "bottom"), o + s > b[3] && "bottom" === v.top && (o -= u, v.top = "top")), "together" === d && ("top" === v.top && ("bottom" === y.top && o < b[1] ? (o += u, v.top = "bottom", o += s, y.top = "top") : "top" === y.top && o + s > b[3] && o - (s - u) >= b[1] && (o -= s - u, v.top = "bottom", y.top = "bottom")), "bottom" === v.top && ("top" === y.top && o + s > b[3] ? (o -= u, v.top = "top", o -= s, y.top = "bottom") : "bottom" === y.top && o < b[1] && o + (2 * s - u) <= b[3] && (o += s - u, v.top = "top", y.top = "top")), "middle" === v.top && (o + s > b[3] && "top" === y.top ? (o -= s, y.top = "bottom") : o < b[1] && "bottom" === y.top && (o += s, y.top = "top"))), ("target" === h || "both" === h) && (i < b[0] && "left" === v.left && (i += p, v.left = "right"), i + f > b[2] && "right" === v.left && (i -= p, v.left = "left")), "together" === h && (i < b[0] && "left" === v.left ? "right" === y.left ? (i += p, v.left = "right", i += f, y.left = "left") : "left" === y.left && (i += p, v.left = "right", i -= f, y.left = "right") : i + f > b[2] && "right" === v.left ? "left" === y.left ? (i -= p, v.left = "left", i -= f, y.left = "right") : "right" === y.left && (i -= p, v.left = "left", i += f, y.left = "left") : "center" === v.left && (i + f > b[2] && "left" === y.left ? (i -= f, y.left = "right") : i < b[0] && "right" === y.left && (i += f, y.left = "left"))), ("element" === d || "both" === d) && (o < b[1] && "bottom" === y.top && (o += s, y.top = "top"), o + s > b[3] && "top" === y.top && (o -= s, y.top = "bottom")), ("element" === h || "both" === h) && (i < b[0] && ("right" === y.left ? (i += f, y.left = "left") : "center" === y.left && (i += f / 2, y.left = "left")), i + f > b[2] && ("left" === y.left ? (i -= f, y.left = "right") : "center" === y.left && (i -= f / 2, y.left = "right"))), "string" == typeof l ? l = l.split(",").map(function(t) {
                    return t.trim()
                }) : l === !0 && (l = ["top", "left", "right", "bottom"]), l = l || [];
                var w = [],
                    C = [];
                o < b[1] && (l.indexOf("top") >= 0 ? (o = b[1], w.push("top")) : C.push("top")), o + s > b[3] && (l.indexOf("bottom") >= 0 ? (o = b[3] - s, w.push("bottom")) : C.push("bottom")), i < b[0] && (l.indexOf("left") >= 0 ? (i = b[0], w.push("left")) : C.push("left")), i + f > b[2] && (l.indexOf("right") >= 0 ? (i = b[2] - f, w.push("right")) : C.push("right")), w.length && ! function() {
                    var t = void 0;
                    t = "undefined" != typeof e.options.pinnedClass ? e.options.pinnedClass : e.getClass("pinned"), g.push(t), w.forEach(function(e) {
                        g.push(t + "-" + e)
                    })
                }(), C.length && ! function() {
                    var t = void 0;
                    t = "undefined" != typeof e.options.outOfBoundsClass ? e.options.outOfBoundsClass : e.getClass("out-of-bounds"), g.push(t), C.forEach(function(e) {
                        g.push(t + "-" + e)
                    })
                }(), (w.indexOf("left") >= 0 || w.indexOf("right") >= 0) && (y.left = v.left = !1), (w.indexOf("top") >= 0 || w.indexOf("bottom") >= 0) && (y.top = v.top = !1), (v.top !== n.top || v.left !== n.left || y.top !== e.attachment.top || y.left !== e.attachment.left) && (e.updateAttachClasses(y, v), e.trigger("update", {
                    attachment: y,
                    targetAttachment: v
                }))
            }), k(function() {
                e.options.addTargetClasses !== !1 && m(e.target, g, c), m(e.element, g, c)
            }), {
                top: o,
                left: i
            }
        }
    });
    var Y = x.Utils,
        a = Y.getBounds,
        m = Y.updateClasses,
        k = Y.defer;
    x.modules.push({
        position: function(t) {
            var e = this,
                o = t.top,
                i = t.left,
                n = this.cache("element-bounds", function() {
                    return a(e.element)
                }),
                r = n.height,
                s = n.width,
                f = this.getTargetBounds(),
                l = o + r,
                h = i + s,
                d = [];
            o <= f.bottom && l >= f.top && ["left", "right"].forEach(function(t) {
                var e = f[t];
                (e === i || e === h) && d.push(t)
            }), i <= f.right && h >= f.left && ["top", "bottom"].forEach(function(t) {
                var e = f[t];
                (e === o || e === l) && d.push(t)
            });
            var u = [],
                p = [],
                c = ["left", "top", "right", "bottom"];
            return u.push(this.getClass("abutted")), c.forEach(function(t) {
                u.push(e.getClass("abutted") + "-" + t)
            }), d.length && p.push(this.getClass("abutted")), d.forEach(function(t) {
                p.push(e.getClass("abutted") + "-" + t)
            }), k(function() {
                e.options.addTargetClasses !== !1 && m(e.target, p, u), m(e.element, p, u)
            }), !0
        }
    });
    var z = function() {
        function t(t, e) {
            var o = [],
                i = !0,
                n = !1,
                r = void 0;
            try {
                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
            } catch (f) {
                n = !0, r = f
            } finally {
                try {
                    !i && a["return"] && a["return"]()
                } finally {
                    if (n) throw r
                }
            }
            return o
        }
        return function(e, o) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return t(e, o);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    return x.modules.push({
        position: function(t) {
            var e = t.top,
                o = t.left;
            if (this.options.shift) {
                var i = this.options.shift;
                "function" == typeof this.options.shift && (i = this.options.shift.call(this, {
                    top: e,
                    left: o
                }));
                var n = void 0,
                    r = void 0;
                if ("string" == typeof i) {
                    i = i.split(" "), i[1] = i[1] || i[0];
                    var s = i,
                        a = z(s, 2);
                    n = a[0], r = a[1], n = parseFloat(n, 10), r = parseFloat(r, 10)
                } else n = i.top, r = i.left;
                return e += n, o += r, {
                    top: e,
                    left: o
                }
            }
        }
    }), $
});
(function() {
    var t, e, n, i, o, r = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        s = [].indexOf || function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var n, i;
            for (n in e) i = e[n], null == t[n] && (t[n] = i);
            return t
        }, t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function(t, e, n, i) {
            var o;
            return null == e && (e = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (o = document.createEvent("CustomEvent"), o.initCustomEvent(t, e, n, i)) : null != document.createEventObject ? (o = document.createEventObject(), o.eventType = t) : o.eventName = t, o
        }, t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function(t, e, n) {
            return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
        }, t.prototype.removeEvent = function(t, e, n) {
            return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
            function t() {
                this.keys = [], this.values = []
            }
            return t.prototype.get = function(t) {
                var e, n, i, o, r;
                for (r = this.keys, e = i = 0, o = r.length; o > i; e = ++i)
                    if (n = r[e], n === t) return this.values[e]
            }, t.prototype.set = function(t, e) {
                var n, i, o, r, s;
                for (s = this.keys, n = o = 0, r = s.length; r > o; n = ++o)
                    if (i = s[n], i === t) return void(this.values[n] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
            function t() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return t.notSupported = !0, t.prototype.observe = function() {}, t
        }()), i = this.getComputedStyle || function(t, e) {
            return this.getPropertyValue = function(e) {
                var n;
                return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function(t, e) {
                    return e.toUpperCase()
                }), (null != (n = t.currentStyle) ? n[e] : void 0) || null
            }, this
        }, o = /(\-([a-z]){1})/g, this.WOW = function() {
        function o(t) {
            null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, o.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function() {
            var e, n, i, o;
            if (this.stopped = !1, this.boxes = function() {
                    var t, n, i, o;
                    for (i = this.element.querySelectorAll("." + this.config.boxClass), o = [], t = 0, n = i.length; n > t; t++) e = i[t], o.push(e);
                    return o
                }.call(this), this.all = function() {
                    var t, n, i, o;
                    for (i = this.boxes, o = [], t = 0, n = i.length; n > t; t++) e = i[t], o.push(e);
                    return o
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (o = this.boxes, n = 0, i = o.length; i > n; n++) e = o[n], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function(t) {
                return function(e) {
                    var n, i, o, r, s;
                    for (s = [], n = 0, i = e.length; i > n; n++) r = e[n], s.push(function() {
                        var t, e, n, i;
                        for (n = r.addedNodes || [], i = [], t = 0, e = n.length; e > t; t++) o = n[t], i.push(this.doSync(o));
                        return i
                    }.call(t));
                    return s
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, o.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function(e) {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function(t) {
            var e, n, i, o, r;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (t = t.parentNode || t, o = t.querySelectorAll("." + this.config.boxClass), r = [], n = 0, i = o.length; i > n; n++) e = o[n], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }, o.prototype.show = function(t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, o.prototype.applyStyle = function(t, e) {
            var n, i, o;
            return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function(r) {
                return function() {
                    return r.customStyle(t, e, i, n, o)
                }
            }(this))
        }, o.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(t) {
                return window.requestAnimationFrame(t)
            } : function(t) {
                return t()
            }
        }(), o.prototype.resetStyle = function() {
            var t, e, n, i, o;
            for (i = this.boxes, o = [], e = 0, n = i.length; n > e; e++) t = i[e], o.push(t.style.visibility = "visible");
            return o
        }, o.prototype.resetAnimation = function(t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, o.prototype.customStyle = function(t, e, n, i, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, {
                animationDuration: n
            }), i && this.vendorSet(t.style, {
                animationDelay: i
            }), o && this.vendorSet(t.style, {
                animationIterationCount: o
            }), this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }), t
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function(t, e) {
            var n, i, o, r;
            i = [];
            for (n in e) o = e[n], t["" + n] = o, i.push(function() {
                var e, i, s, l;
                for (s = this.vendors, l = [], e = 0, i = s.length; i > e; e++) r = s[e], l.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
                return l
            }.call(this));
            return i
        }, o.prototype.vendorCSS = function(t, e) {
            var n, o, r, s, l, a;
            for (l = i(t), s = l.getPropertyCSSValue(e), r = this.vendors, n = 0, o = r.length; o > n; n++) a = r[n], s = s || l.getPropertyCSSValue("-" + a + "-" + e);
            return s
        }, o.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (n) {
                e = i(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, o.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, o.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var e, n, i, o;
                for (i = this.boxes, o = [], e = 0, n = i.length; n > e; e++) t = i[e], t && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;) t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function(t) {
            var e, n, i, o, r;
            return n = t.getAttribute("data-wow-offset") || this.config.offset, r = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, o = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, i = this.offsetTop(t), e = i + t.clientHeight, o >= i && e >= r
        }, o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }, o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}).call(this);