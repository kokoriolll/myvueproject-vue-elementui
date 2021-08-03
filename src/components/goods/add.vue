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
                <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave">
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
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader
                                    v-model="addForm.goods_cat"
                                    :options="cateList"
                                    :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children' }"
                                    @change="handleChange"
                                    clearable></el-cascader>
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
                    goods_number: 0,
                    // 商品所属的分类数组
                    goods_cat: []
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
                    ],
                    goods_cat: [
                        { required: true, message: '请选择商品分类', trigger: 'change' }
                    ]
                },
                // 商品分类列表
                cateList: []
            }
        },
        methods: {
            // 获取商品分类
            async getCateList() {
                const {data : res} = await this.$http.get('categories');
                if (res.meta.status !== 200) {
                    return this.$message.error('获取分类失败')
                }
                this.cateList = res.data;
            },

            // 级联选择器选择后的事件
            handleChange() {
                // 判断只能选择第三级的分类
                if (this.addForm.goods_cat.length !== 3) {
                    this.addForm.goods_cat = []
                }
            },

            // Tab标签页切换的事件
            beforeTabLeave(activeName, oldActiveName) {
                if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
                    this.$message.error('请选择商品分类');
                    return false;
                }
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