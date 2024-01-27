
import React,{useMemo,useCallback} from "react"
import { allCountriesArr,allCountries,allCountryCodes } from "./data"

export default function ({onSelect,value}){
const onClick=useCallback((country,event)=>{
  onSelect&& onSelect(country,event)
},[onSelect])
 const country=useMemo(() => {
     if(value) {
     let str=value.slice(0, value.indexOf(" ")).replace("+","")
          const countryCode=allCountryCodes[str]||["86"]//默认为中国
          return allCountries[countryCode[0]];
          
     }
     else{
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