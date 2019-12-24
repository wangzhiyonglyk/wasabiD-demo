import React from "react";
import ReactDOM from "react-dom";
import Button from "../component/Buttons/Button"
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
            <div>测试按钮</div>
            <Button title="测试" label="测试"></Button>
        </div>
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
