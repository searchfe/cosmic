export default function render(node: HTMLElement) {
    (window.require as any)([
        '@baidu/cosmic-ui-search',
        'san',
        '@baidu/search-components/Aladdin/Aladdin_7e4ef65b',
        '@baidu/search-components/Paragraph/Paragraph_7d877588',
        '@baidu/search-components/Link/Link_9248cf7c',

    ], (ui: any, san: any, Aladdin: any, Paragraph: any, Link: any) => {
        const styles =  ui.aladdin;
        const App = san.defineComponent({
            template : `
                        <c-aladdin
                            styles="{{styles.aladdin}}"
                            bg-props="{{bgProps}}"
                        >
                            <div class="content">
                                <div>第一行</div>
                                <div>第二行</div>
                                <div>第三行</div>
                                <div>第四行</div>
                                <div>第五行</div>
                            </div>
                        </c-aladdin>
            `,
        
            components : {
                'c-aladdin': Aladdin.Aladdin,
                'c-sub-title': Paragraph.Paragraph,
                'c-touchable-feedback': Link.Link.TouchableFeedback,
            },
            initData:function() {
                return {
                    styles,
                    url: 'http://www.baidu.com',
                    tplInfo: {
                        style: 'normal'
                    },
                    bgProps: {
                        cardTopBg: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1194722060,1597146140&fm=179&app=35&f=PNG?w=1194&h=295&s=88011F7C4B2367241066C8C80300E0BB',
                        bgGradient: 'linear-gradient(#F2FDFF 0%, #F2FDFF 66%, #fff)'
                    },
                    bgProps1: {
                        bgImg: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1194722060,1597146140&fm=179&app=35&f=PNG?w=1194&h=295&s=88011F7C4B2367241066C8C80300E0BB',
                        bgRepeat: 'no-repeat',
                        bgSize: 'cover'
                    },
                    bgProps2: {
                        bgColor: '#F2FDFF'
                    }
                };
            }
        });
        // const {aladdin, title, link} = ui;
        // const {Aladdin, Paragraph, Link} = components;
        new App().attach(node);
    });
}