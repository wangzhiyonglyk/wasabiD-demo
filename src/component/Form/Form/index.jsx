//create by wangzhiyonglyk
//date:2016-03-02后开始独立改造
//edit date:2020-04-05
//edit date:2021-02 修复bug
// edit 2024-01-16 暂时先用class的组件,改造成hook有点麻烦,因为涉及到ref的问题
//desc:表单组件
import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../Buttons/Button";
import func from "../../libs/func";
import mixins from "../../Mixins/mixins";
import method from "./method";
import "./form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.inputs = []; //ref
    this.state = {
      id:func.uuid(),
      disabled: this.props.disabled,
      rawDisabled: this.props.disabled,
    };
   Object.getOwnPropertyNames(method).forEach((name) => {
        if (typeof method[name] == "function") {
          this[name] = this[name].bind(this);
        }
      });
    this.onSubmit = this.onSubmit.bind(this);

  }

  static getDerivedStateFromProps(props, state) {
    if (props.disabled !== state.rawDisabled) {
      return {
        rawDisabled: props.disabled,
        disabled: props.disabled,
      };
    }
    return null;
  }
 
  onSubmit() {
    //提交 数据
    var data = {}; //各个字段对应的值
    let isva = true;
    let combinxRefs = this.getRefs();
    for (let i = 0; i < combinxRefs.length; i++) {
      let cref = combinxRefs[i];
      if (cref) {
        //如果没有验证方法说明不是表单控件，保留原来的值
        if (isva) {
          //如果验证是正确的，继续获取值
          isva = cref.validate ? cref.validate() : isva;
        } else {
          //如果前一个验证失败，则验证不拿值
          cref.validate ? cref.validate() : void 0;
        }

        if (cref.props.name && cref.getValue) {
          //说明是表单控件

          if (cref.props.name.indexOf(",") > -1) {
            //含有多个字段
            var nameSplit = cref.props.name.split(",");
            let value = cref.getValue();
            if (value) {
              var valueSplit = value.split(",");
              for (
                let index = 0;
                index < valueSplit.length;
                index++ //有可能分离的值比字段少
              ) {
                if (index < valueSplit.length) {
                  data[nameSplit[index]] = valueSplit[index];
                }
              }
            } else {
              for (let index = 0; index < nameSplit.length; index++) {
                data[nameSplit[index]] = "";
              }
            }
          } else {
            data[cref.props.name] = cref.getValue();
          }
        } else if (cref.getData) {
          //布局组件或者表单组件
          data = Object.assign(data, cref.getData());
        }
      }
    }
    if (isva) {
      if (this.props.onSubmit) {
        //如果没有提交事件
        this.props.onSubmit(data);
      } else {
        return data;
      }
    }
  }
  setDisabled(disabled) {
    this.setState({
      disabled: !!disabled,
    });
  }
  /**
   * 得到表单中标签的最大宽度，方便对齐
   */
  computerLabelWidth() {
    let form = document.getElementById(this.state.id);
    if (form) {
      let width=0;
     let labels= form.querySelectorAll(".wasabi-label");
      if (labels) {
        for (let i = 0; i < labels.length; i++){
          if (!labels[i].style.width) {
            width = Math.max(width, labels[i].getBoundingClientRect().width);
          }
        }
        for (let i = 0; i < labels.length; i++){
          if (!labels[i].style.width) {
            labels[i].style.width = width + "px";
          }
          
        }
      }
      }
    
  }
  componentDidMount() {
    this.computerLabelWidth()
  }
  componentDidUpdate() {
    this.computerLabelWidth()
  }
  render() {
    this.inputs = []; //先清空
    return (
      <div
        id={this.state.id}
        className={
          "wasabi-form  clearfix " +
          (this.props.labelPosition || "left") +
          (this.props.className || "")
        }
        style={this.props.style}
      >
        <div className={"form-body  "} cols={this.props.cols}>
          {React.Children.map(this.props.children, (child, index) => {
            if (child) {
              if (typeof child.type !== "function") {
                //非react组件
                return child;
              } else {
                //统一处理标签样式问题，方便对齐
               
                //这里有个问题，value与text在第二次会被清除,防止数据丢失
                let data = child.props.data
                  ? JSON.parse(JSON.stringify(child.props.data))
                  : null;

                let ref = child.ref ? child.ref : React.createRef();
                typeof ref === "object" ? this.inputs.push(ref) : void 0; //如果对象型添加，字符型（旧语法）事后通过refs来获取
                return React.cloneElement(child, {
                  name: child.props.name || "key" + index, // 如果没有配置表单name，按顺序给
                  data: data,
                  noborder: this.props.noborder,//
                  disabled: this.props.disabled,
                  readOnly: this.state.disabled
                    ? this.state.disabled
                    : child.props.readOnly,
                  key: child.props.name|| "key" + index,
                  ref: ref,
                });
              }
            } else {
              return null;
            }
          })}
        </div>
        <div
          className="form-submit clearfix"
          style={{ display: this.props.submitHide ? "none" : null }}
        >
          <Button
            theme={this.props.submitTheme}
            onClick={this.onSubmit}
            title={this.props.submitTitle}
            style={{ display: this.props.submitHide ? "none" : null }}
            disabled={this.props.disabled}
          ></Button>
        </div>
      </div>
    );
  }
}
Form.propTypes = {
  style: PropTypes.object, //样式
  className: PropTypes.string, //自定义样式
  disabled: PropTypes.bool, //是否只读
  submitTitle: PropTypes.string,
  submitHide: PropTypes.bool,
  submitTheme: PropTypes.string,
  onSubmit: PropTypes.func, //提交成功后的回调事件
  cols: PropTypes.number, //一行几列
  labelPosition: PropTypes.oneOf(["left", "top"]), //文本对齐方式
};
Form.defaultProps = {
  submitTitle: "提交", //查询按钮的标题
  submitHide: true, //是否隐藏按钮
  submitTheme: "primary", //主题
  cols: 4, //默认3个
  labelPosition: "left",
};
/**
 * 合并公共方法
 */
mixins(Form, [
  method,
]);
export default Form;
