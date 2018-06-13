import VueCookie from "vue-cookie"
export function setCookie(key,value,time=1){
  VueCookie.set(key,value,time);
}
export function getCookie(key){
  if(VueCookie.get(key)===""||!VueCookie.get(key)){
    return null;
  }else{
    return VueCookie.get(key);
  }
}