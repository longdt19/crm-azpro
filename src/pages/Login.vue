<template>
  <v-app id="login" class="primary">
    <v-content>
    
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">CRM - AZ PRO</h1>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login()" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import { LOGIN_URL } from '@/constants/endpoints'

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    }
  }),

  methods: {
    async login () {
      if (this.loading) return
      this.loading = true;
      const data = {
        username: this.model.username,
        password: this.model.password
      }
      const response = await this.$services.do_request('post', LOGIN_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        const token = response.data.data.tokenState.jwt
        this.$store.commit('Common/tokenLoaded', token)
        const username = response.data.data.username
        this.$store.commit('Common/username', username)

        this.$router.push('/')
      } else if (response.data.code === 401) {
        this.$notify({
          group: 'message',
          title: 'Đăng nhập thất bại',
          text: 'Tài khoản đăng nhập không chính xác',
          type: 'error'
        })
      } else {
        this.$notify({
          group: 'message',
          title: 'Đăng nhập thất bại',
          text: 'Tài khoản đăng nhập không chính xác',
          type: 'error'
        })
      }
    },
  }
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
