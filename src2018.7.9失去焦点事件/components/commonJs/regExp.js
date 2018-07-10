export function testReg(data,_this,sit){
  let  nameTest=new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$"),
       letTest= new RegExp("^((13[0-9])|(14[5|7])|(15([0-3]|[0-9]))|(18[0,0-9])|(17[0,0-9]))\\d{8}$"),
          ID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, str,
          isPhone = /^([0-9]{3,4}-)?[0-9]{7,10}$/;
          // pass = new RegExp('(.*[0-9])(.*[a-zA-Z])(.*[^a-zA-Z0-9]).{8,16}');
  for(let k in data){
    if(sit==="advertiseme"&&k==="name"){
      if(data[k].length>20||!data[k]) {
        _this.$message({message: `请填写正确的广告名称，长度不超过20字符`,});
        return false
      }
    // ||k==='emergencyContact'
    }else if ((k === "name" || k === "username" || k === "linkmanName" || k === "account")) {
      if (sit !== "advertiseme") {
        k === "emergencyContact" ? str = "朋友姓名" : str = "姓名";
        if (sit && sit === "network") {
          if (k === "username") {
            str = "用户名"
          } else if (k === "linkmanName") {
            str = "联系人名称"
          } else {
            str = "网点名称"
          }
        } else if (sit === "channel" && k === "name") {
          str = "渠道名称"
        } else if (sit === "channel" && k === "account") {
          str = "用户名"
        } else if ((sit === "channel" || sit === "addOrder") && k === "linkmanName") {
          str = "联系人名称"
        } else if (sit === "advertiseme") {
          str = "广告名称"
        }
        console.log(data)
        if (data[k] === "" || data[k].length === 0 || data[k].length >= 20) {
          _this.$message({
            message: `请填写${str}，长度不超过20字符，不可输入标点符号`,
          });
          return false
        }
        if (!nameTest.test(data[k])) {
          _this.$message({
            message: '请填写英文字母或中文',
          });
          return false
        }
      } else if (k === "phoneNum" || k === "linkmanPhoneNum" || k === "linkmanTelephone") {
        // k==="emergencyPhoneNum"||

        k === "emergencyPhoneNum" ? str = "朋友" : str = "";
        if (data[k].length <= 0 || data[k] === '') {
          _this.$message({
            message: `请填写${str}手机号，长度为11位数字`,
          });
          return false
        }
        if (!letTest.test(data[k])) {
          _this.$message({
            message: `请填写正确的${str}手机号`,
          });
          return false
        }
      } else if (k === "idNum") {
        if (data[k].length <= 0 || data[k] === '') {
          _this.$message({
            message: '请填写身份证号码',
          });
          return false
        }
        if (!ID.test(data[k])) {
          _this.$message({
            message: '请填写有效的身份证号码',
          });
          return false
        }
      }
      // else if(k==="companyTel"||k==="companyTelephone"){
      //   if(!isPhone.test(data[k])){
      //     _this.$message({
      //       message: '请填写有效的公司电话',
      //     });
      //     return false
      //   }
      // }
      else if (k === "password") {
        if (data[k] === "") {
          _this.$message({
            message: '密码不可为空',
          });
          return false
        }
        if (data[k].length > 16) {
          _this.$message({
            message: '密码不可超过16位字符,不可纯数字',
          });
          return false
        }
      }
      // else if(k==="headquarterAddress"){
      //   if(data[k]===""){
      //     _this.$message({
      //       message: '请填写详细地址',
      //     });
      //     return false;
      //   }
      //   if(data[k].length>=60){
      //     _this.$message({
      //       message: '请填写详细地址，长度不超过60个字符',
      //     });
      //     return false;
      //   }
      // }
      // else if(k==="bankOfDeposit"){
      //     if(data[k]===""){
      //       _this.$message({
      //         message: '请填写开户行',
      //       });
      //       return false;
      //     }
      // }
      // else if(k==="cardNumber"){
      //     if(data[k]===""){
      //       _this.$message({
      //         message: '请填写卡号',
      //       });
      //       return false;
      //     }
      //     if(!(data[k].length>=7)||!(data[k].length<=28)){
      //       _this.$message({
      //         message: '请填写8位到28位数的卡号',
      //       });
      //       return false;
      //   }
      // }
      else if (k === "remark" && sit === "advertiseme") {
        if (data[k].length >= 100) {
          _this.$message({
            message: '请填写广告内容，字符长度不可超过100个字符',
          });
          return false;
        }
      } else if (k === "sort" && sit === "advertiseme") {
        if (data[k] === "") {
          _this.$message({
            message: '请选择顺序',
          });
          return false;
        }
      } else if (k === "url" && sit === "advertiseme") {
        if (data[k] === "") {
          _this.$message({
            message: '请填写跳转链接',
          });
          return false;
        }
      } else if (k === "content") {
        if (data[k] === "") {
          _this.$message({
            message: '请填写消息内容',
          });
          return false;
        }
      } else if (k === "linkmanAreaId") {
        if (data[k] === "") {
          _this.$message({
            message: '请选择服务区域',
          });
          return false;
        }
      } else if (k === "userRoleId") {
        if (data[k] === "") {
          _this.$message({
            message: '请选择角色',
          });
          return false;
        }
      }
    } else if (k === "phoneNum" || k === "linkmanPhoneNum" || k === "linkmanTelephone") {
      // k==="emergencyPhoneNum"||
      k === "emergencyPhoneNum" ? str = "朋友" : str = "";
      if (data[k].length <= 0 || data[k] === '') {
        _this.$message({
          message: `请填写${str}手机号，长度为11位数字`,
        });
        return false
      }
      if (!letTest.test(data[k])) {
        _this.$message({
          message: `请填写正确的${str}手机号`,
        });
        return false
      }
    } else if (k === "idNum") {
      if (data[k].length <= 0 || data[k] === '') {
        _this.$message({
          message: '请填写身份证号码',
        });
        return false
      }
      if (!ID.test(data[k])) {
        _this.$message({
          message: '请填写有效的身份证号码',
        });
        return false
      }
    }
// else if(k==="companyTel"||k==="companyTelephone"){
//   if(!isPhone.test(data[k])){
//     _this.$message({
//       message: '请填写有效的公司电话',
//     });
//     return false
//   }
// }
    else if (k === "password") {
      if (data[k] === "") {
        _this.$message({
          message: '密码不可为空',
        });
        return false
      }
      if (data[k].length > 16) {
        _this.$message({
          message: '密码不可超过16位字符,不可纯数字',
        });
        return false
      }
    }
// else if(k==="headquarterAddress"){
//   if(data[k]===""){
//     _this.$message({
//       message: '请填写详细地址',
//     });
//     return false;
//   }
//   if(data[k].length>=60){
//     _this.$message({
//       message: '请填写详细地址，长度不超过60个字符',
//     });
//     return false;
//   }
// }
// else if(k==="bankOfDeposit"){
//     if(data[k]===""){
//       _this.$message({
//         message: '请填写开户行',
//       });
//       return false;
//     }
// }
// else if(k==="cardNumber"){
//     if(data[k]===""){
//       _this.$message({
//         message: '请填写卡号',
//       });
//       return false;
//     }
//     if(!(data[k].length>=7)||!(data[k].length<=28)){
//       _this.$message({
//         message: '请填写8位到28位数的卡号',
//       });
//       return false;
//   }
// }
    else if (k === "remark" && sit === "advertiseme") {
      if (data[k].length >= 100) {
        _this.$message({
          message: '请填写广告内容，字符长度不可超过100个字符',
        });
        return false;
      }
    } else if (k === "sort" && sit === "advertiseme") {
      if (data[k] === "") {
        _this.$message({
          message: '请选择顺序',
        });
        return false;
      }
    } else if (k === "url" && sit === "advertiseme") {
      if (data[k] === "") {
        _this.$message({
          message: '请填写跳转链接',
        });
        return false;
      }
    } else if (k === "content") {
      if (data[k] === "") {
        _this.$message({
          message: '请填写消息内容',
        });
        return false;
      }
    } else if (k === "linkmanAreaId") {
      if (data[k] === "") {
        _this.$message({
          message: '请选择服务区域',
        });
        return false;
      }
    } else if (k === "userRoleId") {
      if (data[k] === "") {
        _this.$message({
          message: '请选择角色',
        });
        return false;
      }
    }
  }
  return true;
}

export function imageExp(data,_this,site){
  return true;
  if((data["shengfenzhengfanmian"]&&data["benrenzhaopian"]&&data["zige"]&&data["shengfenzhengzhengmian"])||site) {
    return true;
  }else{
    _this.$message({
      message: '请上传图片格式jpg png gif',
     });
    return false
  }
}
export function selectorExp(data,_this){
    if(!data["level"]){
      _this.$message({
        message: '请选择师傅等级',
      });
      return false
    }else if(!data["type"]){
      _this.$message({
        message: '请选择师傅类型',
      });
      return false
    }else if(!data["cityId"]){
      _this.$message({
        message: '请选择城市',
      });
      return false
    }else if(!data["areaIds"]){
      _this.$message({
        message: '请选择服务区域',
      });
      return false
    }else if(!data["skillIds"]){
      _this.$message({
        message: '请选择服务工种',
      });
      return false
    }
    return true;
}
export function selectorExpSite(data,_this){
  if(!data["cityId"]){
    _this.$message({
      message: '请选择城市',
    });
    return false
  }else if(!data["areaIds"]){
    _this.$message({
      message: '请选择服务区域',
    });
    return false
  }else if(!data["skillIds"]){
    _this.$message({
      message: '请选择主营业务',
    });
    return false
  }
  return true;
}
//失去焦点事件方法
let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
let res1 = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
let reg = /^1\d{10}$/;
let reg2 = /^(\d{16})|(\d{17})|(\d{18})|(\d{19})$/;
let reg1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export function blurFun(key,value,isbool){
      if(key == "username"  && value == ""){
        return isbool = "请填写用户名"
      }else if(key == "username"  && value != ""){
        if(res2.test(value)==false){
          return isbool =  "请填写用户名，长度不超过20字符，不可输入特殊符号数字";
        }else{
          return  isbool = "";
        }
      }else if(key == "name"  && value == ""){
       return isbool = "请填写师傅姓名"
     }else if(key == "name"  && value != ""){
       if(res2.test(value)==false){
         return isbool =  "请填写师傅姓名，长度不超过20字符，不可输入特殊符号数字";
       }else{
         return  isbool = "";
       }
     }else if(key == "phoneNum" && value == ""){
       return isbool = "请填写师傅手机号"
     }else if(key == "phoneNum" && value != ""){
        if(reg.test(value) == false){
          return isbool = "请填写正确师傅手机号，长度为11位数字";
        }else{
          return isbool = "";
        }
     }else if(key == "idNum" && value != ""){
       if(reg1.test(value) == false){
         return isbool = "请填写正确身份证号码";
       }else{
         return isbool = "";
       }
     }else if(key == "idNum" && value == ""){
       return  isbool = "请填写身份证号码";
     }else if(key == "emergencyContact" && value != ""){
       if(res2.test(value)==false){
         return isbool =  "请填写朋友，长度不超过20字符，不可输入特殊符号数字";
       }else{
         return  isbool = "";
       }
     }else if(key == "emergencyPhoneNum" && value != ""){
       if(reg.test(value) == false){
         return  isbool = "请填写正确朋友手机号，长度为11位数字";
       }else{
         return isbool = "";
       }
     }else if(key == "cardNumber" && value != ""){
          if(reg2.test(value) == false){
            return  isbool = "请填写正确银行卡号，长度为16-19纯数字";
          }else{
            return isbool = "";
          }
     }else if(key == "companyTel" && value != ""){
       let ress = /^0-9{11}$/;
       if(ress.test(value)){
         return  isbool = "请填写公司电话，长度为11纯数字";
       }else{
         return  isbool = "";
       }
     }else if(key == "linkmanName" && value == ""){
         return  isbool = "请填写联系人";

     }else if(key == "linkmanName" && value != ""){
          if(res2.test(value)==false){
            return isbool = "请填写联系人，长度不超过20字符，不可输入特殊符号数字";
          }else{
            return isbool = "";
          }
      }else if(key == "linkmanPhoneNum" && value == ""){
        return  isbool = "请填写联系人手机号";
      }else if(key == "linkmanPhoneNum" && value != ""){
        if(reg.test(value)==false){
          return isbool = "请填写联系人手机号，长度为11纯数字";
        }else{
          return isbool = "";
        }
      }else if(key == "account" && value == ""){
        return  isbool = "请填写登陆账号";

      }else if(key == "account" && value != ""){
        if(res2.test(value)==false){
          return isbool = "请填写登陆账号，长度不超过20字符，不可输入特殊符号数字";
        }else{
          return isbool = "";
        }
      }else if(key == "password" && value == ""){
        return  isbool = "请填写登陆密碼";
      }else if(key == "password" && value != "" &&value.length < 6){
        return  isbool = "密碼长度不能小于6";
      }else if(key == "linkmanTelephone" && value == ""){
        return  isbool = "请填写联系电话";
      }else if(key == "linkmanTelephone" && value != ""){
        if(reg.test(value)==false){
          return isbool = "请填写联系电话，长度为11纯数字";
        }else{
          return isbool = "";
        }
      }

}
