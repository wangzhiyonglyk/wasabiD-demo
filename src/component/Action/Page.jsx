/*
 create by wangzhiyong
 date:2017-02-10
 desc:页面基类
 */
import React from 'react';
import PropTypes from 'prop-types';
require('../Sass/Action/Page.css');
class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {  
    style: PropTypes.object,
    className: PropTypes.string
  };

  render() {
    return (
      <div className='wasabi-page'>
        {React.Children.map(this.props.children, child => {
          if(child){
            return React.cloneElement(child);
          }
          return  null;
     
        })}
      </div>
    );
  }
}

module.exports = Page;
