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
            <!-- 根据是否展开判断，为真使用64px，为假使用200px -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 侧边栏展开与折叠按钮 -->
                <div class="toggle-button" @click="toggleCollapse">
                    <!-- 根据是否展开判断，使用三目语法判断 -->
                    <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                </div>
                <!-- 侧边栏菜单区 -->
                <!-- 默认使用了路由的当前地址 :default-active="activePath" -->
                <el-menu
                        :default-active="this.$route.path"
                        :router="true"
                        :collapse-transition="false"
                        :collapse="isCollapse"
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
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <i :class="subIconObj[subItem.id]"></i>
                            <span>{{subItem.authName}}</span>
                        </el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {

        created() {
            // 在创建的生命周期执行获取菜单操作
            this.getMenuList()
            // 在创建生命周期函数的时候获取保存的路径并赋值到数据中
            this.activePath = window.sessionStorage.getItem('activePath')
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
                },
                //是否展示或折叠菜单
                isCollapse: false,
                //被激活的链接地址
                activePath: '',
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
            },
            // 点击按钮切换菜单折叠和展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            // 保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath',activePath);
                this.activePath = activePath;
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

    .toggle-button {
        background-color: white;
        border-bottom: 1px solid #e9e9e9;
        font-size: 18px;
        color: #333;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
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