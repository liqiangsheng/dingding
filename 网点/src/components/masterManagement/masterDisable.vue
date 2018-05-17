<template>
  <!--师傅禁用-->
    <div id="masterDisable">
      <ul class="masterDisableCenter">
        <li>  <mu-radio label="多次恶意违规收费" name="group" nativeValue="多次恶意违规收费" v-model="value" class="demo-radio"/> </li>
        <li>  <mu-radio label="多次被投诉" name="group" nativeValue="多次被投诉" v-model="value" class="demo-radio"/> </li>
        <li>  <mu-radio label="关键资料不全" name="group" nativeValue="关键资料不全" v-model="value" class="demo-radio"/> </li>
        <li>  <mu-radio label="引导用户线下付款" name="group" nativeValue="引导用户线下付款" v-model="value" class="demo-radio"/> </li>
        <li>  <mu-radio label="师傅离职" name="group" nativeValue="师傅离职" v-model="value" class="demo-radio"/> </li>
        <li>  <mu-radio label="其他" name="group" nativeValue="其他" v-model="value" class="demo-radio"/> </li>
        <li>
          <textarea v-model="value1" placeholder="请填写原因" style="width: 100%;height:2.95rem;padding: 0.16rem;outline:none">
          </textarea>
        </li>
      </ul>

      <button @click="Submission">提交</button>

    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
              value: '',
              value1:"",
              detailData:{},
            }
        },
      watch:{
        value:function(a,b){
          console.log(a)
        }
      },
        methods: {
          Submission(){
            if(!this.value){
             return Toast("请选择禁用原因")
            }else if(!this.value1){
              return Toast("请选描述禁用原因")
            }
            let url=this.$common.apidomain+"/masterinfo/updateMasterinfo"
            let objData = {};
            objData.forbiddenCause = this.value;
            objData.id = this.detailData.id;
            objData.state = "2";
            objData.templateCodeString = "jinyong";
            objData.forbiddenRemark = this.value1;
            this.$http.post(url,objData).then(res=>this.$httpFilter(res).then(data=>{
                 Toast("禁用成功");
                 setTimeout(()=>{
                   this.$router.push({path:"/master"});
//                   this.$router.go(-2);
                 },500)

            }))
          }
        },
        created() {
          this.detailData = JSON.parse(sessionStorage.getItem("masterDetail"));
        }
    }
</script>
<style scoped lang="less">
  #masterDisable{
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background:rgba(241,241,241,1);
    overflow-y: auto;
  }
  .masterDisableCenter{
    width: 100%;
    margin-top: 0.16rem;
    background: #ffffff;
    height: 9.42rem;
    overflow: hidden;

      li {
        width: 100%;
        height: 1rem;
        border-bottom: 0.03rem solid rgba(241, 241, 241, 1);
        padding: 0.25rem 5%;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        color: rgba(57, 57, 57, 1);
        line-height: 0.45rem;
      }
     li:last-child{
       border-bottom: 0;
        height: 3.2rem;
     }

  }
  button{
    border: 0;
    width: 90%;
    height: 0.9rem;
    margin-left: 5%;
    margin-top: 0.5rem;
    border-radius: 0.1rem;
    background: #536BD2;
    font-size:0.36rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
  }
</style>


