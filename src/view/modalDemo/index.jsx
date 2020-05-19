import React from 'react';
import ReactDOM from 'react-dom';
import Resize from "../../component/Layout/Resize";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  render() {
  let style={width:200,height:200,left:20,position:"absolute",left:100,top:100};
  
    return ( <div className="container">
        <Resize style={style}></Resize>
       </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
