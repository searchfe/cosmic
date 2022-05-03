export const mock = {
    list: [{
        text: 'Tab1',
        children: {},
        url: {},
    },{
        text: 'Tab2',
        children: {},
        url: {},
    },{
        text: 'Tab3',
        children: {},
        url: {},
    }],
    scroll: false,
};

export const schema = {
    'type': 'object',
    'properties': {
        'scroll': {
            'description': '选择Tab排版类型',
            'type': 'boolean',
            'dataType': 'const',
            'enum': [
                true,
                false,
            ],
            'enumName': [
                '横滑（5-10个）',
                '等分（2-5个）',
            ],
        },
        'selectedIndex': {
            'description': '当前选中索引',
            'type': 'number',
            'dataType': 'const',
            'enum': [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
            ],
            'enumName': [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
            ],
            'default': '0',
        },
        'tabSelectColor': {
            'type': 'string',
            'dataType': 'const',
            'description': '设置选中态文字颜色',
        },
        'list': {
            'type': 'array',
            'description': 'Tab 列表',
            'items': {
                'type': 'object',
                'description': 'Tab${index}',
                'properties': {
                    'text': {
                        'type': 'string',
                        'dataType': 'both',
                        'description': 'Tab样例数据',
                        'minLength': 1,
                        'audit': 'text',
                    },
                    'url': {
                        'type': 'object',
                        'properties': {
                            'type': {
                                'type': 'string',
                                'description': '链接类型',
                                'enum': [
                                    'tc',
                                    'xcx',
                                    'na',
                                    'live',
                                ],
                                'enumName': [
                                    '普通H5',
                                    '小程序',
                                    'NA调起',
                                    '直播NA调起',
                                ],
                                'default': 'tc',
                                'dataType': 'var',
                            },
                            'src': {
                                'type': 'string',
                                'format': 'uri',
                                'dataType': 'var',
                                'description': '链接',
                                'default': 'https://www.baidu.com',
                                'isRequired': false,
                            },
                            'params': {
                                'type': 'object',
                                'description': '链接参数',
                                'dataType': 'var',
                                'isRequired': false,
                                'schemaIgnore': true,
                            },
                        },
                        'required': [
                            'src',
                        ],
                        'description': '链接地址',
                        'dataType': 'var',
                        'flatten': false,
                        'ignoreChildren': true,
                        'opencardDefault': '/page/of/target?id=1',
                        'opencardType': 'string',
                        'opencardFormat': 'xcx-uri',
                        'opencardPattern': '^(%2f|%2F|\\\\/)?[-A-Za-z0-9+&@#?]{1}[-A-Za-z0-9+&@#\\\\/%?=~_|!:,.;{}]+[-A-Za-z0-9+&@#\\\\/%=~_{}|]',
                        'multiType': [
                            {
                                'type': 'string',
                                'format': 'uri',
                                'dataType': 'var',
                                'description': '链接',
                                'default': 'https://www.baidu.com',
                                'isRequired': false,
                            },
                        ],
                        'title': 'url-info',
                    },
                },
                'required': [
                    'text',
                    'children',
                ],
            },
            'maxItems': 10,
            'itemLabel': 'Tab',
        },
    },
    'required': [
        'scroll',
        'list',
    ],
    'description': '选项卡配置',
    'title': 'tabs',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://wuji.baidu-int.com/schema/component/Tabs/Tabs.json',
};
