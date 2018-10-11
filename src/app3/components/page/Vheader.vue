<template>
    <div>
        <div class="font">
            <div @click="go()" style="cursor: pointer" v-show="show">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item >首页</el-breadcrumb-item>
                    <el-breadcrumb-item>报告</el-breadcrumb-item>
                    <el-breadcrumb-item>{{reportData.title}}信评报告</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="title">
                <span class="LogoName">{{reportData.publisher}}</span>
                <label class="label">
                    <el-tag size="small">{{reportData.province}}</el-tag>
                    <el-tag size="small" type="danger">{{reportData.trade}}</el-tag>
                </label>
            </div>
        </div>
        <div class="message">
            <el-tooltip
                    v-if="reportData.bondName&&reportData.bondName.length>0"
                    class="item"
                    effect="dark"
                    content="债券名称"
                    placement="top">
                <span>{{reportData.bondName}}</span>
            </el-tooltip>
            <el-tooltip
                    v-if="reportData.bondType&&reportData.bondType.length>0"
                    class="item"
                    effect="dark"
                    content="债券类型"
                    placement="top">
                <span>{{reportData.bondType}}</span>
            </el-tooltip>
            <el-tooltip v-if="reportData.creditRatingReportDetail.residualMaturity&&reportData.creditRatingReportDetail.residualMaturity.length>0"
                        class="item"
                        effect="dark"
                        content="剩余期限（TTM）"
                        placement="top">
                <span>{{reportData.creditRatingReportDetail.residualMaturity}}</span>
            </el-tooltip>
            <el-tooltip
                    v-if="reportData.creditRatingReportDetail.circulation&&reportData.creditRatingReportDetail.circulation.length>0"
                    class="item"
                    effect="dark"
                    content="发行量"
                    placement="top">
                <span>{{reportData.creditRatingReportDetail.circulation+"亿"}}</span>
            </el-tooltip>
            <el-tooltip
                    v-if="reportData.creditRatingReportDetail.couponRate&&reportData.creditRatingReportDetail.couponRate.length>0"
                    class="item"
                    effect="dark"
                    content="票息"
                    placement="top">
                <span>{{"票面"+reportData.creditRatingReportDetail.couponRate}}</span>
            </el-tooltip>
            <!--<el-tooltip-->
                    <!--v-if="reportData.creditRatingReportDetail.appraisal&&reportData.creditRatingReportDetail.appraisal.length>0"-->
                    <!--class="item"-->
                    <!--effect="dark"-->
                    <!--content="估价"-->
                    <!--placement="top">-->
                <!--<span>{{reportData.creditRatingReportDetail.appraisal}}</span>-->
            <!--</el-tooltip>-->
            <el-tooltip
                    v-if="reportData.creditRatingReportDetail.leadUnderwriter&&reportData.creditRatingReportDetail.leadUnderwriter.length>0"
                    class="item"
                    effect="dark"
                    content="主承销商"
                    placement="top">
                <span>{{reportData.creditRatingReportDetail.leadUnderwriter}}</span>
            </el-tooltip>

            <el-tooltip
                    class="item"
                    effect="dark"
                    content="是否有担保信息"
                    placement="top">
                <span>{{reportData.creditRatingReportDetail.guarantee}}</span>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
  export default {
    props:['reportData',"show"],
    data() {
      return {
      }
    },
    computed: {},
    methods: {
      go(){
        this.$router.go(-1) ;
      },
    },
    created:function(){
    },
  }
</script>

<style scoped>
    .font{
        padding: 0 20px;
        box-sizing: border-box;
    }
    .font .LogoName{
        font-weight: bolder;
        font-size: 20px;
        font-family: "Microsoft YaHei";
        display: inline-block;
        margin-right: 20px;
    }

    .font .label .el-tag{
        margin: 0 4px;
    }
    .font .title{
        margin-top: 10px;
    }
    .message{
        padding-top: 25px;
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid #a7a7a7;
        background: -webkit-linear-gradient(top,rgba(243,214,177,0),rgba(243,214,177,0.4));
        margin-top: 6px;
    }
    .message span{
        display: inline-block;
        padding: 5px 30px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 14px;
        font-family: "Microsoft YaHei";
    }
    .el-breadcrumb{
        line-height: 35px;
    }
</style>
