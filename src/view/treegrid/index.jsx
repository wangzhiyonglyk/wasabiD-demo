import React from "react";
import { createRoot } from "react-dom/client";
import { TreeGrid } from "../../component";
let data = [
  {
    id: 1,
    label:
      "第1个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },

  {
    id: 2,
    label:
      "第2个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: "2-1",
    pId: 1,
    label:
      "第1-1个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: "2-2",
    pId: 1,
    label:
      "第12个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },

  {
    id: "2-2-1",
    pId: "2-2",
    label:
      "第2-2-1个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: 3,
    pId: "",
    label:
      "第3个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: 4,
    pId: "",
    label:
      "第4个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: "no5",
    pId: "",
    label:
      "第no5个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: 5,
    pId: "",
    label:
      "第5个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
  },
  {
    id: 6,
    pId: "",
    label:
      "第6个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
    draggAble: true,
  },
  {
    id: 7,
    pId: "",
    label:
      "第7个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",
    dropAble: true,
    draggAble: true,
  },
];
console.time("生成10万数据");
for (let i = 0; i < 1000; i++) {
  let pId;
  if (i < 10) {
    pId = 1;
  } else if (i < 50) {
    pId = 2;
  } else if (i < 100) {
    pId = 3;
  } else if (i < 200) {
    pId = 4;
  } else {
    pId = 5;
  }
  data.push({
    id: "s" + i,
    pId: pId,
    label: "父节点" + pId + "-第" + i + "子节点",
    draggAble: true,
    dropAble: true,
  });
}
console.timeEnd("生成10万数据");
class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeaders: [
        {
          name: "id",
          label: "fixedid",
        },
      ],
      headers: [
        {
          name: "label",
          label: "省11",
          editor: {
            type: "select",
            options: {
              data: [{ text: "test", value: "test" }],
            },
          },
        },

        {
          name: "label1",
          label: "省2",
          editor: {
            type: "checkbox",
            options: {
              data: [
                { text: "test", value: "test" },
                { text: "test1", value: "test1" },
                { text: "test2", value: "test2" },
              ],
            },
          },
        },
        {
          name: "省4",
          label: "省4",
          content: (rowData, rowIndex) => {
            if (rowIndex % 2 === 1) {
              return <div>{rowData.label}</div>;
            } else {
              return (
                <div>
                  <button key="1">没有</button>
                  <button key="2">ddd</button>
                </div>
              );
            }
          },
        },

        {
          name: "label1",
          label: "省2",
          width: 1200,
        },

        {
          name: "label3",
          label: "省2",
          content: () => {
            return (
              <img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/29/16e151a59317cae7~tplv-t2oaga2asx-watermark.awebp"></img>
            );
          },
        },
      ],
      data: data,
    };
  }
  render() {
    return (
      <TreeGrid
        isSimpleData={true}
        textField="label"
        checkStyle="checkbox"
        fixedHeaders={this.state.fixedHeaders}
        headers={this.state.headers}
        data={this.state.data}
      ></TreeGrid>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
