import React from 'react';
import ReactDOM from 'react-dom';
import reg from '../../component/Lang/regs';
import validation from '../../component/Lang/validation';
import Message from '../../component/Unit/Message';
import config from '@/libs/config';
import api from "@/libs/api.js"
import events from '../../component/Unit/events';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
      Message.error(validation.alphanum);
      this.refs.username.focus();
      return;
    }
    if (!reg.password.test(this.state.password)) {
      Message.error(validation.password);
      this.refs.password.focus();
      return;
    }
    api.ajax({
      url: config.url + '/user/adminLogin',
      type: 'POST',
      data: {
        appid:config.appid,
        userName: this.state.username,
        password: this.state.password
      },
      success: res => {
        if (res.statusCode == 200) {
          window.localStorage.setItem('token', this.state.username);
          window.location.href = '/';
        } else {
          Message.error(res.message);
        }
      }
    });
  }
  usernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }
  passwordChange(event) {
    this.setState({
      password: event.target.value
    });
  }
  render() {
    return (
      <div className='container'>
        <div id='mainBody'>
          <div id='cloud1' className='cloud'></div>
          <div id='cloud2' className='cloud'></div>
        </div>

        <div className='logintop'>
          <span>欢迎登录中国银行-中银到家小程序后台管理系统</span>
        </div>

        <div className='loginbody'>
          <span className='systemlogo'></span>

          <div className='loginbox'>
            <ul>
              <li>
                <input
                  type='text'
                  ref='username'
                  className='loginuser'
                  onChange={this.usernameChange.bind(this)}
                  value={this.state.username}
                  placeholder='请输入账号'
                />
              </li>
              <li>
                <input
                  type='password'
                  ref='password'
                  className='loginpwd'
                  onChange={this.passwordChange.bind(this)}
                  value={this.state.password}
                  placeholder='请输入密码'
                />
              </li>
              <li>
                <input
                  name=''
                  type='button'
                  className='loginbtn'
                  value='登录'
                  onClick={this.login.bind(this)}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className='loginbm'>
          中国银行 版权所有 2020{' '}
          <a target='_blank' href='https://www.boc.cn/'></a>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById('root'));
