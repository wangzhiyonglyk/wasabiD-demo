import React from 'react';
import ReactDOM from 'react-dom';
import("./home.css")
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }


    }
    componentDidMount() {

    }
    onClick() {   
    }
   
    render() {
        return <div>
  <div><label style={{width:80}}>用户名</label>  <input></input></div>  
   <div><label  style={{width:80}}>密码</label> <input></input></div> 
     <button>   ` 登陆</button>
       </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
