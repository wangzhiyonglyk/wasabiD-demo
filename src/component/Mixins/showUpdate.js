/**
 * Created by wangzhiyong on 16/8/5.
 * edit 2020-10-13
 */
import React, { cloneElement } from "react";
import unit from "../libs/unit"
export default function (newParam, oldParam) {//判断前后参数是否相同
    if (!newParam && !oldParam) {//都为空
        return false;//
    }
    else if (!newParam || !oldParam) {//有一个为空
        return true;
    }
    else if (newParam instanceof Array && oldParam instanceof Array) {//数组
        return unit.clone(newParam).sort().toString() != unit.clone(oldParam).sort().toString();
    }
    else if (newParam instanceof Object && newParam instanceof Object) {//对象
        if (newParam && oldParam && (Object.keys(newParam).length != Object.keys(oldParam).length)) {//都有参数,但是参数个数已经不一样了
            return true;
        }
        else if (newParam && oldParam) { //有参数,但参数个数相同,对比
            let isupdate = false;//默认不更新
            for (var par in newParam) {
                try {
                    if (newParam[par] == oldParam[par]) {
                        continue;
                    }
                    else {//不相同
                        isupdate = true;

                        return isupdate;
                    }
                } catch (e) {
                    isupdate = true;
                    return isupdate;
                }

            }
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


