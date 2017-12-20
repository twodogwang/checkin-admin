<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb v-if="ifPhone&&!sidebar.opened"></breadcrumb>
    <breadcrumb v-else-if="!ifPhone"></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-badge :value="messages" class="item">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
      </el-badge>
      <!-- <div style="line-height:65px;"> -->
          <span class="hidden-sm-and-down">{{name}}</span>
           <span class="hidden-sm-and-down">{{roleName}}</span>
      <!-- </div> -->
          <i class="el-icon-caret-bottom"></i>
        </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <el-badge :value="messages" class="item">
          <span @click="unread" style="display:block;">未读信息</span>
          </el-badge>
        </el-dropdown-item>
        <!-- <el-dropdown-item>
          <span @click="send" style="display:block;">测试</span>
        </el-dropdown-item> -->
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  <el-dialog width="80%" title='消息列表' :visible.sync='dialogFormVisible'>
      <el-table stripe border :data='data' align='center' ref='multipleTable' tooltip-effect='dark' style='width: 100%'>
          <el-table-column type='index' width='55'>
          </el-table-column>
          <el-table-column prop="msg_id" label='发送人' width="75">
          </el-table-column>
          <el-table-column prop='msg' label='内容' show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop='time' label='发送时间' show-overflow-tooltip>
          </el-table-column>
          <el-table-column label='操作' width='150'>
            <template slot-scope='scope'>
                <el-button size='mini' type="primary" @click='changeState(scope.$index, data)'>标为已阅</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import { mapGetters } from "vuex";
import fetch from "@/utils/request.js";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
export default {
  data() {
    return {
      messages: 0,
      data: null,
      dialogFormVisible: false,
      ifPhone:false
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    getMsg: function(val) {
      console.log("emit了getMsg", val);
      // this.data.push(val);
      this.messages += 1;
    },
    err: function(val) {
      this.$notify.error({
        title: "通知",
        message: val.msg,
        type: "warn"
      });
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "roleName"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    unread() {
      this.dialogFormVisible = true;
      fetch({
        url: "/message/getMessage"
      }).then(result => {
        if (result.code == 20000) {
          this.messages = result.results.length;
          this.data = result.results;
        }
      });
    },
    send() {
      this.$socket.emit("message", { to: 30, msg: 456 });
    },
    changeState(index, rows) {
      fetch({
        url: "/message/readMessage",
        params: { msg_id: rows[index].msg_id }
      }).then(result => {
        this.messages -= 1;
        this.data.splice(index, 1);
      });
    }
  },
  created() {
    fetch({
      url: "/message/getMessage"
    }).then(result => {
      if (result.results) {
        this.messages = result.results.length;
        this.data = result.results;
      }
    });
    this.$socket.emit("newUser", this.$store.getters.token);
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(w < 700){
      this.ifPhone = true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  padding-top: 10px;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: flex;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

