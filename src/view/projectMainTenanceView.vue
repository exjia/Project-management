<style lang="less">
   @import '../styles/common.less';
   .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background-color: #f9f9f9;
    opacity: 1;
    cursor: not-allowed;
    color: #666;
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
                    <FormItem label="所属公司：">
                        <Input disabled v-model="projectViewData.companyName" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="所属系统："   >
                        <Input disabled v-model="projectViewData.systemName" ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="项目编码："   >
                        <Input disabled v-model="projectViewData.projectCode" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="项目名称：" >
                        <Input  disabled v-model="projectViewData.projectName"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="项目负责人：" >
                        <Input disabled v-model="projectViewData.projectOwnName" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="团队负责人：" >
                        <Input disabled v-model="projectViewData.teamOwnName" ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" offset="2">
                    <FormItem label="信息接口人姓名：" >
                        <Input disabled v-model="projectViewData.itPerson"  ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="业务接口人姓名：" >
                        <Input  disabled v-model="projectViewData.businessPerson" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem label="提出部门：" >
                        <Input  disabled v-model="projectViewData.proposeDepartment"  ></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                     <FormItem label="创建时间：" >
                         <Input disabled  v-model="projectViewData.createTime"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                     <FormItem label="更新时间：">
                         <Input disabled  v-model="projectViewData.updateName"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                     <FormItem label="计划上线日期：" >
                         <Input disabled  v-model="projectViewData.planOnlineDate"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                     <FormItem label="实际上线日期：" >
                         <Input disabled  v-model="projectViewData.realOnlineDate"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="18" offset="2">
                    <FormItem label="备注："  prop="remark">
                        <Input  disabled v-model="projectViewData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 2}" style="width:100%;"></Input>
                    </FormItem>
                    </Col>
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
        name: 'projectView',
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
                loading: ({projectView}) => projectView.loading,
                projectViewData: ({projectView}) => projectView.projectViewData
            })
        },
        methods: {
            ...mapActions([
                'handelQuerySystemViewById'
            ]),
            /**
             * 初始化页面高度
             */
            init () {
            this.querySystemById(this.$route.query.id);
            resetWorkHeight();
        },
        querySystemById (id) {
            this.handelQuerySystemViewById(id).then(res => {});
        },
            pageBack () {
                    this.$router.push({name: 'projectList'});
            }
            
        },
        mounted () {
            this.init();
        }
};
</script>
