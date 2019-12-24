import React from "react";
import ReactDOM from "react-dom";

class Index extends React.Component {
    constructor(props) {
        super(props);

       
        this.state = {
            tabs: [],
            activeIndex: 0
        }
    }
    componentDidMount() {
        
    }
   
    render() {
        return <div>
            你好2
        </div>
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
