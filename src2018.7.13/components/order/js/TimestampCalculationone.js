export function TimestampCalculation(timestamp) {
  if (timestamp == "00:00-01:00") {
    return 3600000;
  } else if (timestamp == "01:00-02:00") {
    return 7200000;
  } else if (timestamp == "02:00-03:00") {
    return 10800000;
  } else if (timestamp == "03:00-04:00") {
    return 14400000;
  } else if (timestamp == "04:00-05:00") {
    return 18000000;
  } else if (timestamp == "05:00-06:00") {
    return 21600000;
  } else if (timestamp == "06:00-07:00") {
    return 25200000;
  } else if (timestamp == "07:00-08:00") {
    return 28800000;
  } else if (timestamp == "08:00-09:00") {
    return 31400000;
  } else if (timestamp == "09:00-10:00") {
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
  } else if (timestamp == "20:00-21:00") {
    return 75600000;
  } else if (timestamp == "21:00-22:00") {
    return 79200000;
  } else if (timestamp == "22:00-23:00") {
    return 82800000;
  } else if (timestamp == "23:00-00:00") {
    return 86400000;
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
   return b = "家电保养";
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

export function ArraySlice(length123) {
  let a, b, c, d, e, f;
  let abcdefg = [];
  if (length123.length == 18) {
    a = length123.substring(3, -3);
    b = length123.substring(6, -6);
    c = length123.substring(9, -9);
    d = length123.substring(12, -12);
    e = length123.substring(15, -15);
    f = length123.substring(18, -18);
    return abcdefg = [a, b, c, d, e, f];
  } else if (length123.length == 15) {
    a = length123.substring(3, -3);
    b = length123.substring(6, -6);
    c = length123.substring(9, -9);
    d = length123.substring(12, -12);
    e = length123.substring(15, -15);
    return abcdefg = [a, b, c, d, e];
  }
  else if (length123 == 12) {
    a = length123.substring(3, -3);
    b = length123.substring(6, -6);
    c = length123.substring(9, -9);
    d = length123.substring(12, -12);
    return abcdefg = [a, b, c, d];
  } else if (length123.length == 9) {
    a = length123.substring(3, -3);
    b = length123.substring(6, -6);
    c = length123.substring(9, -9);
    return abcdefg = [a, b, c];
  } else if (length123.length == 6) {
    a = length123.substring(3, -3);
    b = length123.substring(6, -6);
    return abcdefg = [a, b];
  }
}
