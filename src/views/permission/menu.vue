<template>
  <div class="app-container">
    <el-row class="dr-datatable" justify="center">
          <el-button size="small" @click="addRouter" type="default">添加路由</el-button>
      </el-row>
        <el-table border :data="routerInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
          <el-table-column prop="Mdesc" label="路由名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="menu" label="路由URL" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteIt(scope.$index,routerInfo)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
         <el-dialog center title="添加路由" :visible.sync="dialogFormVisible">
            <el-form :model="dialogInfo" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="路由名称">
                <el-input placeholder="请输入路由名称" size="small" v-model="dialogInfo.menuName"></el-input>
              </el-form-item>
              <el-form-item label="路由URL">
                <el-input placeholder="请输入路由名称" size="small" v-model="dialogInfo.menuUrl"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogFormVisible = false;dialogInfo={}">取 消</el-button>
              <el-button size="small" type="primary" @click="submit('ruleForm')">确 定</el-button>
            </span>
         </el-dialog>
  </div>
</template>

<script>
import { getAllRouters, deleteRouter, addRouter } from "@/api/routerManage.js";

export default {
  data() {
    return {
      loading: true,
      routerInfo: [],
      dialogFormVisible: false,
      dialogInfo: {},
      rules: {}
    };
  },
  methods: {
    addRouter() {
      this.dialogFormVisible = true;
      this.dialogInfo = {};
    },
    deleteIt(index, rows) {
      this.$confirm("确认删除吗？", "删除路由", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRouter({ id: rows[index].id }).then(result => {
            getAllRouters().then(result => {
              this.routerInfo = result.data.list;
              this.loading = false;
            });
          });
        })
        .catch(() => {

        });
    },
    submit(form) {
      addRouter(this.dialogInfo).then(result => {
        getAllRouters().then(result => {
          this.routerInfo = result.data.list;
          this.loading = false;
        });
        this.dialogFormVisible = false;
      });
    }
  },
  beforeCreate() {
    getAllRouters().then(result => {
      this.routerInfo = result.data.list;
      this.loading = false;
    });
  }
};
</script>

<style>
.dr-datatable {
  margin-bottom: 1em;
}
</style>
