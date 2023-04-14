/**
 * create by wangzhiyonglyk
 * date:2023-04-14
 * 日期扩展，独立出来
 */

import objectFunc from "./objectFunc";
let func = {};
/**
 * 获取当前时间
 * @param {*} date
 * @returns
 */
func.getNowDate = function () {
  return new Date();
};

/**
 * 获取当前时间字符串
 * @param {*} date
 * @returns
 */
func.getNowDateStr = function () {
  return func.dateformat(new Date());
};

/**
 * 获取当前时间戳
 * @param {*} date
 * @returns
 */
func.getNowTimeStamp = function () {
  return new Date().getTime();
};

/**
 * 日期格式化为字符串
 * @param {DAte} date 日期
 * @param {string} format 格式
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * dateformat(new Date(),'yyyy-MM-dd') ==> 2014-03-02
 * dateformat(new Date(),'yyyy-MM-dd hh:mm') ==> 2014-03-02 05:04
 * dateformat(new Date(),'yyyy-MM-dd HH:mm') ==> 2014-03-02 17:04
 * dateformat(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * dateformat(new Date(),'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * dateformat(new Date(),'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * dateformat(new Date(),'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * dateformat(new Date(),'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 * @returns
 */
func.dateformat = function (date = new Date(), format = "yyyy-MM-dd HH:mm:ss") {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    var week = {
      0: "\u65e5",
      1: "\u4e00",
      2: "\u4e8c",
      3: "\u4e09",
      4: "\u56db",
      5: "\u4e94",
      6: "\u516d",
    };

    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }

    if (/(E+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? "\u661f\u671f"
            : "\u5468"
          : "") + week[date.getDay() + ""]
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  }
  return null;
};

/**
 * 字符转日期
 * @param {*} strDate 日期字符
 * @returns
 */
func.stringToDate = function (strDate) {
  let date = new Date(Date.parse(strDate.replace(/-/g, "/"))); //转换成Date();
  return date;
};

/**
 * 得到时间戳
 * @param {*} date
 * @returns
 */
func.toTimeStamp = function (date = new Date()) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return date.getTime();
  } else {
    try {
      return this.stringToDate(date).getTime();
    } catch (e) {
      return null;
    }
  }
};

/**
 * 以下是根据参数获取时间
 */

/**
 * 取得几个年后的日期
 * @param {*} date 日期
 * @param {*} n 年数量
 * @returns
 */
func.getNextYear = function (date = new Date(), n = 1) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    let newDate = objectFunc.clone(date);
    newDate.setYear(newDate.getFullYear() + n);
    return newDate;
  }
  return null;
};
/**
 * 取得几个月后的日期
 * @param {*} date 日期
 * @param {*} n 月数量
 * @returns
 */
func.getNextMonth = function (date = new Date(), n = 1) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    let newDate = objectFunc.clone(date);
    newDate.setMonth(newDate.getMonth() + n);
    return newDate;
  }
  return null;
};
/**
 * 取得几天后的日期
 * @param {*} date 日期
 * @param {*} n 天数量
 */
func.getNextDay = function (date = new Date(), n = 1) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    let newDate = objectFunc.clone(date);
    newDate.setDate(newDate.getDate() + n);
    return newDate;
  }
  return null;
};
/**
 * 取得几小时后的日期
 * @param {*} date 日期
 * @param {*} n 小时量
 */
func.getNextHour = function (date = new Date(), n = 1) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    let newDate = objectFunc.clone(date);
    newDate.setHours(newDate.getHours() + n);
    return newDate;
  }
  return null;
};

/**
 * 取得几分钟后的日期
 * @param {*} date 日期
 * @param {*} n 小时量
 */
func.getNextMinute = function (date = new Date(), n = 1) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    let newDate = objectFunc.clone(date);
    newDate.setMinutes(newDate.getMinutes() + n);
    return newDate;
  }
  return null;
};

/**
 * 取得几秒后的日期
 * @param {*} date 日期
 * @param {*} n 小时量
 */
func.getNextSecond = function (date = new Date(), n = 1) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    let newDate = objectFunc.clone(date);
    newDate.setSeconds(newDate.getSeconds() + n);
    return newDate;
  }
  return null;
};

/**
   * 
    以下时间差
   */

/**
 * 两个日期，相隔多少年
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 */
func.getDateDiffYear = function (startDate, endDate) {
  try {
    if (
      Object.prototype.toString.call(startDate) === "[object Date]" &&
      Object.prototype.toString.call(endDate) === "[object Date]"
    ) {
      return endDate.getFullYear() - startDate.getFullYear();
    }
  } catch (e) {
    return NaN;
  }
  return NaN;
};

/**
 * 两个日期，相隔多少月
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 */
func.getDateDiffMonth = function (startDate, endDate) {
  try {
    if (
      Object.prototype.toString.call(startDate) === "[object Date]" &&
      Object.prototype.toString.call(endDate) === "[object Date]"
    ) {
      let date2Mon;
      let sDate =
        startDate.getDate() +
        startDate.getHours() / 24 +
        startDate.getMinutes() / 24 / 60;
      let eDate =
        endDate.getDate() +
        endDate.getHours() / 24 +
        endDate.getMinutes() / 24 / 60;
      if (eDate >= sDate) {
        date2Mon = 0;
      } else {
        date2Mon = -1;
      }
      return (
        (endDate.getYear() - startDate.getYear()) * 12 +
        endDate.getMonth() -
        startDate.getMonth() +
        date2Mon
      );
    }
  } catch (e) {
    return NaN;
  }
  return NaN;
};

/**
 * 两个日期，相隔多少天
 * @param {Date} startTime 开始日期
 * @param {Date} endTime 结束日期
 */
func.getDateDiffDay = function (startDate, endDate) {
  try {
    if (
      Object.prototype.toString.call(startDate) === "[object Date]" &&
      Object.prototype.toString.call(endDate) === "[object Date]"
    ) {
      return (endDate * 1 - startDate * 1) / 60 / 60 / 1000 / 24;
    }
  } catch (e) {
    return NaN;
  }
  return NaN;
};

/**
 * 两个日期，相隔多少小时
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 */
func.getDateDiffHour = function (startDate, endDate) {
  try {
    if (
      Object.prototype.toString.call(startDate) === "[object Date]" &&
      Object.prototype.toString.call(endDate) === "[object Date]"
    ) {
      return (endDate * 1 - startDate * 1) / 60 / 60 / 1000;
    }
  } catch (e) {
    return NaN;
  }
  return NaN;
};

/**
 * 两个日期，相隔多少小时
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 */
func.getDateDiffMinute = function (startDate, endDate) {
  try {
    if (
      Object.prototype.toString.call(startDate) === "[object Date]" &&
      Object.prototype.toString.call(endDate) === "[object Date]"
    ) {
      return (endDate * 1 - startDate * 1) / 60 / 1000;
    }
  } catch (e) {
    return NaN;
  }
  return NaN;
};

/**
 * 两个日期，相隔多少小时
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 */
func.getDateDiffSecond = function (startDate, endDate) {
  try {
    if (
      Object.prototype.toString.call(startDate) === "[object Date]" &&
      Object.prototype.toString.call(endDate) === "[object Date]"
    ) {
      return (endDate * 1 - startDate * 1) / 1000;
    }
  } catch (e) {
    return NaN;
  }
  return NaN;
};
/**
 *
 * 以下是得到特殊时期
 */

/**
 * 所在月的第一天
 * @param {Date} date
 * @returns
 */
func.getFirstDateInMonth = function (date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * 所在月的最后一天
 * @param {Date} date
 * @returns
 */
func.getLastDateInMonth = function (date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
/**
 * 求所在季度的第一天
 * @param {Date} date
 */
func.getFirstDateInQuarter = function (date = new Date()) {
  return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);
};
/**
 * 求所在季度的最后一天
 * @param {Date} date
 */
func.getLastDateInQuarter = function (date = new Date()) {
  return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 0);
};
/**
 * 判断是否为闰年
 * @param {Date} date
 * @returns
 */
func.isLeapYear = function (date = new Date()) {
  return new Date(date.getFullYear(), 2, 0).getDate() === 29;
};
/**
 * /**
 * 取得当前月份的天数
 * @param {Date} date
 * @returns
 */
func.getDaysInMonth = function (date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
/**
 * 取得月份第一天是星期几
 * @returns
 */
func.getFirstDayWeek = function (date = new Date()) {
  //
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export default func;
