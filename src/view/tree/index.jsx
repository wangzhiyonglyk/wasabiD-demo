import React, { useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { Button, Tree } from "../../component";

let data = [
  {
    id: 1,
    text: "第1个节点 ",
    dropAble: true,
    isOpened: true,
  },

  {
    id: 2,
    text: "第2个节点 ",
    dropAble: true,
    isOpened: true,
  },
  {
    id: "1-1",
    pId: 1,
    text: "第1-1个节点 ",
    dropAble: true,
    isOpened: true,
  },
  {
    id: "1-2",
    pId: 1,
    text: "第12个节点 ",
    dropAble: true,
    isOpened: true,
  },

  {
    id: "1-2-1",
    pId: "1-2",
    text: "第2-2-1个节点 ",
    dropAble: true,
    isOpened: true,
  },
  {
    id: 3,
    pId: "",
    text: "第3个节点 ",
    dropAble: true,
    isOpened: true,
  },
  {
    id: 4,
    pId: "",
    text: "第4个节点 ",
    dropAble: true,
    isOpened: true,
  },
  {
    id: "no5",
    pId: "",
    text: "第no5个节点 ",
    dropAble: true,
  },
  {
    id: 5,
    pId: "",
    text: "第5个节点",
    dropAble: true,
    isOpened: true,
  },
  {
    id: 6,
    pId: "",
    text: "第6个节点",
    dropAble: true,
    draggAble: true,
    isOpened: true,
  },
  {
    id: 7,
    pId: "",
    text: "第7个节点",
    dropAble: true,
    draggAble: true,
    disabled: true,
    isOpened: true,
  },
];

for (let i = 0; i < 100000; i++) {
  let pId;
  if (i < 10) {
    pId = 1;
  } else if (i < 50) {
    pId = 2;
  } else if (i < 1000) {
    pId = 3;
  } else if (i < 2000) {
    pId = 4;
  } else {
    pId = 5;
  }
  data.push({
    id: "s" + i,
    pId: pId,
    text: "父节点" + pId + "-第" + i + "子节点",
    draggAble: true,
    dropAble: true,
  });
}

function Page() {
  const treeRef = useRef(null);
  const getData = useCallback(() => {
    console.log({
      找到节点为1: treeRef.current.findNode(1),
      找到节点为s102的父节点: treeRef.current.findParents("s102"),
      所有数据: treeRef.current.getData(),
      勾选的: treeRef.current.getChecked(),
    });
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
          text: "新节点1",
        },
        {
          id: "nn1",
          pId: "n1",
          text: "新节点1的子节点",
        },
      ],
      7
    );
  });
  const moveIn = useCallback(() => {
    treeRef.current.moveIn(1, 7);
  });
  const moveBefore = useCallback(() => {
    treeRef.current.moveBefore(3, 2);
  });
  const moveAfter = useCallback(() => {
    treeRef.current.moveAfter(3, 4);
  });

  const loading = useCallback(() => {
    treeRef.current.setLoading(1);
  });

  const clearLoading = useCallback(() => {
    treeRef.current.clearLoading();
  });
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
        <Button key="loading" onClick={loading}>
          设置加载状态
        </Button>
        <Button key="clearLoading" onClick={clearLoading}>
          清除加载状态
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
        textField="text"
        contextMenuAble={true}
        selectAble={true}
        renameAble={true}
        renameIconAble={true}
        removeAble={true}
        removeIconAble={true}
        checkStyle={"checkbox"}
        radioType="all"
        draggAble={true}
        dropAble={true}
        httpType="GET"
      ></Tree>
    </div>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
