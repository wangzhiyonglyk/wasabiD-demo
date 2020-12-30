import React from 'react'
import ReactDOM from "react-dom"
import ("./test.css")
class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
                username:"",
                password:""
        }
    }
    usernameChange(event){

       this.setState({
           username:event.target.value
       })
    }
    passwordChange(event){

      this.setState({
          password:event.target.value
      })

    }

    login(){
       
        console.log(this.state.username,this.state.password)
    }
    render(){
        return <div>
           <div>用户名：<input className="username" type="text" name="username" value={this.state.username} onChange={this.usernameChange.bind(this)}></input></div> 
           <div>密码： <input className="password" type="password" name="password" value={this.state.password} onChange={this.passwordChange.bind(this)}></input></div>
            <button onClick={this.login.bind(this)}>登陆</button>
        </div>
    }
}

ReactDOM.render(<Test />, document.getElementById('root'));