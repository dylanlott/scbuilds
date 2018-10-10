// https://vuetifyjs.com/components/snackbars
export const state = () => {
  return {
    pending: false,
    success: false,
    failure: false,

    context: 'info',
    text: '',
    snackbar: false
  }
}
export const mutations = {
  INFO (state, data) {
    state.text = data
    state.failure = true
    state.snackbar = true
    state.context = 'info'
  },
  PENDING (state) {
    state.mode = 'info'
    state.pending = true
  },
  SUCCESS (state, data) {
    state.failure = false
    state.context = 'success'
    state.success = true
    state.text = data.message
    state.snackbar = true
    state.pending = false
  },
  FAILURE (state, data) {
    state.success = false
    state.context = 'error'
    state.failure = true
    state.text = data.message
    state.snackbar = true
    state.pending = false
  },
  UPDATE_SNACKBAR (state, value) {
    state.snackbar = value
  }
}

export const actions = {
  async notification ({ commit }, alert) {
    commit(`notification/${alert.type}`,
      alert.data.message || alert.data,
      { root: true }
    )
  }
}
