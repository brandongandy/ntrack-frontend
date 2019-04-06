export function setGoal (context, data) {
  context.commit('SET_GOAL', data)
}

export function setEntryList (context, data) {
  context.commit('SET_ENTRY_LIST', data)
}

export function getGoal (context) {
  context.commit('GET_GOAL')
}

export function getEntryList (context) {
  context.commit('GET_ENTRY_LIST')
}
