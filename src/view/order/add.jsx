import React from "react";
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.onClick=this.onClick.bind(this);

    }
    componentDidMount() {

    }
    onClick() {
    for(var o in this.refs)
        {
           
            this.refs[o].validate&&this.refs[o].validate();
            console.log(this.refs[o].getValue());
        }
    }
    render() {
        return <div>
            {
                React.Children.map(this.props.children,  (child,index)=> {
                    return React.cloneElement(child, {  key: index,ref:index })
                })

            }
        
        </div>;
    }
}

export default Add;