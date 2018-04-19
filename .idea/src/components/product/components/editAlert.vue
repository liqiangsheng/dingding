<template>
  <div>
    <el-dialog style="z-index:999999"   :visible.sync="data.isShow" size="small">
      <div class="list">
        <div class="list_name">
          城市 :
        </div>
        <el-select
          v-model="city.SourceTypeValue" placeholder="请选择" @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
          <el-option
            v-for="items in city.SourceType"
            :key="items.value"
            :value="items.name"
          >
          </el-option>
        </el-select>
      </div>
      <div style="margin-top:10px;overflow: hidden">
        <div class="list_name" style="float:left;">费用编辑 : </div>
        <table style="float:left;">
          <tbody>
            <tr>
              <td>{{tableList.fullName}}</td>
              <td>
                {{tableList.fullName}}
               </td>
            </tr>
            <tr>
              <td>上门费（元）</td>
              <td>
                <el-input style="width:100px;" v-model="tableList.price1" type="number" min="1"></el-input>
              </td>
            </tr>
            <!---->
            <tr>
              <td>上门费是否叠加</td>
              <td>
                <el-select placeholder="请选择" v-model="tableList.money">
                  <el-option  value="是">  </el-option>
                  <el-option  value="否" >  </el-option>
                </el-select>
                <!--<el-checkbox v-model="checked1" @change="yesChecked"></el-checkbox>是-->
                <!--<el-checkbox v-model="checked2" @change="noChecked"></el-checkbox>否-->
              </td>
            </tr>
            <tr>
            <!---->
            <tr>
              <td>服务类型</td>
              <td>
                {{tableList.isSecondPayment|isProductType}}
              </td>
            </tr>
            <tr>
              <td>价格（元）</td>
              <td>
                  <el-input style="width:100px;" v-model="tableList.price2" type="number" min="1">
                  </el-input>
              </td>
            </tr>
             <!---->
            <tr>
              <td>质保时间（天）</td>
              <td>
                <el-input style="width:100px;" v-model="tableList.warranty" type="number" min="0">
                </el-input>
              </td>
            </tr>
            <!---->
          </tbody>
        </table>
      </div>
      <div class="btnBox">
        <el-button style="width:120px;" class="confirm_btn" @click="cancel(data)" type="primary">取消</el-button>
        <el-button style="width:120px;" class="confirm_btn" @click="preserve(selectorBehindObj)" type="primary">保存</el-button>
        <el-button style="width:120px;" class="confirm_btn"  @click=" grounding(selectorBehindObj)" type="primary">{{state==='0'?stateNameBtn[0]:stateNameBtn[1]}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import queryFun from "@/components/commonJs/queryFun"
  export default {
    props:["data","query"],
    data() {
      return{
        checked1 :false,//选中1
        checked2:false,//选中2
        theaName:[
          {
            name:"商品名称"
          },{
            name:"费用类型"
          },{
            name:"价格（元）"
          }
        ],
        type:"shangmenfei",
        state:"0",
        stateNameBtn:["上架","下架"],
        tableList:{
          "fullName":this.data.data.fullName,
          "money":"", //上门费叠加
          "price1":"",
          "isSecondPayment":"",
          "price2":"",
          "warranty":"" //质保

        },
        selectorBehindObj:{},
        city: {
          name: "所属城市",
          key: "cityId",
          SourceTypeValue:"", //选中后的
          SourceType: this.$store.state.cityData,
          keyName:"city"
        },
      }
    },
    watch:{

    },
    mounted(){

    },
    methods: {
      yesChecked(){
          this.checked1 = this.checked1;
          this.checked2 = false;
          if(this.checked1 = true){
            this.money = "1"
          }
      },
      noChecked(){
        this.checked2 = this.checked2;
        this.checked1 = false;
        if(this.checked1 = true){
          this.money = "0"
        }
      },
      preserveSubmit(grounding){
        if(!this.tableList){
          return this.$queryFun.successAlert.call(this,"没有列表数据","0");
        }else if(!this.selectorBehindObj.cityId){
          return this.$queryFun.successAlert.call(this,"请选择城市","0");
        }else if("1"==this.tableList.isSecondPayment&&!this.tableList.price1){
          return this.$queryFun.successAlert.call(this,"请填写上门费","0");
        }else if("0"==this.tableList.isSecondPayment&&!this.tableList.price1&&0!=this.tableList.price1){
          return this.$queryFun.successAlert.call(this,"请填写上门费","0");
        }else if(!this.tableList.price2){
          return this.$queryFun.successAlert.call(this,"请填写服务费费","0");
        }
        if(this.tableList.money == "是"){
          this.tableList.money = 1;
        }else{
          this.tableList.money = 0;
        }
        console.log(this.tableList.money)
        let url=`${this.$apidomain}/serviceinfo/saveServiceAreaInfo`,

            params={
              "areaId":this.selectorBehindObj.cityId,
              "areaName":this.city.SourceTypeValue,
              "isCollectDoorFee": this.tableList.money,
              "price1":this.tableList.price1,
              "warrantyTime":this.tableList.warranty,
              "price2":this.tableList.price2,
              "serviceId":this.tableList.serviceId || this.data.data.id,
              "sort": this.tableList.sort||this.data.data.sort
            };
        let areaPutaway=this.state==="0"?"/serviceinfo/areaPutaway":"/serviceinfo/areaSoldOut",
          alertText =this.state==="0"?"上架成功":"下架成功";
        this.$http.post(url,params).then(r=>{
            let data=r.data,url =`${this.$apidomain}${areaPutaway}`;
            if(data.code==="0000"){
                if(grounding==="grounding"){
                  this.$http.post(url,{"id":this.tableList.id}).then(r=>{
                    let data=r.data;
                    if(data.code==="0000"){
                      this.$queryFun.successAlert.call(this,alertText,"1");
                      this.query();
                      this.data.isShow=false;
                    }else{
                      this.$queryFun.successAlert.call(this,data.error,"0");
                    }
                  });
                }else{
                  this.$queryFun.successAlert.call(this,"提交成功","1");
                  this.query();
                  this.data.isShow=false;
                }
            }else{
              this.$queryFun.successAlert.call(this,data.error,"0");
            }
        })
      },
      preserve(params){
        console.log(params)
        this.preserveSubmit();
      },
      grounding(params){
        this.preserveSubmit("grounding");
      },
      cancel(data){
        data.isShow=false;
      },
      selectorArea(item,values,SourceTypeValue){
        queryFun.selectorArea.call(this,item,values,SourceTypeValue,"name",this.getTableList)
 },
      getTableList(){
        let url=`${this.$apidomain}/serviceinfo/findOneAreaInfo?serviceId=${this.data.data["id"]}&areaId=${this.selectorBehindObj.cityId}`;
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(this.data.data.areaInfos){
            this.tableList=data.result;
            this.state=data.result.state;
          }
        })
      },
    },
    created() {
      this.tableList["isSecondPayment"]=this.data.data.isSecondPayment;
      if(this.data.data.areaInfos){
        this.city.SourceTypeValue=this.data.data.areaInfos[0].areaName;
        this.selectorBehindObj.cityId=this.data.data.areaInfos[0].areaId;
        this.getTableList();
      }
    }
  }
</script>
<style scoped lang="scss">
  .edit_list_name{
    >li{
      line-height: 2.5em;
    }
  }
  table{
    margin-left:4px;
    border-collapse: collapse;
    width:75%;
    text-align: center;
    tr{
      /*display: flex;*/
      border:1px solid #ccc;
      border-bottom:none;
      >td,th{
        line-height: 60px;
        /*flex:1;*/
        text-align: center;
      }
      >th{
        line-height: 30px;
      }
    }
      tr:last-of-type{
      border-bottom:1px solid #ccc;
    }
   .rows_td{
     border-right:1px solid #ccc;
     border-bottom:1px solid #ccc;
   }
  }
  .btnBox{
    width:100%;
    margin-top:20px;
    text-align: center;
  }
  .el-dialog__body{
    padding-top:0 !important;
  }
</style>



