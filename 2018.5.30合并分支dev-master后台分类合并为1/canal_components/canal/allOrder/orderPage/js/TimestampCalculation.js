export function TimestampCalculation(timestamp) {

      if(timestamp == "09:00-10:00"){
        return 36000000;
      }else if(timestamp == "10:00-11:00"){
        return 39600000;
      }else if(timestamp == "11:00-12:00"){
        return 43200000;
      }else if(timestamp == "12:00-13:00"){
        return 46800000;
      }else if(timestamp == "13:00-14:00"){
        return 50400000;
      }else if(timestamp == "14:00-15:00"){
        return 54000000;
      }else if(timestamp == "15:00-16:00"){
        return 57600000;
      }else if(timestamp == "16:00-17:00"){
        return 61200000;
      }else if(timestamp == "17:00-18:00"){
        return 64800000;
      }else if(timestamp == "18:00-19:00"){
        return 68400000;
      }else if(timestamp == "19:00-20:00"){
        return 72000000;
      }
}
export function isJudge(input1,input2,selectedOptions2,selectedOptions1,input4,input5,timeOptions) {
  if(input1 == ""){
    return this.$queryFun.successAlert.call(this,"请填写联系人")
  }

  if(input2 == ""){
    return this.$queryFun.successAlert.call(this,"请填写联系人手机");

  }
  let reg =  /^1\d{10}$/;
  if(reg.test(input2)==false){
    return this.$queryFun.successAlert.call(this,"请填写正确手机号");
  }
  if(selectedOptions2.length<=0||selectedOptions1.length<=0){
    return this.$queryFun.successAlert.call(this,"请填写服务地区");
  }
  if(input4 == ""){
    return this.$queryFun.successAlert.call(this,"请填写详细地址");
  }
  if(input5 == ""){
    return this.$queryFun.successAlert.call(this,"请填写预约时间");
  }
  if(timeOptions == ""){
    return this.$queryFun.successAlert.call(this,"请填写预约时间段");
  }

}
export function IsFenlei(a,b){
  if("001"== a){
   return b = "家电清洗";
  }else if("002"== a){
    return b = "家电维修";
  }else if("003"== a){
    return b= "手机维修";
  }else if("004" == a){
    return  b =  "家居维修";
  }else if("005"== a){
    return  b = "开锁修锁";
  }else if("006"== a){
    return b = "管道疏通";
  }else if("007"==a){
    return b = "灯具线路";
  }else if("008"== a){
    return b = "卫浴洁具";
  }else if("009"== a){
    return b= "安装服务";
  }
}
