/*
 create by wangzhiyong
 date:2016-07-04
 edit 2020-10 参照ztree改造
 desc:树下拉选择
 */
import React, { Component } from "react";
import Tree from "../../Data/Tree.jsx";
import Label from "../../Info/Label";
import props from "../config/propTypes.js";
import defaultProps from "../config/defaultProps.js";
import CheckBox from "../CheckBox/index.jsx";
import propsTran from "../../libs/propsTran.js";
import validateHoc from "../validateHoc";
import loadDataHoc from "../../loadDataHoc"
import func from "../../libs/func";
import dom from "../../libs/dom"
class TreePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerid: func.uuid(),
            show: false,//是否显示下拉框
            text: "",
            value: "",
            oldPropsValue: "",//保存初始化的值
            filterText: "",//筛选
        }
        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value != state.oldPropsValue) {//父组件强行更新了
            return {
                value: props.value||"",
                text:propsTran.processText(props.value, this.props.data),
                oldPropsValue: props.value
            }
        }
        return null;
    }

    /**
     * 设置值
     * @param {*} value 
     */
    setValue(value) {
        let text = propsTran.processText(value, this.props.data);
        this.setState({
            value: value,
            text: text,
        })
    }
    /**
     * 获取值
     * @returns 
     */
    getValue() {
        return this.state.value;
    }
    onClear() {
        this.setValue("");
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
        document.addEventListener("click", this.hidePicker)

    }
    /**
     * 隐藏下拉框
     * @param {*} event 
     */
    hidePicker(event) {
        if (!dom.isDescendant(document.getElementById(this.state.containerid), event.target)) {
            this.setState({
                show: false
            });

            try {

                document.removeEventListener("click", this.hidePicker);
                //在此处处理失去焦点事件
                this.props.onBlur && this.props.onBlur(this.state.value, this.state.text, this.props.name);
            }
            catch (e) {

            }
        }
    }
    onSelect(checked, nodeid, nodeText, children, row, name) {
        let data = this.refs.tree.getChecked();
     
        let value = []; let text = [];
        for (let i = 0; i < data.length; i++) {
            value.push(data[i].id);
            text.push(data[i].text);
        }
        this.setState({
            value: value.join(","),
            text: text.join(","),



        });
        this.props.onSelect && this.props.onSelect(value.join(","), text.join(","), this.props.name, row);

    }
    choseAllHandler(value) {
        if (value) {
            let data = this.props.data;
            let r = propsTran.getTreePickerValueAll(data);
            this.setState({
                value: r.values.join(","),
                text: r.texts.join(","),
            })
        }
        else {
            this.setState({
                value: "",
                text: "",
            })
        }
    }
    filterHandler(event) {
        if(event.keyCode===13){
            this.props.filterHandler && this.props.filterHandler(event.target.value.toString());
        }
       
      
    }
    render() {
        var componentClassName = "wasabi-form-group ";//组件的基本样式
        let inputProps =
        {
            readOnly: this.props.readOnly == true ? "readOnly" : null,
            name: this.props.name,
            placeholder: (this.props.placeholder === "" || this.props.placeholder == null) ? this.props.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-input  ",
            title: this.props.title,

        }//文本框的属性
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        return <div id={this.state.containerid} className={componentClassName + this.props.className + " " + this.props.validateClass} style={style}>
            <Label ref="label" readOnly={this.props.readOnly || this.props.disabled} style={this.props.labelStyle} required={this.props.required}>{this.props.label}</Label>
            <div className={"wasabi-form-group-body" + (this.props.readOnly || this.props.disabled ? " readOnly" : "")} style={{ width: !this.props.label ? "100%" : null }}>
                <div className="combobox"    >
                    {/* 暂时不处理 */}
                    <i className={"combobox-clear icon-clear"} onClick={this.onClear.bind(this)} style={{ display: this.props.readOnly ? "none" : (this.state.value == "" || !this.state.value) ? "none" : "inline" }}></i>
                    <i className={"comboxbox-icon icon-drop-down " + (this.state.show ? "rotate" : "")} onClick={this.showPicker.bind(this, 1)}></i>
                    <input type="text" {...inputProps} value={this.state.text} onBlur={this.props.onBlur} onClick={this.showPicker.bind(this)} onChange={() => { }} autoComplete="off" />
                    <div className={"dropcontainter treepicker  "} style={{ height: this.props.height, display: this.state.show == true ? "block" : "none" }}  >
                        <div
                            style={{
                                height: 30,
                                display: "flex",
                                marginBottom:10,
                                justifyContent: "flex-end"
                            }}
                        >
                            <input className=" wasabi-input treepickerinput"
                                onKeyUp={this.filterHandler.bind(this)}  ></input>
                            {
                                this.props.checkStyle == "checkbox" ? <CheckBox name="wasabi-tree-choseall"
                                    ref="checkbox"
                                    style={{ marginTop: -1 }}
                                    data={[{ value: "1", text: "全选" }]} onSelect={this.choseAllHandler.bind(this)}></CheckBox> : null
                            } </div>

                        <Tree
                            ref="tree"
                            {...this.props}
                            data={this.props.data}
                            /**
                             * 专门用于勾选
                             */
                            inputValue={this.state.value}
                            onChecked={this.onSelect.bind(this)}
                            checkAble={true}
                        ></Tree>
                    </div>
                </div>

                <small className={"wasabi-help-block "} style={{
                    display: (this.props.inValidateText && this.props.inValidateText != "") ?
                        this.props.inValidateShow : "none"
                }}>{this.props.inValidateText}</small>
            </div>
        </div>

    }
}
TreePicker.propTypes = props;
TreePicker.defaultProps = Object.assign({}, defaultProps, { type: "treepicker",checkStyle:"checkbox" });
export default validateHoc(loadDataHoc(TreePicker, "treepicker"));