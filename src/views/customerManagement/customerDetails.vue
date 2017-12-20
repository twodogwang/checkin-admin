<template>
  <div class="app-container">
      <el-input placeholder="请输入手机" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchFor"></el-button>
      </el-input>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="first">
            <el-form :model="personalInfo" :rules="PersonalRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="sImg">
                <el-input size="small" v-model="personalInfo.c_name"></el-input>
                </el-form-item>
                <el-form-item label="身份类型" prop="sImg">
                <el-radio v-model="personalInfo.c_lx" label="1">法人</el-radio>
                <el-radio v-model="personalInfo.c_lx" label="0">上班族</el-radio>
                </el-form-item>
                <el-form-item label="身份证" prop="sImg">
                <el-input size="small" v-model="personalInfo.c_number"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="sImg">
                <el-input disabled="disabled" size="small" v-model="personalInfo.c_tel"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sImg">
                <el-radio v-model="personalInfo.c_sex" label="1">男</el-radio>
                <el-radio v-model="personalInfo.c_sex" label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="所在户籍" prop="sImg">
                <el-cascader placeholder="请选择户籍地" size="small" :options="options" v-model="personalInfo.selectedHJ" @change="handleChange">
                </el-cascader>
                </el-form-item>
                <el-form-item label="年龄" prop="sImg">
                <el-input size="small" v-model="personalInfo.c_age"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_xl" placeholder="请选择">
                    <el-option label="本科以下" value="0">本科以下</el-option>
                    <el-option label="本科" value="1">本科</el-option>
                    <el-option label="硕士" value="2">硕士</el-option>
                    <el-option label="硕士以上" value="3">硕士以上</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="客户意向阶段" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_mean" placeholder="请选择">
                    <el-option value="意向客户">意向客户</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="婚姻情况" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_hyqk" placeholder="请选择">
                    <el-option value="单身">单身</el-option>
                    <el-option value="已婚">已婚</el-option>
                    <el-option value="离异">离异</el-option>
                    <el-option value="丧偶">丧偶</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="征信情况" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_zxqk" placeholder="请选择">
                    <el-option label="良好" value="1">良好</el-option>
                    <el-option label="一般" value="2">一般</el-option>
                    <el-option label="较差" value="3">较差</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="征信查询次数" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_zxcxcs" placeholder="请选择">
                    <el-option label="半个月一次" :value="1">半个月一次</el-option>
                    <el-option label="半个月内两次" :value="2">半个月内两次</el-option>
                    <el-option label="两个月三次" :value="3">两个月三次</el-option>
                    <el-option label="两个月四次" :value="4">两个月四次</el-option>
                    <el-option label="半年九次" :value="5">半年九次</el-option>
                    <el-option label="半年七次" :value="6">半年七次</el-option>
                    <el-option label="两个月四次半年九次" :value="7">两个月四次半年九次</el-option>
                    <el-option label="一个月四两个月六次" :value="8">一个月四两个月六次</el-option>
                    <el-option label="无要求" :value="9" selected>无要求</el-option>
                    <el-option label="两个月五次" :value="10">两个月五次</el-option>
                    <el-option label="两个月不超4半年不超14次" :value="12">两个月不超4半年不超14次</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="有无微粒贷" prop="sImg">
                <el-radio v-model="personalInfo.c_wld" label="1">有</el-radio>
                <el-radio v-model="personalInfo.c_wld" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_wld==1" label="微粒贷总额度" prop="sImg">
                <el-input size="small" v-model="personalInfo.wl_zed"></el-input>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_wld==1" label="已使用额度" prop="sImg">
                <el-input size="small" v-model="personalInfo.wl_ysyed"></el-input>
                </el-form-item>
                <el-form-item label="是否做过贷款" prop="sImg">
                    <el-radio v-model="personalInfo.c_sfzgdk" label="1">有</el-radio>
                    <el-radio v-model="personalInfo.c_sfzgdk" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_sfzgdk==1" label="放款机构">
                    <el-checkbox-group v-model="personalInfo.sfzgdk_fkjg">
                    <el-checkbox v-for="(item,index) in fkjg" :key="index" :label="index+1">
                    {{item}}
                    </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_sfzgdk==1" label="放款时间">
                    <el-radio v-for="(item,index) in 12" :key="index" :label="index+1" v-model="personalInfo.tx_fk_time">{{index+1}}个月</el-radio>
                </el-form-item>
                <el-form-item label="在征信上是否有体现" prop="sImg">
                <el-radio v-model="personalInfo.c_lx" label="1">有</el-radio>
                <el-radio v-model="personalInfo.c_lx" label="0">无</el-radio>
                </el-form-item>
                <el-form-item label="是否本地征信" prop="sImg">
                <el-radio v-model="personalInfo.c_bdzx" label="1">是</el-radio>
                <el-radio v-model="personalInfo.c_bdzx" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="征信情况" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_yqcs" placeholder="请选择">
                    <el-option label="两年内小于四次" :value="0">两年内小于四次</el-option>
                    <el-option label="一年小于三次" :value="1">一年小于三次</el-option>
                    <el-option label="半年内小于二次及两个一" :value="2">半年内小于二次及两个一</el-option>
                    <el-option label="当前不能有一次" :value="3">当前不能有一次</el-option>
                    <el-option label="无逾期" :value="4">无逾期</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="有无当前逾期" prop="sImg">
                <el-radio v-model="personalInfo.c_ywdqyq" label="1">有</el-radio>
                <el-radio v-model="personalInfo.c_ywdqyq" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_ywdqyq==1" label="逾期额度" prop="sImg">
                <el-radio v-model="personalInfo.c_yqed" label="1">一千以上</el-radio>
                <el-radio v-model="personalInfo.c_yqed" label="2">一千以下</el-radio>
                <el-radio v-model="personalInfo.c_yqed" label="3">一千以上一万以内</el-radio>
                </el-form-item>
                <el-form-item label="是否白户" prop="sImg">
                <el-radio v-model="personalInfo.c_ifbh" label="1">是</el-radio>
                <el-radio v-model="personalInfo.c_ifbh" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="额度" prop="sImg">
                <el-input size="small" v-model="personalInfo.c_ed"></el-input>
                </el-form-item>
                <el-form-item label="商业保险" prop="sImg">
                <el-radio v-model="personalInfo.c_sybx" label="1">有</el-radio>
                <el-radio v-model="personalInfo.c_sybx" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_sybx==1" label="商业保险分数" prop="sImg">
                <el-input size="small" v-model="personalInfo.c_fs"></el-input>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_sybx==1" label="保险公司">
                    <el-checkbox-group v-model="personalInfo.c_bxgs">
                    <el-checkbox v-for="(item,index) in bxgs" :key="index" :label="index+1">
                    {{item}}
                    </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_sybx==1" label="缴费次数">
                <el-radio v-model="personalInfo.c_jfcs" label="1">四年五次</el-radio>
                <el-radio v-model="personalInfo.c_jfcs" label="2">三年四次</el-radio>
                <el-radio v-model="personalInfo.c_jfcs" label="3">两年三次</el-radio>
                <el-radio v-model="personalInfo.c_jfcs" label="4">一年两次</el-radio>
                <el-radio v-model="personalInfo.c_jfcs" label="5">九个月一次</el-radio>
                <el-radio v-model="personalInfo.c_jfcs" label="6">半年一次</el-radio>
                </el-form-item>
                <el-form-item label="有无断交" prop="sImg">
                <el-radio v-model="personalInfo.c_ywdj" label="1">有</el-radio>
                <el-radio v-model="personalInfo.c_ywdj" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="personalInfo.c_ywdj==1" label="断交时间" prop="sImg">
                <el-select size="small" v-model="personalInfo.c_yqcs" placeholder="请选择">
                    <el-option label="10天以内" value="1">10天以内</el-option>
                    <el-option label="20天以内" value="2">20天以内</el-option>
                    <el-option label="30天以内" value="3">30天以内</el-option>
                    <el-option label="40天以内" value="4">40天以内</el-option>
                    <el-option label="50天以内" value="5">50天以内</el-option>
                    <el-option label="60天以内" value="6">60天以内</el-option>
                    <el-option label="70天以内" value="7">70天以内</el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="sImg">
                <el-input autosize type="textarea" placeholder="请尽量描述客户资质、突出问题等信息。" size="small" v-model="personalInfo.c_bz"></el-input>
                </el-form-item>
                <el-form-item class="dr-submitContent">
                <el-button :disabled="disabled" size="small" type="primary" @click="submitForm1('ruleForm')">确定</el-button>
                <el-button size="small" @click="personalInfo={ sfzgdk_fkjg: [],c_bxgs:[] }">重置</el-button>
                </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="工作信息" name="second">
            <el-form :model="workInfo" :rules="WorkRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="公司类型" prop="sImg">
                    <el-select size="small" v-model="workInfo.w_gslx" placeholder="请选择">
                        <el-option label="民营私企" value="民营私企">民营私企</el-option>
                        <el-option label="上市公司" value="上市公司">上市公司</el-option>
                        <el-option label="机关-事业-国有" value="机关-事业-国有">机关-事业-国有</el-option>
                        <el-option label="世界500强" value="世界500强">世界500强</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司主营业务" prop="sImg">
                    <el-input size="small" v-model="workInfo.w_zyyw"></el-input>
                </el-form-item>
                <el-form-item label="社保" prop="sImg">
                    <el-radio v-model="workInfo.w_sb" label="1">有</el-radio>
                    <el-radio v-model="workInfo.w_sb" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_sb==1" label="已缴纳" prop="sImg">
                    <el-input size="small" v-model="workInfo.w_sbyjn" placeholder="单位：月"></el-input>
                </el-form-item>
                <el-form-item v-if="workInfo.w_sb==1" label="社保缴纳基数" prop="sImg">
                    <el-input size="small" v-model="workInfo.w_js" placeholder="单位：元"></el-input>
                </el-form-item>
                <el-form-item v-if="workInfo.w_sb==1" label="有无断交" prop="sImg">
                    <el-radio v-model="workInfo.sb_ywdj" label="1">有</el-radio>
                    <el-radio v-model="workInfo.sb_ywdj" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_sb==1" label="有无变更" prop="sImg">
                    <el-radio v-model="workInfo.sb_ywbg" label="1">有</el-radio>
                    <el-radio v-model="workInfo.sb_ywbg" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_sb==1" label="是否为本单位缴纳" prop="sImg">
                    <el-radio v-model="workInfo.sb_bdw" label="1">是</el-radio>
                    <el-radio v-model="workInfo.sb_bdw" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="公积金" prop="sImg">
                    <el-radio v-model="workInfo.w_gjj" label="1">有</el-radio>
                    <el-radio v-model="workInfo.w_gjj" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_gjj==1" label="已缴纳" prop="sImg">
                    <el-input placeholder="单位：月" size="small" v-model="workInfo.w_js"></el-input>
                </el-form-item>
                <el-form-item v-if="workInfo.w_gjj==1" label="个人缴纳金额\月" prop="sImg">
                    <el-input placeholder="单位：元/月" size="small" v-model="workInfo.w_grjnje"></el-input>
                </el-form-item>
                <el-form-item v-if="workInfo.w_gjj==1" label="有无断交" prop="sImg">
                   <el-radio v-model="workInfo.gg_ywdj" label="1">有</el-radio>
                   <el-radio v-model="workInfo.gg_ywdj" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_gjj==1" label="有无变更" prop="sImg">
                   <el-radio v-model="workInfo.gg_ywbg" label="1">有</el-radio>
                   <el-radio v-model="workInfo.gg_ywbg" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_gjj==1" label="是否为本单位缴纳" prop="sImg">
                   <el-radio v-model="workInfo.gg_sfb" label="1">是</el-radio>
                   <el-radio v-model="workInfo.gg_sfb" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="打卡工资" prop="sImg">
                   <el-radio v-model="workInfo.w_dkgz" label="1">有</el-radio>
                   <el-radio v-model="workInfo.w_dkgz" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="workInfo.w_dkgz==1" label="打卡期数" prop="sImg">
                    <el-input placeholder="单位：月" size="small" v-model="workInfo.w_dkgzqs"></el-input>
                </el-form-item>
                <el-form-item v-if="workInfo.w_dkgz==1" label="打卡工资额度" prop="sImg">
                    <el-input placeholder="单位：元/月" size="small" v-model="workInfo.w_dkgzed"></el-input>
                </el-form-item>
                <el-form-item v-if="workInfo.w_dkgz==1" label="半年内有无中断" prop="sImg">
                    <el-radio v-model="workInfo.w_dkgzzd" label="1">有</el-radio>
                    <el-radio v-model="workInfo.w_dkgzzd" label="0">无</el-radio>
                </el-form-item>
                <el-form-item class="dr-submitContent">
                    <el-button :disabled="disabled" size="small" type="primary" @click="submitForm2">确定</el-button>
                    <el-button size="small" @click="workInfo={}">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="法人或股东信息" name="third">
            <el-form :model="legalInfo" :rules="LegalRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="公司注册时间">
                    <el-date-picker
                    size="small"
                        v-model="legalInfo.f_zcsj"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="有无营业执照" prop="sImg">
                    <el-radio v-model="legalInfo.w_yyzz" label="1">有</el-radio>
                    <el-radio v-model="legalInfo.w_yyzz" label="0">无</el-radio>
                </el-form-item>
                <el-form-item label="注册资金" prop="sImg">
                    <el-input placeholder="单位：元" size="small" v-model="legalInfo.f_zczj"></el-input>
                </el-form-item>
                <el-form-item label="对公流水" prop="sImg">
                    <el-radio v-model="legalInfo.f_dgls" label="1">有</el-radio>
                    <el-radio v-model="legalInfo.f_dgls" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="legalInfo.f_dgls==1" label="每月涉税入账金额" prop="sImg">
                    <el-input placeholder="单位：元" size="small" v-model="legalInfo.f_ssrz"></el-input>
                </el-form-item>
                <el-form-item v-if="legalInfo.f_dgls==1" label="每月避税入账金额" prop="sImg">
                    <el-input placeholder="单位：元" size="small" v-model="legalInfo.f_bsrz"></el-input>
                </el-form-item>
                <el-form-item label="对私流水/月" prop="sImg">
                    <el-input placeholder="单位：元" size="small" v-model="legalInfo.f_dsls"></el-input>
                </el-form-item>
                <el-form-item label="总流水" prop="sImg">
                    <el-input placeholder="单位：元" size="small" v-model="legalInfo.f_zls"></el-input>
                </el-form-item>
                <el-form-item class="dr-submitContent">
                    <el-button :disabled="disabled" size="small" type="primary" @click="submitForm3">确定</el-button>
                    <el-button size="small" @click="legalInfo={}">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="资产信息" name="fourth">
            <el-form :model="assetInfo" :rules="AssetRules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="有无房产" prop="sImg">
                    <el-radio v-model="assetInfo.m_fc" label="1">有</el-radio>
                    <el-radio v-model="assetInfo.m_fc" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="有无房产证" prop="sImg">
                    <el-radio v-model="assetInfo.m_ywfcz" label="1">有</el-radio>
                    <el-radio v-model="assetInfo.m_ywfcz" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="有无抵押记录" prop="sImg">
                    <el-radio v-model="assetInfo.m_fcdyjl" label="1">有</el-radio>
                    <el-radio v-model="assetInfo.m_fcdyjl" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="房龄" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.house_age"></el-input>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="是否只能一人出面" prop="sImg">
                    <el-radio v-model="assetInfo.c_ifsingle" label="1">有</el-radio>
                    <el-radio v-model="assetInfo.c_ifsingle" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="房产地址" prop="sImg">
                    <el-cascader placeholder="请选择房产地" size="small" :options="options" v-model="assetInfo.selectedHJ" @change="handleChange1">
                    </el-cascader>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="房产类型" prop="sImg">
                    <el-select size="small" v-model="assetInfo.m_fclx" placeholder="请选择房产类型">
                        <el-option value="商品住宅">商品住宅</el-option>
                        <el-option value="商铺">商铺</el-option>
                        <el-option value="办公楼">办公楼</el-option>
                        <el-option value="厂房">厂房</el-option>
                        <el-option value="经适-限价">经适-限价</el-option>
                        <el-option value="房改-危改">房改-危改</el-option>
                        <el-option value="小产权">小产权</el-option>
                        <el-option value="宅基地-自建">宅基地-自建</el-option>
                        <el-option value="商住两用">商住两用</el-option>
                        <el-option value="军产">军产</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_fc==1" label="目前产权状态" prop="sImg">
                    <el-select size="small" v-model="assetInfo.m_cqzt" placeholder="请选择房产类型">
                        <el-option value="全款无抵押">全款无抵押</el-option>
                        <el-option value="按揭中">按揭中</el-option>
                        <el-option value="抵押在公司或个人">抵押在公司或个人</el-option>
                        <el-option value="抵押在银行">抵押在银行</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_cqzt=='按揭中'" label="按揭方式" prop="sImg">
                    <el-select size="small" v-model="assetInfo.m_ajz" placeholder="请选择">
                        <el-option value="银行卡按揭">银行卡按揭</el-option>
                        <el-option value="信用卡按揭">信用卡按揭</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_cqzt=='按揭中'" label="按揭还款数" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.m_ajhk"></el-input>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_cqzt=='按揭中'" label="还款额" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.m_hke"></el-input>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_cqzt=='按揭中'" label="已还期数" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.m_yhqs"></el-input>
                </el-form-item>
                <el-form-item label="有无车辆" prop="sImg">
                    <el-radio v-model="assetInfo.m_cl" label="1">有</el-radio>
                    <el-radio v-model="assetInfo.m_cl" label="0">无</el-radio>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_cl==1" label="京牌/外地牌" prop="sImg">
                    <el-input placeholder="" size="small" v-model="assetInfo.m_cp"></el-input>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_cl==1" label="目前车辆状态" prop="sImg">
                    <el-select size="small" v-model="assetInfo.m_clzk" placeholder="请选择房产类型">
                        <el-option value="全款无抵押">全款无抵押</el-option>
                        <el-option value="按揭中">按揭中</el-option>
                        <el-option value="抵押在公司或个人">抵押在公司或个人</el-option>
                        <el-option value="抵押在银行">抵押在银行</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_clzk=='按揭中'" label="按揭方式" prop="sImg">
                    <el-select size="small" v-model="assetInfo.car_ajz" placeholder="请选择">
                        <el-option value="银行卡按揭">银行卡按揭</el-option>
                        <el-option value="信用卡按揭">信用卡按揭</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_clzk=='按揭中'" label="按揭还款数" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.car_ajhk"></el-input>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_clzk=='按揭中'" label="还款额" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.car_hke"></el-input>
                </el-form-item>
                <el-form-item v-if="assetInfo.m_clzk=='按揭中'" label="已还期数" prop="sImg">
                        <el-input placeholder="" size="small" v-model="assetInfo.car_yhqs"></el-input>
                </el-form-item>
                <el-form-item class="dr-submitContent">
                    <el-button :disabled="disabled" size="small" type="primary" @click="submitForm4">确定</el-button>
                    <el-button size="small" @click="assetInfo={}">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import {
  submitPersonalInfo,
  submitWorkInfo,
  submitLegalInfo,
  submitAssetInfo,
  search,
  searchById
} from "@/api/customer.js";
export default {
  data() {
    return {
      options: regionData,
      activeName: "first",
      personalInfo: { sfzgdk_fkjg: [], c_bxgs: [], selectedHJ: [] },
      workInfo: {},
      legalInfo: {},
      assetInfo: {},
      PersonalRules: {},
      WorkRules: {},
      LegalRules: {},
      AssetRules: {},
      fkjg: [
        "华润银行",
        "宁波银行",
        "广发银行",
        "华兴银行",
        "兴业消费金融",
        "招商银行",
        "包商银行",
        "工商银行",
        "平安银行",
        "北银消费金融",
        "中银消费金融",
        "建设银行",
        "大数金融",
        "小安时代",
        "小赢",
        "湖北消费金融",
        "友金所",
        "阳光",
        "锦城消费金融",
        "瀚华金融",
        "晋商消费金融",
        "中国银行",
        "华融消费金融",
        "微众银行",
        "农业银行",
        "民生银行",
        "交通银行",
        "中信银行",
        "华夏银行",
        "南京银行",
        "光大银行",
        "兴业银行",
        "浦发银行",
        "北京银行"
      ],
      bxgs: [
        "平安人寿",
        "中国人寿",
        "泰康人寿",
        "新华人寿",
        "太平洋人寿",
        "中国人保",
        "友邦寿险",
        "阳光人寿",
        "中宏人寿",
        "中意人寿",
        "招商信诺",
        "太平人寿",
        "生命人寿",
        "工银安盛人寿",
        "中英人寿",
        "大都会人寿",
        "利安人寿",
        "中德安联人寿",
        "建信人寿",
        "信泰人寿",
        "农银人寿",
        "陆嘴人寿",
        "民生人寿",
        "华泰人寿",
        "合众人寿",
        "国华人寿",
        "华夏人寿",
        "光大永明人寿",
        "长城人寿",
        "英大人寿",
        "同方全球人寿",
        "恒安标准",
        "恒大人寿",
        "东吴人寿",
        "幸福人寿",
        "中苛人寿",
        "三星人寿",
        "君龙人寿",
        "百年人寿",
        "北大方正",
        "吉祥人寿",
        "前海人寿",
        "珠江人寿",
        "安邦人寿",
        "富德生命人寿",
        "中国人民健康保险",
        "PICC"
      ],
      search: "",
      disabled:false
    };
  },
  methods: {
    searchFor(tel) {
      if (this.search && this.search !== "" && this.search !== null) {
        search({ c_tel: this.search || tel }).then(result => {
          this.personalInfo = result;
          this.workInfo = result;
          this.legalInfo = result;
          this.assetInfo = result;
          this.personalInfo.c_tel = this.search;
          this.workInfo.c_tel = this.search;
          this.legalInfo.c_tel = this.search;
          this.assetInfo.c_tel = this.search;
          if (
            result.sfzgdk_fkjg.length > 2 &&
            result.sfzgdk_fkjg.indexOf(",") > 0
          ) {
            this.personalInfo.c_sfzgdk = "1";
            result.sfzgdk_fkjg = result.sfzgdk_fkjg.split(",");
            for (let i = 0; i < result.sfzgdk_fkjg.length; i++) {
              result.sfzgdk_fkjg[i] = Number(result.sfzgdk_fkjg[i]);
            }
          } else if (
            result.sfzgdk_fkjg.length >= 1 &&
            result.sfzgdk_fkjg.indexOf(",") < 0
          ) {
            this.personalInfo.c_sfzgdk = "1";
            result.sfzgdk_fkjg = [Number(result.sfzgdk_fkjg)];
          } else {
            this.personalInfo.c_sfzgdk = "0";
          }
          if (result.c_bxgs.length > 2 && result.c_bxgs.indexOf(",") > 0) {
            this.personalInfo.c_sybx = "1";
            result.c_bxgs = result.c_bxgs.split(",");
            for (let i = 0; i < result.c_bxgs.length; i++) {
              result.c_bxgs[i] = Number(result.c_bxgs[i]);
            }
          } else if (
            result.c_bxgs.length >= 1 &&
            result.c_bxgs.indexOf(",") < 0
          ) {
            this.personalInfo.c_sybx = "1";
            result.c_bxgs = [Number(result.c_bxgs)];
          } else {
            this.personalInfo.c_sybx = "0";
          }
          if (result.c_hj.length >= 1 && result.c_hj.indexOf(",") > 0) {
            let hjArr = result.c_hj.split(",");
            console.log("afeadgfghftgh",TextToCode)
            let a = TextToCode[hjArr[0]].code;
            let b = TextToCode[hjArr[0]][hjArr[1]].code;
            let c = TextToCode[hjArr[0]][hjArr[1]][hjArr[2]].code;
            this.personalInfo.selectedHJ = [];
            this.personalInfo.selectedHJ[0] = a;
            this.personalInfo.selectedHJ[1] = b;
            this.personalInfo.selectedHJ[2] = c;
          }
          if (result.m_fcdz.length >= 1 && result.m_fcdz.indexOf(",") > 0) {
            let hjArr = result.m_fcdz.split(",");
            let a = TextToCode[hjArr[0]].code;
            let b = TextToCode[hjArr[0]][hjArr[1]].code;
            let c = TextToCode[hjArr[0]][hjArr[1]][hjArr[2]].code;
            this.assetInfo.selectedHJ = [];
            this.assetInfo.selectedHJ[0] = a;
            this.assetInfo.selectedHJ[1] = b;
            this.assetInfo.selectedHJ[2] = c;
          }
        });
      }
    },
    searchId(id) {
      searchById(id).then(result => {
        this.personalInfo = result;
        this.workInfo = result;
        this.legalInfo = result;
        this.assetInfo = result;
        this.personalInfo.c_tel = this.search;
        this.workInfo.c_tel = this.search;
        this.legalInfo.c_tel = this.search;
        this.assetInfo.c_tel = this.search;
        if (
          result.sfzgdk_fkjg.length > 2 &&
          result.sfzgdk_fkjg.indexOf(",") > 0
        ) {
          this.personalInfo.c_sfzgdk = "1";
          result.sfzgdk_fkjg = result.sfzgdk_fkjg.split(",");
          for (let i = 0; i < result.sfzgdk_fkjg.length; i++) {
            result.sfzgdk_fkjg[i] = Number(result.sfzgdk_fkjg[i]);
          }
        } else if (
          result.sfzgdk_fkjg.length >= 1 &&
          result.sfzgdk_fkjg.indexOf(",") < 0
        ) {
          this.personalInfo.c_sfzgdk = "1";
          result.sfzgdk_fkjg = [Number(result.sfzgdk_fkjg)];
        } else {
          this.personalInfo.c_sfzgdk = "0";
        }
        if (result.c_bxgs.length > 2 && result.c_bxgs.indexOf(",") > 0) {
          this.personalInfo.c_sybx = "1";
          result.c_bxgs = result.c_bxgs.split(",");
          for (let i = 0; i < result.c_bxgs.length; i++) {
            result.c_bxgs[i] = Number(result.c_bxgs[i]);
          }
        } else if (
          result.c_bxgs.length >= 1 &&
          result.c_bxgs.indexOf(",") < 0
        ) {
          this.personalInfo.c_sybx = "1";
          result.c_bxgs = [Number(result.c_bxgs)];
        } else {
          this.personalInfo.c_sybx = "0";
        }
        if (result.c_hj.length >= 1 && result.c_hj.indexOf(",") > 0) {
          let hjArr = result.c_hj.split(",");
          let a = TextToCode[hjArr[0]].code;
          let b = TextToCode[hjArr[0]][hjArr[1]].code;
          let c = TextToCode[hjArr[0]][hjArr[1]][hjArr[2]].code;
          this.personalInfo.selectedHJ = [];
          this.personalInfo.selectedHJ[0] = a;
          this.personalInfo.selectedHJ[1] = b;
          this.personalInfo.selectedHJ[2] = c;
        }
        if (result.m_fcdz.length >= 1 && result.m_fcdz.indexOf(",") > 0) {
          let hjArr = result.m_fcdz.split(",");
          let a = TextToCode[hjArr[0]].code;
          let b = TextToCode[hjArr[0]][hjArr[1]].code;
          let c = TextToCode[hjArr[0]][hjArr[1]][hjArr[2]].code;
          this.assetInfo.selectedHJ = [];
          this.assetInfo.selectedHJ[0] = a;
          this.assetInfo.selectedHJ[1] = b;
          this.assetInfo.selectedHJ[2] = c;
        }
      });
    },
    handleChange(code) {
      this.personalInfo.c_hj = [
        CodeToText[code[0]],
        CodeToText[code[1]],
        CodeToText[code[2]]
      ];
    },
    handleChange1(code) {
      this.assetInfo.m_fcdz = [
        CodeToText[code[0]],
        CodeToText[code[1]],
        CodeToText[code[2]]
      ];
    },
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    // 提交表单1
    submitForm1(form) {
      submitPersonalInfo(this.personalInfo).then(result => {
        if (result.code === 20000) {
          this.$message({
            type: "success",
            message: "成功!"
          });
        }
        this.$socket.emit("message", {
          id: result.superior,
          msg: `${this.$store.getters.name}修改了用户${this.personalInfo
            .c_name}的个人信息`
        });
        this.personalInfo = { sfzgdk_fkjg: [], c_bxgs: [] };
      });
    },
    // 提交表单2
    submitForm2(form) {
      submitWorkInfo(this.workInfo).then(result => {
        if (result.code === 20000) {
          this.$message({
            type: "success",
            message: "成功!"
          });
        }
        this.$socket.emit("message", {
          id: result.superior,
          msg: `${this.$store.getters.name}修改了用户${this.personalInfo
            .c_name}的工作信息`
        });
        this.workInfo = {};
      });
    },
    // 提交表单3
    submitForm3(form) {
      submitLegalInfo(this.legalInfo).then(result => {
        if (result.code === 20000) {
          this.$message({
            type: "success",
            message: "成功!"
          });
        }
        this.$socket.emit("message", {
          id: result.superior,
          msg: `${this.$store.getters.name}修改了用户${this.personalInfo
            .c_name}的法人或股东信息`
        });
        this.legalInfo = {};
      });
    },
    // 提交表单4
    submitForm4(form) {
      submitAssetInfo(this.assetInfo).then(result => {
        if (result.code === 20000) {
          this.$message({
            type: "success",
            message: "成功!"
          });
        }
        this.$socket.emit("message", {
          id: result.superior,
          msg: `${this.$store.getters.name}修改了用户${this.personalInfo
            .c_name}的资产信息`
        });
        this.assetInfo = {};
      });
    }
  },
  mounted() {
    if (this.$route.params.tel) {
      this.search = this.$route.params.tel;
      this.searchFor(this.$route.params.tel);
    } else if (this.$route.params.id) {
      this.disabled = true;
      this.searchId(this.$route.params.id);
    }
  }
  /* beforeCreate: function() {
    console.group("beforeCreate 创建前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
    console.log("%c%s", "color:red", "search: " + this.search);
  },
  created: function() {
    console.group("created 创建完毕状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log(this); //已被初始化
    console.log("%c%s", "color:red", "search: " + this.search); //已被初始化
  },
  beforeMount: function() {
    console.group("beforeMount 挂载前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log(this); //已被初始化
    console.log("%c%s", "color:red", "search: " + this.search); //已被初始化
  },
  mounted: function() {
    console.group("mounted 挂载结束状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log(this); //已被初始化
    console.log(this.$options.methods.searchFor)
    console.log("%c%s", "color:red", "search: " + this.search); //已被初始化
  } */
};
</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
