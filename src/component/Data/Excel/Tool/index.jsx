/**
 * Excel Tool 工具栏
 * create by wangzhiyong
 * date:2021-06-26
 */
import React from "react";
import Input from "../../../Form/Input";
import Do from "./Do"
import Font from "./Font";
import Align from "./Align";
import Format from "./Format";
function BeginToll(props) {
   return  <div className="wasabi-execel-tool-section">
        <Do key="1"></Do>
        <Font key="2"></Font>
        <Align key="3"></Align>
        <Format key="4"></Format>
    </div>
}
class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return <div className="wasabi-excel-tool">
            <div className="wasabi-execel-tool-tabs">
                <div className="wasabi-execel-tool-tab">
                    <div key="0" className={"wasabi-execel-tool-tab-button "}><i className="icon-excel"></i></div>
                    <div key="1" onClick={this.props.changeToolActive.bind(this, 0)} className={"wasabi-execel-tool-tab-button " + (this.props.activeIndex === 0 ? "active" : "")}>开始</div>
                    <div key="2" onClick={this.props.changeToolActive.bind(this, 1)} className={"wasabi-execel-tool-tab-button " + (this.props.activeIndex === 1 ? "active" : "")}>插入</div>
                    <div key="3" onClick={this.props.changeToolActive.bind(this, 2)} className={"wasabi-execel-tool-tab-button " + (this.props.activeIndex === 2 ? "active" : "")}>公式</div>
                    <div key="4" onClick={this.props.changeToolActive.bind(this, 3)} className={"wasabi-execel-tool-tab-button " + (this.props.activeIndex === 3 ? "active" : "")}>数据</div>
                </div>
                {this.props.activeIndex===0?<BeginToll></BeginToll>:null}

            </div>
            <div className="wasabi-execel-edit">
                <Input type="text" labelStyle={{ fontWeight: "bold", marginRight: 25 }} label="Edit:" name="edit" onChange={this.props.onChange}></Input>
            </div>
        </div>
    }
}
export default Tool;