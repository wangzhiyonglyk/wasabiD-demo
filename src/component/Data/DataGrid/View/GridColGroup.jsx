/**
 * 拆分datagrid,控制列的宽度
 * 2021-05-28
 */
import React from "react";
import config from "../config";
class GridColGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let tableWidth = 0;
    let colgroup = [];
    if (!(this.props.headers instanceof Array)) {
      return;
    }
    if (this.props.detailAble) {
      colgroup.push(
        <col
          key="wasabi-detail-column"
          name="wasabi-detail-column"
          width={config.detailWidth}
        ></col>
      );
      tableWidth += config.detailWidth;
    }
    //处理序号列的宽度
    if (this.props.rowNumber) {
      colgroup.push(
        <col
          key="wasabi-order-column"
          name="wasabi-order-column"
          width={config.rowNumberWidth}
        ></col>
      );
      tableWidth += config.rowNumberWidth;
    }
    //处理选择列的宽度
    if (this.props.selectAble) {
      colgroup.push(
        <col
          key="wasabi-select-column"
          name="wasabi-select-column"
          width={config.selectWidth}
        ></col>
      );
      tableWidth += config.selectWidth;
    }

    // 设置列宽度
    this.props?.headers.map((trheader, headerRowIndex) => {
      if (trheader instanceof Array) {
        trheader.map((header, headerColumnIndex) => {
          if (header.colSpan && header.colSpan > 1) {
            //跨几列的不用渲染
            return;
          } else {
            colgroup.push(
              <col
                key={headerRowIndex + "-" + headerColumnIndex}
                name={header.name || header.label} //name可能没有设置
                width={header.width ?? null}
              ></col>
            );
          }
        });
      } else {
        colgroup.push(
          <col
            key={headerRowIndex}
            name={trheader.name || trheader.label}
            width={trheader.width ?? null}
          ></col>
        );
      }
    });

    return <colgroup>{colgroup}</colgroup>;
  }
}
export default GridColGroup;
