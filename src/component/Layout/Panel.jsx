/*
create by wangzy
date:2016-15-18
desc:面板组件
 */
import React from "react";
import PropTypes from "prop-types";

import  LinkButton from "../Buttons/LinkButton.jsx";
import  Toolbars from "../Buttons/Toolbar.jsx";
import ("../Sass/Layout/Panel.css");
class   Panel extends  React.Component {
   constructor(props){
       super(props);
       this.state={
           close:false,
           
        expand:this.props.expand,
        iconTip:(this.props.expand==true)?"折叠":"展开",
        iconCls:(this.props.expand==true)?"icon-up":"icon-down",
       
       }
       this.expandHandler=this.expandHandler.bind(this);
   }
 
    componentWillReceiveProps(nextProps) {
        this.setState({
            expand: nextProps.expand,
            expandAble:nextProps.expandAble,
           }
        );

    }
    expandHandler()
    {
        let expand=!this.state.expand;
      
        this.setState({
            expand:expand,
            iconTip:expand==true?"折叠":"展开",
            iconCls:expand?"icon-up":"icon-down",
         
        })
    }
    buttonClick(name,title) {
          if(this.props.buttonClick!=null)
          {
              this.props.buttonClick(name,title);
          }
    }
    onClose(){
this.setState({
    close:!this.state.close
})
    }
    render()
    {
       let style=this.props.style?JSON.parse( JSON.stringify( this.props.style)):{};
        if(!style.width)
            {
                style.width="100%";
                
            }
            style.height=this.state.expand?style.height:0;
            style.display=this.state.close?"none":"inline-block";
        return (
            <div className={"wasabi-panel panel-"+this.props.theme+" "+this.props.className} style={style}  >
                <div className="panel-heading" ><span >{this.props.title}</span>
                    <div className="panel-buttons"><Toolbars buttons={this.props.buttons} onClick={this.buttonClick}></Toolbars></div>
                <div className="panel-icon" style={{display:(this.props.expandAble)?"block":"none"}}>
                <i   title={this.state.iconTip} className={this.state.iconCls} onClick={this.expandHandler.bind(this)}></i>
                    <i className="icon-close" style={{marginLeft:10,display:this.props.closeAble?"inline":"none"}} title="关闭" onClick={this.onClose.bind(this)}></i>
                    </div>
                </div>
                <div className={"panel-body  "}  style={{overflow:style.height==0?"hidden":null}}>
                    {this.props.children}
                </div>
                </div>

                )
    }
}

Panel. propTypes={
    theme: PropTypes.oneOf([
        "default",
        "primary",
        "success",
        "info",
        "warning",
        "danger",
    ]),//主题
  closeAble:PropTypes.bool,//是否可以关闭
    expand:PropTypes.bool,//是否展开
    expandAble:PropTypes.bool,//是否允许展开
    title:PropTypes.string,//标题
    buttons:PropTypes.array,//按钮
    buttonClick:PropTypes.func,//按钮的单击事件
};
  Panel. defaultProps={
        theme:"default",
        closeAble:false,
        expand:true,
        className:"",
        expandAble:true,
        title:"",
        height:400,
        backgroundColor:null,
        buttons:[],
        buttonClick:null,
    };
export default  Panel;