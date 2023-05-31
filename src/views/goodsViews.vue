<template>
  <div v-loading="dataList.isShow">
    <el-form :inline="true" :model="data.selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="data.selectData.title" placeholder="标题" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="data.selectData.introduce" placeholder="描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="dataList.newList" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="title" label="Title" width="180" />
      <el-table-column prop="introduce" label="Introduce" />
    </el-table>
    <el-pagination v-show="data.list.length" @current-change="currentChange"
      @next-click="nextChange(data.selectData.page)" layout="prev, pager, next" :page-size="data.selectData.pagesize"
      :total="data.selectData.count" />
  </div>
</template> 

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { getGoodsList } from '../script/api'

interface selectDataInit {
  title: string,
  introduce: string,
  page: number,
  count: number,
  pagesize: number,
}
interface listInit {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}

class InitData {
  selectData: selectDataInit = {
    title: '',
    introduce: '',
    page: 1, // 当前页码
    count: 0, //总条数
    pagesize: 5, //一页显示多少条
  }
  list: listInit[] = []
  clonelist: listInit[] = []
}


let data = reactive(new InitData)


let dataList = reactive({
  isShow: true,
  newList: computed(() => {
    return data.list.slice((data.selectData.page - 1) * data.selectData.pagesize, data.selectData.page * data.selectData.pagesize) //page=1---> 0 , page=1--->10
  })
})

onMounted(() => {
  getGoodsList().then((res) => {
    data.list = res.data
    data.selectData.count = res.data.length
    data.clonelist = JSON.parse(JSON.stringify(data.list))
    dataList.isShow = false
  })
})



const onSubmit = () => {
  dataList.isShow = true
  console.log(data.selectData.title, data.selectData.introduce, 'submit');
  let newAry: listInit[] = []
  if (data.selectData.title || data.selectData.introduce) {
    if (data.selectData.title) {
      newAry = data.list.filter(item => {
        return item.title.indexOf(data.selectData.title) != -1
      })
    }
    if (data.selectData.introduce) {
      newAry = data.list.filter(item => {
        return item.introduce.indexOf(data.selectData.introduce) != -1
      })
    }
  } else {
    data.list = data.clonelist
  }
  data.list = newAry
  data.selectData.count = newAry.length
  dataList.isShow = false
}

watch([() => data.selectData.title, () => data.selectData.introduce], () => {
  if (!data.selectData.title && !data.selectData.introduce) {
    data.list = data.clonelist
    data.selectData.count = data.list.length
  }
})

const currentChange = (page: number) => {
  data.selectData.page = page
}

const nextChange = (pagesize: number) => {
  data.selectData.pagesize = pagesize
}


</script>

<style scoped></style>