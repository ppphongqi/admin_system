<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">用户等级</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加等级
          </el-button>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column prop="aid" label="ID" align="center"></el-table-column>
      <el-table-column prop="levelIcon" label="等级图标" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.levelIcon" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="levelName"
        label="等级名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="level"
        label="等级"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="discount"
        label="享受折扣"
        align="center"
      ></el-table-column>
      <el-table-column prop="isUsed" label="是否显示" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isUsed"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="启用"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="levelInfo"
        label="等级说明"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editLevel(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="delLevel(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-if="showModal"
      :title="add ? '添加等级' : '编辑等级'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="等级名称:" prop="levelName">
          <el-input v-model="Form.levelName"></el-input>
        </el-form-item>
        <el-form-item label="等级:" prop="level">
          <el-input v-model="Form.level"></el-input>
        </el-form-item>
        <el-form-item label="折扣:" prop="discount">
          <el-input v-model="Form.discount"></el-input>
        </el-form-item>
        <el-form-item label="解锁经验:" prop="experience">
          <el-input v-model="Form.experience"></el-input>
        </el-form-item>
        <el-form-item label="图标:" prop="levelIcon">
          <el-upload
            class="avatar-uploader-level"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="背景:" prop="bgimg">
          <el-upload
            class="avatar-uploader-level"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否显示:" prop="isUsed">
          <el-radio-group v-model="Form.isUsed">
            <el-radio :label="0" value="0">开启</el-radio>
            <el-radio :label="1" value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="等级权限:" prop="levelInfo">
          <el-select v-model="Form.levelInfo" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  let tableData = []
  for (let i = 0; i < 5; i++) {
    tableData.push({
      aid: i,
      levelIcon:
        'http://wanmouyun.oss-cn-shenzhen.aliyuncs.com/H5-img/2021-07-29/c9cf0685-ac36-464d-b050-45882149de37.jpg',
      levelName: 'v' + i,
      level: i + 1,
      discount: 95,
      isUsed: i < 2 ? 0 : 1,
      levelInfo: '说明',
    })
  }
  import { userApi } from '@/api/index'

  export default {
    name: 'LevelList',
    data() {
      return {
        tableData: tableData,
        showModal: false,
        add: false,
        Form: {
          aid: -1,
          levelName: '',
          level: '',
          discount: '',
          experience: '',
          levelIcon: '',
          bgimg: '',
          isUsed: 0,
          levelInfo: '',
        },
        rules: {
          levelName: [
            { required: true, message: '请填写等级名称', trigger: 'blur' },
          ],
          level: [{ required: true, message: '请填写等级', trigger: 'blur' }],
          discount: [
            { required: true, message: '请填写等级折扣', trigger: 'blur' },
          ],
          experience: [
            { required: true, message: '请再次填写解锁经验', trigger: 'blur' },
          ],
          levelIcon: [
            { required: true, message: '请上传等级图标', trigger: 'change' },
          ],
          bgimg: [
            { required: true, message: '请上传背景图', trigger: 'change' },
          ],
          isUsed: [
            { required: true, message: '请选择是否显示', trigger: 'change' },
          ],
        },
      }
    },
    mounted() {
      this.getTableData()
      this.getRole()
    },
    methods: {
      modalConfirm(flag) {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.submit(flag)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //添加/修改等级
      async submit(flag) {
        // const res = await roleApi.updateAdmin(this.Form)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
          })
          this.getTableData()
          this.closeShowModal()
        }
      },
      // 获取表格数据
      async getTableData(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        // const data = await roleApi.getAdminList(params)
        if (data) {
          this.tableData = data.data
          this.total = data.totalRecord
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //修改用户状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        if (row.isUsed === '1') {
          params.state = '1'
        } else {
          params.state = '0'
        }
        console.log(params, 'params')
        // const res = await userApi.editUserState(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getTableData()
        }
      },
      delLevel(item) {
        //   roleApi.delAdmin({ aid: item.aid }).then((res) => {
        //     if (res) {
        //       this.$message({
        //         message: res.message,
        //         type: 'success',
        //       })
        //       this.getTableData()
        //     } else {
        //       this.$message({
        //         message: '接口未返回数据',
        //         type: 'warning',
        //       })
        //     }
        //   })
      },
      // 添加
      showDialog() {
        this.add = true
        this.showModal = true
      },
      // 编辑
      editLevel(row) {
        this.add = false
        this.showModal = true
        this.Form = row
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {}
        this.$refs.Form.resetFields()
      },
    },
  }
</script>

<style lang="scss">
  .avatar-uploader-level {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 18px;
      color: #8c939d;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .avatar {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
</style>
