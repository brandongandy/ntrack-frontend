<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 xl8>
        <project-summary v-if="project !== undefined" :project="project" :inList="false" />
      </v-flex>
      <v-flex xs12 class="mt-4">
        <v-card>
          <v-card-title>
            <v-container fluid class="primary white--text card-header elevation-1">
              <v-layout>
                <v-flex>
                  <span class="title">Project Info</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text class="mx-2">
            <p><span class="body-2">Author: </span>{{ this.$auth.user.name }}</p>
            <p><span class="body-2">Genre: </span></p>
            <p><span class="body-2">Blurb / Synopsis:</span> {{ project.blurb }}</p>
            <p><span class="body-2">Due Date: </span>{{ project.due_date }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <v-card>
          <v-card-title>
            <v-container fluid class="primary white--text card-header elevation-1">
              <v-layout>
                <v-flex>
                  <span class="title">Recent Activity</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="entries"
              :loading="!loaded"
              class="elevation-1">
              <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
              <template v-slot:no-data>
                <v-alert :value="true" color="accent" icon="warning">
                  Sorry, nothing to display here :(
                </v-alert>
              </template>
              <template v-slot:items="props">
                <td>{{ formatDate(new Date(props.item.work_date)) }}</td>
                <td>{{ props.item.added }}</td>
                <td>{{ props.item.removed }}</td>
                <td>{{ props.item.total }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-end>
      <v-flex shrink>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon
              v-on="on">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>Delete Project</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'
import ProjectSummary from '@/components/ProjectSummary'
import { format } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loaded: false,
      headers: [
        { text: 'Work Date', value: 'work_date' },
        { text: 'Added', value: 'added' },
        { text: 'Removed', value: 'removed' },
        { text: 'Total', value: 'total' }
      ],
      entries: [],
      isBusy: true
    }
  },
  components: {
    UpdateGoal,
    ProjectSummary
  },
  computed: {
    ...mapGetters({
      currentProject: 'project/getCurrentProject'
    }),
    projectId () {
      return this.$route.params.id
    },
    project: {
      get: function () {
        return this.currentProject
      },
      set: function (id) {
        this.setCurrentProject(id)
      }
    }
  },
  methods: {
    ...mapActions({
      setCurrentProject: 'project/setCurrentProject'
    }),
    onSubmit (e) {
      e.preventDefault()
    },
    updateGoal () {
      this.$refs.updateDialog.show()
    },
    deleteProject () {
      this.$axios.delete('/projects/' + this.projectId).then(
        res => {
          // this.$alert.show({ message: `Project ${this.project.name} has been successfully deleted.` })
          this.$router.push('/projects')
        },
        err => {
          console.log(err)
        }
      )
    },
    formatDate (date) {
      return format(date, 'YYYY-MM-DD')
    }
  },
  created () {
    this.project = this.projectId
    this.$axios.get('/projects/' + this.projectId + '/entries').then(
      res => {
        this.entries = res.data
        this.loaded = true
      },
      err => {
        this.$alert.warning({ message: err })
      }
    )
  }
}
</script>
