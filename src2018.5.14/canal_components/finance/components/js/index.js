export function Init(params){
  for(let k in params){
    this[k]=params[k]
  }
  this.clearTime = pic => window.clearInterval(pic);
}
 Init.prototype.pic=null;

 Init.prototype.timeoutGet=function($this){
      let flag = true;
      this.clearTime(this.pic);
          this.pic = setInterval(()=>{
            if(flag&&$this.$store.state.accountOverviewAlertData.isShow&&!$this.parentData.isShow){
                this.getQuery( $this, state => {
                  $this.parentData.isShow=true;
                  flag=false;
                  $this.$store.commit("changeAccountAlertData",{paState:state});
                });
                if(!!$this.parentData.isClear)flag=false;
            }else{
              return this.clearTime(this.pic)
            }
      },3000);
 };

Init.prototype.getQuery=function($this,callback=null){
  $this.$http.post(this.url,{id:this.id}).then(res=>{
    let data=res.data;

    if( data.code === "0000" && data.result && data.result.payState==="2"){
      if(!!callback){
          callback(data.result.paState);
      }else{
        console.log(this.pic,"pic----=");
        this.clearTime(this.pic);
        $this.parentData.isShow=true;
      }
    }
  })
};

