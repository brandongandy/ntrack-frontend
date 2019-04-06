import api from '@/plugins/axios'
import { format } from 'date-fns'

export function SET_GOAL (state, data) {
  state.goal = data
}

export function SET_ENTRY_LIST (state, data) {
  state.entryList = data
}

export function GET_GOAL (state) {
  let todaysDate = format(new Date(), 'YYYY-MM-DD')
  api.get('/goals/' + todaysDate).then(
    res => {
      SET_GOAL(state, res.data)
    },
    err => {
      console.log(err)
    }
  )
}

export function GET_ALL_ENTRIES (state) {
  api.get('/entries/all').then(
    res => {
      SET_ENTRY_LIST(state, res.data)
    }
  )
}
