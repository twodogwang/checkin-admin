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
    searchType: String,
    searchString:String,
    searchObj:Object
  },
  methods: {
    nextPage(val){
      this.$store.dispatch(`${this.pageType}`, {
          pageInfo: {
            pageNum: val,
            pageSize: this.pageInfo.pageSize,
            search:""
          }
        });
    },
    nextPagePlus(val){
      this.$store.dispatch(`${this.pageType}`, {
          pageInfo: {
            pageNum: 1,
            pageSize: val,
            search:""
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      if (this.searchType && (this.searchString || Object.values(this.searchObj)[0]) ) {
          if(this.searchString){
            this.$store.dispatch(`${this.searchType}`, {
              content: {
                pageNum: val,
                pageSize: this.pageInfo.pageSize,
                search: this.searchString
              }
            });
          }else{
            // var valuesLength = Object.values(this.searchObj);
            // for(let i in valuesLength){
            //   if(!valuesLength[i]){
            //     this.nextPagePlus(val)
            //   }
            // }
            console.log(456456)
            this.$store.dispatch(`${this.searchType}`, {
              content: {
                pageNum: val,
                pageSize: this.pageInfo.pageSize,
                community_id:this.searchObj.community_id,
                nper_id:this.searchObj.nper_id,
                floor_id:this.searchObj.floor_id,
                unit_id:this.searchObj.unit_id,
                door_id :this.searchObj.room_id
              }
            });
          }
      } else {
        this.nextPagePlus(val)
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      if (this.searchType && (this.searchString || Object.values(this.searchObj)[0]) ) {
        if(this.searchString){
          this.$store.dispatch(`${this.searchType}`, {
            content: {
              pageNum: val,
              pageSize: this.pageInfo.pageSize,
              search: this.searchString
            }
          });
        }else{
          // var valuesLength = Object.values(this.searchObj);
            // for(let i in valuesLength){
            //   if(!valuesLength[i]){
            //     this.nextPage(val)
            //   }
            // }
            console.log(456456)
          this.$store.dispatch(`${this.searchType}`, {
            content: {
              pageNum: val,
              pageSize: this.pageInfo.pageSize,
              community_id:this.searchObj.community_id,
              nper_id:this.searchObj.nper_id,
              floor_id:this.searchObj.floor_id,
              unit_id:this.searchObj.unit_id,
              room_id :this.searchObj.room_id
            }
          });
        }
      } else {
        this.nextPage(val)
      }
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
