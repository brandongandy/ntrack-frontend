<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="blue-grey" small dark v-on="on" class="mr-2">Change Goal</v-btn>
    </template>

    <v-card>
      <v-card-title>Change Goal</v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field box
                label="New Goal"
                v-model="goalAmount"
                v-if="dialog"
                autofocus
                mask="#########" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey" small dark flat @click="onReset">Cancel</v-btn>
        <v-btn color="green" small dark @click="dialog = false">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['goal'],
  data () {
    return {
      dialog: false,
      title: 'Set New Work Goal',
      addType: 0,
      newGoal: {},
      goalAmount: 0
    }
  },
  methods: {
    onShown () {
      this.newGoal = Object.assign({}, this.goal)
    },
    onSubmit (e) {
      e.preventDefault()

      this.postGoal(this.goalAmount)
    },
    onReset (e) {
      e.preventDefault()
      console.log(this.newGoal.goal_amount)
      this.dialog = false
    },
    postGoal (newAmount) {
      this.$axios.put('/goals/' + newAmount).then(
        res => {
          if (res.status >= 200 && res.status < 300) {
            this.newGoal = res.data
            this.closeModal(true)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    closeModal (success) {
      if (success) {
        this.$emit('update:amount', this.newGoal.amount)
      }
      this.$refs.modal.hide()
    }
  },
  created () {
  }
}
</script>
