<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="isAddProduct.isShow" size="tiny">
      <h3>{{addProductInfo.title}}</h3>
      <ul class="alert_forbidden_text">
        <li  v-for="(item,index) in optionList">
          <span class="list_name">{{item.name}} :</span>
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
        <li class="fenlei_alert">
          <span class="list_name">分类 :</span>
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="props"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </li>
        <li>
          <span class="list_name"> 产品 :</span>
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
          <span class="list_name">   标签 :</span>
          <el-select
            style="width:100px;"
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
            @close="handleClose2(tag)">
            {{tag}}
          </el-tag>
        </li>
        <li>
          <span class="list_name">   数量 :</span>
          <el-input style="width:200px"
                    type="number"
                    :disabled="isDisableds"
                    placeholder="输入内容"
                    v-model="addProductInfo.sum">
          </el-input>
        </li>
      </ul>
      <el-button style="float:right;"  @click="masterImposeOperate(addProductInfo,isAddProduct)" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isAddProduct)">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props:["isAddProduct","tableDataList"],
    data() {
      return {
        isDisableds:false,
        optionList: [
            {
              name: "一级分类",
              key: "skillId",
              SourceTypeValue: '',
              SourceType: []
            },
        ],
        label:{
          name: "一级分类",
          key: "label",
          SourceTypeValue: '',
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
      }
    },
    methods: {
      cancel(item){          //取消
        item.isShow=false;
      },
      masterImposeOperate(item,isAShow){       //确定
        item.selectorBehindObj.sum=item.sum;
        isAShow.classId=item.classifyId;
        this.addProductInfo.selectorBehindObj.classifyId= this.addProductInfo.classifyId;
        let obj={};
        obj.id=item.selectorBehindObj.list.id;   //数量
        obj.sum=item.selectorBehindObj.sum;   //数量
        obj.fullName=item.selectorBehindObj.list.fullName ;//产品名称
        obj.name=item.selectorBehindObj.list.name;
        obj.price1=item.selectorBehindObj.list.price1;
        obj.price2=item.selectorBehindObj.list.price2;
        obj.price2Discount=item.selectorBehindObj.list.price2Discount;
        obj.price2DiscountFee=item.selectorBehindObj.list.price2DiscountFee;
        obj.isSecondPayment=item.selectorBehindObj.list.isSecondPayment;
        obj.tags = "";
        this.labels.forEach((v,i)=>{
          obj.tags+=v+",";
        });
        if(obj.tags.length>0){
          obj.tags = obj.tags.substring(0,obj.tags.length-1);
        }
        let isin = false;
        this.tableDataList.forEach((v,i)=>{
          if(v.id===obj.id){
            v.sum = Number(v.sum);
            obj.sum = Number(obj.sum);
            v.sum +=obj.sum;
            isin = true;
          }
        });
        if(!isin){
          this.tableDataList.push(obj)
        }
        isAShow.isShow=false;
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
      if(key==="skillId"){
        let url=this.$apidomain+"/articleinfo/findlabelbusinessbyflabel?id="+this.addProductInfo.selectorBehindObj.skillId;
        this.options=[];
        this.addProductInfo.productMsg.productList=[];
        this.addProductInfo.sum="";
        this.isDisableds=false;
        this.addProductInfo.productMsg.SourceTypeValue="";
        this.labels=[];
        this.label.SourceType=[];
        this.$http.get(url).then(r=>{
          var data=r.data;
            this.options.push(data.result);
        });
      }
      if(key==="label"){
        let isin=false;
        this.labels.forEach((v,i)=>{
          if(SourceTypeValue==v){
            isin = true;
          }
        })
        if(!isin){
          this.labels.push(SourceTypeValue);
        }
      }
    },
    handleClose2(tag) {
      for(let i=this.labels.length-1;i>0;i--){
        if(this.labels[i]===tag){
          this.labels.splice(i,1);
        }
      }
    },
      handleChange(value) {
        this.addProductInfo.classifyId=value[value.length-1];
        this.addProductInfo.productMsg.productList=[];
        let cityId=this.isAddProduct.cityId;
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
    wath:{
      "isAddProduct.isShow":function(v,f){

      }
    },
    created() {
//一级分类
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
    }
  }
</script>
<style>
  .el-dialog__body{
    padding-top:0 ;
  }
</style>
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
      line-height: 4.5em;
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
</style>
<style>
  .fenlei_alert .el-cascader__label{
    line-height: 45px !important;
  }
</style>
