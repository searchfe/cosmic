import { FrameNode, BaseFrameMixin, BaseNodeMixin, SolidPaint } from '../../document';
export function makeFenceGuide(parent: BaseFrameMixin & BaseNodeMixin) {
    const layoutGrid = parent.layoutGrids[0];
    if (layoutGrid && layoutGrid.visible) {
        const wrapper = new FrameNode();
        wrapper.layoutMode = 'NONE';
        wrapper.width = 0;
        wrapper.height = 0;
        wrapper.overflowDirection = 'BOTH';


        const frame = new FrameNode();
        frame.width = parent.width - parent.paddingLeft - parent.paddingRight;
        frame.height = parent.height - parent.paddingTop - parent.paddingBottom;
        frame.x = parent.paddingLeft;
        frame.y = parent.paddingTop;
        frame.layoutGrids = [layoutGrid];
        if (layoutGrid.pattern === 'ROWS' || layoutGrid.pattern === 'COLUMNS') {
            for (let i = 0; i < layoutGrid.count; i++) {
                const c = new FrameNode();
                c.colSize = 1;
                if (layoutGrid.rcolor) {
                    const paint = new SolidPaint();
                    paint.color = layoutGrid.rcolor;
                    paint.opacity = layoutGrid.rcolor.a;
                    c.backgrounds = [paint];
                }
                frame.appendChild(c);
            }
        }

        wrapper.appendChild(frame);
        return wrapper;
    }
}


