<template>
  <div id="app">
    <router-view ></router-view>
      <amend-password v-if="$store.state.isChannelPassword"></amend-password>
  </div>
</template>

<script>
import amendPassword from "@/canal_components/channerPass/amendPassword";
import {getSession,setSession} from "../static/js/session";
export default {
  name: 'app',
  components:{
    amendPassword
  },
  watch:{
    "$route":function(e,l){
      if(!!getSession("update").length&&getSession("update")[0]==="0"){
         history.go(0);
        setSession("update","1")
    }
    }
  },
  created(){

    let url=`${this.$apidomain}/common/findcitylistareainfo`;  //城市
    this.$http.get(url).then(r=>{
      let data=r.data;
      if(data.code==='0000')this.$store.commit("getCity",data.result);
    });
    let url2=`${this.$apidomain}/common/findchannel`;
    let officialPartnerId=''
    let urls = `${this.$apidomain}/officialPartnerSubsetAccountInfo/findlistOfficialPartnerSubsetAccountInfo?officialPartnerId=${officialPartnerId}`;
    this.$http.get(url2).then(r=>{
      let data=r.data;
      if(data.code==='0000'){
        //渠道列表
        this.$store.commit("getFund",data.result);

      }
    });
    let url3=this.$apidomain+"/common/findflabelbusinessname";      // 一级分类
    this.$http.get(url3).then(r=>{
      let data=r.data;
      if(data.code==='0000'){
        data.result.push({"id":"","name":"---请选择---"});
        this.$store.commit("getClassify",data.result)
      }else{
        this.$queryFun.successAlert.call(this,data.error);
      }
    });

//    this.$http.get("http://apis.map.qq.com/ws/place/v1/suggestion?key=RLQBZ-CRHKO-HUUW4-S5YEZ-FI3KZ-K3BPD&output=json&keyword=南方").then(res=>{
//      console.log(res);
//    })
  }
}
</script>
<style>
body{
  padding:0px;
  margin:0px auto;
}
a{
  text-decoration:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
