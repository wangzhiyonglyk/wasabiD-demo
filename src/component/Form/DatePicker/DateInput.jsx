/**
 * create by wangzhiyong
 * date:2021-04-20
 * desc:为了日期组件定制的输入框，独立出来
 */
import React from "react";
import PropTypes from "prop-types";
import BaseInput from "../BaseInput";
class DateInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.onChange = this.onChange.bind(this)
    }
    onChange(event) {
        this.props.onChange && this.props.onChange(event.target.value, event.target.value, this.props.name);
    }
    /**
     * 
     * @param {*} value 
     */
    setValue(value) {
        this.input.current.setValue(value);
    }

    render() {
        let inputProps =
        {
            name: this.props.name,
            title: this.props.title,
            placeholder: this.props.placeholder,
            readOnly: this.props.readOnly,
            required: this.props.required,
            className: "wasabi-input  ",//去掉className
        }//文本框的属性
        return <div>
            <i className={"combobox-clear icon-clear"} onClick={this.props.onClear} style={{ display: this.props.readOnly ? "none" : this.props.value ? "inline" : "none" }}></i>
            <i className={"comboxbox-icon icon-calendar  "} onClick={this.props.onClick} ></i>
            <BaseInput
                ref={this.input}
                {...inputProps}
                onClick={this.props.onClick}
                onChange={this.onChange}
            />
        </div>

    }
}
DateInput.propTypes = {
    onClear: PropTypes.func,
    onClick: PropTypes.func,
}

DateInput.defaultProps = {
    onClear: null,
    onClick: null
}
export default DateInput;