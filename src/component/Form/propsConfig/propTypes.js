/**
 * create by wangzhiyonglyk
 * date:2017-08-14
 * 2020-11-08
 * 2022-10-15 增加日期相关控制
 * 将表单配置独立
 */
import PropTypes from "prop-types";
export default {
    /****基础属性****/
  type: PropTypes.oneOf([
    "text", //普通输入框
    "password", //密码
    "strongPassword", //强密码
    "email", //邮箱
    "url", //网址
    "mobile", //手机
    "idcard", //身份证
    "year", //年份
    "month", //年月
    "date", //日期
    "time", //时间
    "timerange", //时间范围
    "datetime", //日期时间
    "yearrange", // 年范围
    "monthrange", //年月范围
    "daterange", //日期范围
    "datetimerange", //日期时间范围
    "alpha", //英文字母
    "alphanum", //英文字母与数字
    "integer", //整型数据
    "integerrange", // 整型数据范围
    "number", //数字
    "numberrange", // 数字范围
    "textarea", //多行文本
    "select", //下拉框
    "radio", //单选框
    "rate", //评分
    "checkbox", //复选框
    "checkbutton", //复选按钮
    "switch", //开关
    "picker", //级联选择组件
    "treepicker", //下拉树选择
    "gridpicker", //表格下拉
    "panelpicker", //面板选择
    "image", // 图片
    "avatar", // 头像
    "file", // 文件
    "cloud", //云文件
  ]), //字段类型，

  name: PropTypes.string, //字段名
  label: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]), //字段文字说明属性
  title: PropTypes.string, //提示信息



  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), //默认值,
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //默认文本值
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //输入框预留文字
  readOnly: PropTypes.bool, //是否只读
  required: PropTypes.bool, //是否必填
  hide: PropTypes.bool, //是否隐藏
  regexp: PropTypes.string, //正则表达式
  invalidTip: PropTypes.string, //无效时的提示字符
  style: PropTypes.object, //自定义style
  className: PropTypes.string, //自定义class

  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //最小值,最小长度,最少选项
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //最大值,最大长度,最多选项

  onFocus: PropTypes.func, // 焦点事件
  onClick: PropTypes.func, //单击事件
  onDoubleClick: PropTypes.func, //双击事件
  onKeyUp: PropTypes.func, //键盘事件
  onBlur: PropTypes.func, //失去事件
  onChange: PropTypes.func, //值改变事件

  /****基础属性****/

  // text（普通文本框）
  onSearch: PropTypes.func, //查询事件
  addBefore: PropTypes.any, // 前缀
  addAfter: PropTypes.any, // 后缀
  // text,password
  onPaste: PropTypes.func, //粘贴事件

  // textarea（多行文本框）
  rows: PropTypes.number, //textarea
  cols: PropTypes.number, //textarea
  resize: PropTypes.bool, //是否可以拖动大小

  // combobox（组合式表单组件:select,picker,grid,checkbox,radio,checkbutton,treepicker,gridpicker,datepicker)
  httpType: PropTypes.string, //http请求的类型
  contentType: PropTypes.string, //http请求的request 数据类型
  httpHeaders: PropTypes.object, //请求时的headers参数
  valueField: PropTypes.string, //数据字段值名称
  textField: PropTypes.string, //数据字段文本名称
  url: PropTypes.string, //ajax的后台地址
  params: PropTypes.object, //查询参数
  dataSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源,默认为data
  data: PropTypes.array, //自定义数据源

  // combobox事件
  onSelect: PropTypes.func, //选中后的事件，回传，value,text, name, data

  // 下拉选择（select)

  onSort: PropTypes.func, // 排序事件
  multiple: PropTypes.bool, //是否允许多选,多上传，文件上传也可以
  attachAble: PropTypes.bool, //select是否可以添加数据

  // datepicker 日期组件
  range: PropTypes.number, //日期与时间相关选择时，最大范围
  attachTime: PropTypes.bool, //日期组件时是否附带时间
  attachSecond: PropTypes.bool, //时间组件是否附带秒

  //三级picker
  secondUrl: PropTypes.string, //第二层节点的后台地址,
  secondParams: PropTypes.object, //第二层节点的后台参数
  secondParamsKey: PropTypes.string, //第二层节点的后台参数中传递一级节点value值的参数名称
  thirdUrl: PropTypes.string, //第三层节点的后台地址，
  thirdParams: PropTypes.object, //第三层节点的后台参数
  thirdParamsKey: PropTypes.string, //第三层节点的后台参数中传递二级节点value值的参数名称
  hotTitle: PropTypes.string, //热门选择标题
  hotData: PropTypes.array, //热门选择的数据

  //树treepicker，其他树组件属性，请去树组件本身查询

  idField: PropTypes.string, //树组件/treepicker id字段名称
  parentField: PropTypes.string, //树组件treepicker pId字段名称
  childrenField: PropTypes.string, // 树组件 treepicker pId字段名称
  isSimpleData: PropTypes.bool, //树组件/treepicker 是否启用简单数据格式

  // 表格 其他表格组件属性，请去表格组件本身查询
  priKey: PropTypes.array, //主键
  headers: PropTypes.array, //表头，gridpicker

  // 文件上传
  accept: PropTypes.oneOf([
    "word",
    "excel",
    "ppt",
    "office",
    "txt",
    "pdf",
    "html",
    "image",
    "media",
    "zip",
    "json",
  ]), //上传文件类型
  uploadSuccess: PropTypes.func, // 上传成功事件
};
