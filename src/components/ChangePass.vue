<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Đổi mật khẩu</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Mật khẩu cũ" required type="password" v-model="old_pass"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Mật khẩu mới" required type="password" v-model="new_pass1"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Nhập lại mật khẩu mới" required type="password" v-model="new_pass2"> type="password"</v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Hủy bỏ</v-btn>
        <v-btn color="blue darken-1" flat @click.native="change_pass()">Xác nhận</v-btn>
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
      old_pass: '',
      new_pass1: '',
      new_pass2: '',
      loading: false,
      dialog_display: false,
    }
  },
  methods: {
    async change_pass () {
      if (!this.password_can_change()) return

      if (this.loading) return
      this.loading = true

      const data = {
        'password': this.old_pass,
        'newPassword': this.new_pass1,
        'confirmPassword': this.new_pass2
      }

      const response = await this.$services.do_request('put', CHANGE_PASS_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.old_pass = ''
        this.new_pass1 = ''
        this.new_pass2 = ''
        this.$notify({
          group: 'message',
          title: 'Thành công',
          text: 'Đổi mật khẩu thành công',
          type: 'success'
        })
        this.dialog_display = false
      } else if (response.status === 400) {
        this.$notify({
          group: 'message',
          title: 'Thất bại',
          text: 'Đổi mật không khẩu thành công',
          type: 'error'
        })
      } else {
        this.$router.push('/e-500')
      }
    },
    password_can_change () {
      if (this.new_pass1 === '' || this.new_pass2 === '' || this.old_pass === '') {
        this.$notify({
          group: 'message',
          title: 'Thất bại',
          text: 'Mật khẩu không được để trống',
          type: 'error'
        })
        return false
      }

      if (this.new_pass1 !== this.new_pass2) {
        this.$notify({
          group: 'message',
          title: 'Thất bại',
          text: 'Mật khẩu không trùng khớp',
          type: 'error'
        })
        return false
      }

      if (this.old_pass.length < 6 || this.new_pass1.length < 6 || this.new_pass2.length < 6) {
        this.$notify({
          group: 'message',
          title: 'Thất bại',
          text: 'Mật khẩu phải lớn hơn 6 ký tự',
          type: 'error'
        })
        return false
      }

      return true
    },
    open () {
      this.dialog_display = true
      this.category = 'phone'
    }
  }
}
</script>

<style lang="css">
</style>
