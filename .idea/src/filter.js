import Vue from "vue"
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

Vue.filter('userSourceType', function (value) {
  if("1"==value){
    return "渠道";
  }else if("0"==value){
    return "无";
  }else if("2"==value){
    return "分享";
  }
  return "无"
});

Vue.filter('userAtentionState', function (value) {
  if("1"==value){
    return "已关注";
  }else if("0"==value){
    return "未关注";
  }
  return "无"
});
Vue.filter('userState', function (value) {
  if("1"==value||"using"===value){
    return "正常";
  }else if("2"==value||"forbidden"===value ||value==="0"){
    return "禁用";
  }else if(3===value){
    return "启用"
  }else if("2"===value){

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

import moment from "moment"
Vue.filter('moment',function(input,fmtstring){
  if(!input)return "";
  return moment(input).format(fmtstring);
});
Vue.filter('checkzero',function(input){
  if(!input){return 0}else{
    return input;
  };
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

Vue.filter('listshow',function(input){
  var show = "";
  input.forEach((v)=>{
    show+= v.label+",";
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
Vue.filter('FLabelBusiness',function(input){
  if("001"===input){
    return "家电清洗-家电品类";
  }else if("002"===input){
    return "家电维修-家电品类";
  }else if("003"===input){
    return "手机维修-手机品牌";
  }else if("004"===input){
    return "家居安装-家居类型";
  }else if("005"===input){
    return "开锁修锁-锁类型";
  }else if("006"===input){
    return "管道维修-管道类型";
  }else if("007"===input){
    return "电脑维修-电脑类型";
  }else if("008"===input){
    return "卫浴洁具-卫浴类型";
  }else if("009"===input){
    return "智能设备-设备类型";
  }

});

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
    return "家电清洗";
  }else if("002"==input){
    return "家电维修";
  }else if("003"==input){
    return "手机维修";
  }else if("004"==input){
    return "家居安装";
  }else if("005"==input){
    return "开锁修锁";
  }else if("006"==input){
    return "管道维修";
  }else if("007"==input){
    return "电脑维修";
  }else if("008"==input){
    return "卫浴洁具";
  }else if("009"==input){
    return "智能设备";
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
    console.log("--------------------");
    console.log(v);
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
    return "师傅代收款";
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
    return "渠道用户下单";
  }else if("2"==input||2==input){
    return "推荐用户下单";
  }else if("3"==input||3==input){
    return "客服建单";
  }else if("4"==input||4==input){
    return "渠道建单";
  }
  return "用户下单"
});
Vue.filter('advertisingShow',function(input){
  if("HomePageHead"==input){
    return "首页头部banner";
  }else if("SystemNotice"==input){
    return "系统公告";
  }else if("HomePageBottom"==input){
    return "首页广告位";
  }else if("PromotionA"==input){
    return "促销广告A位";
  }else if("PromotionB"==input){
    return "促销广告B位";
  }else if("PromotionC"==input){
    return "促销广告C位";
  }else if("PromotionD"==input){
    return "促销广告D位";
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
});Vue.filter('isProductType',function(input){
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

Vue.filter('bunanbunv',function(input){   //男女
  if(input == "1"){
      return "男";
    }else if(input == "2"){
      return "女";
    }
    return "未知"
});
