export function getProjectList (state) {
  return state.projectList
}

export function getLatestProject (state) {
  var latestProject = state.projectList.find(p => p !== undefined)
  if (latestProject) {
    return latestProject
  } else {
    return {}
  }
}

export function getCurrentProject (state) {
  return state.currentProject
}
