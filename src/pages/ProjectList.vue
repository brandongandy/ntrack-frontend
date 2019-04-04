<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs8><h2>My Active Projects</h2></v-flex>
      <v-flex xs8><v-btn depressed small icon color="success"><v-icon>add</v-icon></v-btn></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 v-for="project in projects" :key="project.id">
        <project-summary :project="project" :inList="true" />
      </v-flex>
    </v-layout>
  </v-container>
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
