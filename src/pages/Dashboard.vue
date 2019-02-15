<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-flex lg12>
        <v-card>
          <v-toolbar card color="white">
            <v-text-field
            flat
            solo
            prepend-icon="search"
            placeholder="Type something"
            v-model="search"
            hide-details
            class="hidden-sm-and-down"
            ></v-text-field>
            <v-btn icon>
              <v-icon>filter_list</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :loading="loading"
              :headers="complex.headers"
              :search="search"
              :items="complex.items"
              :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
              class="elevation-1"
              item-key="name"
              v-model="complex.selected"
              >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.id}}</td>
                <td>{{ props.item.customer.azAccount}}</td>
                <td>{{ props.item.content }}</td>
                <td>{{ props.item.method }}</td>
                <td>{{ props.item.creator }}</td>
                <!-- <td>{{ props.item.ad_doit }}</td>
                <td>{{ props.item.content_handling }}</td>
                <td>{{ props.item.ad_report }}</td> -->
                <td>{{ props.item.note }}</td>
                <!-- <td>
                  <v-btn depressed outline icon fab dark color="primary" small>
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn depressed outline icon fab dark color="pink" small>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td> -->
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
import { COMPLAINTS_LIST } from '@/constants/endpoints';

export default {
  data () {
    return {
      search: '',
      complex: {
        selected: [],
        headers: [
          {
            text: 'ID',
            value: 'stt'
          },
          {
            text: 'Tên đăng nhập khiếu nại',
            value: 'complaintor'
          },
          {
            text: 'Nỗi dung khiếu nại',
            value: 'report_content'
          },
          {
            text: 'Hình thức',
            value: 'category'
          },
          {
            text: 'Admin tạo đơn',
            value: 'ad_create'
          },
          {
            text: 'Ghi chú',
            value: 'note'
          },
        ],
        items: []
      },
      loading: false,
      pagination: {
        page: 0,
        size: 10
      }
    };
  },
  methods: {
    async get_complaints_list () {
      if (this.loading) return
      this.loading = true
      const data = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'search': {}
      }
      const response = await this.$services.do_request('get', COMPLAINTS_LIST, data)
      this.loading = false
      console.log('respone', response)
      if (response.data.message === "Success") {
        this.complex.items = response.data.data.content
        console.log('items', this.complex.items)
      }  else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/500')
      }
    }
  },
  created () {
    this.get_complaints_list()
  }
};
</script>
