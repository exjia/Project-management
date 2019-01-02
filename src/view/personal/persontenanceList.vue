
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="search"></Icon>
                    项目查询
                </p>
                <Form ref="searchDayReportData" :model="searchDayReportData" :label-width="100">
                    <Row>
                        <Col span="8" offset="2">
                            <FormItem label="按年搜索：">
                            <DatePicker type="year" v-model="searchDayReportData.dayReportYear" @on-change="cleardayReportMD"  placeholder="请选择年份" clearable style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                            <FormItem label="按月搜索：" >
                            <DatePicker type="month" v-model="searchDayReportData.dayReportMonth"  @on-change="cleardayReportYD" placeholder="请选择月份" clearable style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8" offset="2">
                            <FormItem label="按日搜索：">
                            <DatePicker type="date" v-model="searchDayReportData.dayReportDay" @on-change="cleardayReportYM"  placeholder="请选择日期" clearable style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                            <FormItem label="员工姓名：">
                                <Input placeholder="请输入人员名称" v-model="searchDayReportData.userName" clearable style="width: 100%"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                 
                    <Row>
                        <Col span="4" offset="9">
                            <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
                        </Col>
                        <Col span="4">
                            <Button icon="ios-sync" @click="cleanData">重置</Button>
                        </Col>
                       
                        
                    </Row>
                </Form>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon type="search"></Icon>
                    日数据列表
                </p>
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
export default{
    name: 'personList',
    data () {
        return {
            searchDayReportData: {
                dayReportYear: '',
                dayReportMonth: '',
                dayReportDay: '',
                userName: '',
                pageSort:'creatime', 
                pageOrder:'desc', 
                pageSize: '10',
                pageNo: '1' 
            },
            tableColumns: [
                {
                    title: '年',
                    align: 'center',
                    key: 'dayReportYear',
                    width: 80
                    
                },{
                    title: '月',
                    align: 'center',
                    key: 'dayReportMonth',
                    width: 60
                },{
                    title: '日',
                    align: 'center',
                    key: 'dayReportDay',
                    width: 60
                },
                {
                    title: '员工编号',
                    align: 'center',
                    key: 'userCode',
                    width: 100
                },
                {
                    title: '员工姓名',
                    align: 'center',
                    key: 'userName'
                },{
                    title: '日工作时长',
                    align: 'center',
                    key: 'taskUseTime',
                    width: 100
                },{
                    title: '审核状态',
                    align: 'center',
                    key: 'auditStatus',
                    width: 100,
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
                        const text = row.status === 1 ? '审核中' : row.status === 2 ? '已审核' : '未审核';
                        return h('Tag', {props: {
                            color: color
                        }}, text);
                    }
                },{
                    title: '查看',
                    align: 'center',
                    render: (h, params) => {
                  
                        return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params.row);
                                            let personuserCode = {userCode: params.row.userCode};
                                            this.$router.push({
                                                name: 'personmainList',
                                                query: personuserCode
                                            });
                                           
                                        }
                                    }
                                }, '查看')     
                            ]);
                
                    }
                }
                
            ],
            excelFileName: 'data'

        };
    },
    computed: {
        ...mapState({
            loading: ({personList}) => personList.loading,
            tableData: ({personList}) => personList.personLista,
            searchPersonData: ({personList}) => personList.searchPersonData,
            pageNo: ({personList}) => personList.pageNo,
            total: ({personList}) => personList.record,
            pageSize: ({personList}) => personList.pageSize,
            pages: ({personList}) => personList.pages
        })
    },
    methods: {
        ...mapActions([
            'handlePersonList'
        ]),
        /**
         * 初始化
         */
        init () {
            this.searchData();
        },
        changeDate (date) {
            //   var now = new Date();
            //     this.searchDayReportData.updateTime= now;
            },
        /**
         * 点击查询按钮执行查询操作
         */
        searchData () {       
            this.searchDayReportData.dayReportYear = formatDate(this.searchDayReportData.dayReportYear, 'yyyy');
            this.searchDayReportData.dayReportMonth = formatDate(this.searchDayReportData.dayReportMonth, 'yyyy-MM');
            this.searchDayReportData.dayReportDay = formatDate(this.searchDayReportData.dayReportDay, 'yyyy-MM-dd');   
            this.handlePersonList(this.searchDayReportData).then(res => {
                // resetWorkHeight();
                // this.searchDayReportData.pageNo = 1;
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
            this.searchDayReportData.pageNo = index;
            this.searchData(this.$route.query.userCode);
        },
        
        /**
         * 切换每页条数
         */
        pageSizeChange (newPageSize) {
            this.searchDayReportData.pageSize = newPageSize;
            this.searchData(this.$route.query.userCode);
        },
        /**
         * 查询取消按钮
         */
        cleanData () {
            window.location.reload();
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
        },
        cleardayReportMD(){
            this.searchDayReportData.dayReportMonth = ''
            this.searchDayReportData.dayReportDay = ''
        },
        cleardayReportYD(){
            this.searchDayReportData.dayReportYear = ''
            this.searchDayReportData.dayReportDay = ''
        },
        cleardayReportYM(){
            this.searchDayReportData.dayReportMonth = ''
            this.searchDayReportData.dayReportYear = ''
        }
        // getActivedayReportMonth (date) {
        //     this.searchDayReportData.dayReportMonth = formatDate(date, 'MM');
        //      console.log('dayReportMonth',this.searchDayReportData.dayReportMonth)
            
        // },
        // getActivedayReportDay (date) { 
        //     this.searchDayReportData.dayReportDay = formatDate(date, 'dd');
        //     console.log('dayReportDay',this.searchDayReportData.dayReportDay)
        // }

    },
    mounted () {
        this.init();
    }
};
</script>
<style>
    @import '../../styles/common.less';
    .ivu-back-top.ivu-back-top-show{ display: none!important;}
    .ivu-table-cell{padding-left:0 !important;padding-right:0 !important}
    </style>
