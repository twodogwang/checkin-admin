<template>
  <div class="app-container">
     <el-row class="dr-datatable" justify="center">
       <el-col :xs="24" :md="24">
          <el-form :model="formState" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="sImg">
              <el-input size="small" v-model="formState.c_name"></el-input>
            </el-form-item>
            <el-form-item label="身份类型" prop="sImg">
              <el-radio v-model="formState.c_lx" label="1">法人</el-radio>
              <el-radio v-model="formState.c_lx" label="0">上班族</el-radio>
            </el-form-item>
            <el-form-item label="身份证" prop="sImg">
              <el-input size="small" v-model="formState.c_number"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="c_tel">
              <el-input size="small" v-model="formState.c_tel"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sImg">
              <el-radio v-model="formState.c_sex" label="1">男</el-radio>
              <el-radio v-model="formState.c_sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="所在户籍" prop="sImg">
              <el-cascader placeholder="请选择户籍地" size="small" :options="options" v-model="formState.selectedHJ" @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="年龄" prop="sImg">
              <el-input size="small" v-model="formState.c_age"></el-input>
            </el-form-item>
            <el-form-item label="客户意向阶段" prop="sImg">
              <el-select size="small" v-model="formState.c_mean" placeholder="请选择">
                  <el-option value="意向客户">意向客户</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="sImg">
              <el-input autosize type="textarea" placeholder="请尽量描述客户资质、突出问题等信息。" size="small" v-model="formState.c_bz"></el-input>
            </el-form-item>
            <el-form-item class="dr-submitContent">
              <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button size="small" @click="formState={}">重置</el-button>
            </el-form-item>
          </el-form>
       </el-col>
     </el-row>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { addCustomer } from "@/api/customer.js";

export default {
  data() {
    return {
      options: regionData,
      formState: {},
      rules: {
        c_tel: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (/^\d+$/.test(value) == false) {
                callback(new Error("电话不能为空并且只能输入数字"));
              } else {
                callback();
              }
            }
          },
          { min: 11, max: 11, message: "电话必须为11位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleChange(code) {
      this.formState.c_hj = [
        CodeToText[code[0]],
        CodeToText[code[1]],
        CodeToText[code[2]]
      ];
    },
    submitForm(form) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          addCustomer(this.formState).then(result => {
            if (result.code === 20000) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$socket.emit("message", {
                to: result.superior,
                msg: `${this.$store.getters.name}添加了新客户：${this.formState
                  .c_name}`
              });
              this.formState = {};
            }
          });
        } else {
          this.$message({
                type: "warning",
                message: "请验证填写信息是否有误!"
              });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dr-datatable {
  margin-bottom: 1em;
}
</style>
