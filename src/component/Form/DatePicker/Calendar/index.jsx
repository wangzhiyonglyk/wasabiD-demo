/**
 * create by wangzhiyonglyk
 * 单独独立出来，作为普通日历控件
 * 增强日历控件的能力
 *
 */

import React from "react";
import CalendarView from "./CalendarView";
function Calendar(props, ref) {
  return <CalendarView {...props} ref={ref}></CalendarView>;
}

export default React.memo(React.forwardRef(Calendar));
