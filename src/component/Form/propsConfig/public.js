import dom from "../../libs/dom";
/**
 * 设置下拉框的位置
 * @param {*} target
 */
export function setDropcontainterPosition(target) {
  let container =
    dom.findAncestorByClasss(target, "wasabi-form-group") || target.parentNode;
  if (container) {
    let position = container.getBoundingClientRect();
    let drop = container.querySelector("div.dropcontainter");
    if (drop) {
      drop.style.position = "absolute"
      drop.style.top ="calc(var(--input-height) + 5px)";
      drop.style.left = "0px";
      if (drop.className.indexOf("date") <= -1)
      {
        drop.style.width=position.width+"px"
      }  
    }
   
  }
  
}
