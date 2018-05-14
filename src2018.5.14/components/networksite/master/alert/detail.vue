<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title"> {{isDetailed.title}}    <p id="closeX" class="closeX" @click="close(isDetailed)"></p></h3>
      <div class="content">
        <div class="left_info">
          <p class="title">师傅信息</p>
          <ul>
            <li>姓名：{{dataObj.name}}</li>
            <li>手机号:
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
            <li>师傅类别:{{dataObj.type|mastertype}}</li>
            <li>师傅编号:{{dataObj.id}}</li>
            <!--可编辑-->
            <li>
              服务城市: {{dataObj.city}}
            </li> <!--可编辑-->
            <li>身份证:{{dataObj.idNum}}</li>
            <li>服务区域:<!--可编辑-->
              <span v-if="!this.isEdit()">
                  {{areas|listshow}}
              </span>
              <span v-else>
                  <el-cascader id="cascader"
                               expand-trigger="hover"
                               @change="changeSelector"
                               :options="areaoptions1"
                               change-on-select
                               @active-item-change="handleItemChange"
                               :props="props"
                  ></el-cascader>
                  <el-tag
                    v-for="tag in areas"
                    :key="tag.id"
                    :closable="true"
                    :type="primary"
                    @close="handleClose1(tag)"
                  >
                  {{tag.label}}
                  </el-tag>
              </span>
            </li>
            <li>服务工种:
              <span v-if="!this.isEdit()">
                   {{skills|listshow}}
              </span>
              <span v-else>
                  <el-cascader id="cascader2"
                               expand-trigger="hover"
                               @change="changeSelector2"
                               :options="labeloptions2"
                               change-on-select
                               @active-item-change="handleItemChange"
                               :props="props"
                  ></el-cascader>
                  <el-tag
                    v-for="tag in skills"
                    :key="tag.id"
                    :closable="true"
                    :type="primary"
                    @close="handleClose2(tag)"
                  >
                  {{tag.label}}
                  </el-tag>
              </span>
            </li>
            <li>紧急联系人:{{dataObj.emergencyContact}}</li>
            <li>联系人号码:{{dataObj.emergencyPhoneNum}}</li>
            <li>工作状态: {{dataObj.workState|showWorkState}}</li>
            <li>
              <ul>
                <li>
                  本人执证照：
                  <img :src="dataObj.licenseImg" alt="">
                </li>
                <li>
                  身份证正照:
                  <img :src="dataObj.identityCardImgFront" alt="">
                </li>
                <li>
                  身份证反面:
                  <img :src="dataObj.identityCardImgReverse" alt="">
                </li>
                <li>
                  资格证照:
                  <img :src="dataObj.qualificationImg" alt="">
                </li>
              </ul>
            </li>
            <li class="option_list" v-show="3==dataObj.certificateState">
              拒绝描述：  {{dataObj.certificateRemark}}
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
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
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
              value:"空闲中",
              id:"Leisure"
            },{
              value:"工作中",
              id:"Working"
            },{
              value:"请假中",
              id:"BeOnLeave"
            }]
        },
        skills:[],
        areas:[],
        primary:"primary",
      }
    },
    created(){
      let url=this.$apidomain+"/masterinfo/finddetail?id="+this.isDetailed.id;
      this.$http.get(url).then(res=>{
        let data = res.data;
        this.dataObj = data.result.masterInfo;
        this.areas = data.result.areas;
        this.skills = data.result.skills;
        this.dataObj.areaIds=this.getIds(this.areas);
        this.dataObj.skillIds=this.getIds(this.skills);
        this.workStatu.SourceTypeValue = this.getWorkState(this.dataObj.workState);
        this.city.SourceTypeValue = this.dataObj.city;
        var images = this.dataObj.idPhotos.split(",");
        this.dataObj.licenseImg = images[0];  //本人执证照
        this.dataObj.identityCardImgFront = images[1]; //身份证正面
        this.dataObj.identityCardImgReverse = images[2];//身份证反面
        this.dataObj.qualificationImg = images[3];  //资格执照

        url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.dataObj.cityId;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.areaoptions1 = data.result;
        })
      })
      url=this.$apidomain+"/common/findlabelbusinessoptions";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2 = data.result;
      })
      url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.city.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v)=>{
          this.city.SourceType.push({"id":v.id,"value":v.name});
        })
      });
    },
    methods: {
      handleClose1(tag) {
        this.areas.forEach((e,i)=>{
          if(e.id===tag.id){
            this.areas.splice(i,1);
            this.dataObj.areaIds=this.getIds(this.areas);
            return;
          }
        });
      },
      handleClose2(tag) {
        this.skills.forEach((e,i)=>{
          if(e.id===tag.id){
            this.skills.splice(i,1);
            this.dataObj.skillIds=this.getIds(this.skills);
            return;
          }
        });
      },
      changeSelector(value){
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                if(this.checkIdIn(this.areas,e.id)){
                  this.areas.push({"id":e.id,"label":v.label+"-"+e.label});
                  this.dataObj.areaIds=this.getIds(this.areas);
                }
                return;
              }
            })
          }
        });
      },
      changeSelector2(value){
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                if(this.checkIdIn(this.skills,e.id)){
                  this.skills.push({"id":e.id,"label":v.label+"-"+e.label});
                  this.dataObj.skillIds=this.getIds(this.skills);
                }
                return;
              }
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
              this.dataObj.areaIds=this.getIds(this.areas);
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
        let url=this.$apidomain+"/masterinfo/changeInfo";
        this.$http.post(url,prams).then(res=>{
          let data = res.data;
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
      checkIdIn(obj,id){
        let isin = true;
        obj.forEach((e)=>{
          if(e.id==id){
            isin = false;
          }
        })
        return isin;
      },
      getIds(obj){
        let k = "";
        obj.forEach((e,i)=>{
          k += e.id+",";
        });
        k = k.substring(0,k.length-1);
        return k;
      },
      getWorkState(input){
        if("Leisure"==input){
          return "空闲中";
        }else if("Working"==input){
          return "工作中";
        }else if("BeOnLeave"==input){
          return "请假中";
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
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
  .el-input, .el-input__inner{
    width:auto;
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
      height:75%;
      width:100%;
      overflow: auto;
      display:flex;
      >div{

        flex:1;

        >ul{
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
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
   .closeX{
    background:url(../../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;

    background-origin: content-box;
  }
</style>

