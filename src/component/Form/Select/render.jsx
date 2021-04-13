/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * edit 2021-03-11 修复bug
 * edit 2021-04-12 完善交互性
 * 下拉框
 */
import React, { Component } from 'react';
import Label from '../../Info/Label.jsx';
import '../../Sass/Form/Select.css';
class Select extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props;
        {
            let componentClassName = "wasabi-form-group " + (props.className || "") + " ";//组件的基本样式 
            let placeholder = "可搜索";
            if ((props.addAbled || props.addAble)) {
                placeholder += ",回车添加"
            }
            let inputProps = {
                readOnly: props.readOnly == true ? 'readOnly' : null,
                name: props.name,
                placeholder:
                    props.placeholder
                        ? props.placeholder : placeholder,
                className:
                    'wasabi-form-control  ',
                title: props.title
            }; //文本框的属性
            let control = null;

            if (props.data && props.data.length > 0) {
                control = (
                    <ul ref='ul'>
                        {props.data.map((child, i) => {
                            let reg = new RegExp(props.filterValue, 'i');//左匹配
                            if (props.filterValue && child.text.search(reg) == -1) {
                                return null;
                            } else {

                                let checked = false;
                                if (
                                    props.value &&
                                    child.value &&
                                    (',' + props.value.toString() + ',').indexOf(
                                        ',' + child.value + ','
                                    ) > -1
                                ) {
                                    checked = true;
                                } else if (props.value == '' && child.value == '') {
                                    //防止有空值的情况
                                    checked = true;
                                }

                                return (
                                    <li
                                        key={'li' + i}
                                        className={checked == true ? 'active' : ''}
                                        onClick={props.onSelect.bind(
                                            this,
                                            child.value,
                                            child.text,
                                            child
                                        )}
                                    >
                                        {child.text}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                );
            }
            let style = props.style
                ? JSON.parse(JSON.stringify(props.style))
                : {};
            if (props.hide) {
                style.display = 'none';
            } else {
                style.display = 'flex';
            }

            return (
                <div
                    className={componentClassName + " " + props.validateClass}
                    ref="select"
                    style={style}
                >
                    <Label ref="label" readOnly={props.readOnly || props.disabled} style={props.labelStyle} help={props.help} required={props.required}>{props.label}</Label>
                    <div className={'wasabi-form-group-body' + (props.readOnly || props.disabled ? " readOnly" : "")}>
                        <div className={'combobox wasabi-select'}>
                            <i
                                className={'combobox-clear icon-clear'}
                                onClick={props.clearHandler}
                                style={{
                                    display: props.readOnly
                                        ? 'none'
                                        : props.value == '' || !props.value
                                            ? 'none'
                                            : 'inline'
                                }}
                            ></i>
                            <i
                                className={'comboxbox-icon  icon-drop-down ' + (props.show ? ' rotate' : '')}
                                onClick={props.showPicker}
                            ></i>
                            <input
                                type='text'
                                {...inputProps}
                                value={
                                    props.inputText || ""
                                }
                                onBlur={props.onBlur}
                                onClick={props.showPicker}
                                onKeyUp={props.keyUpHandler}
                                onChange={props.onChange}
                                autoComplete="off"
                            />
                            <div className={"dropcontainter  select"} style={{ display: props.show == true ? "block" : "none" }}   >
                                {control}</div>
                        </div>
                        <small
                            className={'wasabi-help-block '}
                            style={{
                                display:
                                    props.inValidateText && props.inValidateText != ''
                                        ? props.inValidateShow
                                        : 'none'
                            }}
                        >
                            <div className='text' >{props.inValidateText}</div>
                        </small>
                    </div>
                </div>
            );
        }
    }
}

export default Select;

