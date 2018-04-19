export let state={
  tableData:"",
    isAlert:false,
    refuse:false,
    isChannelAlert:false,
    isEdit:false,
  isChannelPassword:false,
  rebateStateSearch:[
    {
      name:"--请选择--",
      id:""
    },
    {
      name:"未参加",
      id:"1"
    },  {
      name:"已参加",
      id:"0"
    }, {
      name:"其他折扣中",
      id:"2"
    },
  ],
  rebateState:[
    {
      value:"--请选择--",
      id:""
    },
    {
      value:"生效中",
      id:"2"
    },  {
      value:"已失效",
      id:"3"
    },
  ],
    unit:[                //单位
      {
        value: '%',
        id:"Proportion"
      }, {
        value: '元/单',
        id:"Quota"
      }
    ],
  streamType:[
    {
      value: '---请选择---',
      id: ""
    },{
      id:"SystemLiquidation",
      value: '系统清算'
    }, {
      id:"Fine",
      value: '罚款'
    }, {
      id:"Award",
      value: '奖励'
    },{
      id:"BusinessIncome",
      value: '平台运营费收入'
    },{
      id:"BusinessOutcome",
      value: '平台运营费提现'
    }
  ],
  productState:[
    {
      value: '---请选择---',
      id:""
    }, {
      value: '已上架',
      id:"1"
    }, {
      id:"0",
      value: '未上架'
    }
  ],
    costType:[              //费用类别
      {
        name: '上门费',
        id:"prince1"
      }, {
        name: '服务费',
        id:"prince2"
      }, {
        name: '配件费',
        id:"prince3"
      }, {
        name: '高空费',
        id:"prince4"
      }
    ],
    isEditTable:false,
    classifyData:[],       //分类
    cityData:[],                  //城市数据
    findchannel:[],                //渠道数据
    masterAmerceList:[            //师傅罚款
      {
        name:"不守时",
        selector: "0",
      } , {
        name:"乱收费",
        selector: "0",
      }  , {
        name:"服务态度差",
        selector: "0",
      }, {
        name:"其他",
        selector: "0",
      }
    ],
  alertForbiddenList:[             //退款原因
    {
      name:"多次恶意违规收费",
      selector:"0",
    }, {
      name:"多次被投诉",
      selector:"0",
    }, {
      name:"关键资料不全",
      selector:"0",
    }, {
      name:"引导用户线下付款",
      selector:"0",
    }, {
      name:"师傅离职",
      selector:"0",
    }, {
      name:"其他",
      selector:"0",
    }
  ],
  orderStatus: [                    //订单状态
    {     //来源类型
      value: '---请选择---',
      id: ""
    }, {
      value: '已完成',
      id: "12"
    }, {
      value: '已退款',
      id: "13"
    }, {
      value: '已全部退款',
      id: "14"
    }, {
      value: '部分退款',
      id: "15"
    }, {
      value: '已取消',
      id: "16"
    }, {
      value: '已清算',
      id: "17"
    }, {
      value: '已结算',
      id: "18"
    }
  ],
  payment :[       //支付方式
    {
      name:"--请选择--",
      id:""
    },
    {     //来源类型
      name: '支付宝',
      id:"Alipay"
    }, {
      name: '微信',
      id:"WeChat"
    }, {
      name: '师傅代收款',
      id:"AgencyFund"
    },
  ],
  runningType:[     //流水类型
    {
      value:'缴费',
      id:"PayTheFees"},
    {
      value:"系统清算",
      id:"SystemLiquidation"
    },{
      value:"提现",
      id:"WithdrawDeposit"
    }, {
      value: "充值",
      id: "TopUpRecharge"
    },{
      value:"罚款",
      id:"Fine"
    },{
    value:"奖励",
      id:"Award"
    }, {
      value: "保证金增资",
      id: "CashDepositCapitalIncrease"
    },{
    value:"保证金减资",
      id:"CashDepositDecreaseOfCapital"
    }],
  alertForbiddenListUser:[
    {
      name:"恶意批量下单",
      selector:"0",
    }, {
      name:"推广造假",
      selector:"0",
    }, {
      name:"竞争对手",
      selector:"0",
    }, {
      name:"推广数据造假",
      selector:"0",
    }, {
      name:"其他",
      selector:"0",
    }
  ],
  //投诉工单原因
  content:{
      textareaContent:"",
      selectorContent:"",
      list:[
        {
          name:"师傅技能限制不会修",
          selector:"0"
        }, {
          name:"设备原因（损坏或缺失）无法修",
          selector:"0"
        }, {
          name:"师傅无法准时上门",
          selector:"0"
        }, {
          name:"不想要这个服务了",
          selector:"0"
        }, {
          name:"信息填写错误，重新预约",
          selector:"0"
        }, {
          name:"师傅无法准时上门",
          selector:"0"
        }, {
          name:"师傅缺少工具或配件无法维修",
          selector:"0"
        },{
          name:"产品报价价格不合理",
          selector:"0"
        },{
          name:"师傅缺少工具或配件无法维修",
          selector:"0"
        },
      ]
  },
  content2:{
      textareaContent:"",
      selectorContent:"",
      list:[
        {
          name:"师傅技能限制不会修",
          selector:"0"
        }, {
          name:"设备原因（损坏或缺失）无法修",
          selector:"0"
        }, {
          name:"师傅无法准时上门",
          selector:"0"
        }, {
          name:"不想要这个服务了",
          selector:"0"
        }, {
          name:"信息填写错误，重新预约",
          selector:"0"
        }, {
          name:"师傅无法准时上门",
          selector:"0"
        }, {
          name:"师傅缺少工具或配件无法维修",
          selector:"0"
        },{
          name:"产品报价价格不合理",
          selector:"0"
        },{
          name:"师傅缺少工具或配件无法维修",
          selector:"0"
        },
      ]
  },
  state:[
    {
    value: '---请选择---',
    id: ""
  }, {
    value: '正常',
    id: "1"
  }, {
    value: '禁用',
    id: "0"
  }],
  orderStatusOrderAll:[
    {
      value: '---请选择---',
      id: ""
    }, {
      value: '待付款',
      id: "01"
    }, {
      value: '支付超时',
      id: "02"
    }, {
      value: '待分配',
      id: "03"
    }, {
      value: '网点待分配',
      id: "04"
    }, {
      value: '待上工',
      id: "05"
    }, {
      value: '待抵达',
      id: "06"
    }, {
      value: '服务中',
      id: "07"
    }, {
      value: '异常挂起',
      id: "08"
    }, {
      value: '线下结款',
      id: "09"
    }, {
      value: '待核帐',
      id: "10"
    }, {
      value: '待付尾款',
      id: "11"
    }, {
      value: '已完成',
      id: "12"
    }, {
      value: '待退款',
      id: "13"
    }, {
      value: '已退全款',
      id: "14"
    }, {
      value: '部分退款',
      id: "15"
    }, {
      value: '已取消',
      id: "16"
    }, {
      value: '已清算',
      id: "17"
    }, {
      value: '已结算',
      id: "18"
    },
  ],

  orderDetailsState:'', //工单状态
  channelDropDownMenuList:[      //渠道端下拉列表
    {
      name:"刷新当前",
      className:"chennel_renovate_icon",
      clickType:0,
    }, {
      name:"关闭所有",
      className:"chennel_close_all_icon",
      clickType:1
    },
  ],
//  折扣添加列表数据 start
  rightTableList:[],
  rightCheckbox:[],
  checked:false,
  delNewArray:[],   //右侧被删除的选项
};
