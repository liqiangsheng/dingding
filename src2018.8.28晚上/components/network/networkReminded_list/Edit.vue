
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{edit.title}}  <p class="closeX" id="closeX" @click="shutAlert"></p></h3>
      <div class="content">
        <div class="left_info">
          <p class="title">基本信息</p>
          <ul v-if="isAdd">
            <li v-for="(item,index) in optionList">
              <span class="list_name">{{item.name}} </span>
              <el-select style="width: 260px;margin-left: 14px;height: 40px"
                v-model="item.SourceTypeValue" :placeholder="'请选择'+item.name" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in item.SourceType"
                  :key="index"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <br>
              <span v-show="item.isBool" style="color: red;margin-left: 100px">{{item.isBool}}</span>
            </li>
            <li v-for="(item,index) in skillIdList">
              <span class="list_name">{{item.name}} </span>
              <el-select style="width: 260px;margin-left: 14px;height: 40px"
                v-model="item.SourceTypeValue" :placeholder="'请选择'+item.name" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in item.SourceType"
                  :key="index"
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
              <br>
              <span v-show="skillsOne" style="color: red;margin-left: 100px">{{skillsOne}}</span>
            </li>
          </ul>
          <ul v-else>
            <li>所属城市 :{{selectorBehindObj.site}}</li>
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
              <el-input type="number" style="height: 40px" v-model="item.shareValue"
                        :max="item.shareTypeKey==='Quota'?1000:100"></el-input>
              {{item.shareTypeKey|shareTypeKeyShow}}
              <span class="course" @click="preserve(item,index)">
                   保存
              </span>
              <span class="course" @click="del(item,index)">
                  删除
              </span>
            </li>
            <li v-for="(item,index) in RemindedList">
              <span class="list_name">{{item.name}}</span>
              <el-select style="width: 260px;margin-left: 14px;height: 40px"
                v-model="item.SourceTypeValue" :placeholder="'请选择'+item.name" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in item.SourceType"
                  :key="index"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <br>
              <span style="color: red;margin-left: 100px" v-show="item.isBool">{{item.isBool}}</span>
            </li>
            <li>
              <span class="list_name">提点类型</span>
              <el-select style="width: 260px;margin-left: 14px;height:40px;"
                         v-model="Reminded[0].SourceTypeValue"
                         placeholder="请选择提点类型"
                         @change="selector(Reminded[0],Reminded[0].SourceType,Reminded[0].SourceTypeValue)">
                <el-option
                  v-for="(items,index) in Reminded[0].SourceType"
                  :key="index"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <br>
              <span v-show="Reminded[0].isBool1" style="color: red;margin-left: 100px">{{Reminded[0].isBool1}}</span>
            </li>

            <li>
              <span class="list_name">{{Reminded[0].name}}</span>
              <el-input-number v-model="number" :min="0" :max="maxNum"
                               :placeholder="'请填写'+Reminded[0].name"
                               style="width: 260px;margin-left: 14px;height: 40px"></el-input-number>
              <br>
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
        skillsOne: "",
        skillsOne1: "",
        labeloptions2: [],
        isKeXuan: true,
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
        isAdd: true,
        skillIdList: [],
        optionList: [
          {
            name: "网点",
            key: "siteId",
            isBool: '',
            SourceTypeValue: '',
            SourceType: []
          }
        ],
        number: "1",
        Reminded: [
          {
            name: "提点",
            key: "shareTypeKey",
            isBool: '',
            isBool1:"",
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
      }
    },
    created() {
      if (this.edit.item) {
        this.selectorBehindObj = this.edit.item;
        this.selectorBehindObj.shareValue = "";
        this.selectorBehindObj.shareTypeKey = "";
        this.selectorBehindObj.feeTypeKey = "";
        this.queryData()
      } else {

      }
      //分类 start
      let url = this.$apidomain + "/common/findlabelbusinessoptions";
      this.$http.get(url).then(r => {
        r.data.result.forEach((v, i) => {
          let urlTwo = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + v.id;
          this.$http.get(urlTwo).then(res => {
            if (res.data.code === "0000") {
              this.labeloptions2.push(res.data.result)
            }
          })
        });
      });

//分类 end
//网点名 start
      let urlName = this.$apidomain + "/siteInfo/findlistSiteInfo";
      this.$http.get(urlName).then(r => {
        let data = r.data;
        if (data.code === "0000") {
          let res = data.result;

          this.getData({optionLists: this.optionList, key: "siteId", resName: "name", data: res})
        }
      })
//网点名 end
    },
    methods: {
      handleItemChange() {

      },
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
      preserve(item, index) {
        let url = this.$apidomain + "/siteCommissionConfig/updateSiteCommissionConfig";
        this.$http.post(url, item).then(res => {
          let data = res.data;
          this.quiry();
        })
      },
      del(item, index) {
        let url = this.$apidomain + "/siteCommissionConfig/deleteSiteCommissionConfig";
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
          let param = {params:{
            feeType:this.edit.item.feeType,
            feeTypeKey:this.edit.item.feeTypeKey,
            id:this.edit.item.id,
            labelId:this.edit.item.labelId,
            labelName:this.edit.item.labelName,
            shareTypeKey:this.edit.item.shareTypeKey,
            shareValue:this.edit.item.shareValue+"",
            site:this.edit.item.site,
            siteId:this.edit.item.siteId,
          }}
//          var param = {params: this.selectorBehindObj};
          let url = this.$apidomain + "/siteCommissionConfig/findlistSiteCommissionConfig";
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
        if (!this.selectorBehindObj.siteId || "" == this.selectorBehindObj.siteId) {
          this.optionList[0].isBool = "请选择网点"
          return;
        } else {
          this.optionList[0].isBool = ""
        }
        if (!this.selectorBehindObj.labelId || "" == this.selectorBehindObj.labelId) {
          this.skillsOne = "请选择服务工种"
          return;
        } else {
          this.skillsOne = ""
        }
        this.selectorBehindObj.shareValue = this.number;
        if (!this.selectorBehindObj.feeTypeKey || "" == this.selectorBehindObj.feeTypeKey) {

          this.RemindedList[0].isBool = "请选择提点类型";
          return;
        }else{
          this.Reminded[0].isBool1 = ""
        }
        if (!this.selectorBehindObj.shareTypeKey || "" == this.selectorBehindObj.shareTypeKey) {
          this.Reminded[0].isBool1 = "请选择提点类型"
          return;
        }else{
          this.RemindedList[0].isBool = "";
        }

        if (!this.selectorBehindObj.shareValue || "" == this.selectorBehindObj.shareValue) {
          this.Reminded[0].isBool = "请填写提点"
          return;
        }else{
          this.Reminded[0].isBool = "";
        }
        this.queryData(_this => {
          let isin = false;
          this.RemindedDataList.forEach((v, i) => {
            if (v.feeTypeKey == this.selectorBehindObj.feeTypeKey) {
              isin = true;
            }
          });
          if (isin) {
            this.alert("已重复新增费用类型");
            return;
          } else {
            let url = this.$apidomain + "/siteCommissionConfig/saveSiteCommissionConfig";
            this.$http.post(url, this.selectorBehindObj).then(res => {
              let data = res.data;
              this.selectorBehindObj.id = data.result.id;
              let o = JSON.parse(JSON.stringify(this.selectorBehindObj));
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
            if ("siteId" == key) {
              this.selectorBehindObj.site = v.value;
            }
            if ("feeTypeKey" == key) {
              this.selectorBehindObj.feeType = v.value;
            }
          }
        })
      },
      //关闭弹框
      shutAlert() {
        this.edit.isShow = false;
      },


      //封装
      getData(obj) {
        obj.optionLists.forEach(v => {
          if (obj.key === v.key) {
            obj.data.forEach(v2 => {
              v.SourceType.push({"id": v2.id, "value": v2[obj.resName]})
            })
          }
        })
      },
      alert(text) {
        this.$message({
          message: text,
        });
      },
    },
    mounted() {

    },
    watch: {
      skillsOne1: function (new1, old1) {
        if (new1 != "") {
          this.skillsOne = "";
        } else {
          this.skillsOne = "请选择服务工种";
        }
      },
      optionList: {
        handler: function (new1, old1) {
          if (new1[0].SourceTypeValue != "") {
            this.optionList[0].isBool = "";
          }

        },
        deep: true,
      },
      RemindedList:{
        handler:function(new1,old1){
          if(new1[0].SourceTypeValue!=""){
            this.RemindedList[0].isBool = ""
          }
        },
        deep:true,
      },
      number:function (new1,old) {
        if(new1 >0&&new1<=this.maxNum){
          this.Reminded[0].isBool = ""
        }else {
          this.Reminded[0].isBool = "请填写提点"
        }
      },
      Reminded:{
        handler:function(new1,old1){
          if(new1[0].SourceTypeValue!= ""){

            this.Reminded[0].isBool1 = ""
          }
        },
        deep:true,
      },
    },



  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";

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
      background: url(../../../../static/images/del.png) center center no-repeat;
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
  .el-select-dropdown__item{
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
