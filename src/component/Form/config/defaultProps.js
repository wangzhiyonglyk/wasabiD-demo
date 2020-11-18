/**
 * create by wangzhiyong 
 * date:2017-08-14
 * desc:将表单属性默认值独立
 */
export default {
             //公共属性
            type:"text",
            name:"",
            label:null,
            title:null,
            help:"",

            value:"",
            text:"",
            placeholder:"",
            readOnly:false,
            required:false,
        
            hide:false,
            regexp:null,
            invalidTip:null,
            style:{}, 
            className:"",
           
              //其他属性 text
            rows:5,//textarea
            cols:1,
            resize:false,
            min:null,
            max:null,
            onClick:null,
            onChange:null,


            //其他属性 combobox
            contentType:"",//http的request的数据类型
            httpHeader:null,
            multiple:false,
            idField:"id",
            valueField:"value",
            textField:"text",
            url:null,
            params:null,
            dataSource:"data",
            data:null,
            // extraData:null,
            onSelect:null,
            addAbled:false,
           //其他属性 picker
            secondUrl:null,
            secondParams:null,
            secondParamsKey:null,
            thirdUrl:null,
            thirdParams:null,
            thirdParamsKey:null,
            hotTitle:"热门选择",
            hotData:null,
            idField:"id",
            parentField:"pId",
            simpleData:false,//树组件
            attachTime:false
           
        }