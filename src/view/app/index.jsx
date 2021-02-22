import React from 'react';
import ReactDOM from 'react-dom';
import Button from "../../app/Buttons/Button"

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  componentDidMount() {
   
  }

  
  render() {
   
   return <div><Button>app</Button></div>
 
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));
