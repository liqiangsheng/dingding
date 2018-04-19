<template>
  <div id="app">
    <el-dialog style="z-index:99999"   :visible.sync="isAddProduct.isShow" size="tiny">
      <h3>{{isAddProduct.title}}</h3>
      <ul>
        <li>工单号：{{isAddProduct.data.id}}</li>
        <li>
          服务清单：
          <div class="dable_lsit">
            <!--导出按钮-->
            <!--导出按钮结束-->
              <!--表格数据-->
              <table cellSpacing="0px" cellpadding="0">
                <thead>
                <tr class="theads">
                  <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tableList">
                  <td>
                    {{index+1}}
                  </td>
                  <td>
                    {{item.fullName}}
                  </td>
                  <td>
                    {{item.serviceTags}}
                  </td><td>
                    {{item.size}}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <!--表格数据结束-->
            <!--分页组件-->
            <!--分页组件结束-->
        </li>
      </ul>

      <ul class="alert_forbidden_text">
        <li>
          上门费:{{objData.price1|numberShow}}
          服务费:{{objData.price2|numberShow}}
          配件费:{{objData.price3|numberShow}}
          高空费:{{objData.price4|numberShow}}
          总计:{{objData.total|numberShow}}
          优惠金额:{{objData.originalTotal-objData.total-objData.cashbackAmount-objData.refundAmount|numberShow}}
          原总计:{{objData.originalTotal|numberShow}}
        </li>
        <li  v-for="(item,index) in optionList">
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
          分类：
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="props"
            style="line-height: 55px;"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </li>
        <li id="product_option">
          产品：
          <el-select

                     @change="selector(addProductInfo.productMsg,addProductInfo.productMsg.productList,addProductInfo.productMsg.SourceTypeValue)"
                     v-model="addProductInfo.productMsg.SourceTypeValue" placeholder="请选择"
          >
            <el-option
              v-for="items in addProductInfo.productMsg.productList"
              :key="items.id"
              :value="items.name"
            >
            </el-option>
          </el-select>
        </li>
        <li v-show="label.SourceType.length>0">
          标签：
          <el-select
            v-model="label.SourceTypeValue" placeholder="请选择" @change="selector(label,label.SourceType,label.SourceTypeValue)">
            <el-option
              v-for="items in label.SourceType"
              :key="items"
              :value="items"
            >
            </el-option>
          </el-select>
          <el-tag
            v-for="tag in labels"
            :key="tag"
            :closable="true"
            :type="primary"
            @close="handleClose2(tag)"
          >
            {{tag}}
          </el-tag>
        </li>
        <li>
          数量：
          <el-input style="width:200px"
                    type="number"
                    :disabled="isDisableds"
                    placeholder="输入内容"
                    v-model="addProductInfo.sum">
          </el-input>
          <el-button style="float:right;"  @click="masterImposeOperate(addProductInfo,isAddProduct)" type="primary">+继续新增</el-button>
        </li>
      </ul>
    &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isAddProduct)">取消</el-button>
      <el-button style="float:right;"  @click="confirm(isAddProduct,tableList)">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    props:["isAddProduct","quiry"],
    data() {
      return {
        objData:{},
        isDisableds:false,
        tableList:[],
        skills:[],
        theadsName:[
          "序号",
          "产品名称",
          "标签",
          "数量",
        ],
        optionList: [],
        label:{
          name: "一级分类",
          key: "label",
          SourceTypeValue:'',
          SourceType: []
        },
        labels:[],
//        新增产品产品 start
        addProductInfo:{
          sum:"",
          masterImpose:false,
          classifyId:"",//退款ALERT
          selectorBehindObj:{},       //参数
          productMsg: {
            name: "产品",
            key: "produvtMsg",
            SourceTypeValue: '', //选中后的
            productList: []
          },

        },
//        新增产品data  End
        options: [],
        props: {
          value: 'a',
          label: 'b',
          children: 'beans'
        },
        selectedOptions2: [],
        primary:"primary",
        isIn:[],
      }
    },
    created() {
      let url=`${this.$apidomain}/orderquery/findOneDetails`;
      let params={params:{"id":this.isAddProduct.data.id}};
      this.$http.get(url,params).then(r=>{
        let data=r.data;
        if(data.code==='0000') {
          data.result.coreMainOrderServices.forEach((v)=>{
            let obj={};
            obj.id=v.id;   //数量
            obj.size=v.serviceSize;   //数量
            obj.fullName=v.serviceFullName ;//产品名称
            obj.name=v.name;
            obj.price1=v.price1;
            obj.price2=v.price2Original;
            obj.price2Discount=v.price2Discount;
            obj.price2DiscountFee=v.price2;
            obj.serviceTags = v.serviceTags;
            this.tableList.push(obj);
            this.isIn.push(v);
          });
          this.objData = data.result.coreMainOrder;
          let url=this.$apidomain+"/articleinfo/findlabelbusinessbyflabel?id="+data.result.coreMainOrder.fLabelBusiness;
          this.$http.get(url).then(r=>{
            var data=r.data;
            this.options.push(data.result);
          });
        }
      });
    },
    methods: {
      confirm(isAddProduct,tableList){
        console.log(tableList);
        console.log(this.isIn);
        if(tableList.length-this.isIn.length<=0){
          alert("请添加所需要的服务...");
          return ;
        }
        let tlist = [];
        tableList.forEach((v)=>{
          let isin=false;
          this.isIn.forEach((v1)=>{
            if(v.id===v1.id){
              isin = true;
            }
          });
          if(!isin){
            tlist.push(v);
          }
        });
        let url=`${this.$apidomain}/order/addService`,params;
        params={
          "orderid":this.isAddProduct.data.id,
          "serviceIds":JSON.stringify(tlist)
        };
        this.$http.post(url,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            console.log(data);
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success'});
            if(this.quiry){
              this.quiry();
            }
            this.isAddProduct.isShow=false;
          }else{
            this.$notify.error({
              title: '失败',
              message: data.error,
              type: 'success'});
          }
        });
      },
      cancel(item){          //取消
        item.isShow=false;
      },
      masterImposeOperate(item,isAShow){       //确定

        if(!item.selectorBehindObj.list){
          return this.$queryFun.successAlert.call(this,"请选择产品")
        }
        item.selectorBehindObj.sum=item.sum;
        isAShow.classId=item.classifyId;
        this.addProductInfo.selectorBehindObj.classifyId= this.addProductInfo.classifyId;
        let obj={};
        obj.id=item.selectorBehindObj.list.id;   //数量
        obj.size=item.selectorBehindObj.sum;   //数量
        obj.fullName=item.selectorBehindObj.list.fullName ;//产品名称
        obj.name=item.selectorBehindObj.list.name;
        obj.price1=item.selectorBehindObj.list.price1;
        obj.price2=item.selectorBehindObj.list.price2;
        obj.price2Discount=item.selectorBehindObj.list.price2Discount;
        obj.price2DiscountFee=item.selectorBehindObj.list.price2DiscountFee;
        obj.serviceTags = "";
        this.labels.forEach((v,i)=>{
          obj.serviceTags+=v+",";
        });
        if(obj.serviceTags.length>0){
          obj.serviceTags = obj.serviceTags.substring(0,obj.serviceTags.length-1);
        }
        this.objData.price2 += item.selectorBehindObj.list.price2DiscountFee*item.sum;
        this.objData.total += item.selectorBehindObj.list.price2DiscountFee*item.sum;
        this.objData.originalTotal += item.selectorBehindObj.list.price2*item.sum;

//        let isin = false;
//        this.tableDataList.forEach((v,i)=>{
//          if(v.id===obj.id){
//            v.sum = Number(v.sum);
//            obj.sum = Number(obj.sum);
//            v.sum +=obj.sum;
//            isin = true;
//          }
//        });
        this.tableList.push(obj);
//        if(!isin){
//          this.tableDataList.push(obj)
//        }

//        isAShow.isShow=false;




      },
      masterImposeSelector(item,index,textareaContent){
        item.selector=!item.selector;
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.addProductInfo.selectorBehindObj[key]=v.id;
          }
        });
        if("produvtMsg"===key){
          values.forEach((v,i)=>{
            if(v.name===SourceTypeValue){
              this.addProductInfo.selectorBehindObj[key]=v.id;
              this.addProductInfo.selectorBehindObj['list']=v;
              this.addProductInfo.sum=1;
              console.log(v);
              if("1"==v.isSecondPayment){
                this.isDisableds=true;
              }else{
                this.isDisableds=false;
              }
              if(v.tags){
                this.labels=[];
                this.label.SourceType=v.tags.split(",");
              }

            }
          });
        }
        if(key==="label"){
          let isin=false;
          this.labels.forEach((v,i)=>{
            if(SourceTypeValue==v){
              isin = true;
            }
          });
          if(!isin){
            this.labels.push(SourceTypeValue);
          }
        }
      },
      handleClose2(tag) {
        this.labels.forEach((e,i)=>{
          if(e===tag){
            this.labels.splice(i,1);
          }
        });
      },
      handleChange(value) {
        this.addProductInfo.classifyId=value[value.length-1];
        this.addProductInfo.productMsg.productList=[];
        let cityId=this.isAddProduct.data.linkmanAreaId.substring(0,4);
        let url = `${this.$apidomain}/articleinfo/findlistserviceinfo?labelId=${value[value.length-1]}&areaId=${cityId}`
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            data.result.forEach((v)=> {
              this.addProductInfo.productMsg.productList.push(v.serviceInfo);
            });
          }else{
            alert(data.error);
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">

  #app{
    position:relative;
  }
  h3{
    font-weight: normal;
    position:absolute;
    font-size: 14px;
    left:50%;
    top:15px;
    transform: translateX(-50%);
    text-align: center;
  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3.7em;
      border-top:1px solid rgba(0,0,0,.1);
      >.order_number{
        float:right;
        padding-right:30px;
      }
    }
    >li:first-of-type{
      border:none;
    }

  }
  .dable_lsit{
    margin-top:50px;
    width:100%;
    height:200px;
    overflow-y: auto;
    margin-bottom:10px;
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

            }
            >span:last-of-type{
              float:right;
              padding-left:0px;
              padding-top:8px;
              padding-right:20px;
              cursor:pointer;
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
</style>


<style lang="scss">
  .el-dialog__body{
    padding-top:0 ;
  }
  .el-cascader-menus{
    z-index: 999999 !important;
  }


      .el-select-dropdown{
        z-index: 99999999 !important;
      }

</style>
