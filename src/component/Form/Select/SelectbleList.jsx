import React from "react";
import PropTypes from "prop-types";
import func from "../../libs/func/index.js";
import dom from "../../libs/dom"
class SelectbleList extends React.Component {
    constructor(props) {
        super(props);
       
    }
    onRemove(index, event) {
        event.stopPropagation();
        this.props.onRemove && this.props.onRemove(index);
    }
   
    render() {
        let control = null;
        if (this.props.data && this.props.data instanceof Array && this.props.data.length > 0) {
            control = (
                <ul ref='ul'>
                    {this.props.data.map((child, i) => {
                        let checked = false;
                        if (
                            (',' + (this.props.value??"").toString() + ',').indexOf(
                                ',' +( child.value??"").toString() + ','
                            ) > -1
                        ) {
                            checked = true;
                        }

                        return (
                            <li
                                key={'li' + i}
                                className={checked == true ? 'active' : ''}
                                onClick={this.props.onSelect.bind(
                                    this,
                                    child.value,
                                    child.text,
                                    child
                                )}
                            >
                                {
                                    this.props.removeAble ? <i style={{ fontSize: 14 }} className="icon-remove" onClick={this.onRemove.bind(this, i)}></i> : null
                                }
                                <span > {child.text}</span>

                            </li>
                        );

                    })}
                </ul>
            );
        }
        return <div id={this.props.pickerid} className={"dropcontainter  select"} style={{ display: this.props.show == true ? "block" : "none" }}   >
            {control}</div>
    }

}

SelectbleList.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//值
    show: PropTypes.bool,//是否显示
    removeAble: PropTypes.bool,//删除
    onSelect: PropTypes.func,//选择事件
    onRemove: PropTypes.func,//移除事件

}
SelectbleList.defaultProps = {
    value: "",
    data: [],
    removeAble: false,
}

export default SelectbleList;