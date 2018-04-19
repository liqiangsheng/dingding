<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title relative">{{isDetailed.title}}   <p class="closeX" @click="close(isDetailed)"></p></h3>
      <div class="content">
        <div class="left_info">
          <p class="title">师傅信息</p>
          <ul>
            <li>
              <div class="list_name">
                城市 :
              </div>
              {{dataObj.city}}</li>
            <li>  <div class="list_name">
              网点名称 :
            </div> {{dataObj.name}}</li>
            <li> <div class="list_name">网点编码 :</div> {{dataObj.id}}</li>
            <li> <div class="list_name">用户名 : </div> {{dataObj.username}}</li>
            <li v-if="this.isEdit()">
              <div class="list_name">
                密码 :
              </div>
            <el-button type="primary" @click="open3">修改密码</el-button>
            </li>
            <li>
              <div class="list_name">
                手机号 :
              </div>

              <span v-if="!this.isEdit()">
                  {{dataObj.linkmanPhoneNum}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.linkmanPhoneNum">
                 </el-input>
              </span>
            </li>
            <li>
              <div class="list_name">
                联系人 :
              </div>

              <span v-if="!this.isEdit()">
                 {{dataObj.linkmanName}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.linkmanName">
                 </el-input>
              </span>
            </li>
            <li>
              <div class="list_name">
                公司电话 :
              </div>

              <span v-if="!this.isEdit()">
                 {{dataObj.companyTel}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.companyTel">
                 </el-input>
              </span>
            </li>
            <!--可编辑-->
            <li>
              <div class="list_name">
                服务区域 :
              </div>

              <!--可编辑-->
              <span v-if="!this.isEdit()">
                  {{areas|listshow}}
              </span>
              <span v-else>
                <el-select
                    style="width:175px;"
                    v-model="area.SourceTypeValue" placeholder="请选择" @change="selector(area,area.SourceType,area.SourceTypeValue)">
                  <el-option
                    v-for="items in area.SourceType"
                    :key="items.value"
                    :value="items.value"
                  >
                  </el-option>
                </el-select>
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
            <li>
              <div class="list_name">
                主营业务 :
              </div>

              <span v-if="!this.isEdit()">
                {{skills|listshow}}
              </span>
              <span v-else>
                <el-select
                  style="width:175px;"
                    v-model="skill.SourceTypeValue" placeholder="请选择" @change="selector(skill,skill.SourceType,skill.SourceTypeValue)">
                  <el-option
                    v-for="items in skill.SourceType"
                    :key="items.value"
                    :value="items.value"
                  >
                  </el-option>
                </el-select>
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
            <li class="option_list" v-show="3==dataObj.certificateState">
              <div class="list_name">
                拒绝描述 :
              </div>
              {{dataObj.certificateRemark}}
            </li>
            <li>
              认证资料：
            </li>
            <li>
              <img :src="dataObj.identityCardImgFront" alt="">
              <img :src="dataObj.identityCardImgReverse" alt="">
              <img :src="dataObj.qualificationImg" alt="">
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
        dataObj:{},
        isedit:true,//编辑
        areaoptions1: [],
        labeloptions2: [],
        area: {
          name: "服务区域",
          key: "areaId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        skill: {
          name: "主营业务",
          key: "skillId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        skills:[],
        areas:[],
        primary:"primary",
        value:null,
      }
    },
    created(){
      let url=this.$apidomain+"/siteInfo/findDetail?id="+this.isDetailed.id;
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.dataObj = data.result.siteInfo;
        this.skills = data.result.skills;
        this.areas = data.result.areas;
        this.dataObj.skillIds=this.getIds(this.skills);
        this.dataObj.areaIds=this.getIds(this.areas);
        let images = this.dataObj.idPhotos.split(",");
        this.dataObj.identityCardImgFront = images[0]; //身份证正面
        this.dataObj.identityCardImgReverse = images[1];//身份证反面
        this.dataObj.qualificationImg = images[2];  //资格执照

        let kurl=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.dataObj.cityId;
        this.$http.get(kurl).then(r=>{
          let data=r.data;
          data.result.forEach((v2)=>{
            this.area.SourceType.push({"id":v2.id,"value":v2.label});
          })
        });
      });
      url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.skill.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v2)=>{
          this.skill.SourceType.push({"id":v2.id,"value":v2.name});
        })
      });
    },
    methods: {
      //初始化密码操作 start
      open3() {
        this.$prompt('请输入密码', '提示', {
        }).then(({ value }) => {
          if(value.length<6){
            alert("密码不能少于6位");
            return;
          }
          let o = {"id":this.dataObj.id,"password":md5(password)};
          let urlR=this.$apidomain+"/siteInfo/updatePassword";
          this.$http.post(urlR,o).then(r=>{
            let data=r.data;
            if(data.code=='0000'){
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.close();
            }else{
              alert(data.error);
            }
          });
          this.dataObj.password=value
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      //初始化密码操作end
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
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj[key]=v.id;
            if("areaId"==key&&v.id&&""!=v.id){
              if(this.checkIdIn(this.areas,v.id)){
                this.areas.push({"id":v.id,"label":this.dataObj.city+"-"+v.value});
                this.dataObj.areaIds=this.getIds(this.areas);
              }
            }
            if("skillId"==key&&v.id&&""!=v.id){
              if(this.checkIdIn(this.skills,v.id)){
                this.skills.push({"id":v.id,"label":v.value});
                this.dataObj.skillIds=this.getIds(this.skills);
              }
            }
          }
        })
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
      accomplish(prams){                 //完成编辑
        let url=this.$apidomain+"/siteInfo/changeInfo";
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
  @import "../../../assets/styles/commButton";
  .el-input, .el-input__inner{
    width:auto;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:auto;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{

      width:100%;
      display:flex;

      >div{
        flex:1;
        >ul{
          >li:last-of-type{
                >img{
                  display: block;
                  margin-right:10px;
                  width:180px;
                  float:left;
                  height: 95px;
            }
          }
        }
        >li{
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
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
    right:30px;
    top:0 ;
  }
</style>

