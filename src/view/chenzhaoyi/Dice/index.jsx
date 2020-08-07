import React from 'react';
import ReactDOM from 'react-dom';
import Point from "./point"
import "./index.css"
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    
  }

  render() {
  
    return ( 
        <div className="container">
            <div className="dice">
                <div className="center one"><Point/></div>
            </div>
            <div className="dice">
                <div className="left two"><Point/></div>
                <div className="right two"><Point/></div>
            </div>
            <div className="dice">
                <div className="left three"><Point/></div>
                <div className="center three"><Point/></div>
                <div className="right three"><Point/></div>
            </div>
            <div className="dice">
                <div className="spaceAr two"><Point/><Point/></div>
                <div className="spaceAr two"><Point/><Point/></div>
            </div>
            <div className="dice">
                <div className="spaceAr three"><Point/><Point/></div>
                <div className="center three"><Point/></div>
                <div className="spaceAr three"><Point/><Point/></div>
            </div>
            <div className="dice">
                <div className="spaceAr three"><Point/><Point/></div>
                <div className="spaceAr three"><Point/><Point/></div>
                <div className="spaceAr three"><Point/><Point/></div>
            </div>
        </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
