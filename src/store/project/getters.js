export function getProjectList (state) {
  return state.projectList
}

export function getLatestProject (state) {
  return state.projectList.find(p => p !== undefined)
}

export function getCurrentProject (state) {
  return state.currentProject
}
