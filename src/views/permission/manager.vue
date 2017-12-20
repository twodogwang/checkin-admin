<template>
    <div class="app-container">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <el-row class='dr-datatable'>
                    <el-button size="small" type="primary" icon="el-icon-plus" @click="addInfo">新建</el-button>
                </el-row>
                <el-table
                    :data="adminInfo"
                    border
                    style="width: 100%">
                        <el-table-column
                            prop="u_id"
                            label="#"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="u_username"
                            label="管理员姓名"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="role_name"
                            label="所属分组"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="tel"
                            label="电话"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="u_bz"
                            label="备注"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="email"
                            label="邮箱"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editManager(scope.$index,adminInfo)">编辑</el-button>
                                <el-button type="text" size="small" @click="deleManager(scope.$index,adminInfo)">删除</el-button>
                                <el-button type="text" size="small"
                                v-if="adminInfo[scope.$index].permissionLevel !== 1 &&
                                adminInfo[scope.$index].permissionLevel !== 2 &&
                                adminInfo[scope.$index].permissionLevel !== 5"
                                @click="zhuanyiZiyuan(scope.$index,adminInfo)">
                                资源转移
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- Form -->
        <el-dialog title='编辑' :visible.sync='editdialogFormVisible' :before-close='beforeclose'>
            <el-form :model='adminformState' :rules='rules' ref='ruleForm' label-width='120px' class='demo-ruleForm'>
                <el-form-item label='账号' prop='u_username'>
                    <el-input size='small' v-model='adminformState.u_username'></el-input>
                </el-form-item>
                <el-form-item label='密码' prop='u_password'>
                    <el-input size='small' v-model='adminformState.u_password'></el-input>
                </el-form-item>
                <el-form-item label='所属分组' prop='role_id'>
                    <el-select size='small' v-model='adminformState.role_id' placeholder='请选择分组' @change="showsuperior">
                        <el-option v-for='item in RoleName' :key='item.role_id' :label='item.role_name' :value='item.role_id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='所属上级' prop='superior' v-if="ifshowsuperior">
                    <el-select size='small' v-model='adminformState.superior' placeholder='请选择上级'>
                        <el-option v-for='item in superior' :key='item.u_id' :label='item.u_username' :value='item.u_id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='权限等级' prop='superior' v-if="ifshowsuperior">
                    <el-select size='small' v-model='adminformState.permissionLevel' placeholder='请选择权限等级'>
                        <el-option v-for='item in 7' :key='item' :label='item' :value='item'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='电话号码' prop='tel'>
                    <el-input placeholder='' size='small' v-model='adminformState.tel'></el-input>
                </el-form-item>
                <el-form-item label='备注' prop='u_bz'>
                    <el-input placeholder='' size='small' v-model='adminformState.u_bz'></el-input>
                </el-form-item>
                <el-form-item label='邮箱' prop='email'>
                    <el-input placeholder='请输入邮箱' size='small' v-model='adminformState.email'></el-input>
                </el-form-item>
                <el-form-item class='dr-submitContent'>
                    <el-button size='small' type='primary' @click="refister">确定</el-button>
                    <el-button size='small' @click='editdialogFormVisible = false;'>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title='资源转移' :visible.sync='zhuanyiFormVisible' :before-close='beforeclose'>
            <el-form :model='zhuanyiForm' :rules='rules' ref='ruleForm' label-width='120px' class='demo-ruleForm'>
                <el-form-item label='转移给哪个员工' prop='zhuanyiList' v-if="ifshowsuperior">
                    <el-select size='small' v-model='zhuanyiForm.target' placeholder='选择转移给哪个员工'>
                        <el-option v-for='item in zhuanyiList' :key='item.u_id' :label='item.u_username' :value='item.u_id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='dr-submitContent'>
                    <el-button size='small' type='primary' @click="zhuanyiSure">确定</el-button>
                    <el-button size='small' @click='zhuanyiFormVisible = false;'>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fetch from "@/utils/request";
import qs from "qs";
export default {
  data() {
    return {
      zhuanyiFormVisible: false,
      editdialogFormVisible: false,
      adminformState: {
        u_username: "",
        u_password: "",
        role_id: "",
        permissionLevel: "",
        tel: "",
        u_bz: "",
        email: "",
        superior: ""
      },
      zhuanyiForm: {
        target: "",
        origin: ""
      },
      groupList: [],
      superior: [],
      managerEdit: false,
      rules: {},
      RoleName: [],
      ifshowsuperior: true
    };
  },
  methods: {
    addInfo() {
      this.edit = false;
      this.editdialogFormVisible = true;
      this.managerEdit = false;
    },
    beforeclose(done) {
      return new Promise((resolve, reject) => {
        this.adminformState = {
          u_username: "",
          u_password: "",
          role_id: "",
          permissionLevel: "",
          tel: "",
          u_bz: "",
          email: "",
          superior: ""
        };
        resolve(true);
      }).then(_ => {
        done();
      });
    },
    refister() {
      if (!this.managerEdit) {
        fetch({
          method: "post",
          url: "/permission/register",
          data: qs.stringify(this.adminformState)
        }).then(() => {
          this.editdialogFormVisible = false;
          this.$store
            .dispatch("GetAdminInfo", {
              exit: 0
            })
            .then(() => {
              console.log("GetAdminInfo");
              this.loading = false;
            });
        });
      } else {
        fetch({
          method: "post",
          url: "/permission/editManager",
          data: qs.stringify(this.adminformState)
        }).then(() => {
          this.editdialogFormVisible = false;
          this.managerEdit = false;
          this.$store
            .dispatch("GetAdminInfo", {
              exit: 0
            })
            .then(() => {
              console.log("GetAdminInfo");
              this.loading = false;
            });
        });
      }
    },
    editManager(index, row) {
      this.managerEdit = true;
      this.adminformState.u_id = row[index].u_id;
      fetch({
        url: "/permission/getManagerUser",
        method: "get",
        params: { role_id: row[index].role_id }
      }).then(results => {
        this.superior = results.data;
      });
      fetch({
        method: "get",
        url: "/permission/getManagerSingle",
        params: { u_id: row[index].u_id }
      }).then(results => {
        this.adminformState = results.formdata;
        this.editdialogFormVisible = true;
      });
    },
    zhuanyiZiyuan(index, row) {
      this.zhuanyiFormVisible = true;
      this.zhuanyiForm.origin = row[index].u_id
    },
    zhuanyiSure() {
      fetch({
        method: "post",
        url: "/permission/zhuanyiziyuan",
        data: qs.stringify(this.zhuanyiForm)
      });
    },
    deleManager(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        fetch({
          method: "post",
          url: "/permission/deleUser",
          data: qs.stringify({ u_id: row[index].u_id })
        }).then(result => {
          this.$store.dispatch("GetAdminInfo");
        });
      });
    },
    showsuperior(val) {
      if (val === 1) {
        this.ifshowsuperior = !this.ifshowsuperior;
      } else {
        this.ifshowsuperior = true;
        fetch({
          url: "/permission/getManagerUser",
          method: "get",
          params: { role_id: val }
        }).then(results => {
          this.superior = results.data;
        });
      }
    }
  },
  computed: {
    ...mapGetters(["adminInfo", "roles","zhuanyiList"])
  },
  mounted() {
    fetch({
      url: "/permission/getrolename",
      method: "get"
    }).then(results => {
      this.RoleName = results.data;
    });
  },
  beforeCreate() {
    if (!this.$store.getters.adminInfo) {
      this.$store
        .dispatch("GetAdminInfo", {
          exit: 0
        })
        .then(() => {
          console.log("GetAdminInfo");
          this.loading = false;
        });
    }
    if (!this.$store.getters.zhuanyilist) {
      this.$store
        .dispatch("getzhuanyiList")
        .then(() => {
          console.log("getzhuanyiList");
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.dr-datatable {
  margin-bottom: 1em;
}
.search {
  width: 20%;
}
</style>
