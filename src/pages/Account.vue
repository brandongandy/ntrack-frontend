<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex>
        <v-card class="card-body">
          <v-card-title>
            <v-container class="green darken-1 white--text card-header elevation-1">
              <v-layout>
                <v-flex>
                  <span class="title">My Account</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap class="mx-2">
                <v-flex xs6>
                  <v-flex xs12 sm6>
                  <v-spacer></v-spacer>
                      <v-img
                        src="https://randomuser.me/api/portraits/lego/1.jpg">
                      </v-img>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn small dark flat color="blue-grey">Update Photo</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-flex>
                </v-flex>
                <v-flex xs6>
                  <v-flex>
                    <v-text-field box
                      label="First Name">
                    </v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field box
                      label="Last Name">
                    </v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field box
                      label="Email Address">
                    </v-text-field>
                  </v-flex>
                </v-flex>
                <v-flex xs12>
                  <v-textarea box
                    label="About Me">
                  </v-textarea>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {

  }
}
</script>

<style>
.header-img {
  width: 50px;
  border-radius: 25px;
  margin: 0;
  padding: 0;
}
.card-header {
  margin: -35px 10px 0px 10px;
  display: block;
  border-radius: 5px;
}
</style>
