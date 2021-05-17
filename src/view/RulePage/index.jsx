import React from "react";
import ReactDOM from 'react-dom';
import model from "./model";
import {Single} from "../../component"
class RulePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      model:model
    }
  }
  render(){
      return <Single model={this.state.model} title={"规则管理"}></Single>
  }
}

ReactDOM.render(<RulePage />, document.getElementById('root'));