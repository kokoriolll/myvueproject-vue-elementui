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

            <!-- 搜索与添加区域 -->
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

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态">
                    <!-- 作用域插槽 slot-scope="scope" -->
                    <template v-slot:default="scope" >
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">

                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template v-slot:default="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

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
                    // 当前的页数
                    pagenum: 1,
                    // 当前每页显示多少条数据
                    pagesize: 2
                },
                // 用户列表
                userList: [],
                // 总数据
                total: 0,

            }
        },
        methods: {
            // 获取用户列表
            async getUserList() {
                // 结构赋值到res
                const {data:res} = await this.$http.get('users',{
                    params: this.queryInfo
                })
                // 判断状态码
                if(res.meta.status !== 200) {
                    return this.$message.error('获取用户列表失败！')
                }
                // 保存到data当中
                this.userList = res.data.users;
                this.total = res.data.total;
            },

            // 监听 pageSize 改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getUserList();

            },

            // 监听 页码值 页面值改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getUserList();
            },

            // 保存用户的状态
            async userStateChanged(userInfo){
                const {date:res} = await this.$http.put(`users/:${userInfo.id}/state/:${userInfo.mg_state}`);
                console.log(res);
                if (res.meta.status !== 200){
                    return this.$message.error('更新用户状态失败')
                }
            }
        }
    }
</script>

<style scoped>

</style>