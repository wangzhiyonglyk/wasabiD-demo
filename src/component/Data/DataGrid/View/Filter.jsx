import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";
import Input from "../../../Form/Input";
import dom from "../../../libs/dom";
function Filter({ containerid, onFilter }, ref) {
  const divRef = useRef(null); //树表格
  const [rowIndex, setRowIndex] = useState(null);
  const [columnIndex, setColumnIndex] = useState(null);
  const [header, setHeader] = useState(null);
  const onFilterHandler = useCallback(
    (value, text) => {
      divRef.current.style.display = "none";
      document.removeEventListener("click", hide);
      onFilter && onFilter(rowIndex, columnIndex, value, text);
    },
    [rowIndex, columnIndex]
  );
  const hide = useCallback(
    (event) => {
      let isdes = dom.isDescendant(divRef.current, event.target);
      if (event.target.className !== "icon-filter" && !isdes) {
        divRef.current.style.display = "none";
        document.removeEventListener("click", hide);
      }
    },
    [divRef]
  );
  // 对外接口
  useImperativeHandle(ref, () => ({
    open(headerRowIndex, headerColumnIndex, cheader, event) {
      let container = document.getElementById(containerid);
      this.left = container.getBoundingClientRect().left; // 得到整个容器左边距
      divRef.current.style.display = "block";
      divRef.current.style.left = event.clientX - this.left - 10 + "px";
      divRef.current.style.top = event.clientY + 10 + "px";
      setRowIndex(headerRowIndex);
      setColumnIndex(headerColumnIndex);
      setHeader(cheader);
      setTimeout(() => {
        console.log("show");
        document.addEventListener("click", hide);
      }, 30);
    },
  }));
  return (
    <div
      key="filter"
      ref={divRef}
      className={"dropcontainter table "}
      style={{ display: "none" }}
    >
      {header ? (
        <Input
          {...header?.editor?.options}
          type={header?.editor?.type}
          name={header.name}
          onChange={onFilterHandler}
          onSelect={onFilterHandler}
        ></Input>
      ) : null}
    </div>
  );
}

export default React.memo(React.forwardRef(Filter));
