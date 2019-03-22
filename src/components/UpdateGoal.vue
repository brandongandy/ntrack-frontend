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
          v-model="initialProject"
          required :disabled="loading">
          <template slot="first">
            <option :value="null">Pick a project</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group
        id="update-amount"
        label="Goal Amount:"
        label-for="update-amount-input">
        <b-form-input
          id="update-amount-input"
          ref="amount"
          type="number"
          v-model="amount"
          required
          placeholder="Project Goal">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="goal-update-type"
        label="Action:"
        label-for="goal-update-type-select">
        <b-form-select
          id="goal-update-type-select"
          v-model="addType"
          required>
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
  props: ['projectId'],
  data () {
    return {
      title: 'Add Words',
      amount: 0,
      addType: 0,
      loading: true,
      initialProject: this.projectId,
      projects: []
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
    },
    onReset (e) {
      e.preventDefault()
      console.log(this.projects)
      let projList = this.projects.map(project => {
        var res = {}
        res[project.id] = project.name
        return res
      })
      console.log(projList)
    },
    onShow () {
      if (this.initialProject === null ||
          this.initialProject === undefined) {
        this.$axios.get('/projects/all').then(
          res => {
            this.projects = res.data
            this.loading = false
          },
          err => {
            console.log(err)
          }
        )
      } else {
        this.loading = false
      }
    }
  },
  computed: {
    projectList: {
      get () {
        let projList = this.projects.map(project => {
          var res = {}
          res[project.id] = project.name
          return res
        })
        console.log(projList)
        return 0
      }
    }
  },
  mounted () {
  }
}
</script>
