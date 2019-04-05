<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="headline">My Active Projects</h2>
      </v-flex>
      <v-flex xs8><v-btn depressed small icon color="success"><v-icon>add</v-icon></v-btn></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 v-for="project in projectList" :key="project.id">
        <project-summary :project="project" :inList="true" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProjectSummary from '@/components/ProjectSummary'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      projectList: 'project/getProjectList'
    })
  }
}
</script>
