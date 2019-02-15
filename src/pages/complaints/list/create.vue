use<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Tạo mới khiếu nại</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-progress-linear v-if="loading === true" indeterminate></v-progress-linear>
          <v-layout wrap v-else>
            <v-progress-linear v-if="loading_create === true" indeterminate></v-progress-linear>
            <v-flex xs12>
              <v-text-field label="Tên khách hàng" required v-model="customer"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Nội dụng khiếu nại" required v-model="content"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Ghi chú" required v-model="note"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="category_select"
                v-model="category"
                label="Hình thức"
                item-text="category"
                item-value="value"
                class="input-group--focused"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Hủy bỏ</v-btn>
        <v-btn color="blue darken-1" flat @click.native="create_complaint()">Xác nhận</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import { COMPLAINT_CREATE } from '@/constants/endpoints';
import { CATEGORIES_COMPLAINTS } from '@/api/constant_select';

export default {
  data () {
    return {
      dialog_display: false,
      content: '',
      category: '',
      note: '',
      customer: '',
      category_select: CATEGORIES_COMPLAINTS,
      loading: false,
      loading_create: false
    }
  },
  methods: {
    open () {
      this.dialog_display = true
      // this.get_customer_list()
    },
    async create_complaint () {
      if (this.loading_create) return
      this.loading_create = true

      const data = {
        'customer': this.customer,
        'content': this.content,
        'method': this.category,
        'note': this.note
      }
      const response = await this.$services.do_request('post', COMPLAINT_CREATE, data)
      this.loading_create = false

      if (response.data.message === "Success") {
        this.$notify({
          group: 'message',
          title: 'Thành công',
          text: 'Tạo mới đơn khiếu nại thành công',
          type: 'success'
        })
        this.$emit('created_success')
        this.dialog_display = false
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
