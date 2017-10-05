import React from "react";
import ReactDOM from "react-dom";
import { Page, Layout, Left, Right, Center, Menus, MenuPanel, Tabs, TabPanel } from "wasabiD";
import { ajax } from "wasabi-api";
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.tabClose = this.tabClose.bind(this);
        this.addTab = this.addTab.bind(this);
        this.state = {
            tabs: [],
            activeIndex: 0
        }
    }
    componentDidMount() {

    }
    tabClose(index, activeIndex) {
        this.state.tabs.splice(index, 1);
        activeIndex = activeIndex > this.state.tabs.length - 1 ? activeIndex - 1 <= this.state.tabs.length - 1 ? activeIndex - 1 : 0 : activeIndex;
        this.setState({
            tabs: this.state.tabs,
            activeIndex: activeIndex
        })
    }
    addTab(title, url) {
        //判断当前的页签的下标
        let activeIndex = this.state.activeIndex;
        if (this.state.tabs.filter((item, index) => {
            if (item.title == title) {
                activeIndex =index;
                return true;
            }
        }).length == 0) {
            this.state.tabs.push(
                { title: title, url: url }

            )
            activeIndex = this.state.tabs.length - 1;
        }
        this.setState({
            tabs: this.state.tabs,
            activeIndex: activeIndex
        })
    }
    render() {
        return <Layout>
            <Left width={250}>
                <Menus>
                    <MenuPanel title="按钮组件">
                        <a href="javascript:void(0);" onClick={this.addTab.bind(this, "普通按钮-Button", "./button.html")}>普通按钮-Button</a>
                        <a href="javascript:void(0);" onClick={this.addTab.bind(this, "链接按钮-LinkButton", "./button.html")}>链接按钮-LinkButton</a>
                    </MenuPanel>
                </Menus>

            </Left>
            <Center>
                <Tabs onClose={this.tabClose.bind(this)} activeIndex={this.state.activeIndex} >
                    {
                        this.state.tabs.map((item, index) => {
                            return <TabPanel key={index} title={item.title}
                            > <iframe style={{ width: "100%", height: document.body.clientHeight - 20 }} src={item.url}></iframe></TabPanel>
                        })
                    }
                </Tabs>

            </Center>

        </Layout>
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));