/**
 * crate by wangzhyong
 * date:2017-08-20
 * desc 列
 */
import React from "react";
import PropTypes from "prop-types";
import mixins from "../Mixins/mixins";
import method from "../Form/Form/method";
class Col extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputs = []; //ref
    Object.getOwnPropertyNames(method).forEach((name) => {
        if (typeof method[name] == "function") {
          this[name] = this[name].bind(this);
        }
      });
  }
  static propTypes = {
    cols: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
  };
  static defaultProps = {
    cols: 3, //默认3列
    style: {},
    className: "",
  };
 
  render() {
    this.inputs = []; //先清空
    return (
      <div
        className={
          "col" +("-" + (this.props.cols || "3")) +
          " wasabi-cols " +
          (this.props.className || "")
        }
        style={this.props.style}
      >
        {React.Children.map(this.props.children, (child, index) => {
          if (child) {
            if (typeof child.type !== "function") {
              //非react组件
              return child;
            } else {
              let ref = child.ref ? child.ref : React.createRef();
              typeof ref === "object" ? this.inputs.push(ref) : void 0; //如果对象型添加，字符型（旧语法）事后通过refs来获取
              return React.cloneElement(child, {
                name: child.props.name || "col" + index,
                disabled: this.props.disabled,
                readOnly: this.props.disabled
                  ? this.props.disabled
                  : child.props.readOnly,
                key: index,
                ref: ref,
              });
            }
          }
        })}
      </div>
    );
  }
}

/**
 * 合并公共方法
 */
mixins(
  Col, [
  method,
]);
export default Col;
