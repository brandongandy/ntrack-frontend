<template>
  <b-modal
    id="update-goal"
    ref="modal"
    :title="title"
    hide-footer
    class="text-left"
    @shown="onShow">
    <b-form @submit="onSubmit" @reset="onReset" class="w200">
      <b-form-group
        id="project-goal-type"
        label="Project:"
        label-for="project-select">
        <b-form-select
          id="project-select-input"
          v-model="projectId"
          :options="projectList"
          required :disabled="!canChangeProject">
          <template slot="first">
            <option :value="undefined" disabled>-- Pick a project --</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group
        id="update-amount"
        label="Amount:"
        label-for="update-amount-input">
        <b-form-input
          id="update-amount-input"
          ref="amount"
          type="number"
          v-model="amount"
          required
          placeholder="Amount to Add">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="goal-update-type"
        label="Action:"
        label-for="goal-update-type-select">
        <b-form-select
          id="goal-update-type-select"
          v-model="addType"
          required disabled>
            <option :value="null">-- Choose Update Type --</option>
            <option :value="0">Add to Total</option>
            <option :value="1">Update Total</option>
        </b-form-select>
      </b-form-group>

      <b-row class="text-right">
        <b-col>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="warning">Cancel</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: ['project'],
  data () {
    return {
      title: 'Add Words',
      amount: 0,
      addType: 0,
      canChangeProject: false,
      projectId: this.projectId,
      projectList: []
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      let payload = [{
        'user_id': this.$auth.userId,
        'project_id': this.projectId,
        'amount': this.amount,
        'add_type': this.addType,
        'work_date': new Date().toISOString()
      }]
      this.postWork(payload)
    },
    onReset (e) {
      e.preventDefault()
    },
    onShow () {
      if (!this.projectId) {
        this.$axios.get('/projects/all').then(
          res => {
            let projects = res.data

            let projList = projects.map(project => {
              return {
                value: project.id,
                text: project.name
              }
            })
            this.projectList = projList

            this.canChangeProject = true
          },
          err => {
            console.log(err)
          }
        )
      } else {
        this.canChangeProject = false
      }
    },
    postWork (payload) {
      this.$axios.post('/entries').then(
        res => {

        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>
