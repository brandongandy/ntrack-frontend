<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 xl8>
        <v-card class="mt-4">
          <v-card-title>
            <v-container class="primary white--text card-header elevation-1">
              <v-layout align-center>
                <v-flex>
                  <span class="title">My Active Projects</span><v-spacer></v-spacer>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 v-for="project in projectList" :key="project.id">
                <project-summary :project="project" :inList="true" />
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="primary" to="/projects/new">New Project</v-btn>
          </v-card-actions>
        </v-card>
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
      this.$router.push('/projects/' + data.item.name)
    }
  },
  computed: {
    ...mapGetters({
      projectList: 'project/getProjectList'
    })
  }
}
</script>
