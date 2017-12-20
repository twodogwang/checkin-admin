<template>
  <div class="app-container">
    <el-table border :data="todaysBackLogs" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
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
              <pre>{{todaysBackLogs[scope.$index].c_bz}}</pre>
            </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="done(scope.$index,todaysBackLogs)">完成</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="u_username" label="客服专员">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { done } from "@/api/backLog";

export default {
  data() {
    return { loading: true };
  },
  computed: { ...mapGetters(["todaysBackLogs"]) },
  methods: {
    done(index, rows) {
      done(rows[index].id).then(result => {
        this.$notify({
          title: "提示",
          message: "操作成功",
          type: "success"
        });
        this.$store.dispatch("getTodaysBackLogs").then(result => {
          this.loading = false;
        });
      });
    }
  },
  beforeCreate() {
    if (!this.todaysBackLogs) {
      this.$store.dispatch("getTodaysBackLogs").then(result => {
        this.loading = false;
      });
    }
  }
};
</script>

<style>

</style>
