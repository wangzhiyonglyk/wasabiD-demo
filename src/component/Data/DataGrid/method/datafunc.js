/**
 * 跟表格本身事件，方法无关的函数
 */
import { comboboxType } from "../../../Form/propsConfig/propTypes"
/**
 * 格式化表头，用于编辑时设置单元格的编辑样式,防止没有,并且编辑时如果是下拉选项则放弃固定列
 * @param {*} headers 头部
 * @returns
 */
export function formatHeader(headers) {
  if (headers && headers.length > 0) {
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] instanceof Array) {
        for (let j = 0; j < headers[i].length; j++) {
          if (headers[i][j].colSpan && headers[i][j].colSpan > 1) {
            //跨行的列不设置
            headers[i][j].sticky = null;// 多行列表取消固定列
            continue;

          } else {
            headers[i][j].editor = headers[i][j].editor
              ? headers[i][j].editor
              : {
                type: "text",
              };

            headers[i][j].sticky = null;// 多行列表取消固定列
          }
        }
      } else {
        headers[i].editor = headers[i].editor
          ? headers[i].editor
          : {
            type: "text",
          };
        if (comboboxType.includes(headers[i].editor.type)) {
          headers[i].sticky = null;// 取消固定列，因为下拉框无法展示，除非
        }
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
 * 得到真正的行号 ,
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
  // 真正的行号 有虚拟列表的行号,取这个，没有再判断分页情况
  let rowIndex = rowData._orderRowIndex
    ? rowData._orderRowIndex
    : pagination
      ? (pageIndex - 1) * pageSize + index
      : index;
  return rowIndex;
}

/**
 * 数据过滤
 * @param {*} data
 * @param {*} filters
 */
export function dataFilter(data, filters) {

  let result = data;
  for (let key in filters) {
    if ((filters[key].value ?? "").toString() !== "") {
      result = result.filter((rowData) => {
        if (filters[key].type.indexOf("range") > -1) {
          // 范围类的匹配
          let values = filters[key].value.split(",");
          return rowData[key] >= values[0] && rowData[key] <= values[1];
        } else if (["integer", "number", "rate"].includes(filters[key].type)) {
          // 数字类的匹配

          let valueGroup = filters[key].value.split(","); //
          let isFilter = false;
          for (let i = 0; i < valueGroup.length; i++) {
            values = valueGroup[0].split("-");
            if (values.length === 1) {
              if (rowData[key] == values[0]) {
                isFilter = true;
                break;
              }
            } else if (values.length === 2) {
              if (rowData[key] >= values[0] && rowData[key] <= values[1]) {
                isFilter = true;
                break;
              }
            }
          }
          return isFilter;
        } else if (
          ["select", "picker", "treepicker", "gridpicker"].includes(
            filters[key].type
          )
        ) {
          // 多选
          let valueGroup = filters[key].value.split(","); //
          return valueGroup.includes(rowData[key] + "");
        } else {
          // 其他文本类的
          return (rowData[key] + "").indexOf(filters[key].value) > -1;
        }
      });
    }

  }
  return result;
}

/**
 * 数据排序
 * @param {*} data
 * @param {*} sortName
 * @param {*} sortOrder
 */
export function dataSort(data, sortName, sortOrder) {
  data.sort((newItem, oldItem) => {
    if (sortOrder === "asc") {
      return newItem[sortName] > oldItem[sortName] ? 1 : -1;
    } else {
      return newItem[sortName] < oldItem[sortName] ? 1 : -1;
    }
  });
  return data;
}
