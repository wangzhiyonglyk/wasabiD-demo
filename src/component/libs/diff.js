/**
 * Created by wangzhiyong on 16/8/5.
 * edit 2020-10-13
 */
import React, { cloneElement } from "react";
import func from "./func"
let diff = function (oldParam, newParam) {//判断前后参数是否相同
    if (!newParam && !oldParam) {//都为空
        return false;//
    }
    else if (!newParam || !oldParam) {//有一个为空
        return true;
    }
    else if (newParam instanceof Array && oldParam instanceof Array) {//数组
        return JSON.stringify( func.clone(newParam).sort()) !=JSON.stringify( func.clone(oldParam).sort());
    }
    else if (newParam instanceof Object && newParam instanceof Object) {//对象
        if (newParam && oldParam && (Object.keys(newParam).length != Object.keys(oldParam).length)) {//都有参数,但是参数个数已经不一样了
            return true;
        }
        else if (newParam && oldParam) { //有参数,但参数个数相同,对比
            let isDiff = false;//默认不更新
            for (var par in newParam) {
                try {
                    if (newParam[par] instanceof Array || newParam[par] instanceof Object) {
                        isDiff = diff(oldParam[par], newParam[par]);
                        if (isDiff) break;
                    }
                    else if (newParam[par] == oldParam[par]) {
                        continue;
                    }
                    else {//不相同
                        isDiff = true;

                        break;
                    }
                } catch (e) {
                    isDiff = true;

                }

            }
            return isDiff;
        }
        else {
            return true;
        }
    }
    else {//其他数据类型
        return newParam != oldParam;
    }
    return true;
}
export default diff;


