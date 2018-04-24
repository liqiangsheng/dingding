export let actions={ //异步处理VUEX
  trackAlterId(store,data){
    store.commit("trackAlterId",data);
  },
  detailAlterId(store,data){
    store.commit("detailAlterId",data)
  },
};
