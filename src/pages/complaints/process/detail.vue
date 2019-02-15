<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Đơn khiếu nại #111 - user</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Người tạo đơn"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Người xử lý"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Người phản hồi"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Nội dung khiếu nại"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Nội dung xử lý"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Ghi chú"></v-text-field>
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

            <v-flex xs12 sm6>
              <v-select
                :items="status_select"
                v-model="status"
                label="Trạng thái"
                item-text="status"
                item-value="abbr"
                class="input-group--focused"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog_display = false">Hủy bỏ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import { CATEGORIES_COMPLAINTS, STATUS_COMPLAINTS } from '@/api/constant_select';
export default {
  data () {
    return {
      dialog_display: false,
      category_select: CATEGORIES_COMPLAINTS,
      status_select: STATUS_COMPLAINTS,
      category: '',
      status: ''
    }
  },
  methods: {
    open () {
      this.dialog_display = true
    }
  }
}
</script>

<style lang="css">
</style>
