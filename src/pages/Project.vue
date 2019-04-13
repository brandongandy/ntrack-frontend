<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg6>
        <project-summary v-if='project !== undefined' :project='project' :inList='false' />
      </v-flex>
      <v-flex xs12 lg6 class='mt-4'>
        <v-card>
          <v-card-title>
            <v-container fluid class='primary white--text card-header elevation-1'>
              <v-layout>
                <v-flex>
                  <span class='title'>Project Info</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text class='mx-2'>
            <p><span class='body-2'>Author: </span>{{ this.$auth.user.name }}</p>
            <p><span class='body-2'>Genre: </span></p>
            <p><span class='body-2'>Blurb / Synopsis:</span> {{ project.blurb }}</p>
            <p><span class='body-2'>Due Date: </span>{{ project.due_date }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 class='mt-4'>
        <v-card>
          <v-card-title>
            <v-container fluid class='primary white--text card-header elevation-1'>
              <v-layout>
                <v-flex>
                  <span class='title'>Recent Activity</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text class="mx-2">
            <v-layout row wrap justify-center>
              <v-flex lg8>
                <v-sheet>
                  <v-sparkline v-if="loaded"
                    :value="progressWords"
                    color="orange"
                    line-width="2"
                    smooth="2"
                    stroke-linecap="round"
                    padding="8"
                    auto-draw></v-sparkline>
                </v-sheet>
              </v-flex>
            </v-layout>
            <v-data-table
              :headers='headers'
              :items='entries'
              :loading='!loaded'
              class='elevation-1 mr-2'>
              <v-progress-linear v-slot:progress color='primary' indeterminate></v-progress-linear>
              <template v-slot:no-data>
                <v-alert :value='true' color='accent' icon='warning'>
                  Sorry, nothing to display here :(
                </v-alert>
              </template>
              <template v-slot:items='props'>
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
          <template v-slot:activator='{ on }'>
            <v-btn icon
              v-on='on'>
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
      progress: [
        { 'date': '2019-03-01', 'word_count': '0', 'goal_amount': '645' },
        { 'date': '2019-03-02', 'word_count': '0', 'goal_amount': '1290' },
        { 'date': '2019-03-03', 'word_count': '0', 'goal_amount': '1935' },
        { 'date': '2019-03-04', 'word_count': '0', 'goal_amount': '2580' },
        { 'date': '2019-03-05', 'word_count': '0', 'goal_amount': '3225' },
        { 'date': '2019-03-06', 'word_count': '0', 'goal_amount': '3870' },
        { 'date': '2019-03-07', 'word_count': '0', 'goal_amount': '4515' },
        { 'date': '2019-03-08', 'word_count': '0', 'goal_amount': '5160' },
        { 'date': '2019-03-09', 'word_count': '0', 'goal_amount': '5805' },
        { 'date': '2019-03-10', 'word_count': '0', 'goal_amount': '6450' },
        { 'date': '2019-03-11', 'word_count': '0', 'goal_amount': '7095' },
        { 'date': '2019-03-12', 'word_count': '0', 'goal_amount': '7740' },
        { 'date': '2019-03-13', 'word_count': '0', 'goal_amount': '8385' },
        { 'date': '2019-03-14', 'word_count': '0', 'goal_amount': '9030' },
        { 'date': '2019-03-15', 'word_count': '0', 'goal_amount': '9675' },
        { 'date': '2019-03-16', 'word_count': '0', 'goal_amount': '10320' },
        { 'date': '2019-03-17', 'word_count': '0', 'goal_amount': '10965' },
        { 'date': '2019-03-18', 'word_count': '0', 'goal_amount': '11610' },
        { 'date': '2019-03-19', 'word_count': '0', 'goal_amount': '12255' },
        { 'date': '2019-03-20', 'word_count': '0', 'goal_amount': '12900' },
        { 'date': '2019-03-21', 'word_count': '0', 'goal_amount': '13545' },
        { 'date': '2019-03-22', 'word_count': '0', 'goal_amount': '14190' },
        { 'date': '2019-03-23', 'word_count': '0', 'goal_amount': '14835' },
        { 'date': '2019-03-24', 'word_count': '0', 'goal_amount': '15480' },
        { 'date': '2019-03-25', 'word_count': '0', 'goal_amount': '16125' },
        { 'date': '2019-03-26', 'word_count': '0', 'goal_amount': '16770' },
        { 'date': '2019-03-27', 'word_count': '0', 'goal_amount': '17415' },
        { 'date': '2019-03-28', 'word_count': '1400', 'goal_amount': '18060' },
        { 'date': '2019-03-29', 'word_count': '1600', 'goal_amount': '18705' },
        { 'date': '2019-03-30', 'word_count': '1600', 'goal_amount': '19350' },
        { 'date': '2019-03-31', 'word_count': '2323', 'goal_amount': '19995' }
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
    },
    progressDates () {
      let dates = this.progress.map(function (d) {
        return d.date
      })
      console.log(dates)
      return dates
    },
    progressWords () {
      let words = this.progress.map(function (d) {
        return parseInt(d.word_count)
      })
      return words
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
        console.log(err)
        this.loaded = true
      }
    )
  }
}
</script>
