class TreeNodeRow {
    constructor() {
        this.isParent = "";//是否是父节点
        this.id = "";//值
        this.text = "";//标题
        this.tip = "";//提示信息
        this.iconCls = "";//默认图标
        this.iconClose = "";//[父节点]关闭图标
        this.iconOpen = "";//[父节点]打开图标
        this.open = "";//是否处于打开状态
        this.checked = "";//是否被勾选
        this.checkAble = "";//是否允许勾选
        this.dragAble = "";//是否允许拖动，
        this.dropAble = "";//是否允许停靠
        this.href = "";//节点的链接
        this.hide = "";//是否隐藏
        this.children = "";//子节点
    }
}
export default TreeNodeRow;