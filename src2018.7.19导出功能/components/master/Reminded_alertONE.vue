<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{edit.title}}  <p class="closeX" id="closeX" @click="shutAlert"></p></h3>
      <div class="content">
        <div class="left_info">
          <p class="title">基本信息</p>
          <ul v-if="isAdd" class="add_reminded">
            <li v-for="(item,index) in optionList" :key="index">
              <span class="list_name">{{item.name}}</span>
              <el-select style="width: 260px;margin-left: 14px;height: 40px"
                         v-model="item.SourceTypeValue" :placeholder="'请选择'+item.name"
                         @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <br>
              <span v-show="item.isBool" style="color: red;margin-left: 100px">{{item.isBool}}</span>
            </li>
            <li id="listName">
              <span class="list_name">服务工种</span>
              <el-cascader ref="fuwugongzhong" id="labelId" style="width: 260px;margin-left: 14px;height: 40px"
                           @change="changeSelectorTwo"
                           :options="labeloptions2"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props1"
              ></el-cascader><br>
              <span v-show="skillsOne" style="color: red;margin-left: 100px">{{skillsOne}}</span>
            </li>
          </ul>
          <ul v-else>
            <li>师傅类别 :{{selectorBehindObj.masterType | mastertype}}</li>
            <li>师傅等级 :{{selectorBehindObj.masterLevel | masterLevel}}</li>
            <li>服务城市 :{{selectorBehindObj.area | placeholder}}</li>
            <li>服务工种 :{{selectorBehindObj.labelName}}</li>
          </ul>
        </div>
        <div id="xian"></div>
        <div class="right_info">
          <p class="title">业务类别提点</p>
          <ul>
            <li v-for="(item,index) in RemindedDataList" class="edit_open" v-show="isShow">
              <span class="list_name"> {{item.feeType}}</span>
              &nbsp;
              &nbsp;
              <el-input style="height: 40px" type="number" v-model="item.shareValue"
                        :max="item.shareTypeKey==='Quota'?1000:100"></el-input>
              {{item.shareTypeKey | shareTypeKeyShow}}
              <span class="course" @click="preserve(item,index)">
                   保存
              </span>
              <span class="course" @click="del(item,index)">
                  删除
              </span>
            </li>
            <li v-for="(item,index) in RemindedList" :key="index">
              <span class="list_name"> {{item.name}}</span>
              <el-select style="width: 260px;margin-left: 14px;height:40px;"
                         v-model="item.SourceTypeValue" :placeholder="'请选择'+item.name"
                         @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select><br>
              <span style="color: red;margin-left: 100px" v-show="item.isBool">{{item.isBool}}</span>
            </li>
            <li>
              <span class="list_name">提点类型</span>
              <el-select style="width: 260px;margin-left: 14px;height:40px;"
                         v-model="Reminded[0].SourceTypeValue"
                         placeholder="请选择提点类型"
                         @change="selector(Reminded[0],Reminded[0].SourceType,Reminded[0].SourceTypeValue)">
                <el-option
                  v-for="items in Reminded[0].SourceType"
                  :key="items.value"
                  :value="items.value" >
                </el-option>
              </el-select><br>
              <span v-show="Reminded[0].isBool1" style="color: red;margin-left: 100px">{{Reminded[0].isBool1}}</span>
            </li>
            <li>
              <span class="list_name"> {{Reminded[0].name | placeholder}}</span>
              <el-input-number v-model="number" :min="1" :max="maxNum"
                               style="width: 260px;margin-left: 14px;height: 40px"></el-input-number><br>
              <span style="color: red;margin-left: 100px" v-show="Reminded[0].isBool">{{Reminded[0].isBool}}</span>

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
    props: ["edit", "quiry"],
    data() {
      return {
        maxNum:100,
        skillsOne : "",
        skillsOne1 : "",
        labeloptions2: [],
        isKeXuan: true,
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
        isAdd: true,
        optionList: [
          {
            name: "师傅类别",
            key: "masterType",
            isBool:"",
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
          }, {
            name: "师傅等级",
            key: "masterLevel",
            isBool:"",
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
          }, {
            name: "服务城市",
            key: "areaId",
            isBool:"",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        number: "",
        Reminded: [
          {
            name: "提点",
            key: "shareTypeKey",
            isBool1:"",
            isBool:"",
            SourceTypeValue: '', //选中后的
            SourceType: [
              {
                value: '%',
                id: "Proportion"
              }, {
                value: '元/单',
                id: "Quota"
              }
            ]
          },
        ],
        RemindedList: [
          {
            name: "费用类别",
            key: "feeTypeKey",
            isBool:"",
            SourceTypeValue: '', //选中后的
            SourceType: [
              {
                value: '上门费',
                id: "prince1"
              }, {
                value: '服务费',
                id: "prince2"
              }, {
                value: '配件费',
                id: "prince3"
              }, {
                value: '高空费',
                id: "prince4"
              }
            ]
          },
        ],
        RemindedDataList: [],
        potionValueId: '',
        isShow: true,
        selectorBehindObj: {},
        props: {
          value: 'label',
          children: 'cities',
        },
//        labeloptions2: [],
      }
    },
    watch:{
      number:function (new1,old) {
        if(new1 >0&&new1<=this.maxNum){
          this.Reminded[0].isBool = ""
        }
      },
      Reminded:{
        handler:function(new1,old1){
          console.log(new1[0].SourceTypeValue)
          if(new1[0].SourceTypeValue!= ""){

            this.Reminded[0].isBool1 = ""
          }
        },
        deep:true,
      },
      RemindedList:{
        handler:function(new1,old1){
          if(new1[0].SourceTypeValue!=""){
            this.RemindedList[0].isBool = ""
          }
        },
        deep:true,
      },
      skillsOne1:function (new1,old1) {
        if(new1 !=""){
          this.skillsOne = "";
        }
      },
      optionList:{
        handler:function(new1,old1){
          if(new1[0].SourceTypeValue != ""){
            this.optionList[0].isBool = "";
          }
//          else{
//            this.optionList[0].isBool = "请选择师傅类别";
//          }
          if(new1[1].SourceTypeValue != ""){
            this.optionList[1].isBool = "";
          }
//          else{
//            this.optionList[1].isBool = "请选择师傅等级";
//          }
          if(new1[2].SourceTypeValue != ""){
            this.optionList[2].isBool = "";
          }
//          else{
//            this.optionList[2].isBool = "请选择服务城市";
//          }
        },
        deep: true,
      },

    },

    created() {
      if (this.edit.item) {
        this.selectorBehindObj = this.edit.item;
        this.selectorBehindObj.shareValue = "";
        this.selectorBehindObj.shareTypeKey = "";
        this.selectorBehindObj.feeTypeKey = "";
        this.queryData();
      } else {
        let url = this.$apidomain + "/common/findcitylistareainfo";
        this.$http.get(url).then(r => {
          let data = r.data;
          this.optionList.forEach((v) => {
            if ("areaId" === v.key) {
              data.result.forEach((v2) => {
                v.SourceType.push({"id": v2.id, "value": v2.name});
              })
            }
          });
        });
        url = this.$apidomain + "/common/findflabelbusinessname";
        this.$http.get(url).then(r => {
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
      changeSelectorTwo(value) {
        this.skillsOne1 = 1;
        if (value.length === 1) {
          this.selectorBehindObj.labelId = value[0];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0]
        } else if (value.length === 2) {
          this.selectorBehindObj.labelId = value[1];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1]
        } else if (value.length === 3) {
          this.selectorBehindObj.labelId = value[2];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2]
        } else if (value.length === 4) {
          this.selectorBehindObj.labelId = value[3];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3]
        } else if (value.length === 5) {
          this.selectorBehindObj.labelId = value[4];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4]
        } else if (value.length === 6) {
          this.selectorBehindObj.labelId = value[5];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4] + "/" + this.$refs.fuwugongzhong.currentLabels[5]
        } else if (value.length === 7) {
          this.selectorBehindObj.labelId = value[6];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[6]
        }
      },
      handleItemChange(val) {

      },
      preserve(item, index) {        //保存
        console.log(item);
        let url = this.$apidomain + "/mastercommissionconfig/updateMasterCommissionConfig";
        this.$http.post(url, item).then(res => {
          let data = res.data;
          this.quiry();
        })
      },
      del(item, index) {           //删除
        console.log(item);
        let url = this.$apidomain + "/mastercommissionconfig/deletemasterCommissionConfig";
        this.$http.post(url, item).then(res => {
          let data = res.data;
          this.RemindedDataList.splice(index, 1);
          this.quiry();
        })
      },
      queryData(func) {
        var _this = this;
        if (this.isAdd) {
          //维度数据检查


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
        } else {
          if (func) {
            func(_this);
          }
        }
      },
      add(value) {
        //1.先查询4个维度下的所有费用类型数据
        //2.判断当前数据是否包含在内
        //3.如果存在则update 否则add
        this.selectorBehindObj.shareValue = this.number;
        if (!this.selectorBehindObj.masterType || "" == this.selectorBehindObj.masterType) {
          this.optionList[0].isBool = "请选择师傅类型"
          return;
        }else{
          this.optionList[0].isBool = ""
        }

        if (!this.selectorBehindObj.masterLevel || "" == this.selectorBehindObj.masterLevel) {
          this.optionList[1].isBool = "请选择师傅等级"
          return;
        }else{
          this.optionList[1].isBool = ""
        }
        if (!this.selectorBehindObj.areaId || "" == this.selectorBehindObj.areaId) {
          this.optionList[2].isBool = "请选择城市"
          return;
        }else{
          this.optionList[2].isBool = ""
        }
        if (!this.selectorBehindObj.labelId || "" == this.selectorBehindObj.labelId) {
          this.skillsOne ="请选择服务工种"
          return;
        }else{
          this.skillsOne =""
        }
        if (!this.selectorBehindObj.feeTypeKey || "" === this.selectorBehindObj.feeTypeKey) {
          this.RemindedList[0].isBool = "请选择费用类别"
          return;
        }else{
          this.RemindedList[0].isBool = ""
        }
        if (!this.selectorBehindObj.shareTypeKey || "" === this.selectorBehindObj.shareTypeKey) {
          this.Reminded[0].isBool1 = "请选择提点类型"
          return;
        }else{
          this.Reminded[0].isBool1 = "";
        }

        if (!this.selectorBehindObj.shareValue || "" === this.selectorBehindObj.shareValue) {
          this.Reminded[0].isBool = "请填写提点"
          return;
        }else{
          this.Reminded[0].isBool = ""
        }
        this.queryData(_this => {
          let isin = false;
          this.RemindedDataList.forEach((v, i) => {
            if (v.feeTypeKey == this.selectorBehindObj.feeTypeKey) {
              isin = true;
            }
          });
          if (isin) {
            this.$message({
              message: "已重复新增费用类型"
            });
            return;
          } else {
            let url = this.$apidomain + "/mastercommissionconfig/savemasterCommissionConfig";
            this.$http.post(url, this.selectorBehindObj).then(res => {
              let data = res.data;
              this.selectorBehindObj.id = data.result;
              var o = JSON.parse(JSON.stringify(this.selectorBehindObj));
              this.RemindedDataList.push(o);
              this.quiry();
            })
          }
        });
      },
      refuse() {
        return this.$store.state.refuse
      },

      selector(item, values, SourceTypeValue) {       //选中后的下拉列表
        if(SourceTypeValue == "元/单"){
          this.maxNum = 1000;
          this.number = 1;
        }else{
          this.maxNum = 100;
          this.number = 1;
        }
        var key = item.key;
        values.forEach((v, i) => {
          if (v.value === SourceTypeValue) {
            this.selectorBehindObj[key] = v.id;
            if ("areaId" === key) {
              this.selectorBehindObj.area = v.value;
            }
            if ("feeTypeKey" === key) {
              this.selectorBehindObj.feeType = v.value;
            }
          }
        })
      },
      //关闭弹框
      shutAlert() {
        this.edit.isShow = false;
      },
    },
    mounted() {

    },
  }
</script>


<style scoped lang="scss">
  @import "../../assets/styles/commButton";

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
            /*height: 40px;*/
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
  .course{
    cursor: pointer;
  }
  .bnt {
    .el-botton {
      background: red;
    }
  }

  .el-select-dropdown__item {
    line-height: 25px !important;
  }

  .el-select-dropdown {
    z-index: 9999 !important;
  }

  .el-cascader-menus {
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
