import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input} from "../../component"
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
    return <div>
      <Form  style={{width:1000}}>
      <Input key="1" type="date"></Input>
      <Input key="2" type="time"></Input>
      <Input key="3" type="datetime"></Input>
      <Input key="4" type="daterange"></Input>
      </Form>
    </div>

 
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));
