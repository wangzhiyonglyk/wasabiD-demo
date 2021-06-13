/**
 * Created by zhiyongwang on 2016-04-05以后.
 * 2020-11-08
 * 复选框组件
 */
import React from "react";
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc";
import func from "../../libs/func"
import propsTran from "../../libs/propsTran"
import "../Radio/radio.css"

function LiView(props) {
    const { text, checked, half, readOnly } = props;
    return <li onClick={props.onSelect}  >
        <input type="checkbox" className={!checked && half ? "checkbox halfcheck" : "checkbox"} checked={checked} onChange={() => { }}></input>
        <label className="checkbox-label" readOnly={readOnly} ></label>
        <div className={"checktext " + (checked ? " checked" : "")} readOnly={readOnly} >{text}</div>
    </li >
}
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            value: "",
            oldPropsValue: null,//保存初始化的值
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
        this.props.validate && this.props.validate(value);
    }
    getValue() {
        return this.state.value;
    }
    /**
     * 清除事件
     */
    onClear() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.validate && this.props.validate("");
        this.props.onSelect && this.props.onSelect("", "", this.props.name, {});
    }
    /**
     * 选择事件
     * @param {*} value 
     * @param {*} text 
     * @param {*} row 
     * @returns 
     */
    onSelect(value = "", text) {//选中事件
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
        this.props.validate && this.props.validate(newValue.join(","));
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
            control = this.props.data.map((child, index) => {
                let checked = this.isChecked(child);
                return <LiView key={index} onSelect={this.onSelect.bind(this, child.value, child.text, child)} value={child.value} text={child.text} checked={checked} half={this.props.half} readOnly={this.props.readOnly} ></LiView>
            });
        }
        return <ul className="wasabi-checkul" >{control} {this.props.children} </ul>
    }
}
export default validateHoc(loadDataHoc(CheckBox, "checkbox"));
