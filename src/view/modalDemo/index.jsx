import React from 'react';
import ReactDOM from 'react-dom';
import Resize from "../../component/Layout/Resize";
import Form from "../../component/Form/Form";
import Input from "../../component/Form/Input";
import Button from "../../component/Buttons/Button"
import  DateTime from "../../component/Form/DateTime";
import Row from "../../component/Layout/Row";
import Col from "../../component/Layout/Col";
import LinkButton from "../../component/Buttons/LinkButton"
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

onClick(){
 this.refs.form.validate();
}
  render() {
  
    return ( <div className="container">
       <Form ref="form">
        
         <Input ref="datetime"  type="email" name="idcard"></Input>
         <Input type="idcard" name="dd"></Input>
          <LinkButton iconCls="icon-add" iconAlign="rightTop">新增</LinkButton>
       </Form>
       <Button onClick={this.onClick.bind(this)}>确定</Button>
       </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
