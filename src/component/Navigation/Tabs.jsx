//create by wangzy
//date:2016-02-18
//标签页组
import React from "react";
import PropTypes from "prop-types";
require("../sass/Navigation/Tabs.css");

// var addRipple=require("../Mixins/addRipple.js");
class  Tabs extends React.Component{
      
     constructor(props){
         super(props);
         this.state={
            activeIndex:this.props.activeIndex
         }
         this.tabClickHandler=this.tabClickHandler.bind(this);
         this.onClose=this.onClose.bind(this);
     }

        componentWillReceiveProps (nextProps)
        {
           
            this.setState({
                activeIndex:nextProps.activeIndex!=null&&nextProps.activeIndex!=undefined?nextProps.activeIndex:0
            })
        }
        tabClickHandler(index,event) {

            this.rippleHandler(event);
            //页签单击事件
           this.setState({
               activeIndex:index
           })
        }
        onClose(index){
            this.props.onClose&&this.props.onClose(index,this.state.activeIndex);
        }
        render () {
            return (
                <div className="wasabi-tabs" >
                    <div  >
                        {
                            
                            React.Children.map(this.props.children, (child, index) => {
                              
                                return    <a key={index} href="javascript:void(0);"  onClick={this.tabClickHandler.bind(this,index)} className={"wasabi-tab "+this.props.theme+" "+(this.state.activeIndex==index?"active ":"")} >
                                    {child.props.title}
                                     <i className="tab-icon icon-close" onClick={this.onClose.bind(this,index)}></i>
                                </a>
                            })
                        }
                    </div>
                    { 
                            React.Children.map(this.props.children, (child, index) => {
                               
                            return  <div key={index} style={this.props.style} className={"section  "+this.props.theme+ " "+(index==this.state.activeIndex?"active":"")}  >
                      {child}
                       </div>
                        })
                        }
                   
                </div>)

        }
    }

Tabs. propTypes={
    theme: PropTypes.oneOf([//主题
        "primary",
        "default",
       
    ]),
    activeIndex:PropTypes.number,
    onClose:PropTypes.func,
};
Tabs.defaultProps= {
     
        theme:"default",
        activeIndex:0,
        onClose:null,

    
};
export default  Tabs;
