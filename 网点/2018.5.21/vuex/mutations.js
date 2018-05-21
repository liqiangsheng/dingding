export let mutations = {
  pushMasterListMsg(state,data){
    for(let k in data){
      state.masterListMsg[k]=data[k]
    }
  },
  masterDetailObj(state,data){
    state.masterDetailObj = data;
  },
  orderInfo(state,data){
    state.orderInfo = data;
  },
  serviceWorker(state, serviceWorker) {
    return state.serviceWorker = serviceWorker
  },
  serviceArea(state, serviceArea) {
    return state.serviceArea = serviceArea
  },
  masterDetails(state, masterDetails) {
    return state.masterDetails = masterDetails
  },
  editDetails(state, editDetails) {
    return state.editDetails = editDetails
  },
  selectProvince(state, selectProvince) {
    return state.selectProvince = selectProvince
  },
  city(state, city) {
    return state.city = city
  },
}
