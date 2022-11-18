!function (o, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (o = "undefined" != typeof globalThis ? globalThis : o || self).OptimusEnvAdapter = e()
}(this, function () {
    "use strict";
    var n = function (o, e) {
        return (n = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (o, e) {
            o.__proto__ = e
        } || function (o, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (o[n] = e[n])
        })(o, e)
    };
    var r = /\.anjuke\.com/, c = /\.58\.com/, t = ["https://res.wx.qq.com/open/js/jweixin-1.6.0.js"];
    c.test(window.location.host) && t.push("https://weixin.58.com/weixinjsconfig/config?t=" + Math.random() + "&debug=false"), r.test(window.location.host) && t.push("https://zfang.58.com/post/weixin?url=" + encodeURIComponent(location.href));
    var l, o, e = (i.prototype.init = function (o, e) {
        var n = o.autoLoadArr, e = {autoLoadSwitch: !0, autoLoadDefault: !0, defAutoloadArr: e};
        this._deepAssign(e, o), !1 === e.autoLoadDefault ? e.defAutoloadArr = n : e.defAutoloadArr = e.defAutoloadArr.concat(n), !1 === e.autoLoadSwitch ? this.ready.init([]) : this.ready.init(e.defAutoloadArr)
    }, i);

    function i(o, e) {
        void 0 === e && (e = "empty"), this.win = window || {}, this.DEF_SDKS = {
            wubaCommon: ["//a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=200"],
            wubaLink: ["//a.58cdn.com.cn/app58/rms/app/js/app_20264.js?t=" + (new Date).getDate()],
            anjuke: ["//a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=200"],
            wx: t,
            pms: ["//a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=200"],
            wbutown: ["//j1.58cdn.com.cn/weixin/js/r/wbutownSdk.min.js?t=" + (new Date).getDate()]
        }, this.ready = o.utils.ready, this.debug = o.utils.debug, this.http = o.utils.http, this._loadjs = o.utils.loadjs, this._deepAssign = o.utils.deepAssign, this.init(o.config, this.DEF_SDKS[e] || []), this.win = window
    }

    function a(o) {
        document.title = o
    }

    function s(o, e) {
        var n, t = this;
        this.debug.log({params: o, config: e}, "调用路由跳转方法参数"), o && (e && !0 === e.reload && this.pageshow(function () {
            t.reload(!0)
        }), n = "", (n = "string" == typeof o ? o : o.content && o.content.url || "") || this.debug.log(n, "跳转url异常", l.yellow), e && !0 === e.isfinish ? window.location.replace(n) : window.location.href = n)
    }

    function u() {
        window.history.back()
    }

    function p(o) {
        void 0 === o && (o = !1), window.location.reload(!!o)
    }

    function d(n) {
        return new Promise(function (e) {
            window.addEventListener("pageshow", function (o) {
                o.persisted && (n && "function" == typeof n && n(), e())
            })
        })
    }

    function w(t, o, e, i) {
        var a = this;
        return i = i || window.location.href, new Promise(function (e) {
            a.debug.log(i, "m调用登录传入path参数");
            window.addEventListener("pageshow", function (o) {
                o.persisted && (t && "function" == typeof t && t(0), e({state: 0}))
            });
            var o = window.location.host;
            if (r.test(o)) {
                var n = window.location.protocol + "//m.anjuke.com/member/login/";
                return i && "function" == typeof window.btoa ? n += "?history=" + window.btoa(i) : a.debug.log("window.btoa is not a function.", "", l.yellow), void (window.location.href = n)
            }
            c.test(o) ? window.location.href = window.location.protocol + "//m.m.58.com/login" + (i ? "?path=" + encodeURIComponent(i) : "") : a.debug.log(window.location.href, "未知域名调起登录", l.red)
        })
    }

    function f(o) {
        var t = this, o = void 0 === o ? {} : o, i = o.path, a = o.callback;
        return new Promise(function (e) {
            t.debug.log(i, "m调用登出传入path参数");
            window.addEventListener("pageshow", function (o) {
                o.persisted && (a && "function" == typeof a && a(0), e(0))
            });
            var o = window.location.host;
            if (r.test(o)) {
                var n = window.location.protocol + "//m.anjuke.com/member/logout/";
                return i && "function" == typeof window.btoa ? n += "?history=" + window.btoa(i) : t.debug.log("window.btoa is not a function.", "", l.yellow), void (window.location.href = n)
            }
            c.test(o) ? window.location.href = window.location.protocol + "//passport.58.com/logout" + (i ? "?path=" + encodeURIComponent(i) : "") : t.debug.log(window.location.href, "未知域名调起登出", l.red)
        })
    }

    function g() {
        return (g = Object.assign || function (o) {
            for (var e = 1; e < arguments.length; e++) {
                var n, t = arguments[e];
                for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n])
            }
            return o
        }).apply(this, arguments)
    }

    (o = l = l || {}).warn = "warn", o.log = "log", o.err = "err", o.alert = "alert", o.logAlert = "log,alert", o.errAlert = "err,alert", o.yellow = "yellow", o.red = "red";
    var h, m, b, y = !(o.green = "green");

    function v(o) {
        var e = g({}, o);
        this.debug.log(e, "调起app方法param参数");
        var n = window.location.host || "";
        switch (e.url && "//" === e.url.slice(0, 2) && (e.url = window.location.protocol + e.url), e.callHost || "") {
            case"wuba":
                A.call(this, e);
                break;
            case"ajk":
                j.call(this, e);
                break;
            case"jjr":
                (function (o) {
                    this.debug.log(o, "callJjrApp 调用参数");
                    o = o.protocol || "openbroker2://vip.anjuke.com/commonlib/webview_activity?url=" + encodeURIComponent(o.url);
                    this.debug.log(o, "Call _protocol"), window.location.href = o
                }).call(this, e);
                break;
            case"wbutown":
                (function (o) {
                    delete o.callHost, this.debug.log(o, "callWbutown 调用参数"), delete o.callType, delete o.callback;
                    o = o.protocol || "wbutown://jump/town/common?params=" + encodeURIComponent(JSON.stringify(o));
                    this.debug.log(o, "Jump type _protocol"), window.location.href = "//fangfe.58.com/spage/common/pullAppLocation?params=" + o
                }).call(this, e);
                break;
            default:
                r.test(n) ? j.call(this, e) : c.test(n) ? A.call(this, e) : this.debug.log(n, "callApp域名异常", l.red)
        }
    }

    function A(e) {
        var n = this;
        if (delete e.callHost, this.debug.log(e, "callWubaApp 调用参数"), "jump" === e.callType) {
            delete e.callType, delete e.callback;
            var o = e.protocol || "wbmain://jump/core/" + ("link" === e.pagetype ? "link" : "common") + "?params=" + encodeURIComponent(JSON.stringify(e));
            this.debug.log(o, "Jump type _protocol"), window.location.href = "//fangfe.58.com/spage/common/pullApp?params=" + o
        } else {
            delete e.callType;
            var t = function () {
                if ("function" == typeof window.callWbApp) {
                    if ("function" == typeof e.callback) return e.callback();
                    var o = e.protocol || "wbmian://jump/core/common?params=" + encodeURIComponent(JSON.stringify(e));
                    n.debug.log(o, "Call type _protocol"), window.callWbApp("#callWbApp", "other", {jump: o})
                } else n.debug.log(window.callWbApp, "callWbApp is not function", l.yellow)
            };
            if (y) return t();
            this._loadjs("//down.58.com/js/callWbApp_2019_min.js", function () {
                return y = !0, t()
            })
        }
    }

    function j(o) {
        delete o.callHost, this.debug.log(o, "callAjk 调用参数"), delete o.callType, delete o.callback;
        o = o.protocol || "openanjuke://jump/core/common?params=" + encodeURIComponent(JSON.stringify(o));
        this.debug.log(o, "Jump type _protocol"), window.location.href = "//fang-zf.anjuke.com/spage/common/pullAppForAjk?params=" + o
    }

    function x(i, a) {
        var o = this;
        return new Promise(function (n) {
            var t = o;
            t.invoke(function () {
                t.debug.log(i, "调用分享param参数");

                function e(o, e) {
                    return a && "function" == typeof a && a({state: +o, source: e}), n({state: +o, source: e})
                }

                t.win.wx.ready(function () {
                    i.shareto = i.shareto || "QQ,SINA,WEIXIN,FRIENDS,TENCENT,QQSPACE", i.url = i.url || t.win.location.href, a && "function" == typeof a || (a = function () {
                    }), (new Image).src = i.img_url;
                    var o = i.shareto.split(",");
                    -1 < o.indexOf("FRIENDS") && t.win.wx.onMenuShareTimeline({
                        title: i.title,
                        link: i.url,
                        imgUrl: i.img_url,
                        success: function () {
                            e("0", "FRIENDS")
                        },
                        cancel: function () {
                            e("2", "FRIENDS")
                        }
                    }), -1 < o.indexOf("WEIXIN") && t.win.wx.onMenuShareAppMessage({
                        title: i.title,
                        desc: i.content,
                        link: i.url,
                        imgUrl: i.img_url,
                        success: function () {
                            e("0", "WEIXIN")
                        },
                        cancel: function () {
                            e("2", "WEIXIN")
                        }
                    }), -1 < o.indexOf("QQ") && t.win.wx.onMenuShareQQ({
                        title: i.title,
                        desc: i.content,
                        link: i.url,
                        imgUrl: i.img_url,
                        success: function () {
                            e("0", "QQ")
                        },
                        cancel: function () {
                            e("2", "QQ")
                        }
                    }), -1 < o.indexOf("TENCENT") && t.win.wx.onMenuShareWeibo({
                        title: i.title,
                        desc: i.content,
                        link: i.url,
                        imgUrl: i.img_url,
                        success: function () {
                            e("0", "TENCENT")
                        },
                        cancel: function () {
                            e("2", "TENCENT")
                        }
                    }), -1 < o.indexOf("QQSPACE") && t.win.wx.onMenuShareQZone({
                        title: i.title,
                        desc: i.content,
                        link: i.url,
                        imgUrl: i.img_url,
                        success: function () {
                            e("0", "QQSPACE")
                        },
                        cancel: function () {
                            e("2", "QQSPACE")
                        }
                    })
                })
            })
        })
    }

    function k(o) {
        var n = this, o = void 0 === o ? {} : o, t = o.shareParams, i = o.callback, a = o.extendParams;
        return new Promise(function (e, o) {
            if (n.debug.log({shareParams: t, extendParams: a}, "WX 设置分享调用参数"), !t) return o("分享参数不可缺省");
            n.share(t, function (o) {
                o = o, i && "function" == typeof i && i(o), e(o)
            })
        })
    }

    function I(o) {
        var t = this;
        r.test(window.location.host) && !1 !== o && (this.debug.log("安居客域名获取wx.config"), this.http.post("//m.anjuke.com/xinfang/api/weixin/ticket", {url: window.location.origin + window.location.pathname + window.location.search}, {withCredentials: !1}).then(function (o) {
            var e, n;
            t.debug.log(o, "安居客域名api返回wx.config参数"), o.result ? (e = o.result, n = function () {
                setTimeout(function () {
                    window.wx.config({
                        appId: e.appid,
                        debug: !1,
                        jsApiList: ["onMenuShareQZone", "updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard", "launchApplication"],
                        openTagList: ["wx-open-launch-app", "wx-open-launch-weapp"],
                        nonceStr: e.noncestr,
                        signature: e.signature,
                        timestamp: e.timestamp
                    })
                }, 50)
            }, window.wx && window.wx.config && n(), window.wx && window.wx.ready && window.wx.ready(n), t.debug.log("注册config时wx.config/wx.ready均不存在", "", l.yellow)) : t.debug.log(o, "请求安居客wx.config参数时返回值未找到result，res详细信息", l.yellow)
        }).catch(function (o) {
            t.debug.log(o, "请求安居客wx.config参数时发生异常，详细信息", l.red)
        }))
    }

    function S(e) {
        var n = this;
        return new Promise(function (o) {
            n.invoke(function () {
                return e && e(n.win.wx), o(n.win.wx)
            })
        })
    }

    function _(o) {
        var e = this;
        this.debug && this.debug.log(o, "微信预览图片参数");
        var n = +o.index || 0, n = Math.min(n, o.urlArr.length);
        this.invoke(function () {
            e.win.wx.previewImage && e.win.wx.previewImage({current: o.urlArr[n], urls: o.urlArr})
        })
    }

    function E() {
        this.constructor = m
    }

    function C(o) {
        var e = h.call(this, o, "wx") || this;
        return e.setAjkConfig = I, e.setTitle = a, e.redirect = s, e.pageshow = d, e.reload = p, e.back = u, e.login = w, e.logout = f, e.share = x, e.setExtendShare = k, e.callApp = v, e.getBridge = S, e.previewImages = _, e.debug.log(o, "WX Init Configs"), e.invoke(function () {
            window.wx.error(function (o) {
                e.debug.log(o, "wx.error", l.red)
            }), e.invoke(e.setAjkConfig)
        }), e
    }

    return n(m = C, b = h = e), m.prototype = null === b ? Object.create(b) : (E.prototype = b.prototype, new E), C.prototype.invoke = function (o) {
        var e = this;
        this.ready.ready(function () {
            return e.win.wx ? o() : void e.debug.log("未发现window.wx", "WX Ready", l.red)
        })
    }, C
});