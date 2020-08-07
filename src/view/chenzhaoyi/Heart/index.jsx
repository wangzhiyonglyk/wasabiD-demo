import React,{Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  render() {
  
    return ( 
        <Fragment>           
            <div className="heart"/>

            <div className="leaf1"></div>
            <div className="leaf2"></div>
            <div className="leaf3"></div>
            <div className="leaf4"></div>
            <div className="star">
                <div className="star1"></div>
                <div className="star2"></div>
                <div className="star3"></div>
                <div className="star4"></div>
                <div className="star5"></div>
            </div>
        </Fragment>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
