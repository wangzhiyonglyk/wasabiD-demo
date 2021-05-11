/**
 * Created by zhiyongwang on 2016-04-05以后.
 * 2020-11-08
 * 复选框组件
 */
import React from "react";
import Label from "../../Info/Label";
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc";
import func from "../../libs/func"
import propsTran from "../../libs/propsTran"
import "../Radio/radio.css"
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            value:"",
            oldPropsValue:"",//保存初始化的值
        }
        this.setValue=this.setValue.bind(this);
        this.getValue=this.getValue.bind(this);
        this.onClear=this.onClear.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value != state.oldPropsValue) {//父组件强行更新了            
            return {
                value: props.value||"",
                text:propsTran.processText(props.value, props.data).join(","),
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
    onSelect(value, text, row) {//选中事件
        if (this.props.readOnly) {
            return;
        }
        let newValue = this.state.value.toString() || ""
        let newText = this.state.text.toString() || "";
        newValue = newValue ? newValue.split(",") : [];
        newText = newText ? newText.split(",") : [];
        if (newValue.indexOf(value.toString()) > -1) {
            newValue.splice(newValue.indexOf(value.toString()), 1);
            try{
                newText.splice(newValue.indexOf(value.toString()), 1);
            }
            catch(e){

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
    render() {
        let componentClassName = "wasabi-form-group " + (this.props.className || "");//组件的基本样式 
        let control = null;
        if (this.props.data instanceof Array) {

            control = this.props.data.map((child, i) => {
                let checked = false;
                if ((this.state.value != null && this.state.value != undefined) && (("," + this.state.value.toString() + ",").indexOf("," + child[this.props.valueField ? this.props.valueField : "value"] + ",") > -1)) {
                    checked = true;
                }
                let subProps = {
                    checked: checked,//是否为选中状态
                    readOnly: this.props.readOnly == true ? "readOnly" : null,
                }
                return <li style={this.props.style} className={this.props.className} key={i} onClick={this.onSelect.bind(this, child.value, child.text, child)}  >
                    <input type="checkbox" id={"checkbox" + this.props.name + child.value}
                        className={!checked && this.props.half ? "checkbox halfcheck" : "checkbox"}  {...subProps} onChange={() => { }}></input>
                    <label className="checkbox-label" checked={checked} readOnly={this.props.readOnly || this.props.disabled} ></label>
                    <div className={"checktext " + (checked ? " checked" : "")} >{child.text}</div>
                </li >
            });

        }
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        return (
            <div className={componentClassName + " " + this.props.validateClass} style={style}>
                <Label ref="label" readOnly={this.props.readOnly || this.props.disabled} style={this.props.labelStyle} required={this.props.required}>{this.props.label}</Label>
                <div className={"wasabi-form-group-body"} style={{ minWidth: 0, width: !this.props.label ? "100%" : null }}>
                    <ul className="wasabi-checkul" >
                        {
                            control
                        }
                    </ul>

                </div>
            </div>
        )
    }
}
export default validateHoc(loadDataHoc(CheckBox, "checkbox"));
