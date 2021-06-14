/**
 * Created by zhiyongwang on 2016-04-05以后.
 * 2020-11-08
 * 复选框组件
 */
import React, { useCallback } from "react";
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc";
import func from "../../libs/func"
import propsTran from "../../libs/propsTran"
import "../Radio/radio.css"
import Msg from "../../Info/Msg";

function LiView(props) {
    //half,是从tree那里来的
    const { data, value, half, readOnly, onSelect } = props;
    let control = null;
    const isChecked = useCallback((child) => {
        let checked = false;
        if (value && (("," + value.toString() + ",").indexOf("," + child.value + ",") > -1)) {
            checked = true;
        }
        return checked;
    });
    if (data && data instanceof Array && data.length > 0) {
        control = data.map((child, index) => {
            let checked = isChecked(child);
            return <li key={index} onClick={onSelect.bind(this, child.value, child.text, child)}  >
                <input type="checkbox" className={!checked && half ? "checkbox halfcheck" : "checkbox"} checked={checked} onChange={() => { }}></input>
                <label className="checkbox-label" readOnly={readOnly} ></label>
                <div className={"checktext " + (checked ? " checked" : "")} readOnly={readOnly} >{child.text}</div>
            </li >
        })
    }
    return control;
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
        this.onSelect = this.onSelect.bind(this);
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
        if (value) {
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
        else {
            Msg.info("值是空值");
        }

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
        const { data, value, half, readOnly } = this.props;
        const liprops = { data, value, half, readOnly, onSelect: this.onSelect };
        return <ul className="wasabi-checkul" ><LiView {...liprops}></LiView> {this.props.children} </ul>
    }
}
export default validateHoc(loadDataHoc(CheckBox, "checkbox"));
