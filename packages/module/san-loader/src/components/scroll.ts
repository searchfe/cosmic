import { esl } from '@cosmic/core/browser';

export default function render(node: HTMLElement) {
    esl.require([
        '@baidu/cosmic-ui-search',
        'san',
        '@baidu/search-components/Scroll/Scroll_f2334553',
        '@baidu/search-components/Scroll/ScrollItem_133005bd',
        '@baidu/search-components/Image/Image_d1a8900c',

    ], (ui: any, san: any, Scroll: any, ScrollItem: any, Image: any) => {
        const styles =  ui.scroll;
        const App = san.defineComponent({
            template : `
            <div class="wise-demo" data-pmd="wise">
            <div class="c-container" style="box-sizing:initial;">
            <cc-scroll 
            list="{{list}}">
            <cc-scroll-item
                s-for="item, index in list"
                col="4"
                class="{{styles.item}} inline-block" >
                <cc-image
                    src="{{imgSrc}}"
                    class="sc-image-3\/2"
                    mask-type="info"
                ></cc-image>
                <div>二级标题 {{ index }}</div>
                <div class="c-color-gray-52">辅助功能 {{ index }}</div>
            </cc-scroll-item>
        </cc-scroll>
        </div>
        </div>
            `,
        
            components : {
                'cc-scroll': Scroll.Scroll,
                'cc-scroll-item': ScrollItem.ScrollItem,
                'cc-image': Image.Image,
            },
            initData:function() {
                return {
                    styles,
                    imgSrc: 'https://selfpage-gips.cdn.bcebos.com/480c625d7464e79788e4ae2b0583a819.jpeg',
                    list: new Array(4).fill({
                        col: 6,
                    }),
                };
            },
        });
        new App().attach(node);
    });
}