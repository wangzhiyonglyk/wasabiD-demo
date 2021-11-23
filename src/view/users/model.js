export default [
    {
        key:true,
        name:"id",
        label:"id",
        headerAble:false,
        filterAble:false,
        addAble:true,
        editAble:true,
        hide:true,
       
    },
    {
        name:"username",
        label:"用户名",
        headerAble:true,
        filterAble:true,
        addAble:true,
        editAble:true,
      
    },
    {
        name:"sex",
        label:"性别",
        headerAble:true,
        filterAble:true,
        addAble:true,
        editAble:true,
        type:"select",
        data:[
            {value:0,text:"男"},
            {value:1,text:"女"}
        ],
        content:(rowData)=>{
                return rowData.sex==1?"女":"男"
        }
    },
    {
        name:"deptName",
        label:"所属部门",
        headerAble:true,
        filterAble:true,
        addAble:true,
        editAble:true,
        type:"select",
        data:[
            {value:"人事部",text:"人事部"},
            {value:"行政部",text:"行政部"}
        ]
      
    },
  
]