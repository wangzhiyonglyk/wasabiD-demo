/**
 * Created by zhiyongwang on 2016-06-08.
 * 将独立于项目的公共函数分享出来
 *
 */

import api from "../../libs/api"

let baseUtil = {};

/// 获取地址栏参数的值
baseUtil.GetArgsFromHref = function (sHref, sArgName) {
    /// <summary>
    /// 获取地址栏参数的值
    /// </summary>
    /// <param name="sHref" type="string">url地址，</param>
    /// <param name="iwidth" type="int">参数名称</param>
    let args = sHref.toString().split("?");
    let retval = "";
    if (args[0] == sHref) /*参数为空*/ {
        return retval;
        /*无需做任何处理*/
    }
    let str = args[1];
    if (str.indexOf("#") > -1) {//处理锚点的问题，有可能在前面有可能在后面
        str = str.split("#");
        str = str[0].indexOf("=") > -1 ? str[0] : str[1];

    }
    args = str.toString().split("&");
    for (let i = 0; i < args.length; i++) {
        str = args[i];
        let arg = str.toString().split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == sArgName) retval = arg[1];
    }
    return retval;
}

//判断浏览器类型
baseUtil.BrowserType = function () {
    let browserType = "";
    let userAgent = navigator.userAgent.toLowerCase(); //取得浏览器的userAgent字符串
    if (userAgent.indexOf("opera") > -1) {//判断是否Opera浏览器
        browserType = "Opera"
    }
    else if (userAgent.indexOf("opr") > -1) {//新版本是这个
        browserType = "Opera";
    }
    else if (userAgent.indexOf("firefox") > -1) {//判断是否Firefox浏览器
        browserType = "Firefox";
    }
    else if (userAgent.indexOf("chrome") > -1) {//先判断是否Chrome浏览器
        browserType = "Chrome";
    }
    else if (userAgent.indexOf("safari") > -1) {//判断是否Safari浏览器
        browserType = "Safari";
    }
    else if (/msie|trident/.test(userAgent)) {////判断是否IE浏览器
        browserType = baseUtil.IEType();
    }


    return browserType;
}
//判断IE类型
baseUtil.IEType = function () {
    if (navigator.userAgent.indexOf("MSIE 6.") > -1) {
        return ("IE 6");
    }
    else if (navigator.userAgent.indexOf("MSIE 7.") > -1) {
        return ("IE 7");
    }
    else if (navigator.userAgent.indexOf("MSIE 8.") > -1) {
        return ("IE 8");
    }
    else if (navigator.userAgent.indexOf("MSIE 9.") > -1) {
        return ("IE 9");
    }
    else if (navigator.userAgent.indexOf("MSIE 10.") > -1) {
        return ("IE 10");
    }
    else if (navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        return ("IE 11");
    }
}

//判断是否 iPhone / iPod /iPad
baseUtil.is_ios = function () {
    /// <summary>
    /// 判断是否 iPhone / iPod /iPad
    /// </summary>
    if ((navigator.userAgent.match(/iPhone|iPod|iPad/i))) {
        //alert('true');
        // 判断系统版本号是否大于 7
        return Boolean(navigator.userAgent.match(/OS [7-9]_\d[_\d]* like Mac OS X/i));
    } else {
        //alert('false');
        return false;
    }
}
//将数字转为英文表达格式
baseUtil.dealNumToEnglishFormat = function (num) {
    /// <summary>
    /// 将数字转为英文表达格式
    /// </summary>
    /// <param name="num" type="int">数字</param>
    if (isNaN(num)) {
        return num;
    }

    let number = num.toString();
    return number.split('').reverse().join('').replace(/(.{3})/g, '$1,').split('').reverse().join('').replace(/^,/, "");
}

// 日期格式化为字符串
baseUtil.dateformat = function (date, format) {
    /// <summary>
    /// 日期格式化为字符串
    /// </summary>
    /// <param name="date" type="date">日期</param>
    /// <param name="format" type="string">格式化字符串，"yyyy-MM-dd hh:mm:ss","yyyy-MM-dd"</param>
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
            "h+": (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12), //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return format;
}

baseUtil.log = function (text) {
    console.log(text);
};

//判断手机类型
baseUtil.phoneType = function () {
    /// <summary>
    /// 判断手机类型
    /// </summary>
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        return "iphone";
    }
    else if (isAndroid) {
        return "android";
    }
    else {
        return "undefined";
    }
}

/// 字符转日期
baseUtil.stringToDate = function (strDate) {
    /// <summary>
    /// 字符转日期
    /// </summary>
    /// <param name="strDate" type="string">日期字符格式</param>
    let date = new Date(Date.parse(strDate.replace(/-/g, "/"))); //转换成Date();
    return date;
}

baseUtil.cookies = {
    /// <summary>
    /// cookies设置
    /// </summary>
    set: function (key, val) {
        let Days = 7;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + val + ";path=/;expires=" + exp.toGMTString();
    },
    get: function (key) {
        let arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        else
            return null;
    },
    del: function (key) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.get(key);
        if (cval != null)
            document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
/// 除去两端窗口
baseUtil.trim = function (str) {
    /// <summary>
    /// 除去两端窗口
    /// </summary>
    /// <param name="str" type="string">str</param>
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*
 *ie兼容placeholder
 */
baseUtil.placeHolderIE8 = function () {
    if (!("placeholder" in document.createElement("input"))) {
        let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            let curInput = inputs[i];
            let placeholder = curInput.getAttribute("placeholder");
            if (curInput.getAttribute("type") != "text" || baseUtil.trim(placeholder) == "") return;

            curInput.value = placeholder;

            curInput.onfocus = function () {
                if (this.value = placeholder) {
                    this.value = "";
                }
            }

            curInput.onblur = function () {
                if (baseUtil.trim(this.value) == "") {
                    this.value = placeholder;
                }
            }
        }
    }
}
//向后台请求数据
baseUtil.fetch = {
    /// <summary>
    /// 向后台请求数据,todo 后期要全部干掉
    /// </summary>
    get: function (fetchmodel) {

        api.ajax(fetchmodel);

    },
    post: function (fetchmodel) {

        api.ajax(fetchmodel);
    }

}

baseUtil.showError = function (msg) {
    if (!!document.getElementById("alog-error")) {
        //存在
        let child = document.getElementById("alog-error");
        document.body.removeChild(child);


    }
    let error = document.createElement("div");
    error.id = "alog-error";
    error.title = "";
    error.style.position = "absolute";
    error.style.zIndex = 9;
    error.innerHTML = '<div class="wasabi-message error"   >'
        + '<div class="notice">' + msg + '</div>'
        + ' </div>';
    error.onmousemove = onMouseOver;
    error.onmouseout = onMosueOut;
    document.body.appendChild(error);
    timeoutHandler();//开始执行
    function onMosueOut() {
        let child = document.getElementById("alog-error");
        child.title = "";
        timeoutHandler();
    }
    function onMouseOver() {
        let child = document.getElementById("alog-error");
        child.title = "0";
        child.style.opacity = 1;
    }

    function timeoutHandler() {
        setTimeout(() => {
            let child = document.getElementById("alog-error");

            if (child && child.title == "") {
                child.style.opacity = 0.7;
                child.style.transition = "opacity 2s";
            }
        }, 1000);
        setTimeout(() => {
            let child = document.getElementById("alog-error");
            if (child && child.title == "") {

                document.body.removeChild(child);

            }
        }, 4000
        );
    }

}
/// 把对象复制,返回
baseUtil.clone = function (obj) {
    /// <summary>
    /// 把对象复制,返回
    /// </summary>
    /// <param name="obj" type="object">源对象</param>
    let o;
    switch (typeof obj) {
        case 'undefined': break;
        case 'string': o = obj + ''; break;
        case 'number': o = obj - 0; break;
        case 'boolean': o = obj; break;
        case 'object':
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {

                    o = [];
                    //o= obj.slice(0)， 注意了这里不能直接使用这个复制，如果数组中的元素为对象，复制是不成功的
                    for (let i = 0; i < obj.length; i++) {
                        o.push(baseUtil.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (let k in obj) {
                        o[k] = baseUtil.clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
}
//获取真正的数据源
baseUtil.getSource = function (data, source) {
    /// <summary>
    /// 获取真正的数据源
    /// </summary>
    /// <param name="Data" type="object">Data</param>
    /// <param name="source" type="string">source</param>
    let sourceArr = new Array();
    let returnData = data;

    if (source.indexOf(".") > -1) {
        sourceArr = source.split(".");
    }
    else {
        sourceArr.push(source);
    }
    let i = 0;
    try {
        while (i < sourceArr.length) {
            returnData = returnData[sourceArr[i]];
            if (returnData == null) {
                return null;//直接返回
            }
            i++;

        }
    }
    catch (e) {
        return null;
    }

    return returnData;
}
//判断是否空对象
baseUtil.isEmptyObject = function (obj) {
    let isempty = true;
    if (typeof obj === "object") {
        for (let o in obj) {
            isempty = false;
        }
    }
    return isempty;

}
baseUtil.download = function (url, title) {
    let extend = url.substr(url.lastIndexOf("."));
    title = title || baseUtil.dateformat(new Date(), "yyyy-MM-dd HH:mm:ss");
    let downloadA = document.createElement("a");
    downloadA.href = url;
    downloadA.download = title + extend;
    downloadA.click();
    window.URL.revokeObjectURL(downloadA.href);//释放
}
//错误信息
baseUtil.Error = {
    HttpError: "错误代码:001,网络地址无法请求",
    ServiceError: "错误代码:002,后台服务器响应失败",
    HandlerError: "后台业务程序处理错误"
}
/**
 * 将二维json数据转树型结构
 */
baseUtil.toTreeData = function (data) {
    let pos = {};
    let tree = [];
    let count = 0;
    let pId = "";//一级父节点pid值
    let ids= "";//所有id值
    for (let i = 0; i < data.length; i++) {
        ids+=","+data[i].id+","
    }
  
    for (let i = 0; i < data.length; i++) {
        if (ids.indexOf(","+data[i].pId+",") <= -1) {//属于一级节点的pid值
            pId +=","+ data[i].pId+",";
        }
    }
    let index = 0;
    while (data.length != 0 && count < 200000) {
        count++;
        if (pId.indexOf(","+data[index].pId+",") > -1) {
            tree.push({
                ...data[index],
                id: data[index].id,
                text: data[index].text||data[index].name,
                children: [],
                
            });
            pos[data[index].id] = [tree.length - 1];
            data.splice(index, 1);
            index--;
        } else {
            let posArr = pos[data[index].pId];
            if (posArr != undefined) {

                let obj = tree[posArr[0]];
                for (let j = 1; j < posArr.length; j++) {
                    obj = obj.children[posArr[j]];
                }

                obj.children.push({
                    ...data[index],
                    id: data[index].id,
                    text: data[index].text||data[index].name,
                    children: [],
                  
                });
                pos[data[index].id] = posArr.concat([obj.children.length - 1]);
                data.splice(index, 1);
                index--;
            }
        }
        index++;
        if (index > data.length - 1) {
            index = 0;
        }
    }
    if(data.length>0){
        console.error("数据量过大，请使用异步请求");
    }
    return tree;

}
/**
 * 生成uuid
 */
baseUtil.uuid = function () {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
}

import base64 from "./base64.js";
baseUtil.base64 = base64;
import md5 from "./md5.js";

baseUtil.md5 = md5;


export default baseUtil;