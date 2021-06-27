/**
 * Sheet组件
 * create by wangzhiyong
 * date:2021-06-26
 */
import React from "react";

import { Table } from "../../Table";
import SheetBody from "./SheetBody";
import SheetHeader from "./SheetHeader";
import SheetColGroup from "./SheetColGroup";
import Tool from "../Tool"
import func from "../../../libs/func";
class Sheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheetcontainerid: func.uuid(),
            activeIndexTool:0,
            sheet: {
               
            }
        }
        this.changeToolActive=this.changeToolActive.bind(this)
    }
    componentDidMount() {
        if(this.props.active){
            this.setState({
                sheet:this.props.sheet
            })
        }
    }
    changeToolActive(index)
    {
        this.setState({
            activeIndexTool:index
        })
    }
    render() {
        if (this.props.active) {
            return <div className="wasabi-excel-sheet" id={this.state.sheetcontainerid}>
                <Tool activeIndex={this.state.activeIndexTool} changeToolActive={this.changeToolActive}></Tool>
                <div className="table-realTable">
                <Table>
                    <SheetColGroup headers={this.state.sheet.headers || []}></SheetColGroup>
                    <SheetHeader headers={this.state.sheet.headers || []}></SheetHeader>
                    <SheetBody cells={this.state.sheet.cells || [[]]}></SheetBody>
                </Table>
                </div>
              
            </div>
        }
        else {
            return null;
        }

    }
}

export default Sheet;