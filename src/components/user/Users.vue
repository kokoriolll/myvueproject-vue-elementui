<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <!-- 搜索与添加区域 -->
                    <el-input clearable placeholder="请输入内容" v-model="queryInfo.query" @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
                    <template v-slot:default="scope">
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
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

        <!-- 添加用户的对话框 -->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input show-password v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created() {
            this.getUserList()
        },
        name: "User",
        data() {

            // 自定义校验规则
            // 验证邮箱的规则
            let checkEmail = (rule,value,callback) => {
                // 验证邮箱的正则表达式
                const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                // 通过验证，返回callBack
                if(regEmail.test(value)) {
                    return callback()
                }else {
                    // 没有通过验证，调用callBack，返回错误信息
                    callback(new Error('请输入合法的邮箱'))
                }

            };
            // 验证手机的规则
            let checkMobile = (rule,value,callback) => {
                // 验证手机的正则表达式
                const regMobile = /^1[3|4|5|7|8][0-9]{9}$/;

                // 通过验证，返回callBack
                if(regMobile.test(value)) {
                    return callback()
                }else {
                    // 没有通过验证，调用callBack，返回错误信息
                    callback(new Error('请输入合法的手机号'));
                }

            };
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
                // 是否显示添加用户对话框
                addDialogVisible: false,
                // 添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                // 添加表单的验证规则
                addFormRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符' , trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkEmail , trigger: 'blur'}
                    ],
                    mobile: [
                        { required: true, message: '手机号', trigger: 'blur' },
                        { validator: checkMobile , trigger: 'blur' }
                    ]
                }

            }
        },
        methods: {
            // 获取用户列表
            async getUserList() {
                // 结构赋值到res
                const {data: res} = await this.$http.get('users', {
                    params: this.queryInfo
                })
                // 判断状态码
                if (res.meta.status !== 200) {
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
            async userStateChanged(userInfo) {
                const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
                if (res.meta.status !== 200) {
                    //网络请求失败，修改回原来的状态
                    userInfo.mg_state = !userInfo.mg_state;
                    return this.$message.error('更新用户状态失败！')
                }
                return this.$message.success('更新用户状态成功！')
            },

            // 监听添加用户对话框关闭之后的操作
            addDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },

            // 点击确定按钮，添加新用户
            addUser() {
                this.$refs.addFormRef.validate(async valid =>{
                    console.log(valid);
                    if(!valid) return
                    // 验证通过，发起请求
                    const {data:res} = await this.$http.post('users',this.addForm);
                    // 添加失败，返回错误提示
                    if (res.meta.status != 201) {
                        this.$message.error('添加用户失败')
                    }
                    // 添加成功，返回成功提示
                    this.$message.success('添加用户成功');
                    // 关闭添加用户面板
                    this.addDialogVisible = false;
                    // 重新调用用户列表，刷新结果
                    this.getUserList()

                })
            }
        }
    }
</script>

<style scoped>

</style>