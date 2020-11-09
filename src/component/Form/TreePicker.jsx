/*
 create by wangzy
 date:2016-07-04
 edit 2020-10 参照ztree改造
 desc:树下拉选择
 */
import React, { Component } from "react";
import Tree from "../Data/Tree.jsx";
import validation from "../Lang/validation.js";
import Label from "../Info/Label.jsx";
import ClickAway from "../libs/ClickAway.js";
import mixins from '../Mixins/mixins';
import props from "./config/propType.js";
import defaultProps from "./config/defaultProps.js";
import _ComboBox from "./baseClass/_ComboBox.jsx";
class TreePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,//是否显示下拉框
            text: this.props.text,
            value: this.props.value,
            oldPropsValue: this.props.value,//保存初始化的值
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value != prevState.oldPropsValue) {//父组件强行更新了
            return {
                value: nextProps.value,
                text: nextProps.text,
                oldPropsValue: nextProps.value
            }
        }
        return null;
    }
    componentDidMount() {
        this.registerClickAway(this.hidePicker, this.refs.picker);//注册全局单击事件
    }
    showPicker() {//显示选择
        if (this.props.readOnly) {
            //只读不显示
            return;
        }
        else {
            this.setState({
                show: true
            })
        }
        this.bindClickAway();//绑定全局单击事件
    }
    hidePicker() {
        this.setState({
            show: false
        })
        this.refs.label.hideHelp();//隐藏帮助信息
        this.unbindClickAway();//卸载全局单击事件
    }
    onSelect() {
        let data = this.refs.tree.getChecked();
        let value = [], text = [];
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                value.push(data[i].id);
                text.push(data[i].text);
            }
        }
        this.setState({
            value: value.join(","),
            text: text.join(","),

        });
        this.props.onSelect && this.props.onSelect(value, text, name);

    }
    render() {
        var componentClassName = "wasabi-form-group ";//组件的基本样式
        let inputProps =
        {
            readOnly: this.props.readOnly == true ? "readOnly" : null,

            name: this.props.name,
            placeholder: (this.props.placeholder === "" || this.props.placeholder == null) ? this.props.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  ",
            title: this.props.title,

        }//文本框的属性
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        return <div className={componentClassName + this.props.className + " " + this.props.validateClass} ref="picker" style={style}>
            <Label name={this.props.label} readOnly={this.props.readOnly||this.props.disabled} ref="label" style={this.props.labelStyle} required={this.props.required}></Label>
            <div className={"wasabi-form-group-body" +(this.props.readOnly||this.props.disabled?" readOnly":"")} style={{ width: !this.props.label ? "100%" : null }}>
                <div className="combobox"    >
                    <i className={"combobox-clear "} onClick={this.clearHandler.bind(this)} style={{ display: this.props.readOnly ? "none" : (this.state.value == "" || !this.state.value) ? "none" : "inline" }}></i>
                    <i className={"comboxbox-icon  " + (this.state.show ? "rotate" : "")} onClick={this.showPicker.bind(this, 1)}></i>
                    <input type="text" {...inputProps} value={this.state.text} onClick={this.showPicker.bind(this)} onChange={() => { }} />
                    <div className={"dropcontainter treepicker  "} style={{ height: this.props.height, display: this.state.show == true ? "block" : "none" }}  >
                        <Tree
                            ref="tree"
                            /**
                             * 包括了simpleData
                             */
                            {...this.props}
                            data={this.state.data} onChecked={this.onSelect.bind(this)}
                            checkAble={true}
                            inputValue={this.state.value}

                        ></Tree>
                    </div>
                </div>

                <small className={"wasabi-help-block "} style={{ display: (this.props.inValidateText && this.props.inValidateText != "") ? this.props.inValidateShow : "none" }}>{this.props.inValidateText}</small>
            </div>
        </div>

    }
}
TreePicker.propTypes = props;
TreePicker.defaultProps = Object.assign(defaultProps, { type: "treepicker" });
mixins(TreePicker, [ClickAway]);
export default _ComboBox(TreePicker);