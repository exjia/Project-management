
<template>
    <div>
        <Form ref="searchProjectData" :rules="ruleValidate" :model="searchProjectData" :label-width="120">
            <Card>
                <p slot="title">
                    <Icon type="edit"></Icon>
                    创建项目
                </p>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="所属公司：" prop="companyName">
                         <Select :label-in-value="true" filterable remote :remote-method="searchCompany"  @on-change='getCompanyCode'  :loading="loading"   placeholder="请输入公司名称|自动搜索" style="width:100%" >
                                 <Option v-for="item in searchCompanyData"  :value="item.code" :key="item.value" :label="item.value" >{{item.value}}</Option>
                                </Select>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="所属系统：" prop="systemName">
                        <Select :label-in-value="true"  filterable remote :remote-method="searchSystem"  @on-change='getProjectCode'  :loading="loading"   placeholder="请输入系统名称|自动搜索" style="width: 100%" >
                                 <Option v-for="item in searchSystemData"  :value="item.code" :key="item.value" :label="item.value" >{{item.value}}</Option>
                                </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="项目编码：" >
                        <Input disabled v-model="searchProjectData.projectCode" style="width: 100%" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="项目名称：" prop="projectName">
                        <Input  v-model="searchProjectData.projectName" placeholder="请输入项目名称"  style="width: 100%"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="项目负责人：" >
                        <Select  :label-in-value="true"   filterable remote :remote-method="searchprojectOwnName"  @on-change='getProjectOwnCode' :loading="loading" placeholder="请输入团队名称|自动搜索" style="width:100%">
                            <Option v-for="item in searchprojectOwnNameData"  :value="item.code" :key="item.value" :label="item.value" >{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="团队负责人：" >
                        <Select :label-in-value="true"  filterable remote :remote-method="searchteamOwnName" :loading="loading"  @on-change='getTeamOwnCode'  placeholder="请输入团队负责人名称|自动搜索" style="width:100%" >
                                 <Option v-for="item in searchteamOwnNameData"  :value="item.code" :key="item.value"  :label="item.value">{{item.value}}</Option>
                       </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="信息接口人姓名：" >
                        <Input v-model="searchProjectData.itPerson"  placeholder="请输入信息接口人姓名" style="width: 100%"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="业务接口人姓名：" >
                        <Input  v-model="searchProjectData.businessPerson"  placeholder="请输入业务接口人姓名" style="width: 100%"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="提出部门：" >
                        <Input  v-model="searchProjectData.proposeDepartment"  placeholder="请输入提出部门"  style="width: 100%"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                     <FormItem label="计划上线日期：" prop="planOnlineDate">
                         <DatePicker type="date" v-model="searchProjectData.planOnlineDate" placeholder="请选择计划上线日期" clearable style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="18" offset="2">
                    <FormItem label="备注："  prop="remark">
                        <Input  v-model="searchProjectData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 2}" style="width: 100%"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="4" offset="9">
                    <Button type="primary" icon="ios-checkmark-circle-outline" @click="addProjectToRev('searchProjectData')">提交</Button>
                    </Col>
                    <Col span="4" >
                    <Button type="primary" icon="ios-undo" @click.prevent="pageBack">返回</Button>
                    </Col>
                </Row>
                
            </Card>
            
        </Form>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {resetWorkHeight, formatDate} from '@/libs/util.js';
    import { mapActions, mapState } from 'vuex';
    export default{
        name: 'projectAdd',
        inject: ['reload'],
        data: function () {
            const validateRemarkCheck = (rule, value, callback) => {
                if (value.length > 200) {
                    callback(new Error('备注最大长度200!'));
                }
                callback();
            };
            // const validateStartDateCheck = (rule, value, callback) => {
            //     if (formatDate(this.searchProjectData.planOnlineDate, 'yyyy-MM-dd') < formatDate(new Date(), 'yyyy-MM-dd')){
            //         callback(new Error('计划上线日期需大于当天!'));
            //     }
            //     callback();
            // };
            const validateStartDateCheck = (rule, value, callback) => {
                var date = new Date(value);
                var now = new Date();
                if (date.getTime() <= now.getTime()) {
                    callback(new Error('计划上线日期需大于当天!'));
                }
                callback();
            };
            // const validateProjectNameCheck = (rule, value, callback) => {
            //     var reg = /\s/;
            //     if (value === '' || value === null || reg.test(value) === true) {
            //         callback(new Error('请输入项目名称!'));
            //     }
            //     if (value !== undefined && value.length > 20) {
            //         callback(new Error('最大长度20!'));
            //     }
            //     for (let i = 0; i < this.searchprojectNameData.length; i++) {
            //         if (value === this.searchprojectNameData[i].value) {         
            //             callback(new Error('该项目名称已存在，请重新输入项目名称!'));
            //         }
            //     }
            //     callback();
            // };
            const validateProjectNameCheck = (rule, value, callback) => {
                var reg = /\s/;
                if (value === '' || value === null || reg.test(value) === true) {
                    callback(new Error('请输入正确的项目名称!'));
                } else if (value !== undefined && value.length > 100) {
                    callback(new Error('最大长度20!'));
                } else {
                    this.handlevalidateProjectNameCheck(this.searchProjectData.projectName).then(res => {
                        console.log('handlevalidateProjectNameCheck',this.message)
                        if (this.message!== '成功') {
                            callback(new Error(this.message));
                        } 
                        callback();    
                    });
                }
            };
            
  
            return {
                ruleValidate: {
                    projectName: [
                        { required: true, message: '请输入项目名称!', trigger: 'change' },
                        { validator: validateProjectNameCheck}
                    ],
                    companyName: [
                        { required: true, message: '请输入公司名称!', trigger: 'change' }
                    ],
                    systemName: [
                        { required: true, message: '请输入系统名称!', trigger: 'change' }
                    ],
                    planOnlineDate: [
                        { required: true, type: 'date', message: '请选择计划上线日期!',trigger: 'change' },
                        { validator: validateStartDateCheck}
                    ],  
                    remark: [
                        {  message: '请填写备注!', trigger: 'change' },
                        { validator: validateRemarkCheck }
                    ] 

                }
                

            };
        },
        computed: {
            ...mapState({
                searchProjectData: ({projectAdd}) => projectAdd.searchProjectData,
                searchCompanyData: ({projectAdd}) => projectAdd.searchCompanyData,
                searchSystemData: ({projectAdd}) => projectAdd.searchSystemData,
                searchprojectNameData: ({projectAdd}) => projectAdd.searchprojectNameData,
                searchgetProjectCode: ({projectAdd}) => projectAdd.searchgetProjectCode,
                searchprojectOwnNameData: ({projectAdd}) => projectAdd.searchprojectOwnNameData,
                searchteamOwnNameData: ({projectAdd}) => projectAdd.searchteamOwnNameData,
                searchvalidateProjectNameCheck: ({projectAdd}) => projectAdd.searchvalidateProjectNameCheck,
                loading: ({projectAdd}) => projectAdd.loading,
                message: ({projectAdd}) => projectAdd.message
            })
        },
        methods: {
            ...mapActions([
                'handleQueryBySearchSystem',
                'handleQueryBySearchcompanyName1',
                'handleAddProjectToRev',
                'handleResetSearchProjectData',
                'handleQueryBySearchprojectName',
                'handleQueryByGetProjectCode',
                'handlevalidateProjectNameCheck',
                'handleQueryBySearchprojectOwnName',
                'handleQueryBySearchteamOwnName'
            ]),
            /**
             * 初始化页面高度
             */
            init () {
                resetWorkHeight();
            },
            /**
             * 登录名查询登录信息
             */
            pageBack () {
                this.handleResetSearchProjectData().then(res => {
                    this.$router.push({name: 'projectList'});
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
             * 公司名字模糊远程查询
             */
            searchCompany (query) {
                this.handleQueryBySearchcompanyName1(query).then(res => {
                    // console.log(this.searchCompanyData.code);
                    // this.searchProjectData.companyCode = this.searchCompanyData[index].code;    
                });
            },
             /**
             * 项目名称模糊远程查询
             */
            searchprojectName (query) {
             this.handleQueryBySearchprojectName(query).then(res => {
                });
            },
            getProjectCode (data) {
                this.handleQueryByGetProjectCode(data).then(res => {
                    // console.log('this.searchgetProjectCode.data',this.searchgetProjectCode)
                    this.searchProjectData.projectCode = this.searchgetProjectCode;
                });
                this.searchProjectData.systemCode = data.value;      
                this.searchProjectData.systemName = data.label; 
            },
            /**
             * 项目负责人模糊远程查询
             */
            searchprojectOwnName (query) {
             this.handleQueryBySearchprojectOwnName(query).then(res => {
                    // console.log(this.searchSystemData);
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
             * 获取公司代码
             */
            getCompanyCode (data) {   
                this.searchProjectData.companyCode = data.value; 
                this.searchProjectData.companyName = data.label;
                // console.log(this.searchProjectData.companyCode);
                //  console.log(this.searchProjectData.companyName);   
                
            },/**
             * 获取项目own代码
             */
            getProjectOwnCode (data) {
                console.log(data);
                this.searchProjectData.projectOwnCode = data.value;   
                this.searchProjectData.projectOwnName = data.label;
            },
            getTeamOwnCode (data) {
                
                this.searchProjectData.teamOwnCode = data.value;   
                this.searchProjectData.teamOwnName = data.label;
                // console.log(this.searchProjectData.projectOwnCode);
                //  console.log(this.searchProjectData.projectOwnName);
            },
            submitAddData () {
                this.handleAddProjectToRev(this.searchProjectData).then(res => {
                    // resetWorkHeight();
                    if (this.message == '项目创建成功') {
                        this.$Modal.success({
                            title: '提示',
                            content: this.message,
                            onOk: () => {
                                            // let type = 1
                                            // this.$router.push({
                                            //     name: 'projectList',
                                            //     query: type
                                            // });
                                            this.reload();
                                    this.$router.push({name: 'projectList'});
                                    //  this.$Message.info('查询成功!');
                            }
                        });
                    } else {
                        this.$Modal.error({
                            title: '提示',
                            content: this.message
                        });
                    }
                });
            },
            addProjectToRev (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //  console.log(this.searchProjectData);
                         this.submitAddData();
                    } else {
                        this.$Message.error('验证错误!');
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    }
</script>
<style lang="less">
   @import '../styles/common.less';
</style>