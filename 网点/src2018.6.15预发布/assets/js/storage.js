export default{
    setSession(key,value) {
        sessionStorage.setItem(key, JSON.stringify(value));
  },
   getSession(key){
    let jsonString = sessionStorage.getItem(key) || "null";
         return JSON.parse(jsonString);
  },
   getLocalStorage(key){
    let jsonString = localStorage.getItem(key) || "null";
        return JSON.parse(jsonString);
  },
  setLocalStorage(key,value){
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// export function UrlSearch(){
//   let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
//   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
//   var arr=str.split("&"); //各个参数放到数组里
//   for(var i=0;i < arr.length;i++){
//     num=arr[i].indexOf("=");
//     if(num>0){
//       name=arr[i].substring(0,num);
//       value=arr[i].substr(num+1);
//       this[name]=value;
//     }
//   }
// }

