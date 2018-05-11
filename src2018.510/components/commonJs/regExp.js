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
    }else if((k==="name"||k==='emergencyContact'||k==="username"||k==="linkmanName"||k==="account")&&sit!=="advertiseme"){
      k==="emergencyContact"?str="紧急联系人姓名":str="姓名";
      if(sit&&sit==="network"){
        if(k==="username"){
            str="用户名"
        }else if(k==="linkmanName"){
            str="联系人名称"
        }else{
          str="网点名称"
        }
      }else if(sit==="channel"&&k==="name"){
          str="渠道名称"
      }else if(sit==="channel"&&k==="account"){
        str="用户名"
      }else if((sit==="channel"||sit==="addOrder")&&k==="linkmanName"){
        str="联系人名称"
      }else if(sit==="advertiseme"){
        str="广告名称"
      }

      if(data[k]===""||data[k].length===0||data[k].length>=20){
        _this.$message({
          message: `请填写${str}，长度不超过20字符，不可输入标点符号`,
        });
        return false
      }
      if(!nameTest.test(data[k])){
         _this.$message({
          message: '请输入英文字母或中文',
        });
        return false
      }
    }else if(k==="phoneNum"||k==="emergencyPhoneNum"||k==="linkmanPhoneNum"||k==="linkmanTelephone"){
      k==="emergencyPhoneNum"?str="紧急联系人":str="";
        if(data[k].length<=0||data[k]===''){
          _this.$message({
            message: `请填写${str}手机号，长度为11位数字`,
          });
          return false
        }
        if(!letTest.test(data[k])){
          _this.$message({
            message: `请输入正确的${str}手机号`,
          });
          return false
        }
    }else if(k==="idNum"){
      if(data[k].length<=0||data[k]===''){
      _this.$message({
        message: '请填写身份证号码',
      });
      return false
    }
    if(!ID.test(data[k])){
      _this.$message({
        message: '请填写有效的身份证号码',
      });
      return false
    }
    }else if(k==="companyTel"||k==="companyTelephone"){
      if(!isPhone.test(data[k])){
        _this.$message({
          message: '请输入有效的公司电话',
        });
        return false
      }
    }else if(k==="password"){
        if(data[k]===""){
          _this.$message({
            message: '密码不可为空',
          });
          return false
        }
        if(data[k].length>16){
          _this.$message({
            message: '密码不可超过16位字符,不可纯数字',
          });
          return false
        }
    }else if(k==="headquarterAddress"){
      if(data[k]===""){
        _this.$message({
          message: '请填写详细地址',
        });
        return false;
      }
      if(data[k].length>=60){
        _this.$message({
          message: '请填写详细地址，长度不超过60个字符',
        });
        return false;
      }
    }else if(k==="bankOfDeposit"){
        if(data[k]===""){
          _this.$message({
            message: '请填写开户行',
          });
          return false;
        }
    }else if(k==="cardNumber"){
        if(data[k]===""){
          _this.$message({
            message: '请填写卡号',
          });
          return false;
        }
        if(!(data[k].length>=7)||!(data[k].length<=28)){
          _this.$message({
            message: '请输入8位到28位数的卡号',
          });
          return false;
      }
    }else if(k==="remark"&&sit==="advertiseme"){
      if(data[k].length>=100){
        _this.$message({
          message: '请填写广告内容，字符长度不可超过100个字符',
        });
        return false;
      }
    }else if(k==="sort"&&sit==="advertiseme"){
      if(data[k]===""){
        _this.$message({
          message: '请选择顺序',
        });
        return false;
      }
    }else if(k==="url"&&sit==="advertiseme"){
      if(data[k]===""){
        _this.$message({
          message: '请输入跳转链接',
        });
        return false;
      }
    }else if(k==="content"){
      if(data[k]===""){
        _this.$message({
          message: '请输入消息内容',
        });
        return false;
      }
    }else if(k==="linkmanAreaId"){
      if(data[k]===""){
        _this.$message({
          message: '请选择服务区域',
        });
        return false;
      }
    }else if(k==="userRoleId"){
      if(data[k]===""){
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
  }else if(!data["areaId"]){
    _this.$message({
      message: '请选择服务区域',
    });
    return false
  }else if(!data["skillId"]){
    _this.$message({
      message: '请选择主营业务',
    });
    return false
  }
  return true;
}
