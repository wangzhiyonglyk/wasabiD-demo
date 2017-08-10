webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by zhiyongwang on 2016-06-08.
 * 将独立于项目的公共函数分享出来
 *
 */

var paramFormat = __webpack_require__(293);

var baseUtil = {};

/// 获取地址栏参数的值
baseUtil.GetArgsFromHref = function (sHref, sArgName) {
    /// <summary>
    /// 获取地址栏参数的值
    /// </summary>
    /// <param name="sHref" type="string">url地址，</param>
    /// <param name="iwidth" type="int">参数名称</param>
    var args = sHref.toString().split("?");
    var retval = "";
    if (args[0] == sHref) /*参数为空*/{
            return retval;
            /*无需做任何处理*/
        }
    var str = args[1];
    args = str.toString().split("&");
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.toString().split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == sArgName) retval = arg[1];
    }
    return retval;
};

//判断浏览器类型
baseUtil.BrowserType = function () {
    var browserType = "";
    var userAgent = navigator.userAgent.toLowerCase(); //取得浏览器的userAgent字符串
    if (userAgent.indexOf("opera") > -1) {
        //判断是否Opera浏览器
        browserType = "Opera";
    } else if (userAgent.indexOf("opr") > -1) {
        //新版本是这个
        browserType = "Opera";
    } else if (userAgent.indexOf("firefox") > -1) {
        //判断是否Firefox浏览器
        browserType = "Firefox";
    } else if (userAgent.indexOf("chrome") > -1) {
        //先判断是否Chrome浏览器
        browserType = "Chrome";
    } else if (userAgent.indexOf("safari") > -1) {
        //判断是否Safari浏览器
        browserType = "Safari";
    } else if (/msie|trident/.test(userAgent)) {
        ////判断是否IE浏览器
        browserType = IEType();
    }

    return browserType;
};
//判断IE类型
baseUtil.IEType = function () {
    if (navigator.userAgent.indexOf("MSIE 6.") > -1) {
        return "IE 6";
    } else if (navigator.userAgent.indexOf("MSIE 7.") > -1) {
        return "IE 7";
    } else if (navigator.userAgent.indexOf("MSIE 8.") > -1) {
        return "IE 8";
    } else if (navigator.userAgent.indexOf("MSIE 9.") > -1) {
        return "IE 9";
    } else if (navigator.userAgent.indexOf("MSIE 10.") > -1) {
        return "IE 10";
    } else if (navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        return "IE 11";
    }
};

//判断是否 iPhone / iPod /iPad
baseUtil.is_ios = function () {
    /// <summary>
    /// 判断是否 iPhone / iPod /iPad
    /// </summary>
    if (navigator.userAgent.match(/iPhone|iPod|iPad/i)) {
        //alert('true');
        // 判断系统版本号是否大于 7
        return Boolean(navigator.userAgent.match(/OS [7-9]_\d[_\d]* like Mac OS X/i));
    } else {
        //alert('false');
        return false;
    }
};
//将数字转为英文表达格式
baseUtil.dealNumToEnglishFormat = function (num) {
    /// <summary>
    /// 将数字转为英文表达格式
    /// </summary>
    /// <param name="num" type="int">数字</param>
    if (isNaN(num)) {
        return num;
    }

    var number = num.toString();
    return number.split('').reverse().join('').replace(/(.{3})/g, '$1,').split('').reverse().join('').replace(/^,/, "");
};

// 日期格式化为字符串
baseUtil.dateformat = function (date, format) {
    /// <summary>
    /// 日期格式化为字符串
    /// </summary>
    /// <param name="date" type="date">日期</param>
    /// <param name="format" type="string">格式化字符串，"yyyy-MM-dd hh:mm:ss","yyyy-MM-dd"</param>
    if (date instanceof Date) {} else {
        //日期格式错误
        return null;
    }

    var isToday = false;

    //上一个人写的 
    // if (date.toLocaleDateString() == new Date().toLocaleDateString()) {
    //     isToday = true;
    //     date = new Date();
    // }
    //
    // var o = {
    //     "M+": date.getMonth() + 1, //month
    //     "d+": date.getDate(), //day
    //     "h+": isToday ? date.getHours() : 23, //hour
    //     "m+": isToday ? date.getMinutes() : 59, //minute
    //     "s+": isToday ? date.getSeconds() : 59, //second
    //     "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    //     "S": date.getMilliseconds() //millisecond
    // };


    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

baseUtil.log = function (text) {
    console.log(text);
};

//判断手机类型
baseUtil.phoneType = function () {
    /// <summary>
    /// 判断手机类型
    /// </summary>
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        return "iphone";
    } else if (isAndroid) {
        return "android";
    } else {
        return "undefined";
    }
};

/// 字符转日期
baseUtil.stringToDate = function (strDate) {
    /// <summary>
    /// 字符转日期
    /// </summary>
    /// <param name="strDate" type="string">日期字符格式</param>
    var date = new Date(Date.parse(strDate.replace(/-/g, "/"))); //转换成Date();
    return date;
};

baseUtil.cookies = {
    /// <summary>
    /// cookies设置
    /// </summary>
    set: function set(key, val) {
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + val + ";path=/;expires=" + exp.toGMTString();
    },
    get: function get(key) {
        var arr,
            reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return arr[2];else return null;
    },
    del: function del(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.get(key);
        if (cval != null) document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
    }
    /// 除去两端窗口
};baseUtil.trim = function (str) {
    /// <summary>
    /// 除去两端窗口
    /// </summary>
    /// <param name="str" type="string">str</param>
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

/*
 *ie兼容placeholder
 */
baseUtil.placeHolderIE8 = function () {
    if (!("placeholder" in document.createElement("input"))) {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            var curInput = inputs[i];
            var placeholder = curInput.getAttribute("placeholder");
            if (curInput.getAttribute("type") != "text" || baseUtil.trim(placeholder) == "") return;

            curInput.value = placeholder;

            curInput.onfocus = function () {
                if (this.value = placeholder) {
                    this.value = "";
                }
            };

            curInput.onblur = function () {
                if (baseUtil.trim(this.value) == "") {
                    this.value = placeholder;
                }
            };
        }
    }
};
//向后台请求数据
baseUtil.fetch = {
    /// <summary>
    /// 向后台请求数据
    /// </summary>
    get: function get(fetchmodel) {
        var _this = this;

        fetch(fetchmodel.url, {
            method: "GET"
        }).then(function (res) {
            if (res.ok) {
                try {
                    res.json().then(function (result) {
                        result = _this.formatResult(result); //如果是心怡科技旧系统,数据转为标准格式
                        if (result.success) {
                            fetchmodel.success && fetchmodel.success(result);
                        } else {

                            if (fetchmodel.error) {
                                fetchmodel.error(result.errorCode, result.message, result);
                            } else {
                                console.log("fetch-error", result.errorCode, result.message);
                                baseUtil.showError(baseUtil.Error.HandlerError + ",错误原因：" + result.message);
                            }
                        }
                    });
                } catch (e) {
                    baseUtil.showError(e.message);
                }
            } else {
                if (fetchmodel.error) {
                    fetchmodel.error("002", baseUtil.Error.ServiceError);
                } else {

                    baseUtil.showError(baseUtil.Error.ServiceError);
                }
            }
        }).catch(function (e) {
            if (fetchmodel.error) {
                fetchmodel.error("001", baseUtil.Error.HttpError + e.message);
            } else {

                baseUtil.showError(baseUtil.Error.HttpError + e.message);
            }
        });
    },
    post: function post(fetchmodel) {
        var _this2 = this;

        fetchmodel = this.formatModel(fetchmodel); //如果是心怡科技旧系统,将参数转义

        fetch(fetchmodel.url, {
            method: "POST",
            headers: {
                "Content-Type": fetchmodel.contentType
            },
            body: this.setParams(fetchmodel.params) //参数标准化
        }).then(function (res) {
            if (res.ok) {
                try {
                    res.json().then(function (result) {
                        result = _this2.formatResult(result); //如果是心怡科技旧系统,数据转为标准格式
                        if (result.success) {
                            fetchmodel.success && fetchmodel.success(result);
                        } else {
                            if (fetchmodel.error) {
                                fetchmodel.error(result.errorCode, result.message, result);
                            } else {
                                console.log("fetch-error", result.errorCode, result.message);
                                baseUtil.showError(baseUtil.Error.HandlerError + ",错误原因：" + result.message);
                            }
                        }
                    });
                } catch (e) {
                    baseUtil.showError(e.message);
                }
            } else {
                if (fetchmodel.error) {
                    fetchmodel.error("002", baseUtil.Error.ServiceError);
                } else {
                    baseUtil.showError(baseUtil.Error.ServiceError);
                }
            }
        }).catch(function (e) {
            if (fetchmodel.error) {
                fetchmodel.error("001", baseUtil.Error.HttpError + e.message);
            } else {
                baseUtil.showError(baseUtil.Error.HttpError + e.message);
            }
        });
    },
    setParams: function setParams(params) {
        //是否是心怡科技的旧系统,如果是则将参数转字符串
        var isalog = window.localStorage.getItem("wasabi-alog");
        if (isalog) {
            //是
            return params ? JSON.stringify(params) : ""; //转为字符串
        } else {
            return paramFormat(params); //标准化
        }
        return "";
    },
    formatModel: function formatModel(fetchModel) {
        //是否是心怡科技的旧系统,如果是则对contentType进行处理
        var isalog = window.localStorage.getItem("wasabi-alog");
        if (isalog) {
            //是

            fetchModel.contentType = "application/json;charset=UTF-8";
            return fetchModel;
        } else {
            return fetchModel;
        }
    },
    formatResult: function formatResult(result) {
        //是否是心怡科技的旧系统,如果是则将后端数据转为标准格式,否则直接返回
        var isalog = window.localStorage.getItem("wasabi-alog");
        var newResult;
        if (isalog) {
            //是
            newResult = {
                success: false,
                data: null, //数据,
                total: 0, //总记录数
                message: "",
                errorCode: "", //错误处理,不需要复制,因为fetch中已经处理了.
                footer: null
            }; //标准格式
            if (result.data) {
                //存在data
                if (result.success != null && result.success != undefined) {
                    newResult.success = result.success;
                } else {
                    throw "后台返回json数据中必须有success属性";
                }
                if (result.errCode) {
                    newResult.errorCode = result.errCode;
                }
                if (result.message) {
                    newResult.message = result.message;
                }
                if (result.data.data) {
                    //分页
                    newResult.data = result.data.data;
                    if (result.data.total) {
                        //分页
                        newResult.total = result.data.total;
                    }
                    if (result.data.footer) {
                        //分页
                        newResult.footer = result.data.footer;
                    }
                } else {
                    //可能是不分页查询,可能是实体查询
                    newResult.data = result.data;

                    if (result.total) {
                        newResult.total = result.total;
                    } else {
                        if (newResult.data instanceof Array) {
                            //是数组,不分页查询,否则是实体查询
                            newResult.total = newResult.data.length;
                        } else {//实体查询,不处理total

                        }
                    }
                    if (result.footer) {
                        newResult.footer = result.footer;
                    }
                }
            } else {
                //如果连data都不存在,直接为result;
                newResult = result;
            }
        } else {
            //不是心怡科技的旧系统,直接返回
            if (result.success != null && result.success != undefined) {} else {
                throw "后台返回json数据中必须有success属性";
            }
            newResult = result;
        }
        return newResult;
    }
};

baseUtil.showError = function (msg) {
    if (!!document.getElementById("alog-error")) {
        //存在
        var child = document.getElementById("alog-error");
        document.body.removeChild(child);
    }
    var error = document.createElement("div");
    error.id = "alog-error";
    error.title = "";
    error.style.position = "absolute";
    error.style.zIndex = 9;
    error.innerHTML = '<div class="wasabi-message error"   >' + '<div class="notice">' + msg + '</div>' + ' </div>';
    error.onmousemove = onMouseOver;
    error.onmouseout = onMosueOut;
    document.body.appendChild(error);
    timeoutHandler(); //开始执行
    function onMosueOut() {
        var child = document.getElementById("alog-error");
        child.title = "";
        timeoutHandler();
    }
    function onMouseOver() {
        var child = document.getElementById("alog-error");
        child.title = "0";
        child.style.opacity = 1;
    }

    function timeoutHandler() {
        setTimeout(function () {
            var child = document.getElementById("alog-error");

            if (child && child.title == "") {
                child.style.opacity = 0.7;
                child.style.transition = "opacity 2s";
            }
        }, 1000);
        setTimeout(function () {
            var child = document.getElementById("alog-error");
            if (child && child.title == "") {

                document.body.removeChild(child);
            }
        }, 4000);
    }
};
/// 把对象复制,返回
baseUtil.clone = function (obj) {
    /// <summary>
    /// 把对象复制,返回
    /// </summary>
    /// <param name="obj" type="object">源对象</param>
    var o;
    switch (typeof obj === "undefined" ? "undefined" : _typeof(obj)) {
        case 'undefined':
            break;
        case 'string':
            o = obj + '';break;
        case 'number':
            o = obj - 0;break;
        case 'boolean':
            o = obj;break;

        case 'object':

            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {

                    o = [];
                    //o= obj.slice(0)， 注意了这里不能直接使用这个复制，如果数组中的元素为对象，复制是不成功的
                    for (var i = 0; i < obj.length; i++) {
                        o.push(baseUtil.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = baseUtil.clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;break;
    }
    return o;
};
//获取真正的数据源
baseUtil.getSource = function (data, source) {
    /// <summary>
    /// 获取真正的数据源
    /// </summary>
    /// <param name="Data" type="object">Data</param>
    /// <param name="source" type="string">source</param>
    var sourceArr = new Array();
    var returnData = data;

    if (source.indexOf(".") > -1) {
        sourceArr = source.split(".");
    } else {
        sourceArr.push(source);
    }
    var i = 0;
    try {
        while (i < sourceArr.length) {
            returnData = returnData[sourceArr[i]];
            if (returnData == null) {
                return null; //直接返回
            }
            i++;
        }
    } catch (e) {
        return null;
    }

    return returnData;
};
//判断是否空对象
baseUtil.isEmptyObject = function (obj) {
    var isempty = true;
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
        for (var o in obj) {
            isempty = false;
        }
    }
    return isempty;
};

//错误信息
baseUtil.Error = {
    HttpError: "错误代码:001,网络地址无法请求",
    ServiceError: "错误代码:002,后台服务器响应失败",
    HandlerError: "后台业务程序处理错误"
};
var base64 = __webpack_require__(290);
baseUtil.base64 = base64;
var md5 = __webpack_require__(292);
baseUtil.md5 = md5;

module.exports = baseUtil;

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/8/28.
 * desc :使用Immutable来优化组件的更新
 */
var React = __webpack_require__(1);
var Immutable = __webpack_require__(164);

var shouldComponentUpdate = {
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return this.deepCompare(this, nextProps, nextState);
    },

    deepCompare: function deepCompare(instance, nextProps, nextState) {
        return !Immutable.is(instance.props, nextProps) || !Immutable.is(instance.state, nextState);
    }
};

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 create by wangzy
 date:2016-04-05后开始独立改造
 desc:按钮组件,从linkbutton独立出来

 */
__webpack_require__(143);
var React = __webpack_require__(1);
var addRipple = __webpack_require__(58);
var Button = React.createClass({
    displayName: "Button",

    mixins: [addRipple],
    propTypes: {
        name: React.PropTypes.string, //按钮名称
        title: React.PropTypes.string, //按钮标题
        tip: React.PropTypes.string, //按钮提示信息
        theme: React.PropTypes.oneOf([//主题
        "primary", "default", "success", "info", "warning", "danger", "green", "cancel"]),
        size: React.PropTypes.oneOf([//按钮大小
        "large", "default", "small"]),
        onClick: React.PropTypes.func, //按钮单击事件
        className: React.PropTypes.string, //按钮自定义样式
        disabled: React.PropTypes.bool, //按钮是否无效
        hide: React.PropTypes.bool, //按钮是否隐藏
        delay: React.PropTypes.number, //第二次点击的间隔时间
        ripple: React.PropTypes.bool //点击时是否显示波纹特效
    },
    getDefaultProps: function getDefaultProps() {
        return {
            title: null,
            tip: null,
            theme: "default",
            size: "default",
            className: "",
            onClick: null,
            disabled: false,
            hide: false,
            delay: 0,
            ripple: true
        };
    },
    getInitialState: function getInitialState() {
        this.title = null; //初始化
        return { theme: this.props.theme, disabled: this.props.disabled, title: this.props.title, tip: this.props.tip, hide: this.props.hide };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

        this.setState({
            theme: nextProps.theme,
            disabled: nextProps.disabled,
            title: nextProps.title ? nextProps.title : this.state.title,
            tip: nextProps.tip,
            hide: nextProps.hide
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        var _this = this;

        if (this.delay == 1) {
            //开始延迟,执行父组件方法
            this.delay = 2; //处理中
            setTimeout(function () {
                _this.delay = null; //清空
                _this.setState({ title: _this.title, disabled: false });
            }, this.props.delay);

            if (this.props.onClick) {
                this.props.onClick(this.props.name, this.props.title, this.event);
            }
        }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        if (this.delay == 2) {
            return false;
        }
        return true;
    },
    clickHandler: function clickHandler(event) {

        if (this.state.disabled == true) {
            return;
        }
        if (this.props.ripple) {
            this.rippleHandler(event); //添加波纹特效
        }

        if (this.props.delay > 0) {
            //不立即执行父组件方法
            this.title = this.state.title; //保存原来的title
            this.delay = 1; //处理开始
            this.event = event;
            this.setState({ title: "处理中...", disabled: true });
        } else {
            if (this.props.onClick) {
                this.props.onClick(this.props.name, this.props.title, event);
            }
        }
    },
    render: function render() {
        var style = this.props.style;
        if (style) {
            if (style.display) {} else {
                style.display = this.state.hide ? "none" : "inline";
            }
        } else {
            style = {};
            style.display = this.state.hide ? "none" : "inline";
        }
        var props = {
            className: "wasabi-button " + this.state.theme + " size-" + this.props.size + " " + this.props.className,
            style: style,
            disabled: this.state.disabled == true ? "disabled" : null,
            title: this.state.tip ? this.state.tip : this.state.title
        };
        return React.createElement(
            "button",
            _extends({}, props, { onClick: this.clickHandler, type: "button" }),
            this.state.title
        );
    }

});
module.exports = Button;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangy
//date:2016-08-02
//将设置自定义样式独立出来
var React = __webpack_require__(1);
var SetStyle = {
    setStyle: function setStyle(type) {
        var style = this.props.style;
        if (style) {} else {
            style = {};
        }

        if (this.props.width != null) {
            style.width = this.props.width; //设置了宽度属性为最先级别
            if (type && type == "input") {
                //因为表单组件设置了一个最小宽度，所以一定除去这个属性
                style.minWidth = this.props.width; //一定要设置这个否则跟原有的样式产生冲突
            }
        } else {
            if (style.width) {
                //用户设置宽度,
                if (type && type == "input") {
                    //因为表单组件设置了一个最小宽度，所以一定除去这个属性
                    style.minWidth = style.width; //一定要设置这个否则跟原有的样式产生冲突
                }
            }
        }

        if (this.props.height) {
            style.height = this.props.height;
        }

        if (type && type == "input") {

            style.display = this.state.hide == true ? "none" : "block";
        }
        return style;
    }
};
module.exports = SetStyle;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-03-26.
 * desc:fetch 查询时的数据模型
 *
 */

var FetchModel = function FetchModel(url, success) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "GET";

    _classCallCheck(this, FetchModel);

    this.url = url;
    this.params = params;
    this.success = success;
    this.error = error;
    this.type = type; //类型
    this.contentType = "application/x-www-form-urlencoded"; ////请求数据格式
};

module.exports = FetchModel;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-03-22
//desc:模态窗口
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(19);
var MessageView = __webpack_require__(284);
var Message = {
    info: function info(msg, timeout) {
        if (!timeout) {
            timeout = 2000;
        }
        if (!!document.getElementById("alog-info")) {
            //存在
            var child = document.getElementById("alog-info");
            document.body.removeChild(child);
            var info = document.createElement("div");
            info.id = "alog-info";
            document.body.appendChild(info);
            ReactDOM.render(React.createElement(MessageView, { type: "info", timeout: timeout, msg: msg }), document.getElementById("alog-info"));
        } else {
            var _info = document.createElement("div");
            _info.id = "alog-info";
            document.body.appendChild(_info);
            ReactDOM.render(React.createElement(MessageView, { type: "info", timeout: timeout, msg: msg }), document.getElementById("alog-info"));
        }
    },
    success: function success(msg, timeout) {
        if (!timeout) {
            timeout = 2000;
        }
        if (!!document.getElementById("alog-success")) {
            //存在
            var child = document.getElementById("alog-success");
            document.body.removeChild(child);
            var success = document.createElement("div");
            success.id = "alog-success";
            document.body.appendChild(success);
            ReactDOM.render(React.createElement(MessageView, { type: "success", timeout: timeout, msg: msg }), document.getElementById("alog-success"));
        } else {
            var _success = document.createElement("div");
            _success.id = "alog-success";
            document.body.appendChild(_success);
            ReactDOM.render(React.createElement(MessageView, { type: "success", timeout: timeout, msg: msg }), document.getElementById("alog-success"));
        }
    },
    error: function error(msg, timeout) {
        if (!timeout) {
            timeout = 2000;
        }
        if (!!document.getElementById("alog-error")) {
            //存在
            var child = document.getElementById("alog-error");
            document.body.removeChild(child);
            var error = document.createElement("div");
            error.id = "alog-error";
            document.body.appendChild(error);
            ReactDOM.render(React.createElement(MessageView, { type: "error", timeout: timeout, msg: msg }), document.getElementById("alog-error"));
        } else {
            var _error = document.createElement("div");
            _error.id = "alog-error";
            document.body.appendChild(_error);
            ReactDOM.render(React.createElement(MessageView, { type: "error", timeout: timeout, msg: msg }), document.getElementById("alog-error"));
        }
    },
    alert: function alert(msg) {
        if (!!document.getElementById("alog-alert")) {
            //存在
            var child = document.getElementById("alog-alert");
            document.body.removeChild(child);
            var alert = document.createElement("div");
            alert.id = "alog-alert";
            document.body.appendChild(alert);
            ReactDOM.render(React.createElement(MessageView, { type: "alert", msg: msg }), document.getElementById("alog-alert"));
        } else {
            var _alert = document.createElement("div");
            _alert.id = "alog-alert";
            document.body.appendChild(_alert);
            ReactDOM.render(React.createElement(MessageView, { type: "alert", msg: msg }), document.getElementById("alog-alert"));
        }
    },
    confirm: function confirm(msg, success, cancel) {
        if (!!document.getElementById("alog-confirm")) {
            //存在
            var child = document.getElementById("alog-confirm");
            document.body.removeChild(child);
            var confirm = document.createElement("div");
            confirm.id = "alog-confirm";
            document.body.appendChild(confirm);
            ReactDOM.render(React.createElement(MessageView, { type: "confirm", msg: msg, OKHandler: success, cancelHandler: cancel }), document.getElementById("alog-confirm"));
        } else {
            var _confirm = document.createElement("div");
            _confirm.id = "alog-confirm";
            document.body.appendChild(_confirm);
            ReactDOM.render(React.createElement(MessageView, { type: "confirm", msg: msg, OKHandler: success, cancelHandler: cancel }), document.getElementById("alog-confirm"));
        }
    }
};
module.exports = Message;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _validation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by zhiyongwang on 2016-03-24.
 */

var validation = (_validation = {
    alpha: '只能包含英文字符，"-"，"_"',
    alphanum: '只能包含数字、英文字符和"_"',
    email: '邮箱格式不正确',
    url: "网址格式不正确",
    mobile: "手机号码格式不正确",
    integer: '必须为整数',
    idcard: "身份证号码格式不正确",
    required: '',
    invalidTip: "输入格式无效",
    date: "日期格式为: 0000-00-00",
    max: {
        array: '最多选择 {0} 个选项',
        number: '不能大于 {0}',
        string: '最大长度不能超过 {0} 个字符'
    },
    min: {
        array: '最少选择 {0} 个选项',
        number: '不能小于 {0}',
        string: '最小长度不能少于 {0} 个字符'
    },
    number: '必须为数字',
    password: '密码含有非法字符'
}, _defineProperty(_validation, 'url', 'url格式不正确'), _defineProperty(_validation, 'email', '邮箱格式不正确'), _defineProperty(_validation, 'fileSize', '最大上传文件大小不能超过 {0} KB'), _validation);
module.exports = validation;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/9/28.
 * desc 将表单组件中的label单独出来,
 *
 */

var React = __webpack_require__(1);

var Label = React.createClass({
    displayName: "Label",

    propTypes: {

        name: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element, React.PropTypes.node]), //名称
        hide: React.PropTypes.bool, //是否隐藏
        help: React.PropTypes.string, //帮助文字
        required: React.PropTypes.bool //是否必填项
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            hide: false,
            help: null,
            required: false
        };
    },
    getInitialState: function getInitialState() {
        return {
            name: this.props.name,
            hide: this.props.hide,
            showHelp: false,
            required: this.props.required
        };
    },

    helpHandler: function helpHandler() {
        this.setState({
            showHelp: !this.state.showHelp
        });
    },
    hideHelp: function hideHelp() {
        //给父组件调用
        this.setState({
            showHelp: false
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            hide: nextProps.hide,
            required: nextProps.required
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "wasabi-form-group-label " + (this.state.required ? "required" : ""),
                style: { display: this.state.hide ? "none" : this.state.name && this.state.name != "" ? "table" : "none" } },
            React.createElement(
                "label",
                null,
                this.state.name,
                React.createElement(
                    "a",
                    { className: "help", onClick: this.helpHandler, style: { display: this.props.help ? "inline-block" : "none" } },
                    "?"
                ),
                React.createElement(
                    "div",
                    { className: "heip-text", style: { display: this.state.showHelp ? "block" : "none" } },
                    this.props.help
                )
            )
        );
    }
});
module.exports = Label;

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by apple on 16/8/5.
 */
var React = __webpack_require__(1);
var showUpdate = {
    showUpdate: function showUpdate(newParam, oldParam) {
        //判断前后参数是否相同
        var isupdate = false;
        if (!oldParam) {
            oldParam = this.state.params;
        }
        if (!newParam && !oldParam) {
            //都为空
            isupdate = false; //
            return isupdate;
        } else if (newParam && !oldParam && Object.keys(newParam).length == 0) {
            //原来没有参数,现在有了参数,但参数个数为0
            isupdate = false;
            return isupdate;
        } else if (newParam && !oldParam && Object.keys(newParam).length > 0) {
            //原来没有参数,现在有了参数,但是参数个数不为0
            isupdate = true;
            return isupdate;
        } else if (!newParam && oldParam) {
            //清空了参数
            isupdate = true;
            return isupdate;
        } else if (newParam && oldParam && Object.keys(newParam).length != Object.keys(oldParam).length) {
            //都有参数,但是参数个数已经不一样了
            isupdate = true;
            return isupdate;
        } else {
            //有参数,但参数个数相同,对比

            for (var par in newParam) {
                try {

                    if (newParam[par] == oldParam[par]) {
                        continue;
                    } else {
                        isupdate = true;
                        return isupdate;
                    }
                } catch (e) {
                    isupdate = true;
                    return isupdate;
                }
            }
        }

        return isupdate;
    }

};
module.exports = showUpdate;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/8/5.
 * desc 将验证独立出来

 */
var React = __webpack_require__(1);
var validation = __webpack_require__(16);
var regexp = __webpack_require__(36);
var Validate = {
    validate: function validate(value) {
        if (value == null || value == undefined) {
            value = this.state.value;
        }

        var isvalidate = true;
        var readonly = this.state.readonly;
        var required = this.state.required;
        var helpTip = "";
        if (readonly) {//不能直接返回，防止上一次的验证效果还在，导致无法消除
        } else {
            //非只读
            if (this.state.validateState && this.state.validateState != "valid") {
                //处理于后台验证中,或者是验证失败
                isvalidate = false;
            } else {
                //没有后台验证，或者后台验证已经成功
                if (value != null && value != undefined && value !== "") {
                    //注意一定要加双等号，用户输入了值，验证有效性

                    //因为有可能输入0
                    if (value.toString() == "NaN") {
                        //多加一层判断，有可能用户
                        isvalidate = false;
                        helpTip = "非有效数字";
                    } else if (typeof value === "string" && (value.indexOf("alert(") > -1 || value.indexOf("<script>") > -1 || value.indexOf("--") > -1)) {
                        //判断有效性，TODO 后期改为正则
                        isvalidate = false;
                        helpTip = "非有效数字";
                    } else if (this.props.regexp && this.props.regexp !== "") {
                        //有正则表达式

                        isvalidate = this.props.regexp.test(value);
                        if (!isvalidate) {
                            //无效

                            if (!this.props.invalidTip && this.props.invalidTip !== "") {
                                //用户自定义错误提示信息
                                helpTip = this.props.invalidTip;
                            } else {
                                //用默认提示
                                helpTip = validation["invalidTip"];
                            }
                        } else {//有效
                        }
                    } else {
                        //没有正则表达式，则验证默认正则

                        if (this.props.type == "date") {
                            //日期允许带时间

                            isvalidate = regexp.date.test(value) || regexp.datetime(value);
                        } else if (regexp[this.props.type]) {

                            if (typeof regexp[this.props.type] == "function") {
                                isvalidate = regexp[this.props.type](value);
                            } else {
                                isvalidate = regexp[this.props.type].test(value);
                            }

                            if (!isvalidate) {
                                helpTip = validation[this.props.type];
                            }
                        } else {}
                    }

                    if (!isvalidate) {
                        //无效再验证
                        //判断大小，长度等
                        if (this.state.min != null && this.state.min != undefined) {
                            switch (this.props.type) {
                                case "text":
                                    if (value.toString().length < this.state.min) {
                                        isvalidate = false;
                                        helpTip = "长度不能小于" + this.state.min;
                                    }
                                    break;
                                case "password":
                                    if (value.toString().length < this.state.min) {
                                        isvalidate = false;
                                        helpTip = "长度不能小于" + this.state.min;
                                    }
                                    break;
                                case "number":

                                    if (value < this.state.min) {
                                        isvalidate = false;
                                        helpTip = "不能小于" + this.state.min;
                                    }
                                    break;
                                case "integer":
                                    if (value < this.state.min) {
                                        isvalidate = false;
                                        helpTip = "不能小于" + this.state.min;
                                    }
                                case "checkbox":
                                    var valueArr = value.toString().split(",");
                                    if (valueArr.length < this.state.min) {
                                        isvalidate = false;
                                        helpTip = "最少选择" + this.state.min.toString() + "项";
                                    }
                                    break;
                                case "select":
                                    var valueArr = value.toString().split(",");
                                    if (valueArr.length < this.state.min) {
                                        isvalidate = false;
                                        helpTip = "最少选择" + this.state.min.toString() + "项";
                                    }
                                    break;
                            }
                        }
                        if (this.state.max != null && this.state.max != undefined) {
                            switch (this.props.type) {
                                case "text":
                                    if (value.toString().length > this.state.max) {
                                        isvalidate = false;
                                        helpTip = "长度不能大于" + this.state.max;
                                    }
                                    break;
                                case "password":
                                    if (value.toString().length > this.state.max) {
                                        isvalidate = false;
                                        helpTip = "长度不能大于" + this.state.max;
                                    }
                                    break;
                                case "number":
                                    if (value > this.state.max) {
                                        isvalidate = false;
                                        helpTip = "不能大于" + this.state.max;
                                    }
                                    break;
                                case "integer":
                                    if (value > this.state.max) {
                                        isvalidate = false;
                                        helpTip = "不能大于" + this.state.max;
                                    }
                                    break;
                                case "checkbox":
                                    var valueArr = value.toString().split(",");
                                    if (valueArr.length > this.state.max) {
                                        isvalidate = false;
                                        helpTip = "最多选择" + this.state.max.toString() + "项";
                                    }
                                    break;
                                case "select":
                                    var valueArr = value.toString().split(",");
                                    if (valueArr.length > this.state.max) {
                                        isvalidate = false;
                                        helpTip = "最多选择" + this.state.max.toString() + "项";
                                    }
                                    break;
                            }
                        }
                    }
                } else {
                    //输入没有输入
                    if (required) {
                        //必填
                        isvalidate = false; //
                        helpTip = validation["required"];
                    } else {
                        //认为验证有效
                    }
                }
            }
        }

        //设置样式
        if (isvalidate) {
            this.setState({
                validateClass: "",
                helpShow: "none",
                helpTip: ""

            });
        } else {

            this.setState({
                validateClass: " wasabi-has-error",
                helpShow: "block",
                helpTip: helpTip
            });
        }
        return isvalidate;
    }
};
module.exports = Validate;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _events = __webpack_require__(289);

var Events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by wangzhiyong on 2016/12/12.
 * 从rctui改造过来,绑定全局单击事件
 */
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(19);
var dom = __webpack_require__(288);

var ClickAway = {
    componentWillUnmount: function componentWillUnmount() {
        this.unbindClickAway();
    },
    bindClickAway: function bindClickAway() {
        //绑定事件
        var fn = this.getClickAwayEvent(); //得到要执行事件
        Events.on(document, 'click', fn);
        Events.on(document, 'touchstart', fn);
    },
    unbindClickAway: function unbindClickAway() {
        //解除绑定事件
        var fn = this.getClickAwayEvent();
        Events.off(document, 'click', fn);
        Events.off(document, 'touchstart', fn);
    },
    registerClickAway: function registerClickAway(onClickAway, target) {
        //注册绑定事件
        this.clickAwayTarget = target;
        this.onClickAway = onClickAway;
    },
    getClickAwayEvent: function getClickAwayEvent() {
        var _this = this;

        var fn = this._clickAwayEvent; //
        if (!fn) {
            //第一次不存在的时候
            fn = function fn(event) {
                var el = _this.clickAwayTarget || ReactDOM.findDOMNode(_this);

                // Check if the target is inside the current component
                if (event.target !== el && !dom.isDescendant(el, event.target)) {
                    if (_this.onClickAway) {
                        _this.onClickAway();
                    }
                }
            };
            this._clickAwayEvent = fn;
        }
        return fn;
    }
};
module.exports = ClickAway;

/***/ }),
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
create by wangy
date:2016-04-05后开始独立改造
desc:链接按钮
 */
__webpack_require__(300);
__webpack_require__(144);
var setStyle = __webpack_require__(11);
var React = __webpack_require__(1);
var addRipple = __webpack_require__(58);
var LinkButton = React.createClass({
    displayName: "LinkButton",

    mixins: [setStyle, addRipple],
    propTypes: {
        name: React.PropTypes.string, //名称
        title: React.PropTypes.string, //标题

        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        iconCls: React.PropTypes.string, //图片
        iconAlign: React.PropTypes.oneOf(["left", "right", "rightTop", "rightBottom"]), //图片位置
        href: React.PropTypes.string, //链接地址
        onClick: React.PropTypes.func, //单击地址
        tip: React.PropTypes.string, //提示信息
        disabled: React.PropTypes.bool, //是否有效
        hide: React.PropTypes.bool, //是否隐藏
        draggable: React.PropTypes.bool, //是否可拖动
        backgroundColor: React.PropTypes.string, //背景颜色
        color: React.PropTypes.string, //字体颜色
        ripple: React.PropTypes.bool //点击时是否显示波纹特效
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "", //关联值
            title: "", //标题、
            iconAlign: "left", //图标位置
            href: "javascript:void(0)", //连接地址
            iconCls: null, //默认为空
            onClick: null, //单击事件
            draggable: false, //是否允许拖动
            dragStartHandler: null, //拖动事件
            tip: "",
            backgroundColor: null,
            color: null,
            disabled: false,
            hide: false,
            ripple: true
        };
    },
    getInitialState: function getInitialState() {
        return {

            disabled: this.props.disabled,
            title: this.props.title,
            tip: this.props.tip,
            hide: this.props.hide
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({

            disabled: nextProps.disabled,
            title: nextProps.title ? nextProps.title : this.state.title,
            tip: nextProps.tip,
            hide: nextProps.hide
        });
    },
    clickHandler: function clickHandler(event) {
        if (this.state.disabled == true) {
            return;
        }
        //TODO 添加波纹有问题
        // if(this.props.ripple)
        // {//允许特效，并且不是空主题
        //     this.rippleHandler(event);//添加波纹特效
        // }

        if (this.props.onClick != null) {
            this.props.onClick(this.props.name, this.props.title, event);
        }
    },
    onMouseOver: function onMouseOver(event) {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(event);
        }
    },
    onMouseOut: function onMouseOut(event) {
        if (this.props.onMouseOut) {
            this.props.onMouseOut(event);
        }
    },
    setDisabled: function setDisabled(disabled) {
        this.setState({
            disabled: disabled
        });
    },
    dragStartHandler: function dragStartHandler(event) {
        //event.dataTransfer.effectAllowed = "move";
        //event.dataTransfer.setDragImage(event.target, 0, 0);
        //var timestamp = Date.parse(new Date());
        //
        var newele = { name: this.props.name,
            title: this.props.title,
            iconCls: this.props.iconCls,
            iconAlign: this.props.iconAlign,
            disabled: this.state.disabled,
            hide: this.state.hide,
            href: this.props.href,
            onClick: this.clickHandler
        };
        window.localStorage.setItem("wasabidrageleProps", JSON.stringify(newele));
    },
    render: function render() {
        if (this.state.hide == true) {
            return null;
        }
        var className = "wasabi-linkbutton "; //按钮样式
        if (this.props.className) {
            //自定义class
            className += " " + this.props.className;
        }
        if (!this.props.iconCls) {
            className += " " + "onlytext"; //只有文字
        }
        var style = this.setStyle(); //设置按钮样式
        var linkTextStyle = {}; //文本样式
        var iconColor = null; //图标颜色，因为图标基本使用了字体
        if (this.props.backgroundColor) {
            style.backgroundColor = this.props.backgroundColor;
        }
        if (this.props.color) {
            //单独设置了颜色
            linkTextStyle.color = this.props.color;
            iconColor = this.props.color;
        } else if (style.color) {
            //如果样式中设置了颜色，则取这个颜色
            linkTextStyle.color = style.color;
            iconColor = style.color;
        }

        var title = this.props.tip; //提示信息
        if (title == "" || !title) {
            //如果没有，则默认为文本
            title = this.props.title;
        }
        if (!this.props.title) {
            //纯图标
            return React.createElement(
                "a",
                { draggable: this.props.draggable, onDragStart: this.dragStartHandler, title: title,
                    href: this.props.href, onClick: this.clickHandler,
                    className: className + " onlyicon", disabled: this.state.disabled, name: this.props.name, style: style },
                React.createElement("i", { className: " " + this.props.iconCls, style: { color: iconColor, display: this.props.iconCls == "" ? "none" : "inline-block" } })
            );
        } else {

            if (this.props.iconAlign == "right") {

                return React.createElement(
                    "a",
                    { ref: "link", draggable: this.props.draggable, onDragStart: this.dragStartHandler, title: title,
                        href: this.props.href, onClick: this.clickHandler, onMouseOut: this.onMouseOut, onMouseOver: this.onMouseOver,
                        className: className, disabled: this.state.disabled, name: this.props.name, style: style },
                    React.createElement(
                        "div",
                        { className: "wasabi-linkbutton-text right", style: linkTextStyle },
                        this.props.title
                    ),
                    React.createElement("i", { className: " " + this.props.iconCls,
                        style: { color: iconColor, display: this.props.iconCls == "" ? "none" : "inline-block" } })
                );
            } else if (this.props.iconAlign == "rightTop") {
                return React.createElement(
                    "a",
                    { ref: "link", draggable: this.props.draggable, onDragStart: this.dragStartHandler, title: title,
                        href: this.props.href, onClick: this.clickHandler, onMouseOut: this.onMouseOut, onMouseOver: this.onMouseOver,
                        className: className, disabled: this.state.disabled, name: this.props.name, style: style },
                    React.createElement(
                        "div",
                        { className: "wasabi-linkbutton-text", style: linkTextStyle },
                        this.props.title
                    ),
                    React.createElement("i", { className: " " + this.props.iconCls + " icon-rightTop",
                        style: { color: iconColor, display: this.props.iconCls == "" ? "none" : "inline-block" } })
                );
            } else if (this.props.iconAlign == "rightBottom") {
                return React.createElement(
                    "a",
                    { ref: "link", draggable: this.props.draggable, onDragStart: this.dragStartHandler, title: title,
                        href: this.props.href, onClick: this.clickHandler, onMouseOut: this.onMouseOut, onMouseOver: this.onMouseOver,
                        className: className, disabled: this.state.disabled, name: this.props.name, style: style },
                    React.createElement(
                        "div",
                        { className: "wasabi-linkbutton-text", style: linkTextStyle },
                        this.props.title
                    ),
                    React.createElement("i", { className: " " + this.props.iconCls + " icon-rightBottom",
                        style: { color: iconColor, display: this.props.iconCls == "" ? "none" : "inline-block" } })
                );
            } else {
                return React.createElement(
                    "a",
                    { ref: "link", draggable: this.props.draggable, onDragStart: this.dragStartHandler, title: title,
                        href: this.props.href, onClick: this.clickHandler, onMouseOut: this.onMouseOut, onMouseOver: this.onMouseOver, className: className,
                        disabled: this.state.disabled, name: this.props.name, style: style },
                    React.createElement("i", { className: " " + this.props.iconCls,
                        style: { display: this.props.iconCls == null || this.props.iconCls == "" ? "none" : "inline-block" } }),
                    React.createElement(
                        "div",
                        { className: "wasabi-linkbutton-text left", style: linkTextStyle },
                        this.props.title
                    )
                );
            }
        }
    }
});
module.exports = LinkButton;

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by zhiyongwang on 2016-04-25.
 */
var en = __webpack_require__(263);
var cn = __webpack_require__(264);

var Lang = {

  cn: cn,
  en: en

};

module.exports = Lang;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by zhiyongwang on 2016-03-24.
 */

module.exports = {
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
    url: /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    number: /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
    date: /^(\d{4})-(\d{2})-(\d{2})$/, //日期
    datetime: function datetime(s) {
        /// <summary>
        /// 日期时间验证 YYYY-MM-DD HH:MM:SS
        /// </summary>

        var value = s.match(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/);

        if (value == null) {
            return false;
        } else {

            return true;
        }
    },
    alpha: /^[a-z ._-]+$/i,
    alphanum: /^[a-z0-9_]+$/i,
    password: /^[\x00-\xff]+$/,
    integer: /^[-+]?[0-9]+$/,
    /*
     移动号段：
     134 135 136 137 138 139 147 150 151 152 157 158 159 172 178 182 183 184 187 188
     联通号段：
     130 131 132 145 155 156 171 175 176 185 186
     电信号段：
     133 149 153 173 177 180 181 189
     */
    mobile: /13\d{9}|15[01236789]\d{8}|14[579]\d{8}|15[012356789]\d{8}|17[1235678]\d[8]|18\d{9}/,
    idcard: function idcard(value) {
        //身份证号码
        //15位和18位身份证号码的正则表达式
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(value)) {
            if (value.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
                }

                var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
                var idCardLast = value.substring(17); //得到最后一位身份证号码

                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }

};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by wangzy on 16/6/17.
 * desc:框架入口
 */


//TODO 下面的代码先保留，等心怡项目全部更新到新版本后去掉

var script = document.createElement("script");
script.src = "http://g.tbcdn.cn/sj/securesdk/0.0.3/securesdk_v2.js";
script.id = "J_secure_sdk_v2";
script.setAttribute("id", "J_secure_sdk_v2");
script.setAttribute("data-appkey", "23421795");
document.body.appendChild(script);

__webpack_require__(294); //让safari支持fetch

/*****************按钮组件******************/
exports.Button = __webpack_require__(10); //普通按钮
exports.LinkButton = __webpack_require__(26); //可移动，可带图标，可带链接的按钮
exports.Toolbar = __webpack_require__(53); //LinkButton按钮集合组件

/*****************数据组件******************/
exports.DataGrid = __webpack_require__(77); //数据列表组件
exports.Tree = __webpack_require__(116); //树的组件
exports.Transfer = __webpack_require__(78); //穿梭框组件
exports.MenuTree = __webpack_require__(261); //菜单树组件

/*****************表单集组件******************/
exports.SearchBar = __webpack_require__(130); //表单查询组件
exports.Form = __webpack_require__(124); //表单提交组件

/*****************表单组件******************/
exports.Input = __webpack_require__(56); //通用表单组件
exports.Text = __webpack_require__(80); //文本框
exports.None = __webpack_require__(127); //空白占位表单组件
/*****************类按钮表单组件******************/

exports.Radio = __webpack_require__(57); //单选框集合组件
exports.CheckBox = __webpack_require__(54); //复选框集合组件
exports.SwitchButton = __webpack_require__(132); //开关组件


/*****************日期组件******************/
exports.Time = __webpack_require__(43); //时间选择组件
exports.DateD = __webpack_require__(55); //日期选择组件
exports.DateTime = __webpack_require__(122); //日期时间选择组件
exports.DateRange = __webpack_require__(121); //日期范围选择组件
exports.DateTimeRange = __webpack_require__(123); //日期时间范围选择组件

/*****************下拉组件******************/
exports.MutiText = __webpack_require__(126); //多行添加组件
exports.Select = __webpack_require__(131); //普通下拉选择组件
exports.Picker = __webpack_require__(129); //级联选择组件
exports.GridPicker = __webpack_require__(125); //下拉列表选择组件
exports.TreePicker = __webpack_require__(133); //下拉树选择组件
exports.PanelPicker = __webpack_require__(128); //级联选择组件

exports.DatePicker = __webpack_require__(120); //通用下拉日期组件
exports.ComboBox = __webpack_require__(119); //通用下拉框组件
exports.SearchBox = __webpack_require__(79); //筛选框


/*****************布局组件******************/

exports.Drop = __webpack_require__(266); //停靠组件
exports.Layout = __webpack_require__(268); //布局组件
exports.Center = __webpack_require__(265); //布局组件-中间
exports.North = __webpack_require__(269); //布局组件-头部
exports.South = __webpack_require__(272); //布局组件-底部
exports.West = __webpack_require__(273); //布局组件-左侧
exports.East = __webpack_require__(267); //布局组件-右侧

exports.Modal = __webpack_require__(134); //模态层组件
exports.Panel = __webpack_require__(270); //面板组件
exports.Resize = __webpack_require__(135); //可调整大小组件
exports.Reverse = __webpack_require__(271); //翻转组件

exports.SlidePanel = __webpack_require__(136); //滑动面板
exports.Message = __webpack_require__(14); //消息组件
exports.ToolTip = __webpack_require__(286); //提示信息组件
exports.Tooltip_shy = __webpack_require__(287); //提示信息组件-shy
exports.Progress = __webpack_require__(285); //进步条组件

/*****************导航组件******************/
exports.MenuTabs = __webpack_require__(281); //菜单tab组件
exports.Tabs = __webpack_require__(282); //页签组件
exports.Track = __webpack_require__(283); //物流跟踪


/*****************功能组件******************/
exports.Import = __webpack_require__(255); //excel导入组件
exports.Single = __webpack_require__(259); //单页面组件
exports.Page = __webpack_require__(258); //页面基类


exports.ButtonModel = __webpack_require__(139); //按钮数据模型
exports.FetchModel = __webpack_require__(13); //ajax查询数据模型
exports.FooterModel = __webpack_require__(275); //列表页脚数据模型
exports.FormModel = __webpack_require__(140); //表单数据模型
exports.HeaderModel = __webpack_require__(141); //列表表头数据模型
exports.MenuModel = __webpack_require__(276); //菜单数据模型
exports.PickerModel = __webpack_require__(142); //级联选择框数据模型
exports.TabModel = __webpack_require__(278); //页签数据模型
exports.NodeModel = __webpack_require__(277); //树节点数据模型


exports.unit = __webpack_require__(5); //常用函数
exports.ClickAway = __webpack_require__(24); //全局单击事件

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 create by wangzy
 date:2016-06-12
 desc:时间选择组件
 */
__webpack_require__(44);
var React = __webpack_require__(1);
var Time = React.createClass({
    displayName: "Time",

    propTypes: {
        name: React.PropTypes.string, //表单字段名称
        hour: React.PropTypes.number, //小时
        minute: React.PropTypes.number, //分钟
        second: React.PropTypes.number //秒

    },
    getDefaultProps: function getDefaultProps() {
        var date = new Date();
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    },
    getInitialState: function getInitialState() {
        return this.setInitValue(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
           */
        var result = this.setInitValue(nextProps);
        result.height = this.state.height; //高度仍用旧值，因为选择时回传父组件，还不需要消失
        this.setState(result);
        //滚动到指定位置
        this.refs.hour.scrollTop = result.hour * 24;
        this.refs.minute.scrollTop = result.minute * 24;
        this.refs.second.scrollTop = result.second * 24;
    },
    componentDidMount: function componentDidMount() {
        //滚动到指定位置
        this.refs.hour.scrollTop = this.state.hour * 24;
        this.refs.minute.scrollTop = this.state.minute * 24;
        this.refs.second.scrollTop = this.state.second * 24;
    },
    setInitValue: function setInitValue(props) {
        var date = new Date();

        var hour = props.hour != null && props.hour != undefined ? props.hour : date.getHours();
        var minute = props.minute != null && props.minute != undefined ? props.minute : date.getMinutes();
        var second = props.second != null && props.second != undefined ? props.second : date.getSeconds();
        return {
            hour: hour < 10 ? "0" + hour : hour,
            minute: minute < 10 ? "0" + minute : minute,
            second: second < 10 ? "0" + second : second,
            height: 0 //
        };
    },
    hourHandler: function hourHandler(value, tran) {
        var lastScrollTop = value * 24;
        this.scrollHandler(this.refs.hour, this.refs.hour.scrollTop, lastScrollTop, tran);
        this.refs.hour.style.backgroundColor = "red";
        this.setState({
            hour: value
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(value + ":" + this.state.minute + ":" + this.state.second, value + ":" + this.state.minute + ":" + this.state.second, this.props.name, null);
        }
    },
    minuteHandler: function minuteHandler(value, tran) {
        var lastScrollTop = value * 24;
        this.scrollHandler(this.refs.minute, this.refs.minute.scrollTop, lastScrollTop, tran);
        this.setState({
            minute: value
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(this.state.hour + ":" + value + ":" + this.state.second, this.state.hour + ":" + value + ":" + this.state.second, this.props.name, null);
        }
    },
    secondHandler: function secondHandler(value, tran) {

        var lastScrollTop = value * 24;
        this.scrollHandler(this.refs.second, this.refs.second.scrollTop, lastScrollTop, tran);
        this.setState({
            second: value
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(this.state.hour + ":" + this.state.minute + ":" + value, this.state.hour + ":" + this.state.minute + ":" + value, this.props.name, null);
        }
    },
    scrollHandler: function scrollHandler(obj, scrollTop, lastScrollTop, tran) {
        var _this = this;

        obj.scrollTop = scrollTop;
        if (scrollTop < lastScrollTop) {
            setTimeout(function () {
                _this.scrollHandler(obj, scrollTop + 24, lastScrollTop, tran);
            }, tran);
        }
    },
    mouseOutHandler: function mouseOutHandler(event) {
        var _this2 = this;

        //鼠标移开时隐藏下拉
        var parentE = event.relatedTarget; //相关节点
        while (parentE && parentE.nodeName != "BODY") {
            if (parentE.className.indexOf("wasabi-time-picker-panel-inner") > -1) {
                break;
            }
            parentE = parentE.parentElement;
        }

        if (parentE == undefined || parentE == null || parentE.nodeName == "BODY") {
            setTimeout(function () {
                _this2.setState({
                    height: 0
                });
            }, 200);
        }
    },
    renderHour: function renderHour() {
        var hourControl = [];
        for (var index = 0; index < 24; index++) {
            var currentHour = index < 10 ? "0" + index : index;
            hourControl.push(React.createElement(
                "li",
                { onClick: this.hourHandler.bind(this, currentHour, 70), key: "hour" + currentHour,
                    className: this.state.hour == currentHour ? "wasabi-time-picker-panel-select-option-selected" : null },
                currentHour
            ));
        }
        for (var _index = 0; _index < 5; _index++) {
            hourControl.push(React.createElement("li", { key: "nohour" + _index }));
        }
        return hourControl;
    },
    rendMinute: function rendMinute() {
        var minuteControl = [];
        for (var index = 0; index < 60; index++) {
            var currentMinute = index < 10 ? "0" + index : index;
            minuteControl.push(React.createElement(
                "li",
                { key: "minute" + currentMinute, onClick: this.minuteHandler.bind(this, currentMinute, 70),
                    className: this.state.minute == currentMinute ? "wasabi-time-picker-panel-select-option-selected" : null },
                currentMinute
            ));
        }
        for (var _index2 = 0; _index2 < 5; _index2++) {
            minuteControl.push(React.createElement("li", { key: "nominute" + _index2 }));
        }
        return minuteControl;
    },
    rendSecond: function rendSecond() {
        var secondControl = [];
        for (var index = 0; index < 60; index++) {
            var currentSecond = index < 10 ? "0" + index : index;
            secondControl.push(React.createElement(
                "li",
                { key: "second" + currentSecond, onClick: this.secondHandler.bind(this, currentSecond, 70),
                    className: this.state.second == currentSecond ? "wasabi-time-picker-panel-select-option-selected" : null },
                currentSecond
            ));
        }
        for (var _index3 = 0; _index3 < 5; _index3++) {
            secondControl.push(React.createElement("li", { key: "nosecond" + _index3 }));
        }
        return secondControl;
    },

    getValue: function getValue() {
        return this.state.hour + ":" + this.state.minute + ":" + this.state.second;
    },
    showHandler: function showHandler() {
        this.setState({
            height: 146

        });
    },
    changeHandler: function changeHandler() {},
    render: function render() {

        return React.createElement(
            "div",
            { className: "wasabi-time-picker-panel-inner", onMouseOut: this.mouseOutHandler },
            React.createElement(
                "div",
                { className: "wasabi-time-picker-panel-input-wrap" },
                React.createElement("input", { className: "wasabi-time-picker-panel-input wasabi-form-control ",
                    onClick: this.showHandler, onChange: this.changeHandler, value: this.state.hour + ":" + this.state.minute + ":" + this.state.second, placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4" })
            ),
            React.createElement(
                "div",
                { className: "wasabi-time-picker-panel-combobox", style: { height: this.state.height } },
                React.createElement(
                    "div",
                    { ref: "hour", key: "hour", className: "wasabi-time-picker-panel-select" },
                    React.createElement(
                        "ul",
                        { key: "hour" },
                        this.renderHour(),
                        " "
                    )
                ),
                React.createElement(
                    "div",
                    { ref: "minute", key: "minute", className: "wasabi-time-picker-panel-select" },
                    React.createElement(
                        "ul",
                        { key: "minute" },
                        this.rendMinute()
                    )
                ),
                React.createElement(
                    "div",
                    { ref: "second", key: "second", className: "wasabi-time-picker-panel-select" },
                    React.createElement(
                        "ul",
                        { key: "second" },
                        this.rendSecond()
                    )
                )
            )
        );
    }
});
module.exports = Time;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by wangzhiyong on
 * date:2016-04-05后开始独立改造
 * desc:按钮工具栏
 */
var React = __webpack_require__(1);
__webpack_require__(299);
var LinkButton = __webpack_require__(26);
var Button = __webpack_require__(10);
var Toolbar = React.createClass({
    displayName: "Toolbar",

    propTypes: {
        buttons: React.PropTypes.array.isRequired,
        type: React.PropTypes.oneOf([//主题
        "button", "link"]),
        buttonClick: React.PropTypes.func.isRequired
    },
    getDefaultProps: function getDefaultProps() {
        return { buttons: [], type: "button", className: "" };
    },
    buttonClick: function buttonClick(name, title, event) {
        this.props.buttonClick(name, title, event); //执行父组件的事件
    },
    render: function render() {
        var _this = this;

        var props = {
            className: this.props.className + " wasabi-toolbar",
            style: this.props.style
        };
        var buttonlist = [];
        if (this.props.buttons != null) {
            this.props.buttons.map(function (child) {
                if (_this.props.type == "button") {
                    buttonlist.push(React.createElement(Button, _extends({ key: child.name }, child, { onClick: _this.buttonClick })));
                } else {
                    buttonlist.push(React.createElement(LinkButton, _extends({ key: child.name }, child, { onClick: _this.buttonClick })));
                }
            });
        }
        return React.createElement(
            "div",
            props,
            buttonlist
        );
    }
});

module.exports = Toolbar;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by zhiyongwang on 2016-04-05以后.
 * 复选框集合组件
 */
__webpack_require__(147);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var showUpdate = __webpack_require__(22);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var Message = __webpack_require__(14);
var CheckBox = React.createClass({
    displayName: "CheckBox",

    mixins: [setStyle, validate, showUpdate, shouldComponentUpdate],
    PropTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置
        //其他属性
        min: React.PropTypes.number, //最少选择几个
        max: React.PropTypes.number, //最多选择几个

        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        extraData: React.PropTypes.array, //额外的数据,对url有效
        onSelect: React.PropTypes.func //选中后的事件，回传，value,与text,data


    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",
            //其他属性
            min: null,
            max: null,
            //其他属性
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            extraData: null,
            onSelect: null

        };
    },
    getInitialState: function getInitialState() {
        var newData = [];var text = this.props.text;
        if (this.props.data instanceof Array) {
            for (var i = 0; i < this.props.data.length; i++) {
                var obj = this.props.data[i];
                obj.text = this.props.data[i][this.props.textField];
                obj.value = this.props.data[i][this.props.valueField];
                if (obj.value == this.props.value) {
                    text = obj.text; //根据value赋值
                }
                newData.push(obj);
            }
        }

        return {
            hide: this.props.hide,
            min: this.props.min,
            max: this.props.max,
            params: unit.clone(this.props.params), //参数
            data: newData,
            value: this.props.value,
            text: text,
            ulShow: false, //是否显示下拉选项
            readonly: this.props.readonly,

            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var newData = [];var text = nextProps.text;
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {

            for (var i = 0; i < nextProps.data.length; i++) {
                var obj = nextProps.data[i];
                obj.text = nextProps.data[i][this.props.textField];
                obj.value = nextProps.data[i][this.props.valueField];
                if (obj.value == nextProps.value) {
                    text = obj.text; //根据value赋值
                }
                newData.push(obj);
            }
            this.setState({
                hide: nextProps.hide,
                data: newData,
                min: nextProps.min,
                max: nextProps.max,
                value: nextProps.value,
                text: text,
                params: unit.clone(nextProps.params),
                readonly: nextProps.readonly,
                required: nextProps.required,
                validateClass: "", //重置验证样式
                helpTip: validation["required"] //提示信息
            });
        } else {

            if (nextProps.url != null) {

                if (this.showUpdate(nextProps.params)) {
                    //如果不相同则更新
                    this.loadData(nextProps.url, nextProps.params);
                } else {}
            }

            this.setState({
                hide: nextProps.hide,
                min: nextProps.min,
                max: nextProps.max,
                value: nextProps.value,
                text: text,
                params: unit.clone(nextProps.params),
                readonly: nextProps.readonly,
                required: nextProps.required,
                validateClass: "", //重置验证样式
                helpTip: validation["required"] //提示信息
            });
        }
    },
    componentWillMount: function componentWillMount() {
        //如果指定url,先查询数据再绑定
        this.loadData(this.props.url, this.state.params); //查询数据
    },
    loadData: function loadData(url, params) {

        if (url != null && url != "") {
            if (params == null) {
                var fetchmodel = new FetchModel(url, this.loadSuccess, null, this.loadError);

                unit.fetch.get(fetchmodel);
            } else {
                var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);

                unit.fetch.post(fetchmodel);
            }
            console.log("checkbox", fetchmodel);
        }
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("checkbox-error", errorCode, message);
        Message.error(message);
    },
    loadSuccess: function loadSuccess(data) {
        //数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        var newData = [];var text = this.state.text;
        for (var i = 0; i < realData.length; i++) {
            var obj = realData[i]; //将所有字段添加进来
            obj.text = realData[i][this.props.textField];
            obj.value = realData[i][this.props.valueField];
            if (obj.value == this.state.value) {
                text = obj.text; //根据value赋值
            }
            newData.push(obj);
        }
        if (this.props.extraData == null || this.props.extraData.length == 0) {
            //没有额外的数据
        } else {
            //有额外的数据
            for (var _i = 0; _i < this.props.extraData.length; _i++) {
                var _obj = {};
                _obj.text = this.props.extraData[_i][this.props.textField];
                _obj.value = this.props.extraData[_i][this.props.valueField];
                if (_obj.value == this.state.value) {
                    text = _obj.text; //根据value赋值
                }
                newData.unshift(_obj);
            }
        }
        window.localStorage.setItem(this.props.name + 'data', JSON.stringify(newData)); //用于后期获取所有数据

        this.setState({
            data: newData,
            value: this.state.value,
            text: text
        });
    },
    changeHandler: function changeHandler(event) {
        //一害绑定，但不处理
        if (this.state.readonly) {
            event.preventDefault();
        }
    },
    onSelect: function onSelect(value, text, data, e) {
        //选中事件
        e.preventDefault(); //因为有用户借助label属性生成新的checkbox,所以要阻止默认事件
        if (this.state.readonly) {
            return;
        }
        var newvalue = "";var newtext = "";
        var oldvalue = "";
        var oldtext = "";
        if (!this.state.value) {//没有选择任何项
        } else {
            oldvalue = this.state.value.toString();
        }
        if (!this.state.text) {//没有选择任何项
        } else {
            oldtext = this.state.text.toString();
        }
        if (("," + oldvalue).indexOf("," + value) > -1) {
            //取消选中
            if (oldvalue.indexOf("," + value) > -1) {
                //说明不是第一个
                newvalue = oldvalue.replace("," + value, "");
                newtext = oldtext.replace("," + text, "");
            } else if (oldvalue.indexOf(value + ",") > -1) {
                //第一个
                newvalue = oldvalue.replace(value + ",", "");
                newtext = oldtext.replace(text + ",", "");
            } else if (oldvalue.indexOf(value) > -1) {
                //只有一个
                newvalue = oldvalue.replace(value, "");
                newtext = oldtext.replace(text, "");
            }
        } else {
            //选中

            newvalue = oldvalue === "" ? value : oldvalue + "," + value;
            newtext = oldvalue === "" ? text : oldtext + "," + text;
        }
        this.setState({
            value: newvalue,
            text: newtext
        });
        this.validate(newvalue);
        if (this.props.onSelect != null) {
            this.props.onSelect(newvalue, newtext, this.props.name, data);
        }
    },
    render: function render() {
        var _this = this;

        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size + " " + (this.props.className ? this.props.className : ""); //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var control = null;
        if (this.state.data instanceof Array) {
            control = this.state.data.map(function (child, i) {
                var checked = false;
                if (_this.state.value != null && _this.state.value != undefined && ("," + _this.state.value.toString()).indexOf("," + child[_this.props.valueField]) > -1) {
                    checked = true;
                }
                var props = {
                    checked: checked == true ? "checked" : null, //是否为选中状态
                    readOnly: _this.state.readonly == true ? "readonly" : null
                };
                return React.createElement(
                    "li",
                    { key: i, onClick: _this.onSelect.bind(_this, child.value, child.text, child) },
                    React.createElement("input", _extends({ type: "checkbox", id: "checkbox" + _this.props.name + child.value, value: child.value,

                        onChange: _this.changeHandler, className: "checkbox" }, props)),
                    React.createElement("label", _extends({ className: "checkbox-label" }, props)),
                    React.createElement(
                        "div",
                        { className: "checktext" },
                        child.text
                    )
                );
            });
        }
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, style: controlStyle },
            React.createElement(Label, { name: this.props.label, hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "ul",
                    { className: "wasabi-checkul" },
                    control
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }

});
module.exports = CheckBox;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-04-25
//edit 2016-09-27重写
//desc:日期组件，
var React = __webpack_require__(1);
var Lang = __webpack_require__(35);
__webpack_require__(44);
var CalendarHeader = __webpack_require__(118);
var CalendarBody = __webpack_require__(117);
var shouldComponentUpdate = __webpack_require__(8);
var DateD = React.createClass({
    displayName: "DateD",

    mixins: [shouldComponentUpdate],
    PropTypes: {
        name: React.PropTypes.string, //字段名称，对应于表单
        year: React.PropTypes.number, //年
        month: React.PropTypes.number, //月
        day: React.PropTypes.number, //日
        isRange: React.PropTypes.bool, //是否为范围选择
        min: React.PropTypes.number, //最小值，用于日期范围选择
        max: React.PropTypes.number, //最大值,用于日期范围选择
        onSelect: React.PropTypes.func, //选择后的事件
        attachTime: React.PropTypes.bool //j是否附加时间格式

    },
    getDefaultProps: function getDefaultProps() {
        return {
            year: null,
            month: null,
            day: null,
            isRange: false, ///默认否
            min: null, //默认为空，不属于日期范围选择
            max: null, //默认为空，不属于日期范围选择
            attachTime: true
        };
    },
    getInitialState: function getInitialState() {
        var newDate = new Date();
        var year = this.formatDate(newDate, 'yyyy');
        var month = this.formatDate(newDate, 'MM');
        return {
            year: this.props.year ? this.props.year : year,
            month: this.props.month ? this.props.month : month,
            day: this.props.day,
            isRange: this.props.isRange,
            min: this.props.min,
            max: this.props.max,
            changeYear: false, //选择年份
            changeMonth: false //选择月份
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isRange == true) {
            //是日期范围选择，要更新最大值与最小值
            this.setState({
                year: nextProps.year ? nextProps.year : this.state.year,
                month: nextProps.month ? nextProps.month : this.state.month,
                day: nextProps.day,
                isRange: nextProps.isRange,
                min: nextProps.min,
                max: nextProps.max
            });
        } else {
            this.setState({
                year: nextProps.year ? nextProps.year : this.state.year,
                month: nextProps.month ? nextProps.month : this.state.month,
                day: nextProps.day,
                isRange: nextProps.isRange
            });
        }
    },
    updateYearAndMonth: function updateYearAndMonth(filterYear, filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth,
            day: null, //清空
            min: null,
            max: null
        });

        if (this.props.updateYearAndMonth != null) {
            this.props.updateYearAndMonth(filterYear, filterMonth);
        }
    },
    dayHandler: function dayHandler(day) {
        this.setState({
            day: day,
            min: day,
            max: day
        });
        if (this.props.onSelect != null) {
            var value = this.state.year + "-" + (this.state.month.toString().length == 1 ? "0" + this.state.month.toString() : this.state.month) + "-" + (day < 10 ? "0" + day.toString() : day);
            if (this.props.attachTime) {
                //如果需要附加时间
                value = value + " 00:00:00";
            }
            this.props.onSelect(value, value, this.props.name);
        }
    },
    formatDate: function formatDate(date, format) {
        /**
         * 对Date的扩展，将 Date 转化为指定格式的String
         * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
         * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         * eg:
         * Utils.formatDate(new Date(),'yyyy-MM-dd') ==> 2014-03-02
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm') ==> 2014-03-02 05:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd HH:mm') ==> 2014-03-02 17:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
         * Utils.formatDate(new Date(),'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
         */
        if (!date) return;
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "\u65E5",
            "1": "\u4E00",
            "2": "\u4E8C",
            "3": "\u4E09",
            "4": "\u56DB",
            "5": "\u4E94",
            "6": "\u516D"
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "\u661F\u671F" : "\u5468" : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    changeYear: function changeYear() {
        this.setState({
            changeYear: !this.state.changeYear,
            changeMonth: false
        });
    },
    changeMonth: function changeMonth() {
        this.setState({
            changeYear: false,
            changeMonth: !this.state.changeMonth
        });
    },
    changeYearHandler: function changeYearHandler(value) {

        this.setState({
            year: value,
            changeYear: false,
            changeMonth: false,
            day: null, //清空
            min: null,
            max: null
        });
    },
    changeMonthHandler: function changeMonthHandler(value) {
        this.setState({
            month: value,
            changeYear: false,
            changeMonth: false,
            day: null, //清空
            min: null,
            max: null
        });
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "wasabi-datetime" },
            React.createElement(CalendarHeader, {
                year: this.state.year,
                month: this.state.month,
                updateFilter: this.updateYearAndMonth,
                changeYear: this.changeYear,
                changeMonth: this.changeMonth
            }),
            React.createElement(CalendarBody, {
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                isRange: this.state.isRange,
                min: this.state.min,
                max: this.state.max,
                dayHandler: this.dayHandler,
                changeYear: this.state.changeYear,
                changeMonth: this.state.changeMonth,
                changeYearHandler: this.changeYearHandler,
                changeMonthHandler: this.changeMonthHandler
            })
        );
    }
});
module.exports = DateD;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 create by wangzy
 date:2016-04-05后开始独立改造
 desc:通用表单组件
 */
__webpack_require__(305);
var React = __webpack_require__(1);
var regexp = __webpack_require__(36);
var validation = __webpack_require__(16);
var Radio = __webpack_require__(57);
var CheckBox = __webpack_require__(54);
var SwitchButton = __webpack_require__(132);
var ComboBox = __webpack_require__(119);
var Text = __webpack_require__(80);
var None = __webpack_require__(127);
var Button = __webpack_require__(10);
var LinkButton = __webpack_require__(26);
var setStyle = __webpack_require__(11);
var unit = __webpack_require__(5);
var shouldComponentUpdate = __webpack_require__(8);
var Input = React.createClass({
    displayName: "Input",

    mixins: [setStyle, shouldComponentUpdate],
    propTypes: {
        type: React.PropTypes.oneOf(["none", //空的占位符
        "text", //普通输入框
        "password", //密码
        "email", //邮箱
        "url", //网址
        "mobile", //手机
        "idcard", //身份证
        "date", //日期
        "time", //时间
        "datetime", //日期时间
        "daterange", //日期范围
        "datetimerange", //日期时间范围
        "alpha", //英文字母
        "alphanum", //英文字母与数字
        "integer", //整型数据
        "number", //数字
        "textarea", //多行文本
        "select", //下拉框
        "radio", //单选框
        "checkbox", //复选框
        "switch", //开关
        "picker", //级联选择组件
        "gridpicker", //列表选择
        "treepicker", //下拉树选择
        "panelpicker", //面板选择
        "muti" //多行文本
        ]), //输入框的类型
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        controlStyle: React.PropTypes.object, //自定义外层样式
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性 text
        min: React.PropTypes.number, //最小值,最小长度,最少选项
        max: React.PropTypes.number, //最大值,最大长度,最多选项
        onClick: React.PropTypes.func, //单击事件
        onChange: React.PropTypes.func, //值改变事件

        //其他属性 combobox
        multiple: React.PropTypes.bool, //是否允许多选
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        extraData: React.PropTypes.array, //额外的数据,对url有效
        onSelect: React.PropTypes.func, //选中后的事件，回传，value,与text,data

        //其他属性 picker
        secondUrl: React.PropTypes.string, //第二层节点的后台地址,
        secondParams: React.PropTypes.object, //第二层节点的后台参数
        secondParamsKey: React.PropTypes.string, //第二层节点的后台参数中传递一级节点value值的参数名称
        thirdUrl: React.PropTypes.string, //第三层节点的后台地址，
        thirdParams: React.PropTypes.object, //第三层节点的后台参数
        thirdParamsKey: React.PropTypes.string, //第三层节点的后台参数中传递二级节点value值的参数名称
        hotTitle: React.PropTypes.string, //热门选择标题
        hotData: React.PropTypes.array, //热门选择的数据

        //其他属性,参见其他按钮
        iconCls: React.PropTypes.string,
        iconAlign: React.PropTypes.oneOf(["left", "right", "rightTop"]) //图片位置

    },
    getDefaultProps: function getDefaultProps() {
        return {
            type: "text",
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            controlStyle: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            row: 5,
            min: null,
            max: null,
            onClick: null,
            onChange: null,

            //其他属性
            multiple: false,
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            extraData: null,
            onSelect: null,

            //其他属性
            secondUrl: null,
            secondParams: null,
            secondParamsKey: null,
            thirdUrl: null,
            thirdParams: null,
            thirdParamsKey: null,
            hotTitle: "热门选择",
            hotData: null
        };
    },
    getInitialState: function getInitialState() {
        return {
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,
            hide: this.props.hide,
            data: this.props.data,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            hide: nextProps.hide,
            value: nextProps.value,
            text: nextProps.text,
            readonly: nextProps.readonly,
            required: nextProps.required,
            data: nextProps.data
        });
    },
    changeHandler: function changeHandler(event) {
        //文本框的值改变事件
        this.setState({
            value: event.target.value,
            text: event.target.value
        });
        if (this.props.onChange != null) {
            this.props.onChange(event.target.value); //自定义的改变事件
        }
        //回传给表单组件
        if (this.props.backFormHandler != null) {
            this.props.backFormHandler(event.target.value, event.target.value, this.props.name);
        }
    },
    clickHandler: function clickHandler(event) {
        //单击事件
        if (this.props.onClick != null) {
            var model = {};
            try {
                //有可能存在复制不成功的情况
                model = _extends({}, this.props);
            } catch (e) {}
            model.value = this.state.value;
            model.text = this.state.text;
            this.props.onClick(this.props.name, this.state.value, model);
        }
    },
    buttonClick: function buttonClick(name, title, event) {
        //按钮的单击事件
        if (this.props.onClick != null) {
            this.props.onClick(name, title, event);
        }
    },
    validate: function validate(value) {
        if (this.props.type == "button" || this.props.type == "linkbutton") {
            return true;
        } else {
            return this.refs.input.validate();
        }
    },
    onSelect: function onSelect(value, text, name, data) {
        //保存选中的值
        this.setState({
            value: value,
            text: text
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(value, text, this.props.name, data); //回调
        }
        //回传给表单组件
        if (this.props.backFormHandler != null) {
            this.props.backFormHandler(value, text, name, data);
        }
    },
    getComponentData: function getComponentData(name) {
        //只读属性，获取对应的字段的数据源
        return JSON.parse(window.localStorage.getItem(name + "data"));
    },
    renderText: function renderText() {
        //普通文本框
        var props = _extends({}, this.props); ////原有的属性
        props.value = this.state.value; //注意绑定
        props.text = this.state.text; //
        return React.createElement(Text, _extends({ ref: "input" }, props));
    },
    renderUnInput: function renderUnInput(type) {
        //非输入框组件
        var control; //组件
        var props = _extends({}, this.props); ////原有的属性
        props.value = this.state.value; //注意绑定
        props.text = this.state.text; //
        if (type == "none") {
            //空占位组件
            control = React.createElement(None, _extends({ ref: "input" }, props));
        } else if (type == "radio") {
            //单选按钮组
            control = React.createElement(Radio, _extends({ ref: "input" }, props, { onSelect: this.onSelect }));
        } else if (type == "checkbox") {
            //多选择按钮组
            control = React.createElement(CheckBox, _extends({ ref: "input" }, props, { onSelect: this.onSelect }));
        } else if (type == "switch") {
            //开关
            control = React.createElement(SwitchButton, _extends({ ref: "input" }, props, { onSelect: this.onSelect }));
        } else if (type == "muti" || type == "select" || type == "datetime" || type == "time" || type == "date" || type == "daterange" || type == "datetimerange" || type == "picker" || type == "treepicker" || type == "gridpicker" || type == "panelpicker") {
            //下拉组件
            control = React.createElement(ComboBox, _extends({ ref: "input" }, props, { onSelect: this.onSelect }));
        }

        return control;
    },
    render: function render() {
        var size = this.props.onlyline ? "onlyline" : this.props.size;
        var componentClassName = "wasabi-form-group " + size + " " + (this.props.className ? this.props.className : ""); //组件的基本样式
        var style = this.props.style;
        if (this.props.type == "button") {

            return React.createElement(
                "div",
                { className: componentClassName, style: style },
                "   ",
                React.createElement(Button, _extends({}, this.props, { title: this.props.label, onClick: this.buttonClick }))
            );
        } else if (this.props.type == "linkbutton") {
            return React.createElement(
                "div",
                { className: componentClassName, style: style },
                React.createElement(LinkButton, _extends({}, this.props, { title: this.props.label,
                    onClick: this.buttonClick }))
            );
        } else {
            if (this.props.type == "text" || this.props.type == "email" || this.props.type == "url" || this.props.type == "number" || this.props.type == "integer" || this.props.type == "alpha" || this.props.type == "alphanum" || this.props.type == "mobile" || this.props.type == "idcard" || this.props.type == "password" || this.props.type == "textarea") {
                //这几种类型统一为text

                return this.renderText();
            } else {
                //输入文本输入框类型

                return this.renderUnInput(this.props.type);
            }
        }

        return null;
    }
});
module.exports = Input;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 单选框集合组件
 */
__webpack_require__(147);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var showUpdate = __webpack_require__(22);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var Message = __webpack_require__(14);
var Radio = React.createClass({
    displayName: "Radio",

    mixins: [setStyle, validate, showUpdate, shouldComponentUpdate],
    PropTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        extraData: React.PropTypes.array, //额外的数据,对url有效
        onSelect: React.PropTypes.func //选中后的事件，回传，value,与text,data

    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            extraData: null,
            onSelect: null
        };
    },
    getInitialState: function getInitialState() {
        var newData = [];var text = this.props.text;
        if (this.props.data && this.props.data instanceof Array) {
            for (var i = 0; i < this.props.data.length; i++) {
                var obj = this.props.data[i];
                obj.text = this.props.data[i][this.props.textField];
                obj.value = this.props.data[i][this.props.valueField];
                if (obj.value == this.props.value) {
                    text = obj.text; //根据value赋值
                }
                newData.push(obj);
            }
        }
        return {
            hide: this.props.hide,
            params: unit.clone(this.props.params), //参数
            data: newData,
            value: this.props.value,
            text: text,
            ulShow: false, //是否显示下拉选项
            readonly: this.props.readonly,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var newData = [];var text = nextProps.text;
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {

            for (var i = 0; i < nextProps.data.length; i++) {
                var obj = nextProps.data[i];
                obj.text = nextProps.data[i][this.props.textField];
                obj.value = nextProps.data[i][this.props.valueField];
                if (obj.value == nextProps.value) {
                    text = obj.text; //根据value赋值
                }
                newData.push(obj);
            }
            this.setState({
                hide: nextProps.hide,
                data: newData,
                value: nextProps.value,
                text: text,
                params: unit.clone(nextProps.params),
                readonly: nextProps.readonly,
                required: nextProps.required,
                validateClass: "", //重置验证样式
                helpTip: validation["required"] //提示信息
            });
        } else {

            if (nextProps.url != null) {

                if (this.showUpdate(nextProps.params)) {
                    //如果不相同则更新
                    this.loadData(nextProps.url, nextProps.params);
                } else {}
            }

            this.setState({
                hide: nextProps.hide,
                value: nextProps.value,
                text: text,
                params: unit.clone(nextProps.params),
                readonly: nextProps.readonly,
                required: nextProps.required,
                validateClass: "", //重置验证样式
                helpTip: validation["required"] //提示信息
            });
        }
    },
    componentWillMount: function componentWillMount() {
        //如果指定url,先查询数据再绑定
        this.loadData(this.props.url, this.state.params); //查询数据
    },

    loadData: function loadData(url, params) {
        if (url != null && url != "") {
            if (params == null) {
                var fetchmodel = new FetchModel(url, this.loadSuccess, null, this.loadError);
                unit.fetch.get(fetchmodel);
            } else {
                var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
                unit.fetch.post(fetchmodel);
            }
            console.log("radio", fetchmodel);
        }
    },
    loadSuccess: function loadSuccess(data) {
        //数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        var newData = [];var text = this.state.text;
        for (var i = 0; i < realData.length; i++) {
            var obj = realData[i]; //将所有字段添加进来
            obj.text = realData[i][this.props.textField];
            obj.value = realData[i][this.props.valueField];
            if (obj.value == this.state.value) {
                text = obj.text; //根据value赋值
            }
            newData.push(obj);
        }
        if (this.props.extraData == null || this.props.extraData.length == 0) {
            //没有额外的数据
        } else {
            //有额外的数据
            for (var _i = 0; _i < this.props.extraData.length; _i++) {
                var _obj = {};
                _obj.text = this.props.extraData[_i][this.props.textField];
                _obj.value = this.props.extraData[_i][this.props.valueField];
                if (_obj.value == this.state.value) {
                    text = _obj.text; //根据value赋值
                }
                newData.unshift(_obj);
            }
        }
        window.localStorage.setItem(this.props.name + 'data', JSON.stringify(newData)); //用于后期获取所有数据

        this.setState({
            data: newData,
            value: this.state.value,
            text: text
        });
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("radio-error", errorCode, message);
        Message.error(message);
    },
    changeHandler: function changeHandler(event) {//一害绑定，但不处理

    },
    onSelect: function onSelect(value, text, data) {
        //选中事件
        if (!this.state.readonly && (this.props.onBeforeSelect && value != this.state.value && this.props.onBeforeSelect(value, text, data) || !this.props.onBeforeSelect)) {
            this.setState({
                value: value,
                text: text
            });
            this.validate(value);
            if (this.props.onChange) {
                this.props.onChange(value, text, this.props.name, data);
            }
            if (this.props.onSelect != null) {
                this.props.onSelect(value, text, this.props.name, data);
            }
        }
    },
    render: function render() {
        var _this = this;

        var inputType = "text";
        if (this.props.type == "password") {
            inputType = "password";
        }
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size + " " + (this.props.className ? this.props.className : ""); //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";

        var control = null;
        var className = "wasabi-radio-btn " + (this.state.readonly ? " readonly" : "");
        if (this.state.data) {
            control = this.state.data.map(function (child, i) {
                var textFeild = child.text;
                var hideComponent = null;
                if (_this.props.hideComponents instanceof Array && _this.props.hideComponents[i]) {
                    hideComponent = _this.props.hideComponents[i];
                }
                return React.createElement(
                    "li",
                    { key: i },
                    React.createElement(
                        "div",
                        { className: className + (_this.state.value == child.value ? " checkedRadio" : ""),
                            onClick: _this.onSelect.bind(_this, child.value, child.text, child) },
                        React.createElement(
                            "i",
                            null,
                            React.createElement("input", { type: "radio", name: _this.props.name,
                                id: _this.props.name + child.value,
                                value: child.value,
                                onChange: _this.changeHandler })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "radiotext", onClick: _this.onSelect.bind(_this, child.value, child.text, child) },
                        textFeild,
                        React.createElement(
                            "div",
                            {
                                style: { display: _this.state.value == child.value ? " inline-block" : "none" } },
                            hideComponent
                        )
                    )
                );
            });
        }
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, style: controlStyle },
            React.createElement(Label, { name: this.props.label, hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "ul",
                    { className: "wasabi-checkul" },
                    control
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position,
                        style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }

});
module.exports = Radio;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 2016/12/6.
 * 在点击时 ，按钮的添加波纹特效
 *
 */
var React = __webpack_require__(1);
var addRipple = {
    rippleHandler: function rippleHandler(event) {
        var $ripple;
        if (event.target.children.length > 0) {

            for (var i = 0; i < event.target.children.length; i++) {
                if (event.target.children[i].className == "ripple") {
                    event.target.removeChild(event.target.children[i]);
                    break;
                }
            }
        }
        $ripple = document.createElement("span");
        $ripple.className = "ripple";
        event.target.appendChild($ripple);
        $ripple.style.left = event.clientX - event.target.getBoundingClientRect().left - event.target.getBoundingClientRect().width / 2 + "px";
        $ripple.style.top = event.clientY - event.target.getBoundingClientRect().Top - event.target.getBoundingClientRect().height / 2 + "px";
    }
};
module.exports = addRipple;

/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 *Created by wangzhiyong on 2016-04-05
 * desc:列表组件,由此组件开始独立重构所组件,不再依赖
 * wasabi框架的第一个组件
 * 2016-06-09后开始调整整个样式
 * 2017-01-04 注意了,这里渲染分页与复制的CopyDataGrid不一样，因为CopyDataGrid宽度比较小可能放不下
 *
 */
__webpack_require__(145);
__webpack_require__(146);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var Button = __webpack_require__(10);
var LinkButton = __webpack_require__(26);
var CheckBox = __webpack_require__(54);
var Input = __webpack_require__(56);
var Radio = __webpack_require__(57);
var Message = __webpack_require__(14);
var Transfer = __webpack_require__(78);
var shouldComponentUpdate = __webpack_require__(8);
var DataGridHandler = __webpack_require__(138);
var DataGridExtend = __webpack_require__(137);
var pasteExtend = __webpack_require__(81);
var ClickAway = __webpack_require__(24);
var showUpdate = __webpack_require__(22);
var regs = __webpack_require__(36);

var DataGrid = React.createClass({
    displayName: "DataGrid",

    mixins: [shouldComponentUpdate, DataGridHandler, DataGridExtend, pasteExtend, ClickAway, showUpdate],
    propTypes: {
        width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //宽度
        height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //高度
        selectAble: React.PropTypes.bool, // 是否显示选择，默认值 false
        singleSelect: React.PropTypes.bool, //是否为单选,默认值为 false
        detailAble: React.PropTypes.bool, //是否显示详情,默认值 false
        focusAble: React.PropTypes.bool, //是否显示焦点行，默认值 false
        editAble: React.PropTypes.bool, //是否允许编辑
        borderAble: React.PropTypes.bool, //是否显示表格边框，默认值 false

        clearChecked: React.PropTypes.bool, //刷新数据后是否清除选择,true
        selectChecked: React.PropTypes.bool, //选择行的时候是否同时选中,false
        pagination: React.PropTypes.bool, //是否分页,默认值 true

        pageIndex: React.PropTypes.number, //当前页号
        pageSize: React.PropTypes.number, //分页大小，默认20
        sortName: React.PropTypes.string, //排序字段,
        sortOrder: React.PropTypes.oneOf(["asc", "desc"]), //排序方式,默认asc,
        keyField: React.PropTypes.string, //关键字段
        headers: React.PropTypes.array, //表头设置
        footer: React.PropTypes.array, //页脚,
        total: React.PropTypes.number, // 总条目数，有url没用，默认为 0
        data: React.PropTypes.array, //当前页数据（json）

        url: React.PropTypes.string, //ajax地址

        backSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源(旧版本)
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源(新版本)
        footerSource: React.PropTypes.string, //页脚数据源,
        totalSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为总记录数源

        params: React.PropTypes.object, //查询条件
        onClick: React.PropTypes.func, //单击事件
        onDoubleClick: React.PropTypes.func, //双击事件
        onChecked: React.PropTypes.func, //监听表格中某一行被选中/取消
        updateHandler: React.PropTypes.func, //手动更新事件，父组件一定要有返回值,返回详情组件
        detailHandler: React.PropTypes.func, //展示详情的函数，父组件一定要有返回值,返回详情组件


        pagePosition: React.PropTypes.oneOf(["top", "bottom", "both"]), //分页栏的位置

        pasteUrl: React.PropTypes.string, //粘贴后的url
        pasteParamsHandler: React.PropTypes.func, //对粘贴后的数据进行处理,形成参数并且返回
        menu: React.PropTypes.bool, //是否显示菜单按钮
        menuPanel: React.PropTypes.any, //菜单面板
        headerUrl: React.PropTypes.string, //自定义列地址

        updateUrl: React.PropTypes.string //列更新的地址


    },
    getDefaultProps: function getDefaultProps() {
        return {
            width: "100%",
            height: null,
            selectAble: false,
            singleSelect: false,
            detailAble: false,
            focusAble: true,
            borderAble: false,
            clearChecked: true, //是否清空选择的
            selectChecked: false,
            pagination: true,
            pageIndex: 1,
            pageSize: 20,
            sortName: "id",
            sortOrder: "asc",
            keyField: "id",
            headers: [],
            total: 0,
            data: [],
            url: null, //
            backSource: "rows", //
            dataSource: "rows", //
            totalSource: "total", //
            params: null,
            footer: null, //页脚
            onClick: null,
            onDoubleClick: null,

            onChecked: null,
            updateHandler: null,
            detailHandler: null,

            footerSource: "footer", //页脚数据源

            pagePosition: "bottom", //默认分页在底部

            pasteUrl: null,
            pasteParamsHandler: null,
            menu: false,
            menuPanel: null,
            headerUrl: null,
            editAble: false, //是否允许编辑
            updateUrl: null

        };
    },
    getInitialState: function getInitialState() {
        this.clientHeight = document.documentElement.clientHeight; //先得到高度,防止后期页面发生晃动
        var data = [];
        if (this.props.data instanceof Array) {
            data = this.props.data;
        }
        return {
            url: this.props.url,

            params: unit.clone(this.props.params), //这里一定要复制,只有复制才可以比较两次参数是否发生改变没有,防止父组件状态任何改变而导致不停的查询
            pageIndex: this.props.pageIndex,
            pageSize: this.props.pageSize,
            sortName: this.props.sortName,
            sortOrder: this.props.sortOrder,
            data: this.props.pagination == true ? data.slice(0, this.props.pageSize) : data, //只只保留当前的数据
            checkedData: new Map(),
            detailView: null, //详情行,
            detailIndex: null, //显示详情的行下标
            total: this.props.total, //总记录数
            loading: this.props.url || this.props.headerUrl ? true : false, //显示正在加载图示
            footer: this.props.footer, //页脚
            headers: this.props.headers, //表头会可能后期才传送,也会动态改变
            height: this.props.height, //如果没有设置高度还要从当前页面中计算出来空白高度,以适应布局
            headerMenu: [], //被隐藏的列
            panelShow: false, //列表的操作面板
            menu: this.props.menu,
            menuPanel: this.props.menuPanel,
            headerUrl: this.props.headerUrl,
            updateUrl: this.props.updateUrl,
            editAble: this.props.editAble,
            editIndex: null, //当前处理编辑的列
            addData: new Map(), //新增的数据,因为有可能新增一个空的，然后再修改
            updatedData: new Map(), //被修改过的数据，因为要判断曾经是否修改
            deleteData: [] //删除的数据


        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
         url与params而url可能是通过reload方法传进来的,并没有作为状态值绑定
         headers可能是后期才传了,见Page组件可知
         所以此处需要详细判断
         另外 pageSize组件
         */
        if (nextProps.url) {
            //说明父组件将url作为状态值来绑定的
            /*
             注意了***************（见reload方法）
             isReloadType的作用:
             为真:说明是通过reload方法来执行更新的,组件本身的params与父组件的params已经不同步了,不能更新
             为假:说明是父组件仅仅使用了状态值作为通信方式,先判断是否有params变化，没有则不查询,有从第一页开始查询
             *********
             */
            if (nextProps.headers) {
                //存在着这种情况,后期才传headers,所以要更新一下
                this.setState({
                    headers: nextProps.headers
                });
            }
            if (this.state.headerUrl != nextProps.headerUrl) {
                //有远程加载表头信息
                this.getHeaderDataHandler(nextProps.headerUrl);
            } else if (this.isReloadType != true && this.showUpdate(nextProps.params, this.state.params)) {
                //仅仅通过状态值更新,参数有变,更新
                this.updateHandler(nextProps.url, this.state.pageSize, 1, this.state.sortName, this.state.sortOrder, nextProps.params);
            } else {
                //父组件状态值没有发生变化,或者使用reload方法更新的
                //不处理
                if (this.state.url != nextProps.url) {
                    //有远程加载表头信息
                    this.updateHandler(nextProps.url, this.state.pageSize, 1, this.state.sortName, this.state.sortOrder, nextProps.params);
                }
            }
        } else {
            //说明父组件将url没有作为状态值来绑定的
            if (this.state.url) {
                //组件本身的url不为空说明通过reload方法绑定了url,父组件本身没有绑定url,所以不能查询

                if (nextProps.headers) {
                    //存在着这种情况,后期才传headers,所以要更新一下
                    this.setState({
                        headers: nextProps.headers
                    });
                }
            } else {
                //没有url时，自定义更新事件
                if (nextProps.data != null && nextProps.data != undefined && nextProps.data instanceof Array) {
                    this.setState({
                        data: this.props.pagination == true ? nextProps.data.slice(0, nextProps.pageSize) : nextProps.data,
                        total: nextProps.total,
                        pageIndex: nextProps.pageIndex,
                        pageSize: nextProps.pageSize,
                        sortName: this.props.sortName,
                        sortOrder: nextProps.sortOrder,
                        loading: false,
                        headers: nextProps.headers, //表头可能会更新
                        menuPanel: nextProps.menuPanel
                    });
                }
            }
        }
    },
    componentDidMount: function componentDidMount() {
        //渲染后再开始加载数据
        if (this.state.headerUrl) {
            //如果存在自定义列
            this.getHeaderDataHandler();
        }
        if (this.state.url) {
            //如果存在url,
            this.updateHandler(this.state.url, this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder);
        }
        this.registerClickAway(this.hideMenuHandler, this.refs.grid); //注册全局单击事件
    },
    componentDidUpdate: function componentDidUpdate() {
        this.setWidthAndHeight(); //重新计算列表的高度,固定的表头每一列的宽度
    },
    renderHeader: function renderHeader() {
        var _this = this;

        //渲染表头
        if (this.state.headers instanceof Array) {} else {
            return null;
        }
        var headers = [];

        if (this.props.selectAble) {
            var props = {
                value: this.checkCurrentPageCheckedAll() == true ? "yes" : null,
                data: [{ value: "yes", text: "" }],
                onSelect: this.checkedAllHandler,
                name: "all"
                //使用label,因为多个列可能绑定一个字段
            };if (this.props.singleSelect == true) {
                headers.push(React.createElement(
                    "th",
                    { key: "headercheckbox", className: "check-column", name: "check-column", style: { width: 35 } },
                    React.createElement("div", { className: "wasabi-grid-cell", name: "check-column" })
                ));
            } else {
                headers.push(React.createElement(
                    "th",
                    { key: "headercheckbox", className: "check-column", name: "check-column", style: { width: 35 } },
                    React.createElement(
                        "div",
                        { className: "wasabi-grid-cell", name: "check-column" },
                        React.createElement(CheckBox, props)
                    )
                ));
            }
        }
        this.state.headers.map(function (header, index) {

            if (!header || header.hide == true) {
                //隐藏则不显示
                return;
            } else {
                if (_this.state.headerMenu.length > 0 && _this.state.headerMenu.indexOf(header.label) > -1) {
                    //父组件更新状态值，发现某一行处理被隐藏中，则不显示
                    return;
                } else {
                    var sortOrder = "";
                    var props = {}; //设置单击事件
                    if (header.sortAble == true) {
                        sortOrder = " both";
                        if (_this.state.sortName == header.name) {
                            //是当前排序字段
                            sortOrder += " " + _this.state.sortOrder;
                            props.onClick = header.sortAble == true ? _this.onSort.bind(_this, header.name, _this.state.sortOrder == "asc" ? "desc" : "asc") : null;
                        } else {
                            props.onClick = header.sortAble == true ? _this.onSort.bind(_this, header.name, "asc") : null;
                        }
                    }
                    //使用label作为元素name属性，是因为可能有多个列对应同一个字段
                    var menuControl = null; //打开操作面板的菜单图标
                    var savecontrol = null; //保存按钮
                    if (_this.state.menu && index == 0) {
                        //在第一列显示
                        menuControl = React.createElement(LinkButton, { key: "menu", style: { color: "#666666", fontSize: 12, position: "absolute" }, iconCls: "icon-catalog", name: "menu", tip: "\u83DC\u5355", onClick: _this.panelShow });
                    }
                    if (_this.state.editIndex != null && index == 0) {
                        //0是有效值
                        savecontrol = React.createElement(LinkButton, { key: "save", style: { color: "#666666", fontSize: 12, position: "absolute" }, iconCls: "icon-submit", name: "save", tip: "\u4FDD\u5B58", onClick: _this.remoteUpdateRow.bind(_this, null) });
                    }

                    headers.push(React.createElement(
                        "th",
                        _extends({ key: "header" + index.toString(), name: header.label }, props, {
                            className: "" + sortOrder,
                            style: { textAlign: header.align ? header.align : "left" },
                            onMouseMove: _this.headerMouseMoveHandler,
                            onContextMenu: _this.headerContextMenuHandler,
                            onMouseDown: _this.headerMouseDownHandler }),
                        React.createElement(
                            "div",
                            { className: "wasabi-grid-cell", name: header.label, style: {
                                    width: header.width ? header.width : null,
                                    textAlign: header.align ? header.align : "left"
                                } },
                            React.createElement(
                                "span",
                                null,
                                header.label
                            ),
                            menuControl,
                            savecontrol
                        )
                    ));
                }
            }
        });

        return headers;
    },
    renderBody: function renderBody() {
        var _this2 = this;

        //渲染表体
        var trobj = [];
        if (this.state.data instanceof Array && this.state.headers instanceof Array) {} else {
            return;
        }

        this.state.data.map(function (rowData, rowIndex) {
            var tds = []; //当前的列集合
            var key = _this2.getKey(rowIndex); //获取这一行的关键值
            //设置这一行的选择列
            if (_this2.props.selectAble) {
                var props = {
                    value: _this2.state.checkedData.has(key) == true ? key : null,
                    data: [{ value: key, text: "" }],
                    onSelect: _this2.onChecked.bind(_this2, rowIndex),
                    name: key
                };

                if (_this2.props.singleSelect == true) {
                    tds.push(React.createElement(
                        "td",
                        { key: "bodycheckbox" + rowIndex.toString(), className: "check-column", style: { width: 35 } },
                        React.createElement(
                            "div",
                            { className: "wasabi-grid-cell" },
                            " ",
                            React.createElement(Radio, props)
                        )
                    ));
                } else {
                    tds.push(React.createElement(
                        "td",
                        { key: "bodycheckbox" + rowIndex.toString(), className: "check-column", style: { width: 35 } },
                        React.createElement(
                            "div",
                            { className: "wasabi-grid-cell" },
                            React.createElement(CheckBox, props)
                        )
                    ));
                }
            }

            //生成数据列
            _this2.state.headers.map(function (header, columnIndex) {
                if (!header || header.hide) {
                    return;
                }
                if (_this2.state.headerMenu.length > 0 && _this2.state.headerMenu.indexOf(header.label) > -1) {
                    //父组件更新状态值，发现某一行处理被隐藏中，则不显示
                    return;
                }

                var content = header.content;
                if (typeof content === 'string') {
                    //指定的列
                    content = _this2.substitute(content, rowData);
                } else if (typeof content === 'function') {
                    //函数
                    try {
                        content = content(rowData, rowIndex);
                    } catch (e) {
                        content = "";
                    }
                } else {
                    //为空时
                    content = rowData[header.name];
                }

                if (_this2.state.editIndex != null && _this2.state.editIndex == rowIndex && header.editor) {
                    var currentValue = rowData[header.name];
                    var currentText = rowData[header.name];
                    if (typeof header.editor.content === 'function') {
                        var valueResult = header.editor.content(rowData, rowIndex);
                        if (valueResult) {
                            currentValue = valueResult.value;
                            currentText = valueResult.text;
                        }
                    }
                    tds.push(React.createElement(
                        "td",
                        { onClick: _this2.onClick.bind(_this2, rowIndex, rowData),
                            onDoubleClick: _this2.onDoubleClick.bind(_this2, rowIndex, rowData),
                            key: "col" + rowIndex.toString() + "-" + columnIndex.toString()
                        },
                        React.createElement(
                            "div",
                            { className: "wasabi-grid-cell", style: { width: header.width ? header.width : null, textAlign: header.align ? header.align : "left" } },
                            React.createElement(Input, _extends({}, header.editor.options, { type: header.editor.type, value: currentValue, text: currentText, onChange: _this2.rowEditHandler.bind(_this2, columnIndex),
                                onSelect: _this2.rowEditHandler.bind(_this2, columnIndex), label: "" }))
                        )
                    ));
                } else {
                    if (columnIndex == 0 && _this2.props.detailAble) {

                        //在第一列显示详情
                        var iconCls = "icon-down"; //详情列的图标
                        if (_this2.state.detailIndex == key) {
                            iconCls = "icon-up"; //详情列-展开
                        }

                        tds.push(React.createElement(
                            "td",
                            { onClick: _this2.detailHandler.bind(_this2, rowIndex, rowData),
                                key: "col" + rowIndex.toString() + "-" + columnIndex.toString() },
                            React.createElement(
                                "div",
                                { className: "wasabi-grid-cell", style: { width: header.width ? header.width : null, textAlign: header.align ? header.align : "left" } },
                                React.createElement(
                                    "div",
                                    { style: { float: "left" } },
                                    " ",
                                    content
                                ),
                                React.createElement(LinkButton, { iconCls: iconCls, color: "#666666", tip: "\u67E5\u770B\u8BE6\u60C5" })
                            )
                        ));
                    } else {
                        tds.push(React.createElement(
                            "td",
                            { onClick: _this2.onClick.bind(_this2, rowIndex, rowData),
                                onDoubleClick: _this2.onDoubleClick.bind(_this2, rowIndex, rowData),
                                key: "col" + rowIndex.toString() + "-" + columnIndex.toString()
                            },
                            React.createElement(
                                "div",
                                { className: "wasabi-grid-cell", style: { width: header.width ? header.width : null, textAlign: header.align ? header.align : "left" } },
                                content
                            )
                        ));
                    }
                }
            });
            var trClassName = null;
            if (rowIndex * 1 % 2 == 0) {
                //不是选中行的时候
                trClassName = "even";
            }
            if (rowIndex * 1 == _this2.focusIndex && _this2.props.focusAble) {
                trClassName = "selected";
            }
            trobj.push(React.createElement(
                "tr",
                { className: trClassName, key: "row" + rowIndex.toString(), onMouseDown: _this2.onMouseDown.bind(_this2, rowIndex) },
                tds
            ));

            if (_this2.state.detailIndex == key) {

                trobj.push(_this2.state.detailView);
            }
        });
        return trobj;
    },
    substitute: function substitute(str, obj) {
        //得到绑定字段的内容
        return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return obj[name] === null || obj[name] === undefined ? '' : obj[name];
        });
    },
    renderTotal: function renderTotal() {
        //渲染总记录数，当前记录的下标
        if (this.state.headers && this.state.headers.length > 0) {
            var beginOrderNumber = 0;var endOrderNumber = 0; //数据开始序号与结束序
            var total = this.state.total; //总记录数
            var pageTotal = parseInt(this.state.total / this.state.pageSize); //共多少页
            if (this.state.total % this.state.pageSize > 0) {
                pageTotal++; //求余后得到最终总页数
            }
            if (pageTotal == 0) {
                //数据为空，直接返回
                return null;
            }

            var control; //记录数组件
            if (this.state.data instanceof Array) {
                if (this.state.data.length > 0) {
                    if (this.props.pagination) {
                        beginOrderNumber = this.state.pageSize * (this.state.pageIndex - 1) + 1;
                        endOrderNumber = this.state.pageSize * (this.state.pageIndex - 1) + this.state.data.length;
                    } else {
                        endOrderNumber = this.state.data.length;
                        total = this.state.data.length;
                    }
                }
            }
            var totalControl = React.createElement(
                "span",
                { className: "pagination-info" },
                "\u7B2C",
                this.state.pageIndex,
                "/",
                pageTotal,
                "\u9875,\u5171",
                total,
                "\u884C\u8BB0\u5F55"
            );
            if (this.props.pagination == false) {
                totalControl = React.createElement(
                    "span",
                    { className: "pagination-info" },
                    "\u5171",
                    total,
                    "\u884C\u8BB0\u5F55"
                );
            }
            control = React.createElement(
                "div",
                { key: "pagination-detail", className: "pagination-detail" },
                totalControl,
                React.createElement(
                    "div",
                    { style: { display: this.props.pagination ? "inline-block" : "none" } },
                    "\u6BCF\u9875",
                    React.createElement(
                        "select",
                        { className: "page-select", value: this.state.pageSize, onChange: this.pageSizeHandler },
                        React.createElement(
                            "option",
                            { value: 10 },
                            "10"
                        ),
                        React.createElement(
                            "option",
                            { value: 20 },
                            "20"
                        ),
                        React.createElement(
                            "option",
                            { value: 30 },
                            "30"
                        ),
                        React.createElement(
                            "option",
                            { value: 50 },
                            "50"
                        ),
                        React.createElement(
                            "option",
                            { value: 100 },
                            "100"
                        )
                    ),
                    "\u6761"
                )
            );
            return control;
        } else {
            return null;
        }
    },

    renderPagination: function renderPagination(type) {
        //显示分页控件
        var paginationCom = null;
        if (this.props.pagination) {

            var pageAll = parseInt(this.state.total / this.state.pageSize); //共多少页
            if (this.state.total % this.state.pageSize > 0) {
                pageAll++; //求余后得到最终总页数
            }
            if (pageAll == 0) {
                //数据为空，直接返回
                return null;
            }

            if (pageAll > 7) {
                //大于7页，
                var pageComponent = []; //分页组件
                var firstIndex = 0; //第一个显示哪一页
                var lastIndex = 0; //最后一个显示哪一页
                var predisabledli = React.createElement(
                    "li",
                    { key: "predis", className: "page-last-separator disabled" },
                    React.createElement(
                        "a",
                        { href: "javascript:void(0)" },
                        "..."
                    )
                ); //多余的分页标记
                var lastdisabledli = React.createElement(
                    "li",
                    { key: "lastdis", className: "page-last-separator disabled" },
                    React.createElement(
                        "a",
                        { href: "javascript:void(0)" },
                        "..."
                    )
                ); //多余的分页标记
                if (this.state.pageIndex >= 4 && this.state.pageIndex <= pageAll - 3) {
                    //处于中间位置的页号
                    firstIndex = this.state.pageIndex - 2;
                    lastIndex = this.state.pageIndex + 2;
                } else {
                    //非中间位置
                    if (this.state.pageIndex < 4) {
                        //靠前的位置
                        firstIndex = 2;
                        lastIndex = 6;
                        predisabledli = null; //设置为空
                    } else {
                        //靠后的位置
                        if (this.state.pageIndex > pageAll - 3) {
                            firstIndex = pageAll - 5;
                            lastIndex = pageAll - 1;
                            lastdisabledli = null; //设置为空
                        }
                    }
                }
                for (var i = firstIndex; i <= lastIndex; i++) {
                    pageComponent.push(React.createElement(
                        "li",
                        { key: "li" + i, className: "page-number " + (this.state.pageIndex * 1 == i ? "active" : "") },
                        React.createElement(
                            "a",
                            {
                                href: "javascript:void(0)", onClick: this.paginationHandler.bind(this, i) },
                            i
                        )
                    ));
                }
                pageComponent.unshift(predisabledli);pageComponent.push(lastdisabledli);
                paginationCom = React.createElement(
                    "div",
                    { className: "pull-right pagination" },
                    React.createElement(
                        "ul",
                        { className: "pagination", style: { marginTop: type == "top" ? 0 : 3, marginBottom: type == "top" ? 3 : 0 } },
                        React.createElement(
                            "li",
                            { key: "lipre", className: "page-pre" },
                            React.createElement(
                                "a",
                                { href: "javascript:void(0)", onClick: this.prePaginationHandler },
                                "\u2039"
                            )
                        ),
                        React.createElement(
                            "li",
                            { key: "lifirst", className: "page-number " + (this.state.pageIndex * 1 == 1 ? "active" : "") },
                            React.createElement(
                                "a",
                                {
                                    href: "javascript:void(0)", onClick: this.paginationHandler.bind(this, 1) },
                                1
                            )
                        ),
                        pageComponent,
                        React.createElement(
                            "li",
                            { key: "lilast", className: "page-number " + (this.state.pageIndex * 1 == pageAll ? "active" : "") },
                            React.createElement(
                                "a",
                                { href: "javascript:void(0)", onClick: this.paginationHandler.bind(this, pageAll) },
                                pageAll
                            )
                        ),
                        React.createElement(
                            "li",
                            { key: "linext", className: "page-next" },
                            React.createElement(
                                "a",
                                { href: "javascript:void(0)", onClick: this.nextPaginationHandler },
                                "\u203A"
                            )
                        )
                    )
                );
            } else {
                //小于7页直接显示

                var pagearr = [];
                for (var _i = 0; _i < pageAll; _i++) {
                    var control = React.createElement(
                        "li",
                        { key: "li" + _i, className: "page-number " + (this.state.pageIndex * 1 == _i + 1 ? "active" : "") },
                        React.createElement(
                            "a",
                            { href: "javascript:void(0)", onClick: this.paginationHandler.bind(this, _i + 1) },
                            _i + 1
                        )
                    );
                    pagearr.push(control);
                }
                paginationCom = React.createElement(
                    "div",
                    { className: "pull-right" },
                    React.createElement(
                        "ul",
                        { className: "pagination", style: { marginTop: type == "top" ? 0 : 3, marginBottom: type == "top" ? 3 : 0 } },
                        pagearr
                    )
                );
            }
        }
        return paginationCom;
    },
    renderFooter: function renderFooter() {
        var _this3 = this;

        //渲染页脚
        var tds = [];
        this.footerActualData = []; //,页脚的实际统计数据，用于返回
        if (this.state.footer instanceof Array && this.state.footer.length > 0) {
            //分页的情况下
            if (this.props.selectAble) {
                tds.push(React.createElement("td", { key: "footerselect", className: "check-column" }));
            }
            this.state.headers.map(function (header, headerindex) {
                if (!header || header.hide) {
                    return;
                }
                if (_this3.state.headerMenu.length > 0 && _this3.state.headerMenu.indexOf(header.label) > -1) {
                    //父组件更新状态值，发现某一行处理被隐藏中，则不显示
                    return;
                }

                var footerchild = _this3.state.footer.filter(function (d) {
                    return d.name == header.name;
                });
                if (footerchild && footerchild.length > 0) {
                    if (footerchild[0].value != null && footerchild[0].value != undefined) {
                        //如果有值
                        var obj = {};obj[header.name] = footerchild[0].value;
                        _this3.footerActualData.push(obj);
                        tds.push(React.createElement(
                            "td",
                            { key: headerindex + header.name },
                            footerchild[0].value
                        ));
                    } else {
                        //表明从本页数据统计
                        switch (footerchild[0].type) {
                            case "sum":
                                var obj = {};obj[header.name] = _this3.sumHandler(footerchild[0]);
                                _this3.footerActualData.push(obj);
                                if (obj[header.name] != null) {
                                    tds.push(React.createElement(
                                        "td",
                                        { key: header.name },
                                        "总计：" + obj[header.name]
                                    ));
                                } else {
                                    tds.push(React.createElement("td", { key: header.name }));
                                }
                                break;
                            case "avg":
                                var obj1 = {};obj1[header.name] = _this3.avgHandler(footerchild[0]);
                                _this3.footerActualData.push(obj1);
                                if (obj[header.name] != null) {
                                    tds.push(React.createElement(
                                        "td",
                                        { key: headerindex + header.name },
                                        "平均值：" + obj1[header.name]
                                    ));
                                } else {
                                    tds.push(React.createElement("td", { key: headerindex + header.name }));
                                }
                                break;
                            default:
                                tds.push(React.createElement("td", { key: headerindex + header.name }));
                        }
                    }
                } else {
                    tds.push(React.createElement("td", { key: header.name + headerindex }));
                }
            });

            return React.createElement(
                "tr",
                { key: "footertr", style: { height: 36 } },
                tds
            );
        }
    },
    render: function render() {
        var _this4 = this;

        var className = "table table-no-bordered";
        if (this.props.borderAble === true) {
            //无边框
            className = "table";
        }
        var headerControl = this.renderHeader();
        var gridHeight = this.state.height; //
        var tableHeight = "auto";
        if (regs.number.test(gridHeight)) {
            tableHeight = gridHeight ? this.props.pagePosition == "both" ? gridHeight - 70 : gridHeight - 35 : null;
        }

        var headerMenuCotrol = []; //右键菜单中隐藏的列
        if (this.state.headerMenu.length > 0) {
            this.state.headerMenu.map(function (item, index) {
                headerMenuCotrol.push(React.createElement(
                    "li",
                    { key: index },
                    React.createElement(
                        "a",
                        { href: "javascript:void(0);", className: "header-menu-item", onMouseDown: _this4.menuHeaderShowHandler.bind(_this4, index, item) },
                        "显示[" + item + "]"
                    )
                ));
            });
        }
        return React.createElement(
            "div",
            { className: "wasabi-grid", ref: "grid",
                onPaste: this.onPaste,
                onMouseDown: this.gridMouseDownHandler,
                onContextMenu: this.gridContextMenuHandler,
                style: { width: this.props.width, height: gridHeight } },
            React.createElement(
                "div",
                { className: "wasabi-grid-pagination", ref: "toppagination",
                    style: { display: this.props.pagePosition == "top" || this.props.pagePosition == "both" ? this.props.pagination ? "block" : "none" : "none" } },
                React.createElement(
                    "div",
                    { style: { display: this.props.pagination ? "block" : this.state.data instanceof Array && this.state.data.length > 0 ? "block" : "none" } },
                    this.renderPagination("top")
                ),
                this.renderTotal()
            ),
            React.createElement(
                "div",
                { className: "table-container" },
                React.createElement(
                    "div",
                    { className: "table-fixed", ref: "fixedTableContainer" },
                    React.createElement(
                        "table",
                        { className: className, key: "fixedTable", ref: "fixedTable",
                            onMouseMove: this.fixedTableMouseMoveHandler, onMouseUp: this.fixedTableMouseUpHandler },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                headerControl
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "table-realTable", ref: "realTableContainer", style: { height: tableHeight },
                        onScroll: this.tableBodyScrollHandler },
                    React.createElement(
                        "table",
                        { className: className, key: "realTable", ref: "realTable" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                headerControl
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.renderBody()
                        ),
                        React.createElement(
                            "tfoot",
                            null,
                            this.renderFooter()
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "wasabi-grid-pagination", ref: "bottompagination",
                    style: { display: this.props.pagination ? "block" : this.props.pagePosition == "bottom" || this.props.pagePosition == "both" ? "block" : "none" } },
                React.createElement(
                    "div",
                    { style: { display: this.props.pagination ? "block" : this.state.data instanceof Array && this.state.data.length > 0 ? "block" : "none" } },
                    this.renderPagination()
                ),
                this.renderTotal()
            ),
            React.createElement("div", { className: "wasabi-grid-loading", style: { display: this.state.loading == true ? "block" : "none" } }),
            React.createElement("div", { className: "wasabi-load-icon", style: { display: this.state.loading == true ? "block" : "none" } }),
            React.createElement("div", { onMouseUp: this.divideMouseUpHandler, ref: "tabledivide", className: "wasabi-grid-divide", style: { top: this.props.pagePosition == "top" || this.props.pagePosition == "both" ? 35 : 0 } }),
            React.createElement(
                "div",
                { className: "wasabi-header-menu-container", ref: "headermenu" },
                React.createElement(
                    "ul",
                    { className: "wasabi-header-menu" },
                    React.createElement(
                        "li",
                        { key: "first" },
                        React.createElement(
                            "a",
                            { href: "javascript:void(0);", className: "header-menu-item", onMouseDown: this.menuHideHandler },
                            "\u9690\u85CF\u6B64\u5217"
                        )
                    ),
                    headerMenuCotrol
                )
            ),
            React.createElement(
                "div",
                { className: "wasabi-grid-panel", style: { height: this.state.panelShow ? 350 : 0, border: this.state.panelShow ? null : "none" } },
                React.createElement(
                    "div",
                    { className: "wasabi-grid-panel-body" },
                    " ",
                    this.state.menuPanel
                )
            )
        );
    }
});
module.exports = DataGrid;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 create by wangzhiyong
 date:2016-12-19
 */
var React = __webpack_require__(1);
__webpack_require__(302);
var unit = __webpack_require__(5);
var LinkButton = __webpack_require__(26);
var showUpdate = __webpack_require__(22);

var Transfer = React.createClass({
    displayName: "Transfer",

    mixins: [showUpdate],
    propTypes: {
        name: React.PropTypes.string, //名称
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //后台查询地址
        params: React.PropTypes.object, //向后台传输的额外参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //节点数据
        selectData: React.PropTypes.array, //选中的数据
        onSelect: React.PropTypes.func //选中后的事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: null,
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: [],
            selectData: [],

            onSelect: null
        };
    },
    getInitialState: function getInitialState() {
        var realData = this.setValueAndText(this.props.data);

        var realSelectData = this.setValueAndText(this.props.selectData);

        return {
            name: this.props.name,
            data: realData,
            selectData: realSelectData,
            leftOnIndex: null, //左边被点中的数据
            rightOnIndex: null, //右边被点中的数据
            onSelect: this.props.onSelect
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
         this.isChange :代表自身发生了改变,防止父组件没有绑定value,text,而导致无法选择
         */
        this.isChange = false; //重置
        var value = this.isChange ? this.state.value : nextProps.value;
        var text = this.isChange ? this.state.text : nextProps.text;
        var newData = [];
        var selectData = [];
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {
            //没有url,传的是死数据
            //因为这里统一将数据进行了改造,所以这里要重新处理一下
            newData = this.setValueAndText(nextProps.data);
            selectData = this.setValueAndText(nextProps.selectData);
        } else {
            //url形式
            newData = this.state.data; //先得到以前的数据
            selectData = this.state.selectData; //先得到以前的数据
            if (this.showUpdate(nextProps.params)) {
                //如果不相同则更新
                this.loadData(this.props.url, nextProps.params); //异步更新
            } else {}
        }

        this.setState({
            value: value,
            text: text,
            data: newData,
            selectData: selectData,
            url: nextProps.url,
            params: unit.clone(nextProps.params)
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.isChange == true) {
            //说明已经改变了,回传给父组件
            if (this.props.onSelect != null) {
                this.props.onSelect(this.state.data, this.state.selectData);
            }
        }
    },
    componentDidMount: function componentDidMount() {
        this.loadData(this.state.url, this.state.params);
    },
    loadData: function loadData(url, params) {
        if (url != null && url != "") {
            if (params == null) {
                var fetchmodel = new FetchModel(url, this.loadSuccess, null, this.loadError);
                unit.fetch.get(fetchmodel);
            } else {
                var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
                unit.fetch.post(fetchmodel);
            }
            console.log("transfer", fetchmodel);
        }
    },
    loadSuccess: function loadSuccess(data) {
        //数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        if (realData instanceof Array) {
            for (var i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][this.props.textField];
                realData[i].value = realData[i][this.props.valueField];
            }
        }
        this.setState({
            data: realData
        });
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("treepicker-error", errorCode, message);
        Message.error(message);
    },
    setValueAndText: function setValueAndText(realData) {
        //设置text，value的值
        if (realData instanceof Array) {
            for (var i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][this.props.textField];
                realData[i].value = realData[i][this.props.valueField];
            }
        }

        return realData;
    },
    onSelect: function onSelect(value, text, property) {
        this.isChange = true; //代表自身发生了改变,防止父组件没有绑定value,text的状态值,而导致无法选择的结果
        this.property = property; //临时保存起来
        if (value == undefined) {
            console.error("绑定的valueField没有");
        }
        if (text == undefined) {
            console.error("绑定的textField没有");
        }
        this.setState({
            value: value,
            text: text
        });
    },
    itemClickHandler: function itemClickHandler(type, index) {
        if (type == "left") {
            if (this.ctrl) {
                //多选
                var leftOnIndex = [];
                if (this.state.leftOnIndex instanceof Array) {
                    leftOnIndex = this.state.leftOnIndex;
                } else if (this.state.leftOnIndex) {
                    leftOnIndex.push(this.state.leftOnIndex);
                }
                if (leftOnIndex.indexOf(index) > -1) {
                    leftOnIndex.splice(leftOnIndex.indexOf(index), 1);
                } else {
                    leftOnIndex.push(index);
                }
                if (leftOnIndex.length == 0) {
                    //没有选择
                    leftOnIndex = null;
                } else if (leftOnIndex.length == 1) {
                    //只选择了一个
                    leftOnIndex = leftOnIndex[0];
                }
                this.setState({
                    leftOnIndex: leftOnIndex,
                    rightOnIndex: null
                });
            } else {
                this.setState({
                    leftOnIndex: index,
                    rightOnIndex: null
                });
            }
        } else {
            if (this.ctrl) {
                //多选
                var rightOnIndex = [];
                if (this.state.rightOnIndex instanceof Array) {
                    rightOnIndex = this.state.rightOnIndex;
                } else if (this.state.rightOnIndex) {
                    rightOnIndex.push(this.state.rightOnIndex);
                }
                if (rightOnIndex.indexOf(index) > -1) {
                    rightOnIndex.splice(rightOnIndex.indexOf(index), 1);
                } else {
                    rightOnIndex.push(index);
                }
                if (rightOnIndex.length == 0) {
                    //没有选择
                    rightOnIndex = null;
                } else if (rightOnIndex.length == 1) {
                    //只选择了一个
                    rightOnIndex = rightOnIndex[0];
                }

                this.setState({
                    leftOnIndex: null,
                    rightOnIndex: rightOnIndex
                });
            } else {
                this.setState({
                    leftOnIndex: null,
                    rightOnIndex: index
                });
            }
        }
    },
    itemDblClickHandler: function itemDblClickHandler(direction, indexArray) {
        var _this = this;

        if (indexArray == null) {
            return;
        } else {
            if (indexArray instanceof Array) {
                //按住了ctrl键

                if (direction == "right") {
                    //向右
                    var data = [];
                    this.state.data.map(function (item, index) {
                        if (indexArray.indexOf(index) > -1) {
                            _this.state.selectData.push(item);
                        } else {
                            data.push(item);
                        }
                    });
                    this.state.data = data;
                } else {
                    var selectData = [];
                    this.state.selectData.map(function (item, index) {
                        if (indexArray.indexOf(index) > -1) {
                            _this.state.data.push(item);
                        } else {
                            selectData.push(item);
                        }
                    });
                    this.state.selectData = selectData;
                }
            } else {
                if (direction == "right") {
                    //向右
                    this.state.selectData.push(this.state.data.splice(indexArray, 1)[0]);
                } else {
                    this.state.data.push(this.state.selectData.splice(indexArray, 1)[0]);
                }
            }

            this.isChange = true; //是否需要回传父组件，因为index不需要回传给父组件，所以组件本身先更新再回传
            this.setState({
                data: this.state.data,
                selectData: this.state.selectData,
                leftOnIndex: null,
                rightOnIndex: null
            });
        }
    },
    itemUpHandler: function itemUpHandler() {
        //向上
        if (this.state.leftOnIndex && !(this.state.leftOnIndex instanceof Array)) {
            //左边

            this.state.data.splice(this.state.leftOnIndex - 1, 2, this.state.data[this.state.leftOnIndex], this.state.data[this.state.leftOnIndex - 1]);

            this.isChange = true; //是否需要回传父组件，因为index不需要回传给父组件，所以组件本身先更新再回传
            this.setState({
                data: this.state.data,
                leftOnIndex: this.state.leftOnIndex - 1,
                rightOnIndex: null
            });
        } else if (this.state.rightOnIndex && !(this.state.rightOnIndex instanceof Array)) {
            //右边
            this.state.selectData.splice(this.state.rightOnIndex - 1, 2, this.state.selectData[this.state.rightOnIndex], this.state.selectData[this.state.rightOnIndex - 1]);
            this.isChange = true; //是否需要回传父组件，因为index不需要回传给父组件，所以组件本身先更新再回传
            this.setState({
                selectData: this.state.selectData,
                leftOnIndex: null,
                rightOnIndex: this.state.rightOnIndex - 1
            });
        }
    },
    itemDownHandler: function itemDownHandler() {
        //向下
        if (this.state.leftOnIndex != null && !(this.state.leftOnIndex instanceof Array) && this.state.leftOnIndex < this.state.data.length - 1) {
            //左边

            this.state.data.splice(this.state.leftOnIndex, 2, this.state.data[this.state.leftOnIndex + 1], this.state.data[this.state.leftOnIndex]);
            this.setState({
                data: this.state.data,
                leftOnIndex: this.state.leftOnIndex + 1,
                rightOnIndex: null
            });
        } else if (this.state.rightOnIndex != null && !(this.state.rightOnIndex instanceof Array) && this.state.rightOnIndex < this.state.selectData.length - 1) {
            //右边
            this.state.selectData.splice(this.state.rightOnIndex, 2, this.state.selectData[this.state.rightOnIndex + 1], this.state.selectData[this.state.rightOnIndex]);
            this.setState({
                selectData: this.state.selectData,
                leftOnIndex: null,
                rightOnIndex: this.state.rightOnIndex + 1
            });
        }
    },
    onKeyDown: function onKeyDown(event) {

        if (event.keyCode == 17 || event.keyCode == 91) {
            this.ctrl = true;
            this.refs.up.setDisabled(true);
            this.refs.down.setDisabled(true);
        } else {}
    },
    onKeyUp: function onKeyUp() {
        this.ctrl = false;
        if (this.state.leftOnIndex instanceof Array || this.state.rightOnIndex instanceof Array) {} else {
            this.refs.up.setDisabled(false);
            this.refs.down.setDisabled(false);
        }
    },
    onMouseOver: function onMouseOver(event) {
        this.refs.transfer.focus();
    },
    render: function render() {
        var _this2 = this;

        var leftControl = [];
        var rightControl = [];
        this.state.data.map(function (item, index) {
            leftControl.push(React.createElement(
                "li",
                { className: _this2.state.leftOnIndex == index || _this2.state.leftOnIndex instanceof Array && _this2.state.leftOnIndex.indexOf(index) > -1 ? "on" : "", key: index, onDoubleClick: _this2.itemDblClickHandler.bind(_this2, "right", index), onClick: _this2.itemClickHandler.bind(_this2, "left", index) },
                item.text
            ));
        });
        this.state.selectData.map(function (item, index) {
            rightControl.push(React.createElement(
                "li",
                { className: _this2.state.rightOnIndex == index || _this2.state.rightOnIndex instanceof Array && _this2.state.rightOnIndex.indexOf(index) > -1 ? "on" : "", key: index, onDoubleClick: _this2.itemDblClickHandler.bind(_this2, "left", index), onClick: _this2.itemClickHandler.bind(_this2, "right", index) },
                item.text
            ));
        });
        return React.createElement(
            "div",
            { className: "wasabi-transfer", ref: "transfer", tabIndex: "0", onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, onMouseOver: this.onMouseOver },
            React.createElement(
                "ul",
                { className: "wasabi-transfer-left" },
                leftControl
            ),
            React.createElement(
                "div",
                { className: "wasabi-transfer-middle" },
                React.createElement(LinkButton, { name: "up", title: "\u5411\u4E0A", iconCls: "icon-up", onClick: this.itemUpHandler, ref: "up", disabled: this.state.leftOnIndex instanceof Array || this.state.rightOnIndex instanceof Array ? true : false }),
                React.createElement(LinkButton, { name: "down", title: "\u5411\u4E0B", iconCls: "icon-down", onClick: this.itemDownHandler, ref: "down", disabled: this.state.leftOnIndex instanceof Array || this.state.rightOnIndex instanceof Array ? true : false }),
                React.createElement(LinkButton, { name: "right", title: "\u5411\u53F3", iconCls: "icon-right", onClick: this.itemDblClickHandler.bind(this, "right", this.state.leftOnIndex) }),
                React.createElement(LinkButton, { name: "left", title: "\u5411\u5DE6", iconCls: "icon-left", onClick: this.itemDblClickHandler.bind(this, "left", this.state.rightOnIndex) })
            ),
            React.createElement(
                "ul",
                { className: "wasabi-transfer-right" },
                rightControl
            )
        );
    }
});
module.exports = Transfer;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-07-22
//desc:独立的筛选框
var React = __webpack_require__(1);
var DataGrid = __webpack_require__(77);
var unit = __webpack_require__(5);
__webpack_require__(307);
var SearchBox = React.createClass({
    displayName: "SearchBox",

    propTypes: {
        name: React.PropTypes.string, //表单名称，
        title: React.PropTypes.string, //提示信息
        placeholder: React.PropTypes.string, //输入框提示信息
        valueField: React.PropTypes.string.isRequired, //表单value字段
        textField: React.PropTypes.string.isRequired, //表单text字段
        width: React.PropTypes.number, //宽度
        onSearch: React.PropTypes.func //查询事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            title: null,
            valueField: "value",
            textField: "text",
            params: null,
            width: null,
            onSearch: null

        };
    },
    getInitialState: function getInitialState() {
        return {

            params: null,
            filterValue: "" //筛选框的值
        };
    },
    onKeyUp: function onKeyUp(event) {
        //回车查询
        if (event.keyCode == 13) {
            this.beginSearch();
        }
    },
    beginSearch: function beginSearch() {
        //开始查询
        var params = this.state.params;
        if (params) {} else {
            params = {}; //初始化
        }
        params[this.props.valueField] = this.state.filterValue;
        params[this.props.textField] = this.state.filterValue;

        this.setState({
            params: params
        });
        if (this.props.onSearch != null) {
            this.props.onSearch(params, this.props.name);
        }
    },
    clearData: function clearData() {
        this.setState({
            filterValue: "",
            params: null
        });
    },
    onChange: function onChange(event) {

        this.setState({
            filterValue: event.target.value.toString().trim()
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "wasabi-searchbox", style: { width: this.props.width } },
            React.createElement("input", { type: "text", title: this.props.title, placeholder: this.props.placeholder, onKeyUp: this.onKeyUp, value: this.state.filterValue, onChange: this.onChange }),
            React.createElement("div", { className: "icon", onClick: this.beginSearch })
        );
    }
});
module.exports = SearchBox;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//creete by wangzy
//date:2016-08-02
//desc 将输入框从Input中独立出来
var React = __webpack_require__(1);

var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var Message = __webpack_require__(14);
var FetchModel = __webpack_require__(13);
var unit = __webpack_require__(5);

var Text = React.createClass({
    displayName: "Text",

    mixins: [setStyle, validate, shouldComponentUpdate],
    propTypes: {
        type: React.PropTypes.oneOf(["text", //普通输入框
        "textarea", //多行文本
        "password", //密码
        "email", //邮箱
        "url", //网址
        "mobile", //手机
        "idcard", //身份证
        "alpha", //英文字母
        "alphanum", //英文字母与数字
        "integer", //整型数据
        "number"] //数字
        ), //文本框输入的类型
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        rows: React.PropTypes.number, //行数
        min: React.PropTypes.number, //最小值,最小长度,
        max: React.PropTypes.number, //最大值,最大长度
        onClick: React.PropTypes.func, //单击事件
        onChange: React.PropTypes.func, //值改变事件
        validateUrl: React.PropTypes.string, //后台验证的url

        onBlur: React.PropTypes.func //失去焦点事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            type: "text",
            name: "",
            label: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            row: 5,
            min: null,
            max: null,
            onClick: null,
            onChange: null,
            validateUrl: null

        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            min: this.props.min,
            max: this.props.max,
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: "",
            validateState: null //是否正在验证

        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            hide: nextProps.hide,
            min: nextProps.min,
            max: nextProps.max,
            value: nextProps.value,
            text: nextProps.text,
            readonly: nextProps.readonly,
            required: nextProps.required,
            validateClass: "", //重置验证样式
            helpTip: validation["required"] //提示信息
        });
    },
    componentDidMount: function componentDidMount() {
        this.validateInput = true; //设置初始化值，输入有效
        this.onblur = false;
    },
    componentDidUpdate: function componentDidUpdate() {
        this.validateInput = true; //设置初始化值
        if (this.state.helpTip == "非有效数字" || this.state.helpTip == "输入非法") {
            this.refs.input.select();
        }
        if (this.onblur) {
            this.onblur = false;
            this.props.onBlur();
        }
    },
    changeHandler: function changeHandler(event) {
        if (this.validateInput == true) {
            //输入有效的时候

            if (this.props.type == "integer" || this.props.type == "number") {
                //数字,或者正数时
                if (event.target.value == "-" || (!this.state.value || this.state.value.toString().indexOf(".") < 0) && event.target.value.length > 0 && event.target.value.toString().lastIndexOf(".") == event.target.value.length - 1) {
                    //第一次输入负号,或者输入小数点时原来没有小数点或为空时）时.不回传给父组件
                    this.setState({
                        value: event.target.value,
                        text: event.target.value
                    });
                    return;
                }
            }

            this.setState({
                value: event.target.value,
                text: event.target.value
            });

            if (this.props.onChange != null) {
                this.props.onChange(event.target.value); //自定义的改变事件
            }
            //回传给表单组件,下拉组件使用onSelect回传给表单组件
            if (this.props.backFormHandler != null) {
                this.props.backFormHandler(event.target.value, event.target.value, this.props.name);
            }
        }
    },
    keyDownHandler: function keyDownHandler(event) {
        //控制输入
        this.validateInput = true;
        if (this.props.type == "integer" || this.props.type == "number") {
            if (event.ctrlKey == false && event.metaKey == false && event.keyCode >= 65 && event.keyCode <= 90) {
                //防止ctrl,command键
                this.validateInput = false;
            }
        }
        if (this.props.onKeyDown != null) {
            this.props.onKeyDown(event);
        }
    },
    keyUpHandler: function keyUpHandler(event) {
        if (event.keyCode == 13) {
            if (this.props.validateUrl) {
                this.validateHandler(event.target.value);
            }
        }

        if (this.props.onKeyUp != null) {
            this.props.onKeyUp(event);
        }
    },
    focusHandler: function focusHandler() {
        //焦点事件
        if (this.props.onFocus != null) {
            this.props.onFocus();
        }
    },
    blurHandler: function blurHandler(event) {
        if (this.props.validateUrl) {
            //后台验证
            this.validateHandler(event.target.value);
        } else {
            //普通验证
            this.validate(this.state.value);
        }

        this.refs.label.hideHelp(); //隐藏帮助信息

        if (this.props.onBlur) {
            this.onblur = true;
        }
    },
    clickHandler: function clickHandler(event) {
        //单击事件

        if (this.props.onClick != null) {
            var model = {};
            try {
                //有可能存在复制不成功的情况
                model = _extends({}, this.props);
            } catch (e) {}
            model.value = this.state.value;
            model.text = this.state.text;
            this.props.onClick(this.props.name, this.state.value, model);
        }
    },

    getValue: function getValue() {
        //获取值
        return this.state.value;
    },

    validateHandler: function validateHandler(value) {
        //后台请求验证
        this.setState({
            validateState: "validing" //正在验证
        });
        var fetchmodel = new FetchModel(this.props.validateUrl, this.validateHandlerSuccess, { key: value });
        console.log("text-validing:", fetchmodel);
        unit.fetch.post(fetchmodel);
    },
    validateHandlerSuccess: function validateHandlerSuccess() {
        //后台请求验证成功
        this.setState({
            validateState: "valid" //验证成功
        });
    },
    validateHandlerError: function validateHandlerError(errorCode, message) {
        //后台请求验证失败
        Message.error(message);
        this.setState({
            validateState: "invalid" //验证失败
        });
    },
    render: function render() {
        var inputType = "text";
        if (this.props.type == "password") {
            inputType = "password";
        }
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            rows: this.props.rows,
            title: this.props.title //文本框的属性
        };var control = null;
        if (this.props.type != "textarea") {
            control = React.createElement("input", _extends({ ref: "input", type: inputType }, inputProps, { onClick: this.clickHandler,
                onChange: this.changeHandler, onKeyDown: this.keyDownHandler,
                onKeyUp: this.keyUpHandler, onFocus: this.focusHandler,
                onBlur: this.blurHandler,
                value: this.state.value }));
        } else {
            //textarea 不支持null值
            var value = this.state.value;
            if (!value) {
                value = "";
            }
            control = React.createElement("textarea", _extends({ ref: "input" }, inputProps, { onClick: this.clickHandler,
                onChange: this.changeHandler, onKeyDown: this.keyDownHandler,
                onKeyUp: this.keyUpHandler, onFocus: this.focusHandler,
                onBlur: this.blurHandler,
                value: value }));
        }

        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, onPaste: this.onPaste, style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                control,
                React.createElement("i", { className: this.state.validateState, style: { display: this.state.validateState ? "block" : "none" } }),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }
});
module.exports = Text;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by apple on 2016/11/8.
 * 将复制粘贴功能独立出来
 */
var React = __webpack_require__(1);
var pasteExtend = {
    pasteHandler: function pasteHandler(event, callBack) {
        if (!(event.clipboardData && event.clipboardData.items)) {//浏览器不支持这个功能
        } else {
            for (var i = 0, len = event.clipboardData.items.length; i < len; i++) {
                var item = event.clipboardData.items[i];
                if (item.kind === "string") {
                    //文本型数据
                    item.getAsString(function (pasteData) {
                        //异步的
                        var data = []; //返回的数据
                        var rows = [];

                        if (pasteData.indexOf("<html") > -1 || pasteData.indexOf("<table") > -1) {//如果从excel复制过来，会有完整html的内容

                        } else if (pasteData.indexOf("\t") > -1 || pasteData.indexOf("\r\n") > -1) {
                            //window 是多列或者多行数据,则处理,否则视为普通粘贴
                            var rows = pasteData.split("\r\n"); //得到所有行数据
                        } else if (pasteData.indexOf("{") < 0 && pasteData.indexOf("\n") > -1) {
                            //mac
                            var rows = pasteData.split("\n"); //得到所有行数据
                        }
                        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                            var columns = rows[rowIndex].split("\t"); //当前所有列数据
                            var currentColumn = []; //当前行数据,为了除去空字符
                            for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                                if (columns[columnIndex].trim() == "") {
                                    continue; //空字符
                                } else {
                                    currentColumn.push(columns[columnIndex]);
                                }
                            }
                            data.push(currentColumn);
                        }
                        if (data.length > 0) {
                            callBack(data); //回调
                        }
                    });
                } else if (item.kind === "file") {
                    //文件类型
                    var pasteFile = item.getAsFile();
                    // pasteFile就是获取到的文件，暂时不处理
                }
            }
        }
    }
};

module.exports = pasteExtend;

/***/ }),
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
create by wangzhiyong 创建树组件

 */

var React = __webpack_require__(1);
__webpack_require__(303);
var TreeNode = __webpack_require__(262);
var unit = __webpack_require__(5);
var showUpdate = __webpack_require__(22);
var Tree = React.createClass({
    displayName: "Tree",

    mixins: [showUpdate],
    propTypes: {
        name: React.PropTypes.string, //树名称
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //值
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //标题
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //后台查询地址
        params: React.PropTypes.object, //向后台传输的额外参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //节点数据
        onSelect: React.PropTypes.func //选中后的事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: null,
            text: null,
            value: null,
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: [],
            onSelect: null
        };
    },
    getInitialState: function getInitialState() {
        var newData = this.setValueAndText(this.props.data); //对数据进行处理
        return {
            name: this.props.name,
            text: this.props.text,
            value: this.props.value,
            data: newData,
            onSelect: this.props.onSelect
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
         this.isChange :代表自身发生了改变,防止父组件没有绑定value,text,而导致无法选择
         */
        this.isChange = false; //重置
        var value = this.isChange ? this.state.value : nextProps.value;
        var text = this.isChange ? this.state.text : nextProps.text;
        var newData = [];
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {
            //没有url,传的是死数据
            newData = [];
            //因为这里统一将数据进行了改造,所以这里要重新处理一下
            newData = this.setValueAndText(nextProps.data);
        } else {
            //url形式
            newData = this.state.data; //先得到以前的数据
            if (this.showUpdate(nextProps.params)) {
                //如果不相同则更新
                this.loadData(this.props.url, nextProps.params); //异步更新
            } else {}
        }

        this.setState({
            value: value,
            text: text,
            data: newData,
            url: nextProps.url,
            params: unit.clone(nextProps.params)
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.isChange == true) {
            //说明已经改变了,回传给父组件
            if (this.props.onSelect != null) {
                this.props.onSelect(this.state.value, this.state.text, this.props.name, this.property);
            }
        }
    },

    componentDidMount: function componentDidMount() {
        this.loadData(this.state.url, this.state.params);
    },
    loadData: function loadData(url, params) {
        if (url != null && url != "") {
            if (params == null) {
                var fetchmodel = new FetchModel(url, this.loadSuccess, null, this.loadError);
                unit.fetch.get(fetchmodel);
            } else {
                var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
                unit.fetch.post(fetchmodel);
            }
            console.log("treepicker", fetchmodel);
        }
    },
    loadSuccess: function loadSuccess(data) {
        //数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }

        realData = this.setValueAndText(realData);
        this.setState({
            data: realData
        });
    },
    setValueAndText: function setValueAndText(realData) {
        //遍历设置text，value的值
        if (realData instanceof Array) {
            for (var i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][this.props.textField];
                realData[i].value = realData[i][this.props.valueField];
                if (realData[i].data) {
                    realData[i].data = this.setValueAndText(realData[i].data);
                }
            }
        }

        return realData;
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("treepicker-error", errorCode, message);
        Message.error(message);
    },
    onSelect: function onSelect(value, text, property) {
        this.isChange = true; //代表自身发生了改变,防止父组件没有绑定value,text的状态值,而导致无法选择的结果
        this.property = property; //临时保存起来
        if (value == undefined) {
            console.error("绑定的valueField没有");
        }
        if (text == undefined) {
            console.error("绑定的textField没有");
        }
        this.setState({
            value: value,
            text: text
        });
    },
    render: function render() {
        var _this = this;

        var nodeControl = [];
        if (this.state.data instanceof Array) {
            this.state.data.map(function (item, index) {
                var isParent = false; //是否为父节点
                if (item.isParent == true || item.data instanceof Array && item.data.length > 0) {
                    //如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                } else {}
                nodeControl.push(React.createElement(TreeNode, _extends({ key: index, rootValue: _this.state.value, rootText: _this.state.text }, item, { isParent: isParent, onSelect: _this.onSelect })));
            });
        }
        return React.createElement(
            "ul",
            { className: "wasabi-tree" },
            nodeControl
        );
    }
});
module.exports = Tree;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 create by wangzy
 date:2016-05-20
 desc:将日期控件表头独立出来
 */
var React = __webpack_require__(1);
var Lang = __webpack_require__(35);
var Text = __webpack_require__(80);
var Message = __webpack_require__(14);
__webpack_require__(44);
var CalendarBody = React.createClass({
    displayName: "CalendarBody",

    PropTypes: {
        year: React.PropTypes.number, //年
        month: React.PropTypes.number, //月
        day: React.PropTypes.number, //日
        isRange: React.PropTypes.bool, //是否为范围选择
        min: React.PropTypes.number, //最小值，用于日期范围选择
        max: React.PropTypes.number, //最大值,用于日期范围选择
        dayHandler: React.PropTypes.func, //选择后的事件
        changeYear: React.PropTypes.bool,
        changeMonth: React.PropTypes.bool,
        changeYearHandler: React.PropTypes.func,
        changeMonthHandler: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {
            year: this.props.year,
            tempyear: this.props.tempyear, //临时的，防止输入框改变后对整个组件产生影响
            month: this.props.month,
            day: this.props.day,
            isRange: this.props.isRange,
            min: this.props.min,
            max: this.props.max,
            changeYear: this.props.changeYear,
            changeMonth: this.props.changeMonth
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            year: nextProps.year,
            tempyear: nextProps.year,
            month: nextProps.month,
            day: nextProps.day,
            isRange: nextProps.isRange,
            min: nextProps.min,
            max: nextProps.max,
            changeYear: nextProps.changeYear,
            changeMonth: nextProps.changeMonth
        });
    },
    getMonthDays: function getMonthDays() {
        //根据月份获取当月总天数
        return new Date(this.state.year, this.state.month, 0).getDate();
    },
    getFirstDayWeek: function getFirstDayWeek() {
        //获取当月第一天是星期几
        return new Date(this.state.year, this.state.month - 1, 1).getDay();
    },
    dayHandler: function dayHandler(day) {
        this.setState({
            day: day
        });
        this.props.dayHandler(day); // 执行父组件回调函数，改变父组件状态值
    },
    yearOnChange: function yearOnChange(event) {
        this.setState({
            tempyear: event.target.value
        });
    },
    changeYearHandler: function changeYearHandler(value) {
        if (this.props.changeYearHandler) {
            this.props.changeYearHandler(value);
        }
    },
    changeMonthHandler: function changeMonthHandler(value) {
        if (this.props.changeMonthHandler) {
            this.props.changeMonthHandler(value);
        }
    },
    yearOKHandler: function yearOKHandler(event) {
        if (event.keyCode == 13) {
            this.yearonBlur(event); //共用函数
        }
    },
    yearonBlur: function yearonBlur(event) {
        var year = event.target.value << 0; //转成数字
        year < 1900 || year > 9999 ? Message.error("不是有效年份") : this.changeYearHandler(event.target.value);
    },

    render: function render() {
        var _this = this;

        //TODO 以下代码有待优化
        var arry1 = [],
            arry2 = [];
        var getDays = this.getMonthDays(),
            FirstDayWeek = this.getFirstDayWeek();
        for (var i = 0; i < FirstDayWeek; i++) {
            arry1[i] = i;
        }
        for (var i = 0; i < getDays; i++) {
            arry2[i] = i + 1;
        }
        var node1 = arry1.map(function (item, i) {
            return React.createElement("div", { className: "datespan", key: i });
        });
        var node2 = arry2.map(function (item, index) {
            var choseed = false; //当前日期是否被选中
            if (_this.state.isRange) {
                if (_this.state.min && _this.state.max && _this.state.min <= item && _this.state.max >= item) {
                    choseed = true;
                }
            } else if (_this.state.day == item) {
                choseed = true;
            }
            var control = null;
            if (item == _this.state.min && item == _this.state.max) {
                control = React.createElement(
                    "div",
                    { className: "datespan ", key: "li2" + index, onClick: _this.dayHandler.bind(_this, item) },
                    React.createElement(
                        "div",
                        { className: "onlyradius" },
                        item
                    )
                );
            } else if (item == _this.state.min) {
                control = React.createElement(
                    "div",
                    { className: "datespan begin", key: "li2" + index, onClick: _this.dayHandler.bind(_this, item) },
                    React.createElement(
                        "div",
                        { className: "blank" },
                        React.createElement(
                            "div",
                            { className: "radius" },
                            item
                        )
                    )
                );
            } else if (item == _this.state.max) {
                control = React.createElement(
                    "div",
                    { className: "datespan end", key: "li2" + index, onClick: _this.dayHandler.bind(_this, item) },
                    React.createElement(
                        "div",
                        { className: "blank" },
                        React.createElement(
                            "div",
                            { className: "radius" },
                            item
                        )
                    )
                );
            } else if (choseed) {
                if (_this.state.isRange) {
                    control = React.createElement(
                        "div",
                        { className: "datespan chosed", key: "li2" + index, onClick: _this.dayHandler.bind(_this, item) },
                        item
                    );
                } else {
                    control = React.createElement(
                        "div",
                        { className: "datespan ", key: "li2" + index, onClick: _this.dayHandler.bind(_this, item) },
                        React.createElement(
                            "div",
                            { className: "onlyradius" },
                            item
                        )
                    );
                }
            } else {

                control = React.createElement(
                    "div",
                    { className: "datespan ", key: "li2" + index, onClick: _this.dayHandler.bind(_this, item) },
                    React.createElement(
                        "div",
                        { className: "radius" },
                        item
                    )
                );
            }
            return control;
        });

        var yearControl = [];
        for (var index = this.state.year * 1 - 7; index <= this.state.year * 1 + 4; index++) {
            if (index == this.state.year * 1) {
                yearControl.push(React.createElement(
                    "div",
                    { className: "datespan chosed", onClick: this.changeYearHandler.bind(this, index), key: "year" + index },
                    index
                ));
            } else {
                yearControl.push(React.createElement(
                    "div",
                    { className: "datespan", onClick: this.changeYearHandler.bind(this, index), key: "year" + index },
                    index
                ));
            }
        }
        return React.createElement(
            "div",
            { className: "wasabi-datetime-body" },
            React.createElement(
                "div",
                { className: "weekul", style: { display: !this.state.changeMonth && !this.state.changeYear ? "block" : "none" } },
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.SUN
                ),
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.MON
                ),
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.TUE
                ),
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.WED
                ),
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.THU
                ),
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.FRI
                ),
                React.createElement(
                    "div",
                    { className: "weekspan" },
                    Lang.cn.SAT
                )
            ),
            React.createElement(
                "div",
                { className: "dayul", style: { display: !this.state.changeMonth && !this.state.changeYear ? "block" : "none" } },
                node1,
                " ",
                node2
            ),
            React.createElement(
                "div",
                { className: "wasabi-datetime-month", style: { display: this.state.changeMonth ? "block" : "none" } },
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 1 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 1) },
                    "\u4E00\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 2 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 2) },
                    "\u4E8C\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 3 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 3) },
                    "\u4E09\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 4 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 4) },
                    "\u56DB\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 5 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 5) },
                    "\u4E94\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 6 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 6) },
                    "\u516D\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 7 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 7) },
                    "\u4E03\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 8 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 8) },
                    "\u516B\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 9 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 9) },
                    "\u4E5D\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 10 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 10) },
                    "\u5341\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 11 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 11) },
                    "\u5341\u4E00\u6708"
                ),
                React.createElement(
                    "div",
                    { className: "datespan " + (this.state.month == 12 ? "chosed" : ""), onClick: this.changeMonthHandler.bind(this, 12) },
                    "\u5341\u4E8C\u6708"
                )
            ),
            React.createElement(
                "div",
                { className: "wasabi-datetime-year", style: { display: this.state.changeYear ? "block" : "none" } },
                React.createElement(
                    "div",
                    { style: { display: "block", textAlign: "center", marginBottom: 10 } },
                    React.createElement("input", { value: this.state.tempyear, name: "year", onBlur: this.yearonBlur, onKeyUp: this.yearOKHandler, style: { width: 60, height: 30, paddingLeft: 5 }, title: "\u56DE\u8F66\u786E\u8BA4", onChange: this.yearOnChange })
                ),
                yearControl
            )
        );
    }
});
module.exports = CalendarBody;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
create by wangzy
date:2016-05-20
desc:将日期控件表头独立出来
 */
var React = __webpack_require__(1);
var Lang = __webpack_require__(35);
__webpack_require__(44);
var CalendarHeader = React.createClass({
    displayName: "CalendarHeader",

    getInitialState: function getInitialState() {
        return {
            year: this.props.year,
            month: this.props.month,
            day: this.props.day
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            year: nextProps.year,
            month: nextProps.month,
            day: nextProps.day
        });
    },
    /*
    * 处理月份变化
    *@param {Number} month 月份变化数1或-1
    *@return
    * */
    _dealMonthClick: function _dealMonthClick(month) {
        var m = parseInt(this.state.month, 10) + month;
        if (m < 1) {
            this.state.year--;
            m = 12;
        } else if (m > 12) {
            this.state.year++;
            m = 1;
        }
        this.state.month = m;
        this.setState(this.state);
        this.props.updateFilter(this.state.year, m); // 执行父组件回调函数，改变父组件状态值
    },
    handleLeftClick: function handleLeftClick() {
        this._dealMonthClick(-1);
    },
    handleRightClick: function handleRightClick() {
        this._dealMonthClick(1);
    },
    changeYear: function changeYear() {
        if (this.props.changeYear) {
            this.props.changeYear();
        }
    },
    changeMonth: function changeMonth() {
        if (this.props.changeMonth) {
            this.props.changeMonth();
        }
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "wasabi-datetime-header" },
            React.createElement(
                "div",
                { className: "header-text" },
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", style: { marginRight: 8 }, onClick: this.changeYear },
                    React.createElement(
                        "span",
                        null,
                        this.state.year + "年"
                    ),
                    React.createElement("i", { style: { fontSize: 12, marginTop: 2 }, className: "icon-down" })
                ),
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.changeMonth },
                    React.createElement(
                        "span",
                        null,
                        Lang.cn.Month[this.state.month - 1] + "月"
                    ),
                    React.createElement("i", { style: { fontSize: 12, marginTop: 2 }, className: "icon-down" })
                )
            ),
            React.createElement("a", { href: "javascript:void(0);", className: "triangle-left", onClick: this.handleLeftClick }),
            React.createElement("a", { href: "javascript:void(0);", className: "triangle-right", onClick: this.handleRightClick })
        );
    }
});
module.exports = CalendarHeader;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by zhiyongwang on 2016-04-26
 * desc:通用下拉框组件
 *
 */
__webpack_require__(148);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var Time = __webpack_require__(43);
var DatePicker = __webpack_require__(120);
var Picker = __webpack_require__(129);
var Select = __webpack_require__(131);
var MutiText = __webpack_require__(126);
var GridPicker = __webpack_require__(125);
var TreePicker = __webpack_require__(133);
var PanelPicker = __webpack_require__(128);
var shouldComponentUpdate = __webpack_require__(8);
var ComboBox = React.createClass({
    displayName: "ComboBox",

    mixins: [shouldComponentUpdate],
    PropTypes: {
        type: React.PropTypes.oneOf[("select", //普通下拉
        "date", //日期选择
        "time", //时间选择
        "datetime", //时间选择
        "daterange", //日期范围选择
        "datetimerange", //日期时间范围选择
        "picker", //级联选择组件
        "gridpicker", //列表选择
        "treepicker", //下拉树选择
        "panelpicker", //面板选择
        "muti" //多行添加
        )], //类型
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        min: React.PropTypes.number, //最少选择几个
        max: React.PropTypes.number, //最多选择几个
        onClick: React.PropTypes.func, //自定义单击事件，这样就可以将普通下拉框组合其他组件
        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        extraData: React.PropTypes.array, //额外的数据,对url有效
        onSelect: React.PropTypes.func, //选中后的事件，回传，value,与text,data

        //其他属性
        secondUrl: React.PropTypes.string, //第二层节点的后台地址,
        secondParams: React.PropTypes.object, //第二层节点的后台参数
        secondParamsKey: React.PropTypes.string, //第二层节点的后台参数中传递一级节点value值的参数名称
        thirdUrl: React.PropTypes.string, //第三层节点的后台地址，
        thirdParams: React.PropTypes.object, //第三层节点的后台参数
        thirdParamsKey: React.PropTypes.string, //第三层节点的后台参数中传递二级节点value值的参数名称
        hotTitle: React.PropTypes.string, //热门选择标题
        hotData: React.PropTypes.array //热门选择的数据
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",
            //其他属性
            min: null,
            max: null,
            onClick: null,
            //其他属性
            multiple: false,
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            extraData: null,
            onSelect: null,
            //其他属性
            secondUrl: null,
            secondParams: null,
            secondParamsKey: null,
            thirdUrl: null,
            thirdParams: null,
            thirdParamsKey: null,
            hotTitle: "热门选择",
            hotData: null
        };
    },
    getInitialState: function getInitialState() {
        var text = this.props.text;
        if (this.props.type.indexOf("date") > -1 || this.props.type.indexOf("time") > -1) {
            text = this.props.value;
        }
        return {
            value: this.props.value,
            text: text,
            hide: this.props.hide,
            readonly: this.props.readonly,
            required: this.props.required,
            data: this.props.data,
            params: this.props.params,
            url: this.props.url

        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var text = nextProps.text;
        if (this.props.type.indexOf("date") > -1 || this.props.type.indexOf("time") > -1) {
            //如果时间与日期相关组件，text就是value
            if ((!text || text == "") && nextProps.value && nextProps.value != "") {
                text = nextProps.value;
            }
        }
        this.setState({
            value: nextProps.value,
            text: text,
            readonly: nextProps.readonly,
            required: nextProps.required,
            data: nextProps.data,
            params: nextProps.params,
            url: nextProps.url,
            hide: nextProps.hide

        });
    },
    splitDate: function splitDate(splitdate) {
        //拆分日期格式
        var regs = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (splitdate && splitdate != "" && regs.test(splitdate)) {
            var returnvalue = {
                year: splitdate.split("-")[0],
                month: splitdate.split("-")[1],
                day: splitdate.split("-")[2]
            };
            return returnvalue;
        } else {
            null;
        }
    },

    onSelect: function onSelect(value, text, name, rowData) {
        //选中事件
        this.setState({
            value: value,
            text: text
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(value, text, this.props.name, rowData);
        }
    },
    changeHandler: function changeHandler(event) {},
    getComponentData: function getComponentData() {
        //只读属性，获取对应的字段的数据源
        return this.state.data;
    },
    validate: function validate() {
        return this.refs.combobox.validate();
    },
    renderMuti: function renderMuti() {
        //普通下拉框

        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.hide = this.state.hide;
        props.data = this.state.data;
        props.readonly = this.state.readonly;
        props.params = this.state.params;
        props.url = this.state.url;
        props.data = this.state.data;
        return React.createElement(MutiText, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderSelect: function renderSelect() {
        //普通下拉框

        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.hide = this.state.hide;
        props.data = this.state.data;
        props.readonly = this.state.readonly;
        props.params = this.state.params;
        props.url = this.state.url;
        props.data = this.state.data;
        return React.createElement(Select, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderPicker: function renderPicker() {
        //下拉面板
        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.hide = this.state.hide;
        props.data = this.state.data;
        props.readonly = this.state.readonly;
        props.required = this.state.required;
        props.params = this.state.params;
        props.url = this.state.url;
        return React.createElement(Picker, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderTime: function renderTime() {
        var props = _extends({}, this.props);
        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.hide = this.state.hide;
        props.data = this.state.data;
        props.readonly = this.state.readonly;

        return React.createElement(Time, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderDatePicker: function renderDatePicker() {
        var props = _extends({}, this.props);
        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.hide = this.state.hide;
        props.readonly = this.state.readonly;
        props.params = this.state.params;
        return React.createElement(DatePicker, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderGridPicker: function renderGridPicker() {
        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.data = this.state.data;
        props.readonly = this.state.readonly;
        props.params = this.state.params;
        return React.createElement(GridPicker, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderTreePicker: function renderTreePicker() {
        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.data = this.state.data;
        props.readonly = this.state.readonly;
        props.params = this.state.params;
        return React.createElement(TreePicker, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    renderPanelPicker: function renderPanelPicker() {
        var props = _extends({}, this.props);
        var props = _extends({}, this.props);
        props.value = this.state.value;
        props.text = this.state.text;
        props.hide = this.state.hide;
        props.data = this.state.data;
        props.readonly = this.state.readonly;

        return React.createElement(PanelPicker, _extends({ ref: "combobox" }, props, { onSelect: this.onSelect }));
    },
    render: function render() {

        var control = null;
        switch (this.props.type) {
            case "muti":
                control = this.renderMuti();
                break;
            case "select":
                control = this.renderSelect();
                break;
            case "time":
                control = this.renderTime();
                break;
            case "picker":
                control = this.renderPicker();
                break;
            case "gridpicker":
                control = this.renderGridPicker();
                break;
            case "treepicker":
                control = this.renderTreePicker();
                break;
            case "date":
                control = this.renderDatePicker();

                break;
            case "datetime":
                control = this.renderDatePicker();

                break;
            case "daterange":
                control = this.renderDatePicker();

                break;
            case "datetimerange":
                control = this.renderDatePicker();

                break;

            case "panelpicker":
                control = this.renderPanelPicker();

                break;

        }
        return control;
    }
});
module.exports = ComboBox;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by zhiyongwang on 2016-04-26
 * desc:通用下拉日期,时间组件
 *
 */
__webpack_require__(148);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var Time = __webpack_require__(43);
var DateD = __webpack_require__(55);
var DateTime = __webpack_require__(122);
var DateRange = __webpack_require__(121);
var DateTimeRange = __webpack_require__(123);

var validation = __webpack_require__(16);
var regs = __webpack_require__(36);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var ClickAway = __webpack_require__(24);
var DatePicker = React.createClass({
    displayName: "DatePicker",

    mixins: [setStyle, validate, shouldComponentUpdate, ClickAway],
    PropTypes: {
        type: React.PropTypes.oneOf[("date", //日期选择
        "datetime", //时间选择
        "daterange", //日期范围选择
        "datetimerange" //日期时间范围选择

        )], //类型
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置
        //其他属性
        onSelect: React.PropTypes.func //选中后的事件，回传，value,与text,data


    },
    getDefaultProps: function getDefaultProps() {
        return {
            type: "date",
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default"
            //其他属性

        };
    },
    getInitialState: function getInitialState() {
        var text = this.props.text;
        if (this.props.type.indexOf("date") > -1 || this.props.type.indexOf("time") > -1) {
            text = this.props.value;
        }
        return {
            hide: this.props.hide,
            value: this.props.value,
            text: text,
            readonly: this.props.readonly,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var text = nextProps.text ? nextProps.text : nextProps.value;

        this.setState({
            hide: nextProps.hide,
            value: nextProps.value,
            text: text,
            readonly: nextProps.readonly,

            //验证
            required: this.props.required,
            helpShow: "none", //提示信息是否显示
            invalidTip: "",
            validateClass: "", //重置验证样式
            helpTip: validation["required"] //提示信息
        });
    },
    componentDidMount: function componentDidMount() {

        this.registerClickAway(this.hidePicker, this.refs.picker); //注册全局单击事件
    },
    onBlur: function onBlur() {
        this.refs.label.hideHelp(); //隐藏帮助信息
    },
    splitDate: function splitDate(splitdate) {
        //拆分日期格式


        if (splitdate && splitdate.indexOf(" ") > -1 && regs.datetime(splitdate)) {
            //有时间

            splitdate = splitdate.split(" ")[0];
            var returnvalue = {
                year: splitdate.split("-")[0],
                month: splitdate.split("-")[1],
                day: splitdate.split("-")[2]
            };
            return returnvalue;
        } else if (regs.date.test(splitdate)) {
            var returnvalue = {
                year: splitdate.split("-")[0],
                month: splitdate.split("-")[1],
                day: splitdate.split("-")[2]
            };
            return returnvalue;
        } else {
            null;
        }
    },
    splitDateTime: function splitDateTime(datetime) {
        //

        if (datetime && regs.datetime(datetime) && datetime.indexOf(" ") > -1) {
            //如果不为空
            var splitdate = datetime.split(" ")[0];
            if (splitdate && splitdate != "") {
                var returnvalue = {
                    year: splitdate.split("-")[0],
                    month: splitdate.split("-")[1],
                    day: splitdate.split("-")[2],
                    time: datetime.split(" ")[1]
                };
                return returnvalue;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    showPicker: function showPicker(type) {
        //显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        } else {
            this.setState({
                show: type == 1 ? !this.state.show : true
            });
        }
        this.bindClickAway(); //绑定全局单击事件
    },
    hidePicker: function hidePicker() {
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },
    onSelect: function onSelect(value, text) {
        //选中事件
        if (this.props.name == "test") {
            console.log(value, text);
        }

        this.setState({
            show: false,
            value: value,
            text: text
        });
        this.validate(value);
        if (this.props.onSelect != null) {
            this.props.onSelect(value, text, this.props.name, null);
        }
    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        } else {
            this.setState({
                value: null,
                text: null
            });
        }
    },
    changeHandler: function changeHandler(event) {},
    setText: function setText() {
        var text = this.state.text;
        if (this.props.type == "date") {
            if (text && text.indexOf(" ") > -1) {
                text = text.split(" ")[0]; //除去显示的时间格式
            }
        } else if (this.props.type == "daterange") {
            if (text && text.indexOf(" ") > -1) {

                var arr = text.split(",");
                text = "";
                if (arr.length > 0 && arr[0].indexOf(" ") > -1) {
                    text = arr[0].split(" ")[0];
                }

                if (arr.length == 2) {
                    if (arr[0].indexOf(" ") > -1) {
                        text = arr[0].split(" ")[0];
                    }
                    if (arr[1].indexOf(" ") > -1) {
                        text += "," + arr[1].split(" ")[0];
                    }
                }
            }
        }
        return text;
    },
    renderDate: function renderDate() {
        var dateobj = this.splitDate(this.state.value);
        if (this.state.value && this.state.value.indexOf(" ") > -1) {
            //说明有时间
            dateobj = this.splitDateTime(this.state.value);
        }

        return React.createElement(DateD, _extends({ ref: "combobox", name: this.props.name, showTime: false }, dateobj, { onSelect: this.onSelect }));
    },
    renderDateTime: function renderDateTime() {
        var dateobj = this.splitDateTime(this.state.value);
        return React.createElement(DateTime, _extends({ ref: "combobox" }, dateobj, { name: this.props.name, showTime: true, onSelect: this.onSelect }));
    },
    renderDateTimeRange: function renderDateTimeRange() {
        var firstDate = null;var secondDate = null;
        var firstTime = null;var secondTime = null;
        if (this.state.value != null && this.state.value != "") {
            //传入一到两个值
            var dateArray = this.state.value.split(",");
            if (dateArray.length > 0) {
                if (dateArray[0].indexOf(" ") > -1) {
                    //有时间
                    firstDate = dateArray[0].split(" ")[0];
                    firstTime = dateArray[0].split(" ")[1];
                } else {
                    firstDate = dateArray[0];
                }
            }
            if (dateArray.length >= 2) {
                if (dateArray[1].indexOf(" ") > -1) {
                    //有时间
                    secondDate = dateArray[1].split(" ")[0];
                    secondTime = dateArray[1].split(" ")[1];
                } else {
                    secondDate = dateArray[1];
                }
            }
        }
        return React.createElement(DateTimeRange, { ref: "combobox", name: this.props.name, firstDate: firstDate, firstTime: firstTime, secondDate: secondDate, secondTime: secondTime, onSelect: this.onSelect });
    },
    renderDateRange: function renderDateRange() {
        var firstDate = null;var secondDate = null;
        if (this.state.value != null && this.state.value != "") {
            //传入一到两个值
            var dateArray = this.state.value.split(",");
            if (dateArray.length > 0) {
                firstDate = dateArray[0];
            }
            if (dateArray.length >= 2) {
                secondDate = dateArray[1];
            }
        }
        return React.createElement(DateRange, { ref: "combobox", name: this.props.name, firstDate: firstDate, secondDate: secondDate, onSelect: this.onSelect });
    },
    render: function render() {
        var control = null;
        var controlDropClassName = "";

        switch (this.props.type) {

            case "date":
                control = this.renderDate();
                controlDropClassName = "date";
                break;
            case "datetime":
                control = this.renderDateTime();
                controlDropClassName = "date time";
                break;
            case "daterange":
                control = this.renderDateRange();
                controlDropClassName = "range";
                break;
            case "datetimerange":
                control = this.renderDateTimeRange();
                controlDropClassName = "range";
                break;
        }
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            title: this.props.title //文本框的属性

        };var text = this.setText();
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "picker", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "div",
                    { className: "combobox", style: { display: this.props.hide == true ? "none" : "block", width: style.width } },
                    React.createElement("i", { className: "picker-clear", onClick: this.clearHandler, style: { display: this.state.readonly ? "none" : this.state.value == "" || !this.state.value ? "none" : "inline" } }),
                    React.createElement("i", { className: "pickericon  " + (this.state.show ? " rotate" : ""), onBlur: this.onBlur, onClick: this.showPicker.bind(this, 1) }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { value: text, onClick: this.showPicker.bind(this, 2), onChange: this.changeHandler })),
                    React.createElement(
                        "div",
                        { className: "dropcontainter " + controlDropClassName + " " + size + " " + this.props.position,
                            style: { display: this.state.show == true ? "block" : "none" } },
                        control
                    )
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position,
                        style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }

});
module.exports = DatePicker;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
create by wangzy
date:2016-05-20
desc:日期范围选择控件
 */
var React = __webpack_require__(1);
var Lang = __webpack_require__(35);
var regs = __webpack_require__(36);
var DateD = __webpack_require__(55);
var Button = __webpack_require__(10);
var shouldComponentUpdate = __webpack_require__(8);
var DateRange = React.createClass({
    displayName: "DateRange",

    mixins: [shouldComponentUpdate],
    PropTypes: {
        name: React.PropTypes.string, //名称
        firstDate: React.PropTypes.string, //第一个日期
        secondDate: React.PropTypes.string, //第二个日期
        onSelect: React.PropTypes.func, //确定事件
        attachTime: React.PropTypes.bool, //j是否附加时间格式
        time: React.PropTypes.string,
        timeEnd: React.PropTypes.string
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: null,
            firstDate: null,
            secondDate: null,
            onSelect: null, //

            attachTime: true,
            time: "00:00:00",
            timeEnd: "23:59:59"
        };
    },
    getInitialState: function getInitialState() {
        //先设置默认值的，再判断用户是否有输入值

        return this.setDefaultState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setDefaultState(nextProps);
    },
    setDefaultState: function setDefaultState(props) {
        //先设置默认值的，再判断用户是否有输入值

        var newDate = new Date();
        var first_year = newDate.getFullYear();
        var first_month = newDate.getMonth() + 1;
        var first_day = null;
        var first_min = null;var first_max = null;
        var second_min = null;var second_max = null;
        var firstDate = props.firstDate;

        if (firstDate && firstDate.indexOf(" ") > -1 && regs.datetime(firstDate)) {
            //有时间
            firstDate = props.firstDate.split(" ")[0];
        } else if (regs.date.test(firstDate)) {//正规的日期格式

        } else {
            firstDate = null;
        }
        if (firstDate) {
            first_year = firstDate.split("-")[0] * 1;
            first_month = firstDate.split("-")[1] * 1;
            first_day = firstDate.split("-")[2] * 1;
        }
        //设置第二日期的默认值
        var second_year = first_year;var second_month;var second_day = null;
        second_month = parseInt(first_month) + 1;
        if (second_month > 12) {
            second_year++;
            second_month = 1;
        } else {}
        //第二个日期
        var secondDate = props.secondDate;
        if (secondDate && secondDate.indexOf(" ") > -1 && regs.datetime(secondDate)) {
            //有时间
            secondDate = props.secondDate.split(" ")[0];
        } else if (secondDate && regs.date.test(secondDate)) {//正规的日期格式

        } else {
            secondDate = null;
        }
        if (secondDate) {
            //输入了值
            if (secondDate.split("-")[0] * 1 > first_year || secondDate.split("-")[1] * 1 > first_month) {
                //不相等才赋值
                second_year = secondDate.split("-")[0] * 1;
                second_month = secondDate.split("-")[1] * 1;
                second_max = second_day = secondDate.split("-")[2] * 1;
                second_min = 1;
                first_min = first_day;
                first_max = 31;
            } else if (secondDate.split("-")[0] * 1 == first_year || secondDate.split("-")[1] * 1 == first_month) {
                //不相等才赋值

                first_max = secondDate.split("-")[2] * 1;
                first_min = first_day;
            }
        } else {
            //第二日期没有值
            first_min = first_max = first_day;
        }
        return {
            first_year: first_year,
            first_month: first_month,
            first_day: first_day,
            first_min: first_min,
            first_max: first_max,
            second_year: second_year,
            second_month: second_month,
            second_day: second_day,
            second_min: second_min,
            second_max: second_max
        };
    },

    firstMonthHandler: function firstMonthHandler(year, month) {
        this.setState({
            first_year: year,
            first_month: month,
            first_day: null,
            first_min: null,
            first_max: null
        });
    },
    secondMonthHandler: function secondMonthHandler(year, month) {
        this.setState({
            second_year: year,
            second_month: month,
            second_day: null,
            second_min: null,
            second_max: null
        });
    },
    firstHandler: function firstHandler(value) {
        //开始日期选择事件
        if (value && value.indexOf(" ") > -1) {
            //有时间
            value = value.split(" ")[0];
        }
        var min_day = this.state.first_min;
        var max_day = this.state.first_max;
        /*单向选择判断*/
        if (!min_day && !max_day || min_day != max_day) {
            //都为空，或者已经选择过了，重新选择
            min_day = value.split("-")[2] * 1;
            max_day = value.split("-")[2] * 1;
        } else if (min_day == max_day) {
            //已经选择了一个
            if (min_day < value.split("-")[2] * 1) {
                //比最小值大
                max_day = value.split("-")[2] * 1;
            } else {
                //比最小值小，调换
                max_day = min_day;
                min_day = value.split("-")[2] * 1;
            }
        }
        /*单向选择判断*/

        /*判断与第二个日期的复合情况*/
        var second_min = this.state.second_min;
        var second_max = this.state.second_max;
        if (min_day == max_day) {
            //第一个日期只选择了一个
            if (this.state.beign_min != this.state.first_max) {
                //第一个日期之前已经选择过了属于重新选择，第二个日期清空
                second_min = second_max = null;
            } else {
                //第一个日期之前没有选择过不属于重新选择
                if (second_min) {
                    //第二个日期框有选择
                    second_min = 1; //设置第二个日期中的开始日期为1
                    max_day = 31; //设置第一个日期中的结束日期为最大
                }
            }
        } else {
            //第一个日期中的开始日期与日期不相同，第二个日期默认清空
            second_min = null;
            second_min = null;
        }
        /*判断与后面一个的复合情况*/
        this.setState({
            first_year: value.split("-")[0] * 1,
            first_month: value.split("-")[1] * 1,
            first_day: value.split("-")[2] * 1,
            first_min: min_day,
            first_max: max_day,
            second_min: second_min,
            second_max: second_max
        });
    },
    secondHandler: function secondHandler(value) {
        //结束日期选择事
        if (value && value.indexOf(" ") > -1) {
            //有时间
            value = value.split(" ")[0];
        }
        var min_day = this.state.second_min;
        var max_day = this.state.second_max;
        /*单向选择判断*/
        if (!min_day && !max_day || min_day != max_day) {
            //都为空，或者已经选择过了，重新选择
            min_day = value.split("-")[2] * 1;
            max_day = value.split("-")[2] * 1;
        } else if (min_day == max_day) {
            //已经选择了一个
            if (min_day < value.split("-")[2] * 1) {
                //比最小值大
                max_day = value.split("-")[2] * 1;
            } else {
                //比最小值小，调换
                max_day = min_day;
                min_day = value.split("-")[2] * 1;
            }
        }
        /*单向选择判断*/

        /*判断与第一个的复合情况*/
        var first_min = this.state.first_min;
        var first_max = this.state.first_max;
        if (min_day == max_day) {
            //第二个日期只选择了一个
            if (this.state.second_min != this.state.second_max) {
                //第二个日期之前已经选择过了属于重新选择，第一个日期清空
                first_min = first_max = null;
            } else {
                //第二个日期之前没有选择过不属于重新选择
                if (first_min) {
                    //第一个日期框有选择
                    first_max = 31; //设置第一个日期 的结束日期为最大
                    min_day = 1; //设置第二个日期 的开始日期为最为1
                }
            }
        } else {
            //第二个日期中的开始日期与日期不相同，第一个日期默认清空
            first_min = null;
            first_max = null;
        }
        this.setState({
            second_year: value.split("-")[0] * 1,
            second_month: value.split("-")[1] * 1,
            second_day: value.split("-")[2] * 1,
            second_min: min_day,
            second_max: max_day,
            first_min: first_min,
            first_max: first_max
        });
    },
    onSelectHandler: function onSelectHandler() {
        var firstDate, secondDate;
        if (this.state.first_min != null) {
            firstDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_min.toString().length == 1 ? "0" + this.state.first_min : this.state.first_min);
        } else if (this.state.second_min != null) {
            firstDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_min.toString().length == 1 ? "0" + this.state.second_min : this.state.second_min);
        }

        if (this.state.second_max != null) {
            secondDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_max.toString().length == 1 ? "0" + this.state.second_max : this.state.second_max);
        } else if (this.state.first_max != null) {
            secondDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_max.toString().length == 1 ? "0" + this.state.first_max : this.state.first_max);
        }

        if (this.props.onSelect != null) {

            if (firstDate && secondDate) {
                if (this.props.attachTime) {
                    firstDate += " " + this.props.time;
                    secondDate += " " + this.props.timeEnd;
                }
                this.props.onSelect(firstDate + "," + secondDate, firstDate + "," + secondDate, this.props.name);
            }
        }
    },
    cancelHandler: function cancelHandler() {
        this.props.onSelect(null, null, this.props.name);
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "ok" },
                React.createElement(Button, { title: "\u786E\u5B9A", name: "ok", ripple: false, theme: "green", onClick: this.onSelectHandler }),
                React.createElement(Button, { title: "\u53D6\u6D88", name: "ok", ripple: false, theme: "cancel", onClick: this.cancelHandler })
            ),
            React.createElement(DateD, { isRange: true, year: this.state.first_year, month: this.state.first_month, day: this.state.first_day,
                min: this.state.first_min, max: this.state.first_max,
                onSelect: this.firstHandler,
                updateYearAndMonth: this.firstMonthHandler
            }),
            React.createElement(DateD, { isRange: true, year: this.state.second_year, month: this.state.second_month, day: this.state.second_day,
                min: this.state.second_min, max: this.state.second_max,
                onSelect: this.secondHandler,
                updateYearAndMonth: this.secondMonthHandler
            })
        );
    }
});
module.exports = DateRange;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-04-25
//desc:日期时间组件，
var React = __webpack_require__(1);
var Lang = __webpack_require__(35);
__webpack_require__(44);
var Time = __webpack_require__(43);
var Button = __webpack_require__(10);
var CalendarHeader = __webpack_require__(118);
var CalendarBody = __webpack_require__(117);
var shouldComponentUpdate = __webpack_require__(8);

var DateTime = React.createClass({
    displayName: "DateTime",

    mixins: [shouldComponentUpdate],
    PropTypes: {
        name: React.PropTypes.string, //字段名称，对应于表单
        year: React.PropTypes.number, //年
        month: React.PropTypes.number, //月
        day: React.PropTypes.number, //日
        time: React.PropTypes.string, //时间
        isRange: React.PropTypes.bool, //是否为范围选择
        min: React.PropTypes.number, //最小值，用于日期范围选择
        max: React.PropTypes.number, //最大值,用于日期范围选择

        onSelect: React.PropTypes.func //选择后的事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            year: null,
            month: null,
            day: null,
            time: null,
            isRange: false, ///默认否
            min: null, //默认为空，不属于日期范围选择
            max: null //默认为空，不属于日期范围选择

        };
    },
    getInitialState: function getInitialState() {
        var newDate = new Date();
        var year = this.formatDate(newDate, 'yyyy');
        var month = this.formatDate(newDate, 'MM');
        return {
            year: this.props.year ? this.props.year : year,
            month: this.props.month ? this.props.month : month,
            day: this.props.day,
            time: this.props.time,
            isRange: this.props.isRange,
            min: this.props.min,
            max: this.props.max,
            changeYear: false, //选择年份
            changeMonth: false //选择月份
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isRange == true) {
            //是日期范围选择，要更新最大值与最小值
            this.setState({
                year: nextProps.year ? nextProps.year : this.state.year,
                month: nextProps.month ? nextProps.month : this.state.month,
                day: nextProps.day,
                time: nextProps.time,
                isRange: nextProps.isRange,
                min: nextProps.min,
                max: nextProps.max
            });
        } else {
            this.setState({
                year: nextProps.year ? nextProps.year : this.state.year,
                month: nextProps.month ? nextProps.month : this.state.month,
                day: nextProps.day,
                time: nextProps.time,
                isRange: nextProps.isRange
            });
        }
    },
    updateYearAndMonth: function updateYearAndMonth(filterYear, filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth,
            day: null, //清空
            min: null,
            max: null
        });

        if (this.props.updateYearAndMonth != null) {
            this.props.updateYearAndMonth(filterYear, filterMonth);
        }
    },
    dayHandler: function dayHandler(day) {

        var time = this.refs.time.getValue();
        this.setState({
            day: day,
            min: day,
            max: day,
            time: time
        });
        if (this.props.onSelect != null) {

            var value = this.state.year + "-" + (this.state.month.toString().length == 1 ? "0" + this.state.month.toString() : this.state.month) + "-" + (day * 1 < 10 ? "0" + day.toString() : day) + (time ? " " + time : "");
            this.props.onSelect(value, value, this.props.name);
        }
    },
    changeYear: function changeYear() {
        this.setState({
            changeYear: !this.state.changeYear,
            changeMonth: false
        });
    },
    changeMonth: function changeMonth() {
        this.setState({
            changeYear: false,
            changeMonth: !this.state.changeMonth
        });
    },
    changeYearHandler: function changeYearHandler(value) {
        this.setState({
            year: value,
            changeYear: false,
            changeMonth: false,
            day: null, //清空
            min: null,
            max: null
        });
    },
    changeMonthHandler: function changeMonthHandler(value) {
        this.setState({
            month: value,
            changeYear: false,
            changeMonth: false,
            day: null, //清空
            min: null,
            max: null
        });
    },
    formatDate: function formatDate(date, format) {
        /**
         * 对Date的扩展，将 Date 转化为指定格式的String
         * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
         * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         * eg:
         * Utils.formatDate(new Date(),'yyyy-MM-dd') ==> 2014-03-02
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm') ==> 2014-03-02 05:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd HH:mm') ==> 2014-03-02 17:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
         * Utils.formatDate(new Date(),'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
         */
        if (!date) return;
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "\u65E5",
            "1": "\u4E00",
            "2": "\u4E8C",
            "3": "\u4E09",
            "4": "\u56DB",
            "5": "\u4E94",
            "6": "\u516D"
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "\u661F\u671F" : "\u5468" : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { style: { position: "relative", height: 32 } },
                React.createElement(Time, { ref: "time", type: "time", key: "end" })
            ),
            React.createElement(
                "div",
                { className: "wasabi-datetime" },
                React.createElement(CalendarHeader, {
                    year: this.state.year,
                    month: this.state.month,
                    updateFilter: this.updateYearAndMonth,
                    changeYear: this.changeYear,
                    changeMonth: this.changeMonth
                }),
                React.createElement(CalendarBody, {
                    year: this.state.year,
                    month: this.state.month,
                    day: this.state.day,
                    isRange: this.state.isRange,
                    min: this.state.min,
                    max: this.state.max,
                    dayHandler: this.dayHandler,
                    changeYear: this.state.changeYear,
                    changeMonth: this.state.changeMonth,
                    changeYearHandler: this.changeYearHandler,
                    changeMonthHandler: this.changeMonthHandler
                })
            )
        );
    }
});
module.exports = DateTime;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 create by wangzy
 date:2016-06-12
 desc:日期范围选择控件
 */
var React = __webpack_require__(1);
var Lang = __webpack_require__(35);
var DateD = __webpack_require__(55);
var Time = __webpack_require__(43);
var Button = __webpack_require__(10);
var shouldComponentUpdate = __webpack_require__(8);
var DateTimeRange = React.createClass({
    displayName: "DateTimeRange",

    mixins: [shouldComponentUpdate],
    PropTypes: {
        name: React.PropTypes.string, //名称
        firstDate: React.PropTypes.string, //第一个日期
        firstTime: React.PropTypes.string, //第一个时间
        secondDate: React.PropTypes.string, //第二个日期
        secondTime: React.PropTypes.string, //第二个时间
        onSelect: React.PropTypes.func //确定事件
    },
    getInitialState: function getInitialState() {
        return this.setDefaultState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

        var newstate = this.setDefaultState(nextProps);
        this.setState(newstate);
    },
    setDefaultState: function setDefaultState(props) {
        //先设置默认值的，再判断用户是否有输入值
        var regs = /^(\d{4})-(\d{2})-(\d{2})$/;
        var newDate = new Date();
        var first_year = newDate.getFullYear();
        var first_month = newDate.getMonth() + 1;
        var first_day = null;
        var first_min = null;var first_max = null;
        var second_min = null;var second_max = null;

        if (props.firstDate && regs.test(props.firstDate)) {
            //输入了值
            first_year = props.firstDate.split("-")[0] * 1;
            first_month = props.firstDate.split("-")[1] * 1;
            first_day = props.firstDate.split("-")[2] * 1;
        }
        //设置第二日期的默认值
        var second_year = first_year;var second_month;var second_day = null;
        second_month = parseInt(first_month) + 1;
        if (second_month > 12) {
            second_year++;
            second_month = 1;
        } else {}
        if (props.secondDate && regs.test(props.secondDate)) {
            //输入了值
            if (props.secondDate.split("-")[0] * 1 > first_year || props.secondDate.split("-")[1] * 1 > first_month) {
                //不相等才赋值
                second_year = props.secondDate.split("-")[0] * 1;
                second_month = props.secondDate.split("-")[1] * 1;
                second_max = second_day = props.secondDate.split("-")[2] * 1;
                second_min = 1;
                first_min = first_day;
                first_max = 31;
            } else if (props.secondDate.split("-")[0] * 1 == first_year || props.secondDate.split("-")[1] * 1 == first_month) {
                //不相等才赋值

                first_max = props.secondDate.split("-")[2] * 1;
                first_min = first_day;
            }
        } else {
            //第二日期没有值
            first_min = first_max = first_day;
        }
        return {
            first_year: first_year,
            first_month: first_month,
            first_day: first_day,
            first_time: props.firstTime,
            first_min: first_min,
            first_max: first_max,

            second_year: second_year,
            second_month: second_month,
            second_day: second_day,
            second_time: props.secondTime,
            second_min: second_min,
            second_max: second_max
        };
    },

    firstMonthHandler: function firstMonthHandler(year, month) {
        this.setState({
            first_year: year,
            first_month: month,
            first_day: null,
            first_min: null,
            first_max: null
        });
    },
    secondMonthHandler: function secondMonthHandler(year, month) {
        this.setState({
            second_year: year,
            second_month: month,
            second_day: null,
            second_min: null,
            second_max: null
        });
    },

    firstHandler: function firstHandler(value) {
        //开始日期选择事件
        if (value && value.indexOf(" ") > -1) {
            //有时间
            value = value.split(" ")[0];
        }
        var min_day = this.state.first_min;
        var max_day = this.state.first_max;
        /*单向选择判断*/
        if (!min_day && !max_day || min_day != max_day) {
            //都为空，或者已经选择过了，重新选择
            min_day = value.split("-")[2] * 1;
            max_day = value.split("-")[2] * 1;
        } else if (min_day == max_day) {
            //已经选择了一个
            if (min_day < value.split("-")[2] * 1) {
                //比最小值大
                max_day = value.split("-")[2] * 1;
            } else {
                //比最小值小，调换
                max_day = min_day;
                min_day = value.split("-")[2] * 1;
            }
        }
        /*单向选择判断*/

        /*判断与第二个日期的复合情况*/
        var second_min = this.state.second_min;
        var second_max = this.state.second_max;
        if (min_day == max_day) {
            //第一个日期只选择了一个
            if (this.state.beign_min != this.state.first_max) {
                //第一个日期之前已经选择过了属于重新选择，第二个日期清空
                second_min = second_max = null;
            } else {
                //第一个日期之前没有选择过不属于重新选择
                if (second_min) {
                    //第二个日期框有选择
                    second_min = 1; //设置第二个日期中的开始日期为1
                    max_day = 31; //设置第一个日期中的结束日期为最大
                }
            }
        } else {
            //第一个日期中的开始日期与日期不相同，第二个日期默认清空
            second_min = null;
            second_min = null;
        }
        /*判断与后面一个的复合情况*/
        this.setState({
            first_year: value.split("-")[0] * 1,
            first_month: value.split("-")[1] * 1,
            first_day: value.split("-")[2] * 1,
            first_min: min_day,
            first_max: max_day,
            second_min: second_min,
            second_max: second_max,
            first_time: this.refs.begin.getValue(),
            second_time: this.refs.end.getValue()
        });
    },
    secondHandler: function secondHandler(value) {
        //结束日期选择事
        if (value && value.indexOf(" ") > -1) {
            //有时间
            value = value.split(" ")[0];
        }
        var min_day = this.state.second_min;
        var max_day = this.state.second_max;
        /*单向选择判断*/
        if (!min_day && !max_day || min_day != max_day) {
            //都为空，或者已经选择过了，重新选择
            min_day = value.split("-")[2] * 1;
            max_day = value.split("-")[2] * 1;
        } else if (min_day == max_day) {
            //已经选择了一个
            if (min_day < value.split("-")[2] * 1) {
                //比最小值大
                max_day = value.split("-")[2] * 1;
            } else {
                //比最小值小，调换
                max_day = min_day;
                min_day = value.split("-")[2] * 1;
            }
        }
        /*单向选择判断*/

        /*判断与第一个的复合情况*/
        var first_min = this.state.first_min;
        var first_max = this.state.first_max;
        if (min_day == max_day) {
            //第二个日期只选择了一个
            if (this.state.second_min != this.state.second_max) {
                //第二个日期之前已经选择过了属于重新选择，第一个日期清空
                first_min = first_max = null;
            } else {
                //第二个日期之前没有选择过不属于重新选择
                if (first_min) {
                    //第一个日期框有选择
                    first_max = 31; //设置第一个日期 的结束日期为最大
                    min_day = 1; //设置第二个日期 的开始日期为最为1
                }
            }
        } else {
            //第二个日期中的开始日期与日期不相同，第一个日期默认清空
            first_min = null;
            first_max = null;
        }
        this.setState({
            second_year: value.split("-")[0] * 1,
            second_month: value.split("-")[1] * 1,
            second_day: value.split("-")[2] * 1,
            second_min: min_day,
            second_max: max_day,
            first_min: first_min,
            first_max: first_max,
            first_time: this.refs.begin.getValue(),
            second_time: this.refs.end.getValue()
        });
    },
    onSelectHandler: function onSelectHandler() {
        var firstDate, secondDate;
        if (this.state.first_min != null) {
            firstDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_min.toString().length == 1 ? "0" + this.state.first_min : this.state.first_min);
        } else if (this.state.second_min != null) {
            firstDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_min.toString().length == 1 ? "0" + this.state.second_min : this.state.second_min);
        }

        if (this.state.second_max != null) {
            secondDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_max.toString().length == 1 ? "0" + this.state.second_max : this.state.second_max);
        } else if (this.state.first_max != null) {
            secondDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_max.toString().length == 1 ? "0" + this.state.first_max : this.state.first_max);
        }
        if (firstDate && secondDate) {

            if (this.props.onSelect != null) {
                var first_time = " " + (this.state.first_time ? this.state.first_time : this.refs.begin.getValue());
                var second_time = " " + (this.state.second_time ? this.state.second_time : this.refs.end.getValue());
                this.props.onSelect(firstDate + first_time + "," + secondDate + second_time, firstDate + first_time + "," + secondDate + second_time, this.props.name);
            }
        }
    },
    beginTimeHandler: function beginTimeHandler(time) {
        this.setState({
            first_time: time
        });
    },
    endTimeHandler: function endTimeHandler(time) {
        this.setState({
            second_time: time
        });
    },
    cancelHandler: function cancelHandler() {
        this.props.onSelect(null, null, this.props.name);
    },
    render: function render() {
        var firstHour = null;var firstMinute = null;var firstSecond = null;
        var secondHour = null,
            secondMinute = null,
            secondSecond = null;
        if (this.state.first_time) {
            firstHour = this.state.first_time.split(":")[0] * 1;
            firstMinute = this.state.first_time.split(":")[1] * 1;
            firstSecond = this.state.first_time.split(":")[2] * 1;
        }
        if (this.state.second_time) {
            secondHour = this.state.second_time.split(":")[0] * 1;
            secondMinute = this.state.second_time.split(":")[1] * 1;
            secondSecond = this.state.second_time.split(":")[2] * 1;
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "ok" },
                React.createElement(
                    "div",
                    { style: { float: "left", marginLeft: 5, marginTop: 5 } },
                    React.createElement(Time, { name: "begin", type: "time", key: "begin", onSelect: this.beginTimeHandler, ref: "begin",
                        hour: firstHour, minute: firstMinute, second: firstSecond })
                ),
                React.createElement(
                    "div",
                    { style: { float: "left", marginLeft: 68, marginTop: 5, height: 32 } },
                    React.createElement(Time, { name: "end", type: "time", key: "end", ref: "end", onSelect: this.endTimeHandler, hour: secondHour, minute: secondMinute, second: secondSecond })
                ),
                React.createElement(Button, { title: "\u786E\u5B9A", name: "ok", ripple: false, theme: "green", onClick: this.onSelectHandler }),
                React.createElement(Button, { title: "\u53D6\u6D88", name: "ok", ripple: false, theme: "cancel", onClick: this.cancelHandler })
            ),
            React.createElement(DateD, { isRange: true, year: this.state.first_year, month: this.state.first_month, day: this.state.first_day,
                min: this.state.first_min, max: this.state.first_max,
                onSelect: this.firstHandler,
                updateYearAndMonth: this.firstMonthHandler
            }),
            React.createElement(DateD, { isRange: true, year: this.state.second_year, month: this.state.second_month, day: this.state.second_day,
                min: this.state.second_min, max: this.state.second_max,
                onSelect: this.secondHandler,
                updateYearAndMonth: this.secondMonthHandler
            })
        );
    }
});
module.exports = DateTimeRange;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//create by wangzy
//date:2016-04-05后开始独立改造
//desc:表单组件
__webpack_require__(304);
var React = __webpack_require__(1);
var Input = __webpack_require__(56);
var Button = __webpack_require__(10);
var unit = __webpack_require__(5);
var shouldComponentUpdate = __webpack_require__(8);
var Form = React.createClass({
    displayName: "Form",

    mixins: [shouldComponentUpdate],
    propTypes: {
        model: React.PropTypes.array.isRequired, //表单数据模型
        width: React.PropTypes.number, ///宽度
        height: React.PropTypes.number, //高度
        className: React.PropTypes.string, //自定义样式
        disabled: React.PropTypes.bool, //是否只读
        submitTitle: React.PropTypes.string, //提交按钮标题
        closeTitle: React.PropTypes.string, //关闭按钮标题
        submitHide: React.PropTypes.bool, //提交按钮是否隐藏
        closeHide: React.PropTypes.bool, //关闭按钮是否隐藏
        submitHandler: React.PropTypes.func, //提交成功后的回调事件
        closeHandler: React.PropTypes.func, //关闭事件的回调事件
        submitTheme: React.PropTypes.oneOf([//提交按钮默认主题
        "primary", "default", "success", "info", "warning", "danger", "green", "cancel"]),
        closeTheme: React.PropTypes.oneOf([//关闭按钮默认主题
        "primary", "default", "success", "info", "warning", "danger", "green", "cancel"]),
        columns: React.PropTypes.oneOf([//表单的列数，为none则系统不自动排版，为null则系统自动排版，为数字则指定列数
        "none", //不处理
        1, 2, 3, 4])
    },
    getDefaultProps: function getDefaultProps() {
        return {
            model: [], //表单数据模型
            width: null, //默认宽度
            height: null, //高度
            className: "", //自定义样式
            disabled: false, //是否只读
            submitTitle: "提交", //提交按钮标题
            closeTitle: "关闭", //关闭按钮标题
            submitHide: false, //提交按钮是否隐藏
            closeHide: false, //关闭按钮是否隐藏
            submitHandler: null, //提交成功后的回调事件
            closeHandler: null, //关闭事件的回调事件
            submitTheme: "green", //提交按钮默认主题
            closeTheme: "cancel", //关闭按钮默认主题
            columns: null //null系统自行处理列数
        };
    },
    getInitialState: function getInitialState() {
        this.isChange = false;
        //初始化时就获取可用宽度,如果每次更新获取,会产生晃动
        if (window.screen.availWidth < document.documentElement.clientWidth) {
            //屏幕可用宽度小,有滚动条
            this.availWidth = window.screen.availWidth;
        } else {
            //没有滚动条
            this.availWidth = window.screen.availWidth - 10; //防止后期出现滚动条,而产生样式变形,先减去滚动条宽度
        }
        return {
            model: this.props.model, //一定复制
            pickerRowModel: new Map(), //下拉框中选中的完整数据
            disabled: this.props.disabled, //是否只读
            columns: this.props.columns //自定义列数

        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.showUpdate = false; //清除自身标记
        this.setState({
            model: nextProps.model,
            disabled: nextProps.disabled,
            columns: nextProps.columns
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.isChange && this.showUpdate) {
            this.showUpdate = false;
            if (this.props.changeHandler) {
                //用于父组件监听是否表单是否有修改，用于立即更新父组件中的按钮的权限之类的,
                this.props.changeHandler();
            }
        } else {}
    },
    changeHandler: function changeHandler(value, text, name, data) {
        //
        var newModel = this.state.model;
        var pickerRowModel = this.state.pickerRowModel;
        for (var i = 0; i < newModel.length; i++) {
            if (newModel[i].name == name) {
                newModel[i].value = value;
                newModel[i].text = text;
                if (newModel[i].type == "select" || newModel[i].type == "gridpicker") {
                    pickerRowModel.set(newModel[i].name, data);
                }
                break;
            }
        }
        this.isChange = true; //用于对外标记
        this.showUpdate = true; //用于自身标记

        this.setState({
            model: newModel,
            pickerRowModel: pickerRowModel

        });
    },
    getState: function getState() {
        //只读方法，用于父组件其他方法里来获取表单是否发生改变
        if (this.isChange) {
            return true;
        } else {
            return false;
        }
    },
    clearDirtyData: function clearDirtyData() {
        //清除组件的表单脏数据状态
        this.isChange = false;
    },
    getData: function getData() {
        //获取当前表单的数据，没有验证
        var data = {};
        var isva = true;
        for (var v in this.refs) {
            if (isva) {
                //验证成功，则继续验证
                isva = this.refs[v].validate(this.refs[v].state.value);
            } else {
                //不成功则继续验证但不再回执
                this.refs[v].validate(this.refs[v].state.value);
            }

            if (this.refs[v].props.name.indexOf(",") > -1) {
                //含有多个字段
                var nameSplit = this.refs[v].props.name.split(",");
                if (this.refs[v].state.value && this.refs[v].state.value != "") {
                    var valueSplit = this.refs[v].state.value.split(",");
                    for (var index = 0; index < valueSplit.length; index++) {
                        //有可能分离的值比字段少
                        if (index < valueSplit.length) {
                            data[nameSplit[index]] = valueSplit[index];
                        }
                    }
                } else {
                    for (var _index = 0; _index < nameSplit.length; _index++) {
                        data[nameSplit[_index]] = null;
                    }
                }
            } else {
                data[this.refs[v].props.name] = this.refs[v].state.value;
            }
        }
        return data;
    },
    setData: function setData(data) {
        //设置值,data是对象
        this.isChange = false;
        if (!data) {
            return;
        }
        var newModel = this.state.model;
        for (var i = 0; i < newModel.length; i++) {
            if (data[newModel[i].name]) {
                if (_typeof(data[newModel[i].name]) === "object") {
                    //键值对
                    try {
                        if (data[newModel[i].name].value) {
                            newModel[i].value = data[newModel[i].name].value;
                        }
                        if (data[newModel[i].name].text) {
                            newModel[i].text = data[newModel[i].name].text;
                        }
                    } catch (e) {
                        throw new Error(e.message);
                        return;
                    }
                } else {
                    //文本型
                    newModel[i].value = data[newModel[i].name];
                    newModel[i].text = data[newModel[i].name];
                }
            }
        }
        this.setState({
            model: newModel
        });
    },
    getTextData: function getTextData() {
        var textData = {}; //各个字段对应的文本值
        var isva = true;
        for (var v in this.refs) {
            if (isva) {
                //验证成功，则继续验证
                isva = this.refs[v].validate(this.refs[v].state.value);
            } else {
                //不成功则继续验证但不再回执
                this.refs[v].validate(this.refs[v].state.value);
            }
            if (this.refs[v].props.name.indexOf(",") > -1) {
                //含有多个字段
                var nameSplit = this.refs[v].props.name.split(",");
                if (this.refs[v].state.value && this.refs[v].state.value != "") {

                    var textSplit = this.refs[v].state.text.split(","); //文本值
                    for (var index = 0; index < textSplit.length; index++) {
                        //有可能分离的值比字段少
                        if (index < textSplit.length) {
                            textData[nameSplit[index]] = textSplit[index];
                        }
                    }
                } else {
                    for (var _index2 = 0; _index2 < nameSplit.length; _index2++) {
                        textData[nameSplit[_index2]] = "";
                    }
                }
            } else {
                textData[this.refs[v].props.name] = this.refs[v].state.text;
            }
        }
        return textData;
    },
    getRowDataByName: function getRowDataByName(name) {
        return this.state.pickerRowModel.get(name);
    },
    getModel: function getModel() {
        //获取当前表单数据model
        var newmodel = this.state.model; //
        return newmodel;
    },
    validate: function validate() {
        var data = {};
        var isva = true;
        for (var v in this.refs) {
            if (isva) {
                //验证成功，则继续验证,这样就可以显示所有验证样式
                isva = this.refs[v].validate();
            } else {
                //不成功则继续验证但不再回执
                this.refs[v].validate();
            }
            data[this.refs[v].props.name] = this.refs[v].state.value;
        }
        return isva;
    },
    getComponentData: function getComponentData(name) {
        //只读属性，获取对应的字段的数据源
        return JSON.parse(window.localStorage.getItem(name + "data"));
    },
    clearData: function clearData() {
        //清空数据
        this.isChange = false; //清除脏数据状态
        var newModel = this.state.model;
        for (var i = 0; i < newModel.length; i++) {
            newModel[i].value = null;
            newModel[i].text = null;
        }
        this.setState({
            model: newModel
        });
    },

    submitHandler: function submitHandler() {
        //提交 数据
        var data = {}; //各个字段对应的值
        var textData = {}; //各个字段对应的文本值
        var isva = true;
        for (var v in this.refs) {
            if (this.refs[v].props.type == "button") {
                continue; //如果按钮则跳过
            }
            if (isva) {
                //验证成功，则继续验证
                isva = this.refs[v].validate();
            } else {
                //不成功则继续验证但不再回执
                this.refs[v].validate();
            }
            if (this.refs[v].props.name.indexOf(",") > -1) {
                //含有多个字段
                var nameSplit = this.refs[v].props.name.split(",");
                if (this.refs[v].state.value && this.refs[v].state.value != "") {
                    var valueSplit = this.refs[v].state.value.split(",");
                    var textSplit = this.refs[v].state.text.split(","); //文本值
                    for (var index = 0; index < valueSplit.length; index++) //有可能分离的值比字段少
                    {
                        if (index < valueSplit.length) {
                            data[nameSplit[index]] = valueSplit[index];
                            textData[nameSplit[index]] = textSplit[index];
                        }
                    }
                } else {
                    for (var _index3 = 0; _index3 < nameSplit.length; _index3++) {
                        data[nameSplit[_index3]] = null;
                        textData[nameSplit[_index3]] = "";
                    }
                }
            } else {
                data[this.refs[v].props.name] = this.refs[v].state.value;
                textData[this.refs[v].props.name] = this.refs[v].state.text;
            }
        }

        if (isva) {

            if (this.props.submitHandler != null) {
                this.props.submitHandler(data, textData);
            }
        }
    },
    closeHandler: function closeHandler() {
        //关闭事件
        if (this.props.closeHandler != null) {
            this.props.closeHandler();
        }
    },
    setColumns: function setColumns() {
        //计算列数及样式
        var style = {}; //表单栏样式
        if (this.props.style) {
            style = this.props.style;
        }

        var columns = 0; //每一行的列数

        //表单实际宽度
        var actualWidth = this.props.width ? this.props.width : this.availWidth; //总宽度
        var columnClass = ""; //列排版样式
        if (this.state.columns) {
            //如果自定义了,则以自定义为标准
            columns = this.state.columns;
        } else if (this.state.columns == null) {
            //没设置，则自动计算
            if (actualWidth <= 610) {
                //一列
                columns = 1;
            } else if (actualWidth >= 611 && actualWidth <= 909) {
                //两列
                columns = 2;
            } else if (actualWidth >= 910 && actualWidth <= 1229) {
                //三列
                columns = 3;
            } else if (actualWidth >= 1230) {
                //四列
                columns = 4;
            }
        } else if (this.state.columns == "none" || this.state.columns == 0) {} //不处理

        // if(this.state.model.length<columns) {//如果数据小于列数
        //     columns = this.state.model.length;
        // }
        if (columns > 0) {
            //需要处理列的排版
            switch (columns) {
                case 1:
                    columnClass = "oneline";
                    break;
                case 2:
                    columnClass = "twoline";
                    break;
                case 3:
                    columnClass = "threeline";
                    break;
                case 4:
                    columnClass = "fourline";
                    break;
            }
        }

        style.width = actualWidth; //设置表单的宽度
        style.height = this.props.height; //设置表单的高度

        var result = {
            style: style,
            columns: columns,
            columnClass: columnClass
        };
        return result;
    },
    render: function render() {
        var _this = this;

        if (this.state.model instanceof Array) {} else {
            return;
        }
        var result = this.setColumns(); //得计算列的结果
        var formSubmitVisible = true; //按钮行是否可见
        if (this.state.disabled || this.props.submitHide && this.props.closeHide) {
            formSubmitVisible = false;
        } else {}
        var orderIndex = 0; //表单组件在表单的序号
        return React.createElement(
            "div",
            { className: "wasabi-form " + result.columnClass + " " + this.props.className, style: result.style },
            React.createElement(
                "div",
                { className: "form-body  " },
                this.state.model.map(function (child, index) {
                    var position = "right"; //默认都靠右

                    if (result.columns) {
                        //需要计算列的位置
                        position = orderIndex % result.columns; //求余,计算在表单中列位置
                        if (position == 0) {
                            position = "left";
                        } else if (position == result.columns - 1) {
                            position = "right";
                        } else {
                            position = "default";
                        }
                    }
                    var size = "default"; //列的大小
                    child.onlyline == true ? "onlyline" : child.size;
                    if (result.columns) {
                        //需要计算列的大小

                        if (child.hide == true) {//如果隐藏的话，不计算序号

                        } else {
                            if (size == "default") {
                                orderIndex++;
                            } else if (size == "large" || size == "two") {

                                if (result.columns == 1) {
                                    orderIndex++; //每行只有一列,算一列
                                } else {
                                    orderIndex += 2; //算两列
                                }
                            } else if (size == "three") {

                                if (result.columns == 1 || result.columns == 2) {
                                    orderIndex++; //每行只有一列或者两列,算一列
                                } else {
                                    orderIndex += 3; //算三列
                                }
                            } else if (size == "onlyline") {
                                orderIndex += result.columns;
                            }
                        }
                    }

                    return React.createElement(Input, _extends({ ref: child.name,
                        key: child.name + index.toString()
                    }, child, {
                        position: position,
                        readonly: _this.state.disabled == true ? true : child.readonly,
                        backFormHandler: _this.changeHandler
                    }));
                }),
                React.createElement("div", { className: "clear" })
            ),
            React.createElement(
                "div",
                { className: "form-submit", style: { display: formSubmitVisible == true ? "block" : "none" } },
                React.createElement(Button, { theme: this.props.submitTheme, onClick: this.submitHandler, title: this.props.submitTitle, hide: this.state.disabled == true ? true : this.props.submitHide == true ? true : false }),
                React.createElement(Button, { theme: this.props.closeTheme, onClick: this.closeHandler, title: this.props.closeTitle, hide: this.state.disabled == true ? true : this.props.closeHide == true ? true : false })
            )
        );
    }
});
module.exports = Form;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 create by wangzy
 date:2016-07-04
 desc:列表下拉选择
 */
var React = __webpack_require__(1);

var SearchBox = __webpack_require__(79);
var DataGrid = __webpack_require__(260); //注意这里的引用
var unit = __webpack_require__(5);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var showUpdate = __webpack_require__(22);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var ClickAway = __webpack_require__(24);
var GridPicker = React.createClass({
    displayName: "GridPicker",

    mixins: [setStyle, validate, showUpdate, shouldComponentUpdate, ClickAway],
    propTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        onSelect: React.PropTypes.func //选中后的事件，回传，value,与text,data

    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            onSelect: null,
            //其他属性
            keyField: "id",
            pagination: false,
            selectAble: false,
            detailAble: false,
            borderAble: false

        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            params: this.props.params, //默认筛选条件
            url: null, //默认为空,表示不查询,后期再更新,
            show: false, //
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,
            data: this.props.data,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        //只更新不查询,注意了
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {
            //没有传url
            this.setState({
                hide: nextProps.hide,
                data: nextProps.data,
                value: nextProps.value,
                text: nextProps.text,
                readonly: nextProps.readonly,
                required: nextProps.required,
                params: nextProps.params,
                validateClass: "", //重置验证样式
                helpTip: validation["required"] //提示信息
            });
        } else {
            this.setState({
                hide: nextProps.hide,
                value: nextProps.value,
                text: nextProps.text,
                readonly: nextProps.readonly,
                required: nextProps.required,
                params: nextProps.params,
                validateClass: "", //重置验证样式
                helpTip: validation["required"] //提示信息
            });
        }
    },
    componentDidMount: function componentDidMount() {

        this.registerClickAway(this.hidePicker, this.refs.picker); //注册全局单击事件
    },
    onBlur: function onBlur() {
        this.refs.label.hideHelp(); //隐藏帮助信息
    },
    changeHandler: function changeHandler(event) {},
    showPicker: function showPicker(type) {
        //显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        } else {
            this.setState({
                show: type == 1 ? !this.state.show : true
            });
        }
        this.bindClickAway(); //绑定全局单击事件
    },
    hidePicker: function hidePicker() {
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },
    onSearch: function onSearch(params) {
        var newparams = this.state.params;
        if (!newparams) {
            newparams = {};
        }
        for (var v in params) {
            newparams[v] = params[v];
        }

        this.setState({
            params: newparams,
            url: this.props.url //查询的时候再赋值
        });
    },
    onSelect: function onSelect(rowIndex, rowData) {
        if (this.props.onSelect != null) {
            if (this.props.valueField && this.props.textField) {

                this.props.onSelect(rowData[this.props.valueField], rowData[this.props.textField], this.props.name, rowData);
            }
        }
        this.validate(rowData[this.props.valueField]);
        this.setState({
            value: rowData[this.props.valueField],
            text: rowData[this.props.textField],
            show: !this.state.show
        });
    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        } else {
            this.setState({
                value: null,
                text: null
            });
        }
    },
    render: function render() {
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            title: this.props.title //文本框的属性
        };var props = _extends({}, this.props);
        props.onClick = this.onSelect; //生定向，但是仍然保留原来的属性
        props.width = 410;
        props.height = 398;
        props.url = this.state.url;
        props.data = this.state.data;
        props.type = null;
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "picker", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "div",
                    { className: "combobox", style: { display: this.props.hide == true ? "none" : "block" } },
                    React.createElement("i", { className: "picker-clear ", onClick: this.clearHandler, style: { display: this.state.readonly ? "none" : this.state.value == "" || !this.state.value ? "none" : "inline" } }),
                    React.createElement("i", { className: "pickericon  " + (this.state.show ? "rotate" : ""), onClick: this.showPicker.bind(this, 1) }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { value: this.state.text, onBlur: this.onBlur, onClick: this.showPicker.bind(this, 2), onChange: this.changeHandler })),
                    React.createElement(
                        "div",
                        { className: "dropcontainter gridpicker  " + this.props.position, style: { height: this.props.height, display: this.state.show == true ? "block" : "none" } },
                        React.createElement(SearchBox, { name: this.props.name, valueField: this.props.valueField, textField: this.props.textField, onSearch: this.onSearch }),
                        React.createElement(DataGrid, _extends({}, props, { params: this.state.params }))
                    )
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }
});
module.exports = GridPicker;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//creete by wangzy
//date:2016-11-21
//desc 增加多行文本
var React = __webpack_require__(1);

var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var Button = __webpack_require__(10);
var pasteExtend = __webpack_require__(81);
var ClickAway = __webpack_require__(24);
var MutiText = React.createClass({
    displayName: "MutiText",

    mixins: [setStyle, validate, shouldComponentUpdate, ClickAway],
    propTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        rows: React.PropTypes.number, //行数
        min: React.PropTypes.number, //最小值,最小长度,
        max: React.PropTypes.number, //最大值,最大长度
        onClick: React.PropTypes.func, //单击事件
        onChange: React.PropTypes.func //值改变事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            type: "text",
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default"

        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,

            //其他属性
            show: false, //是否显示

            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: "",
            areaValue: this.props.value ? this.props.value.replace(/,/g, "\n") : null //多行文本框的值

        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            hide: nextProps.hide,
            min: nextProps.min,
            max: nextProps.max,
            value: nextProps.value,
            areaValue: nextProps.value ? nextProps.value.replace(/,/g, "\n") : null,
            text: nextProps.text,
            readonly: nextProps.readonly,
            required: nextProps.required,
            validateClass: "", //重置验证样式
            helpTip: validation["required"], //提示信息
            show: false

        });
    },
    componentDidMount: function componentDidMount() {

        this.registerClickAway(this.hidePicker, this.refs.picker); //注册全局单击事件
    },
    onBlur: function onBlur() {
        this.refs.label.hideHelp(); //隐藏帮助信息
    },
    changeHandler: function changeHandler(event) {
        this.setState({
            areaValue: event.target.value
        });
    },
    onlineChangeHandler: function onlineChangeHandler(event) {
        this.setState({
            value: event.target.value,
            text: event.target.value,
            areaValue: event.target.value,
            show: false
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(event.target.value, event.target.value, this.props.name);
        }
    },
    showPicker: function showPicker() {
        //显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        } else {
            this.setState({
                show: !this.state.show
            });
        }
        this.bindClickAway(); //绑定全局单击事件
    },
    hidePicker: function hidePicker() {
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        }
        this.setState({
            value: null,
            text: null,
            areaValue: ""
        });
    },
    cancelHandler: function cancelHandler() {
        //取消选择
        this.setState({
            show: false,
            areaValue: this.state.value ? this.state.value.replace(/,/g, "\n") : null //还原之前的值

        });
    },
    onSelectHandler: function onSelectHandler() {
        //确定事件
        this.setState({
            ulShow: false,
            value: this.state.areaValue ? this.state.areaValue.replace(/\n/g, ",") : null,
            text: this.state.areaValue ? this.state.areaValue.replace(/\n/g, ",") : null
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(this.state.areaValue ? this.state.areaValue.replace(/\n/g, ",") : null, this.state.areaValue ? this.state.areaValue.replace(/\n/g, ",") : null, this.props.name);
        }
    },
    render: function render() {
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : "") //文本框的属性

            //textarea 不支持null值
        };var areaValue = this.state.areaValue;
        if (!areaValue) {
            areaValue = "";
        }
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "picker", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "div",
                    { className: "combobox", style: { display: this.props.hide == true ? "none" : "block" } },
                    React.createElement("i", { className: "picker-clear", onClick: this.clearHandler, style: { display: this.state.readonly ? "none" : this.state.value == "" || !this.state.value ? "none" : "inline" } }),
                    React.createElement("i", { className: "pickeradd " + (this.state.show ? "rotate" : ""), onClick: this.showPicker }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { value: this.state.text, onBlur: this.onBlur, onChange: this.onlineChangeHandler })),
                    React.createElement(
                        "div",
                        { className: "dropcontainter  mutiText " + this.props.position, style: { display: this.state.show == true ? "block" : "none" } },
                        React.createElement(
                            "div",
                            { style: { height: 30, lineHeight: "30px", color: "#aaaaaa", overflow: "hidden" } },
                            this.props.title
                        ),
                        React.createElement("textarea", { value: areaValue, ref: "input", onChange: this.changeHandler,
                            style: { width: "100%", height: 100, border: "1px solid #d7dde2", resize: "none" } }),
                        React.createElement(
                            "div",
                            { className: "ok" },
                            React.createElement(Button, { title: "\u786E\u5B9A", name: "ok", ripple: false, theme: "green", onClick: this.onSelectHandler }),
                            React.createElement(Button, { title: "\u53D6\u6D88", name: "ok", ripple: false, theme: "cancel", onClick: this.cancelHandler })
                        )
                    )
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }
});
module.exports = MutiText;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//creete by wangzy
//date:2016-11-25
//desc 表单中空的占位组件,方便排版
//属性与状态值保留,可能以后有用
var React = __webpack_require__(1);
var setStyle = __webpack_require__(11);
var None = React.createClass({
    displayName: "None",

    mixins: [setStyle],
    propTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        rows: React.PropTypes.number, //行数
        min: React.PropTypes.number, //最小值,最小长度,
        max: React.PropTypes.number, //最大值,最大长度
        onClick: React.PropTypes.func, //单击事件
        onChange: React.PropTypes.func //值改变事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            type: "text",
            name: "",
            label: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            row: 5,
            min: null,
            max: null,
            onClick: null,
            onChange: null

        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            min: this.props.min,
            max: this.props.max,
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: "", //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            hide: nextProps.hide,
            min: nextProps.min,
            max: nextProps.max,
            value: nextProps.value,
            text: nextProps.text,
            readonly: nextProps.readonly,
            required: nextProps.required,
            validateClass: "" //重置验证样式
        });
    },

    render: function render() {
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size + " " + (this.props.className ? this.props.className : ""); //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, style: controlStyle },
            React.createElement("div", { className: "wasabi-form-group-body", style: { width: "100%" } })
        );
    }
});
module.exports = None;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by jiaxuanliang on 2016/7/4.
 */
var React = __webpack_require__(1);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var ClickAway = __webpack_require__(24);
var PanelPicker = React.createClass({
    displayName: "PanelPicker",

    mixins: [setStyle, validate, shouldComponentUpdate, ClickAway],
    PropTypes: {
        type: React.PropTypes.oneOf[("date", //日期选择
        "datetime", //时间选择
        "daterange", //日期范围选择
        "datetimerange" //日期时间范围选择

        )], //类型
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        onSelect: React.PropTypes.func.isRequired

    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",
            //其他属性
            valueField: "value",
            textField: "text",
            onSelect: null
        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,
            show: false,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

        this.setState({
            hide: nextProps.hide,
            value: nextProps.value,
            text: nextProps.text,
            readonly: nextProps.readonly,

            //验证
            required: this.props.required,
            helpShow: "none", //提示信息是否显示
            invalidTip: "",
            validateClass: "", //重置验证样式
            helpTip: validation["required"] //提示信息
        });
    },
    componentDidMount: function componentDidMount() {

        this.registerClickAway(this.hidePicker, this.refs.picker); //注册全局单击事件
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.showClick && this.props.showHandler) {
            this.showClick = false;
            this.props.showHandler(this.state.show);
        }
    },
    changeHandler: function changeHandler(event) {},
    onBlur: function onBlur() {
        this.refs.label.hideHelp(); //隐藏帮助信息
    },
    showPicker: function showPicker(type) {
        //显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        } else {
            this.setState({
                show: type == 1 ? !this.state.show : true
            });
            this.showClick = true; //点击了显示
        }
        this.bindClickAway(); //绑定全局单击事件
    },
    hidePicker: function hidePicker() {
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        } else {
            this.setState({
                value: null,
                text: null
            });
        }
    },
    onSelect: function onSelect(value, txt) {
        this.setState({
            show: false,
            value: value,
            text: txt
        });
        this.validate(value);
        if (this.props.onSelect != null) {
            this.props.onSelect(value, txt, this.props.name, null);
        }
    },
    render: function render() {

        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            title: this.props.title //文本框的属性
        };var children = React.cloneElement(this.props.children, { onSelect: this.onSelect });
        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "picker", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "div",
                    { className: "combobox", style: { display: this.props.hide == true ? "none" : "block" }
                    },
                    React.createElement("i", { className: "picker-clear", onClick: this.clearHandler, style: { display: (this.state.readonly ? "none" : this.state.value == "" || !this.state.value) ? "none" : "inline" } }),
                    React.createElement("i", { className: "pickericon " + (this.state.show ? "rotate" : ""), onClick: this.showPicker.bind(this, 1) }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { value: this.state.text, onBlur: this.onBlur, onClick: this.showPicker.bind(this, 2), onChange: this.changeHandler })),
                    React.createElement(
                        "div",
                        { className: "dropcontainter panelpicker " + this.props.position,
                            style: { display: this.state.show == true ? "block" : "none" } },
                        children
                    )
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position,
                        style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }
});

module.exports = PanelPicker;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 create by wangzy
 date:2016-05-23
 desc:级联选择组件
 采用了es6语法
 */
var React = __webpack_require__(1);
__webpack_require__(310);
var unit = __webpack_require__(5);

var FetchModel = __webpack_require__(13);
var PickerModel = __webpack_require__(142);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var showUpdate = __webpack_require__(22);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var Message = __webpack_require__(14);
var ClickAway = __webpack_require__(24);
var Picker = React.createClass({
    displayName: "Picker",

    mixins: [setStyle, validate, showUpdate, shouldComponentUpdate, ClickAway],
    propTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        onSelect: React.PropTypes.func, //选中后的事件，回传，value,与text,data

        //其他属性
        secondUrl: React.PropTypes.string, //第二层节点的后台地址,
        secondParams: React.PropTypes.object, //第二层节点的后台参数
        secondParamsKey: React.PropTypes.string, //第二层节点的后台参数中传递一级节点value值的参数名称
        thirdUrl: React.PropTypes.string, //第三层节点的后台地址，
        thirdParams: React.PropTypes.object, //第三层节点的后台参数
        thirdParamsKey: React.PropTypes.string, //第三层节点的后台参数中传递二级节点value值的参数名称
        hotTitle: React.PropTypes.string, //热门选择标题
        hotData: React.PropTypes.array //热门选择的数据
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            onSelect: null,
            //其他属性
            secondUrl: null,
            secondParams: null,
            secondParamsKey: null,
            thirdUrl: null,
            thirdParams: null,
            thirdParamsKey: null,
            hotTitle: "热门选择",
            hotData: null
        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,

            //其他属性
            params: unit.clone(this.props.params),
            provinceActiveIndex: null, //一级激活节点下标
            cityActiveIndex: null, //二级激活节点下标
            distinctActiveIndex: null, //三级激活节点下标
            show: false, //是否显示
            //其他属性
            secondParams: this.props.secondParams,
            secondParamsKey: this.props.secondParamsKey,
            thirdParams: this.props.thirdParams,
            thirdParamsKey: this.props.thirdParamsKey,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {
            this.setState({
                hide: nextProps.hide,
                data: nextProps.data,
                value: nextProps.value,
                text: nextProps.text,
                readonly: nextProps.readonly,
                required: nextProps.required,
                params: unit.clone(nextProps.params),
                secondParams: nextProps.secondParams,
                secondParamsKey: nextProps.secondParamsKey,
                thirdParams: nextProps.thirdParams,
                thirdParamsKey: nextProps.thirdParamsKey,
                validateClass: "", //重置验证样式
                helpTip: validation["required"], //提示信息
                show: false

            });
        } else {
            if (this.showUpdate(nextProps.params)) {
                //如果不相同则更新
                var fetchmodel = new FetchModel(this.props.url, this.loadProvinceSuccess, nextProps.params, this.loadError);
                console.log("picker", fetchmodel);
                unit.fetch.post(fetchmodel);
            } else {}
            this.setState({
                hide: nextProps.hide,
                value: nextProps.value,
                text: nextProps.text,
                readonly: nextProps.readonly,
                required: nextProps.required,

                params: unit.clone(nextProps.params),
                secondParams: nextProps.secondParams,
                secondParamsKey: nextProps.secondParamsKey,
                thirdParams: nextProps.thirdParams,
                thirdParamsKey: nextProps.thirdParamsKey,
                validateClass: "", //重置验证样式
                helpTip: validation["required"], //提示信息
                show: false
            });
        }
    },
    componentDidMount: function componentDidMount() {
        if (this.props.url != null) {
            var fetchmodel = new FetchModel(this.props.url, this.loadProvinceSuccess, this.state.params, this.loadError);
            console.log("picker", fetchmodel);
            unit.fetch.post(fetchmodel);
        }
        this.registerClickAway(this.hidePicker, this.refs.picker); //注册全局单击事件
    },

    loadProvinceSuccess: function loadProvinceSuccess(data) {
        //一级节点的数据加载成功
        var provinceData = []; //一级节点数据
        var realData = data;
        //获取真实数据
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        provinceData = this.setPickerModel(realData); //生成标准格式model
        this.setState({
            data: provinceData
        });
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("picker-error", errorCode, message);
        Message.error(message);
    },
    changeHandler: function changeHandler(event) {},
    onBlur: function onBlur() {
        this.refs.label.hideHelp(); //隐藏帮助信息
    },
    showPicker: function showPicker(type) {
        //显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        } else {
            this.setState({
                show: type == 1 ? !this.state.show : true
            });
        }
        this.bindClickAway(); //绑定全局单击事件
    },
    hidePicker: function hidePicker() {
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        } else {
            this.setState({
                value: null,
                text: null
            });
        }
    },
    setPickerModel: function setPickerModel(data) {
        //根据数据生成标准格式
        var realData = [];
        for (var index = 0; index < data.length; index++) {
            var pickerModel = new PickerModel(data[index][this.props.valueField], data[index][this.props.textField]);
            realData.push(pickerModel);
        }
        return realData;
    },
    activeHot: function activeHot(value, text) {
        this.setState({
            show: false,
            value: value,
            text: text
        });
        this.validate(value); //验证
        if (this.props.onSelect != null) {

            this.props.onSelect(value, text, this.props.name);
        }
    },

    flodChildren: function flodChildren(data) {
        //将节点折叠起来
        for (var index = 0; index < data.length; index++) {
            data[index].expand = false;
            if (data[index].childrens && data[index].childrens instanceof Array) {
                data[index].childrens = this.flodChildren(data[index].childrens); //遍历
            }
        }
        return data;
    },
    activeProvince: function activeProvince(currentProvinceIndex, currentProvinceValue) {
        //一级节点激活
        var newData = this.state.data;
        var selectValue = this.state.value;
        var selectText = this.state.text;
        if (this.state.provinceActiveIndex === currentProvinceIndex) {
            //当前节点为激活节点
            var newData = this.state.data;
            if (newData[currentProvinceIndex].childrens instanceof Array && newData[currentProvinceIndex].childrens.length > 0) {
                //有子节点则不执行选中事件
                var expand = newData[currentProvinceIndex].expand;
                newData = this.flodChildren(newData); //折叠
                newData[currentProvinceIndex].expand = !expand; //如果为展开状态则隐藏,否则展开
            } else {
                //没有则立即执行选中事件
                selectValue = newData[currentProvinceIndex].value;
                selectText = newData[currentProvinceIndex].text;
                if (this.props.onSelect != null) {
                    this.props.onSelect(selectValue, selectText, this.props.name, null);
                }
            }
            this.validate(selectValue); //验证
            this.setState({
                value: selectValue,
                text: selectText,
                data: newData,
                provinceActiveIndex: currentProvinceIndex,
                cityActiveIndex: null,
                distinctActiveIndex: null
            });
        } else {
            //当前节点不是激活节点
            if (this.props.secondUrl != null && this.state.data[currentProvinceIndex].childrens == null) {
                //存在二级节点url并且没有查询过

                var url = this.props.secondUrl;
                var params = this.state.secondParams;
                if ((typeof params === "undefined" ? "undefined" : _typeof(params)) == "object") {
                    //判断是否为对象
                    params[this.state.secondParamsKey] = currentProvinceValue;
                } else {
                    params = {};
                    if (this.state.secondParamsKey != null) {
                        params[this.state.secondParamsKey] = currentProvinceValue;
                    }
                }
                var fetchmodel = new FetchModel(url, this.loadCitySuccess.bind(this, currentProvinceIndex), params, this.loadError);
                console.log("picker-second", fetchmodel);
                unit.fetch.post(fetchmodel);
            } else {
                //没有二级节点的url
                var newData = this.state.data;

                var expand = newData[currentProvinceIndex].expand;
                newData = this.flodChildren(newData); //折叠
                newData[currentProvinceIndex].expand = !expand;

                if (newData[currentProvinceIndex].childrens instanceof Array && newData[currentProvinceIndex].childrens.length > 0) {
                    //有子节点则不执行选中事件
                } else {
                    //没有则立即执行选中事件
                    selectValue = newData[currentProvinceIndex].value;
                    selectText = newData[currentProvinceIndex].text;
                    if (this.props.onSelect != null) {
                        this.props.onSelect(selectValue, selectText, this.props.name, null);
                    }
                }
                this.validate(selectValue); //验证
                this.setState({
                    value: selectValue,
                    text: selectText,
                    data: newData,
                    provinceActiveIndex: currentProvinceIndex,
                    cityActiveIndex: null,
                    distinctActiveIndex: null
                });
            }
        }
    },
    loadCitySuccess: function loadCitySuccess(currentProviceIndex, data) {
        //二级节点的数据加载成功
        var cityData = []; //当前一级节点的二级节点数据
        var realData = data;
        var newData = this.state.data;
        var selectValue = this.state.value;
        var selectText = this.state.text;
        //获取真实数据
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        cityData = this.setPickerModel(realData); //生成二级节点数据模型
        if (cityData instanceof Array && cityData.length > 0) {
            //有数据
            newData[currentProviceIndex].childrens = cityData; //将查询的二级节点赋值给一级激活节点
            var expand = newData[currentProviceIndex].expand;
            newData = this.flodChildren(newData); //折叠
            newData[currentProviceIndex].expand = !expand; //当前一级节点展开

        } else {
            //没有数据,则直接执行选择事件
            selectValue = newData[currentProviceIndex].value;
            selectText = newData[currentProviceIndex].text;
            if (this.props.onSelect != null) {
                this.props.onSelect(selectValue, selectText, this.props.name, null);
            }
        }
        this.validate(selectValue); //验证
        this.setState({
            value: selectValue,
            text: selectText,
            data: newData,
            provinceActiveIndex: currentProviceIndex,
            cityActiveIndex: null,
            distinctActiveIndex: null
        });
    },
    activeCity: function activeCity(currentProvinceIndex, currentCityIndex, currentCityValue) {
        //二级节点激活

        var newData = this.state.data;
        var selectValue = this.state.value;
        var selectText = this.state.text;
        if (this.state.provinceActiveIndex === currentProvinceIndex && this.state.cityActiveIndex === currentCityIndex) {
            //当前节点为激活节点
            if (newData[this.state.provinceActiveIndex].childrens[currentCityIndex].childrens instanceof Array && newData[this.state.provinceActiveIndex].childrens[currentCityIndex].childrens.length > 0) {
                //有子节点(三级节点)则不执行选中事件
                var expand = newData[this.state.provinceActiveIndex].childrens[currentCityIndex].expand;
                newData = this.flodChildren(newData); //折叠
                newData[this.state.provinceActiveIndex].expand = true; //一级节点展开
                newData[this.state.provinceActiveIndex].childrens[currentCityIndex].expand = !expand; //如果为展开状态则隐藏,否则展开
            } else {
                //没有则立即执行选中事件
                selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].childrens[currentCityIndex].value;
                selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].childrens[currentCityIndex].text;
                if (this.props.onSelect != null) {
                    this.props.onSelect(selectValue, selectText, this.props.name, null);
                }
            }
            this.validate(selectValue); //验证
            this.setState({
                value: selectValue,
                text: selectText,
                data: newData,
                cityActiveIndex: currentCityIndex,
                distinctActiveIndex: null
            });
        } else {
            if (this.props.thirdUrl != null && this.state.data[this.state.provinceActiveIndex].childrens[currentCityIndex].childrens == null) {
                //存在三级节点url并且没有查询过
                var url = this.props.thirdUrl;
                var params = this.state.thirdParams;
                if ((typeof params === "undefined" ? "undefined" : _typeof(params)) == "object") {
                    //判断是否为对象
                    params[this.state.thirdParamsKey] = currentCityValue;
                } else {
                    params = {};
                    if (this.state.thirdParamsKey != null) {
                        params[this.state.thirdParamsKey] = currentCityValue;
                    }
                }
                var fetchmodel = new FetchModel(url, this.loadDistinctSuccess.bind(this, currentCityIndex), params, this.loadError);
                console.log("picker-third", fetchmodel);
                unit.fetch.post(fetchmodel);
            } else {

                for (var index = 0; index < newData[this.state.provinceActiveIndex].childrens.length; index++) {
                    newData[this.state.provinceActiveIndex].childrens[index].expand = false;
                }
                var expand = newData[this.state.provinceActiveIndex].childrens[currentCityIndex].expand;
                newData = this.flodChildren(newData); //折叠

                newData[this.state.provinceActiveIndex].expand = true; //一级节点展开
                newData[this.state.provinceActiveIndex].childrens[currentCityIndex].expand = !expand;

                if (newData[this.state.provinceActiveIndex].childrens[currentCityIndex].childrens instanceof Array && newData[this.state.provinceActiveIndex].childrens[currentCityIndex].childrens.length > 0) {
                    //有子节点(三级节点)则不执行选中事件
                } else {
                    //没有则立即执行选中事件
                    selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].childrens[currentCityIndex].value;
                    selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].childrens[currentCityIndex].text;
                    if (this.props.onSelect != null) {
                        this.props.onSelect(selectValue, selectText, this.props.name, null);
                    }
                }
                this.validate(selectValue); //验证
                this.setState({
                    value: selectValue,
                    text: selectText,
                    data: newData,
                    cityActiveIndex: currentCityIndex,
                    distinctActiveIndex: null
                });
            }
        }
    },
    loadDistinctSuccess: function loadDistinctSuccess(currentCityIndex, data) {
        //三级节点查询成功
        var distinctData = []; //当前二级节点的二级节点数据
        var realData = data;
        var selectValue = this.state.value;
        var selectText = this.state.text;
        //获取真实数据
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        distinctData = this.setPickerModel(realData); //生成二级节点数据模型
        var newData = this.state.data;
        if (distinctData instanceof Array && distinctData.length > 0) {
            //有数据
            for (var index = 0; index < newData[this.state.provinceActiveIndex].childrens.length; index++) {
                newData[this.state.provinceActiveIndex].childrens[index].expand = false;
            }
            newData[this.state.provinceActiveIndex].childrens[currentCityIndex].childrens = distinctData; //将查询的三级节点赋值给二级激活节点
            var expand = newData[this.state.provinceActiveIndex].childrens[currentCityIndex].expand;
            newData = this.flodChildren(newData); //折叠
            newData[this.state.provinceActiveIndex].expand = true; //一级节点展开
            newData[this.state.provinceActiveIndex].childrens[currentCityIndex].expand = !expand;
        } else {
            selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].childrens[currentCityIndex].value;
            selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].childrens[currentCityIndex].text;
            if (this.props.onSelect != null) {
                this.props.onSelect(selectValue, selectText, this.props.name, null);
            }
        }
        this.validate(selectValue); //验证
        this.setState({
            value: selectValue,
            text: selectText,
            data: newData,
            cityActiveIndex: currentCityIndex,
            distinctActiveIndex: null

        });
    },
    activeDistinct: function activeDistinct(currentDistinctIndex) {
        //三级节点激活
        var newData = this.state.data;
        var selectValue = this.state.value;
        var selectText = this.state.text;
        for (var index = 0; index < newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].childrens.length; index++) {
            newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].childrens[index].expand = false;
        }
        newData = this.flodChildren(newData); //折叠
        newData[this.state.provinceActiveIndex].expand = true;newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].expand = true;
        newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].childrens[currentDistinctIndex].expand = true;
        selectValue = newData[this.state.provinceActiveIndex].value + "," + newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].value + "," + newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].childrens[currentDistinctIndex].value;
        selectText = newData[this.state.provinceActiveIndex].text + "," + newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].text + "," + newData[this.state.provinceActiveIndex].childrens[this.state.cityActiveIndex].childrens[currentDistinctIndex].text;

        if (this.props.onSelect != null) {
            this.props.onSelect(selectValue, selectText, this.props.name, null);
        }
        this.validate(selectValue); //验证
        this.setState({
            value: selectValue,
            text: selectText,
            data: newData,
            distinctActiveIndex: currentDistinctIndex
        });
    },
    renderHot: function renderHot() {
        var _this = this;

        //热门选择
        if (this.props.hotData instanceof Array) {
            var controlArray = [];
            this.props.hotData.map(function (item, index) {
                controlArray.push(React.createElement(
                    "li",
                    { key: "hot" + item.text, className: "hot-item", onClick: _this.activeHot.bind(_this, item.value, item.text), title: item.text },
                    item.text
                ));
            });
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "hot-wrap" },
                    React.createElement(
                        "p",
                        { style: { display: this.props.hotTitle && this.props.hotTitle != "" ? "block" : "none" } },
                        this.props.hotTitle
                    ),
                    React.createElement(
                        "ul",
                        null,
                        controlArray
                    )
                ),
                React.createElement(
                    "div",
                    { className: "line" },
                    " "
                )
            );
        } else {
            return null;
        }
    },
    renderProvince: function renderProvince() {
        var _this2 = this;

        //一级节点渲染
        var provinceComponents = [];
        if (this.state.data instanceof Array) {
            this.state.data.map(function (child, index) {
                var left = index % 5 * -65;

                provinceComponents.push(React.createElement(
                    "li",
                    { key: "province" + index, className: "picker-container  " + (child.expand ? "expand" : "") },
                    React.createElement(
                        "ul",
                        { className: "picker-container-wrap", style: { display: child.expand ? "block" : "none", left: left } },
                        _this2.renderCity(index, child.childrens)
                    ),
                    React.createElement(
                        "div",
                        { className: "picker-container-name " + (child.expand ? "expand" : ""), onClick: _this2.activeProvince.bind(_this2, index, child.value), title: child.text },
                        child.text
                    )
                ));
            });
            return provinceComponents;
        } else {
            return null;
        }
    },

    renderCity: function renderCity(provinceIndex, cityData) {
        var _this3 = this;

        //二级节点渲染
        var cityComponents = [];
        if (cityData instanceof Array) {
            cityData.map(function (child, index) {
                var left = index % 4 * -80;
                if (index % 4 == 0) {
                    left = -14;
                }

                cityComponents.push(React.createElement(
                    "li",
                    { key: "city" + index, className: "picker-container  " + (child.expand ? "expand" : "") },
                    React.createElement(
                        "ul",
                        { className: "picker-container-wrap", style: { display: child.expand ? "block" : "none", left: left } },
                        _this3.renderDistinct(child.childrens)
                    ),
                    React.createElement(
                        "div",
                        { className: "picker-container-name " + (child.expand ? "expand" : ""), onClick: _this3.activeCity.bind(_this3, provinceIndex, index, child.value), title: child.text },
                        child.text
                    )
                ));
            });
            return cityComponents;
        } else {
            return null;
        }
    },
    renderDistinct: function renderDistinct(distinctData) {
        var _this4 = this;

        //三级节点渲染
        var distinctComponents = [];
        if (distinctData instanceof Array) {
            distinctData.map(function (child, index) {
                distinctComponents.push(React.createElement(
                    "li",
                    { key: "distinct" + index, className: "pickeritem " + (_this4.state.distinctActiveIndex === index ? "expand" : ""), onClick: _this4.activeDistinct.bind(_this4, index, child.value), title: child.text },
                    child.text
                ));
            });
            return distinctComponents;
        } else {
            return null;
            return null;
        }
    },
    render: function render() {
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            title: this.props.title //文本框的属性
        };var control = this.renderProvince();

        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "picker", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "div",
                    { className: "combobox", style: { display: this.props.hide == true ? "none" : "block" } },
                    React.createElement("i", { className: "picker-clear", onClick: this.clearHandler, style: { display: this.state.readonly ? "none" : this.state.value == "" || !this.state.value ? "none" : "inline" } }),
                    React.createElement("i", { className: "pickericon " + (this.state.show ? "rotate" : ""), onClick: this.showPicker.bind(this, 1) }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { onBlur: this.onBlur, value: this.state.text, onClick: this.showPicker.bind(this, 2), onChange: this.changeHandler })),
                    React.createElement(
                        "div",
                        { className: "dropcontainter  picker " + this.props.position, style: { display: this.state.show == true ? "block" : "none" } },
                        React.createElement(
                            "div",
                            { className: "picker" },
                            this.renderHot(),
                            React.createElement(
                                "ul",
                                { className: "wrap" },
                                React.createElement(
                                    "p",
                                    null,
                                    this.props.placeholder
                                ),
                                this.renderProvince()
                            )
                        )
                    )
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }
});
module.exports = Picker;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//create by wangzy
//date:2016-04-05后开始独立改造
//desc:页面筛选条件组件
__webpack_require__(306);
var React = __webpack_require__(1);
var Input = __webpack_require__(56);
var Button = __webpack_require__(10);
var unit = __webpack_require__(5);
var shouldComponentUpdate = __webpack_require__(8);
var SearchBar = React.createClass({
    displayName: "SearchBar",

    mixins: [shouldComponentUpdate],
    propTypes: {
        model: React.PropTypes.array.isRequired,
        searchTitle: React.PropTypes.string,
        searchHide: React.PropTypes.bool,
        filterHandler: React.PropTypes.func.isRequired,
        expandHandler: React.PropTypes.func,
        width: React.PropTypes.number

    },
    getDefaultProps: function getDefaultProps() {
        return {
            model: [], //表单数据模型
            searchTitle: "查询", //查询按钮的标题
            searchHide: false, //是否隐藏按钮
            filterHandler: null, //提交成功后的回调事件
            className: "",
            expandHandler: null, //展开与折叠事件
            width: null
        };
    },
    getInitialState: function getInitialState() {
        //初始化时就获取可用宽度,如果每次更新获取,会产生晃动
        if (window.screen.availWidth < document.documentElement.clientWidth) {
            //屏幕可用宽度小,有滚动条
            this.availWidth = window.screen.availWidth - 50;
        } else {
            //没有滚动条  现在每个页面留有左右20像素的边距
            this.availWidth = window.screen.availWidth - 40; //防止后期出现滚动条,而产生样式变形,先减去滚动条宽度
        }

        return {
            model: this.props.model,
            dropType: "wasabi-button wasabi-searchbar-down" //折叠按钮样式
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        //屏幕可用宽度,


        this.setState({
            model: nextProps.model,
            style: nextProps.style,
            className: nextProps.className

        });
        //this.forceUpdate();//?强制刷新
    },
    changeHandler: function changeHandler(value, text, name) {
        //子组件值发生改变时
        var newModel = this.state.model;
        for (var i = 0; i < newModel.length; i++) {
            if (newModel[i].name == name) {
                newModel[i].value = value;
                newModel[i].text = text;
                break;
            }
        }
        this.setState({
            model: newModel
        });
    },
    clearData: function clearData() {
        //清空数据
        var newModel = this.state.model;
        for (var i = 0; i < newModel.length; i++) {
            newModel[i].value = null;
            newModel[i].text = null;
        }
        this.setState({
            model: newModel
        });
    },
    getData: function getData() {
        var data = {};
        for (var v in this.refs) {
            if (this.refs[v].props.type == "button") {
                continue; //如果按钮则跳过
            }
            if (this.refs[v].props.name.indexOf(",") > -1) {
                //含有多个字段
                var nameSplit = this.refs[v].props.name.split(",");
                if (this.refs[v].state.value && this.refs[v].state.value != "") {
                    var valueSplit = this.refs[v].state.value.split(",");
                    for (var index = 0; index < nameSplit.length; index++) {
                        if (index < valueSplit.length) {
                            data[nameSplit[index]] = valueSplit[index];
                        }
                    }
                } else {
                    for (var _index = 0; _index < nameSplit.length; _index++) {
                        data[nameSplit[_index]] = null;
                    }
                }
            } else {
                data[this.refs[v].props.name] = this.refs[v].state.value;
            }
        }
        return data;
    },
    getTextData: function getTextData() {
        var textData = {}; //各个字段对应的文本值
        for (var v in this.refs) {
            if (this.refs[v].props.name.indexOf(",") > -1) {
                //含有多个字段
                var nameSplit = this.refs[v].props.name.split(",");
                if (this.refs[v].state.value && this.refs[v].state.value != "") {

                    var textSplit = this.refs[v].state.text.split(","); //文本值
                    for (var index = 0; index < nameSplit.length; index++) {
                        if (index < textSplit.length) {
                            textData[nameSplit[index]] = textSplit[index];
                        }
                    }
                } else {
                    for (var _index2 = 0; _index2 < nameSplit.length; _index2++) {
                        textData[nameSplit[_index2]] = "";
                    }
                }
            } else {
                textData[this.refs[v].props.name] = this.refs[v].state.text;
            }
        }
        return textData;
    },
    onSubmit: function onSubmit() {
        //筛选查询开始
        var data = {}; //各个字段对应的值
        var textData = {}; //各个字段对应的文本值
        var isva = true;
        for (var v in this.refs) {
            if (isva) {
                //验证成功，则继续验证
                isva = this.refs[v].validate();
            } else {
                //不成功则继续验证但不再回执
                this.refs[v].validate();
            }
            if (this.refs[v].props.name.indexOf(",") > -1) {
                //含有多个字段
                var nameSplit = this.refs[v].props.name.split(",");
                if (this.refs[v].state.value && this.refs[v].state.value != "") {
                    var valueSplit = this.refs[v].state.value.split(",");
                    var textSplit = this.refs[v].state.text.split(","); //文本值
                    for (var index = 0; index < nameSplit.length; index++) {
                        if (index < valueSplit.length) {
                            data[nameSplit[index]] = valueSplit[index];
                            textData[nameSplit[index]] = textSplit[index];
                        }
                    }
                } else {
                    for (var _index3 = 0; _index3 < nameSplit.length; _index3++) {
                        data[nameSplit[_index3]] = null;
                        textData[nameSplit[_index3]] = "";
                    }
                }
            } else {
                data[this.refs[v].props.name] = this.refs[v].state.value;
                textData[this.refs[v].props.name] = this.refs[v].state.text;
            }
        }
        if (isva) {
            this.props.filterHandler(data, textData);
        }
    },
    getComponentData: function getComponentData(name) {
        //只读属性，获取对应的字段的数据源
        return JSON.parse(window.localStorage.getItem(name + "data"));
    },
    expandHandler: function expandHandler() {
        var expand = false;
        if (this.state.dropType == "wasabi-button wasabi-searchbar-down") {
            this.setState({
                dropType: "wasabi-button wasabi-searchbar-up"

            });
            expand = true;
        } else {
            this.setState({
                dropType: "wasabi-button wasabi-searchbar-down"
            });
        }
        if (this.props.expandHandler != null) {
            this.props.expandHandler(expand);
        }
    },
    setColumns: function setColumns() {
        //计算列数及样式
        var style = {}; //表单栏样式
        if (this.props.style) {
            style = this.props.style;
        }

        var columns = 0; //每一行的列数
        //表单实际宽度
        var actualWidth = this.props.width ? this.props.width : this.availWidth; //总宽度

        var leftWidth = actualWidth - 130; //左侧表单宽度

        var columnClass = ""; //列样式
        if (this.state.columns) {
            //如果自定义了,则以自定义为标准
            columns = this.state.columns;
        } else {
            //否则自动计算
            if (leftWidth <= 610) {
                //一列
                columns = 1;
            } else if (leftWidth >= 611 && leftWidth <= 909) {
                //两列
                columns = 2;
            } else if (leftWidth >= 910 && leftWidth <= 1229) {
                //三列
                columns = 3;
            } else if (leftWidth >= 1230) {
                //四列
                columns = 4;
            }
        }
        if (this.state.model.length < columns) {
            //如果数据小于列数
            columns = this.state.model.length;
            if (columns <= 2) {
                //如果只有两列的话,重新定义宽度
                actualWidth = 800;
                leftWidth = actualWidth - 130;
            }
        }
        switch (columns) {
            case 1:
                columnClass = "oneline";
                break;
            case 2:
                columnClass = "twoline";
                break;
            case 3:
                columnClass = "threeline";
                break;
            case 4:
                columnClass = "fourline";
                break;

        }
        style.width = actualWidth; //设置表单的宽度

        this.state.dropType == "wasabi-button wasabi-searchbar-down" ? style.height = 54 : style.height = null; //判断高度

        var result = {
            style: style,
            columns: columns,
            columnClass: columnClass,
            leftWidth: leftWidth
        };

        return result;
    },

    render: function render() {
        var _this = this;

        if (this.state.model instanceof Array) {} else {
            return null;
        }
        var result = this.setColumns(); //得计算列的结果
        var props = {
            className: "wasabi-searchbar " + result.columnClass + " " + this.props.className,
            style: result.style
        };
        var orderIndex = 0; //表单组件在表单的序号,
        return React.createElement(
            "div",
            props,
            React.createElement(
                "div",
                { className: "leftform", style: { width: result.leftWidth } },
                this.state.model.map(function (child, index) {
                    var position = orderIndex % result.columns; //求余,计算在表单中列位置
                    if (position == 0) {
                        position = "left";
                    } else if (position == result.columns - 1) {
                        position = "right";
                    } else {
                        position = "default";
                    }
                    var size = child.onlyline == true ? "onlyline" : child.size; //组件大小
                    if (size == "default") {
                        orderIndex++;
                    } else if (size == "large" || size == "two") {

                        if (result.columns == 1) {
                            orderIndex++; //每行只有一列,算一列
                        } else {
                            orderIndex += 2; //算两列
                        }
                    } else if (size == "three") {

                        if (result.columns == 1 || result.columns == 2) {
                            orderIndex++; //每行只有一列或者两列,算一列
                        } else {
                            orderIndex += 3; //算三列
                        }
                    } else if (size == "onlyline") {
                        orderIndex += result.columns;
                    }
                    //因为orderIndex代表的是下一个序号,所以要小于等于来判断是否隐藏

                    return React.createElement(
                        "div",
                        { className: "wasabi-searchbar-item", key: orderIndex,
                            style: { display: _this.state.dropType == "wasabi-button wasabi-searchbar-down" ? orderIndex <= result.columns ? "inline" : "none" : "inline" } },
                        React.createElement(Input, _extends({ ref: child.name,
                            key: child.name + index.toString()
                        }, child, {
                            position: position,
                            readonly: _this.state.disabled == true ? true : child.readonly,
                            backFormHandler: _this.changeHandler
                        }))
                    );
                }),
                React.createElement("div", { className: "clear" })
            ),
            React.createElement(
                "div",
                { className: "rightbutton" },
                React.createElement("button", { className: this.state.dropType, style: { float: "left", display: result.columns < this.state.model.length ? "inline" : "none" }, onClick: this.expandHandler }),
                React.createElement(
                    Button,
                    { onClick: this.onSubmit.bind(this, "submit"), theme: "green", style: { float: "right", marginTop: result.columns < this.state.model.length ? -22 : 0, display: this.props.searchHide == true ? "none" : null }, title: this.props.searchTitle },
                    this.props.searchTitle
                )
            ),
            React.createElement("div", { className: "clear" })
        );
    }
});
module.exports = SearchBar;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 下拉框
 */
__webpack_require__(308);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var showUpdate = __webpack_require__(22);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var Message = __webpack_require__(14);
var ClickAway = __webpack_require__(24);
var Select = React.createClass({
    displayName: "Select",

    mixins: [setStyle, validate, showUpdate, shouldComponentUpdate, ClickAway],
    PropTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        min: React.PropTypes.number, //最少选择几个
        max: React.PropTypes.number, //最多选择几个
        onClick: React.PropTypes.func, //自定义单击事件，这样就可以将普通下拉框组合其他组件

        //其他属性
        multiple: React.PropTypes.bool, //是否允许多选
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        extraData: React.PropTypes.array, //额外的数据,对url有效
        onSelect: React.PropTypes.func, //选中后的事件，回传，value,与text,data
        addAbled: React.PropTypes.bool, //是否允许自动添加
        addHandler: React.PropTypes.func, //添加后的回调
        onBeforeSelect: React.PropTypes.func //选择之前的事件


    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",
            //其他属性
            min: null,
            max: null,
            onClick: null,
            //其他属性
            multiple: false,
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            extraData: null,
            onSelect: null,
            writable: false,
            addAbled: false,
            addHandler: null

        };
    },
    getInitialState: function getInitialState() {
        var newData = [];
        var text = this.props.text;
        if (this.props.data && this.props.data instanceof Array) {
            for (var i = 0; i < this.props.data.length; i++) {
                var obj = this.props.data[i];
                obj.text = this.props.data[i][this.props.textField];
                obj.value = this.props.data[i][this.props.valueField];
                if (obj.value == this.props.value) {
                    text = obj.text; //根据value赋值
                }
                newData.push(obj);
            }
        }

        return {
            hide: this.props.hide,
            params: unit.clone(this.props.params), //参数
            data: newData,
            value: this.props.value,
            text: text,
            show: false, //是否显示下拉选项
            multiple: this.props.multiple,
            min: this.props.min,
            max: this.props.max,
            readonly: this.props.readonly,

            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: "",
            filterValue: null //筛选框的值
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
         this.isChange :代表自身发生了改变,防止父组件没有绑定value,text,而导致无法选择
         */

        var value = this.isChange ? this.state.value : nextProps.value;
        var text = this.isChange ? this.state.text : nextProps.text;
        this.isChange = false; //重置
        var newData = null;
        if (nextProps.data != null && nextProps.data instanceof Array && (!nextProps.url || nextProps.url == "")) {
            //没有url,传的是死数据
            newData = [];
            //因为这里统一将数据进行了改造,所以这里要重新处理一下
            for (var i = 0; i < nextProps.data.length; i++) {
                var obj = nextProps.data[i];
                obj.text = nextProps.data[i][this.props.textField];
                obj.value = nextProps.data[i][this.props.valueField];
                if (obj.value == nextProps.value) {
                    text = obj.text; //根据value赋值
                }
                newData.push(obj);
            }
        } else {
            //url形式
            newData = this.state.data; //先得到以前的数据
            if (this.showUpdate(nextProps.params)) {
                //如果不相同则更新
                this.loadData(this.props.url, nextProps.params); //异步更新
            } else {}
        }

        this.setState({
            hide: nextProps.hide,
            value: value,
            text: text,
            data: newData,
            params: unit.clone(nextProps.params),
            multiple: nextProps.multiple,
            min: nextProps.min,
            max: nextProps.max,
            readonly: nextProps.readonly,
            required: nextProps.required,
            validateClass: "", //重置验证样式
            helpTip: validation["required"], //提示信息
            filterValue: null
        });
    },
    componentWillMount: function componentWillMount() {
        //如果指定url,先查询数据再绑定
        this.loadData(this.props.url, this.state.params); //查询数据
    },
    componentDidMount: function componentDidMount() {

        this.registerClickAway(this.hideOptions, this.refs.select); //注册全局单击事件
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.isChange == true) {
            //说明已经改变了,回传给父组件
            if (this.props.onSelect != null) {
                this.props.onSelect(this.state.value, this.state.text, this.props.name, this.rowData);
            }
        }
    },

    loadData: function loadData(url, params) {
        if (url != null && url != "") {
            if (params == null) {
                var fetchmodel = new FetchModel(url, this.loadSuccess, null, this.loadError);
                unit.fetch.get(fetchmodel);
            } else {
                var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
                unit.fetch.post(fetchmodel);
            }
            console.log("select", fetchmodel);
        }
    },
    loadSuccess: function loadSuccess(data) {
        //数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {} else {
            realData = unit.getSource(data, this.props.dataSource);
        }
        var newData = [];
        var text = this.state.text;
        for (var i = 0; i < realData.length; i++) {
            var obj = realData[i]; //将所有字段添加进来
            obj.text = realData[i][this.props.textField];
            obj.value = realData[i][this.props.valueField];
            if (obj.value == this.state.value) {
                text = obj.text; //根据value赋值
            }
            newData.push(obj);
        }
        if (this.props.extraData == null || this.props.extraData.length == 0) {
            //没有额外的数据
        } else {
            //有额外的数据
            for (var _i = 0; _i < this.props.extraData.length; _i++) {
                var _obj = {};
                _obj.text = this.props.extraData[_i][this.props.textField];
                _obj.value = this.props.extraData[_i][this.props.valueField];
                if (_obj.value == this.state.value) {
                    text = _obj.text; //根据value赋值
                }
                newData.unshift(_obj);
            }
        }
        window.localStorage.setItem(this.props.name + 'data', JSON.stringify(newData)); //用于后期获取所有数据

        this.setState({
            data: newData,
            value: this.state.value,
            text: text
        });
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("select-error", errorCode, message);
        Message.error(message);
    },
    showOptions: function showOptions(type) {
        //显示下拉选项
        console.log("show");
        if (this.state.readonly) {
            return;
        }
        if (this.props.onClick != null) {
            this.props.onClick();
        }
        this.setState({
            show: type == 1 ? !this.state.show : true
        });
        this.bindClickAway(); //绑定全局单击事件
    },
    hideOptions: function hideOptions(event) {
        console.log("hide");
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },

    onSelect: function onSelect(value, text, rowData) {
        //选中事件
        console.log("test");
        if (this.props.onBeforeSelect && value != this.state.value && this.props.onBeforeSelect(value, text, rowData) || !this.props.onBeforeSelect) {
            //选择之前的确定事件返回true,或者没有

            this.isChange = true; //代表自身发生了改变,防止父组件没有绑定value,text的状态值,而导致无法选择的结果
            this.rowData = rowData; //临时保存起来
            var newvalue = "";
            var newtext = "";
            if (value == undefined) {
                console.error("绑定的valueField没有");
            }
            if (text == undefined) {
                console.error("绑定的textField没有");
            }
            if (this.state.multiple) {

                var oldvalue = [];
                var oldtext = [];
                if (this.state.value) {
                    oldvalue = this.state.value.toString().split(",");
                    oldtext = this.state.text.toString().split(",");
                }
                if (oldvalue.indexOf(value.toString()) > -1) {
                    //取消选中
                    oldvalue.splice(oldvalue.indexOf(value.toString()), 1);
                    oldtext.splice(oldvalue.indexOf(value.toString()), 1);
                    newvalue = oldvalue.join(",");
                    newtext = oldtext.join(",");
                } else {
                    //选中
                    if (this.state.value) {
                        newvalue = this.state.value + "," + value;
                        newtext = this.state.text + "," + text;
                    } else {
                        newvalue = value;
                        newtext = text;
                    }
                }
                this.setState({
                    value: newvalue,
                    text: newtext
                });
            } else {
                var newvalue = value;
                var newtext = text;
                this.setState({
                    show: false,
                    value: newvalue,
                    text: newtext,
                    filterValue: null
                });
            }
            this.validate(newvalue); //
        }
    },
    getComponentData: function getComponentData() {
        //只读属性，获取当前下拉的数据源
        return this.state.data;
    },
    onBlur: function onBlur() {

        this.refs.label.hideHelp(); //隐藏帮助信息
    },

    keyUpHandler: function keyUpHandler(event) {
        if (this.props.addAbled && event.keyCode == 13) {
            var filter = this.state.data.filter(function (item, index) {
                return item.text == event.target.value;
            });
            if (filter.length == 0) {

                this.state.data.push({
                    value: event.target.value,
                    text: event.target.value
                });
                this.setState({
                    data: this.state.data
                });
                if (this.props.addHandler) {
                    this.props.addHandler(this.state.data);
                }
            }
            ;
        }
    },
    filterChangeHandler: function filterChangeHandler(event) {
        //筛选查询
        this.setState({
            filterValue: event.target.value,
            show: true
        });
        this.refs.ul.scrollTop = 0; //回到顶部

    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        } else {
            this.setState({
                value: null,
                text: null
            });
        }
    },
    render: function render() {
        var _this = this;

        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            title: this.props.title //文本框的属性
        };var control = null;
        if (this.state.data && this.state.data.length > 0) {
            control = React.createElement(
                "ul",
                { style: { display: this.state.show == true ? "block" : "none" }, ref: "ul" },
                this.state.data.map(function (child, i) {
                    var reg = new RegExp(_this.state.filterValue, "i");
                    if (_this.state.filterValue && child.text.search(reg) == -1) {
                        return;
                    } else {
                        //TODO 这里要用正则，先保留
                        var checked = false;
                        if (_this.state.value && child.value && ("," + _this.state.value.toString() + ",").indexOf("," + child.value + ",") > -1) {
                            checked = true;
                        } else if (_this.state.value == "" && child.value == "") {
                            checked = true;
                        }
                        return React.createElement(
                            "li",
                            { key: "li" + i, className: checked == true ? "active" : "",
                                onClick: _this.onSelect.bind(_this, child.value, child.text, child) },
                            child.text
                        );
                    }
                })
            );
        }

        return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "select", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide,
                required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body" },
                React.createElement(
                    "div",
                    { className: "nice-select ", style: style },
                    React.createElement("i", { className: "picker-clear", onClick: this.clearHandler,
                        style: { display: this.state.readonly ? "none" : this.state.value == "" || !this.state.value ? "none" : "inline" } }),
                    React.createElement("i", { className: "icon " + (this.state.show ? "rotate" : ""),
                        onClick: this.showOptions.bind(this, 1) }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { title: this.props.addAbled ? "输入搜索，回车添加" : "输入搜索",
                        onKeyUp: this.keyUpHandler,
                        value: this.state.filterValue != null ? this.state.filterValue : this.state.text,
                        onClick: this.showOptions.bind(this, 2), onBlur: this.onBlur,
                        onChange: this.filterChangeHandler })),
                    control
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position,
                        style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        "div",
                        { className: "text" },
                        this.state.helpTip
                    )
                )
            )
        );
    }

});
module.exports = Select;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by jiaxuanliang
 * date:2016-04-05后开始独立改造
 * edit by wangzy
 * date:2016-04-26
 * desc:重命名为SwitchButton 并将完善
 */
__webpack_require__(309);
var React = __webpack_require__(1);
var setStyle = __webpack_require__(11);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var SwitchButton = React.createClass({
    displayName: 'SwitchButton',

    mixins: [setStyle, shouldComponentUpdate],
    propTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置
        onSelect: React.PropTypes.func //单击事件，专门用于表单

    },
    getDefaultProp: function getDefaultProp() {
        return { type: "text",
            name: "",
            label: null,
            width: null,
            height: null,
            value: 0,
            text: "false",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default"

        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            value: this.props.value === "" ? 0 : this.props.value, //用于回传给表单组件
            text: this.props.value === "" ? "false" : "true",
            readonly: this.props.readonly
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            hide: nextProps.hide,
            value: nextProps.value != 0 && nextProps.value != 1 ? 0 : nextProps.value,
            text: nextProps.value != 0 && nextProps.value != 1 ? "false" : nextProps.text,
            readonly: nextProps.readonly
        });
    },
    validate: function validate() {
        return true;
    },
    handleClick: function handleClick() {
        if (this.state.readonly) {
            return;
        }
        this.setState({
            value: this.state.value == 1 ? 0 : 1,
            text: this.state.value == 1 ? "false" : "true"
        });

        if (this.props.onSelect != null) {
            //返回给comboBox组件
            this.props.onSelect(this.state.value == 1 ? 0 : 1, this.state.value == 1 ? "false" : "true", this.props.name);
        }
    },
    render: function render() {
        var inputType = "text";
        if (this.props.type == "password") {
            inputType = "password";
        }
        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size + " " + (this.props.className ? this.props.className : ""); //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var className = "syncbtn ";
        if (this.state.value == 1) {
            className += "checktrue";
        } else {
            className += "checkfalse";
        }

        if (this.state.readonly) {
            className += " disabled";
        }

        return React.createElement(
            'div',
            { className: componentClassName + this.state.validateClass, style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: 'label', hide: this.state.hide, required: this.state.required }),
            React.createElement(
                'div',
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    'div',
                    { className: className, onClick: this.handleClick },
                    React.createElement('div', { className: "slideblock " })
                ),
                React.createElement(
                    'small',
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    React.createElement(
                        'div',
                        { className: 'text' },
                        this.state.helpTip
                    )
                )
            )
        );
    }
});
module.exports = SwitchButton;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 create by wangzy
 date:2016-07-04
 desc:列表下拉选择
 */
var React = __webpack_require__(1);

var SearchBox = __webpack_require__(79);
var Tree = __webpack_require__(116);
var unit = __webpack_require__(5);
var validation = __webpack_require__(16);
var setStyle = __webpack_require__(11);
var validate = __webpack_require__(23);
var showUpdate = __webpack_require__(22);
var shouldComponentUpdate = __webpack_require__(8);
var Label = __webpack_require__(18);
var ClickAway = __webpack_require__(24);
var TreePicker = React.createClass({
    displayName: "TreePicker",

    mixins: [setStyle, validate, showUpdate, shouldComponentUpdate, ClickAway],
    propTypes: {
        name: React.PropTypes.string.isRequired, //字段名
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]), //字段文字说明属性
        title: React.PropTypes.string, //提示信息
        width: React.PropTypes.number, //宽度
        height: React.PropTypes.number, //高度
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认值,
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //默认文本值
        placeholder: React.PropTypes.string, //输入框预留文字
        readonly: React.PropTypes.bool, //是否只读
        required: React.PropTypes.bool, //是否必填
        onlyline: React.PropTypes.bool, //是否只占一行
        hide: React.PropTypes.bool, //是否隐藏
        regexp: React.PropTypes.string, //正则表达式
        invalidTip: React.PropTypes.string, //无效时的提示字符
        style: React.PropTypes.object, //自定义style
        className: React.PropTypes.string, //自定义class
        size: React.PropTypes.oneOf(["none", "default", "large", //兼容性值,与two相同
        "two", "three", "onlyline"]), //组件表单的大小
        position: React.PropTypes.oneOf(["left", "default", "right"]), //组件在表单一行中的位置

        //其他属性
        valueField: React.PropTypes.string, //数据字段值名称
        textField: React.PropTypes.string, //数据字段文本名称
        url: React.PropTypes.string, //ajax的后台地址
        params: React.PropTypes.object, //查询参数
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        data: React.PropTypes.array, //自定义数据源
        onSelect: React.PropTypes.func //选中后的事件，回传，value,与text,data


    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            label: null,
            title: null,
            width: null,
            height: null,
            value: "",
            text: "",
            placeholder: "",
            readonly: false,
            required: false,
            onlyline: false,
            hide: false,
            regexp: null,
            invalidTip: null,
            style: null,
            className: null,
            size: "default",
            position: "default",

            //其他属性
            valueField: "value",
            textField: "text",
            url: null,
            params: null,
            dataSource: "data",
            data: null,
            onSelect: null

        };
    },
    getInitialState: function getInitialState() {
        return {
            hide: this.props.hide,
            params: this.props.params, //默认筛选条件
            url: null, //默认为空,表示不查询,后期再更新,
            show: false, //
            value: this.props.value,
            text: this.props.text,
            readonly: this.props.readonly,
            data: this.props.data,
            //验证
            required: this.props.required,
            validateClass: "", //验证的样式
            helpShow: "none", //提示信息是否显示
            helpTip: validation["required"], //提示信息
            invalidTip: ""
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
         this.isChange :代表自身发生了改变,防止父组件没有绑定value,text,而导致无法选择
         */
        this.isChange = false; //重置
        var value = this.isChange ? this.state.value : nextProps.value;
        var text = this.isChange ? this.state.text : nextProps.text;
        this.setState({
            hide: nextProps.hide,
            value: value,
            text: text,
            url: nextProps.url,
            data: nextProps.data,
            params: unit.clone(nextProps.params),
            readonly: nextProps.readonly,
            required: nextProps.required,
            validateClass: "", //重置验证样式
            helpTip: validation["required"] //提示信息
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.isChange == true) {
            //说明已经改变了,回传给父组件
            if (this.props.onSelect != null) {
                this.props.onSelect(this.state.value, this.state.text, this.props.name, this.property);
            }
        }
    },
    componentDidMount: function componentDidMount() {

        this.registerClickAway(this.hidePicker, this.refs.picker); //注册全局单击事件
    },
    changeHandler: function changeHandler(event) {},
    onBlur: function onBlur() {
        this.refs.label.hideHelp(); //隐藏帮助信息
    },
    showPicker: function showPicker(type) {
        //显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        } else {
            this.setState({
                show: type == 1 ? !this.state.show : true
            });
        }
        this.bindClickAway(); //绑定全局单击事件
    },
    hidePicker: function hidePicker() {
        this.setState({
            show: false
        });
        this.unbindClickAway(); //卸载全局单击事件
    },
    onSelect: function onSelect(value, text, name, property) {
        this.isChange = true; //代表自身发生了改变,防止父组件没有绑定value,text的状态值,而导致无法选择的结果
        this.property = property; //临时保存起来
        if (value == undefined) {
            console.error("绑定的valueField没有");
        }
        if (text == undefined) {
            console.error("绑定的textField没有");
        }
        this.validate(value);
        this.setState({
            value: value,
            text: text,
            show: !this.state.show
        });
    },
    clearHandler: function clearHandler() {
        //清除数据
        if (this.props.onSelect != null) {
            this.props.onSelect("", "", this.props.name, null);
        } else {
            this.setState({
                value: null,
                text: null
            });
        }
    },
    render: function render() {

        var size = this.props.onlyline == true ? "onlyline" : this.props.size; //组件大小
        var componentClassName = "wasabi-form-group " + size; //组件的基本样式
        var style = this.setStyle("input"); //设置样式
        var controlStyle = this.props.controlStyle ? this.props.controlStyle : {};
        controlStyle.display = this.state.hide == true ? "none" : "block";
        var inputProps = {
            readOnly: this.state.readonly == true ? "readonly" : null,
            style: style,
            name: this.props.name,
            placeholder: this.props.placeholder === "" || this.props.placeholder == null ? this.state.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  " + (this.props.className != null ? this.props.className : ""),
            title: this.props.title //文本框的属性


        };return React.createElement(
            "div",
            { className: componentClassName + this.state.validateClass, ref: "picker", style: controlStyle },
            React.createElement(Label, { name: this.props.label, ref: "label", hide: this.state.hide, required: this.state.required }),
            React.createElement(
                "div",
                { className: "wasabi-form-group-body", style: { width: !this.props.label ? "100%" : null } },
                React.createElement(
                    "div",
                    { className: "combobox", style: { display: this.props.hide == true ? "none" : "block" } },
                    React.createElement("i", { className: "picker-clear ", onClick: this.clearHandler, style: { display: this.state.readonly ? "none" : this.state.value == "" || !this.state.value ? "none" : "inline" } }),
                    React.createElement("i", { className: "pickericon  " + (this.state.show ? "rotate" : ""), onClick: this.showPicker.bind(this, 1) }),
                    React.createElement("input", _extends({ type: "text" }, inputProps, { value: this.state.text, onBlur: this.onBlur, onClick: this.showPicker.bind(this, 2), onChange: this.changeHandler })),
                    React.createElement(
                        "div",
                        { className: "dropcontainter treepicker  " + this.props.position, style: { height: this.props.height, display: this.state.show == true ? "block" : "none" } },
                        React.createElement(Tree, {
                            name: this.props.name, value: this.state.value, text: this.state.text,
                            valueField: this.props.valueField, textField: this.props.textField, dataSource: this.props.dataSource,
                            url: this.props.url, params: this.props.params, data: this.state.data, onSelect: this.onSelect
                        })
                    )
                ),
                React.createElement(
                    "small",
                    { className: "wasabi-help-block " + this.props.position, style: { display: this.state.helpTip && this.state.helpTip != "" ? this.state.helpShow : "none" } },
                    this.state.helpTip
                )
            )
        );
    }
});
module.exports = TreePicker;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//create by wangzy
//date:2016-03-22
//desc:模态窗口
__webpack_require__(312);
__webpack_require__(143);
var React = __webpack_require__(1);
var Button = __webpack_require__(10);
var Resize = __webpack_require__(135);

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.state = {
            visible: false,
            width: _this.props.width,
            height: _this.props.height,
            left: (document.body.clientWidth - _this.props.width) / 2,
            top: 50,
            oldLeft: (document.body.clientWidth - _this.props.width) / 2,
            oldTop: 50,
            moveX: null,
            moveY: null
        };
        _this.close = _this.close.bind(_this);
        _this.open = _this.open.bind(_this);
        _this.mouseMoveHandler = _this.mouseMoveHandler.bind(_this);
        _this.mouseDownHandler = _this.mouseDownHandler.bind(_this);
        _this.mouseOutHandler = _this.mouseOutHandler.bind(_this);
        _this.mouseUpHandler = _this.mouseUpHandler.bind(_this);
        _this.OKHandler = _this.OKHandler.bind(_this);
        _this.cancelHandler = _this.cancelHandler.bind(_this);
        return _this;
    }

    _createClass(Modal, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                width: nextProps.width,
                height: nextProps.height
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "close",
        value: function close() {
            //关闭事件
            this.setState({ visible: false });
            if (this.props.closedHandler != null) {
                this.props.closedHandler();
            }
        }
    }, {
        key: "open",
        value: function open() {
            //打开事件
            this.setState({ visible: true });
        }
    }, {
        key: "mouseMoveHandler",
        value: function mouseMoveHandler(event) {
            if (this.state.moveX != null && event.target.className == "wasabi-modal-header") {
                this.setState({
                    left: this.state.oldLeft + event.clientX - this.state.moveX,
                    top: this.state.oldTop + event.clientY - this.state.moveY
                });
            }
        }
    }, {
        key: "mouseDownHandler",
        value: function mouseDownHandler(event) {
            this.setState({
                moveX: event.clientX,
                moveY: event.clientY
            });
        }
    }, {
        key: "mouseOutHandler",
        value: function mouseOutHandler(event) {
            this.setState({
                moveX: null,
                moveY: null,
                oldLeft: this.state.left,
                oldTop: this.state.top
            });
        }
    }, {
        key: "mouseUpHandler",
        value: function mouseUpHandler(event) {
            this.setState({
                moveX: null,
                moveY: null,
                oldLeft: this.state.left,
                oldTop: this.state.top
            });
        }
    }, {
        key: "OKHandler",
        value: function OKHandler() {
            if (this.props.OKHandler != null) {
                this.props.OKHandler();
            }
            this.close(); //关闭
        }
    }, {
        key: "cancelHandler",
        value: function cancelHandler() {
            if (this.props.cancelHandler != null) {
                this.props.cancelHandler();
            }
            this.close(); //关闭
        }
    }, {
        key: "render",
        value: function render() {

            var activename = "wasabi-modal-container ";
            if (this.state.visible == true) {
                activename = "wasabi-modal-container active";
            }
            var width = this.state.width;
            var height = this.state.height;
            var left = this.state.left;
            var top = this.state.top;
            var control = void 0;
            var footer = null;
            var buttons = [];
            if (this.props.showOK == true || this.props.showCancel == true) {
                if (this.props.showOK) {
                    buttons.push(React.createElement(Button, { title: "\u786E\u5B9A", key: "ok", theme: "green", onClick: this.OKHandler,
                        style: { width: 60, height: 30 } }));
                }
                if (this.props.showCancel) {
                    buttons.push(React.createElement(Button, { title: "\u53D6\u6D88", key: "cancel", theme: "cancel", onClick: this.cancelHandler,
                        style: { width: 60, height: 30, backgroundColor: "gray" } }));
                }
                footer = React.createElement(
                    "div",
                    { className: "wasabi-modal-footer" },
                    buttons
                );
            }
            return React.createElement(
                "div",
                { className: activename },
                React.createElement("div", { className: " wasabi-overlay " + (this.props.modal == true ? "active" : "") }),
                React.createElement(
                    Resize,
                    { width: width, height: height, left: left, top: top,
                        className: "wasabi-modal fadein", resize: this.props.resize },
                    React.createElement("a", { className: "wasabi-modal-close", onClick: this.close }),
                    React.createElement(
                        "div",
                        { className: "wasabi-modal-header", ref: "header", onMouseMove: this.mouseMoveHandler,
                            onMouseDown: this.mouseDownHandler,
                            onMouseUp: this.mouseUpHandler,
                            onMouseOut: this.mouseOutHandler
                        },
                        React.createElement(
                            "div",
                            { style: { display: "inline" } },
                            this.props.title
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "wasabi-modal-content", style: { height: this.state.height - 40 } },
                        this.props.children
                    ),
                    footer
                )
            );
        }
    }]);

    return Modal;
}(React.Component);

Modal.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    resize: React.PropTypes.bool,
    closedHandler: React.PropTypes.func,
    showOK: React.PropTypes.bool,
    showCancel: React.PropTypes.bool,
    OKHandler: React.PropTypes.func,
    cancelHandler: React.PropTypes.func
};

Modal.defaultProps = _extends({}, Modal.defaultProps, {
    width: 730, //宽度
    height: 650, //高度
    resize: false, //是否可以改变大小
    modal: true, //默认没有遮罩层
    showOK: false, //是否显示确定按钮
    showCancel: false, //是否显示取消按钮
    OKHandler: null //确定按钮的事件,
});

module.exports = Modal;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-03-22
//desc:模态窗口
var React = __webpack_require__(1);
__webpack_require__(315);
var Resize = React.createClass({
    displayName: "Resize",

    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        left: React.PropTypes.number,
        top: React.PropTypes.number,
        onlyWidth: React.PropTypes.bool, //是否只允许改变宽度
        className: React.PropTypes.string,
        resize: React.PropTypes.bool //属性内部使用
    },
    getDefaultProps: function getDefaultProps() {
        return {
            width: 700,
            height: 500,
            left: 0,
            top: 0,
            onlyWidth: false,
            className: "",
            resize: true //默认是可以改变大小的
        };
    },
    getInitialState: function getInitialState() {
        return {
            oldClientX: null,
            oldCllientY: null,
            width: this.props.width,
            oldwidth: this.props.width,
            height: this.props.height,
            oldheight: this.props.height,
            min: 8
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
    componentDidMount: function componentDidMount() {
        //设置鼠标事件
        if (this.props.resize) {
            //允许改变大小

            document.onmousemove = this.mouseMoveHandler;
            document.onmouseup = this.mouseUpHandler;
            document.onmousedown = this.mouseDownHandler;
        }
    },
    mouseDownHandler: function mouseDownHandler(event) {
        //鼠标按下事件,保存鼠标位置
        var dir = this.getDirection(event);
        if (dir != "") {
            this.setState({
                oldClientX: event.clientX,
                oldClientY: event.clientY
            });
        } else {
            this.setState({
                oldClientX: null,
                oldClientY: null
            });
        }
        //取消默认事件
        //window.event.returnValue = false;
        //window.event.cancelBubble = true;
    },
    mouseUpHandler: function mouseUpHandler() {
        //鼠标松开事件
        this.setState({
            oldClientX: null,
            oldwidth: this.state.width,
            oldheight: this.state.height,
            oldClientY: null

        });
    },
    mouseMoveHandler: function mouseMoveHandler(event) {
        //鼠标移动事件
        var dir = this.getDirection(event);
        if (this.state.oldClientX != null && dir != "") {
            //判断是否可以拖动

            try {
                var newwidth = this.state.width;
                var newheight = this.state.height;
                if (dir.indexOf("e") > -1) {
                    //向东
                    newwidth = Math.max(this.state.min, this.state.oldwidth + event.clientX - this.state.oldClientX);
                }
                if (dir.indexOf("s") > -1) {
                    //向南
                    if (this.props.onlyWidth == false) {
                        //允许改变高度
                        newheight = Math.max(this.state.min, this.state.oldheight + event.clientY - this.state.oldClientY);
                    }
                }

                this.setState({
                    width: newwidth,
                    height: newheight
                });
            } catch (e) {}
        } else {}
        //取消默认事件
        //window.event.returnValue = false;
        //window.event.cancelBubble = true;
    },
    getDirection: function getDirection(event) {
        //此处计算方向与光标图形分开，
        //当缩小时，要将方向向里多计算一点，否则缩小不流畅
        var xPos, yPos, offset, dir;
        dir = "";
        xPos = event.offsetX;
        yPos = event.offsetY;
        offset = this.state.min;
        if (this.props.onlyWidth == false) {
            //允许改变高度
            if (yPos > this.refs.resizediv.offsetHeight - 4 * offset) dir += "s";
        }
        if (xPos > this.refs.resizediv.offsetWidth - 4 * offset) dir += "e";
        var cursor = "";
        if (this.props.onlyWidth == false) {
            //允许改变高度
            if (yPos > this.refs.resizediv.offsetHeight - offset) {
                cursor += "s";
            }
        }
        if (xPos > this.refs.resizediv.offsetWidth - offset) {
            cursor += "e";
        }
        if (cursor == "") {
            cursor = "default";
        } else {
            cursor = cursor + "-resize";
        }
        this.refs.resizediv.style.cursor = cursor; //设置鼠标样式
        return dir;
    },
    render: function render() {

        return React.createElement(
            "div",
            { className: "resize  " + this.props.className, ref: "resizediv",
                style: { height: this.props.onlyWidth == true ? "auto" : this.state.height, left: this.props.left, top: this.props.top, width: this.state.width, zIndex: 8888,
                    borderBottom: this.props.onlyWidth == true ? "none" : null
                }
            },
            this.props.children
        );
    }
});
module.exports = Resize;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
滑动面板
create by wangzy
date:2016-04-05
desc:滑动面板
*/
var React = __webpack_require__(1);
__webpack_require__(314);
var Toolbar = __webpack_require__(53);
var Button = __webpack_require__(10);

var SlidePanel = function (_React$Component) {
    _inherits(SlidePanel, _React$Component);

    function SlidePanel(props) {
        _classCallCheck(this, SlidePanel);

        var _this = _possibleConstructorReturn(this, (SlidePanel.__proto__ || Object.getPrototypeOf(SlidePanel)).call(this, props));

        _this.state = {
            title: _this.props.title,
            buttons: _this.props.buttons,
            buttonClick: _this.props.buttonClick,
            panelwidth: 0, //总宽度
            containerwidth: 0, //容器宽度
            leftwidth: 0, //左侧滑块宽度
            rightwidth: 0, //右侧内容宽度
            overlayOpacity: 0 //遮盖层透明度
        };
        _this.slideHandler = _this.slideHandler.bind(_this);
        _this.buttonClick = _this.buttonClick.bind(_this);

        return _this;
    }

    _createClass(SlidePanel, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState(_extends({}, nextProps));
        }
    }, {
        key: "open",
        value: function open() {
            //打开事件，用于外部调用
            this.slideHandler();
        }
    }, {
        key: "close",
        value: function close() {
            //关闭事件,用于外部调用
            this.slideHandler();
        }
    }, {
        key: "slideHandler",
        value: function slideHandler() {
            var _this2 = this;

            if (this.state.panelwidth != 0) {
                //关闭时，外面宽度等过渡效果完成后再设置
                this.setState({
                    containerwidth: this.state.containerwidth == 0 ? this.props.width - 34 : 0,
                    overlayOpacity: this.state.overlayOpacity == 0 ? 0.5 : 0
                });
                setTimeout(function () {
                    _this2.setState({
                        panelwidth: 0
                    });
                }, 700); //过渡效果结束后立即关闭
            } else {
                //打开时，立即将外面宽度设置
                this.setState({
                    containerwidth: this.state.containerwidth == 0 ? this.props.width - 34 : 0,
                    overlayOpacity: this.state.overlayOpacity == 0 ? 0.5 : 0,
                    panelwidth: this.props.width
                });
            }
        }
    }, {
        key: "buttonClick",
        value: function buttonClick(name, title) {
            if (this.state.buttonClick != null) {
                this.state.buttonClick(name, title);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "wasabi-slidepanel ", style: { width: this.state.panelwidth } },
                React.createElement("div", { className: "slide-overlay", style: { width: this.state.panelwidth, opacity: this.state.overlayOpacity } }),
                React.createElement(
                    "div",
                    { className: "slide-container", style: { width: this.state.containerwidth } },
                    React.createElement(
                        "div",
                        { className: "slide-header" },
                        React.createElement(
                            "div",
                            { className: "title" },
                            this.state.title
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "slide-body" },
                        this.props.children
                    ),
                    React.createElement(
                        "div",
                        { className: "slide-footer" },
                        React.createElement(
                            "div",
                            { className: "slide-toolbar" },
                            React.createElement(Toolbar, { buttons: this.state.buttons, buttonClick: this.buttonClick })
                        ),
                        React.createElement(
                            "div",
                            { className: "slide-close" },
                            React.createElement(Button, { name: "close", title: "\u5173\u95ED", onClick: this.slideHandler })
                        )
                    )
                )
            );
        }
    }]);

    return SlidePanel;
}(React.Component);

SlidePanel.propTypes = {
    title: React.PropTypes.string, //标题
    width: React.PropTypes.number, //自定义宽度
    buttons: React.PropTypes.array, //自定义按钮
    buttonClick: React.PropTypes.func //按钮的单击事件,
};
SlidePanel.defaultProps = {
    title: "",
    width: document.body.clientWidth,
    buttons: [],
    buttonClick: null,
    url: null
};
;
module.exports = SlidePanel;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 2016/10/25.
 * 将原有的单击与双击事件
 * 将新增,修改,粘贴,鼠标右键,滚动,固定表头,固定列,等功能
 * 作为DataGrid扩展功能
 */
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var Message = __webpack_require__(14);
var DataGridExtend = {
    //表体常用操作
    onClick: function onClick(rowIndex, rowData) {

        if (this.props.selectChecked == true) {
            var key = this.getKey(rowIndex); //获取关键字
            if (this.state.checkedData.has(key)) {
                this.onChecked(rowIndex, "");
            } else {
                this.onChecked(rowIndex, key);
            }
        }
        if (this.props.onClick != null) {
            this.props.onClick(rowIndex, rowData); //注意参数换了位置,因为早期版本就是这样子
        }
    },
    onDoubleClick: function onDoubleClick(rowIndex, rowData) {
        if (this.props.onDoubleClick != null) {
            //如果自定义了,
            this.props.onDoubleClick(rowIndex, rowData);
        } else if (this.state.editAble) {
            //没有自定义,允许编辑表格
            if (this.state.editIndex != null && this.state.editIndex != rowIndex) {
                //说明上一行编辑完成
                this.remoteUpdateRow(rowIndex);
            } else {
                //没有上一行
                this.setState({
                    editIndex: rowIndex
                });
            }
        }
    },
    remoteUpdateRow: function remoteUpdateRow(newEditIndex) {
        //远程提交某一行数据
        if (this.state.updateUrl) {
            //定义url,保存上一行
            var fetchmodel = new FetchModel(this.state.updateUrl, this.remoteUpdateRowuccess.bind(this, newEditIndex), { model: this.state.data[this.state.editIndex] }, this.ajaxError);
            console.log("datagrid-updateRow:", fetchmodel);
            unit.fetch.post(fetchmodel);
        } else {
            //没有定义url
            if (this.state.addData.has(this.getKey(this.state.editIndex))) {
                //说明是属于新增的
                this.state.addData.set(this.getKey(this.state.editIndex), this.state.data[this.state.editIndex]);
            } else {
                //属于修改的
                this.state.updatedData.set(this.getKey(this.state.editIndex), this.state.data[this.state.editIndex]);
            }
            this.setState({
                editIndex: newEditIndex,
                data: this.state.data,
                addData: this.state.addData,
                updatedData: this.state.updatedData
            });
        }
    },
    remoteUpdateRowuccess: function remoteUpdateRowuccess(newEditIndex, result) {
        //远程提交某一行数据
        if (this.state.addData.has(this.getKey(this.state.editIndex))) {
            //说明是属于新增的
            this.state.addData.delete(this.getKey(this.state.editIndex));
        } else {
            //属于修改的
            this.state.updatedData.delete(this.getKey(this.state.editIndex));
        }
        if (result.success) {
            this.setState({
                editIndex: newEditIndex
            });
        }
    },
    pageUpdateHandler: function pageUpdateHandler(pageSize, pageIndex) {
        //改变分页大小，或者跳转
        this.updateHandler(this.state.url, pageSize * 1, pageIndex * 1, this.state.sortName, this.state.sortOrder, null, null);
    },

    //粘贴事件
    pasteSuccess: function pasteSuccess(data) {
        if (this.props.pasteUrl != null && this.props.pasteUrl != "") {
            //用户定义了粘贴url
            var actualParams = null; //实际参数
            if (this.props.pasteParamsHandler != null) {
                //如果粘贴参数处理函数不为空
                actualParams = this.props.pasteParamsHandler(data);
            }
            //保留以前的状态值,保存以前的查询条件
            var fetchmodel = new FetchModel(this.props.pasteUrl, this.loadSuccess.bind(this, this.state.url, this.props.pageSize, 1, this.props.sortName, this.props.sortOrder, this.state.params), actualParams, this.loadError);
            fetchmodel.lang = this.props.lang;
            console.log("datagrid-paste-fetch", fetchmodel);
            unit.fetch.post(fetchmodel);
        }
    },

    //详情页面
    detailViewHandler: function detailViewHandler(detail) {
        var colSpan = this.state.headers.length;

        var key = this.getKey(this.focusIndex);
        if (this.props.selectAble == true) {
            colSpan++;
        }
        this.setState({
            detailIndex: key,
            detailView: React.createElement(
                "tr",
                { key: key + "detail" },
                React.createElement(
                    "td",
                    { colSpan: colSpan },
                    React.createElement(
                        "div",
                        { className: "wasabi-detail" },
                        detail
                    )
                )
            )
        });
    },

    //调整高宽
    setWidthAndHeight: function setWidthAndHeight() {
        //重新计算列表的高度,及固定的表头每一列的宽度
        var parent = this.refs.grid.parentElement;
        while (parent && parent.className != "wasabi-detail" && parent.nodeName.toLowerCase() != "body") {
            parent = parent.parentElement;
        }
        if (parent.className == "wasabi-detail") {//如果列表是在详情列表中不处理
        } else {
            //主列表
            if (this.refs.realTable.getBoundingClientRect().width == 0) {//TODO 暂时不清楚为什么会0的情况

            } else {
                /*
                 数据生成后,先调整两个表格的宽度，因为有可能出现滚动条
                 再得到表头的各列的宽度,修改固定表头列宽度,使得固定表头与表格对齐
                 */
                this.resizeTableWidthHandler(); //调速表格的宽度
            }

            /*
             如果没有设定列表的高度,则要自适应页面的高度,增强布局效果
             */
            if (!this.state.height && (this.state.url || this.state.data.constructor == Array && this.state.data.length > 0)) {
                //如果没有设定高度
                var blankHeight = this.clientHeight - this.refs.grid.getBoundingClientRect().top - 5; //当前页面的空白高度
                this.setState({
                    height: blankHeight
                });
            }
        }
    },

    //表体的监听处理事件
    onPaste: function onPaste(event) {
        //调用公共用的粘贴处理函数
        this.pasteHandler(event, this.pasteSuccess);
    },

    gridMouseDownHandler: function gridMouseDownHandler(event) {
        //鼠标按下事件

        if (event.button != 2) {
            //不是鼠标右键
            if (event.target.className == "header-menu-item") {//点击中的就是菜单项不处理

            } else {
                this.hideMenuHandler(); //隐藏菜单
            }
        } else {
            //又是鼠标右键
            if (event.target.className == "header-menu-item") {//点击中的就是菜单项不处理

            } else {
                //隐藏
                this.hideMenuHandler(); //隐藏菜单
            }
        }
    },
    hideMenuHandler: function hideMenuHandler(event) {
        //外层组件的单击事件，隐藏菜单，远程更新某一行
        this.refs.headermenu.style.display = "none"; //表头菜单隐藏
        this.menuHeaderName = null; //清空
        this.unbindClickAway(); //卸载全局单击事件
    },

    gridContextMenuHandler: function gridContextMenuHandler(event) {
        // event.preventDefault();//阻止默认事件
    },

    //固定表头容器的处理事件
    fixedTableMouseMoveHandler: function fixedTableMouseMoveHandler(event) {
        //表头行.拖动事件
        if (this.refs.tabledivide.style.display == "block") {
            //说明已经处理拖动状态
            this.refs.tabledivide.style.left = event.clientX + "px";
            event.target.style.cursor = "ew-resize"; //设置鼠标样式,这样拖动不会有停滞的效果
        } else {}
    },
    fixedTableMouseUpHandler: function fixedTableMouseUpHandler(event) {
        //保证鼠标松开后会隐藏
        this.refs.tabledivide.style.left = "0px";
        this.refs.tabledivide.style.display = "none";
    },

    //表头的处理事件
    headerMouseMoveHandler: function headerMouseMoveHandler(event) {
        //表头列,鼠标经过事件,用以判断
        var position = event.target.getBoundingClientRect();
        var last = this.refs.fixedTable.getBoundingClientRect().right - position.right;
        if (last > 0 && last <= 3) {
            //说明是最后一列,不处理
            return;
        }
        var diff = position.left + position.width - event.clientX;

        if (diff >= 0 && diff <= 3) {
            event.target.style.cursor = "ew-resize";
        } else {
            event.target.style.cursor = "default";
        }
    },
    headerMouseDownHandler: function headerMouseDownHandler(event) {
        //表头列,鼠标按下事件

        if (event.button == 0 && event.target.style.cursor == "ew-resize") {
            //鼠标左键,如果有箭头,说明可以调整宽度

            this.refs.headermenu.style.display = "none"; //隐藏菜单

            // 先保存好,要调整宽度的是哪一列及原始宽度,并且保存当前鼠标left位置
            this.moveHeaderName = event.target.getAttribute("name");
            this.divideinitLeft = event.clientX; //初始化位置
            this.moveHeaderWidth = event.target.getBoundingClientRect().width;
            //显示分割线
            this.refs.tabledivide.style.left = event.clientX + "px";
            //计算分割线的高度
            if (this.props.pagePosition == "top" || this.props.pagePosition == "both") {
                //如果列表上面显示分页控件

                this.refs.tabledivide.style.height = this.refs.grid.clientHeight - 70 + "px";
            } else {

                this.refs.tabledivide.style.height = this.refs.grid.clientHeight - 35 + "px";
            }
            //显示分割线
            this.refs.tabledivide.style.display = "block";
            this.refs.grid.style.webkitUserSelect = "none"; //不可以选择
        } else {
            //不可以调整宽度

            this.refs.headermenu.style.display = "none"; //隐藏菜单
            // 设置为空
            this.moveHeaderName = null;
            this.moveHeaderWidth = null;
            this.divideinitLeft = null; //
            this.refs.grid.style.webkitUserSelect = "text"; //可以选择
        }
    },
    headerContextMenuHandler: function headerContextMenuHandler(event) {
        //显示菜单
        if (this.refs.headermenu.style.display == "block") {//已经出现了,不处理

        } else {
            //
            this.menuHeaderName = event.target.getAttribute("name"); //保存当前列名
            this.refs.headermenu.style.left = event.clientX - this.refs.grid.getBoundingClientRect().left + "px";
            this.refs.headermenu.style.top = event.clientY - this.refs.grid.getBoundingClientRect().top + "px";
            this.refs.headermenu.style.display = "block";
            event.preventDefault(); //阻止默认事件
        }
        this.bindClickAway(); //绑定全局单击事件
    },

    //表体横行滚动的处理事件
    tableBodyScrollHandler: function tableBodyScrollHandler(event) {
        //监听列表的横向滚动的事件,以便固定表头可以一同滚动
        this.refs.fixedTableContainer.style.left = "-" + event.target.scrollLeft + "px";
    },

    //分割线的处理事件
    divideMouseUpHandler: function divideMouseUpHandler(event) {
        //分割线,鼠标松开事件
        event.target.style.display = "none";
        this.refs.grid.style.webkitUserSelect = "text"; //可以选择
        var diffWidth = event.clientX - this.divideinitLeft;
        if (diffWidth <= this.moveHeaderWidth - 2 * this.moveHeaderWidth) {//缩小的宽度小于原来的宽度时不处理

        } else {
            this.resizeCellWidthHandler(diffWidth); //调整宽度
        }
    },

    //右键菜单处理事件
    menuHideHandler: function menuHideHandler(event) {
        //没有使用单击事件,用户有可能继续使用鼠标右键,隐藏某一列的事件
        var headers = this.state.headers; //列表数据
        var headerMenu = this.state.headerMenu;
        for (var index = 0; index < headers.length; index++) {
            //使用label,因为多个列可能绑定一个字段
            if (headers[index].label == this.menuHeaderName) {
                //需要隐藏的列
                headerMenu.push(this.menuHeaderName); //放入隐藏列中
                headers[index].hide = true;
                this.hideMenuHandler(); //隐藏菜单
            }
        }
        this.setState({
            headers: headers,
            headerMenu: headerMenu
        });
    },
    menuHeaderShowHandler: function menuHeaderShowHandler(itemIndex, label) {
        //没有使用单击事件,用户有可能继续使用鼠标右键,显示某列

        var headers = this.state.headers; //列表数据
        var headerMenu = this.state.headerMenu;

        for (var index = 0; index < headers.length; index++) {
            //使用label,因为多个列可能绑定一个字段
            if (headers[index].label == label) {
                //需要显示的列
                headerMenu.splice(itemIndex, 1); //从隐藏列中删除
                headers[index].hide = false; //显示此列
                this.hideMenuHandler(); //隐藏菜单
            }
        }
        this.setState({
            headers: headers,
            headerMenu: headerMenu
        });
    },

    //操作面板面板的处理事件
    panelShow: function panelShow() {
        //面板显示/隐藏
        this.setState({
            panelShow: !this.state.panelShow
        });
    },

    //单元格宽度调整
    resizeCellWidthHandler: function resizeCellWidthHandler(diffWidth) {
        //调整单元格的宽度

        if (diffWidth) {
            //拖动宽度
            var fixedTableHeaderth = this.refs.fixedTable.children[0].children[0].children;
            //列表的原始表头的列
            var realTableHeaderth = this.refs.realTable.children[0].children[0].children;
            var realTableBodyTr = this.refs.realTable.children[1].children;
            for (var index = 0; index < realTableHeaderth.length; index++) {
                if (realTableHeaderth[index].getAttribute("name") == this.moveHeaderName) {
                    var width = this.moveHeaderWidth + diffWidth;
                    fixedTableHeaderth[index].style.width = width + "px";
                    realTableHeaderth[index].style.width = width + "px";
                    //设置cell
                    fixedTableHeaderth[index].children[0].style.width = width - 1 + "px";
                    realTableHeaderth[index].children[0].style.width = width - 1 + "px";

                    for (var rowIndex = 0; rowIndex < realTableBodyTr.length; rowIndex++) {
                        //调整表体对应列的宽度
                        try {
                            //存在子表的问题
                            realTableBodyTr[rowIndex].children[index].children[0].style.width = width - 1 + "px";
                        } catch (e) {}
                    }
                    if (diffWidth < 0) {
                        this.refs.realTable.style.width = (this.refs.realTable.getBoundingClientRect().width + diffWidth).toString() + "px";
                        this.refs.fixedTable.style.width = (this.refs.realTable.getBoundingClientRect().width + diffWidth).toString() + "px";
                        this.setAlign(); //调整对齐问题
                    }
                    break;
                }
            }
        }
    },

    //表格宽度调整
    resizeTableWidthHandler: function resizeTableWidthHandler() {
        var width = null; //判断是否需要调整表格的宽度
        if (this.refs.realTableContainer.getBoundingClientRect().width == this.refs.realTable.getBoundingClientRect().width && this.refs.realTableContainer.getBoundingClientRect().height < this.refs.realTable.getBoundingClientRect().height) {
            //如果列表与列表容器的宽度相同但高度高度超过了,说明刚好有内侧滚动条了，调整宽度
            width = this.refs.realTable.getBoundingClientRect().width - 10;
        } else if (!this.refs.fixedTable.style.width || this.refs.fixedTable.style.width == "100%" || this.refs.realTable.getBoundingClientRect().width != this.refs.fixedTable.getBoundingClientRect().width) {
            //没有设定宽度,或者宽度不相等
            width = this.refs.realTable.getBoundingClientRect().width;
        } else if (this.refs.grid.getBoundingClientRect().width - 20 == this.refs.realTable.getBoundingClientRect().width) {
            //页面的滚动条没有了
            width = this.refs.realTable.getBoundingClientRect().width + 10;
        }

        if (width) {
            //如果需要调整宽度
            this.refs.fixedTable.style.width = width + "px";
            this.refs.realTable.style.width = width + "px";
        }

        this.setAlign(); //调整对齐问题
    },
    setAlign: function setAlign(type) {
        //处理对齐问题
        var fixedTableHeaderth = this.refs.fixedTable.children[0].children[0].children;
        //列表的原始表头的列
        var realTableHeaderth = this.refs.realTable.children[0].children[0].children;

        for (var index = 0; index < realTableHeaderth.length; index++) {
            //遍历，如果原始表头的列的宽度与固定表头对应列不一样,就设置
            //设置th的宽度
            if (realTableHeaderth[index].getBoundingClientRect().width != fixedTableHeaderth[index].getBoundingClientRect().width) {
                var thwidth = realTableHeaderth[index].getBoundingClientRect().width;

                fixedTableHeaderth[index].style.width = thwidth + "px";
                realTableHeaderth[index].style.width = thwidth + "px";
                //设置cell
                fixedTableHeaderth[index].children[0].style.width = thwidth - 1 + "px";
                realTableHeaderth[index].children[0].style.width = thwidth - 1 + "px";
            }
        }
    },

    //自定义列事件
    getHeaderDataHandler: function getHeaderDataHandler(headerUrl) {
        //获取自定义列
        if (!headerUrl) {
            headerUrl = this.state.headerUrl;
        }
        if (headerUrl) {
            var fetchmodel = new FetchModel(headerUrl, this.getHeaderDataHandlerSuccess, { url: this.state.url }, this.ajaxError);
            console.log("datagrid-header-get:", fetchmodel);
            unit.fetch.post(fetchmodel);
        }
        this.setState({
            loading: true //正在加载
        });
    },
    getHeaderDataHandlerSuccess: function getHeaderDataHandlerSuccess(result) {
        if (result.rows) {
            result.data = result.rows;
        }
        var filterResult = this.headerFilterHandler(result.data);
        //更新
        this.setState({
            headers: filterResult.headers,
            remoteHeaders: filterResult.remoteHeaders,
            loading: false //正在加载
        });
    },

    //表格内部修改的监听事件
    rowEditHandler: function rowEditHandler(columnIndex, value, text, name, data) {
        //表格内部修改的监听事件
        if (this.state.headers[columnIndex].editor && typeof this.state.headers[columnIndex].editor.edited === "function") {
            //得到新的一行数据
            this.state.data[this.state.editIndex] = this.state.headers[columnIndex].editor.edited(value, text, this.state.data[this.state.editIndex]); //先将值保存起来，不更新状态
        } else if (this.state.headers[columnIndex].editor) {
            //没有则默认以value作为值
            this.state.data[this.state.editIndex][name] = value; //先将值保存起来，不更新状态值
        }

        if (this.state.addData.has(this.state.editIndex)) {
            //说明是属于新增的
            this.state.addData.set(this.getKey(this.state.editIndex), this.state.data[this.state.editIndex]);
        } else {
            //属于修改的
            this.state.updatedData.set(this.getKey(this.state.editIndex), this.state.data[this.state.editIndex]);
        }
    },

    //错误处理事件
    ajaxError: function ajaxError(errorCode, message) {
        //错误处理事件
        Message.error(message);
    },

    //新增，修改，删除
    addRow: function addRow(rowData, editAble) {
        //添加一行,如果editable为true，说明添加以后处理编辑状态
        var newData = this.state.data;
        newData.unshift(rowData);
        this.state.addData.set(this.getKey(0), rowData); //添加到脏数据里
        this.focusIndex = 0;
        this.setState({
            detailIndex: null,
            detailView: null,
            data: newData,
            total: this.state.total + 1,
            addData: this.state.addData,
            editIndex: editAble ? 0 : null
        });
    },
    deleteRow: function deleteRow(rowIndex) {
        //删除指定行数据

        this.state.deleteData.push(this.state.data.splice(rowIndex, 1));
        var newData = this.state.data.splice(rowIndex, 1);

        this.setState({
            data: newData,
            total: this.state.total - 1,
            deleteData: this.state.deleteData
        });
    },
    editRow: function editRow(rowIndex) {
        //让某一个处理编辑状态

        this.setState({
            editIndex: rowIndex
        });
    },
    updateRow: function updateRow(rowIndex, rowData) {
        // //只读函数,更新某一行数据
        this.state.updatedData.set(this.getKey(rowIndex), rowData); //更新某一行

        if (rowIndex >= 0 && rowIndex < this.state.data.length) {
            var newData = this.state.data;
            newData[rowIndex] = rowData;
            this.setState({
                data: newData,
                updatedData: this.state.updatedData
            });
        }
    },

    //获取各类脏数据，及清空脏数据
    getAddData: function getAddData() {
        //获取新增数据
        var addData = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.state.addData.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                addData.push(value);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return addData;
    },
    getUpdateData: function getUpdateData() {
        //获取被修改过的数据
        var updatedData = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.state.updatedData.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;

                updatedData.push(value);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return updatedData;
    },
    getDeleteData: function getDeleteData() {
        //获取被删除的数据
        return this.state.deleteData;
    },
    clearDirtyData: function clearDirtyData() {
        //清除脏数据

        //清除脏数据
        this.setState({
            addData: new Map(),
            updatedData: new Map(),
            deleteData: []
        });
    }

};
module.exports = DataGridExtend;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by wangzhiyong on 2016/10/25.
 * 将DataGrid拆分,基本处理事件存在这里
 */
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var Message = __webpack_require__(14);
var DataGridHandler = {

    //列表常用处理函数
    paginationHandler: function paginationHandler(pageIndex) {
        //分页处理函数
        if (pageIndex == this.state.pageIndex) {
            //当前页,不处理
            return;
        } else {
            //跳转到指定页
            this.updateHandler(this.state.url, this.state.pageSize, pageIndex, this.state.sortName, this.state.sortOrder, null, null);
        }
    },
    prePaginationHandler: function prePaginationHandler() {
        //上一页
        if (this.state.pageIndex == 1) {} else {
            this.paginationHandler(this.state.pageIndex - 1);
        }
    },
    nextPaginationHandler: function nextPaginationHandler() {
        //下一页
        var pageAll = parseInt(this.state.total / this.state.pageSize); //共多少页
        var lastPageNum = this.state.total % this.state.pageSize;
        if (lastPageNum > 0) {
            pageAll++;
        }
        if (this.state.pageIndex == pageAll) {} else {
            this.paginationHandler(this.state.pageIndex + 1);
        }
    },
    pageSizeHandler: function pageSizeHandler(event) {

        this.updateHandler(this.state.url, event.target.value * 1, this.state.pageIndex, this.state.sortName, this.state.sortOrder, null);
    },
    sumHandler: function sumHandler(footerModel) {
        //计算某一列的总和
        var sum = null;
        if (this.state.data instanceof Array) {
            this.state.data.map(function (rowData, rowIndex) {

                var footerModelValue = rowData[footerModel.name]; //当前行当前列的值
                if (typeof footerModel.content === "function") {
                    //有函数则通过计算得到值
                    footerModelValue = footerModel.content(rowData, rowIndex); //
                }

                if (typeof (footerModelValue * 1) == "number") {
                    //如果值可以传为数值
                    if (sum == null) {
                        sum = 0; //可以计算则先设置为0
                    }
                    sum += footerModelValue * 1;
                } else {}
            });
        } else {}
        return sum;
    },
    avgHandler: function avgHandler(footerModel) {
        //计算某一列的平均值
        var sum = 0;var avg = null;
        if (this.state.data instanceof Array) {
            this.state.data.map(function (rowData, rowIndex) {
                var footerModelValue = rowData[footerModel.name]; //当前行当前列的值
                if (typeof footerModel.content === "function") {
                    //有函数则通过计算得到值
                    footerModelValue = footerModel.content(rowData, rowIndex); //
                }

                if (typeof (footerModelValue * 1) == "number") {
                    if (sum == null) {
                        sum = 0; //可以计算则先设置为0
                    }
                    sum += footerModelValue * 1;
                } else {}
            });
            avg = (sum / this.state.data.length).toFixed(2);
        } else {}
        return avg;
    },
    onSort: function onSort(sortName, sortOrder) {
        //排序事件
        this.updateHandler(this.state.url, this.state.pageSize, 1, sortName, sortOrder);
    },

    //更新函数
    updateHandler: function updateHandler(url, pageSize, pageIndex, sortName, sortOrder, params) {
        ////数据处理函数,更新


        if (this.state.addData.length > 0 || this.state.deleteData.length > 0 || this.state.updatedData.length > 0) {
            Message.confirm("有脏数据,是否继续更新列表?", this.updateHandlerConfirm.bind(this, url, pageSize, pageIndex, sortName, sortOrder, params), function () {
                return;
            });
        } else {
            this.updateHandlerConfirm(url, pageSize, pageIndex, sortName, sortOrder, params);
        }
    },
    updateHandlerConfirm: function updateHandlerConfirm(url, pageSize, pageIndex, sortName, sortOrder, params) {
        /*
        url与params而url可能是通过reload方法传进来的,并没有作为状态值绑定
        headers可能是后期才传了,见Page组件可知
        所以此处需要详细判断
        */
        if (!url) {
            //如果为空,先取状态值中...
            url = this.state.url;
        }

        if (url) {
            this.setState({
                loading: true,
                url: url, //更新,有可能从reload那里直接改变了url
                pageSize: pageSize,
                pageIndex: pageIndex
            });
            var actualParams = {};
            if (!params && this.state.params && _typeof(this.state.params) == "object") {
                //新的参数为null或者undefined，旧参数不为空
                if (this.props.pagination == true) {
                    actualParams.data = this.state.params;
                } else {
                    actualParams = this.state.params;
                }
                params = this.state.params; //保存以便下一次更新
            } else {
                //新参数不为空
                if (this.props.pagination == true) {
                    actualParams.data = params;
                } else {
                    actualParams = params;
                }
            }

            if (this.props.pagination == true) {
                actualParams.pageSize = pageSize;
                actualParams.pageIndex = pageIndex;
                actualParams.sortName = sortName;
                actualParams.sortOrder = sortOrder;
            } else {}
            /*
             在查询失败后可能要继续调用updateHandler查询前一页数据,所以传url,以便回调,
             而pageSize,pageIndex,sortName,sortOrder,params这些参数在查询成功后再更新
             所以回传
             */
            var fetchmodel = new FetchModel(url, this.loadSuccess.bind(this, url, pageSize, pageIndex, sortName, sortOrder, params), actualParams, this.loadError);
            console.log("datagrid-开始查询:", fetchmodel);
            unit.fetch.post(fetchmodel);
        } else {
            //没有传url,判断用户是否自定义了更新函数
            if (this.props.updateHandler != null) {

                this.props.updateHandler(pageSize, pageIndex, sortName, sortOrder);
            }
        }
    },

    loadSuccess: function loadSuccess(url, pageSize, pageIndex, sortName, sortOrder, params, result) {
        //数据加载成功
        var dataResult; //最终数据
        var totalResult; //最终总共记录
        var footerResult; //最终统计数据
        var dataSource = this.props.dataSource; //数据源
        if (dataSource == "data" && this.props.backSource != "data" && this.props.backSource != "data.data") {
            //dataSource属性为默认,backSource不为默认又不是旧版的data.data默认值,说明是旧版本中自定义的,
            dataSource = this.props.backSource;
        }
        if (dataSource) {
            //需要重新指定数据源
            dataResult = unit.getSource(result, dataSource);
        } else {
            dataResult = result;
        }
        if (this.props.pagination && this.props.totalSource) {
            //分页而且需要重新指定总记录数的数据源
            totalResult = unit.getSource(result, this.props.totalSource);
        } else if (this.props.pagination) {
            //分页了,没有指定,使用默认的
            if (result.total) {
                totalResult = result.total;
            } else {
                totalResult = null;
                throw "datagrid分页了,但返回的数据没有指定total";
            }
        } else {
            //不分页
            totalResult = dataResult.length;
        }

        if (this.props.footerSource) //需要重新指定页脚的数据源
            {
                footerResult = unit.getSource(result, this.props.footerSource);
            } else {
            //没有指定，
            if (result.footer) {
                footerResult = result.footer; //默认的
            } else {}
        }
        if (!footerResult) {
            footerResult = this.state.footer;
        }
        console.log("datagrid-fetch结果", {
            "原数据": result,
            "处理后的数据": dataResult
        });
        if (totalResult > 0 && dataResult && dataResult instanceof Array && dataResult.length == 0 && totalResult > 0 && pageIndex != 1) {
            //有总记录，没有当前记录数,不是第一页，继续查询转到上一页
            this.updateHandler(url, pageSize, pageIndex - 1, sortName, sortOrder, params);
        } else {
            //查询成功
            if (dataResult && dataResult instanceof Array) {
                //是数组,
                dataResult = this.props.pagination == true ? dataResult.slice(0, this.state.pageSize) : dataResult;
            }
            var checkedData = this.state.checkedData; //之前被选择的数据
            if (this.props.clearChecked == false) {
                //不清除之前的选择
                for (var dataIndex = 0; dataIndex < dataResult; dataIndex++) {
                    var currentKey = this.getKey(dataIndex, pageIndex); //得到当前的key
                    if (checkedData.has(currentKey)) {
                        //如果被选择则修改数据源
                        checkedData.set(currentKey, dataResult[dataIndex]);
                    }
                }
            }
            this.setState({
                pageSize: pageSize,
                params: unit.clone(params), //这里一定要复制,只有复制才可以比较两次参数是否发生改变没有,防止父组件状态任何改变而导致不停的查询
                pageIndex: pageIndex,
                sortName: sortName,
                sortOrder: sortOrder,
                data: dataResult,
                total: totalResult,
                footer: footerResult,
                loading: false,
                checkedData: this.props.clearChecked == true ? new Map() : checkedData,
                detailIndex: null, //重新查询要清空详情
                detailView: null

            });
        }
    },
    loadError: function loadError(errorCode, message) {
        //查询失败
        console.log("datagrid-error", errorCode, message);
        Message.error(message);
        this.setState({
            loading: false
        });
    },
    //选择处理函数
    getKey: function getKey(index, pageIndex) {
        //获取指定行的关键字，没有指定页号则为当前页
        var key = void 0;
        if (!pageIndex) {
            pageIndex = this.state.pageIndex;
        }
        if (index == null && index == undefined) {
            console.log(new Error("index 值传错"));
        } else {
            key = pageIndex.toString() + "-" + index.toString(); //默认用序号作为关键字
        }

        return key;
    },
    onChecked: function onChecked(index, value) {
        //选中事件
        var checkedData = this.state.checkedData; //已经选中的行
        if (this.props.singleSelect == true) {
            //单选则清空
            checkedData = new Map(); //单选先清空之前的选择
        }
        var key = this.getKey(index); //获取关键字
        if (value && value != "") {
            checkedData.set(key, this.state.data[index]);
        } else {
            checkedData.delete(key, this.state.data[index]);
        }

        this.setState({
            checkedData: checkedData
        });
        if (this.props.onChecked != null) {
            var data = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = checkedData.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _value = _step.value;

                    data.push(_value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.props.onChecked(data); //用于返回
        }
    },
    onMouseDown: function onMouseDown(index, event) {
        //一定要用鼠标按下事件,不保存在状态值中
        if (this.props.focusAble) {
            var node = event.target;
            while (node.nodeName.toLowerCase() != "tr" && node.nodeName.toLowerCase() != "body") {
                node = node.parentElement;
            }
            var trs = this.refs.realTable.children[1].children;
            for (var i = 0; i < trs.length; i++) {
                trs[i].className = trs[i].className.replace("selected", ""); //先去掉
            }
            if (node.className.indexOf("selected") > -1) {} else {
                node.className = node.className + " selected";
            }
        }
        this.focusIndex = index; //不更新状态值，否则导致频繁的更新
    },
    checkCurrentPageCheckedAll: function checkCurrentPageCheckedAll() {
        //判断当前页是否全部选中
        if (this.state.data instanceof Array) {} else {
            return;
        }
        var length = this.state.data.length;
        if (length == 0) {
            return false; //如果没有数据，则不判断，直接返回
        }
        var ischeckall = true;
        for (var i = 0; i < length; i++) {
            if (!this.state.checkedData.has(this.getKey(i))) {
                ischeckall = false;
                break;
            }
        }
        return ischeckall;
    },
    checkedAllHandler: function checkedAllHandler(value) {
        //全选按钮的单击事件
        if (this.state.data instanceof Array) {} else {
            return;
        }
        var length = this.state.data.length;
        var checkedData = this.state.checkedData;
        for (var i = 0; i < length; i++) {
            var key = this.getKey(i);
            if (value == "yes") {
                if (!checkedData.has(key)) {
                    checkedData.set(key, this.state.data[i]); //添加
                }
            } else {
                if (checkedData.has(key)) {
                    checkedData.delete(key, this.state.data[i]); //删除
                }
            }
        }

        this.setState({ checkedData: checkedData });
        if (this.props.onChecked != null) {
            //执行父组件的onchecked事件
            var data = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = checkedData.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _value2 = _step2.value;

                    data.push(_value2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.props.onChecked(data);
        }
    },

    //只读函数,父组件通过refs调用
    clearData: function clearData() {
        //清空数据
        this.setState({
            data: [],
            params: []
        });
    },
    reload: function reload(params, url) {
        //重新查询数据,

        //存在用户第一次没有传url,第二次才传url
        if (!url) {
            //如果为空,则使用旧的
            url = this.state.url; //得到旧的url
        }
        if (!params || params == "reload") {
            //说明是刷新(reload字符,是因为从刷新按钮过来的


            params = this.state.params;
        } else {
            //说明是重新查询
            this.isReloadType = true; //标记一下,说明用户使用的是ref方式查询数据
        }
        if (!url) {
            //没有传url

            if (this.props.updateHandler) {
                //用户自定义了更新事件
                this.props.updateHandler(this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder);
            }
        } else {
            //传了url

            if (this.showUpdate(params, this.state.para)) {
                //参数发生改变,从第一页查起
                this.updateHandler(url, this.state.pageSize, 1, this.state.sortName, this.state.sortOrder, params);
            } else {
                //从当前页查起
                this.updateHandler(url, this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder, params);
            }
        }
    },
    getFocusIndex: function getFocusIndex() {
        //只读函数,用于父组件获取数据

        return this.focusIndex;
    },
    getFocusRowData: function getFocusRowData(index) {
        //获取当前焦点行的数据
        if (index != null && index != undefined) {} else {
            index = this.focusIndex;
        }
        return this.state.data[index];
    },
    getChecked: function getChecked() {
        //获取选中的行数据
        var data = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this.state.checkedData.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var value = _step3.value;

                data.push(value);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return data;
    },
    getFooterData: function getFooterData() {
        //获取得页脚的统计值
        return this.footerActualData;
    },
    detailHandler: function detailHandler(rowIndex, rowData) {
        //执行显示详情功能
        var key = this.getKey(rowIndex); //获取关键值
        if (key == this.state.detailIndex) {
            this.setState({
                detailIndex: null,
                detailView: null
            });
        } else {
            if (this.props.detailHandler != null) {
                var detail = this.props.detailHandler(rowData);
                if (!detail) {
                    this.setState({
                        detailIndex: null, //方便下次操作
                        detailView: null
                    });
                } else {
                    var colSpan = this.state.headers.length;
                    if (this.props.selectAble == true) {
                        colSpan++;
                    }

                    this.setState({
                        detailIndex: key,
                        detailView: React.createElement(
                            "tr",
                            { key: key + "detail" },
                            React.createElement(
                                "td",
                                { colSpan: colSpan },
                                React.createElement(
                                    "div",
                                    { className: "wasabi-detail" },
                                    detail
                                )
                            )
                        )
                    });
                }
            }
        }
    }
};
module.exports = DataGridHandler;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-02-25.
 * 工具栏按钮数据模型
 */
var ButtonModel = function ButtonModel(name, title) {
    var theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";

    _classCallCheck(this, ButtonModel);

    this.name = name;
    this.title = title;
    this.disabled = false;
    this.iconCls = null;
    this.iconAlign = "left";
    this.href = "javascript:void(0);";
    this.onClick = null;
    this.backgroundColor = null;
    this.tip = null;
    this.theme = theme;
    this.size = "default";
    this.color = null;
    this.hide = false;
    this.className = null;
    this.style = null;
    this.draggable = false;
};

module.exports = ButtonModel;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-02-19.
 * 表单数据模型
 */
//
var FormModel = function FormModel(name) {
    var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "text";
    var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var value = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var hide = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var url = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var data = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
    var extraData = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
    var valueField = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "value";
    var textField = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "text";

    _classCallCheck(this, FormModel);

    this.type = type; //控件类型
    this.name = name; // 数据key名称，唯一
    this.value = value; ///默认值
    this.readonly = false; ///，是否只读，默认为 false
    this.onClick = null; //单击事件
    this.onChange = null, //值改变事件
    this.className = null; // 需要额外添加的 className
    this.label = label; //{string|element}  // 表单字段提示文字
    this.equal = ""; // 判断值是否与另一个 Input 相等，string 为另一个  name
    this.min = null; // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
    this.max = null; // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
    this.required = required; // 是否必填，默认为 false
    this.regexp = null; //正则表达式
    this.placeholder = ""; //占位提示文字
    this.onlyline = false; //表单控件是否占一行
    this.rows = 5; //textarea行数
    this.hide = hide; //是否隐藏
    this.text = ""; //下拉框默认显示的文本值
    this.valueField = valueField; //下拉框数据字段值名称
    this.textField = textField; //下拉框数据字段文本名称
    this.url = url; //ajax的后台地址
    this.backSource = null; //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
    this.data = data; //数据源
    this.onSelect = null; //下拉框的选中事件
    this.extraData = extraData; //下拉框附加的数据
    this.secondUrl = null; //下拉选择面板中的二级节点查询url
    this.thirdUrl = null; //下拉选择面板中的三级节点查询url
    this.params = {}; //下拉选择面板中的一级节点查询url所需要的参数
    this.secondParams = {}; //下拉选择面板中的二级节点查询url所需要的参数
    this.secondParamsKey = null; //下拉选择面板中的查询二级节点时一级节点传递的value对应的参数名称
    this.thirdParams = {}; //下拉选择面板中的三级节点查询url所需要的参数
    this.thirdParamsKey = null; //下拉选择面板中的查询三级节点时二级节点传递的value对应的参数名称
    this.hotTitle = null; //热门选择标题
    this.hotData = null; //热门选择数据
    this.headers = null; //gridpicker下拉表格中的表格头部
    this.size = "default"; //表单大小
    this.postion = "default"; //表单位置
};

module.exports = FormModel;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-02-24.
 * 列表表头模型
 */
var EditorModel = __webpack_require__(274);

var HeaderModel = function HeaderModel(name, label) {
    var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var hide = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var sortAble = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var width = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, HeaderModel);

    this.name = name;
    this.label = label;
    this.content = content;
    this.hide = hide;
    this.sortAble = sortAble;
    this.width = width;
    this.fixed = false;
    this.align = "left";
    this.rowspan = null; //表头占几行
    this.colspan = null; //表头占几列
    this.editor = null; //处理编辑时的,默认为文本
};

module.exports = HeaderModel;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-05-24.
 * 三级联动选择面板数据模型
 */

var PickerModel = function PickerModel(value) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var expand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var childrens = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, PickerModel);

    this.value = value; //名称
    this.text = text; //标题
    this.expand = expand; //是否为展开状态
    this.childrens = childrens; //子节点
};

module.exports = PickerModel;

/***/ }),
/* 143 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 144 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 145 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 146 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 147 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 148 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Immutable = factory();
})(undefined, function () {
  'use strict';
  var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
    return isIterable(value) ? value : Seq(value);
  }

  createClass(KeyedIterable, Iterable);
  function KeyedIterable(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }

  createClass(IndexedIterable, Iterable);
  function IndexedIterable(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }

  createClass(SetIterable, Iterable);
  function SetIterable(value) {
    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
  }

  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;

  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

  function Iterator(next) {
    this.next = next;
  }

  Iterator.prototype.toString = function () {
    return '[Iterator]';
  };

  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };

  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? iteratorResult.value = value : iteratorResult = {
      value: value, done: false
    };
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
  function Seq(value) {
    return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
  }

  Seq.of = function () /*...values*/{
    return Seq(arguments);
  };

  Seq.prototype.toSeq = function () {
    return this;
  };

  Seq.prototype.toString = function () {
    return this.__toString('Seq {', '}');
  };

  Seq.prototype.cacheResult = function () {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };

  // abstract __iterateUncached(fn, reverse)

  Seq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, true);
  };

  // abstract __iteratorUncached(type, reverse)

  Seq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, true);
  };

  createClass(KeyedSeq, Seq);
  function KeyedSeq(value) {
    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
  }

  KeyedSeq.prototype.toKeyedSeq = function () {
    return this;
  };

  createClass(IndexedSeq, Seq);
  function IndexedSeq(value) {
    return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
  }

  IndexedSeq.of = function () /*...values*/{
    return IndexedSeq(arguments);
  };

  IndexedSeq.prototype.toIndexedSeq = function () {
    return this;
  };

  IndexedSeq.prototype.toString = function () {
    return this.__toString('Seq [', ']');
  };

  IndexedSeq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, false);
  };

  IndexedSeq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, false);
  };

  createClass(SetSeq, Seq);
  function SetSeq(value) {
    return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
  }

  SetSeq.of = function () /*...values*/{
    return SetSeq(arguments);
  };

  SetSeq.prototype.toSetSeq = function () {
    return this;
  };

  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;

  createClass(ArraySeq, IndexedSeq);
  function ArraySeq(array) {
    this._array = array;
    this.size = array.length;
  }

  ArraySeq.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };

  ArraySeq.prototype.__iterate = function (fn, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ArraySeq.prototype.__iterator = function (type, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    var ii = 0;
    return new Iterator(function () {
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
    });
  };

  createClass(ObjectSeq, KeyedSeq);
  function ObjectSeq(object) {
    var keys = Object.keys(object);
    this._object = object;
    this._keys = keys;
    this.size = keys.length;
  }

  ObjectSeq.prototype.get = function (key, notSetValue) {
    if (notSetValue !== undefined && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };

  ObjectSeq.prototype.has = function (key) {
    return this._object.hasOwnProperty(key);
  };

  ObjectSeq.prototype.__iterate = function (fn, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      var key = keys[reverse ? maxIndex - ii : ii];
      if (fn(object[key], key, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ObjectSeq.prototype.__iterator = function (type, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    var ii = 0;
    return new Iterator(function () {
      var key = keys[reverse ? maxIndex - ii : ii];
      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
    });
  };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(IterableSeq, IndexedSeq);
  function IterableSeq(iterable) {
    this._iterable = iterable;
    this.size = iterable.length || iterable.size;
  }

  IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };

  IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };

  createClass(IteratorSeq, IndexedSeq);
  function IteratorSeq(iterator) {
    this._iterator = iterator;
    this._iteratorCache = [];
  }

  IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    while (iterations < cache.length) {
      if (fn(cache[iterations], iterations++, this) === false) {
        return iterations;
      }
    }
    var step;
    while (!(step = iterator.next()).done) {
      var val = step.value;
      cache[iterations] = val;
      if (fn(val, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };

  IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    return new Iterator(function () {
      if (iterations >= cache.length) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        cache[iterations] = step.value;
      }
      return iteratorValue(type, iterations, cache[iterations++]);
    });
  };

  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? new ObjectSeq(value) : undefined;
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values: ' + value);
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && new ObjectSeq(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function () {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function (v, k) {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function (v, k) {
      if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

  function Repeat(value, times) {
    if (!(this instanceof Repeat)) {
      return new Repeat(value, times);
    }
    this._value = value;
    this.size = times === undefined ? Infinity : Math.max(0, times);
    if (this.size === 0) {
      if (EMPTY_REPEAT) {
        return EMPTY_REPEAT;
      }
      EMPTY_REPEAT = this;
    }
  }

  Repeat.prototype.toString = function () {
    if (this.size === 0) {
      return 'Repeat []';
    }
    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
  };

  Repeat.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._value : notSetValue;
  };

  Repeat.prototype.includes = function (searchValue) {
    return is(this._value, searchValue);
  };

  Repeat.prototype.slice = function (begin, end) {
    var size = this.size;
    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
  };

  Repeat.prototype.reverse = function () {
    return this;
  };

  Repeat.prototype.indexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return 0;
    }
    return -1;
  };

  Repeat.prototype.lastIndexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return this.size;
    }
    return -1;
  };

  Repeat.prototype.__iterate = function (fn, reverse) {
    for (var ii = 0; ii < this.size; ii++) {
      if (fn(this._value, ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  Repeat.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    var ii = 0;
    return new Iterator(function () {
      return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
    });
  };

  Repeat.prototype.equals = function (other) {
    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
  };

  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      return new Range(start, end, step);
    }
    invariant(step !== 0, 'Cannot step a Range by 0');
    start = start || 0;
    if (end === undefined) {
      end = Infinity;
    }
    step = step === undefined ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }

  Range.prototype.toString = function () {
    if (this.size === 0) {
      return 'Range []';
    }
    return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
  };

  Range.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };

  Range.prototype.includes = function (searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };

  Range.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range(0, 0);
    }
    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
  };

  Range.prototype.indexOf = function (searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };

  Range.prototype.lastIndexOf = function (searchValue) {
    return this.indexOf(searchValue);
  };

  Range.prototype.__iterate = function (fn, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(value, ii, this) === false) {
        return ii + 1;
      }
      value += reverse ? -step : step;
    }
    return ii;
  };

  Range.prototype.__iterator = function (type, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    var ii = 0;
    return new Iterator(function () {
      var v = value;
      value += reverse ? -step : step;
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
    });
  };

  Range.prototype.equals = function (other) {
    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };

  var EMPTY_RANGE;

  createClass(Collection, Iterable);
  function Collection() {
    throw TypeError('Abstract');
  }

  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}

  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
    a = a | 0; // int
    b = b | 0; // int
    var c = a & 0xffff;
    var d = b & 0xffff;
    // Shift by 0 fixes the sign on the high part.
    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
  };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o === 'undefined' ? 'undefined' : _typeof(o);
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function () {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = function () {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }();

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          // Element
          return node.uniqueID;
        case 9:
          // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
  }

  createClass(Map, KeyedCollection);

  // @pragma Construction

  function Map(value) {
    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  Map.of = function () {
    var keyValues = SLICE$0.call(arguments, 0);
    return emptyMap().withMutations(function (map) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error('Missing value for key: ' + keyValues[i]);
        }
        map.set(keyValues[i], keyValues[i + 1]);
      }
    });
  };

  Map.prototype.toString = function () {
    return this.__toString('Map {', '}');
  };

  // @pragma Access

  Map.prototype.get = function (k, notSetValue) {
    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
  };

  // @pragma Modification

  Map.prototype.set = function (k, v) {
    return updateMap(this, k, v);
  };

  Map.prototype.setIn = function (keyPath, v) {
    return this.updateIn(keyPath, NOT_SET, function () {
      return v;
    });
  };

  Map.prototype.remove = function (k) {
    return updateMap(this, k, NOT_SET);
  };

  Map.prototype.deleteIn = function (keyPath) {
    return this.updateIn(keyPath, function () {
      return NOT_SET;
    });
  };

  Map.prototype.update = function (k, notSetValue, updater) {
    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
  };

  Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = undefined;
    }
    var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
    return updatedValue === NOT_SET ? undefined : updatedValue;
  };

  Map.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };

  // @pragma Composition

  Map.prototype.merge = function () /*...iters*/{
    return mergeIntoMapWith(this, undefined, arguments);
  };

  Map.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, merger, iters);
  };

  Map.prototype.mergeIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoMapWith(this, deepMerger, arguments);
  };

  Map.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, deepMergerWith(merger), iters);
  };

  Map.prototype.mergeDeepIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.sort = function (comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator));
  };

  Map.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator, mapper));
  };

  // @pragma Mutability

  Map.prototype.withMutations = function (fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  };

  Map.prototype.asMutable = function () {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  };

  Map.prototype.asImmutable = function () {
    return this.__ensureOwner();
  };

  Map.prototype.wasAltered = function () {
    return this.__altered;
  };

  Map.prototype.__iterator = function (type, reverse) {
    return new MapIterator(this, type, reverse);
  };

  Map.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    this._root && this._root.iterate(function (entry) {
      iterations++;
      return fn(entry[1], entry[0], this$0);
    }, reverse);
    return iterations;
  };

  Map.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };

  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;

  // #pragma Trie Nodes


  function ArrayMapNode(ownerID, entries) {
    this.ownerID = ownerID;
    this.entries = entries;
  }

  ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && entries.length === 1) {
      return; // undefined
    }

    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries, key, value);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new ArrayMapNode(ownerID, newEntries);
  };

  function BitmapIndexedNode(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  }

  BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
  };

  BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;

    if (!exists && value === NOT_SET) {
      return this;
    }

    var idx = popCount(bitmap & bit - 1);
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : undefined;
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

    if (newNode === node) {
      return this;
    }

    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }

    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
      return nodes[idx ^ 1];
    }

    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }

    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };

  function HashArrayMapNode(ownerID, count, nodes) {
    this.ownerID = ownerID;
    this.count = count;
    this.nodes = nodes;
  }

  HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
  };

  HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];

    if (removed && !node) {
      return this;
    }

    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
    if (newNode === node) {
      return this;
    }

    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }

    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };

  function HashCollisionNode(ownerID, keyHash, entries) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries;
  }

  HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }

    var removed = value === NOT_SET;

    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };

  function ValueNode(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  }

  ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };

  ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }

    SetRef(didAlter);

    if (removed) {
      SetRef(didChangeSize);
      return; // undefined
    }

    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }

    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };

  // #pragma Iterators

  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

  function MapIterator(map, type, reverse) {
    this._type = type;
    this._reverse = reverse;
    this._stack = map._root && mapIteratorFrame(map._root);
  }

  MapIterator.prototype.next = function () {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };

  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function (existing, value, key) {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function (collection) {
      var mergeIntoMap = merger ? function (value, key) {
        collection.update(key, NOT_SET, function (existing) {
          return existing === NOT_SET ? value : merger(existing, value, key);
        });
      } : function (value, key) {
        collection.set(key, value);
      };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(isNotSet || existing && existing.set, 'invalid keyPath');
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - (x >> 1 & 0x55555555);
    x = (x & 0x33333333) + (x >> 2 & 0x33333333);
    x = x + (x >> 4) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

  // @pragma Construction

  function List(value) {
    var empty = emptyList();
    if (value === null || value === undefined) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedIterable(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function (list) {
      list.setSize(size);
      iter.forEach(function (v, i) {
        return list.set(i, v);
      });
    });
  }

  List.of = function () /*...values*/{
    return this(arguments);
  };

  List.prototype.toString = function () {
    return this.__toString('List [', ']');
  };

  // @pragma Access

  List.prototype.get = function (index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };

  // @pragma Modification

  List.prototype.set = function (index, value) {
    return updateList(this, index, value);
  };

  List.prototype.remove = function (index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };

  List.prototype.insert = function (index, value) {
    return this.splice(index, 0, value);
  };

  List.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };

  List.prototype.push = function () /*...values*/{
    var values = arguments;
    var oldSize = this.size;
    return this.withMutations(function (list) {
      setListBounds(list, 0, oldSize + values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(oldSize + ii, values[ii]);
      }
    });
  };

  List.prototype.pop = function () {
    return setListBounds(this, 0, -1);
  };

  List.prototype.unshift = function () /*...values*/{
    var values = arguments;
    return this.withMutations(function (list) {
      setListBounds(list, -values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(ii, values[ii]);
      }
    });
  };

  List.prototype.shift = function () {
    return setListBounds(this, 1);
  };

  // @pragma Composition

  List.prototype.merge = function () /*...iters*/{
    return mergeIntoListWith(this, undefined, arguments);
  };

  List.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, merger, iters);
  };

  List.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoListWith(this, deepMerger, arguments);
  };

  List.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, deepMergerWith(merger), iters);
  };

  List.prototype.setSize = function (size) {
    return setListBounds(this, 0, size);
  };

  // @pragma Iteration

  List.prototype.slice = function (begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
  };

  List.prototype.__iterator = function (type, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    return new Iterator(function () {
      var value = values();
      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
    });
  };

  List.prototype.__iterate = function (fn, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    var value;
    while ((value = values()) !== DONE) {
      if (fn(value, index++, this) === false) {
        break;
      }
    }
    return index;
  };

  List.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      return this;
    }
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
  };

  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;

  function VNode(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  }

  // TODO: seems like these methods are very similar

  VNode.prototype.removeBefore = function (ownerID, level, index) {
    if (index === level ? 1 << level : 0 || this.array.length === 0) {
      return this;
    }
    var originIndex = index >>> level & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = undefined;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };

  VNode.prototype.removeAfter = function (ownerID, level, index) {
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = index - 1 >>> level & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }

    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }

    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };

  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : left - offset >> level;
      var to = (right - offset >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function (list) {
        index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = index >>> level & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << list._level + SHIFT) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[rawIndex >>> level & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << newLevel + SHIFT) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = oldTailOffset >>> level & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

      // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = newOrigin >>> newLevel & MASK;
        if (beginIndex !== newTailOffset >>> newLevel & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
  }

  createClass(OrderedMap, Map);

  // @pragma Construction

  function OrderedMap(value) {
    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  OrderedMap.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedMap.prototype.toString = function () {
    return this.__toString('OrderedMap {', '}');
  };

  // @pragma Access

  OrderedMap.prototype.get = function (k, notSetValue) {
    var index = this._map.get(k);
    return index !== undefined ? this._list.get(index)[1] : notSetValue;
  };

  // @pragma Modification

  OrderedMap.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      return this;
    }
    return emptyOrderedMap();
  };

  OrderedMap.prototype.set = function (k, v) {
    return updateOrderedMap(this, k, v);
  };

  OrderedMap.prototype.remove = function (k) {
    return updateOrderedMap(this, k, NOT_SET);
  };

  OrderedMap.prototype.wasAltered = function () {
    return this._map.wasAltered() || this._list.wasAltered();
  };

  OrderedMap.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._list.__iterate(function (entry) {
      return entry && fn(entry[1], entry[0], this$0);
    }, reverse);
  };

  OrderedMap.prototype.__iterator = function (type, reverse) {
    return this._list.fromEntrySeq().__iterator(type, reverse);
  };

  OrderedMap.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };

  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) {
      // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function (entry, idx) {
          return entry !== undefined && i !== idx;
        });
        newMap = newList.toKeyedSeq().map(function (entry) {
          return entry[0];
        }).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
  function ToKeyedSequence(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }

  ToKeyedSequence.prototype.get = function (key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };

  ToKeyedSequence.prototype.has = function (key) {
    return this._iter.has(key);
  };

  ToKeyedSequence.prototype.valueSeq = function () {
    return this._iter.valueSeq();
  };

  ToKeyedSequence.prototype.reverse = function () {
    var this$0 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function () {
        return this$0._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };

  ToKeyedSequence.prototype.map = function (mapper, context) {
    var this$0 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function () {
        return this$0._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };

  ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var ii;
    return this._iter.__iterate(this._useKeys ? function (v, k) {
      return fn(v, k, this$0);
    } : (ii = reverse ? resolveSize(this) : 0, function (v) {
      return fn(v, reverse ? --ii : ii++, this$0);
    }), reverse);
  };

  ToKeyedSequence.prototype.__iterator = function (type, reverse) {
    if (this._useKeys) {
      return this._iter.__iterator(type, reverse);
    }
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var ii = reverse ? resolveSize(this) : 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
    });
  };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(ToIndexedSequence, IndexedSeq);
  function ToIndexedSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToIndexedSequence.prototype.includes = function (value) {
    return this._iter.includes(value);
  };

  ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    return this._iter.__iterate(function (v) {
      return fn(v, iterations++, this$0);
    }, reverse);
  };

  ToIndexedSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
    });
  };

  createClass(ToSetSequence, SetSeq);
  function ToSetSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToSetSequence.prototype.has = function (key) {
    return this._iter.includes(key);
  };

  ToSetSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (v) {
      return fn(v, v, this$0);
    }, reverse);
  };

  ToSetSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };

  createClass(FromEntriesSequence, KeyedSeq);
  function FromEntriesSequence(entries) {
    this._iter = entries;
    this.size = entries.size;
  }

  FromEntriesSequence.prototype.entrySeq = function () {
    return this._iter.toSeq();
  };

  FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (entry) {
      // Check if entry exists first so array access doesn't throw for holes
      // in the parent iteration.
      if (entry) {
        validateEntry(entry);
        var indexedIterable = isIterable(entry);
        return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
      }
    }, reverse);
  };

  FromEntriesSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
        }
      }
    });
  };

  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function () {
      return iterable;
    };
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function () {
        return iterable.reverse();
      };
      return reversedSequence;
    };
    flipSequence.has = function (key) {
      return iterable.includes(key);
    };
    flipSequence.includes = function (key) {
      return iterable.has(key);
    };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(k, v, this$0) !== false;
      }, reverse);
    };
    flipSequence.__iteratorUncached = function (type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function () {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
    };
    return flipSequence;
  }

  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function (key) {
      return iterable.has(key);
    };
    mappedSequence.get = function (key, notSetValue) {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k, c) {
        return fn(mapper.call(context, v, k, c), k, this$0) !== false;
      }, reverse);
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
      });
    };
    return mappedSequence;
  }

  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function () {
      return iterable;
    };
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function () {
          return iterable.flip();
        };
        return flipSequence;
      };
    }
    reversedSequence.get = function (key, notSetValue) {
      return iterable.get(useKeys ? key : -1 - key, notSetValue);
    };
    reversedSequence.has = function (key) {
      return iterable.has(useKeys ? key : -1 - key);
    };
    reversedSequence.includes = function (value) {
      return iterable.includes(value);
    };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(v, k, this$0);
      }, !reverse);
    };
    reversedSequence.__iterator = function (type, reverse) {
      return iterable.__iterator(type, !reverse);
    };
    return reversedSequence;
  }

  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function (key) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function (key, notSetValue) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }

  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
        return a + 1;
      });
    });
    return groups.asImmutable();
  }

  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), function (a) {
        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
      });
    });
    var coerce = iterableClass(iterable);
    return groups.map(function (arr) {
      return reify(iterable, coerce(arr));
    });
  }

  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function (type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function () {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }

  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
      });
      return iterations;
    };
    takeSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function () {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }

  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function () {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }

  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function (v) {
      if (!isIterable(v)) {
        v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function (v) {
      return v.size !== 0;
    });

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function (sum, seq) {
      if (sum !== undefined) {
        var size = seq.size;
        if (size !== undefined) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }

  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function (fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        var this$0 = this;
        iter.__iterate(function (v, k) {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function () {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }

  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(function (v, k) {
      return coerce(mapper.call(context, v, k, iterable));
    }).flatten(true);
  }

  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 - 1;
    interposedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
      }, reverse);
      return iterations;
    };
    interposedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function () {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }

  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(function (v, k) {
      return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
    }).toArray();
    entries.sort(function (a, b) {
      return comparator(a[3], b[3]) || a[2] - b[2];
    }).forEach(isKeyedIterable ? function (v, i) {
      entries[i].length = 2;
    } : function (v, i) {
      entries[i] = v[1];
    });
    return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
  }

  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq().map(function (v, k) {
        return [v, mapper(v, k, iterable)];
      }).reduce(function (a, b) {
        return maxCompare(comparator, a[1], b[1]) ? b : a;
      });
      return entry && entry[0];
    } else {
      return iterable.reduce(function (a, b) {
        return maxCompare(comparator, a, b) ? b : a;
      });
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
  }

  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function (i) {
      return i.size;
    }).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function (fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function (type, reverse) {
      var iterators = iters.map(function (i) {
        return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
      });
      var iterations = 0;
      var isDone = false;
      return new Iterator(function () {
        var steps;
        if (!isDone) {
          steps = iterators.map(function (i) {
            return i.next();
          });
          isDone = steps.some(function (s) {
            return s.done;
          });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
          return s.value;
        })));
      });
    };
    return zipSequence;
  }

  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

  function Record(defaultValues, name) {
    var hasInitialized;

    var RecordType = function Record(values) {
      if (values instanceof RecordType) {
        return values;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys = Object.keys(defaultValues);
        setProps(RecordTypePrototype, keys);
        RecordTypePrototype.size = keys.length;
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys;
        RecordTypePrototype._defaultValues = defaultValues;
      }
      this._map = Map(values);
    };

    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
    RecordTypePrototype.constructor = RecordType;

    return RecordType;
  }

  Record.prototype.toString = function () {
    return this.__toString(recordName(this) + ' {', '}');
  };

  // @pragma Access

  Record.prototype.has = function (k) {
    return this._defaultValues.hasOwnProperty(k);
  };

  Record.prototype.get = function (k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var defaultVal = this._defaultValues[k];
    return this._map ? this._map.get(k, defaultVal) : defaultVal;
  };

  // @pragma Modification

  Record.prototype.clear = function () {
    if (this.__ownerID) {
      this._map && this._map.clear();
      return this;
    }
    var RecordType = this.constructor;
    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
  };

  Record.prototype.set = function (k, v) {
    if (!this.has(k)) {
      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
    }
    if (this._map && !this._map.has(k)) {
      var defaultVal = this._defaultValues[k];
      if (v === defaultVal) {
        return this;
      }
    }
    var newMap = this._map && this._map.set(k, v);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.remove = function (k) {
    if (!this.has(k)) {
      return this;
    }
    var newMap = this._map && this._map.remove(k);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Record.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterator(type, reverse);
  };

  Record.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterate(fn, reverse);
  };

  Record.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map && this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return makeRecord(this, newMap, ownerID);
  };

  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;

  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function get() {
        return this.get(name);
      },
      set: function set(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

  // @pragma Construction

  function Set(value) {
    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  Set.of = function () /*...values*/{
    return this(arguments);
  };

  Set.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  Set.prototype.toString = function () {
    return this.__toString('Set {', '}');
  };

  // @pragma Access

  Set.prototype.has = function (value) {
    return this._map.has(value);
  };

  // @pragma Modification

  Set.prototype.add = function (value) {
    return updateSet(this, this._map.set(value, true));
  };

  Set.prototype.remove = function (value) {
    return updateSet(this, this._map.remove(value));
  };

  Set.prototype.clear = function () {
    return updateSet(this, this._map.clear());
  };

  // @pragma Composition

  Set.prototype.union = function () {
    var iters = SLICE$0.call(arguments, 0);
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function (set) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetIterable(iters[ii]).forEach(function (value) {
          return set.add(value);
        });
      }
    });
  };

  Set.prototype.intersect = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (!iters.every(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.subtract = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (iters.some(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.merge = function () {
    return this.union.apply(this, arguments);
  };

  Set.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return this.union.apply(this, iters);
  };

  Set.prototype.sort = function (comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator));
  };

  Set.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator, mapper));
  };

  Set.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Set.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._map.__iterate(function (_, k) {
      return fn(k, k, this$0);
    }, reverse);
  };

  Set.prototype.__iterator = function (type, reverse) {
    return this._map.map(function (_, k) {
      return k;
    }).__iterator(type, reverse);
  };

  Set.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };

  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

  // @pragma Construction

  function OrderedSet(value) {
    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  OrderedSet.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedSet.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  OrderedSet.prototype.toString = function () {
    return this.__toString('OrderedSet {', '}');
  };

  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

  // @pragma Construction

  function Stack(value) {
    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
  }

  Stack.of = function () /*...values*/{
    return this(arguments);
  };

  Stack.prototype.toString = function () {
    return this.__toString('Stack [', ']');
  };

  // @pragma Access

  Stack.prototype.get = function (index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };

  Stack.prototype.peek = function () {
    return this._head && this._head.value;
  };

  // @pragma Modification

  Stack.prototype.push = function () /*...values*/{
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pushAll = function (iter) {
    iter = IndexedIterable(iter);
    if (iter.size === 0) {
      return this;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.reverse().forEach(function (value) {
      newSize++;
      head = {
        value: value,
        next: head
      };
    });
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pop = function () {
    return this.slice(1);
  };

  Stack.prototype.unshift = function () /*...values*/{
    return this.push.apply(this, arguments);
  };

  Stack.prototype.unshiftAll = function (iter) {
    return this.pushAll(iter);
  };

  Stack.prototype.shift = function () {
    return this.pop.apply(this, arguments);
  };

  Stack.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = undefined;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };

  Stack.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      // super.slice(begin, end);
      return IndexedCollection.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  // @pragma Mutability

  Stack.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };

  // @pragma Iteration

  Stack.prototype.__iterate = function (fn, reverse) {
    if (reverse) {
      return this.reverse().__iterate(fn);
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };

  Stack.prototype.__iterator = function (type, reverse) {
    if (reverse) {
      return this.reverse().__iterator(type);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function () {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };

  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;

  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function keyCopier(key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function toArray() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function (v, i) {
        array[i] = v;
      });
      return array;
    },

    toIndexedSeq: function toIndexedSeq() {
      return new ToIndexedSequence(this);
    },

    toJS: function toJS() {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJS === 'function' ? value.toJS() : value;
      }).__toJS();
    },

    toJSON: function toJSON() {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
      }).__toJS();
    },

    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function toMap() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function toObject() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function (v, k) {
        object[k] = v;
      });
      return object;
    },

    toOrderedMap: function toOrderedMap() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function toOrderedSet() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function toSet() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function toSetSeq() {
      return new ToSetSequence(this);
    },

    toSeq: function toSeq() {
      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
    },

    toStack: function toStack() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function toList() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },

    // ### Common JavaScript methods and properties

    toString: function toString() {
      return '[Iterable]';
    },

    __toString: function __toString(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function concat() {
      var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function includes(searchValue) {
      return this.some(function (value) {
        return is(value, searchValue);
      });
    },

    entries: function entries() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function every(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function (v, k, c) {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function find(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function forEach(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function join(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function (v) {
        isFirst ? isFirst = false : joined += separator;
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function keys() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function map(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function reduce(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function (v, k, c) {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function reduceRight(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function reverse() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function some(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function sort(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function values() {
      return this.__iterator(ITERATE_VALUES);
    },

    // ### More sequential methods

    butLast: function butLast() {
      return this.slice(0, -1);
    },

    isEmpty: function isEmpty() {
      return this.size !== undefined ? this.size === 0 : !this.some(function () {
        return true;
      });
    },

    count: function count(predicate, context) {
      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
    },

    countBy: function countBy(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function equals(other) {
      return deepEqual(this, other);
    },

    entrySeq: function entrySeq() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function () {
        return iterable.toSeq();
      };
      return entriesSequence;
    },

    filterNot: function filterNot(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function findEntry(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function findKey(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function findLast(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function findLastKey(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function first() {
      return this.find(returnTrue);
    },

    flatMap: function flatMap(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function fromEntrySeq() {
      return new FromEntriesSequence(this);
    },

    get: function get(searchKey, notSetValue) {
      return this.find(function (_, key) {
        return is(key, searchKey);
      }, undefined, notSetValue);
    },

    getIn: function getIn(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function groupBy(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function has(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function hasIn(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function isSubset(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function (value) {
        return iter.includes(value);
      });
    },

    isSuperset: function isSuperset(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function keyOf(searchValue) {
      return this.findKey(function (value) {
        return is(value, searchValue);
      });
    },

    keySeq: function keySeq() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function last() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function lastKeyOf(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function max(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function maxBy(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function min(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function minBy(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function rest() {
      return this.slice(1);
    },

    skip: function skip(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function skipLast(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function skipUntil(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function sortBy(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function take(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function takeLast(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function takeWhile(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function takeUntil(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function valueSeq() {
      return this.toIndexedSeq();
    },

    // ### Hashable Object

    hashCode: function hashCode() {
      return this.__hash || (this.__hash = hashIterable(this));
    }

    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect = IterablePrototype.toSource = function () {
    return this.toString();
  };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function flip() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function mapEntries(mapper, context) {
      var this$0 = this;
      var iterations = 0;
      return reify(this, this.toSeq().map(function (v, k) {
        return mapper.call(context, [k, v], iterations++, this$0);
      }).fromEntrySeq());
    },

    mapKeys: function mapKeys(mapper, context) {
      var this$0 = this;
      return reify(this, this.toSeq().flip().map(function (k, v) {
        return mapper.call(context, k, v, this$0);
      }).flip());
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function (v, k) {
    return JSON.stringify(k) + ': ' + quoteString(v);
  };

  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, false);
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function findIndex(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function indexOf(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function lastIndexOf(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function reverse() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function splice(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || numArgs === 2 && !removeNum) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
    },

    // ### More collection methods

    findLastIndex: function findLastIndex(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function first() {
      return this.get(0);
    },

    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function get(index, notSetValue) {
      index = wrapIndex(this, index);
      return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
        return key === index;
      }, undefined, notSetValue);
    },

    has: function has(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
    },

    interpose: function interpose(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function interleave() /*...iterables*/{
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function keySeq() {
      return Range(0, this.size);
    },

    last: function last() {
      return this.get(-1);
    },

    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function zip() /*, ...iterables */{
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function zipWith(zipper /*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function get(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function includes(value) {
      return this.has(value);
    },

    // ### More sequential methods

    keySeq: function keySeq() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;

  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);

  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function () {
      return !predicate.apply(this, arguments);
    };
  }

  function neg(predicate) {
    return function () {
      return -predicate.apply(this, arguments);
    };
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
    } : function (v, k) {
      h = h + hashMerge(hash(v), hash(k)) | 0;
    } : ordered ? function (v) {
      h = 31 * h + hash(v) | 0;
    } : function (v) {
      h = h + hash(v) | 0;
    });
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;
});

/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*/
 create by wangzy
 date:2016-05-17
 desc:excel数据导入组件
 */
var React = __webpack_require__(1);
var Modal = __webpack_require__(134);
var Button = __webpack_require__(10);
var Message = __webpack_require__(14);
var fileType = __webpack_require__(291);
var unit = __webpack_require__(5);
__webpack_require__(298);
var Import = React.createClass({
    displayName: "Import",

    propTypes: {
        name: React.PropTypes.string, //文件字段名称
        uploadurl: React.PropTypes.string.isRequired, //导入地址
        modelurl: React.PropTypes.string.isRequired, //模板下载地址
        failloadurl: React.PropTypes.string.isRequired, //导入失败下载地址
        importSuccess: React.PropTypes.func //上传成功事件
    },
    getDefaultProps: function getDefaultProps() {
        return {
            name: "",
            uploadurl: null,
            failloadurl: "javascript:void(0)"

        };
    },
    getInitialState: function getInitialState() {
        return {
            name: this.props.name,
            filename: "", //选择的文件名集合
            uploadDisabled: true, //是否允许导入
            choseDisabled: false, //是否允许选择文件
            giveupdisabled: true, //是否允许终止
            uploadurl: this.props.uploadurl,
            failloadurl: this.props.failloadurl,
            showfail: false,
            uploadInfo: []

        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

        this.setState({
            name: nextProps.name,
            uploadurl: nextProps.uploadurl,
            failloadurl: nextProps.failloadurl
        });
    },
    componentDidUpdate: function componentDidUpdate() {},
    close: function close() {
        //关闭
        this.refs.modal.close();
    },
    open: function open() {
        //打开
        this.setState({
            uploadInfo: [], //更新提示
            choseDisabled: false, //可以再选择
            uploadDisabled: true, //不可以再导入
            giveupdisabled: true, //不可以终止
            filename: "", //清空文件名
            showfail: false //不显示下载导入失败的文件
        });
        this.clearFile(); //清空文件选择,方便下一次选择
        this.refs.modal.open();
    },
    onChange: function onChange(event) {
        //选择文件

        this.isSuccess = false; //没有执行完成
        if (this.state.choseDisabled) {
            return;
        }

        var files = event.target.files;
        var filename = ""; //文件名称
        var typevalidate = true; //文件类型正确
        if (files.length > 0) {
            if (files[0].type == "") {
                //苹果电脑存在的现象
                if (files[0].name.lastIndexOf(".xls") > -1 && files[0].name.lastIndexOf(".xls") + 3 == files[0].name.length - 1 || files[0].name.lastIndexOf(".xlsx") > -1 && files[0].name.lastIndexOf(".xlsx") + 3 == files[0].name.length - 1) {
                    typevalidate = true;
                    filename = files[0].name;
                } else {
                    typevalidate = false;
                }
            } else {
                if (!fileType.isExcel(files[0].type)) {
                    typevalidate = false;
                } else {
                    filename = files[0].name;
                }
            }
        } else {
            typevalidate = false;
        }

        if (typevalidate) {
            this.file = files[0]; //保存文件
            this.setState({
                filename: filename,
                uploadDisabled: false, //可以导入
                showfail: false
            });
        } else {
            this.file = null;
            this.setState({
                filename: filename,
                uploadDisabled: true, //不可以导入
                showfail: false
            });
        }
    },
    importBegin: function importBegin(name, title) {
        //开始的导入
        //清空一些数据值,这些数据不需要保存状态值中
        this.isgiveup = false; //默认标记不可以终止,这里没有采用状态值来标记,防止状态更新出现延迟导致统计数据不准确
        this.total = 0; //设置总记录数初始值
        this.failNum = 0; //失败数
        this.successNum = 0; //成功数
        this.importHandler(null); //开始导入
        this.setState({
            choseDisabled: true, //不可以再选择
            uploadDisabled: true, //不可以再导入
            giveupdisabled: false //可以终止
        });
    },
    giveup: function giveup() {
        //终止
        this.isgiveup = true;
        var uploadInfo = this.state.uploadInfo;
        uploadInfo.unshift(React.createElement(
            "div",
            { className: "info", key: "success" + (index + 2).toString() },
            "用户终止,成功数:" + this.successNum.toString() + ",失败数:" + this.failNum.toString()
        ));
        this.setState({
            uploadInfo: uploadInfo, //更新提示
            choseDisabled: false, //可以再选择
            uploadDisabled: true, //不可以再导入
            giveupdisabled: true, //不可以终止
            filename: "", //清空文件名
            showfail: false //不显示下载导入失败的文件
        });
        this.clearFile(); //清空文件选择,方便下一次选择
    },
    importHandler: function importHandler(index) {
        //执行导入事件
        if (this.isgiveup) {
            return;
        }
        var formData = new FormData(); // 实例化一个表单数据对象
        if (index == null) {
            //导入文件
            if (this.file != null) {

                if (this.state.uploadurl) {
                    formData.append(this.state.name, this.file);
                } else {
                    Message.alert("您没有设置上传路径");
                    return;
                }
            }
        } else {
            //执行数据导入
            var image = new Image();
            formData.append(this.state.name, image);
            formData.append("index", index);
        }
        // 实例化一个AJAX对象
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", this.uploadProgress.bind(this, index), false); //上传进度
        xhr.addEventListener("load", this.uploadComplete.bind(this, index), false);
        xhr.addEventListener("error", this.uploadFailed, false);
        xhr.addEventListener("abort", this.uploadCanceled, false);
        xhr.open("POST", this.state.uploadurl, true);
        // 发送表单数据
        xhr.send(formData);
    },
    uploadProgress: function uploadProgress(index, event) {
        if (event.lengthComputable) {
            if (index == null) {
                //导入文件
                var percentComplete = Math.round(event.loaded * 100 / event.total);
                if (percentComplete < 100) {
                    this.setState({
                        uploadInfo: [React.createElement(
                            "div",
                            { key: "upload" + percentComplete.toString(), className: "success" },
                            "文件上传" + percentComplete + "%"
                        )]
                    });
                } else {
                    this.setState({
                        uploadInfo: [React.createElement(
                            "div",
                            { key: "upload" + percentComplete.toString(), className: "success" },
                            "文件上传" + percentComplete + "%,开始读取文件"
                        )]
                    });
                }
            }
        } else {
            this.uploadFailed();
        }
    },
    uploadComplete: function uploadComplete(index, event) {
        var xhr = event.target;
        var uploadInfo = this.state.uploadInfo;
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            if (result && result.success != null && result.success != undefined) {
                if (result.success == true) {
                    if (index == null) {
                        //导入文件成功
                        this.total = result.data.total; //得到总记录数
                        uploadInfo.unshift(React.createElement(
                            "div",
                            { key: "read", className: "success" },
                            "文件读取成功,总共" + this.total + "条数据,开始处理..."
                        ));
                        this.setState({
                            uploadInfo: uploadInfo
                        });
                    } else {
                        if (result.data.success) {
                            this.successNum += 1;
                            uploadInfo.unshift(React.createElement(
                                "div",
                                { className: "success", key: "success" + (index + 2).toString() },
                                "序号为" + (index + 2).toString() + "行,导入成功"
                            ));
                        } else {
                            this.failNum += 1;
                            uploadInfo.unshift(React.createElement(
                                "div",
                                { className: "fail", key: "fail" + (index + 2).toString() },
                                "序号为" + (index + 2).toString() + "行,导入失败," + result.data.message
                            ));
                        }
                        this.setState({
                            uploadInfo: uploadInfo
                        });
                    }
                    if (index == null) {
                        this.importHandler(0); //开始导入第一条数据
                    } else {

                        if (index >= this.total - 1) {
                            //代表已经执行完最后一条记录了
                            uploadInfo.unshift(React.createElement(
                                "div",
                                { className: "info", key: "successall" },
                                "所有数据执行完成,成功数:" + this.successNum.toString() + ",失败数:" + this.failNum.toString()
                            ));
                            this.setState({
                                choseDisabled: false, //可以再选择
                                uploadDisabled: true, //不可以再导入
                                giveupdisabled: true, //不可以终止
                                filename: "", //清空文件名
                                showfail: this.failNum > 0 ? true : false //是否显示下载失败信息
                            });
                            this.clearFile(); //清空文件选择,方便下一次选择

                            if (this.props.importSuccess) {
                                this.props.importSuccess(result);
                            }
                        } else {
                            this.importHandler(index * 1 + 1); //再次执行
                        }
                    }
                } else {
                    this.clearFile(); //清空文件,方便下次选择
                    if (index == null) {
                        Message.error("文件读取失败,原因:" + result.message);
                        this.setState({
                            uploadDisabled: true, //不可以再导入
                            choseDisabled: false //可以再选择
                        });
                    } else {
                        Message.error("服务器处理失败,导入中断,原因:" + result.message);
                        this.setState({
                            uploadDisabled: true, //不可以再导入
                            choseDisabled: false //可以再选择
                        });
                    }
                }
            } else {
                this.clearFile();
                Message.error("服务器返回值非标准JSON格式,无法处理,请联系管理员");
                this.setState({

                    uploadDisabled: true, //不可以再导入
                    choseDisabled: false //可以再选择
                });
            }
        } else {
            this.clearFile();
            if (xhr.statusText.indexOf("404")) {
                Message.error("服务器没有响应,请检查您的上传路径");
                this.setState({

                    uploadDisabled: true, //不可以再导入
                    choseDisabled: false //可以再选择
                });
            } else {
                Message.error("服务器处理错误");
                this.setState({

                    uploadDisabled: true, //不可以再导入
                    choseDisabled: false //可以再选择
                });
            }
        }
    },
    uploadFailed: function uploadFailed(event) {
        this.clearFile();
        this.setState({

            choseDisabled: false, //可以再选择
            uploadDisabled: true //不可以再导入


        });
        Message.error("上传失败");
    },
    uploadCanceled: function uploadCanceled(evt) {
        //保留这个方法
    },
    clearFile: function clearFile() {
        try {
            this.refs.import.value = ""; //清空,以方便可以重新选择相同文件
        } catch (e) {}
    },
    render: function render() {
        var accepts = null; //接受的文件类型
        var acceptMap = fileType.getTypeMap("excel");
        if (acceptMap != null) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = acceptMap.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    if (accepts == null) {
                        accepts = value;
                    } else {
                        accepts += "," + value;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        var props = {
            accept: accepts,
            multiple: false
        };

        return React.createElement(
            Modal,
            { ref: "modal", width: 460, height: 340, title: "\u8BF7\u9009\u62E9\u5BFC\u5165\u6587\u4EF6" },
            React.createElement(
                "div",
                { className: "import-section" },
                React.createElement("input", { type: "text", name: this.state.name, className: "import-text", value: this.state.filename, readOnly: true }),
                React.createElement("input", _extends({ type: "file", ref: "import", className: "import-file", onChange: this.onChange }, props, { style: { display: this.state.choseDisabled ? "none" : "inline" } })),
                React.createElement(Button, { type: "button", disabled: this.state.choseDisabled, className: "import-chose", theme: "cancel", title: "\u9009\u62E9\u6587\u4EF6" })
            ),
            React.createElement(
                "div",
                { className: "import-submit" },
                React.createElement(
                    "a",
                    { className: "import-failload", target: "blank", href: this.props.failloadurl, style: { display: this.state.showfail == true ? "inline" : "none" } },
                    "\u4E0B\u8F7D\u5931\u8D25\u4FE1\u606F"
                ),
                React.createElement(Button, { title: "\u5BFC\u5165", disabled: this.state.uploadDisabled, onClick: this.importBegin, theme: "green" }),
                React.createElement(Button, { title: "\u7EC8\u6B62", disabled: this.state.giveupdisabled, onClick: this.giveup, theme: "cancel" }),
                React.createElement(Button, { title: "\u5173\u95ED", onClick: this.close, theme: "cancel" })
            ),
            React.createElement(
                "a",
                { className: "import-downloadmodel", href: this.props.modelurl },
                "\u4E0B\u8F7D\u6A21\u7248"
            ),
            React.createElement(
                "div",
                { className: "import-upload-info" },
                this.state.uploadInfo
            )
        );
    }
});
module.exports = Import;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
create by wangzhiyong
date:2016-10-30
desc:单页面应用的事件处理模型
 */
var React = __webpack_require__(1);
var Message = __webpack_require__(14);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var PageHandlerMixins = {
    getHandler: function getHandler(id, disabled) {
        //获取一个实例模型
        var getUrl = this.state.getUrl;
        if (getUrl.indexOf("?") > 0) {
            //已经带了参数

            getUrl = getUrl + "&id=" + id;
        } else {
            getUrl = getUrl + "?id=" + id;
        }
        var fetchModel = new FetchModel(getUrl, this.getSuccess.bind(disabled), null, this.fetchErrorHandler);
        unit.fetch.get(fetchModel);
    },
    getSuccess: function getSuccess(result, disabled) {
        //
        if (result.data) {
            var model = this.state.model;
            for (var index = 0; index < model.length; index++) {
                if (result.data[model[index].name]) {
                    model[index].value = result.data[model[index].name];
                } else {
                    model[index].value = null; //清空
                }
            }
            this.setState({
                model: model,
                disabled: false, //非只读
                submitButton: this.submitButton(disabled) //提交按钮是否有效
            });
        }
    },
    addOpen: function addOpen() {
        this.refs.slide.open();
        this.state.model = this.state.model.map(function (item, index) {
            item.value = "";
            return item;
        });
        console.log(this.state.model);
        this.setState({
            panelTitle: "新增",
            opType: "add",
            model: this.state.model
        });
    },
    addHandler: function addHandler(model) {
        //新增事件
        var fetchModel = new FetchModel(this.state.addUrl, this.addSuccess, model, this.fetchErrorHandler);
        unit.fetch.post(fetchModel);
    },
    addSuccess: function addSuccess(result) {
        //新增成功
        this.refs.datagrid.reload(); //刷新列表
    },
    deleteHandler: function deleteHandler(id) {
        var _this = this;

        //删除事件
        Message.confirm("确定删除这条记录吗?", function () {
            var deleteUrl = _this.state.deleteUrl;
            if (deleteUrl.indexOf("?") > 0) {
                //已经带了参数

                deleteUrl = deleteUrl + "&id=" + id;
            } else {
                deleteUrl = deleteUrl + "?id=" + id;
            }
            var fetchModel = new FetchModel(deleteUrl, _this.deleteSuccess, null, _this.fetchErrorHandler);
            unit.fetch.get(fetchModel);
        });
    },
    deleteSuccess: function deleteSuccess(result) {
        //删除成功
        this.refs.datagrid.reload(); //刷新列表
    },
    updateOpen: function updateOpen() {
        var model = this.refs.datagrid.getFocusRowData();
        if (model) {
            this.refs.slide.open();
            this.state.model = this.state.model.map(function (item, index) {
                item.value = model[item.name];
                return item;
            });
            this.setState({
                panelTitle: "修改",
                opType: "update",
                model: this.state.model
            });
        } else {
            Message.alert("请选择一条记录");
        }
    },
    updateHandler: function updateHandler(model) {
        //更新事件
        var fetchModel = new FetchModel(this.state.updateUrl, this.addSuccess, model, this.fetchErrorHandler);
        unit.fetch.post(fetchModel);
    },
    updateSuccess: function updateSuccess(result) {
        //更新成功
        this.refs.datagrid.reload(); //刷新列表
    },
    filterHandler: function filterHandler(params) {
        //筛选查询
        this.refs.datagrid.reload(params);
    },
    openSlideHandler: function openSlideHandler(type, id) {
        //打开表单面板
        this.refs.form.clearData(); //先清空原来值
        switch (type) {
            case "add":
                //新增
                this.setState({
                    disabled: false, //非只读
                    submitButton: this.submitButton(false) //提交按钮有效
                });
                break;
            case "update":
                //更新
                this.getHandler(id, false); //提交按钮有效
                break;
            case "search":
                //查询
                this.getHandler(id, true); //提交按钮无效
                break;
        }
    },
    submitHandler: function submitHandler() {
        //提交按钮事件
        var model = this.refs.form.getData(); //获取数据
        switch (this.state.opType) {
            case "add":
                this.addHandler(model);
                break;
            case "update":
                this.updateHandler(model);
                break;
        }
    },
    btnHandler: function btnHandler(name, title) {
        if (name == "add") {
            this.addOpen();
        } else if (name == "update") {
            this.updateOpen();
        }
    },
    fetchErrorHandler: function fetchErrorHandler(errorCode, errorMssage) {
        //统一错误处理
        console.log(errorCode, errorMssage);
        Message.error("操作失败，原因" + errorMssage);
    }
};
module.exports = PageHandlerMixins;

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 create by wangzhiyong
 date:2016-10-30
 desc:单页面应用的事件处理模型
 */

var React = __webpack_require__(1);
var ButtonModel = __webpack_require__(139);
var FetchModel = __webpack_require__(13);
var FormModel = __webpack_require__(140);
var HeaderModel = __webpack_require__(141);
var unit = __webpack_require__(5);
var PageModelMixins = {
    modelUrl: function modelUrl() {
        //获取模型的url
        var url = "";
        if (this.props.modelUrl && this.props.modelUrl !== "") {
            url = this.props.modelUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/GetModel";
        }
        return url;
    },
    getUrl: function getUrl() {
        //获取实例的url
        var url = "";
        if (this.props.getUrl && this.props.getUrl !== "") {
            url = this.props.getUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/Get";
        }

        return url;
    },
    addUrl: function addUrl() {
        //新增时年请求地址
        var url = "";
        if (this.props.addUrl && this.props.addUrl !== "") {
            url = this.props.addUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/Add";
        }

        return url;
    },
    deleteUrl: function deleteUrl() {
        //新增时年请求地址
        var url = "";
        if (this.props.deleteUrl && this.props.deleteUrl !== "") {
            url = this.props.deleteUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/Delete";
        }

        return url;
    },
    updateUrl: function updateUrl() {
        //新增时年请求地址
        var url = "";
        if (this.props.updateUrl && this.props.updateUrl !== "") {
            url = this.props.updateUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/Update";
        }

        return url;
    },
    queryUrl: function queryUrl() {
        //不分页查询(也可以理解为按条件查询)
        var url = "";
        if (this.props.queryUrl && this.props.queryUrl !== "") {
            url = this.props.queryUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/Query";
        }

        return url;
    },
    pageUrl: function pageUrl() {
        //分页时的请求地址
        var url = "";
        if (this.props.pageUrl && this.props.pageUrl !== "") {
            url = this.props.pageUrl;
        } else {
            var url = this.props.corsUrl + this.props.controller + "/Page";
        }

        return url;
    },
    submitButton: function submitButton(disabled) {
        //提交按钮对象
        var btn = new ButtonModel("btnSubmit", "提交");
        btn.theme = this.props.submitTheme;
        btn.disabled = disabled;
        btn.delay = disabled ? null : 3000; //防止重复提交
        return btn;
    },
    initButtons: function initButtons() {
        //
        var add = new ButtonModel("add", "新增", "green");
        add.onClick = this.addOpen;
        return [add, new ButtonModel("update", "更新"), new ButtonModel("delete", "删除")];
    },
    initModel: function initModel() {
        //获取数据模型
        var fetchModel = new FetchModel(this.state.modelUrl, this.initModelSuccess, null, this.fetchErrorHandler);
        unit.fetch.get(fetchModel);
    },
    initModelSuccess: function initModelSuccess(result) {
        //获取数据模型成功
        result.data = result.rows && !result.data ? result.rows : result.data;
        if (result.data != null && result.data instanceof Array) {
            if (this.props.overrideModel) {
                //用户进行一步处理数据模型,有返回值
                var returnValue = this.props.overrideModel(result.data);
                if (returnValue) {
                    //有返回值

                    result.data = returnValue;
                } else {//没有返回值,还是使用原来的
                }
            }
            var model = []; //表单的数据模型
            var filters = []; //筛选栏的数据模型
            var headers = []; //列表头的数据模型
            for (var index = 0; index < result.data.length; index++) {
                var modelOject = new FormModel(result.data[index].name, result.data[index].label);
                modelOject = Object.assign(modelOject, result.data[index]); //合并属性
                modelOject.filterAble = modelOject.filterAble == undefined ? true : modelOject.filterAble;
                modelOject.gridAble = modelOject.gridAble == undefined ? true : modelOject.gridAble;
                if (modelOject.filterAble == true) {
                    //此字段可用于筛选
                    //因为要除去验证属性,所以要重新定义
                    var filterModel = unit.clone(modelOject);
                    filterModel.required = false;
                    filterModel.regexp = null;
                    filterModel.min = null;
                    filterModel.max = null;
                    if (modelOject.type.indexOf("date") > -1) {
                        filterModel.type = "daterange"; //如果是日期格式统一设置在日期范围
                    }
                    filters.push(filterModel); //加入筛选模型中
                }

                if (modelOject.gridAble == true) {
                    //此字段可用于列表
                    var headerModel = new HeaderModel(modelOject.name, modelOject.label); //得到默认表头
                    if (modelOject.headerModel) {
                        //用户定义了其他设置
                        headerModel = Object.assign(modelOject.headerModel, headerModel); //解构
                    }
                    headers.push(headerModel); //加入列表表头模型
                }
                model.push(modelOject);
            }

            this.setState({
                model: model,
                filterModel: filters,
                headers: headers,
                buttons: this.initButtons(),
                getUrl: this.getUrl(), //生成实例url地址
                addUrl: this.addUrl(), //生成新增url地址
                deleteUrl: this.deleteUrl(), //生成删除url地址
                updateUrl: this.updateUrl(), //生成更新url
                queryUrl: this.queryUrl(), //生成不分页url
                pageUrl: this.pageUrl() //分页的url

            });
        }
    }
};
module.exports = PageModelMixins;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _unit = __webpack_require__(5);

var _unit2 = _interopRequireDefault(_unit);

var _FetchModel = __webpack_require__(13);

var _FetchModel2 = _interopRequireDefault(_FetchModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                create by wangzhiyong
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                date:2017-02-10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                desc:页面基类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Page = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this.state = {};

        return _this;
    }

    _createClass(Page, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var isalog = window.localStorage.getItem("wasabi-alog");
            if (isalog) {
                //是心怡项目
                var script = document.createElement("script");
                script.src = "http://g.tbcdn.cn/sj/securesdk/0.0.3/securesdk_v2.js";
                script.id = "J_secure_sdk_v2";
                script.setAttribute("id", "J_secure_sdk_v2");
                script.setAttribute("data-appkey", "23421795");
                document.body.appendChild(script);
            }

            if (this.state.powerUrl) {
                var fetchModel = new _FetchModel2.default(this.state.powerUrl, this.powerSuccess, { title: this.state.pageTitle }, this.powerError);
                _unit2.default.fetch.post(fetchModel);
            }
        }
    }, {
        key: "powerSuccess",
        value: function powerSuccess() {}
    }, {
        key: "powerError",
        value: function powerError() {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: "wasabi-page" },
                _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, _this2.state);
                })
            );
        }
    }]);

    return Page;
}(_react2.default.Component);

;
Page.propTypes = {
    width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]), //宽度
    height: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]), //高度
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string

};
Page.defaultProps = _extends({}, Page.defaultProps, {
    width: "100%",
    height: "100%",
    style: null,
    className: ""
});
module.exports = Page;

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 2016/10/30.
 * 创建单表应用组件
 */
var React = __webpack_require__(1);

var SearchBar = __webpack_require__(130);
var Form = __webpack_require__(124);
var Toolbar = __webpack_require__(53);
var DataGrid = __webpack_require__(77);
var SlidePanel = __webpack_require__(136);
var SingleHandlerMixins = __webpack_require__(256);
var SingleModelMixins = __webpack_require__(257);
var Single = React.createClass({
    displayName: "Single",

    mixins: [SingleHandlerMixins, SingleModelMixins],
    propTypes: {
        title: React.PropTypes.string.isRequired, //页面的标题
        controller: React.PropTypes.string.isRequired, //控制器名称
        key: React.PropTypes.string, //主键名称
        corsUrl: React.PropTypes.string, //跨域地址

        params: React.PropTypes.object, //默认的筛选条件
        modelUrl: React.PropTypes.string, //数据模型地址url
        getUrl: React.PropTypes.string, //实例地址url
        addUrl: React.PropTypes.string, //新增地址url
        deleteUrl: React.PropTypes.string, //修改地址url
        updateUrl: React.PropTypes.string, //更新地址url
        queryUrl: React.PropTypes.string, //不分页查询url
        pageUrl: React.PropTypes.string, //分页查询url
        overrideModel: React.PropTypes.func, //对数据模型再进一步处理,有返回值
        submitTheme: React.PropTypes.string //提交按钮主题
    },
    getDefaultProps: function getDefaultProps() {
        return {
            title: "",
            controller: null,
            key: "id",
            corsUrl: "/", //默认当前域名下
            params: null, //默认条件为空
            modelUrl: null,
            getUrl: null,
            addUrl: null,
            deleteUrl: null,
            updateUrl: null,
            queryUrl: null,
            pageUrl: null,
            overrideModel: null,
            submitTheme: "green"
        };
    },
    getInitialState: function getInitialState() {
        return {
            panelTitle: "", //面板标题
            opType: "", //当前操作类型
            modelUrl: this.modelUrl(), //生成单表数据模型的url地址,
            getUrl: null, //生成实例url地址
            addUrl: null, //生成新增url地址
            deleteUrl: null, //生成删除url地址
            updateUrl: null, //生成更新url
            queryUrl: null, //生成不分页url
            pageUrl: null, //分页的url
            filterModel: [], //筛选数据模型
            model: [], //表单模型,
            disabled: false, //表单是否只读
            buttons: [], //操作按钮模型
            headers: [], //列表表头
            submitButton: this.submitButton(false), //提交按钮对象
            params: this.props.params //列表筛选条件

        };
    },
    componentDidMount: function componentDidMount() {
        this.initModel(); //初始化数据模型
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                {
                    style: { display: this.state.filterModel == null || this.state.filterModel instanceof Array && this.state.filterModel.length == 0 ? "none" : "block" } },
                React.createElement(SearchBar, { ref: "searchbar", model: this.state.filterModel,
                    filterHandler: this.filterHandler })
            ),
            React.createElement(
                "div",
                {
                    style: { display: this.state.buttons == null || this.state.buttons instanceof Array && this.state.buttons.length == 0 ? "none" : "block" } },
                React.createElement(Toolbar, { ref: "toolbar", buttons: this.state.buttons, buttonClick: this.btnHandler })
            ),
            React.createElement(DataGrid, { ref: "datagrid", url: this.state.pageUrl, params: this.state.params,
                headers: this.state.headers }),
            React.createElement(
                SlidePanel,
                { ref: "slide", title: this.state.panelTitle, buttons: [this.state.submitButton], buttonClick: this.submitHandler },
                React.createElement(Form, { ref: "form", model: this.state.model, submitHide: true, closeHide: true,
                    disabled: this.state.disabled })
            )
        );
    }
});
module.exports = Single;

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 *Created by wangzhiyong on 2016-12-26
 * desc:因为gridpciker中调用了datagrid，datagrid的编辑功能又调用了gridpicker
 * 导致出问题
 * 所以这里复制一份，专门给gridpicker
 *
 */
__webpack_require__(145);
__webpack_require__(146);
var React = __webpack_require__(1);
var unit = __webpack_require__(5);
var FetchModel = __webpack_require__(13);
var Button = __webpack_require__(10);
var LinkButton = __webpack_require__(26);
var CheckBox = __webpack_require__(54);
// var Input=require("../Form/Input.jsx");
var Radio = __webpack_require__(57);
var Message = __webpack_require__(14);
var Transfer = __webpack_require__(78);
var shouldComponentUpdate = __webpack_require__(8);
var DataGridHandler = __webpack_require__(138);
var DataGridExtend = __webpack_require__(137);
var pasteExtend = __webpack_require__(81);
var ClickAway = __webpack_require__(24);
var showUpdate = __webpack_require__(22);
var regs = __webpack_require__(36);

var DataGrid = React.createClass({
    displayName: "DataGrid",

    mixins: [shouldComponentUpdate, DataGridHandler, DataGridExtend, pasteExtend, ClickAway, showUpdate],
    propTypes: {
        width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //宽度
        height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //高度
        selectAble: React.PropTypes.bool, // 是否显示选择，默认值 false
        singleSelect: React.PropTypes.bool, //是否为单选,默认值为 false
        detailAble: React.PropTypes.bool, //是否显示详情,默认值 false
        focusAble: React.PropTypes.bool, //是否显示焦点行，默认值 false
        editAble: React.PropTypes.bool, //是否允许编辑
        borderAble: React.PropTypes.bool, //是否显示表格边框，默认值 false

        clearChecked: React.PropTypes.bool, //刷新数据后是否清除选择,true
        selectChecked: React.PropTypes.bool, //选择行的时候是否同时选中,false
        pagination: React.PropTypes.bool, //是否分页,默认值 true

        pageIndex: React.PropTypes.number, //当前页号
        pageSize: React.PropTypes.number, //分页大小，默认20
        sortName: React.PropTypes.string, //排序字段,
        sortOrder: React.PropTypes.oneOf(["asc", "desc"]), //排序方式,默认asc,
        keyField: React.PropTypes.string, //关键字段
        headers: React.PropTypes.array, //表头设置
        footer: React.PropTypes.array, //页脚,
        total: React.PropTypes.number, // 总条目数，有url没用，默认为 0
        data: React.PropTypes.array, //当前页数据（json）

        url: React.PropTypes.string, //ajax地址

        backSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源(旧版本)
        dataSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源(新版本)
        footerSource: React.PropTypes.string, //页脚数据源,
        totalSource: React.PropTypes.string, //ajax的返回的数据源中哪个属性作为总记录数源

        params: React.PropTypes.object, //查询条件
        onClick: React.PropTypes.func, //单击事件
        onDoubleClick: React.PropTypes.func, //双击事件
        onChecked: React.PropTypes.func, //监听表格中某一行被选中/取消
        updateHandler: React.PropTypes.func, //手动更新事件，父组件一定要有返回值,返回详情组件
        detailHandler: React.PropTypes.func, //展示详情的函数，父组件一定要有返回值,返回详情组件


        pagePosition: React.PropTypes.oneOf(["top", "bottom", "both"]), //分页栏的位置

        pasteUrl: React.PropTypes.string, //粘贴后的url
        pasteParamsHandler: React.PropTypes.func, //对粘贴后的数据进行处理,形成参数并且返回
        menu: React.PropTypes.bool, //是否显示菜单按钮
        menuPanel: React.PropTypes.any, //菜单面板
        headerUrl: React.PropTypes.string, //自定义列地址

        updateUrl: React.PropTypes.string //列更新的地址


    },
    getDefaultProps: function getDefaultProps() {
        return {
            width: "100%",
            height: null,
            selectAble: false,
            singleSelect: false,
            detailAble: false,
            focusAble: true,
            borderAble: false,
            clearChecked: true, //是否清空选择的
            selectChecked: false,
            pagination: true,
            pageIndex: 1,
            pageSize: 20,
            sortName: "id",
            sortOrder: "asc",
            keyField: "id",
            headers: [],
            total: 0,
            data: [],
            url: null, //
            backSource: "data", //
            dataSource: "data", //
            totalSource: "total", //
            params: null,
            footer: null, //页脚
            onClick: null,
            onDoubleClick: null,

            onChecked: null,
            updateHandler: null,
            detailHandler: null,

            footerSource: "footer", //页脚数据源

            pagePosition: "bottom", //默认分页在底部

            pasteUrl: null,
            pasteParamsHandler: null,
            menu: false,
            menuPanel: null,
            headerUrl: null,
            editAble: false, //是否允许编辑
            updateUrl: null

        };
    },
    getInitialState: function getInitialState() {
        this.clientHeight = document.documentElement.clientHeight; //先得到高度,防止后期页面发生晃动
        var data = [];
        if (this.props.data instanceof Array) {
            data = this.props.data;
        }
        return {
            url: this.props.url,

            params: unit.clone(this.props.params), //这里一定要复制,只有复制才可以比较两次参数是否发生改变没有,防止父组件状态任何改变而导致不停的查询
            pageIndex: this.props.pageIndex,
            pageSize: this.props.pageSize,
            sortName: this.props.sortName,
            sortOrder: this.props.sortOrder,
            data: this.props.pagination == true ? data.slice(0, this.props.pageSize) : data, //只只保留当前的数据
            checkedData: new Map(),
            detailView: null, //详情行,
            detailIndex: null, //显示详情的行下标
            total: this.props.total, //总记录数
            loading: this.props.url || this.props.headerUrl ? true : false, //显示正在加载图示
            footer: this.props.footer, //页脚
            headers: this.props.headers, //表头会可能后期才传送,也会动态改变
            height: this.props.height, //如果没有设置高度还要从当前页面中计算出来空白高度,以适应布局
            headerMenu: [], //被隐藏的列
            panelShow: false, //列表的操作面板
            menu: this.props.menu,
            menuPanel: this.props.menuPanel,
            headerUrl: this.props.headerUrl,
            updateUrl: this.props.updateUrl,
            editAble: this.props.editAble,
            editIndex: null, //当前处理编辑的列
            remoteHeaders: null, //自定义列的数据
            addData: new Map(), //新增的数据,因为有可能新增一个空的，然后再修改
            updatedData: new Map(), //被修改过的数据，因为要判断曾经是否修改
            deleteData: [] //删除的数据


        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        /*
         url与params而url可能是通过reload方法传进来的,并没有作为状态值绑定
         headers可能是后期才传了,见Page组件可知
         所以此处需要详细判断
         另外 pageSize组件
         */
        if (nextProps.url) {
            //说明父组件将url作为状态值来绑定的
            /*
             注意了***************（见reload方法）
             isReloadType的作用:
             为真:说明是通过reload方法来执行更新的,组件本身的params与父组件的params已经不同步了,不能更新
             为假:说明是父组件仅仅使用了状态值作为通信方式,先判断是否有params变化，没有则不查询,有从第一页开始查询
             *********
             */

            //先更新一些可能会更新的属性
            //先处理表头的筛选，因为可能存在远程的加载的表头数据
            var filterResult = this.headerFilterHandler(this.state.remoteHeaders);
            var neeeUpdate = this.showUpdate(this.state.headers, filterResult.headers);

            if (!neeeUpdate) {
                if (nextProps.menuPanel) {
                    neeeUpdate = true; //因为菜单面板是react元素，无法对比，所以只要不为空就更新
                }
                if (!neeeUpdate) {
                    if (this.state.headerUrl != nextProps.headerUrl) {
                        neeeUpdate = true;
                    }
                }
            }
            if (neeeUpdate) {
                this.setState({
                    headers: filterResult.headers,
                    menuPanel: nextProps.menuPanel,
                    headerUrl: nextProps.headerUrl
                });
            }

            if (this.state.headerUrl != nextProps.headerUrl) {
                this.getHeaderDataHandler(nextProps.headerUrl);
            }

            if (this.isReloadType != true && this.showUpdate(nextProps.params, this.state.params)) {
                //仅仅通过状态值更新,参数有变,更新
                this.updateHandler(nextProps.url, this.state.pageSize, 1, this.state.sortName, this.state.sortOrder, nextProps.params);
            } else {//父组件状态值没有发生变化,或者使用reload方法更新的


            }
        } else {
            //说明父组件将url没有作为状态值来绑定的
            if (this.state.url) {
                //组件本身的url不为空说明通过reload方法绑定了url,父组件本身没有绑定url,所以不能查询

                if (nextProps.headers) {
                    //存在着这种情况,后期才传headers,所以要更新一下
                    this.setState({
                        headers: nextProps.headers
                    });
                }
            } else {
                //没有url时，自定义更新事件
                if (nextProps.data != null && nextProps.data != undefined && nextProps.data instanceof Array) {
                    this.setState({
                        data: this.props.pagination == true ? nextProps.data.slice(0, nextProps.pageSize) : nextProps.data,
                        total: nextProps.total,
                        pageIndex: nextProps.pageIndex,
                        pageSize: nextProps.pageSize,
                        sortName: this.props.sortName,
                        sortOrder: nextProps.sortOrder,
                        loading: false,
                        headers: nextProps.headers, //表头可能会更新
                        menuPanel: nextProps.menuPanel
                    });
                }
            }
        }
    },
    componentDidMount: function componentDidMount() {
        //渲染后再开始加载数据
        if (this.state.headerUrl) {
            //如果存在自定义列
            this.getHeaderDataHandler();
        }
        if (this.state.url) {
            //如果存在url,
            this.updateHandler(this.state.url, this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder);
        }
        this.registerClickAway(this.hideMenuHandler, this.refs.grid); //注册全局单击事件
    },
    componentDidUpdate: function componentDidUpdate() {
        this.setWidthAndHeight(); //重新计算列表的高度,固定的表头每一列的宽度
    },
    renderHeader: function renderHeader() {
        var _this = this;

        //渲染表头
        if (this.state.headers instanceof Array) {} else {
            return null;
        }
        var headers = [];

        if (this.props.selectAble) {
            var props = {
                value: this.checkCurrentPageCheckedAll() == true ? "yes" : null,
                data: [{
                    value: "yes",
                    text: ""
                }],
                onSelect: this.checkedAllHandler,
                name: "all"
                //使用label,因为多个列可能绑定一个字段
            };if (this.props.singleSelect == true) {
                headers.push(React.createElement(
                    "th",
                    { key: "headercheckbox",
                        className: "check-column",
                        name: "check-column",
                        style: {
                            width: 35
                        } },
                    React.createElement(
                        "div",
                        { className: "wasabi-table-cell",
                            name: "check-column" },
                        " "
                    ),
                    " "
                ));
            } else {
                headers.push(React.createElement(
                    "th",
                    { key: "headercheckbox",
                        className: "check-column",
                        name: "check-column",
                        style: {
                            width: 35
                        } },
                    React.createElement(
                        "div",
                        { className: "wasabi-table-cell",
                            name: "check-column" },
                        " ",
                        React.createElement(
                            CheckBox,
                            props,
                            " "
                        )
                    )
                ));
            }
        }
        this.state.headers.map(function (header, index) {

            if (!header || header.hide == true) {
                //隐藏则不显示
                return;
            } else {
                if (_this.state.headerMenu.length > 0 && _this.state.headerMenu.indexOf(header.label) > -1) {
                    //父组件更新状态值，发现某一行处理被隐藏中，则不显示
                    return;
                } else {
                    var sortOrder = "";
                    var props = {}; //设置单击事件
                    if (header.sortAble == true) {
                        sortOrder = " both";
                        if (_this.state.sortName == header.name) {
                            //是当前排序字段
                            sortOrder += " " + _this.state.sortOrder;
                            props.onClick = header.sortAble == true ? _this.onSort.bind(_this, header.name, _this.state.sortOrder == "asc" ? "desc" : "asc") : null;
                        } else {
                            props.onClick = header.sortAble == true ? _this.onSort.bind(_this, header.name, "asc") : null;
                        }
                    }
                    //使用label作为元素name属性，是因为可能有多个列对应同一个字段
                    var menuControl = null; //打开操作面板的菜单图标
                    var savecontrol = null; //保存按钮
                    if (_this.state.menu && index == 0) {
                        //在第一列显示
                        menuControl = React.createElement(LinkButton, { key: "menu",
                            style: {
                                color: "#666666",
                                fontSize: 12,
                                position: "absolute"
                            },
                            iconCls: "icon-catalog",
                            name: "menu",
                            tip: "\u83DC\u5355",
                            onClick: _this.panelShow
                        });
                    }
                    if (_this.state.editIndex != null && index == 0) {
                        //0是有效值
                        savecontrol = React.createElement(LinkButton, { key: "save",
                            style: {
                                color: "#666666",
                                fontSize: 12,
                                position: "absolute"
                            },
                            iconCls: "icon-submit",
                            name: "save",
                            tip: "\u4FDD\u5B58",
                            onClick: _this.remoteUpdateRow.bind(_this, null)
                        });
                    }

                    headers.push(React.createElement(
                        "th",
                        _extends({ key: "header" + index.toString(),
                            name: header.label }, props, {
                            className: "" + sortOrder,
                            style: {
                                textAlign: header.align ? header.align : "left"
                            },
                            onMouseMove: _this.headerMouseMoveHandler,
                            onContextMenu: _this.headerContextMenuHandler,
                            onMouseDown: _this.headerMouseDownHandler }),
                        React.createElement(
                            "div",
                            { className: "wasabi-table-cell",
                                name: header.label,
                                style: {
                                    width: header.width ? header.width : null,
                                    textAlign: header.align ? header.align : "left"
                                } },
                            " ",
                            React.createElement(
                                "span",
                                null,
                                " ",
                                header.label,
                                " "
                            ),
                            menuControl,
                            savecontrol
                        )
                    ));
                }
            }
        });

        return headers;
    },
    renderBody: function renderBody() {
        var _this2 = this;

        //渲染表体
        var trobj = [];
        if (this.state.data instanceof Array && this.state.headers instanceof Array) {} else {
            return;
        }

        this.state.data.map(function (rowData, rowIndex) {
            var tds = []; //当前的列集合
            var key = _this2.getKey(rowIndex); //获取这一行的关键值
            //设置这一行的选择列
            if (_this2.props.selectAble) {
                var props = {
                    value: _this2.state.checkedData.has(key) == true ? key : null,
                    data: [{
                        value: key,
                        text: ""
                    }],
                    onSelect: _this2.onChecked.bind(_this2, rowIndex),
                    name: key
                };

                if (_this2.props.singleSelect == true) {
                    tds.push(React.createElement(
                        "td",
                        { key: "bodycheckbox" + rowIndex.toString(),
                            className: "check-column",
                            style: {
                                width: 35
                            } },
                        React.createElement(
                            "div",
                            { className: "wasabi-table-cell" },
                            " ",
                            React.createElement(
                                Radio,
                                props,
                                " "
                            )
                        ),
                        " "
                    ));
                } else {
                    tds.push(React.createElement(
                        "td",
                        { key: "bodycheckbox" + rowIndex.toString(),
                            className: "check-column",
                            style: {
                                width: 35
                            } },
                        React.createElement(
                            "div",
                            { className: "wasabi-table-cell" },
                            " ",
                            React.createElement(
                                CheckBox,
                                props,
                                " "
                            )
                        ),
                        " "
                    ));
                }
            }

            //生成数据列
            _this2.state.headers.map(function (header, columnIndex) {
                if (!header || header.hide) {
                    return;
                }
                if (_this2.state.headerMenu.length > 0 && _this2.state.headerMenu.indexOf(header.label) > -1) {
                    //父组件更新状态值，发现某一行处理被隐藏中，则不显示
                    return;
                }

                var content = header.content;
                if (typeof content === 'string') {
                    //指定的列
                    content = _this2.substitute(content, rowData);
                } else if (typeof content === 'function') {
                    //函数
                    try {
                        content = content(rowData, rowIndex);
                    } catch (e) {
                        content = "";
                    }
                } else {
                    //为空时
                    content = rowData[header.name];
                }

                if (_this2.state.editIndex != null && _this2.state.editIndex == rowIndex && header.editor) {
                    // let currentValue=rowData[header.name];
                    // let currentText=rowData[header.name];
                    // if(typeof header.editor.content=== 'function') {
                    //     let valueResult= header.editor.content(rowData,rowIndex);
                    //     if(valueResult)
                    //     {
                    //         currentValue=valueResult.value;
                    //         currentText=valueResult.text;
                    //
                    //     }
                    // }
                    // tds.push(<td onClick={this.onClick.bind(this,rowIndex,rowData)}
                    //              onDoubleClick={this.onDoubleClick.bind(this,rowIndex,rowData)}
                    //              key={"col"+rowIndex.toString()+"-"+columnIndex.toString()}
                    // ><div className="wasabi-table-cell"    style={{width:(header.width?header.width:null),textAlign:(header.align?header.align:"left")}}>
                    //     <Input {...header.editor.options} type={header.editor.type} value={currentValue} text={currentText} onChange={this.rowEditHandler.bind(this,columnIndex)}
                    //            onSelect={this.rowEditHandler.bind(this,columnIndex)} label={""}></Input>
                    // </div></td>);
                } else {
                    if (columnIndex == 0 && _this2.props.detailAble) {

                        //在第一列显示详情
                        var iconCls = "icon-down"; //详情列的图标
                        if (_this2.state.detailIndex == key) {
                            iconCls = "icon-up"; //详情列-展开
                        }

                        tds.push(React.createElement(
                            "td",
                            { onClick: _this2.detailHandler.bind(_this2, rowIndex, rowData),
                                key: "col" + rowIndex.toString() + "-" + columnIndex.toString() },
                            React.createElement(
                                "div",
                                { className: "wasabi-table-cell",
                                    style: {
                                        width: header.width ? header.width : null,
                                        textAlign: header.align ? header.align : "left"
                                    } },
                                React.createElement(
                                    "div",
                                    { style: {
                                            float: "left"
                                        } },
                                    " ",
                                    content,
                                    " "
                                ),
                                React.createElement(LinkButton, { iconCls: iconCls, color: "#666666", tip: "\u67E5\u770B\u8BE6\u60C5" })
                            ),
                            " "
                        ));
                    } else {
                        tds.push(React.createElement(
                            "td",
                            { onClick: _this2.onClick.bind(_this2, rowIndex, rowData),
                                onDoubleClick: _this2.onDoubleClick.bind(_this2, rowIndex, rowData),
                                key: "col" + rowIndex.toString() + "-" + columnIndex.toString() },
                            React.createElement(
                                "div",
                                { className: "wasabi-table-cell",
                                    style: {
                                        width: header.width ? header.width : null,
                                        textAlign: header.align ? header.align : "left"
                                    } },
                                " ",
                                content,
                                " "
                            )
                        ));
                    }
                }
            });
            var trClassName = null;
            if (rowIndex * 1 % 2 == 0) {
                //不是选中行的时候
                trClassName = "even";
            }
            if (rowIndex * 1 == _this2.focusIndex && _this2.props.focusAble) {
                trClassName = "selected";
            }
            trobj.push(React.createElement(
                "tr",
                { className: trClassName,
                    key: "row" + rowIndex.toString(),
                    onMouseDown: _this2.onMouseDown.bind(_this2, rowIndex) },
                " ",
                tds,
                " "
            ));

            if (_this2.state.detailIndex == key) {

                trobj.push(_this2.state.detailView);
            }
        });
        return trobj;
    },
    substitute: function substitute(str, obj) {
        //得到绑定字段的内容
        return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return obj[name] === null || obj[name] === undefined ? '' : obj[name];
        });
    },
    renderTotal: function renderTotal() {
        //渲染总记录数，当前记录的下标
        if (this.state.headers && this.state.headers.length > 0) {
            var beginOrderNumber = 0;
            var endOrderNumber = 0; //数据开始序号与结束序
            var total = this.state.total; //总记录数
            var pageTotal = parseInt(this.state.total / this.state.pageSize); //共多少页
            if (this.state.total % this.state.pageSize > 0) {
                pageTotal++; //求余后得到最终总页数
            }
            if (pageTotal == 0) {
                //数据为空，直接返回
                return null;
            }

            var control; //记录数组件
            if (this.state.data instanceof Array) {
                if (this.state.data.length > 0) {
                    if (this.props.pagination) {
                        beginOrderNumber = this.state.pageSize * (this.state.pageIndex - 1) + 1;
                        endOrderNumber = this.state.pageSize * (this.state.pageIndex - 1) + this.state.data.length;
                    } else {
                        endOrderNumber = this.state.data.length;
                        total = this.state.data.length;
                    }
                }
            }
            var totalControl = React.createElement(
                "span",
                { className: "pagination-info" },
                " \u7B2C ",
                this.state.pageIndex,
                "/",
                pageTotal,
                "\u9875,\u5171",
                total,
                "\u884C\u8BB0\u5F55"
            );
            if (this.props.pagination == false) {
                totalControl = React.createElement(
                    "span",
                    { className: "pagination-info" },
                    " \u5171 ",
                    total,
                    "\u884C\u8BB0\u5F55 "
                );
            }
            control = React.createElement(
                "div",
                { key: "pagination-detail",
                    className: "pagination-detail" },
                " ",
                totalControl,
                " ",
                React.createElement(
                    "div",
                    { style: {
                            display: this.props.pagination ? "inline-block" : "none"
                        } },
                    " \u6BCF\u9875 ",
                    React.createElement(
                        "select",
                        { className: "page-select",
                            value: this.state.pageSize,
                            onChange: this.pageSizeHandler },
                        React.createElement(
                            "option",
                            { value: 10 },
                            " 10 "
                        ),
                        " ",
                        React.createElement(
                            "option",
                            { value: 20 },
                            " 20 "
                        ),
                        " ",
                        React.createElement(
                            "option",
                            { value: 30 },
                            " 30 "
                        ),
                        " ",
                        React.createElement(
                            "option",
                            { value: 50 },
                            " 50 "
                        ),
                        " ",
                        React.createElement(
                            "option",
                            { value: 100 },
                            " 100 "
                        ),
                        " "
                    ),
                    "\u6761"
                )
            );
            return control;
        } else {
            return null;
        }
    },
    renderPagination: function renderPagination(type) {
        //显示分页控件
        var paginationCom = null;
        if (this.props.pagination) {

            var pageTotal = parseInt(this.state.total / this.state.pageSize); //共多少页
            if (this.state.total % this.state.pageSize > 0) {
                pageTotal++; //求余后得到最终总页数
            }
            if (pageTotal == 0) {
                //数据为空，直接返回
                return null;
            }

            if (pageTotal > 3) {
                //大于3页，
                var pageComponent = []; //分页组件
                //简化显示方式，否则在grid嵌套时，而数据过多时无法显示完整
                paginationCom = React.createElement(
                    "div",
                    { className: "pull-right pagination" },
                    React.createElement(
                        "ul",
                        { className: "pagination",
                            style: {
                                marginTop: type == "top" ? 0 : 4,
                                marginBottom: type == "top" ? 4 : 0
                            } },
                        React.createElement(
                            "li",
                            { key: "lipre",
                                className: "page-pre" },
                            " ",
                            React.createElement(
                                "a",
                                { href: "javascript:void(0)",
                                    onClick: this.prePaginationHandler },
                                " ",
                                "<",
                                " "
                            )
                        ),
                        React.createElement(
                            "li",
                            { key: "linext",
                                className: "page-next" },
                            " ",
                            React.createElement(
                                "a",
                                { href: "javascript:void(0)",
                                    onClick: this.nextPaginationHandler },
                                " ",
                                ">",
                                " "
                            )
                        )
                    ),
                    " "
                );
            } else {
                //小于3页直接显示
                var pagearr = [];
                for (var i = 0; i < pageTotal; i++) {
                    var control = React.createElement(
                        "li",
                        { key: "li" + i,
                            className: "page-number " + (this.state.pageIndex * 1 == i + 1 ? "active" : "") },
                        React.createElement(
                            "a",
                            { href: "javascript:void(0)",
                                onClick: this.paginationHandler.bind(this, i + 1) },
                            " ",
                            i + 1,
                            " "
                        )
                    );
                    pagearr.push(control);
                }
                paginationCom = React.createElement(
                    "div",
                    { className: "pull-right" },
                    React.createElement(
                        "ul",
                        { className: "pagination" },
                        " ",
                        pagearr,
                        " "
                    ),
                    " "
                );
            }
        }
        return paginationCom;
    },
    renderFooter: function renderFooter() {
        var _this3 = this;

        //渲染页脚
        var tds = [];
        this.footerActualData = []; //,页脚的实际统计数据，用于返回
        if (this.state.footer instanceof Array) {
            //分页的情况下
            if (this.props.selectAble) {
                tds.push(React.createElement(
                    "td",
                    { key: "footerselect",
                        className: "check-column" },
                    " "
                ));
            }
            this.state.headers.map(function (header, headerindex) {
                if (!header || header.hide) {
                    return;
                }
                if (_this3.state.headerMenu.length > 0 && _this3.state.headerMenu.indexOf(header.label) > -1) {
                    //父组件更新状态值，发现某一行处理被隐藏中，则不显示
                    return;
                }

                var footerchild = _this3.state.footer.filter(function (d) {
                    return d.name == header.name;
                });
                if (footerchild && footerchild.length > 0) {
                    if (footerchild[0].value != null && footerchild[0].value != undefined) {
                        //如果有值
                        var obj = {};
                        obj[header.name] = footerchild[0].value;
                        footerActualData.push(obj);
                        tds.push(React.createElement(
                            "td",
                            { key: headerindex + header.name },
                            " ",
                            footerchild[0].value,
                            " "
                        ));
                    } else {
                        //表明从本页数据统计
                        switch (footerchild[0].type) {
                            case "sum":
                                var obj = {};
                                obj[header.name] = _this3.sumHandler(footerchild[0]);
                                _this3.footerActualData.push(obj);
                                if (obj[header.name] != null) {
                                    tds.push(React.createElement(
                                        "td",
                                        { key: header.name },
                                        " ",
                                        "总计：" + obj[header.name],
                                        " "
                                    ));
                                } else {
                                    tds.push(React.createElement(
                                        "td",
                                        { key: header.name },
                                        " "
                                    ));
                                }
                                break;
                            case "avg":
                                var obj1 = {};
                                obj1[header.name] = _this3.avgHandler(footerchild[0]);
                                _this3.footerActualData.push(obj1);
                                if (obj[header.name] != null) {
                                    tds.push(React.createElement(
                                        "td",
                                        { key: headerindex + header.name },
                                        " ",
                                        "平均值：" + obj1[header.name],
                                        " "
                                    ));
                                } else {
                                    tds.push(React.createElement(
                                        "td",
                                        { key: headerindex + header.name },
                                        " "
                                    ));
                                }
                                break;
                            default:
                                tds.push(React.createElement(
                                    "td",
                                    { key: headerindex + header.name },
                                    " "
                                ));
                        }
                    }
                } else {
                    tds.push(React.createElement(
                        "td",
                        { key: header.name + headerindex },
                        " "
                    ));
                }
            });

            return React.createElement(
                "tr",
                { key: "footertr",
                    style: {
                        height: 36
                    } },
                " ",
                tds,
                " "
            );
        }
    },
    render: function render() {
        var _this4 = this;

        var className = "table table-no-bordered";
        if (this.props.borderAble === true) {
            //无边框
            className = "table";
        }
        var headerControl = this.renderHeader();
        var gridHeight = this.state.height; //
        var tableHeight = "auto";
        if (regs.number.test(gridHeight)) {
            var _tableHeight = gridHeight ? this.props.pagePosition == "both" ? gridHeight - 70 : gridHeight - 35 : null;
        }
        var headerMenuCotrol = []; //右键菜单中隐藏的列
        if (this.state.headerMenu.length > 0) {
            this.state.headerMenu.map(function (item, index) {
                headerMenuCotrol.push(React.createElement(
                    "li",
                    { key: index },
                    " ",
                    React.createElement(
                        "a",
                        { href: "javascript:void(0);",
                            className: "header-menu-item",
                            onMouseDown: _this4.menuHeaderShowHandler.bind(_this4, index, item) },
                        " ",
                        "显示[" + item + "]",
                        " "
                    )
                ));
            });
        }
        return React.createElement(
            "div",
            { className: "wasabi-table",
                ref: "grid",
                onPaste: this.onPaste,
                onMouseDown: this.gridMouseDownHandler,
                onContextMenu: this.gridContextMenuHandler,
                style: {
                    width: this.props.width,
                    height: gridHeight
                } },
            React.createElement(
                "div",
                { className: "wasabi-table-pagination",
                    ref: "toppagination",
                    style: {
                        display: this.props.pagePosition == "top" || this.props.pagePosition == "both" ? this.props.pagination ? "block" : "none" : "none"
                    } },
                React.createElement(
                    "div",
                    { style: {
                            display: this.props.pagination ? "block" : this.state.data instanceof Array && this.state.data.length > 0 ? "block" : "none"
                        } },
                    " ",
                    this.renderPagination("top"),
                    " "
                ),
                " ",
                this.renderTotal()
            ),
            React.createElement(
                "div",
                { className: "table-container" },
                React.createElement(
                    "div",
                    { className: "table-fixed",
                        ref: "fixedTableContainer" },
                    React.createElement(
                        "table",
                        { className: className,
                            key: "fixedTable",
                            ref: "fixedTable",
                            onMouseMove: this.fixedTableMouseMoveHandler,
                            onMouseUp: this.fixedTableMouseUpHandler },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                " ",
                                headerControl,
                                " "
                            ),
                            " "
                        ),
                        " "
                    ),
                    " "
                ),
                " ",
                React.createElement(
                    "div",
                    { className: "table-realTable",
                        ref: "realTableContainer",
                        style: {
                            height: tableHeight
                        },
                        onScroll: this.tableBodyScrollHandler },
                    React.createElement(
                        "table",
                        { className: className,
                            key: "realTable",
                            ref: "realTable" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                " ",
                                headerControl,
                                " "
                            ),
                            " "
                        ),
                        " ",
                        React.createElement(
                            "tbody",
                            null,
                            " ",
                            this.renderBody(),
                            " ",
                            this.renderFooter(),
                            " "
                        ),
                        " "
                    ),
                    " "
                )
            ),
            React.createElement(
                "div",
                { className: "wasabi-table-pagination",
                    ref: "bottompagination",
                    style: {
                        display: this.props.pagination ? "block" : this.props.pagePosition == "bottom" || this.props.pagePosition == "both" ? "block" : "none"
                    } },
                React.createElement(
                    "div",
                    { style: {
                            display: this.props.pagination ? "block" : this.state.data instanceof Array && this.state.data.length > 0 ? "block" : "none"
                        } },
                    " ",
                    this.renderPagination(),
                    " "
                ),
                " ",
                this.renderTotal()
            ),
            " ",
            React.createElement(
                "div",
                { className: "wasabi-table-loading",
                    style: {
                        display: this.state.loading == true ? "block" : "none"
                    } },
                " "
            ),
            " ",
            React.createElement(
                "div",
                { className: "wasabi-load-icon",
                    style: {
                        display: this.state.loading == true ? "block" : "none"
                    } },
                " "
            ),
            " ",
            React.createElement(
                "div",
                { onMouseUp: this.divideMouseUpHandler,
                    ref: "tabledivide",
                    className: "wasabi-table-divide",
                    style: {
                        top: this.props.pagePosition == "top" || this.props.pagePosition == "both" ? 35 : 0
                    } },
                " "
            ),
            " ",
            React.createElement(
                "div",
                { className: "wasabi-header-menu-container",
                    ref: "headermenu" },
                React.createElement(
                    "ul",
                    { className: "wasabi-header-menu" },
                    React.createElement(
                        "li",
                        { key: "first" },
                        " ",
                        React.createElement(
                            "a",
                            { href: "javascript:void(0);",
                                className: "header-menu-item",
                                onMouseDown: this.menuHideHandler },
                            " \u9690\u85CF\u6B64\u5217 "
                        )
                    ),
                    " ",
                    headerMenuCotrol,
                    " "
                ),
                " "
            ),
            " ",
            React.createElement(
                "div",
                { className: "wasabi-table-panel",
                    style: {
                        height: this.state.panelShow ? 350 : 0,
                        border: this.state.panelShow ? null : "none"
                    } },
                React.createElement(
                    "div",
                    { className: "wasabi-table-panel-body" },
                    " ",
                    this.state.menuPanel,
                    " "
                ),
                " "
            ),
            " "
        );
    }
});
module.exports = DataGrid;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 create by wangy
 date:2016-04-05后开始独立改造
 desc:树组件
 */
var React = __webpack_require__(1);
__webpack_require__(301);
var MenuTree = React.createClass({
    displayName: "MenuTree",

    propTypes: {
        collapsed: React.PropTypes.bool, //是否允许折叠
        defaultCollapsed: React.PropTypes.bool, //默认是否折叠
        nodeLabel: React.PropTypes.node.isRequired, //当前节点组件
        arrowClass: React.PropTypes.string, //当前箭头样式
        nodeClass: React.PropTypes.string //当前节点样式
    },
    getInitialState: function getInitialState() {
        return { collapsed: this.props.defaultCollapsed };
    },
    handleClick: function handleClick() {
        this.setState({ collapsed: !this.state.collapsed });
        if (this.props.onClick) {
            var _props;

            (_props = this.props).onClick.apply(_props, arguments);
        }
    },
    render: function render() {
        var _props2 = this.props,
            _props2$collapsed = _props2.collapsed,
            collapsed = _props2$collapsed === undefined ? this.state.collapsed : _props2$collapsed,
            _props2$arrowClass = _props2.arrowClass,
            arrowClass = _props2$arrowClass === undefined ? '' : _props2$arrowClass,
            _props2$itemClassName = _props2.itemClassName,
            itemClassName = _props2$itemClassName === undefined ? '' : _props2$itemClassName,
            nodeLabel = _props2.nodeLabel,
            _props2$nodeClass = _props2.nodeClass,
            nodeClass = _props2$nodeClass === undefined ? "" : _props2$nodeClass,
            children = _props2.children;


        var arrowClassName = 'tree-view_arrow';
        var containerClassName = 'tree-view_children';
        if (collapsed) {
            arrowClassName += ' tree-view_arrow-collapsed';
            containerClassName += ' tree-view_children-collapsed';
        }

        var arrow = React.createElement("div", {

            className: arrowClassName + " " + arrowClass,
            onClick: this.handleClick });

        return React.createElement(
            "div",
            { className: "tree-view" },
            React.createElement(
                "div",
                { className: 'tree-view_item ' + nodeClass },
                arrow,
                nodeLabel
            ),
            React.createElement(
                "div",
                { className: containerClassName },
                children
            )
        );
    }
});

module.exports = MenuTree;

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 create by wangzhiyong
 date:2016-12-13
 desc:树节点组件
 */
var React = __webpack_require__(1);
var TreeNode = React.createClass({
    displayName: "TreeNode",

    propTypes: {
        isParent: React.PropTypes.bool, //是否是父节点
        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired, //值
        text: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired, //标题
        rootValue: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //树的值
        rootText: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //树的值
        tip: React.PropTypes.string, //提示信息
        iconCls: React.PropTypes.string, //默认图标
        iconClose: React.PropTypes.string, //关闭图标
        iconOpen: React.PropTypes.string, //打开的图标
        open: React.PropTypes.bool, //是否处于打开状态
        checked: React.PropTypes.bool, //是否被勾选
        checkAble: React.PropTypes.bool, //是否允许勾选
        checkedType: React.PropTypes.object, //勾选对于父子节点的关联关系
        href: React.PropTypes.string, //节点的链接
        url: React.PropTypes.string, //子节点加载的url地址
        keyField: React.PropTypes.string, //向后台传输的字段名
        params: React.PropTypes.object, //向后台传输的额外参数
        property: React.PropTypes.any, //其他数据
        data: React.PropTypes.array, //子节点数据
        onSelect: React.PropTypes.func //选中后的事件
    },
    getDefaultProps: function getDefaultProps() {
        return {
            isParent: false,
            value: null,
            text: null,
            rootValue: null,
            rootText: null,
            tip: null,
            iconCls: "icon-file", //默认图标
            iconClose: "icon-folder", //默认图标
            iconOpen: "icon-open-folder", //默认图标
            open: false,
            checked: false,
            checkAble: false,
            checkType: { "Y": "ps", "N": "ps" }, //默认勾选/取消勾选都影响父子节点
            href: "javascript:void(0)", //默认链接地址
            url: null, //TODO 暂时先不处理异步问题
            keyField: "id",
            params: null,
            property: null,
            data: [],
            onSelect: null
        };
    },
    getInitialState: function getInitialState() {
        return {
            isParent: this.props.isParent,
            value: this.props.value,
            text: this.props.text,
            rootValue: this.props.rootValue,
            rootText: this.props.rootText,
            tip: this.props.tip,
            iconCls: this.props.iconCls,
            iconClose: this.props.iconClose,
            iconOpen: this.props.iconOpen,
            open: this.props.open,
            checked: this.props.checked,
            checkAble: this.props.checkAble,
            checkType: this.props.checkedType,
            href: this.props.href,
            url: this.props.url,
            keyField: this.props.keyField,
            params: this.props.params,
            property: this.props.property,
            data: this.props.data,
            onSelect: this.props.onSelect,
            selected: this.props.rootValue == this.props.value ? true : false

        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            isParent: nextProps.isParent,
            value: nextProps.value,
            text: nextProps.text,
            rootValue: nextProps.rootValue,
            rootText: nextProps.rootText,
            tip: nextProps.tip,
            iconCls: nextProps.iconCls,
            iconClose: nextProps.iconClose,
            iconOpen: nextProps.iconOpen,
            checked: nextProps.checked,
            checkAble: nextProps.checkAble,
            checkType: nextProps.checkedType,
            href: nextProps.href,
            url: nextProps.url,
            keyField: nextProps.keyField,
            params: nextProps.params,
            property: nextProps.property,
            data: nextProps.data,
            onSelect: nextProps.onSelect,
            selected: nextProps.rootValue == nextProps.value ? true : false
        });
    },
    componentDidUpdate: function componentDidUpdate() {},

    showHandler: function showHandler() {
        this.setState({
            open: !this.state.open
        });
    },
    onSelect: function onSelect(value, text, property) {
        this.setState({
            selected: true
        });
        if (this.props.onSelect != null) {
            this.props.onSelect(value, text, property);
        }
    },
    render: function render() {
        var _this = this;

        var nodeControl = [];

        var tip = this.state.tip ? this.state.tip : this.state.title; //提示信息
        if (this.state.data instanceof Array) {
            this.state.data.map(function (item, index) {
                var isParent = false; //是否为父节点
                if (item.isParent == true || item.data instanceof Array && item.data.length > 0) {
                    //如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                } else {}
                nodeControl.push(React.createElement(TreeNode, _extends({ rootValue: _this.state.rootValue, rootText: _this.state.rootText }, item, { isParent: isParent, onSelect: _this.onSelect, key: index })));
            });
        }
        var iconCls = this.state.iconCls; //默认图标图标
        if (this.state.isParent) {
            //如果是父节点
            if (this.state.open) {
                //打开状态，
                iconCls = this.state.iconOpen ? this.state.iconOpen : this.state.iconCls;
            } else {
                //关闭状态
                iconCls = this.state.iconClose ? this.state.iconClose : this.state.iconCls;
            }
        } else {}
        return React.createElement(
            "li",
            { ref: "node" },
            React.createElement("i", { className: this.state.open ? "icon-drop" : "icon-zright", style: { display: this.state.isParent ? "inline" : "none" }, onClick: this.showHandler }),
            React.createElement(
                "a",
                { href: this.state.href, title: tip, onClick: this.onSelect.bind(this, this.state.value, this.state.text, null, this.state.property), className: this.state.selected ? "selected" : "" },
                React.createElement("i", { className: iconCls }),
                " ",
                React.createElement(
                    "cite",
                    null,
                    this.state.text
                )
            ),
            React.createElement(
                "ul",
                { className: this.state.open ? "show" : "" },
                nodeControl
            )
        );
    }
});
module.exports = TreeNode;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by zhiyongwang on 2016-04-25.
 * 英文版
 */
var lang = {
    SUN: "SUN",
    MON: "MON",
    TUE: "TUE",
    WED: "WED",
    THU: "WED",
    FRI: "FRI",
    SAT: "SAT"
};
module.exports = lang;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lang = { SUN: "日", MON: "一", TUE: "二", WED: "三", THU: "四", FRI: "五", SAT: "六", Month: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"] };module.exports = lang;

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                create by wangzhiyong
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                date:2017-02-09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                desc:圣杯布局，中间内容
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Center = function (_React$Component) {
    _inherits(Center, _React$Component);

    function Center(props) {
        _classCallCheck(this, Center);

        return _possibleConstructorReturn(this, (Center.__proto__ || Object.getPrototypeOf(Center)).call(this, props));
    }

    _createClass(Center, [{
        key: "render",
        value: function render() {
            var style = this.props.style ? this.props.style : {};
            return _react2.default.createElement(
                "div",
                { className: "wasabi-layout-center " + this.props.className, style: style },
                this.props.children
            );
        }
    }]);

    return Center;
}(_react2.default.Component);

Center.defaultProps = _extends({}, Center.defaultProps, {
    style: null,
    className: ""
});
Center.propTypes = {
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string
};
module.exports = Center;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by zhiyongwang on 2016-03-26.
 * 能停靠的层与LinkButton配合使用
 */
var React = __webpack_require__(1);
var LinkButton = __webpack_require__(26);
__webpack_require__(319);

var Drop = function (_React$Component) {
    _inherits(Drop, _React$Component);

    function Drop(props) {
        _classCallCheck(this, Drop);

        var _this = _possibleConstructorReturn(this, (Drop.__proto__ || Object.getPrototypeOf(Drop)).call(this, props));

        _this.dragOverHandler = _this.dragOverHandler.bind(_this);
        _this.dragEnterHandler = _this.dragEnterHandler.bind(_this);
        _this.dragLeaveHandler = _this.dragLeaveHandler.bind(_this);
        _this.dropHandler = _this.dropHandler.bind(_this);
        _this.state = {
            dropClass: "drop"
        };
        return _this;
    }

    _createClass(Drop, [{
        key: "dragOverHandler",
        value: function dragOverHandler(event) {
            //在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发
            event.preventDefault();
            return true;
        }
    }, {
        key: "dragEnterHandler",
        value: function dragEnterHandler() {
            this.setState({
                dropClass: "drop dragEnter" //停靠的背景色
            });
        }
    }, {
        key: "dragLeaveHandler",
        value: function dragLeaveHandler() {
            this.setState({
                dropClass: "drop" //
            });
        }
    }, {
        key: "dropHandler",
        value: function dropHandler() {
            this.setState({
                dropClass: "drop"
            });
            var eleProps = window.localStorage.getItem("wasabidrageleProps");
            if (eleProps) {
                eleProps = JSON.parse(eleProps);
            }
            this.props.onDrop(eleProps);
            window.localStorage.removeItem("wasabidrageleProps");
        }
    }, {
        key: "render",
        value: function render() {
            var props = {
                style: this.props.style
            };
            return React.createElement(
                "div",
                _extends({ className: this.props.className + " " + this.state.dropClass }, props, { onDrop: this.dropHandler,
                    onDragEnter: this.dragEnterHandler, onDragOver: this.dragOverHandler,
                    onDragLeave: this.dragLeaveHandler }),
                this.props.children
            );
        }
    }]);

    return Drop;
}(React.Component);

Drop.propTypes = {
    onDrop: React.PropTypes.func.isRequired //元素停靠事件
};
module.exports = Drop;

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                create by wangzhiyong
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                date:2017-02-09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                desc:圣杯布局，右侧
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var East = function (_React$Component) {
    _inherits(East, _React$Component);

    function East(props) {
        _classCallCheck(this, East);

        return _possibleConstructorReturn(this, (East.__proto__ || Object.getPrototypeOf(East)).call(this, props));
    }

    _createClass(East, [{
        key: "render",
        value: function render() {
            var style = this.props.style ? this.props.style : {};
            return _react2.default.createElement(
                "div",
                { className: "wasabi-layout-east ", style: style },
                _react2.default.createElement(
                    "div",
                    { className: "wasabi-layout-title" },
                    this.props.title
                ),
                _react2.default.createElement(
                    "div",
                    { className: "wasabi-layout-nav" },
                    this.props.children
                )
            );
        }
    }]);

    return East;
}(_react2.default.Component);

East.propTypes = {
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string,
    title: _react2.default.PropTypes.string
};
East.defaultProps = {
    style: null,
    className: "",
    title: "East"
};
module.exports = East;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
create by wangzhiyong
date:2017-02-09
desc:圣杯布局
 */

var React = __webpack_require__(1);
__webpack_require__(311);

var Layout = function (_React$Component) {
    _inherits(Layout, _React$Component);

    function Layout(props) {
        _classCallCheck(this, Layout);

        return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));
    }

    _createClass(Layout, [{
        key: "render",
        value: function render() {

            var style = this.props.style ? this.props.style : {};
            style.width = this.props.width;
            style.height = this.props.height;
            console.log(style);
            return React.createElement(
                "div",
                { className: "wasabi-layout", style: style },
                this.props.children
            );
        }
    }]);

    return Layout;
}(React.Component);

Layout.propTypes = {
    width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //宽度
    height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]), //高度
    style: React.PropTypes.object,
    className: React.PropTypes.string

};

Layout.defaultProps = _extends({}, Layout.defaultProps, {
    width: "100%",
    height: "100%",
    style: null,
    className: ""
});

module.exports = Layout;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                create by wangzhiyong
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                date:2017-02-09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                desc:圣杯布局，头部
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var North = function (_React$Component) {
    _inherits(North, _React$Component);

    function North(props) {
        _classCallCheck(this, North);

        return _possibleConstructorReturn(this, (North.__proto__ || Object.getPrototypeOf(North)).call(this, props));
    }

    _createClass(North, [{
        key: "render",
        value: function render() {
            var style = this.props.style ? this.props.style : {};
            return _react2.default.createElement(
                "div",
                { className: "wasabi-layout-north " + this.props.className, style: style },
                this.props.children
            );
        }
    }]);

    return North;
}(_react2.default.Component);

North.propTypes = {
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string
};
North.defaultProps = {
    style: null,
    className: ""
};

North.propTypes = {

    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string
};
North.defaultProps = _extends({}, North.defaultProps, {
    style: null,
    className: ""
});
module.exports = North;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
create by wangzy
date:2016-15-18
desc:面板组件
 */
var React = __webpack_require__(1);
var LinkButton = __webpack_require__(26);
var Toolbars = __webpack_require__(53);
__webpack_require__(313);
var Panel = React.createClass({
    displayName: "Panel",

    propTypes: {
        theme: React.PropTypes.oneOf(["none", "default", "primary", "success", "info", "warning", "danger"]), //主题
        width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]), //宽度
        height: React.PropTypes.number, //高度
        expand: React.PropTypes.bool, //是否展开
        expandAble: React.PropTypes.bool, //是否允许展开
        title: React.PropTypes.string, //标题
        buttons: React.PropTypes.array, //按钮
        buttonClick: React.PropTypes.func //按钮的单击事件
    },
    getDefaultProps: function getDefaultProps() {
        return {
            theme: "none",
            expand: true,
            expandAble: true,
            width: document.body.clientWidth,
            title: "",
            height: 400,
            backgroundColor: null,
            buttons: [],
            buttonClick: null
        };
    },
    getInitialState: function getInitialState() {
        return {
            expand: this.props.expand,
            expandAble: this.props.expandAble,
            iconTip: this.props.expand == true ? "折叠" : "展开",
            iconCls: this.props.expand == true ? "icon-fold" : "icon-expand",
            height: this.props.expand == true ? this.props.height : 0
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            expand: nextProps.expand,
            expandAble: nextProps.expandAble,
            height: nextProps.height != null && nextProps.height != undefined ? nextProps.height : this.state.height,
            width: nextProps.width != null && nextProps.width != undefined ? nextProps.width : this.state.width
        });
    },
    expandHandler: function expandHandler() {
        this.setState({
            expand: !this.state.expand,
            iconTip: this.state.expand == true ? "折叠" : "展开",
            iconCls: this.state.expand == true ? "icon-fold" : "icon-expand",
            height: this.state.expand == true ? this.props.height : 0
        });
    },
    buttonClick: function buttonClick(name, title) {
        if (this.props.buttonClick != null) {
            this.props.buttonClick(name, title);
        }
    },
    render: function render() {
        var style = null;
        if (this.props.style) {
            style = this.props.style;
            style.width = this.props.width;
        } else {
            style = {
                width: this.props.width
            };
        }
        return React.createElement(
            "div",
            { className: "wasabi-panel panel-" + this.props.theme, style: style },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "h3",
                    { className: "panel-title" },
                    this.props.title
                ),
                React.createElement(
                    "div",
                    { className: "panel-buttons" },
                    React.createElement(Toolbars, { buttons: this.props.buttons, buttonClick: this.buttonClick })
                ),
                React.createElement(
                    "div",
                    { className: "panel-icon", style: { display: this.state.expandAble ? "block" : "none" } },
                    React.createElement(LinkButton, { tip: this.state.iconTip, iconCls: this.state.iconCls, onClick: this.expandHandler })
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body  ", style: { height: this.state.height } },
                this.props.children
            )
        );
    }
});
module.exports = Panel;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by zhiyongwang on 2016-04-14.
 * 能够翻转的层
 */
var React = __webpack_require__(1);
__webpack_require__(321);
var Reverse = React.createClass({
    displayName: "Reverse",

    propTypes: {
        dblAble: React.PropTypes.bool, //是否允许双击翻转
        className: React.PropTypes.string
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: "",
            dblAble: true
        };
    },
    getInitialState: function getInitialState() {
        return {
            isReverse: false,
            frontClassName: "",
            reverseClassName: "flip out",
            frontDisplay: "block",
            reverseDisplay: "none"

        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
    mouseoverHandler: function mouseoverHandler() {

        this.setState({
            frontClassName: "flip out",
            isReverse: true
        });
        var parent = this;
        setTimeout(function () {
            parent.setState({
                frontDisplay: "none",
                reverseDisplay: "block",
                reverseClassName: "flip in"
            });
        }, 300);
    },
    mouseOutHandler: function mouseOutHandler() {
        this.setState({
            reverseClassName: "flip out",
            isReverse: false
        });
        var parent = this;
        setTimeout(function () {
            parent.setState({
                frontDisplay: "block",
                reverseDisplay: "none",
                frontClassName: "flip in"
            });
        }, 300);
    },
    onDblClick: function onDblClick() {
        if (!this.props.dblAble) {
            return;
        }
        this.reverseHandler();
    },
    getState: function getState() {
        //用获取状态用于父组件

        return this.state.isReverse;
    },
    reverseHandler: function reverseHandler() {
        //用于父组件调用
        if (this.state.isReverse) {

            this.mouseOutHandler();
        } else {

            this.mouseoverHandler();
        }
    },
    render: function render() {
        var props = {
            style: this.props.style,
            className: this.props.className + " reverse"
        };
        return React.createElement(
            "div",
            _extends({ onDoubleClick: this.onDblClick }, props),
            React.createElement(
                "div",
                { ref: "front", className: this.state.frontClassName, style: { display: this.state.frontDisplay } },
                this.props.front
            ),
            React.createElement(
                "div",
                { ref: "reverse", className: this.state.reverseClassName, style: { display: this.state.reverseDisplay } },
                this.props.reverse
            )
        );
    }
});
module.exports = Reverse;

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                create by wangzhiyong
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                date:2017-02-09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                desc:圣杯布局，底部
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var South = function (_React$Component) {
    _inherits(South, _React$Component);

    function South(props) {
        _classCallCheck(this, South);

        return _possibleConstructorReturn(this, (South.__proto__ || Object.getPrototypeOf(South)).call(this, props));
    }

    _createClass(South, [{
        key: "render",
        value: function render() {
            var style = this.props.style ? this.props.style : {};
            return _react2.default.createElement(
                "div",
                { className: "wasabi-layout-south " + this.props.className, style: style },
                this.props.children
            );
        }
    }]);

    return South;
}(_react2.default.Component);

South.propTypes = {

    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string
};
South.defaultProps = _extends({}, South.defaultProps, {
    style: null,
    className: ""
});
module.exports = South;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                create by wangzhiyong
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                date:2017-02-09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                desc:圣杯布局，右侧
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var West = function (_React$Component) {
    _inherits(West, _React$Component);

    function West(props) {
        _classCallCheck(this, West);

        return _possibleConstructorReturn(this, (West.__proto__ || Object.getPrototypeOf(West)).call(this, props));
    }

    _createClass(West, [{
        key: "render",
        value: function render() {
            var style = this.props.style ? this.props.style : {};
            return _react2.default.createElement(
                "div",
                { className: "wasabi-layout-west ", style: style },
                _react2.default.createElement(
                    "div",
                    { className: "wasabi-layout-title" },
                    this.props.title
                ),
                _react2.default.createElement(
                    "div",
                    { className: "wasabi-layout-nav" },
                    this.props.children
                )
            );
        }
    }]);

    return West;
}(_react2.default.Component);

West.propTypes = {
    style: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string,
    title: _react2.default.PropTypes.string
};
West.defaultProps = _extends({}, West.defaultProps, {

    style: null,
    className: "",
    title: "East"
});
module.exports = West;

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by wangzhiong on 2016/12/24.
 * datagrid，内置的编辑器模型
 * editor
 */
var EditorModel = function EditorModel(type) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  _classCallCheck(this, EditorModel);

  this.type = type; //input组件类型，
  this.options = options; //input组件的属性
  this.content = null; //修改前如何处理text,value,返回类型{value:"",text:""}
  this.edited = null; //值修改后的处理函数
};

module.exports = EditorModel;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-05-20.
 * 列表中页脚的数据模型
 */

var FooterModel = function FooterModel(name, type) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, FooterModel);

    this.name = name;
    this.type = type; //sum,avg
    this.value = value;
    this.content = content; //复合计算函数
};

module.exports = FooterModel;

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-02-23.
 * 菜单数据模型
 */

var MenuModel = function MenuModel(title) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var iconCls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, MenuModel);

  this.title = title;
  this.url = url;
  this.iconCls = iconCls;
  this.menus = [];
  this.content = content;
};

module.exports = MenuModel;

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by wangzhiyong on 2016/12/14.
 * 树节点模型
 */

var NodeModel = function NodeModel(value, text) {
    var isParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, NodeModel);

    this.value = value; //值
    this.text = text; //标题
    this.isParent = isParent; //是否父节点,如果没有强制，则会根据是否有子节点来判断是为父节点
    this.tip = null; //提示信息
    this.iconCls = "icon-file"; //默认图标
    this.iconClose = "icon-folder"; //关闭图标
    this.iconOpen = "icon-open-folder"; //打开的图标
    this.open = false; //是否处于打开状态
    this.selected = false; //是否被选中
    this.checked = false, //是否被勾选
    this.checkAble = false; //是否允许勾选
    this.checkedType = { "Y": "ps", "N": "ps" }, //勾选对于父子节点的关联关系
    this.href = "javascript=void(0)"; //节点的链接
    this.url = null; //子节点加载的url地址
    this.key = "id"; //向后台传输的字段名
    this.params = null; //向后台传输的额外参数
    this.property = null; ////其他数据,TODO 先保留，暂时没处理
    this.data = []; ////子节点数据
    this.onSelect = null; ////选中后的事件
};

module.exports = NodeModel;

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang on 2016-02-24.
 * 页签数据模型
 */
var TabModel = function TabModel(title) {
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var active = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var iconCls = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, TabModel);

    this.title = title;
    this.url = url;
    this.active = active;
    this.content = content;
    this.iconCls = null;
    function uuid() {
        //生成uuid
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
    this.uuid = uuid(); //生成一个唯一标识。只读属性
    this.parentuuid = null; //父标签页的唯一标识
};

module.exports = TabModel;

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//create by wangzy
//date:2016-04-05后开始独立改造
//标签页
var React = __webpack_require__(1);
var addRipple = __webpack_require__(58);
var MenuTab = React.createClass({
    displayName: "MenuTab",

    mixins: [addRipple],
    propTypes: {
        index: React.PropTypes.number.isRequired, //在父组件中的序号，用于关闭
        title: React.PropTypes.string.isRequired, //标题
        iconCls: React.PropTypes.string, //图标
        url: React.PropTypes.string, //子页面地址
        active: React.PropTypes.bool, //是否为激活状态
        clickHandler: React.PropTypes.func.isRequired, //激活后的回调事件,
        closeHandler: React.PropTypes.func.isRequired, //页面关闭事件
        hide: React.PropTypes.bool //是否隐藏,由于过多导致的这个属性

    },
    getDefaultProps: function getDefaultProps() {
        return {
            active: false,
            iconCls: null,
            hide: false
        };
    },
    getInitialState: function getInitialState() {
        return {
            active: this.props.active,
            hide: this.props.hide
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var props = _extends({}, nextProps);
        this.setState(props);
    },

    clickHandler: function clickHandler(event) {
        this.rippleHandler(event);
        if (event.target.nodeName == "A" || event.target.className == "text" || event.target.className == "icon") {
            this.props.clickHandler(this.props.index);
        }
    },
    closeHandler: function closeHandler(event) {
        if (this.props.closeHandler) {
            this.props.closeHandler(this.props.index);
        }
    },
    render: function render() {
        return React.createElement(
            "li",
            { className: this.state.active ? "active" : "", style: { display: this.state.hide ? "none" : "inline-block" }, title: "\u53CC\u51FB\u53EF\u4EE5\u5173\u95ED" },
            React.createElement(
                "a",
                { onDoubleClick: this.closeHandler, onClick: this.clickHandler },
                React.createElement("div", { className: "icon " + this.props.iconCls, style: { width: this.props.iconCls == null ? 5 : null } }),
                React.createElement("div", { className: this.props.title == "首页" ? "" : "closeicon icon-close", onClick: this.closeHandler }),
                React.createElement(
                    "div",
                    { className: "text", title: this.props.title },
                    this.props.title
                ),
                React.createElement("div", { className: "split" })
            )
        );
    }
});
module.exports = MenuTab;

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-04-05后开始独立改造
//标签页
var React = __webpack_require__(1);
var TabSection = React.createClass({
    displayName: "TabSection",

    propTypes: {
        url: React.PropTypes.string,
        active: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            active: false
        };
    },
    getInitialState: function getInitialState() {
        var height = document.documentElement.clientHeight - 80;
        return {
            bodyHeight: height
        };
    },
    // componentWillReceiveProps(nextProps) {
    //     this.setState(nextProps);
    // },
    componentDidMount: function componentDidMount() {},

    render: function render() {
        if (this.props.url.indexOf("pendingOrder") > -1) {
            console.log("pendingOrder");
        }
        return React.createElement(
            "section",
            { ref: "tabsection", style: { height: this.state.bodyHeight }, className: this.props.active == true ? "checkedsection" : "tabsection" },
            React.createElement("iframe", { src: this.props.url, style: { height: this.state.bodyHeight } })
        );
    }
});
module.exports = TabSection;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*create by wangzy
 //date:2016-03-02后开始a独立框架改造
 //标签页组
 */
__webpack_require__(316);
__webpack_require__(144);
var React = __webpack_require__(1);
var Tab = __webpack_require__(279);
var TabSection = __webpack_require__(280);
var LinkButton = __webpack_require__(26);
var unit = __webpack_require__(5);

var MenuTabs = function (_React$Component) {
    _inherits(MenuTabs, _React$Component);

    function MenuTabs(props) {
        _classCallCheck(this, MenuTabs);

        var _this = _possibleConstructorReturn(this, (MenuTabs.__proto__ || Object.getPrototypeOf(MenuTabs)).call(this, props));

        _this.menuHandler = _this.menuHandler.bind(_this);
        _this.homeHandler = _this.homeHandler.bind(_this);
        _this.userHandler = _this.userHandler.bind(_this);
        _this.tabClickHandler = _this.tabClickHandler.bind(_this);
        _this.tabCloseHandler = _this.tabCloseHandler.bind(_this);
        _this.leftClickHandler = _this.leftClickHandler.bind(_this);
        _this.rightClickHandler = _this.rightClickHandler.bind(_this);

        //复制一份，当菜单关闭时用于比较显示的位置，不能直接复制给状态值，这样会导致不停的刷新
        _this.oldTabsLength = _this.props.tabs.length;
        var resultWidth = _this.setDeWidth();

        var rightIndex = 0; //右边下标
        if (_this.props.tabs instanceof Array && _this.props.tabs.length > 0) {
            if (_this.props.tabs.length < resultWidth.availNum) {
                rightIndex = _this.props.tabs.length - 1;
            } else {
                rightIndex = resultWidth.availNum - 1;
            }
        }

        _this.state = {
            tabs: _this.props.tabs,
            homeActive: -1, //主页是否处于激活状态
            menuVisible: false, //
            leftIndex: 0, //可见的第一个下标
            rightIndex: rightIndex, //可见的最后一个下标
            availWidth: resultWidth.availWidth, //可以宽度
            availNum: resultWidth.availNum //可用个数
        };
        return _this;
    }

    _createClass(MenuTabs, [{
        key: "setDeWidth",
        value: function setDeWidth() {
            //设置可以用宽度与可用个数
            var detractWidth = 0; //被减去的宽度,
            if (this.props.menuHandler) {
                //是否有菜单按钮
                detractWidth += 40;
            }
            if (this.props.homeUrl) {
                //是否有主页按钮
                detractWidth += 40;
            }
            if (this.props.userComponent) {
                //是否自定义用户信息
                detractWidth += 300;
            } else if (this.props.userHandler) {
                //是否有用户按钮
                detractWidth += 40;
            }
            var availWidth = document.body.getBoundingClientRect().width - detractWidth;
            var availNum = parseInt(availWidth / this.props.cellWidth);
            return {
                availWidth: availWidth, //可用宽度
                availNum: availNum //可用个数
            };
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                tabs: nextProps.tabs,
                homeActive: nextProps.tabs && nextProps.tabs.length > 0 ? false : true, //判断主页是否激活
                menuVisible: nextProps.menuVisible //菜单按钮是否打开
            });
        }
    }, {
        key: "menuHandler",
        value: function menuHandler() {
            //显示/隐藏菜单的事件
            this.setState({
                menuVisible: !this.state.menuVisible
            });
            this.props.menuHandler(!this.state.menuVisible); //回调父组件
        }
    }, {
        key: "userHandler",
        value: function userHandler() {
            //用户中心单击事件
            this.props.userComponent ? this.props.userHandler ? this.props.userHandler() : void 0 : void 0; //如果自定义了组件，不处理
        }
    }, {
        key: "homeHandler",
        value: function homeHandler() {
            //主页的单击事件
            this.setState({
                homeActive: true, //激活主页
                tabs: this.state.tabs.map(function (item, index) {
                    item.active = false;return item;
                })
            });
        }
    }, {
        key: "tabClickHandler",
        value: function tabClickHandler(index) {
            //页签单击事件
            this.setState({
                tabs: this.state.tabs.map(function (item, itemIndex) {
                    return index == itemIndex ? function () {
                        item.active = true;return item;
                    }() : function () {
                        item.active = false;return item;
                    }();
                }),
                homeActive: false
            });
        }
    }, {
        key: "tabCloseHandler",
        value: function tabCloseHandler(index) {

            var newTabs = this.state.tabs;
            var parentuuid = newTabs[index].parentuuid;
            var parentIndex = null; //父页面的下标
            for (var i = 0; i < newTabs.length; i++) {
                if (newTabs[i].uuid == parentuuid) {
                    parentIndex = i;
                    break;
                }
            }
            if (newTabs[index].active == true) {
                //删除tab为激活的tab
                if (parentIndex != null) {
                    //存在父页面，父页面激活
                    newTabs[parentIndex].active = true;
                } else {
                    //不存在父页面，激活临近页面
                    if (index < newTabs.length - 1) {
                        //不是最后一个，下一个激活
                        newTabs[index + 1].active = true;
                    } else {
                        //最后一个，上一个激活
                        if (index != 0) {
                            newTabs[index - 1].active = true;
                        } else {}
                    }
                }
            }
            newTabs.splice(index, 1); //删除

            this.setState({
                tabs: newTabs,

                homeActive: newTabs.length == 0 ? true : false
            });
            if (this.props.tabNumChangeHandler) {
                this.props.tabNumChangeHandler(newTabs); //返回给你父组组件更新
            }
        }
    }, {
        key: "leftClickHandler",
        value: function leftClickHandler() {

            if (this.state.leftIndex > 0) {
                this.setState({
                    leftIndex: this.state.leftIndex - 1,
                    rightIndex: this.state.rightIndex - 1
                });
            }
        }
    }, {
        key: "rightClickHandler",
        value: function rightClickHandler() {
            if (this.state.rightIndex < this.state.tabs.length - 1) {
                this.setState({
                    leftIndex: this.state.leftIndex + 1,
                    rightIndex: this.state.rightIndex + 1
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var tabobj = [];
            var sectionobj = [];
            this.state.tabs.map(function (child, index) {
                if (child.active == true) {
                    //保存当前激活标签uuid，用于子标签中打开新标签时设置其父标签
                    window.localStorage.setItem("alog_currentTabUUID", child.uuid); //保存当前激活节点，用于新建tab
                    if (child.parentuuid != null) {
                        //记录当前节点的父节点，用于关闭时更新父tab
                        var parentTabUUID = window.localStorage.getItem("parentTabUUID");
                        if (parentTabUUID == null) {
                            parentTabUUID = "";
                        };
                        parentTabUUID += child.uuid + "$" + child.parentuuid; //);//保存当前激活节点的uuid及父节点的uuid,用于关闭tab时刷新父节点,
                        window.localStorage.setItem("parentTabUUID", parentTabUUID);
                    }
                }
                tabobj.push(React.createElement(Tab, { key: "tab" + index, onContextMenu: _this2.headerContextMenuHandler, index: index, title: child.title, iconCls: child.iconCls,
                    active: child.active, clickHandler: _this2.tabclickHandler,
                    closeHandler: _this2.tabCloseHandler, hide: index >= _this2.state.leftIndex && index <= _this2.state.rightIndex ? false : true }));
                sectionobj.push(React.createElement(TabSection, { key: "tabsection" + index, url: child.url,
                    active: _this2.state.homeActive ? false : child.active,
                    content: child.content }));
            });

            if (this.props.homeUrl) {
                //如果有主页的话
                tabobj.unshift(React.createElement(Tab, { key: "tab", title: this.props.homeTitle, index: -1,
                    active: this.state.homeActive ? true : false, clickHandler: this.homeHandler,
                    closeHandler: this.tabCloseHandler }));
                sectionobj.unshift(React.createElement(TabSection, { key: "homesection", url: this.props.homeUrl,
                    active: this.state.homeActive ? true : false }));
            }

            return React.createElement(
                "div",
                { className: "wasabi-nav-container" },
                React.createElement(
                    "ul",
                    { className: " wasabi-nav-tabs", ref: "menutab" },
                    React.createElement("li", { className: "tabmenu " + (this.state.menuVisible ? "close" : ""), style: { display: this.props.menuHandler ? "inline-block" : "none" }, onClick: this.menuHandler }),
                    React.createElement(
                        "li",
                        { className: "tabhome " + (this.state.homeActive ? "active" : ""), style: { display: this.props.homeUrl ? "inline-block" : "none" }, onClick: this.homeHandler },
                        React.createElement("div", { className: "split" })
                    ),
                    React.createElement(
                        "li",
                        { className: "content", style: { width: this.state.availWidth } },
                        React.createElement(
                            "ul",
                            null,
                            " ",
                            tabobj
                        ),
                        React.createElement("div", { className: "scrollbar" })
                    ),
                    React.createElement(
                        "li",
                        { style: { display: this.props.userComponent || this.props.userHandler ? "inline-block" : "none" },
                            className: this.props.userComponent ? "tabuser-control" : this.props.userHandler ? "tabuser" : "",
                            onClick: this.userHandler },
                        this.props.userComponent
                    )
                ),
                sectionobj
            );
        }
    }]);

    return MenuTabs;
}(React.Component);

MenuTabs.propTypes = {
    tabs: React.PropTypes.array, //标签页数据
    menuHandler: React.PropTypes.func, //菜单按钮的单击事件
    homeUrl: React.PropTypes.string, //主页的链接地址
    homeTitle: React.PropTypes.string, //主页的标题
    userHandler: React.PropTypes.func, //用户个人中心按钮的单击事件
    userComponent: React.PropTypes.any, //用户自定义的组件
    tabNumChangeHandler: React.PropTypes.func //标签页数据发生改变事件

};
MenuTabs.defaultProps = {
    tabs: null,
    menuHandler: null,
    homeUrl: null,
    homeTitle: "我的桌面", //我的桌面
    userHandler: null,
    userComponent: null, //用户自定义组件
    cellWidth: 121, //单元格默认宽度
    tabNumChangeHandler: null //标签页数据发生改变事件
};
;
module.exports = MenuTabs;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//create by wangzy
//date:2016-02-18
//标签页组
__webpack_require__(320);
var React = __webpack_require__(1);
var addRipple = __webpack_require__(58);
var Tabs = React.createClass({
    displayName: "Tabs",

    mixins: [addRipple],
    propTypes: {
        tabs: React.PropTypes.array.isRequired,
        theme: React.PropTypes.oneOf([//主题
        "primary", "default", "green"])
    },
    getDefaultProps: function getDefaultProps() {
        return {
            tabs: [],
            theme: "default"
        };
    },
    getInitialState: function getInitialState() {
        //这里似乎无法复制，因为content属性是jsx对象，但似乎不影响使用
        return {
            tabs: this.props.tabs
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            tabs: nextProps.tabs
        });
    },
    tabClickHandler: function tabClickHandler(index, event) {

        this.rippleHandler(event);
        //页签单击事件
        var newTabs = this.state.tabs;
        for (var i = 0; i < newTabs.length; i++) {
            if (i == index) {
                newTabs[index].active = true;
            } else {
                newTabs[i].active = false;
            }
        }
        this.setState({ tabs: newTabs });
    },
    render: function render() {
        var _this = this;

        return React.createElement(
            "div",
            { className: "wasabi-tabs", style: this.props.style },
            React.createElement(
                "div",
                null,
                this.state.tabs.map(function (child, i) {
                    return React.createElement(
                        "a",
                        { key: i, href: "javascript:void(0);", onClick: _this.tabClickHandler.bind(_this, i), className: "wasabi-tab " + _this.props.theme + " " + (child.active == true ? "active " : "") },
                        child.title
                    );
                })
            ),
            React.createElement(
                "div",
                { className: "section " + this.props.theme },
                this.state.tabs.map(function (child, i) {
                    return React.createElement(
                        "div",
                        { key: i, className: child.active == true ? "active" : "" },
                        child.content
                    );
                })
            )
        );
    }
});
module.exports = Tabs;

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//create by wangzy
//date 2016-07-27
//desc 物流跟踪信息

var React = __webpack_require__(1);
__webpack_require__(322);

var Track = function (_React$Component) {
    _inherits(Track, _React$Component);

    function Track(props) {
        _classCallCheck(this, Track);

        var _this = _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).call(this, props));

        _this.state = {
            model: _this.props.model,
            expressName: _this.props.expressName,
            expressId: _this.props.expressId
        };
        return _this;
    }

    _createClass(Track, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                model: nextProps.model,
                expressName: nextProps.expressName,
                expressId: nextProps.expressId
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.model instanceof Array) {
                return React.createElement(
                    "div",
                    { className: "wasabi-track" },
                    React.createElement(
                        "div",
                        { className: "express" },
                        "  ",
                        React.createElement(
                            "div",
                            { className: "expressName" },
                            "快递公司:   " + this.state.expressName
                        ),
                        React.createElement(
                            "div",
                            { className: "expressId" },
                            "快递单号:  " + this.state.expressId
                        )
                    ),
                    React.createElement(
                        "ul",
                        null,
                        this.state.model.map(function (child, index) {
                            return React.createElement(
                                "li",
                                { key: index },
                                React.createElement(
                                    "div",
                                    { className: "track-time" },
                                    child.time
                                ),
                                React.createElement(
                                    "div",
                                    { className: "track-info" },
                                    child.info
                                )
                            );
                        })
                    )
                );
            } else {
                return null;
            }
        }
    }]);

    return Track;
}(React.Component);

Track.propTypes = {
    model: React.PropTypes.array, //跟踪信息
    expressName: React.PropTypes.string, //快递公司名称
    exrepssId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]) //快递单号


};
Track.defaultProps = {
    model: null,
    expressName: null,
    expressId: null

};

module.exports = Track;

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var Button = __webpack_require__(10);
__webpack_require__(317);
var MessageView = React.createClass({
    displayName: "MessageView",

    propTypes: {
        type: React.PropTypes.oneOf(["alert", "info", "success", "error", "confirm"]),
        msg: React.PropTypes.string.isRequired, //消息
        timeout: React.PropTypes.number, //自动消失时间
        cancelHandler: React.PropTypes.func, //取消事件
        OKHandler: React.PropTypes.func //确定事件

    },
    getDefaultProps: function getDefaultProps() {
        return {
            type: "alert",
            msg: "",
            timeout: 2000,
            showOK: true,
            showCancel: true
        };
    },
    getInitialState: function getInitialState() {
        return {
            opacity: 1, //透明度
            visible: true //可见性
        };
    },
    componentDidMount: function componentDidMount() {
        this.onmouse = false; ////初始化
        if (this.props.type == "confirm" || this.props.type == "alert") {} else {
            this.timeOutHandler(); //设置定时器
        }
    },
    OKHandler: function OKHandler() {
        this.setState({
            visible: false
        });
        if (this.props.OKHandler != null) {
            this.props.OKHandler();
        }
    },
    cancelHandler: function cancelHandler() {
        this.setState({
            visible: false
        });
        if (this.props.cancelHandler != null) {
            this.props.cancelHandler();
        }
    },
    onMouseOver: function onMouseOver() {

        //先清空所有定时器
        this.onmouse = true; //标记属性在上面
        for (var index = 0; index < this.timeoutArray.length; index++) {
            clearTimeout(this.timeoutArray[index]); //清除定时器
        }

        this.setState({
            opacity: 1
        });
    },
    onMouseOut: function onMouseOut() {
        this.onmouse = false; //标记属性在上面

        this.timeOutHandler(); //设置定时器
    },
    timeOutHandler: function timeOutHandler() {
        var _this = this;

        this.timeoutArray = [];
        this.timeoutArray.push(setTimeout(function () {
            if (_this.onmouse == false) {
                _this.setState({
                    opacity: 0.7
                });
            }
        }, 1000));
        this.timeoutArray.push(setTimeout(function () {
            if (_this.onmouse == false) {
                _this.setState({

                    visible: false
                });
            }
        }, this.props.timeout * 2));
    },

    renderInfo: function renderInfo() {
        return React.createElement(
            "div",
            { onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, className: "wasabi-message " + this.props.type,
                style: { display: this.state.visible ? "inline-block" : "none", opacity: this.state.opacity, transition: "opacity " + (this.props.timeout / 1000).toString() + "s" } },
            React.createElement(
                "div",
                { className: "notice" },
                this.props.msg
            )
        );
    },

    renderAlert: function renderAlert() {
        return React.createElement(
            "div",
            { className: "wasabi-confirm", style: { display: this.state.visible ? "inline-block" : "none" } },
            React.createElement(
                "div",
                { className: "message" },
                this.props.msg == null || this.props.msg == "" ? "友情提示?" : this.props.msg
            ),
            React.createElement(
                "div",
                { className: "buttons" },
                React.createElement(Button, { theme: "green", name: "ok", title: "\u786E\u5B9A", onClick: this.cancelHandler })
            )
        );
    },
    renderConfirm: function renderConfirm() {
        return React.createElement(
            "div",
            { className: "wasabi-confirm", style: { display: this.state.visible ? "inline-block" : "none" } },
            React.createElement(
                "div",
                { className: "message" },
                this.props.msg == null || this.props.msg == "" ? "确定删除这条信息吗?" : this.props.msg
            ),
            React.createElement(
                "div",
                { className: "buttons" },
                React.createElement(Button, { theme: "green", name: "ok", title: "\u786E\u5B9A", onClick: this.OKHandler }),
                React.createElement(Button, { theme: "cancel", name: "cancel", title: "\u53D6\u6D88", onClick: this.cancelHandler })
            )
        );
    },
    render: function render() {
        switch (this.props.type) {
            case "info":
                return this.renderInfo();
            case "success":
                return this.renderInfo();
            case "error":
                return this.renderInfo();
            case "alert":
                return this.renderAlert();
            case "confirm":
                return this.renderConfirm();
        }
        return null;
    }
});
module.exports = MessageView;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by 12295 on 2016/10/21.
 */
__webpack_require__(323);
var React = __webpack_require__(1);
var Progress = React.createClass({
    displayName: 'Progress',

    propTypes: _defineProperty({
        width: React.PropTypes.number, //宽度（线性进步条的宽度   环形进度条的大小-宽高相等）
        percent: React.PropTypes.number, //进度条的百分数
        type: React.PropTypes.oneOf(['line', 'circle']), //进度条的类型
        height: React.PropTypes.number, //高度（线性进度条的高度）
        status: React.PropTypes.oneOf(['', 'active', 'exception']) }, 'percent', function percent(props, propName, componentName) {
        //percent  的范围为0-100的正数
        if (!/^(\d{1,2}(\.\d+)?|100|NA)$/.test(props[propName])) {
            return new Error('Invalid prop\'' + propName + '\'supplied to' + '\'' + componentName + '\'.validation failed');
        }
    }),
    getDefaultProps: function getDefaultProps() {
        return {
            width: 100,
            type: 'line',
            height: 10,
            status: ''
        };
    },
    getInitialState: function getInitialState() {
        var percent = this.props.percent > 100 ? 100 : this.props.percent;
        return {
            percent: percent
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            percent: nextProps.percent > 100 ? 100 : nextProps.percent
        });
    },
    componentDidMount: function componentDidMount() {

        if (this.props.type == "circle") {
            var percent = 0;
            var timer = setInterval(function () {
                percent += 1;
                if (percent >= this.state.percent) {
                    clearInterval(timer);
                    percent = this.state.percent.toFixed(1);
                };
                if (!(percent - 100)) {
                    var percentShow = "-99.99999s";
                } else {
                    var percentShow = "-" + percent + "s";
                }
                document.getElementsByClassName("wasabi-pie")[0].style.animationDelay = percentShow;
                document.getElementsByClassName("pie-showInfo")[0].innerHTML = percent + "%";
            }.bind(this), 12);
        };
        if (this.props.type == "line" && this.props.status == "active") {
            //如果父组件的status为active   则需要执行下面代码   界面将动态加载进步条的进度
            var percent = 0;
            setInterval(function () {
                if (percent == 100) {
                    percent = 0;
                }
                percent += 1;
                document.getElementsByClassName("wasabi-percentShowActive")[0].style.width = percent + "%";
                document.getElementsByClassName("wasabi-percentShowActive")[0].style.opacity = 0.8 - percent / 100 * 0.8;
            }.bind(this), 12);
        };
    },
    showInfo: function showInfo() {
        if (this.props.status == "exception" || this.state.percent == 100) {
            return React.createElement(
                'div',
                { className: "progress-showIcon " + (this.state.percent == 100 ? "success" : ""), style: { height: this.props.height / 1.2, width: this.props.height / 1.2 } },
                React.createElement('i', { className: 'icon' })
            );
        } else {
            return React.createElement(
                'span',
                { style: { fontSize: this.props.height / 1.2 } },
                this.state.percent.toFixed(1),
                '%'
            );
        }
    },
    render: function render() {
        switch (this.props.type) {//通过父组件的type  判断需要渲染哪类进度条
            case 'line':
                //线性进步条
                var percentIsShow; //判断动态进步条层  是否显示
                percentIsShow = this.props.status == "active" ? "block" : "none";
                percentIsShow = this.state.percent == 100 ? "none" : "block";
                return React.createElement(
                    'div',
                    { className: 'wasabi-lineProgress-wrap' },
                    React.createElement(
                        'div',
                        { className: 'wasabi-lineProgress', style: { width: this.props.width, height: this.props.height } },
                        React.createElement(
                            'div',
                            { className: "wasabi-lineProgress-percentShow " + this.props.status + " " + (this.state.percent == 100 ? "success" : ""), style: { width: this.props.width * (this.state.percent / 100), height: this.props.height } },
                            React.createElement('div', { className: 'wasabi-percentShowActive', style: { height: this.props.height, display: percentIsShow } })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'wasabi-showInfo', style: { lineHeight: this.props.height + "px" } },
                        this.showInfo()
                    )
                );
                break;
            case 'circle':
                //环形进步条
                var marginLeft = -this.props.width * 0.7 / 2;
                var percent = "-" + this.state.percent + "s";
                return React.createElement(
                    'div',
                    { className: 'wasabi-pie', style: { width: this.props.width, height: this.props.width } },
                    React.createElement(
                        'div',
                        { className: 'wasabi-pie-cover', style: { marginLeft: marginLeft, marginTop: marginLeft } },
                        React.createElement('span', { style: { fontSize: this.props.width / 5 + "px", color: "#666", width: "100%" }, className: 'pie-showInfo' })
                    )
                );
                break;
            default:
                console.log("传入的type值出错");
        }
    }
});
module.exports = Progress;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
__webpack_require__(318);
var ToolTip = React.createClass({
    displayName: "ToolTip",

    propTypes: {
        theme: React.PropTypes.oneOf(["dark", "light"]), //主题
        size: React.PropTypes.oneOf(["small", "medium", "large"]), //大小
        direction: React.PropTypes.oneOf(["south", "west", "north", "east"]) //方向
    },
    getDefaultProps: function getDefaultProps() {
        return {
            theme: "dark",
            size: "medium",
            direction: "north"
        };
    },
    getInitialState: function getInitialState() {
        return {
            display: false,
            direction: this.props.direction
        };
    },
    showTipHandler: function showTipHandler() {
        this.setState({
            display: !this.state.display
        });
    },
    componentDidMount: function componentDidMount() {
        var toolTip = this.refs.tooltip;
        var target = this.refs.tipTarget;
        var tarClientRect = target.getBoundingClientRect();
        var tipWidth = toolTip.offsetWidth;
        var tarWidth = target.offsetWidth;
        var tarLeft = target.offsetLeft;
        var tipLeft = tarLeft + (tarWidth - tipWidth) / 2;

        if (tarClientRect.left + tipLeft < 0) {
            if (this.state.direction != "west") {
                tipLeft = 0;
                toolTip.style.left = tipLeft + 5 + "px";
            }
        } else if (tarClientRect.left + Math.abs((tarWidth - tipWidth) / 2) >= document.body.clientWidth) {
            if (this.state.direction != "west") {
                tipLeft = tarLeft + (tarWidth - tipWidth);
                toolTip.style.left = tipLeft + 5 + "px";
            }
        }
        //判断方向位置
    },
    mouseOutHandler: function mouseOutHandler(event) {//鼠标移开时隐藏下拉
        //var parentE=event.relatedTarget;
        //while (parentE&&parentE.parentElement&&parentE.parentElement.nodeName!="BODY")
        //{
        //    if(parentE.className=="tooltip-div")
        //    {
        //        break;
        //    }
        //    parentE=parentE.parentElement;
        //}
        //if(parentE&&parentE.className!="tooltip-div")
        //{
        //  console.log(  parentE);
        //}
        //
        //if((event.relatedTarget==undefined||event.relatedTarget==null)|| ((parentE.className!="tooltip-div")))
        //{
        //    this.setState({
        //        display:"none",
        //    });
        //}

        //this.setState({
        //    display:false
        //});
    },
    render: function render() {
        var className = this.props.theme + "-tooltip" + " " + this.props.theme + " " + this.props.size + " " + this.state.direction;

        var containerClassName = this.props.theme + "-tooltip " + this.state.direction;
        var tipBodyClassName = "tip-body " + this.props.theme + " " + this.props.size;
        return React.createElement(
            "div",
            { className: "tooltip-div", onMouseLeave: this.mouseOutHandler, style: this.props.style },
            React.createElement(
                "div",
                { ref: "tipTarget", className: "tooltip-button", onClick: this.showTipHandler },
                this.props.children
            ),
            React.createElement(
                "div",
                { ref: "tooltip", className: containerClassName, style: { visibility: this.state.display == true ? "visible" : "hidden" } },
                React.createElement(
                    "div",
                    { className: tipBodyClassName },
                    this.props.content
                )
            )
        );
    }
});
module.exports = ToolTip;

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by 42591 on 2016/10/17.
 * Tooltip提示框组件
 */
__webpack_require__(324);
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(19);
var Tooltip = React.createClass({
    displayName: "Tooltip",

    propTypes: {
        text: React.PropTypes.string.isRequired,
        tips: React.PropTypes.string.isRequired,
        position: React.PropTypes.oneOf([//提示框的位置，默认在text的下方
        'top', 'bottom']),
        theme: React.PropTypes.oneOf(['light', 'dark'])
    },
    getDefaultProps: function getDefaultProps() {
        return {
            text: '',
            tips: '',
            position: 'bottom',
            theme: 'dark'
        };
    },
    getInitialState: function getInitialState() {
        return {};
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text,
            tips: nextProps.tips,
            position: nextProps.position,
            theme: nextProps.theme
        });
    },
    render: function render() {
        return React.createElement(
            "span",
            { className: "shy_tipsWarp " + this.props.position + " " + this.props.theme },
            React.createElement(
                "span",
                { className: "shy_tipsText" },
                this.props.text
            ),
            React.createElement(
                "span",
                { className: "shy_tipsTips" },
                this.props.tips
            )
        );
    }
});
module.exports = Tooltip;

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by wangzhiyong on 2016/12/12.
 * 从rctui框架中复制过来,加以改造
 */



var dom = {
    tryParseInt: function tryParseInt(p) {
        if (!p) {
            return 0;
        }
        var pi = parseInt(p);
        return pi || 0;
    },

    isDescendant: function isDescendant(parent, child) {
        var node = child.parentNode;

        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    },

    offset: function offset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    },

    forceRedraw: function forceRedraw(el) {
        var originalDisplay = el.style.display;

        el.style.display = 'none';
        var oh = el.offsetHeight;
        el.style.display = originalDisplay;
        return oh;
    },

    withoutTransition: function withoutTransition(el, callback) {
        //turn off transition
        el.style.transition = 'none';

        callback();

        //force a redraw
        forceRedraw(el);

        //put the transition back
        el.style.transition = '';
    },

    getOuterHeight: function getOuterHeight(el) {
        var height = el.clientHeight + this.tryParseInt(el.style.borderTopWidth) + this.tryParseInt(el.style.borderBottomWidth) + this.tryParseInt(el.style.marginTop) + this.tryParseInt(el.style.marginBottom);
        return height;
    },

    getScrollTop: function getScrollTop() {
        var dd = document.documentElement;
        var scrollTop = 0;
        if (dd && dd.scrollTop) {
            scrollTop = dd.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },

    overView: function overView(el) {
        var pad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var height = window.innerHeight || document.documentElement.clientHeight;
        var bottom = el.getBoundingClientRect().bottom + pad;
        return bottom > height;
    },

    computedStyle: function computedStyle(el, attr) {
        var lineHeight;
        if (el.currentStyle) {
            lineHeight = el.currentStyle[attr];
        } else if (window.getComputedStyle) {
            lineHeight = window.getComputedStyle(el, null)[attr];
        }
        return lineHeight;
    },

    getLineHeight: function getLineHeight(origin) {
        var el = origin.cloneNode(true);
        var lineHeight = void 0;
        el.style.padding = 0;
        el.rows = 1;
        el.innerHTML = '&nbsp;';
        el.style.minHeight = 'inherit';
        origin.parentNode.appendChild(el);
        lineHeight = el.clientHeight;
        origin.parentNode.removeChild(el);

        return lineHeight;
    }

};
module.exports = dom;

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by wangzhiyong on 2016/12/12.
 * 从rctui复制，改造
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.on = on;
exports.off = off;
exports.once = once;
function on(el, type, callback) {
    if (el.addEventListener) {
        el.addEventListener(type, callback);
    } else {
        el.attachEvent('on' + type, function () {
            callback.call(el);
        });
    }
}

function off(el, type, callback) {
    if (el.removeEventListener) {
        el.removeEventListener(type, callback);
    } else {
        el.detachEvent('on' + type, callback);
    }
}

function once(el, type, callback) {
    var typeArray = type.split(' ');
    var recursiveFunction = function recursiveFunction(e) {
        e.target.removeEventListener(e.type, recursiveFunction);
        return callback(e);
    };

    for (var i = typeArray.length - 1; i >= 0; i--) {
        on(el, typeArray[i], recursiveFunction);
    }
}

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64 = {};

var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64decodechars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

base64.base64encode = function (str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64encodechars.charAt(c1 >> 2);
            out += base64encodechars.charAt((c1 & 0x3) << 4 | (c2 & 0xf0) >> 4);
            out += base64encodechars.charAt((c2 & 0xf) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64encodechars.charAt(c1 >> 2);
        out += base64encodechars.charAt((c1 & 0x3) << 4 | (c2 & 0xf0) >> 4);
        out += base64encodechars.charAt((c2 & 0xf) << 2 | (c3 & 0xc0) >> 6);
        out += base64encodechars.charAt(c3 & 0x3f);
    }
    return out;
};

base64.base64decode = function (str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;

    i = 0;
    out = "";
    while (i < len) {

        do {
            c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1) break;

        do {
            c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1) break;

        out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64decodechars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;

        out += String.fromCharCode((c2 & 0xf) << 4 | (c3 & 0x3c) >> 2);

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64decodechars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode((c3 & 0x03) << 6 | c4);
    }
    return out;
};

base64.utf16to8 = function (str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007F) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
            out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        } else {
            out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        }
    }
    return out;
};
base64.utf8to16 = function (str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
                // 0xxxxxxx  
                out += str.charAt(i - 1);
                break;
            case 12:case 13:
                // 110x xxxx　 10xx xxxx  
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
                break;
            case 14:
                // 1110 xxxx　10xx xxxx　10xx xxxx  
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                break;
        }
    }
    return out;
};

module.exports = base64;

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 Created by wangzy on 16/7/30.
*/
var fileType = {};

/*
media
 */
fileType.media = new Map();

fileType.media.set("audio/mpeg", ".mp2");
fileType.media.set("audio/mp3", ".mp3");
fileType.media.set("audio/mp4", ".mp4");
fileType.media.set("audio/mpeg", ".mpeg");
fileType.media.set("audio/mpeg", ".mpg");
fileType.media.set("application/vnd.ms-project", ".mpp");
fileType.media.set("audio/ogg", ".ogg");

/*
txt
 */

fileType.txt = new Map();
fileType.txt.set("text/rtf", ".rtf");
fileType.txt.set("text/plain", ".txt");
fileType.txt.set("text/csv", ".csv");
/*
pdf
 */
fileType.pdf = new Map();
fileType.pdf.set("application/pdf", ".pdf");
/*
html

 */
fileType.html = new Map();
fileType.html.set("application/xhtml+xml", ".xhtml");
fileType.html.set("text/xml", ".xml");
fileType.html.set("text/html", ".htm");
fileType.html.set("text/html", ".html");
fileType.html.set("text/javascript", ".js");
fileType.html.set("application/json", ".json");
fileType.html.set("text/css", ".css");
/*
excel
 */

fileType.excel = new Map();

fileType.excel.set("application/vnd.ms-excel", ".xls");
fileType.excel.set("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xlsx");
/*
 word
 */
fileType.word = new Map();
fileType.word.set("application/msword", ".doc");
fileType.word.set("application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx");

/*
 ppt
 */
fileType.ppt = new Map();

fileType.ppt.set("application/vnd.openxmlformats-officedocument.presentationml.presentation", ".pptx");
fileType.ppt.set("application/vnd.ms-powerpoint", ".ppt");

/*
压缩
 */
fileType.zip = new Map();
fileType.zip.set(".zip", "aplication/zip");
fileType.zip.set("application/x-rar", ".rar");

/*
 image
 */
fileType.image = new Map();
fileType.image.set("image/bmp", ".bmp");
fileType.image.set("image/vnd.dwg", ".dwg");
fileType.image.set("image/vnd.dxf", ".dxf");
fileType.image.set("image/gif", ".gif");
fileType.image.set("image/jp2", ".jp2");
fileType.image.set("image/jpeg", ".jpe");
fileType.image.set("image/jpeg", ".jpeg");
fileType.image.set("image/jpeg", ".jpg");
fileType.image.set("image/vnd.svf", ".svf");
fileType.image.set("image/tiff", ".tif");
fileType.image.set("image/tiff", ".tiff");
fileType.image.set("image/png", ".png");

fileType.isWord = function (type) {
    //word文件
    if (fileType.word.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isExcel = function (type) {
    //excel文件
    if (fileType.excel.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isPpt = function (type) {
    //ppt文件
    if (fileType.ppt.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isOffice = function (type) {
    //office格式文件

    if (fileType.isword(type)) {
        return false;
    } else if (fileType.isexcel(type)) {
        return false;
    } else if (fileType.isppt(type)) {
        return false;
    } else {
        return true;
    }
};
fileType.isPdf = function (type) {
    //pdf 文件
    if (fileType.pdf.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isTxt = function (type) {
    //txt 文件
    if (fileType.txt.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isHtml = function (type) {
    //html 文件
    if (html.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isImage = function (type) {
    //image 文件
    if (fileType.image.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isMedia = function (type) {
    //media 文件
    if (fileType.media.has(type)) {
        return true;
    } else {
        return false;
    }
};
fileType.isZip = function (type) {
    //压缩 文件
    if (fileType.zip.has(type)) {
        return true;
    } else {
        return false;
    }
};

fileType.getTypeMap = function (value) {
    switch (value) {
        case "word":
            return fileType.word;
        case "excel":
            return fileType.excel;
        case "ppt":
            return fileType.ppt;
        case "office":
            return fileType.office;
        case "txt":
            return fileType.txt;
        case "pdf":
            return fileType.pdf;
        case "html":
            return fileType.html;
        case "image":
            return fileType.image;
        case "media":
            return fileType.media;
        case "zip":
            return fileType.zip;
        default:
            return null;
    }
};

module.exports = fileType;

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Unit
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* waitOrder-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or waitOrder-64 encoded strings
 */

//hash md5加密
var md5 = function hex_md5(s) {
    /// <summary>
    /// hash md5加密
    /// </summary>
    /// <param name="s" type="string">字符</param>
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
};
function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}
function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
}
function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some Data
 */
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
    }return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz) {
        str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
    }return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
    }
    return str;
}

/*
 * Convert an array of little-endian words to a waitOrder-64 string
 */
function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
        }
    }
    return str;
}

module.exports = md5;

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by wangzhiyong on 16/10/5.
 */
//将参数模型中数组转换为对象

//格式化参数
var paramFormat = function paramFormat(data) {
    //将参数中的数组转为后台可识别的格式

    if (!data) {
        return data;
    } else if (typeof data === "string") {
        return data;
    } else if (data.constructor === FormData) {
        //参数为FormData,直接返回
        return data;
    } else if (data instanceof Array) {
        throw new Error("参数必须是字符,空值,对象,FormData,不可以为数组");
        return null;
    }

    data = arrayFormat(data); //将参数模型中数组转换为对象,再格式式参数
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    if (arr.length > 0) {
        return arr.join("&");
    } else {
        return null;
    }

    function arrayFormat(data) {
        var MvcParameterAdaptive = {};
        //验证是否为数组
        MvcParameterAdaptive.isArray = Function.isArray || function (o) {
            return (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && Object.prototype.toString.call(o) === "[object Array]";
        };

        //将数组转换为对象
        MvcParameterAdaptive.convertArrayToObject = function ( /*数组名*/arrName, /*待转换的数组*/array, /*转换后存放的对象，不用输入*/saveOjb) {
            var obj = saveOjb || {};

            function func(name, arr) {
                for (var i in arr) {
                    if (!MvcParameterAdaptive.isArray(arr[i]) && _typeof(arr[i]) === "object") {
                        for (var j in arr[i]) {
                            if (MvcParameterAdaptive.isArray(arr[i][j])) {
                                func(name + "[" + i + "]." + j, arr[i][j]);
                            } else if (_typeof(arr[i][j]) === "object") {
                                MvcParameterAdaptive.convertObject(name + "[" + i + "]." + j + ".", arr[i][j], obj);
                            } else {
                                obj[name + "[" + i + "]." + j] = arr[i][j];
                            }
                        }
                    } else {
                        obj[name + "[" + i + "]"] = arr[i];
                    }
                }
            }

            func(arrName, array);

            return obj;
        };

        //转换对象
        MvcParameterAdaptive.convertObject = function ( /*对象名*/objName, /*待转换的对象*/turnObj, /*转换后存放的对象，不用输入*/saveOjb) {
            var obj = saveOjb || {};

            function func(name, tobj) {
                for (var i in tobj) {
                    if (MvcParameterAdaptive.isArray(tobj[i])) {
                        MvcParameterAdaptive.convertArrayToObject(i, tobj[i], obj);
                    } else if (_typeof(tobj[i]) === "object") {
                        func(name + i + ".", tobj[i]);
                    } else {
                        obj[name + i] = tobj[i];
                    }
                }
            }

            func(objName, turnObj);
            return obj;
        };

        var arrName = ""; //参数名

        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) !== "object") throw new Error("请传入json对象");
        if (MvcParameterAdaptive.isArray(data) && !arrName) throw new Error("必须是对象,如果是数组请使用对象包裹！");

        if (MvcParameterAdaptive.isArray(data)) {
            return MvcParameterAdaptive.convertArrayToObject(arrName, data);
        }
        return MvcParameterAdaptive.convertObject("", data);
    }
};

module.exports = paramFormat;

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (typeof input === 'string') {
      this.url = input;
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split('\r\n').forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 299 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 300 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 301 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 302 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 303 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 304 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 305 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 306 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 307 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 308 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 309 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 310 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 311 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 312 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 313 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 314 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 315 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 316 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 317 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 318 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 319 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 320 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 321 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 322 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 323 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 324 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
]);
//# sourceMappingURL=common.js.map