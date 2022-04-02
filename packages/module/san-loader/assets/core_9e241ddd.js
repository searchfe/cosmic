function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Aladdin/Aladdin_7e4ef65b", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    var Aladdin = /*#__PURE__*/ function(_Component) {
        _inherits(Aladdin, _Component);
        var _super = _createSuper(Aladdin);
        function Aladdin() {
            _classCallCheck(this, Aladdin);
            return _super.apply(this, arguments);
        }
        _createClass(Aladdin, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        styles: cosmicUiSearch.aladdin,
                        gapMap: {
                            zero: 0,
                            tiny: 3,
                            lh: 4.5,
                            small: 6,
                            middle: 9,
                            normal: 12,
                            large: 18
                        },
                        urlParams: {},
                        tplInfo: {
                            style: "normal"
                        },
                        visibleLog: {},
                        bgProps: {},
                        touchable: false,
                        url: "",
                        dataModule: "",
                        hideHeader: false,
                        showThemeBgImage: true,
                        hideFooter: false,
                        hidePeak: false,
                        contentPaddingTop: "",
                        contentPaddingBottom: "",
                        immerseClip: ""
                    };
                }
            },
            {
                key: "attached",
                value: function attached() {
                    var bgProps = this.data.get("bgProps");
                    if (bgProps && bgProps.bgImg) {
                        this.createImg(bgProps.bgImg, "articleWrap");
                    }
                }
            },
            {
                key: "createImg",
                value: function createImg(src, refName) {
                    var img = new Image();
                    img.src = src;
                    img.style.display = "none";
                    // 全局 onerror 事件中能拿到图片错误信息
                    this.ref(refName).appendChild(img);
                }
            },
            {
                key: "click",
                value: function click(e) {
                    this.fire("click", e);
                }
            }
        ]);
        return Aladdin;
    }(san.Component);
    Aladdin.template = '\n        <article\n            s-ref="articleWrap"\n            class="{{articleClass}}"\n            style="\n                background-image: {{\n                    themeBgImg || (bgProps.bgImg ? \'url(\' + bgProps.bgImg + \')\' : bgProps.bgGradient) || \'\'}};\n                background-size: {{themeBgSize || bgProps.bgSize || \'\'}};\n                background-repeat: {{themeBgRepeat || bgProps.bgRepeat || \'\'}};\n                background-position: {{bgProps.bgPosition || \'\'}};\n                background-color: {{innerBgColor\n                    ? !isSectionBg && !(tplInfo.order === 1 && usePeak) ? innerBgColor : \'\'\n                    : (bgProps.bgColor || \'\')\n                }};\n                {{!isSectionBg && !(tplInfo.order === 1 && usePeak) ? themeBorderRadius : \'\'}}\n            "\n            s-bind="nativeAttributes"\n            on-click="click"\n        >\n            <slot name="beforeTitle"></slot>\n            <!-- \u667A\u5E93\u5934\u90E8\uFF0C\u7EC4\u4EF6\u672A\u5B8C\u5907\uFF0C\u5148\u63D0\u4F9B\u63D2\u69FD -->\n            <slot name="cKgHeader"></slot>\n            <!-- \u6807\u9898 -->\n            <header\n                s-if="!hideHeader && (tplInfo.style !== \'sigma\' || tplInfo.is_group)"\n                class="{{styles.header}} c-gap-bottom-small c-title-gap-bottom"\n            >\n                <slot name="title">\n                </slot>\n            </header>\n            <img s-if="bgProps && bgProps.cardTopBg" class="{{styles.cardBgImg}}" src="{{bgProps.cardTopBg}}" />\n            <section\n                class="{{contentClass}}"\n                style="\n                    padding-top: {{\n                        (gapMap[contentPaddingTop] || gapMap[contentPaddingTop] === 0)\n                        ? gapMap[contentPaddingTop] / 100 + \'rem\' : \'\'}};\n                    padding-bottom: {{(\n                        gapMap[contentPaddingBottom] || gapMap[contentPaddingBottom] === 0)\n                        ? gapMap[contentPaddingBottom] / 100 + \'rem\' : \'\'}};\n                    background-color: {{isSectionBg ? innerBgColor : \'\'}};\n                    {{isSectionBg ? themeBorderRadius : \'\'}}\n                "\n            >\n                <slot></slot>\n            </section>\n            <footer s-if="!hideFooter && tplInfo.style !== \'sigma\' && !tplInfo.is_group" role="text">\n                <slot name="footer"></slot>\n            </footer>\n            <div\n                class="c-afterclick-recomm-wrap"\n                rl-type="stop"\n                data-ca="scrollEndLog,{type: \'scroll\', action: \'aftclk\'}"\n            ></div>\n            <footer\n                s-if="tplInfo && tplInfo.group_feedback"\n                role="text"\n                class="c-gap-inner-top-middle"\n            >\n                <!-- \u7EC4\u5361\u53CD\u9988\u5165\u53E3\u63D2\u69FD -->\n                <slot name="cFooterFeedback"></slot>\n            </footer>\n            <!-- \u654F\u6377\u8BC4\u4F30\u5361\u63D2\u69FD -->\n            <slot name="cMonitorCard"></slot>\n        </article>\n    ';
    Aladdin.components = {};
    Aladdin.computed = {
        usePeak: function usePeak() {
            var tplInfo = this.data.get("tplInfo");
            var hidePeak = this.data.get("hidePeak");
            return tplInfo && tplInfo.isPeak && !hidePeak;
        },
        touchableUrl: function touchableUrl() {
            var url = this.data.get("url");
            var urlParams = this.data.get("urlParams");
            return urlParams.tcUrl || url;
        },
        isSectionBg: function isSectionBg() {
            var tplInfo = this.data.get("tplInfo");
            var immerseClip = this.data.get("immerseClip");
            return tplInfo.order === 1 && (immerseClip === "section" || !tplInfo.is_group);
        },
        innerBgColor: function innerBgColor() {
            var tplInfo = this.data.get("tplInfo");
            return tplInfo.theme && tplInfo.theme.theme && tplInfo.theme.innerBgColor ? tplInfo.theme.innerBgColor : "";
        },
        nativeAttributes: function nativeAttributes() {
            var newParam = {};
            var setWhileExist = function(attr, exist, value) {
                if (exist) {
                    newParam[attr] = value;
                }
            };
            var touchable = this.data.get("touchable");
            var dataModule = this.data.get("dataModule");
            var touchableUrl = this.data.get("touchableUrl");
            var urlParams = this.data.get("urlParams");
            var visibleLog = this.data.get("visibleLog");
            setWhileExist("data-module", true, dataModule);
            setWhileExist("data-aftclk", touchable && touchableUrl, "");
            setWhileExist("rl-node", touchable, "");
            setWhileExist("rl-highlight-self", touchable, "");
            setWhileExist("rl-highlight-radius", true, ".12rem");
            setWhileExist("rl-link-href", touchable, touchableUrl);
            setWhileExist("rl-link-data-sf-href", touchable && urlParams.sfUrl, urlParams.sfUrl);
            setWhileExist("rl-link-data-sf-options", touchable && urlParams.sfUrl && urlParams.options, urlParams.options);
            setWhileExist("rl-link-data-url", touchable && urlParams.originUrl, urlParams.originUrl);
            setWhileExist("rl-link-data-log", touchable && urlParams.log, urlParams.log);
            setWhileExist("rl-link-data-click", touchable && urlParams.clickData, urlParams.clickData);
            setWhileExist("rl-link-data-tc-redirect", touchable && urlParams.tcRedirect, urlParams.tcRedirect);
            setWhileExist("rl-link-data-xcx", touchable && urlParams.type === "xcx", JSON.stringify(urlParams.options));
            setWhileExist("rl-link-data-ivk", touchable && urlParams.ivkParams && urlParams.ivkParams.control, JSON.stringify(urlParams.ivkParams));
            setWhileExist("rl-link-data-light", touchable && (urlParams.type === "easybrowse" || urlParams.type === "na"), JSON.stringify(urlParams.options));
            setWhileExist("rl-link-rt-disable", touchable && urlParams.rtDisable, "");
            setWhileExist("rl-link-origin-url", touchable && urlParams.fastUrl, urlParams.fastUrl);
            setWhileExist("data-visible", visibleLog.visible, visibleLog.visible);
            setWhileExist("data-visible-threshold", visibleLog.threshold, visibleLog.threshold);
            setWhileExist("data-visible-repeat", visibleLog.repeat, visibleLog.repeat);
            setWhileExist("data-visible-log", visibleLog.log, visibleLog.log);
            return newParam;
        },
        articleClass: function articleClass() {
            var className = [
                "c-container",
                "aladdin"
            ];
            var setWhileExist = function(value, exist) {
                exist && className.push(value);
            };
            var tplInfo = this.data.get("tplInfo");
            var styles = this.data.get("styles");
            var touchable = this.data.get("touchable");
            var urlParams = this.data.get("urlParams");
            setWhileExist("c-zk-container", tplInfo.is_group);
            setWhileExist("c-zk-first-card", tplInfo.is_group && tplInfo.group_begin_pos === tplInfo.order);
            setWhileExist("c-zk-last-card", tplInfo.is_group && tplInfo.group_end_pos === tplInfo.order);
            setWhileExist("WA_LOG_SF", touchable && urlParams.type === "sf");
            setWhileExist("WA_LOG_XCX", touchable && urlParams.type === "xcx");
            setWhileExist("WA_LOG_LIGHT", touchable && urlParams.type === "easybrowse");
            setWhileExist("WA_LOG_NA", touchable && urlParams.type === "na");
            return styles + " ".concat(className.join(" "));
        },
        contentClass: function contentClass() {
            var styles = this.data.get("styles");
            var className = [
                styles.content
            ];
            var setWhileExist = function(value, exist) {
                exist && className.push(value);
            };
            var isSectionBg = this.data.get("isSectionBg");
            var innerBgColor = this.data.get("innerBgColor");
            setWhileExist("c-margin-n-x", isSectionBg && innerBgColor);
            setWhileExist("c-padding-x", isSectionBg && innerBgColor);
            return className.join(" ");
        },
        themeBgImg: function themeBgImg() {
            var showThemeBgImage = this.data.get("showThemeBgImage");
            var tplInfo = this.data.get("tplInfo");
            if (showThemeBgImage && tplInfo.theme) {
                if (tplInfo.theme.bgImage) {
                    return "url(".concat(tplInfo.theme.bgImage, ")");
                }
                if (tplInfo.theme.bgGradient) {
                    return tplInfo.theme.bgGradient;
                }
            }
            return "";
        },
        themeBgSize: function themeBgSize() {
            var showThemeBgImage = this.data.get("showThemeBgImage");
            var tplInfo = this.data.get("tplInfo");
            if (showThemeBgImage && tplInfo.theme) {
                if (tplInfo.theme.bgSize) {
                    return tplInfo.theme.bgSize;
                }
                if (tplInfo.theme.bgImage) {
                    return "100%";
                }
            }
            return "";
        },
        themeBgRepeat: function themeBgRepeat() {
            var showThemeBgImage = this.data.get("showThemeBgImage");
            var tplInfo = this.data.get("tplInfo");
            if (showThemeBgImage && tplInfo.theme) {
                if (tplInfo.theme.bgRepeat) {
                    return tplInfo.theme.bgRepeat;
                }
                if (tplInfo.theme.bgImage) {
                    return "no-repeat";
                }
            }
            return "";
        },
        themeBorderRadius: function themeBorderRadius() {
            var tplInfo = this.data.get("tplInfo");
            var style = "";
            if (tplInfo.theme && tplInfo.theme.theme && !tplInfo.theme.isWeaken) {
                style += "\n                    border-top-right-radius: ".concat(tplInfo.theme.disperse && +tplInfo.order === 1 ? ".18rem" : tplInfo.theme.ignoreGap !== "1" ? ".12rem" : "", ";\n                    border-top-left-radius: ").concat(tplInfo.theme.disperse && +tplInfo.order === 1 ? ".18rem" : tplInfo.theme.ignoreGap !== "1" ? ".12rem" : "", ";\n                    border-bottom-right-radius: ").concat(tplInfo.theme.ignoreGap !== "1" || tplInfo.theme.endPos === +tplInfo.order ? ".12rem" : "", ";\n                    border-bottom-left-radius: ").concat(tplInfo.theme.ignoreGap !== "1" || tplInfo.theme.endPos === +tplInfo.order ? ".12rem" : "", ";\n                ");
            }
            return style;
        }
    };
    exports.Aladdin = Aladdin;
    exports["default"] = Aladdin;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Button/Button_9b170115", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file action definition
     * @author Sheeta(wuhayao@gmail.com)
     */ var CLICK_BUTTON = "click:button";
    /**
     * @file Button
     * @author Sheeta(wuhayao@gmail.com)
     */ var Button = /*#__PURE__*/ function(Base) {
        _inherits(Button, Base);
        var _super = _createSuper(Button);
        function Button() {
            _classCallCheck(this, Button);
            return _super.apply(this, arguments);
        }
        _createClass(Button, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(Button.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.button,
                        // variants
                        size: "md",
                        disabled: false,
                        // state
                        hasPrefix: !!this.sourceSlots.named.prefix,
                        hasSuffix: !!this.sourceSlots.named.suffix
                    });
                }
            },
            {
                key: "click",
                value: function click(event) {
                    this.fire("click", event);
                    var payload = {
                        event: event
                    };
                    this.eventDispatch(CLICK_BUTTON, payload);
                }
            }
        ]);
        return Button;
    }(Base);
    Button.template = '\n        <button\n            type="{{type}}"\n            class="{{styles.button}} {{size}} {{disabled ? \'disabled\' : \'\'}}"\n            disabled="{{disabled}}"\n            on-click="click"\n        >\n            <div s-if="hasPrefix" class="{{styles.prefix}} {{size}}">\n                <slot name="prefix"></slot>\n            </div>\n            <div>\n                <slot></slot>\n            </div>\n            <div s-if="hasSuffix" class="{{styles.suffix}} {{size}}">\n                <slot name="suffix"></slot>\n            </div>\n        </button>\n    ';
    Button.components = {};
    Button.computed = {
        type: function type() {
            var nativeAttributes = this.data.get("nativeAttributes");
            return (nativeAttributes === null || nativeAttributes === void 0 ? void 0 : nativeAttributes.type) || "button";
        }
    };
    exports.Button = Button;
    exports["default"] = Button;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Paragraph/Paragraph_7d877588", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file action definition
     * @author Sheeta(wuhayao@gmail.com)
     */ var CLICK_PARAGRAPH = "click:paragraph";
    /**
     * @file Paragraph
     * @author sgnilo(xujiangpingtdb@icloud.com)
     */ var Paragraph = /*#__PURE__*/ function(Base) {
        _inherits(Paragraph, Base);
        var _super = _createSuper(Paragraph);
        function Paragraph() {
            _classCallCheck(this, Paragraph);
            return _super.apply(this, arguments);
        }
        _createClass(Paragraph, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(Paragraph.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.paragraph,
                        // variants
                        size: "md",
                        // state
                        hasPrefix: !!this.sourceSlots.named.prefix,
                        hasSuffix: !!this.sourceSlots.named.suffix
                    });
                }
            },
            {
                key: "click",
                value: function click(event) {
                    this.fire("click", event);
                    var payload = {
                        event: event
                    };
                    this.eventDispatch(CLICK_PARAGRAPH, payload);
                }
            }
        ]);
        return Paragraph;
    }(Base);
    Paragraph.template = '\n        <p\n            class="{{styles.paragraph}} {{size}}"\n            on-click="click"\n        >\n            <span s-if="hasPrefix" class="{{styles.prefix}} {{size}}">\n                <slot name="prefix"></slot>\n            </span>\n            <span>\n                <slot></slot>\n            </span>\n            <span s-if="hasSuffix" class="{{styles.suffix}} {{size}}">\n                <slot name="suffix"></slot>\n            </span>\n        </p>\n    ';
    Paragraph.components = {};
    exports.Paragraph = Paragraph;
    exports["default"] = Paragraph;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Grid/Col_d14f790f", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    var transform$1 = /**
     * @file Grid - Row
     * @author Sheeta(wuhayao@gmail.com)
     */ function transform$1(input, output) {
        var currentSize = input.size;
        return function(prop) {
            var propValue = input[prop];
            if (typeof propValue === "object") {
                for(var size in propValue){
                    if (propValue.hasOwnProperty(size)) {
                        // eslint-disable-next-line
                        output[size][prop] = propValue[size];
                    }
                }
            } else {
                // eslint-disable-next-line
                output[currentSize][prop] = propValue;
            }
        };
    };
    var transform = /**
     * @file Grid - Col
     * @author Sheeta(wuhayao@gmail.com)
     */ function transform(input, output) {
        var currentSize = input.size;
        return function(prop) {
            var propValue = input[prop];
            if (typeof propValue === "object") {
                for(var size in propValue){
                    if (propValue.hasOwnProperty(size)) {
                        // eslint-disable-next-line
                        output[size][prop] = propValue[size];
                    }
                }
            } else {
                // eslint-disable-next-line
                output[currentSize][prop] = propValue;
            }
        };
    };
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file Grid helper
     * @author Sheeta(wuhayao@gmail.com)
     */ var breakpoints = [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "xxl"
    ];
    var Row = /*#__PURE__*/ function(Base) {
        _inherits(Row, Base);
        var _super = _createSuper(Row);
        function Row() {
            _classCallCheck(this, Row);
            return _super.apply(this, arguments);
        }
        _createClass(Row, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(Row.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.grid,
                        // props & variants
                        // TODO 暂时直接基于初始断点获得当前断点，后续支持动态检测容器宽度获得
                        size: "xs",
                        // TODO
                        scope: "self",
                        columns: undefined,
                        gutter: 0,
                        align: undefined,
                        justify: undefined,
                        wrap: false,
                        xs: {},
                        sm: {},
                        md: {},
                        lg: {},
                        xl: {},
                        xxl: {}
                    });
                }
            }
        ]);
        return Row;
    }(Base);
    Row.template = '\n        <div class="{{styles.row}}" style="{{rowStyle}}">\n            <slot></slot>\n        </div>\n    ';
    Row.components = {};
    Row.computed = {
        responsive: function responsive() {
            var _this = this;
            // [SAN ERROR] call get method in computed need argument
            // const data = this.data.get();
            var size = this.data.get("size");
            var columns = this.data.get("columns");
            var gutter = this.data.get("gutter");
            var align = this.data.get("align");
            var justify = this.data.get("justify");
            var wrap = this.data.get("wrap");
            var responsive1 = breakpoints.reduce(function(acc, cur) {
                acc[cur] = _this.data.get(cur) || {};
                return acc;
            }, {});
            [
                "columns",
                "gutter",
                "align",
                "justify",
                "wrap"
            ].forEach(transform$1({
                size: size,
                columns: columns,
                gutter: gutter,
                align: align,
                justify: justify,
                wrap: wrap
            }, responsive1));
            return responsive1;
        },
        current: function current() {
            var responsive = this.data.get("responsive");
            var size = this.data.get("size");
            return responsive[size];
        },
        rowStyle: function rowStyle() {
            var current = this.data.get("current");
            var rowStyle1 = {};
            if (current.gutter) {
                var marginValue = current.gutter / -2;
                Object.assign(rowStyle1, {
                    "margin-left": "".concat(marginValue, "px"),
                    "margin-right": "".concat(marginValue, "px")
                });
            }
            if (current.wrap) {
                Object.assign(rowStyle1, {
                    "flex-wrap": "wrap"
                });
            }
            if (current.justify) {
                Object.assign(rowStyle1, {
                    "justify-content": current.justify
                });
            }
            if (current.align) {
                Object.assign(rowStyle1, {
                    "align-items": current.align
                });
            }
            return rowStyle1;
        }
    };
    var Col$1 = /*#__PURE__*/ function(Base) {
        _inherits(Col$1, Base);
        var _super = _createSuper(Col$1);
        function Col$1() {
            _classCallCheck(this, Col$1);
            return _super.apply(this, arguments);
        }
        _createClass(Col$1, [
            {
                key: "initData",
                value: function initData() {
                    var _a, _b, _c;
                    return Object.assign({}, _get(_getPrototypeOf(Col$1.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.grid,
                        // props & variants
                        span: undefined,
                        xs: {},
                        sm: {},
                        md: {},
                        lg: {},
                        xl: {},
                        xxl: {},
                        // state
                        size: (_b = (_a = this.parentComponent) === null || _a === void 0 ? void 0 : _a.data.get("size")) !== null && _b !== void 0 ? _b : "xs",
                        rowCurrent: (_c = this.parentComponent) === null || _c === void 0 ? void 0 : _c.data.get("current")
                    });
                }
            }
        ]);
        return Col$1;
    }(Base);
    Col$1.template = '\n        <div class="{{styles.col}}" style="{{colStyle}}">\n            <slot></slot>\n        </div>\n    ';
    Col$1.components = {};
    Col$1.computed = {
        responsive: function responsive() {
            var _this = this;
            var size = this.data.get("size");
            var span = this.data.get("span");
            var responsive2 = breakpoints.reduce(function(acc, cur) {
                acc[cur] = _this.data.get(cur) || {};
                return acc;
            }, {});
            [
                "span"
            ].forEach(transform({
                size: size,
                span: span
            }, responsive2));
            return responsive2;
        },
        colStyle: function colStyle() {
            var span = this.data.get("span");
            var rowCurrent = this.data.get("rowCurrent");
            var colStyle1 = {};
            if (rowCurrent && rowCurrent.gutter) {
                var paddingValue = rowCurrent.gutter / 2;
                Object.assign(colStyle1, {
                    "padding-left": "".concat(paddingValue, "px"),
                    "padding-right": "".concat(paddingValue, "px")
                });
            }
            if (rowCurrent && rowCurrent.columns && span) {
                var width = +span / +rowCurrent.columns * 100;
                Object.assign(colStyle1, {
                    flex: "0 0 auto",
                    width: "".concat(width, "%")
                });
            }
            return colStyle1;
        }
    };
    /**
     * @file Grid
     * @author Sheeta(wuhayao@gmail.com)
     */ var Grid = {
        Row: Row,
        Col: Col$1
    };
    /**
     * @file Grid
     * @author Sheeta(wuhayao@gmail.com)
     */ var Col = Grid.Col;
    exports.Col = Col;
    exports["default"] = Col;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Grid/Row_c508ace7", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    var transform$1 = /**
     * @file Grid - Row
     * @author Sheeta(wuhayao@gmail.com)
     */ function transform$1(input, output) {
        var currentSize = input.size;
        return function(prop) {
            var propValue = input[prop];
            if (typeof propValue === "object") {
                for(var size in propValue){
                    if (propValue.hasOwnProperty(size)) {
                        // eslint-disable-next-line
                        output[size][prop] = propValue[size];
                    }
                }
            } else {
                // eslint-disable-next-line
                output[currentSize][prop] = propValue;
            }
        };
    };
    var transform = /**
     * @file Grid - Col
     * @author Sheeta(wuhayao@gmail.com)
     */ function transform(input, output) {
        var currentSize = input.size;
        return function(prop) {
            var propValue = input[prop];
            if (typeof propValue === "object") {
                for(var size in propValue){
                    if (propValue.hasOwnProperty(size)) {
                        // eslint-disable-next-line
                        output[size][prop] = propValue[size];
                    }
                }
            } else {
                // eslint-disable-next-line
                output[currentSize][prop] = propValue;
            }
        };
    };
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file Grid helper
     * @author Sheeta(wuhayao@gmail.com)
     */ var breakpoints = [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "xxl"
    ];
    var Row$1 = /*#__PURE__*/ function(Base) {
        _inherits(Row$1, Base);
        var _super = _createSuper(Row$1);
        function Row$1() {
            _classCallCheck(this, Row$1);
            return _super.apply(this, arguments);
        }
        _createClass(Row$1, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(Row$1.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.grid,
                        // props & variants
                        // TODO 暂时直接基于初始断点获得当前断点，后续支持动态检测容器宽度获得
                        size: "xs",
                        // TODO
                        scope: "self",
                        columns: undefined,
                        gutter: 0,
                        align: undefined,
                        justify: undefined,
                        wrap: false,
                        xs: {},
                        sm: {},
                        md: {},
                        lg: {},
                        xl: {},
                        xxl: {}
                    });
                }
            }
        ]);
        return Row$1;
    }(Base);
    Row$1.template = '\n        <div class="{{styles.row}}" style="{{rowStyle}}">\n            <slot></slot>\n        </div>\n    ';
    Row$1.components = {};
    Row$1.computed = {
        responsive: function responsive() {
            var _this = this;
            // [SAN ERROR] call get method in computed need argument
            // const data = this.data.get();
            var size = this.data.get("size");
            var columns = this.data.get("columns");
            var gutter = this.data.get("gutter");
            var align = this.data.get("align");
            var justify = this.data.get("justify");
            var wrap = this.data.get("wrap");
            var responsive1 = breakpoints.reduce(function(acc, cur) {
                acc[cur] = _this.data.get(cur) || {};
                return acc;
            }, {});
            [
                "columns",
                "gutter",
                "align",
                "justify",
                "wrap"
            ].forEach(transform$1({
                size: size,
                columns: columns,
                gutter: gutter,
                align: align,
                justify: justify,
                wrap: wrap
            }, responsive1));
            return responsive1;
        },
        current: function current() {
            var responsive = this.data.get("responsive");
            var size = this.data.get("size");
            return responsive[size];
        },
        rowStyle: function rowStyle() {
            var current = this.data.get("current");
            var rowStyle1 = {};
            if (current.gutter) {
                var marginValue = current.gutter / -2;
                Object.assign(rowStyle1, {
                    "margin-left": "".concat(marginValue, "px"),
                    "margin-right": "".concat(marginValue, "px")
                });
            }
            if (current.wrap) {
                Object.assign(rowStyle1, {
                    "flex-wrap": "wrap"
                });
            }
            if (current.justify) {
                Object.assign(rowStyle1, {
                    "justify-content": current.justify
                });
            }
            if (current.align) {
                Object.assign(rowStyle1, {
                    "align-items": current.align
                });
            }
            return rowStyle1;
        }
    };
    var Col = /*#__PURE__*/ function(Base) {
        _inherits(Col, Base);
        var _super = _createSuper(Col);
        function Col() {
            _classCallCheck(this, Col);
            return _super.apply(this, arguments);
        }
        _createClass(Col, [
            {
                key: "initData",
                value: function initData() {
                    var _a, _b, _c;
                    return Object.assign({}, _get(_getPrototypeOf(Col.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.grid,
                        // props & variants
                        span: undefined,
                        xs: {},
                        sm: {},
                        md: {},
                        lg: {},
                        xl: {},
                        xxl: {},
                        // state
                        size: (_b = (_a = this.parentComponent) === null || _a === void 0 ? void 0 : _a.data.get("size")) !== null && _b !== void 0 ? _b : "xs",
                        rowCurrent: (_c = this.parentComponent) === null || _c === void 0 ? void 0 : _c.data.get("current")
                    });
                }
            }
        ]);
        return Col;
    }(Base);
    Col.template = '\n        <div class="{{styles.col}}" style="{{colStyle}}">\n            <slot></slot>\n        </div>\n    ';
    Col.components = {};
    Col.computed = {
        responsive: function responsive() {
            var _this = this;
            var size = this.data.get("size");
            var span = this.data.get("span");
            var responsive2 = breakpoints.reduce(function(acc, cur) {
                acc[cur] = _this.data.get(cur) || {};
                return acc;
            }, {});
            [
                "span"
            ].forEach(transform({
                size: size,
                span: span
            }, responsive2));
            return responsive2;
        },
        colStyle: function colStyle() {
            var span = this.data.get("span");
            var rowCurrent = this.data.get("rowCurrent");
            var colStyle1 = {};
            if (rowCurrent && rowCurrent.gutter) {
                var paddingValue = rowCurrent.gutter / 2;
                Object.assign(colStyle1, {
                    "padding-left": "".concat(paddingValue, "px"),
                    "padding-right": "".concat(paddingValue, "px")
                });
            }
            if (rowCurrent && rowCurrent.columns && span) {
                var width = +span / +rowCurrent.columns * 100;
                Object.assign(colStyle1, {
                    flex: "0 0 auto",
                    width: "".concat(width, "%")
                });
            }
            return colStyle1;
        }
    };
    /**
     * @file Grid
     * @author Sheeta(wuhayao@gmail.com)
     */ var Grid = {
        Row: Row$1,
        Col: Col
    };
    /**
     * @file Grid - Row
     * @author Sheeta(wuhayao@gmail.com)
     */ var Row = /*#__PURE__*/ function(_Row) {
        _inherits(Row, _Row);
        var _super = _createSuper(Row);
        function Row() {
            _classCallCheck(this, Row);
            return _super.apply(this, arguments);
        }
        _createClass(Row, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(Row.prototype), "initData", this).call(this), {
                        size: "xs",
                        gutter: 8
                    });
                }
            }
        ]);
        return Row;
    }(Grid.Row);
    exports.Row = Row;
    exports["default"] = Row;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Image/Image_d1a8900c", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file action definition
     * @author Sheeta(wuhayao@gmail.com)
     */ var CLICK_IMAGE = "click:image";
    /**
     * @file Image
     * @author corcordium
     */ var Image$1 = /*#__PURE__*/ function(Base) {
        _inherits(Image$1, Base);
        var _super = _createSuper(Image$1);
        function Image$1() {
            _classCallCheck(this, Image$1);
            return _super.apply(this, arguments);
        }
        _createClass(Image$1, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(Image$1.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.image,
                        // props & variants
                        src: "",
                        alt: "",
                        width: undefined,
                        height: undefined,
                        objectFit: "fill",
                        // state
                        hasPlaceholder: !!this.sourceSlots.named.placeholder,
                        hasFallback: !!this.sourceSlots.named.fallback,
                        hasContent: !!this.sourceSlots.named.content,
                        loading: true,
                        error: false
                    });
                }
            },
            {
                key: "onLoad",
                value: function onLoad(event) {
                    this.data.set("loading", false);
                    this.data.set("error", false);
                    this.fire("load", event);
                }
            },
            {
                key: "onError",
                value: function onError(event) {
                    this.data.set("loading", false);
                    this.data.set("error", true);
                    this.fire("error", event);
                }
            },
            {
                key: "onClick",
                value: function onClick(event) {
                    this.fire("click", event);
                    var payload = {
                        event: event
                    };
                    this.eventDispatch(CLICK_IMAGE, payload);
                }
            }
        ]);
        return Image$1;
    }(Base);
    Image$1.template = '\n        <div class="{{style.image}}">\n            <div s-if="hasContent" class="{{styles.content}}">\n                <slot name="content"></slot>\n            </div>\n            <div s-if="hasPlaceholder && loading" class="{{styles.placeholder}}">\n                <slot name="placeholder"></slot>\n            </div>\n            <div s-if="hasFallback && error" class="{{styles.fallback}}">\n                <slot name="fallback"></slot>\n            </div>\n            <img\n                s-else\n                src="{{src}}"\n                alt="{{alt}}"\n                width="{{width}}"\n                height="{{height}}"\n                style="{{objectFitValue}}"\n                on-load="onLoad"\n                on-error="onError"\n                on-click="onClick"\n            />\n        </div>\n    ';
    Image$1.components = {};
    Image$1.computed = {
        objectFitValue: function objectFitValue() {
            var prefix = "object-fit:";
            var val = this.data.get("objectFit");
            var fitList = [
                "fill",
                "contain",
                "cover",
                "none",
                "scale-down"
            ];
            if (val && fitList.indexOf(val) !== -1) {
                return "".concat(prefix).concat(val, ";");
            }
            return "";
        }
    };
    var Image = /*#__PURE__*/ function(_Component) {
        _inherits(Image, _Component);
        var _super = _createSuper(Image);
        function Image() {
            _classCallCheck(this, Image);
            return _super.apply(this, arguments);
        }
        _createClass(Image, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        styles: cosmicUiSearch.image,
                        src: "",
                        alt: "",
                        maskType: "around",
                        bottomText: "",
                        defaultImage: "https://m.baidu.com/se/static/atom/search-ui/Image/asset/default.svg",
                        ltProps: null,
                        centerProps: null,
                        lbProps: null,
                        rbProps: null
                    };
                }
            },
            {
                key: "handleLoad",
                value: function handleLoad(event) {
                    this.fire("load", event);
                }
            },
            {
                key: "handleError",
                value: function handleError(event) {
                    this.fire("error", event);
                }
            }
        ]);
        return Image;
    }(san.Component);
    Image.template = '\n        <cc-image\n            src="{{src}}"\n            alt="{{alt}}"\n            class="sc-image {{styles.image}}"\n            style="{{defaultStyle}}"\n            on-load="handleLoad"\n            on-error="handleError"\n        >\n            <div slot="content">\n                <span class="border"></span>\n                <template s-if="maskType">\n                    <div\n                        s-if="maskType === \'info\'"\n                        class="{{styles.infoMask}}">\n                    </div>\n                    <div\n                        s-else\n                        class="{{styles.aroundMask}}">\n                    </div>\n                </template>\n                <div\n                    s-if="bottomText"\n                    class="{{styles.bottomText}}">\n                    {{ bottomText }}\n                </div>\n                <div\n                    s-if="lbProps"\n                    class="{{styles.lbLabel}}">\n                    <span s-if="lbProps.type === \'text\'">{{lbProps.text}}</span>\n                    <div s-else class="{{styles.pill}}">\n                        <i\n                            s-if="lbProps.iconProps"\n                            style="color: {{lbProps.iconProps.color}}">\n                            {{lbProps.iconProps.code}}\n                        </i>\n                        <span class="{{styles.lbText}}">{{lbProps.text}}</span>\n                    </div>\n                </div>\n                <div\n                    s-if="rbProps"\n                    class="{{styles.rbLabel}}">\n                    {{rbProps.text}}\n                </div>\n                <div s-if="ltProps" class="{{styles.ltLabel}}">\n                    <i\n                        s-if="ltProps.iconProps"\n                        style="color: {{ltProps.iconProps.color}}"\n                        >\n                        {{ltProps.iconProps.code}}\n                    </i>\n                    <span class="{{styles.ltText}}">{{ltProps.text}}</span>\n                </div>\n                <div\n                    s-if="centerProps"\n                    class="{{styles.center}}">\n                    <i\n                        class="c-icon {{styles.centerIcon}}"\n                        style="color: {{centerProps.iconProps.color}}"\n                        >\n                        {{centerProps.iconProps.code}}\n                    </i>\n                </div>\n            </div>\n        </cc-image>\n    ';
    Image.components = {
        "cc-image": Image$1
    };
    Image.computed = {
        defaultStyle: function defaultStyle() {
            var defaultImage = this.data.get("defaultImage");
            return "background: url(".concat(defaultImage, ") center center no-repeat #f7f7f7;");
        }
    };
    exports.Image = Image;
    exports["default"] = Image;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Link/Link_9248cf7c", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file action definition
     * @author Sheeta(wuhayao@gmail.com)
     */ var CLICK_LINK = "click:link";
    var BaseLink = /*#__PURE__*/ function(Base) {
        _inherits(BaseLink, Base);
        var _super = _createSuper(BaseLink);
        function BaseLink() {
            _classCallCheck(this, BaseLink);
            return _super.apply(this, arguments);
        }
        _createClass(BaseLink, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(BaseLink.prototype), "initData", this).call(this), {
                        styles: cosmicUiSearch.link,
                        url: "",
                        preventDefault: false,
                        params: {}
                    });
                }
            },
            {
                key: "onClick",
                value: function onClick(event) {
                    this.fire("click", event);
                    var payload = {
                        event: event
                    };
                    this.eventDispatch(CLICK_LINK, payload);
                }
            }
        ]);
        return BaseLink;
    }(Base);
    var Link = /*#__PURE__*/ function(BaseLink) {
        _inherits(Link, BaseLink);
        var _super = _createSuper(Link);
        function Link() {
            _classCallCheck(this, Link);
            return _super.apply(this, arguments);
        }
        _createClass(Link, [
            {
                key: "click",
                value: function click(e) {
                    this.onClick(e);
                    if (this.data.get("preventDefault")) {
                        e.preventDefault();
                    }
                }
            }
        ]);
        return Link;
    }(BaseLink);
    Link.template = '\n        <component\n            s-is="{{url ? \'a\' : \'div\'}}"\n            class="{{styles.link}}"\n            href="{{url || \'\'}}"\n            s-bind="nativeAttributes"\n            on-click="click"\n        >\n            <slot></slot>\n        </component>\n    ';
    // import invokeLink from './invoke';
    var PROPS_MAP = {
        sfUrl: "data-sf-href",
        originUrl: "data-url",
        log: "data-log",
        clickData: "data-click",
        tcRedirect: "data-tc-redirect",
        rtDisable: "rt-disable",
        fastUrl: "origin-url",
        noreferrer: "rel"
    };
    var WiseLink = /*#__PURE__*/ function(_Component) {
        _inherits(WiseLink, _Component);
        var _super = _createSuper(WiseLink);
        function WiseLink() {
            _classCallCheck(this, WiseLink);
            return _super.apply(this, arguments);
        }
        _createClass(WiseLink, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        url: "",
                        visited: false,
                        params: {},
                        styles: cosmicUiSearch.link
                    };
                }
            },
            {
                key: "click",
                value: function click(e) {
                    this.fire("click", e);
                // const params = this.data.get('params');
                // invokeLink(e, params);
                }
            }
        ]);
        return WiseLink;
    }(san.Component);
    WiseLink.template = '\n        <cc-link\n            styles="{{assignStyle}}"\n            url="{{jumpUrl}}"\n            native-attributes="{{processParam}}"\n            on-click="click"\n        >\n            <slot></slot>\n        </cc-link>\n    ';
    WiseLink.components = {
        "cc-link": Link
    };
    WiseLink.computed = {
        processParam: function processParam() {
            var param = this.data.get("params");
            var visited = this.data.get("visited");
            var newParam = {};
            for(var prop in param){
                if (PROPS_MAP[prop]) {
                    newParam[PROPS_MAP[prop]] = param[prop];
                }
            }
            if (!visited) {
                newParam["data-visited"] = "off";
            }
            if (param.sfUrl && param.options) {
                newParam["data-sf-options"] = param.options;
            }
            if (param.type === "xcx" && param.options) {
                newParam["data-xcx"] = JSON.stringify(param.options);
            } else if (param.type === "na") {
                if (param.busiParams) {
                    newParam["data-busi"] = JSON.stringify(param.busiParams);
                }
                if (param.options) {
                    newParam["data-light"] = JSON.stringify(param.options);
                }
            } else if (param.type === "easybrowse" && param.options) {
                newParam["data-light"] = JSON.stringify(param.options);
            }
            newParam["target"] = "_self";
            return newParam;
        },
        jumpUrl: function jumpUrl() {
            var url = this.data.get("url");
            var param = this.data.get("params");
            return param.tcUrl || url;
        },
        assignStyle: function assignStyle() {
            var style = this.data.get("styles");
            var param = this.data.get("params");
            var className = [];
            if (this.data.get("jumpUrl")) {
                className.push("c-blocka");
            }
            if (param.type === "sf") {
                className.push("WA_LOG_SF");
            } else if (param.type === "xcx") {
                className.push("WA_LOG_XCX");
            } else if (param.type === "na") {
                className.push("WA_LOG_NA");
            } else if (param.type === "easybrowse") {
                className.push("WA_LOG_LIGHT");
            }
            return Object.assign(Object.assign({}, style), {
                link: style.link + " ".concat(className.join(" "))
            });
        }
    };
    exports.Link = WiseLink;
    exports["default"] = WiseLink;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Link/TouchableFeedback_60ed6037", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file action definition
     * @author Sheeta(wuhayao@gmail.com)
     */ var CLICK_LINK = "click:link";
    var BaseLink = /*#__PURE__*/ function(Base) {
        _inherits(BaseLink, Base);
        var _super = _createSuper(BaseLink);
        function BaseLink() {
            _classCallCheck(this, BaseLink);
            return _super.apply(this, arguments);
        }
        _createClass(BaseLink, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(BaseLink.prototype), "initData", this).call(this), {
                        styles: cosmicUiSearch.link,
                        url: "",
                        preventDefault: false,
                        params: {}
                    });
                }
            },
            {
                key: "onClick",
                value: function onClick(event) {
                    this.fire("click", event);
                    var payload = {
                        event: event
                    };
                    this.eventDispatch(CLICK_LINK, payload);
                }
            }
        ]);
        return BaseLink;
    }(Base);
    var Link = /*#__PURE__*/ function(BaseLink) {
        _inherits(Link, BaseLink);
        var _super = _createSuper(Link);
        function Link() {
            _classCallCheck(this, Link);
            return _super.apply(this, arguments);
        }
        _createClass(Link, [
            {
                key: "click",
                value: function click(e) {
                    this.onClick(e);
                    if (this.data.get("preventDefault")) {
                        e.preventDefault();
                    }
                }
            }
        ]);
        return Link;
    }(BaseLink);
    Link.template = '\n        <component\n            s-is="{{url ? \'a\' : \'div\'}}"\n            class="{{styles.link}}"\n            href="{{url || \'\'}}"\n            s-bind="nativeAttributes"\n            on-click="click"\n        >\n            <slot></slot>\n        </component>\n    ';
    var PROPS_MAP = {
        sfUrl: "rl-link-data-sf-href",
        originUrl: "rl-link-data-url",
        log: "rl-link-data-log",
        clickData: "rl-link-data-click",
        tcRedirect: "rl-link-data-tc-redirect",
        rtDisable: "rl-link-rt-disable",
        fastUrl: "rl-link-origin-url"
    };
    var TouchableFeedback = /*#__PURE__*/ function(_Component) {
        _inherits(TouchableFeedback, _Component);
        var _super = _createSuper(TouchableFeedback);
        function TouchableFeedback() {
            _classCallCheck(this, TouchableFeedback);
            return _super.apply(this, arguments);
        }
        _createClass(TouchableFeedback, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        borderRadius: 0,
                        backgroundColor: "rgba(0, 0, 0, .05)",
                        isJump: false,
                        expand: false,
                        self: true,
                        url: "",
                        urlParams: {},
                        adParams: {},
                        styles: {
                            touchableFeedback: cosmicUiSearch.touchableFeedback,
                            link: cosmicUiSearch.link
                        }
                    };
                }
            },
            {
                key: "click",
                value: function click(e) {
                    this.fire("click", e);
                    var adParam = this.data.get("adParams");
                    if (adParam && adParam.adType && adParam.adType !== "0") {
                        // this.root.fire('clickAdsAladdin', adParam);
                        if (!adParam.forceJump) {
                            e.stopPropagation();
                        }
                    }
                }
            }
        ]);
        return TouchableFeedback;
    }(san.Component);
    TouchableFeedback.template = '\n        <cc-link\n            styles="{{assignStyle}}"\n            native-attributes="{{processParam}}"\n            on-click="click"\n        >\n            <template s-if="!expand">\n                <slot></slot>\n            </template>\n            <div s-else class="c-touchable-feedback-content">\n                <slot></slot>\n            </div>\n            <div\n                s-if="expand"\n                style="\n                    top: {{top}}rem;\n                    right: {{right}}rem;\n                    bottom: {{bottom}}rem;\n                    left: {{left}}rem;\n                "\n                class="c-touchable-feedbacl-expand"\n            ></div>\n        </cc-link>\n    ';
    TouchableFeedback.components = {
        "cc-link": Link
    };
    TouchableFeedback.computed = {
        processParam: function processParam() {
            var param = this.data.get("urlParams");
            var adParam = this.data.get("adParams");
            var newParam = {};
            for(var prop in param){
                if (PROPS_MAP[prop]) {
                    newParam[PROPS_MAP[prop]] = param[prop];
                }
            }
            newParam["rl-node"] = "";
            newParam["rl-highlight-position"] = "\n                ".concat(this.data.get("top"), "rem,\n                ").concat(this.data.get("right"), "rem,\n                ").concat(this.data.get("bottom"), "rem,\n                ").concat(this.data.get("left"), "rem\n            ");
            newParam["rl-highlight-color"] = this.data.get("backgroundColor");
            newParam["rl-highlight-radius"] = this.data.get("borderRadius");
            newParam["rl-link-href"] = this.data.get("jumpUrl");
            if (param.sfUrl && param.options) {
                newParam["rl-link-data-sf-options"] = param.options;
            }
            if (this.data.get("jumpUrl")) {
                newParam["data-aftclk"] = "";
            }
            if (!this.data.get("isJump")) {
                newParam["rl-type"] = "button";
            }
            if (this.data.get("self")) {
                newParam["rl-highlight-self"] = "";
            }
            if (adParam && adParam.isXcx && adParam.xcxParams && adParam.xcxParams.xcx_appkey) {
                newParam["data-xcx-prefetch"] = JSON.stringify([
                    adParam.xcxParams.xcx_appkey
                ]);
            }
            if (param.ivkParams && param.ivkParams.control) {
                newParam["rl-link-data-ivk"] = JSON.stringify(param.ivkParams);
            }
            if (param.type === "xcx" && param.options) {
                newParam["rl-link-data-xcx"] = JSON.stringify(param.options);
            } else if (param.type === "na") {
                if (param.busiParams) {
                    newParam["rl-link-data-busi"] = JSON.stringify(param.busiParams);
                }
                if (param.options) {
                    newParam["rl-link-data-light"] = JSON.stringify(param.options);
                }
            } else if (param.type === "easybrowse" && param.options) {
                newParam["rl-link-data-light"] = JSON.stringify(param.options);
            }
            return newParam;
        },
        jumpUrl: function jumpUrl() {
            var url = this.data.get("url");
            var param = this.data.get("urlParams");
            return param.tcUrl || url;
        },
        assignStyle: function assignStyle() {
            var styles = this.data.get("styles");
            var param = this.data.get("urlParams");
            var className = [
                "c-touchable-feedback",
                "c-touchable-feedback-no-default"
            ];
            if (param.type === "sf") {
                className.push("WA_LOG_SF");
            } else if (param.type === "xcx") {
                className.push("WA_LOG_XCX");
            } else if (param.type === "na") {
                className.push("WA_LOG_NA");
            } else if (param.type === "easybrowse") {
                className.push("WA_LOG_LIGHT");
            } else if (param.type === "tel") {
                className.push("WA_LOG_OTHER");
            }
            return Object.assign(Object.assign({}, styles), {
                link: styles.link + " ".concat(className.join(" "))
            });
        }
    };
    exports.TouchableFeedback = TouchableFeedback;
    exports["default"] = TouchableFeedback;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Link/TouchableStop_9184cdfc", [
    "exports",
    "san"
], function(exports, san) {
    "use strict";
    var TouchableStop = /*#__PURE__*/ function(_Component) {
        _inherits(TouchableStop, _Component);
        var _super = _createSuper(TouchableStop);
        function TouchableStop() {
            _classCallCheck(this, TouchableStop);
            return _super.apply(this, arguments);
        }
        _createClass(TouchableStop, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        open: true
                    };
                }
            }
        ]);
        return TouchableStop;
    }(san.Component);
    TouchableStop.template = '\n        <div s-bind="params">\n            <slot></slot>\n        </div>\n    ';
    TouchableStop.computed = {
        params: function params() {
            var open = this.data.get("open");
            var param = {};
            if (open) {
                param["rl-type"] = "stop";
            }
            return param;
        }
    };
    exports.TouchableStop = TouchableStop;
    exports["default"] = TouchableStop;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Scroll/Scroll_f2334553", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    /**
     * @file Base Component
     * @author Sheeta(wuhayao@gmail.com)
     */ var Base = /*#__PURE__*/ function(_Component) {
        _inherits(Base, _Component);
        var _super = _createSuper(Base);
        function Base() {
            _classCallCheck(this, Base);
            return _super.apply(this, arguments);
        }
        _createClass(Base, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        nativeAttributes: {},
                        styles: {}
                    };
                }
            },
            {
                /**
         * 使用 san 消息机制派发事件
         *
         * @override 不改写框架的 dispatch 方法，只是通过覆写 san 的消息派发方法，引入类型校验的能力
         * @param action 名称
         * @param payload 参数
         */ key: "dispatch",
                value: function dispatch(action, payload) {
                    _get(_getPrototypeOf(Base.prototype), "dispatch", this).call(this, action, payload);
                }
            },
            {
                /**
         * 使用 san-store 进行状态管理时的派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "storeDispatch",
                value: function storeDispatch(action, payload) {
                    var _a;
                    (_a = this.store) === null || _a === void 0 ? void 0 : _a.dispatch(action, payload);
                }
            },
            {
                /**
         * 根据派发模式派发事件
         *
         * @param action 名称
         * @param payload 参数
         */ key: "eventDispatch",
                value: function eventDispatch(action, payload) {
                    if (Base.dispatchMode === "message") {
                        this.dispatch(action, payload);
                    } else if (Base.dispatchMode === "store") {
                        this.storeDispatch(action, payload);
                    }
                }
            }
        ]);
        return Base;
    }(san.Component);
    Base.trimWhitespace = "all";
    // 初始化事件派发模式
    Base.dispatchMode = "message";
    /**
     * @file Image
     * @author corcordium
     */ var List = /*#__PURE__*/ function(Base) {
        _inherits(List, Base);
        var _super = _createSuper(List);
        function List() {
            _classCallCheck(this, List);
            return _super.apply(this, arguments);
        }
        _createClass(List, [
            {
                key: "initData",
                value: function initData() {
                    return Object.assign({}, _get(_getPrototypeOf(List.prototype), "initData", this).call(this), {
                        // base props
                        styles: cosmicUiSearch.list,
                        // props & variants
                        scroll: true,
                        direction: "y",
                        // state
                        hasLoadMore: !!this.sourceSlots.named.loadMore
                    });
                }
            },
            {
                key: "onScoll",
                value: function onScoll(event) {
                    this.fire("scroll", event);
                }
            }
        ]);
        return List;
    }(Base);
    List.template = '\n        <div class="{{styles[\'list-wrap\']}}">\n            <div\n                class="{{[styles.list, scroll ? styles[direction] : \'\']}}"\n                on-scroll="onScoll">\n                <slot></slot>\n            </div>\n            <div s-if="hasLoadMore" class="{{styles.loadMore}}">\n                <slot name="loadMore"></slot>\n            </div>\n        </div>\n    ';
    var Scroll = /*#__PURE__*/ function(_Component) {
        _inherits(Scroll, _Component);
        var _super = _createSuper(Scroll);
        function Scroll() {
            _classCallCheck(this, Scroll);
            return _super.apply(this, arguments);
        }
        _createClass(Scroll, [
            {
                key: "initData",
                value: function initData() {
                    return {
                        styles: cosmicUiSearch.scroll,
                        rate: 95 / 1116 * 100,
                        gapRight: 24 / 95 * 100,
                        list: null
                    };
                }
            }
        ]);
        return Scroll;
    }(san.Component);
    Scroll.template = '\n        <cc-list class="cu-row-wide">\n            <div class="{{styles.scrollTouch}}">\n                <div class="{{styles.scrollInner}}" style="width:{{width}}%;">\n                    <slot></slot>\n                </div>\n            </div>\n        </cc-list>\n    ';
    Scroll.components = {
        "cc-list": List
    };
    Scroll.computed = {
        width: function width() {
            var rate = this.data.get("rate");
            var list = this.data.get("list");
            var width1 = 0;
            list.forEach(function(item) {
                width1 += item.col * rate;
            });
            return width1;
        },
        gap: function gap() {
            var gapRight = this.data.get("gapRight");
            var list = this.data.get("list");
            var allCols = 0;
            list.forEach(function(item) {
                allCols += +item.col;
            });
            return gapRight / allCols + "%";
        }
    };
    exports["default"] = Scroll;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
define("@baidu/search-components/Scroll/ScrollItem_133005bd", [
    "exports",
    "san",
    "@baidu/cosmic-ui-search"
], function(exports, san, cosmicUiSearch) {
    "use strict";
    var ScrollItem = /*#__PURE__*/ function(_Component) {
        _inherits(ScrollItem, _Component);
        var _super = _createSuper(ScrollItem);
        function ScrollItem() {
            _classCallCheck(this, ScrollItem);
            return _super.apply(this, arguments);
        }
        _createClass(ScrollItem, [
            {
                key: "initData",
                value: function initData() {
                    var _a, _b, _c, _d, _e, _f;
                    return {
                        styles: cosmicUiSearch.scroll,
                        col: 0,
                        listWidth: (_b = (_a = this.parentComponent) === null || _a === void 0 ? void 0 : _a.parentComponent) === null || _b === void 0 ? void 0 : _b.data.get("width"),
                        rate: (_d = (_c = this.parentComponent) === null || _c === void 0 ? void 0 : _c.parentComponent) === null || _d === void 0 ? void 0 : _d.data.get("rate"),
                        gap: (_f = (_e = this.parentComponent) === null || _e === void 0 ? void 0 : _e.parentComponent) === null || _f === void 0 ? void 0 : _f.data.get("gap")
                    };
                }
            }
        ]);
        return ScrollItem;
    }(san.Component);
    ScrollItem.template = '\n        <div\n            class="{{styles.scrollItem}}"\n            data-scroll-col="{{ col }}"\n            s-ref="scroll-item"\n            style="width: {{itemWidth}};padding-right: {{gap}}">\n            <slot></slot>\n        </div>\n    ';
    ScrollItem.components = {};
    ScrollItem.computed = {
        itemWidth: function itemWidth() {
            var listWidth = this.data.get("listWidth");
            var rate = this.data.get("rate");
            var col = this.data.get("col");
            var itemWidth1 = col * rate / listWidth * 100 + "%";
            return itemWidth1;
        }
    };
    exports["default"] = ScrollItem;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
