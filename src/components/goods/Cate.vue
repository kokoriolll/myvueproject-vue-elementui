<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加角色按钮区 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格区域 -->
            <tree-table
                    :data="catelist"
                    :columns="columns"
                    :selection-type="false"
                    :expand-type="false"
                    show-index
                    border
                    index-text="#"
            >
                <template slot="isok" slot-scope="scope">
                    <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen;"/>
                    <i v-else class="el-icon-error" style="color: red;"/>
                </template>
            </tree-table>

            <!-- 分页区域 -->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Cate",
        data() {
            return {
                // 默认查询条件
                qureyInfo: {
                    type: 3,
                    pagenum: 1,
                    pagesize: 5
                },
                // 商品分类的数据列表，默认为空
                catelist: [],
                // 总数据条数
                total: 0,
                // 表格的列属性
                columns: [
                    {
                        label: '分类名称',
                        prop: 'cat_name'
                    },
                    {
                        label: '是否有效',
                        // 表示将当前页定义为模板页
                        type: 'template',
                        // 表示当前这一列使用的模板名称
                        template: 'isok'
                    }
                ]
            }
        },
        methods: {
            // 获取商品分类数据
            async getCateList() {
                const {data:res} = await this.$http.get('categories', { params: this.qureyInfo });
                if (res.meta.status !== 200) {
                    return this.$message.error('获取商品分类失败')
                }
                // 把数据列表赋值给catelist
                this.catelist = res.data.result;
                // 为总数据条数赋值
                this.total = res.data.total;
            }
        },
        created() {
            this.getCateList()
        }

    }

</script>

<style scoped>

</style>