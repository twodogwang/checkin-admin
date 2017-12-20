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
    big:Number,
    small:Number
  },
  methods: {
    nextPage(val){
      this.$store.dispatch(`${this.pageType}`, {
          pageInfo: {
            pageNum: val,
            pageSize: this.pageInfo.pageSize,
            big:this.big,
            small:this.small
          }
        });
    },
    nextPagePlus(val){
      this.$store.dispatch(`${this.pageType}`, {
          pageInfo: {
            pageNum: 1,
            pageSize: val,
            big:this.big,
            small:this.small
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.nextPagePlus(val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.nextPage(val)
    },
    data() {
      return {};
    }
  },
  mounted() {
    console.log(this.pageInfo);

  }
};
</script>
