<template>
  <div>
    <el-form :inline="true" :model="data.selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="data.selectData.nickName" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="data.selectData.role" placeholder="Activity zone">
          <el-option label="全部" :value="0" />
          <el-option v-for="item in data.rolelist" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="data.list" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-tag v-for="item in scope.row.role" :key="item.role" type="success" class="mx-1" effect="dark">
            {{ item.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="data.isShow" title="Edit">
    <el-form :model="data.active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="data.active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="data.active.role" placeholder="请选择角色">
          <el-option v-for="item in data.rolelist" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.isShow = false">Cancel</el-button>
        <el-button type="primary" @click="changeFn()">
          seve
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { getUserList, getRoleList } from '../script/api';
import { InitData, userList } from '../type/user'

const data = reactive(new InitData())


onMounted(() => {
  getUser()
  getRole()
})

const getUser = () => {
  getUserList().then((res) => {
    data.list = res.data
    data.clonelist = res.data
    console.log(res, 'getUserList');
  })
}
const getRole = () => {
  getRoleList().then((res) => {
    data.rolelist = res.data
    console.log(res);
  })
}

const onSubmit = () => {
  console.log(data.selectData.role, 'data.selectData.role');
  
  let newAry: userList[] = []
  if (data.selectData.nickName || data.selectData.role) {
    if (data.selectData.nickName) {
      newAry = data.list.filter(item => {
        return item.nickName.indexOf(data.selectData.nickName) != -1
      })
    } else {
      newAry = data.clonelist
    }
    if (data.selectData.role) {
      newAry = (newAry.length ? newAry : data.list).filter(item => {
        return item.role.find(i => i.role === data.selectData.role)
      })
    }
  } else {
    newAry = data.clonelist
  }
  data.list = newAry
}

const edit = (row:userList) => {
  data.isShow = true
  data.active = {
    id: row.id,
    nickName: row.nickName,
    userName: row.userName,
    role: row.role.map((item:any) => item.role || item.roleId)
  }
}

const changeFn = () => {
  let obj: any = data.list.find(item => item.id === data.active.id)
  obj.nickName = data.active.nickName
  obj.role = data.rolelist.filter((item:any) => data.active.role.includes(item.roleId))

  data.list.forEach((item, index) => {
    if(item.id === data.active.id) {
      data.list[index] = obj
    }
  })
  data.isShow = false
}

watch([() => data.selectData.nickName, () => data.selectData.role], () => {
  if (!data.selectData.nickName || !data.selectData.role) {
    data.list = data.clonelist
  }
})

// const filterTableData = computed(() => data.list.filter(
//   (item) =>
//     !data.selectData.nickName ||
//     item.nickName.toLowerCase().includes(data.selectData.nickName.toLowerCase())
// )
// )
</script>

<style lang="less">
.el-tag {
  margin-right: 15px;
}
</style>