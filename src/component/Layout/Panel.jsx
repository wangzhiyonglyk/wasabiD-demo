/*
create by wangzy
date:2016-15-18
desc:面板组件
 */
import React from "react";
import  LinkButton from ("../Buttons/LinkButton.jsx");
import  Toolbars from ("../Buttons/Toolbar.jsx");
import ("../Sass/Layout/Panel.css");
class   Panel extends  React.Component {
   constructor(props){
       super(props);
       this.state={
        expand:this.props.expand,
        expandAble:this.props.expandAble,
        iconTip:(this.props.expand==true)?"折叠":"展开",
        iconCls:(this.props.expand==true)?"icon-fold":"icon-expand",
        height:(this.props.expand==true)?this.props.height:0,
       }
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
        this.setState({
            expand:!this.state.expand,
            iconTip:this.state.expand==true?"折叠":"展开",
            iconCls:this.state.expand==true?"icon-fold":"icon-expand",
            height:this.state.expand==true?this.props.height:0,
        })
    }
    buttonClick(name,title) {
          if(this.props.buttonClick!=null)
          {
              this.props.buttonClick(name,title);
          }
    }
    render()
    {
       let style=this.props.style?this.props.style:{};
        if(!style.width)
            {
                style.width="100%";
            }
        return (
            <div className={"wasabi-panel panel-"+this.props.theme+" "+this.props.className} style={style}  >
                <div className="panel-heading" ><span >{this.props.title}</span>
                    <div className="panel-buttons"><Toolbars buttons={this.props.buttons} onClick={this.buttonClick}></Toolbars></div>
                <div className="panel-icon" style={{display:(this.state.expandAble)?"block":"none"}}><LinkButton tip={this.state.iconTip} iconCls={this.state.iconCls} onClick={this.expandHandler}></LinkButton></div>
                </div>
                <div className={"panel-body  "}  style={{height:this.state.height}}>
                    {this.props.children}
                </div>
                </div>

                )
    }
}

propTypes={
    theme: PropTypes.oneOf([
        "default",
        "primary",
        "success",
        "info",
        "warning",
        "danger",
    ]),//主题
  
    expand:PropTypes.bool,//是否展开
    expandAble:PropTypes.bool,//是否允许展开
    title:PropTypes.string,//标题
    buttons:PropTypes.array,//按钮
    buttonClick:PropTypes.func,//按钮的单击事件
};
  Panel. defaultProps={
        theme:"default",
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