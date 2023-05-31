<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="data.list"
      show-checkbox
      :check-strictly="true"
      node-key="roleId"
      :default-checked-keys="data.authority"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button type="primary" @click="seve">确认修改</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { InitData } from '../type/authority';
import {getAuthorityList} from '../script/api'

const route = useRoute()
const query:any = route.query
const data = reactive(new InitData(+query.id, query.authority.split(',').map(Number)))
const treeRef = ref<any>([])
console.log(data, 'data');
 onMounted(() => {
  getAuthorityList().then(res =>{
    console.log(res, 'res');
    data.list = res.data
  })
 })
 const seve = () => {
  console.log(treeRef, 'treeRef');
  console.log(treeRef.value.getCheckedKeys().sort((a:number,b:number)=> a-b), 'treeRe222f');
  
 }

</script>

<style scoped>

</style>