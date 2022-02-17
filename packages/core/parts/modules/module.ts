export interface Module<T> {
    props: T;
    /** loading resoures */
    init: (props: T) => Promise<Module<T>>;

    /** to Options */
    serialize: () => T;

    destroy: () => Promise<Module<T>>;
}
