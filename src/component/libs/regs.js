/**
 * Created by wangzhiyonglyk on 2016-03-24.
 * edit 2022-09-20
 */

export default {
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
  url: /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  number: /^\s*[-+]?(\d+|(\d*(\.\d+)))\s*$/,
  year: /^[1-9]\d{3}$/, //年
  month: /^[1-9]\d{3}-(0[1-9]|1[0-2])$/, //年月
  date: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, //日期
  time: /^(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/, //时间 可以不包括秒
  datetime:
    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/, //可以不包括秒
  yearrange: /^[1-9]\d{3},[1-9]\d{3}$/, //年范围
  monthrange: /^[1-9]\d{3}-(0[1-9]|1[0-2]),[1-9]\d{3}-(0[1-9]|1[0-2])$/, //年月范围
  daterange:
    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]),[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, //日期范围
  datetimerange:
    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?,[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/, //日期时间范围
  timerange:
    /^(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?,(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/, //时间范围 可以不包括秒
  alpha: /^[a-z ._-]+$/i,
  alphanum: /^[0-9a-z ._-]+$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,30}$/, //密码中 1个大写字母，1个小写字母和1个数字,至少6个字符，最多30个字符
  strongPassword:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/, //密码中必须包含小字母，大写字母、数字、特称字符，至少8个字符，最多30个字符
  integer: /^[-+]?[0-9]+$/,
  mobile: /^1[3456789]\d{9}$/,
  idcard: function (value) {
    //身份证号码
    //15位和18位身份证号码的正则表达式
    var regIdCard =
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(value)) {
      if (value.length == 18) {
        var idCardWi = new Array(
          7,
          9,
          10,
          5,
          8,
          4,
          2,
          1,
          6,
          3,
          7,
          9,
          10,
          5,
          8,
          4,
          2
        ); //将前17位加权因子保存在数组里
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
  },
  /**
   * 匹配数字范围
   * @param {*} value
   */
  numberrange: function (value) {
    //输入一个输入范围（0-1，0-，-1）
    // 可以多个，用逗号隔开

    let numberrangeRegs =
      /^\s*(([-+]?(\d+|(\d*(\.\d+))))\-([-+]?(\d+|(\d*(\.\d+)))){0,1})$|^(([-+]?(\d+|(\d*(\.\d+)))){0,1}\-([-+]?(\d+|(\d*(\.\d+)))))\s*z/; // 0-1 ，0-， -1
    let values = (value ?? "").replace("，", ",").split(","); //
    let istrue = true;
    for (let i = 0; i < values; i++) {
      if (!numberrangeRegs.test(value[i])) {
        istrue = false;
      }
    }
    return istrue;
  },
  integerrange: function (value) {
    //可以输入单个数字，可以输入一个输入范围（0-1，0-，-1）
    // 可以多个，用逗号隔开

    let numberrangeRegs =
      /^(([-+]?\d*)\-([-+]?\d+))$|^(([-+]?\d+)\-([-+]?\d*))$/; // 0-1 ，0-， -1
    let values = (value ?? "").replace("，", ",").split(","); //
    let istrue = true;
    for (let i = 0; i < values; i++) {
      if (!numberrangeRegs.test(value[i])) {
        istrue = false;
      }
    }
    return istrue;
  },
  //中国人人名
  chineseName: /^[\u4E00-\u9FA5]{1,20}[.▪•]?[\u4E00-\u9FA5]{1,20}$/,
  chinese: /^[\u4E00-\u9FA5]+$/,
  sql: /alert\s*\(|<script>|<\/script>|--/, //防止脚本注入，与sql注入
};
