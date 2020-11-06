/**
 * Created by zhiyongwang on 2016-04-05以后.
 * 复选框集合组件
 */

import React, { Component } from "react";
import func from "../libs/func.js";
import FetchModel from "../Model/FetchModel.js";
import validation from "../Lang/validation.js";
import validate from "../Mixins/validate.js";
import diff from "../libs/diff.js";
import Button from "../Buttons/Button"
import Label from "../Info/Label.jsx";
import Msg from "../Info/Msg.jsx";
import propsTran from '../libs/propsTran'
import props from "./config/propType.js";
import defaultProps from "./config/defaultProps.js";
import("../Sass/Form/Input.css");
import("../Sass/Form/Check.css");

class CheckButton extends Component {
    constructor(props) {
        super(props);       
        //对传来的数据进行格式化
        let newData = propsTran.setValueAndText(this.props.data, this.props.valueField, this.props.textField);
        this.state = {
            oldPropsValue:this.props.value,//保存用于匹配
            url:this.props.url,
            rawData:this.props.data,
            params: func.clone(this.props.params),//参数
            data: newData,
            value: this.props.value,
            text: this.props.text,
            ulShow: false,//是否显示下拉选项
            validateClass: "",//验证的样式
            helpShow: "none",//提示信息是否显示
            helpTip: validation["required"],//提示信息
            invalidTip: "",
            reloadData:false,
            valueField:this.props.valueField,
            textField:this.props.textField,
        }
     
      
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadError = this.loadError.bind(this);
        this.loadSuccess = this.loadSuccess.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
      
    //     if (nextProps.url) {

    //         if (nextProps.url != this.props.url) {
    //             this.loadData(nextProps.url, nextProps.params);
    //         }
    //         else if (this.showUpdate(nextProps.params, this.props.params)) {//如果不相同则更新
    //             this.loadData(nextProps.url, nextProps.params);
    //         }

    //     } else if (nextProps.data && nextProps.data instanceof Array) {//又传了数组
    //         if (nextProps.data.length != this.props.data.length) {
    //                 this.setState({
    //                     data:nextProps.data,
    //                     value:nextProps.forceChange?nextProps.value:this.state.value,
    //                     text:nextProps.forceChange?nextProps.text:this.state.text,
    //                 })
    //         }else{
    //             let newData=[];
    //             for(let i=0;i<nextProps.data.length;i++)
    //         {
    //             let obj=nextProps.data[i];
    //             obj.text=nextProps.data[i][this.props.textField?this.props.textField:"text"];
    //             obj.value=nextProps.data[i][this.props.valueField?this.props.valueField:"value"];
              
    //             newData.push(obj);
    //         }
    //         if(newData[0].value!=this.state.data[0].value||newData[newData.length-1].value!=this.state.data[this.state.data.length-1].value)
    //         {this.setState({
    //             data:nextProps.data,
    //                     value:nextProps.forceChange?nextProps.value:this.state.value,
    //                     text:nextProps.forceChange?nextProps.text:this.state.text,
    //         })

    //         }
    //     }
    // }else{
       
    // }

    //  if(nextProps.forceChange)
    // {
      
    //     this.setState({
    //         value:nextProps.value
    //     })
    // }
        
    // }
    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};
        if (nextProps.url && nextProps.params &&
            diff(nextProps.params, prevState.params)) {//如果有url
            newState = {
                reloadData: true,//重新加载
                url: nextProps.url,
                params: func.clone(nextProps.params),
            }
        }
        if (nextProps.data && nextProps.data instanceof Array && diff(nextProps.data, prevState.rawData)) {
            //如果传了死数据
            newState.data = propsTran.setValueAndText(nextProps.data, prevState.valueField, prevState.textField);
            newState.rawData=nextProps.data;
        }
        if (nextProps.value != prevState.oldPropsValue) {
            newState.value = nextProps.value;
            newState.text = nextProps.text;
            newState.oldPropsValue = nextProps.value;
          }
        if (func.isEmptyObject(newState)) {
            return null;
        }
        else {
            return newState;
        }
    }
    componentDidUpdate() {
        if (this.state.reloadData) {
            this.setState({
                realData: false
            })
            this.loadData(this.state.url, this.state.params);
        }
    }

    setValue(value) {
        let text = "";
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].value == value) {
                text = this.state.data[i].text;
                break;
            }
        }


        this.setState({
            value: value,
            text: text
        })


    }
    getValue() {
        return this.state.value;

    }
    validate(value) {

        return validate.call(this, value)
    }
    showUpdate(newParam, oldParam) {
       return  showUpdate.call(this, newParam, oldParam);
    }
    componentDidMount() {//如果指定url,先查询数据再绑定
        this.loadData(this.state.url, this.state.params);//查询数据
    }
    loadData(url, params) {

        if (url) {
            let type=this.props.httpType?this.props.httpType:"POST";
            type=type.toUpperCase();
            var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
            fetchmodel.headers=this.props.httpHeaders;
            if(this.props.contentType){
                //如果传contentType值则采用传入的械
                //否则默认
              
                fetchmodel.contentType=  this.props.contentType;
                fetchmodel.data=fetchmodel.contentType=="application/json"? JSON.stringify(fetchmodel.data):fetchmodel.data;
            }
            type=="POST"?func.fetch.post(fetchmodel):func.fetch.get(fetchmodel);
            console.log("checkbox-fetch", fetchmodel);
        }
    }
    loadError( message) {//查询失败
        console.log("checkbox-error", message);
        Msg.error(message);
    }
    loadSuccess(data) {//数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {
        }
        else {
            realData = func.getSource(data, this.props.dataSource);
        }
        var newData = []; var text = this.state.text;
        for (let i = 0; i < realData.length; i++) {
            let obj = realData[i];//将所有字段添加进来
            obj.text = realData[i][this.state.textField?this.state.textField:"text"];
            obj.value = realData[i][this.state.valueField?this.state.valueField:"value"];
            if (obj.value == this.state.value) {
                text = obj.text;//根据value赋值
            }
            newData.push(obj);
        }
      
        this.setState({
            data: newData,
            value: this.state.value,
            text: text,
        })
    }
    changeHandler(event) {//一定绑定，但不处理

    }

    onSelect(value, text, row, e) {//选中事件
       e&&e.preventDefault&&  e.preventDefault();//因为有用户借助label属性生成新的checkbox,所以要阻止默认事件
        if (this.props.readonly) {
            return;
        }
        var newvalue = ""; var newtext = "";
        var oldvalue = "";
        var oldtext = "";
        if (!this.state.value) {//没有选择任何项
        }
        else {
            oldvalue = this.state.value.toString();
        }
        if (!this.state.text) {//没有选择任何项
        }
        else {
            oldtext = this.state.text.toString();
        }
        if (("," + oldvalue).indexOf("," + value) > -1) {
            //取消选中
            if (oldvalue.indexOf("," + value) > -1) {//说明不是第一个
                newvalue = (oldvalue).replace("," + value, "");
                newtext = (oldtext).replace("," + text, "");
            }
            else if (oldvalue.indexOf(value + ",") > -1) {//第一个
                newvalue = (oldvalue).replace(value + ",", "");
                newtext = (oldtext).replace(text + ",", "");
            }
            else if (oldvalue.indexOf(value) > -1) {//只有一个
                newvalue = (oldvalue).replace(value, "");
                newtext = (oldtext).replace(text, "");
            }

        }
        else {//选中

            newvalue = oldvalue === "" ? value : oldvalue + "," + value;
            newtext = oldvalue === "" ? text : oldtext + "," + text;
        }
        this.setState({
            value: newvalue,
            text: newtext
        });

        this.validate(newvalue);
        if (this.props.onSelect != null) {
            this.props.onSelect(newvalue, newtext, this.props.name, row);
        }
    }
    render() {

     
        var componentClassName = "wasabi-form-group ";//组件的基本样式
        var control = null;
        
        if (this.state.data instanceof Array) {
            control = this.state.data.map((child, i) => {
                var checked = false;
                if ((this.state.value != null && this.state.value != undefined) && (("," + this.state.value.toString()).indexOf("," + child[this.state.valueField?this.state.valueField:"value"]) > -1)) {
                    checked = true;
                }
              
                var props = {
                    checked: checked,//是否为选中状态
                    readOnly: this.props.readonly == true ? "readonly" : null,
                }
               
                return <Button className={child.className} style={child.style} theme={checked?"primary":"default"} key={i} 
                onClick={this.onSelect.bind(this,child.value,child.text,child)}
                >{child.text}</Button>
            });

        }
        let style=this.props.style?JSON.parse(JSON.stringify(this.props.style)):{};
        if(this.props.hide){
            style.display="none";
        }else{
            style.display="flex";
        }
        return (

            <div className={componentClassName + this.state.validateClass}  style={style}>
                <Label name={this.props.label} ref="label" style={this.props.labelStyle}  required={this.props.required}></Label>
                <div className={"wasabi-form-group-body"} style={{ minWidth:0, width: !this.props.label ? "100%" : null }}>
                    <ul className="wasabi-checkul" style={{marginTop:6}}>
                        {
                            control
                        }
                    </ul>
                    <small className={"wasabi-help-block "} style={{ display: (this.state.helpTip && this.state.helpTip != "") ? this.state.helpShow : "none" }}><div className="text">{this.state.helpTip}</div></small>
                </div>
            </div>

        )

    }

}
CheckButton.propTypes = props;

CheckButton.defaultProps =  Object.assign({},defaultProps,{type:"checkbutton"});

export default CheckButton;

