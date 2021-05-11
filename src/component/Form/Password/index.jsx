import React from "react";
import BaseInput from "../BaseInput"
import Label from "../../Info/Label"
import validateHoc from "../validateHoc";
import propType from "../config/propTypes.js";
import defaultProps from "../config/defaultProps.js";
class Password extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputControl = React.createRef();
        this.inputdom = React.createRef();
        this.tempValue = this.props.value || "";
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * change
     * @param {*} value 
     */
    onChange(event) {
        let value = event.target.value;
        if (event.target.selectionStart === value.length) {
            this.inputControl.current.setValue(value.replace(/./g, "*"));
            let add = value.length > this.tempValue.length;
            this.tempValue = add ? this.tempValue + (value.slice(this.tempValue.length)) : this.tempValue.slice(0, value.length);
            this.props.onChange && this.props.onChange(tempValue, tempValue, this.props.name, event)
        }
        else {
            //禁止从中间删除
            this.inputControl.current.setValue(this.tempValue.replace(/./g, "*"));
        }

    }
    getValue() {
        return this.tempValue;
    }
    setValue(value) {
        this.inputControl.current.setValue(value.replace(/./g, "*"));
        this.tempValue = value;
    }
    onKeyUp(event) {

        if (event.keyCode >= 35 && event.keyCode <= 40) {
            //控制光标位置
            event.target.selectionStart = event.target.value.length;
        }

    }
    onBlur(event) {
        this.props.validate && this.props.validate(this.tempValue)
    }
    /**
     * 粘贴处理
     * @param {*} event 
     */
    onPaste(event) {
        event.preventDefault();
    }
    onClick(event) {
        //控制光标位置
        event.target.selectionStart = event.target.value.length;
    }
    render() {
        return <div className={componentClassName + " " + this.props.validateClass} onPaste={this.onPaste} style={style}>
            <Label ref="label" readOnly={this.props.readOnly || this.props.disabled} style={this.props.labelStyle} required={this.props.required}>{this.props.label}</Label>
            <div className={'wasabi-form-group-body' + (this.props.readOnly || this.props.disabled ? " readOnly" : "")}>
                <BaseInput   {...this.props} ref={this.inputControl} onBlur={this.onBlur} onPaste={this.onPaste} onChange={this.onChange}
                    onKeyUp={this.onKeyUp} onClick={this.onClick} onFocus={this.onClick} ></BaseInput>
                {this.props.children}
                <small className={"wasabi-help-block "} style={{
                    display: (this.state.inValidateText && this.state.inValidateText != "") ?
                        this.state.inValidateShow : "none"
                }}>
                    {this.state.inValidateText}
                </small>
            </div>
        </div>
    }
}
Password.propTypes = propType;
Password.defaultProps = Object.assign({}, defaultProps, { type: "password" });;
export default validateHoc(Password);
