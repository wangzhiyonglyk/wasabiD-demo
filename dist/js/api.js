webpackJsonp([2],{

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 2016-09-20.
 * 后端接口对接
 * edit by wangzhiyong
 * date:2016-10-04,将ajax直接改用原生xhr
 * date;2016-10-05 将rest独立出来,将格式化参数方法独立出来
 ** date;2016-11-05 验证可行性修改
 ** date;2017-01-14 验证可行性再次修改
 * date:207-04-18 修改在IE8，与360中的bug
 * date:207-06-16 修改asnyc参数的配置
 * 使用方法
 *     ajax({
       url:"http://localhost:7499/Admin/Add",
        type:"post",
        data:{name:"test",password:"1111",nickname:"dddd"},
        success:function (result) {
        console.log(result);
        },
    })
 */
var paramFormat = __webpack_require__(76);
var httpCode = __webpack_require__(115);
//普通ajax
var ajax = function ajax(settings) {
  var xhrRequest = createXHR();
  if (!validate()) {
    //验证不通过
    return;
  }

  if (xhrParamsSet()) {
    //设置参数

    //开始发送数据
    if (settings.data) {
      if (settings.type.toLowerCase() == "get") {
        xhrRequest.send();
      } else {
        //post
        xhrRequest.send(settings.data);
      }
    } else {
      xhrRequest.send();
    }
  } else {}

  /**
   * 创建xhr对象
   * @returns {*}
   */
  function createXHR() {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
  }

  /**
   * 验证
   * @returns {boolean}
   */
  function validate() {
    if (!xhrRequest) {
      throw new Error("您的浏览器不支持ajax请求");
      return false;
    }
    if (!settings || !settings instanceof Object) {
      throw new Error("ajax配置无效,不能为空,必须为对象");
      return false;
    }
    if (settings.data instanceof Array) {
      throw new Error("ajax的data参数必须是字符,空值,对象,FormData,不可以为数组");
      return false;
    }
    if (!settings.dataType) {
      //回传的数据格式,默认为json
      settings.dataType = "json";
    }
    if (!settings.type) {
      //请求方式
      settings.type = "GET";
    }
    if (settings.async !== false) {
      settings.async = true; //默认为异步的
    }
    if (settings.url == null || settings.url == undefined || settings.url === "") {
      throw new Error("请求地址不能为空");
      return false;
    }
    if (!settings.success) {
      throw new Error("ajax的success[请求成功函数]不能为空");
      return false;
    } else if (typeof settings.success !== "function") {
      throw new Error("ajax的success[请求成功函数]必须为函数");
      return false;
    }

    if (settings.error && typeof settings.error !== "function") {
      throw new Error("ajax的error[请求失败函数]必须为函数");
      return false;
    }
    if (settings.progress && typeof settings.progress !== "function") {
      throw new Error("ajax的progress[上传进度函数]必须为函数");
      return false;
    }
    if (settings.data && settings.data.constructor === FormData) {
      //如果是FormData不进行处理，相当于jquery ajax中contentType=false,processData=false,不设置Content-Type
      settings.contentType == false;
    } else if (settings.contentType == false) {//为false，是正确值

    } else if (settings.contentType == null || settings.contentType == undefined || settings.contentType == "") {
      //请求的数据格式,默认值
      //如果为false，是正确值
      settings.contentType = "application/x-www-form-urlencoded"; //默认表单提交
    }

    //格式化中已经处理了FormData的情况
    settings.data = paramFormat(settings.data);

    if (settings.type.toLowerCase() == "get") {
      if (settings.data && settings.url.indexOf("?") <= -1) {
        settings.url += "?";
      }
      if (settings.data && settings.url.indexOf("?") > -1 && settings.url.indexOf("?") == settings.url.length - 1) {
        settings.url += settings.data;
      } else if (settings.data && settings.url.indexOf("?") > -1 && settings.url.indexOf("?") < settings.url.length - 1) {
        settings.url += "&" + settings.data;
      }
    }

    return true;
  }

  /**
   * xhr参数设置
   */
  function xhrParamsSet() {
    try {
      xhrRequest.open(settings.type, settings.url, settings.async);
    } catch (e) {
      //说明不支持跨域
      errorHandler(xhrRequest, 803, "[IE,360]自动阻止了跨域:" + e.message);
    }

    //设置请求格式
    if (settings.contentType == false) {//为false,不设置Content-Type
    } else {
      xhrRequest.setRequestHeader("Content-Type", settings.contentType); //请求的数据格式,
    }
    //设置返回格式
    try {
      xhrRequest.responseType = settings.dataType; //回传的数据格式
    } catch (e) {
      console.log("该浏览器[IE，360]不支持responseType的设置，跳过");
    }
    try {
      xhrRequest.withCredentials = settings.cors ? true : false; //表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。
    } catch (e) {
      console.log("该浏览器[IE，360]不支持withCredentials的设置，跳过");
    }
    if (!settings.timeout) {
      //设置超时时间
      xhrRequest.timeout = settings.timeout; //超时时间
    }

    try {

      xhrRequest.addEventListener("load", load, false); ///执行成功事件
      xhrRequest.addEventListener("loadend", loadEnd, false); //执行完成事件
      xhrRequest.addEventListener("timeout", timeout, false); //超时事件
      xhrRequest.addEventListener("error", error, false); //执行错误事件
      if (typeof settings.progress === "function") {
        //没有设置时不要处理
        xhrRequest.upload.addEventListener("progress", progress, false); //上传进度
      } else {}
    } catch (e) {
      //说明不支持xhr2.0
      console.log("浏览器不支持xhr2.0，已经转为1.0");
      xhrRequest.onreadystatechange = function () {
        if (xhrRequest.readyState == 4) {
          var e = {};
          e.target = xhrRequest;
          load(e); //调用加载成功事件
        }
      };
    }
    return true;
  }

  /**
   * 上传进度事件
   * @param event
   */
  function progress(event) {
    if (event.lengthComputable) {
      var percentComplete = Math.round(event.loaded * 100 / event.total);
      if (typeof settings.progress === "function") {
        settings.progress(percentComplete); //执行上传进度事件
      }
    }
  }

  /**
   * 请求成功
   * @param event
   */
  function load(event) {
    var xhr = event.target;
    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
      //请求成功
      if (settings.dataType == "json") {
        //json格式请求
        var result = xhr.response ? xhr.response : xhr.responseText; //1.0
        if (result) {
          if (typeof result == "string") {
            //IE8.360 中没有对结果进行JSON化
            result = JSON.parse(result);
          }
          if (result.success != null && result.success != undefined) {
            //后台传了这个字段
            if (result.success) {
              if (settings.success && typeof settings.success === "function") {
                settings.success(result); //执行成功
              } else {
                throw new Error("您没的设置请求成功后的处理函数-success");
              }
            } else {
              if (result.message) {
                //有标准的错误信息
                errorHandler(result, result.errCode, result.message);
              } else {
                errorHandler(result, 801, "服务器正常响应，后台业务代码的逻辑报错");
              }
            }
          } else {
            //后台没有传这个字段
            if (settings.success && typeof settings.success === "function") {
              settings.success(result); //直接认为是成功的
            } else {
              throw new Error("您没的设置请求成功后的处理函数-success");
            }
          }
        } else {
          errorHandler(xhr, 802, "服务器返回的数据格式不正确");
        }
      } else if (settings.dataType == "blob" || settings.dataType == "arrayBuffer") {
        //二进制数据
        settings.success(xhr.response);
      } else {
        //其他格式
        try {
          settings.success(xhr.responseText);
        } catch (e) {
          //如果没有responseText对象,不能通过if判断,原因不详
          settings.success(xhr.response);
        }
      }
    } else {
      //是4xx错误时属于客户端的错误，并不属于Network error,不会触发error事件

      errorHandler(xhr, xhr.status, xhr.statusText);
    }
  }

  /**
   * 请求完成
   * @param event
   */
  //
  function loadEnd(event) {
    var xhr = event.target;
    if (typeof settings.complete === "function") {
      //设置了完成事件,
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
        //请求成功
        //304客户端已经执行了GET，但文件未变化,认为也是成功的
        settings.complete(xhr, "success");
      } else if (xhr.readyState == 4 && xhr.status == 0) {//本地响应成功，TODO 暂时不知道如何处理

      } else {
        //错误
        settings.complete(xhr, "error");
      }
    }
  }

  /**
   * 请求超时
   * @param event
   */
  function timeout(event) {
    var xhr = event.target;
    errorHandler(xhr, 802, "请求超时");
  }

  /**
   * 请求失败
   * @param event
   */
  function error(event) {
    var xhr = event.target;
    errorHandler(xhr, xhr.status, xhr.statusText);
  }

  /**
   * 通用错误处理函数
   * @param xhr
   * @param errCode
   * @param message
   */
  function errorHandler(xhr, errCode, message) {

    if (errCode >= 300 && errCode < 600) {

      console.log(errCode, httpCode[errCode.toString()]); //直接处理http错误代码
      if (typeof settings.error === "function") {
        //设置了错误事件,
        settings.error(xhr, errCode, httpCode[errCode.toString()]);
      }
    } else {
      console.log(errCode, message);
      if (typeof settings.error === "function") {
        //设置了错误事件,
        settings.error(xhr, errCode, message);
      }
    }
  }
};

module.exports = ajax;

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 17/1/15.
 * 将http请求的错误列出来
 */
var httpCode = {
  "100": "客户必须继续发出请求",
  "101": "客户要求服务器根据请求转换HTTP协议版本",
  "200": "交易成功",
  "201": "提示知道新文件的URL",
  "202": "接受和处理、但处理未完成",
  "203": "返回信息不确定或不完整",
  "204": "请求收到，但返回信息为空",
  "205": "服务器完成了请求，用户代理必须复位当前已经浏览过的文件",
  "206": "服务器已经完成了部分用户的GET请求",
  "300": "请求的资源可在多处得到",
  "301": "删除请求数据",
  "302": "在其他地址发现了请求数据",
  "303": "建议客户访问其他URL或访问方式",
  "304": "客户端已经执行了GET，但文件未变化",
  "305": "请求的资源必须从服务器指定的地址得到",
  "306": "前一版本HTTP中使用的代码，现行版本中不再使用",
  "307": "申明请求的资源临时性删除",
  "400": "错误请求，如语法错误",
  "401": "请求授权失败",
  "402": "保留有效ChargeTo头响应",
  "403": "请求不允许",
  "404": "没有发现文件、查询或URl",
  "405": "用户在Request-Line字段定义的方法不允许",
  "406": "根据用户发送的Accept拖，请求资源不可访问",
  "407": "类似401，用户必须首先在代理服务器上得到授权",
  "408": "客户端没有在用户指定的饿时间内完成请求",
  "409": "对当前资源状态，请求不能完成",
  "410": "服务器上不再有此资源且无进一步的参考地址",
  "411": "服务器拒绝用户定义的Content-Length属性请求",
  "412": "一个或多个请求头字段在当前请求中错误",
  "413": "请求的资源大于服务器允许的大小",
  "414": "请求的资源URL长于服务器允许的长度",
  "415": "请求资源不支持请求项目格式",
  "416": "请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段",
  "417": "服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求",
  "500": "服务器产生内部错误",
  "501": "服务器不支持请求的函数",
  "502": "服务器暂时不可用，有时是为了防止发生系统过载",
  "503": "服务器过载或暂停维修",
  "504": "关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长",
  "505": "服务器不支持或拒绝支请求头中指定的HTTP版本"
};

module.exports = httpCode;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by wangzhiyong on 16/10/5.
 * ajax数据模型
 */
var Model = function Model() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "GET";
    var url = arguments[1];
    var success = arguments[2];
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var error = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Model);

    this.type = type; //请求类型
    this.url = url; //请求地址
    this.data = data; //参数
    this.success = success; //成功处理函数
    this.error = error; //错误处理函数
    this.progress = null; //进度函数
    this.dataType = "json"; //返回的数据格式
    this.contentType = "application/x-www-form-urlencoded"; //请求数据格式，可以设置为false
    this.async = true; //是否异步
    this.timeout = null; //超时
};

module.exports = Model;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang
 * date:2016-10-05 将原来pc端框架中fetch查询独立出来
 * desc:fetch 查询时的数据模型
 *
 */

var FetchModel = function FetchModel(url, success) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "GET";

    _classCallCheck(this, FetchModel);

    this.url = url;
    this.data = data;
    this.success = success;
    this.error = error;
    this.type = type; //类型
    this.contentType = "application/x-www-form-urlencoded"; //请求数据格式
    this.credentials = false; //是否带上cookie
    this.promise = false; //是否返回promise对象，如果为true,则fetchapi就可以使用then来处理异步
};

module.exports = FetchModel;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by wangzhiong on 2016/11/6.
 * 单独为rest设置模型
 */

var RestModel = function RestModel(controller, success) {
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, RestModel);

    this.controller = controller; //控制器名称
    this.success = success; //成功处理函数
    this.error = error; //错误处理函数
    this.model = null; //参数
    this.id = null; //id,get与delete方法所用
    this.paramModel = null; //查询条件
    this.paramModelName = "paramModel"; //因为查询条件是数组,但回传给后台必须是对象,所以可以自定义的查询参数名称
    this.pageModel = null; //分页条件
    this.async = true; //是否异步
    this.timeout = 25000; //超时
    this.corsUrl = "/"; //超时

};

module.exports = RestModel;

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/10/5.
 * 将fetch 方法从框架独立出来
 * 2017-01-15进行修改，完善
 * 使用方法
 *
 * 1.使用promise
 *
 fetchapi({
        url: "http://localhost:7499/Admin/Add",
        type: "post",
        data: {name: "test", password: "1111", nickname: "dddd"},
        promise:true,
    }).then(function (result) {
        console.log(result);

    })

 *2.使用回调
 *
 fetchapi({
        url: "http://localhost:7499/Admin/Add",
        type: "post",
        data: {name: "test", password: "1111", nickname: "dddd"},
        success: function (result) {
            console.log(result);
        },
        error: function (errCode,message) {
            console.log(errCode,message);
        }
    })；
 */

var paramFormat = __webpack_require__(76);
var httpCode = __webpack_require__(115);
var fetchapi = function fetchapi(fetchmodel) {
    this.then = null;
    if (!fetchmodel || !fetchmodel instanceof Object) {
        throw new Error("fetchmodel配置无效,不能为空,必须为对象");
        return false;
    }
    if (!fetchmodel.success && !fetchmodel.promise) {
        throw new Error("promise属性设置false的时候,fetchmodel的success[请求成功函数]不能为空");
        return false;
    } else if (!fetchmodel.promise && typeof fetchmodel.success !== "function") {
        throw new Error("fetchmodel的success[请求成功函数]必须为函数");
        return false;
    }

    if (fetchmodel.error && typeof fetchmodel.error !== "function") {
        throw new Error("fetchmodel的error[请求失败函数]必须为函数");
        return false;
    }

    if (fetchmodel.data instanceof Array) {
        throw new Error("fetchmodel的data参数必须是字符,空值,对象,FormData,不可以为数组");
        return false;
    }
    if (fetchmodel.data.constructor === FormData) {
        //如果是FormData不进行处理，相当于jquery ajax中contentType=false,processData=false
        fetchmodel.contentType = false; //也设置为false
    } else if (fetchmodel.contentType == false) {//为false，也不处理

    } else if (fetchmodel.contentType == null || fetchmodel.contentType == undefined || fetchmodel.contentType == "") {
        //请求的数据格式,默认值

        //如果为false，是正确值
        fetchmodel.contentType = "application/x-www-form-urlencoded";
    }

    //如果是get方式，又有参数，则要将参数转换
    if (fetchmodel.type.toLowerCase() == "get") {
        //TODO 这里的代码要优化
        fetchmodel.data = paramFormat(fetchmodel.data);
        if (fetchmodel.data && fetchmodel.url.indexOf("?") <= -1) {
            fetchmodel.url += "?";
        }
        if (fetchmodel.data && fetchmodel.url.indexOf("?") > -1 && fetchmodel.url.indexOf("?") == fetchmodel.url.length - 1) {
            fetchmodel.url += fetchmodel.data;
        } else if (fetchmodel.data && fetchmodel.url.indexOf("?") > -1 && fetchmodel.url.indexOf("?") < fetchmodel.url.length - 1) {
            fetchmodel.url += "&" + fetchmodel.data;
        }
    }

    //错误处理函数
    function errorHandler(fetchmodel, errCode, message) {
        console.log(errCode, message);
        if (typeof fetchmodel.error === "function") {
            //设置了错误事件,
            fetchmodel.error(errCode, message);
        }
    }

    if (fetchmodel.promise) {
        //直接返回promise对象
        return fetch(fetchmodel.url, {
            credentials: fetchmodel.credentials ? 'include' : null, //附带cookies之类的凭证信息
            method: fetchmodel.type,
            headers: fetchmodel.contentType ? {
                "Content-Type": fetchmodel.contentType
            } : {},
            body: fetchmodel.data ? paramFormat(fetchmodel.data) : null
        });
    } else {
        try {
            fetch(fetchmodel.url, {
                credentials: fetchmodel.credentials ? 'include' : null, //附带cookies之类的凭证信息
                method: fetchmodel.type,
                headers: fetchmodel.contentType ? {
                    "Content-Type": fetchmodel.contentType
                } : {},
                body: fetchmodel.data ? paramFormat(fetchmodel.data) : null
            }).then(function (res) {
                if (res.ok) {

                    try {
                        res.json().then(function (result) {
                            if (result.success != null && result.success != undefined) {
                                //后台传了这个字段
                                if (result.success) {
                                    if (fetchmodel.success && typeof fetchmodel.success === "function") {
                                        fetchmodel.success(result); //执行成功
                                    } else {
                                        throw new Error("您没的设置请求成功后的处理函数-success");
                                    }
                                } else {
                                    if (result.message) {
                                        //有标准的错误信息
                                        errorHandler(result, result.errCode, result.message);
                                    } else {
                                        errorHandler(result, 801, "服务器正常响应，后台业务代码的逻辑报错");
                                    }
                                }
                            } else {
                                //后台没有传这个字段
                                if (fetchmodel.success && typeof fetchmodel.success === "function") {
                                    fetchmodel.success(result); //直接认为是成功的,执行成功
                                } else {
                                    throw new Error("您没的设置请求成功后的处理函数-success");
                                }
                            }
                        });
                    } catch (e) {
                        errorHandler(fetchmodel, 802, e.message);
                    }
                } else {
                    errorHandler(fetchmodel, res.status, httpCode[res.status]);
                }
            });
        } catch (e) {
            errorHandler(fetchmodel, "4xx", e.message);
        }
    }
};
module.exports = fetchapi;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/10/5.
 * 将rest独立出来
 * ** date;2016-11-05 修改
 */

var ajax = __webpack_require__(114);
//RSST开发模式
var rest = {
    validate: function validate(settings, type) {
        if (!settings || !settings instanceof Object) {
            throw new Error("ajax配置无效,不能为空,必须为对象");
            return false;
        }

        if (!settings.controller) {
            //控制器为空
            throw new Error("ajax的controller[控制器]不能为空");
            return false;
        }

        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        } else if (typeof settings.corsUrl !== "string") {
            throw new Error("corsUrl 必须为字符类型");
            return false;
        }
        if (!settings.success) {
            throw new Error("ajax的success[请求成功函数]不能为空");
            return false;
        } else if (typeof settings.success !== "function") {
            throw new Error("ajax的success[请求成功函数]必须为函数");
            return false;
        }

        if (settings.error && typeof settings.error !== "function") {
            throw new Error("ajax的error[请求失败函数]必须为函数");
            return false;
        }

        if (!type) {
            switch (type) {
                case "get":
                    //获取实例模型
                    if (settings.id == null || settings.id == undefined) {
                        throw new Error("id参数不能空");
                        return false;
                    } else if (typeof settings.id !== "number") {
                        throw new Error("id必须为数字");
                        return false;
                    }
                    break;
                case "add":
                    //新增或者修改
                    if (settings.model == null || settings.model == undefined) {
                        throw new Error("数据模型不能为空");
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    //获取模型
    getModel: function getModel(settings) {
        /// <summary>
        /// 获取模型
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings)) {
            ajax({
                type: "GET",
                url: settings.corsUrl + settings.controller + "/GetModel",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //获取模型实例
    get: function get() {
        /// <summary>
        /// 获取模型实例
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings, "get")) {
            ajax({
                type: "GET",
                url: settings.corsUrl + settings.controller + "/Get?id=" + id,
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //新增
    add: function add(settings) {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        var data = {};
        if (this.validate(settings, "add")) {
            if (settings.model instanceof Array) {
                //如果是数组，则将其转对象
                data = { model: settings.model };
            } else {
                data = settings.model;
            }

            ajax({
                type: "POST",
                url: settings.corsUrl + settings.controller + "/Add",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //更新
    update: function update(settings) {
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        var data = {}; //数据模型
        if (this.validate(settings, "add")) {
            if (settings.model instanceof Array) {
                //如果是数组，则将其转对象
                data = { model: settings.model };
            } else {
                data = settings.model;
            }

            ajax({
                type: "POST",
                url: settings.corsUrl + settings.controller + "/Update",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //删除
    delete: function _delete(settings) {
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        var type = "POST"; //请求类型
        if (this.validate(settings)) {

            var url = settings.corsUrl + settings.controller + "/Delete";
            var data = {}; //因为要转换为后端能解析的数据格式必须是对象
            if (settings.paramModel instanceof Array) {
                if (settings.paramModelName) {
                    //自定义,不为空
                    if (typeof settings.paramModelName === "string") {
                        data[settings.paramModelName] = settings.paramModel;
                    } else {
                        throw new Error("paramModelName[自定义条件参数名称]必须为字符类型");
                        return false;
                    }
                } else {
                    data.paramModel = settings.paramModel; //默认对象名
                }
            } else if (typeof (paramModel * 1) === "number") {
                //数值型

                type = "GET";
                url = url + "?id=" + paramModel;
                data = null;
            } else {
                throw new Error("paramModel要么查询格式的数组,要么为id字段数字");
                return false;
            }

            ajax({
                type: type,
                url: url,
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //条件查询
    query: function query(settings) {
        /// <summary>
        /// 条件查询
        /// </summary>
        /// <param name="settings" type="array">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings)) {
            var data = {}; //因为要转换为后端能解析的数据格式必须是对象

            if (!settings.paramModel || settings.paramModel && settings.paramModel instanceof Array) {
                if (settings.paramModelName) {
                    //自定义,不为空
                    if (typeof settings.paramModelName === "string") {
                        data[settings.paramModelName] = settings.paramModel;
                    } else {
                        throw new Error("paramModelName[自定义查询条件参数名称]必须为字符类型");
                        return false;
                    }
                } else {
                    data.paramModel = settings.paramModel; //默认对象名
                }
            } else {
                throw new Error("paramModel[查询条件]格式不正确,要么为空要么为是数组");
                return false;
            }

            ajax({
                type: "POST",
                url: "/" + settings.controller + "/Query",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //分页条件查询
    page: function page(settings) {
        /// <summary>
        /// 分页条件查询
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings)) {
            if (settings.pageModel && settings.pageModel instanceof Object) {
                //不能为空
                if (!settings.pageModel.paramModel || settings.pageModel.paramModel && settings.pageModel.paramModel instanceof Array) {
                    //是否数组
                } else {
                    //可以为空
                    throw new Error("pageModel中的paramModel[查询条件]格式不正确,要么为空要么为是数组");
                    return false;
                }
            } else {
                throw new Error("pageModel[分页参数]格式不正确,不能为空必须是对象");
                return false;
            }
            ajax({
                type: "POST",
                url: "/" + settings.controller + "/Page",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: settings.pageModel,
                success: settings.success,
                error: settings.error
            });
        }
    }
};

module.exports = rest;

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/10/5.
 */

//格式化参数
exports.paramFormat = __webpack_require__(76); //格式化参数

//接口
exports.ajax = __webpack_require__(114); //ajax
exports.fetchapi = __webpack_require__(253); //fetch
exports.rest = __webpack_require__(254); //rest

//数据模型
exports.AjaxModel = __webpack_require__(250); //ajax的配置模型
exports.FetchModel = __webpack_require__(251); //fetch的配置模型
exports.RestModel = __webpack_require__(252); //rest的配置模型

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);


/***/ }),

/***/ 76:
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

/***/ })

},[326]);
//# sourceMappingURL=api.js.map