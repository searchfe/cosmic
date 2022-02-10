class A {
    private a: string;
    constructor() {
        console.log('b');
        this.a = 'xxxx';
    }
    print() {
        console.log(this.a);
    }
}

export { A };