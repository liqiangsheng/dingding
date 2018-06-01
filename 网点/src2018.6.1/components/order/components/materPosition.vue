<template>
  <div class="addMasterList">
    <C_header title="备注" left_number='2'></C_header>
    <ul>
      <li v-for="(item,index) in dataList" :key="index">
        <div>
          <p>{{item.operateTimeStr}}</p>
          <p>操作对象:{{item.operator}}</p>
          <p>类型:{{item.reasonOfComplaint}}</p>
          <p>备注:{{item.remark}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        orderid: "",
        dataList: [],
        masterId: "",
        dataObj: {"operateTimeStr": "", "remark": "", "operator": "", "reasonOfComplaint": ""}
      }

    },
    computed: {},
    created() {
      var _this = this;
      var resObj = [];
      this.orderid = this.$route.params.id;
//      this.masterId = this.$store.getters.click_single_order.order.masterId;
      let url = this.$common.apidomain + '/exceptionrecord/queryexceptionrecordIOS'
      _this.$http.post(url, {mainOrderId: this.orderid}).then(function (res) {
        //this.dataObj=res.data.result;
        let dataLists = []
        resObj = res.data.result
        console.log(resObj, '备注')
        // console.log("数据",resObj)
        for (var i = 0; i < resObj.length; i++) {
          //  console.log(resObj[i].operateTimeStr)
//          if(_this.masterId==resObj[i].operatorId&&resObj[i].operator=="用户"){
//            resObj[i].operator = "系统";
//          }
          if (resObj[i].reasonOfComplaint == null || resObj[i].reasonOfComplaint == "") {
            resObj[i].reasonOfComplaint = "无";
          }
          if (resObj[i].remark == null || resObj[i].remark == "") {
            resObj[i].remark = "无";
          }
          _this.dataObj.operateTimeStr = resObj[i].operateTimeStr;        //时间
          _this.dataObj.remark = resObj[i].remark;                        //备注
          _this.dataObj.operator = resObj[i].operator;                    //操作对象
          _this.dataObj.reasonOfComplaint = resObj[i].reasonOfComplaint;  //类型
//          dataLists.push(Object.assign({},_this.dataObj))
          dataLists.push(JSON.parse(JSON.stringify(_this.dataObj)));


        }

        _this.dataList = dataLists;

      })

    },
    methods: {}

  }
</script>
<style scoped lang="less">
  .addMasterList {
    width: 100%;
    height: 120%;
    position: absolute;
    top: -.96rem;
    background: #ECECEC;
    ul {
      margin-top: 1.5rem;
    }
    ul li {
      margin: .2rem;
      background: #FFFFFF;
      padding: .1rem;
      border-radius: .14rem;
      div {
        width: 6.8rem;
        margin: 0 auto;
        font-family: Microsoft Yahei;
        p:nth-of-type(1) {
          color: gray;
          text-align: center;
          font-size: .24rem;
          margin-bottom: .2rem;
        }
      }
    }
  }
</style>




