
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{edit.title}}</h3>
      <div class="content">
        <div class="left_info">
          <p class="title">基本信息</p>
          <ul v-if="isAdd">
            <li v-for="(item,index) in optionList" :key="index">
              {{item.name}} :
              <el-select
                v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              服务工种 :
              <el-cascader id="skill"
                           @change="changeSelector2"
                           :options="labeloptions2"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props"
              ></el-cascader>
            </li>
          </ul>
          <ul v-else>
            <li>师傅类型 :{{selectorBehindObj.masterType|mastertype}}</li>
            <li>师傅等级 :{{selectorBehindObj.masterLevel|masterLevel}}</li>
            <li>所属城市 :{{selectorBehindObj.area}}</li>
            <li>服务工种 :{{selectorBehindObj.labelName}}</li>
          </ul>
        </div>
        <div class="right_info">
          <p class="title">业务类别提点</p>
          <ul>
            <li v-for="(item,index) in RemindedDataList" class="edit_open" v-show="isShow">
              {{item.feeType}}
              &nbsp;
              &nbsp;
              <input type="number" v-model="item.shareValue">
              &nbsp;
              {{item.shareTypeKey|shareTypeKeyShow}}
              <span @click="preserve(item,index)">
                   保存
              </span>
              <span @click="del(item,index)">
                  删除
              </span>
            </li>
            <li v-for="(item,index) in RemindedList" :key="index">
              {{item.name}} :
              <el-select
                v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              {{Reminded[0].name}}
              <el-input-number v-model="number"  :min="0" :max="100"></el-input-number>
              <el-select style="width:20%"
                         v-model="Reminded[0].SourceTypeValue"
                         placeholder="请选择"
                         @change="selector(Reminded[0],Reminded[0].SourceType,Reminded[0].SourceTypeValue)">
                <el-option
                  v-for="items in Reminded[0].SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <button @click="add()">+确定并新增</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>
    <p class="closeX" @click="shutAlert"></p>
    <div class="btn">
      <button @click="shutAlert">关闭</button>
    </div>
  </div>
</template>

<script>

  export default {
    props:["edit","quiry"],
    data(){
      return{
        isAdd:true,
        optionList:[
          {
            name: "师傅类型",
            key: "masterType",
            SourceTypeValue: '',
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
          },{
            name: "师傅等级",
            key: "masterLevel",
            SourceTypeValue: '',
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
          },{
            name: "所属城市",
            key: "areaId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        number:"",
        Reminded:[
          {
            name:"提点",
            key:"shareTypeKey",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                value: '%',
                id:"Proportion"
              }, {
                value: '元/单',
                id:"Quota"
              }
            ]
          },
        ],
        RemindedList:[
          {
            name:"费用类别",
            key:"feeTypeKey",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                value: '上门费',
                id:"prince1"
              }, {
                value: '服务费',
                id:"prince2"
              }, {
                value: '配件费',
                id:"prince3"
              }, {
                value: '高空费',
                id:"prince4"
              }
            ]
          },
        ],
        RemindedDataList:[],
        potionValueId:'',
        isShow:true,
        selectorBehindObj:{},
        props: {
          value: 'label',
          children: 'cities',
        },
        labeloptions2: [],
      }
    },
    created(){
      if(this.edit.item){
        this.selectorBehindObj = this.edit.item;
        this.selectorBehindObj.shareValue = "";
        this.selectorBehindObj.shareTypeKey = "";
        this.selectorBehindObj.feeTypeKey = "";
        this.queryData();
      }else{
        let url=this.$apidomain+"/common/findlabelbusinessoptions";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.labeloptions2 = data.result;
        });
        url=this.$apidomain+"/common/findcitylistareainfo";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.optionList.forEach((v)=>{
            if("areaId"===v.key){
              data.result.forEach((v2)=>{
                v.SourceType.push({"id":v2.id,"value":v2.name});
              })
            }
          });
        });
      }
    },
    methods: {
      changeSelector2(value){
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.labelName=value[0]+"-"+value[1];
                this.selectorBehindObj.labelId=e.id;
              }
            })
          }
        });
      },
      handleItemChange(val) {

      },
      preserve(item,index){        //保存
        console.log(item);
        let url=this.$apidomain+"/mastercommissionconfig/updateMasterCommissionConfig";
        this.$http.post(url,item).then(res=>{
          let data = res.data;
          this.quiry();
        })
      },
      del(item,index){           //删除
        console.log(item);
        let url=this.$apidomain+"/mastercommissionconfig/deletemasterCommissionConfig";
        this.$http.post(url,item).then(res=>{
          let data = res.data;
          this.RemindedDataList.splice(index,1);
          this.quiry();
        })
      },
      queryData(func){
        var _this=this;
        if(this.isAdd){
          //维度数据检查
          if(!this.selectorBehindObj.areaId||""==this.selectorBehindObj.areaId){
            alert("请选择城市");
            return ;
          }
          if(!this.selectorBehindObj.labelId||""==this.selectorBehindObj.labelId){
            alert("请选择服务工种");
            return ;
          }
          if(!this.selectorBehindObj.masterType||""==this.selectorBehindObj.masterType){
            alert("请选择师傅类型");
            return ;
          }
          if(!this.selectorBehindObj.masterLevel||""==this.selectorBehindObj.masterLevel){
            alert("请选择师傅等级");
            return ;
          }
          var param = {params:this.selectorBehindObj};
          let url=this.$apidomain+"/officialPartnerCommissionConfig/findlistmasterCommissionConfig";
          this.$http.get(url,param).then(r=>{
            let data=r.data;
            this.RemindedDataList = data.result;
            this.isAdd = false;
            if(func){
              func(_this);
            }
          })
        }else{
          if(func){
            func(_this);
          }
        }
      },
      add(value){
        //1.先查询4个维度下的所有费用类型数据
        //2.判断当前数据是否包含在内
        //3.如果存在则update 否则add
        this.selectorBehindObj.shareValue = this.number;
        if(!this.selectorBehindObj.shareTypeKey||""==this.selectorBehindObj.shareTypeKey){
          alert("请选择提点类型");
          return ;
        }
        if(!this.selectorBehindObj.shareValue||""==this.selectorBehindObj.shareValue){
          alert("请选择输入提点数值");
          return ;
        }
        if(!this.selectorBehindObj.feeTypeKey||""==this.selectorBehindObj.feeTypeKey){
          alert("请选择费用类别");
          return ;
        }
        this.queryData(_this=>{
          let isin = false;
          console.log(this.RemindedDataList);
          console.log(this.selectorBehindObj);
          this.RemindedDataList.forEach((v,i)=>{
            if(v.feeTypeKey===this.selectorBehindObj.feeTypeKey){
              isin = true;
            }
          });
          if(isin){
            alert("已重复新增费用类型");
            return ;
          }else{
            let url=this.$apidomain+"/mastercommissionconfig/savemasterCommissionConfig";
            this.$http.post(url,this.selectorBehindObj).then(res=>{
              let data = res.data;
              this.selectorBehindObj.id = data.result;
              var o = JSON.parse(JSON.stringify(this.selectorBehindObj));
              this.RemindedDataList.push(o);
              this.quiry();
            })
          }
        });
      },
      refuse(){
        return this.$store.state.refuse
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            if("areaId"===key){
              this.selectorBehindObj.area = v.value;
            }
            if("feeTypeKey"===key){
              this.selectorBehindObj.feeType = v.value;
            }
          }
        })
      },
      //关闭弹框
      shutAlert(){
        this.edit.isShow=false;
      },
    },
    mounted() {

    },
    watch:{

    },

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
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
    overflow-y: auto;
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

      width:100%;
      display:flex;

      >div{
        flex:1;
        >ul{
          >li{
            margin-top:20px;
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
  .el-cascader-menus{
    z-index: 9999 !important;
  }
</style>
