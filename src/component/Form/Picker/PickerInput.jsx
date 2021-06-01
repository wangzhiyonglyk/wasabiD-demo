/**
 * create by wangzhiyong
 * date:2021-04-20
 * desc:为了日期组件定制的输入框，独立出来
 */
import React from "react";
import PropTypes from "prop-types";
import BaseInput from "../BaseInput";
class PickerInput extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            value:this.props.value
        }
        

    }

    /**
     * 
     * @param {*} value 
     */
    setValue(value) {
      this.setState({
          value:value
      })
    }
    getValue(){
        return this.state.value;
    }

    render() {
        let inputProps =
        {
            name:this.props.name,
            title:this.props.title,
            placeholder:this.props.placeholder,
            readOnly:this.props.readOnly,
            required:this.props.required,
            className: "wasabi-input  ",//去掉className
        }//文本框的属性
        return <React.Fragment>
            <i className={"combobox-clear icon-clear"} onClick={this.props.onClear} style={{ display: this.props.readOnly ? "none" : !this.props.value ? "none" : "inline" }}></i>
            <i className={"comboxbox-icon icon-caret-down " + (this.props.show ? "rotate" : "")} onClick={this.props.onClick}></i>
            <BaseInput ref={this.input} {...inputProps} value={this.state.value||""} onClick={this.props.onClick} />
        </React.Fragment>

    }
}
PickerInput.propTypes = {
    onClear: PropTypes.func,
    onClick: PropTypes.func,
}

PickerInput.defaultProps = {
    onClear: null,
    onClick: null
}
export default PickerInput;