import React from 'react';
import PropTypes from "prop-types";
class MenuPanel extends React.Component {
  constructor(props) {
    super(props);
  
    this.activeChange=this.activeChange.bind(this);

    this.state={
     expand:this.props.expand,
     activeIndex:null,
  }
  }
  static propTypes={
    iconCls:PropTypes.string,//图标
    title: PropTypes.any.isRequired,//标题是必须，可以是组件
    expand:PropTypes.bool //是否展开
  }
  static defaultProps={
    expand:false,
    className:""
  }

  activeChange(index){
    this.setState({
      activeIndex:index
    })
}
onChange(){

}

  render() {
    return       <div   className={"dropdown "+this.props.className+" "+( this.props.expand?"expand":"")}>
    
    <label htmlFor={this.props.title} onClick={this.props.expandHandler} > <icon className={ this.props.iconCls} style={{marginRight:10}}></icon> {this.props.title}</label>
    <i className={this.props.expand?"icon-down":"icon-up"} onClick={this.props.expandHandler} ></i>
    <ul className="" style={{display:this.props.expand?"block":"none"}}>
        {this.props.children}
    </ul>
  </div>
  }

 
}
MenuPanel.propTypes = {
  className:PropTypes.string,
  iconCls:PropTypes.string,
 
};
MenuPanel.defaultProps = {
  className:"",
  iconCls: "icon-menu",
};

export default  MenuPanel;
