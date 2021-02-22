import React from 'react';
import ReactDOM from 'react-dom';
import Button from "../../app/Buttons/Button"
import Radio from "../../component/Form/Radio"
import Select from "../../component/Form/Select"
import Form from  "../../component/Form/Form"
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  componentDidMount() {
   
  }

  
  render() {
   
   return <div>
     <Button key="1" size="small" theme="success" disabled={true}>app</Button>
     <Button  key="2" size="small" theme="warning">app</Button>
     <Button  key="3" size="small" theme="info">app</Button>
     <Button  key="4" size="small" theme="danger">app</Button>
     <Form><Radio required={true}  data={[{text:"选择1",value:1},{text:"选择2",value:2}]} label="单选"></Radio>
     <Select required={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]} label="单选"></Select></Form>
  
     </div>
 
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));
