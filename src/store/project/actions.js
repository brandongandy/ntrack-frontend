export function setAllProjects (context, data) {
  context.commit('SET_ALL_PROJECTS', data)
}

export function getAllProjects (context) {
  context.commit('GET_ALL_PROJECTS')
}
