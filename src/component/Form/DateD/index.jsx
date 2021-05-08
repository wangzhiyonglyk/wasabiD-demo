import React from "react";
import PropTypes from "prop-types";
import Calendar from "../Calendar"
import DateInput from "./DateInput";
import Label from "../../Info/Label";
import regs from "../../Lang/regs";
import utils from "../../libs/func"
import dom from "../../libs/dom"
import ValidateHoc from "../ValidateHoc";

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.datepicker = React.createRef();
        this.state = {
            value: "",
            containerid: utils.uuid(),
            show: false,
        }
        this.setValue=this.setValue.bind(this);
        this.onChange=this.onChange.bind(this);
        this.showPicker=this.showPicker.bind(this);
        this.hidePicker=this.hidePicker.bind(this);
        this.onSelect=this.onSelect.bind(this);
    }
    componentDidMount() {
        //设置值
        this.setValue(this.props.value);
    }

    /**
     * 输入框
     * @param {*} value 
     */
    onChange(event){
        let value=event.target.value.trim()
        if(regs.date.test(value)){
            let datearr = value.split("-");
            this.datepicker.current.setValue(datearr[0] * 1, datearr[1] * 1, datearr[2] * 1);
        }
    }
    showPicker() {
        this.setState({
            show: true,
        })
        document.addEventListener("click", this.hidePicker)
    }
    hidePicker() {
        if (!dom.isDescendant(document.getElementById(this.state.containerid), event.target)) {
            this.setState({
                show: false
            });
            try {

                document.removeEventListener("click", this.hidePicker);
                this.props.validate&&this.props.validate(this.state.value);//验证
                //在此处处理失去焦点事件
                this.props.onBlur && this.props.onBlur(this.state.value, this.state.text, this.props.name);
            }
            catch (e) {

            }
        }
    }
    /**
     * 下拉框的选中事件
     * @param {*} value 
     */
    onSelect(value) {
        if (regs.date.test(value)) {
            this.input.current.setValue(value);
            this.setValue({
                show:false
            })
            this.props.onSelect&&this.props.onSelect(value,value,this.props.name);
        }
      
    }
    /**
     * 设置值
     * @param {*} value 
     */
    setValue(value) {
        if (value&&regs.date.test(value)) {
            this.setState({
                value: value
            })
            this.input.current.setValue(value);
            let datearr = value.split("-");
            this.datepicker.current.setValue(datearr[0] * 1, datearr[1] * 1, datearr[2] * 1);
        }
        else if(!value){
            this.setValue({
                value:""
            })
            this.input.current.setValue(value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (utils.diffOrder(nextProps, this.props)) {
            return true;
        }
        if (nextState.show !== this.state.show || nextState.value !== this.state.value) {
            return true;
        }
        return false;
    }

    /**
     * 清除图标
     * @returns 
     */
    renderClear() {
        return <i className={"combobox-clear icon-clear"} onClick={this.setValue.bind(this,"")} style={{ display: this.props.readOnly ? "none" : this.state.value ? "inline" : "none" }}></i>
    }
    /**
     * 日期图标
     * @returns 
     */
    renderIcon() {
        return <i className={"comboxbox-icon icon-calendar  "} onClick={this.showPicker.bind(this)}></i>
    }

    /**
     * 提示信息
     * @returns 
     */
    renderHelp() {
        return <small className={"wasabi-help-block "} style={{ display: this.state.inValidateText ? this.state.inValidateShow : "none" }}>
            <div className='text'>{this.state.inValidateText}</div>
        </small>
    }
    render() {
        return (
             <div id={this.state.containerid} className={"wasabi-form-group-body " + (this.props.readOnly || this.props.disabled ? " readOnly" : "")}>
                    <div className='combobox'>
                        {this.renderClear()}{this.renderIcon()}
                        <DateInput ref={this.input} onChange={this.onChange.bind(this)} showPicker={this.showPicker.bind(this)}> </DateInput>
                        <div className={"dropcontainter date "} style={{ display: this.state.show ? "block" : "none", }}>
                            <Calendar ref={this.datepicker} onSelect={this.onSelect.bind(this)}></Calendar>
                        </div>
                    </div>

                </div>
           
        );
    }
}
DatePicker.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    onSelect: PropTypes.func
}

export default ValidateHoc(DatePicker,Label);