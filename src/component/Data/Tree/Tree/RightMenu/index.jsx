/**
 * create by wangzhiyonglyk
 * date:2021-07-03
 * desc:右键菜单
 */
import React from "react";
import ContentMenuPanel from "../../ContentMenu/ContentMenuPanel";
import ContentMenu from "../../ContentMenu";
import LinkButton from "../../LinkButton";
class RightMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
    this.state = {
      addAble: false,
      renameAble: false,
      removeAble: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  /**
   * 
   * @param 
   * {{
      addAble: false,
      renameAble: false,
      removeAble: false,
    }} power 
   * @param {*} event 
   */
  open(power, event) {
    if (event) {
      this.setState(power);
      this.menu.current.open(event);
    }
  }

  onClick(name, event) {
    this.props.onClick && this.props.onClick(name, event);
  }
  render() {
    return (
      <ContentMenu
        ref={this.menu}
        style={this.props.style}
        onClick={this.onClick}
      >
        {this.state.addAble ? (
          <ContentMenuPanel key="1" name="add">
            <LinkButton
              theme="info"
              iconCls="icon-merge-cell"
              title="添加同级分类"
            >
              添加同级分类
            </LinkButton>
          </ContentMenuPanel>
        ) : null}

        {this.state.addAble ? (
          <ContentMenuPanel key="2" name="add-sub">
            <LinkButton theme="info" iconCls="icon-add" title="添加子类">
              添加子类
            </LinkButton>
          </ContentMenuPanel>
        ) : null}

        {this.state.renameAble ? (
          <ContentMenuPanel key="3" name="rename">
            <LinkButton theme="info" iconCls="icon-edit" title="重命名">
              重命名
            </LinkButton>
          </ContentMenuPanel>
        ) : null}

        {this.state.removeAble ? (
          <ContentMenuPanel key="4" name="remove">
            <LinkButton theme="info" iconCls="icon-delete" title="删除">
              删除
            </LinkButton>
          </ContentMenuPanel>
        ) : null}
      </ContentMenu>
    );
  }
}
export default RightMenu;
