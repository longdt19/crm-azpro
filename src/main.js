// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import 'font-awesome/css/font-awesome.css';
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';
import Notifications from 'vue-notification';

import axios from './plugins/axios';
import store from './store';
import { mapGetters } from 'vuex';

Vue.config.productionTip = false;
// Helpers
// Global filters

Vue.use(Notifications);
Vue.use(axios);
Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Bootstrap application components

Vue.mixin({
  computed: {
    ...mapGetters('Common', ['common_data'])
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created () {
    this.$services.init_context(this);
  },
  template: '<App/>'
});
