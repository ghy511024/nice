function Controller(option: { a: string }): PropertyDecorator {
    const defaultPath = '/';
    return (target: object) => {
    };
}
function vv(option: { a: string }): MethodDecorator {
    const defaultPath = '/';
    return (target: object) => {
    };
}


class xx {
    @Controller({a: "sdf"})
    private name

}