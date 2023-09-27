import dom from "../../libs/dom";
/**
 * 设置下拉框的位置
 * @param {*} target
 */
export function setDropcontainterPosition(target) {
  let container =
    dom.findAncestorByClasss(target, "wasabi-form-group") || target.parentNode;

  let position = target.parentNode.getBoundingClientRect();
  let top = position.bottom + 5;
  if (dom.findAncestorByClasss(target, "wasabi-table-cell")) {
    // 表格内的要减少高度
    top = top - 46;
  }
  let drop = container.querySelector("div.dropcontainter");
  drop.style.top = top + "px";
  drop.style.left = position.left + "px";
}
