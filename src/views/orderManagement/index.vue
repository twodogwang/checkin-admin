<template>
  <div class="app-container">
      <el-row class="dr-datatable" justify="center">
          <el-input size="small" class="searchInput" placeholder="客户名称、电话、录入员" v-model="search.searchString">
              <template slot="prepend">综合搜索</template>
              <el-button slot="append" icon="el-icon-search" @click="searchFor"></el-button>
          </el-input>
          <span class="type">业务大类</span>
          <el-select size="small" v-model="search.searchBigType">
              <el-option value="信贷" label="信贷">信贷</el-option>
              <el-option value="房贷" label="房贷">房贷</el-option>
          </el-select>
          <span class="type">业务小类</span>
          <el-select size="small" v-model="search.searchSmallType">
                <el-option value="放大贷">放大贷</el-option>
                <el-option value="薪资贷">薪资贷</el-option>
                <el-option value="小贷">小贷</el-option>
                <el-option value="车抵贷">车抵贷</el-option>
                <el-option value="抵押">抵押</el-option>
                <el-option value="质抵">质抵</el-option>
                <el-option value="垫资">垫资</el-option>
          </el-select>
      </el-row>
      <el-row class="dr-datatable" justify="center">
          <el-date-picker
            size="small"
                v-model="search.date"
                type="daterange"
                 align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
          </el-date-picker>
          <!-- <el-button size="small" @click="searchFor" type="primary">搜索</el-button> -->
      </el-row>
      <el-row class="dr-datatable" justify="center">
            <el-button slot="append" icon="el-icon-search" @click="searchFor"></el-button>
            <el-button v-if="roles[0]===1||roles[0]===2||roles[0]===6" size="small" @click="sousuo('unreceived')" type="default" round>待接收订单</el-button>

            <el-button size="small" @click="sousuo('handling')" type="default" round>跟进中订单</el-button>

            <el-button size="small" @click="sousuo('reprieve')" type="default" round>暂缓订单</el-button>
            <el-button size="small" @click="sousuo('chargeBack')" type="default" round>退单订单</el-button>
            <el-button size="small" @click="sousuo('approval')" type="default" round>审批中订单</el-button>
            <el-button size="small" @click="sousuo('all')" type="default" round>全部订单</el-button>
            <el-button size="small" @click="sousuo('alreadyReleased')" type="default" round>已放款订单</el-button>
            <el-button size="small" @click="sousuo('finished')" type="default" round>已完成订单</el-button>
        </el-row>
      <h3>{{typeName}}</h3>
      <el-table border :data="orderInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
          <el-table-column label="日志" >
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="circle-check" @click="readlogs(scope.$index, orderInfo)">查看日志</el-button>
              <br><el-button size="mini" type="text" icon="circle-check" @click="readnotes(scope.$index, orderInfo)">查看备注</el-button>
              <br><el-button size="mini" type="text" icon="circle-check" @click="readdetails(scope.$index, orderInfo)">查看详细信息</el-button>
              <br><el-button v-if="roles[0]===7" size="mini" type="text" icon="circle-check" @click="writelogs(scope.$index, orderInfo)">填写日志</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button v-if="searchParams!=='alredyReleased'&&roles[0]===7" size="mini" type="text" @click="changeway(scope.$index, orderInfo)">更换渠道</el-button>
              <br><el-button v-if="searchParams!=='alredyReleased'&&(roles[0]===7||roles[0]===6)" size="mini" type="text" @click="changestate(scope.$index, orderInfo)">更换生产状态</el-button>
              <br><el-button v-if="roles[0]===6" size="mini" type="text" @click="changepeople(scope.$index, orderInfo)">移交</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="序号" show-overflow-tooltip width="55">
          </el-table-column>
          <!-- <el-table-column prop="proNum" label="合同编号" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="customerName" label="客户姓名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="客户电话" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showPhoneNum(scope.$index, orderInfo)">显示电话</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="businessBigType" label="业务大类" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="businessSmallType" label="业务小类" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="businessRequire" label="业务需求" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="way" label="渠道" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tip" label="服务费" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="lr_renyuan" label="录入人员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fk_name" label="风控人员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="proType" label="生产状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="proNewdata" label="订单生成日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="acceptData" label="接单日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="lastUpdate" label="最新更新日期" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <Pagination :search-params="search" :select="searchParams" :pageInfo="orderPage"></Pagination>
        <!-- 操作 -->
        <el-dialog center :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="dialogInfo" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
              <el-form-item v-if="title=='更换渠道'" label="输入渠道" prop="sImg">
                <el-input placeholder="输入渠道" size="small" v-model="dialogInfo.way"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='更换生产状态'" label="生产状态" prop="sImg">
                <el-select size="small" v-model="dialogInfo.proType" placeholder="请选择生产状态">
                  <el-option value="审批中">审批中</el-option>
                  <el-option value="暂缓">暂缓</el-option>
                  <el-option value="已放款">已放款</el-option>
                  <el-option value="退单">退单</el-option>
                  <el-option value="已完成">已完成</el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="dialogInfo.proType=='已放款'&&title=='更换生产状态'" label="放款渠道" prop="sImg">
                <el-input placeholder="" size="small" v-model="dialogInfo.payforChannel"></el-input>
              </el-form-item>
              <el-form-item v-if="dialogInfo.proType=='已放款'&&title=='更换生产状态'" label="放款金额" prop="sImg">
                <el-input placeholder="" size="small" v-model="dialogInfo.payforMoney"></el-input>
              </el-form-item>
              <el-form-item v-if="dialogInfo.proType=='已放款'&&title=='更换生产状态'" label="还款方式" prop="sImg">
                <el-input placeholder="" size="small" v-model="dialogInfo.paybackWay"></el-input>
              </el-form-item>
              <el-form-item v-if="dialogInfo.proType=='已放款'&&title=='更换生产状态'" label="贷款期限" prop="sImg">
                <el-input placeholder="" size="small" v-model="dialogInfo.limitDate"></el-input>
              </el-form-item>
              <el-form-item v-if="dialogInfo.proType=='已放款'&&title=='更换生产状态'" label="返点" prop="sImg">
                <el-input placeholder="" size="small" v-model="dialogInfo.paybackPoint"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='移交'" label="移交" prop="sImg">
                <el-radio @change="username(item.u_username)" v-for="(item,index) in fkInfo" v-model="dialogInfo.fk_id" :key="index" :label="item.u_id">{{item.u_username}}</el-radio>
              </el-form-item>
              <el-form-item v-if="dialogInfo.proType=='退单'&&title=='更换生产状态'" label="备注" prop="sImg">
                <el-input type="textarea" placeholder="请输入备注" size="small" v-model="dialogInfo.c_bz"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='移交'" label="备注" prop="sImg">
                <el-input type="textarea" placeholder="请输入备注" size="small" v-model="dialogInfo.c_bz"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'" label="客户姓名" prop="sImg">
                <el-input placeholder="请输入客户姓名" size="small" v-model="dialogInfo.c_name"></el-input>
              </el-form-item>
              <!-- <el-form-item v-if="title=='填写日志'" label="风控专员" prop="sImg">
                <el-input type="textarea" placeholder="请输入风控专员" size="small" v-model="dialogInfo.meet_time"></el-input>
              </el-form-item> -->
              <el-form-item v-if="title=='填写日志'" label="双方见面时间" prop="sImg">
                <el-input placeholder="请输入双方见面时间" size="small" v-model="dialogInfo.meet_time"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'" label="客户需求批贷额度" prop="sImg">
                <el-input placeholder="请输入客户需求批贷额度" size="small" v-model="dialogInfo.need_ed"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'" label="是否签单" prop="sImg">
                <el-radio v-model="dialogInfo.if_sign" :label="1">是</el-radio>
                <el-radio v-model="dialogInfo.if_sign" :label="0">否</el-radio>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'&&dialogInfo.if_sign===0" label="没有签单的原因" prop="sImg">
                <el-input type="textarea" placeholder="请输入没有签单的原因" size="small" v-model="dialogInfo.not_reason"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'&&dialogInfo.if_sign===1" label="签单合同编号" prop="sImg">
                <el-input placeholder="请输入签单合同编号" size="small" v-model="dialogInfo.case_number"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'&&dialogInfo.if_sign===1" label="合同扫描件">
                <el-upload
                name="case_file"
                :data="dialogInfo"
                  class="upload-demo"
                  ref="upload"
                  :headers="token"
                  action="http://192.168.1.200:28888/order/writeLog"
                  :file-list="fileList"
                  :on-success="onsuccess"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'&&dialogInfo.if_sign===1" label="服务费点位" prop="tip">
                <el-input placeholder="请输入服务费点位" size="small" v-model="dialogInfo.tip"></el-input>
              </el-form-item>
              <el-form-item v-if="title=='填写日志'" label="备注" prop="sImg">
                <el-input type="textarea" placeholder="请输入备注" size="small" v-model="dialogInfo.log_beizhu"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogFormVisible = false;dialogInfo={}">取 消</el-button>
              <el-button size="small" type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 日志 -->
        <el-dialog width="80%" center title="查看日志" :visible.sync="logFormVisible">
          <el-table border :data="logInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="c_name" label="客户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fk_name" label="风控专员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="meet_time" label="双方见面时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="need_ed" label="客户需求批贷额度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="if_sign" :formatter="ifsignFormatter" label="是否签单" show-overflow-tooltip></el-table-column>
            <el-table-column prop="not_reason" label="没有签单的原因" show-overflow-tooltip></el-table-column>
            <el-table-column prop="case_number" label="签单合同编号" show-overflow-tooltip></el-table-column>
            <el-table-column label="合同扫描件">
              <template slot-scope="scope">
                <img @click="enlargePic(logInfo[scope.$index].case_file)" :src="logInfo[scope.$index].case_file" :alt="logInfo[scope.$index].case_file" width="100%">
              </template>
            </el-table-column>
            <el-table-column prop="tip" label="服务费点位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="log_beizhu" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="addtime" label="填写时间" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-dialog>
  </div>
</template>

<script>
import Pagination from "../../components/pagination/orderlistPagination.vue";
import { mapGetters } from "vuex";
import {
  getRisker,
  transformOrder,
  changeProType,
  changeChannel,
  writeLog,
  readNotes,
  readLogs,
  getPhoneNum
} from "@/api/orderlist.js";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      search: {},
      loading: false,
      searchParams: "all",
      dialogFormVisible: false,
      logFormVisible: false,
      title: "",
      dialogInfo: {},
      fkInfo: [],
      fileList: [],
      token: {},
      logInfo: [],
      typeName: "全部订单",
      rules: {
        tip: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value) == false) {
                callback(new Error("点位只能输入数字或小数"));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  components: {
    Pagination
  },
  methods: {
    readnotes(index, rows) {
      readNotes({ customerId: rows[index].customerId }).then(result =>
        this.$alert(`<pre>${result.c_bz}</pre>`, "备注", {
          dangerouslyUseHTMLString: true
        })
      );
    },
    readlogs(index, rows) {
      readLogs({ id: rows[index].id }).then(result => {
        this.logInfo = result.data.list;
        this.logFormVisible = true;
      });
    },
    readdetails(index, rows) {
      this.$router.push({
        name: "customerDetails",
        params: { id: rows[index].customerId }
      });
    },
    changeway(index, rows) {
      this.dialogFormVisible = true;
      this.title = "更换渠道";
      this.dialogInfo = {
        c_name: rows[index].customerName,
        customerId: rows[index].customerId,
        id: rows[index].id
      };
    },
    changestate(index, rows) {
      this.dialogFormVisible = true;
      this.title = "更换生产状态";
      this.dialogInfo = {
        c_name: rows[index].customerName,
        customerId: rows[index].customerId,
        id: rows[index].id
      };
    },
    changepeople(index, rows) {
      this.dialogFormVisible = true;
      this.title = "移交";
      getRisker().then(result => {
        this.fkInfo = result.data;
      });
      this.dialogInfo = {
        c_name: rows[index].customerName,
        customerId: rows[index].customerId,
        id: rows[index].id
      };
    },
    writelogs(index, rows) {
      this.dialogFormVisible = true;
      this.title = "填写日志";
      this.token = {
        "X-Token": getToken()
      };
      this.dialogInfo = {
        c_name: rows[index].customerName,
        customerId: rows[index].customerId,
        id: rows[index].id
      };
    },
    ifsignFormatter(row, column, cellValue) {
      switch (cellValue) {
        case "1":
          return "是";
        case "0":
          return "否";
      }
    },
    submit() {
      switch (this.title) {
        case "移交":
          transformOrder(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}把${this.dialogInfo
                .c_name}客户的订单移交给了你`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetOrderList", {
              pageInfo: this.$store.getters.orderPage,
              type: this.searchParams
            });
          });
          break;
        case "更换生产状态":
          changeProType(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}把${this.dialogInfo
                .c_name}客户的订单状态修改为${this.dialogInfo.proType}`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetOrderList", {
              pageInfo: this.$store.getters.orderPage,
              type: this.searchParams
            });
          });
          break;
        case "更换渠道":
          changeChannel(this.dialogInfo).then(result => {
            this.$socket.emit("message", {
              to: result.superior,
              msg: `${this.$store.getters.name}把${this.dialogInfo
                .c_name}客户的订单渠道修改为${this.dialogInfo.way}`
            });
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            this.$store.dispatch("GetOrderList", {
              pageInfo: this.$store.getters.orderPage,
              type: this.searchParams
            });
          });
          break;
        case "填写日志":
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              if (this.dialogInfo.if_sign === 1) {
                this.$refs.upload.submit();
              } else {
                writeLog(this.dialogInfo).then(result => {
                  this.$socket.emit("message", {
                    to: result.superior,
                    msg: `${this.$store.getters.name}为${this.dialogInfo
                      .c_name}客户新增了日志`
                  });
                  this.dialogInfo = {};
                  this.dialogFormVisible = false;
                  this.$store.dispatch("GetOrderList", {
                    pageInfo: this.$store.getters.orderPage,
                    type: this.searchParams
                  });
                });
              }
            } else {
              this.$message({
                type: "warning",
                message: "请验证填写信息是否有误!"
              });
            }
          });
          break;
      }
    },
    sousuo(type) {
      switch (type) {
        case "unreceived":
          this.searchParams = "unreceived";
          this.typeName = "待接收订单";
          break;
        case "handling":
          this.searchParams = "handling";
          this.typeName = "跟进中订单";
          break;
        case "reprieve":
          this.searchParams = "reprieve";
          this.typeName = "暂缓订单";
          break;
        case "chargeBack":
          this.searchParams = "chargeBack";
          this.typeName = "退单订单";
          break;
        case "approval":
          this.searchParams = "chargeBack";
          this.typeName = "审批中订单";
          break;
        case "all":
          this.searchParams = "all";
          this.typeName = "全部订单";
          break;
        case "alreadyReleased":
          this.$router.push("/orderManagement/alreadyReleasedOrder");
          break;
        case "finished":
          this.searchParams = "finished";
          this.typeName = "已完成订单";
          break;
      }
      this.$store
        .dispatch("GetOrderList", {
          pageInfo: {
            pageNum: 1,
            pageSize: 10
          },
          type
        })
        .then(result => {
          this.search = {};
        });
    },
    searchFor() {
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
      this.$store.dispatch("SearchOrderList", this.search).then(result => {
        this.loading = false;
      });
    },
    username(name) {
      this.dialogInfo.u_username = name;
    },
    showPhoneNum(index, rows) {
      getPhoneNum({ customerId: rows[index].customerId }).then(result => {
        this.$alert(result.data, "客户电话", {
          confirmButtonText: "确认"
        });
      });
    },
    onsuccess(res, file, filelist) {
      if (res.code === 20000) {
        this.$socket.emit("message", {
          to: res.superior,
          msg: `${this.$store.getters.name}为${this.dialogInfo.c_name}客户新增了日志`
        });
        this.dialogInfo = {};
        this.$refs.upload.clearFiles();
        this.logFormVisible = false;
      }
    },
    enlargePic(picUrl) {
      this.$alert(
        `<img src="${picUrl}" width="100%" alt="${picUrl}">`,
        "合同扫描件",
        {
          confirmButtonText: "确定",
          dangerouslyUseHTMLString: true
        }
      );
    }
  },
  computed: {
    ...mapGetters(["orderInfo", "orderPage", "roles"])
  },
  beforeCreate() {
    if (!this.$store.getters.orderPage) {
      this.$store
        .dispatch("GetOrderList", {
          pageInfo: {
            pageSize: 10,
            pageNum: 1
          },
          type: "all"
        })
        .then(() => {
          this.loading = false;
        });
    } else {
      this.$store
        .dispatch("GetOrderList", {
          pageInfo: {
            pageSize: this.$store.getters.orderPage.pageSize,
            pageNum: this.$store.getters.orderPage.pageNum
          },
          type: "all"
        })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.dr-datatable {
  margin-bottom: 1em;
}
.searchInput {
  width: 350px;
}
.type {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
