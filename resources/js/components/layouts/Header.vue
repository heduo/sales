<template>
  <div>
    <header class="header">
      <div class="container">
        <h3>Sales Report</h3>
        <br />
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item" @click="updateCurrentRoute">
            <router-link
              to="/"
              class="nav-link"
              href="#dashboard"
              data-toggle="tab"
              role="tab"
              aria-controls="dashboard"
              aria-selected="true"
              
            >Dashboard</router-link>
          </li>
          <li class="nav-item" @click="updateCurrentRoute">
            <router-link
              to="/datagrid"
              class="nav-link"
              href="#datagrid"
              data-toggle="tab"
              role="tab"
              aria-controls="datagrid"
              aria-selected="false"
            >Data Grid</router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import {EventBus} from '../../EventBus';

export default {
    methods: {
        updateCurrentRoute : function () {
            EventBus.$emit('update-route', this.$route.path);
        }
    },
}
</script>