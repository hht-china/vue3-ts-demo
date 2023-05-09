<template>
  <div class="login">
    <div class="form-cls">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" :error="error" label-width="120px" class="demo-ruleForm">
        <el-form-item label="账户:" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import {LoginForm} from "@/type/LoginForm";
// 在index已经定义了router
import router from "@/router/index";
//引入封装的后端接口调用
import {login} from "@/request/api";

//这段代码是定义ref，不能删
const ruleFormRef = ref<FormInstance>()

// const ruleForm = reactive({
//   username: '',
//   password: ''
// })
// ts使用json字段不优雅，我们定义一个类，使用类
const ruleForm = reactive(new LoginForm()).loginForm

const rules = {
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
    //trigger: "blur"是触发时机: 当失去焦点时（光标不显示的时候），触发此提示
    {min: 3, max: 8, message: '长度为3-8', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 8, message: '长度为3-8', trigger: 'blur'},
  ],
}
const error = ''
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(ruleForm).then((res) => {
        // data是在接口定义的
        if (res.data.code == 200) {
          // TODO 登录后将token进行保存
          localStorage.setItem("token", res.data.token)
          // 跳转页面
          console.log('success submit!')
          router.push('/')
        }else{
          console.log('error submit!')
          return false
        }
      })
    } else {
      console.log('error valid!')
      return false
    }
  })
}
</script>


<!--以下为不用setup语法糖的代码，我用的idea没有找到对应的插件，setup语法糖无法直接定位变量-->
<!--<script lang="ts">-->
<!--import {defineComponent, reactive,ref,toRefs} from 'vue';-->
<!--import {LoginForm} from '@/type/LoginForm';-->
<!--import {FormInstance} from 'element-plus';-->
<!--import {login} from "@/request/api";-->
<!--import router from "@/router/index";-->

<!--export default defineComponent({-->
<!--  setup() {-->
<!--    const rules = {-->
<!--      username: [-->
<!--        {required: true, message: '请输入账号', trigger: 'blur'},-->
<!--        {min: 3, max: 8, message: '长度为3-8', trigger: 'blur'},-->
<!--      ],-->
<!--      password: [-->
<!--        {required: true, message: '请输入密码', trigger: 'blur'},-->
<!--        {min: 3, max: 8, message: '长度为3-8', trigger: 'blur'},-->
<!--      ],-->
<!--    }-->

<!--    const ruleForm = reactive(new LoginForm()).loginForm-->
<!--    const ruleFormRef = ref<FormInstance>()-->

<!--    const submitForm = (formEl: FormInstance | undefined) => {-->
<!--      if (!formEl) return-->
<!--      formEl.validate((valid) => {-->
<!--        if (valid) {-->
<!--          login(ruleForm).then((res) => {-->
<!--            console.log(res)-->
<!--            localStorage.setItem("token", res.data.token)-->
<!--            router.push('/')-->
<!--          })-->
<!--        } else {-->
<!--          console.log('error submit!')-->
<!--          return false-->
<!--        }-->
<!--      })-->
<!--    }-->

<!--    return {-->
<!--      ruleForm,-->
<!--      rules,-->
<!--      submitForm,-->
<!--      ruleFormRef-->
<!--    }-->
<!--  }-->
<!--})-->
<!--</script>-->

<style scoped>

.login {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/bg.jpg');
}

.form-cls {
  padding: 50px;
  width: 400px;
  margin: 0 auto;
  background-color: white;
  position: relative;
  top: 200px;
  border-radius: 4px;
}

.login-btn {
  width: 48%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
