/**
 * create by wangzhiyonglyk
 * date:2023-04-14
 * 功能性函数，独立出来
 */

let func = {};

/**
 * 获取地址栏参数的值
 * @param {*} sArgName 参数名
 * @returns
 */
func.getArgsFromHref = function (sArgName = "", sHref) {
  sHref = sHref || window.location.href;
  let args = sHref.toString().split("?");
  let retval = "";
  if (args[0] == sHref) {
    /*参数为空*/ return retval;
    /*无需做任何处理*/
  }
  let str = args[1];
  if (str.indexOf("#") > -1) {
    //处理锚点的问题，有可能在前面有可能在后面
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
};

/**
 *
 * 判断浏览器类型（mac上测试）
 * @returns
 */
func.browserType = function () {
  let userAgent = userAgent; //取得浏览器的userAgent字符串
  let isOpera =
    userAgent.indexOf("Opera") > -1 ||
    (userAgent.indexOf("OPR") > -1 &&
      userAgent.indexOf("Chrome") > -1 &&
      userAgent.indexOf("Safari") > -1); //判断是否Opera(新旧)浏览器
  let isIE =
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera; //判断是否IE浏览器
  let isEdge =
    userAgent.indexOf("Chrome") > -1 &&
    userAgent.indexOf("Safari") > -1 &&
    userAgent.indexOf("Edg") > -1; //判断是否Edge浏览器
  let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  let isSafari =
    userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器
  let isChrome =
    userAgent.indexOf("Chrome") > -1 &&
    userAgent.indexOf("Safari") > -1 &&
    userAgent.indexOf("OPR") === -1 &&
    userAgent.indexOf("Edg") === -1; //判断Chrome浏览器

  //如果是IE继续判断IE版本
  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion === 7) {
      return "IE7";
    } else if (fIEVersion === 8) {
      return "IE8";
    } else if (fIEVersion === 9) {
      return "IE9";
    } else if (fIEVersion === 10) {
      return "IE10";
    } else if (fIEVersion === 11) {
      return "IE11";
    } else {
      return "IE6";
    } //IE版本过低
  }

  if (isFF) {
    return "Firefox";
  }

  if (isOpera) {
    return "Opera";
  }

  if (isSafari) {
    return "Safari";
  }

  if (isEdge) {
    return "Edge";
  }
  if (isChrome) {
    return "Chrome";
  }
  return browserType;
};
/**
 * 判断是移动端还是pc端
 */
func.isMobile = function () {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  } catch (e) {}
  return false;
};

/**
 * cookie操作
 */
func.cookies = {
  set: function (key, val, days = 7) {
    let exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + val + ";path=/;expires=" + exp.toGMTString();
  },
  get: function (key) {
    let arr,
      reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return arr[2];
    else return null;
  },
  del: function (key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.get(key);
    if (cval !== null)
      document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
  },
};

/**
 * 下载
 * @param {*} blob blob
 * @param {*} title 标题
 * @param {*} extend 扩展名
 */
func.download = function (blob, title, extend = ".xls") {
  if (typeof blob === "object" && blob instanceof Blob) {
    blob = URL.createObjectURL(blob); // 创建blob地址
  } else {
    extend = blob.substr(blob.lastIndexOf("."));
  }
  title = title || func.dateformat(new Date(), "yyyy-MM-dd HH:mm:ss");
  let downloadA = document.createElement("a");
  downloadA.href = blob;
  downloadA.download = title + extend;
  downloadA.click();
  window.URL.revokeObjectURL(downloadA.href); //释放
};

/**
 * 节流方案
 * @param {*} method 函数
 * @param {*} delay 时间差
 * @returns
 */
func.throttle = function (method, delay) {
  let timer = null;
  return function () {
    let content = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(content, args);
    }, delay);
  };
};

export default func;
