import React, {Component} from "react"; //导入React 的核心库
import ReactDom from "react-dom"; //导入与 DOM 相关的功能
import {Provider} from 'react-redux';
import store from "./store";
import Count from "./component/count";
import Sum from "./component/sum";

import "./index.css";//导入样式

class Counter extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Provider store={store}>
                <div className="container">
                    <div className="title">Calculator</div>
                    <Count title={"First"}></Count>
                    <Count title={"Second"}></Count>
                    <Count title={"Third"}></Count>
                    <Sum></Sum>
                </div>
            </Provider>
        )
    }

    
}
ReactDom.render(<Counter/>,document.getElementById("root"));