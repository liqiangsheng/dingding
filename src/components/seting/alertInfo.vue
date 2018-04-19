<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isDetailed.title}}   <p class="closeX"  id="closeX" @click="close(isDetailed)"></p></h3>
      <div class="content">
        <div class="left_info">
          <ul>
            <li>
              <span class="list_name">用户编号 :</span>
              {{dataObj.id}}
            </li>
            <li>
              <span class="list_name"> 姓名 :</span>
              {{dataObj.fullName}}</li>
            <li>
              <span class="list_name">手机号 :</span>
              <span v-if="!this.isEdit()">
                  {{dataObj.phoneNum}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.phoneNum">
                 </el-input>
              </span>
            </li>
            <li>
              <span class="list_name">角色 :</span>
              <span v-if="!this.isEdit()">
                {{dataObj.userRoleId|userRoleName}}
              </span>
              <span v-else>
              <el-select
                style="width:175px"
                v-model="level.SourceTypeValue" placeholder="请选择"
                @change="selector3(level,level.SourceType,level.SourceTypeValue)">
                <el-option
                  v-for="items in level.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
              </el-option>
              </el-select>
              </span>
            </li>
            <li>
              <span class="list_name">用户名 :</span>
              {{dataObj.name|placeholder}}</li>
            <li>
              <span class="list_name">密码 :</span>
              <span v-if="!this.isEdit()"> {{dataObj.password|placeholder}}</span>
              <el-button v-else @click="changePassword"  type="primary">修改密码</el-button>

            </li>
            <!--可编辑-->
            <li>
              <span class="list_name">最近登陆 :</span>
              {{dataObj.loginTime | moment('YYYY-MM-DD HH:mm:ss')}}</li>
            <li>
              <span class="list_name">登陆次数 :</span>
              {{dataObj.loginCount|placeholder}}
            </li>
            <li v-if="this.isDetailed.data.state==='0'">
              <span class="list_name">禁用原因 :</span>
              <span style="color:red">
                 {{dataObj.remark|placeholder}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>

    <div class="btn">
      <!--<button @click="forbidden">禁用</button>-->
      <button @click="close(isDetailed)">关闭</button>
      <!--<button @click="forbidden" class="forbidden_btn">拒绝</button>-->
      <button @click="edit" class="selector" v-if="isedit">编辑</button>
      <button @click="accomplish(dataObj)" class="selector" v-else>完成</button>
    </div>

    <el-dialog ref="eldialog" style="z-index:999999;"  :visible.sync="dialogTableVisible" size="tiny">
      <ul class="alert_forbidden_text">
        <li>
          <span>请输入密码 :</span>
          <el-input style="width:100%;" v-model="password" placeholder="请确认密码" type="password"></el-input>
          <br><span style="color:red;">{{text}}</span> <br>
          <el-button class="confirm_btn" @click="pas" type="primary">确定修改</el-button>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:["isDetailed","quiry"],
    data(){
      return{
        dialogTableVisible:false,
        isedit:true,//编辑
        text:"",
        password:"",
        userRoleName:"",
        level: {
          name: "角色",
          key: "userRoleId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        dataObj:{},
      }
    },
    created(){
      this.dataObj=this.isDetailed.data
      let url=this.$apidomain+"/common/findSysUserRole";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.level.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v2)=>{
          this.level.SourceType.push({"id":v2.id,"value":v2.name});
          if(this.dataObj["userRoleId"]===v2.id){
              this.level.SourceTypeValue=v2.name;
              this.userRoleName=v2.name;
          }
        });
      })
    },
    methods: {
      pas(){
          if(!this.password){
            return this.text="请输入密码...";
          }
          let o={
            "id":this.dataObj.id,
            "password":md5(this.password)
          };
        let url=this.$apidomain+"/sysUser/updatePassword";
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if(data.code==="0000"){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.dialogTableVisible=false;
            }else{
              this.$message.error(data.error);
            }
          })
      },

      changePassword(){
        this.dialogTableVisible=true;
        document.querySelector(".el-dialog--tiny").style.width="350px"
      },
      selector3(item,values,SourceTypeValue){       //选中后的下拉列表
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj.level=v.id;
          }
        })
      },

      //编辑模块
      isEdit(){
        return this.$store.state.isEdit;
      },
      refuse(){
        return this.$store.state.refuse
      },
      accomplish(prams){ //完成编辑
        let url=this.$apidomain+"/sysUser/update",
            params={
              "phoneNum":prams.phoneNum,
              "id":prams.id,
              "userRoleId":prams.level,
              "fullName":prams.fullName,
              "password":this.password
            };
        this.$http.post(url,params).then(res=>{
          let data = res.data;
          if(data.code==="0000"){
            this.isedit=true;
            this.$store.commit("edit",false);
            this.quiry();
            this.isDetailed.isShow=false;
          }else{
            this.$message.error(data.error);
          }
        })
      },
      edit(){  //编辑
        this.isedit=false;
        this.$store.commit("edit",true)
      },
      forbidden(){ //禁用数据

      },
      //编辑模块结束
      close(isShow){   //关闭弹窗
        isShow.isShow=false;
        this.$store.commit("edit",false);
      },
      refuse(){
        return this.$store.state.refuse
      },

    },
    mounted() {

    },
    watch:{

    }
  }
</script>
<style lang="scss">

  .el-select-dropdown, .el-cascader-menus, .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-input{
    /*line-height: 59px !important;*/
  }
</style>
<style scoped lang="scss">
  @import "../../assets/styles/commButton";

  .alert_forbidden_text{
    text-align: center;
    li{
      line-height: 20px;
      >span{
        margin-bottom:10px;
        display: block;
        text-align: left;
      }
    }
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;

    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      height: 78%;
      width:100%;
      display:flex;
      overflow-y: auto;
      >div{

        flex:1;

        >ul{
          >li{
            line-height: 50px;
            >ul{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                margin-bottom:30px;
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
          }
        }
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
      >.list_name{
        margin-right:10px;
        width:98px;
      }
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
   .closeX{
    background:url(../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }

</style>

