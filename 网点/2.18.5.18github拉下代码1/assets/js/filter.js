import Vue from "vue"
import moment from "moment"

Vue.filter('moment', function (input, fmtstring) {
    if (!input) return "";
    return moment(input).format(fmtstring);
});
Vue.filter('type', function(input) {
  if(input==="01"){
    return "推荐好友"
  }else if(input==="02"){
     return "完成服务"
   }else if(input==="03"){
     return "完成评价"
   }else if(input==="04"){
     return "推荐注册"
   }
   return "无"
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

Vue.filter("floating",function(input){
  let sum=input.toString();
      if(sum.indexOf(".")!==-1)return sum.substring(0,sum.indexOf(".")+2);
      return input;
});
Vue.filter("masterList",function(input){
  if(input === "Leisure"){
      return "空闲中"
  }else if(input === "Working"){
    return "工作中"
  }else if(input === "Working"){
    return "请假中"
  }
})
Vue.filter('masterLevel',function(input){
  if("Primary"==input){
    return "初级师傅";
  }else if("MiddleRank"==input){
    return "中级师傅";
  }else if("Advanced"==input){
    return "高级师傅";
  }
});
Vue.filter('Emergencydegree',function(input){
  if("0"===input){
    return "正常";
  }else if("1"===input){
    return "加急";
  }
  return "无"
});
Vue.filter('FLabelBusiness',function(input){
  if("001"===input){
    return "家电清洗";
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
//
Vue.filter('channelWarranty',function(input){
  if("1"===input){
    return "保内"
  }else if("2"===input){
    return "保外"
  }else{
    return "无"
  }
})
Vue.filter('typeImg',function(input){
  if("1"===input){
    return "/static/images/return.png"
  }else if("2"===input){
    return "/static/images/once.png"
  }else if("3"===input){
    return "/static/images/order.png"
  }else if("4"===input){
    return "/static/images/subscribe.png"
  }else if("5"===input){
    return "/static/images/enterprise.png"
  }else{
    return "/static/images/noImg.png"
  }
})

