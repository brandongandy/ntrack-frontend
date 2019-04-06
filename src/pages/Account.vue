<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs12 xl6>
        <v-card class="card-body">
          <v-card-title>
            <v-container class="primary white--text card-header elevation-1">
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
                <v-flex xs6>
                  <v-flex xs12 sm8 offset-sm2>
                    <v-img class="elevation-1 rounded"
                      src="https://randomuser.me/api/portraits/lego/1.jpg">
                    </v-img>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn small dark flat color="blue-grey">Update Photo</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-flex>
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
                  <p><span class="title">Author Info</span></p>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select box
                    :items="userTypes"
                    label="I am a(n):">
                  </v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select box  multiple
                    persistent-hint
                    :items="genres"
                    label="I write:">
                  </v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea box
                    label="About Me">
                  </v-textarea>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions class="mr-4">
            <v-spacer></v-spacer>
            <!-- <v-btn color="secondary" small dark flat>Cancel</v-btn> -->
            <v-btn color="primary" small dark>Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 xl6>
        <v-card class="card-body">
          <v-card-title>
            <v-container class="primary white--text card-header elevation-1">
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
                    label="Share my personal info (first name and last name only)">
                  </v-switch>
                  <v-switch
                    label="Share my author info (status, genres, about me)">
                  </v-switch>
                  <v-switch
                    label="Let others send me messages through Inscripient">
                  </v-switch>
                  <v-switch
                    label="Share my photo">
                  </v-switch>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>

          <v-card-actions class="mr-4">
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
    return {
      userTypes: [
        { value: 0, text: 'Author' }
      ],
      genres: [
        { value: 0, text: 'Literary Fiction' },
        { value: 1, text: 'Fantasy' },
        { value: 2, text: 'Science Fiction' },
        { value: 3, text: 'Westerns' }
      ]
    }
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

.rounded {
  border-radius: 100px;
}

.card-header {
  margin: -35px 10px 0px 10px;
  display: block;
  border-radius: 5px;
}
</style>
