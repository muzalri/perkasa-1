// router/index.js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/komunitas/:id',
      name: 'KomunitasDetail',
      component: () => import('@/pages/KomunitasDetail.vue'), // File tujuan
    },
    // Rute lainnya
  ],
});
