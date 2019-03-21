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
      <table class="table table-hover">
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
      </table>
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
      items: [
        { projectName: 'Great Expectations', projectType: 'Novel', progress: '23,596 / 80,000', dueDate: '2019-04-30', isFinished: false },
        { projectName: '1Q84', projectType: 'Short Story / Other', progress: '8,123 / 8,000', dueDate: '2019-02-01', isFinished: true },
        { projectName: 'Catch-22', projectType: 'Novel', progress: '50,000 / 50,000', dueDate: '2019-03-15', isFinished: true },
        { projectName: 'Essays', projectType: 'Article / Essay', progress: '0', dueDate: '2019-12-01', isFinished: false }
      ]
    }
  },
  methods: {
    go (rowID) {
      this.$router.push('/project/' + rowID)
    }
  }
}
</script>
