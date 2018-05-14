import { Toast } from 'mint-ui';
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
						reject(data)
					}else{
						Toast(date.error);
						reject(data)
					}
			})
		}
};


