<template>
    <div class="login-container">
        <div class="login-box">
            <!-- 头像区域 -->
            <div class="avatar-box">
                <img src="../assets/logo.png" alt="">
            </div>

            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login-form" :rules="loginFormRules">
                <!-- 用户名区域 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码区域 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                /* 这是登录表单的数据绑定对象 */
                loginForm: {
                    username:'',
                    password:''
                },
                // 这是表单验证规则对象
                loginFormRules: {
                    // 验证用户名是否合法
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    // 验证密码是否合法
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 点击重置按钮重置表单
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields();
            },
            login () {
                this.$refs.loginFormRef.validate((valid) => {
                    console.log(valid);
                })
            }
        }
    }
</script>

<style scoped>
    .login-container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login-box {
        width: 450px;
        height: 300px;
        background-color: white;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

    .avatar-box {
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }

    .avatar-box>img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }

    .login-form {
        position: absolute;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>