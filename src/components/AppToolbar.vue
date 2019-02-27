<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        >
      </v-text-field> -->
      <v-spacer></v-spacer>
      <!-- <v-btn href="mailto:wangqiangshen@gmail.com">
        Hire Me
      </v-btn>       -->
      <!-- <v-btn icon href="https://github.com/tookit/vue-material-admin">
        <v-icon>fa fa-github</v-icon>
      </v-btn> -->
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator" :loading="loading_notify_list">
        <v-badge color="red" overlap @click.native="get_notifications_list()">
          <span v-if="this.notifications_count" slot="badge">{{notifications_count}}</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>

        <v-card class="elevation-0" style="width: 400px">
          <v-toolbar card dense color="transparent">
            <v-toolbar-title v-if="this.notification_list"><h4>Thông báo</h4></v-toolbar-title>
            <v-toolbar-title v-else
            >
              <h4>Không có thông báo nào</h4>
            </v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0" v-if="loading_notify_list === false"
            style="height: 300px; overflow-y: auto;"
          >
            <v-list two-line class="pa-0" >
              <template>
                <div v-for="(item, index) in notification_list" :key="index"
                  :style=" item.status === 0 ? 'background: #e4ecf9' : ''"
                  @click="commit_complaint_id(item.complaintId)"
                >
                  <!-- <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader> -->
                  <v-divider></v-divider>
                  <v-list-tile avatar >
                    <v-list-tile-content>
                      <v-list-tile-sub-title v-html="item.actionCode"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-sub-title v-html="item.actionName + ' ' + item.complaintId"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action class="caption">
                      {{formatDate(item.created)}}
                    </v-list-tile-action>
                  </v-list-tile>
                </div>
              </template>
            </v-list>
            <v-divider></v-divider>
            <!-- <v-btn block flat class="ma-0">All</v-btn> -->
            <v-divider></v-divider>
          </v-card-text>
        </v-card>

      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/static/avatar/man_4.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile @click="open_change_pass()">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="open_logout()">
            <v-list-tile-action>
              <v-icon>fullscreen_exit</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <change-pass ref="change_pass" />
      <logout ref="logout" />
  </v-toolbar>
</template>
<script>
/* eslint-disable */
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
import ChangePass from './ChangePass'
import Logout from './Logout'
import { NOTIFICATION_NEW_COUNT, NOTIFICATION_ALL } from '@/constants/endpoints';
import formatDate from '@/util/formatDate';

export default {
  name: 'app-toolbar',
  components: {
    NotificationList,
    ChangePass,
    Logout
  },
  data: () => ({
    items: [
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log('refs', e);
          this.$refs.change_pass.open()
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
    items_notify: [
      {
        title: 'Thông báo 1',
        color: 'light-green',
        icon: 'account_circle',
        timeLabel: 'Just now',
        background: '#e5eefb',
        category: 'tao_moi'
      },
      { divider: true, inset: true },
      {
        title: 'Thông báo 2',
        color: 'light-blue',
        icon: 'shopping_cart',
        timeLabel: '2 min ago',
        background: '#e5eefb',
        category: 'tao_moi'
      },
      { divider: true, inset: true },
      {
        title: 'Thông báo 3',
        color: 'cyan',
        icon: 'payment',
        timeLabel: '24 min ago',
        category: 'tao_moi'
      },
      { divider: true, inset: true },
      {
        title: 'Thông báo 4',
        color: 'red',
        icon: 'email',
        timeLabel: '1 hour ago',
        category: 'tao_moi'
      }
    ],
    notifications_count: 0,
    loading_notify: false,
    loading_notify_list: false,
    notification_list: []
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    formatDate,
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    open_change_pass () {
      this.$refs.change_pass.open()
    },
    open_logout () {
      this.$refs.logout.open()
    },
    change_title (number) {
      document.title = '(' + number + ') ' + document.title;
    },
    commit_complaint_id (id) {
      console.log('commit', this.$store)
      this.$store.commit('Common/complaint_id_loaded', id)
      if (this.$route.name !== 'complaints-list') {
        this.$router.push('/complaints-list')
      }
    },
    async get_new_notifications () {
      if (this.loading_notify) return
      this.loading_notify = true
      const response = await this.$services.do_request('get', NOTIFICATION_NEW_COUNT);
      this.loading_notify = false

      if (response.data.message === "Success") {
        this.notifications_count = response.data.data
        if (this.notifications_count) {
          this.change_title(this.notifications_count)
        }
      }
    },
    async get_notifications_list () {
      if (this.loading_notify_list) return
      this.loading_notify_list = true

      const data = {
        'page': 0,
        'size': 5
      }

      const response = await this.$services.do_request('get', NOTIFICATION_ALL, data)
      this.loading_notify_list = false
      console.log('response', response)
      if (response.data.message === "Success") {
        this.notification_list = response.data.data.content
      }
    },
    test_scroll () {
      console.log('scroll')
    }
  },
  created () {
    setInterval(function () {
      let pages_ignore = ['Login', '500', '404']
      if (pages_ignore.indexOf(this.$route.name) < 0) {
        this.get_new_notifications()
      }
    }.bind(this), 3000)
  }
};
</script>
