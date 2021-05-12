//create by wangzhiyong
//date:2016-02-18
//标签页组
import React from "react";
import PropTypes from "prop-types";
import func from "../libs/func"
require("../sass/Navigation/Tabs.css");

// var addRipple=require("../Mixins/addRipple.js");
class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navid:func.uuid(),//id
            activeIndex: this.props.activeIndex,
            oldActiveIndex: this.props.activeIndex,//保留旧的
            childrenlength:React.Children.count(this.props.children)||0,//旧的子节点个数
        }
        this.tabClickHandler = this.tabClickHandler.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    static getDerivedStateFromProps(props, state)
    {  
        let activeIndex=state.activeIndex;
        if (props.children.length >state.childrenlength) {
            activeIndex = props.children.length - 1
        }
        else  if (props.activeIndex!=state.oldActiveIndex) {
            activeIndex=props.activeIndex;//强行刷新
        }

      return {
            activeIndex: activeIndex,
            childrenlength:props.children.length||0
        }
    }
    componentDidMount(){

    }
    tabClickHandler(index, event) {

        //页签单击事件
        this.setState({
            activeIndex: index
        })
        this.props.tabClick&&this.props.tabClick(index)
    }
    onClose(index) {
        this.props.onClose && this.props.onClose(index, this.state.activeIndex);
    }
    changeActive(index){
        if(this.props.children&&index>-1&&index< React.Children.count(this.props.children)){
            this.setState({
                activeIndex:index
            })
            this.props.tabClick&&this.props.tabClick(index)
        }
     
    }
    render() {
        return (    
            <div className={"wasabi-tabs "+this.props.className} style={this.props.style} >
                <div  className={"wasabi-tab-nav "} id={this.state.navid} >
                    {

                        React.Children.map(this.props.children, (child, index) => {

                            if (child) {
                                let iconCls = child && child.props.iconCls ? child.props.iconCls : "txt";
                                return <div key={index} onClick={this.tabClickHandler.bind(this, index)} className={"wasabi-tab " + this.props.theme + " " + (this.state.activeIndex == index ? "active " : "")} >
                                    <i className={"" + iconCls} style={{ marginRight: 5 }}></i>
                                    {child.props.title}
                                    <i className="tab-icon icon-close" style={{display:child.props.closeAble?"inline":"none"}} onClick={this.onClose.bind(this, index)}></i>
                                </div>
                            }
                            return null;

                        })
                    }
                </div>
                {
                    React.Children.map(this.props.children, (child, index) => {

                        return <div key={index} style={this.props.style} className={"section  " + this.props.theme + " " + (index == this.state.activeIndex ? "active" : "")}  >
                            {child}
                        </div>
                    })
                }

            </div>)

    }
}

Tabs.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    theme: PropTypes.oneOf([//主题
        "primary",
        "default",
        "warning",
        "info",
        "danger",
        "success",
    ]),
    activeIndex: PropTypes.number,//活动下标
    onClose: PropTypes.func,//关闭事件
    tabClick: PropTypes.func,//单击事件
};
Tabs.defaultProps = {
    className:"",
    style:{},
    theme: "primary",
    activeIndex: 0,
    onClose: null,
    tabClick:null

};
export default Tabs;
