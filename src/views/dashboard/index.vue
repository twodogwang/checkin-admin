<template>
  <div class="app-container">
    <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <h3>个人信息</h3>
      <div class='card-panel'>
        <div class="card-panel-icon-wrapper icon-people hidden-sm-and-down">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description" @click="pushToInfo">
          <div class="card-panel-num">{{name}}</div>
          <div class="card-panel-num">{{roleName}}</div>
        </div>
      </div>
    </el-col>
    </el-row>
      <h3 v-if="data.customerNum">客户管理</h3>
    <el-row class="panel-group" :gutter="40">
      <el-col v-for="(item,index) in data.customerNum" :key="index" :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="pushToCustomer">
          <div class="card-panel-icon-wrapper icon-money hidden-sm-and-down">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{item.type}}</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="item.num" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
      <h3 v-if="data.orderNum">订单管理</h3>
    <el-row class="panel-group" :gutter="40">
      <el-col v-for="(item,index) in data.orderNum" :key="index" :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="pushToOrder">
          <div class="card-panel-icon-wrapper icon-message hidden-sm-and-down">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{item.type}}</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="item.num" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="data.payedOrder>=0" class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="pushToPayedOrder">
          <div class="card-panel-icon-wrapper icon-message hidden-sm-and-down">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">已放款订单</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="data.payedOrder" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
      <h3 v-if="data.todayTodoList>=0">待办事项</h3>
    <el-row v-if="data.todayTodoList>=0" class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="pushToBacklogs">
          <div class="card-panel-icon-wrapper icon-shoppingCard hidden-sm-and-down">
            <svg-icon icon-class="documentation" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日待办事项</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="data.todayTodoList" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import { mapGetters } from "vuex";
import CountTo from "vue-count-to";
import { getIndexInfo } from "@/api/home";

export default {
  name: "dashboard",
  data() {
    return {
      data: {}
    };
  },
  computed: {
    ...mapGetters(["name", "roles", "roleName"])
  },
  methods: {
    pushToInfo(){
      this.$router.push("/permission/manager");
    },
    pushToCustomer() {
      this.$router.push("/customer/customerList");
    },
    pushToPayedOrder() {
      this.$router.push("/orderManagement/alreadyReleasedOrder");
    },
    pushToOrder() {
      this.$router.push("/orderManagement/mostOrder");
    },
    pushToBacklogs() {
      this.$router.push("/backLogs/todayBackLogs");
    }
  },
  components: {
    CountTo
  },
  beforeCreate() {
    getIndexInfo().then(result => {
      this.data = result;
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/* .dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
} */
h3 {
  padding-left: 1em;
}
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
