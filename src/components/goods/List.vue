<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="input">
                        <el-button slot="append" icon="el-icon-search"/>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加商品</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "List",
        data () {
            return {
                // 查询参数对象
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                // 商品列表
                goodsList: [],
                // 商品总数
                total: 0
            }
        },
        methods: {
            async getGoodsList() {
                const {data:res} = await this.$http.get('goods', { params: this.queryInfo })
                if(res.meta.status !== 200) {
                    return this.$message.error('获取失败')
                }
                this.$message.success('获取成功');
                this.goodsList = res.data.goods;
                this.total = res.data.total;
            }
        },
        created() {
            this.getGoodsList();
        }
    }
</script>

<style scoped>

</style>