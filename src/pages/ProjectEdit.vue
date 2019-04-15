<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex xs12 xl8>
        <v-card class="mt-4">
          <v-card-title>
            <v-container fluid class="primary white--text card-header elevation-1">
              <v-layout>
                <v-flex>
                  <span class="title">{{ title }}</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>

          <v-card-text>
            <v-form ref="projectForm"
              v-model="valid">
              <v-layout row wrap class="mx-2">
                <v-flex>
                  <v-text-field box
                    v-model="project.name"
                    :rules="nameRules"
                    label="Project Name"
                    required></v-text-field>
                  <v-select box
                    v-model="project.typeId"
                    :rules="typeRules"
                    :items="projectTypes"
                    label="Project Type"></v-select>
                  <v-select box
                    v-if="project.typeId === 1 || project.typeId === 2"
                    v-model="project.genreId"
                    :items="genreTypes"
                    item-text="description"
                    item-value="id"
                    label="Genre"></v-select>
                  <v-textarea box
                    v-model="project.blurb"
                    label="Blurb / Synopsis"></v-textarea>
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
                    label="Words Already Written"
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
                        label="Due Date"
                        prepend-inner-icon="event"
                        readonly
                        v-on="on">
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="project.dueDate"
                      @input="menu = false">
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onReset" small flat>Cancel</v-btn>
            <v-btn
              :disabled="!valid"
              color="success" small
              @click="onSubmit">Submit</v-btn>
          </v-card-actions>
        </v-card>
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
      genreTypes: [
        { value: 1, text: '' },
        { value: 2, text: 'Fantasy' },
        { value: 3, text: 'Science Fiction' },
        { value: 4, text: 'Literary Fiction' },
        { value: 5, text: 'Horror' }
      ],
      project: {
        id: null,
        name: '',
        typeId: null,
        genreId: null,
        blurb: '',
        goalTypeId: 1,
        goalAmount: 0,
        started: false,
        startAmount: 0,
        startDate: new Date().toISOString().substr(0, 10),
        dueDate: new Date().toISOString().substr(0, 10),
        lastUpdate: new Date().toISOString()
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
        'project_type_id': this.project.typeId,
        'blurb': this.project.blurb,
        'goal_type_id': this.project.goalTypeId,
        'goal_amount': this.project.goalAmount,
        'start_amount': this.project.startAmount,
        'due_date': this.project.dueDate,
        'start_date': this.project.startDate,
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
        this.$axios.post('/projects/' + payload.id, payload).then(
          res => {
            // do
          },
          err => {
            this.$alert.warning({ message: err })
          }
        )
      }
      this.$axios.put('/projects/', payload).then(
        res => {
          this.$router.push('/projects')
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  computed: {
    projectId () {
      return this.$route.params.id
    }
  },
  mounted () {
    if (this.projectId) {
      this.title = 'Editing project: '
      this.$axios.get('/projects/' + this.projectId).then(
        res => {
          this.project = res.data
          this.title += `${this.project.name}`
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this.title = 'Start New Project'
    }

    this.$axios.get('/projects/genres/all').then(
      res => {
        this.genreTypes = res.data
      },
      err => {
        console.log(err)
      }
    )
  }
}
</script>
