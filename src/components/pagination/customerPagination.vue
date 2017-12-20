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
    pageInfo: Object,
    select: String,
    searchParams: Object
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log(this.select);
      //   通过筛选
      if (
        this.searchParams &&
        (this.searchParams.searchString ||
        this.searchParams.startDate)
      ) {
        this.searchParams.pageSize = val;
        this.$store.dispatch("SearchCustomerList", this.searchParams);
      } else if (this.select && this.select !== null && this.select !== "") {
        this.$store.dispatch("GetCustomerList", {
          pageInfo: {
            pageSize: val,
            pageNum: 1
          },
          type: this.select
        });
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.select);
      console.log(this.searchParams)
      // 通过筛选
      if (
        this.searchParams &&
        (this.searchParams.searchString ||
        this.searchParams.startDate)
      ) {
        this.searchParams.pageNum = val;
        this.$store.dispatch("SearchCustomerList", this.searchParams);
      } else if (this.select && this.select !== null && this.select !== "") {
        if (this.pageInfo) {
          this.$store.dispatch("GetCustomerList", {
            pageInfo: {
              pageSize: this.pageInfo.pageSize,
              pageNum: val
            },
            type: this.select
          });
        } else {
          this.$store.dispatch("GetCustomerList", {
            pageInfo: {
              pageSize: 10,
              pageNum: val
            },
            type: this.select
          });
        }
      }
    }
  },
  mounted() {
    // console.log(this.pageInfo);
  }
};
</script>
