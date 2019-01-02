<style lang="less">
   @import '../../styles/common.less';
   .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background-color: #f9f9f9;
    opacity: 1;
    cursor: not-allowed;
    color: #929292;
}
</style>
<template>
    <div>
        <Form  :label-width="120">
            <Card>
                <p slot="title">
                    <Icon type="edit"></Icon>
                    项目详细
                </p>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="员工编号："   >
                        <Input disabled v-model="personViewData.userCode" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="员工姓名：">
                        <Input disabled v-model="personViewData.userName" ></Input>
                    </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="工作日期：">
                        <Input disabled v-model="personViewData.recordTime" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="任务代码："   >
                        <Input disabled v-model="personViewData.projectTaskCode" ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="任务名称："   >
                        <Input disabled v-model="personViewData.projectTaskName" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="模块名称：" >
                        <Input  disabled v-model="personViewData.modularName"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="系统名称：" >
                        <Input disabled v-model="personViewData.systemName" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="任务大类：" >
                        <Input disabled v-model="personViewData.superiorTask" ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="任务小类：" >
                        <Input disabled v-model="personViewData.lowerTask"  ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="开始时间：" >
                        <Input  disabled v-model="personViewData.startTime" ></Input>
                    </FormItem>
                    </Col>
                    </Row>
                    <Row>
                    <Col span="8" offset="2">
                    <FormItem label="结束时间：" >
                        <Input  disabled v-model="personViewData.endTime"  ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                     <FormItem label="完成百分比：" >
                         <Input disabled  v-model="personViewData.taskCompletePercent"></Input>
                    </FormItem>
                    </Col>
                    </Row>
                    <Row>
                    <Col span="8" offset="2">
                     <FormItem label="任务用时：">
                         <Input disabled  v-model="personViewData.taskUseTime"></Input>
                    </FormItem>
                    </Col>
                    <!-- <Col span="8" offset="2">
                     <FormItem label="审核状态：" >
                         <Input disabled  v-model="personViewData.recordTime"></Input>
                    </FormItem>
                    </Col> -->
                </Row>
                <Row>
                    <Col span="8" offset="12">
                    <Button type="primary" icon="ios-undo" @click.prevent="pageBack">返回</Button>
                    </Col>
                </Row>
                
            </Card>
            
        </Form>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {resetWorkHeight, isEmpty} from '@/libs/util.js';
    import { mapActions, mapState } from 'vuex';
    export default{
        name: 'personView',
        //  data () {
        // return {
        //     searchFormDate: {
        //         projectName: '',
        //         companyName: '',
        //         projectOwnCode: '',
        //         projectOwnName: '',
        //         businessPerson: '',
        //         teamOwnName: '',
        //         pageSize: '10',
        //         pageNo: '1',
        //     }
        // }},
        computed: {
            ...mapState({
                loading: ({personView}) => personView.loading,
                personViewData: ({personView}) => personView.personViewData
            })
        },
        methods: {
            ...mapActions([
                'handelQueryPersonDayWorkById'
            ]),
            /**
             * 初始化页面高度
             */
            init () {
            this.querySystemById(this.$route.query.id);
            resetWorkHeight();
        },
        querySystemById (id) {
            this.handelQueryPersonDayWorkById(id).then(res => {});
        },
            pageBack () {
                // console.log(this.personViewData.userCode)
                let personuserCode = {userCode: this.personViewData.userCode};
                                            this.$router.push({
                                                name: 'personmainList',
                                                query: personuserCode
                                            });
                    // this.$router.push({name: 'personmainList'});
            }
            
        },
        mounted () {
            this.init();
        }
};
</script>
