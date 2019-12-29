import React from 'react';
import PropTypes from "prop-types";
class Menu extends React.Component {
  constructor(props) {
    super(props);
  
    this.activeChange=this.activeChange.bind(this);

    this.state={
     expand:this.props.expand,
     activeIndex:null,
  }
  }
  static propTypes={
    title: PropTypes.any.isRequired,//标题是必须，可以是组件
    expand:PropTypes.bool //是否展开
  }
  static defaultProps={
    expand:false,
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
    <input name={this.props.title}  onChange={this.onChange.bind(this)} type="checkbox" checked={this.props.expand} value="menu"/>
    <label htmlFor={this.props.title} onClick={this.props.expandHandler} >{this.props.title}</label>
    <i></i>
    <ul className="animate" style={{display:this.props.expand?"block":"none"}}>
        {
            React.Children.map(this.props.children, (child, index) => {
                    return  <li className={"animate " +(this.state.activeIndex==index?"active":"")}key={index} onClick={this.activeChange.bind(this,index)}>{child}</li>
            })
        }
    </ul>
  </div>;
  }

 
}

export default  Menu;
