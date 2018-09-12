<template>
  <div>
      <div class="detailAlert"></div>   <!--背阴-->
      <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>新增账号</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <!-- 输入框 -->
            <div class="details-list">
                <ul>
                    <li>
                        <label>角色<span>*</span></label>
                      <el-select v-model.trim="role_name" clearable placeholder="请选择" id="roles">
                            <el-option
                            v-for="(item,index) in role_list"
                            :key="index"
                            :label="item.id"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label>登录账号<span>*</span></label>
                        <el-input
                          placeholder="请填写登录账号"
                          v-model.trim="account"
                          clearable>
                        </el-input>
                    </li>
                    <li>
                        <label>登录密码<span>*</span></label>
                        <el-input
                          placeholder="请填写登录密码"
                          v-model.trim="password"
                          clearable>
                        </el-input>
                    </li>
                    <li>
                        <label>真实姓名<span>*</span></label>
                        <el-input
                          placeholder="请填写真实姓名"
                          v-model.trim="name"
                          clearable>
                        </el-input>
                    </li>
                    <li>
                        <label>手机号<span>*</span></label>
                        <el-input
                          placeholder="请填写手机号"
                          v-model.trim="tel"
                          clearable>
                        </el-input>
                    </li>
                    <li>
                        <label>邮箱</label>
                        <el-input
                          placeholder="请填写邮箱"
                          v-model.trim="email"
                          clearable>
                        </el-input>
                    </li>
                     <li v-if="isSubChannel">
                       <label>关联子渠道<span>*</span></label>
                       <el-select v-model.trim="channel" clearable placeholder="请选择" @change="selectone">
                         <el-option
                            v-for="(item,index) in sub_channel"
                            :key="index"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                       </el-select>
                    </li>
                </ul>
                <div v-if="isSubChannel">
                    <el-tag class="el-tag"
                            v-for="(tag,index ) in select_list"
                            :key="index"
                            :closable="true"
                            @close="handleClose(tag)"
                            >
                            {{tag}}
                    </el-tag>
                </div>
            </div>
            <!-- 底部按钮 -->
            <div class="btn">
                  <el-button @click="close">取消</el-button>
                  <el-button type="primary" @click="submit">确定</el-button>
              </div>
     </div>
  </div>
</template>
<script>
    export default{
      components:{

      },
      props:["getTableList"],
      data(){
          return{
           isSubChannel:true,   //关联子渠道显隐
           selectedOptions:"",  //关联子渠道
           role_name:"",       //角色
           account:"",         //登录账号
           password:"",        //登录密码
           name:"",            //真实姓名
           tel:"",             //手机号
           email:"",           //邮箱
           channel:"",         //关联子渠道
           role_list:[
               {"id":"","name":"超级管理员"},
               {"id":"","name":"管理员"}
           ],
           sub_channel:[],
           select_list:[],
           select_lists:[],   //去重后的数据
           select_id:[],//子渠道Id
          }

      },
      watch:{
         role_name(newVal,oldVal){
             this.isSubChannel = newVal==="超级管理员"?false:true;
             //console.log(newVal,oldVal)
         }
      },
      created(){
        let chiId = JSON.parse(localStorage.getItem('userInfo'))
        const url = this.$common.apidomain +'/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId='+chiId[0].id
        this.$http.post(url).then(res=>{
            let data = res.data
            if(data.code==="0000"){
                //console.log(data,"ziqudao")
                this.sub_channel=data.result;
            }else{
                this.$queryFun.successAlert.call(this,data.error);
            }
        })
      },
      methods:{
          close(){
              let isbool = false;
              this.$emit('isClose',isbool)
          },
          selectone(value){
                this.select_list.push(value)
            this.select_list = Array.from(new Set(this.select_list))
          },
          handleClose(tag) {
                this.select_list.splice(this.select_list.indexOf(tag), 1);
          },
         //提交修改数据
         submit(){
           this.select_id=[];
           let roles = this.role_name==="超级管理员"?"Admin":"Manage";
           let userInfo = JSON.parse(localStorage.getItem('userInfo'))
           this.sub_channel.forEach((v,i)=>{
               this.select_list.forEach((j,k)=>{
                   if(v.name===j){
                       this.select_id.push(v.id);
                   }
               })
           })
          // console.log(this.select_id,"子渠道Id")
          // console.log(userInfo,"主渠道")
           if(this.role_name==="超级管理员"){
               roles="Admin";
           }else if(this.role_name==="管理员"){
               roles="Manage";
           }else{
               roles=""
           }
           const url = this.$common.apidomain + '/officialPartnerSubsetAccountInfo/saveOfficialPartnerSubsetAccountInfo';
           let params = {
                "roleId":roles,
                "account":this.account,
                "password":md5(this.password),
                "linkmanName":this.name,
                "linkmanTelephone":this.tel,
                "linkmanEmail":this.email,
                "officialPartnerId":userInfo.channelId,
                "officialPartnerName":userInfo.fullName,
                "officialPartnerSubsetInfoIdStr":this.select_id.join()
            }
            //console.log(params,"参数")
              if(!this.isSubChannel){
               params.officialPartnerSubsetInfoIdStr = "";
           }
           // console.log(this.isSubChannel,"子渠道")
            if(!params.roleId){
                this.$queryFun.successAlert.call(this,"角色不能为空");
            }else if(!params.account){
                this.$queryFun.successAlert.call(this,"登录账号不能为空");
            }else if(!params.password){
                this.$queryFun.successAlert.call(this,"登陆密码不能为空");
            }else if(!params.linkmanName){
                this.$queryFun.successAlert.call(this,"真实姓名不能为空");
            }else if(!params.linkmanTelephone){
                this.$queryFun.successAlert.call(this,"手机号不能为空");
            }else if(!params.officialPartnerSubsetInfoIdStr && this.isSubChannel){
                this.$queryFun.successAlert.call(this,"关联子渠道不能为空");
            }else{
                    this.$http.post(url,params).then(res=>{
                    let data = res.data
                    if(data.code==="0000"){
                        this.$notify({
                            title: '成功',
                            message: '新建成功',
                            type: 'success'});
                        this.getTableList();
                        this.close();
                        return
                    }else{
                        this.$queryFun.successAlert.call(this,data.error);
                    }
                })
            }
         }
      },
    }
</script>
<style scoped lang="scss">
  .detailAlert{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .detailAlert_box{
    position: relative;
    width: 840px;
    height: 700px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -350px;
    margin-left: -420px;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:44px;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:44px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:#5E6D82;
      line-height:44px;
      text-align: center;
    }
  }
  .details-list{
      margin-top:56px;
      //margin-left:74px;
      ul li{
          font-size:14px;
          height:36px;
          line-height: 36px;
          margin-bottom:14px;
          .el-input{
              width:200px;
          }
          #roles{
              width:400px;
          }
          label{
              margin-right:14px;
              span{
                  color:#EA5413;
                  display: inline-block;
                  transform: translateY(3px);;
              }
          }
      }
      li:nth-of-type(1){
          margin-left:116px;
      }
      li:nth-of-type(2),li:nth-of-type(3),li:nth-of-type(4){
          margin-left:88px;
      }
      li:nth-of-type(5){
         margin-left:102px;
      }
      li:nth-of-type(6){
          margin-left:124px;
      }
      li:nth-of-type(7){
          margin-left:74px;
      }
  }
  .btn{
          margin-left:266px;
          bottom:40px;
          position:absolute;
          //transform: translateY(180px);
          //margin-top:100px;
          .el-button{
              width: 140px;
              margin-right: 10px;
          }
      }
.details-list>div{
    margin-left:166px;
}
.el-tag{
    width:110px;
    height:36px;
    line-height: 36px;
    text-align: center;
    margin-right: 6px;
}
</style>

