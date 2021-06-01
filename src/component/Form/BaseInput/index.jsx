/**
 * 基础输入框
 * create by wangzhiyong
 * date:2021-04-16
 */
 import React from "react";
 import PropTypes from "prop-types";
 class BaseInput extends React.PureComponent {
     constructor(props) {
         super(props);
     }
     render() {
         return <input
             type={"text"}
             {...this.props}
             required={this.props.required || false}
             readOnly={this.props.readOnly || false}
             placeholder={this.props.placeholder || ""}
             title={this.props.title || ""}
             className={"wasabi-input " + this.props.className || ""}
             style={this.props.style || {}}
             value={this.props.value || ""}
             autoComplete="off"
         />
 
 
     }
 }
 BaseInput.propsTypes = {
     name: PropTypes.string,//name
     className: PropTypes.string,//css样式
     style: PropTypes.object,//样式
     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     color: PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),//字体颜色
     onChange: PropTypes.func,//change事件
     onKeyUp: PropTypes.func,//键盘事件
     onFocus: PropTypes.func,//得到焦点
     onBlur: PropTypes.func,//失去焦点
     onClick: PropTypes.func,//单击事件
     onPaste:PropTypes.func,//粘贴事件
 
 }
 BaseInput.defaultProps = {
     className: ""
 }
 export default BaseInput;
 
 
 