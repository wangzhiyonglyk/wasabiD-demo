/**
 * Created by wangzhiyonglyk on 2016-06-08.
 * 将独立于项目的公共函数分享出来
 *2020-11-06，重新规划
 2021-09-10添加新功能
 2022-01-27 本项目除去多余的函数
 */

/**
 * 对象的深复制
 * @param {*} obj 源对象
 * @returns
 */
export function clone(obj) {
  let o;
  switch (typeof obj) {
    case "object":
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          //o= obj.slice(0)， 注意了这里不能直接使用这个复制，如果数组中的元素为对象
          for (let i = 0; i < obj.length; i++) {
            o.push(clone(obj[i]));
          }
        } else if (obj instanceof Date) {
          //对日期的复制
          o = new Date(obj.valueOf());
        } else if (obj instanceof Map) {
          o = new Map(obj);
        } else if (obj instanceof Set) {
          o = new Set(obj);
        } else {
          //普通对象
          o = {};
          for (let k in obj) {
            o[k] = clone(obj[k]);
          }
        }
      }
      break;
    default: //其他类型
      o = obj;
      break;
  }
  return o;
}

/**
 * 获取真正的数据源
 * @param {*} data  数据
 * @param {*} source
 * @returns
 */
export function getSource(data, source = "data") {
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
}

/**
 * 生成uuid
 */
export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 将二维数据转树型结构
 * @param {Array} data 数据
 * @param {string } idField 节点key
 * @param {string } parentField 父节点key
 * @param {string } textField 文本key
 *  @param {string } childrenField 子节点key
 */
export function toTreeData(
  data = [],
  idField = "id",
  parentField = "pId",
  textField = "text",
  childrenField = "children"
) {
  let tree = []; //最终树数据
  let nodeHash = new Map(); //临时节点对象
  let count = 0; //总次数，防止死循环
  let ids = new Map(); //所有id值
  let cloneData = (data ?? []).concat(); //保证不影响原数据，防止重新更新

  const addfn = (parent, item, path) => {
    item.id = item[idField] ?? "";
    item.pId = item[parentField] ?? "";
    item.text = item[textField];
    item.children = item[childrenField] ?? []; //保留原来的
    item._path = path;
    nodeHash.set(item[idField], path); //节点路径
    parent.push(item);
  };
  for (let index = 0; index < cloneData.length; index++) {
    ids.set(cloneData[index][idField], cloneData[index][idField]);
    if (!cloneData[index][parentField]) {
      //父节点为空，一级节点，优先加入
      addfn(tree, cloneData[index], [tree.length]);
    }
  }
  for (let index = 0; index < cloneData.length; index++) {
    if (
      cloneData[index][parentField] &&
      !ids.has(cloneData[index][parentField])
    ) {
      //父节点没有归属， 属于一级节点的pid值
      addfn(tree, cloneData[index], [tree.length]);
    }
  }
  let index = 0;
  const maxnum = 20000 * 1000;
  while (cloneData.length !== 0 && count < maxnum) {
    count++;
    let item = cloneData[index];
    if (!item[parentField] || nodeHash.has[item[idField]]) {
      //说明已经加入了，
      cloneData.splice(index, 1);
      index--;
    } else {
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
          cloneData.splice(index, 1);
          index--;
        } catch (e) {
          console.log("e", item, posArr, nodeHash);
        }
      }
    }
    index++;
    if (index > cloneData.length - 1) {
      index = 0; //归零
    }
  }
  if (cloneData.length > 0) {
    console.error("数据格式不正确，或者是数据量过大，请使用异步请求");
  }

  return tree;
}

/**
 * 将树型结构的数据扁平化
 * @param {*} data 数据
 * @returns
 */
export function treeDataToFlatData(data, result = []) {
  result = result ?? [];
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i]._isLast = i === data.length - 1 ? true : false; //目的为了画向下的虚线最一个不需要
      result.push(data[i]);
      if (
        data[i].children &&
        data[i].children.length > 0 &&
        data[i].isOpened === true
      ) {
        treeDataToFlatData(data[i].children, result); //将结果传递下去，这样就不用利用返回值来合并
      }
    }
  }
  return result;
}
