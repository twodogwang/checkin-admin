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
import { getorderlist, searchpayfororderlist } from "@/api/orderlist.js";

export default {
  props: {
    pageInfo: Object,
    searchParams: Object
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 通过搜索
      if (
        this.searchParams.searchString ||
        this.searchParams.startDate ||
        this.searchParams.searchBigType ||
        this.searchParams.searchSmallType &&
        this.searchParams !== {} &&
        this.searchParams !== null
      ) {
        console.log("这是搜索");
        this.searchParams.pageSize = val;
        searchpayfororderlist(this.searchParams).then(result => {
          this.$emit("changeOrderInfo", {
            data: result.data.list,
            page: {
              totalItems: result.data.totalItems,
              pageNum: result.data.pageNum,
              pageSize: result.data.pageSize
            }
          });
        });
      } else {
        getorderlist(
          { pageNum: 1, pageSize: val },
          "alredyReleased"
        ).then(result => {
          this.$emit("changeOrderInfo", {
            data: result.data.list,
            page: {
              totalItems: result.data.totalItems,
              pageNum: result.data.pageNum,
              pageSize: result.data.pageSize
            }
          });
        });
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // console.log(this.searchParams);
      // 通过搜索
      if (
        this.searchParams.searchString ||
        this.searchParams.startDate ||
        this.searchParams.searchBigType ||
        this.searchParams.searchSmallType &&
        this.searchParams !== {} &&
        this.searchParams !== null
      ) {
        this.searchParams.pageNum = val;
        searchpayfororderlist(this.searchParams).then(result => {
          this.$emit("changeOrderInfo", {
            data: result.data.list,
            page: {
              totalItems: result.data.totalItems,
              pageNum: result.data.pageNum,
              pageSize: result.data.pageSize
            }
          });
        });
      } else {
        getorderlist(
          { pageNum: val, pageSize: this.pageInfo.pageSize },
          "alredyReleased"
        ).then(result => {
          this.$emit("changeOrderInfo", {
            data: result.data.list,
            page: {
              totalItems: result.data.totalItems,
              pageNum: result.data.pageNum,
              pageSize: result.data.pageSize
            }
          });
        });
      }
    }
  },
  mounted() {
    console.log(this.searchParams);
  }
};
</script>
