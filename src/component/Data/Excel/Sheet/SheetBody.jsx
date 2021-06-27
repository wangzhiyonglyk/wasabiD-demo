/**
 * Sheet 的表体
 * create by wangzhiyong
 * date:2021-06-26
 */
import React from "react";
import Input from "../../../Form/Input"
import { TableBody, TableRow } from "../../Table";
import SheetCell from "./SheetCell"
class SheetBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClick
    }
  
    cellEdit(rowIndex,columnIndex,value,text,name){
     this.props.cellEdit&&this.props.cellEdit(rowIndex,columnIndex,value,text,name);
    }
    cellPaste(rowIndex,columnIndex,event)
    {
        this.props.cellPaste&&this.props.cellPaste(rowIndex,columnIndex,event);
    }
    render() {
        //渲染表体
        let trArr = [];
        this.props.cells&& this.props.cells.map((rowData, rowIndex) => {
            let tds=[];
            rowData&&rowData.length>0&&rowData.map((cell, columnIndex) => {
                let className = cell.wrap === true ? "" : "nowrap";
                let style = {
                    textAlign: cell.align || null,
                    fontWeight: cell.weight || null,
                    fontStyle: cell.italic || null,
                    textDecoration: cell.underline || null,
                    fontFamily: cell.fontFamily || null,
                    fontSize: cell.fontSize || null,
                    color: cell.color || null,
                };
                tds.push(
                    <SheetCell
                        onClick={this.props.onclick}
                        onDoubleClick={this.props.onDoubleClick}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        key={'cell-' + rowIndex.toString() + '-' + columnIndex.toString()}
                        className={className}
                        style={style}>

                    </SheetCell>
                );
                columnIndex++;
            });
            trArr.push(
                <TableRow key={'row' + rowIndex.toString()}  >
                    <SheetCell className="wasabi-order-column">{rowIndex+1}</SheetCell>
                    {tds}
                </TableRow>
            );
           
        });
        return <TableBody>{trArr}</TableBody>;
    }

}
export default SheetBody;