<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 class="mt-4">
        <v-card class="card-body">
          <v-card-title>
            <v-container fluid class="primary white--text card-header elevation-1">
              <v-layout>
                <v-flex>
                  <span class="title">Account Info</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap class="mx-2">
                <v-flex xs12>
                  <p><span class="title">Personal Info</span></p>
                </v-flex>
                <v-flex>
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
                <v-flex xs12>
                  <p><span class="title">Location</span></p>
                </v-flex>
                <v-flex>
                  <v-select box
                    label="Country">
                  </v-select>
                  <v-select box
                    label="Time Zone">
                  </v-select>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="secondary" small dark flat>Cancel</v-btn> -->
            <v-btn color="primary" small dark>Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 class="mt-4">
        <v-card class="card-body">
          <v-card-title>
            <v-container fluid class="primary white--text card-header elevation-1">
              <v-layout>
                <v-flex>
                  <span class="title">Privacy Settings</span><br />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-layout row wrap class="mx-2">
                <v-flex>
                  <span class="title">Public Information</span>
                  <v-switch
                    label="Make my account public (name and about me)">
                  </v-switch>
                  <!-- <v-switch
                    label="Let others send me messages through Quill Driver">
                  </v-switch> -->
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="secondary" small dark flat>Cancel</v-btn> -->
            <v-btn color="primary" small dark>Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {}
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

.rounded {
  border-radius: 100px;
}
</style>
