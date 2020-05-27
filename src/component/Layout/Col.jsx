/**
 * crate by wangzhyong
 * date:2017-08-20
 * desc 列
 */
import React from 'react';
import PropTypes from "prop-types";

class Col extends React.Component {
    constructor(props) {
        super(props);
        this.validate=this.validate.bind(this);
        this.getData=this.getData.bind(this);
        this.setData=this.setData.bind(this);
        this.clearData=this.clearData.bind(this);
    }
    static propTypes = {
        cols: PropTypes.number,
        style: PropTypes.object,
        className: PropTypes.string,
    }
    static defaultProps = {
        cols: 3,//默认3列
        style: {},
        className: ""
    }
    validate () {
          
        let isva = true;
        for (let v in this.refs) {
          
            if(isva)
            {//如果验证是正确的，继续获取值
                isva = this.refs[v].validate ? this.refs[v].validate() : isva;
            }
           else{//如果前一个验证失败，则验证不拿值
            this.refs[v].validate ? this.refs[v].validate():void(0);
           }
            
        }
        return isva;
    }
    getData () {
        var data = {}
        for (let v in this.refs) {      
            if (this.refs[v].props.name&&this.refs[v].getValue) {//说明是表单控件
                if (this.refs[v].props.name.indexOf(",") > -1) {//含有多个字段
                    var nameSplit = this.refs[v].props.name.split(",");
                    if (this.refs[v].getValue()) {
                        var valueSplit = this.refs[v].getValue().split(",");
                        for (let index = 0; index < nameSplit.length; index++) {
                            if (index < valueSplit.length) {
                                data[nameSplit[index]] = valueSplit[index];
                            }
                        }
    
                    }
                    else {
                        for (let index = 0; index < nameSplit.length; index++) {
                            data[nameSplit[index]] = "";
                        }
                    }
                }
                else {
                    data[this.refs[v].props.name] = this.refs[v].getValue();
                }
            }
            else if(this.refs[v].getData){//布局组件或者表单组件
                data=Object.assign(data,this.refs[v].getData())
            } 
    
    
        }
        return data;
    }
    
    setData (data) {//设置值,data是对象
    
        if (!data) {
            return;
        }
        for (let v in this.refs) {
            if (this.refs[v].props.name&&data[this.refs[v].props.name]) {
                this.refs[v].setValue&&this.refs[v].setValue(data[this.refs[v].props.name]);
            }
            else if(this.refs[v].setData)
                {//表单或者布局组件
                    this.refs[v].setData(data);
                }
        }
    }
    clearData () {
        for (let v in this.refs) {
          this.refs[v].setValue && this.refs[v].setValue("");
            this.refs[v].clearData && this.refs[v].clearData();
        }
    }
    render() {
        return <div className={"col-xs-" + this.props.cols+""}>{
           React.Children.map(this.props.children, (child, index) => {
        
            if(typeof child.type !=="function" )
            {//非react组件
              return child;
            }
            else{
                if(child.ref)
                {
                   child;
                }
                else{
                    return React. cloneElement(child, { disabled:this.props.disabled?this.props.disabled:child.props.disabled,   readonly: this.props.disabled?this.props.disabled:child.props.readonly, key: index, ref: child.ref?child.ref:index })
                }
             
            }
        })}</div>;
    }
}

export default Col;
