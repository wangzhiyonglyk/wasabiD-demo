/**
 * create by wangzhiyonglyk
 * date:2023-04-14
 * 数字扩展，独立出来
 */

let func = {};

/**
 * 将数字转为英文表达格式
 * @param {*} num 数字
 * @param {*} fixed 小数位数
 * @returns
 */
func.numToEnglishFormat = function (num, fixed = 2) {
  if ((num ?? "").toString()) {
    let number = ((num * 1).toFixed(fixed) * 1).toString();
    number = number.split(".");
    var regex = /(?!^)(?=(\d{3})+$)/g;
    return number[0].replace(regex, ",") + "." + number[1].replace(regex, ",");
  }
  return num;
};

/**
 * 保留几位小数
 * @param {*} num 数字
 * @param {*} fixed 小数位数
 * @returns
 */
func.numToFixed = function (num, fixed = 2) {
  let number = ((num * 1).toFixed(fixed) * 1).toString();
  return number;
};
/**
 *向上取整
 * @param {*} num 数字
 * @returns
 */
func.numToUpInter = function (num) {
  return Math.ceil(num * 1);
};

func.numToLowerInter = function (num) {
  return Math.floor(num * 1);
};

/**
 *四舍五入取整
 * @param {*} num 数字
 * @returns
 */
func.numToRoundInter = function (num) {
  num = num * 1;
  return Math.round(num);
};

/**
 *取绝对值
 * @param {*} num 数字
 * @returns
 */
func.numToAbs = function (num) {
  num = num * 1;
  return Math.abs(num);
};

/**
 * 取最小值
 * @param  {...any} args 参数
 * @returns
 */
func.numMin = function (...args) {
  return Math.min(...args);
};

/**
 * 取最大值
 * @param  {...any} args 参数
 * @returns
 */
func.numMax = function (...args) {
  return Math.max(...args);
};

/**
 * 转成字符串
 * @param {*} num 数字
 * @param {*} f 底数
 */
func.NumToString = function (num, f = 10) {
  return num.toString(f);
};

export default func;
