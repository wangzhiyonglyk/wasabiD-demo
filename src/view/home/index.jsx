import React from 'react';
import ReactDOM from 'react-dom';
import Upload from "../../component/Action/Upload"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
 this.refs.upload.open()
  }

  render() {
  
    return <div><Upload ref="upload"></Upload></div>;
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
