export const mock = {
    adjective: '类目名称',
    extra: '内容来源',
    keyword: '当前搜索关键词',
    label: '官方',
};

export const schema = {
    'type': 'object',
    'properties': {
        'keyword': {
            'dataType': 'both',
            'description': '第一个槽位，关键词/query',
            'type': 'string',
            'maxLength': 100,
            'opencardMinLength': 1,
            'opencardDataType': 'const',
            'opencardDescription': '第一个槽位，同步搜索 query',
            'audit': 'text',
        },
        'isKeyWordQuery': {
            'dataType': 'const',
            'description': '第一个槽位是否是搜索关键词',
            'type': 'boolean',
            'default': false,
            'opencardConst': true,
        },
        'adjective': {
            'dataType': 'both',
            'description': '第二个槽位，类目名称',
            'type': 'string',
            'maxLength': 50,
            'opencardMinLength': 1,
            'audit': 'text',
        },
        'extra': {
            'dataType': 'both',
            'description': '第三个槽位，内容来源or性质',
            'type': 'string',
            'maxLength': 100,
            'opencardDataType': 'const',
            'opencardConst': '',
            'audit': 'text',
        },
        'isSmallTitle': {
            'dataType': 'const',
            'description': '标题大小',
            'type': 'boolean',
            'default': false,
        },
        'enableGroup': {
            'dataType': 'const',
            'description': '是否支持组卡',
            'type': 'boolean',
            'default': false,
            'const': true,
        },
        'showLabel': {
            'dataType': 'const',
            'description': '是否要添加标签',
            'type': 'boolean',
            'default': false,
            'opencardConst': false,
        },
        'showFrontLabel': {
            'dataType': 'const',
            'description': '是否要添加前置标签',
            'type': 'boolean',
            'default': false,
            'opencardConst': false,
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
            'opencardNewKey': 'jump_url',
        },
    },
    'required': [
        'showLabel',
        'isKeyWordQuery',
    ],
    'opencardRequired': [
        'showLabel',
        'isKeyWordQuery',
        'keyword',
        'adjective',
    ],
    'dataSchemaRequired': [
        'url',
    ],
    'allOf': [
        {
            'if': {
                'properties': {
                    'showLabel': {
                        'const': true,
                    },
                },
            },
            'then': {
                'properties': {
                    'label': {
                        'type': 'string',
                        'dataType': 'both',
                        'description': '标题可用标签',
                        'enum': [
                            '官方',
                            '正版',
                            '风险',
                        ],
                        'audit': 'text',
                    },
                },
                'required': [
                    'label',
                ],
            },
        },
        {
            'if': {
                'properties': {
                    'enableGroup': {
                        'const': true,
                    },
                },
            },
            'then': {
                'properties': {
                    'groupTitle': {
                        'type': 'string',
                        'description': '组卡标题',
                        'dataType': 'both',
                        'default': '子卡标题',
                    },
                },
            },
        },
        {
            'if': {
                'properties': {
                    'showFrontLabel': {
                        'const': true,
                    },
                },
            },
            'then': {
                'properties': {
                    'frontLabelProps': {
                        'description': '前置标签',
                        'type': 'object',
                        'default': null,
                        'properties': {
                            'text': {
                                'type': 'string',
                                'description': '文案',
                                'dataType': 'both',
                                'default': '前置标签',
                            },
                            'color': {
                                'type': 'string',
                                'description': '类型',
                                'enum': [
                                    'dangerRed',
                                    'shallowGray',
                                ],
                                'enumName': [
                                    'dangerRed',
                                    'shallowGray',
                                ],
                            },
                        },
                    },
                },
                'required': [
                    'label',
                ],
            },
        },
    ],
    'additionalProperties': false,
    'description': '标题区：标题',
    'title': 'Title2',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://wuji.baidu-int.com/schema/component/Title2/Title2.json',
};
