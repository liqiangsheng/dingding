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
}
