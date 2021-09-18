import React from 'react';
import ReactDOM from 'react-dom';
import { Login} from "../../component"
import "wasabiD/lib/index.css"
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  componentDidMount() {
   
  }
  onChange(event){
    console.log("event",event);
  }
  
  render() {  
    return <Login backgroundImage={require("./image/1.jpg")} url="http://localhost:7001/user/login"></Login>

 
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));
