/**
 * create by wangzhiyonglyk
 * date:2023-04-14
 * 对象扩展，独立出来
 */

/**
 * 对象的复制
 * @param {*} obj 源对象
 * @returns
 */
let func = {};
func.clone = function (obj, deep = true) {
  const toStr = Function.prototype.call.bind(Object.prototype.toString);
  let o;
  switch (typeof obj) {
    case "object":
      if (obj === null) {
        o = null;
      } else {
        if (obj.nodeType && "cloneNode" in obj) {
          // DOM Node
          o = obj.cloneNode(true);
        } else if (toStr(obj) === "[object Date]") {
          //对日期的复制
          o = new Date(obj.getTime());
        } else if (obj instanceof Map) {
          o = new Map(obj);
        } else if (obj instanceof Set) {
          o = new Set(obj);
        } else if (toStr(obj) === "[object RegExp]") {
          const flags = [];
          if (obj.global) {
            flags.push("g");
          }
          if (obj.multiline) {
            flags.push("m");
          }
          if (obj.ignoreCase) {
            flags.push("i");
          }
          o = new RegExp(obj.source, flags.join(""));
        } else if (Array.isArray(obj)) {
          // 数组
          o = [];
          if (deep) {
            for (let i = 0; i < obj.length; i++) {
              o.push(func.clone(obj[i]));
            }
          } else {
            o = obj.slice(0);
          }
        } else {
          //普通对象
          o = obj.constructor ? new obj.constructor() : {};
          for (let k in obj) {
            o[k] = deep ? func.clone(obj[k]) : obj[k];
          }
        }
      }
      break;
    default: //其他类型,包括函数
      o = obj;
      break;
  }
  return o;
};

/**
 * 判断是否空对象
 * @param {*} obj
 * @returns
 */
func.isEmptyObject = function (obj) {
  let isempty = true;
  if (typeof obj === "object") {
    for (let o in obj) {
      isempty = false;
    }
  }
  return isempty;
};

/**
 * 判断两个对象是相同
 * @param {*} objA
 * @param {*} objB
 *  @param {bool} deep 是否深层遍历
 * @returns
 */
func.diff = function (objA, objB, deep = true) {
  //
  if (objA === objB) {
    //直接相等，返回
    return false;
  }
  if (
    Object.prototype.toString.call(objA) !==
    Object.prototype.toString.call(objB)
  ) {
    //类型不同
    return true;
  }
  if (typeof objA === "function") {
    //函数
    return objA.toString() !== objB.toString();
  } else if (typeof objA === "object") {
    //对象
    //先拿所有的属性
    try {
      if (
        Object.prototype.toString.call(objA).indexOf("Map") > -1 ||
        Object.prototype.toString.call(objA).indexOf("Set") > -1 ||
        Object.prototype.toString.call(objA).indexOf("Date") > -1 ||
        Object.prototype.toString.call(objA).indexOf("RegExp") > -1
      ) {
        //如果是Map与Set则直接判断即可，因为两者的无法像普通对象遍历
        return objA !== objB;
      }
      let oldProps = Object.getOwnPropertyNames(objA);
      let newProps = Object.getOwnPropertyNames(objB);
      if (oldProps.length !== newProps.length) {
        return true; //不相同
      }

      for (let i = 0; i < oldProps.length; i++) {
        let propName = oldProps[i]; //属性名
        //值
        let propA = objA[propName];
        let propB = objB[propName];
        return func.diff(propA, propB, deep);
      }
    } catch (e) {
      console.log(objA, objB);
    }
  } else {
    //其他类型
    return objA !== objB;
  }

  return false;
};

/**
 * 将二维数据转树型结构
 * @param {Array} data 数据
 * @param {string } idField 节点key
 * @param {string } parentField 父节点key
 * @param {string } textField 文本key
 * @param {string } childrenField 子节点key
 * @returns tree
 */
func.toTreeData = function (
  data = [],
  idField = "id",
  parentField = "pId",
  textField = "text",
  childrenField = "children"
) {
  let tree = []; //最终树数据
  try {
    const nodeHash = new Map();
    let ids = new Map(); //所有id值，目的是为了找到有父节点id,但是找不到父节点的节点
    //添加节点
    const addfn = (parent, item, path) => {
      item.id = item[idField] ?? "";
      item.pId = item[parentField] ?? "";
      item.text = item[textField];
      item.children = item[childrenField] ?? []; //保留原来的
      nodeHash.set(item[idField], path); //节点路径
      parent.push(item);
    };
    for (let index = 0; index < data.length; index++) {
      ids.set(data[index][idField], data[index][idField]);
      if (!data[index][parentField]) {
        //父节点为空，一级节点，优先加入
        addfn(tree, data[index], [tree.length]);
      }
    }
    for (let index = 0; index < data.length; index++) {
      if (data[index][parentField] && !ids.has(data[index][parentField])) {
        //父节点没有归属， 属于一级节点的pid值
        addfn(tree, data[index], [tree.length]);
      }
    }
    let index = 0;
    const maxnum = 20000 * 1000; //最大循环次数，避免出错时，造成死循环
    let count = 0; //总次数，防止死循环
    while (data.length !== nodeHash.size && count < maxnum) {
      count++;
      let item = data[index];
      if (item[parentField] && !nodeHash.has[item[idField]]) {
        //还没有加入的
        let posArr = nodeHash.get(item[parentField]); //拿出父节点的路径
        if (posArr) {
          //说明父节点已经找到了
          let parentNode = tree[posArr[0]]; //找到父节点
          for (let j = 1; j < posArr.length; j++) {
            parentNode = parentNode.children[posArr[j]];
          }
          try {
            const newPath = posArr.concat([parentNode.children.length]);
            addfn(parentNode.children, item, newPath);
          } catch (e) {
            console.log("e", item, posArr, nodeHash);
          }
        }
      }
      index = index >= data.length - 1 ? 0 : index + 1;
    }

    if (data.length !== nodeHash.size) {
      console.error("数据格式不正确，或者是数据量过大，请使用异步请求");
    }
  } catch (e) {
    console.log("totreedata", e);
  }
  return tree;
};

/**
 * 深度合并
 * @param {*} targetObj 目标对象
 * @param {*} sourceObj 源对象
 * @returns
 */
func.deepMerge = function (targetObj, sourceObj) {
  for (var key in sourceObj) {
    Object.prototype.toString.call(targetObj[key]) === "[object Object]"
      ? func.deepMerge(targetObj[key], sourceObj[key])
      : (targetObj[key] = sourceObj[key]);
  }
  return targetObj;
};
/**
 * 数组对象去重合并
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @param {*} key key值
 * @returns
 */
func.arrayNodupMerge = function (arr1 = [], arr2 = [], key = "id") {
  let arr = [].concat(arr1, arr2);
  let result = [];
  let obj = {};
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i][key]]) {
      result.push(arr[i]);
      obj[arr[i][key]] = true;
    }
  }
  return result;
};

/**
 * 获取真正的数据源
 * @param {*} data  数据
 * @param {*} source
 * @returns
 */
func.getSource = function (data, source = "data") {
  if (typeof data === "object" && !Array.isArray(data)) {
    let sourceArr = [];
    let returnData = data;

    if (source.indexOf(".") > -1) {
      sourceArr = source.split(".");
    } else {
      sourceArr.push(source);
    }
    let i = 0;
    try {
      while (i < sourceArr.length) {
        returnData = returnData[sourceArr[i]];
        if (returnData == null) {
          return null; //直接返回
        }
        i++;
      }
    } catch (e) {
      return null;
    }

    return returnData;
  } else {
    return data;
  }
};

/**
 * component Mixins实现
 * @param {object} component 组件
 * @param {Array} mixinClass
 */
func.componentMixins = function (component, mixinClass = []) {
  try {
    mixinClass.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor).forEach((name) => {
        if (typeof baseCtor[name] == "function") {
          component.prototype[name] = baseCtor[name];
        }
      });
    });
  } catch (e) {}

  return component;
};

 /**
   * 数组比较函数
   * @param key key值
   * @param type  asc,desc
   */
 function compare(key, type) {
  //这是比较函数
  return function (after, pre) {
    let preItem = pre[key];
    let afterItem = after[key];
    if (typeof preItem === "number" || typeof afterItem === "number") {
      if (type === OrderType.desc) {
        return preItem - afterItem;
      } else {
        return afterItem - preItem;
      }
    } else {
      preItem = JSON.stringify(preItem);
      afterItem = JSON.stringify(afterItem);
      if (type === OrderType.desc) {
        return preItem > afterItem ? 1 : preItem === afterItem ? 0 : -1;
      } else {
        return preItem < afterItem ? 1 : preItem === afterItem ? 0 : -1;
      }
    }
  };
}

/**
 * 数组sort排序
 * @param arr 数据
 * @param key key值
 * @param type  排序方式 asc,desc
 */
func.arrSort = function (arr, key, type="asc") {
  return arr.sort(compare(key, type));
};
export default func;
