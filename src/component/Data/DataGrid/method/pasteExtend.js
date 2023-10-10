/**
 * create by wangzhiyonglyk 2020-12-20
 * 将复制粘贴功能独立出来
 * edit 2022-09-16 调整重新开发此功能
 */

import Msg from "../../../Info/Msg";
import excel from "../../../libs/excel";
import fileType from "../../../libs/fileType";

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
          excel
            .readFileToWorkbook(event.dataTransfer.files[0])
            .then((workbook) => {
              let json = excel.workbook2json(workbook);
              this.json2data(json);
            });
        } else {
          Msg.error("只接受excel文件");
        }
      } catch (e) {}
    }
  },

  /**
   * 粘贴事件
   * @param {*} rowIndex 真正的行，
   * @param {*} columnIndex 真正的列
   * @param {*} visibleDataIndex 可见数据中的行号
   */
  onPaste: async function (rowIndex, columnIndex, visibleDataIndex) {
    try {
      let text = await window.navigator.clipboard.readText();
      if (text.indexOf("\t") > -1 || text.indexOf("\n") > -1) {
        text = text.replace(/\r\n/g, "\n").replace(/\t/g, ","); //转成xlsx脚本的可操作的csv格式
        //说明是csv数据，不包含头部
        this.json2data(
          excel.csv2json(text, false),
          rowIndex,
          columnIndex,
          visibleDataIndex
        );
      }
    } catch (e) {}
  },
  /**
   *将json数据放到表格中
   * @param {*} json 数据
   * @param {*} beginRowIndex 行号
   * @param {*} beginColumnIndex 列号
   * @param {*} visibleDataIndex 可见数据中的行号
   *
   */
  json2data(
    json,
    beginRowIndex = 0,
    beginColumnIndex = 0,
    visibleDataIndex = 0
  ) {
    if (json && json.body) {
      const headers = this.state.headers; //表头
      let data = this.state.data;
      let visibleData = this.state.visibleData;
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
          data[beginRowIndex] = { ...data[beginRowIndex], ...rowData };
          // 防止出问题
          if (visibleDataIndex < visibleData.length) {
            visibleData[visibleDataIndex] = data[beginRowIndex];
          } else {
            visibleData.push(rowData);
          }

          this.state.updateData.set(
            this.getKey(beginRowIndex),
            data[beginRowIndex]
          ); //更新某一行
        } else {
          // 追加
          data.push(rowData);
          visibleData.push(rowData);
          total++;
          this.state.addData.set(this.getKey(beginRowIndex), rowData); //更新某一行
        }
        beginRowIndex++;
        visibleDataIndex++;
      }

      this.setState(
        {
          visibleData: visibleData,
          data: data,
          total: total,
          addData: this.state.addData,
          updateData: this.state.updateData,
        },
        () => {
          this.focusCell &&
            this.focusCell(beginRowIndex || 0, beginColumnIndex || 0);
        }
      );
    }
  },
};
