<template>
  <div id="pageDashboard">

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12>

          <search-component @search_list="search_list"/>

        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl fluid>
      <v-flex lg12>
        <v-card>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :loading="loading"
              :headers="complex.headers"
              :items="complex.items"
              class="elevation-1"
              item-key="name"
              v-model="complex.selected"
              :total-items="pagination.total_items"
              :pagination.sync="pagination_changed"
            >
              <template slot="items" slot-scope="props">

                <td style="text-align: center">{{ props.item.id}}</td>
                <td style="text-align: center">{{ props.item.customer}}</td>
                <td style="text-align: center">{{ props.item.content }}</td>
                <td style="text-align: center">{{ props.item.processContent }}</td>
                <td style="text-align: center">
                  <v-chip :color="reverseMethod(props.item.method)['color']">
                    {{ reverseMethod(props.item.method)['category'] }}
                  </v-chip>
                </td>
                <td style="text-align: center">{{ props.item.creator }}</td>
                <td style="text-align: center">
                  <v-chip :color="reverseStatus(props.item.status)['color']">
                    {{ reverseStatus(props.item.status)['status'] }}
                  </v-chip>
                </td>
                <td style="text-align: center">{{ props.item.note }}</td>
                <td style="text-align: center">
                  <v-btn depressed outline icon fab dark color="light-green " small
                    @click="open_edit(props.item)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
    <edit-component ref="edit" @edited_success="edited_success"/>
    <detail-component ref="detail" />
    <delete-component ref="delete" />
    <create-component ref="create" />
  </div>
</template>

<script>
/* eslint-disable */
import VWidget from '@/components/VWidget';
import { COMPLAINTS_PROCESS_LIST } from '@/constants/endpoints';
import { CATEGORIES_COMPLAINTS, STATUS_COMPLAINTS } from '@/api/constant_select';

import reverseStatus from '@/util/reverseStatus'
import reverseMethod from '@/util/reverseMethod'

import EditComponent from './edit'
import DetailComponent from './detail'
import DeleteComponent from './delete'
import SearchComponent from './search'
import CreateComponent from './create'

export default {
  components: {
    VWidget,
    EditComponent,
    DetailComponent,
    DeleteComponent,
    SearchComponent,
    CreateComponent
  },
  data () {
    return {
      category_select: CATEGORIES_COMPLAINTS,
      status_select: STATUS_COMPLAINTS,
      complex: {
        selected: [],
        headers: [
          {
            text: 'Mã khiếu nại',
            value: 'id',
            align: 'center',
            sortable: false
          },
          {
            text: 'Tên đăng nhập khiếu nại',
            value: 'complaintor',
            align: 'center',
            sortable: false
          },
          {
            text: 'Nội dung khiếu nại',
            value: 'report_content',
            align: 'center',
            sortable: false
          },
          {
            text: 'Nội dung xử lý',
            value: 'processContent',
            align: 'center',
            sortable: false
          },
          {
            text: 'Hình thức',
            value: 'category',
            align: 'center',
            sortable: false
          },
          {
            text: 'Admin tạo đơn',
            value: 'ad_create',
            align: 'center',
            sortable: false
          },
          {
            text: 'Trạng thái',
            value: 'status',
            align: 'center',
            sortable: false
          },
          {
            text: 'Ghi chú',
            value: 'note',
            align: 'center',
            sortable: false
          },
          {
            text: 'Thao tác',
            value: '',
            align: 'center',
            sortable: false
          },
        ],
        items: []
      },
      loading: false,
      pagination: {
        page: 0,
        size: 10
      },
      search: {},
      pagination_changed: {}
    };
  },
  watch: {
    'pagination_changed' (val) {
      this.pagination.page = val.page - 1
      this.pagination.size = val.rowsPerPage
      this.get_list()
    }
  },
  methods: {
    reverseStatus,
    reverseMethod,
    async get_list () {
      if (this.loading) return
      this.loading = true
      const data = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'search': this.search
      }
      const response = await this.$services.do_request('get', COMPLAINTS_PROCESS_LIST, data)
      this.loading = false

      if (response.data.message === "Success") {
        this.complex.items = response.data.data.content
        this.pagination.total_items = response.data.data.totalElements
        this.pagination.total_pages = response.data.data.totalPages
      }  else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/500')
      }
    },
    search_list (data) {
      this.search = data
      this.get_list()
    },
    open_edit (complaint) {
      this.$refs.edit.open(complaint)
    },
    open_detail () {
      this.$refs.detail.open()
    },
    open_delete () {
      this.$refs.delete.open()
    },
    open_create () {
      this.$refs.create.open()
    },
    edited_success () {
      this.get_list()
    }
  },
  created () {
    this.get_list()
  }
};
</script>
