import React,{Component} from 'react';
import PropTypes from "prop-types";
import ("../sass/Navigation/menu.css");
class Menus extends Component {
  constructor(props) {
    super(props);
   this.state={
     expandIndex:null,
   },
   this.expandHandler=this.expandHandler.bind(this);
  } 
static propTypes={
  style:PropTypes.object,
  className:PropTypes.string,
}
static defaultProps={
  style:{},
  className:""
}
expandHandler(index)
{
  this.setState({
  expandIndex:index===this.state.expandIndex?null:index
  })
}
  render() {
    return <div style={this.props.style} className={"wasabi-menu "+this.props.className}>
         {
                      React.  Children.map(this.props.children, (child, index) => {

                           
                            if (typeof child.type !== "function") {//非react组件
                                return child;
                            } else {
                                return React. cloneElement(child, {expandHandler:this.expandHandler.bind(this,index), expand:this.state.expandIndex===index?true:false,key: index, ref: child.ref?child.ref:index })
                            }

                        })
                    }
      </div>;
  }

}

export default  Menus;
