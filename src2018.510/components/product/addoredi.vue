<template>
  <div id="app">
    <div class="container">
      <div class="user_sum">
        <span style="color:#000">{{isAddOrder.title}}</span>
      </div>
      <div class="selector_list">
        <div v-show="!isAdd">
          <ul>
            <li>全部分类:{{dataObj.fullName}}</li>
            <li>商品类型:{{dataObj.isSecondPayment}}</li>
            <li>上门费:{{dataObj.price1}}元</li>
            <li>收取高空费:{{dataObj.isHighFees}}</li>
          </ul>
        </div>
        <div v-show="isAdd" class="list">
          一级分类 :
          <el-select
            v-model="skillId.SourceTypeValue" placeholder="请选择" @change="selector(skillId,skillId.SourceType,skillId.SourceTypeValue)">
            <el-option
              v-for="items in skillId.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <div v-show="isAdd" class="list">
          分类：
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="props"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </div>
        <div v-show="isAdd" class="list">
          商品类型 :
          <el-select
            v-model="isSecondPayment.SourceTypeValue" placeholder="请选择" @change="selector(isSecondPayment,isSecondPayment.SourceType,isSecondPayment.SourceTypeValue)">
            <el-option
              v-for="items in isSecondPayment.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <div v-show="isAdd" class="list">
          上门费 :
          <el-input
            placeholder="单行输入"
            v-model="selectorBehindObj.price1">
          </el-input>
        </div>
        <div v-show="isAdd" class="list">
          收取高空费 :
          <el-radio-group v-model="selectorBehindObj.isHighFees">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="dable_lsit">
        <div><span>费用编辑</span></div>
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in dataList">
            <td>
              {{item.productName}}
            </td>
            <td>
              {{item.serviceType}}
            </td>
            <td>
              <el-input-number v-model="item.price" :min="0"></el-input-number>
            </td>
            <td>
              <span @click="accessories(item)"> <i></i>配件维护</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-show="isAdd" class="btn_inquiry" @click="saveProduct">
          保存
        </div>
      </div>
      <div class="dable_lsit" v-if="showflag">
        <div class="user_sum">
          <span>服务类型</span>
          <span>{{serviceTitle}}</span>
        </div>
        <div class="derive">
          <el-button @click="addParets()" size="large">新增</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName2" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in serviceMountings">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              <span @click="deleteItem(item.id)"> <i class="el-icon-delete"></i>删除</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hsy-dialog class="confirm addService-dialog" v-model="addParetsFlag" :closeButton="false" :clickMask2Close="false">
      <div slot="title">新增配件</div>
      <div class="dialogContent" slot="body">
        <addParets @closeReset="closeReset" :parets="paretsData" @submitData="newParets"></addParets>
      </div>
    </hsy-dialog>
    <p class="closeX" @click="isAddOrder.isShow=false"></p>
  </div>
</template>
<script>
  import productSum from "./components/productSum.vue"
  import addParets from './components/addParets.vue'
  export default {
    props:["isAddOrder"],
    components:{
      productSum,
      addParets
    },
    data() {
      return {
        dataObj:{},
        isAdd:true,
        dataList:[],
        serviceTitle:'',
        serviceMountings:[],
        paretsData:{},
        addParetsFlag:false,
        showflag: false,
        isSecondPayment:{
          name: "是否二次付款",
          key: "isSecondPayment",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '是',
              id: "1"
            }, {
              value: '否',
              id: "0"
            }
          ]
        },
        skillId:{
          name: "一级分类",
          key: "skillId",
          SourceTypeValue: '',
          SourceType: this.$store.state.classifyData
        },
        productType: '',
        theadsName:[
          '商品名称',
          '服务类型',
          '价格',
          '操作'
        ],
        theadsName2:[
          '序号',
          '配件名称',
          '价格',
          '操作'
        ],
        name: '',
        cityId: '', //城市id
        options: [],
        props: {
          value: 'a',
          label: 'b',
          children: 'beans'
        },
        selectedOptions2: [],
        selectorBehindObj: {"price1":"0.00","isHighFees": 0},
      }
    },
    created(){

    },
    methods: {
      del(item,index){
        let url=this.$apidomain+"/siteCommissionConfig/deleteSiteCommissionConfig";
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
          if(!this.selectorBehindObj.labelId||""==this.selectorBehindObj.labelId){
            alert("请选择分类...");
            return ;
          }
          var param = {params:this.selectorBehindObj};
          let url=this.$apidomain+"/articleinfo/findDefaultListServiceInfo";
          this.$http.get(url,param).then(r=>{
            let data=r.data;
            this.dataList = data.result;

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
          this.RemindedDataList.forEach((v,i)=>{
            if(v.feeTypeKey==this.selectorBehindObj.feeTypeKey){
              isin = true;
            }
          });
          if(isin){
            alert("已重复新增费用类型");
            return ;
          }else{
            let url=this.$apidomain+"/siteCommissionConfig/saveSiteCommissionConfig";
            this.$http.post(url,this.selectorBehindObj).then(res=>{
              let data = res.data;
              this.selectorBehindObj.id = data.result.id;
              var o = JSON.parse(JSON.stringify(this.selectorBehindObj));
              this.RemindedDataList.push(o);
              this.quiry();
            })
          }
        });
      },
      selector(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            if(key==="skillId"){
              let url=this.$apidomain+"/articleinfo/findlabelbusinessbyflabel?id="+this.selectorBehindObj.skillId;
              this.options=[];
              this.$http.get(url).then(r=>{
                var data=r.data;
                this.options.push(data.result);
              });
            }
          }
        })
      },
      saveProduct(){

      },
      deleteItem (id){
        this.$confirm('此操作将删除，是否继续？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架操作'
          });
        });
      },
      addParets() {
        this.addParetsFlag =true
      },
      accessories(item){
        this.showflag = true
        this.serviceType = item.serviceType

      },
      handleChange(value) {
        let url = `${this.$apidomain}/articleinfo/checkServiceInfo?labelId=${value[value.length-1]}`
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            if(!data.result){
              value = [];
              alert("当前分类并非末级分类...");
            }else{
              this.selectorBehindObj.labelId = value[value.length-1];
              this.queryData();
            }
          }else{
            alert("当前分类并非末级分类...");
          }
        })
      },
      closeReset(){
        this.addParetsFlag=false
      },
      //弹框组件回来的数据
      newParets(item){
        this.addParetsFlag =false
        console.log(item)
      },
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  #app{
    .city{
      padding:0;
    }
    .alert{
      width:100vw;
      height:100vh;
      background:rgba(0,0,0,0.6);
      position:absolute;
      top:0;
      z-index:9999;
      right:0;
      .btn{
        position:absolute;
        bottom:17%;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        overflow: hidden;
        button{
          width:200px;
          cursor:pointer;
          line-height:44px;
          border:none;
          padding:0;
          margin:0;
          transform: rotate(-360deg);
          border: 1px solid #979797;
          border-radius: 4px;
          float:left;
          background:#fff;
          outline:none;
        }
        .selector{
          color:#fff;
          background: #279447;
        }
      }
    }
    .top_nav{
      font-size:14px;
      width:100%;
      .user_type{
        padding:10px 60px;
        background: #EBDDF6;
        color:#000;
        cursor:pointer;
      }
      .selector{
        background: #A470CD;
        color:#fff;
        font-size:14px;

      }
    }
    >.container{
      font-size:14px;
      width:100%;
      overflow:hidden;
      >.user_sum{
        width:100%;
        height:20px;
        float:left;
        >span{
          margin-right:35px;
          color:blue;
          font-size:14px;
          >b{
            font-weight:normal;
            color:#000;

          }
        }
        >span:last-of-type{
          color:green;
          font-size:14px;
        }

      }
      >.selector_list{
        width:100%;
        overflow: hidden;
        margin-top:40px;
        >.list{
          float:left;
          line-height:60px;
          list-style:none;
          font-size:14px;
          margin-right:5%;

        }
        .el-input{
          width:auto;
        }

        >.list:nth-of-type(3n){
          /*margin-right:0;*/
        }
      }
      .btn_inquiry{
        width:200px;
        height:44px;
        margin:0 auto;
        cursor:pointer;
        margin-top:30px;
        text-align:center;
        line-height:44px;
        background: #A470CD;
        border-radius: 4px;
        color:#fff;
      }
    }
    .dable_lsit{
      margin-top:50px;
      width:50%;
      >.paging{
        text-align:right;
        width:100%;
        line-height:50px;
        >input,select{
          width:42px;
          height:20px;
          padding:0;
        }
        >.link_page{
          background: #1C5B94;
          color:#fff;
        }
        .home{
          float:right;
        }
        .last_page{
          color:blue;
          margin-left:10px;
        }
        .el-pagination{
          float:right;
          padding-top:12px;
        }
      }
      margin-bottom:200px;
      table{
        width:100%;
        .theads{

          >th{
            padding:10px 10px;
            text-align:center;
            background: #E5E9F2;
            box-shadow: inset 0 1px 0 0 #E0E6ED,
            inset 0 -1px 0 0 #E0E6ED;

          }
          >.multiple{
            width:30px;
            cursor:pointer;
            box-size:border-box;
          }
        }
        >tbody{
          >tr{
            border-top:1px solid #ccc;
            >td{
              border-bottom:1px solid #ccc;
              padding:10px 10px;
              text-align:center;
            }
            >td:first-of-type{
              border-right:1px solid #ccc;
            }
            >td:last-of-type{
              padding-top:0;
              padding-bottom:0;
              >span{
                height:100%;
                float:left;
                padding-top:4px;

                padding-left:30px;
                i{
                  width:16px;
                  height:16px;
                  background:url(../../../static/images/ban.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                  margin-right:3px;

                  vertical-align: middle;
                }
              }
              >span:last-of-type{
                float:right;
                padding-left:0px;
                padding-top:8px;
                padding-right:20px;
                cursor:pointer;
                i{
                  width:16px;
                  height:16px;
                  margin-top:3px;
                  background:url(../../../static/images/detailed.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                }
              }
            }
          }
          >tr:nth-of-type(even){
            background: #F9FAFC;
          }
        }
      }
      >.derive{
        float:right;
      }
    }
  }
  #city{
    line-height:40px;
  }
  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }
  .addService-dialog{
    z-index: 300;
  }
  .dialogContent{
    height:500px;
    overflow: scroll;
  }
  .closeX{
    background:url(../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    right:0;
    transform:translateY(100%);
    background-origin: content-box;
  }
</style>
