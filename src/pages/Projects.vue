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
    <hr />
    <b-row v-if="loading">
      <b-col class="text-center text-danger my-2">
        <b-spinner class="align-middle" />
        <strong>Loading</strong>
      </b-col>
    </b-row>

    <b-row v-for="project in projects" :key="project.id">
      <b-col class="my-3">
        <project-summary :project="project" :inList="true" />
        <hr />
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
import ProjectSummary from '@/components/ProjectSummary'
export default {
  data () {
    return {
      loading: true,
      fields: ['name', 'goal_amount', 'due_date', 'view_project'],
      projects: [],
      fallback: [
        {
          id: 1,
          user_id: 'google-oauth2|101551280045388809437',
          name: '1Q84',
          project_type: 0,
          blurb: '',
          goal_type: 0,
          start_amount: 8123,
          goal_amount: 25000,
          start_date: '2019-01-01',
          due_date: '2019-02-28',
          last_update: '2019-03-01',
          is_finished: false
        },
        {
          id: 2,
          user_id: 'google-oauth2|101551280045388809437',
          name: 'Great Expectations',
          project_type: 0,
          blurb: '',
          goal_type: 0,
          start_amount: 8123,
          goal_amount: 25000,
          start_date: '2019-01-01',
          due_date: '2019-02-28',
          last_update: '2019-03-01',
          is_finished: false
        }
      ]
    }
  },
  components: {
    ProjectSummary
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
        this.$alert.danger({ message: err })
        this.projects = this.fallback
        this.loading = false
      }
    )
  }
}
</script>
