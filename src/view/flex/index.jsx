import React from 'react';
import ReactDOM from 'react-dom';
import Box from "./box"
import Item from "./item"
import "./index.css"
class FlexBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  render() {
  
    return ( <div className="container"><Box>
        <Item></Item>
        <Item></Item>
        <Item></Item>
    </Box> </div>
    );
  }
}

ReactDOM.render(<FlexBox />, document.getElementById('root'));
