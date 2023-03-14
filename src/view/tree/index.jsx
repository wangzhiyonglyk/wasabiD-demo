import React, { useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { Button, Tree } from "../../component";

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
    iconCls: <span>test</span>,
    dropAble: true,
    draggAble: true,
    disabled: true,
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
function Page() {
  const treeRef = useRef(null);
  const getData = useCallback(() => {
    console.log(
      "findNode",
      treeRef.current.findNode(1),
      treeRef.current.findParents("s102"),
      treeRef.current.getData(),
      treeRef.current.getChecked()
    );
  });
  const onClick = useCallback(() => {
    treeRef.current.selectNode(1);
  });
  const setChecked = useCallback(() => {
    treeRef.current.setChecked(1, true);
  });
  const clearChecked = useCallback(() => {
    treeRef.current.clearChecked();
  });
  const checkedAll = useCallback(() => {
    treeRef.current.checkedAll();
  });
  const setLinkOpen = useCallback(() => {
    treeRef.current.setLinkOpen("s504");
  });
  const removeNode = useCallback(() => {
    treeRef.current.remove(7);
  });
  const removeAll = useCallback(() => {
    treeRef.current.removeAll();
  });
  const append = useCallback(() => {
    treeRef.current.append(
      [
        {
          id: "n1",
          text: "新节点",
          label: "新节点1",
        },
      ],
      7
    );
  });
  const moveIn = useCallback(() => {
    treeRef.current.moveIn(1, 7);
  });
  const moveBefore = useCallback(() => {
    treeRef.current.moveBefore(3, 5);
  });
  const moveAfter = useCallback(() => {
    treeRef.current.moveAfter(4, 6);
  });
  moveBefore;
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        padding: 10,
        flexDirection: "column",
      }}
    >
      <div>
        {" "}
        <Button key="1" onClick={getData}>
          获取值
        </Button>
        <Button key="2" onClick={onClick}>
          设置选中
        </Button>
        <Button key="3" onClick={setChecked}>
          设置勾选
        </Button>
        <Button key="4" onClick={clearChecked}>
          清除勾选
        </Button>
        <Button key="5" onClick={checkedAll}>
          勾选所有
        </Button>
        <Button key="6" onClick={setLinkOpen}>
          展开节点
        </Button>
        <Button key="7" onClick={removeNode}>
          移除节点
        </Button>
        <Button key="8" onClick={removeAll}>
          移除所有节点
        </Button>
        <Button key="9" onClick={append}>
          添加节点
        </Button>
        <Button key="moveIn" onClick={moveIn}>
          moveIn
        </Button>
        <Button key="moveBefore" onClick={moveBefore}>
          moveBefore
        </Button>
        <Button key="moveAfter" onClick={moveAfter}>
          moveAfter
        </Button>
      </div>
      <Tree
        ref={treeRef}
        isSimpleData={true}
        textFormatter={(row) => {
          return <div>{row.text}</div>;
        }}
        style={{ width: 500 }}
        data={data}
        textField="label"
        contextMenuAble={true}
        selectAble={true}
        renameAble={true}
        renameIconAble={true}
        removeAble={true}
        removeIconAble={true}
        checkStyle={"checkbox"}
        httpType="GET"
      ></Tree>
    </div>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
