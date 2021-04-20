/**
 * 将数据请求独立出来
 */
export default {
    /**
     * 加载数据
     * @param {*} url 
     * @param {*} params 
     */
    loadData(url, params) {
        if (url) {
            let type = this.props.httpType ? this.props.httpType : "POST";
            type = type.toUpperCase();
            var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
            fetchmodel.headers = this.props.httpHeaders;
            if (this.props.contentType) {
                //如果传contentType值则采用传入的械
                //否则默认

                fetchmodel.contentType = this.props.contentType;
                fetchmodel.data = fetchmodel.contentType == "application/json" ? fetchmodel.data ? JSON.stringify(fetchmodel.data) : "{}" : fetchmodel.data;
            }
            type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
            console.log("checkbox-fetch", fetchmodel);
        }
    },
    /**
     * 
     * @param {*} message 
     */
    loadError(message) {//查询失败
        console.log("checkbox-error", message);
        Msg.error(message);
    },
    /**
     * 数据加载成功
     * @param {*} data 
     */
    loadSuccess(data) {//数据加载成功
        let realData;
        if (this.props.dataSource == null) {
            realData = data;
        }
        else {
            realData = func.getSource(data, this.props.dataSource);
        }
        let valueField = this.props.type == "treepicker" ? this.props.idField : this.props.valueField
        //对数据进行格式化
        let newData = propsTran.setComboxValueAndText(this.props.type, this.props.value, realData, valueField, this.props.textField);
        this.setState({
            rawData: realData,//保存方便对比
            data: newData.data,
            text: newData.text.join(",")
        })
    }
}