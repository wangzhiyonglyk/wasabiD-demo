/**
* * 设置下拉组件的文本值,用于赋值的时候
* @param {*} value 
* @param {*} data 
*/
let processText = function (value = "", data = []) {

    let text = [];//选中的文本值 
    if (data && data instanceof Array && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (("," + (value) + ",").indexOf("," + ((data[i].value + "") || (data[i].id + "")) + ",") > -1) {
                text.push(data[i].text);
            }
            if (data[i].children && data[i].children.length > 0) {
                let r = processText(value, data[i].children);
                text = [].concat(r, text);
            }
        }
    }
    return text || [];

};
export default processText;