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
      <b-button size="sm" variant="light">Archive Project</b-button>
      <b-button size="sm" variant="light" v-b-modal.deleteModal>Delete Project</b-button>
    </b-col>
    <update-goal ref="updateDialog" :project="project" />
    <b-modal
      id="deleteModal"
      ref="deleteModal"
      centered
      title="Do you really want to delete this project?"
      class="text-left"
      @ok="deleteProject">
      <p> This cannot be undone. All word count entries associated with this project will also be deleted.</p>
    </b-modal>
  </b-container>
</template>

<script>
import UpdateGoal from '../components/UpdateGoal'
import ProjectSummary from '@/components/ProjectSummary'

export default {
  data () {
    return {
      entries:
      [
        { date: '2019-03-01', added: 234, removed: 0, total: 234 },
        { date: '2019-03-02', added: 654, removed: -123, total: 531 },
        { date: '2019-03-03', added: 268, removed: -10, total: 258 },
        { date: '2019-03-04', added: 1765, removed: -243, total: 1522 }
      ],
      isBusy: true,
      project: {}
    }
  },
  components: {
    UpdateGoal,
    ProjectSummary
  },
  computed: {
    projectId () {
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
    deleteProject () {
      this.$axios.delete('/projects/' + this.projectId).then(
        res => {
          this.$alert.show({ message: `Project ${this.project.name} has been successfully deleted.` })
          this.$router.push('/projects')
        },
        err => {
          this.$alert.warning({ message: err })
        }
      )
    }
  },
  created () {
    this.$axios.get('/projects/' + this.projectId).then(
      res => {
        this.project = res.data
      },
      err => {
        this.$alert.warning({ message: err })
      }
    )

    this.$axios.get('/projects/' + this.projectId + '/entries').then(
      res => {
        this.entries = res.data
        this.isBusy = false
      },
      err => {
        this.$alert.warning({ message: err })
      }
    )
  }
}
</script>
