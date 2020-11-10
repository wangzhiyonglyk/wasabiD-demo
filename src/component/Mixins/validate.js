/**
 * Created by wangzhiyong on 16/8/5.
 * desc 将验证独立出来

 */
import validation from "../Lang/validation.js";
import regexp from "../Lang/regs.js";
export default {
    validate: function (value)  {
      
        value = value ? value : this.state.value;
        let isvalidate = true;
        let inValidateText = "";
        let valueArr = [];
        if (this.props.readOnly) {//不能直接返回，防止上一次的验证效果还在，导致无法消除
        }
        else {//非只读
            if (this.state.validateState && this.state.validateState != "valid") {//处理于后台验证中,或者是验证失败
                isvalidate = false;
            }
            else {//没有后台验证，或者后台验证已经成功
                if (value != null && value != undefined && value !== "") {//因为有可能输入0,注意一定要加双等号，用户输入了值，验证有效性
                    if (regexp.sql.test(value)) {//判断有效性
                        isvalidate = false;
                        inValidateText = "输入非法";
                    }
                    else if (value.toString() == "NaN") {//多加一层判断，有可能用户计算错误导致输入了NaN
                        isvalidate = false;
                        inValidateText = "非有效数字";
                    }
                    else if (this.props.regexp) {  //有自定义正则表达式
                        isvalidate = this.props.regexp.test(value);
                        inValidateText = isvalidate ? "" : this.props.invalidTip|| validation["invalidTip"]||validation["invalidTip"];
                    }
                    else {//没有正则表达式，则验证默认正则

                        if (regexp[this.props.type]) {//系统存在这个类型
                            if(this.props.type=="daterange"){
                                //日期可以包含时间，
                                isvalidate = regexp[this.props.type].test(value)||regexp["datetimerange"].test(value);
                            }
                            else  if(this.props.type=="date"){
                                //日期可以包含时间，
                                isvalidate = regexp[this.props.type].test(value)||regexp["datetime"].test(value);
                            }
                            else{
                                if (typeof regexp[this.props.type] == "function") {
                                    isvalidate = regexp[this.props.type](value);
                                }
                                else {
                                  
                                    isvalidate = regexp[this.props.type].test(value);
                                }
                               
                            }
                           
                            inValidateText = isvalidate ? "" : validation[this.props.type];
                        }
                        else {

                        }
                    }

                    if (isvalidate) {//有效再验证长度，大小问题
                     
                        if (typeof this.props.min == "number") {
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
                            }
                        }
                        if (isvalidate && typeof this.props.max == "number") {
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
                else {//没有输入
                    if (this.props.required) {
                        //必填
                        isvalidate = false;//
                        inValidateText = validation["required"];
                    }

                }

            }

            //设置样式
            if (isvalidate) {
                this.setState({
                    validateClass: "",
                    inValidateShow: "none",
                    inValidateText: "",
                })

            }
            else {

                this.setState({
                    validateClass: " wasabi-has-error",
                    inValidateShow: "block",
                    inValidateText: inValidateText
                });

            }

        }


        //设置样式
        if (isvalidate) {
            this.setState({
                validateClass: "",
                inValidateShow: "none",
                inValidateText: "",

            })

        }
        else {

            this.setState({
                validateClass: " wasabi-has-error",
                inValidateShow: "block",
                inValidateText: inValidateText
            });

        }
        return isvalidate;



    }
} 