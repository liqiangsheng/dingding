<template>
  <div id="app">
    <el-dialog style="z-index:999999"   :visible.sync="isNewservice.isShow" size="tiny">
      <h3>{{isNewservice.title}}</h3>
      <ul>
        <!--<li>工单号：{{isNewservice.data.id}}</li>-->
        <li>
          <!--服务清单：-->
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
              <tr>
                <!--<td>-->
                  <!--{{index+1}}-->
                <!--</td>-->
                <td>
                  {{ccobj.fullName}}
                </td>
                <td>
                  {{ccobj.serviceTags}}
                </td>
                <td>
                {{ccobj.size}}
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
        <!--<li>-->
          <!--上门费:{{objData.price1|numberShow}}-->
          <!--服务费:{{objData.price2|numberShow}}-->
          <!--配件费:{{objData.price3|numberShow}}-->
          <!--高空费:{{objData.price4|numberShow}}-->
          <!--总计:{{objData.total|numberShow}}-->
          <!--优惠金额:{{objData.originalTotal-objData.total|numberShow}}-->
          <!--原总计:{{objData.originalTotal|numberShow}}-->
        <!--</li>-->
        <!--<li  v-for="(item,index) in optionList">-->
          <!--{{item.name}} :-->
          <!--<el-select-->
            <!--v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">-->
            <!--<el-option-->
              <!--v-for="items in item.SourceType"-->
              <!--:key="items.value"-->
              <!--:value="items.value"-->
            <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</li>-->
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
        <li>
          服务：
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
              v-for="(items,index) in label.SourceType"
              :key="items"
              :value="items"
            >
            </el-option>
          </el-select>
          <el-tag
            v-for="(tag,index) in labels"
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
          <el-input style="width:auto"
                    type="number"
                    size="small"
                    :disabled="isDisableds"
                    placeholder="输入内容"
                    v-model="addProductInfo.sum">
          </el-input>
          <!--<el-button style="float:right;"  @click="masterImposeOperate(addProductInfo,isNewservice)" type="primary">+继续新增</el-button>-->
        </li>
        <li>
          备注:
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="newObj1.serviceRemark"
          >
          </el-input>
        </li>
      </ul>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isNewservice)">取消</el-button>
      <el-button style="float:right;"  @click="confirm(isNewservice,tableList)">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    props:["isNewservice","quiry"],
    data() {
      return {
        index:'',
        ccobj:{},
        newObj1:{
          serviceIdsJson:[],//服务列表以逗号分
          linkmanAreaId:'',//地址区域id
          mainOrderId:'',//工单编号
          orderServiceId:'',//工单服务编号
          serviceRemark:'',//服务备注
        },
        objData:{},
        isDisableds:false,
        tableList:[],
        skills:[],
        theadsName:[
//          "序号",
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
//      console.log(this.isNewservice,"isNewservice");
//      console.log(this.quiry,"11111111111111");
      this.index=this.isNewservice.index;
      let url=`${this.$apidomain}/orderquery/findOneDetails`;
      let params={params:{"id":this.isNewservice.data.id}};
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

            this.ccobj=this.tableList[this.index];
//            console.log(this.tableList[this.index],"aaaaa");
//            console.log(this.tableList,"tablist");
            this.isIn.push(v);
//            console.log(this.isIn,"isIn");
          });
          this.objData = data.result.coreMainOrder;
          let url=this.$apidomain+"/articleinfo/findlabelbusinessbyflabel?id="+data.result.coreMainOrder.fLabelBusiness;
          this.$http.get(url).then(r=>{
            var data=r.data;
            this.options.push(data.result);
//            console.log(this.options,"options");

          });
        }
      });
    },
    methods: {
      confirm(isNewservice,tableList){
//        console.log(tableList);
//        console.log(this.isIn);
//        if(tableList.length-this.isIn.length<0){
//          alert("请添加所需要的服务...");
//          return ;
//        }
//        let tlist = [];
//        tableList.forEach((v)=>{
//          let isin=false;
//          this.isIn.forEach((v1)=>{
//            if(v.id===v1.id){
//              isin = true;
//            }
//          });
//          if(!isin){
//            tlist.push(v);
//          }
//        });
//        let url=`${this.$apidomain}/order/addService`,params;
//        params={
//          "orderid":this.isNewservice.data.id,
//          "serviceIds":JSON.stringify(tlist)
//        };
//        console.log(this.selectedOptions2,"selectedOptions2");
//        console.log(params,"params");
//        this.$http.post(url,params).then(r=>{
//          let data=r.data;
//          if(data.code==='0000'){
//            console.log(data);
//            this.$notify({
//              title: '成功',
//              message: '新建成功',
//              type: 'success'});
//            if(this.quiry){
//              this.quiry();
//            }
//            this.isNewservice.isShow=false;
//          }else{
//            this.$notify.error({
//              title: '失败',
//              message: data.error,
//              type: 'success'});
//          }
//        });
//        let obj={ "id":this.addProductInfo. };
        var _this=this;
        let boj={};
        boj.id=this.addProductInfo.selectorBehindObj.produvtMsg;
        boj.size=this.addProductInfo.sum;
        let arr=[];
        arr.push(boj);
        boj.serviceTags=this.labels.toString();
        this.newObj1.serviceIdsJson=JSON.stringify(arr);
        this.newObj1.linkmanAreaId=this.isNewservice.data.linkmanAreaId;
        this.newObj1.mainOrderId=this.isNewservice.id;
        this.newObj1.orderServiceId=this.isNewservice.orderServiceId;
        console.log( this.newObj1);
        let url =this.$apidomain+'/order/updateOrderServiceInfo';
        console.log(boj.serviceTags,"boj.serviceTags");
        //判断能否点击修改

        if(this.label.SourceType.length==0){
          if(this.addProductInfo.sum>=1&&this.newObj1.serviceRemark!=""&&boj.id){
            this.$http.post(url,this.newObj1).then(r=>{
//            console.log(r,"houtai");
              if(r.data.code=="0000"){
                this.isNewservice.isShow=false;
                _this.$emit('updata');
              }else{
                alert(r.data.error);
              }
            }).catch(e=>{
//            console.log(e,"houtai");
            })
          }else{
            alert("请输入完整内容")
          }
        }else{
          if(this.addProductInfo.sum>=1&&this.newObj1.serviceRemark!=""&&boj.id&&boj.serviceTags!=''){
            this.$http.post(url,this.newObj1).then(r=>{
//            console.log(r,"houtai");
              if(r.data.code=="0000"){
                this.isNewservice.isShow=false;
                _this.$emit('updata');
              }else{
                alert(r.data.error);
              }
            }).catch(e=>{
//            console.log(e,"houtai");
            })
          }else{
            alert("请输入完整内容")
          }
        }

      },
      cancel(item){          //取消
        item.isShow=false;
      },
      masterImposeOperate(item,isAShow){       //确定
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
//        this.tableList.push(obj);
//        console.log(this.tableList)
//        if(!isin){
//          this.tableDataList.push(obj)
//        }
//
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
//              console.log(v);
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
            console.log(this.labels,"labels");
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
        let cityId=this.isNewservice.data.linkmanAreaId.substring(0,4);
//        console.log(cityId,"chengshi");
        let url = `${this.$apidomain}/articleinfo/findlistserviceinfo?labelId=${value[value.length-1]}&areaId=${cityId}`
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            data.result.forEach((v)=> {
              this.addProductInfo.productMsg.productList.push(v.serviceInfo);
//              console.log(this.addProductInfo.productMsg.productList,"serviceInfo");
            });
          }else{
            alert(data.error);
          }
        })
      },
    },
    wath:{
      "isNewservice.isShow":function(v,f){
      }
    },

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
      line-height: 3em;
      /*border-top:1px solid rgba(0,0,0,.1);*/
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
    margin-top:20px;
    width:100%;
    /*height:200px;*/
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
            /*border-right:1px solid #ccc;*/
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
    .el-button{
      margin:20px;
    }
  }
</style>


