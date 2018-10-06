import axios from '~/plugins/axios'

export const state = () => {
  return {
    details: {}
  }
}

export const mutations = {
  CREATE_BUILD_REQUEST (state) {
    console.log('creating build...')
  },

  CREATE_BUILD_SUCCESS (state, data) {
    console.log('successfully created build', data)
  },

  CREATE_BUILD_FAILURE (state, error) {
    console.log('Create build failure.', error.response.data)
  },

  UPDATE_BUILD_REQUEST (state) {
    console.log('updating build...')
  },

  UPDATE_BUILD_SUCCESS (state) {
    console.log('build updated!')
  },

  UPDATE_BUILD_FAILURE (state, error) {
    console.log('update build failed.', error)
  },

  GET_BUILD_REQUEST (state) {
    console.log('getting build...')
  },

  GET_BUILD_SUCCESS (state, data) {
    console.log('setting build details: ', data)
    state.details = data
  },

  GET_BUILD_FAILURE (state, error) {
    console.log('Error getting build: ', error)
  },
  ADD_STEP (state, step) {
    console.log('adding step', step)
    state.details.steps.push(step)
  }
}

export const actions = {
  async createBuild({ commit }, payload) {
    try {
      commit('CREATE_BUILD_REQUEST')
      let { data } = await axios.post('/builds', payload)
      commit('CREATE_BUILD_SUCCESS', data, { root: true })
      commit('notification/SUCCESS', data, { root: true })
    } catch (error) {
      commit('CREATE_BUILD_FAILURE')
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },

  async deleteBuild({ commit }, id) {
    try {
      console.log('deleting build... ', id)
      let { data } = await axios.delete(`/builds/${id}`)
      commit('notification/SUCCESS', `Deleted build`)
    } catch (error) {
      console.log(error)
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },

  async getOneBuild({ commit }, id) {
    try {
      commit('GET_BUILD_REQUEST')
      let { data } = await axios.get(`/builds/${id}`)
      commit('GET_BUILD_SUCCESS', data)
    } catch (error) {
      commit('GET_BUILD_FAILURE', error)
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },

  async updateBuild({ commit }, build) {
    try {
      commit('UPDATE_BUILD_REQUEST')
      let { data } = await axios.put(`/builds/${build._id}`, build)
      commit('UPDATE_BUILD_SUCCESS')
      commit('notification/SUCCESS', 'Build updated', { root: true })
    } catch (error) {
      commit('UPDATE_BUILD_FAILURE', error)
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },

  addStep ({ commit }, step) {
    commit('ADD_STEP', step)
  }
}
