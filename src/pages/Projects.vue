<template>
  <b-container class="text-left col-sm-12 col-lg-6">
    <b-row>
      <b-col>
        <h3>Active Projects</h3>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-button
          variant="success"
          to="/new-project"
          class="mb-3"
          size="sm">
          Start New Project
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <!-- <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Progress</th>
              <th scope="col">Due Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.projectName }}</td>
              <td>{{ item.progress }}</td>
              <td>{{ item.dueDate }}</td>
              <td>
                <b-button variant="primary" size="sm" @click="go(item.projectName)">View</b-button>
              </td>
            </tr>
          </tbody>
        </table> -->
        <b-table :items="projects" :fields="fields" :busy="loading">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
          <template slot="view_project" slot-scope="data">
            <b-button variant="success" @click="go(data)">View</b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="3">
        <b-button
          variant="light"
          class="ml-auto"
          size="sm">View Archived or Finished Projects
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      fields: ['name', 'goal_amount', 'due_date', 'view_project'],
      projects: []
    }
  },
  methods: {
    go (data) {
      this.$router.push('/project/' + data.item.name)
    }
  },
  mounted () {
    this.$axios.get('/projects/all').then(
      res => {
        this.projects = res.data
        this.loading = false
      },
      err => {
        console.log(err)
      }
    )
  }
}
</script>
