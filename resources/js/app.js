/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

const { default: VueRouter } = require('vue-router');

require('./bootstrap');
// require('./helper');

window.Vue = require('vue');
window.VueRouter = require('vue-router');

Vue.use(VueRouter);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

import Dashboard from './components/Dashboard.vue';
import DataGrid from './components/DataGrid.vue';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
// import Chartkick from 'vue-chartkick'
// import Chart from 'chart.js'
import { Table } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// Vue.use(Chartkick.use(Chart))


Vue.component('dashboard',Dashboard);
Vue.component('data-grid',DataGrid);
Vue.component('date-range-picker',DateRangePicker);
Vue.component(Table.name, Table);



/** Routes */

const routes = [
    { path: '/', component: Dashboard},
    { path: '/datagrid', component: DataGrid },
  ];

const router = new VueRouter({
    routes // short for `routes: routes`
});
  

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
