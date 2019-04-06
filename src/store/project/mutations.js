import api from '@/plugins/axios'

export function SET_ALL_PROJECTS (state, data) {
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
