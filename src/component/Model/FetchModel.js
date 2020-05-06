/**
 * Created by zhiyongwang on 2016-03-26.
 * desc:fetch 查询时的数据模型
 *
 */

class FetchModel
{
    constructor(url,success,data=null,error=null,type="POST")
    {
        this.url=url;
        this.data=data;
        this.success=success;
        this.error=error;
        this.type=type;//类型
        this.contentType="application/x-www-form-urlencoded";////请求数据格式
    }
}
export default FetchModel;