/**
 * Created by wangzhiyong on 16/8/5.
 * edit 2020-10-13
 */
import React, { cloneElement } from "react";
/**
 * 判断两个对象是否完全相同
 * @param {*} objA 
 * @param {*} objB  
 * @returns 
 */
let diff = function (objA, objB) {//
    if (objA === objB) {
        return false;
    }
    if (objA && objB) {
        if (typeof objA !== typeof objB) {
            return true;
        }
        if (typeof objA !== "object" && typeof objA !== "function") {
            return objA !== objB;
        }
        if (typeof objA === "object") {
            //先拿所有的属性
            let oldProps = Object.getOwnPropertyNames(objA);
            let newProps = Object.getOwnPropertyNames(objB);
            if (oldProps.length !== newProps.length) {
                return true;//不相同
            }
            for (let i = 0; i < oldProps.length; i++) {
                let propName = oldProps[i];//属性名
                //值
                let propA = objA[propName]
                let propB = objB[propName]
                if (diff(propA, propB)) {
                    return true;
                }

            }
        }
    }
    return JSON.stringify(objA) !== JSON.stringify(objB);
}
export default diff;


