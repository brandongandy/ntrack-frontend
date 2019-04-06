<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg8 xl6>
        <v-card class="mt-4">
          <v-card-title>
            <v-container class="primary white--text card-header elevation-1">
              <v-layout align-center>
                <v-flex>
                  <span class="title">My Active Projects</span><v-spacer></v-spacer>
                </v-flex>
                <v-flex shrink class="pa-0">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon small depressed class="ma-0"
                        color="accent"
                        v-on="on"
                        to="/project/new">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </template>
                    <span>Add New Project</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>

          <v-card-text>
            <v-flex xs8></v-flex>
            <v-layout row wrap>
              <v-flex xs12 v-for="project in projectList" :key="project.id">
                <project-summary :project="project" :inList="true" />
              </v-flex>
            </v-layout>
          </v-card-text>
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
