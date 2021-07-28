import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from "../../component"

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  componentDidMount() {
   
  }

  
  render() {
   
      // return<Login title="BI数据分析系统" url="http://localhost:7007/user/login"></Login>
      return <img src={require("./image/test.png")}></img>
 
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));
