/**
 * create by tome
 * desc 普通滚动组件
 * 2022-07-25 用纯动画的形式完成滑动组件
 *
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import func from "../../libs/func";
import dom from "../../libs/dom";
import "./index.css";
const uuid = func.uuid;
/**
 * 获取子节点距离中心点的偏差
 * @param {*} scrollOffset
 */
const getchildrenDiff = (
  containerParentId,
  containerId,
  direction = "left"
) => {
  let containerParentUL = document.getElementById(containerParentId);
  let containerUL = document.getElementById(containerId);
  let rect = containerParentUL.getBoundingClientRect();
  let midPosition =
    direction === "left" || direction === "right"
      ? rect.right - rect.width / 2
      : rect.bottom - rect.height / 2; //中间点

  let chidlren = containerUL.children;

  let diffObj = [];
  for (let i = 0; i < chidlren.length; i++) {
    let childrect = chidlren[i].getBoundingClientRect();
    let childmidPosition =
      direction === "left" || direction === "right"
        ? childrect.right - childrect.width / 2
        : childrect.bottom - childrect.height / 2; //中间点
    //距离中心点的偏差
    let diff = Math.abs(childmidPosition - midPosition);
    //偏差缩放率
    let diffScale = Math.max(
      0,
      1 - parseInt((diff / midPosition) * 10000) / 10000
    ); //取四位小数，最小为0
    diffObj.push({
      dom: chidlren[i],
      diff: diff,
      diffScale: diffScale,
    });
  }
  return diffObj;
};
const Scroll = function (props) {
  const [containerParentId] = useState(uuid());
  const [containerId] = useState(uuid());

  const movePosition = useRef(null); //移动的位置
  /**
   * 鼠标停靠
   */
  const onMouseOver = useCallback(() => {
    document
      .getElementById(containerParentId)
      .style.setProperty("--scrollState", "paused");
  }, [containerParentId]);
  /**
   * 鼠标移开
   */
  const onMouseOut = useCallback(() => {
    document
      .getElementById(containerParentId)
      .style.setProperty("--scrollState", "running");
  }, [containerParentId]);

  /**
   * 鼠标点击
   */
  const onMouseDown = useCallback(
    (event) => {
      //保存好位置
      if (props.direction === "left" || props.direction === "right") {
        movePosition.current = {
          scrollOffset: document.getElementById(containerParentId).scrollLeft,
          oldClientX: event.clientX,
          oldClientY: event.clientY,
        };
      } else {
        movePosition.current = {
          scrollOffset: document.getElementById(containerParentId).scrollTop,
          oldClientX: event.clientX,
          oldClientY: event.clientY,
        };
      }

      let imgs = document.getElementById(containerId).querySelectorAll(`img`);
      if (imgs && imgs.length > 0) {
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].setAttribute("draggable", false);
        }
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [containerId]
  );
  /**
   * document鼠标移动
   */
  const onMouseMove = useCallback(
    (event) => {
      if (
        movePosition.current &&
        dom.isDescendant(
          document.getElementById(containerParentId),
          event.target
        )
      ) {
        if (props.direction === "left" || props.direction === "right") {
          document.getElementById(containerParentId).scrollLeft =
            movePosition.current.scrollOffset +
            movePosition.current.oldClientX -
            event.clientX;
        } else {
          document.getElementById(containerParentId).scrollTop =
            movePosition.current.scrollOffset +
            movePosition.current.oldClientY -
            event.clientY;
        }
      } else {
      }
    },
    [props.direction, containerParentId]
  );

  /**
   * document 鼠标松开
   */
  const onMouseUp = useCallback((event) => {
    movePosition.current = null;
    let imgs = document.getElementById(containerId).querySelectorAll(`img`);
    if (imgs && imgs.length > 0) {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute("draggable", true);
      }
    }
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, []);
  /**
   * 移动
   */
  const move = useCallback(() => {
    let containerUL = document.getElementById(containerId); //里面容器
    let itemNum = React.Children.count(props.children); //子元素的个数
    let itemwidth = 0; //子元素的宽度
    let itemHeight = 0; //子元素的高度
    let scrollNum = 0; //动画滚动的步数
    if (itemNum > 1) {
      //子节点个数超过1
      /**
       * 通过将子元素单独放置在一个容器中得到子元素真实的宽度与高度的，以为此来设置容器的宽度，高度及步长
       */
      {
        let id = uuid();
        let info = document.createElement("div");
        //这里跟slider组件不太一样
        info.style.display = "inline-block";
        info.style.opacity = 0;
        info.id = id;
        info.innerHTML = containerUL.children[0].outerHTML;
        document.body.appendChild(info);
        itemwidth = info.getBoundingClientRect().width;
        itemHeight = info.getBoundingClientRect().height;
        document.body.removeChild(info);
      }

      if (props.direction === "left" || props.direction === "right") {
        scrollNum = itemwidth * itemNum; //移动的总个数
        //直接容器的宽度足够n*3个
        document.getElementById(containerId).style.width =
          itemwidth * (itemNum * 3) + "px";
        //设置滚动容器高度 保证只可见一个
        document.getElementById(containerParentId).style.height =
          itemHeight + "px";
        //设置容器偏移位，方便拖动
        document.getElementById(containerParentId).scrollLeft = itemwidth * 1;
      } else if (props.direction === "top" || props.direction === "bottom") {
        scrollNum = itemHeight * itemNum; //移动的总个数

        //直接容器的高度度足够n*3个
        document.getElementById(containerId).style.height =
          itemHeight * (itemNum * 3) + "px";
        //设置滚动容器宽度 保证只可见一个
        document.getElementById(containerParentId).style.width =
          itemwidth + "px";
        //设置容器偏移位，方便拖动
        document.getElementById(containerParentId).scrollTop = itemHeight * 1;
      }

      /***设置动画参数 */
      /***** 动画中的步数,每次移动一个steo像素 ******/
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollNum", scrollNum);

      /**动画总时长 */
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollSpeed", scrollNum * props.speed + "ms");
      /**逐帧动画名 */
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollAnimation", "scrollmove" + props.direction);
      if (props.delay) {
      }
      /**开始动画 */
      if (props.delay) {
        setTimeout(() => {
          document
            .getElementById(containerParentId)
            .style.setProperty("--scrollState", "running");
        }, props.delay);
      } else {
        document
          .getElementById(containerParentId)
          .style.setProperty("--scrollState", "running");
      }
      if (props.childThrob) {
        runPropType(); //执行其他属性的动画
      }
    }
  }, [props, containerId, containerParentId]);

  const runPropType = useCallback(() => {
    setInterval(() => {
      let diff = getchildrenDiff(containerParentId, containerId);
      for (let i = 0; i < diff.length; i++) {
        diff[i].dom.style.transform = "scale(" + diff[i].diffScale + ")";
        diff[i].dom.style.opacity = diff[i].diffScale;
      }
    }, props.speed);
  }, [props.speed, containerParentId, containerId]);

  useEffect(() => {
    move();
  }, [move]);
  return (
    <div
      id={containerParentId}
      className={"wasabi-scroll " + (props.className ?? "")}
      style={props.style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div
        className={
          "wasabi-scroll-ul " +
          (props.direction === "left" || props.direction === "right"
            ? "row"
            : "column")
        }
        id={containerId}
        onMouseDown={onMouseDown}
      >
        {React.Children.map(props.children, (child, index) => {
          if (child) {
            return <React.Fragment key={index}>{child}</React.Fragment>;
          } else {
            return null;
          }
        })}
        {React.Children.map(props.children, (child, index) => {
          if (child) {
            return (
              <React.Fragment key={"more" + index}>{child}</React.Fragment>
            );
          } else {
            return null;
          }
        })}
        {React.Children.map(props.children, (child, index) => {
          if (child) {
            return (
              <React.Fragment key={"moremore" + index}>{child}</React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

Scroll.defaultProps = {
  speed: 30, //
  direction: "left",
  childThrob: true,
};
Scroll.propTypes = {
  className: PropTypes.string, //样式
  style: PropTypes.object, //容器的样式
  speed: PropTypes.number.isRequired, //滚动速度，毫秒
  delay: PropTypes.number, //延迟时长
  direction: PropTypes.oneOf(["left", "right", "top", "bottom"]), //方向
  childThrob: PropTypes.bool, //子节点是否可以跳动
};

export default React.memo(Scroll);
