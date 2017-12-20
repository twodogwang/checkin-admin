<template>
  <div class="app-container">
    <el-table border :data="allBackLogs" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
      <el-table-column prop="todo_content" label="待办事项">
      </el-table-column>
      <el-table-column prop="todo_data" label="日期">
      </el-table-column>
      <el-table-column prop="c_name" label="客户">
      </el-table-column>
      <el-table-column prop="c_tel" label="客户电话">
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
              <pre>{{allBackLogs[scope.$index].c_bz}}</pre>
            </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return { loading: true };
  },
  computed: { ...mapGetters(["allBackLogs"]) },
  beforeCreate() {
    if (!this.todaysBackLogs) {
      this.$store.dispatch("getAllBackLogs").then(result => {
        this.loading = false;
      });
    }
  }
};
</script>

<style>

</style>
