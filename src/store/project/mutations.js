import api from '@/plugins/axios'

export function SET_ALL_PROJECTS (state, data) {
  state.projectList = data
}

export function GET_ALL_PROJECTS (state) {
  api.get('/projects/all').then(
    res => {
      SET_ALL_PROJECTS(state, res.data)
    }
  )
}

export function SET_CURRENT_PROJECT (state, id) {
  // $route.params passes strings -- if id is pulled from route param
  // we need to parse it before using it.
  state.currentProject = state.projectList.find(project => project.id === parseInt(id))
}
