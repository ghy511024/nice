const nice = function (option) {
    let a = ~[];
    a = {
        a: ++a,
        b: (![] + "")[a],
        c: ++a,
        d: (![] + "")[a],
        e: ++a,
        f: ({} + "")[a],
        g: (a[a] + "")[a],
        h: ++a,
        i: (!"" + "")[a],
        j: ++a,
        k: ++a,
        l: ({} + "")[a],
        m: ++a,
        n: ++a,
        o: ++a,
        p: ++a
    };
    a.$_ = (a.$_ = a + "")[a.k] + (a._$ = a.$_[a.c]) + (a.$$ = (a.$ + "")[a.c]) + ((!a) + "")[a.h] + (a.__ = a.$_[a.m]) + (a.$ = (!"" + "")[a.c]) + (a._ = (!"" + "")[a.e]) + a.$_[a.k] + a.__ + a._$ + a.$;
    a.$$ = a.$ + (!"" + "")[a.h] + a.__ + a._ + a.$ + a.$$;
    a.$ = (a.a)[a.$_][a.$_];
    return a
}
module.exports = nice;