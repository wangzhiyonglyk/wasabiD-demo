/**
 * create by wangzhiyonglyk
 * desc 普通轮播组件
 * date:2020-07-15
 * todo 还有bug
 * 2021-05-12 有bug
 * 2022-07-25 用纯动画的形式完成滑动组件
 *
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import func from "../../libs/func";
import dom from "../../libs/dom";
import "./index.css";

const uuid = func.uuid;

const Slider = React.forwardRef(function (props, ref) {
  const [containerParentId] = useState(uuid());
  const [containerId] = useState(uuid());
  const [containerdot] = useState(uuid());
  const scrollItemStep = useRef(props.childStep); //每次移动的像素,即步长
  const chidlrenObj = useRef(null);
  const childrenIndex = useRef(0); //记录子节点元素
  const dotObj = useRef(null); //记录点元素
  const timer = useRef(null); //定时器

  /**
   * 滑动事件
   */
  const move = useCallback(() => {
    let containerUL = document.getElementById(containerId); //里面容器
    chidlrenObj.current = containerUL.children; //子元素
    dotObj.current = document.getElementById(containerdot).children; //点元素
    let scrollNum = React.Children.count(props.children); //滚动的个数

    let itemwidth = 0; //子元素的宽度
    let itemHeight = 0; //子元素的高度
    if (scrollNum > 1) {
      //子节点个数超过1
      /**
       * 通过将子元素单独放置在一个容器中得到子元素真实的宽度与高度的，以为此来设置容器的宽度，高度及步长
       */
      {
        let id = uuid();
        let info = document.createElement("div");
        info.className = containerUL.className;
        info.style = containerUL.style;
        info.style.opacity = 0;
        info.id = id;
        info.innerHTML = containerUL.children[0].outerHTML;
        document.body.appendChild(info);
        itemwidth = info.getBoundingClientRect().width;
        itemHeight = info.getBoundingClientRect().height;
        document.body.removeChild(info);
      }
      if (props.direction === "left" || props.direction === "right") {
        scrollItemStep.current = itemwidth; //以子元素的宽度作为值
        //直接容器的宽度足够n+1个
        document.getElementById(containerId).style.width =
          itemwidth * (scrollNum + 1) + "px";
      } else if (props.direction === "top" || props.direction === "bottom") {
        scrollItemStep.current = itemHeight; //以子元素的宽度作为值
        //直接容器的高度度足够n+1个
        document.getElementById(containerId).style.height =
          itemHeight * (scrollNum + 1) + "px";
      }
      //设置滚动容器高度与高度 保证只可见一个
      document.getElementById(containerParentId).style.width = itemwidth + "px";
      document.getElementById(containerParentId).style.height =
        itemHeight + "px";

      if (props.childStep > 0) {
        //如果设置了固定值，使用固定的值
        scrollItemStep.current = props.childStep;
      }
      /***设置动画参数 */
      /***** 动画中的步数 ******/
      document
        .getElementById(containerParentId)
        .style.setProperty("--scrollNum", scrollNum);
      /***每次动画移动像素  */
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
        .style.setProperty("--scrollAnimation", "slidermove" + props.direction);
      /**补间动画名 */
      document
        .getElementById(containerParentId)
        .style.setProperty(
          "--scrollItemAnimation",
          "slideritemmove" + props.direction
        );
      /**开始动画 */
      if (props.auto) {
        //自动播放
        if (props.delay) {
          setTimeout(() => {
            document
              .getElementById(containerParentId)
              .style.setProperty("--scrollState", "running");
            dotChosed();
          }, props.delay);
        } else {
          document
            .getElementById(containerParentId)
            .style.setProperty("--scrollState", "running");
          dotChosed();
        }
      }

      dotObj.current[0].className = "wasabi-slider-dot chosed";
    }
  }, [
    props.interval,
    props.childStep,
    props.direction,
    props.children,
    props.auto,
    props.delay,
    containerId,
    containerParentId,
  ]);
  /**
   * 鼠标停靠
   */
  const onMouseOver = useCallback(() => {
    document
      .getElementById(containerParentId)
      .style.setProperty("--scrollState", "paused");
    clearInterval(timer.current);
  }, [containerParentId]);
  /**
   * 鼠标移开
   */
  const onMouseOut = useCallback(() => {
    document
      .getElementById(containerParentId)
      .style.setProperty("--scrollState", "running");
    dotChosed();
  }, [containerParentId]);
  /**
   * 点点选中事件
   */
  const dotChosed = useCallback(() => {
    timer.current = setInterval(
      () => {
        childrenIndex.current++;
        if (childrenIndex.current === React.Children.count(props.children)) {
          childrenIndex.current = 0;
        }
        for (let i = 0; i < dotObj.current.length; i++) {
          dotObj.current[i].className = "wasabi-slider-dot";
        }
        for (let i = 0; i < chidlrenObj.current.length; i++) {
          if (
            dom.overView(chidlrenObj.current[i]) &&
            i < dotObj.current.length
          ) {
            dotObj.current[
              i + 1 >= dotObj.current.length ? 0 : i + 1
            ].className = "wasabi-slider-dot chosed";
            break;
          }
        }
      },
      //提前300毫秒
      props.interval > 1000 ? 300 : props.interval - 300
    );
  }, [childrenIndex]);
  /**
   * 执行动画
   */
  useEffect(() => {
    move();
  }, [move]);
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  });

  // 对外接口
  useImperativeHandle(ref, () => ({
    start: () => {
      onMouseOut();
    },
    /***
     * 停止
     */
    stop: () => {
      onMouseOver();
    },
  }));

  return (
    <div
      id={containerParentId}
      className={"wasabi-slider "}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div
        className={
          "wasabi-slider-ul " +
          (props.className ?? "") +
          (props.direction === "left" || props.direction === "right"
            ? "row"
            : "column")
        }
        style={props.style}
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
      <div className={"wasabi-slider-dot-div "} id={containerdot}>
        {React.Children.map(props.children, (child, index) => {
          return <div className={"wasabi-slider-dot"}></div>;
        })}
      </div>
    </div>
  );
});

Slider.defaultProps = {
  interval: 4000,
  direction: "left",
  delay: 2000,
  auto: true,
};
Slider.propTypes = {
  className: PropTypes.string, //样式
  style: PropTypes.object, //
  auto: PropTypes.bool, //是否自播放
  childStep: PropTypes.number, //子节点移动的像素步长
  interval: PropTypes.number.isRequired, //轮播间隔时间
  delay: PropTypes.number, //延迟时长
  direction: PropTypes.oneOf(["left", "right", "top", "bottom"]), //
};

export default React.memo(Slider);
