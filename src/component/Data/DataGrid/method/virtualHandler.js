/**
 * create by wangzhiyong 
 * date:2021-12-05
 * desc：增加处理虚拟列表的功能
 */
import func from "../../../libs/func";
import config from "../config"
export default {
    /**
     * 初始化虚拟列表参数
     */
    initVirtual() {
        let topReduce = document.getElementById(this.state.fixTableId)?.getBoundingClientRect().height;//表头高度
        let visibleHeight = Math.ceil(document.getElementById(this.state.containerid).clientHeight) - topReduce;//表体可见高度
        let visibleCount = Math.ceil(visibleHeight / config.rowDefaultHeight);
         this.container = document.getElementById(this.state.realTableCotainerId);
        this.table= document.getElementById(this.state.realTableId);
        //全部重置
        this.container .style.height = visibleHeight + "px";
        this.container .scrollTop = 0;
        this.table.style.top = "0px";

        //设置初始化配置信息
        this.virtualConfig = {
            direction: "below",//当前滚动方向
            total: this.state.data.length,//总记录数,
            totalHeight: this.state.data.length * config.rowDefaultHeight,//数据总高度
            topReduce: topReduce,//容器要减去的高度,即表头的高度
            visibleHeight: visibleHeight,//可见区域高度
            visibleCount: visibleCount,//可见数
            startIndex: 0,//数据的开始下标
            endIndex: visibleCount,//数据的结束下标
            //初始化列表位置，为了调整高度，及分隔线位置
            positions: this.state?.data.map((item, index) => {
                return {
                    index: index,
                    height: config.rowDefaultHeight,//当前行的高度，后期会动态调整,
                    top: index * config.rowDefaultHeight,
                    bottom: (index + 1) * config.rowDefaultHeight
                }
            })
        }
        this.sliceData();//默认加载第一次数据
    
    },
    /**
     * 设置观察器
     */
    observeSet() {
        try {
            //解除观察
            this.io && this.io.unobserve(this.aboveS);
            this.io && this.io.unobserve(this.belowS);
           if(this.aboveS){
            this.aboveS.removeAttribute("above");
            this.abovePreIndex=this.aboveS.getAttribute("data-rowindex")*1;
           }
           if(this.belowS){
            this.belowS.removeAttribute("below");
            this.belowPreIndex=this.belowS.getAttribute("data-rowindex")*1;
           }
           
            
            //找到观察点

            let tr = document.getElementById(this.state.realTableId).children[1].children || [];
            let aboveIndex;
            if (this.virtualConfig.startIndex <= 0) {
                aboveIndex = 0;
            }
            else {
                aboveIndex = Math.floor((config.bufferScale* this.virtualConfig.visibleCount) / 2);
            }

            let belowIndex = Math.floor(tr.length - (config.bufferScale* this.virtualConfig.visibleCount) / 2);
            if (aboveIndex >= 0 && aboveIndex < tr.length) {
                this.aboveS = tr[aboveIndex];
                this.aboveS.setAttribute("above", "above");
            }
            if (belowIndex >= 0 && belowIndex < tr.length) {
                this.belowS = tr[belowIndex];
                this.belowS.setAttribute("below", "below");
            }
            if (!this.io) {
                this.io = new IntersectionObserver((entries) => {
                    // 标志位元素进入视口
                    let entry = entries[1] ?? entries[0];//如果两个同时进入取最后一个来判断
                  
                    if (entry && entry.isIntersecting) {
                        if (entry.target.getAttribute("above") === 'above') {
                            this.aboveLoad();
                        }
                        else  if (entry.target.getAttribute("below") === 'below') { 
                            this.belowLoad()
                        }
                    }

                });

            }
            this.io.observe(this.aboveS);
            this.io.observe(this.belowS);

        }
        catch (e) {

        }

    },

    /**
  * 向上加载数据
  */
    aboveLoad() {

        this.virtualConfig.startIndex = (this.virtualConfig.startIndex ?? 0) - this.virtualConfig.visibleCount;
        if (this.virtualConfig.startIndex >= 0) {
            this.virtualConfig.endIndex = this.virtualConfig.startIndex + this.virtualConfig.visibleCount;
            this.virtualConfig.direction = "above";
            console.log("aboveLoad")
            this.sliceData();

        }
    },
    /**
     * 向下加载数据
     */
    belowLoad() {
        this.virtualConfig.endIndex = (this.virtualConfig.endIndex ?? 0) + this.virtualConfig.visibleCount;
        if (this.virtualConfig.endIndex < this.state.data.length) {
            this.virtualConfig.startIndex = this.virtualConfig.endIndex - this.virtualConfig.visibleCount;
            this.virtualConfig.direction = "below";
            console.log("belowLoad")
            this.sliceData();

        }

    },
 
    /**
   * 监听滚动事件,防止白屏现象
   * @param {*} event 
   */
    onVirtualScroll(event) {
      
      if (this.container.scrollTop > (this.table.offsetTop+this.table.clientHeight)||(this.container.scrollTop<this.table.offsetTop)) {
            //表明滚动过快，出现白屏现象了
            try {
                if (this.container.scrollTop > (this.table.offsetTop+ this.belowS.offsetTop)) {
                        //下面出现了白屏
                        //要先解除监听
                        console.log("下面白屏")
                        this.io && this.io.unobserve(this.aboveS);
                        this.io && this.io.unobserve(this.belowS);
                    for (let i = this.virtualConfig.total-1; i>=this.virtualConfig.startIndex; i--) {               
                        if (this.virtualConfig.positions[i].bottom <= (this.container.scrollTop + this.virtualConfig.visibleHeight)) {
                            this.virtualConfig.endIndex = i;
                            this.virtualConfig.startIndex = this.virtualConfig.endIndex - this.virtualConfig.visibleCount;
                            this.virtualConfig.direction = "below";
                            this.table.style.top=this.container.scrollTop+"px";//将表格与滚动条对齐
                            this.sliceData();
                         
                            break;
                        }
                        else {
                            continue;
                        }

                    }

                } else {
                    console.log("上面白屏")
                      //上面出现了白屏
                      this.io && this.io.unobserve(this.aboveS);
                      this.io && this.io.unobserve(this.belowS);
                    for (let i = 0; i <this.virtualConfig.positions.length; i++) {
                        if (this.virtualConfig.positions[i].bottom >= (this.container.scrollTop + this.virtualConfig.visibleHeight)) {
                            this.virtualConfig.endIndex = i;
                            this.virtualConfig.startIndex = this.virtualConfig.endIndex - this.virtualConfig.visibleCount;
                            this.virtualConfig.direction = "above";
                           this.table.style.top=this.container.scrollTop+"px";//将表格与滚动条对齐
                           this.sliceData();
                          
                            break;
                        }
                        else {
                            continue;
                        }

                    }
                }

            }
            catch (e) {
                console.log("error", e)
            }
        }

    },

    /**
     * 设置渲染的数据范围
     * @returns 
     */
    sliceData() {
        //
        let dataStart = this.virtualConfig.startIndex - (config.bufferScale * this.virtualConfig.visibleCount);
        let dataEnd = this.virtualConfig.endIndex + (config.bufferScale * this.virtualConfig.visibleCount);
        let visibleData = [];
        for (let i = dataStart; i < dataEnd; i++) {
            if (i >= 0 && i < this.state.data.length) {
                visibleData.push({
                    ...this.state.data[i],
                    _orderIndex: i//设置下标
                })
            }
        }

        this.adjust = true;//调整位置数据与列写宽度,因为后期不需要重新setState
        this.setState({
            visibleData: visibleData,//渲染的数据范围
            reInitVirtualConfig: false,//初始化设置为no

        },()=>{
           
        }
        )

    },

    /***********************以下用于调整虚拟列表相关项与表格宽度*****************/
    /**
     * 调整虚拟列表
     */
    adjustvirtual() {
        //设置总高度
        try {
           this.observeSet();//重新设置观察区
            if (this.virtualConfig.direction === "above") {
                this.aboveScrollAjustTableTop();//调整表格
            }
            else {
                this.belowScrollAjustTableTop();//调整表格
            }
          
        }
        catch (e) {

        }
        finally {
            this.adjustItemHeight();//调整行高
            this.adjustColumnWidth();//调整宽度
        }


    },
    /***
    * 向上滚动时调整表格的位置
    */
    aboveScrollAjustTableTop() {
        let dataStart = this.virtualConfig.startIndex - (config.bufferScale * this.virtualConfig.visibleCount);
        if (dataStart >0) {
            let diff=this.aboveS.offsetTop- document.getElementById(this.state.realTableId).querySelector(`[data-rowindex='${this.abovePreIndex}']`).offsetTop;
            let top=parseInt( document.getElementById(this.state.realTableId).style.top );
            //向上滚动一个diff
            document.getElementById(this.state.realTableId).style.top=(top+diff)+"px"
        }
        else{
            document.getElementById(this.state.realTableId).style.top="0px"
        }
        
    },
    /***
     * 向下滚动时调整表格的位置
     */
    belowScrollAjustTableTop() {
        let dataStart = this.virtualConfig.startIndex - (config.bufferScale * this.virtualConfig.visibleCount);
        if (dataStart >0) {
            //说明上面有预留数据，表格的位置要回滚一下
          let diff=this.belowS.offsetTop- document.getElementById(this.state.realTableId).querySelector(`[data-rowindex='${this.belowPreIndex}']`).offsetTop;
          let top=parseInt( document.getElementById(this.state.realTableId).style.top );
          //向下滚动一个diff
          document.getElementById(this.state.realTableId).style.top=(top+diff)+"px"
       
        }
    },
  
    /**
     * 渲染后调整行高
     */
    adjustItemHeight() {
        try {
            let tr = document.getElementById(this.state.realTableId).children[1].children;
            if (tr && tr.length > 0) {
                for (let i = 0; i < tr.length; i++) {
                    let rowIndex = tr[i].getAttribute("data-rowindex") * 1;
                    let newHeight = tr[i].getBoundingClientRect().height;
                    let oldHeight = this.virtualConfig.positions[rowIndex].height;
                    let diffHeight = newHeight - oldHeight;
                    if (diffHeight !== 0) {
                        //有差异，调整
                        this.virtualConfig.positions[rowIndex].height = newHeight;
                        this.virtualConfig.positions[rowIndex].bottom += (diffHeight);
                        for (let k = rowIndex + 1; k < this.virtualConfig.positions.length; k++) {
                            this.virtualConfig.positions[k].top = this.virtualConfig.positions[k - 1].bottom;
                            this.virtualConfig.positions[k].bottom += (diffHeight);
                        }
                    }

                }
            }
            let heightDiv = document.getElementById(this.state.realTableCotainerId).querySelector(".wasabi-virtual-height");
            heightDiv.style.height = this.virtualConfig.positions[this.virtualConfig.positions.length - 1].bottom + "px";
            
        }
        catch (e) {

        }

    },


    /**
   * 调整每一列的宽度,
   * 1.方便后期拖动与固定列的效果
   * 2.实现表格紧凑
   */
    adjustColumnWidth() {
        try {
            document.getElementById(this.state.realTableCotainerId).style.top = this.virtualConfig.topReduce + "px";//设置真实表格容器位置
            let columnIndex = 0;//列下标
            if (this.props.detailAble) { columnIndex++; }
            if (this.props.rowNumber) { columnIndex++; }
            if (this.props.selectAble) { columnIndex++; }
            if (document.getElementById(this.state.realTableId) && document.getElementById(this.state.realTableId).children.length === 2 && document.getElementById(this.state.realTableId).children[1].children.length) {//有数据才调整宽度
                this.oldHeaderWidth = this.headerWidth ?? {};//各列的宽度数据
                this.headerWidth = {};
                for (let i = columnIndex; i < document.getElementById(this.state.realTableId).children[1].children[0].children.length; i++) {
                    let name = document.getElementById(this.state.realTableId).children[1].children[0].children[i].getAttribute("name")
                    let width = Math.ceil(document.getElementById(this.state.realTableId).children[1].children[0].children[i].getBoundingClientRect().width);
                    let headerWidth = Math.ceil(document.getElementById(this.state.fixTableId).querySelector(`th[name='${name}']`)?.getBoundingClientRect().width) || 0;
                    this.headerWidth[name] = Math.max(headerWidth, width);

                }
            }
        } catch (e) {
            console.log("adjustColumnWidth", e)
        }
        finally {
            this.adjust = false;//调整完成，防止下次调整
            if (func.diff(this.oldHeaderWidth, this.headerWidth)) {//如果列的宽度有变化才重新渲染
                this.setState({})
            }
        }
    }
}