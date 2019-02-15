<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Xử lý khiếu nại</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Nội dụng xử lý khiếu nại"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="status_select"
                v-model="status"
                label="Trạng thái"
                item-text="status"
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
        <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Xác nhận</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import { STATUS_COMPLAINTS } from '@/api/constant_select';

export default {
  data () {
    return {
      dialog_display: false,
      content: '',
      status: '',
      note: '',
      status_select: STATUS_COMPLAINTS,
    }
  },
  methods: {
    open () {
      this.dialog_display = true
      this.category = 'phone'
    }
  }
}
</script>

<style lang="css">
</style>
