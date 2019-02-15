<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Chỉnh sửa khiếu nại</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Nội dụng xử lý" required v-model="content"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="actions"
                v-model="action_id"
                label="Hành động xử lý"
                item-text="name"
                item-value="id"
                class="input-group--focused"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Hủy bỏ</v-btn>
        <v-btn color="blue darken-1" flat @click.native="update_complaint()">Xác nhận</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import { COMPLAINTS_PROCESS_UPDATE, COMPLAINT_DETAIL } from '@/constants/endpoints';
import { STATUS_COMPLAINTS } from '@/api/constant_select';

export default {
  data () {
    return {
      dialog_display: false,
      category_select: STATUS_COMPLAINTS,
      loading: false,
      content: '',
      complaint_id: null,
      category: '',
      action_id: null,
      actions: []
    }
  },
  methods: {
    open (complaint) {
      this.complaint_id = complaint.id
      this.get_detail()
      this.dialog_display = true
    },
    async update_complaint () {
      if (this.loading) return
      this.loading = true
      const data = {
        'complaintId': this.complaint_id,
        'content': this.content,
        'actionId': this.action_id
      }
      const response = await this.$services.do_request('put', COMPLAINTS_PROCESS_UPDATE, data)
      this.loading = false

      if (response.data.message === "Success") {
        this.$notify({
          group: 'message',
          title: 'Thành công',
          text: 'Chỉnh sửa thành công',
          type: 'success'
        })
        this.$emit('edited_success')
        this.dialog_display = false
      } else if (response.status === 400) {
        this.$notify({
          group: 'message',
          title: 'Thất bại',
          text: 'Chỉnh sửa thất bại',
          type: 'success'
        })
      } else {
        this.$router.push('/500')
      }
    },
    async get_detail () {
      if (this.loading) return
      this.loading = true

      const url = COMPLAINT_DETAIL + `/${this.complaint_id}`
      const response = await this.$services.do_request('get', url)
      this.loading = false

      if (response.data.message === "Success") {
        this.actions = response.data.data.wfActions
        console.log('actions', this.actions)
      }  else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
