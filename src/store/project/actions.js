export function setAllProjects (context, data) {
  context.commit('SET_ALL_PROJECTS', data)
}

export function setLatestProject (context, data) {
  context.commit('SET_LATEST_PROJECT', data)
}

export function getAllProjects (context) {
  context.commit('GET_ALL_PROJECTS')
}

export function getLatestProject (context) {
  context.commit('GET_LATEST_PROJECT')
}
