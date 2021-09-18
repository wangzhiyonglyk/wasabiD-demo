import React from "react";
import ReactDOM from "react-dom";
import {Input,Button, Form} from "../../component"
class ChangePassword extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    onSubmit(){
        if(this.refs.form.validate()){

        }
    }
    render(){
        return <div style={{textAlign:"center",paddingTop:40}}> 
            <Form ref="form" cols={1} style={{width:600}}> 
            <Input key="1" type="password" label="旧密码"  name="oldPassword" required={true}></Input>
            <Input key="2" type="password" label="新密码" name="newPassword" required={true}></Input>
            <Input key="3" type="password" label="确认密码" name="confirmPassword" required={true}></Input>
            <Button onClick={this.onSubmit.bind(this)} style={{margin:"auto"}}>提交</Button>
            </Form>
        </div>
    }
}

ReactDOM.render(
    <ChangePassword />, document.getElementById("root"));
