/**
 * create by wangzhiyonglyk
 * date:2023-04-14
 * 字符扩展，独立出来
 */

let func = {};

/**
 * 生成uuid
 */
func.uuid = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
/**
 * 返回随机字符串
 * @returns
 */
func.randomStr = function () {
  return Math.random().toString(36).slice(2);
};

/**
 * 将每个单词的首字母转换为大写
 * @param {*} str
 * @returns
 */
func.titleize = function (str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
    return c.toUpperCase();
  });
};

/**
 * 驼峰化
 * @param {*} str
 * @returns
 */
func.camelize = function (str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
};

/**
 *  中划线化
 * @param {*} str
 * @returns
 */
func.dasherize = function (str) {
  return str
    .replace(/([A-Z])/g, "-$1")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase();
};

/**
 * 字符串包含
 * @param {*} str 字符
 * @param {*} filter 查找内容
 * @returns
 */
func.strIncludes = function (str, filter) {
  return str.indexOf(filter);
};

/**
 * 字符串切割
 * @param {*} str 字符
 * @param {*} start 开始位置
 * @param {*} end 结束位置，可以为负数
 * @returns
 */
func.strSlice = function (str, start, end) {
  return str.slice(start, end);
};

/**
 * 字符替换
 * @param {*} str
 * @param {*} filter 替换内容
 * @param {*} recp 替换内容
 * @returns
 */
func.strReplace = function (str, filter, recp) {
  if (Object.prototype.toString.call(filter) !== "[object RegExp]") {
    filter = new RegExp(filter, "g");
  }
  return str.replace(filter, recp);
};

/**
 * 转数组
 * @param {*} str 字符
 * @param {*} split 分割符
 */
func.strToArray = function (str, split) {
  return str.split(split);
};

/**
 * 转数字
 * @param {*} str
 * @returns
 */
func.strToNum = function (str) {
  try {
    return str * 1;
  } catch (e) {
    console.log(e);
  }
  return NaN;
};

/**
 * 根据字符计算大概宽度
 * @param {*} str 字符
 */
func.charWidth = function (str = "") {
  let width = 0;
  try {
    let strArr = str.split("");

    for (let i = 0; i < strArr.length; i++) {
      let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(strArr[i])) {
        width += 20; //汉字20个像素
      } else {
        width += 10;
      }
    }
  } catch (e) {}

  return width;
};
export default func;
