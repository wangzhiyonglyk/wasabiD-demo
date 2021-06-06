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
    }
    render() {   
        return <div>
            <i className={"combobox-clear icon-clear"} onClick={this.props.onClear} style={{ display: this.props.readOnly ? "none" : this.props.value ? "inline" : "none" }}></i>
            <i className={"comboxbox-icon icon-calendar  "} onClick={this.props.onClick} ></i>
            <BaseInput
                ref={this.input}
                name={ this.props.name}
                title={this.props.title}
                placeholder={ this.props.placeholder}
                readOnly={this.props.readOnly}
                required={ this.props.required}
                value={this.props.value||""}
                onChange={this.props.onChange}
                onKeyUp={this.props.onKeyUp}
                onClick={this.props.inputClick}
                onFocus={this.props.inputFocus}
            />
        </div>

    }
}
DateInput.propTypes = {
    onClear: PropTypes.func,
    onClick: PropTypes.func,
    onChange:PropTypes.func,
}


export default DateInput;