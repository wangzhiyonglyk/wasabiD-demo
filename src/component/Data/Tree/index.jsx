/***
 * 2022-01-11
 * 将 tree组件独立出来
 * 2023-03-12 tree独立出来，直接从npm引用，不再在项目再开发
 */
import Tree from "wasabi-tree";
//样式独立，这样减少样式的文件,因为树里面节点的图标，文本等框架本身有
import "./tree.css";
export default Tree;
