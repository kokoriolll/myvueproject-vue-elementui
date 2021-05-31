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
                    <el-button @click="showAddCateDialog" type="primary">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格区域 -->
            <tree-table
                    class="treeTable"
                    :data="catelist"
                    :columns="columns"
                    :selection-type="false"
                    :expand-type="false"
                    show-index
                    border
                    index-text="#"
            >
                <!-- 是否有效 -->
                <template slot="isok" slot-scope="scope">
                    <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen;"/>
                    <i v-else class="el-icon-error" style="color: red;"/>
                </template>
                <!-- 排序标签 -->
                <template slot="order" slot-scope="scope">
                    <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
                    <el-tag v-else-if="scope.row.cat_level === 1" size="mini" type="success">二级</el-tag>
                    <el-tag v-else size="mini" type="warning">三级</el-tag>
                </template>
                <!-- 操作标签 -->
                <template slot="action" slot-scope="scope">
                    <el-button size="mini" type="primary" icon="edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="delete">删除</el-button>
                </template>
            </tree-table>

            <!-- 分页区域 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[3, 5, 10, 15]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

            <!-- 添加分类对话框 -->
            <el-dialog
                    title="添加分类"
                    :visible.sync="addCateDialogVisible"
                    width="50%"
                    @close="addCateDialogClosed"
            >
                <!-- 添加分类的表单 -->
                <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="addCateForm.cat_name"/>
                    </el-form-item>
                    <el-form-item label="父级分类">
                        <!-- options 用来指定数据源 props级联选择器的选项 v-model -->
                        <el-cascader
                                v-model="selectedKeys"
                                :options="parentCateList"
                                :props="{ checkStrictly: true, expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children' }"
                                @change="parentCateChanged"
                                clearable
                        />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="addCateDialogVisible = false">取 消</el-button>
                   <el-button type="primary" @click="addCate">确 定</el-button>
                 </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Cate",
        data() {
            return {
                // 默认查询条件
                queryInfo: {
                    type: 3,
                    pagenum: 1,
                    pagesize: 10
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
                    },
                    {
                        label: '排序',
                        // 表示将当前页定义为模板页
                        type: 'template',
                        // 表示当前这一列使用的模板名称
                        template: 'order'
                    },
                    {
                        label: '操作',
                        // 表示将当前页定义为模板页
                        type: 'template',
                        // 表示当前这一列使用的模板名称
                        template: 'action'
                    }
                ],
                // 控制添加分类对话框的显示与隐藏
                addCateDialogVisible: false,
                // 添加分类的表单数据对象
                addCateForm: {
                    // 分类名称
                    cat_name: '',
                    // 父级分类的ID
                    cat_pid: 0,
                    // 分类的等级，默认添加一级
                    cat_level: 0
                },
                // 添加分类表单的验证规则
                addCateFormRules: {
                    cat_name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                    ]
                },
                // 父级分类的列表
                parentCateList: [],
                selectedKeys: []
            }
        },
        methods: {
            // 获取商品分类数据
            async getCateList() {
                const {data:res} = await this.$http.get('categories', { params: this.queryInfo });
                if (res.meta.status !== 200) {
                    return this.$message.error('获取商品分类失败')
                }
                // 把数据列表赋值给catelist
                this.catelist = res.data.result;
                // 为总数据条数赋值
                this.total = res.data.total;
            },
            // 兼听PageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getCateList();
            },
            // 监听PageNum的改变
            handleCurrentChange(newPageNum) {
                this.queryInfo.pagenum = newPageNum;
                this.getCateList();
            },
            // 点击按钮展示添加分类的对话框
            showAddCateDialog() {
                // 先获取父级分类的数据列表
                this.getParentCateList();
                // 在展示对话框
                this.addCateDialogVisible = true;
            },
            // 获取父级分类的数据列表
            async getParentCateList() {
                const {data:res} = await this.$http.get('categories',{ params: { type: 2 } })
                if(res.meta.status !== 200) {
                    return this.$message.error('获取父级分类失败！');
                }
                this.parentCateList = res.data;
                console.log(res.data);
            },
            // 选择项发生变化触发这个函数
            parentCateChanged() {
                console.log(this.selectedKeys);
                // 如果selectedKeys数组中的length大于0，证明选中父级分类
                // 反之，就说明没有选中任何的父级分类
                if (this.selectedKeys.length > 0) {
                    // 获取父级分类的id
                    this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
                    // 为当前分类的等级赋值
                    this.addCateForm.cat_level = this.selectedKeys.length;
                } else {
                    this.addCateForm.cat_pid = 0;
                    this.addCateForm.cat_level = 0;
                }
            },
            // 点击按钮添加新的分类
             addCate() {
                this.$refs.addCateFormRef.validate(async valid => {
                    if (!valid) {
                        return false;
                    }
                    const {data:res} = await this.$http.post('categories', this.addCateForm);
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加分类失败');
                    }
                    this.$message.success('添加分类成功');
                    this.getCateList();
                    this.addCateDialogVisible = false;
                })
            },
            // 监听对话框的关闭事件，重置表单数据
            addCateDialogClosed() {
                this.$refs.addCateFormRef.resetFields();
                // 重置选择器和默认的父ID数据
                this.selectedKeys = [];
                this.addCateForm.cat_pid = 0;
                this.addCateForm.cat_level = 0;
            }
        },
        created() {
            this.getCateList()
        }

    }

</script>

<style scoped>
.treeTable {
    margin-top: 15px;
}
.el-cascader {
    width: 100%;
}
</style>