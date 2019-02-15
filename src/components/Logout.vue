<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Thoát</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <p>Xác nhận thoát</p>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Hủy bỏ</v-btn>
        <v-btn color="blue darken-1" flat @click.native="logout()">Xác nhận</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import { CHANGE_PASS_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      dialog_display: false,
    }
  },
  methods: {
    open () {
      this.dialog_display = true
    },
    logout () {
      this.$store.commit('Common/restore')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css">
</style>
