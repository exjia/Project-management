<style lang="less">
    @import '../styles/common.less';
    .ivu-back-top.ivu-back-top-show{ display: none!important;}
    </style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="search"></Icon>
                    项目查询
                </p>
                <Form ref="searchFormDate" :model="searchFormDate" :label-width="100">
                    <Row>
                        <Col span="8" offset="2">
                            <FormItem label="所属系统:"  >
                                <Select v-model="searchFormDate.systemName" filterable remote :remote-method="searchSystem" :loading="loading" placeholder="请输入系统名称|自动搜索" clearable style="width:270px" >
                                 <Option v-for="item in searchSystemData"  :value="item.value" :key="item.value"  >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                            <FormItem label="所属公司:">
                               <Select v-model="searchFormDate.companyName" filterable remote :remote-method="searchCompany" :loading="loading" placeholder="请输入公司名称|自动搜索" clearable style="width:270px" >
                                 <Option v-for="item in searchCompanyData"  :value="item.value" :key="item.value"  >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8" offset="2">
                            <FormItem label="项目编号:" >
                                <Select   v-model="searchFormDate.projectCode" filterable remote :remote-method="searchprojectCode"  :loading="loading" placeholder="请输入项目代码|自动搜索"  clearable style="width:270px" >
                                 <Option v-for="item in searchprojectCodeData"  :value="item.code" :key="item.code"  >{{item.code}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                            <FormItem label="项目名称:">
                                <Select v-model="searchFormDate.projectName" filterable remote :remote-method="searchprojectName" :loading="loading" placeholder="请输入项目名称|自动搜索" clearable style="width:270px" >
                                 <Option v-for="item in searchprojectNameData"  :value="item.value" :key="item.value"  >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8" offset="2">
                            <FormItem label="项目负责人:" >
                                <Select v-model="searchFormDate.projectOwnName" filterable remote :remote-method="searchprojectOwnName" :loading="loading" placeholder="请输入项目负责人名称|自动搜索" clearable style="width:270px" >
                                 <Option v-for="item in searchprojectOwnNameData"  :value="item.value" :key="item.value"  >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                            <FormItem label="团队负责人:">
                                <Select v-model="searchFormDate.teamOwnName" filterable remote :remote-method="searchteamOwnName" :loading="loading" placeholder="请输入团队负责人名称|自动搜索" clearable style="width:270px" >
                                 <Option v-for="item in searchteamOwnNameData"  :value="item.value" :key="item.value"  >{{item.value}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8" offset="2">
                            <FormItem label="上线状态:">
                                <Select v-model="searchFormDate.isOnline" style="width:270px" clearable placeholder="全部">
                                    <Option placeholder="上线状态"   v-for="item in isOnlineList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                        <FormItem label="项目状态:">
                            <Select v-model="searchFormDate.projectStatus" style="width:270px" clearable placeholder="全部">
                                <Option placeholder="请选择人员状态"   v-for="item in projectStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
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
                    项目列表
                </p>
                <!-- <a href="#" slot="extra" @click.prevent="exportExcel">
                    <Icon type="ios-cloud-download"></Icon>
                    导出数据
                </a> -->
              <Row type="flex" justify="end" :gutter="8" >
                    <Col>
                        <Button icon="ios-add"  type="success" @click="addData">创建</Button>
                    </Col>
                </Row>
            
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
    name: 'projectList',
    // inject: ['reload'],
    data () {
        return {
            isOnlineList: [{
                value: '1',
                label: '已上线'
            }, {
                value: '0',
                label: '未上线'

            }],
            projectStatusList: [{
                value: '',
                label: '全部'
            }, {
                value: '0',
                label: '状态一'
            }, {
                value: '1',
                label: '状态二'
            }, {
                value: '2',
                label: '状态三'
            }],
            searchFormDate: {
                projectName: '',
                companyName: '',
                projectOwnCode: '',
                projectOwnName: '',
                businessPerson: '',
                teamOwnName: '',
                pageSize: '10',
                pageNo: '1',
                pageSort:'creatime', 
                pageOrder:'desc'
            },
            tableColumns: [
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    title: '项目编号',
                    align: 'center',
                    key: 'projectCode',
                    width:180
                },{
                    title: '项目名称',
                    align: 'center',
                    key: 'projectName',
                    width:130
                },{
                    title: '所属公司',
                    align: 'center',
                    key: 'companyName',
                    width:100
                    // render: (h, params) => {
                    //     const row = params.row;
                    //     return h('div', [
                    //         h('div', row.teamMain.companyName)
                    //     ]);
                    // }
                },{
                    title: '所属系统',
                    align: 'center',
                    key: 'systemName',
                    width:100
                },{
                    title: '项目负责人',
                    align: 'center',
                    key: 'projectOwnName',
                    width:110
                },{
                    title: '团队负责人',
                    align: 'center',
                    key: 'teamOwnName',
                    width:110
                },{
                    title: '信息接口人',
                    align: 'center',
                    key: 'itPerson',
                    width:110
                },{
                    title: '业务接口人',
                    align: 'center',
                    key: 'businessPerson',
                    width:110
                },{
                    title: '提出部门',
                    align: 'center',
                    key: 'proposeDepartment',
                    width:150
                },{
                    title: '计划上线日期',
                    align: 'center',
                    key: 'planOnlineDate',
                    width: 120
                },{
                    title: '创建时间',
                    align: 'center',
                    key: 'createTime',
                    width: 120  
                }, {
                    title: '更新时间',
                    align: 'center',
                    key: 'updateTime',
                    width: 120
                }
                ,{
                    title: '查看',
                    align: 'center',
                    width:80,
                    fixed: 'right',
                    render: (h, params) => {
                  
                        return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // alert(params.row);
                                            let projectId = {id: params.row.id};
                                            this.$router.push({
                                                name: 'projectView',
                                                query: projectId
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
            loading: ({projectList}) => projectList.loading,
            tableData: ({projectList}) => projectList.projectLista,
            searchSystemData: ({projectList}) => projectList.searchSystemData,
            searchCompanyData: ({projectList}) => projectList.searchCompanyData,
            searchprojectCodeData: ({projectList}) => projectList.searchprojectCodeData,
            searchprojectNameData: ({projectList}) => projectList.searchprojectNameData,
            searchprojectOwnNameData: ({projectList}) => projectList.searchprojectOwnNameData,
            searchteamOwnNameData: ({projectList}) => projectList.searchteamOwnNameData,
            pageNo: ({projectList}) => projectList.pageNo,
            total: ({projectList}) => projectList.record,
            pageSize: ({projectList}) => projectList.pageSize,
            pages: ({projectList}) => projectList.pages
        })
    },
    methods: {
        ...mapActions([
            'handleProjectList',
            'handleQueryBySearchSystem',
            'handleQueryBySearchcompanyName',
            'handleQueryBySearchprojectCode',
            'handleQueryBySearchprojectName',
            'handleQueryBySearchprojectOwnName',
            'handleQueryBySearchteamOwnName'
        ]),
        /**
         * 初始化
         */
        init () {
            // console.log(this.$route.query.type)
            
            this.searchData();
        
            // this.handleProjectList();
        },
        
        /**
         * 点击查询按钮执行查询操作
         */
        searchData () {
            
            this.handleProjectList(this.searchFormDate).then(res => {
            //  console.log(res)
                // resetWorkHeight();
                // this.searchFormDate.pageNo = 1;
                // this.$Message.info('查询成功!');
                //  this.reload();
                
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
             * 公司名称模糊远程查询
             */
       searchCompany (query) {
             this.handleQueryBySearchcompanyName(query).then(res => {
             
                });
            },
            /**
             * 项目代码模糊远程查询
             */
       searchprojectCode (query) {
             this.handleQueryBySearchprojectCode(query).then(res => {
                });
            },
           /**
             * 项目名称模糊远程查询
             */
       searchprojectName (query) {
             this.handleQueryBySearchprojectName(query).then(res => {
                });
            },
            /**
             * 项目负责人模糊远程查询
             */
       searchprojectOwnName (query) {
             this.handleQueryBySearchprojectOwnName(query).then(res => {
                
                });
            },
            /**
             * 团队负责人模糊远程查询
             */
       searchteamOwnName (query) {
             this.handleQueryBySearchteamOwnName(query).then(res => {
                    // console.log(this.searchSystemData);
                });
            },
        /**
         * 页面改变
         */
        changePage(index) {
            this.searchFormDate.pageNo = index;
            this.searchData();
        },
        /**
         * 切换每页条数
         */
        pageSizeChange (newPageSize) {
            this.searchFormDate.pageSize = newPageSize;
            this.searchData();
        },
        /**
         * 查询取消按钮
         */
        cleanData () {
            window.location.reload();
        },
        /**
         * 导出execl
         */
        exportExcel () {
            table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
        },
        /**
         * 添加数据
         */
        addData () {
            this.$router.push({name: 'projectAdd'});
        }

    },
    mounted () {
        this.init();
        // console.log('e')
    }
};
</script>
