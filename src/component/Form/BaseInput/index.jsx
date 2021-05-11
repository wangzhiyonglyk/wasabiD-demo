/**
 * 基础输入框
 * create by wangzhiyong
 * date:2021-04-16
 */
import React from "react";
import PropTypes from "prop-types";
import utils from "../../libs/func"

class BaseInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            color: "default"
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.setState({
            value: this.props.value,
            color: this.props.color//消息框的类型
        })
    }
    /**
     * 获取值
     * @returns 
     */
    getValue() {
        return this.state.value;
    }
    /**
     * 更新信息，用于父组件调用
     */
    setValue(value = "", color = "default") {
        this.setState({
            value: value,
            color: color
        })
    }
    /**
     * 
     * @param {*} nextProps 
     * @param {*} nextState 
     * @returns 
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (utils.diffOrder(nextProps, this.props)) {
            return true;
        }
        if (utils.diffOrder(nextState.value, this.state.value) || utils.diffOrder(nextState.color, this.state.color)) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {*} event 
     */
    onChange(event) {
        if (this.props.readOnly) {

        }
        else {
            this.setState({
                value: event.target.value,//不能除去两端空格
            })
            this.props.onChange && this.props.onChange(event, this.props.name);
        }
    }

    render() {
        let style = {
            ...this.props.style,
        }
        return <div ><input
            type={"text"}
            tab={1}
            required={this.props.required || false}
            readOnly={this.props.readOnly || false}
            placeholder={this.props.placeholder || ""}
            title={this.props.title || ""}
            className={"wasabi-input " + this.props.className || ""}
            style={style}
            value={this.state.value || ""}
            onBlur={this.props.onBlur}
            onClick={this.props.onClick}
            onKeyUp={this.props.onKeyUp}
            onChange={this.onChange}
            onFocus={this.props.onFocus}
            onPaste={this.props.onPaste}
            onMouseDown={this.props.onMouseDown}
            onMouseUp={this.props.onMouseUp}
            onSelect={this.props.onSelect}
            autoComplete="off"
        /></div>


    }
}
BaseInput.propsTypes = {
    name: PropTypes.string,//name
    className: PropTypes.string,//css样式
    style: PropTypes.object,//样式
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),//字体颜色
    onChange: PropTypes.func,//change事件
    onKeyUp: PropTypes.func,//键盘事件
    onFocus: PropTypes.func,//得到焦点
    onBlur: PropTypes.func,//失去焦点
    onClick: PropTypes.func,//单击事件

}
BaseInput.defaultProps = {
    className: ""
}
export default BaseInput;


