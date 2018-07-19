<template>
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
    </div>
    <div class="creditIsRunningLow_box ">
      <div>
        {{binding.title}}
        <p class="close" @click="closeMove">
          关闭
          <span>
            <img src="/static/images/closeIcon.png" alt="">
          </span>
        </p>
      </div>
      <div  v-if="binding.title==='绑定师傅'">
      <div class="scrollbar">
      <div class="content">
        <ul>
          <li>
            <span>师傅姓名</span>
            <el-input
              placeholder="请填写师傅姓名"
              v-model.trim="selectorBehindObj.name">
            </el-input>
          </li>
          <li>
            <span class="list_name"> 师傅类型</span>
            <el-select
              v-model.trim="type.SourceTypeValue" placeholder="请选择师傅类型"
              @change="selectorType(type,type.SourceType,type.SourceTypeValue)">
              <el-option
                v-for="items in type.SourceType"
                :key="items.value"
                :value="items.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="list_name">所属网点</span>
            <el-select
              v-model.trim="siteId.SourceTypeValue" placeholder="请选择所属网点"
              @change="selectorSiteId(siteId,siteId.SourceType,siteId.SourceTypeValue)">
              <el-option
                v-for="items in siteId.SourceType"
                :key="items.value"
                :value="items.value"
              >
              </el-option>
            </el-select>
          </li>
        </ul>
        <button @click = 'quiry' class="cursor">查询</button>
      </div>
      <div class="tabList">
        <table>
          <thead>
           <tr>
             <td v-for = '(item,index) in theadList' :key = 'index'>{{item}}</td>
           </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listData" :key = 'index'>
              <td>
                <span @click="selected(item,index)">
                  <span :class="{isSelect:true,selected:flag===index}"></span>
                </span>
              </td>
              <td>{{item.id|placeholder}}</td>
              <td>{{item.name|placeholder}}</td>
              <td>{{item.phoneNum|placeholderTel}}</td>
              <td>{{item.type|mastertype}}</td>
              <td>{{item.site|placeholder}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
        <div class="bottomBtn">
          <p @click="closeMove" class="cursor">取消</p>
          <p @click="submit" class="cursor">确定</p>
        </div>
      </div>
      <div v-else class="subChanel">
        <table>
          <tr>
            <td>城市</td>
            <td>{{subDetails.city}}
           </td>
          </tr>
          <tr>
            <td>详情地址</td><td>{{subDetails.details}}</td>
          </tr>
          <tr>
            <td>子渠道名称</td><td>{{subDetails.name}}</td>
          </tr>
          <tr>
            <td>规模</td><td>{{subDetails.scale}}</td>
          </tr>
          <tr>
            <td>绑定师傅</td><td>{{subDetails.masterName}}</td>
          </tr>
        </table>
        <p  @click="closeMove">关闭</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['binding'],
    components:{
    },
    data() {
      return {
        selectorBehindObj:{
          name:'',
          type:'',
          siteId:''
        },
        masterName:'',
        //师傅类型
        type:{
          name: "师傅类型",
          key: "type",
          SourceTypeValue: '',
          SourceType: [
            {
              value:'---请选择---',
              id:''
            },
            {
              value: '自营师傅',
              id: "1"
            }, {
              value: '兼职师傅',
              id: "2"
            }, {
              value: '网点师傅',
              id: "3"
            }
          ]
        },
        //所属网点
        siteId:{
          name: "所属网点",
          key: "siteId",
          SourceTypeValue: '',
          SourceType: []
        },
        isSiteShow:false,
        theadList:['选择','师傅编号','师傅姓名','师傅手机号','师傅类别','所属网点'],
        listData:[],
        flag:'',
        bindingData:{
          id:'',
          masterId:'',
          masterName:''
        },
        subDetails:{}
      }
    },
    methods: {
      //关闭弹窗
      closeMove(){
        this.binding.isShow=false;
      },
      //选择师傅类型
      selectorType(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
        this.siteId.SourceTypeValue = "";
        this.selectorBehindObj.siteId = "";
        this.selectorBehindObj.site = "";
        if("3"==this.selectorBehindObj.type){
          this.isSiteShow = true;
        }else{
          this.isSiteShow = false;
        }
      },
      //选择所属网点
      selectorSiteId(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            this.selectorBehindObj.site=v.value;
          }
        });
      },
      //获取所属网点数据
      getSite(){
        let url = this.$apidomain+'/common/findsite'
        this.$http.get(url).then(res=>{
          let data=res.data;
          this.siteId.SourceType.push({"id":"","value":"---请选择---"});
          data.result.forEach((v)=>{
            this.siteId.SourceType.push({"id":v.id,"value":v.name});
          })
        })
      },
      quiry(){
//        if(this.selectorBehindObj.type !=='3'&&this.selectorBehindObj.siteId){
//          this.listData = [];
//          return;
//        }
        let url=this.$apidomain+"/masterinfo/findMasterInfoList";
        let params={
          'name':this.selectorBehindObj.name,
           "type":this.selectorBehindObj.type,
           "siteId":this.selectorBehindObj.siteId,
        }
        this.$http.post(url,params).then(r=>{
          let data=r.data;
          this.listData = data.result;
        })
      }
      ,
      selected(item,index){
        this.flag = index;
        this.bindingData.id=this.binding.id;
        this.bindingData.masterId=item.id;
        this.bindingData.masterName=item.name;

      },
      submit(){
        console.log(this.binding.id,'渠道Id')
       let url = this.$apidomain+'/officialPartnerSubsetInfo/bindMaster';
       if(this.bindingData.id==''){
         this.$queryFun.successAlert.call(this,'请选择要绑定的师傅')
       }
       this.$http.post(url,this.bindingData).then(res=>{
         let data  = res.data;
         if(data.code==='0000'){
           this.$queryFun.successAlert.call(this,'绑定成功')
           this.closeMove();
         }else{
           this.$queryFun.successAlert.call(this,data.error)
         }
       })
      },
      subDetail(){
        let url = this.$apidomain+'/officialPartnerSubsetInfo/findoneOfficialPartnerSubsetInfo?id='+this.binding.id;
        this.$http.get(url).then(res=>{
          let data = res.data;
          this.subDetails = data.result;
        })
      }
    },
    mounted() {
    },
    created(){
        if(this.binding.title==='子渠道详情'){
          this.subDetail();
        }else{
          this.getSite();
          this.quiry();
          this.flag='';
        }
    }
  }
</script>

<style scoped lang="scss">
  .creditIsRunningLow{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .creditIsRunningLow_box {
    width: 960px;
    height: 620px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -310px 0 0 -480px;
    z-index: 2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    //overflow: auto;
    >div:nth-of-type(1) {
     // box-shadow: 0px 2px 4px 0px rgba(185, 185, 185, 0.5);
      //border-top: none;
      text-align: center;
      width: 100%;
      height: 48px;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      line-height: 48px;
      border-bottom: 1px #979797 solid;
      .close {
        float: right;
        display: inline-block;
        right: 3%;
        cursor: pointer;
        font-size: 13px;
        color: #D0021B;
        background: #FFFFFF;
        transform: translateX(-32px);
        height: 40px;
        span {
          transform: translateY(2px);
          display: inline-block;
          width: 16px;
          height: 16px;
        }
      }
    }
    >div:nth-of-type(2)>div{
      overflow: auto;
      width: 100%;
      height: 500px;
    }
    .content{
      width: 100%;
      padding-top: 48px;
      ul{
        margin-left: 26px;
        li{
          float: left;
          margin-right: 34px;
          span{
            margin-right: 9px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(57,57,57,1);
          }
        }
        li:last-of-type{
          margin: 0;
        }
      }
      button{
        clear: both;
        display: block;
        border: none;
        margin: 50px 0 0 92px;
        width:140px;
        height:40px;
        background:rgba(32,160,255,1);
        border-radius:4px;
        font-size:13px;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
      }
    }
    .tabList{
      margin:52px 0 0 26px;
      table{
        border-collapse:collapse;
        width: 96%;
        tr{
          text-align: center;
        }
        thead{
          tr{
            height: 44px;
            border: 1px #E0E6ED solid;
            background: #F0F0F0;
            td{
              border-right: 1px #E0E6ED solid;
              font-size:13px;
              font-family:PingFangSC-Regular;
              color:rgba(94,109,130,1);
            }
          }
        }
        tbody{
          tr{
            height: 34px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            td{
              span{
                //margin-right:5px;
                width:20px;
                height:20px;
                display: inline-block;
                //border: 1px red solid;
                .isSelect{
                  background: url(../../../assets/images/isReasons.png) center center no-repeat;
                  background-size: 100% 100%;
                  width: 100%;
                  height: 100%;
                }
                .selected{
                  background: url(../../../assets/images/reasons.png) center center no-repeat;
                }
              }
            }
          }
          tr:nth-of-type(even){
            background:rgba(240,240,240,1);
          }
        }

      }
    }
    .bottomBtn{
      width: 100%;
      margin:16px 0 0 276px;
      /*position: fixed;
      left: 50%;
      margin-left: -205.5px;
      top:82%;*/
      //background:rgba(255,255,255,1) ;
      p{
        display: inline-block;
        width:200px;
        height:40px;
        border-radius:4px;
        border:1px solid rgba(35,161,254,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(35,161,254,1);
        line-height:40px;
        text-align: center;
      }
      p:nth-of-type(2){
        background:rgba(32,160,255,1);
        border:none;
        color:rgba(255,255,255,1);
        margin-left: 9px;
      }
    }
    >.subChanel{
      position: relative;
      margin: 62px 0 0 44px;
      width: 860px;
      table{
        border-collapse: collapse;
        border: 1px #C0CCDA solid;
        width: 860px;
        tr{
          height: 30px;
          line-height: 30px;
          font-size:13px;
          border-bottom: 1px #C0CCDA solid ;
          font-family:PingFangSC-Regular;
          color:rgba(51,51,51,1);
          td:nth-of-type(1){
            background: #F0F0F0;
            width: 110px;
            text-align: center;
            color:rgba(94,109,130,1);
          }
          td:nth-of-type(2){
            text-indent: 13px;
          }
        }
      }
      >p{
        width:200px;
        height:40px;
        background:rgba(32,160,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        line-height:40px;
        text-align: center;
        position: absolute;
        top:420px;
        left: 330px;
      }
    }
  }

</style>





