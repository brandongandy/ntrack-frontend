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

    <b-row v-if="noProjects" class="text-center">
      <b-col class="my-3">
        <h4>No projects yet. Start one up!</h4>
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
      projects: [],
      noProjects: false
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
        if (res.data.length > 0) {
          this.projects = res.data
        } else {
          this.noProjects = true
        }
        this.loading = false
      },
      err => {
        this.noProjects = true
        this.$alert.danger({ message: err })
        this.loading = false
      }
    )
  }
}
</script>
