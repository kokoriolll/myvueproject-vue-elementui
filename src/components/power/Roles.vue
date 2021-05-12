<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加角色按钮区 -->
            <el-row>
                <el-col>
                    <el-button @click="addRolesVisible = true" type="primary">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 角色列表区 -->
            <el-table :data="roleList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand"></el-table-column>
                <!-- 索引列 -->
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template v-slot:default="scope">
                        <el-button @click="openEditRoles(scope.row.id)" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button @click="removeRoles(scope.row.id)" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加角色对话框 -->
        <el-dialog
                title="添加角色"
                :visible.sync="addRolesVisible"
                width="50%"
                @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addRolesForm" :rules="addRolesRules" ref="addRolesFormRef" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRolesForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="addRolesForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRolesVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoles">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改角色对话框 -->
        <el-dialog
                title="修改角色"
                :visible.sync="editRolesVisble"
                width="50%"
                @close="editDialogVisible">
            <!-- 内容主体区域 -->
            <el-form :model="editRolesForm" :rules="editRolesForm" ref="editRolesFormRef" label-width="100px">
                <el-form-item label="id">
                    <el-input v-model="editRolesForm.roleId" disabled></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRolesForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editRolesForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRolesVisble = false">取 消</el-button>
                <el-button type="primary" @click="editRoles">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Roles",
        data() {
            return {
                // 所有角色列表数据
                roleList: [],
                // 添加角色对话框显示
                addRolesVisible: false,
                // 修改角色对话框的显示
                editRolesVisble: false,
                // 添加角色的表单
                addRolesForm: {
                    roleName: '',
                    roleDesc: ''
                },
                // 添加角色的验证规则
                addRolesRules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ]
                },
                // 编辑角色的验证规则
                editRolesForm: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ]
                },
                // 查询到并修改角色的表单
                editRolesForm: {
                }
            }
        },
        methods: {
            // 获取角色列表
            async getRolesList(){
                const {data:res} = await this.$http.get('roles');
                if (res.meta.status !== 200){
                    return this.$message.error('获取角色列表失败！')
                }
                this.roleList = res.data;
                console.log(this.roleList);
            },
            // 点击添加角色之后的事件
            addRoles() {
                this.$refs.addRolesFormRef.validate(async valid => {
                    if (!valid) return
                    // 验证通过，发起请求
                    const {data:res} = await this.$http.post('roles',this.addRolesForm);
                    // 判断是否添加成功或者是失败
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加角色失败');
                    }
                    // 添加成功返回提示，关闭添加角色面板，之后刷新列表
                    this.$message.success('添加角色成功');
                    this.addRolesVisible = false;
                    this.getRolesList()
                })
            },
            // 添加角色对话框关闭后的事件
            addDialogClosed() {
                this.$refs.addRolesFormRef.resetFields()
            },
            // 查询角色信息
            async openEditRoles(id) {
                const {data:res} = await this.$http.get('roles/'+id);
                if (res.meta.status !== 200) {
                    return this.$message.error('查询角色信息失败');
                }
                this.editRolesForm = res.data;
                this.editRolesVisble = true;
            },
            // 关闭修改页面后的事件
            editDialogVisible() {
                this.$refs.editRolesFormRef.resetFields()
            },
            // 修改角色信息
            editRoles() {
                // 表单预验证
                this.$refs.editRolesFormRef.validate(async valid => {
                    if (!valid) return;
                    const {data:res} = await this.$http.put('roles/'+ this.editRolesForm.roleId,this.editRolesForm);
                    if (res.meta.status !== 200) {
                        return this.$message.error('更新角色信息失败')
                    }
                    this.$message.success('更新用户信息成功')
                    this.editRolesVisble = false;
                    this.getRolesList()
                })
            },
            // 删除角色信息
            async removeRoles(id) {
                // 询问用户是否删除数据
                const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);

                //如果用户确认了删除，则字符串返回 confirm
                //如果用户取消了删除，则字符串返回 cancel
                //console.log(confirmResult);
                if (confirmResult !== 'confirm'){
                    return this.$message.info('已经取消了删除')
                }

                //发起删除请求，判读状态码，删除成功提示消息并且刷新用户列表
                const {data:res} = await this.$http.delete('roles/' + id);
                if (res.meta.status !== 200){
                    return this.$message.error('删除用户失败');
                }
                this.$message.success('删除角色成功');
                this.getRolesList();
            }
        },
        created() {
            this.getRolesList()
        }
    }
</script>

<style scoped>

</style>