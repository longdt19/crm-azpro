<template>
  <v-dialog v-model="dialog_display" :max-width="dialog_width">
    <v-card>
      <v-card-title>
        <span class="headline">Thông tin chi tiết đơn khiếu nại</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        <v-container grid-list-md>
          <v-layout wrap>

            <v-flex xs12 md4>
              <v-text-field label="Người tạo đơn"
                v-model="complaint.creator"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <v-select
                :items="category_select"
                v-model="complaint.method"
                label="Hình thức"
                item-text="category"
                item-value="value"
                class="input-group--focused"
              ></v-select>
            </v-flex>

            <v-flex xs12 md4>
              <v-select
                :items="status_select"
                v-model="complaint.status"
                label="Trạng thái"
                item-text="status"
                item-value="value"
                class="input-group--focused"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field textarea label="Nội dung khiếu nại" v-model="complaint.content"></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field textarea label="Ghi chú" v-model="complaint.note"></v-text-field>
            </v-flex>

          </v-layout>
          <v-data-table
            :loading="loading"
            :headers="table_view_history.headers"
            :items="table_view_history.items"
            class="elevation-1"
            item-key="name"
          >
          <template slot="items" slot-scope="props">
            <td style="text-align: center">{{ formatDate(props.item.created)}}</td>
            <td style="text-align: center">{{ props.item.creator }}</td>
            <td style="text-align: center">{{ props.item.content }}</td>
            <td style="text-align: center">
              <v-chip :color="reverseStatus(props.item.oldStatus)['color']">
                {{ reverseStatus(props.item.oldStatus)['status'] }}
              </v-chip>
            </td>
            <td style="text-align: center">
              <v-chip :color="reverseStatus(props.item.newStatus)['color']">
                {{ reverseStatus(props.item.newStatus)['status'] }}
              </v-chip>
            </td>
          </template>
        </v-data-table>
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
import { COMPLAINT_DETAIL } from '@/constants/endpoints';
import { CATEGORIES_COMPLAINTS, STATUS_COMPLAINTS } from '@/api/constant_select';
import formatDate from '@/util/formatDate'
import reverseStatus from '@/util/reverseStatus'
import reverseMethod from '@/util/reverseMethod'

export default {
  data () {
    return {
      dialog_width: '70%',
      dialog_display: false,
      category_select: CATEGORIES_COMPLAINTS,
      status_select: STATUS_COMPLAINTS,
      loading: false,
      complaint_id: null,
      complaint: {},
      status: 2,
      table_view_history: {
        headers: [
          {
            text: 'Ngày xử lý',
            value: 'created',
            sortable: false,
            align: 'center'
          },
          {
            text: 'Người xử lý',
            value: 'creator',
            sortable: false,
            align: 'center'
          },
          {
            text: 'Nội dung xử lý',
            value: 'content',
            sortable: false,
            align: 'center'
          },
          {
            text: 'Trạng thái trước',
            value: 'oldStatus',
            sortable: false,
            align: 'center'
          },
          {
            text: 'Trạng thái mới',
            value: 'newStatus',
            sortable: false,
            align: 'center'
          }
        ],
        items: []
      },
      pagination: {
        page: 0,
        size: 3,
        list: [10, 20, 30]
      }
    }
  },
  methods: {
    formatDate,
    reverseStatus,
    reverseMethod,
    open (complaint_id) {
      this.complaint_id = complaint_id
      this.dialog_display = true
      this.get_detail()
    },
    async get_detail () {
      if (this.loading) return
      this.loading = true

      const url = COMPLAINT_DETAIL + `/${this.complaint_id}`
      const response = await this.$services.do_request('get', url)
      this.loading = false

      if (response.data.message === "Success") {
        this.complaint = response.data.data
        this.table_view_history.items = this.complaint.complaintProcesses
        // console.log('table_view_history', table_view_history)
        // console.log('status', this.complaint.status)
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
