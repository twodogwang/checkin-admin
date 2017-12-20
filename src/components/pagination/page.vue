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
    pageType: String,
    isSearch: String,
    searchParams: Object,
    searchParams2: Object
  },
  methods: {
    handleSizeChange(val) {
      console.log(this.pageType);
      console.log(`每页 ${val} 条`);
      if (this.isSearch === "none") {
        if (
          this.pageType == "role" ||
          this.pageType == "admin" ||
          this.pageType == "permission"
        ) {
          console.info(7777777777777777);
          this.$store.dispatch("getList", {
            pageInfo: {
              pageNum: 1,
              pageSize: val
            },
            type: this.pageType
          });
        } else {
          this.$store.dispatch("getInfo", {
            pageInfo: {
              pageNum: 1,
              pageSize: val
            },
            type: this.pageType
          });
        }
      } else if (this.isSearch === "codeSearch") {
        this.$store.dispatch("selectInfoById", {
          data: this.searchParams,
          page: { pageNum: 1, pageSize: val },
          type: this.pageType
        });
      } else {
        this.searchParams2.pageSize = val;
        this.$store.dispatch("selectInfo", {
          data: this.searchParams2,
          type: this.pageType
        });
      }
    },
    handleCurrentChange(val) {
      console.log(this.pageType);
      console.log(`当前页: ${val}`);
      if (this.isSearch === "none") {
        if (
          this.pageType == "role" ||
          this.pageType == "admin" ||
          this.pageType == "permission"
        ) {
          console.info(7777777777777777);
          this.$store.dispatch("getList", {
            pageInfo: {
              pageNum: val,
              pageSize: this.pageInfo.pageSize
            },
            type: this.pageType
          });
        } else {
          this.$store.dispatch("getInfo", {
            pageInfo: {
              pageNum: val,
              pageSize: this.pageInfo.pageSize
            },
            type: this.pageType
          });
        }
      } else if (this.isSearch === "codeSearch") {
        this.$store.dispatch("selectInfoById", {
          data: this.searchParams,
          page: { pageNum: val, pageSize: this.pageInfo.pageSize },
          type: this.pageType
        });
      } else {
        this.searchParams2.pageNum = val;
        this.$store.dispatch("selectInfo", {
          data: this.searchParams2,
          type: this.pageType
        });
      }
    }
  },
  mounted() {
    console.log(this.pageInfo);
  }
};
</script>
