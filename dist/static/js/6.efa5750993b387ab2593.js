webpackJsonp([6],{"0IUB":function(e,r,t){"use strict";t.d(r,"a",function(){return i});var n=t("aA9S"),o=t.n(n),a=t("3cXf"),s=(t.n(a),t("Umb+")),i=function(e){e=e||{};var r=null,t=window.location.href;if(-1!=t.indexOf("?")&&(r=t.substr(t.lastIndexOf("?")+1)),r)return e=o()(e,s.parse(r))}},"3cXf":function(e,r,t){e.exports={default:t("RJ+u"),__esModule:!0}},A8fE:function(e,r,t){"use strict";t.d(r,"c",function(){return o}),t.d(r,"a",function(){return a}),t.d(r,"b",function(){return s});var n=t("3cXf"),o=(t.n(n),function(e,r){var t=new Date;t.setTime(t.getTime()+864e5),document.cookie=e+"="+escape(r)+";expires="+t.toGMTString()}),a=function(e){var r,t=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(r=document.cookie.match(t))?unescape(r[2]):null},s=function(e){var r=new Date;r.setTime(r.getTime()-1);var t=a(e);null!=t&&(document.cookie=e+"="+t+";expires="+r.toGMTString())}},NOzR:function(e,r,t){(e.exports=t("UTlt")(!0)).push([e.i,"\n.el-autocomplete-suggestion.el-popper {\r\n  width: 480px !important;\n}\r\n","",{version:3,sources:["C:/Users/hp/Desktop/4/YaoQ.Beehive.CreditGradeWebSite/src/app3/pages/module1/src/app3/pages/module1/createReport.vue"],names:[],mappings:";AAkSA;EACA,wBAAA;CACA",file:"createReport.vue",sourcesContent:['<template>\r\n<div style="min-width:1060px;">\r\n  <el-row>\r\n  <el-col :span="16" style="\r\n    padding-top: 70px;min-width:670px;  padding-left:70px;\r\n">\r\n<div class="block" style="margin-bottom:20px;">\r\n  <label class="el-form-item__label" style="font-weight:700;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;债券</label>\r\n\r\n<el-autocomplete\r\n    ref="bondcode"\r\n  v-model="state4"\r\n  :fetch-suggestions="querySearchAsync"\r\n  placeholder="请输入内容"\r\n  :value="bondName"\r\n      @select="handleSelect"\r\n></el-autocomplete>\r\n    &nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 12px;color: #549baf;">请按照债券简称或者债券代码查询</span>\r\n</div>\r\n\r\n    <div style="margin-top: 20px;margin-left: 28px;display:inline-block;">\r\n   <label class="el-form-item__label"  style="font-weight:700;">季度</label>\r\n    <el-select v-model="value10" ref="Month" placeholder="请选择">\r\n    <el-option\r\n      v-for="item in options5"\r\n      :key="item"\r\n      :label="item"\r\n      :value="item"\r\n      >\r\n    </el-option>\r\n  </el-select>\r\n  </div>\r\n      <div style="margin-top: 20px;margin-left: 28px;display:inline-block;">\r\n   <label class="el-form-item__label"  style="font-weight:700;">年</label>\r\n    <el-select @focus="queryMonth()" ref="Month1" v-model="value11" placeholder="请选择">\r\n    <el-option\r\n      v-for="item in arr1"\r\n      :key="item"\r\n      :label="item"\r\n      :value="item"\r\n      >\r\n    </el-option>\r\n  </el-select>\r\n   <label class="el-form-item__label"  style="font-weight:700;float:right;padding-left:10px;">季度</label>\r\n  </div>\r\n  <el-form ref="form" :model="form" label-width="80px" style="margin-top:28px;">\r\n    <el-button type="primary" plain style="\r\n    margin-left: 80px;margin:\'10px\'\r\n" @click="createReportClick">创建报告</el-button>\r\n  </el-form>\r\n  </el-col>\r\n</el-row>\r\n    </div>\r\n</template>\r\n<script>\r\nconst qs = require(\'querystring\');\r\nimport {parseUrl} from "../../common/util.js"\r\nimport { getCookie ,removeCookie} from "../../api/util";\r\nimport {port} from \'../../config/port\'\r\nimport { setCookie } from \'../../../../../m-strategy/src/config/index.js\';\r\nexport default {\r\n  methods: {},\r\n\r\n  data() {\r\n    return {\r\n      bondName:\'\',\r\n      bondCode:\'\',\r\n      companyCode: "",\r\n      options: [],\r\n      options5: [],\r\n      options6: [],\r\n      value10: [],\r\n      value11: [],\r\n      list: [],\r\n      bondcode: "",\r\n      loading: false,\r\n      arr1: [],\r\n      form: {\r\n        name: "",\r\n        data1: "",\r\n        data2: ""\r\n      },\r\n      time: "",\r\n      states: [],\r\n      restaurants: [],\r\n      state4: "",\r\n      timeout: null,\r\n      queryObj:{}\r\n    };\r\n  },\r\n  created(){\r\n \r\n  },\r\n  mounted() {\r\n    parseUrl(this.queryObj);\r\n    console.log( parseUrl(this.queryObj));\r\n    console.log(getCookie(\'Token\'))\r\n     console.log(getCookie(\'currentUserId\'));\r\n     console.log(this.queryObj.currentUserId);\r\n     if(!getCookie(\'Token\')){\r\n                 removeCookie(\'Token\')\r\nremoveCookie(\'currentUserId\')\r\nremoveCookie(\'DepartmentId\')\r\n        this.$router.push("/login");\r\n     }\r\n     if(this.queryObj.Token){\r\n        if(!getCookie(\'Token\') ||getCookie(\'Token\') == undefined ||getCookie(\'Token\') == null || getCookie(\'currentUserId\')!==this.queryObj.currentUserId){\r\n        this.isHasToken();\r\n      }\r\n     }\r\n   \r\n   \r\n  },\r\n  methods: {\r\n    isHasToken() {\r\n    console.log(this.GetRequest(),\';111\')\r\n    setCookie("Token", this.queryObj.Token);\r\n    setCookie("currentUserId", this.queryObj.currentUserId);\r\n    setCookie("departName", this.queryObj.departName);\r\n    location.reload();\r\n    },\r\n    \r\n GetRequest() { \r\n    \r\n},\r\n    queryMonth() {\r\n      this.arr1 = [];\r\n      if (this.curdata) {\r\n        this.time = JSON.stringify(\r\n          this.curdata.quarterList[this.$refs.Month.value]\r\n        );\r\n        this.options6 = this.curdata.quarterList[this.$refs.Month.value];\r\n        for (let item in this.options6) {\r\n          this.arr1.push(item);\r\n        }\r\n      } else {\r\n        this.time = "";\r\n      }\r\n    },\r\n\r\n    querySearchAsync(queryString, cb) {\r\n      if (queryString) {\r\n        axios({\r\n          method: "get",\r\n          url: "/v1/creditRating/bondNameListAtCreate",\r\n headers: {\r\n          Authorization:\r\n            "bearer " +\r\n             getCookie(\'Token\')\r\n        },\r\n          params: {\r\n            userName: getCookie("currentUserId"),\r\n            publisher: "",\r\n            bond: queryString\r\n          }\r\n        }).then(res => {\r\n           if(res.data.status == 401){\r\n           this.$message({\r\n            message: "token过期"\r\n          });\r\n          removeCookie(\'Token\')\r\nremoveCookie(\'currentUserId\')\r\nremoveCookie(\'DepartmentId\')\r\n\r\n        this.$router.push("/login");\r\n\r\n        }\r\n          console.log(res.data.data, "resres");\r\n          if (res.data.data.length == 0) {\r\n            this.$message({\r\n              message: "请确认债券简称或债券代码是否正确！"\r\n            });\r\n          } else {\r\n            let arr = [];\r\n            for (let item of res.data.data) {\r\n              let obj = {\r\n                value: "",\r\n                code: "",\r\n                companyCode: ""\r\n              };\r\n              obj.value = item.bondName;\r\n              obj.code = item.bondCode;\r\n              obj.companyCode = item.companyCode;\r\n              arr.push(obj);\r\n            }\r\n            console.log(arr, "arr");\r\n            this.restaurants = arr;\r\n            var restaurants = this.restaurants;\r\n            var results = restaurants;\r\n            clearTimeout(this.timeout);\r\n            this.timeout = setTimeout(() => {\r\n              cb(results);\r\n            }, 3000 * Math.random());\r\n          }\r\n        }).catch((error)=>{\r\n       if (error == \'Error: Request failed with status code 504\') {\r\n        this.$message({\r\n            message: "服务器超时"\r\n        });\r\n        removeCookie(\'Token\')\r\nremoveCookie(\'currentUserId\')\r\nremoveCookie(\'DepartmentId\')\r\n\r\n        this.$router.push("/login");\r\n\r\n      }\r\n      })\r\n      }\r\n    },\r\n    createStateFilter(queryString) {\r\n      return state => {\r\n        return (\r\n          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0\r\n        );\r\n      };\r\n    },\r\n\r\n    handleSelect(item) {\r\n      this.bondName  = item.value;\r\n      setTimeout(() => {\r\n        axios({\r\n          method: "get",\r\n          url: "/v1/creditRating/quarterAtCreate",\r\n headers: {\r\n          Authorization:\r\n            "bearer " +\r\n             getCookie(\'Token\')\r\n        },\r\n          params: {\r\n            userName: getCookie("currentUserId"),\r\n            bondCode: item.code\r\n          }\r\n        }).then(res => {\r\n           if(res.data.status == 401){\r\n           this.$message({\r\n            message: "token过期"\r\n          });\r\n          removeCookie(\'Token\')\r\nremoveCookie(\'currentUserId\')\r\nremoveCookie(\'DepartmentId\')\r\n\r\n        this.$router.push("/login");\r\n\r\n        }\r\n          console.log(res.data.data, "res.data.data");\r\n          this.companyCode = item.companyCode;\r\n          this.bondCode = item.code;\r\n          console.log(item, "sssss");\r\n          this.curdata = res.data.data;\r\n          console.log(res, "caocaoca");\r\n          this.options5 = res.data.data.yearList;\r\n        }).catch((error)=>{\r\n       if (error == \'Error: Request failed with status code 504\') {\r\n        this.$message({\r\n            message: "服务器超时"\r\n        });\r\n        removeCookie(\'Token\')\r\nremoveCookie(\'currentUserId\')\r\nremoveCookie(\'DepartmentId\')\r\n\r\n        this.$router.push("/login");\r\n\r\n      }\r\n      })\r\n      });\r\n    },\r\n\r\n    //创建报告\r\n    createReportClick() {\r\n      console.log( this.bondCode, this.companyCode, this.time);\r\n      const value = this.$refs.Month1.value;\r\n      if (this.time && this.$refs.bondcode.value) {\r\n        this.time = JSON.parse(this.time)[value];\r\n        this.$router.push(\r\n          "/CreateCredit?bondCode=" +\r\n            this.bondCode +\r\n            "&quarter=" +\r\n            this.time +"&companyCod="+ this.companyCode\r\n        );\r\n      } else {\r\n        this.$message({\r\n          message: "缺少季报信息，无法生成报表！"\r\n        });\r\n      }\r\n    }\r\n  }\r\n};\r\n<\/script>\r\n\r\n<style>\r\n.el-autocomplete-suggestion.el-popper {\r\n  width: 480px !important;\r\n}\r\n</style>\r\n'],sourceRoot:""}])},"RJ+u":function(e,r,t){var n=t("AKd3"),o=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},UcwK:function(e,r,t){"use strict";t.d(r,"a",function(){return n});var n={dev:"",test:"",song:"",pro:""}},f0a6:function(e,r,t){var n=t("NOzR");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t("FIqI")("69888e9e",n,!1,{})},u4Mv:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t("a3Yh"),o=t.n(n),a=t("HzJ8"),s=t.n(a),i=t("3cXf"),l=t.n(i),c=t("0IUB"),u=t("A8fE");t("UcwK");t("Umb+");const d=(e,r)=>{let t=new Date;t.setTime(t.getTime()+216e5),document.cookie=e+"="+escape(r)+";expires="+t.toGMTString()};t("Umb+");var m=o()({methods:{},data:function(){return{bondName:"",bondCode:"",companyCode:"",options:[],options5:[],options6:[],value10:[],value11:[],list:[],bondcode:"",loading:!1,arr1:[],form:{name:"",data1:"",data2:""},time:"",states:[],restaurants:[],state4:"",timeout:null,queryObj:{}}},created:function(){},mounted:function(){Object(c.a)(this.queryObj),console.log(Object(c.a)(this.queryObj)),console.log(Object(u.a)("Token")),console.log(Object(u.a)("currentUserId")),console.log(this.queryObj.currentUserId),Object(u.a)("Token")||(Object(u.b)("Token"),Object(u.b)("currentUserId"),Object(u.b)("DepartmentId"),this.$router.push("/login")),this.queryObj.Token&&(Object(u.a)("Token")&&void 0!=Object(u.a)("Token")&&null!=Object(u.a)("Token")&&Object(u.a)("currentUserId")===this.queryObj.currentUserId||this.isHasToken())}},"methods",{isHasToken:function(){console.log(this.GetRequest(),";111"),d("Token",this.queryObj.Token),d("currentUserId",this.queryObj.currentUserId),d("departName",this.queryObj.departName),location.reload()},GetRequest:function(){},queryMonth:function(){if(this.arr1=[],this.curdata)for(var e in this.time=l()(this.curdata.quarterList[this.$refs.Month.value]),this.options6=this.curdata.quarterList[this.$refs.Month.value],this.options6)this.arr1.push(e);else this.time=""},querySearchAsync:function(e,r){var t=this;e&&axios({method:"get",url:"/v1/creditRating/bondNameListAtCreate",headers:{Authorization:"bearer "+Object(u.a)("Token")},params:{userName:Object(u.a)("currentUserId"),publisher:"",bond:e}}).then(function(e){if(401==e.data.status&&(t.$message({message:"token过期"}),Object(u.b)("Token"),Object(u.b)("currentUserId"),Object(u.b)("DepartmentId"),t.$router.push("/login")),console.log(e.data.data,"resres"),0==e.data.data.length)t.$message({message:"请确认债券简称或债券代码是否正确！"});else{var n=[],o=!0,a=!1,i=void 0;try{for(var l,c=s()(e.data.data);!(o=(l=c.next()).done);o=!0){var d=l.value,m={value:"",code:"",companyCode:""};m.value=d.bondName,m.code=d.bondCode,m.companyCode=d.companyCode,n.push(m)}}catch(e){a=!0,i=e}finally{try{!o&&c.return&&c.return()}finally{if(a)throw i}}console.log(n,"arr"),t.restaurants=n;var p=t.restaurants;clearTimeout(t.timeout),t.timeout=setTimeout(function(){r(p)},3e3*Math.random())}}).catch(function(e){"Error: Request failed with status code 504"==e&&(t.$message({message:"服务器超时"}),Object(u.b)("Token"),Object(u.b)("currentUserId"),Object(u.b)("DepartmentId"),t.$router.push("/login"))})},createStateFilter:function(e){return function(r){return 0===r.value.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(e){var r=this;this.bondName=e.value,setTimeout(function(){axios({method:"get",url:"/v1/creditRating/quarterAtCreate",headers:{Authorization:"bearer "+Object(u.a)("Token")},params:{userName:Object(u.a)("currentUserId"),bondCode:e.code}}).then(function(t){401==t.data.status&&(r.$message({message:"token过期"}),Object(u.b)("Token"),Object(u.b)("currentUserId"),Object(u.b)("DepartmentId"),r.$router.push("/login")),console.log(t.data.data,"res.data.data"),r.companyCode=e.companyCode,r.bondCode=e.code,console.log(e,"sssss"),r.curdata=t.data.data,console.log(t,"caocaoca"),r.options5=t.data.data.yearList}).catch(function(e){"Error: Request failed with status code 504"==e&&(r.$message({message:"服务器超时"}),Object(u.b)("Token"),Object(u.b)("currentUserId"),Object(u.b)("DepartmentId"),r.$router.push("/login"))})})},createReportClick:function(){console.log(this.bondCode,this.companyCode,this.time);var e=this.$refs.Month1.value;this.time&&this.$refs.bondcode.value?(this.time=JSON.parse(this.time)[e],this.$router.push("/CreateCredit?bondCode="+this.bondCode+"&quarter="+this.time+"&companyCod="+this.companyCode)):this.$message({message:"缺少季报信息，无法生成报表！"})}}),p=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticStyle:{"min-width":"1060px"}},[t("el-row",[t("el-col",{staticStyle:{"padding-top":"70px","min-width":"670px","padding-left":"70px"},attrs:{span:16}},[t("div",{staticClass:"block",staticStyle:{"margin-bottom":"20px"}},[t("label",{staticClass:"el-form-item__label",staticStyle:{"font-weight":"700"}},[e._v("       债券")]),e._v(" "),t("el-autocomplete",{ref:"bondcode",attrs:{"fetch-suggestions":e.querySearchAsync,placeholder:"请输入内容",value:e.bondName},on:{select:e.handleSelect},model:{value:e.state4,callback:function(r){e.state4=r},expression:"state4"}}),e._v("\r\n        "),t("span",{staticStyle:{"font-size":"12px",color:"#549baf"}},[e._v("请按照债券简称或者债券代码查询")])],1),e._v(" "),t("div",{staticStyle:{"margin-top":"20px","margin-left":"28px",display:"inline-block"}},[t("label",{staticClass:"el-form-item__label",staticStyle:{"font-weight":"700"}},[e._v("季度")]),e._v(" "),t("el-select",{ref:"Month",attrs:{placeholder:"请选择"},model:{value:e.value10,callback:function(r){e.value10=r},expression:"value10"}},e._l(e.options5,function(e){return t("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),t("div",{staticStyle:{"margin-top":"20px","margin-left":"28px",display:"inline-block"}},[t("label",{staticClass:"el-form-item__label",staticStyle:{"font-weight":"700"}},[e._v("年")]),e._v(" "),t("el-select",{ref:"Month1",attrs:{placeholder:"请选择"},on:{focus:function(r){e.queryMonth()}},model:{value:e.value11,callback:function(r){e.value11=r},expression:"value11"}},e._l(e.arr1,function(e){return t("el-option",{key:e,attrs:{label:e,value:e}})})),e._v(" "),t("label",{staticClass:"el-form-item__label",staticStyle:{"font-weight":"700",float:"right","padding-left":"10px"}},[e._v("季度")])],1),e._v(" "),t("el-form",{ref:"form",staticStyle:{"margin-top":"28px"},attrs:{model:e.form,"label-width":"80px"}},[t("el-button",{staticStyle:{"margin-left":"80px",margin:"'10px'"},attrs:{type:"primary",plain:""},on:{click:e.createReportClick}},[e._v("创建报告")])],1)],1)],1)],1)};p._withStripped=!0;var h={render:p,staticRenderFns:[]},b=h;var f=!1;var g=t("vSla")(m,b,!1,function(e){f||t("f0a6")},null,null);g.options.__file="src\\app3\\pages\\module1\\createReport.vue";r.default=g.exports}});
//# sourceMappingURL=6.efa5750993b387ab2593.js.map