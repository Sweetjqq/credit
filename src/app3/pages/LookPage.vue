<template>
    <div id="pdfDom">
        <div class="Box" id="Box">
            <Vauthor></Vauthor>
            <div class="header"></div>
            <Vheader :reportData="reportData" v-if="reportData"></Vheader>
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
                                <span class="sty_sm_title">Ⅱ.利润信息</span>
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
                                <label class="mainContent" v-html="Risk"></label>
                                <el-row>
                                    <el-button type="primary" size="mini" style="background: #dd9d87;border-color: #dd9d87;border-radius: 0">{投资性现金结论}</el-button>
                                    <el-button type="primary" size="mini" style="background: #a9a9a9;border-color: #a9a9a9;border-radius: 0">{经营现金结论}</el-button>
                                    <el-button type="primary" size="mini" style="background: #83b5ba;border-color: #83b5ba;border-radius: 0">{财务杠杆结论}</el-button>
                                </el-row>
                            </label>

                        </div>
                        <el-row class="btn" id="btn">
                            <el-button type="primary" size="medium " style="background: #1dacca;border-color:  #1dacca" @click="pdf">生成报告</el-button>
                            <el-button type="info"  size="medium " @click="goBack()">关闭</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>

</template>

<script>
  import {IpUrl} from '../config/IpUrl'
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  import  LeftTable from '../components/page/LeftTable.vue'
  import  Vauthor from '../components/page/header-bar2.vue'
  import Vheader from '../components/page/Vheader.vue'
  import {setStore,getStore} from '../config/mUtils'
  //  import {autoTableHtmlToJson,autoTable} from '../static/js/autotable'
  export default {
    components:{
      LeftTable,Vheader,Vauthor
    },
    data() {
      return {
        "htmlTitle":"信评报告",
        "Company_profile":"",
        "Profit_information":"",
        "Cash":"",
        "Assets":"",
        "Risk":"",
        "reportData":{
          "creditRatingReportDetail":{}
        },
        "LeftTableData":{},
      }
    },
    computed: {

    },
    updated() {
      if(document.querySelector(".mainContent  img")){
        document.querySelector(".mainContent  img") .style.width="100%";
      }
    },
    methods: {
      pdf(){
        document.querySelector("#btn").style.display="none";
        var title = this.htmlTitle;
        html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true
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
        })
      },
      // 预览数据
      pullReportDetail(){
        let Url=window.location.href.split("?")[1];
        console.log(Url,"**********Url*********");
        let bondCode=Url.split("&")[0].split("=")[1];
        let quarter=Url.split("&")[1].split("=")[1];
        console.log(bondCode+quarter,"**********bondCode+quarter*********");
        axios({
          method: 'get',
          url: IpUrl+'/v1/creditRating/pullReportDetail',
          headers: {
//            'Authorization':"bearer " +getCookie("Token"),
          },
          params:{
            "bondCode":bondCode,
            "quarter":quarter,
          },
        }).then( (response)=> {
          console.log(response.data,"bondCode+quarter");
          if(response.data.data!=null){
            this.reportData=response.data.data;
            this.LeftTableData=response.data.data;
            let data=JSON.parse(getStore("LookData"));
            console.log(data,"预览数据");

            this.Company_profile=this.reportData.creditRatingReportDetail.companyProfile;
            this.Profit_information=this.reportData.creditRatingReportDetail.profitInfo;
            this.Cash=this.reportData.creditRatingReportDetail.cashFlow;
            this.Assets=this.reportData.creditRatingReportDetail.assetsAndLiabilities;
            this.Risk=this.reportData.creditRatingReportDetail.risk;
          }

        })
          .catch(function (error) {
            console.log(error);
          });
      },
      goBack(){
        this.$router.push("/module/myReport");
      }
    },
    mounted:function(){
      this.pullReportDetail();
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

    }
</style>
