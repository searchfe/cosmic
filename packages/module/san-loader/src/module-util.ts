const url = import.meta.url;
const moduleBasePath = url.split(/\/packages\/(module|site)\//)[0].replace(/^http:\/\/[^/]+/, '');
const assetPath = moduleBasePath + '/packages/module/san-loader/assets/';

export function fetch() {
    addStyleToHead(assetPath + 'style.css');
    addStyleToHead(assetPath + 'utilities.css');
    (window.require as any).config({
        bundles:
        {
            '@baidu/search-components/core_9e241ddd': [
                '@baidu/search-components/Aladdin/Aladdin_7e4ef65b',
                '@baidu/search-components/Button/Button_9b170115',
                '@baidu/search-components/Paragraph/Paragraph_7d877588',
                '@baidu/search-components/Grid/Col_d14f790f',
                '@baidu/search-components/Grid/Row_c508ace7',
                '@baidu/search-components/Image/Image_d1a8900c',
                '@baidu/search-components/Link/Link_9248cf7c',
                '@baidu/search-components/Link/TouchableFeedback_60ed6037',
                '@baidu/search-components/Link/TouchableStop_9184cdfc',
                '@baidu/search-components/Scroll/Scroll_f2334553',
                '@baidu/search-components/Scroll/ScrollItem_133005bd'
            ],
        },
        paths: {
            'san': `${assetPath}/san`,
            '@baidu/search-components/core_9e241ddd': `${assetPath}/core_9e241ddd`,
            '@baidu/cosmic-ui-search': `${assetPath}/index_730ac3d1`,
        },
    });
}

export function addStyleToHead(linkSrc: string) {
    const dom = document.createElement('link');
    dom.rel = 'stylesheet';
    dom.href = linkSrc;
    document.head.append(dom);
}
fetch();