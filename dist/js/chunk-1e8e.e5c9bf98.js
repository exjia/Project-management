(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e8e"],{7279:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Form",{attrs:{"label-width":120}},[a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"edit"}}),e._v("\n                项目详细\n            ")],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"员工编号："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.userCode,callback:function(t){e.$set(e.personViewData,"userCode",t)},expression:"personViewData.userCode"}})],1)],1),a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"员工姓名："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.userName,callback:function(t){e.$set(e.personViewData,"userName",t)},expression:"personViewData.userName"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"工作日期："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.recordTime,callback:function(t){e.$set(e.personViewData,"recordTime",t)},expression:"personViewData.recordTime"}})],1)],1),a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"任务代码："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.projectTaskCode,callback:function(t){e.$set(e.personViewData,"projectTaskCode",t)},expression:"personViewData.projectTaskCode"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"任务名称："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.projectTaskName,callback:function(t){e.$set(e.personViewData,"projectTaskName",t)},expression:"personViewData.projectTaskName"}})],1)],1),a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"模块名称："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.modularName,callback:function(t){e.$set(e.personViewData,"modularName",t)},expression:"personViewData.modularName"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"系统名称："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.systemName,callback:function(t){e.$set(e.personViewData,"systemName",t)},expression:"personViewData.systemName"}})],1)],1),a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"任务大类："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.superiorTask,callback:function(t){e.$set(e.personViewData,"superiorTask",t)},expression:"personViewData.superiorTask"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"任务小类："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.lowerTask,callback:function(t){e.$set(e.personViewData,"lowerTask",t)},expression:"personViewData.lowerTask"}})],1)],1),a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"开始时间："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.startTime,callback:function(t){e.$set(e.personViewData,"startTime",t)},expression:"personViewData.startTime"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"结束时间："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.endTime,callback:function(t){e.$set(e.personViewData,"endTime",t)},expression:"personViewData.endTime"}})],1)],1),a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"完成百分比："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.taskCompletePercent,callback:function(t){e.$set(e.personViewData,"taskCompletePercent",t)},expression:"personViewData.taskCompletePercent"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"2"}},[a("FormItem",{attrs:{label:"任务用时："}},[a("Input",{attrs:{disabled:""},model:{value:e.personViewData.taskUseTime,callback:function(t){e.$set(e.personViewData,"taskUseTime",t)},expression:"personViewData.taskUseTime"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"8",offset:"12"}},[a("Button",{attrs:{type:"primary",icon:"ios-undo"},on:{click:function(t){return t.preventDefault(),e.pageBack(t)}}},[e._v("返回")])],1)],1)],1)],1)],1)},o=[],r=a("c93e"),n=a("c276"),i=a("2f62"),l={name:"personView",computed:Object(r["a"])({},Object(i["e"])({loading:function(e){var t=e.personView;return t.loading},personViewData:function(e){var t=e.personView;return t.personViewData}})),methods:Object(r["a"])({},Object(i["b"])(["handelQueryPersonDayWorkById"]),{init:function(){this.querySystemById(this.$route.query.id),Object(n["o"])()},querySystemById:function(e){this.handelQueryPersonDayWorkById(e).then(function(e){})},pageBack:function(){var e={userCode:this.personViewData.userCode};this.$router.push({name:"personmainList",query:e})}}),mounted:function(){this.init()}},p=l,u=(a("caca"),a("2877")),c=Object(u["a"])(p,s,o,!1,null,null,null);c.options.__file="personMainTenanceView.vue";t["default"]=c.exports},caca:function(e,t,a){"use strict";var s=a("ed6f"),o=a.n(s);o.a},ed6f:function(e,t,a){}}]);