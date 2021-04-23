<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img class="header-logo" src="../assets/imgs/postman.png" alt="" style="width: 40px; height: 40px;">
                <span class="header-title">MyVueProject</span>
            </div>
            <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
                <button class="header-logout" @click="logout">
                    <i class="el-icon-switch-button"></i>
                </button>
            </el-tooltip>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <!-- 侧边栏菜单区 -->
                <el-menu
                        unique-opened
                        background-color="#ffffff"
                        text-color="#333333"
                        active-text-color="#409EFF">
                    <!-- 一级菜单 -->
                    <!-- :index动态数据绑定 index只接受字符串，不接受数值  + '' 转换为字符串类型 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单的模板区 -->
                        <template slot="title">
                            <!-- i对应的是图标 span对应的是文本 -->
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
                            <i :class="subIconObj[subItem.id]"></i>
                            <span>{{subItem.authName}}</span>
                        </el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧主体 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        // 在创建的生命周期执行获取菜单操作
        created() {
            this.getMenuList()
        },
        name: "home",
        data(){
            return {
                //菜单数据存放的位置
                menuList: [],
                //一级菜单图标
                iconsObj: {
                    '125': 'el-icon-user-solid',
                    '103': 'el-icon-info',
                    '101': 'el-icon-s-goods',
                    '102': 'el-icon-s-order',
                    '145': 'el-icon-s-marketing'
                },
                //二级菜单图标
                subIconObj: {
                    '110': 'el-icon-s-custom',
                    '111': 'el-icon-s-custom',
                    '112': 'el-icon-s-flag',
                    '104': 'el-icon-notebook-2',
                    '115': 'el-icon-s-grid',
                    '121': 'el-icon-menu',
                    '107': 'el-icon-s-order',
                    '146': 'el-icon-s-data'
                }
            }
        },
        methods: {

            // 退出登录
            logout() {
                //清空token
                window.sessionStorage.removeItem('token');

                //也可以直接清空sessionStorage
                //window.sessionStorage.clear();

                //回到登录页面
                this.$router.push('/login');
            },

            // 获取所有的菜单
            async getMenuList() {
                // 获取菜单目录
                const {data:res} = await this.$http.get('menus')
                // 判断状态码是否为200，不是返回错误提示
                if (res.meta.status !== 200){
                    return this.$message.error(res.meta.msg)
                }
                // 获取菜单数据正确，保存到date的menuList数组里
                this.menuList = res.data;
            }

        }
    }
</script>

<style scoped>

    .home-container {
        width: 100%;
        height: 100%;
    }

    .el-header {
        background-color: white;
        display: flex;
        justify-content: space-between;
    }

    .header-logo {
        float: left;
        width: 40px;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .header-title {
        float: left;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #409EFF;
    }

    .header-logout {
        cursor: pointer;
        border: 0;
        background: white;
        font-size: 22px;
        color: #409EFF;
    }

    .el-aside {
        background-color: white;
    }

    .el-menu {
        border-right: 0;
    }

    .el-main {
        background-color: #F1F1F5;
    }

</style>