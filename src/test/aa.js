function bb() {
    return function () {
        console.log(1)
    }
}

class a {
    @bb()
    x1() {
        console.log(2)
    }
}