/**
 * 基础输入框
 * create by wangzhiyonglyk
 * date:2021-04-16
 * desc 辅助于其他组件
 */
import React from "react";

const BaseInput = React.forwardRef((props, ref) => {
  return (
    <input
      type={"text"} //类型默认值
      {...props}
      ref={ref}
      className={"wasabi-input " + (props.className || "")}
      value={props.value || ""}
      autoComplete={props.autoComplete || "off"}
    />
  );
});
export default React.memo(BaseInput);
