<template>
  <div class="app-container">
      <el-table border :data="logsInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
        <el-table-column prop="to_who" label="派单任务" show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="log_bz" label="派单行为" show-overflow-tooltip></el-table-column>
      </el-table>
      <Pagination :pageInfo="logsPage"></Pagination>
  </div>
</template>

<script>
import Pagination from "../../components/pagination/logPagination.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return { loading: true };
  },
  computed: { ...mapGetters(["logsInfo", "logsPage"]) },
  components: { Pagination },
  beforeCreate() {
    if (!this.logsInfo) {
      if (!this.logsPage) {
        this.$store.dispatch("getLogs").then(result => {
          this.loading = false;
        });
      } else {
        this.$store.dispatch("getLogs", this.logsPage).then(result => {
          this.loading = false;
        });
      }
    }
  }
};
</script>

<style>

</style>
