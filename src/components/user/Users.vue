<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card >

            <el-row :gutter="20">
                <el-col :span="7">
                    <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>

                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
    export default {
        created() {
            this.getUserList()
        },
        name: "User",
        data() {
            return {

                // 获取用户列表的参数对象
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 2
                },
                // 用户列表
                userList: [],
                // 总数据
                total: 0,

            }
        },
        methods: {
            async getUserList() {
                const {data:res} = await this.$http.get('users',{
                    params: this.queryInfo
                })

                if(res.meta.status !== 200) {
                    return this.$message.error('获取用户列表失败！')
                }
                this.userList = res.data.users;
                this.total = res.data.total;
                console.log(res,this.userList,this.total);
            }
        }

    }
</script>

<style scoped>

</style>