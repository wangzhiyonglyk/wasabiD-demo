/**
 * create by wangzhiyonglyk
 * date:2024-01-26
 * desc:手机输入框
 */
import React,{useMemo } from "react";
import BaseInput from "../BaseInput";
import { allCountries,allCountryCodes } from "./data";
import { getCountry } from "./func";
const PhoneInput = React.forwardRef((props, ref) => {
  const {
    value,
    name,
    title,
    placeholder='+8613888888888',
    readOnly,
    required,
    show,
    showPicker,
    onClear,
    onFocus,
    onClick,
    onDoubleClick,
    onKeyUp,
    onChange,
    onBlur,
  } = props;
  const inputProps = { name, title, placeholder, readOnly, required };

  const country=useMemo(() => {
     if(value) {
     const result= getCountry(value);
     return result.country;
    }},
     [value])
  return (
    <React.Fragment>
      <div className="selected-flag" title={title}  onClick={showPicker}>
        <span className={"flag "+country?.mark} >
          </span>
           <i
        className={"select-icon icon-drop-down " + (show ? "rotate" : "")}
       
      ></i>
          </div>
      <i
        className={"combobox-clear icon-clear"}
        onClick={onClear}
        style={{ display: readOnly ? "none" : !value ? "none" : "inline" }}
      ></i>
     
      <BaseInput
        ref={ref}
        {...inputProps}
        value={value??""}
        onFocus={onFocus}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyUp={onKeyUp}
        onChange={onChange}
        onBlur={onBlur}
      />
    </React.Fragment>
  );
});
export default PhoneInput;
