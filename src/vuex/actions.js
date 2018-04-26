export let actions={ //异步处理VUEX
  cityIdid(store,data){
    store.commit("cityIdid",data);
},
  trackAlterId(store,data){
    store.commit("trackAlterId",data);
  },
  detailAlterId(store,data){
    store.commit("detailAlterId",data)
  },
  addDataCarter(store,data){
    store.commit("addDataCarter",data)
  }
};
