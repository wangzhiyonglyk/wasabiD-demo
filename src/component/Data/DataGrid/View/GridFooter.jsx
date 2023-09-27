/**
 * 拆分datagrid,表尾组件
 *2023-09-25重构
 */

import React, { useMemo } from "react";
import { TableCell, TableRow } from "../../Table";

import Footer from "./Footer";

function GridFooter({
  detailAble,
  rowNumber,
  selectAble,
  headers,
  data,
  footer,
  url,
}) {
  /**
   * 设置表头的详情，序号，选择列
   */
  const setOrderAndSelectAndDetailHeader = useMemo(() => {
    let colSpan = 0;

    //处理详情列
    if (detailAble) {
      colSpan++;
    }
    //处理序号列
    if (rowNumber) {
      colSpan++;
    }
    //处理选择列
    if (selectAble) {
      colSpan++;
    }

    return (
      <TableCell
        colSpan={colSpan}
        key="sta1"
        style={{
          position: "sticky",
          left: 0,
          zIndex: 1,
        }}
      >
        总计：
      </TableCell>
    );
  }, [selectAble, rowNumber, detailAble]);

  return (
    <tfoot>
      <TableRow>
        {setOrderAndSelectAndDetailHeader}
        {headers.map((trheader, headerRowIndex) => {
          if (trheader instanceof Array) {
            return trheader.map((header, headerColumnIndex) => {
              if (header.colSpan === 1) {
                return (
                  <Footer
                    key={headerRowIndex + "-" + headerColumnIndex}
                    {...header}
                    data={data}
                    footer={footer}
                    url={url}
                    headerRowIndex={headerRowIndex}
                    headerColumnIndex={headerColumnIndex}
                  ></Footer>
                );
              }
            });
          } else {
            //表头只有一行,headerRowIndex就是列号
            let headerColumnIndex = headerRowIndex;
            return (
              <Footer
                key={"0-" + headerColumnIndex}
                {...trheader}
                data={data}
                footer={footer}
                url={url}
                headerRowIndex={0}
                headerColumnIndex={headerColumnIndex}
              ></Footer>
            );
          }
        })}
      </TableRow>
    </tfoot>
  );
}

export default GridFooter;
