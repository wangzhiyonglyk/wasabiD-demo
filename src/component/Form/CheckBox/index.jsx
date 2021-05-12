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
        this.props.validate&&this.props.validate(value);
        }
    getValue() {
        return this.state.value;
    }
    onClear() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.validate&&this.props.validate("");
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
                newText.splice(newText.indexOf(text.toString()), 1);
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
        this.props.validate&&this.props.validate(newValue.join(","));
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
        let control = null;
        if (this.props.data&&this.props.data instanceof Array) {
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
                    <input type="checkbox" id={"checkbox" + this.props.name + child.value} className={!checked && this.props.half ? "checkbox halfcheck" : "checkbox"}  {...subProps} onChange={() => { }}></input>
                    <label className="checkbox-label" checked={checked} readOnly={this.props.readOnly || this.props.disabled} ></label>
                    <div className={"checktext " + (checked ? " checked" : "")} >{child.text}</div>
                </li >
            });

        }
        return <ul className="wasabi-checkul" >{control} {this.props.children} </ul>
    }
}
export default validateHoc(loadDataHoc(CheckBox, "checkbox"));
