import React from 'react';


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  render() {
  
    return (
      <div className="item" style={this.props.style}>
       </div>
    );
  }
}

export default Item;