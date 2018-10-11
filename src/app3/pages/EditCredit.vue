<template>
    <div id="pdfDom">
        <div class="Box" id="Box">
            <Vauthor :show="show"></Vauthor>
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
                            <label>
                                <span class="sty_sm_title">Ⅰ.公司概况</span>
                                <label class="mainContent" v-html="Company_profile"></label>
                            </label>


                            <!--利润信息-->
                            <label>
                                <span class="sty_sm_title">Ⅱ.经营情况</span>
                                <label class="mainContent" v-html="Profit_information"></label>
                            </label>

                            <!--现金流情况-->
                            <label>
                                <span class="sty_sm_title">Ⅲ.现金流情况</span>
                                <label class="mainContent" v-html="Cash"></label>
                            </label>

                            <!--资产负债情况-->
                            <label>
                                <span class="sty_sm_title">Ⅳ.资产负债情况</span>
                                <label class="mainContent" v-html="Assets"></label>
                            </label>
                            <!--风险-->
                            <label>
                                <span class="sty_sm_title">Ⅴ.风险</span>
                                <label class="mainContent" v-html="Construction"></label>
                            </label>

                            <!--结论-->
                            <label>
                                <span class="sty_sm_title">VI.结论</span>
                                <label class="mainContent" v-html="Risk"></label>
                            </label>

                        </div>
                        <el-row class="btn" id="btn">
                            <el-button type="primary" size="medium " style="background: #1dacca;border-color:  #1dacca" @click="EditPage()">编辑</el-button>
                            <el-button type="primary" size="medium " style="background: #1dacca;border-color:  #1dacca" @click="pdf">下载PDF</el-button>
                            <el-button type="info"  size="medium " @click="goBack()">关闭</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>

        <loadding v-if="showLoadding" :loaddingMsg="loaddingMsg"></loadding>
    </div>

</template>

<script>
  import {IpUrl} from '../config/IpUrl'
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  import  LeftTable from '../components/page/LeftTable.vue'
  import  Vauthor from '../components/page/header-bar2.vue'
  import Vheader from '../components/page/Vheader.vue'
  import Loadding from '../components/page/loadding.vue'
  import {setStore,getStore,getCookie} from '../config/mUtils'
//  import {autoTableHtmlToJson,autoTable} from '../static/js/autotable'
  export default {
    components:{
      LeftTable,Vheader,Vauthor,Loadding
    },
    data() {
      return {
        "htmlTitle":"",
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
        "showLoadding":true,
        "loaddingMsg":'正在获取报告详情，请稍等',
        "show":true
      }
    },
    computed: {

    },
    updated() {
      let imgData=document.querySelectorAll(".mainContent  img");
      if(imgData.length>0){
        for(let item of imgData){
          item.style.width="100%";
        }
      }
    },
    methods: {
//      跳转至编辑页面
      EditPage(){
        let Url=window.location.href;
        console.log(Url,"******Url*******");
        let CreditId=Url.split("?")[1].split("=")[1];
        console.log(CreditId,"*******CreditId***********");
        this.CreditId=CreditId;
        this.$router.push('NewCredit?id='+CreditId);
      },
      pdf(){
        document.querySelector("#btn").style.display="none";
        this.show=false;
        setTimeout(()=>{
          var title = this.htmlTitle;
          html2Canvas(document.querySelector('#pdfDom'), {
             useCORS: true,
          }).then( (canvas)=> {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            let pageHeight = contentWidth / 592.28 * 841.89;
            let leftHeight = contentHeight;
            let position = 0;
            let imgWidth = 595.28;
            let imgHeight = 592.28 / contentWidth * contentHeight;
            let pageData = canvas.toDataURL('image/png', 1.0);
            let PDF = new JsPDF('', 'pt', 'a4');
            PDF.setFontSize(30);
            // //这里就是把将table写入到pdf里面。
//           var res = PDF.autoTableHtmlToJson(document.getElementsByClassName("table")[0], true);
//           PDF.autoTable(res.columns, res.data);
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'PNG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                if (leftHeight > 0) {
                  PDF.addPage();
                }
              }
            }
            PDF.save(title + '.pdf');
            document.querySelector("#btn").style.display="block";
            this.show=true;
          })
        },200);
      },
      //根据id获取信评报告明细
      getReportDetails(){
        let Url=window.location.href;
        console.log(Url,"******Url*******");
        let CreditId=Url.split("?")[1].split("=")[1];
        console.log(CreditId,"*******CreditId***********");
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
          console.log(response.data,"通过id拉取信评报告明细");
          if(response.data.status==200&&response.data.data!=null){
            this.showLoadding=false;
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
            this.Risk=this.reportData.creditRatingReportDetail.risk;
            this.Construction=this.reportData.creditRatingReportDetail.conclusion;
            this.htmlTitle=this.reportData.title;
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
      goBack(){
        this.$router.push("/module/myReport");
      }
    },
    mounted:function(){
      this.getReportDetails();
    },
  }
</script>

<style scoped>
    .Box{
        overflow-x: hidden;
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
        text-align: left;
        border-width: 1px;
        padding: 5px;
        background-color: #eef1f6;
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
    .mainContent{
        font-family: "Microsoft YaHei";
        font-size: 14px;
        display: inline-block;
        padding: 5px 6px;
        box-sizing: border-box;
        color: #333333;
        line-height: 22px;
        width: 100%;
    }
</style>
