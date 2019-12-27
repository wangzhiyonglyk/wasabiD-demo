/*
 create by wangzy
 date:2016-04-05后开始独立改造
 edit 2019-12-18
 desc:按钮组件,从linkbutton独立出来

 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import ("../Sass/Buttons/button.css");

class Button  extends Component {
    constructor(props)
    {
        super(props);
        this.title = null; //初始化
        this.clickHandler=this.clickHandler.bind(this);
       this.state={

       }

    }
   
    componentWillReceiveProps (nextProps) {

       
    }
    componentDidUpdate(){
       
    }
    shouldComponentUpdate (nextProps, nextState) {
      return true;
    }
    clickHandler (event) {

        if (this.props.disabled == true) {
            return;
        }
      
        if (this.props.onClick) {
            this
                .props
                .onClick(this.props.name, this.props.title, event);
        }
    }
    render () {
        let  props = {
            className: "wasabi-button " + this.props.theme + " size-" + this.props.size + " " + this.props.className,
            style: this.props.style?this.props.style:{},
            disabled: this.props.disabled == true
                ? "disabled"
                : null,
                //文字提示
            title: this.props.title
        }
        
        return (
            <button {...props}  onClick={this.clickHandler} type="button">{this.props.children?this.props.children:this.props.title}</button>
        )
    }

}

 Button. propTypes={
    name: PropTypes.string, //按钮名称
    title: PropTypes.string, //按钮提示信息
    theme:PropTypes
        .oneOf([ //主题
            "primary",
            "default",
            "success",
            "info",
            "warning",
            "danger",
            "cancel"
        ]),
    size: PropTypes
        .oneOf([ //按钮大小
            "large",
            "default",
            "small"
        ]),
    onClick: PropTypes.func, //按钮单击事件
    className: PropTypes.string, //按钮自定义样式
    disabled: PropTypes.bool, //按钮是否无效
  
};
Button.defaultProps= {
        name:"",
        title: null,
        theme: "primary",
        size: "default",
        style:{},
        className: "",
        onClick: null,
        disabled: false,
      
     
      
    
};
 export default Button;