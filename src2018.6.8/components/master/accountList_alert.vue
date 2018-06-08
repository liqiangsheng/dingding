,  <template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title relative">{{isDetailed.title}}  <p class="closeX" id="closeX" @click="close(isDetailed)"></p> </h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">师傅信息</p>
          <ul>
            <li>师傅编号:{{dataObj.id|placeholder}}</li>
            <li>师傅姓名：{{dataObj.name}}</li>
            <li>师傅手机号:
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
            <!--可编辑-->
            <li>
              服务城市:
              <span v-if="!this.isEdit()">
               {{dataObj.city|placeholder}}
              </span>
              <span v-else>
              <el-select
                v-model="city.SourceTypeValue" placeholder="请选择"
                @change="selector1(city,city.SourceType,city.SourceTypeValue)">
                <el-option
                  v-for="items in city.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
              </el-option>
              </el-select>
              </span>
            </li> <!--可编辑-->
            <li v-if="!this.isEdit()">师傅类别:{{dataObj.type|mastertype}}</li>

            <li v-else>
              师傅类别:
              <el-select
                v-model="type.SourceTypeValue" placeholder="请选择" @change="selectorType(type,type.SourceType,type.SourceTypeValue)">
                <el-option
                  v-for="items in type.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>师傅等级:
              <span v-if="!this.isEdit()">
                <!--{{dataObj.level|masterLevel}}-->
                {{dataObj.level |masterLevel}}
              </span>
              <span v-else>
              <el-select
                placeholder="请选择"
                v-model="level.SourceTypeValue"
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

            <li v-if="!isEdit()&&dataObj.type==='3'">所属网点:{{site|placeholder}}</li>
            <li v-if="isEdit()&&dataObj.type==='3'">
              所属网点:
              <el-select
                v-model="siteId.SourceTypeValue" placeholder="请选择" @change="selectorType(siteId,siteId.SourceType,siteId.SourceTypeValue)">
                <el-option
                  v-for="items in siteId.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>身份证:{{dataObj.idNum|placeholder}}</li>

            <li>开户行:
              <span v-if="!isEdit()">
                {{dataObj.bankOfDeposit}}
              </span>
              <span v-else>
                <el-select   v-model="dataObj.bankOfDeposit" placeholder="请选择" @change="selector5(bank,bank.bankName,dataObj.bankOfDeposit)">
                <el-option
                  v-for="items in bank.bankName"
                  :key="items.name"
                  :value="items.name"
                >
                </el-option>
              </el-select>
              </span>
            </li>
            <li>卡号:
              <span v-if="!isEdit()">
                {{dataObj.cardNumber}}
              </span>
              <span v-else>
                  <el-input
                             placeholder="请输入内容"
                             v-model="dataObj.cardNumber">
                 </el-input>
              </span>
            </li>
            <li>开户行地址:
              <span v-if="!isEdit()">
                {{dataObj.headquarterAddress}}
              </span>
              <span v-else>
                  <el-input
                             placeholder="请输入内容"
                             v-model="dataObj.headquarterAddress">
                 </el-input>
              </span>
            </li>

            <li>服务区域:<!--可编辑-->
              <span v-if="!isEdit()">
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
            <li>紧急联系人:{{dataObj.emergencyContact|placeholder}}</li>
            <li>紧急人号码:{{dataObj.emergencyPhoneNum|placeholderTel}}</li>
            <li>
              工作状态:
              <span>
                {{dataObj.workState|showWorkState}}
              </span>

            </li>
            <li>注册时间：{{dataObj.registerTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</li>
            <li>认证时间：{{dataObj.certificateTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</li>
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
                <li v-for="(item,index) in dataObj.qualificationImg">
                  资格证照:
                  <img :src="item">
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
        bank:{
          name: "开户行",
          key: "bankOfDeposit",
          bankValue: '',
          bankName:this.$store.state.bankOfDeposit
        },

        isedit:true,//编辑

        city: {
          name: "所属城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        type:{
          name: "师傅类型",
          key: "type",
          SourceTypeValue: "",
          SourceType: [
            {
              value: '自营师傅',
              id: "1"
            }, {
              value: '兼职师傅',
              id: "2"
            }, {
              value: '网点师傅',
              id: "3"
            }
          ]
        },
        level: {
          name: "师傅等级",
          key: "level",
          SourceTypeValue: '', //选中后的
          SourceType: [
            {
              value: '初级师傅',
              id: "Primary"
            }, {
              value: '中级师傅',
              id: "MiddleRank"
            }, {
              value: '高级师傅',
              id: "Advanced"
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
            [
              {
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
        site:"",
        primary:"primary",
        siteId:{
          name: "所属网点",
          key: "siteId",
          SourceTypeValue: '',
          SourceType: []
        },
      }
    },
    created(){

      let url=this.$apidomain+"/masterinfo/finddetail?id="+this.isDetailed.id;
      this.$http.get(url).then(res=>{
        let data = res.data;
        console.log(data,'12312312412')
        this.dataObj = data.result.masterInfo;
        this.site = data.result.masterInfo.site;
        this.areas = data.result.areas;
        this.skills = data.result.skills;
        this.dataObj.areaIds=this.getIds(this.areas);
        this.dataObj.skillIds=this.getIds(this.skills);
        let masterType='';
        switch (this.dataObj.type){
          case "1":masterType="自营师傅";break;
          case "2":masterType="兼职师傅";break;
          case "3":masterType="网点师傅";this.getSiteList();break;
        }
        this.type.SourceTypeValue=masterType;
        this.workStatu.SourceTypeValue = this.getWorkState(this.dataObj.workState);
        this.city.SourceTypeValue = this.dataObj.city;
        let images = this.dataObj.idPhotos.split(",");
        let imgOne = images.slice(3,images.length-3);
        this.dataObj.licenseImg = images[0]!="undefined"?images[0]:"";  //本人执证照
        this.dataObj.identityCardImgFront = images[1]; //身份证正面
        this.dataObj.identityCardImgReverse = images[2];//身份证反面
        this.dataObj.qualificationImg = imgOne;  //资格执照
        if(this.dataObj.level === "Primary"){
          this.level.SourceTypeValue = "初级师傅"
        }else if(this.dataObj.level === "MiddleRank"){
          this.level.SourceTypeValue="中级师傅"
        }else if(this.dataObj.level === "Advanced"){
          this.level.SourceTypeValue= "高级师傅"
        }

        url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.dataObj.cityId;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.areaoptions1 = data.result;
        })
      });
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
      selector5(item,values,bankValue){       //选中银行后的下拉列表
        this.dataObj[item.key]=bankValue;
      },
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
      selector3(item,values,SourceTypeValue){       //选中后的下拉列表

        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){

            this.dataObj.level=v.id;
          }
        })
      },
      selectorType(item,values,SourceTypeValue){       //选中后的下拉列表
        this.dataObj.siteId="";
        console.log(item.key);
        this.dataObj.site="";
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){

            this.dataObj[item["key"]]=v.id;
            if(v.id==="3"&&!this.siteId.SourceType.length){
                this.getSiteList();
            }else if(item["key"]==="siteId"){
              this.dataObj.site= !!v.id?v.value:'';
            }
          }
        });

      },
      getSiteList(){
        const url=this.$apidomain+"/common/findsite";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.siteId.SourceType.push({"id":"","value":"---请选择---"});
          data.result.forEach((v)=>{
            this.siteId.SourceType.push({"id":v.id,"value":v.name});
          })
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
        if( prams.type==="3"&&!prams.siteId)return this.$queryFun.successAlert.call(this,'请选择所属网点');
        let url=this.$apidomain+"/masterinfo/changeInfo";
        this.$http.post(url,prams).then(res=>{
          let data = res.data;
          if(data.code==="0000"){
            this.$queryFun.successAlert.call(this,"修改成功","1");
            this.isedit=true;
            this.$store.commit("edit",false);
            this.quiry();
            this.close(this.isDetailed)
          }else{
           this.$queryFun.successAlert.call(this,data.error);
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
        });
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
  #cascader .el-cascader__label, #cascader2 .el-cascader__label{
    line-height: 39px !important;
  }
  .el-select-dropdown, .el-cascader-menus, .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-input{
    /*line-height: 59px !important;*/
  }
</style>
<style scoped lang="scss">
  @import "../../assets/styles/commButton";
  /*.el-input, .el-input__inner{*/
    /*width:auto;*/
  /*}*/
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
   // overflow: hidden;

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
      overflow-y: auto;
      width:100%;
      display:flex;
      height: 78%;
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
    background:url(../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
     z-index: 99;
    background-origin: content-box;
  }
</style>

