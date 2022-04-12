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
                style="color:white;"
                class="{{styles.item}} inline-block w-300 mr-0 rounded text-sm" >
                <cc-image
                    src="{{item.src}}"
                    style="padding-bottom:57%;"
                    mask-type="info"
                ></cc-image>
                <div>{{ item.title }}</div>
            </cc-scroll-item>
        </cc-scroll>
        </div>
        </div>
            `,

            components : {
                'cc-scroll': Scroll.default,
                'cc-scroll-item': ScrollItem.default,
                'cc-image': Image.Image,
            },
            initData:function() {
                return {
                    styles,
                    imgSrc: 'https://t7.baidu.com/it/u=3781557575,1048360098&fm=167&app=3000&size=w931&q=83&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000',
                    list: [{
                        col: 6,
                        src: 'https://t7.baidu.com/it/u=3781557575,1048360098&fm=167&app=3000&size=w931&q=83&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000',
                        title: '2022北京东奥会开幕式',
                    },{
                        col: 6,
                        src: 'https://t8.baidu.com/it/u=1277324243,4062312162&fm=167&app=3000&size=w931&q=89&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000',
                        title: '开幕式直播回放',
                    },{
                        col: 6,
                        src: 'https://t8.baidu.com/it/u=642186073,398443614&fm=167&app=3000&size=w931&q=100&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000',
                        title: '北京东残奥会表彰大会',
                    }, {
                        col: 6,
                        src: 'https://t7.baidu.com/it/u=1312664492,2327618666&fm=167&app=3000&size=w931&q=100&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000',
                        title: '中国队9金4银2铜收官',
                    }],
                };
            },
        });
        new App().attach(node);
    });
}
