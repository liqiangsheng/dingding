
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}  <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
       <ul>
          <li class="add_master">
            <li>
              <span class="list_name"> 优惠券名称 : </span>
              <el-input v-if="!isAdd.data"
                placeholder="请输入内容"
                v-model="selectorBehindObj.discountName">
              </el-input>
              <span v-else>{{isAdd.data.discountName}}</span>
            </li>
            <li>
              <div class="list_name">有效期 :</div>
              <DatePicker v-if="!isAdd.data" v-model="date"  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择时间" style="width: 200px"></DatePicker>
              <span v-else>{{isAdd.data.startTime | moment("YYYY-MM-DD HH:mm")}}~{{isAdd.data.endTime | moment("YYYY-MM-DD HH:mm")}}</span>
            </li>
            <li>
              <div class="list_name">
                用途 :
              </div>
              <el-radio-group v-model="radio2" @change="radio">
                <el-radio :label="1">好友推荐奖励</el-radio>
                <el-radio :label="2">链接领取</el-radio>
                <el-radio :label="3">有券码</el-radio>
                <!--<el-radio :label="4">卷码下载专用</el-radio>-->
              </el-radio-group>
            </li>
            <li v-for="(item,index) in inputs" :key="index">
              <span class="list_name"> {{item.name}} : </span>
              <el-input
                :type="item.type"
                :min="item.min"
                v-if="!item.isText"
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
              <span v-if="item.isText">{{item.value}}</span>  &nbsp; &nbsp; &nbsp;<span v-if="item.text" v-text="item.text"></span>
            </li>
            <li>
            <li  v-for="(item,index) in optionList" v-if="isEdit">
              <span class="list_name">{{item.name}} :</span>
              <el-select :disabled="checked"
                v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select><el-checkbox  style="transform:translateX(20px);" v-model="checked">全部通用</el-checkbox>
            </li>
         <li class="fenle">
              <span class="list_name">分类 :</span>
              <el-cascader v-if="isEdit"
                ref="class"
                :disabled="checked"
                :change-on-select="true"
                :options="options"
                :props="props"
                v-model="selectedOptions2"
                @change="handleChange">
              </el-cascader>
              <span v-else>{{optionList[0].SourceTypeValue?optionList[0].SourceTypeValue:"全部通用"}}</span>
            </li>
         <li>
           <div class="list_name">

           </div>
           <el-checkbox  v-model="isSuperposition">折扣活动叠加</el-checkbox>
         </li>
            <li>
              <div class="list_name">可用城市 :</div>
              深圳市
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>

    <div class="btn">
      <button @click="closeMove()">关闭</button>
      <button @click="submitAdd()" class='selector'>确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:["isAdd","quiry"],
    data(){
      return{
        checked:false,
        paramsId:"",
        serviceNames:"",
        optionList: [
          {
            name: "一级分类",
            key: "skillId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        selectedOptions2: [],
        options: [],
        isEdit:true,
        isSuperposition:false,
        selectorBehindObj:{
          "discountMode":2,
          "areaName":"深圳市",
          "areaId":"0101",
          "isSuperposition":"0",
        },
        date:[],
        isSiteShow:false,
        radio2:2,
        inputs:[
          {
            name:"面值",
            key:"discountFacevalue",
            type:"number",
            isText:false,
            min:1,
            errorContent:"info",
            value:1
          },{
            name:"库存",
            type:"number",
            min:1,
            isText:false,
            errorContent:"info",
            key:"stock",
            value:1
          }, {
            min:1,
            name:"最低消费",
            isText:false,
            text:"元",
            type:"number",
            key:"minimum",
            errorContent:"info",
            value:1
          },{
            min:1,
            type:"number",
            name:"每人限额",
            errorContent:"info",
            isText:false,
            text:"张",
            key:"limitCollar",
            value:1
          }
        ],

        props: {
          value: 'a',
          label: "b",

          children: 'beans'
        },
      }
    },

    created(){
        if(this.isAdd.data){
          this.radio2=this.filter(this.isAdd.data.discountMode);
          this.inputs.forEach((v,i)=>{
            for(let k in this.isAdd.data){
                if(v.key===k){
                  this.inputs[i].value=this.isAdd.data[k];
                }
                if(v.key==="discountFacevalue"||v.key==="minimum"){
                  this.inputs[i].isText=true;
                }
            }
          });
          this.isEdit=false
          this.selectorBehindObj["id"]=this.isAdd.data.id;
          if(this.isAdd.data.serviceIds==="ALL"){
            this.checked=true;
            this.selectorBehindObj["serviceIds"]="ALL";
          }else{
            this.optionList[0].SourceTypeValue=this.isAdd.data.serviceNames;
            this.selectorBehindObj["serviceIds"]=this.isAdd.data.serviceIds
            this.paramsId=this.selectorBehindObj["serviceIds"].substring(0,3);
            this.getArticleinfo();
          }
          if(this.isAdd.data.isSuperposition===1){
              this.isSuperposition=true;
            this.selectorBehindObj.isSuperposition=1;
          }

        }else{
        }

    },
    methods: {
      filter(input){
        if("FA"===input){
          return 1;
        }else if("LC"===input){
          return 2;
        }else if("CC"===input){
          return 3;
        }else if(undefined===input){
          return 2
        }
        return input;
      },
      radio(v){
        this.selectorBehindObj["discountMode"] =v;
      },
      handleChange(value,v) {
        this.selectorBehindObj["serviceIds"]=value[value.length-1];
        this.serviceNames=this.$refs.class.currentLabels.join(",");
      },
      submitAdd(){
        this.inputs.forEach(v=>{
          if(!v.isText){
            this.selectorBehindObj[v.key]= v.value-0;
          }
        });
        this.selectorBehindObj.isSuperposition=this.isSuperposition?"1":"0";
        if(this.isAdd.data){
          this.editData();
          }else{
          this.addData();
        }
      },
      getArticleinfo(){
        let url=this.$apidomain+"/articleinfo/findlabelbusinessbyflabel?id="+this.paramsId;
        this.options=[];
        this.isDisableds=false;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.options.push(data.result);
        });
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.paramsId=v.id;
          }
        });
        if(key==="skillId"){
          this.getArticleinfo();
        }
      },
      editData(){
        let url=`${this.$apidomain}/discount/updateServiceDiscount`;
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          if(res.data.code==='0000'){
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'});
            this.quiry();
            this.isAdd.isShow=false
          }else{
            this.$queryFun.successAlert.call(this,res.data.error,"0");
          }
        })
      },
      addData(){
        this.selectorBehindObj["startTime"]="";
        this.selectorBehindObj["endTime"]="";
       this.selectorBehindObj["serviceNames"]= this.serviceNames;
        if(this.date.length===2) {
          this.selectorBehindObj["startTimeStr"] = this.$moment(this.date[0]).format("YYYY-MM-DD HH:mm") === "Invalid date" ? "" : this.$moment(this.date[0]).format("YYYY-MM-DD HH:mm");
          this.selectorBehindObj["endTimeStr"] = this.$moment(this.date[1]).format("YYYY-MM-DD HH:mm") === "Invalid date" ? "" : this.$moment(this.date[1]).format("YYYY-MM-DD HH:mm");
        }
        if(!this.selectorBehindObj["discountName"]){
          return this.$queryFun.successAlert.call(this,"请输入正确的优惠券名称，不得超过26个字符","0")
        }else if(!this.selectorBehindObj["startTimeStr"]||!this.selectorBehindObj["endTimeStr"] ){
          return this.$queryFun.successAlert.call(this,"请选择日期时间","0")
        }else if(!this.selectorBehindObj["serviceIds"]){
          return this.$queryFun.successAlert.call(this,"请选择分类","0")
        }
        let url=this.$apidomain+"/discount/saveServiceDiscount";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success'});
            this.quiry();
            this.isAdd.isShow=false
          }else{
            this.$queryFun.successAlert.call(this,data.error,"0");
          }
        })
      },

      closeMove(){
        this.isAdd.isShow=false;
      },
    },
    mounted() {
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("skillId"===v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });
    },
    watch:{
        "checked":function(v,g){
          if(v){
            this.optionList[0].SourceTypeValue="";
            this.selectedOptions2=[];
            this.selectorBehindObj["serviceIds"]="ALL"
          }else{
            this.selectorBehindObj["serviceIds"]=""
          }
        }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .error_info{
    color:red;
    font-size: 12px;
  }
  .el-input{
   width:200px;
  }
  .list_name{
    width:110px;
  }
  button{
    width:200px;
    cursor:pointer;
    line-height:44px;
    border:none;
    padding:0;
    margin:0;
    color:#fff;
    transform: rotate(-360deg);
    border: 1px solid #979797;
    border-radius: 4px;
    float:left;
    background:green;
    outline:none;
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
    >.content{
      height: 78%;
      width:100%;
      display:flex;
      overflow-y: auto;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            margin-top:20px;
            .files{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                height:auto;
                margin-bottom:30px;
                >input{

                }
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
    >.edit_open{
      background: #E8D7F6;
      border-radius: 4px;
      padding-left:10px;
      >span{
        height:100%;
        padding:0 10px;
        color:blue;
        cursor: pointer;
        display: inline-block;
      }
      >input{
        width:50px;
        border:none;
        outline:none;
      }
    }
  }
  .file {
    position: relative;
    display: block;

    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:280px;
    height: 140px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    width:100%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }

  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-message{
    z-index: 9999 !important;
  }
  ul{
    >.fenle{
        .el-cascader__label{
          line-height: 40px !important;

      }
    }
  }
  .el-cascader-menus, .el-select-dropdown{
    z-index: 999999 !important;
  }
</style>


