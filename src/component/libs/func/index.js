/**
 * Created by wangzhiyonglyk on 2016-06-08.
 * 将独立于项目的公共函数分享出来
 *2020-11-06，重新规划
 2021-09-10添加新功能
 2023-04-14 将函数全部独立出去
 */

import numberFunc from "./numberFunc";
import strFunc from "./strFunc";
import dateFunc from "./dateFunc";
import objectFunc from "./objectFunc";
import actionFunc from "./actionFunc";

export default {
  ...numberFunc,
  ...strFunc,
  ...dateFunc,
  ...objectFunc,
  ...actionFunc,
};
