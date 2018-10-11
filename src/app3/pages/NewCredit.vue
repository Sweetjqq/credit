<template>
    <div class="Box" id="Box">
        <!--<Vheader></Vheader>-->
        <Vauthor></Vauthor>
        <div class="header"></div>
        <Vheader :reportData="reportData" v-if="reportData" :show="show"></Vheader>
        <div class="Data">
            <el-row :gutter="20">
                <!--左边表格区域-->
                <el-col :span="6">
                    <LeftTable :LeftTableData="LeftTableData" v-if="LeftTableData"></LeftTable>
                </el-col>

                <!--右边富文本编辑区域-->
                <el-col :span="18">
                    <div class="AllUeditor">
                        <span class="Sty_title">概况</span>
                        <!--公司概况-->
                        <div>
                            <span class="sty_sm_title">Ⅰ.公司概况</span>
                            <div class="only_editor">
                                <vueQuillEditor  :content="Company_profile" id="Company_profile"></vueQuillEditor>
                            </div>
                        </div>


                        <!--利润信息-->
                        <div>
                            <span class="sty_sm_title">Ⅱ.经营情况</span>
                            <div class="only_editor">
                                <vueQuillEditor :content="Profit_information" id="Profit_information"></vueQuillEditor>
                            </div>
                        </div>

                        <!--现金流情况-->
                        <div>
                            <span class="sty_sm_title">Ⅲ.现金流情况</span>
                            <div class="only_editor">
                                <vueQuillEditor :content="Cash" id="Cash"></vueQuillEditor>
                            </div>
                        </div>

                        <!--资产负债情况-->
                        <div>
                            <span class="sty_sm_title">Ⅳ.资产负债情况</span>
                            <div class="only_editor">
                                <vueQuillEditor :content="Assets" id="Assets"></vueQuillEditor>
                            </div>
                        </div>

                        <!--风险-->
                        <div>
                            <span class="sty_sm_title">Ⅴ.风险</span>
                            <div class="only_editor">
                                <vueQuillEditor :content="Construction" id="Construction"></vueQuillEditor>
                            </div>
                        </div>
                        <!--结论-->
                        <div>
                            <span class="sty_sm_title">VI.结论</span>
                            <div class="only_editor">
                                <vueQuillEditor :content="Risk" id="Risk"></vueQuillEditor>
                            </div>
                        </div>
                    </div>
                    <el-row class="btn">
                        <el-button type="primary" size="medium " style="background: #1dacca;border-color:  #1dacca" @click="getData()">保存</el-button>
                        <el-button type="info"  size="medium " @click="goBack()">取消</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <loadding v-if="showLoadding" :loaddingMsg="loaddingMsg"></loadding>
    </div>
</template>

<script>
 import  vueQuillEditor from '../components/page/vueQuillEditor.vue'
 import  LeftTable from '../components/page/LeftTable.vue'
 import Vheader from '../components/page/Vheader.vue'
 import  Vauthor from '../components/page/header-bar2.vue'
 import Loadding from '../components/page/loadding.vue'
 import {IpUrl} from '../config/IpUrl'
 import {getCookie} from '../config/mUtils'
  export default {
    components:{
      vueQuillEditor,LeftTable,Vheader,Vauthor,Loadding
    },
    data() {
      return {
        show:true,
        "CreditId":'',
        "Company_profile":"",
        "Profit_information":"",
        "Cash":"",
        "Assets":"",
        "Risk":"",
        "Construction":"",
        "reportData":{
          "creditRatingReportDetail":{}
        },
        "LeftTableData":{
          "createUser":"",
          "email":"",
          "ratingAgency":"",//评级机构
          "corporateCreditRating":"",//主体评级
          "ratingOutlook":"",//评级展望
          "debtCreditRating":"",//债项评级
          "upTo":"",//截止至
          "nonCurLiabDueWithin1y":"",//一年内到期
          "stBondsPayable":"",//一年以内
          "bondsPayable":"",//一年以上
          "stBorrow":"",//短期
          "ltBorrow":"",//长期
          "operRev":"",//营业收入
          "ebitda":"",//EBITDA
          "ebitdaRate":"",//EBITDA%
          "cfo":"",//CFO
          "ffo":"",//FFO
          "assetLiabilityRatio":"",//资产负债率(%)
          "grossDebt_Ebitda":"",//总债务/EBITDA
          "currentRatio":"",//流动比率(x)
          "quickRatio":"",//速动比率(x)
          "grossProfitRate":"",//毛利率

          "operRev1":"",//营业收入
          "ebitda1":"",//EBITDA
          "ebitdaRate1":"",//EBITDA%
          "cfo1":"",//CFO
          "ffo1":"",//FFO
          "assetLiabilityRatio1":"",//资产负债率(%)
          "grossDebt_Ebitda1":"",//总债务/EBITDA
          "currentRatio1":"",//流动比率(x)
          "quickRatio1":"",//速动比率(x)
          "grossProfitRate1":"",//毛利率

          "Array":[],
        },
        "AllData":{},
        "this.CreditId":'',
        "showLoadding":false,
        "loaddingMsg":'正在修改信评报告，请稍等'
      }
    },
    computed: {

    },
    methods: {
      getText(e){
        var t="";
        e=e.childNodes||e;
        for(var j=0;j<e.length;j++){
          t+=e[j].nodeType!=1?
            e[j].nodeValue:this.getText(e[j].childNodes);
        }
        return t.replace(/(^\s*)|(\s*$)/g, "");
      },
      //根据id获取信评报告明细
      getReportDetails(){
        this.showLoadding=true;
        this.loaddingMsg="正在获取相关的报告信息，Please wait a moment";

        let Url=window.location.href;
        console.log(Url,"******Url*******");
        let CreditId=Url.split("?")[1].split("=")[1];
        console.log(CreditId,"*******CreditId***********");
        this.CreditId=CreditId;
        axios({
          method: 'get',
          url: '/v1/creditRating/reportDetail',
          headers: {
            'Authorization':"bearer " +getCookie("Token"),
          },
          params:{
            "id":CreditId,
          },
        }).then( (response)=> {
          if(response.data.status == 401){
            this.$message({
              message: "Token已经过期"
            });
            this.$router.push("/login");
          }
          this.showLoadding=false;
          this.loaddingMsg="正在修改信评报告，请稍等";

          console.log(response.data,"通过id拉取信评报告明细");
          if(response.data.status==200&&response.data.data!=null){
            this.reportData=response.data.data;
//            this.LeftTableData=response.data.data;

            this.LeftTableData.createUser=response.data.data.createUser;
            this.LeftTableData.email=response.data.data.email;
            this.LeftTableData.ratingAgency=response.data.data.creditRatingReportDetail.ratingAgency;
            this.LeftTableData.corporateCreditRating=response.data.data.creditRatingReportDetail.corporateCreditRating;
            this.LeftTableData.ratingOutlook=response.data.data.creditRatingReportDetail.ratingOutlook;
            this.LeftTableData.debtCreditRating=response.data.data.creditRatingReportDetail.debtCreditRating;
            this.LeftTableData.upTo=JSON.parse(response.data.data.creditRatingReportDetail.debt).upTo;
            this.LeftTableData.nonCurLiabDueWithin1y=JSON.parse(response.data.data.creditRatingReportDetail.debt).nonCurLiabDueWithin1y;
            this.LeftTableData.stBondsPayable=JSON.parse(response.data.data.creditRatingReportDetail.debt).stBondsPayable;
            this.LeftTableData.bondsPayable=JSON.parse(response.data.data.creditRatingReportDetail.debt).bondsPayable;
            this.LeftTableData.stBorrow=JSON.parse(response.data.data.creditRatingReportDetail.debt).stBorrow;
            this.LeftTableData.ltBorrow=JSON.parse(response.data.data.creditRatingReportDetail.debt).ltBorrow;


            let financialOverview=JSON.parse(response.data.data.creditRatingReportDetail.financialOverview);
            console.log(financialOverview,"financialOverviewfinancialOverviewfinancialOverviewfinancialOverview");
            let Array=[];
            for(let key in financialOverview){
              Array.push(key);
            }
            this.LeftTableData.Array=Array;
            if(Array.length>0){
              this.LeftTableData.operRev=financialOverview[Array[0]].operRev;
              this.LeftTableData.quickRatio=financialOverview[Array[0]].quickRatio;
              this.LeftTableData.assetLiabilityRatio=financialOverview[Array[0]].assetLiabilityRatio;
              this.LeftTableData.ebitdaRate=financialOverview[Array[0]].ebitdaRate;
              this.LeftTableData.ebitda=financialOverview[Array[0]].ebitda;
              this.LeftTableData.currentRatio=financialOverview[Array[0]].currentRatio;
              this.LeftTableData.cfo=financialOverview[Array[0]].cfo;
              this.LeftTableData.ffo=financialOverview[Array[0]].ffo;
              this.LeftTableData.grossProfitRate=financialOverview[Array[0]].grossProfitRate;
              this.LeftTableData.grossDebt_Ebitda=financialOverview[Array[0]].grossDebt_Ebitda;

              this.LeftTableData.operRev1=financialOverview[Array[1]].operRev;
              this.LeftTableData.quickRatio1=financialOverview[Array[1]].quickRatio;
              this.LeftTableData.assetLiabilityRatio1=financialOverview[Array[1]].assetLiabilityRatio;
              this.LeftTableData.ebitdaRate1=financialOverview[Array[1]].ebitdaRate;
              this.LeftTableData.ebitda1=financialOverview[Array[1]].ebitda;
              this.LeftTableData.currentRatio1=financialOverview[Array[1]].currentRatio;
              this.LeftTableData.cfo1=financialOverview[Array[1]].cfo;
              this.LeftTableData.ffo1=financialOverview[Array[1]].ffo;
              this.LeftTableData.grossProfitRate1=financialOverview[Array[1]].grossProfitRate;
              this.LeftTableData.grossDebt_Ebitda1=financialOverview[Array[1]].grossDebt_Ebitda;
            }

            this.Company_profile=this.reportData.creditRatingReportDetail.companyProfile;
            this.Profit_information=this.reportData.creditRatingReportDetail.profitInfo;
            this.Cash=this.reportData.creditRatingReportDetail.cashFlow;
            this.Assets=this.reportData.creditRatingReportDetail.assetsAndLiabilities;
//            this.Risk=this.reportData.creditRatingReportDetail.risk;
            this.Risk=this.reportData.creditRatingReportDetail.risk;//结论
            this.Construction=this.reportData.creditRatingReportDetail.conclusion;//风险
          }else{
            this.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
          .catch(function (error) {
            console.log(error);
            this.showLoadding=false;
            this.$message({
              message: "数据获取超时,请刷新页面!!"
            });
          });
      },
      //编辑生成信评报告
      createReport(){
        console.log(this.getText(document.querySelector("#Company_profile .ql-editor")),"&&&&&&&&&&&&&");
        if(this.getText(document.querySelector("#Company_profile .ql-editor")).length==0
          ||this.getText(document.querySelector("#Profit_information .ql-editor")).length==0
          ||this.getText(document.querySelector("#Cash .ql-editor")).length==0
          ||this.getText(document.querySelector("#Assets .ql-editor")).length==0
          ||this.getText(document.querySelector("#Risk .ql-editor")).length==0){
          //        公司概况纯文本
          if(this.getText(document.querySelector("#Company_profile .ql-editor")).length==0){
            this.$message({
              message: "公司概况描述不能为空",
              type: 'warning'
            });
          }
          // 利润信息
          if(this.getText(document.querySelector("#Profit_information .ql-editor")).length==0){
            this.$message({
              message: "经营情况不能为空",
              type: 'warning'
            });
          }
          // 现金流
          if(this.getText(document.querySelector("#Cash .ql-editor")).length==0){
            this.$message({
              message: "现金流信息不能为空",
              type: 'warning'
            });
          }
          //资产负债情况
          if(this.getText(document.querySelector("#Assets .ql-editor")).length==0){
            this.$message({
              message: "资产负债情况不能为空",
              type: 'warning'
            });
          }
          //风险
          if(this.getText(document.querySelector("#Risk .ql-editor")).length==0){
            this.$message({
              message: "结论不能为空",
              type: 'warning'
            });
          }
        }
        else{
          this.showLoadding=true;
          console.log(this.reportData,"初始化返回的数据");
          axios({
            method: 'post',
            url: '/v1/creditRating/reportSave',
            headers: {
              'Authorization':"bearer " +getCookie("Token"),
            },
            data:{
              "id": this.CreditId,
              "title":this.reportData.title,
              "reportTemplateId":"type_1",
              "publisher":this.reportData.publisher,
              "bondCode":this.reportData.bondCode,
              "bondName":this.reportData.bondName,
              "bondType":this.reportData.bondType,
              "province":this.reportData.province,
              "trade":this.reportData.trade,
              "quarter":this.reportData.quarter,
              "email":this.reportData.email,

              "creditRatingReportDetail.id":this.reportData.creditRatingReportDetail.id,
              "creditRatingReportDetail.reportId":this.reportData.creditRatingReportDetail.reportId,

              "creditRatingReportDetail.companyProfile":this.AllData.Company_profile_data,//公司概况
              "creditRatingReportDetail.profitInfo":this.AllData.Profit_information_data,//利润信息
              "creditRatingReportDetail.cashFlow":this.AllData.Cash_data,//现金流
              "creditRatingReportDetail.assetsAndLiabilities":this.AllData.Assets_data,//资产负债
              "creditRatingReportDetail.risk":this.AllData.Risk_data,//风险
              "creditRatingReportDetail.conclusion":this.AllData.Conclusion_data,//结论

              "creditRatingReportDetail.residualMaturity":this.reportData.creditRatingReportDetail.residualMaturity,
              "creditRatingReportDetail.circulation":this.reportData.creditRatingReportDetail.circulation,
              "creditRatingReportDetail.couponRate":this.reportData.creditRatingReportDetail.couponRate,
              "creditRatingReportDetail.leadUnderwriter":this.reportData.creditRatingReportDetail.leadUnderwriter,
              "creditRatingReportDetail.appraisal":this.reportData.creditRatingReportDetail.appraisal,
              "creditRatingReportDetail.ratingAgency":this.reportData.creditRatingReportDetail.ratingAgency,
              "creditRatingReportDetail.corporateCreditRating":this.reportData.creditRatingReportDetail.corporateCreditRating,
              "creditRatingReportDetail.debtCreditRating":this.reportData.creditRatingReportDetail.debtCreditRating,
              "creditRatingReportDetail.ratingOutlook":this.reportData.creditRatingReportDetail.ratingOutlook,
              "creditRatingReportDetail.financialOverview":this.reportData.creditRatingReportDetail.financialOverview,
              "creditRatingReportDetail.debt":this.reportData.creditRatingReportDetail.debt,
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then( (response)=> {
            if(response.data.status == 401) {
              this.$message({
                message: "token过期"
              });
              this.$router.push("/login");
            }

              this.showLoadding=false;
            console.log(response.data,"编辑信评报告");
            if(response.data.status==200){
              this.$message({
                message: "信评报告已提交，请到信评报告列表查看",
                type: 'success'
              });
              setTimeout( ()=> {
                this.$router.push("/module/myReport");
              },2000)
            }
            else{
              this.$message({
                message: response.data.msg,
                type: 'warning'
              });
            }
          })
            .catch(function (error) {
              this.$message({
                message: "操作超时,请重新操作!!"
              });
              console.log(error);
            });
        }

      },
      getData(){
        let Company_profile_data=document.querySelector("#Company_profile .ql-editor").innerHTML;
        let Profit_information_data=document.querySelector("#Profit_information .ql-editor").innerHTML;
        let Cash_data=document.querySelector("#Cash .ql-editor").innerHTML;
        let Assets_data=document.querySelector("#Assets .ql-editor").innerHTML;
        let Risk_data=document.querySelector("#Risk .ql-editor").innerHTML;
        let Conclusion_data=document.querySelector("#Construction .ql-editor").innerHTML;
        let AllData={
            Company_profile_data:Company_profile_data,
            Profit_information_data:Profit_information_data,
            Cash_data:Cash_data,
            Assets_data:Assets_data,
            Risk_data:Risk_data,
            Conclusion_data:Conclusion_data
        };
        this.AllData=AllData;
        console.log(this.AllData,"最终使用的数据");

        this.createReport();
      },
      goBack(){
        this.$router.push("/module/myReport");
      }
    },
    created:function(){
      this.getReportDetails();
    },
  }
</script>

<style scoped>
    .Box{
        overflow-x: hidden;
        background: #f3f3f3;
    }
    .font{
        padding: 0 20px;
        box-sizing: border-box;
    }
    .header{
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #549caf;
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
    .Data{
    padding: 24px 12px;
    box-sizing: border-box;
}
    .Sty_title{
        display: inline-block;
        padding: 0px 8px;
        box-sizing: border-box;
        font-size: 14px;
        color: #666;
        border-left: 4px solid #365d98;
        height: 16px;
        line-height: 16px;
        margin: 10px 0;
    }
    table.gridtable {
        width: 100%;
        font-family: "Microsoft YaHei";
        font-size:12px;
        color:#333333;
        font-weight: bold;
        border-width: 1px;
        border-color: #d7dbe0;
        border-collapse: collapse;
    }
    table.gridtable th {
        border-width: 1px;
        padding: 5px;
        background-color: #eef1f6;
        text-align: left;
        padding-left: 15px;
        box-sizing: border-box;
    }
    table.odd tr:nth-child(2n){
        background-color: #fafafa !important;
    }
    table.gridtable tr{
        background-color: white;
    }
    table.gridtable td {
        padding: 5px;
        border-color: #d7dbe0;
        text-align: left;
        padding-left: 15px;
        box-sizing: border-box;
    }
    table.gridtable tbody,table.gridtable thead{
        border-width: 1px;
        border-style: solid;
    }
    .add_two{
        display: inline-block;
        margin:10px 0;
        font-family: "Microsoft YaHei";
    }
    .add_two span{
        font-size: 16px;
    }
    .add_two font{
        font-size: 12px;
        color: #666;
    }
    .user,.email{
        font-size: 14px;
        color: black;
        font-weight: bold;
    }
    .sty_sm_title{
        font-family: "Microsoft YaHei";
        font-size: 14px;
        display: block;
        margin: 10px 0 5px 5px;
        font-weight: bold;
    }
    .only_editor{
        padding: 10px;
        box-sizing: border-box;
        background: white;
    }
    .btn{
        padding-left: 45%;
       margin-top: 15px;
        text-align: center;
        box-sizing: border-box;
    }
</style>
