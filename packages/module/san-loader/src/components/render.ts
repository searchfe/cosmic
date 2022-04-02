import renderAladin from './aladin';
import renderImage from './image';
import renderScroll from './scroll';

export default function render(node: HTMLElement, name: string) {
    switch(name) {
        case 'aladin':
            renderAladin(node);
            break;
        case 'image':
            renderImage(node);
            break;
        case 'scroll':
            renderScroll(node);
            break;
    }
}