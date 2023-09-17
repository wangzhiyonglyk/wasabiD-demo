/**
 * create by wangzhiyonglyk 2020-12-20
 * 将复制粘贴功能独立出来
 * edit 2022-09-16 调整重新开发此功能
 */

import Msg from "../../../Info/Msg";
import excel from "../../../libs/excel";
import fileType from "../../../libs/fileType";
import pageSizeList from "../../Pagination/pageSizeList.js";
export default {
  /**
   * 停靠
   * @param {*} event
   */
  onDragOver(event) {
    //在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发
    event.preventDefault();
  },
  /**
   * 文件拖动
   * @param {*} event
   */
  onDrop(event) {
    event.preventDefault();
    if (
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0 &&
      this.props.importAble
    ) {
      try {
        if (fileType.filter("excel", event.dataTransfer.files[0])) {
          excel.readFile(event.dataTransfer.files[0]).then((workbook) => {
            let json = excel.workbook2json(workbook, this.state.length);
            this.json2data(json);
          });
        } else {
          Msg.error("只接受excel文件");
        }
      } catch (e) {}
    }
  },

  //excel粘贴事件
  onPaste: async function (rowIndex, columnIndex, event, oldValue) {
    //excel粘贴事件
    try {
      let text = await window.navigator.clipboard.readText();
      if (text.indexOf("\t") > -1 || text.indexOf("\n") > -1) {
        text = text.replace(/\r\n/g, "\n").replace(/\t/g, ","); //转成xlsx脚本的可操作的csv格式
        //说明是csv数据，不包含头部
        this.json2data(excel.csv2json(text, false), rowIndex, columnIndex);
      }
    } catch (e) {}
  },
  /**
   *将json数据放到表格中
   * @param {*} json 数据
   * @param {*} beginRowIndex 行号
   * @param {*} beginColumnIndex 列号
   */
  json2data(json, beginRowIndex = 0, beginColumnIndex = 0) {
    if (json && json.body) {
      const headers = this.state.headers; //表头
      let data = this.state.data;
      let total = this.state.total; // 总记录数
      for (let i = 0; i < json.body.length; i++) {
        let rowData = {}; //新的一行数据
        let currentRowColumnIndex = 0; //新的一行数据开始下标
        for (let j = beginColumnIndex || 0; j < headers.length; j++) {
          if (headers[j] instanceof Array) {
            for (let k = 0; i < headers[j][k].length; k++) {
              if (headers[j][k].colSpan > 1) {
                continue;
              } else {
                if (currentRowColumnIndex < json.body[i].length) {
                  rowData[headers[j][k].name] =
                    json.body[i][currentRowColumnIndex];
                  currentRowColumnIndex++;
                }
              }
            }
          } else {
            if (currentRowColumnIndex < json.body[i].length) {
              rowData[headers[j].name] = json.body[i][currentRowColumnIndex];
              currentRowColumnIndex++;
            }
          }
        }

        if (beginRowIndex < data.length) {
          //替换
          data[beginRowIndex] = Object.assign(data[beginRowIndex], rowData);
          this.state.updateData.set(
            this.getKey(beginRowIndex),
            data[beginRowIndex]
          ); //更新某一行
        } else {
          // 追加
          data.push(rowData);
          total++;
          this.state.addData.set(this.getKey(beginRowIndex), rowData); //更新某一行
        }
        beginRowIndex++;
      }
      let visibieData;
      if (this.props.pagePosition) {
        visibieData = data.slice(
          (this.state.pageIndex - 1) * this.state.pageSize,
          this.state.pageIndex * this.state.pageSize
        );
      } else {
      }
      this.setState(
        {
          data: data,
          total: total,
          addData: this.state.addData,
          updateData: this.state.updateData,
        },
        () => {
          this.focusCell(beginRowIndex || 0, beginColumnIndex || 0);
        }
      );
    }
  },
};
