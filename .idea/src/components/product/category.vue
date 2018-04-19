<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          分类编号 :
          <el-input
            placeholder="请输入关键字查询"
            v-model="id">
          </el-input>
        </div>
        <div class="list">
          {{lastLevel.name}} :
          <el-select
            v-model="lastLevel.SourceTypeValue" placeholder="请选择" @change="selectorArea(lastLevel,lastLevel.SourceType,lastLevel.SourceTypeValue)">
            <el-option
              v-for="items in lastLevel.SourceType"
              :key="items.name"
              :value="items.name"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry()">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <app-button :props="buttonObj"></app-button>
        <div class="derive">
          <el-button style="width:150px;" @click='addProduct("0")' size="large">生成一口价产品</el-button>
          <el-button style="width:150px;" @click='addProduct("1")' size="large">生成订价产品</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.labelBusinesses">
            <td>
              <el-checkbox v-model="isCheckboxList[index]"  @change="isCheckbox(isCheckboxList[index],index)"></el-checkbox>
            </td>
            <td>
              {{item.id}}
              <input type="text" :value="$common.wechatProductAssortment+duplicateId(item.id)+'/'+item.id.substring(0,3)+'?id='+item.id" class="link">
            </td>
            <td class="assortment" v-html="item.name">
              <!--{{item.name|placeholder}}-->
            </td>
            <td  @dblclick="editInput(item,isEditTable,index)" @keyup.enter="enter(item,isEditTable,index,isEditTable[index].sublevelTitle)" >
              <span v-show="isEditTable[index].isEdit">
                   {{item.sublevelTitle|placeholder}}
              </span>
              <el-input @blur="enter(item,isEditTable,index,isEditTable[index].sublevelTitle)" v-show="!isEditTable[index].isEdit" v-model="isEditTable[index].sublevelTitle"></el-input>
            </td>
            <td>
              {{item.isRepetition|isRepetitionShow}}
            </td>
            <td>
              {{item.isEnd|isEndShow}}
            </td>
            <td class="cursor">
              <span  @click="off(item,index)" v-show="$isButtonObj('bn-product-list-soldout')" v-if="item.level!=1"><el-button type="text" ><i class="del_icon"></i>删除</el-button></span>
              <span  @click="editTags(item)" v-show="$isButtonObj('bn-product-list-soldout')" v-if="item.isEnd==='1'"><el-button type="text" ><i class="edit_icon"></i>编辑</el-button>
              </span>
              <span  @click="addChild(item)" v-show="$isButtonObj('bn-product-list-soldout')" v-else><el-button type="text" ><i class="add_icon"></i>新增子类</el-button></span>
              <!-- 复制 分类id -->
                <span @click="duplicateUrl(index)">
                  <el-button type="text" ><i class="add_icon"></i>复制</el-button>
                </span>
                <span>
                  <a target="_blank" :href="$common.wechatProductAssortment+duplicateId(item.id)+'/'+item.id.substring(0,3)+'?id='+item.id">
                 预览</a>
                </span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pageTotal}}</p>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes='[20,50,100,200]'
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="showPages"
            :total="total"
            :page-size="currentPageSize"
            :page-count="pageTotal"
          >
          </el-pagination>
          <p class="home last_page" @click="lasePage">尾页</p>
          <p class="home" @click="firstPage">首页</p>
        </div>
      </div>
    </div>
    <!--/编辑-->
    <div class="alert" v-if="alertIsShow.isShow">
        <categoryOperate  :categoryData="alertIsShow"></categoryOperate>
    </div>
    <!--/编辑end-->

    <!--新增start -->

    <div class="alert" v-if="addCategoryDataIsShow.isShow">
        <add-category  :categoryData="addCategoryDataIsShow"></add-category>
    <!--新增ent-->
    </div>
      <!--新增 类目按钮start-->

    <div class="alert" v-if="addCategoryIsShow.isShow">
        <add-top  :categoryData="addCategoryIsShow"></add-top>
    </div>
    <!--新增ent-->
    <!--编辑标签 start-->
    <comm-alerttext :data="isTags" :query="quiry" v-if="isTags.isShow"></comm-alerttext>
    <!--编辑标签 end-->
    <add-child :data="childData" :query="quiry" v-if="childData.isShow"></add-child>
  </div>
  <!-- 一口价是一次付款 -->
</template>
<script>
  import productSum from "./components/productSum.vue"
  import categoryOperate from './components/categoryOperate.vue'
  import addCategory from './components/addCategory.vue'
  import addChild from './components/addChild.vue'
  import addTop from './components/addTop.vue'
  import appButton from "@/components/commInfo/Button"
  import queryFun from "@/components/commonJs/queryFun"
  export default {
    components:{
      productSum,
      addChild,
      addCategory,
      appButton,
      addTop,
      categoryOperate
    },
    data() {
      return {
        childData:{
          isShow:false,
        },
        isTags:{
          isShow:false,
          title:"编辑标签",
          subMit:this.editTagsSubMit,
          params:{"labelId":""}
        },
        isEditTable:[],
        lastLevel: {
          name: "是否末级",
          key: "isEnd",
          SourceTypeValue: '', //选中后的
          SourceType:[
                  {
                  name:"是",
                  id:"1",
                      }, {
                  name:"否",
                  id:"0",
                      },
               ],
        },
        isCheckboxList:[],
        buttonObj:{
          name:"应用列表",
          http:"articleinfo/findlabelbusiness",
        },
        checked:false,
        id: '',
        alertIsShow:{
          isShow:false,
        },
        addCategoryIsShow:{
          isShow:false,
        },
        addCategoryDataIsShow:{
          isShow:false
        },
        categoryaddFlag: false,
        categoryeditFlag: false,
        theadsName:[
          "选择",
          '分类编号',
          '分类名称',
          '子级标题',
          '已生成服务产品',
          '是否末级',
          '操作'
        ],
        name: '',
        selectorBehindObj: {},
        tableListData:{
          pageNum:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          labelBusinesses:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0
      }
    },

    created(){
      this.quiry();
    },
    methods: {
      // 复制url   start
        duplicateId(id){
              const subId=id.substring(0,3);
              return subId==="004"?"wash1":"wash"
        },
        duplicateUrl(i){
          const copyInput=document.getElementsByClassName("link")[i];   
                copyInput.select()
                document.execCommand("copy");
                this.$queryFun.successAlert.call(this,"复制成功","1");
        },
      // 复制url   end
      addChild(item){       //新增子类
        this.childData.isShow=true;
        this.childData.id=item.id;
      },
      editTagsSubMit(item){
        let url=`${this.$apidomain}/serviceinfo/updateTags`;
        this.$http.post(url,item).then(res=>{
          let data=res.data;
          if(data.code==="0000"){
            this.$queryFun.successAlert.call(this,"编辑成功","1");
            this.quiry();
            this.isTags.isShow=false;
          }else{
            this.$queryFun.successAlert.call(this,data.error,"0");
          }
        })
      },

      enter(item,isEdit,i,sublevelTitle){
        this.EditPreserve(item,isEdit,i,sublevelTitle);
      },
      editInput(item,isEdit,i){
        this.$set(isEdit[i],'isEdit',!isEdit[i].isEdit)
      },
      addProduct(state){
        //                                        参数暂未确定
        let params=[],arr=[];
        this.isCheckboxList.forEach((v,i)=>{
          if(v)arr.push(this.tableListData.labelBusinesses[i]);
        });
        params=arr.map((v,i)=>{
          return {"fullName":v.fullName,"labelId":v.id,"isHighFees":"0","isSecondPayment":state}
        });
        if(!params.length)return this.$queryFun.successAlert.call(this,"请勾选需要新增的产品","0");
        this.$confirm('此操作将新增产品，是否继续？', '新增', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let url=`${this.$apidomain}/serviceinfo/save`;
          this.$http.post(url,params).then(res=>{
            let data = res.data;
            if(data.code==="0000"){
              this.$queryFun.successAlert.call(this,"提交成功","1");
              this.isCheckboxList=[];
              this.quiry();
            }else{
              this.$queryFun.successAlert.call(this,data.error,"0");
            }
          })
        }).catch(() => {
          this.$queryFun.successAlert.call(this,data.error,"0");
        });
      },
      selectorArea(item,values,SourceTypeValue){
        queryFun.selectorArea.call(this,item,values,SourceTypeValue,"name");
      },
      isCheckbox(data,index){   //列表单选
        data=!data;
      },
      //      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "id":this.id,
          "isEnd":this.selectorBehindObj.isEnd
        }
        }
      },
      getTableList(params){
        let url=this.$apidomain+"/labelbusiness/findpage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
          this.tableListData.labelBusinesses.forEach((v,i)=>{
          let o={};
            o.sublevelTitle=v.sublevelTitle;
            o.isEdit=true;
            this.isCheckboxList.push(false);
            this.isEditTable.push(o);
          });
        })
      },
//      <!--分页查询数据对象功能组合end-->
//表格Table 操作事件模块   start
      editTags(item){//新增tags
          let url = `${this.$apidomain}/serviceinfo/findOne?id=${item.id}`;
          this.$http.get(url).then(r=>{
            let data=r.data;
           if(data.code==="0000"&&data.result){
             this.isTags.params["labelId"]=item.id;
             this.isTags.isShow=true;
             this.isTags.text=data.result.tags?data.result.tags:"";
           }else{
             this.$queryFun.successAlert.call(this,"该服务不可编辑","0");
           }
          });
      },
      del(){                       //删除操作
      },
      addCategory(item,index){              //添加类目操作
        this.addCategoryDataIsShow.params=item;
        this.addCategoryDataIsShow.isShow=true;
      },
      //新建顶级分类
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      route(){
        this.$router.push({path:'/product/add'})
      },
      handleSizeChange(val) {      //每页显示多少条
        this.$queryFun.handleSizeChange.call(this,val);
      },
      handleCurrentChange(val) {
        this.$queryFun.handleCurrentChange.call(this,val);
      },
      firstPage(){
        this.$queryFun.firstPage.call(this);
      },
      lasePage(){
        this.$queryFun.lasePage.call(this);
      },
      off(item){
        this.$confirm('此操作将下架产品，是否继续？', '下架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url =`${this.$apidomain}/labelbusiness/soldOut`;
          this.$http.post(url,{"id":item.id}).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              this.$queryFun.successAlert.call(this,"下架成功","1");
              this.quiry();
            }else{
              this.$queryFun.successAlert.call(this,data.error,"0");
            }
          });
        }).catch(() => {
          this.$queryFun.successAlert.call(this,"已取消操作","0");
        });
      },
      changeSelector(value){
        this.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.cityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.cityId=e.id    //选择区
              }
            })
          }
        });
      },
      EditPreserve(item,isEdit,i,sublevelTitle){
        this.$confirm('此操作将编辑产品，是否继续？', '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=`${this.$apidomain}/labelbusiness/update`,
            o={
              "id":item.id,
              "sublevelTitle":sublevelTitle,
              "sort":item.sort
            };
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if("0000"){
              this.$queryFun.successAlert.call(this,'编辑成功!',"1");
              this.$set(isEdit[i],'isEdit',!isEdit[i].isEdit);
              this.quiry();
            }else{
              this.$queryFun.successAlert.call(this,data.error,"0");
            }
          })
        }).catch(() => {
          this.$message(
            {
              type: 'info',
              message: '已取消编辑操作'
            }
          );
          this.$set(isEdit[i],'isEdit',!isEdit[i].isEdit)
        });
      },
    },
    mounted() {
    },

  }
</script>

<style scoped lang="scss">
  #app{
    .city{
      padding:0;
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
              >.link{
                position:absolute;
                transform:translateX(-10000%)
              }
            }
            >td:first-of-type{
              border-right:1px solid #ccc;
            }
            >td:last-of-type{
              padding-top:0;
              padding-bottom:0;
              >span{
                height:100%;
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
            }
            .assortment{
              text-align: left;
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
  .category-dialog{
    z-index: 10000;
  }
  .dialogContent{
    height:500px;
    overflow: scroll;
  }

</style>
