<template>
    <div id="box">
      <!--<el-dialog style="z-index:999999"   :visible.sync="complain.isShow" size="tiny" v-if="complain.isShow">-->
        <h3>{{complain.title}} <i @click="close"></i></h3>
        <p class="mingchen"><span>选择</span><span>原因</span></p>
        <ul class="alert_forbidden_text">
          <li v-for="(item,index) in content.list" :key="index" @click="masterImposeSelector(item,content)">
            <img src="/static/images/isReasons.png"  v-show="item.selector=='0'">
            <img src="/static/images/reasons.png"  v-show="item.selector!='0'">
            {{item.name}}
            <!--<span v-show="item.selector!='0'"></span>-->
          </li>
        </ul>
        <textarea :placeholder="placeholder" class="alert_forbidden_area" v-model.trim="content.textareaContent">
        </textarea>
      <div class="bottom">
        <el-button @click="close">取消</el-button>
        <el-button @click="confirm(content)" type="primary">确定</el-button>
      </div>
      <!--</el-dialog>-->
    </div>
</template>
<script>
  import {clearSelector,getThis} from "@/components/order/js/pagingPages"
    export default {
      props:["complain","quiry"],
        data() {
            return {
              content:"",
              placeholder:"请填写原因"
            }
        },
        methods: {
          close(){
            this.complain.isShow = false;
          },
          confirm(data){
            if(!data.selectorContent){
              return this.$queryFun.successAlert.call(this,"请选择原因")
            }
            if(data.selectorContent == "其他"&&data.textareaContent== ""){
              return this.$queryFun.successAlert.call(this,"请填写其他原因")
            }
            console.log(data.selectorContent,"dsffsd")
            let url=`${this.$apidomain}/${this.complain.url}`,
                params={"orderId":this.complain.id,"remark":data.textareaContent,"reasonOfComplain":data.selectorContent};
            this.$http.post(url,params).then(r=>{
              console.log(r)
                let data=r.data;
                if(data.code==='0000'){
                  this.$notify({
                    title: '成功',
                    message: '提交成功',
                    type: 'success'
                  });
                  if(this.quiry){
                    this.quiry();
                  }
                  this.complain.isShow=false;
                }else{
                  this.$queryFun.successAlert.call(this,r.data.error)
                }
            })
          },
          masterImposeSelector(item,content){
               clearSelector(content);
              item.selector=!item.selector;
              if(item.selector){
                content.selectorContent=item.name;
                if(content.selectorContent == "其他"){
                  this.placeholder = "请填写原因（必填）"
                }else{
                  this.placeholder = "请填写原因（选填）"
                }
              }
            }
        },
      watch:{
        "complain.isShow":function(v,o){
          if(!v){
            clearSelector(this.content);
            this.content.textareaContent='';
            this.content.selectorContent='';
          }
        }
      },
      created() {
        console.log(this.complain)
        if(this.complain.status==='0'){
          this.content=this.$store.state.content
        }else{
          this.content=this.$store.state.content2
        }
          getThis(this);
        }
    }
</script>
<style scoped lang="scss">
  #box{
    width: 960px;
    height: 620px;
    background: #FFFFFF;
    border-radius:8px;;
    margin:  0 auto;
    transform: translateY(25%);
    /*overflow: hidden;*/
    overflow-y: auto;
    h3 {
      position: relative;
      border-bottom: 2px solid rgba(215,215,215,1);;
      width: 100%;
      height: 48px;
      text-align: center;
      line-height: 48px;
      i {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        background: url(../../../../static/images/pruductclose.png) no-repeat center;
      }
      i:hover {
        cursor: pointer;
        background: url(../../../../static/images/pruduct1close.png) no-repeat center;
      }
    }
    .mingchen{
      width: 910px;
      margin-left: 26px;
      margin-right: 24px;
      height:44px;
      background:rgba(240,240,240,1);
      border:1px solid rgba(224,230,237,1);
      border-radius: 2px;
      margin-top: 15px;
      display: flex;
      span:nth-child(1){
        display: inline-block;
        width: 50px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color:rgba(94,109,130,1);
        font-size: 13px;
      }
      span:nth-child(2){
        display: inline-block;
       flex: 1;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color:rgba(94,109,130,1);
        font-size: 13px;
      }
    }
    textarea{
      width: 910px;
      margin-left: 26px;
      margin-top: 14px;
    }
    .bottom{
      width: 100%;
      height: 40px;
      button{
        width: 200px;
        margin-left: 30%;
      }
    }
  }
  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
  }
  .alert_forbidden_text{
    width: 910px;
    margin-left: 26px;
    margin-right: 24px;
    list-style: none;
    >li{
      line-height: 34px;
      font-size:13px;
      color:rgba(51,51,51,1);
      img{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 32px;
        margin-left: 16px;
        transform: translateY(5px);
      }
    }
    li:nth-child(2n){
     background:rgba(248,248,248,1);
    }
    /*span{*/
      /*width:10px;*/
      /*!*float:right;*!*/
      /*margin-left:20px;*/
      /*height:10px;*/
      /*display: inline-block;*/
      /*background:green;*/
      /*border-radius: 50%;*/
    /*}*/
  }
  .alert_forbidden_area{
    width:100%;
    height:100px;
    border:none;
    margin-bottom:30px;
    border:1px solid #ccc;
  }
</style>


