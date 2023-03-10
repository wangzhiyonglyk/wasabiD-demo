/*
 create by wangzhiyong
 date:2016-12-13
 desc:树节点组件
 edit 2020-10-24 勾选还是有缺陷
 edit 2021-05-11 勾选优化，todo 还要继续优化
 edit 2021-06-19 完善完成
  2021-11-28 完善组件，修复bug，增加连线，调整勾选，图标，文字等样式
2022-01-04 将树扁平化，去掉了子节点
2022-01-06 增加勾选可自定义，前面箭头可以定义等功能
   2022-01-07 修复树节点中文本节点宽度的bug
   2022-01-07 根据类型折叠图标不同
   2022-01-10 修复选择的bug
 */
import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import CheckBox from "../CheckBox";
import Radio from "../Radio";
import Text from "../Text";
import { uuid } from "../libs/func";
import config from "./config";
import { ShareContext } from "./handlerData.js";
function NodeView({ row, nodeEvents }) {
  const { treeProps } = useContext(ShareContext);
  const { clickId, loadingId, checkStyle, textFormatter, componentType } =
    treeProps;

  //节点操作权限，如果树组件本身禁用，则禁用，否则取节点本身（默认是可以的）
  const selectAble = treeProps.selectAble || (row.selectAble ?? true);

  const renameIconAble =
    treeProps.renameIconAble || (row.renameIconAble ?? true);
  const renameAble = treeProps.renameAble || (row.renameAble ?? true);
  const removeAble = treeProps.removeAble || (row.removeAble ?? true);
  const removeIconAble =
    treeProps.removeIconAble || (row.removeIconAble ?? true);
  const draggAble = treeProps.draggAble || (row.draggAble ?? true);

  //TreeNode传下来的的属性
  const {
    rename,
    textid,
    nodeid,
    onClick,
    onDoubleClick,
    onChecked,
    onExpand,
    onBlur,
    onKeyUp,
    beforeNodeRename,
    beforeNodeRemove,
    onNodeDragEnd,
    onNodeDragLeave,
    onNodeDragOver,
    onNodeDragStart,
    onNodeDrop,
    onNodeContextMenu,
  } = nodeEvents;

  let iconCls = row.iconCls; //默认图标图标
  if (row.isParent) {
    //如果是父节点
    if (row.isOpened) {
      //打开状态，
      iconCls = row.iconOpen ? row.iconOpen : row.iconCls; //没有则用默认图标
    } else {
      //关闭状态
      iconCls = row.iconClose ? row.iconClose : row.iconCls; ///没有则用默认图标
    }
  }
  if (loadingId === row.id) {
    //正在异步加载
    iconCls = "icon-loading tree-loading";
  }
  let childrenLength = row.isOpened === false ? 0 : row?.children?.length || 0; //子节点个数
  let textwidthReduce = 20; //文本字段减少的宽度
  //空白位，表示节点层级
  let blankControl = [];
  if (row._path.length > 1) {
    for (let i = 1; i < row._path.length; i++) {
      blankControl.push(<span key={i} style={{ width: 20 }}></span>);
      textwidthReduce += 20;
    }
  }
  //节点前面箭头图标
  let arrowIcon;
  if (row.isParent) {
    //是父节点才有箭头
    if (row.isOpened) {
      if (row.arrowUnFoldIcon) {
        arrowIcon = (
          <div
            className={"wasabi-tree-li-icon"}
            style={{ display: "inline-block" }}
            onClick={row.isParent ? onExpand : null}
          >
            {row.arrowUnFoldIcon}
          </div>
        );
      }
    } else {
      if (row.arrowFoldIcon) {
        arrowIcon = (
          <div
            className={"wasabi-tree-li-icon"}
            style={{ display: "inline-block" }}
            onClick={row.isParent ? onExpand : null}
          >
            {row.arrowFoldIcon}
          </div>
        );
      }
    }
    if (!arrowIcon) {
      let icon = componentType === "tree" ? "icon-caret" : "icon-arrow";
      arrowIcon = (
        <i
          className={
            (clickId === row.id ? " selected " : "") +
            (row.isOpened
              ? ` wasabi-tree-li-icon  ${icon}-down `
              : ` wasabi-tree-li-icon  ${icon}-right`)
          }
          onClick={row.isParent ? onExpand : null}
        >
          {/* span用于右边加虚线*/}
          <span className="wasabi-tree-li-icon-beforeRight"></span>
          {/* 用于向下加虚线 */}
          <span
            className="wasabi-tree-li-icon-afterBelow"
            style={{
              height:
                (childrenLength + 1) * config.rowDefaultHeight +
                (row._isLast ? config.rowDefaultHeight * -1 : 15),
            }}
          ></span>
        </i>
      );
    }
  } else {
    //不是父节点，占位符
    arrowIcon = (
      <i
        className={
          (clickId === row.id ? " selected " : "") +
          " wasabi-tree-li-icon-placeholder"
        }
      >
        {/* span用于右边加虚线*/}
        <span className="wasabi-tree-li-icon-beforeRight"></span>
        {/* 用于向下加虚线 */}
        <span
          className="wasabi-tree-li-icon-afterBelow"
          style={{
            height:
              (childrenLength + 1) * config.rowDefaultHeight +
              (row._isLast ? config.rowDefaultHeight * -1 : 15),
          }}
        ></span>
      </i>
    );
  }

  let checkNode; //勾选节点
  if (checkStyle === "checkbox" && selectAble) {
    checkNode = (
      <CheckBox
        half={row.half}
        name={"node" + row.id}
        /**有子节点有向下的虚线**/
        className={
          (clickId === row.id ? " selected " : "") +
          (childrenLength > 0 ? " hasChildren " : "  ")
        }
        value={row.isChecked ? row.id : ""}
        data={[{ value: row.id, text: "" }]}
        onSelect={onChecked}
      ></CheckBox>
    );
  } else if (checkStyle === "radio" && selectAble) {
    checkNode = (
      <Radio
        type="radio"
        half={row.half}
        name={"node" + row.id}
        /**有子节点有向下的虚线**/
        className={
          (clickId === row.id ? " selected " : "") +
          (childrenLength > 0 ? " hasChildren " : "  ")
        }
        value={row.isChecked ? row.id : ""}
        data={[{ value: row.id, text: "" }]}
        onSelect={onChecked}
      ></Radio>
    );
  } else if (typeof checkStyle === "function" && selectAble) {
    checkNode = checkStyle(row);
  }

  if (checkNode) {
    textwidthReduce += 20;
  }
  //得到文本值
  let text = row.text;
  if (textFormatter && typeof textFormatter === "function") {
    //如果有自定义函数
    text = textFormatter(row);
  }
  //节点元素
  return (
    <li
      className="wasabi-tree-li-container"
      key={row.pId + "-" + row.id}
      data-id={row.id}
      style={{ display: row.hide ? "none" : "flex" }}
    >
      {blankControl}
      {/* 折叠节点 */}
      {/* //  不是父节点也要一个占位符 */}
      {arrowIcon}
      {/* 勾选 可以是自定义的组件 */}
      {checkNode}
      {/* 文本节点 */}
      <div
        onContextMenu={onNodeContextMenu}
        id={nodeid}
        style={{ width: `calc(100% - ${textwidthReduce}px)` }}
        className={
          clickId === row.id
            ? "wasabi-tree-li-node selected"
            : "wasabi-tree-li-node"
        }
        title={row.title || row.text}
        onDrop={onNodeDrop}
        onDragOver={onNodeDragOver}
        onDragLeave={onNodeDragLeave}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {rename ? (
          <Text
            id={textid}
            required={true}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
            name={"key" + row.id}
            value={row.text}
          ></Text>
        ) : (
          <div
            key="2"
            className="wasabi-tree-li-node-text-div"
            draggable={draggAble}
            onDragEnd={onNodeDragEnd}
            onDragStart={onNodeDragStart}
          >
            {/* 没有勾选功能时并且有子节点时有虚线 */}
            <i
              key="3"
              className={
                (!selectAble && childrenLength
                  ? " noCheckhasChildren "
                  : "  ") +
                iconCls +
                " wasabi-tree-text-icon"
              }
            ></i>
            <a href={row.href} className="wasabi-tree-txt">
              {text}
            </a>
          </div>
        )}
        {!rename && renameAble && renameIconAble ? (
          <i
            key="edit"
            className={"icon-edit edit"}
            title="重命名"
            onClick={beforeNodeRename}
          ></i>
        ) : null}
        {!rename && removeAble && removeIconAble ? (
          <i
            key="delete"
            className={"icon-delete edit"}
            title="删除"
            onClick={beforeNodeRemove}
          ></i>
        ) : null}
      </div>
    </li>
  );
}
NodeView = React.memo(NodeView);

function TreeNode(row) {
  const [rename, setRename] = useState(false); //重命名时输入框状态
  const [textid] = useState(uuid()); //输入框id
  const [nodeid] = useState(uuid()); //节点本身的id
  const { treeEvents } = useContext(ShareContext);
  const { treeProps } = useContext(ShareContext);

  const { dropType } = treeProps; //拖动方式
  //节点操作权限，如果树组件本身禁用，则禁用，否则取节点本身（默认是可以的）
  const contextMenuAble =
    treeProps.contextMenuAble || (row.contextMenuAble ?? true);
  const addAble = treeProps.addAble || (row.addAble ?? true);
  const renameAble = treeProps.renameAble || (row.renameAble ?? true);
  const removeAble = treeProps.removeAble || (row.removeAble ?? true);
  const draggAble = treeProps.draggAble || (row.draggAble ?? true);
  const dropAble = treeProps.dropAble || (row.dropAble ?? true);
  useEffect(() => {
    if (rename) {
      let input = document.getElementById(textid);
      if (input) {
        input.focus();
      }
    }
  }, [rename]);
  /**
   * 单击事件
   */
  const onClick = useCallback(() => {
    treeEvents.onClick && treeEvents.onClick(row.id, row.text, row);
  }, [row, treeEvents.onClick]);

  /**
   * 双击事件
   */
  const onDoubleClick = useCallback(() => {
    beforeNodeRename(); //处理双击编辑的功能
    treeEvents.onDoubleClick && treeEvents.onDoubleClick(row.id, row.text, row);
  }, [row, beforeNodeRename, treeEvents.onDoubleClick]);
  /**
   * 勾选
   */
  const onChecked = useCallback(
    (checkValue) => {
      treeEvents.onChecked &&
        treeEvents.onChecked(row.id, row.text, row, checkValue);
    },
    [row, treeEvents.onChecked]
  );
  /**
   * 节点展开/折叠
   */
  const onExpand = useCallback(() => {
    let isOpened = !!!row.isOpened;
    treeEvents.onExpand && treeEvents.onExpand(isOpened, row.id, row.text, row);
  }, [row, treeEvents.onExpand]);

  /**
   * 重命名
   */
  const onNodeRename = useCallback(
    (id, text, row, value) => {
      setRename(false);
      treeEvents.onRename && treeEvents.onRename(id, text, row, value);
    },
    [row, treeEvents.onRename]
  );

  /**
   * 重命名之前
   */
  const beforeNodeRename = useCallback(() => {
    if (renameAble) {
      //先判断是否允许重命名
      let isAble = true; //默认允许
      if (treeEvents.beforeRename) {
        isAble = treeEvents.beforeRename(row.id, row.text, row);
      }
      setRename(isAble);
    }
  }, [row, treeEvents.beforeRename]);
  /**
   * 失去焦点
   */
  const onBlur = useCallback(
    (value) => {
      if (rename) {
        //处理编辑状态才处理
        onNodeRename(row.id, row.text, row, value);
      }
    },
    [row, rename, onNodeRename]
  );
  /**
   * 回车
   */
  const onKeyUp = useCallback(
    (event) => {
      if (rename && event.keyCode === 13) {
        onNodeRename(row.id, row.text, row, event.target.value.trim());
      }
    },
    [row, rename, onNodeRename]
  );
  /**
   * 删除之前
   */
  const beforeNodeRemove = useCallback(() => {
    if (removeAble) {
      let isAble = true;
      if (treeEvents.beforeRemove) {
        isAble = treeEvents.beforeRemove(row.id, row.text, row);
      }
      if (isAble) {
        //允许才调用树组件的
        treeEvents.onRemove && treeEvents.onRemove(row.id, row.text, row);
      }
    }
  }, [row, treeEvents.beforeRemove, treeEvents.onRemove]);

  /**
   *
   * 下面是处理拖动的事件
   */
  const onNodeDragStart = useCallback(
    (event) => {
      if (draggAble) {
        //允许拖动，再通过函数判断
        let isAble = true; //默认允许
        if (treeEvents.beforeDrag) {
          isAble = treeEvents.beforeDrag((row.id, row.text, row));
        }
        if (isAble) {
          event.dataTransfer.setData("dragItem", JSON.stringify(row)); //保存起来
          window.localStorage.setItem("wasabi-drag-item", JSON.stringify(row)); //保存起来给别的地方使用
          treeEvents.onDrag && treeEvents.onDrag(row.id, row.text, row);
        }
      }
    },
    [row, treeEvents.beforeDrag, treeEvents.onDrag]
  );
  /**
   * 拖动组件，拖动结束
   */
  const onNodeDragEnd = useCallback((event) => {
    event.preventDefault();
    //不用这个事件的原因
    //在树组件本身内停靠时，这个事件有时候没有响应，原因不详，并且无法使用event.dataTransfer的，数据不对，原因不详
    //但是拖动到外部的时候，没有问题,先标记
  }, []);

  /**
   * 容器经过事件,要阻止默认事件，否则浏览默认是搜索
   */
  const onNodeDragOver = useCallback(
    (event) => {
      event.preventDefault(); //一定加这句,否则无法停靠

      if (dropAble) {
        const domClientY = document
          .getElementById(nodeid)
          .getBoundingClientRect().top;
        const mouseClientY = event.clientY;
        if (
          (!dropType || (dropType && dropType.inddexOf("before") > -1)) &&
          mouseClientY - domClientY < 10
        ) {
          //前插入
          document.getElementById(nodeid).style.borderTop =
            "1px solid var(--primary-color)";
          document.getElementById(nodeid).style.borderBottom = "none";
          document.getElementById(nodeid).style.backgroundColor =
            "var(--background-color)";
          //当前拖动方式
          window.localStorage.setItem("wasabi-drag-type", "before");
        } else if (
          (!dropType || (dropType && dropType.inddexOf("in") > -1)) &&
          mouseClientY - domClientY < 30
        ) {
          //包含
          document.getElementById(nodeid).style.borderTop = "none";
          document.getElementById(nodeid).style.borderBottom = "none";
          document.getElementById(nodeid).style.backgroundColor =
            "var(--background-color)";
          //当前拖动方式
          window.localStorage.setItem("wasabi-drag-type", "in");
        } else if (!dropType || (dropType && dropType.inddexOf("after") > -1)) {
          //后插入
          document.getElementById(nodeid).style.borderTop = "none";
          document.getElementById(nodeid).style.borderBottom =
            "1px solid var(--primary-color)";
          document.getElementById(nodeid).style.backgroundColor =
            "var(--background-color)";
          //当前拖动方式
          window.localStorage.setItem("wasabi-drag-type", "after");
        }
      }
    },
    [row]
  );
  /**
   * 容器离开事件
   * @param {} event
   */
  const onNodeDragLeave = useCallback((event) => {
    event.preventDefault();
    document.getElementById(nodeid).style.borderTop = "none";
    document.getElementById(nodeid).style.borderBottom = "none";
    document.getElementById(nodeid).style.backgroundColor = null;
  }, []);
  /**
   * 容器组件的停靠事件
   */
  const onNodeDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (dropAble) {
        //允许停靠
        let isAble = true; //可以停靠
        if (treeEvents.beforeDrop) {
          isAble = treeEvents.beforeDrop(drag, row, dragType); //存在并且返回
        }
        if (isAble) {
          document.getElementById(nodeid).style.borderTop = "none";
          document.getElementById(nodeid).style.borderBottom = "none";
          document.getElementById(nodeid).style.backgroundColor = null;
          let dragItem = JSON.parse(event.dataTransfer.getData("dragItem"));
          if (!dragItem) {
            //拿不到就从缓存中拿
            dragItem = JSON.parse(
              window.localStorage.getItem("wasabi-drag-item")
            );
          }
          //当前拖动方式
          let dragType = window.localStorage.getItem("wasabi-drag-type");
          if (!dragItem) {
            return;
          }
          //移除当前拖动方式
          window.localStorage.removeItem("wasabi-drag-type");
          treeEvents.onDrop && treeEvents.onDrop(dragItem, row, dragType);
        }
      }
    },
    [row, treeEvents.beforeDrop, treeEvents.onDrop]
  );

  /**
   * 节点的右键功能
   */
  const onNodeContextMenu = useCallback(
    (event) => {
      if (contextMenuAble) {
        let isAble = true;
        isAble =
          treeEvents.beforeContextMenu &&
          treeEvents.beforeContextMenu(row?.id, row?.text, row, event);
        if (isAble) {
          treeEvents.onContextMenu &&
            treeEvents.onContextMenu(
              row?.id,
              row?.text,
              row,
              {
                addAble,
                removeAble,
                removeAble,
              },
              event
            );
        }
      }
    },
    [contextMenuAble, row, treeEvents.onContextMenu]
  );
  const nodeEvents = {
    rename,
    textid,
    nodeid,
    onClick,
    onDoubleClick,
    onChecked,
    onExpand,
    onBlur,
    onKeyUp,
    beforeNodeRename,
    beforeNodeRemove,
    onNodeDragEnd,
    onNodeDragLeave,
    onNodeDragOver,
    onNodeDragStart,
    onNodeDrop,
    onNodeContextMenu,
  };
  return <NodeView row={row} nodeEvents={nodeEvents}></NodeView>;
}

TreeNode.propTypes = {
  isParent: PropTypes.bool, //是否是父节点
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //值
  pId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //父节值
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //标题
  title: PropTypes.string, //提示信息
  arrowFoldIcon: PropTypes.node, //折叠图标
  arrowUnFoldIcon: PropTypes.node, //展开图标
  iconCls: PropTypes.string, //默认图标
  iconClose: PropTypes.string, //[父节点]关闭图标
  iconOpen: PropTypes.string, //[父节点]打开图标
  isOpened: PropTypes.bool, //是否处于打开状态
  isChecked: PropTypes.bool, //是否被勾选
  selectAble: PropTypes.bool, //是否允许勾选
  addAble: PropTypes.bool, //是否允许新增
  renameAble: PropTypes.bool, //是否允许重命名
  renameIconAble: PropTypes.bool, //是否允许重命名图标
  removeAble: PropTypes.bool, //是否允许移除
  removeIconAble: PropTypes.bool, //是否允许移除图标
  draggAble: PropTypes.bool, //是否允许拖动，
  dropAble: PropTypes.bool, //是否允许停靠
  href: PropTypes.string, //节点的链接
  hide: PropTypes.bool, //是否隐藏
  children: PropTypes.array, //子节点

  //这两个树组件内部传的
  _isLast: PropTypes.bool, //是否为父节点的最后一个节点
  _path: PropTypes.array, //节点的路径
};
TreeNode.defaultProps = {
  iconCls: "icon-text",
  iconClose: "icon-folder",
  iconOpen: "icon-folder-open",
  children: [],
};

export default React.memo(TreeNode);
