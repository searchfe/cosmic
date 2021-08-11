import { injectable, inject } from 'inversify';
import type { Controller, ModuleFactory, ModuleConfig } from '@cosmic/core/parts';
import { SplitBoardView, SplitItemView, directionType } from '@cosmic/core/browser';

interface WorkbenchProps {
  type: 'col' | 'row';
  minWidth: number;
  scale: number[];
  modules?: ModuleConfig[];
}

@injectable()
export default class Workbench implements Controller<WorkbenchProps> {
  private splitBoard: SplitBoardView;
  private moduleFactory: ModuleFactory;
  constructor(@inject('ModuleFactory') moduleFactory: ModuleFactory) {
    this.splitBoard = new SplitBoardView().setFlow('1');
    this.moduleFactory = moduleFactory;
  }
  view() {
    return this.splitBoard.root;
  }
  async init(props: WorkbenchProps) {
    this.splitBoard.direction = directionType[props.type];
    for (const p of props.modules || []) {
      const module = await this.moduleFactory.load(p.id, p);
      const view = new SplitItemView().setContent(module.view());
      this.splitBoard.addItem(view);
    }
    this.splitBoard.applySplit(
      this.splitBoard.direction === directionType.col ? 'horizontal' : 'vertical',
      props.scale || []
    );
    return this;
  }

  viewWillAppear(): void {
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

  public destroy() {
    const view = this.view();
    this.viewWillDisappear();
    if (view.parentNode) {
      view.parentNode.removeChild(view);
    }
    this.viewDidDisappear();
  }
}
