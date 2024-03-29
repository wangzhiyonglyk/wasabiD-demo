import React from "react";
import func from "../../libs/func";
import validation from "../../libs/validation";
import Label from "../Label";
import regexp from "../../libs/regs";
/**
 * 验证组件
 * @param {*} Widget 表单组件
 * @returns
 */
const ValidateHoc = function (Widget) {
  class ValidateComponent extends React.Component {
    constructor(props) {
      super(props);
      this.input = React.createRef();
      this.state = {
        containerid: func.uuid(),
        validateClass: "",
        inValidateText: "", //失败的文字
      };
      this.validate = this.validate.bind(this);
    }
    /**
     * 验证有效性
     * @returns
     */
    validate(value) {
      let type = this.props.type;
      value =
        value == null || value == undefined
          ? this.input.current.getValue()
          : value; //如果没有传值，则取文本框值

      let isvalidate = true; //默认是有效的
      let inValidateText = "";
      let valueArr = [];
      if (this.props.readOnly) {
        //不能直接返回，防止上一次的验证效果还在，导致无法消除
      } else {
        //非只读
        //没有后台验证，或者后台验证已经成功
        if (value !== null && value !== undefined && value !== "") {
          //不能包括0，0是有效值
          if (regexp.sql.test(value)) {
            //判断有效性
            isvalidate = false;
            inValidateText = "输入非法";
          } else if (value !== value) {
            //多加一层判断，有可能用户计算错误导致输入了NaN
            isvalidate = false;
            inValidateText = "非有效数字";
          } else if (this.props.regexp) {
            //有自定义正则表达式
            isvalidate = this.props.regexp.test(value);
            inValidateText = isvalidate
              ? ""
              : this.props.invalidTip || validation["invalidTip"];
          } else {
            //没有正则表达式，则验证默认正则

            if (regexp[type]) {
              //系统存在这个类型
              if (type === "daterange") {
                //日期可以包含时间，
                isvalidate =
                  regexp[type].test(value) ||
                  regexp["datetimerange"].test(value);
              } else if (type === "date") {
                //日期可以包含时间，
                isvalidate =
                  regexp[type].test(value) || regexp["datetime"].test(value);
              } else {
                if (typeof regexp[type] === "function") {
                  isvalidate = regexp[type](value);
                } else {
                  isvalidate = regexp[type].test(value);
                }
              }

              inValidateText = isvalidate ? "" : validation[type];
            } else {
              //默认是有效的
            }
          }

          if (isvalidate) {
            //有效再验证长度，大小问题

            if (typeof this.props.min === "number") {
              switch (type) {
                case "text":
                case "textarea":
                  if (value.toString().length < this.props.min) {
                    isvalidate = false;
                    inValidateText = "长度不能小于" + this.props.min;
                  }
                  break;
                case "password":
                  if (value.toString().length < this.props.min) {
                    isvalidate = false;
                    inValidateText = "长度不能小于" + this.props.min;
                  }
                  break;
                case "number":
                  if (value < this.props.min) {
                    isvalidate = false;
                    inValidateText = "不能小于" + this.props.min;
                  }
                  break;
                case "integer":
                  if (value < this.props.min) {
                    isvalidate = false;
                    inValidateText = "不能小于" + this.props.min;
                  }
                  break;
                case "checkbox":
                  valueArr = value.toString().split(",");
                  if (valueArr.length < this.props.min) {
                    isvalidate = false;
                    inValidateText =
                      "最少选择" + this.props.min.toString() + "项";
                  }
                  break;
                case "select":
                  valueArr = value.toString().split(",");
                  if (valueArr.length < this.props.min) {
                    isvalidate = false;
                    inValidateText =
                      "最少选择" + this.props.min.toString() + "项";
                  }
                  break;
                default:
                  break;
              }
            }
            if (isvalidate && typeof this.props.max === "number") {
              //这里要加isvalidate
              {
                switch (type) {
                  case "text":
                  case "textarea":
                    if (value.toString().length > this.props.max) {
                      isvalidate = false;
                      inValidateText = "长度不能大于" + this.props.max;
                    }
                    break;
                  case "password":
                    if (value.toString().length > this.props.max) {
                      isvalidate = false;
                      inValidateText = "长度不能大于" + this.props.max;
                    }
                    break;
                  case "number":
                    if (value > this.props.max) {
                      isvalidate = false;
                      inValidateText = "不能大于" + this.props.max;
                    }
                    break;
                  case "integer":
                    if (value > this.props.max) {
                      isvalidate = false;
                      inValidateText = "不能大于" + this.props.max;
                    }
                    break;
                  case "checkbox":
                    valueArr = value.toString().split(",");
                    if (valueArr.length > this.props.max) {
                      isvalidate = false;
                      inValidateText =
                        "最多选择" + this.props.max.toString() + "项";
                    }
                    break;
                  case "select":
                    valueArr = value.toString().split(",");
                    if (valueArr.length > this.props.max) {
                      isvalidate = false;
                      inValidateText =
                        "最多选择" + this.props.max.toString() + "项";
                    }
                    break;
                }
              }
            }
            if (isvalidate && type?.indexOf("range") > -1) {
              valueArr = value.toString().split(",");
              if (valueArr.length < 2) {
                isvalidate = false;
                inValidateText = "输入两个值";
              } else if (valueArr.length === 2 && valueArr[1] < valueArr[0]) {
                isvalidate = false;
                inValidateText = "第二值大于等于第一个值";
              } else if (valueArr.length > 2) {
                isvalidate = false;
                inValidateText = "输入错误";
              } else {
                if (
                  this.props.type === "daterange" &&
                  this.props.range &&
                  this.props.range <
                    func.getDateDiffDay(
                      new Date(valueArr[0].replace(/-/g, "/")),
                      new Date(valueArr[1].replace(/-/g, "/"))
                    )
                ) {
                  //日期范围有range参数
                  isvalidate = false;
                  inValidateText = "最多只能选择" + this.props.range + "天";
                } else {
                  isvalidate = true;
                }
              }
            }
          }
        } else if (this.props.required) {
          //没有输入
          //必填
          isvalidate = false; //
          inValidateText = validation["required"];
        }
        this.setState({
          validateClass: !isvalidate ? "wasabi-has-error" : "",
          inValidateText: inValidateText,
        });
      }

      return isvalidate;
    }
    /**
     * 设置值
     * @param {*} value
     */
    setValue(value) {
      this.input.current &&
        this.input.current.setValue &&
        this.input.current.setValue(value);
    }
    /**
     * 获取值
     * @returns
     */
    getValue() {
      return this.input.current && this.input.current.getValue();
    }

    focus() {
      try {
        this.input.current.focus();
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * 刷新,因为下拉框类型组件需要
     * @param {*} params
     * @param {*} url
     */
    reload(params, url) {
      this.input.current &&
        this.input.current.reload &&
        this.input.current.loadData(url, params);
    }

    render() {
      return (
        <div
          id={this.state.containerid}
          className={
            "wasabi-form-group " +
            (this.props.noborder ? " noborder" : "") +
            (this.props.className || "") +
            " " +
            this.state.validateClass
          }
          style={this.props.style}
        >
          {this.props.hide ? null : (
            <Label
              readOnly={this.props.readOnly || this.props.disabled}
              style={this.props.labelStyle}
              required={this.props.required}
            >
              {this.props.label}
            </Label>
          )}
          <div
            className={
              "wasabi-form-group-body" +
              (this.props.readOnly || this.props.disabled ? " readOnly" : "")
            }
          >
            <Widget
              {...this.props}
              ref={this.input}
              containerid={this.state.containerid}
              validate={this.validate}
            ></Widget>
            <small
              className={"wasabi-help-block "}
              style={{ display: this.state.inValidateText ? "block" : "none" }}
            >
              <div className="text">{this.state.inValidateText}</div>
            </small>
          </div>
        </div>
      );
    }
  }
  return ValidateComponent;
};
export default ValidateHoc;
