<template>
    <div class="AllTable" >
        <!--评级-->
        <div>
            <span class="Sty_title">评级</span>
            <table class="gridtable">
                <thead>
                <tr>
                    <th>评级机构</th>
                    <th>{{LeftTableData.ratingAgency}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>主体</td>
                    <td>{{LeftTableData.corporateCreditRating}}</td>
                </tr>
                <tr>
                    <td>债项</td>
                    <td>{{LeftTableData.debtCreditRating}}</td>
                </tr>
                <tr>
                    <td>展望</td>
                    <td>{{LeftTableData.ratingOutlook}}</td>
                </tr>
                </tbody>

            </table>
        </div>
        <!--财务概览-->
        <div>
            <span class="Sty_title">财务概览</span>
            <table class="gridtable">
                <thead>
                <tr>
                    <th>人民币亿</th>
                    <th>{{LeftTableData.Array[1]}}</th>
                    <th>{{LeftTableData.Array[0]}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>营业收入</td>
                    <td>{{LeftTableData.operRev1}}</td>
                    <td>{{LeftTableData.operRev}}</td>
                </tr>
                <tr>
                    <td>EBITDA</td>
                    <td>{{LeftTableData.ebitda1}}</td>
                    <td>{{LeftTableData.ebitda}}</td>
                </tr>
                <tr>
                    <td>EBITDA/营业收入（%）</td>
                    <td>{{persent(LeftTableData.ebitdaRate1)}}</td>
                    <td>{{persent(LeftTableData.ebitdaRate)}}</td>
                </tr>
                <tr>
                    <td> CFO</td>
                    <td>{{TwoFloor(LeftTableData.cfo1)}}</td>
                    <td >{{TwoFloor(LeftTableData.cfo)}}</td>
                </tr>
                <tr>
                    <td>FFO</td>
                    <td>{{TwoFloor(LeftTableData.ffo1)}}</td>
                    <td>{{TwoFloor(LeftTableData.ffo)}}</td>
                </tr>
                <tr>
                    <td>资产负债率 (%)</td>
                    <td>{{persent(LeftTableData.assetLiabilityRatio1)}}</td>
                    <td>{{persent(LeftTableData.assetLiabilityRatio)}}</td>
                </tr>
                <tr>
                    <td>总债务/EBITDA(X)</td>
                    <td>{{LeftTableData.grossDebt_Ebitda1}}</td>
                    <td>{{LeftTableData.grossDebt_Ebitda}}</td>
                </tr>
                <tr>
                    <td>流动比率 (X)</td>
                    <td>{{LeftTableData.currentRatio1}}</td>
                    <td>{{LeftTableData.currentRatio}}</td>
                </tr>
                <tr>
                    <td>速动比率(X) </td>
                    <td>{{LeftTableData.quickRatio1}}</td>
                    <td>{{LeftTableData.quickRatio}}</td>
                </tr>
                <tr>
                    <td>毛利润(%) </td>
                    <td>{{persent(LeftTableData.grossProfitRate1)}}</td>
                    <td>{{persent(LeftTableData.grossProfitRate)}}</td>
                </tr>
                </tbody>

            </table>
        </div>
        <!--存续债务-->
        <div>
            <span class="Sty_title">存续债务</span>
            <label class="add_two">
                <font>{{LeftTableData.upTo}}</font>
            </label>
            <div>
                <span style="font-size: 14px;display: inline-block;line-height: 16px;margin: 5px 0 5px 5px;color: #666;">借款</span>
                <table class="gridtable">
                    <thead>
                    <tr>
                        <th width="60%">人民币</th>
                        <th>余额(亿)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>短期</td>
                        <td>{{TwoFloor(LeftTableData.stBorrow)}}</td>
                    </tr>
                    <tr>
                        <td>一年内到期</td>
                        <td>{{TwoFloor(LeftTableData.nonCurLiabDueWithin1y)}}</td>
                    </tr>
                    <tr>
                        <td>长期</td>
                        <td>{{TwoFloor(LeftTableData.ltBorrow)}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--债券-->
            <div>
                <span style="font-size: 14px;display: inline-block;line-height: 16px;margin: 15px 0 5px 5px;color: #666;">债券</span>
                <table class="gridtable">
                    <thead>
                    <tr>
                        <th width="60%">人民币</th>
                        <th>余额(亿)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1年以内</td>
                        <td>{{TwoFloor(LeftTableData.stBondsPayable)}}</td>
                    </tr>
                    <tr>
                        <td>1年以上</td>
                        <td>{{TwoFloor(LeftTableData.bondsPayable)}}</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props:['LeftTableData'],
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      toJson(value){
        return JSON.parse(value);
      },
        //按照亿为单位
      TwoFloor(value){
//        return (value/100000000).toFixed(2);
        return value;
      },
        // 百分比转换
      persent(value){
        return value;
      }

    },
    created:function(){

    },
  }
</script>

<style scoped>
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
        overflow: hidden;
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
        width: 100%;
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
    .AllTable{
        overflow-x: hidden;
    }
</style>
