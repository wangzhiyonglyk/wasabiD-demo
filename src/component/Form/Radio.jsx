/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 单选框集合组件
 */
import React, { Component } from "react";
import unit from "../libs/unit.js";
import FetchModel from "../Model/FetchModel.js";
import validation from "../Lang/validation.js";
import validate from "../Mixins/validate.js";
import showUpdate from "../Mixins/showUpdate.js";

import Label from "../Unit/Label.jsx";
import Message from "../Unit/Message.jsx";

import props from "./config/propType";
import defaultProps from "./config/defaultProps.js";
import("../Sass/Form/Input.css");
import("../Sass/Form/Check.css");
class  Radio extends Component{
  constructor(props){
      super(props);
        //对传来的数据进行格式化
        console.log("radio",this.props);
        var newData = []; var text = this.props.text;
        if (this.props.data instanceof Array) {
            for (let i = 0; i < this.props.data.length; i++) {
                let obj = this.props.data[i];
                obj.text = this.props.data[i][this.props.textField?this.props.textField:"text"];
                obj.value = this.props.data[i][this.props.valueField?this.props.valueField:"value"];
                if (obj.value == this.props.value) {
                    text = obj.text;//根据value赋值
                }
                newData.push(obj);
            }
        }
        this.state = {
            params: unit.clone(this.props.params),//参数
            data: newData,
            value: this.props.value,
            text: text,
            ulShow: false,//是否显示下拉选项
            validateClass: "",//验证的样式
            helpShow: "none",//提示信息是否显示
            helpTip: validation["required"],//提示信息
            invalidTip: "",
        }
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadError = this.loadError.bind(this);
        this.loadSuccess = this.loadSuccess.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onSelect = this.onSelect.bind(this);
  }
    componentWillReceiveProps(nextProps) {
      
        if (nextProps.url) {

            if (nextProps.url != this.props.url) {
                this.loadData(nextProps.url, nextProps.params);
            }
            else if (this.showUpdate(nextProps.params, this.props.params)) {//如果不相同则更新
                this.loadData(nextProps.url, nextProps.params);
            }

        } else if (nextProps.data && nextProps.data instanceof Array) {//又传了数组
            if (nextProps.data.length != this.props.data.length) {
                    this.setState({
                        data:nextProps.data,
                        value:"",
                        text:""
                    })
            }else{
                console.log("radio",nextProps, nextProps.data);
                let newData=[];
                for(let i=0;i<nextProps.data.length;i++)
            {
                let obj=nextProps.data[i];
                obj.text=nextProps.data[i][this.props.textField?this.props.textField:"text"];
                obj.value=nextProps.data[i][this.props.valueField?this.props.valueField:"value"];
              
                newData.push(obj);
            }
          
            if(newData[0].value!=this.state.data[0].value||newData[newData.length-1].value!=this.state.data[this.state.data.length-1].value)
            {this.setState({
                data:nextProps.data,
                value:"",
                text:""
            })

            }
        }
        }
        if(nextProps.forceChange&& nextProps.value!=this.state.value)
    {
        this.setState({
            value:nextProps.value
        })
    }
    }
    componentWillMount() {//如果指定url,先查询数据再绑定
        this.loadData(this.props.url,this.state.params);//查询数据
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
      return   showUpdate.call(this, newParam, oldParam);
    }
    loadData(url,params) {
        if (url) {
            let type=this.props.httpType?this.props.httpType:"POST";
            type=type.toUpperCase();
            var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
            if(this.props.contentType){
                //如果传contentType值则采用传入的械
                //否则默认
              
                fetchmodel.contentType=  this.props.contentType;
                fetchmodel.data=fetchmodel.contentType=="application/json"? JSON.stringify(fetchmodel.data):fetchmodel.data;
            }
            type=="POST"?unit.fetch.post(fetchmodel):unit.fetch.get(fetchmodel);
            console.log("radio-fetch", fetchmodel);
        }
    }
    loadSuccess(data) {//数据加载成功
        var realData=data;
        if(this.props.dataSource==null) {
        }
        else {
            realData=unit.getSource(data,this.props.dataSource);
        }
        var newData=[];var text=this.state.text;
        for(let i=0;i<realData.length;i++)
        {
            let obj=realData[i];//将所有字段添加进来
            obj.text=realData[i][this.props.textField?this.props.textField:"text"];
            obj.value=realData[i][this.props.valueField?this.valueField:"value"];
            if(obj.value==this.state.value)
            {
                text=obj.text;//根据value赋值
            }
            newData.push(obj);
        }
        if(this.props.extraData==null||this.props.extraData.length==0)
        {
            //没有额外的数据
        }
        else
        {
            //有额外的数据
            for(let i=0;i<this.props.extraData.length;i++)
            {
                let obj={};
                obj.text=this.props.extraData[i][this.props.textField?this.props.textField:"text"];
                obj.value=this.props.extraData[i][this.props.valueField?this.props.valueField:"value"];
                if(obj.value==this.state.value)
                {
                    text=obj.text;//根据value赋值
                }
                newData.unshift(obj);
            }
        }
        window.localStorage.setItem(this.props.name+'data' ,JSON.stringify(newData));//用于后期获取所有数据

        this.setState({
            data:newData,
            value:this.state.value,
            text:text,
        })
    }
    loadError(message) {//查询失败
        console.log("radio-error",message);
        Message. error(message);
    }
    changeHandler(event) {//一害绑定，但不处理

    }
    onSelect(value,text,row) {//选中事件
        this.setState({
            value: value,
            text: text,
        });
        this.validate(value);
       
        if (this.props.onSelect != null) {
            this.props.onSelect(value, text, this.props.name, row);
        }
    }
    render() {
       
       var componentClassName = "wasabi-form-group " +this.props.className;//组件的基本样式 
        var control = null;
        let className = "wasabi-radio-btn " + (this.props.readonly ? " readonly" : "");
        if (this.state.data) {
            control = this.state.data.map((child, i)=> {
                var textFeild = child.text;
                var hideComponent = null;
                if (this.props.hideComponents instanceof Array && this.props.hideComponents[i]) {
                    hideComponent = this.props.hideComponents[i];

                }
                return (
                    <li key={i}>
                        <div  className={className+((this.state.value==child.value)?" checkedRadio":"")}
                             onClick={this.onSelect.bind(this,child.value,child.text,child)}><i>
                            <input type="radio" name={this.props.name}
                                   id={this.props.name+child.value}
                                   value={child.value}
                                   onChange={this.changeHandler}>
                            </input>
                        </i></div>
                        <div className="radiotext" onClick={this.onSelect.bind(this,child.value,child.text,child)}>{textFeild}
                            <div
                                style={{display:((this.state.value==child.value)?" inline-block":"none")}}>{hideComponent}</div>
                        </div>
                    </li>
                );
            })
        }
        let style=this.props.style?JSON.parse(JSON.stringify(this.props.style)):{};

        return (
            <div className={componentClassName+this.state.validateClass} style={style}>
                <Label name={this.props.label} hide={this.props.hide} style={this.props.labelStyle} required={this.props.required}></Label>
                <div className={ "wasabi-form-group-body"} style={{width:!this.props.label?"100%":null}}>
                    <ul className="wasabi-checkul">
                        {
                            control
                        }
                    </ul>
                    <small className={"wasabi-help-block "}
                           style={{display:(this.state.helpTip&&this.state.helpTip!="")?this.state.helpShow:"none"}}><div className="text">{this.state.helpTip}</div></small>
                </div>
            </div>

        )
    }

}

Radio.propTypes=props;
defaultProps.type = "radio";
Radio.defaultProps=defaultProps;
export default Radio;