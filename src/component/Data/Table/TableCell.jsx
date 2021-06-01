import React from "react";
import PropTypes from 'prop-types';

class TableCell extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.renderCell = this.renderCell.bind(this);
        this.renderTd = this.renderTd.bind(this);
        this.renderTh = this.renderTh.bind(this);
    }
    renderCell() {
        return <div className={"wasabi-table-cell  "+(this.props.position!=="body"?'nowrap':"") + (this.props.className || "")}
        style={this.props.style || null} title={typeof this.props.children==="string"?this.props.children:""}>
            {
                this.props.children
            }
        </div>;
    }
    renderTh() {
        return <th colSpan={this.props.colSpan || 1} rowSpan={this.props.rowSpan || 1}    export={"1"} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
            {this.renderCell()}
        </th>
    }
    renderTd() {
        return <td colSpan={this.props.colSpan || 1} rowSpan={this.props.rowSpan || 1}    export={"1"} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
            {this.renderCell()}
        </td>
    }

    render() {
        switch (this.props.position || "body") {
            case "header":
                return this.renderTh();

            default:
                return this.renderTd();

        }

    }
}
TableCell.propTypes = {
    rowSpan: PropTypes.number,
    colSpan: PropTypes.number,
    position: PropTypes.oneOf(["header", "body", "footer"]),//位置  
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
}
TableCell.defaultProps = {
    rowSpan: 1,
    colSpan: 1,
    position: "body",
}

export default TableCell;