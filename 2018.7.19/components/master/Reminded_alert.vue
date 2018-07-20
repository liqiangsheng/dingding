
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{edit.title}}  <p class="closeX"  id="closeX" @click="shutAlert"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">基本信息</p>
          <ul v-if="isAdd" class="add_reminded">
            <li v-for="(item,index) in optionList" :key="index">
              {{item.name}} :
              <el-select
                v-model.trim="item.SourceTypeValue" placeholder="请选择"
                @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li id="listName">
              <span class="list_name">服务工种</span>
              <el-cascader ref="fuwugongzhong" id="labelId" style="width: 260px;margin-left: 14px;height: 40px"
                           @change="changeSelectorTwo"
                           :options="labeloptions2"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props1"
              ></el-cascader>
            </li>
          </ul>
          <ul v-else>
            <li>师傅类别 :{{selectorBehindObj.masterType|mastertype}}</li>
            <li>师傅等级 :{{selectorBehindObj.masterLevel|masterLevel}}</li>
            <li>服务城市 :{{selectorBehindObj.area|placeholder}}</li>
            <li>服务工种 :{{selectorBehindObj.labelName}}</li>
          </ul>
        </div>
        <div id="xian"></div>
        <div class="right_info">
          <p class="title">业务类别提点</p>
          <ul style="position: relative" v-if="isAdd">
            <li v-for="(item,index) in RemindedList[0].SourceType">
              <span class="list_name">{{item.value}}</span>
              <img :src="item.reduceImg" @click="reduceOne(item,index)">
              <el-input type="number" style=" width:80px" v-model="item.num" min=0  max=100 @blur="changeCount(item,index)"></el-input>
              <img src="/static/images/add.png" @click="addOne(item,index)" @blur="changeCount(num0)">
              <el-select style=" width:90px"
                         v-model="item.danweiStr"
                         placeholder="请选择"
                         ref="selectorA"
                         @change="selectorOne1(item,index)">
                <el-option
                  v-for="(items,index) in item.danwei"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
          </ul>
          <ul style="position: relative" v-else>
            <li v-for="(item,index) in RemindedList[0].SourceType">
              <span class="list_name">{{item.value}}</span>
              <img :src="item.reduceImg" @click="reduceOne(item,index)">
              <el-input type="number" style=" width:80px" v-model="item.num" min=0 max=100 @blur="changeCount(item,index)"></el-input>
              <img src="/static/images/add.png" @click="addOne(item,index)" @blur="changeCount(num0)">
              <el-select style=" width:90px"
                         v-model="item.danweiStr"
                         placeholder="请选择"
                         ref="selectorA"
                         @change="selectorOne1(item,index)">
                <el-option
                  v-for="(items,index) in item.danwei"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>
      <div id="btn">
        <el-button @click="shutAlert">退出</el-button>
        <el-button type="primary" @click="add()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["edit","quiry"],
    data(){
      return{
        labeloptions2: [],
        isKeXuan:true,
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
        isAdd:true,
        optionList:[
          {
            name: "师傅类别",
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
            name: "服务城市",
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
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                num: 0,
                value: '上门费',
                id:"prince1"
              }, {
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                value: '服务费',
                id: "prince2",
                num: 0,
              }, {
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                value: '配件费',
                num: 0,
                id:"prince3"
              }, {
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                value: '高空费',
                num: 0,
                id:"prince4"
              }
            ]
          },
        ],
        DataRequest: [], //数据请求
        RemindedDataList:[],
        potionValueId:'',
        isShow:true,
        selectorBehindObj:{},
        props: {
          value: 'label',
          children: 'cities',
        },
//        labeloptions2: [],
      }
    },
    watch: {

    },
    created(){

      if(this.edit.item){

        this.selectorBehindObj = this.edit.item;
        this.RemindedList[0].SourceType.forEach((v, i) => {
          console.log(v)
          this.selectorBehindObj.shareValue = v.num;
          this.selectorBehindObj.feeTypeKey = v.value;
          this.selectorBehindObj.shareTypeKey = v.danweiStr;
        })
//          this.selectorBehindObj.shareValue = "";
//          this.selectorBehindObj.feeTypeKey = "";
//          this.selectorBehindObj.shareTypeKey = "";

        this.queryData();
      }else{
        let  url=this.$apidomain+"/common/findcitylistareainfo";
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
        url=this.$apidomain+"/common/findflabelbusinessname";
        this.$http.get(url).then(r=>{
          r.data.result.forEach((v, i) => {
            let urlTwo = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + v.id;
            this.$http.get(urlTwo).then(res => {
              if (res.data.code === "0000") {
                this.labeloptions2.push(res.data.result)
              }
            })
          })
        });
      }
    },
    methods: {
      selectorOne1(v, i) {

        v.danwei.forEach((item, index) => {
          if (item.value == v.danweiStr) {
            this.selectorBehindObj.shareTypeKey = item.danweiid;
          }
        })
      },
      changeCount(v, i) {//失去焦点
        this.RemindedList[0].SourceType.forEach((item, index) => {
          if (i == index) {
            console.log(item)
            if (item.num <= 0) {
              item.reduceImg = "./static/images/redcue.png"
              item.num = 0
            } else {
              item.reduceImg = "./static/images/reduce.png"
            }
            if (item.num >= 100) {
              item.num = 100
            }
          }
        })
        this.selectorBehindObj.feeTypeKey = v.id;
        this.selectorBehindObj.feeType = v.value;
        this.selectorBehindObj.shareValue = num;
      },
      reduceOne(v, i) { //减
        this.RemindedList[0].SourceType.forEach((item, index) => {
          if (i == index) {
            item.num--;
            if (item.num <= 0) {
              item.num = 0;
              item.reduceImg = "./static/images/redcue.png"
            } else {
              item.reduceImg = "./static/images/reduce.png"
            }
          }
        })
        this.selectorBehindObj.feeTypeKey = v.id;
        this.selectorBehindObj.feeType = v.value;
        this.selectorBehindObj.shareValue = v.num.toNumber;
      },
      addOne(v, i) { //加
        this.RemindedList[0].SourceType.forEach((item, index) => {
          if (i == index) {
            item.num++;
            if (item.num > 0 && item.num <= 100)
              item.reduceImg = "./static/images/reduce.png"
          }
          if (item.num >= 100) {
            item.num = 100;
          }
        })
        this.selectorBehindObj.feeTypeKey = v.id;
        this.selectorBehindObj.feeType = v.value;
        this.selectorBehindObj.shareValue = v.num;
      },
      changeSelectorTwo(value){
        if(value.length === 1){
          this.selectorBehindObj.labelId=value[0];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0]
        }else if(value.length === 2){
          this.selectorBehindObj.labelId=value[1];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1]
        }else if(value.length === 3){
          this.selectorBehindObj.labelId=value[2];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2]
        }else if(value.length === 4){
          this.selectorBehindObj.labelId=value[3];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3]
        }else if(value.length === 5){
          this.selectorBehindObj.labelId=value[4];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4]
        }else if(value.length === 6){
          this.selectorBehindObj.labelId=value[5];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4] + "/" + this.$refs.fuwugongzhong.currentLabels[5]
        }else if(value.length === 7){
          this.selectorBehindObj.labelId=value[6];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[6]
        }
      },
      handleItemChange(val) {

      },
      preserve(item,index){        //保存
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

            this.$message({
              message: '请选择城市',
            });
            return ;
          }
          if(!this.selectorBehindObj.labelId||""==this.selectorBehindObj.labelId){
            this.$message({message:"请选择服务工种"});
            return ;
          }
          if(!this.selectorBehindObj.masterType||""==this.selectorBehindObj.masterType){

            this.$message({message:"请选择师傅类型"});
            return ;
          }
          if(!this.selectorBehindObj.masterLevel||""==this.selectorBehindObj.masterLevel){
            this.$message({message:"请选择师傅等级"});
            return ;
          }
          var param = {params: this.selectorBehindObj};
          let url = this.$apidomain + "/mastercommissionconfig/findlistmasterCommissionConfig";
          this.$http.get(url, param).then(r => {
            let data = r.data;
            this.RemindedDataList = data.result;
            this.isAdd = false;
            if (func) {
              func(_this);
            }
          })
//          })
        }else{
          if(func){
            func(_this);
          }
        }
      },
      add(value){
        console.log(this.selectorBehindObj)
        console.log(this.RemindedList[0].SourceType)
        //1.先查询4个维度下的所有费用类型数据
        //2.判断当前数据是否包含在内
        //3.如果存在则update 否则add

        this.queryData(_this=>{

          let url=this.$apidomain+"/mastercommissionconfig/savemasterCommissionConfig";
            this.$http.post(url,this.selectorBehindObj).then(res=>{
              let data = res.data;
              this.selectorBehindObj.id = data.result;
//              var o = JSON.parse(JSON.stringify(this.selectorBehindObj));
//              this.RemindedDataList.push(o);
              this.quiry();
            })
//          }
        });
      },
      refuse(){
        return this.$store.state.refuse
      },

      selector(item, values, SourceTypeValue) {
        console.log(values)//选中后的下拉列表
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

  }
</script>


<style scoped lang="scss">
  @import "../../assets/styles/commButton";

  img {
    margin: 0 16px;
    transform: translateY(10px);
  }
  .container {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width: 960px;
    height: 620px;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding-top: 0;
    > h3 {
      height: 68px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      font-family: MicrosoftYaHei;
      text-align: center;
      letter-spacing: 0;
      border-bottom: 2px solid rgba(151, 151, 151, 1);
    }
    .content {
      padding: 19px 30px;
      width: 100%;
      height: 420px;
      .left_info {
        float: left;
        display: inline-block;
        width: 400px;
        height: 420px;
        .title {
          width: 400px;
          height: 30px;
          background: rgba(240, 240, 240, 1);
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          padding: 0 11px;
        }
        ul {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          li {
            width: 100%;
            height: 40px;
            margin-top: 18px;
          }
        }
      }
      #xian {
        float: left;
        position: absolute;
        left: 475px;
        top: 112px;
        display: inline-block;
        border: 1px solid rgba(151, 151, 151, 1);
        height: 345px;
      }
      .right_info {
        float: left;
        margin-left: 88px;
        display: inline-block;
        width: 400px;
        height: 420px;
        .title {
          width: 400px;
          height: 30px;
          background: rgba(240, 240, 240, 1);
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          padding: 0 11px;
        }
        ul {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          li {
            width: 100%;
            margin-top: 18px;
          }
        }
      }
    }

    .closeX {
      background: url(../../../static/images/del.png) center center no-repeat;
      background-size: 100% 100%;
      background-origin: content-box;
    }
  }
</style>
<style lang="scss">
  .bnt {
    .el-botton {
      background: red;
    }
  }

  .el-select-dropdown__item {
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-cascader-menus{
    z-index: 9999 !important;
  }

  #btn {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 38px;
    button {
      width: 200px;
      height: 40px;
      text-align: center;
      margin-left: 28%;
      margin-right: 10px;
    }
  }

  #listName {
    width: 100%;
    .el-input {
      width: 260px;
    }
    .el-cascader__label {
      line-height: 40px !important;
    }
  }
</style>
