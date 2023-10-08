import { read, write, utils } from "xlsx";

let excel = {
  /**
   * 读取excel,转成二进制数据
   * @param {*} file 文件流
   * @param {*} callback
   */
  readFileToWorkbook(file) {
    try {
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      return new Promise((resolve, reject) => {
        reader.onload = function (e) {
          let data = e.target.result;
          let workbook = read(data, { type: "binary" });
          resolve(workbook);
        };
        reader.onerror = function () {
          reject("error");
        };
      });
    } catch (e) {
      console.log(e);
      return Promise.reject("error");
    }
  },
  /**
   * 将工作表的数据转成csv格式
   * @param {*} workbook 工作簿
   * @param {*} sheetIndex 工作表序号
   * @returns
   */
  workbook2csv(workbook, sheetIndex = 0) {
    try {
      let sheetNames = workbook.SheetNames; // 工作表名称集合
      let worksheet = workbook.Sheets[sheetNames[sheetIndex]]; // 这里我们只读取第一张sheet
      let csv = utils.sheet_to_csv(worksheet);

      return csv;
    } catch (e) {
      console.log("error", e);
    }
    return null;
  },

  /**
   * 将工作表的数据转成json格式
   * @param {*} workbook 工作簿
   * @param {*} sheetIndex 工作表序号
   * @returns
   */
  workbook2json(workbook, sheetIndex = 0) {
    try {
      let csv = this.workbook2csv(workbook, sheetIndex);
      return this.csv2json(csv);
    } catch (e) {
      console.log("error", e);
    }
    return null;
  },

  /**
   * csv转json
   * @param {*} csv
   * @param {*} headerset 是否有表头，默认有
   * @returns
   */
  csv2json(csv, headerset = true) {
    let json = {
      headers: [],
      body: [],
    };
    try {
      let rows = csv.split("\n");
      rows.pop(); // 最后一行没用的
      if (headerset) {
        for (let i = 0; i < 1; i++) {
          let column = rows[i].split(",");
          for (let j = 0; j < column.length; j++) {
            json.headers.push(column[j]);
          }
        }
      }

      for (let i = headerset ? 1 : 0; i < rows.length; i++) {
        let column = rows[i].split(",");
        let row = [];
        for (let j = 0; j < column.length; j++) {
          row.push(column[j]);
        }
        json.body.push(row);
      }
      return json;
    } catch (e) {
      console.log("error", e);
    }
    return json;
  },
  /**
   * json格式转csv
   * @param {*} json
   * @returns
   */
  json2csv(json) {
    let csv = [];
    if (Array.isArray(json.header) && json.header.length > 0) {
      csv.push(json.header.join(","));
    }
    if (Array.isArray(json.body) && json.body.length > 0) {
      for (let i = 0; i < json.body.length; i++) {
        let row = [];
        for (let j = 0; j < json.body[i].length; j++) {
          row.push(json.body[i][j]);
        }
        csv.push(row.join(","));
      }
    }
    return csv.join("\n") + "\n";
  },
  /**
   * csv 转成工作表sheet格式
   * @param {*} csv
   * @returns
   */
  csv2sheet(csv) {
    let sheet = {}; // 将要生成的sheet
    csv = csv.split("\n");
    csv.forEach(function (row, i) {
      row = row.split(",");
      if (i == 0)
        sheet["!ref"] =
          "A1:" + String.fromCharCode(65 + row.length - 1) + (csv.length - 1);
      row.forEach(function (col, j) {
        sheet[String.fromCharCode(65 + j) + (i + 1)] = { v: col };
      });
    });

    return sheet;
  },

  /**
   * 将一个sheet转成最终的excel文件的blob对象
   * @param {*} sheet 工作表sheet格式数据
   * @param {*} sheetName 工作表名
   * @returns
   */
  sheet2blob(sheet, sheetName) {
    // 字符串转ArrayBuffer
    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    sheetName = sheetName || "sheet1";
    let workbook = {
      SheetNames: [sheetName],
      Sheets: {},
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    let wopts = {
      bookType: "xlsx", // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: "binary",
    };
    let wbout = write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    return blob;
  },
  /**
   * 导出为excel
   * @param {*} blob 二进制数据
   * @param {*} title
   */
  exportExcel(blob, title) {
    if (typeof blob === "object" && blob instanceof Blob) {
      blob = URL.createObjectURL(blob); // 创建blob地址
    }
    title = title || func.dateformat(new Date());
    let downloadA = document.createElement("a");
    downloadA.href = blob;
    downloadA.download = title + ".xlsx";
    downloadA.click();
    window.URL.revokeObjectURL(downloadA.href); //释放
  },
  /**
   * json格式数据导出为excel表格
   * @param {*} json json 数据
   * @param {*} title 标题
   */
  jsonExportExcel(json, title) {
    try {
      let csv = this.json2csv(json);
      let sheet = this.csv2sheet(csv);
      let blob1 = this.sheet2blob(sheet);
      this.exportExcel(blob1, title);
    } catch (e) {
      if (window.Msg) {
        window.Msg(e.message);
      } else {
        alert(e.message);
      }
    }
  },
  /**
   * 表格导出excel表格
   * @param {*} tableId 表格id
   * @param {*} title
   */
  tableExportExcel(tableId, title) {
    let wb = utils.table_to_book(document.getElementById(tableId));

    let wbout = write(wb, { bookType: "xlsx", type: "binary" });
    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }
    let blob1 = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    this.exportExcel(blob1, title);
  },
};
export default excel;
