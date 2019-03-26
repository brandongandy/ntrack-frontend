import axios from 'axios'

export default {
  async getAllProjects () {
    const res = await axios.get('/projects')
    return res.data
  }
}
