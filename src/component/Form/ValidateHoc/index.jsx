import React from "react";
import utils from "../../libs/func";
import validation from "../../Lang/validation";
import regexp from "../../Lang/regs"
/**
 * 验证组件
 * @param {*} InputWidget 表单组件
 * @returns 
 */
let validateHoc = function (InputWidget) {
    class ValidateComponent extends React.Component {
        constructor(props) {
            super(props);
            this.input = React.createRef();
            this.state = {
                validateClass: "",
                inValidateText: "",//失败的文字
            }
            this.validate = this.validate.bind(this);
            this.onBlur = this.onBlur.bind(this)
        }
        /**
         * 验证有效性
         * @returns 
         */
        validate(value) {
            value = value || this.input.current.getValue();

            let isvalidate = true;//默认是有效的
            let inValidateText = "";
            let valueArr = [];
            if (this.props.readOnly) {//不能直接返回，防止上一次的验证效果还在，导致无法消除
            }
            else {//非只读
                //没有后台验证，或者后台验证已经成功
                if (value !== null && value !== undefined && value !== "") {//不能包括0，0是有效值
                    if (regexp.sql.test(value)) {//判断有效性
                        isvalidate = false;
                        inValidateText = "输入非法";
                    }
                    else if (value !== value) {//多加一层判断，有可能用户计算错误导致输入了NaN
                        isvalidate = false;
                        inValidateText = "非有效数字";
                    }
                    else if (this.props.regexp) {  //有自定义正则表达式
                        isvalidate = this.props.regexp.test(value);
                        inValidateText = isvalidate ? "" : this.props.invalidTip || validation["invalidTip"];
                    }
                    else {//没有正则表达式，则验证默认正则

                        if (regexp[this.props.type]) {//系统存在这个类型
                            if (this.props.type === "daterange") {
                                //日期可以包含时间，
                                isvalidate = regexp[this.props.type].test(value) || regexp["datetimerange"].test(value);
                            }
                            else if (this.props.type === "date") {
                                //日期可以包含时间，
                                isvalidate = regexp[this.props.type].test(value) || regexp["datetime"].test(value);
                            }
                            else {
                                if (typeof regexp[this.props.type] === "function") {
                                    isvalidate = regexp[this.props.type](value);
                                }
                                else {

                                    isvalidate = regexp[this.props.type].test(value);
                                }

                            }

                            inValidateText = isvalidate ? "" : validation[this.props.type];
                        } else {
                            //默认是有效的
                        }

                    }

                    if (isvalidate) {//有效再验证长度，大小问题

                        if (typeof this.props.min === "number") {
                            switch (this.props.type) {
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
                                        inValidateText = "最少选择" + this.props.min.toString() + "项";
                                    }
                                    break;
                                case "select":
                                    valueArr = value.toString().split(",");
                                    if (valueArr.length < this.props.min) {
                                        isvalidate = false;
                                        inValidateText = "最少选择" + this.props.min.toString() + "项";
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (isvalidate && typeof this.props.max === "number") {
                            {
                                switch (this.props.type) {
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
                                            inValidateText = "最多选择" + this.props.max.toString() + "项";
                                        }
                                        break;
                                    case "select":
                                        valueArr = value.toString().split(",");
                                        if (valueArr.length > this.props.max) {
                                            isvalidate = false;
                                            inValidateText = "最多选择" + this.props.max.toString() + "项";
                                        }
                                        break;
                                }
                            }
                        }


                    }

                }
                else if (this.props.required) {//没有输入
                    //必填
                    isvalidate = false;//
                    inValidateText = validation["required"];
                }
                this.setState({
                    validateClass: !isvalidate ? " wasabi-has-error " : "",
                    inValidateText: inValidateText,

                })



            }
            return isvalidate;
        }
        /**
         * 设置值
         * @param {*} value 
         */
        setValue(value) {
            this.input.current.setValue && this.input.current.setValue(value);
        }
        getValue() {
            return this.input.current.getValue();
        }
        /**
         * 失去焦点事件
         */
        onBlur(value, text, name) {
            this.validate(value);
        }

        /**
         * 刷新
         * @param {*} params 
        * @param {*} url 
         */
        reload(params, url) {

            this.input.current.reload && this.input.current.loadData(url, params);
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (utils.diffOrder(nextProps, this.props)) {
                return true;
            }
            if (utils.diff(nextState, this.state)) {
                return true;
            }
            return false;
        }
        render() {
            return <React.Fragment>
                <InputWidget  {...this.props} {...this.state} ref={this.input} validate={this.validate} onBlur={this.onBlur}></InputWidget>
            </React.Fragment>

        }
    }
    return ValidateComponent;
}
export default validateHoc;
