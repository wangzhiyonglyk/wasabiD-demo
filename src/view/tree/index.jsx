import React from "react";
import { createRoot } from "react-dom/client";
import Tree from "wasabi-tree";
import "wasabi-tree/lib/index.css";
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
    label: "第s" + i + "节点",
    draggAble: true,
    dropAble: true,
  });
}
console.timeEnd("生成10万数据");
function Page() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        padding: 10,
        flexDirection: "column",
      }}
    >
      <Tree
        isSimpleData={true}
        textFormatter={(row) => {
          return <div>{row.text}</div>;
        }}
        style={{ width: 500 }}
        data={data}
        textField="label"
        selectAble={true}
        renameAble={true}
        removeAble={true}
        httpType="GET"
      ></Tree>
    </div>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
