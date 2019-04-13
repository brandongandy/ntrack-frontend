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
              <v-form v-model="valid">
                <v-text-field box
                  label="New Goal"
                  v-model="goalAmount"
                  :rules="amountRules"
                  v-if="dialog"
                  autofocus
                  type="number"
                  required></v-text-field>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" small flat @click="onReset">Cancel</v-btn>
        <v-btn
          :disabled="!valid"
          color="primary" small
          @click="onSubmit">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['goal'],
  data () {
    return {
      valid: true,
      dialog: false,
      title: 'Set New Work Goal',
      addType: 0,
      newGoal: {},
      goalAmount: 0,
      amountRules: [
        amount => !!amount || 'Amount is not a valid number',
        amount => (!Number.isInteger(amount)) || 'Amount is not a valid number'
      ]
    }
  },
  methods: {
    ...mapActions({
      getGoal: 'entry/getGoal'
    }),
    onShown () {
      this.newGoal = Object.assign({}, this.goal)
    },
    onSubmit (e) {
      e.preventDefault()

      this.postGoal(this.goalAmount)
    },
    onReset (e) {
      e.preventDefault()

      this.goalAmount = 0

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
      this.getGoal()
      this.dialog = false
    }
  },
  created () {
  }
}
</script>
