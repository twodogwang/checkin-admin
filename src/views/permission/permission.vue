<template>
    <div class="app-container">
        <el-row  class='dr-datatable'>
            <el-col :span="24">
                <el-row class='dr-datatable'>
                    <el-button size="small" type="primary" icon="el-icon-plus" @click="addInfo">添加权限</el-button>
                    <el-cascader
                    size="small"
                        :options="options"
                        v-model="selectedOptions3"
                        @change="permissionChange">
                    </el-cascader>
                </el-row>
                <el-table :data="permissionInfo" border style="width: 100%">
                    <el-table-column prop="id" label="权限ID" width="120"></el-table-column>
                    <el-table-column prop="url" label="权限url" width="200"></el-table-column>
                    <el-table-column prop="pDesc" label="权限描述"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editPermission(scope.$index,permissionInfo)">编辑</el-button>
                            <el-button type="text" size="small" @click="delePermission(scope.$index,permissionInfo)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination pageType="GetPermissionInfo" :pageInfo="permissionPage" :big="permissionForm.type[0]" :small="permissionForm.type[1]"></Pagination>
            </el-col>
        </el-row>
        <el-dialog title='添加权限' :visible.sync='editdialogFormVisible' :before-close='beforeclose'>
            <el-form :model='permissionForm' :rules='rules' ref='ruleForm' label-width='120px' class='demo-ruleForm'>
                <el-form-item class='dr-submitContent' label='权限路径'>
                    <el-input placeholder='权限路径' size='small' v-model='permissionForm.url'></el-input>
                </el-form-item>
                <el-form-item class='dr-submitContent' label='权限描述'>
                    <el-input placeholder='权限描述' size='small' v-model='permissionForm.pDesc'></el-input>
                </el-form-item>
                <el-form-item class='dr-submitContent' label='权限分类'>
                    <el-cascader
                        :options="options"
                        v-model="permissionForm.type">
                    </el-cascader>
                </el-form-item>
                <el-form-item class='dr-submitContent'>
                    <el-button size='small' type='primary' @click="addPermission">确定</el-button>
                    <el-button size='small' @click='editdialogFormVisible = false;'>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import Pagination from "../../components/pagination/permissionPage.vue";
import { mapGetters } from "vuex";
import fetch from "@/utils/request";
import qs from "qs";
export default {
  name: "permission",
  data() {
    return {
      editdialogFormVisible: false,
      permissionForm: {type:[]},
      rules: {},
      editType: true,
      options: [
        {
          value: 1,
          label: "操作权限",
          children: [
            {
              value: 11,
              label: "操作订单"
            },
            {
              value: 12,
              label: "操作客户"
            },
            {
              value: 13,
              label: "操作用户"
            },
            {
              value: 14,
              label: "操作杂项"
            }
          ]
        },
        {
          value: 2,
          label: "展示权限",
          children: [
            {
              value: 21,
              label: "展示订单"
            },
            {
              value: 22,
              label: "展示客户"
            },
            {
              value: 23,
              label: "展示用户"
            },
            {
              value: 24,
              label: "展示杂项"
            }
          ]
        }
      ],
      selectedOptions3: ["zujian", "data", "tag"]
    };
  },
  methods: {
    addInfo() {
      this.edit = false;
      this.editdialogFormVisible = true;
    },
    beforeclose() {
      this.editType = true;
    },
    addPermission() {
      if (this.editType) {
        fetch({
          method: "post",
          url: "/permission/addPermission",
          data: qs.stringify(this.permissionForm)
        }).then(() => {
          this.editdialogFormVisible = false;
        });
      } else {
        fetch({
          method: "post",
          url: "/permission/editPermission",
          data: qs.stringify(this.permissionForm)
        }).then(() => {
          this.editdialogFormVisible = false;
          this.editType = true;
          this.$store
            .dispatch("GetPermissionInfo", {
              pageInfo: {
                pageSize: 10,
                pageNum: 1,
                big: this.permissionForm.type[0],
                small: this.permissionForm.type[1]
              }
            })
            .then(() => {
              console.log("GetPermissionInfo");
              this.loading = false;
            });
        });
      }
    },
    editPermission(index, row) {
      this.editdialogFormVisible = true;
      this.editType = false;
      Object.assign(this.permissionForm, row[index]);
    },
    delePermission(index, row) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        fetch({
          method: "post",
          url: "/permission/delePermission",
          data: qs.stringify({ id: row[index].id })
        }).then(() => {
          this.$store
            .dispatch("GetPermissionInfo", {
              pageInfo: {
                pageSize: 10,
                pageNum: 1,
                big: row[index].permissionBigType,
                small: row[index].permissionSmallType
              }
            })
            .then(() => {
              console.log("GetPermissionInfo");
              this.loading = false;
            });
        });
      });
    },
    permissionChange(val) {
      this.$store
        .dispatch("GetPermissionInfo", {
          pageInfo: {
            pageSize: 10,
            pageNum: 1,
            big: val[0],
            small: val[1]
          }
        })
        .then(() => {
          console.log("GetPermissionInfo");
          this.permissionForm.type[0] = val[0],
          this.permissionForm.type[1] = val[1]
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters(["permissionInfo", "permissionPage"]),
    handlePermission() {
      fetch({
        method: "get",
        url: "/select/handlePermission"
      });
    }
  },
  beforeCreate() {
    if (!this.$store.getters.adminInfo) {
      this.$store
        .dispatch("GetPermissionInfo", {
          pageInfo: {
            pageSize: 10,
            pageNum: 1,
            big: 1,
            small: 11
          }
        })
        .then(() => {
          console.log("GetPermissionInfo");
          this.loading = false;
        });
    }
  },
  components: {
    Pagination
  }
};
</script>
<style>
.dr-datatable {
  margin-bottom: 1em;
}
</style>
