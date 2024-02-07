import dom from "../../libs/dom";
/**
 * 设置下拉框的位置
 * @param {*} target
 */
export function setDropcontainterPosition(target) {
  let container =
    dom.findAncestorByClasss(target, "combobox") || target.parentNode;
  if (container) {
    let position = container.getBoundingClientRect();
    let drop = container.querySelector("div.dropcontainter");
    if (drop) {
      drop.style.position = "absolute"
      drop.style.top = (position.height + 5) + "px";
      drop.style.left = "0px";
      if (drop.className.indexOf("date") <= -1) {
        drop.style.width = position.width + "px"
      }
    }

  }

}
