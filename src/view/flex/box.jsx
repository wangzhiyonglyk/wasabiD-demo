import React from 'react';


class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  render() {
  
    return (
      <div className="box">
          {this.props.children}

       </div>
    );
  }
}

export default Box;