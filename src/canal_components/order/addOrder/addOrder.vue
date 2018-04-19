
<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <h3>{{isAddorder.title}}</h3>
      <div class="content">
        <div class="left_info">
          <p class="title">{{isAddorder.title}}</p>
          <ul>
            <li v-for="(item,index) in addOrder.canalList" :key="index">
              {{item.name}}
              <el-select style="width:130px"
                         v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <!--输入框开始-->
            <li v-for="(item,index) in addOrder.inputs" :key="index">
              {{item.name}}
              <el-input
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
            </li>
            <!--输入框end-->
            <li v-for="(item,index) in addOrder.optionList" :key="index" class="position">
              {{item.name}}
              <el-select size="mini"
                v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="items in item.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li class="position">
              <!--{{item.name}}-->
              <el-input size="mini" style="width:170px"
                placeholder="请输入内容"
                v-model="addOrder.position">
              </el-input>
            </li>
            <li>
              <br>
              预约时间
              <DatePicker v-model="addOrder.placeTime"
                          @on-ok="onOk(addOrder.placeTime)" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）"
                          style="width: 200px"></DatePicker>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
        <p class="title" style="margin:10px 0">{{productInfo.title}}</p>
        <div class="content">
          <div class="left_info">
            <ul>
              <li>
                {{productInfo.title}}
                &nbsp; &nbsp; &nbsp;
                <button @click="addProduct" style="float:none;line-height:35px; width:150px">+新增产品</button>
              </li>
           <!--表格数据   -->
              <li style="overflow-y: auto">
                <table cellSpacing="0px" cellpadding="0">
                  <thead>
                  <tr class="theads">
                    <th v-for="(item,index) in addOrderObjData.theadsName" :key="index">{{item}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in addOrderObjData.userInfos">
                    <td>
                      {{index+1}}
                    </td>
                    <td>
                      {{item.sequenceNumber}}
                    </td>
                    <td>
                      {{item.rank}}
                    </td> <td>
                    {{item.city}}
                  </td> <td>
                    {{item.city}}
                  </td> <td>
                    {{item.city}}
                  </td>  <td>
                    {{item.city}}
                  </td> <td>
                    {{item.city}}
                  </td> <td>
                    {{item.city}}
                  </td> <td>
                    {{item.city}}
                  </td>
                    <td>
                      {{item.city}}
                    </td>
                   <td>
                         <span @click="del(item)" class="details_icon Reminded_icon" style="display: block">
                                   <i></i> &nbsp;删除
                         </span>
                  </td>
                  </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
<!--新增产品弹宽-->
    <add-product :isAddProduct="isAddProduct"></add-product>
    <!--显示个取消-->
    <p class="closeX" @click="orderClose(isAddorder)"></p>
    <div class="btn">
      <button @click="orderClose(isAddorder)">取消</button>
      <button @click="accomplishOrder(addOrder)" class="selector">完成</button>
    </div>
  </div>
</template>

<script>
import addProduct from "./add_product"

  export default {
    props:["isAddorder"],
    components:{
      addProduct
    },
    data(){
      return{
        //新建工单查询数据；
        addOrder: {
          placeTime:"",  //预约时间
          inputs: [
            {
              name: "联系人",
              key: "name",
              value: ""
            }, {
              name: "联系电话",
              key: "tel",
              value: ""
            }
          ],
          canalList:[
            {
              name: "子类渠道：",
              key: "fuwgzhong",
              SourceTypeValue: '', //选中后的
              SourceType: [
                {     //来源类型
                  value: '---请选择---',
                  id: ""
                }, {
                  value: '罗湖区',
                  id: "1"
                }, {
                  value: '南山区',
                  id: "0"
                }, {
                  value: '龙华区',
                  id: "2"
                }
              ]
            },
          ],
          position:"",
          optionList: [       //下拉列表数据
            {
              name: "联系地址：",
              key: "fuwgzhong",
              SourceTypeValue: '', //选中后的
              SourceType: [
                {     //来源类型
                  value: '---请选择---',
                  id: ""
                }, {
                  value: '罗湖区',
                  id: "1"
                }, {
                  value: '南山区',
                  id: "0"
                }, {
                  value: '龙华区',
                  id: "2"
                }
              ]
            },
             {
              key: "fuwugong",
              SourceTypeValue: '', //选中后的
              SourceType: [
                {     //来源类型
                  value: '---请选择---',
                  id: ""
                }, {
                  value: '南头街道2',
                  id: "1"
                }, {
                  value: '南头街道1',
                  id: "0"
                }, {
                  value: '南头街道4',
                  id: "2"
                }
              ]
            },

          ],
          selectorBehindObj: {},

//            添加师傅详情结束
        },

        addOrderObjData:{
          theadsName:[
            '序号',
            '产品名称',
            '标签',
            '数量',
            '上门费',
            '高空费',
            '服务费',
            '配件费',
            '优惠金额',
            '其他',
            '合计',
            '操作',
          ],
          userInfos:[
            {
              sequenceNumber:"B454545",
              rank:"B121323121",
              btnType:"1",
              city:"深圳",
              cost:"",
            },{
              sequenceNumber:"B454545",
              rank:"B121323121",
              btnType:"1",
              city:"深圳",
              cost:"",
            }
          ]
          //表格数据
        },
        //新建工单查询end；


//isShow   Start
        isAddProduct:{
          isShow:false,
          title:"新增产品"
        },
        productInfo:{
          title: "产品信息",
        }
      }
//isShow   End
    },
    methods: {
      //取消完成按钮操作；
      orderClose(isShow){
        isShow.isShow=false;
      },
      accomplishOrder(data){       //完成
        data.inputs.forEach(v=>{
          data.selectorBehindObj[v.key]=v.value;
        });
        data.selectorBehindObj.placeTime=data.placeTime;
      },
      //取消完成按钮操作；end

//        新增产品
      addProduct(){
        this.isAddProduct.isShow=true;
      },
//        新增产品end

//        table
      //删除
      del(item,index){
        alert("删除操作")
      },
      //        table结束
      onOk(value){        //时间的参数预约时间 下单时间
        console.log(value);
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.addOrder.selectorBehindObj[key]=v.id;
          }
        })
      },
      handleItemChange(val) {

      },
      changeSelector(value){
        this.addOrder.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.addOrder.serveId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.addOrder.serveId=e.id    //选择区
              }
            })
          }
        });
      },
    },
    mounted() {

    },
    watch:{

    },
    created(){

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  /*@import "../../../assets/styles/ch_alert";*/
  .el-input{
    width:217px;
  }
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
    line-height:3.2em;
     padding-left:10px;
     letter-spacing: 0;
   }
  >.content{

     width:100%;
     display:flex;

  >div{
     flex:1;
  >ul{
     /*width:35%;*/
     padding-top:20px;
  >li{
     /*text-align: right;*/
     margin-top:20px;
  .files{
    display: flex;
    flex-wrap:wrap;
    padding:0;
  >li{
     width:50%;
     height:auto;
     margin-bottom:30px;
  >input{

   }
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

   >.position{
    float:left;
    }
    >.position:first-of-type{
    float:none;
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
  .el-select{
    width: 85px;
  }
  table{
    width:100%;
  .theads{
  >th{
     padding:4px 10px;
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
     padding:4px 10px;
     text-align:center;
   }
  >td:first-of-type{
     border-right:1px solid #ccc;
   }
  >td:last-of-type{
   //display: flex;
     padding-top:0;
     padding-bottom:0;
  >span{
     height:100%;
     padding-top:4px;
  i{
    width:16px;
    height:16px;
    margin-right:3px;
    vertical-align: middle;
  }
  }
  >.details_icon{
     flex:1;
     /*float:right;*/
     padding-left:0px;
     /*padding-top:8px;*/
     text-align: center;
     /*padding-right:20px;*/
     cursor:pointer;
  }
  >.Reminded_icon{
  i{
    display: inline-block;
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
  }
  }
  }
  }
  >tr:nth-of-type(even){
     background: #F9FAFC;
   }
  }
  }
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>
<style  lang="scss">

  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }

</style>


