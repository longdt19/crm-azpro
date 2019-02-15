<template>
  <v-dialog v-model="dialog_display" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Cảnh báo</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <p>Sau khi xóa sẽ không thể phục hồi. Bạn muốn tiếp tục ?</p>
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
export default {
  data () {
    return {
      dialog_display: false,
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
