import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         value:this.props.value};
         this.onChange=this.onChange.bind(this);
  }
  static defaultProps={
      value:""
  }
  static propTypes={
        value:React.PropTypes.oneOfType([ React.PropTypes.string,
        React.PropTypes.number]),
        onChange:React.PropTypes.func
  }
  onChange(event){
      console.log(this.props);
      if(this.props.onChange)
      {
          this.props.onChange(event);
      }
      else{
          this.setState({
              value:event.target.value
          })
      }
  }

  render() {
    return <input value={this.state.value} onChange={this.onChange}></input>;
  }

  componentDidMount() {
   
  }
}

export default Test;
