/**
 * Created by zhiyongwang on 2020-11-06
 * 添加类型按钮的筛选框
 * 
 */
import React from "react";
import Label from "../../Info/Label";
import Button from "../../Buttons/Button"
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc";
import func from "../../libs/func"
import propsTran from "../../libs/propsTran"
class CheckButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            value: "",
            oldPropsValue: "",//保存初始化的值
        }
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value != state.oldPropsValue) {//父组件强行更新了            
            return {
                value: props.value || "",
                text: propsTran.processText(props.value, props.data).join(","),
                oldPropsValue: props.value
            }
        }
        return null;
    }
    setValue(value) {
        this.setState({
            value: value,
            text: propsTran.processText(value, this.props.data).join(",")
        })
    }
    getValue() {
        return this.state.value;
    }
    onClear() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.onSelect && this.props.onSelect("", "", this.props.name, {});
    }
    onSelect(value = "", text, row) {//选中事件
        if (this.props.readOnly) {
            return;
        }
        let newValue = this.state.value.toString() || ""
        let newText = this.state.text.toString() || "";
        newValue = newValue ? newValue.split(",") : [];
        newText = newText ? newText.split(",") : [];
        if (newValue.indexOf(value.toString()) > -1) {
            newValue.splice(newValue.indexOf(value.toString()), 1);
            try {
                newText.splice(newText.indexOf(text.toString()), 1);
            }
            catch (e) {

            }

        }
        else {
            newValue.push(value);
            newText.push(text);
        }
        this.setState({
            value: newValue.join(","),
            text: newText.join(",")
        })
        this.props.onSelect && this.props.onSelect(newValue.join(","), newText.join(","), this.props.name, row);

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (func.diffOrder(nextProps, this.props)) {
            return true;
        }
        if (func.diff(nextState, this.state)) {
            return true;
        }
        return false;
    }
    isChecked(child) {
        let checked = false;
        if ((this.state.value != null && this.state.value != undefined) && (("," + this.state.value.toString() + ",").indexOf("," + child[this.props.valueField ? this.props.valueField : "value"] + ",") > -1)) {
            checked = true;
        }
        return checked;
    }

    render() {
        let control = null;
        if (this.props.data && this.props.data instanceof Array) {
            control = this.props.data.map((child, i) => {
                let checked = this.isChecked(child);
                return <Button className={child.className} style={child.style} theme={checked ? this.props.theme || "primary" : "default"} key={i}
                    onClick={this.props.readOnly ? () => { } : this.onSelect.bind(this, child.value, child.text, child)}
                >{child.text}</Button>
            });
        }
        return <ul className="wasabi-checkul" style={{ marginTop: 6 }}>{control} {this.props.children} </ul>
    }
}
export default validateHoc(loadDataHoc(CheckButton, "checkbox"));
