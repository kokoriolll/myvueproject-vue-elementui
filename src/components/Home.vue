<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            Header
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">Aside</el-aside>
            <!-- 右侧主体 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "home",
        methods: {

            // 退出登录
            logout() {
                //清空token
                window.sessionStorage.removeItem('token');

                //也可以直接清空sessionStorage
                //window.sessionStorage.clear();

                //回到登录页面
                this.$router.push('/login');
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
    }

    .el-aside {
        background-color: white;
    }

    .el-main {
        background-color: #F1F1F5;
    }

</style>