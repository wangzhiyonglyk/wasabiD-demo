import React, {Component} from "react"; //导入React 的核心库
import ReactDom from "react-dom"; //导入与 DOM 相关的功能
import "./index.css"; 

//定义小球掉落React组件
class BallFall extends Component {
    render() {
        return (
			//设置地平线和小球盒子
            <div className = "ground">			
                <div className = "ball"></div>		
            </div>
        );
    }
}
ReactDom.render(<BallFall/>,document.getElementById("root"));