/**
 * create by wangzhiyonglyk
 * date:2021-12-05
 * desc：增加处理虚拟列表的功能
 */
import func from "../../../libs/func";
import config from "../config";
export default {
  /**
   * 初始化虚拟列表参数
   */
  initVirtual() {
    if (this.state.needVirtualHandler && this.state.data?.length > 0) {
      this.container = document.getElementById(this.state.containerid);
      this.container.scrollTop = 0; //重置
      // 记住真实的表格dom
      let topReduce = document
        .getElementById(this.state.tableHeaderId)
        ?.getBoundingClientRect().height; //表头高度
      //设置表体容器的高,保证出现滚动条，容器本身是不能设置overflow-y，从而保存与tree结合的时候，本身没有滚动条
      let visibleHeight =
        Math.ceil(
          document.getElementById(this.state.containerid).clientHeight
        ) - topReduce; //表体可见高度
      let visibleCount = Math.ceil(visibleHeight / config.rowDefaultHeight);

      //设置初始化配置信息
      this.virtualConfig = {
        topReduce: topReduce, //需要减去的高度
        aboveCount: 0, //上面预留数，用于计算滚动位置，一开始是0
        visibleCount: visibleCount, //可见数
        //初始化列表位置，为了调整高度，及分隔线位置
        positions: this.state.data?.map((item, index) => {
          return {
            index: index,
            height: config.rowDefaultHeight, //当前行的高度，后期会动态调整,
            top: index * config.rowDefaultHeight,
            bottom: (index + 1) * config.rowDefaultHeight,
          };
        }),
      };
      //可见数据
      this.scrollShowVisibleData(0, this.virtualConfig.visibleCount);
    } else {
      this.virtualConfig = null;
    }
  },
  /**
   * 监听滚动事件
   * @param {*} event
   */
  onVirtualScroll(event) {
    try {
      if (this.state.needVirtualHandler !== null) {
        let scrollTop = this.container.scrollTop;

        let startIndex = this.binarySearch(
          this.virtualConfig.positions,
          scrollTop
        );

        let endIndex =
          startIndex + config.bufferScale * this.virtualConfig.visibleCount;
        this.scrollShowVisibleData(startIndex, endIndex);
      }
    } catch (e) {
      console.log("virtual error", e);
    }
  },
  /***
   * 二分法查找
   */
  binarySearch(list, value) {
    let start = 0;
    let end = list.length - 1;
    let tempIndex = null;
    while (start <= end) {
      let midIndex = parseInt((start + end) / 2);
      let midValue = list[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else if (midValue > value) {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end = end - 1;
      }
    }
    return tempIndex;
  },
  /**
   * 渲染当前可见数据
   * @param {*} startIndex 可见区数据的开始下标
   * @param {*} endIndex 可见区数据的结束下标
   */
  scrollShowVisibleData(startIndex, endIndex) {
    try {
      if (this.virtualConfig.startIndex !== startIndex) {
        const realTable = document.getElementById(this.state.realTableId);
        //如果下标与上次不同，才渲染，记住，减少滚动渲染次数
        this.virtualConfig.startIndex = startIndex;
        let startOffset; // 滚动的位置
        if (startIndex >= 1) {
          //减去上部预留的高度
          let size =
            this.virtualConfig.positions[startIndex].top -
            (this.virtualConfig.positions[
              startIndex - this.virtualConfig.aboveCount
            ]
              ? this.virtualConfig.positions[
                  startIndex - this.virtualConfig.aboveCount
                ].top
              : 0);
          startOffset = this.virtualConfig.positions[startIndex].top - size;
        } else {
          startOffset = 0;
        }

        realTable.style.transform = `translate3d(0,${
          this.virtualConfig.topReduce + startOffset
        }px,0)`;

        //当前切割的数据开始下标，要从开始值向前切割一个比例页的数据
        let sliceBeginIndex =
          startIndex - config.bufferScale * this.virtualConfig.visibleCount;

        if (sliceBeginIndex > 0) {
          //如果大于0，说明已经翻页了
          this.virtualConfig.aboveCount =
            config.bufferScale * this.virtualConfig.visibleCount;
        }
        sliceBeginIndex = sliceBeginIndex < 0 ? 0 : sliceBeginIndex;
        // //当前切割的数据结束下标

        let sliceEndIndex =
          endIndex + config.bufferScale * this.virtualConfig.visibleCount;
        //这是可见数据
        let visibleData = this.state.data.slice(sliceBeginIndex, sliceEndIndex);
        visibleData = visibleData.map((item, index) => {
          item._orderRowIndex = startIndex + index; //注意了这里是虚拟列表的行号
          return item;
        });

        this.setState(
          {
            needVirtualHandler: false, //虚拟列表配置完成
            visibleData: visibleData,
          },
          () => {}
        );
      }
    } catch (e) {
      console.log("scrollShowVisibleData error", e);
    }
  },
  /***********************以下用于调整虚拟列表相关项与表格宽度*****************/
  /**
   * 滚动渲染后要调整虚拟列表
   */
  adjustvirtual() {
    //设置总高度;
    try {
      if (this.state.needVirtualHandler === false) {
        //虚拟列表调整完成
        this.adjustItemHeight(); //调整行高
        this.adjustColumnWidth(); //调整宽度
      } else if (this.state.needVirtualHandler !== true) {
        // 没有 虚拟列表
        this.adjustColumnWidth(); //调整宽度
      }
    } catch (e) {
    } finally {
    }
  },

  /**
   * 渲染后调整行高
   */
  adjustItemHeight() {
    try {
      if (this.virtualConfig && this.virtualConfig.positions) {
        const realTable = document.getElementById(this.state.realTableId);
        let tr = realTable?.children[1]?.children; //取出当前行
        let isAdjustItemHeight = false; //是否调整过
        if (tr && tr.length > 0) {
          for (let i = 0; i < tr.length; i++) {
            let rowIndex = tr[i].getAttribute("data-rowindex") * 1;
            let newHeight = tr[i].getBoundingClientRect().height;
            let oldHeight = this.virtualConfig.positions[rowIndex].height;
            let diffHeight = newHeight - oldHeight;
            if (diffHeight !== 0) {
              isAdjustItemHeight = true;
              //有差异，调整
              this.virtualConfig.positions[rowIndex].height = newHeight;
              this.virtualConfig.positions[rowIndex].bottom += diffHeight;
              for (
                let k = rowIndex + 1;
                k < this.virtualConfig.positions.length;
                k++
              ) {
                this.virtualConfig.positions[k].top =
                  this.virtualConfig.positions[k - 1].bottom;
                this.virtualConfig.positions[k].bottom += diffHeight;
              }
            }
          }
        }
        if (isAdjustItemHeight) {
          //调整行高
          let heightDiv = document
            .getElementById(this.state.containerid)
            .querySelector(".wasabi-virtual-height");
          if (heightDiv) {
            heightDiv.style.height =
              this.virtualConfig.positions[
                this.virtualConfig.positions.length - 1
              ].bottom + "px";
          }
        }
      }
    } catch (e) {}
  },

  /**
   * 调整每一列的宽度,
   * 1.方便后期拖动与固定列的效果
   * 2.实现表格紧凑
   */
  adjustColumnWidth() {
    const realTable = document.getElementById(this.state.realTableId);
    const tableHeader = document.getElementById(this.state.tableHeaderId);
    let tableWidth = 0;
    if (tableHeader && realTable) {
      try {
        if (
          !this.virtualConfig &&
          !document.getElementById(this.state.realTableId).style.transform
        ) {
          //没有虚拟列表的时候，并且没有设置时,也要设置一下表体的上部的位置,因为表头的高度是计算出来的
          let topReduce = tableHeader?.getBoundingClientRect().height; //表头高度
          realTable.style.transform = `translate3d(0,${topReduce}px,0)`;
        }
        // 调整默认宽度
        if (this.state?.headers?.length < (this.props?.compactCol || 10)) {
          // 如果小于紧凑列的数量，则设置为100% 用于自适应
          realTable.style.width = "calc(100% - 5px)";
          tableHeader.style.width = "calc(100% - 5px)";
        }

        // 下面是调整宽度
        let columnIndex = 0; //列下标
        // 详情列
        if (this.props.detailAble) {
          columnIndex++;
          tableWidth += config.detailWidth;
        }
        // 序号列
        if (this.props.rowNumber) {
          columnIndex++;
          tableWidth += config.rowNumberWidth;
        }
        // 选择列
        if (this.props.selectAble) {
          columnIndex++;
          tableWidth += config.selectWidth;
        }
        if (this.state?.visibleData?.length > 0) {
          //有数据才调整宽度
          this.oldHeaderWidth = null; //各列的宽度数据
          this.headerWidth = [];
          let firsttr = realTable.children[1].children[0]; // 第一行
          for (let i = columnIndex; i < firsttr.children.length; i++) {
            let td = firsttr.children[i];
            // 是否为固定列
            let sticky =
              td?.style?.position === "sticky"
                ? td.style.left
                  ? "left"
                  : "right"
                : null;

            //表体第一行单元格宽度
            let width = Math.ceil(td.getBoundingClientRect().width);
            //拿到表头对应列的单元格宽度
            let headerWidth = Math.ceil(
              tableHeader.children[0].children[i].getBoundingClientRect().width
            );
            tableWidth += Math.max(headerWidth, width);
            //取最大的
            this.headerWidth.push({
              columnIndex: i,
              sticky,
              width: Math.max(headerWidth, width),
            });
          }
        }
      } catch (e) {
        console.log("adjustColumnWidth", e);
      } finally {
        if (func.diff(this.oldHeaderWidth, this.headerWidth)) {
          realTable.style.width = tableWidth + "px";
          tableHeader.style.width = tableWidth + "px";
          let stickyLeft = 0;
          let stickyRight = 0;
          if (this.props.detailAble) {
            stickyLeft += config.detailWidth;
          }
          if (this.props.rowNumber) {
            stickyLeft += config.rowNumberWidth;
          }
          if (this.props.selectAble) {
            stickyLeft += config.selectWidth;
          }

          //如果列的宽度有变化才重新渲染
          try {
            let headertrs = tableHeader.children[1].children; // 表头的行，可能有多行
            let headersths = []; // 表头占据有效列的列，用于设置固定列，todo这里可能有问题，跨几列的列，处理进来有点麻烦，后期再说
            for (let i = 0; i < headertrs.length; i++) {
              let ths = headertrs[i].children;
              for (let j = 0; j < ths.length; j++) {
                if (ths[j].getAttribute("colSpan") === "1") {
                  headersths.push(ths[j]);
                }
              }
            }
            //  设置列宽度，及左侧固定列的问题
            for (let i = 0; i < this.headerWidth.length; i++) {
              const { columnIndex, sticky, width } = this.headerWidth[i];
              // 设置头部宽度
              let col = tableHeader?.children[0].children[columnIndex];
              col && col.setAttribute("width", width);
              // 设置表格宽度
              col = realTable?.children[0].children[columnIndex];
              col && col.setAttribute("width", width);

              // 设置左固定列，这里不中断for，因为每一列都设置宽度
              if (sticky === "left") {
                // 固定表头
                headersths[columnIndex].style.left = stickyLeft + "px";

                //表头
                let theadtrs = realTable.children[1].children;
                for (let i = 0; i < theadtrs.length; i++) {
                  theadtrs[i].children[columnIndex].style.left =
                    stickyLeft + "px";
                }
                // 表体
                let tbodytrs = realTable.children[2].children;

                for (let i = 0; i < tbodytrs.length; i++) {
                  tbodytrs[i].children[columnIndex].style.left =
                    stickyLeft + "px";
                }
                // 表尾
                if (realTable.children.length === 4) {
                  let footerFirst =
                    realTable.children[2].children[0].children[0];
                  let colSpan = footerFirst.getAttribute("colSpan") * 1;
                  let footertds = realTable.children[2].children[0].children;
                  footertds[columnIndex - colSpan + 1].style.left =
                    stickyLeft + "px";
                }

                stickyLeft += width;
              }
            }

            //   设置右固定列 固定列是连续的，如果没有了就马上中断for
            for (let i = this.headerWidth.length - 1; i >= 0; i--) {
              const { columnIndex, sticky, width } = this.headerWidth[i];
              if (sticky === "right") {
                // 固定表头
                headersths[columnIndex].style.right = stickyRight + "px";
                // 表头
                let theadtrs = realTable.children[1].children;
                for (let i = 0; i < theadtrs.length; i++) {
                  theadtrs[i].children[columnIndex].style.right =
                    stickyRight + "px";
                }
                // 表体
                let tbodytrs = realTable.children[2].children;
                for (let i = 0; i < tbodytrs.length; i++) {
                  tbodytrs[i].children[columnIndex].style.right =
                    stickyRight + "px";
                }

                // 表尾
                if (realTable.children.length === 4) {
                  let footerFirst =
                    realTable.children[2].children[0].children[0];
                  let colSpan = footerFirst.getAttribute("colSpan") * 1;
                  let footertds = realTable.children[2].children[0].children;
                  footertds[columnIndex - colSpan + 1].style.right =
                    stickyRight + "px";
                }
                stickyRight += width;
              } else {
                break; // 固定列是连续的，如果没有了就马上中断for
              }
            }
          } catch (e) {}

          this.oldHeaderWidth = this.headerWidth;
        }
      }
    }
  },
};
