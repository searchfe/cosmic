import type { Module } from './module';
import { injectable } from 'inversify';
import type { Container } from 'inversify';

export interface ModuleConfig {
    id: string;
}

@injectable()
/** Provides the ability to cache and run ES Modules */
export class ModuleFactory {
    constructor(private container: Container) {}
    private modules: Map<string, new () => Module<any>> = new Map();
    add(moduleId: string, module: new () => Module<any>, scope: 'Singleton' | 'Transient' | 'Request' = 'Transient') {
        if (this.exist(moduleId)) return;
        this.modules.set(moduleId, module);
        const m = this.container.bind(moduleId).to(module);
        switch (scope) {
            case 'Singleton':
                m.inSingletonScope();
                break;
            case 'Transient':
                m.inTransientScope();
                break;
            case 'Request':
                m.inRequestScope();
                break;
        }
    }
    get(moduleId: string) {
        return this.modules.get(moduleId);
    }
    exist(moduleId: string) {
        return this.modules.has(moduleId);
    }
    async load(moduleId: string, props: any) {
        if (!this.exist(moduleId)) {
            await import(moduleId).then(ModuleSource => {
                this.add(moduleId, ModuleSource.default, props.scope || 'Transient');
            });
        }
        const module = this.container.get(moduleId) as Module<any>;
        await module.init(props);
        return module;
    }
}
