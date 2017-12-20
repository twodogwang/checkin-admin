<template>
  <div class="block dr-pagination">
    <div v-if="pageInfo">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalItems">
      </el-pagination>
    </div>
  </div>
</template>
<style lang="">
.dr-pagination {
  text-align: center;
  margin: 15px auto;
}
</style>
<script>
export default {
  props: {
    pageInfo: Object
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //   通过筛选
      this.$store.dispatch("getLogs", { pageNum: 1, pageSize: val });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.dispatch("getLogs", {
        pageSize: this.pageInfo.pageSize,
        pageNum: val
      });
    }
  },
  mounted() {
    // console.log(this.pageInfo);
  }
};
</script>
