import React from "react";
import pca from "../../json/pca-code.json"
import Picker from "../Picker"
export default  React.forwardRef( function (props,ref)
{
    return <Picker {...props} data={pca} valueField="code" textField="name"  ref={ref}></Picker>

})
