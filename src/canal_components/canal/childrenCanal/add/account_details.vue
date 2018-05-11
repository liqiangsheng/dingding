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
                        <span>{{input_list.roleId|roles}}</span>
                    </li>
                    <li>
                        <span>登陆账号</span>
                        <span>{{input_list.account}}</span>
                    </li>
                    <!-- <li>
                        <span>登陆密码</span>
                        <span>{{input_list.password}}</span>
                    </li> -->
                    <li>
                        <span>真实姓名</span>
                        <span>{{input_list.linkmanName}}</span>
                    </li>
                    <li>
                        <span>手机号</span>
                        <span>{{input_list.linkmanTelephone}}</span>
                    </li>
                    <li>
                        <span>邮箱</span>
                        <span>{{input_list.linkmanEmail}}</span>
                    </li>
                    <li>
                        <span>关联子渠道</span>
                        <span>{{childnameStr}}</span>
                    </li>
                    <li>
                        <span>状态</span>
                        <span>{{input_list.state|states}}</span>
                    </li>
                    <li>
                        <span>最近登录时间</span>
                        <span>{{loginTime}}</span>
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
                        <!-- <li>
                            <label>登录密码<span>*</span></label>
                            <el-input
                                placeholder="请输入登录密码"
                                v-model="password"
                                clearable>
                            </el-input>
                        </li> -->
                        <li>
                            <label>登录密码<span>*</span></label>
                            <el-button style="background:#20a0ff" type="primary" @click="open3">
                                修改密码
                            </el-button>
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
                        <li v-if="isSubChannel" class="childchanel">
                        <label>关联子渠道<span>*</span></label>                       
                            <el-select v-model="channel" clearable placeholder="请选择" @change="selectone">
                                <el-option                           
                                v-for="(item,index) in sub_channel"
                                :key="index"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                            </el-select>                      
                            <el-tag class="el-tag"
                                    v-for="(tag,index ) in select_list"
                                    :key="index"
                                    :closable="true"
                                    @close="handleClose(tag)"
                                    >
                                    {{tag}}
                            </el-tag>
                        </li>
                        <li class="state">
                            <span>状态</span>
                            <span>{{input_list.state|states}}</span>
                        </li>
                        <li class="logintime">
                            <span>最近登录时间</span>
                            <span>{{loginTime}}</span>
                        </li>
                    </ul>
                </div>
            <!-- 底部按钮 -->
                <div class="btns">
                    <el-button @click="sign_out">不修改退出</el-button>
                    <el-button type="primary" @click="submit">修改并保存</el-button>
                </div>
            </div>
            <!-- 修改账号详情end -->
            <Psaaword v-if="psaawordShow" @isClose="isClose" :dataObjID="dataObjId" ></Psaaword>
     </div>
  </div>
</template>
<script>
    import Psaaword from './passwords'
    export default{
      components:{
        Psaaword
      },
      props:['detailsList',"getTableList"],
      created(){
        // console.log(this.detailsList,"!!!!!!!编辑账号")
         this.input_list = this.detailsList.officialPartnerSubsetAccountInfo;
         console.log(this.input_list,"账号详情")
         this.dataObjId = this.input_list.id;
         this.role_name=this.input_list.roleId==="Admin"?"超级管理员":"管理员";    //角色
         //this.password = this.input_list.password                                 //密码
         this.account = this.input_list.account                                   //账号
         this.name =this.input_list.linkmanName                                   //真实姓名
         this.tel = this.input_list.linkmanTelephone                              //手机号
         this.email = this.input_list.linkmanEmail                                //邮箱
         this.loginTime = !this.input_list.recentLogin?"":this.timeTransfer(this.input_list.recentLogin);         //登陆时间
         this.detailsList.subsetAccountRelations.forEach((v,i)=>{
             this.childname.push(v.label);
             this.select_list=this.childname;
             this.childnameStr = this.childname.join();
            // console.log(this.childnameStr,"关联子渠道")
         })

         //获取子渠道ID,名称
         let chiId = JSON.parse(sessionStorage.getItem('userInfo'))
        const url = this.$common.apidomain +'/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId='+chiId[0].id
        this.$http.post(url).then(res=>{
            let data = res.data
            if(data.code==="0000"){
              //  console.log(data,"ziqudao")
                this.sub_channel=data.result;
            }else{
                this.$queryFun.successAlert.call(this,data.error);
            }
        })

      },
      data(){
          return{
           dataObjId:"",         //账单ID
           psaawordShow:false,
           isSubChannel:true,
           input_list:{},
           is_edit:true,
           role_name:"",       //角色
           account:"",         //登录账号
           password:"",        //登录密码
           name:"",            //真实姓名
           tel:"",             //手机号
           email:"",           //邮箱
           channel:"",         //关联子渠道
           childname:[],       //详情子渠道 
           childnameStr:"",
           select_id:[],        //传给后台的子渠道ID
           role_list:[
               {"id":"","name":"超级管理员"},
               {"id":"","name":"管理员"}
           ],
           sub_channel:[], //子渠道来源
           select_list:[],  //去重后的子渠道
           loginTime:''     //登陆时间
           
          }
      },
       watch:{
         role_name(newVal,oldVal){
             this.isSubChannel = newVal==="超级管理员"?false:true;
             //console.log(newVal,oldVal)
         }
      },
      methods:{
          //修改密码
          open3() {
           this.psaawordShow = true;
          },
          isClose(v){
                this.psaawordShow = v;
            },
          timeTransfer(time){
              let date,Y,M,D,h,m,s
                date = new Date(time);
                Y = date.getFullYear() + '-';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                D = date.getDate() + ' ';
                h = date.getHours() + ':';
                m = date.getMinutes() + ':';
                s = date.getSeconds();
                return Y+M+D+h+m+s;
          },
          close(){
              let isbool = false;
              this.$emit('isDetails',isbool)
          },
          selectone(value){
                this.select_list.push(value)
                this.select_list = Array.from(new Set(this.select_list))                                     
          },
          handleClose(tag) {
                this.select_list.splice(this.select_list.indexOf(tag), 1);
            },
          edit_details(){
            this.is_edit = false;  
           // console.log(this.detailsList,"父值")        
          },
          sign_out(){
              let isdet = false;
              this.is_edit = true; 
              this.$emit("isDetails",isdet);
          },
          submit(){
                this.select_id=[];
                let roles = this.role_name==="超级管理员"?"Admin":"Manage";
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))[0]
                this.sub_channel.forEach((v,i)=>{
                    this.select_list.forEach((j,k)=>{
                        if(v.name===j){
                            this.select_id.push(v.id);
                        }
                    })
                })
                if(this.role_name==="超级管理员"){
                    roles="Admin";
                }else if(this.role_name==="管理员"){
                    roles="Manage";
                }else{
                    roles=""
                }
                let params = {
                "roleId":roles,
                "account":this.account,
                "password":md5(this.password),
                "linkmanName":this.name,
                "linkmanTelephone":this.tel,
                "linkmanEmail":this.email,
                "officialPartnerId":userInfo.channelId,
                "officialPartnerName":userInfo.fullName,
                "officialPartnerSubsetInfoIdStr":this.select_id.join(),
                "id":this.input_list.id
              }
           const url = this.$common.apidomain +"/officialPartnerSubsetAccountInfo/updateOfficialPartnerSubsetAccountInfo"
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
                            message: '修改成功',
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
          li:nth-of-type(2),li:nth-of-type(3){
              margin-left:96px;
              margin-top: 22px;
          }
          li:nth-of-type(4){
              margin-left:110px;
          }
          li:nth-of-type(5){
              margin-left:124px;
          }
          li:nth-of-type(6){
              margin-left:81px;
          }
          li:nth-of-type(7){
              margin-left:123px;
          }
          li:nth-of-type(8){
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
.childchanel{
    margin-left:74px;
    height:72px
}
.state{
        margin-left:123px;
        height:36px;
        margin-bottom:0px;
        span:nth-of-type(1){
            margin-right:15px;
        }
    }
.logintime{
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
.el-tag{
    width:110px;
    height:36px;
    line-height: 36px;
    text-align: center;
    margin-right: 6px;
}
</style>

