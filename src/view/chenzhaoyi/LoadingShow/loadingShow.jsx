import React, {Component} from "react";//导入React 的核心库
import "./index.css";//导入样式
import iconLoading from "./imgs/icon_loading.svg"//导图加载图片

//图标及遮罩层的React组件
class LoadingShow extends Component {
    render() {
        return (
            <div>
                <div className = "mask"/>
                <div className = "loadingImage">
                    <img className = "imgs" src = { iconLoading } />
                </div>
            </div>
        );
    }
}
export default LoadingShow;