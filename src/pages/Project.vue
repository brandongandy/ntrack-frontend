<template>
  <b-container class="col-sm-12 col-lg-6">
    <project-summary :project="project" :inList="false" />

    <b-row class="mt-3 mb-3">
      <b-col class="text-left"><h4>Work History</h4></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table :items="entries" :busy="isBusy">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </b-table>
      </b-col>
    </b-row>

    <b-col>
      <b-button variant="light" size="sm" @click="toggleBusy()">Toggle Busy Table</b-button>
      <b-button size="sm" variant="light">Archive Project</b-button>
    </b-col>
    <update-goal ref="updateDialog" :project-id="project" />
  </b-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'
import ProjectSummary from '@/components/ProjectSummary'

export default {
  data () {
    return {
      counter: 22500,
      max: 50000,
      entries:
      [
        { date: '2019-03-01', added: 234, removed: 0, total: 234 },
        { date: '2019-03-02', added: 654, removed: -123, total: 531 },
        { date: '2019-03-03', added: 268, removed: -10, total: 258 },
        { date: '2019-03-04', added: 1765, removed: -243, total: 1522 }
      ],
      isBusy: true,
      project: {
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
      }
    }
  },
  components: {
    UpdateGoal,
    ProjectSummary
  },
  computed: {
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
    },
    updateGoal () {
      this.$refs.updateDialog.show()
    },
    toggleBusy () {
      this.isBusy = !this.isBusy
    }
  }
}
</script>
