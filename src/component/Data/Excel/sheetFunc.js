import SheetModel from "./SheetModel"
const sheetFunc = {
    init(title="sheet1",  rowCount = 20, columnCount = 12,sheet = null) {
        if (sheet && sheet instanceof SheetModel) {
            return sheet;
        }
        else {
            let headers = this.initColumnNames(columnCount);
            let cells = this.initCells(rowCount, columnCount);
           return new SheetModel(title,rowCount,columnCount,headers,cells);

        }


    },
    initColumnNames: function (count = 12) {
        let arr = [];
        for (let i = 0; i < 26; i++) {
            arr.push({
                width: 100,
                label: String.fromCharCode(65 + i)
            });//输出A-Z 26个大写字母
            if (arr.length >= count) {
                return arr;
            }
        }
        for (let i = 0; i < 25; i++) {
            for (let j = i + 1; j < 26; j++) {
                arr.push({
                    width: 100,
                    label: String.fromCharCode(65 + i) + String.fromCharCode(65 + j)
                });
                if (arr.length >= count) {
                    return arr;
                }
            }
        }
        return arr;
    },
    initCells: function (rowCount, columnCount) {
        let cells = [];

        for (let i = 0; i < rowCount; i++) {
            let rows = [];
            for (let j = 0; j < columnCount; j++) {
                rows.push(this.cellFormatInit(i, j));
            }
            cells.push(rows);
        }
        return cells;
    },
    //初始化单元格
    cellFormatInit: function (rowIndex = 0, columnIndex = 0) {
        return {
            type: "text",//类型
            options: {},//单元格编辑参数
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            rowSpan: 1,
            colSpan: 1,
            label: "",
            align: "center",
            underline: false,
            italic: false,
            bold: false,
            fontSize: 14,
            fontFamily: "inherit",
            color: "var(--color)",
            wrap: "nowrap"
        }
    },
    /**
     * 插入一行
     * @param {*} rowIndex 
     */
    appendRow: function (rowIndex = 0, sheet) {
        let row = [];
        for (let i = 0; i < sheet.columnCount; i++) {
            row.push(this.cellFormatInit(rowIndex + 1, i));
        }
        sheet.cells = [
            ...sheet.cells.slice(0, rowIndex),
            , row,
            ...sheet.cells.slice(rowIndex),
        ]
        return sheet;
    },
    /**
     * 插入一列
     * @param {*} columnIndex 
     */
    appendColumn: function (columnIndex = 0, sheet) {
        for (let i = 0; i < sheet.rowCount; i++) {
            sheet.cells[i] = [
                ...sheet.cells[i].slice(0, columnIndex),
                ,
                this.cellFormatInit(i, columnIndex + 1)
                ,
                ...sheet.cells[i].slice(columnIndex),
            ]
        }

    }

}

export default sheetFunc;