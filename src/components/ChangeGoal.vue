<template>
  <b-modal
    id="work-goal"
    ref="modal"
    :title="title"
    hide-footer
    class="text-left"
    @shown="onShown">
    <b-form @submit="onSubmit" @reset="onReset" class="w200">
      <!-- <b-form-group
        id="goal-type"
        label="Goal Type:"
        label-for="goal-type-select">
        <b-form-select
          id="goal-type-input"
          v-model="goalTypeId"
          required disabled>
          <template slot="first">
            <option :value="0">{{ this.newGoal.goal_type }}</option>
          </template>
        </b-form-select>
      </b-form-group> -->

      <b-form-group
        id="update-amount"
        label="Goal Amount:"
        label-for="update-amount-input">
        <b-form-input
          id="update-amount-input"
          ref="amount"
          type="number"
          v-model="goalAmount"
          required
          placeholder="Project Goal">
        </b-form-input>
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
  props: ['goal'],
  data () {
    return {
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
      this.closeModal(false)
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
