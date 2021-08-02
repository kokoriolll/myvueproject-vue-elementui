<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片试图区域 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert
                    title="添加商品信息"
                    type="info"
                    center
                    show-icon
                    :closable="false">
            </el-alert>

            <!-- 步骤条区域 -->
            <el-steps :active="+activeIndex" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <!-- tab栏区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-position="top" label-width="100px">
                <el-tabs v-model="activeIndex" :tab-position="'left'">
                    <el-tab-pane name="0" label="基本信息">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"/>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input type="number" v-model="addForm.goods_price"/>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input type="number" v-model="addForm.goods_weight"/>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input type="number" v-model="addForm.goods_number"/>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane name="1" label="商品参数">商品参数</el-tab-pane>
                    <el-tab-pane name="2" label="商品属性">商品属性</el-tab-pane>
                    <el-tab-pane name="3" label="商品图片">商品图片</el-tab-pane>
                    <el-tab-pane name="4" label="商品内容">商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                activeIndex: '0',
                // 添加商品的表单数据对象
                addForm: {
                    goods_name: '',
                    goods_price: 0,
                    goods_weight: 0,
                    goods_number: 0
                },
                // 添加商品表单的验证规则
                addFormRules: {
                    goods_name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    goods_price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                    goods_weight: [
                        { required: true, message: '请输入商品重量', trigger: 'blur' }
                    ],
                    goods_number: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getCateList() {
                this.$http.get('categories').then(res => {
                    console.log(res);
                }).catch().finally();
            }
        },
        created() {
            // 获取所有商品分类数据
            this.getCateList()
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>