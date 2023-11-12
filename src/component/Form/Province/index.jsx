import React from "react";
import pca from "../../json/pca-code.json"
import Picker from "../Picker"
export default function (props)
{
    return <Picker {...props} data={pca} valueField="code" textField="name" ></Picker>

}