<template>
  <div>
    <b-form-file v-model="file" ref="file-input" class="mb-2"></b-form-file>

    <b-button @click="clearFiles" class="mr-2">Reset via method</b-button>
    <b-button @click="file = null">Reset via v-model</b-button>
    <b-button @click="readExcel">read</b-button>
    <p class="mt-2">Selected file: <b>{{ file ? file.name : '' }}</b></p>
    <p>{{list}}</p>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import {addStudent} from '@/api'
import {store} from '@/store'

export default {
  data () {
    return {
      file: null,
      list: null
    }
  },
  methods: {
    clearFiles () {
      this.$refs['file-input'].reset()
    },
    // TODO: this is not a todo, this method is suitable for uploading criteria
    readExcel () {
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]// 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
          console.log(ws)
          var param = {
            token: localStorage.getItem('token'),
            projectId: store.projectId,
            studentList: ws
          }
          addStudent(param).then(res => {
            console.log(res)
            if (res.updateStudent_ACK) {
              console.log('succeed')
              // TODO: page after adding student
              this.$router.push('/')
            } else {

            }
          })
          this.list = ws
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(this.file)
    }
  }
}
</script>
