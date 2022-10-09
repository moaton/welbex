<template>
  <div class="w-100 mt-4 mb-3" style="position: relative;">
    <div class="container">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <span class="nav-link" :class="{'active': view === 'test'}" @click="view = 'test'" style="cursor: pointer;">Тестовая задача</span>
        </li>
        <li class="nav-item">
          <span class="nav-link" :class="{'active': view === 'resume'}" @click="view = 'resume'" style="cursor: pointer;">Резюме</span>
        </li>
      </ul>
    </div>
    <div class="container shadow" style="border-top: 1px solid #dee2e6; border-radius: 0.25rem;">
      <Table v-if="view === 'test'" @showAddModal="showModal = true" />
      <Resume v-else />
    </div>
  </div>
</template>

<script>
import Table from './components/Table.vue'
import Resume from './components/Resume.vue'

import './assets/css/null.css'
import './assets/css/bootstrap.css'


export default {
  name: 'App',
  components: {
    Table,
    Resume,
  },
  data() {
    return {
      view: 'test',
      showModal: false,
    }
  },
  mounted() {
    this.$store.dispatch('getData')
  },
  methods: {
  },
}
</script>

<style lang='scss'>
.nav-tabs{
  border-bottom: none !important;
}
</style>
