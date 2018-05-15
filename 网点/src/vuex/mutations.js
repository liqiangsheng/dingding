import storage from "@/assets/js/storage"

export let mutations = {
  pushMasterListMsg(state,data){
    for(let k in data){
      state.masterListMsg[k]=data[k]
    }
  }
}
