export default [
    {
        name: "id",
        label: "主键",
        type: "number",
        key:true,
        hide:true

    },
    {
        name: "title",
        label: "标题",
        type: "text",
        required: true,
        headerAble: true,
        filterAble: true,
        sortAble: true,

    },
    {
        name: "activity",
        label: "活动",
        type: "select",
        headerAble: true,
        filterAble: true,
        data: [{
            text: "个人",
            value: "个人"
        }, {
            text: "公司",
            value: "公司"
        }],

        required: true,
    },
    {
        name: "type",
        label: "类型",
        type: "text",
        headerAble: true,
        filterAble: true,
        required: true,
    },
    {
        name: "ideaLine",
        label: "涉及条线",
        type: "text",
        headerAble: true,
        filterAble: true,
        required: true,
    },
    {
        name: "introduction",
        label: "简介",
        type: "text",
        required: true,
    },
    {
        name: "detail",
        label: "详情",
        type: "text",
        required: true,
    }, {
        name: "feasibility",
        label: "可行性描述",
        type: "text",
        required: true,
    },
    {
        name: "createTime",
        label: "创建日期",
        type: "datetime",
        filterAble: true,
        hide: true,


    }
   
]