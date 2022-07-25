/**
 * create by wangzhiyong
 * desc 普通轮播组件
 * date:2020-07-15
 * todo 还有bug
 * 2021-05-12 有bug
 * 2022-07-25 用纯动画的形式完成滑动组件
 *
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import func from "../../libs/func";
import "./slider.css";
const uuid = func.uuid;
const Slider = function (props) {
  const [containerParentId] = useState(uuid());

  const [containerId] = useState(uuid());
  const scrollItemStep = useRef(props.childStep); //每次移动的像素
  /**
   * 鼠标停靠
   */
  const onMouseOver = useCallback(() => {
    document
      .getElementById(containerParentId)
      .style.setProperty("--scrollState", "paused");
  }, []);
  /**
   * 鼠标移开
   */
  const onMouseOut = useCallback(() => {
    document
      .getElementById(containerParentId)
      .style.setProperty("--scrollState", "running");
  }, []);

  const move = useCallback(() => {
    let containerUL = document.getElementById(containerId);
    let scrollNum = React.Children.count(props.children); //滚动的个数
    let stepType = ""; //宽度还是高度
    let itemwidth = 0;
    let itemHeight = 0;
    if (scrollNum > 1) {
      itemwidth = containerUL.children[0].getBoundingClientRect().width;
      itemHeight = containerUL.children[0].getBoundingClientRect().height;
      //子节点个数超过1

      if (props.direction === "left" || props.direction === "right") {
        stepType = "width";
        /**
         * 通过将子元素单独放置在一个容器中得到子元素真实的宽度的，以为此来设置容器的宽度及步长
         */
        {
          let id = uuid();
          let info = document.createElement("div");
          info.style.opacity = 0;
          info.style.display = "inline-block";
          info.id = id;
          info.innerHTML = containerUL.children[0].outerHTML;
          document.body.appendChild(info);
          itemwidth = document.getElementById(id).getBoundingClientRect().width;
          document.body.removeChild(info);
        }

        scrollItemStep.current = itemwidth; //以子元素的宽度作为值
        //因为块级布局原因，横向滚动要设置宽度
        document.getElementById(containerParentId).style.width =
          itemwidth + "px";
        //直接容器的宽度足够n+1个
        document.getElementById(containerId).style.width =
          itemwidth * (scrollNum + 1) + "px";
      } else if (props.direction === "top" || props.direction === "bottom") {
        stepType = "height";
        scrollItemStep.current =
          containerUL.children[0].getBoundingClientRect().height; //以子元素的高度作为值
      }
      //设置高度 保证只可见一个
      document.getElementById(containerParentId).style.height =
        itemHeight + "px";

      if (props.childStep > 0) {
        //如果设置了固定值，使用固定的值
        scrollItemStep.current = props.childStep;
      }
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollNum", scrollNum);
      /***动画移动像素 */
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollItemStep", scrollItemStep.current);
      /**动画时长 */
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollSpeed", (props.interval ?? 1000) + "ms");
      /**逐帧动画名 */
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollAnimation", "move" + props.direction);
      /**补间动画名 */
      document
        .getElementById(containerId)
        .style.setProperty(
          "--scrollItemAnimation",
          "itemmove" + props.direction
        );
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollState", "running");
    }
  }, [props.interval, props.childStep, props.direction]);
  useEffect(() => {
    move();
  }, []);
  return (
    <div
      id={containerParentId}
      className={"wasabi-slider" + " " + props.className}
      style={props.style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div
        className={
          "wasabi-slider-ul " +
          (props.direction === "left" || props.direction === "right"
            ? "row"
            : "column")
        }
        id={containerId}
      >
        {props.direction === "right" || props.direction === "bottom"
          ? React.Children.map(props.children, (child, index) => {
              if (child && index === React.Children.count(props.children) - 1) {
                return <React.Fragment key={"more"}>{child}</React.Fragment>;
              } else {
                return null;
              }
            })
          : null}
        {props.children}
        {/*复制第一节点 */}
        {props.direction === "left" || props.direction === "top"
          ? React.Children.map(props.children, (child, index) => {
              if (child && index === 0) {
                return <React.Fragment key={"more"}>{child}</React.Fragment>;
              } else {
                return null;
              }
            })
          : null}
      </div>
    </div>
  );
};

Slider.defaultProps = {
  interval: 2000,
  direction: "left",
};
Slider.propTypes = {
  className: PropTypes.string, //样式
  style: PropTypes.object, //
  childStep: PropTypes.number, //子节点移动的像素步长
  interval: PropTypes.number.isRequired, //轮播间隔时间
  direction: PropTypes.oneOf(["left", "right", "top", "bottom"]), //
};

export default React.memo(Slider);
