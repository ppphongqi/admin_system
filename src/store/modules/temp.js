const state = () => ({
  editValue: [],
})
const getters = {
  editValue: (state) => state.editValue,
}
const mutations = {
  setEditValue(state, editValue) {
    state.editValue = editValue
  },
}
const actions = {
  setEditValue({ commit }, editValue) {
    commit('setEditValue', editValue)
  },
}
export default { state, getters, mutations, actions }
