/**
 * 下拉框的文本框
 *  edit 2021-04-12 完善交互性
 */
import React from "react";
import PropTypes from "prop-types";
import BaseInput from "../BaseInput"
class ArrowInput extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {

        }
    }
    onSort(event) {
        event.stopPropagation();//防止冒泡
        this.props.onSort && this.props.onSort.bind(event);
    }
    setValue(value) {
        this.input.current.setValue(value);
    }
    render() {
        let placeholder = "可搜索";
        if ((this.props.addAbled || this.props.addAble)) {
            placeholder += ",回车添加"
        }
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
            <i title={this.props.sortType == "asc" ? "顺排" : this.props.sortType == "desc" ? "倒排" : "点击排序"} style={{ position: "absolute", top: 12, right: 10, color: (this.props.sortType ? "#409eff" : "#e4e7ed") }} className={this.props.sortType == "asc" ? "icon-sort-down" : this.props.sortType == "desc" ? "icon-sort-up" : "icon-sorting"} onClick={this.props.onSort}></i>
            <i
                title="清除"
                className={'combobox-clear icon-clear'}
                onClick={this.props.onClear}
                style={{
                    display: this.props.readOnly
                        ? 'none'
                        : this.props.value == '' || !this.props.value
                            ? 'none'
                            : 'inline'
                }}
            ></i>
            <BaseInput
                {...inputProps}
                value={
                    this.props.value || ""
                }
                onBlur={this.props.onBlur}
                onClick={this.props.onClick}
                onKeyUp={this.props.onKeyUp}
                onChange={this.props.onChange}
                autoComplete="off"
                ref={this.input}
            />
        </div>
    }
}

ArrowInput.propsTypes = {
    sortType: PropTypes.oneOf(["", "asc", "desc"]),//排序方式
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//值
    readOnly: PropTypes.bool,//是否只读
    onChange: PropTypes.func,//change事件
    onKeyUp: PropTypes.func,//键盘事件
    onBlur: PropTypes.func,//失去焦点
    onClick: PropTypes.func,//单击事件
    onClear: PropTypes.func,//清除事件

}
ArrowInput.defaultProps = {
    sortType: "",
    value: "",
    readOnly: false,
    onChange: null,
    onKeyUp: null,
    onBlur: null,
    onClick: null,
    onClear: null
}

export default ArrowInput;


