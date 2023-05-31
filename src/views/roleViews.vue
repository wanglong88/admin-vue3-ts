<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加角色</el-button>
      </el-form-item>
    </el-form>

    <el-table border :data="data.list" style="width: 100%">
      <el-table-column prop="roleId" label="Id" width="180" />
      <el-table-column prop="roleName" label="角色" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getRoleList } from '../script/api'
import {InitData,roleInt} from '../type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'

const router = useRouter()
const data = reactive(new InitData())

onMounted(() => {
  getRoleList().then((res) => {
    data.list = res.data
    console.log(data.list);
  })
})
const onSubmit = () => {
  ElMessageBox.prompt('请输入角色信息', '添加角色', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      data.list.push({roleName: value, roleId: data.list.length+1, authority: []})
      ElMessage({
        type: 'success',
        message: `${value}角色添加成功！`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '添加失败',
      })
    })
}
const edit = (row: roleInt) => {
  
  router.push({
    path: '/authority',
    query: {
      id: row.roleId,
      authority: row.authority.join(',')
    }
  })
}
</script>

<style scoped></style>