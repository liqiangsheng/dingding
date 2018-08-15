<template>
  <div id="app">
    <div>                                 <!--渠道配件-->
      <!--content内容区域-->
      <div class="container">
        <div class="selector_list">
          <div class="selector_listLeft">
            <div class="list" >
              渠道
              <el-input placeholder="请选择渠道                       ▼"
                        @focus="showChannel" v-if="channelShow"></el-input>
              <el-cascader id="labelIds"
                           ref="channel"
                           placeholder="请选择渠道"
                           @change="changeSelector2"
                           change-on-select
                           :options="labeloptions"
                           :props="prop"
                           v-if="!channelShow"></el-cascader>
            </div>
            <div class="list">
              配件名称
              <el-input  placeholder="请填写配件名称" v-model="partsName"></el-input>
            </div>
            <div class="list">
              产品名称
              <el-input  placeholder="请填写产品名称" v-model="productName"></el-input>
            </div>
            <div class="list">
              分类
              <el-input placeholder="请选择分类                       ▼"
                        @focus="showChannel" v-if="channelShow"></el-input>
              <el-cascader ref="fuwugongzhong" id="labelId"
                           @change="changeSelectorTwo"
                           :options="labeloptions3"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props1"
                           placeholder="请选择分类"
                           v-if="!channelShow"
              ></el-cascader>
            </div>
            <div class="list">
              服务费类型
              <el-select v-model.trim="serverTypeName" placeholder="请选择服务费类型" @change="orderTypeOneClick(serverTypeName)">
                <el-option
                  v-for="(item,index) in serverType"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div class="list">
              状态
              <el-select v-model.trim="stateName" placeholder="请选择状态" @change="orderTypeOneClick(orderTypeOne)">
                <el-option
                  v-for="(item,index) in stateType"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>

          </div>

        </div>

        <!--查询按钮-->
        <div class="footerBnt">
          <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
          <el-button  style="width: 100px" @click="reset">重置</el-button>
          <!--<el-button style="width:100px;float: right;margin-right: 100px" @click="exportOrder">导出</el-button>-->
        </div>
        <div style="width: 100%;padding-left: 67px;margin: 15px 0;overflow: hidden" v-if="channelValue&&channelValue!=''">
           <p style="font-size:13px;font-family:PingFangSC-Regular;color:rgba(94,109,130,1);line-height:18px;">渠道名称：{{channelValue}}</p>
        </div>
        <div class="NoPuduct" v-if="!puductShow">
          <p><img src="/static/images/puductList.png" alt=""></p>
          <p>请在上方筛选渠道，查询该渠道产品信息列表</p>
        </div>

        <!--table表格-->
        <div class="dable_lsit" v-if="puductShow">
          <!--表格数据-->
          <table id="table" cellSpacing="0px" cellpadding="0">
            <thead>
            <tr class="theads">
              <th v-for="(ietm,index) in tabListName">{{ietm}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <!--序号-->
              <td>
                {{1}}
              </td>
              <!--配件编号-->
              <td >
                {{1}}
              </td>
              <!--配件名称-->
              <td>
                {{1}}
              </td>
              <!--配件费-->
              <td>
                {{1}}
              </td>
              <!--商品编号-->
              <td>
                {{1}}
              </td>
              <!--产品名称-->
              <td>
                {{1}}
              </td>
              <!--服务费 类型-->
              <td>
                {{1}}
              </td>
              <!--状态-->
              <td>
                {{1}}
              </td>
              <!--操作-->
              <td class="cursorSize">
                <span class="cursor" style="color: #20A0FF">编辑</span>
                <span class="cursor" style="color: #0C9073">上架</span>
                <span class="cursor" style="color: #4A4A4A">下架</span>
                <span class="cursor" style="color:#E65831 ">删除</span>
              </td>
            </tr>
            </tbody>
          </table>
          <!--表格数据结束-->
          <!--分页组件-->
          <div class="paging">
            <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pages}}</p>
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
            <p class="home last_page cursor" @click="lasePage">尾页</p>
            <p class="home cursor" @click="firstPage">首页</p>
          </div>
          <!--分页组件结束-->
        </div>
        <!--table表格结束-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components:{

    },
    mounted() {

    },
    data() {
      return {
        tableListData: {},          //表格数据
        showPages: 1,               //当前页
        currentPageSize: 20,       //每页显示条数
        total: 0,                   //总条数
        pageTotal: 0,              //总页数
        puductShow:false, //产品列表显示隐藏
        partsName:"", //瞥见名称
        channelShow:false, //重置用渠道
        labeloptions:[],  //渠道
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        channelValue:'',//显示的渠道
        prop: { //渠道
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        selectorBehindObj:{},
        productName:"", //产品名称
        labeloptions3:[],       //分类
        props1: {//分类
          value: 'a',
          label: "b",
          children: 'beans'
        },
        serverType:[{id:"",name:"--请选择--"},{id:"1",name:"小修"},{id:"2",name:"中修"},{id:"3",name:"大修"},{id:"4",name:"检修"}], //服务费类型
        serverTypeName:"",//服务费类型
        serverTypeId:"",//服务费类型ID
        stateType:[{id:"",name:"--请选择--"},{id:"0",name:"未上架"},{id:"1",name:"已上架"}], //状态
        stateName:"",//状态
        stateId:"",//状态ID
        tabListName:["序号","配件编号","配件名称","配件费","商品编号","产品名称","服务费 类型","状态","操作"]
      }
    },
//    beforeRouteEnter(to,from,next){
//      next(Vue=>{
//        Vue.quiry();
//      })
//    },
//    beforeRouterLeave(to,from,next){
//      next()
//    },
    watch:{

    },
    created(){
      //渠道
      this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
      this.labeloptions.forEach((obj,i)=>{
        this.$set(obj,'childChannel',[])
      })
      //获取服务工种分类
      let urls = this.$apidomain + "/common/findflabelbusinessname";
      this.$http.get(urls).then(r => {
        r.data.result.forEach((v, i) => {
          let urlTwo = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + v.id;
          this.$http.get(urlTwo).then(res => {
            if (res.data.code === "0000") {
              this.labeloptions3.push(res.data.result)
            }
          })
        })
        this.labeloptions3 = [{a:'',b:'--请选择--'},...this.labeloptions3];
      });

    },
    methods: {
      showChannel(){  // 渠道分类重置之后
        this.channelShow = false;
      },
      orderTypeOneClick(v){
        console.log(v)
      },
      reset(){ //重置
        this.labeloptions = [];
        this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
        this.labeloptions.forEach((obj,i)=>{
          this.$set(obj,'childChannel',[])
        })
        this.labeloptions = [];
        this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
        this.labeloptions.forEach((obj,i)=>{
          this.$set(obj,'childChannel',[])
        })
        this.partsName = ""; //配件名称
        this.puductShow = false;  //查询列表显示
        this.channelShow = true; //渠道分类
        this.serverTypeName="";//服务费类型
        this.serverTypeId="";//服务费类型ID
        this.stateName="";//状态
        this.stateId="";//状态ID
        this.productName = "";//产品名称
        this.channelID='';  //主渠道ID
        this.officialPartnerSubsetId='';
        this.channelValue=''; //
      },
      quiry(){//列表查询
        this.puductShow = true;
        this.getTableList(this.paramsData());
      },
      paramsData(){//列表參數

        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
        }}
      },
      getTableList(params){ ////列表數據接口

      },
      //分类选择
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
      //渠道下拉
      changeSelector2(value){
        this.channelValue = this.$refs.channel.currentLabels[this.$refs.channel.currentLabels.length-1];
        let urls = this.$apidomain +"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId=";
        this.$http.get(urls+value[0]).then(res =>{
          let data = res.data;
          if(data.code==='0000'){
            this.labeloptions.forEach((obj,i)=>{
              obj.childChannel=obj.id===value[0]?data.result:[]
            })
          }
        })
        if(value.length=='1'){
          this.channelID = value[0];
          this.officialPartnerSubsetId='';
        }else if(value.length=='2'){
          this.officialPartnerSubsetId=value[1];
          this.channelID=''
        }else{
          this.channelID ="";
          this.officialPartnerSubsetId='';
        }

      },
      handleItemChange(val) {
      },
      //分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      handleCurrentChange(val) {
        this.showPages=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        if(this.tableListData.list.length !==0){
          this.getTableList(params);
        }
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.showPages=this.pageTotal; //最后一页
        this.getTableList(params);
      },

//分页查询 事件 end
    },
  }
</script>
<style scoped lang="scss">
  /*@import "../../assets/styles/comminStyle";*/
  #app {
    .container {
      overflow: hidden;
      width: 100%;
      >.selector_list {
        margin-top: 0;
        width: 1200px;
        overflow: hidden;
        .selector_listLeft {
          margin-left: 54px;
          .list{
            padding-top: 5px;
            width: 200px;
            float: left;
            margin-left: 13px;
            .el-input{
              width: 200px;
            }
          }
        }
      }
      >.footerBnt{
        margin-left: 67px;
        margin-top: 20px;
        width: 100% !important;
      }
    }
  }
  .dable_lsit{
    margin-top: 20px !important;
    table{
      width:100%;
      .theads{
        border:1px solid rgba(224,230,237,1);
        >th{
          height: 60px;
          text-align:center;
          background:rgba(240,240,240,1);
          border-right: 1px solid rgba(224,230,237,1);
        }
        >th:nth-child(7){
          padding:0 10px;
          width: 60px;
        }

      }
      >tbody{
        tr{
          width: 100%;
          height:58px;
          text-align: center;
          td{
            border:1px solid rgba(224,230,237,1);
            border-right: 0;
          }
          td:last-child{
            border-right:1px solid rgba(224,230,237,1);
            span{
              display: inline-block;
              height:17px;
              font-size:13px;
              font-family:PingFangSC-Regular;
              color:rgba(32,160,255,1);
              line-height:18px;
              margin-right:14px;
            }
          }
        }
        tr:nth-child(2n+2){
          background:rgba(248,248,248,1);
        }

      }
    }
  }
  .NoPuduct{
    width: 100%;
    height: 500px;
    overflow: hidden;
    padding-top: 225px;
    p:nth-child(1){
      width: 100%;
      height: 62px;
      img{
        margin-left: 48%;
        width: 77px;
        height: 62px;
        display:inline-block;
      }
    }
    p:nth-child(2){
      width: 100%;
      text-align: center;
      margin-top: 34px;
      font-size:13px;
      font-family:PingFangSC-Regular;
      color:rgba(153,153,153,1);
      line-height:18px;
    }

  }
  .paging{
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
</style>
