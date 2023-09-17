/**
 * 跟表格本身事件，方法无关的函数
 */

/**
 * 编辑时设置单元格的编辑样式,防止没有
 * @param {*} headers 头部
 * @returns
 */
export function setHeaderEditor(headers) {
  if (headers && headers.length > 0) {
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] instanceof Array) {
        for (let j = 0; j < headers[i].length; j++) {
          if (headers[i][j].colSpan && headers[i][j].colSpan > 1) {
            //跨行的列不设置
            continue;
          } else {
            headers[i][j].editor = headers[i][j].editor
              ? headers[i][j].editor
              : {
                  type: "text",
                };
          }
        }
      } else {
        headers[i].editor = headers[i].editor
          ? headers[i].editor
          : {
              type: "text",
            };
      }
    }
  }
  return headers;
}

/**
 * 确定是否全选
 * @param {*} pagination 是否分页
 * @param {*} data  数据
 * @param {*} visibleData 可见数据
 * @param {*} checkedData 选择的数据
 * @returns
 */
export function checkCurrentPageCheckedAll(
  pagination,
  data,
  visibleData,
  checkedData
) {
  {
    let length = 0;
    if (pagination) {
      // 分页，取可见数据
      length = visibleData?.length;
    } else {
      // 不分页时，直接取当前数据
      length = data.length;
    }
    if (length === checkedData?.keys().length) {
      return true;
    }
    return false;
  }
}

/**
 * 得到真正的行号
 * @param {*} pagination 分页
 * @param {*} pageIndex 分页号
 * @param {*} pageSize
 * @param {*} rowData
 * @param {*} index
 */
export function getRealRowIndex(
  pagination,
  pageIndex,
  pageSize,
  rowData,
  index
) {
  // 真正的行号
  let rowIndex = rowData._orderRowIndex
    ? rowData._orderRowIndex
    : pagination
    ? (pageIndex - 1) * pageSize + index
    : index;
  return rowIndex;
}
