<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <h3 class="list_name title"> 子账号详情<p class="closeX" id="closeX" @click="close(isDetailed)"><i></i></p></h3>
      <div class="content">
        <div class="left_info">
          <ul>
            <li>
              <div class="list_name">子渠道:</div>
               <span v-if="!this.isEdit()">
                   {{dataObj.officialPartnerSubsetName}}
              </span>
            <span v-else>
              <el-select
                v-model="city.SourceTypeValue" placeholder="请选择"
                @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
                 <el-option
                  v-for="items in city.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              </span>
            </li>
            <li>
              <div class="list_name">角色:</div>
              <span v-if="!this.isEdit()">
                {{dataObj.roleId|childRole}}
              </span>
              <span v-else>
              <el-select
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
              <div class="list_name">账号:</div>{{dataObj.account}}</li>

            <li>
              <div class="list_name">
                联系人:
              </div>
              <span v-if="!this.isEdit()">
                  {{dataObj.linkmanName}}
              </span>
              <span v-else>
                  <el-input
                    style="width:200px"
                    placeholder="请输入内容"
                    v-model="dataObj.linkmanName">
                 </el-input>
              </span>
            </li>
            <li>
              <div class="list_name">
                手机号:
              </div>
              <span v-if="!this.isEdit()">
                  {{dataObj.linkmanTelephone}}
              </span>
              <span v-else>
                  <el-input style="width:200px"
                    placeholder="请输入内容"
                    v-model="dataObj.linkmanTelephone">
                 </el-input>
              </span>
            </li>
            <li>
              <div class="list_name">
                状态:
              </div>
              <span>
                {{dataObj.state|childState}}
              </span>
            </li>
             <li>
              <div class="list_name">
                最近登录时间 :
              </div>{{dataObj.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</li>
          </ul>
        </div>
      </div>

    </div>
    <div class="btn">
      <button @click="close(isDetailed)">关闭</button>
      <button @click="edit" class="selector" v-if="isedit">编辑</button>
      <button @click="accomplish(dataObj)" class="selector" v-else>完成</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:["isDetailed","quiry"],
    data(){
      return{
        isedit:true,//编辑
        city: {
          name: "所属城市",
          key: "officialPartnerSubsetId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        level: {
          name: "角色",
          key: "roleId",
          SourceTypeValue: '', //选中后的
          SourceType: [
            {
              value: '超级管理员',
              id: "SuperAdmin"
            }, {
              value: '管理员',
              id: "Admin"
            }
          ]
        },
        areaoptions1: [],
        labeloptions2: [],
        dataObj:{},
        props: {
          value: 'label',
          children: 'cities',
        },
        workStatu:{
          name:"工作状态",
          key:"workState",
          SourceTypeValue: '',
          SourceType:
            [{
              value:"正常",
              id:"1"
            },{
              value:"禁用",
              id:"2"
            }]
        },
        skills:[],
        areas:[],
        primary:"primary",
      }
    },
    created(){

      let url=this.$apidomain+"/officialPartnerSubsetAccountInfo/findoneOfficialPartnerSubsetAccountInfo?id="+this.isDetailed.id;
      this.$http.get(url).then(res=>{
        let data = res.data;
        this.dataObj = data.result;
        this.account = data.result.account;
        this.password = data.result.password;
        this.linkmanName = data.result.linkmanName;
        this.linkmanTelephone = data.result.linkmanTelephone;
        this.roleId = data.result.roleId;
        this.roleId=this.getRole(data.result.roleId);
        this.id = data.result.id;

        this.workStatu.SourceTypeValue = this.getState(this.dataObj.state);

      })
      url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.$getLocalStorage("enrolleeinfo")[0].id;
       this.$http.get(url).then(r=>{
        let data=r.data;
        data.result.forEach((v)=>{
          this.city.SourceType.push({"id":v.id,"value":v.name});
        })
      })
       return;
    },
    methods: {
      changeSelector(value){
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{


            })
          }
        });
      },
      changeSelector2(value){
       // console(value);
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{

            })
          }
        });
      },
      selector1(item,values,SourceTypeValue){       //选中后的下拉列表
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj.cityId=v.id;
            this.dataObj.city=v.value;
            let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.dataObj.cityId;
            this.$http.get(url).then(r=>{
              let data=r.data;
              this.areaoptions1 = data.result;
              this.areas = [];

            })
          }
        })
      },
      selector2(item,values,SourceTypeValue){       //选中后的下拉列表
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj.workState=v.id;
          }
        })
      },

      selector3(item,values,SourceTypeValue){       //选中后的下拉列表
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj.roleId=v.id;
          }
        })
      },
      selectorArea(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj[key]=v.id;
            this.dataObj["officialPartnerSubsetName"]=v.value;
          }
        });

      },
      handleItemChange(val) {
      },
      //编辑模块
      isEdit(){
        return this.$store.state.isEdit;
      },
      refuse(){
        return this.$store.state.refuse
      },
      accomplish(prams){ //完成编辑
        let url=this.$apidomain+"/officialPartnerSubsetAccountInfo/updateOfficialPartnerSubsetAccountInfo";
        prams.password=md5(prams.password);
        this.$http.post(url,prams).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'});
            this.quiry();
            this.isDetailed.isShow=false
          }else{
            alert(data.error)
          }
          this.isedit=true;
          this.$store.commit("edit",false);
          this.quiry();

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
        isShow.isShow=false
        this.$store.commit("edit",false);
      },
      refuse(){
        return this.$store.state.refuse
      },


      getState(input){
        if("1"==input){
          return "正常";
        }else if("2"==input){
          return "禁用";
        }
      },
      getRole(input){
        if("SuperAdmin"==input){
          return "超级管理员";
        }else if("Admin"==input){
          return "管理员";
        }
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
    z-index: 99999 !important;
  }
</style>
<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  @import "../../../assets/styles/ch_alert";
  .list_name{
    text-align: left;
    width:140px;
    margin-right:30px;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    letter-spacing: 0;
    width:50%;
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
    >.title{
      line-height:50px;
      width:100%;
      border-bottom:1px solid #ccc;
      padding-left:30px;
    }
    >.content{
      height: 100%;
      width:100%;
      display:flex;
      overflow-y: auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #ededed;
      }
      >div{
        flex:1;
        >ul{
          height:100%;

          >li{
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
        ul{
          padding-left:30px;
        }
      }
    }
    @media  screen and (max-height:650px){
      .content{
        max-height:300px;
      }
    }
    @media  screen and (max-height:550px){
      .content{
        max-height:250px;
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
      line-height:50px;
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
   #closeX{
     >i{
       background:url(../../../assets/images/cloos_alert.png) center center no-repeat;
       background-size:100% 100%;
     }
   }

</style>

