<template>
  <div id="app">
    <router-view></router-view>
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
//  provide(){ //局部刷新
//    return{
//      reload:this.reload
//    }
//  },
  data(){
    return{
//      isRouterAlive:true
    }
  },
  watch:{
    "$route":function(e,l){

       this.$store.dispatch("routerPath",e);
      if(!!getSession("update").length&&getSession("update")[0]==="0"){
         history.go(0);
        setSession("update","1")
     }
    }
  },
  created(){
    let cityUrl = this.$apidomain+"/areaDomain/findAreaDomainList?modelName="+getSession("KEY")[0];
    this.$http.post(cityUrl).then(res=>{
      if(res.data.code === "0000"){
        this.$store.dispatch("cityUrl",res.data.result)
      }else{
        this.$queryFun.successAlert.call(this,data.error);
      }
    })

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

      }else{
        this.$queryFun.successAlert.call(this,data.error);
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
  },
  methods:{
//    reload(){
//      this.isRouterAlive = false;
//      this.$nextTick(function(){
//        this.isRouterAlive = true;
//        this.isRouterAlive = true;
//      })
//    }
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
  color: #393939;
}
</style>
