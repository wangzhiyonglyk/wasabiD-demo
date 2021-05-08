/**
 * create by wangzhiyong
 * date:2021-04-20、
 * desc:为了日期组件定制的输入框，独立出来
 */
import React from "react";
import PropTypes from "prop-types";
import BaseInput from "../BaseInput";
class DateInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {

        }
    }
    /**
     * 显示下拉框
     */
    showPickerHandler() {
        this.props.showPicker && this.props.showPicker();
    }
    /**
     * 清除
     */
    clearHandler() {
        this.props.onChange && this.props.onChange("", "", this.props.name);
    }
    /**
     * 
     * @param {*} value 
     */
    setValue(value) {
        this.input.current.setValue(value);
    }
    render() {

        return <div> <i className={"combobox-clear icon-clear"} onClick={this.clearHandler}
            style={{
                display: this.props.readOnly
                    ? "none"
                    : !this.state.value
                        ? "none"
                        : "inline"
            }}
        ></i>
            <i className={"comboxbox-icon icon-calendar  "} onClick={this.showPickerHandler.bind(this)} ></i>
            <BaseInput
                ref={this.input}
                name={this.props.name}
                style={this.props.style}
                className={this.props.className}
                placeholder={this.props.placeholder}
                readOnly={this.props.readOnly}
                value={this.props.value}
                onClick={this.showPickerHandler.bind(this)}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                autoComplete="off"
            />
        </div>

    }
}
DateInput.propTypes = {
    showPicker: PropTypes.func,
}

DateInput.defaultProps = {
    showPicker: null
}
export default DateInput;