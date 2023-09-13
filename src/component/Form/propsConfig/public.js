import dom from "../../libs/dom";
/**
 * 设置下拉框的位置
 * @param {*} target
 */
export function setDropcontainterPosition(target) {
  let container = target.parentNode;
  if (!dom.findAncestorByClasss(container, "wasabi-table-cell")) {
    // 不是表格内的
    let position = target.parentNode.getBoundingClientRect();
    let drop = container.querySelector("div.dropcontainter");
    drop.style.top = position.bottom + 5 + "px";
    drop.style.left = position.left + "px";
  }
}
