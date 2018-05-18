import { Toast } from 'mint-ui';
import storage from "./storage"
export default {
   isIosSystem () {
	    let u = navigator.userAgent, app = navigator.appVersion,
	    	  isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    		return !!isIOS?true:false;
			},
		httpFilter(res){
			const data=res.data;

      return new Promise((resolve,reject)=>{
					if(data.code==="0000"){
						resolve(data)
					}else if(data.code==="1001"){
						Toast(data.error);
            storage.setLocalStorage("userInfo","");
            setTimeout(()=>{window.location.hash="/login"},1000);
						reject(data)
					}else{
						Toast(data.error);
						reject(data)
					}
			})
		},
    upwardLoading(getTableList){
        window.onscroll = () => {

          if(this.pageTotal<=1)return;
            let scrollTop=0;
            if(!!document.documentElement.scrollTop){
              scrollTop=document.documentElement.scrollTop
            }else if(!!document.body.scrollTop){
              scrollTop=document.body.scrollTop;
            }
          if(this.loading&&(window.innerHeight + scrollTop)+500 >= document.body.scrollHeight){
              this.loading=false;
              if(this.showPages===this.pageTotal)return;
              // this.$Toast({
              //   message: '已经是最后一页了',
              //   position: 'bottom',
              //   duration: 5000
              // });

              this.showPages++;
              getTableList();
             }
      }
    }
};


