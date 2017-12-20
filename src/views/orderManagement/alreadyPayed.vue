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
      </el-row>
      <el-table border :data="orderInfo" align="center" v-loading="loading" ref="multipleTable" tooltip-effect="dark" style="width: 100%" >
          <el-table-column label="日志">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="circle-check" @click="readlogs(scope.$index, orderInfo)">查看日志</el-button>
              <br>
              <el-button size="mini" type="text" icon="circle-check" @click="readnotes(scope.$index, orderInfo)">查看备注</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="payfor_id" label="序号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="proNum" label="合同编号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="customerName" label="客户姓名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="businessBigType" label="业务大类" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="businessSmallType" label="业务小类" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="businessRequire" label="业务需求" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="lr_renyuan" label="录入人员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fk_name" label="风控人员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="proNewdata" label="订单生成日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="acceptData" label="接单日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="pay_date" label="放款日期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="payforChannel" label="放款渠道" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="payforMoney" label="放款金额" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tip" label="服务费" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="paybackPoint" label="返点" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="paybackWay" label="还款方式" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="limitDate" label="贷款期限" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="dabaoBZ" label="风控备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="caiwuBZ" label="财务备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sellBZ" label="前台备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="lookBZ" label="监督备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="确认" width="110px">
              <template slot-scope="scope">
              <el-button type="text" size="mini" icon="circle-check" @click="confirm(scope.$index, orderInfo)">确认</el-button>
              <el-button type="text" v-if="roles[0]===5" size="mini" icon="circle-check" @click="financialConfirm(scope.$index, orderInfo)">服务费确认</el-button>
            </template>
          </el-table-column>
      </el-table>
      <Pagination @changeOrderInfo="changeOrderInfo" :search-params="search" :pageInfo="orderPage"></Pagination>
      <!-- 日志 -->
        <el-dialog width="80%" :title='logtitle' :visible.sync="logFormVisible">
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
        <!-- 确认 -->
        <el-dialog status-icon width="80%" center title="确认备注" :visible.sync="dialogFormVisible">
            <el-form :model="dialogInfo" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="备注" prop="affirmBz">
                    <el-input type="textarea" placeholder="请输入备注" size="small" v-model="dialogInfo.affirmBz"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="submit('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { getorderlist } from "@/api/orderlist.js";
import { mapGetters } from "vuex";
import Pagination from "../../components/pagination/alreadyPayed.vue";
import {
  readNotes,
  readLogs,
  confirm,
  searchpayfororderlist
} from "@/api/orderlist.js";

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
      orderInfo: [],
      orderPage: {},
      loading: true,
      logInfo: [],
      logtitle: "",
      logFormVisible: false,
      rules: {
        affirmBz: { required: true, message: "备注不能为空", trigger: "blur" }
      },
      dialogInfo: {},
      dialogFormVisible: false
    };
  },
  methods: {
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
      searchpayfororderlist(this.search).then(result => {
        this.loading = false;
        this.orderInfo = result.data.list;
        this.orderPage = {
          totalItems: result.data.totalItems,
          pageNum: result.data.pageNum,
          pageSize: result.data.pageSize
        };
      });
    },
    changeOrderInfo(result) {
      this.orderInfo = result.data;
      // this.$nextTick(function() {
      this.orderPage = result.page;
      // console.log(this.orderPage, result.page);
      // });
    },
    readlogs(index, rows) {
      readLogs({ id: rows[index].id }).then(result => {
        this.logtitle = `客户${result.data.list[0].c_name}跟踪日志`;
        this.logInfo = result.data.list;
        this.logFormVisible = true;
      });
    },
    readnotes(index, rows) {
      readNotes({ customerId: rows[index].customerId }).then(result =>
        this.$alert(`<pre>${result.c_bz}</pre>`, "备注", {
          dangerouslyUseHTMLString: true
        })
      );
    },
    ifsignFormatter(row, column, cellValue) {
      switch (cellValue) {
        case "1":
          return "是";
        case "0":
          return "否";
      }
    },
    confirm(index, rows) {
      this.dialogInfo = {
        payfor_id: rows[index].payfor_id
      };
      this.dialogFormVisible = true;
    },
    financialConfirm(index, rows) {
      this.dialogInfo = {
        payfor_id: rows[index].payfor_id,
        affirmType: 1
      };
      this.dialogFormVisible = true;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          confirm(this.dialogInfo).then(result => {
            if (result.superior) {
              this.$socket.emit("message", {
                to: result.superior,
                msg: result.message
              });
            }
            this.dialogInfo = {};
            this.dialogFormVisible = false;
            getorderlist(
              {
                pageNum: this.orderPage.pageNum,
                pageSize: this.orderPage.pageSize
              },
              "alredyReleased"
            ).then(result => {
              this.orderInfo = result.data.list;
              this.orderPage = {
                pageNum: result.data.pageNum,
                pageSize: result.data.pageSize,
                totalItems: result.data.totalItems
              };
              this.loading = false;
            });
          });
        } else {
          this.$message("请检查表单信息");
          return false;
        }
      });
    }
  },
  components: { Pagination },
  computed: { ...mapGetters(["roles"]) },
  mounted() {
    getorderlist(
      { pageNum: 1, pageSize: 10 },
      "alredyReleased"
    ).then(result => {
      this.orderInfo = result.data.list;
      this.orderPage = {
        pageNum: result.data.pageNum,
        pageSize: result.data.pageSize,
        totalItems: result.data.totalItems
      };
      this.loading = false;
    });
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
}
</style>
