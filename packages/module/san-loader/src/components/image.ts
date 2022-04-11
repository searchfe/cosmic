import { esl } from '@cosmic/core/browser';

export default function render(node: HTMLElement) {
    esl.require([
        '@baidu/cosmic-ui-search',
        'san',
        '@baidu/search-components/Image/Image_d1a8900c',

    ], (ui: any, san: any, Image: any) => {
        const styles =  ui.image;
        const App = san.defineComponent({
            template : `
            <div class="{{styles.normal}}">
                <c-image
                    src="{{src}}"
                    class="sc-image-rounded-lg sc-image" />
                </div>
            `,

            components : {
                'c-image': Image.Image,
            },
            initData:function() {
                return {
                    styles,
                    src: 'https://t9.baidu.com/it/u=3878485677,3723546526&fm=167&app=3000&f=PNG&fmt=auto&size=f200_200',
                    srcRround: 'https://img1.baidu.com/it/u=2176920157,774277257&fm=253&app=138&size=b931,260&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000',
                    rounded: {
                        size: 'lg',
                    },
                    rounded2: {
                        tlRadius: 'xs',
                        trRadius: 'lg',
                    },
                    bottomText:'这是一段文字描述',
                };
            },
        });
        new App().attach(node);
    });
}
