<template>
  <div>
      <div class="detailAlert"></div>   <!--背阴-->
      <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>账号详情</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <!-- 账号详情start -->
            <div v-if="is_edit">
                <div class="edit">
                    <img src="../../../../assets/images/details.jpg"  width="19px" height="20px" @click="edit_details">
                    <span> 编辑详情</span>
                </div>
                <div class="details-content">
                <ul>
                    <li>
                        <span>角色</span>
                        <span>{{detailsList.roleId|roles}}</span>
                    </li>
                    <li>
                        <span>登陆账号</span>
                        <span>{{detailsList.account}}</span>
                    </li>
                    <li>
                        <span>登陆密码</span>
                        <span>{{detailsList.password}}</span>
                    </li>
                    <li>
                        <span>真实姓名</span>
                        <span>{{detailsList.linkmanName}}</span>
                    </li>
                    <li>
                        <span>手机号</span>
                        <span>{{detailsList.linkmanTelephone}}</span>
                    </li>
                    <li>
                        <span>邮箱</span>
                        <span>{{detailsList.linkmanEmail}}</span>
                    </li>
                    <li>
                        <span>关联子渠道</span>
                        <span>{{detailsList.label}}</span>
                    </li>
                    <li>
                        <span>状态</span>
                        <span>{{detailsList.state|states}}</span>
                    </li>
                    <li>
                        <span>最近登录时间</span>
                        <span>{{detailsList.loginTime}}</span>
                    </li>
                </ul>
                </div>  
                <div class="btn" >
                    <el-button type="primary" @click="close">关闭</el-button>
                </div>   
            </div> 
            <!--账号详情end  -->

            <!-- 修改账号详情start -->            
            <div v-else>
                <div class="details-list">
                    <ul>
                        <li>
                            <label>角色<span>*</span></label>
                            <el-select v-model="role_name" clearable placeholder="请选择" id="roles">
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
                                placeholder="请输入登录账号"
                                v-model="account"
                                :disabled="true"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <label>登录密码<span>*</span></label>
                            <el-input
                                placeholder="请输入登录密码"
                                v-model="password"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <label>真实姓名<span>*</span></label>
                            <el-input
                                placeholder="请输入真实姓名"
                                v-model="name"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <label>手机号<span>*</span></label>
                            <el-input
                                placeholder="请输入手机号"
                                v-model="tel"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <label>邮箱</label>
                            <el-input
                                placeholder="请输入邮箱"
                                v-model="email"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <label>关联子渠道<span>*</span></label>
                            <el-select v-model="channel" clearable placeholder="请选择">
                                <el-option
                                v-for="(item,index) in sub_channel"
                                :key="index"
                                :label="item.id"
                                :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                        <span>状态</span>
                        <span>{{detailsList.state|states}}</span>
                    </li>
                    <li>
                        <span>最近登录时间</span>
                        <span>{{detailsList.loginTime}}</span>
                    </li>
                    </ul>
                </div>
            <!-- 底部按钮 -->
                <div class="btns">
                    <el-button @click="sign_out">不修改退出</el-button>
                    <el-button type="primary" round>修改并保存</el-button>
                </div>
            </div>
            <!-- 修改账号详情end -->
     </div>
  </div>
</template>
<script>
    export default{
      components:{
        
      },
      props:['detailsList'],
      created(){
         this.role_name=this.detailsList.roleId==="SuperAdmin"?"超级管理员":"管理员";
         console.log(this.detailsList,"编辑账号")
         this.account=this.detailsList.account;

      },
      data(){
          return{
           is_edit:true,
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
           sub_channel:[
               {"id":"","name":"子渠道1"},
               {"id":"","name":"子渠道2"},
               {"id":"","name":"子渠道3"}
           ]
          }
      },
      methods:{
          close(){
              let isbool = false;
              this.$emit('isDetails',isbool)
          },
          edit_details(){
            this.is_edit = false;  
            console.log(this.detailsList,"父值")        
          },
          sign_out(){
              let isdet = false;
              this.is_edit = true; 
              this.$emit("isDetails",isdet);
          }
         
      }
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
  .edit{
      font-size:16px;
      color:#20A0FF;
      margin-top: 35px;
      margin-left: 717px;
      width:200px;
      span{
          display: inline-block;
          transform: translateY(-5px)        
      }
      img:hover{
          cursor:pointer;
      }
  }
  .details-content{
      width:100%;
      margin-top: 40px;
      //background: red;
      ul {
          li{
              color: #5E6D82;
              height:14px;
              font-size: 14px;
              margin-bottom: 22px;
              //width:500px;
              span:nth-of-type(1){
                  margin-right:26px;
              }
          }
          li:nth-of-type(1){
              margin-left:124px;
          }
          li:nth-of-type(2),li:nth-of-type(3),li:nth-of-type(4){
              margin-left:96px;
              margin-top: 22px;
          }
          li:nth-of-type(5){
              margin-left:110px;
          }
          li:nth-of-type(6){
              margin-left:124px;
          }
          li:nth-of-type(7){
              margin-left:81px;
          }
          li:nth-of-type(8){
              margin-left:123px;
          }
          li:nth-of-type(9){
              margin-left:64px;
          }
      }
  }
   .btn{
          margin-left:348px;
          bottom:40px;
          position:absolute;
          //transform: translateY(200px);
          //margin-top:100px;
          .el-button{
              width: 140px;
              height:36px;
              //margin-right: 10px;
          }
      }
//修改账号详情样式
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
li:nth-of-type(8){
        margin-left:123px;
        margin-bottom:0px;
        span:nth-of-type(1){
            margin-right:15px;
        }
    }
li:nth-of-type(9){
    margin-left:64px;
    span:nth-of-type(1){
            margin-right:15px;
        }
    }
}
.btns{
    margin-left:266px;
    bottom:40px;
    position:absolute;
    //transform: translateY(90px);
    //margin-top:100px;
    .el-button{
        width: 140px;
        margin-right: 10px;
    }
}
</style>

