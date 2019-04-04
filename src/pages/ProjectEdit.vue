<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="headline">{{ title }}</h2>
      </v-flex>
      <v-flex xs12 sm8>
        <v-form ref="projectForm"
          v-model="valid">
          <v-text-field box
            v-model="project.name"
            :rules="nameRules"
            label="Project Name"
            required></v-text-field>
            <v-select box
              v-model="project.type"
              :rules="typeRules"
              :items="projectTypes"
              label="Project Type"></v-select>
          <v-textarea box
            v-model="project.blurb"
            label="Blurb"></v-textarea>
          <v-text-field box
            v-model="project.goalAmount"
            label="Project Goal"
            mask="#########"
            required></v-text-field>
          <v-checkbox
            color="primary"
            v-model="project.started"
            label="Already started?"></v-checkbox>
          <v-text-field box :disabled="!project.started"
            v-model="project.startAmount"
            label="Start Amount"
            mask="#########"></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field box
                v-model="project.dueDate"
                label="Picker without buttons"
                prepend-inner-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="project.dueDate" @input="menu = false"></v-date-picker>
          </v-menu>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="onSubmit">Submit</v-btn>
          <v-btn @click="onReset" flat >Cancel</v-btn>
        </v-form>
      </v-flex>
      <v-flex xs12 sm6>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      menu: '',
      title: '',
      projectTypes: [
        { value: 1, text: 'Novel' },
        { value: 2, text: 'Short Story / Other' },
        { value: 3, text: 'Article / Essay' }
      ],
      project: {
        id: null,
        name: '',
        type: 1,
        blurb: '',
        goalTypeId: 1,
        goalAmount: 0,
        started: false,
        startAmount: 0,
        startDate: new Date().toISOString().substr(0, 10),
        dueDate: new Date().toISOString().substr(0, 10),
        lastUpdate: new Date().toISOString().substr(0, 10)
      },
      nameRules: [
        v => !!v || 'Project name cannot be blank'
      ],
      typeRules: [
        v => !!v || 'Project type is required'
      ]
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      // this.$refs.projectForm.validate()

      let project = {
        'user_id': this.$auth.userId,
        'name': this.project.name,
        'project_type_id': this.project.type,
        'blurb': this.project.blurb,
        'goal_type_id': this.project.goalTypeId,
        'goal_amount': this.project.goalAmount,
        'start_amount': this.project.startAmount,
        'start_date': this.project.startDate,
        'due_date': this.project.dueDate,
        'last_update': this.project.lastUpdate,
        'is_finished': false
      }

      this.postProject(project)
    },
    onReset (e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    postProject (payload) {
      if (this.projectId) {
        payload.push({ 'id': this.projectId })
        this.$axios.put('/projects/' + payload.id, payload).then(
          res => {
            // do
          },
          err => {
            this.$alert.warning({ message: err })
          }
        )
      }
      this.$axios.post('/projects', payload).then(
        res => {
          this.$alert.success({ message: 'Project added!' })
          this.$router.push('/projects')
        },
        err => {
          this.$alert.warning({ message: err })
        }
      )
    }
  },
  computed: {
    projectId () {
      return this.$route.params.id
    }
  },
  created () {
    if (this.projectId) {
      this.title = 'Editing project: '
      this.$axios.get('/projects/' + this.projectId).then(
        res => {
          this.project = res.data
          this.title += `${this.project.name}`
        },
        err => {
          this.$alert.warning({ message: err })
        }
      )
    } else {
      this.title = 'Start New Project'
    }
  }
}
</script>
