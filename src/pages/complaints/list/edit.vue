<template>
<v-dialog v-model="dialog_display" persistent max-width="500px">
  <v-card>
    <v-card-title>
      <span class="headline">Chỉnh sửa khiếu nại</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-progress-linear v-if="loading === true" indeterminate></v-progress-linear>
          <v-flex xs12>
            <v-text-field label="Nội dụng khiếu nại" required v-model="content"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Ghi chú" required v-model="note"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select :items="category_select" v-model="category" label="Hình thức" item-text="category" item-value="value" class="input-group--focused"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Hủy bỏ</v-btn>
      <v-btn color="blue darken-1" flat @click="update_complaint()">Xác nhận</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
/* eslint-disable */
import { UPDATE_COMPLAINT } from '@/constants/endpoints'
import { CATEGORIES_COMPLAINTS } from '@/api/constant_select';

export default {
  data() {
    return {
      loading: false,
      dialog_display: false,
      category_select: CATEGORIES_COMPLAINTS,
      complaint_id: null,
      customer_id: null,
      content: '',
      category: null,
      note: '',
    }
  },
  methods: {
    open(complaint) {
      this.complaint_id = complaint.id
      this.customer_id = complaint.customer.id
      this.content = complaint.content
      this.category = complaint.method
      this.note = complaint.note
      this.dialog_display = true
    },
    async update_complaint() {
      if (this.common_data.navigation.getMethod === 0) {
        return
      }
      if (this.loading) return
      this.loading = true
      const data = {
        'id': this.complaint_id,
        'content': this.content,
        'method': this.category,
        'note': this.note,
        'customer': {'id': this.customer_id}
      }
      console.log('data', data)
      const response = await this.$services.do_request('put', UPDATE_COMPLAINT, data)
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
          type: 'error'
        })
      } else {
        this.$router.push('/500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
