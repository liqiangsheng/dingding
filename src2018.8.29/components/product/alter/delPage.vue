<template>
  <div>
      <div class="addAlert"><!--背阴-->
      </div>
      <div class="addAlert_box" v-if="delData.name=='配件'&&delData.title=='删除产品'">
          <div class="el-message-box__title">
              <span>{{delData.title}}</span>
            <i @click="close"></i>
          </div>
        <ul class="centent">
          <li><img src="/static/images/warn.png" alt="确定删除该配件吗？"><span>确定删除该配件吗？</span></li>
        </ul>

        <div class="li">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="yes">确定</el-button>
        </div>
      </div>
    <!---------------------------------------->
    <div class="addAlert_box" v-if="delData.name=='产品'&&delData.title=='删除产品'">
      <div class="el-message-box__title">
        <span>{{delData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><img src="/static/images/warn.png" alt="确定删除该产品吗？"><span>确定删除该产品吗？</span></li>
      </ul>
      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
    <!---------------------------------------->
    <div class="addAlert_box" v-if="delData.name=='产品'&&delData.title=='产品上架'">
      <div class="el-message-box__title">
        <span>{{delData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><img src="/static/images/warn.png" alt="确定上架该产品吗？"><span>确定上架该产品吗？</span></li>
      </ul>
      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
    <!---------------------------------------->
    <div class="addAlert_box" v-if="delData.name=='产品'&&delData.title=='产品下架'">
      <div class="el-message-box__title">
        <span>{{delData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><img src="/static/images/warn.png" alt="确定下架该产品吗？"><span>确定下架该产品吗？</span></li>
      </ul>
      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
    <!-------------------渠道配件-------------------->
    <div class="addAlert_box" v-if="delData.name=='渠道配件'&&delData.title=='配件上架'">
      <div class="el-message-box__title">
        <span>{{delData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><img src="/static/images/warn.png" alt="确定上架该配件吗？"><span>确定上架该配件吗？</span></li>
      </ul>
      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
    <!---------------------------------------->
    <div class="addAlert_box" v-if="delData.name=='渠道配件'&&delData.title=='配件下架'">
      <div class="el-message-box__title">
        <span>{{delData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><img src="/static/images/warn.png" alt="确定下架该配件吗？"><span>确定下架该配件吗？</span></li>
      </ul>
      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
    <!---------------------------------------->
    <div class="addAlert_box" v-if="delData.name=='渠道配件'&&delData.title=='删除配件'">
      <div class="el-message-box__title">
        <span>{{delData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><img src="/static/images/warn.png" alt="确定下架该产品吗？"><span>确定删除该渠道配件吗？</span></li>
      </ul>
      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>

  </div>


</template>
<script>

  export default {
    props:["delData","quiry"],
    components:{
    },
    data() {
      return {

       }

    },
    methods: {
      close(){ //传值给父级
        this.$emit("isClose",false);
        this.quiry();
      },
      quxiao(){ //取消
        this. close();
      },
      yes(){ //确定
         this.quiryOne()
      },

      quiryOne(){ //数据传递
          if(this.delData.name == "渠道配件"){
                 let parm;
                 if(this.delData.title =="配件上架"){
                   parm ="1";
                 }else if(this.delData.title =="配件下架"){
                   parm ="0";
                 }else if(this.delData.title =="删除配件"){
                   parm ="2";
                 }
             let url = this.$apidomain +"/serviceareamountings/areaMountingsRenew?state="+parm+"&id="+this.delData.data.id;;
             this.$http.get(url).then(res=>{
               if(res.data.code == "0000"){
                 this.close();
                 if(parm == "1"){
                   this.$queryFun.successAlert.call(this,"渠道配件上架成功","0")
                 }else if(parm == "0"){
                   this.$queryFun.successAlert.call(this,"渠道配件下架成功","0")
                 }else if(parm == "2"){
                   this.$queryFun.successAlert.call(this,"渠道删除配件成功","0")
                 }

               }else{
                 this.$queryFun.successAlert.call(this, res.data.error);
               }
             })
          }else if(this.delData.name == "产品"){
            let parm;
            if(this.delData.title =="产品上架"){
              parm ="1";
            }else if(this.delData.title =="产品下架"){
              parm ="0";
            }else if(this.delData.title =="删除产品"){
              parm ="2";
            }
            let url = this.$apidomain +"/serviceareainfo/areaInfoRenew?state="+parm+"&id="+this.delData.data.id;;
            this.$http.get(url).then(res=>{
              if(res.data.code == "0000"){
                this.close();
                if(parm == "1"){
                  this.$queryFun.successAlert.call(this,"产品上架成功","0")
                }else if(parm == "0"){
                  this.$queryFun.successAlert.call(this,"产品下架成功","0")
                }else if(parm == "2"){
                  this.$queryFun.successAlert.call(this,"删除产品成功","0")
                }

              }else{
                this.$queryFun.successAlert.call(this, res.data.error);
              }
            })

          }else if(this.delData.name == "配件"){
            let parm;
            if(this.delData.title =="产品上架"){
              parm ="1";
            }else if(this.delData.title =="产品下架"){
              parm ="0";
            }else if(this.delData.title =="删除产品"){
              parm ="2";
            }
            let url = this.$apidomain +"/servicemountings/areaMountingsRenew?state="+parm+"&id="+this.delData.data.id;
            this.$http.get(url).then(res=>{
              if(res.data.code == "0000"){
                this.close();
                if(parm == "1"){
                  this.$queryFun.successAlert.call(this,"配件上架成功","0")
                }else if(parm == "0"){
                  this.$queryFun.successAlert.call(this,"配件下架成功","0")
                }else if(parm == "2"){
                  this.$queryFun.successAlert.call(this,"删除配件成功","0")
                }

              }else{
                this.$queryFun.successAlert.call(this, res.data.error);
              }
            })

          }
      },

    },


    mounted() {
    },
    created(){
      console.log(this.delData)
    }
  }
</script>
<style scoped lang="scss">

  .addAlert{
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
  .addAlert_box{
    width: 390px;
    height: 202px;
    background-color: #fff;
    position: absolute;
    left: 40%;
    top:30%;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    padding-top:20px;
    width: 100%;
    position: relative;
    font-weight: 100;
    i{
      display: inline-block;
      position: absolute;
      right: 20px;
      top:20px;
      width: 15px;
      height: 15px;
      cursor: pointer;
      background: url(../../../../static/images/pruductclose.png) no-repeat center;
    }
    i:hover{
      cursor: pointer;
      background: url(../../../../static/images/pruduct1close.png) no-repeat center;
    }
    span{
      width: 100%;
      display: inline-block;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:16px;
      text-indent: 20px;
    }
  }
  .centent{
    padding: 30px 20px 0 20px;
    li{
      width: 100%;
      height: 40px;
      img{
        display: inline-block;
        width: 40px;
        height: 40px;
        transform: translateY(12px);
      }
      span{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-left: 14px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(71,86,105,1);
      }
    }

  }
  .li{
    width: 100%;
    position: absolute;
    bottom: 15px;
    right: 20px;
    text-align: right;
    .el-button{
      width: 64px;
    }
  }
</style>








