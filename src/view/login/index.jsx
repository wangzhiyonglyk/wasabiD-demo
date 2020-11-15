import React from 'react';
import ReactDOM from 'react-dom';
import reg from '../../component/Lang/regs';
import validation from '../../component/Lang/validation';
import Msg from '../../component/Info/Msg';
import config from '@/libs/config';
import api from "@/libs/api.js"
import events from '../../component/libs/events';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      btnOn:"off",
      error:"hide",
    
    };
  }
  componentDidMount() {
   this.refs.username.focus();
    events.on(document, 'keydown', event => {
      if (event.keyCode == 13) {
        this.login();
      }
    });
  }

  /*
    登录
    */
  login() {
    if (!reg.alphanum.test(this.state.username)) {
      Msg.error(validation.alphanum);
      this.refs.username.focus();
      return;
    }
    if (!reg.password.test(this.state.password)) {
      Msg.error(validation.password);
      this.refs.password.focus();
      return;
    }
    console.log("con",config)
    api.ajax({
      url: '/user/login',
      type: 'POST',
      timeout:3000,
      data: {
        appid:config.appid,
        username: this.state.username,
        password: this.state.password
      },
      success: res => {
        if (res.statusCode == 200) {
          window.sessionStorage.setItem('token', res.data.token);
          window.sessionStorage.setItem('userId', res.data.userId);
          window.location.href = '/index.html?userId='+res.data.userId+"&token="+res.data.token;
        } else {
          this.setState({
            error:"show"
          })
        }
      }
      ,error(message){
        Msg.error(message)
      }
    });
  }
  usernameChange(event) {
  let  btnOn=event.target.value&&this.state.password?"on":"off"
    this.setState({
      username: event.target.value,
      btnOn:btnOn,
      error:"hide"
    });
  }
  passwordChange(event) {
    
    let   btnOn=event.target.value&&this.state.username?"on":"off"
    this.setState({
      password: event.target.value,
      btnOn:btnOn,
      error:"hide"
    });
  }
  render() {
    return (
      <div className="wrap">
    
          <div className="form-data">
          <a ><img src={require("./image/logo.png")} className="head-logo"/></a>
              <div className="form1">
              <span className={"error  "+ this.state.error}>账号或密码错误，请重新输入</span>
                  <p className="p-input">
                      
                      <input type="text" ref="username" id="username" required={true} placeholder="请输入账号" autoComplete="off" onChange={this.usernameChange.bind(this)}/>
                      
                  </p>
                  <p className="p-input">
                  
                   
                      <input type="password" ref="password" required={true} id="password"   placeholder="请输入密码" autoComplete="off" onChange={this.passwordChange.bind(this)}/>
                     
                  </p>
               
              </div>
           
              <button className={"lang-btn  log-btn " +this.state.btnOn} onClick={this.login.bind(this)}>登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
              
              <p className="right">Powered by © 2020</p>
          </div>
      
  </div>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById('root'));
