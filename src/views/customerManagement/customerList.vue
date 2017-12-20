 <template>
   <div class="app-container">
        <el-row class="dr-datatable" justify="center">
            <el-input size="small" class="searchInput" placeholder="客户名称、电话、录入员" v-model="search.searchString">
              <template slot="prepend">综合搜索</template>
              <el-button slot="append" icon="el-icon-search" @click="searchFor"></el-button>
            </el-input>
            <el-date-picker
            size="small"
              v-model="search.date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <!-- <el-button size="small" @click="simpleSearch" type="primary" round>搜索</el-button> -->
            <el-button size="small" @click="sousuo('intention')" type="default" round>意向客户</el-button>
            <el-button size="small" @click="sousuo('waitForTransform')" type="default" round>待转移客户</el-button>
            <el-button size="small" @click="sousuo('alredyTransform')" type="default" round>已转移客户</el-button>
            <el-button size="small" @click="sousuo('highSeas')" type="default" round>公海客户</el-button>
        </el-row>
        <h3>{{typeName}}</h3>
        <el-table border :data="customerInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
          <el-table-column prop="customerId" label="客户编号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="日志">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="circle-check" @click="readlogs(scope.$index, customerInfo)">查看日志</el-button>
            </template>
          </el-table-column>
          <el-table-column v-if="searchParams==='alredyTransform'" label="状态" prop="proType"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button v-if="customerInfo[scope.$index].c_mean==='意向客户'&&(roles[0]===4||roles[0]===1)&&searchParams!=='highSeas'" size="mini" type="text" @click="handler(scope.$index, customerInfo,'createOrder')">生成订单</el-button>
              <el-button v-if="customerInfo[scope.$index].c_mean==='意向客户'&&(roles[0]===4||roles[0]===1||roles[0]===3)&&searchParams!=='highSeas'" size="mini" type="text" @click="handler(scope.$index, customerInfo,'editDetails')">详细信息</el-button>
              <el-button v-if="customerInfo[scope.$index].c_mean==='意向客户'&&(roles[0]===4||roles[0]===1)&&searchParams!=='highSeas'" size="mini" type="text" @click="handler(scope.$index, customerInfo,'addFollow')">新增跟进</el-button>
              <el-button v-if="customerInfo[scope.$index].c_mean==='意向客户'&&(roles[0]===3||roles[0]===1)&&searchParams!=='highSeas'" size="mini" type="text" @click="handler(scope.$index, customerInfo,'customerOut')">移入公海</el-button>
              <el-button v-if="customerInfo[scope.$index].c_mean==='意向客户'&&(roles[0]===3||roles[0]===1)" size="mini" type="text" @click="handler(scope.$index, customerInfo,'sendOrder')">派单</el-button>
              <el-button v-if="customerInfo[scope.$index].c_mean==='待转移客户'&&roles[0]===3&&searchParams!=='highSeas'" size="mini" type="text" @click="handler(scope.$index, customerInfo,'transformCustomer')">转移客户</el-button>
              <el-button-group v-if="customerInfo[scope.$index].c_mean==='已转移客户'&&(roles[0]===3||roles[0]===1||roles[0]===2)&&searchParams!=='highSeas'">
                <el-button v-for="(button,index) in customerInfo[scope.$index].orderlist" :key="index" size="mini" type="text" @click="handler(scope.$index, customerInfo,'alredyReleased',button.payfor_id)">查看放款订单{{button.payfor_id}}&nbsp;({{button.sellSure==1?'已确认':'未确认'}})</el-button>
              </el-button-group>
              <!-- <el-button v-if="searchParams==='intention'" size="mini" type="text" @click="handler(scope.$index, customerInfo)">更换渠道</el-button> -->
              <!-- <el-button v-if="searchParams==='intention'" size="mini" type="text" @click="handler(scope.$index, customerInfo)">更换渠道</el-button> -->
              <!-- <el-button v-if="searchParams==='intention'" size="mini" type="text" @click="handler(scope.$index, customerInfo)">更换渠道</el-button> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="备注" type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="备注">
                  <pre>{{ props.row.c_bz }}</pre>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column> -->
          <el-table-column prop="c_name" label="客户姓名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column v-if="roles[0]===4||roles[0]===1" prop="c_tel" label="电话" show-overflow-tooltip>
          </el-table-column>
          <el-table-column width="200" label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              <pre>{{customerInfo[scope.$index].c_bz}}</pre>
            </template>
          </el-table-column>
          <el-table-column prop="u_username" label="录入员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="m_addtime" label="录入时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="kf_tel" label="录入员2" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="kf_tel_bz" label="派单备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="who" label="正在跟踪人员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="acceptData" label="开始跟踪时间" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <Pagination :search-params="search" :select="searchParams" :pageInfo="customerPage"></Pagination>
              <!-- 操作 -->
        <el-dialog center title="编辑" :visible.sync="dialogFormVisible" class="genjindialog">
            <el-form :model="dialogInfo" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
              <!-- 新增跟进 -->
              <div v-if="searchParams==='intention'&&(roles[0]===4||roles[0]===1)&&submitType==='addFollow'">
                <el-form-item label="时间" prop="sImg">
                  <el-date-picker
                  size="small"
                    v-model="dialogInfo.date"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="待办事项" prop="sImg">
                  <el-input placeholder="请输入待办事项" size="small" v-model="dialogInfo.follow"></el-input>
                </el-form-item>
              </div>
              <!-- 生成订单 -->
              <div v-if="searchParams==='intention'&&(roles[0]===4||roles[0]===1)&&submitType==='createOrder'">
                  <el-form-item label="业务大类" prop="sImg">
                    <el-select size="small" v-model="dialogInfo.businessBigType" placeholder="请选择业务大类">
                    <el-option value="房贷">房贷</el-option>
                    <el-option value="信贷">信贷</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="业务小类" prop="sImg">
                    <el-select size="small" v-model="dialogInfo.businessSmallType" placeholder="请选择业务小类">
                      <el-option value="放大贷">放大贷</el-option>
                      <el-option value="薪资贷">薪资贷</el-option>
                      <el-option value="小贷">小贷</el-option>
                      <el-option value="车抵贷">车抵贷</el-option>
                      <el-option value="抵押">抵押</el-option>
                      <el-option value="质抵押">质抵押</el-option>
                      <el-option value="垫资">垫资</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="业务需求" prop="sImg">
                  <el-input placeholder="请输入业务需求" size="small" v-model="dialogInfo.businessRequire"></el-input>
                </el-form-item>
                <el-form-item label="渠道" prop="sImg">
                  <el-input placeholder="请输入渠道" size="small" v-model="dialogInfo.way"></el-input>
                </el-form-item>
                <el-form-item label="服务费" prop="tip">
                  <el-input placeholder="请输入服务费" size="small" v-model="dialogInfo.tip"></el-input>
                </el-form-item>
              </div>
              <!-- 派单 -->
              <div v-if="searchParams==='intention'&&(roles[0]===3||roles[0]===1)&&submitType==='sendOrder'">
                  <el-form-item label="派单人员" prop="sImg">
                      <el-radio @change="username(order.u_username)" v-for="(order,index) in ordee" :key="order.u_username" v-model="dialogInfo.u_id" :label="order.u_id">{{order.u_username}}</el-radio>
                  </el-form-item>
                  <el-form-item label="派单备注" prop="sImg">
                     <el-input type="textarea" autosize placeholder="请输入派单备注" v-model="dialogInfo.log_bz"></el-input>
                  </el-form-item>
              </div>
              <!-- 转移客户 -->
              <div v-if="searchParams==='waitForTransform'&&(roles[0]===3)&&submitType==='transformCustomer'">
                  <el-form-item label="派单人员" prop="sImg">
                      <el-radio @change="username(order.u_username)" v-for="(order,index) in riskManager" :key="order.u_username" v-model="dialogInfo.u_id" :label="order.u_id">{{order.u_username}}</el-radio>
                  </el-form-item>
                  <el-form-item label="转移客户备注" prop="sImg">
                     <el-input type="textarea" autosize placeholder="请输入转移客户备注" v-model="dialogInfo.sellerBz"></el-input>
                  </el-form-item>
              </div>
              <!-- 移入公海 -->
              <div v-if="searchParams==='intention'&&(roles[0]===3||roles[0]===1)&&submitType==='customerOut'">
                  <h3><center>确定移入公海吗</center></h3>
              </div>
              <!-- 查看放款订单 -->
              <div v-if="searchParams==='alredyTransform'&&(roles[0]===3||roles[0]===1||roles[0]===2)">
                  <p>客户姓名：{{alreadyReleasedInfo.c_name}}</p>
                  <p>合同编号：{{alreadyReleasedInfo.contractNum}}</p>
                  <p>放款渠道：{{alreadyReleasedInfo.payforChannel}}</p>
                  <p>放款金额：{{alreadyReleasedInfo.payforMoney}}</p>
                  <p>放款时间：{{alreadyReleasedInfo.pay_date}}</p>
                  <p>还款方式：{{alreadyReleasedInfo.paybackWay}}</p>
                  <p>贷款期限：{{alreadyReleasedInfo.limitDate}}</p>
                  <p>风控人员：{{alreadyReleasedInfo.fk_name}}</p>
                  <p>财务确认备注：<pre>{{alreadyReleasedInfo.caiwuBZ}}</pre></p>
                  <p v-if="alreadyReleasedInfo.sellBZ!==''||alreadyReleasedInfo.sellBZ!==null">营销确认备注：<pre>{{alreadyReleasedInfo.sellBZ}}</pre></p>
                  <el-form-item v-if="alreadyReleasedInfo.sellBZ===''||alreadyReleasedInfo.sellBZ===null" label="确认备注" prop="sImg">
                     <el-input type="textarea" autosize placeholder="请输入备注" v-model="dialogInfo.sellBZ"></el-input>
                  </el-form-item>
              </div>
          </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogFormVisible = false;dialogInfo={}">取 消</el-button>
              <el-button size="small" type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 日志 -->
        <el-dialog width="80%" center title="查看日志" :visible.sync="logFormVisible">
          <el-table border :data="logInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="add_time" label="时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="do_what" label="做了什么" show-overflow-tooltip></el-table-column>
            <el-table-column prop="kefu_name" label="营销人员" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-dialog>
   </div>
 </template>

 <script>
import { mapGetters } from "vuex";
import Pagination from "../../components/pagination/customerPagination.vue";
import {
  addFollow, // 新增跟进
  createOrder, // 创建订单
  getOrdee, // 获取派单人员
  sendOrder, // 派单
  customerOut, // 移入公海
  getRiskManager, // 获取风控经理
  transformCustomer, // 转移客户信息
  getOrder, // 获取已放款信息
  readLogs // 获取日志
} from "@/api/customerForm.js";
import { confirm } from "@/api/orderlist.js";

export default {
  data() {
    return {
      loading: false,
      search: {},
      searchParams: "intention",
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      dialogInfo: {},
      dialogFormVisible: false,
      submitType: "",
      ordee: [],
      riskManager: [],
      alreadyReleasedInfo: {},
      logFormVisible: false,
      logInfo: {},
      rules: {
        tip: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value) == false) {
                callback(new Error("服务费只能输入数字"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      typeName:'意向客户'
    };
  },
  computed: {
    ...mapGetters(["customerInfo", "customerPage", "roles"])
  },
  methods: {
    searchFor() {
      /* if (this.search && this.search !== null && this.search !== "") {
      } */
      this.loading = true;
      if (this.search.date && this.search.date.length > 0) {
        if (this.search.date[0] === this.search.date[1]) {
          this.search.startDate = this.search.date[0];
          this.search.endDate = "";
        } else {
          this.search.startDate = this.search.date[0];
          this.search.endDate = this.search.date[1];
        }
      }
      this.search.pageNum = 1;
      this.search.pageSize = 10;
      this.$store.dispatch("SearchCustomerList", this.search).then(result => {
        this.loading = false;
      });
    },
    sousuo(type) {
      switch (type) {
        case "intention":
          this.searchParams = "intention";
          this.typeName = '意向客户'
          break;
        case "waitForTransform":
          this.searchParams = "waitForTransform";
          this.typeName = '待转移客户'
          break;
        case "alredyTransform":
          this.searchParams = "alredyTransform";
          this.typeName = '已转移客户'
          break;
        case "customerOut":
          this.searchParams = "customerOut";
          break;
        case "transformCustomer":
          this.searchParams = "transformCustomer";
          break;
        case "highSeas":
          this.searchParams = "highSeas";
          this.typeName = '公海客户'
          break;
      }
      this.$store
        .dispatch("GetCustomerList", {
          pageInfo: {
            pageSize: 10,
            pageNum: 1
          },
          type
        })
        .then(result => {
          this.search = {};
        });
    },
    // 点击操作按钮
    handler(index, rows, type, id) {
      switch (type) {
        // 新增跟进
        case "addFollow":
          this.searchParams = "intention";
          this.submitType = "addFollow";
          this.dialogInfo = {
            c_name: rows[index].c_name,
            customerId: rows[index].customerId
          };
          break;
        case "createOrder":
          this.searchParams = "intention";
          this.submitType = "createOrder";
          this.dialogInfo = {
            c_name: rows[index].c_name,
            customerId: rows[index].customerId,
            c_tel: rows[index].c_tel
          };
          break;
        case "editDetails":
          this.searchParams = "intention";
          if (
            this.$store.getters.roles[0] === 1 ||
            this.$store.getters.roles[0] === 4
          ) {
            this.$router.push({
              /* path: "/customerManagement/customerDetails",
            query: { tel: rows[index].c_tel } */
              name: "customerDetails",
              params: { tel: rows[index].c_tel }
            });
          } else {
            this.$router.push({
              /* path: "/customerManagement/customerDetails",
            query: { tel: rows[index].c_tel } */
              name: "customerDetails",
              params: { id: rows[index].customerId }
            });
          }

          break;
        case "sendOrder":
          this.searchParams = "intention";
          getOrdee().then(result => {
            this.ordee = result.data;
          });
          this.submitType = "sendOrder";
          this.dialogInfo = {
            c_name: rows[index].c_name,
            customerId: rows[index].customerId
          };
          break;
        case "customerOut":
          this.searchParams = "intention";
          this.submitType = "customerOut";
          this.dialogInfo = {
            c_name: rows[index].c_name,
            customerId: rows[index].customerId
          };
          break;
        case "transformCustomer":
          this.searchParams = "waitForTransform";
          getRiskManager().then(result => {
            this.riskManager = result.data;
          });
          this.submitType = "transformCustomer";
          this.dialogInfo = {
            c_name: rows[index].c_name,
            customerId: rows[index].customerId
          };
          break;
        case "alredyReleased":
          this.searchParams = "alredyTransform";
          this.submitType = "alredyReleased";
          getOrder({
            payfor_id: id,
            customerId: rows[index].customerId
          }).then(result => {
            this.alreadyReleasedInfo = result.data;
            this.alreadyReleasedInfo.c_name = rows[index].c_name;
          });
          this.dialogInfo = {
            payfor_id: id,
            customerId: rows[index].customerId
          };
          break;
      }
      this.dialogFormVisible = true;
    },
    submit() {
      switch (this.submitType) {
        // 意向客户中新增跟进
        case "addFollow":
          addFollow(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}给客户${this.dialogInfo.c_name}添加跟进`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetCustomerList", {
              pageInfo: this.$store.getters.customerPage,
              type: "intention"
            });
          });
          break;
        case "createOrder":
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              createOrder(this.dialogInfo).then(result => {
                this.$socket.emit("message", {
                  to: result.superior,
                  msg: `${this.$store.getters.name}给客户${this.dialogInfo
                    .c_name}生成订单`
                });
                this.dialogInfo = {};
                this.dialogFormVisible = false;
                this.$store.dispatch("GetCustomerList", {
                  pageInfo: this.$store.getters.customerPage,
                  type: "intention"
                });
              });
            } else {
              this.$message({
                type: "warning",
                message: "请验证填写信息是否有误!"
              });
            }
          });

          break;
        case "sendOrder":
          sendOrder(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}把客户${this.dialogInfo.c_name}派给了你`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetCustomerList", {
              pageInfo: this.$store.getters.customerPage,
              type: "intention"
            });
          });
          break;
        case "customerOut":
          customerOut(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}把客户${this.dialogInfo.c_name}移入公海`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetCustomerList", {
              pageInfo: this.$store.getters.customerPage,
              type: "intention"
            });
          });
          break;
        case "transformCustomer":
          transformCustomer(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}把客户${this.dialogInfo
                .c_name}转移给了你`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetCustomerList", {
              pageInfo: this.$store.getters.customerPage,
              type: "intention"
            });
          });
          break;
        case "alredyReleased":
          confirm(this.dialogInfo).then(result => {
            for (let index = 0; index < result.superior.length; index++) {
              this.$socket.emit("message", {
                to: result.superior[index],
                msg: `${this.$store.getters.name}确认了客户${this.dialogInfo
                  .c_name}的服务费`
              });
            }
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetCustomerList", {
              pageInfo: this.$store.getters.customerPage,
              type: "alredyTransform"
            });
          });
          break;
      }
    },
    username(name) {
      this.dialogInfo.u_username = name;
      console.log(this.dialogInfo);
    },
    readlogs(index, rows) {
      readLogs({ customerId: rows[index].customerId }).then(result => {
        this.logInfo = result.data.list;
        this.logFormVisible = true;
      });
    }
  },
  components: {
    Pagination
  },
  created() {
    if (!this.$store.getters.customerInfo) {
      if (!this.$store.getters.customerPage) {
        this.$store.dispatch("GetCustomerList", {
          pageInfo: { pageSize: 10, pageNum: 1 },
          type: "intention"
        });
      } else {
        this.$store.dispatch("GetCustomerList", {
          pageInfo: this.$store.getters.customerPage,
          type: "intention"
        });
      }
    }
  }
};
</script>

 <style lang="scss">
.dr-datatable {
  margin-bottom: 1em;
}
.searchInput {
  width: 300px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-dialog {
  width: 100vw;
}
</style>
