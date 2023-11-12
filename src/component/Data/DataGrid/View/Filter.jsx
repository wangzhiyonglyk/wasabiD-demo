import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";
import Input from "../../../Form/Input";
import dom from "../../../libs/dom";
import {changeRangeType,comboboxType} from "../../../Form/propsConfig/propTypes"
function Filter({ containerid, onFilter }, ref) {
  const divRef = useRef(null); //树表格
  const [rowIndex, setRowIndex] = useState(null);
  const [columnIndex, setColumnIndex] = useState(null);
  const [header, setHeader] = useState(null);
  const onFilterHandler = useCallback(
    (value, text) => {
      if (divRef.current) {
        divRef.current.style.display = "none";
        document.removeEventListener("click", hide);
        onFilter && onFilter(rowIndex, columnIndex, value, text);
      }
     
     
    },
    [rowIndex, columnIndex]
  );
  const hide = useCallback(
    (event) => {
      if (event && event.target) {
        let isdes = dom.isDescendant(divRef.current, event.target);
        if (
          event.target.className.indexOf("wasabi-grid-filter") <= -1 &&
          !isdes
        ) {
          divRef.current.style.display = "none";
          document.removeEventListener("click", hide);
        }
      }
    },
    [divRef]
  );
  // 对外接口
  useImperativeHandle(ref, () => ({
    open(headerRowIndex, headerColumnIndex, cheader, event) {
      if (divRef.current) {
        let container = document.getElementById(containerid);
        this.left = container.getBoundingClientRect().left; // 得到整个容器左边距
        divRef.current.style.display = "block";
        divRef.current.style.left = event.clientX - this.left - 10 + "px";
        divRef.current.style.top = event.clientY + 10 + "px";
        setRowIndex(headerRowIndex);
        setColumnIndex(headerColumnIndex);
        setHeader(cheader);
        setTimeout(() => {
          document.addEventListener("click", hide);
        }, 30);
      }
     
    },
  }));
  const type = header && header.editor.type;
  let control=null
  if (type) {
    let newType = "text";
    if (changeRangeType.includes(type)) {
      newType = type + "range";
    }
    else {
      newType=type||"text"
    }
    // 下拉组件有选择事件，文本组件有值改变事件
    let onBlur = comboboxType.includes(header?.editor.type)? null : onFilterHandler;
    let onSelect=comboboxType.includes(header?.editor.type)?onFilterHandler:null
   
    console.log("header",header.editor)
     control= <Input
       {...header?.editor?.options}
       // 强制改变
       required={false}
       readOnly={false}
    type={newType}
    name={header.name}
    value={header.filterValue}
    onBlur={onBlur}
    onSelect={onSelect}

  ></Input>
  
  }
  return (
     <div
      key="filter"
      ref={divRef}
      className={"dropcontainter table "}
      style={{ display: "none" }}
    >
    {control}
    </div>
  );

}

export default React.memo(React.forwardRef(Filter));
