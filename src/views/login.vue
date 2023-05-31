<template>
  <div class="logo-bg">
    <div class="form-box">
      <h1>伊欧科技管理系统</h1>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" @keyup.enter="submitForm(ruleFormRef)">
        <el-form-item label="User Name" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '../script/api'
import { useRouter } from 'vue-router'

interface loginData {
  username: string,
  password: string,
}

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const ruleForm: loginData = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3—10之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '密码长度在3—10之间', trigger: 'blur' },
  ],
})
let tuple: [number, string] = [18, 'lin']
console.log(tuple.push(),tuple, 'tuple');


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(ruleForm).then((res) => {
        console.log(res, 'res');
        if (res.data.code == 200 && res.data.success) {
          localStorage.setItem('token', res.data.token)
          router.push('/')
        }
      }).catch((e) => {
        console.error(e)
      })
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}


</script>

<style lang="less" scoped>
h1 {
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
}

.logo-bg {
  background: url('@/assets/login_background.jpg') no-repeat center;
  width: 100%;
  height: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center
}

.el-form {
  width: 420px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 2px 3px 7px rgba(0, 0, 0, .2);
}
</style>
