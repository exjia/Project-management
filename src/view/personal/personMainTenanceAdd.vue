
<template>
    <div>
        <Form ref="addPersonData" :rules="ruleValidate" :model="addPersonData" :label-width="120">
            <Card>
                <p slot="title">
                    <Icon type="edit"></Icon>
                    添加日报
                </p>
                 <Row>
                    <Col span="8" offset="2">
                    <FormItem label="工作日期：" >
                        <DatePicker type="date" v-model="addPersonData.recordTime" placeholder="请选择工作日期" clearable style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="员工编号：" >
                        <Input disabled v-model="addPersonData.userCode" style="width: 100%" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="员工姓名：">
                        <Input disabled v-model="addPersonData.userName" style="width: 100%" ></Input>
                    </FormItem>
                    </Col>
                </Row>
               
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="任务代码：" prop="projectTaskCode">
                         <Select :label-in-value="true" v-model="addPersonData.projectTaskCode"  filterable remote :remote-method="searchprojectCode"  @on-change='getProjectOwnCode'  :loading="loading" placeholder="请输入任务名称|自动搜索"   style="width:100%" >
                                 <Option v-for="item in searchprojectCodeData"  :value="item.code+'$^'+item.value" :key="item.code">{{item.code}}</Option>
                                </Select>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="任务名称：" >
                      <Input disabled v-model="addPersonData.projectTaskName" style="width: 100%" ></Input>
                    </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="模块名称：" prop="modularName">
                        <Input  v-model="addPersonData.modularName" placeholder="请按照计划中模块填写" style="width: 100%" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="系统名称：" prop="systemName">
                       <Select  v-model="addPersonData.systemName" filterable remote :remote-method="searchSystem"   :loading="loading" placeholder="请输入系统名称|自动搜索" style="width:100%">
                            <Option v-for="item in searchSystemData"  :value="item.value" :key="item.value" :label="item.value" >{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="任务大类：" prop="superiorTask">
                        <Select :label-in-value="true"  @on-change='searchLowerTask'   filterable :loading="loading" placeholder="全部">
                             <Option v-for="item in searchSuperiorTaskData" :value="item.code" :key="item.value" :label="item.value">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="任务小类：" prop="lowerTask">
                       <!-- <Select  :label-in-value="true"   v-model="addPersonData.lowerTask" filterable remote :remote-method="searchLowerTask"  @on-change='getProjectOwnCode' :loading="loading" placeholder="请输入任务名称|自动搜索" style="width:100%">
                            <Option v-for="item in searchLowerTaskData"  :value="item.value" :key="item.code" :label="item.code" >{{item.value}}</Option>
                        </Select> -->
                          <Select v-model="addPersonData.lowerTask" filterable :loading="loading" placeholder="全部">
                             <Option v-for="item in searchLowerTaskData" :value="item.value" :key="item.value" :label="item.value">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="8" offset="2">
                     <FormItem label="开始时间：" prop="startTime" >
                        <TimePicker v-model="addPersonData.startTime" @on-change='getTaskUseTime' format="HH:mm:ss" placeholder="请选择开始时间" style="width: 100%"></TimePicker>
                    </FormItem>
                    </Col>
                     <Col span="8" offset="2">
                    <FormItem label="结束时间：" prop="endTime" >
                        <TimePicker v-model="addPersonData.endTime"  @on-change='getTaskUseTime' format="HH:mm:ss" placeholder="请选择结束时间" style="width: 100%"></TimePicker>
                    </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="任务用时：">
                         <Input disabled v-model="addPersonData.taskUseTime" style="width: 100%" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="完成百分比："  prop="taskCompletePercent">
                        <Input v-model="addPersonData.taskCompletePercent" style="width:100%; " ></Input><span class="percent-icon">%</span>
                    </FormItem>
                    </Col> 
                
                     </Row>
                
                    <Row>
                <Col span="18" offset="2">
                    <FormItem label="工作备注：" prop="workInfoRemake">
                         <Input  v-model="addPersonData.workInfoRemake" type="textarea" :autosize="{minRows: 2,maxRows: 2}" style="width: 100%"></Input>
                    </FormItem>
                    </Col>
                     </Row>

                <Row>
                    <Col span="4" offset="9">
                    <Button type="primary" icon="ios-checkmark-circle-outline"  @click="addPersonToRev('addPersonData')">保存</Button>
                    </Col>
                </Row>
                <Row>
                <Table :data="tableData" :columns="tableColumns"  class="margin-top-20 margin-bottom-10"></Table>
                </Row>
         
                <Row>
                    <Col span="4" offset="9">
                    <Button type="primary" icon="ios-checkmark-circle-outline" @click="submitAddData()">提交</Button>
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

    import {resetWorkHeight, formatDate, isEmpty} from '@/libs/util.js'
    import { mapActions, mapState } from 'vuex'
    import Cookies from 'js-cookie'
    export default{
        name: 'personAdd',
        data: function () {
            const validateRemarkCheck = (rule, value, callback) => {
                if (value.length > 200) {
                    callback(new Error('备注最大长度200!'));
                }
                callback();
            };
            const validatetaskCompletePercent = (rule, value, callback) => {
                var reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                if (isEmpty(this.addPersonData.taskCompletePercent)) {
                    callback(new Error('值不能为空'));
                } else if (!reg.test(this.addPersonData.taskCompletePercent)) {
                    callback(new Error('应为正数,最多保留两位小数'));
                }
                else if(this.addPersonData.taskCompletePercent>100){
                    callback(new Error('应小于等于100%'));
                }
                callback();
            };
          
            const validateStartTimeCheck = (rule, value, callback) => {
                var startTime = value.split(":")
                var endTime = this.addPersonData.endTime.split(":")
                // console.log(startTime)
                // console.log(endTime)
                var a = startTime[0]*3600+startTime[1]*60+startTime[2]
                var b = endTime[0]*3600+endTime[1]*60+endTime[2]
                // console.log(a)
                // console.log(b)
                if (value === ' ' || value === null) {
                    callback(new Error('请选择开始时间!'));
                }
                else if( a > b || a === b){
                    callback(new Error('开始时间要小于结束时间'));
                }
                callback();
            };
            const validateEndTimeCheck = (rule, value, callback) => {
                var startTime = this.addPersonData.startTime.split(":")
                var endTime = value.split(":")
                var m = startTime[0]*3600+startTime[1]*60+startTime[2]
                var n = endTime[0]*3600+endTime[1]*60+endTime[2]
                // console.log('startTime',m)
                // console.log('endTime',n)
                if (value === ' ' || value === null) {
                    callback(new Error('请选择结束时间!'));
                }
                else if( m > n || m === n ){
                    callback(new Error('结束时间要大于开始时间'));
                }
                callback();
            };
            const validateSuperiorTask = (rule, value, callback) => {
                if (value === ' ' || value === null) {
                    callback(new Error('请选择任务大类!'));
                }
                callback();
            };
  
            return {
                tableData: [],
                i:0,
                ruleValidate: {
                    projectTaskCode: [
                        { required: true, message: '请输入任务代码!'},
                    ],
                    modularName: [
                        { required: true,  message: '请输入模块名称!', trigger: 'change' },
                    ],
                    systemName: [
                        { required: true, message: '请输入系统名称!', trigger: 'change' },
                    ],
                    superiorTask: [
                        { required: true, message: '请选择任务大类!', trigger: 'change' },
                        { validator: validateSuperiorTask}
                    ],
                    lowerTask: [
                        { required: true, message: '请选择任务小类!', trigger: 'change' },
                    ],
                    startTime: [
                        { required: true,  message: '请选择开始时间!',trigger: 'change' },
                        { validator: validateStartTimeCheck}
                    ],
                    endTime: [
                        { required: true,  message: '请选择开始时间!',trigger: 'change' },
                        { validator: validateEndTimeCheck}
                    ],  
                    taskCompletePercent: [
                        { required: true,  message: '请填写百分比!',trigger: 'change' },
                        { validator: validatetaskCompletePercent }
                    ],
                    workInfoRemake: [
                        { required: true, message: '请填写备注!', trigger: 'change' },
                        { validator: validateRemarkCheck }
                    ] 

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
                    width:180
                },{
                    title: '任务名称',
                    align: 'center',
                    key: 'projectTaskName',
                    width: 180
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
                },
                {
                    title: '查看',
                    align: 'center',
                    width:80,
                    fixed: 'right',
                    render: (h, params) => {
                  
                        return h('div', [
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
                
            ]
                

            };
        },
        computed: {
            ...mapState({
                addPersonData: ({personAdd}) => personAdd.addPersonData,
                searchprojectCodeData: ({personAdd}) => personAdd.searchprojectCodeData,
                searchSystemData: ({personAdd}) => personAdd.searchSystemData,
                searchSuperiorTaskData: ({personAdd}) => personAdd.searchSuperiorTaskData,
                searchLowerTaskData: ({personAdd}) => personAdd.searchLowerTaskData,
                getTaskUseTimedata: ({personAdd}) => personAdd.getTaskUseTimedata,
             
                loading: ({personAdd}) => personAdd.loading,
                message: ({personAdd}) => personAdd.message
            })
        },
        methods: {
            ...mapActions([
                'handleQueryBySearchprojectCode',
                'handleQueryBySearchSystem',
                'handleAddPersonToRev',
                'handleResetSearchPersonData',
                'handleQueryBysearchSuperiorTask',
                'handleQueryBygetTaskUseTime',
                'handleQueryBysearchLowerTask'
            ]),
            /**
             * 初始化页面高度
             */
            init () {
                this.addPersonData.userName = Cookies.get('userName')
                this.addPersonData.userCode = Cookies.get('userCode')
                this.addPersonData.recordTime = new Date()
                this.addPersonData.startTime = new Date(new Date().getTime() - 1 * 60 * 60 * 1000)
                this.addPersonData.endTime = new Date()
                this.addPersonData.taskUseTime = 1
                this.searchSuperiorTask();
                this.searchSuperiorTask();
                resetWorkHeight();
            },
            /**
             * 登录名查询登录信息
             */
            pageBack () {
                this.handleResetSearchPersonData().then(res => {
                    this.$router.push({name: 'personmainList'});
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
             * 任务代码模糊远程查询
             */
            searchprojectCode (query) {
             this.handleQueryBySearchprojectCode(query).then(res => {
                //  console.log(res)
                //  this.addPersonData.projectTaskName = this.value;
                });
            },
            getProjectOwnCode (data) {
                console.log(data);
                this.addPersonData.projectTaskName = this.addPersonData.projectTaskCode.split('$^')[1];
            },
            getTaskUseTime(data) {  
                if (this.addPersonData.startTime !== '' && this.addPersonData.endTime !== '') {
                    var paramObj = {
                        startTime: this.addPersonData.startTime,
                        endTime: this.addPersonData.endTime,
                    };
                    this.handleQueryBygetTaskUseTime(paramObj).then(res => {
                         this.addPersonData.taskUseTime=this.getTaskUseTimedata
                    });
                }
            },
            
             /**
             * 任务大类
             */
            searchSuperiorTask(query) {
             this.handleQueryBysearchSuperiorTask(query).then(res => {       
                });
               
                //  console.log(this)
                
            },
            /**
             * 任务小类
             */
            searchLowerTask(query) {
                // console.log(query)
                   this.addPersonData.superiorTask= query.label
                   this.addPersonData.lowerTask = ''
            //   const query =this.addPersonData.superiorTask
              this.handleQueryBysearchLowerTask(query.value).then(res => {
                  
                });
                
                // 
            },

           remove (index) {
                // this.tableData.splice(index, 1);
                this.tableData.splice(index, 1);
            },
           
            save(){
                //   if(this.i<8){
                  let obj = {}
                    obj.userCode = this.addPersonData.userCode;
                    obj.userName = this.addPersonData.userName;
                    obj.recordTime = formatDate(this.addPersonData.recordTime, 'yyyy-MM-dd');;
                    obj.projectTaskCode = this.addPersonData.projectTaskCode.split('$^')[0];
                    obj.projectTaskName = this.addPersonData.projectTaskName;
                    obj.modularName = this.addPersonData.modularName;
                    obj.systemName = this.addPersonData.systemName;
                    obj.superiorTask = this.addPersonData.superiorTask;
                    obj.lowerTask = this.addPersonData.lowerTask;
                    obj.startTime = this.addPersonData.startTime;
                    obj.endTime = this.addPersonData.endTime;
                    obj.taskCompletePercent = this.addPersonData.taskCompletePercent;
                    obj.taskUseTime = this.addPersonData.taskUseTime;
                    // this.i=this.i+1;
                //    console.log(obj)
                    this.tableData.push(obj)
                    console.log(this.tableData)            
            },
             submitAddData () {
                this.handleAddPersonToRev(this.tableData).then(res => {
                    // resetWorkHeight();
                    if (this.message == '日报保存成功') {
                        this.$Modal.success({
                            title: '提示',
                            content: this.message,
                            onOk: () => {
                                    this.$router.push({name: 'personmainList'});
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
            addPersonToRev (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //  console.log(this.addPersonData);
                        //  if(this.addPersonData.taskUseTime<=0)
                        //  {
                        //    this.$Message.error('结束时间需大于开始时间!');
                        //  }
                        //  else{
                               this.save();
                        //  }
                         
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
   @import '../../styles/common.less';
   .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background-color: #f9f9f9;
    opacity: 1;
    cursor: not-allowed;
    color: #666;
}
.ivu-table-cell{ overflow-x: auto;}
.percent-icon{
position:absolute;right:2px;top:2px; padding-right:8px; padding-left:2px; height:30px;background:#fff;z-index:9}
</style>