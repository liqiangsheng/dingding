import Vue from "vue"
import moment from "moment"
//
  // /**
  //  * 数字精度转换
  //  * @paran value 过滤器值
  //  * @paran precision 精度
  //  */
  Vue.filter('fix', function (value, precision) {
    if(isNaN(value) || value === Infinity) {
      return '--'
    }

    if(!jQuery.isNumeric(value)) {
      return value;
    }

    // 默认精度，小数点后2位
    if(precision == null) {
      precision = 2;
    }

    var num = new Number(value);
    return num.toFixed(precision);
  });

Vue.filter('commas', function (value) {
  var valueStr = "" + value;
  if(valueStr === "NaN" || valueStr === "Infinity") {
    return '--'
  }

  if(!jQuery.isNumeric(value)) {
    return value;
  }

  function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }
  return addCommas(value);
});
Vue.filter('FLabelBusiness',function(input){
  if("001"===input){
    return "家电保养";
  }else if("002"===input){
    return "家电维修";
  }else if("003"===input){
    return "手机维修";
  }else if("004"===input){
    return "家居维修";
  }else if("005"===input){
    return "开锁修锁";
  }else if("006"===input){
    return "管道疏通";
  }else if("007"===input){
    return "灯具线路";
  }else if("008"===input){
    return "卫浴洁具";
  }else if("009"===input){
    return "安装服务";
  }else if("000"==input){
    return "无"
  }

});
// /**
//  * 字符串截取
//  * @paran value 过滤器值
//  * @paran length 截取长度
//  */
Vue.filter('cutout', function (value,size) {
  if(!size){
    size = 10
  }
  if(value.length>size){
    return value.substring(0, size)+"...";
  }
  return value;
});

Vue.filter('userSourceType', function (input) {
  if("1"===input){
    return "渠道入口";
  }else if("2"===input){
    return "好友推荐";
  }else if("3"===input){
    return "平台自建";
  }else if("4"===input){
    return "渠道自建";
  }else if("5"===input){
    return "官网入口";
  }else if(input==="0"){
    return "微信入口"
  }
  return "无"
});

Vue.filter('userAtentionState', function (value) {
  if("1"==value){
    return "已关注";
  }else if("0"==value){
    return "未关注";
  }else if("2"===value){
      return "已取关";
  }
  return "无"
});
Vue.filter('userState', function (value,state) {
  if("1"==value||"using"===value){
    return "正常";
  }else if(state==="isState"&&value==="0"){
  return "未激活"
  }else if("2"==value||"forbidden"===value ||value==="0"){
    return "禁用";
  }else if(3===value){
    return "启用"
  }
  return "无"
});

Vue.filter('enableDisable', function (value) {
  if("1"==value||value==="using"){
    return "禁用";
  }else if("2"==value){
    return "恢复";
  }else if(value==="forbidden" ||value==="0"||value===3){
    return "启用"
  }
});
Vue.filter('agioStatusButton', function (input) {
  if(input===2){
    return "禁用";
  }else if(3===input){
    return "启用"
  }

});

Vue.filter('moment',function(input,fmtstring){
  if(!input)return "";
  return moment(input).format(fmtstring);
});
Vue.filter('checkzero',function(input){
  if(!input){return 0}else{
    return input;
  };
});
Vue.filter('masterType',function(input){
  if("1"==input){
    return "自营师傅";
  }else if("2"==input){
    return "兼职师傅";
  }else if("3"==input){
    return "网点师傅";
  }
  return "无"
});

Vue.filter('mastertype',function(input){
  if("1"==input){
    return "自营师傅";
  }else if("2"==input){
    return "兼职师傅";
  }else if("3"==input){
    return "网点师傅";
  }
  return "无"
});
Vue.filter("shareValue",input=>{
  console.log(input);
});

Vue.filter('listshow',function(input,type){
  var show = "";
  input.forEach((v)=>{
    if(type==="1"){
      show += Vue.filter("FLabelBusiness")(v.id.substring(0,3))+"-"+v.label+","
    }else{
      show+= v.label+",";
    }

  });

  if(show.length>0){
    return show.substring(0,show.length-1);
  }else {
    return show;
  }
});
Vue.filter('showWorkState',function(input){
  if("Leisure"==input){
    return "空闲中";
  }else if("Working"==input){
    return "工作中";
  }else if("BeOnLeave"==input){
    return "请假中";
  }
    return "无"
});

Vue.filter('discountMode',function(input){
  if("FA"===input){
    return "好友推荐奖励";
  }else if("LC"===input){
    return "链接领取";
  }else if("CC"===input){
    return "有卷码";
  }
});
Vue.filter('discountModeIndex',function(input){
  if("FA"===input){
    return 1;
  }else if("LC"===input){
    return 2;
  }else if("CC"===input){
    return 3;
  }
  return input;
});
Vue.filter('siteState',function(input){
  if("Leisure"==input){
    return "空闲中";
  }else if("Working"==input){
    return "工作中";
  }else if("BeOnLeave"==input){
    return "请假中";
  }
  return "无"
});
Vue.filter('certificateState',function(input){

  if("0"==input){
    return "未认证";
  }else if("1"==input){
    return "认证中";
  }else if("2"==input){
    return "认证通过";
  }else if("3"==input){
    return "认证驳回";
  }

});

Vue.filter('masterLevel',function(input){
  if("Primary"==input){
    return "初级师傅";
  }else if("MiddleRank"==input){
    return "中级师傅";
  }else if("Advanced"==input){
    return "高级师傅";
  }
});

//  <!--工单状态-->
Vue.filter('BackOrderStatus',function(input){
  if("01"===input){
    return "待付款";
  }else if("02"===input){
    return "支付超时";
  }else if("03"===input){
    return "待分配";
  }else if("04"===input){
    return "网点待分配";
  }else if("05"===input){
    return "待上工";
  }else if("06"===input){
    return "待抵达";
  }else if("07"===input){
    return "服务中";
  }else if("08"===input){
    return "异常挂起";
  }else if("09"===input){
    return "线下结款";
  }else if("10"===input){
    return "待核账";
  }else if("11"===input){
    return "待付尾款";
  }else if("12"===input){
    return "已完成";
  }else if("13"===input){
    return "待退款";
  }else if("14"===input){
    return "已退全款";
  }else if("15"===input){
    return "部分退款";
  }else if("16"===input){
    return "已取消";
  }else if("17"===input){
    return "已清算";
  }else if("18"===input){
    return "已结算";
  } else if ("19" === input) {
    return "待结算";
  } else if ("20" === input) {
    return "配件申领";
  } else if ("21" === input) {
    return "待预约";
  }
  return "无"

});

Vue.filter('shareTypeKeyShow',function(input){
  if("Proportion"===input){
    return "%";
  }else if("Quota"===input){
    return "元/单";
  }
});
Vue.filter('startWorkDeviationShow',function(input){
  if(input||0==input){
    if(input>=0){
      return "早到("+input+"分钟)";
    }else{
      return "迟到("+input+"分钟)";
    }

  }else{
    return "无";
  }
});Vue.filter('agioStatus',function(input){
  if(input===3){
      return "已结束"
  }else if(input===2){
    return "生效中"
  }else{
    return "无";
  }
});
Vue.filter('FLabelBusinessShow',function(input){
  if("001"==input){
    return "家电保养";
  }else if("002"==input){
    return "家电维修";
  }else if("003"==input){
    return "手机维修";
  }else if("004"==input){
    return "家居维修";
  }else if("005"==input){
    return "开锁修锁";
  }else if("006"==input){
    return "管道疏通";
  }else if("007"==input){
    return "灯具线路";
  }else if("008"==input){
    return "卫浴洁具";
  }else if("009"==input){
    return "安装服务";
  }
});
Vue.filter('orderStateShow',function(input){
  if("01"==input){
    return "待付款";
  }else if("02"==input){
    return "支付超时";
  }else if("03"==input){
    return "待分配";
  }else if("04"==input){
    return "网点待分配";
  }else if("05"==input){
    return "待上工";
  }else if("06"==input){
    return "待抵达";
  }else if("07"==input){
    return "服务中";
  }else if("08"==input){
    return "异常挂起";
  }else if("09"==input){
    return "线下结款";
  }else if("10"==input){
    return "待核帐";
  }else if("11"==input){
    return "待付尾款";
  }else if("12"==input){
    return "已完成";
  }else if("13"==input){
    return "待退款";
  }else if("14"==input){
    return "已退全款";
  }else if("15"==input){
    return "部分退款";
  }else if("16"==input){
    return "已取消";
  }else if("17"==input){
    return "已清算";
  }else if("18"==input){
    return "已结算";
  } else if ("19" === input) {
    return "待结算";
  } else if ("20" === input) {
    return "配件申领";
  } else if ("21" === input) {
    return "待预约";
  }
  return "无"
});
Vue.filter('LeaveApplyForShow',function(input){
  if("1"==input){
    return "事假";
  }else if("2"==input){
    return "病假";
  }else if("3"==input){
    return "其他";
  }
  return "无"
});
Vue.filter('LeaveApplyForStateShow',function(input){
  if("0"==input){
    return "申请中";
  }else if("1"==input){
    return "通过";
  }else if("2"==input){
    return "驳回";
  }
  return "无"
});
Vue.filter('visitFeeShow',function(input){
  let visitFee = 0;
  input.forEach((v)=>{
    if(v.price1>visitFee){
      visitFee = v.price1;
    }
  });
  return visitFee;
});
Vue.filter('serviceFeeShow',function(input){
  let serviceFee = 0;
  input.forEach((v)=>{
    serviceFee += v.price2*v.sum;
  });
  return serviceFee;
});
Vue.filter('price3Show',function(input){
  let serviceFee = 0;
  input.forEach((v)=>{
    serviceFee += v.price3*v.sum;
  });
  return serviceFee;
});
Vue.filter('price4Show',function(input){
  let serviceFee = 0;
  input.forEach((v)=>{
    serviceFee += v.price4*v.sum;
  });
  return serviceFee;
});
Vue.filter('discountsFeeShow',function(input){
  let discountsFee = 0;
  input.forEach((v)=>{
    discountsFee += (v.price2-v.price2DiscountFee)*v.sum;
  });
  if(discountsFee.toString().indexOf(".")!==-1){
   let index=discountsFee.toString().indexOf(".")+3;
   return discountsFee.toString().substring(0,index);
 }
  return discountsFee;
});
Vue.filter('totalFeeShow',function(input){
  let visitFee = 0;
  let serviceFee = 0;
  input.forEach((v)=>{
    if(v.price1>visitFee){
      visitFee = v.price1;
    }
    serviceFee += v.price2DiscountFee*v.sum;
  });
  return serviceFee+visitFee;
});
Vue.filter('serviceFeeShow2',function(input){
  let serviceFee = 0;
  input.forEach((v)=>{
    if("1"==v.isSecondPayment&&0==v.price2){
    }else{
      if(v.status==0){
        serviceFee += v.price2Original*v.serviceSize;
      }
    }
  });
  return serviceFee;
});
Vue.filter('price3Show2',function(input){
  let serviceFee = 0;
  input.forEach((v)=>{
    serviceFee += v.price3*v.serviceSize;
  });
  return serviceFee;
});
Vue.filter('price4Show2',function(input){
  let serviceFee = 0;
  input.forEach((v)=>{
    serviceFee += v.price4*v.serviceSize;
  });
  return serviceFee;
});
Vue.filter('discountsFeeShow2',function(input){
  let discountsFee = 0;
  input.forEach((v)=>{
    if("1"==v.isSecondPayment&&0==v.price2){
    }else {
      if(v.status==0) {
        if (!v.cashbackAmount) v.cashbackAmount = 0;
        discountsFee += (v.price2Original - v.price2 - v.cashbackAmount) * v.serviceSize;
      }
    }
  });
  if(discountsFee){
    discountsFee = Math.round(discountsFee*100)/100;
  }
  return discountsFee;
});
Vue.filter('totalFeeShow2',function(input,a){
  if(a==undefined){
    a=0;
  }
  // console.log(a,"input");
  let visitFee = 0;
  let serviceFee = 0;
  let price3Fee = 0;
  let price4Fee = 0;
  input.forEach((v)=>{
    if(v.status==0){
      if(v.price1>visitFee){
        visitFee = v.price1;
      }
      serviceFee += v.price2*v.serviceSize;
      price3Fee += v.price3*v.serviceSize;
      price4Fee += v.price4*v.serviceSize;
    }
  });
  return serviceFee+visitFee+price3Fee+price4Fee-a;
});
Vue.filter('getServiceTotel',function(input){
  return input.price1+input.price2+input.price3+input.price4;
});
Vue.filter('isnull',function(input){
  if("null"==input){
    return "";
  }
  return input;
});
Vue.filter('paySourceShow',function(input){
  if("Alipay"==input){
    return "支付宝";
  }else if("WeChat"==input){
    return "微信支付";
  }else if("AgencyFund"==input){
    return "现金支付";
  }else if("BalanceFund"==input){
    return "余额扣款";
  }
  return "无"
});
Vue.filter('channelPaySourceShow',function(input){
  if("2"==input){
    return "支付宝支付";
  }else if("1"==input){
    return "微信支付";
  }else if("3"==input){
    return "账户余额";
  }else if("1"==input){
    return "线下"
  }
  return "无"
});
Vue.filter('payStateShow',function(input){
  if("Pay"==input){
    return "已支付";
  }else if("Refund"==input){
    return "未支付";
  }
  return "无"
});
Vue.filter('refundStateShow',function(input){
  if("Pay"==input){
    return "已退款";
  }else if("Refund"==input){
    return "未退款";
  }
  return "无"
});
Vue.filter('feeTypeShow',function(input){
  if("1"==input){
    return "上门费";
  }else if("2"==input){
    return "服务费";
  }else if("3"==input){
    return "配件费";
  }else if("4"==input){
    return "高空费";
  }
  return "无"
});
Vue.filter('orderSourceShow1',function(input){
  if("0"==input||0==input){
    return "定价工单";
  }else if("1"==input||1==input){
    return "一口价工单";
  }else if("2"==input||2==input){
    return "企业工单";
  }else if("3"==input||3==input){
    return "预约工单";
  }else if("4"==input||4==input){
    return "返修工单";
  }
  return "定价工单"
});
Vue.filter('orderSourceShow',function(input){
  if("0"==input||0==input){
    return "用户下单";
  }else if("1"==input||1==input){
    return "渠道下单";
  }else if("2"==input||2==input){
    return "推荐用户下单";
  }else if("3"==input||3==input){
    return "平台自建";
  }else if("4"==input||4==input){
    return "渠道自建";
  }else if("7"==input||4==input){
    return "师傅二维码";
  }else if("8"==input||4==input){
    return "网点二维码";
  }
  return "用户下单"
});
Vue.filter('advertisingShow',function(input){
  switch (input){
    case "HomePageHead":return "首页头部banner";
    case "SystemNotice":return "系统公告";
    case "HomePageBottom":return "首页广告位";
    case "PromotionA":return "促销广告A位";
    case "PromotionB":return "促销广告B位";
    case "PromotionC":return "促销广告C位";
    case "PromotionD":return "促销广告D位";
    case "SalePageBottom":return "折扣广告展示位";
    case "SystemNoticeByMaster":return "师傅系统公告";
    case "PopupHeadByMaster":return "师傅首页弹窗";
    case "HomePageHeadByMaster":return "师傅首页头部banner";
  }
  return "无"
});
Vue.filter('sysMessageTypeShow',function(input){
  if("SysMessage"==input){
    return "系统消息";
  }else if("ActivityMessage"==input){
    return "活动消息";
  }
  return "无"
});
Vue.filter('sysMessageTargetTypeShow',function(input){
  if("Channel"==input){
    return "渠道";
  }else if("Site"==input){
    return "网点";
  }else if("Master"==input){
    return "师傅";
  }
  return "无"
});
Vue.filter('putawayShow',function(input){
  if("1"===input){
    return "已上架";
  }else if("0"===input){
    return "未上架";
  }else if(input){
    return input;
  }
  return "无"
});

Vue.filter('isCollectDoorFeeShow',function(input){
  if("1"===input){
    return "是";
  }else if("0"===input){
    return "否";
  }else if(input){
    return input;
  }
  return "无"
});
Vue.filter('warrantyDatetimeShow',function(input){
if("0"===input){
    return "无"
  }else if(input){
    return input;
  }
  return "无"
});
Vue.filter('isProductType',function(input){
  if("1"==input){
    return "定价产品";
  }else if("0"==input){
    return "一口价";
  }else if(input){
    return input;
  }
  return "无"
});
Vue.filter('isRepetitionShow',function(input){
  if("1"==input){
    return "是";
  }else if("0"==input){
    return "否";
  }
  return "无"
});

Vue.filter('userRoleName',function(input){
if("Admin"==input){
return "超级管理员";
}else if("Site"==input){
return "网点";
}else if("Channel"==input){
return "渠道";
}else if("SupportManager"==input){
return "客服经理";
}else if("OperationalManager"==input){
return "运营经理";
}else if("FinancialManager"==input){
return "财务经理";
}else if("ProductManager"==input){
return "产品经理";
}else if("FinancialStaff"==input){
return "财务专员";
}else if("SupportStaff"==input){
return "客服专员";
}else if("OperationalStaff"==input){
return "运营专员";
}else if("ProductStaff"==input){
return "业务专员";
}else if("Autotrophy"==input){
return "自营师傅";
}else if("PartTimeJob"==input){
return "兼职师傅";
}
return "无"
});

Vue.filter('isEndShow',function(input){
  if("1"==input){
    return "是";
  }else if("0"==input){
    return "否";
  }
  return "无"
});
Vue.filter('feeTypeFaShow',function(input){
  if("AdvanceFund"==input){
    return "预付资金";
  }else if("ConsumptionFund"==input){
    return "消费资金";
  }
});
Vue.filter('payTypeShow',function(input){
  if("Pay"==input){
    return "支付";
  }else if("Refund"==input){
    return "退款";
  }
});
Vue.filter('payType',function(input){

  if("1"==input){
    return "充值";
  }else if("2"==input){
    return "提现";
  }else if("3"==input){
    return "支付";
  }else if("4"==input){
    return "结款";
  }else if("5"==input){
    return "退款"
  }
  return "无"
});

Vue.filter('StatisticsTypeShow',function(input){
  if("PayTheFees"==input){
    return "缴费";
  }else if("SystemLiquidation"==input){
    return "系统清算";
  }else if("WithdrawDeposit"==input){
    return "提现";
  }else if("TopUpRecharge"==input){
    return "充值";
  }else if("Fine"==input){
    return "罚款";
  }else if("Award"==input){
    return "奖励";
  }else if("CashDepositCapitalIncrease"==input){
    return "保证金增资";
  }else if("CashDepositDecreaseOfCapital"==input){
    return "保证金减资";
  }
});
Vue.filter('userRoleShow',function(input){
  if("Admin"==input){
    return "超级管理员";
  }else if("Site"==input){
    return "网点";
  }else if("Channel"==input){
    return "渠道";
  }else if("SupportManager"==input){
    return "客服经理";
  }else if("OperationalManager"==input){
    return "运营经理";
  }else if("FinancialManager"==input){
    return "财务经理";
  }else if("ProductManager"==input){
    return "产品经理";
  }else if("FinancialStaff"==input){
    return "财务专员";
  }else if("SupportStaff"==input){
    return "客服专员";
  }else if("OperationalStaff"==input){
    return "运营专员";
  }else if("ProductStaff"==input){
    return "业务专员";
  }else if("SiteManage"==input){
    return "网点管理员";
  }else if("ChannelManage"==input){
    return "渠道管理员";
  }else if("Autotrophy"==input){
    return "自营师傅";
  }else if("PartTimeJob"==input){
    return "兼职师傅";
  }
});
Vue.filter("placeholder",function(input){
  if(input){
    return input
  }else{
    return "无"
  }
});
Vue.filter("placeholder_one",function(input){
  if(input){
    return input
  }else{
    return "0"
  }
});
Vue.filter("placeholderTel",function(input){
  if(input){
    return input
  }else{
    return "未绑定"
  }
});
Vue.filter('channelTypeShow',function(input){
  if("PropertyManagement"==input){
    return "物业";
  }else if("OnlineMall"==input){
    return "线上电商";
  }else if("Manufacturer"==input){
    return "厂商";
  }
});
Vue.filter('userTypeShow',function(input){
  if("MASTER"==input){
    return "师傅";
  }else if("USER"==input){
    return "用户";
  }
  return "无"
});
Vue.filter('fractionRecordTypeShow',function(input){
    if("01"===input){
    return "推荐好友";
  }else if("02"===input){
    return "完成服务";
  }else if("03"===input){
    return "完成评价";
  }else if("04"===input){
    return "推荐注册";
  }else if("05"===input){
    return "积分管理";
  }
  return "无"
});
Vue.filter('numberShow',function(input){
  if(input){
    return input;
  }
  return 0;
});
Vue.filter('childState', function (value) {
  if("1"==value){
    return "正常";
  }else if("2"==value){
    return "禁用";
  }
  return "无"
});

Vue.filter('childRole',function(input){
  if("SuperAdmin"==input){
    return "超级管理员";
  }else if("Admin"==input){
    return "管理员";
  }
});
Vue.filter('isMountings',function(input){
  if("1"==input){
    return "是";
  }else if("0"==input){
    return "否";
  }
  return "无"
});

Vue.filter('discountStateShow',function(input){
  if("1"==input){
    return "未开始";
  }else if("2"==input){
    return "进行中";
  }else if("3"==input){
    return "已结束";
  }else if("4"==input){
    return "已停用";
  }
  return "无"

});
Vue.filter('discountModeShow',function(input){
  if("FA"==input){
    return "好友推荐奖励";
  }else if("LC"==input){
    return "链接领取";
  }else if("CC"==input){
    return "有劵码";
  }
  return "无"
});
Vue.filter('channelOfRevenueShow',function(input){
  if(input){
    return input;
  }
  return "该工单暂未结算"
});

Vue.filter("isStartState",function(input){
  if(input==="2"){
    return "恢复"
  }else if(input==="1"){
    return "禁用";
  }
});
Vue.filter("parState",function(input){
  if(input==="Pay"){
    return "已退款"
  }else if(input==="Refund"){
    return "未退款"
  }
  return "无"
});
Vue.filter('adstate',function(input){
  if("0"==input||0==input){
    return "未开始";
  }else if("1"==input||1==input){
    return "进行中";
  }else if("2"==input||2==input){
    return "已停用";
  }else if("3"==input||3==input){
    return "已结束";
  }else if("4"==input||4==input){
    return "已删除";
  }
});
  Vue.filter('agioProductStatus',function(input){   //折扣模块商品状态
    if(1===input){
        return "未参加";
      }else if(2===input){
        return "已参加";
      }else if(3===input){
        return "时间冲突";
      }
      return "无"
});
Vue.filter('orderType1',function(input){
  if("0"===input){
    return "/static/images/zhengchang.png";
  }else if("1"===input){
    return "/static/images/huanxiu.png";
  }else if("2"===input){
    return "/static/images/yikoujia.png";
  }else if("3"===input){
    return "/static/images/dingjia.png";
  }else if("4"===input){
    return "/static/images/yuyue.png";
  }else if("5"===input){
    return "/static/images/qiye.png";
  }else if("6"===input){
    return "/static/images/shifu.png";
  }else if("7"===input){
    return "/static/images/wangdian.png";
  }
  return "无"
});
 Vue.filter('orderType',function(input){
    if("0"===input){
        return "正常工单";
      }else if("1"===input){
        return "返修工单";
      }else if("2"===input){
        return "一口价工单";
      }else if("3"===input){
        return "定价工单";
      }else if("4"===input){
        return "预约工单";
      }else if("5"===input){
        return "企业工单";
      }else if("6"===input){
      return "师傅荐单";
    }else if("7"===input){
      return "网点荐单";
    }
      return "无"
});
 Vue.filter('orderSource',function(input){
      if("1"===input){
        return "渠道下单";
      }else if("2"===input){
        return "分享";
      }else if("3"===input){
        return "平台自建";
      }else if("4"===input){
        return "渠道自建";
      }else if("5"===input){
        return "官网下单";
      }else if(input==="0"){
        return "微信下单"
      }
      return "无"
});
Vue.filter('placeholderSex',function(input){
  if("1"===input){
    return "男";
  }else if("2"===input){
    return "女";
  }
  return "未知"
});
Vue.filter('qudaozhibao',function(input){
  if("0"===input){
    return "质保外";
  }else if("1"===input){
    return "质保内";
  }
  return "无"
});
Vue.filter('jinjidu',function(input){
  if("0"===input){
    return "正常";
  }else if("1"===input){
    return "加急";
  }
  return "无"
});
//渠道结算状态
Vue.filter('orderStateShow1',function(input){
 if("17"==input){
    return "已出账";
  }else if("18"==input){
    return "已结款";
  }
  return "未出账,未结款"
});
Vue.filter('payState',function(input){
 if("1"==input){
    return "进行中";
  }else if("2"==input){
    return "已完成";
  }
  return "无"
});
//账单结算,提成结算
Vue.filter('billState',function(input){
  if ("1"===input) {
    return "未出账"
  } else {
    return "已出账"
  }
});
Vue.filter('kontState',function(input){
  if ("1"===input) {
    return "未结款"
  } else {
    return "已结款"
  }
})
//账单查询明细
Vue.filter('channelWarranty',function(input){
  if("1"===input){
    return "保内"
  }else{
    return "保外"
  }
})

//账号管理
Vue.filter('roles',function(input){
  if("Admin"===input){
    return "超级管理员"
  }else{
    return "管理员"
  }
})
Vue.filter("states",function(input){
  if("1"===input){
    return "正常";
  }else{
    return "禁用"
  }
})
Vue.filter("enable",function(input){
  if ("1"===input) {
    return "禁用"
  } else {
    return "启用"
  }
})
Vue.filter('settleType',function(input){
  if("0"==input){
    return "渠道先结";
  }else if("1"==input){
    return "渠道后结";
  }
  return "无"
});

Vue.filter('rechargeState',function(input){
  //0.审核中1.通过2.驳回
  if("0"===input){
      return "审核中";
    }else if("1"===input){
      return "已通过";
    }else if("2"===input){
      return "已驳回";
    }
  return "无"
});
//后台渠道账单
Vue.filter('billPayType',function(input){
  if("1"===input){
    return "已结款"
  }else{
    return "查看凭证"
  }
})
//师傅认证来源
Vue.filter('sourceType', function (input) {
  if ("1" === input) {
    return "Android端"
  } else if ("2" === input) {
    return "Ios端"
  } else if ("3" === input) {
    return "官网端"
  } else {
    return "无"
  }
})
Vue.filter("bankingType",function(input){
  switch (input){
    case "ICBC":return "中国工商银行";
    case "Agricultural":return "中国农业银行";
    case "Constructio":return "中国建设银行";
    case "China":return "中国银行";
    case "Merchants":return "招商银行";
    case "Communications":return "交通银行";
    case "Minsheng":return "中国民生银行";
    case "Industrial":return "兴业银行";
    case "Development":return "上海浦东发展银行";
    case "CITIC":return "中信银行";
    case "RuralCreditCooperative":return "农村信用合作社";
  }
})
Vue.filter('changeDate',function(input){
  var time =input*60;
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + "秒";
    }
    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "分钟" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    } else if (time >= 60 * 60 * 24) {
      time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
        parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "分钟" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    }
    else {
      time = parseInt(time) + "秒";
    }
  }
  return time;
})
Vue.filter('timeout',function(input){
  if(input ==='1'){
    return '未约时间'
  }else if(input ==='2'){
    return '服务超时'
  }else{
    return '迟到'
  }
})
Vue.filter('judgeData',function(input){
  if(input===''){
    return '￥0';
  }else{

  }
})
Vue.filter('parseState',function(input){
  if(input === 10){
    return "待审核"
  }else if(input === 20){
    return "待发货"
  }else if(input === 30){
    return "待收货"
  }else if(input === 40){
    return "待返还旧件"
  }else if(input === 50){
    return "已完成"
  }else if(input === 60){
    return "已驳回"
  }else{
    return "无"
  }
})
Vue.filter('parseStateOne',function(input){
  if(input === 1){
    return "提交申请"
  }else if(input === 2){
    return "审批通过"
  }else if(input === 3){
    return "确认发货"
  }else if(input === 4){
    return "确认收货"
  }else if(input === 5){
    return "确认完成"
  }else if(input === 6){
    return "驳回申请"
  }else if(input === 7){
    return "取消申请"
  }else{
    return "无"
  }
})
Vue.filter('ShippingType',function(input){
  if(input === 1){
    return "快递"
  }else if(input === 2){
    return "自取"
  }else{
    return "无"
  }
})
Vue.filter('ReturnOldMountings',function(input){
  if(input === 1){
    return "已返还旧件"
  }else if(input === 2){
    return "不返还旧件"
  }else{
    return "无"
  }
})


