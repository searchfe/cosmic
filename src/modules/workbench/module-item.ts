import { SplitItemView } from '@cosmic/core/browser';
import type { Module } from '@cosmic/core/parts';

export class ModuleItem<T> extends SplitItemView {
    public loader: Promise<Module<T>>;
    public moduleId: string;
    public module: Module<T>;
    public clone() {
        const item = new ModuleItem<T>();
        item.moduleId = this.moduleId;
        return item;
    }
}
