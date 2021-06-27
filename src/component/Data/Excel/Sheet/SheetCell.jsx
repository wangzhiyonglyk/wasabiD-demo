/**
 * Sheet 的表体的单元格
 * create by wangzhiyong
 * date:2021-06-26
 */
import React from "react";
import { TableCell, } from "../../Table";
class SheetCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }
    onClick(event) {
        this.props.onClick && this.props.onClick(event, this.props.rowIndex, this.props.columnIndex);
    }
    onDoubleClick(event) {
        this.props.onDoubleClick && this.props.onDoubleClick(event, this.props.rowIndex, this.props.columnIndex);
    }
    render() {
        return <TableCell
            className={this.props.className}
            style={this.props.style}
            rowSpan={this.props.rowSpan}
            colSpan={this.props.colSpan}
            className={this.props.className || ""}
            onClick={this.onClick}
            onDoubleClick={this.onDoubleClick}
        >{
            this.props.children
        }
        </TableCell>

    }

}
export default SheetCell;