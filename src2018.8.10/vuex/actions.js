export let actions={ //异步处理VUEX
  cityUrl(store,data){
    store.commit("cityUrl",data)
  },
  orderDetailiD(store,data){
    store.commit("orderDetailiD",data)
  },
  parseDetailiD(store,data){
    store.commit("parseDetailiD",data)
  },
  xiaoqudaoId(store,data){
     store.commit("xiaoqudaoId",data)
  },
  cityIdid(store,data){
    store.commit("cityIdid",data);
},
  cityIdid1(store,data){
    store.commit("cityIdid1",data);
  },
  trackAlterId(store,data){
    store.commit("trackAlterId",data);
  },
  detailAlterId(store,data){
    store.commit("detailAlterId",data)
  },
  addDataCarter(store,data){
    store.commit("addDataCarter",data)
  },
  billDateTime(store,data){
    store.commit("billDateTime",data)
  },
  comDateTime(store,data){
    store.commit("comDateTime",data)
  },
  accountId(store,data){
    store.commit("accountId",data)
  },
  routerPath(store,data){
    store.commit("routerPath",data)
  },
  getSort(store,data){
    store.commit('sort_data',data);
  }
};
