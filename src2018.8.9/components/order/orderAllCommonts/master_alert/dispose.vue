<template>
    <div id="app">
      <div class="box">
        <h3>{{addRemarksObj.title}} <img src="/static/images/del.png" @click="close"></h3>
        <div class="timeOut" v-show="outTime">
          <p>该预约时间已过期，此操作将清空原预约时间！</p>
          <p>原预约时间：{{addRemarksObj.timeOut|moment('YYYY-MM-DD HH:mm:ss')}}</p>
        </div>
        <textarea class="alert_forbidden_area" v-model.trim="textareaContent" placeholder="请填写备注">
        </textarea>
        <div class="bottom">
          <el-button @click="close">取消</el-button>
          <el-button @click="masterImposeOperate(addRemarksObj)" type="primary">确定</el-button>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      props:["addRemarksObj","quiry"],
        data() {
            return {
              outTime:false,
              textareaContent:""
            }
        },
        methods: {
          close(){
            this.addRemarksObj.isShow=false
          },
          masterImposeOperate(item){
            console.log(item)
            if(this.textareaContent == ""){
              this.$queryFun.successAlert.call(this,"处理内容不能为空");
              return
            }
              let url=`${this.$apidomain}/order/dispose`;
              this.$http.post(url,{"remark":this.textareaContent,"orderId":item.orderId}).then(r=>{
                let data=r.data;
                if(data.code==='0000'){
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  if(this.quiry)
                    this.quiry();
                  item.isShow=false;
                }else{
                  this.$message.error(data.error);
                }
              })
          }
        },
        created() {
        console.log(this.addRemarksObj)
          let date = Date.parse(new Date())
          if(date >  Date.parse(new Date(this.addRemarksObj.timeOut))&&this.addRemarksObj.state != "09"){
            this.outTime = true;
          }else{
            this.outTime = false;
          }
        }
    }
</script>
<style scoped lang="scss">
  #app{
    position: relative;
     .box{
       position: relative;
       width: 960px;
       height: 620px;
       background: #FFFFFF;
       margin: 10% 0 0 20%;
       border-radius:8px;
       h3{
         width: 100%;
         height: 48px;
         text-align: center;
         line-height: 48px;
         border-bottom:1px solid rgba(151,151,151,1);
         position: relative;
         margin-bottom: 58px;
         img{
           position: absolute;
           right: 32px;
           display: inline-block;
           width: 16px;
           height: 16px;
           top: 15px;
         }
       }
       .timeOut{
         p{
           width: 100%;
           padding: 0 25px;
           height:18px;
           font-size:13px;
           font-family:PingFangSC-Regular;
           color:rgba(230,88,49,1);
           line-height:18px;
         }
       }

       .bottom{
         width: 100%;
         height: 40px;
         position: absolute;
         bottom: 38px;
         button{
           width: 200px;
           height: 40px;
           margin-left: 29%;
         }
       }
     }
  }

  .alert_forbidden_area{
    margin-left: 25px;
    margin-top: 26px;
    width:910px;
    height:123px;
    border:1px solid #ccc;

  }
</style>


