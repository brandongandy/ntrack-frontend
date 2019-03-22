<template>
  <b-container class="col-sm-12 col-lg-6">
    <b-row>
      <b-col lg="6" class="text-left">
        <h3>{{ project }}</h3>
      </b-col>
      <b-col lg="6" class="text-right">
        <span>
          <b-button size="sm" variant="success">Edit</b-button>
          <b-button size="sm" variant="light">Archive</b-button>
        </span>
      </b-col>
    </b-row>

    <p class="text-muted mt-3">50,000 words before October 1, 2020</p>

    <hr>
    <b-row>
      <b-col cols="6" class="text-left">{{counter}} / {{max}}</b-col>
      <b-col cols="6" class="text-right">45% finished</b-col>
    </b-row>
    <b-row>
      <b-col><b-progress :value="counter" :max="max" /></b-col>
    </b-row>
    <b-row class="mt-1 text-right">
      <b-col>
        <b-button
          variant="success"
          size="sm"
          v-b-modal.update-goal>
          Update
        </b-button>
      </b-col>
    </b-row>

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

      <b-col><b-button variant="light" size="sm" @click="toggleBusy()">Toggle Busy Table</b-button></b-col>
    <update-goal ref="updateDialog" :project-id="project" />
  </b-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'

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
      isBusy: true
    }
  },
  components: {
    UpdateGoal
  },
  computed: {
    project () {
      return this.$route.params.id
    }
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
