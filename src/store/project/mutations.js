import api from '@/plugins/axios'

export function SET_ALL_PROJECTS (state, data) {
  data.sort(function compare (a, b) {
    var firstDate = new Date(a.last_update)
    var secondDate = new Date(b.last_update)
    return firstDate - secondDate
  })
  SET_LATEST_PROJECT(state, data.find(p => p !== undefined))
  state.projectList = data
}

export function SET_LATEST_PROJECT (state, data) {
  state.latestProject = data
}

export function GET_ALL_PROJECTS (state) {
  api.get('/projects/all').then(
    res => {
      SET_ALL_PROJECTS(state, res.data)
    }
  )
}

export function GET_LATEST_PROJECT (state) {
  api.get('/projects/latest').then(
    res => {
      SET_LATEST_PROJECT(state, res.data)
    }
  )
}

export function SET_CURRENT_PROJECT (state, id) {
  // $route.params passes strings -- if id is pulled from route param
  // we need to parse it before using it.
  state.currentProject = state.projectList.find(project => project.id === parseInt(id))
}
