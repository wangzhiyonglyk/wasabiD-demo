// /**
//  * create by wangzhiyonglyk 树型表格视图
//  * date:2022-01-06 因为虚拟列表的原因，要容器与视图拆分
//  * 2022-01-06 修复树表格的单击事件的bug
//  */

// import React, {
//   useCallback,
//   useImperativeHandle,
//   useRef,
//   useState,
//   useEffect,
// } from "react";
// import DataGrid from "../DataGrid";
// import TreeView from "../Tree/TreeView";
// import "./index.css";
// import config from "../Tree/config";
// import func from "../../libs/func";

// function TreeGrid(props, ref) {
//   const grid = useRef(null);
//   const [width, setWidth] = useState(config.leftWidth);
//   const [treegridid] = useState(func.uuid());
//   const [divideid] = useState(func.uuid());
//   /**
//    * 表格的单击事件
//    * @param {*} rowData
//    * @param {*} rowIndex
//    */
//   const dataGridClick = useCallback((rowData, rowIndex) => {
//     props.onClick && props.onClick(rowData[props.idField] ?? rowIndex);
//   }, []);
//   /**
//    * 分隔线事件
//    */
//   const onDivideMouseMove = useCallback((event) => {
//     let divide = document.getElementById(divideid);
//     let treegrid = document.getElementById(treegridid);
//     treegrid.style.userSelect = "none";
//     let left = treegrid.getBoundingClientRect().left;
//     divide.style.left = event.clientX - left + "px"; //这个位置才是相对容器的位置
//   }, []);
//   const onDivideMouseUp = useCallback((event) => {
//     let divide = document.getElementById(divideid);
//     divide.style.display = "none";
//     let treegrid = document.getElementById(treegridid);
//     treegrid.style.userSelect = null;
//     setWidth(parseInt(divide.style.left));
//     document.removeEventListener("mousemove", onDivideMouseMove);
//     document.removeEventListener("mouseup", onDivideMouseUp);
//   }, []);

//   /**
//    * 左侧树的鼠标监听事件
//    * @param {*} event
//    */
//   const onMouseMove = useCallback((event) => {
//     try {
//       let offsetX = event && event.nativeEvent && event.nativeEvent.offsetX;
//       let width = event.target.getBoundingClientRect().width;

//       if (width - offsetX <= 4) {
//         console.log("width", width, event.target);
//         event.target.style.cursor = "ew-resize";
//       } else {
//         event.target.style.cursor = "pointer";
//       }
//     } catch (e) {}
//   }, []);

//   const onMouseDown = useCallback((event) => {
//     if (event.target.style.cursor === "ew-resize") {
//       document.getElementById(divideid).style.left =
//         event.target.getBoundingClientRect().width + "px";
//       document.getElementById(divideid).style.display = "block";
//       document.addEventListener("mousemove", onDivideMouseMove);
//       document.addEventListener("mouseup", onDivideMouseUp);
//     }
//   });

//   useImperativeHandle(ref, () => ({
//     /**
//      * 设置焦点行
//      * @param {*} id
//      */
//     setFocus(id) {
//       grid?.current.setFocus(id);
//     },
//   }));
//   useEffect(
//     () => {
//       let time = setInterval(() => {
//         const treegrid = document.getElementById(treegridid);
//         if (treegrid) {
//           const tableheader =
//             treegrid.querySelector(".table-fixedth").children[0];
//           const configuration = treegrid.querySelector(
//             ".wasabi-treegrid-configuration"
//           );

//           const height = tableheader.getBoundingClientRect().height;
//           if (height) {
//             configuration.style.height = height + "px";
//             clearInterval(time);
//           }
//         }
//       }, 10);
//     },
//     props.headers,
//     props.fixedHeaders
//   );
//   return (
//     <div className={"wasabi-treegrid "} id={treegridid}>
//       <div className="wasabi-treegrid-left" style={{ width: width }}>
//         <div
//           className="wasabi-treegrid-configuration"
//           onMouseMove={onMouseMove}
//           onMouseDown={onMouseDown}
//         >
//           {props.treeHeader}
//         </div>
//         <div className="wasabi-treegrid-rowsData">
//           {/* <TreeView></TreeView> */}
//         </div>
//       </div>
//       <div
//         className="wasabi-treegrid-right"
//         style={{ width: `calc(100% - ${width}px)` }}
//       >
//         <DataGrid
//           ref={grid}
//           {...props}
//           pagination={false}
//           rowNumber={false}
//           detailAble={false}
//           selectAble={false}
//           style={props.gridStyle}
//           priKey={props.idField || "id"}
//           headers={props.headers}
//           data={props.visibleData}
//           onClick={dataGridClick}
//         ></DataGrid>
//       </div>
//       <div className="wasabi-treegrid-divide" id={divideid}></div>
//     </div>
//   );
// }

// export default React.memo(React.forwardRef(TreeGrid));
