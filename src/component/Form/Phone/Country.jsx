
import React,{useMemo,useCallback} from "react"
import { allCountriesArr,allCountries,allCountryCodes } from "./data"

export default function ({onSelect,value}){
const onClick=useCallback((country,event)=>{
  onSelect&& onSelect(country,event)
},[onSelect])
 const country=useMemo(() => {
     if (value) {
   
      let str;
      // 有空格则取空格
     if(value.indexOf(" ")>-1){
       str = value.replace("+", "").slice(0, value.indexOf(" "))
     }
     else {
         // 逻辑，先取前四位，再取前三位，再取前两位 再取前1位
      str = value.replace("+", "").slice(0, 4);
      if (!(allCountryCodes)[str]) {
        str = value.replace("+", "").slice(0, 3);
      }
      if (!(allCountryCodes)[str]) {
        str = value.replace("+", "").slice(0, 2);
      }
      if (!(allCountryCodes)[str]) {
        str = value.replace("+", "").slice(0, 1);
      }
     }
      const countryCode = allCountryCodes[str] || ["86"]//默认为中国
      return allCountries[countryCode[0]];
    }
    else {
      return allCountries["cn"]
    }
    }
  
  , [value])
    return <ul className="wap">
        {
            allCountriesArr.map(item=>{
    return  <li  className={item.mark===country.mark?"active":""} onClick={onClick.bind(this,item)} key={item.mark}><span className={"flag "+item.mark}></span><span>{item.cnName}</span><span >+{item.areaCode}</span></li>
            })
        }
      
    </ul>
}