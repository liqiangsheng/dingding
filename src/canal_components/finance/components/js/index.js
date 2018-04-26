export function Init(params){
  for(let k in params){
    this[k]=params[k]
  }
}
 Init.prototype.timeoutGet=function($this){
      let isTest="1";
      let flag=true,
          pic=setInterval(()=>{
            if(flag&&$this.$store.state.accountOverviewAlertData.isShow){
              $this.$http.post(this.url,{id:this.id}).then(res=>{
                let data=res.data;
                console.log(data);
                // if(data.code==="0000"&&!!data.result&&data.result.paState=="2"){
                //   $this.$store.commit("changeAccountAlertData",{paState:data.result.paState});
                //   flag=false;
                // }
                console.log(isTest);
                if(isTest=="2"){
                  $this.parentData.isShow=true;
                  // $this.$store.commit("changeAccountAlertData",{paState:isTest});
                  flag=false;
                }else if(!!$this.parentData.isClear){
                  flag=false;
                }
              })
            }else{
              window.clearInterval(pic);
              return;
            }
      },5000);
   setTimeout(()=>{
     isTest="2";
   },10000)
 }

