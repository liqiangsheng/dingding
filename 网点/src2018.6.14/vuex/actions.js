export let actions = {
  serviceWorker(context, serviceWorker) {
    context.commit('serviceWorker', serviceWorker)
  },
  serviceArea(context, serviceArea) {
    context.commit('serviceArea', serviceArea)
  },
  masterDetails(context, masterDetails) {
    context.commit('masterDetails', masterDetails)
  },
  editDetails(context, editDetails) {
    context.commit('editDetails', editDetails)
  },
  selectProvince(context, selectProvince) {
    context.commit('selectProvince', selectProvince)
  },
  city(context, city) {
    context.commit('city', city)
  },
}
