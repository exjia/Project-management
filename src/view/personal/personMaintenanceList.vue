
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="search"></Icon>
                    个人日报列表
                </p>
               
                 <Form ref="searchMainDayReportData" :model="searchMainDayReportData" :label-width="100">
                    <Row>
                    <Col span="8" >
                            <DatePicker type="date" v-model="searchMainDayReportData.recordTime" placeholder="请选择日期" clearable style="width: 100%"></DatePicker>
                        </Col>
                        <Col span="4">
                            <Button type="primary" icon="ios-search" style="margin-left:10px" @click="searchData">查询</Button>
                        </Col>
                        <Col  type="flex" justify="end" :gutter="8" style="float: right;" >
                            <Button icon="ios-add"  type="success" @click="addData">创建</Button>
                        </Col>
                        
                    </Row>
                     
                    </Form>
                <Table :data="tableData" :columns="tableColumns"  :loading="loading" ref="tableExcel" class="margin-top-10"></Table>
                <div style="margin: 10px;overflow: hidden;">
                    <div style="float: right;">
                        <Page :total="total" :current="pageNo" :page-size="pageSize" size="small" @on-change="changePage" @on-page-size-change="pageSizeChange" show-total show-sizer></Page>
                    </div>
                </div>
            </Card>
        </Row>
        <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </div>
</template>

<script>
import table2excel from '@/libs/table2excel.js';
import {resetWorkHeight, formatDate} from '@/libs/util.js';
import { mapActions, mapState } from 'vuex';
import Cookies from 'js-cookie'
export default{
    name: 'personMainList',
    data () {
        return {   
            searchMainDayReportData: {
                recordTime: '',
                userCode:'',
                pageSort:'creatime', 
                pageOrder:'desc', 
                pageSize: '10',
                pageNo: '1' 
            },
            tableColumns: [
                {
                    title: '员工编号',
                    align: 'center',
                    key: 'userCode',
                    width:100
                },{
                    title: '员工姓名',
                    align: 'center',
                    key: 'userName',
                    width:100
                },{
                    title: '工作日期',
                    align: 'center',
                    key: 'recordTime',
                    width:110
                },{
                    title: '任务代码',
                    align: 'center',
                    key: 'projectTaskCode',
                    width:130
                },{
                    title: '任务名称',
                    align: 'center',
                    key: 'projectTaskName',
                    width: 200
                },{
                    title: '模块名称',
                    align: 'center',
                    key: 'modularName',
                    width:100
                    
                },{
                    title: '系统名称',
                    align: 'center',
                    key: 'systemName',
                    width:100
                },{
                    title: '任务大类',
                    align: 'center',
                    key: 'superiorTask',
                    width:100
                },{
                    title: '任务小类',
                    align: 'center',
                    key: 'lowerTask',
                    width:150
                    
                },{
                    title: '开始时间',
                    align: 'center',
                    key: 'startTime',
                    width:100
                    
                    
                },{
                    title: '结束时间',
                    align: 'center',
                    key: 'endTime',
                    width:100
                    
                },{
                    title: '完成百分比',
                    align: 'center',
                    key: 'taskCompletePercent',
                    width:120
                    
                },{
                    title: '任务用时',
                    align: 'center',
                    key: 'taskUseTime',
                    width:100
                    
                },{
                    title: '审核状态',
                    align: 'center',
                    key: 'auditStatus',
                    width: 100,
                    render: (h, params) => {
                        const row = params.row;
                        // console.log(row.auditStatus)
                        const color = row.auditStatus === '1000' ? 'orange' :  row.auditStatus === '2000' ? 'blue' : row.auditStatus === '3000' ? 'green' : 'red';
                        const text = row.auditStatus === '1000' ? '初始状态' :  row.auditStatus === '2000' ? '待审核' : row.auditStatus === '3000' ? '已审核' : '未通过';
                        return h('Tag', {props: {
                            color: color
                        }}, text);
                    }
                },
                {
                    title: '查看',
                    align: 'center',
                    width:140,
                    fixed: 'right',
                    render: (h, params) => {
                  
                        return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px',
                                    },
                                    on: {
                                        click: () => {
                                            // alert(params.row);
                                            let personId = {id: params.row.id};
                                            this.$router.push({
                                                name: 'personView',
                                                query: personId
                                            });
                                           
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '0px'
                                },
                                on: {
                                    click: () => {
                                         this.remove(params.index);
                                    }
                                }
                            }, '删除')     
                            ]);
                
                    }
                }
                
            ],
            excelFileName: 'data'

        };
    },
    computed: {
        ...mapState({
            loading: ({personMainList}) => personMainList.loading,
            tableData: ({personMainList}) => personMainList.personLista,
            searchPersonData: ({personMainList}) => personMainList.searchPersonData,
            pageNo: ({personMainList}) => personMainList.pageNo,
            total: ({personMainList}) => personMainList.record,
            pageSize: ({personMainList}) => personMainList.pageSize,
            pages: ({personMainList}) => personMainList.pages
        })
    },
    methods: {
        ...mapActions([
            'handlePersonMainList'
        ]),
        /**
         * 初始化
         */
        init () {
            // this.handlePersonMainList(this.$route.query.id);
            this.searchData(this.$route.query.userCode);
            
        },
        changeDate (date) {
            //   var now = new Date();
            //     this.searchMainDayReportData.updateTime= now;
            },
        /**
         * 点击查询按钮执行查询操作
         */
        searchData (e) {
        //    console.log(e)
            this.searchMainDayReportData.recordTime = formatDate(this.searchMainDayReportData.recordTime, 'yyyy-MM-dd');
            if (e == undefined) {this.searchMainDayReportData.userCode = Cookies.get('userCode')}
            else{
                // console.log(this.$route.query.userCode)
                this.searchMainDayReportData.userCode = this.$route.query.userCode
                }
            this.handlePersonMainList(this.searchMainDayReportData).then(res => {
                // console.log(tableData);
                resetWorkHeight();
                this.searchMainDayReportData.pageNo = 1;
                // this.$Message.info('查询成功!');
            });
        },
        /**
             * 系统名字模糊远程查询
             */
       searchSystem (query) {
             this.handleQueryBySearchSystem(query).then(res => {
                });
            },
       
     
        /**
         * 页面改变
         */
        changePage(index) {
            // this.searchFormDate.pageNo = index;
            // this.searchData();
            //  this.handlePersonMainList(this.searchFormDate, pageNo, this.pageSize).then(res => {
            //     this.$Message.info('查询成功!');
            // });
             this.searchMainDayReportData.pageNo = index;
            this.searchData(this.$route.query.userCode);
        },
        
        /**
         * 切换每页条数
         */
        pageSizeChange (newPageSize) {
           this.searchMainDayReportData.pageSize = newPageSize;
            this.searchData(this.$route.query.userCode);
        },
        /**
         * 查询取消按钮
         */
        cleanData () {
            window.location.reload();
        },
        remove (index) {
                // this.tableData.splice(index, 1);
                this.tableData.splice(index, 1);
            },
   
        /**
         * 添加数据
         */
        addData () {
            this.$router.push({name: 'personAdd'});
        },
        delData () {
            this.$Notice.success({
                title: '通知',
                desc: '提交成功!'
            });
        }

    },
    mounted () {
        this.init();
    }
};
</script>
<style>
    @import '../../styles/common.less';
    .ivu-back-top.ivu-back-top-show{ display: none!important;}
    .ivu-table-cell{ overflow-x: auto;}
    .ivu-table-cell .ivu-tag{margin-right: 0}
    .ivu-table table {
    /* width: 100% !important; 
    overflow-x:scroll !important */
}
    .ivu-tag{ padding: 0 6px;}
    /* .ivu-table-cell{padding-left:3px !important;padding-right:3px !important} */
    </style>
