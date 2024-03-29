/**
 * Created by wangzhiyonglyk on 2016-03-24.
 * edit:2021-02-01
 *  edit:2021-00-20
 */

let validation = {
  alpha: '只能包含英文字符，"-","_"',
  alphanum: '只能包含数字、英文字符和"_"',
  email: "邮箱格式不正确",
  url: "网址格式不正确",
  mobile: "手机号码格式不正确",
  integer: "必须为整数",
  idcard: "身份证号码格式不正确",
  required: "必填项",
  invalidTip: "输入格式无效",
  time: "00:00[:00]",
  timerange: "00:00[:00]",
  year: "年份:0000",
  month: "年月:0000-00",
  date: "日期:0000-00-00",
  datetime: "日期时间:0000-00-00 00:00[:00]",
  yearrange: "年:0000",
  monthrange: "年月:0000-00",
  daterange: "日期:0000-00-00",
  datetimerange: "日期时间:0000-00-00 00:00[:00]",
  timerange: "时间:00:00[:00]",
  max: {
    array: "最多选择 {0} 个选项",
    number: "不能大于 {0}",
    string: "最大长度不能超过 {0} 个字符",
  },
  min: {
    array: "最少选择 {0} 个选项",
    number: "不能小于 {0}",
    string: "最小长度不能少于 {0} 个字符",
  },
  number: "必须为数字",
  numberrange: "格式:1.5-4.5,1.4-,-5,多范围逗号隔开",
  integerrange: "格式:1-4,1-,-5,多范围逗号隔开",
  password: "密码中必须包含小字母，大写字母、数字,8到30字符",
  strongPassword: "密码中必须包含小字母,大写字母、数字、特称字符,8到30字符",
  url: "url格式不正确",
  email: "邮箱格式不正确",
  fileSize: "最大上传文件大小不能超过 {0} KB",
};
export default validation;
