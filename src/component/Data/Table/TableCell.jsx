import React from "react";
import PropTypes from "prop-types";
/***
 * 注意tdStyle与style的区别
 */
class TableCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderCell = this.renderCell.bind(this);
    this.renderTd = this.renderTd.bind(this);
    this.renderTh = this.renderTh.bind(this);
  }
  renderCell() {
    let style = this.props.style || {};
    switch (this.props.align) {
      case "left":
        style.justifyContent = "flex-start";
        break;
      case "right":
        style.justifyContent = "flex-end";
      default:
        style.justifyContent = "center";
        break;
    }

    return (
      <div
        data-rowindex={this.props.rowIndex}
        data-columnindex={this.props.columnIndex}
        colSpan={this.props.colSpan || 1}
        rowSpan={this.props.rowSpan || 1}
        style={style}
        className={"wasabi-table-cell  "}
        title={
          typeof this.props.children === "string" ? this.props.children : ""
        }
      >
        {this.props.children}
      </div>
    );
  }
  renderTh() {
    return (
      <th
        data-rowindex={this.props.rowIndex}
        data-columnindex={this.props.columnIndex}
        name={this.props.name}
        className={
          (this.props.className || "") +
          (this.props.position !== "body" ? " nowrap " : "")
        }
        style={this.props.thStyle}
        colSpan={this.props.colSpan || 1}
        rowSpan={this.props.rowSpan || 1}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseMove={this.props.onMouseMove}
        onMouseOut={this.props.onMouseOut}
      >
        {this.renderCell()}
      </th>
    );
  }
  renderTd() {
    let style = this.props.tdStyle || {};
    style.msoNumberFormat = "'@'"; // 用导出时数字的问题
    return (
      <td
        name={this.props.name}
        data-rowindex={this.props.rowIndex}
        data-columnindex={this.props.columnIndex}
        colSpan={this.props.colSpan || 1}
        rowSpan={this.props.rowSpan || 1}
        style={style}
        export="1"
        className={
          (this.props.className || "") +
          (this.props.position !== "body" ? " nowrap " : "")
        }
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseMove={this.props.onMouseMove}
        onMouseOut={this.props.onMouseOut}
      >
        {this.renderCell()}
      </td>
    );
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
  position: PropTypes.oneOf(["header", "body", "footer"]), //位置
};
TableCell.defaultProps = {
  rowSpan: 1,
  colSpan: 1,
  position: "body",
};

export default TableCell;
