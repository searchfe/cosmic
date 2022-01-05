import { injectable, inject } from 'inversify';
import type { Module, ModuleFactory, ModuleConfig } from '@cosmic/core/parts';
import { Controller, SplitBoardView, directionType } from '@cosmic/core/browser';
import type { ItemGenerateDelegate } from '@cosmic/core/browser';
import { ModuleItem } from './module-item';

interface WorkbenchProps {
    type: 'col' | 'row';
    minWidth: number;
    scale: number[];
    modules?: ModuleConfig[];
}

@injectable()
export default class Workbench
    extends Controller
    implements Module<WorkbenchProps>, ItemGenerateDelegate<ModuleItem<any>>
{
    public props: WorkbenchProps;
    private splitBoard: SplitBoardView<ModuleItem<any>>;
    private moduleFactory: ModuleFactory;
    constructor(@inject('ModuleFactory') moduleFactory: ModuleFactory) {
        super();
        this.splitBoard = new SplitBoardView<ModuleItem<any>>().setFlow('1');
        this.splitBoard.itemGenerateDelegate = this;
        this.moduleFactory = moduleFactory;
    }
    view() {
        return this.splitBoard.root;
    }
    async init(props: WorkbenchProps) {
        this.props = props;
        this.splitBoard.direction = directionType[props.type];
        for (const p of props.modules || []) {
            const item = new ModuleItem();
            item.loader = this.moduleFactory.load(p.id, p);
            item.moduleId = p.id;
            this.splitBoard.addItem(item);
        }
        this.splitBoard.applySplit(
            this.splitBoard.direction === directionType.col ? 'horizontal' : 'vertical',
            props.scale || [],
        );
        return this;
    }

    viewWillAppear(): void {
        this.splitBoard.items.forEach((item, index) => {
            const view = this.splitBoard.items[index];
            item.loader.then(module => {
                if (module instanceof Controller) {
                    view.setContent(module.view());
                    view.module = module;
                    module.viewWillAppear();
                    module.viewDidDisappear();
                }
            });
        });
        /** to be completed */
    }
    viewDidAppear(): void {
        /** to be completed */
    }

    viewWillDisappear(): void {
        /** to be completed */
    }
    viewDidDisappear(): void {
        /** to be completed */
    }

    public async destroy() {
        const view = this.view();
        this.viewWillDisappear();
        if (view.parentNode) {
            view.parentNode.removeChild(view);
        }
        this.viewDidDisappear();
        return this;
    }
    expandNewItem(view: ModuleItem<any>, index: number) {
        const item = view.clone();
        item.loader = this.moduleFactory.load(item.moduleId, view.module.serialize());
        item.loader.then(module => {
            if (module instanceof Controller) {
                item.module = module;
                item.setContent(module.view());
                module.viewWillAppear();
                module.viewDidDisappear();
            }
        });
        return item;
    }

    serialize() {
        return {
            type: this.props.type,
            minWidth: this.props.minWidth,
            scale: this.props.scale,
            modules: [],
        };
    }
}
