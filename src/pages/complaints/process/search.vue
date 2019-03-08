<template>
  <v-widget title="Tìm kiếm">
    <section slot="widget-content">
      <v-container fluid>
        <v-progress-linear v-if="loading === true" indeterminate></v-progress-linear>

        <v-layout row wrap v-else>
          <v-flex xs12 sm3>
            <v-text-field label="Tên khách hàng" required v-model="customer"></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field v-model="creator" type="text" label="Người tạo"></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <v-select
              :items="category_select"
              v-model="category"
              label="Hình thức"
              item-text="category"
              item-value="value"
              class="input-group--focused"
              clearable
            ></v-select>
          </v-flex>

          <v-flex xs12 sm3>
            <v-select
              :items="status_select"
              v-model="status"
              label="Trạng thái"
              item-text="status"
              item-value="value"
              class="input-group--focused"
              clearable
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field label="Nội dung khiếu nại" required v-model="content"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field v-model="processContent" type="text" label="Nội dung xử lý"></v-text-field>
          </v-flex>
          <br>
          <v-btn block color="primary" dark @click="search()"
            :disabled="common_data.navigation.getMethod === 0"
          >
            Tìm kiếm
          </v-btn>
        </v-layout>

      </v-container>
    </section>
  </v-widget>
</template>

<script>
/* eslint-disable */
import VWidget from '@/components/VWidget';
import { CATEGORIES_COMPLAINTS, STATUS_COMPLAINTS } from '@/api/constant_select';

export default {
  components: {
    VWidget
  },
  data () {
    return {
      category_select: CATEGORIES_COMPLAINTS,
      status_select: STATUS_COMPLAINTS,
      customer: null,
      creator: null,
      category: null,
      status: null,
      customer: '',
      content: null,
      processContent: null,
      loading: false,
      loading_search: false
    }
  },
  methods: {
    async search () {
      const data = {
        'customer': this.customer,
        'creator': this.creator,
        'method': this.category,
        'status': this.status,
        'content': this.content,
        'processContent': this.processContent
      }
      this.$emit('search_list', data)
    }
  },
  created () {
  }
}
</script>

<style lang="css">
</style>
