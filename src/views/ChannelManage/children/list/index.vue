<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">通道管理</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加通道
          </el-button>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="通道名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="isp"
        label="运营商"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="area"
        label="支持地区"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="if"
        label="是否支持花费/流量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="order"
        label="优先级"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="开启"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showDialog3(scope.$index, tableData)"
          >
            设置折扣
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="showDialog2(scope.$index, tableData)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="添加通道"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="通道名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" prop="companyName" required>
          <el-input v-model="Form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="接口地址:" prop="interfaceAddress" required>
          <el-input v-model="Form.interfaceAddress"></el-input>
        </el-form-item>
        <el-form-item label="接口账号:" prop="interfaceName" required>
          <el-input v-model="Form.interfaceName"></el-input>
        </el-form-item>
        <el-form-item label="接口密码:" prop="interfacePassword" required>
          <el-input v-model="Form.interfacePassword"></el-input>
        </el-form-item>
        <el-form-item label="接口Key:" prop="interfaceKey" required>
          <el-input v-model="Form.interfaceKey"></el-input>
        </el-form-item>
        <el-form-item label="支持的运营商:" prop="isp" required>
          <el-select v-model="Form.isp" placeholder="请选择">
            <el-option
              v-for="item in isps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持的地区:" prop="area" required>
          <el-select v-model="Form.area" placeholder="请选择">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持话费/流量:" prop="if" required>
          <el-select v-model="Form.if" placeholder="请选择">
            <el-option
              v-for="item in ifs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置优先级:" prop="order" required>
          <el-select v-model="Form.order" placeholder="请选择">
            <el-option
              v-for="item in orders"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status" align="left">
          <el-radio-group v-model="Form.status">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">取 消</el-button>
        <el-button type="primary" @click="showModal = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑通道"
      :visible.sync="showModal2"
      width="30%"
      top="15vh"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="通道名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" prop="companyName" required>
          <el-input v-model="Form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="接口地址:" prop="interfaceAddress" required>
          <el-input v-model="Form.interfaceAddress"></el-input>
        </el-form-item>
        <el-form-item label="接口账号:" prop="interfaceName" required>
          <el-input v-model="Form.interfaceName"></el-input>
        </el-form-item>
        <el-form-item label="接口密码:" prop="interfacePassword" required>
          <el-input v-model="Form.interfacePassword"></el-input>
        </el-form-item>
        <el-form-item label="接口Key:" prop="interfaceKey" required>
          <el-input v-model="Form.interfaceKey"></el-input>
        </el-form-item>
        <el-form-item label="支持的运营商:" prop="isp" required>
          <el-select v-model="Form.isp" placeholder="请选择">
            <el-option
              v-for="item in isps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持的地区:" prop="area" required>
          <el-select v-model="Form.area" placeholder="请选择">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持话费/流量:" prop="if" required>
          <el-select v-model="Form.if" placeholder="请选择">
            <el-option
              v-for="item in ifs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置优先级:" prop="order" required>
          <el-select v-model="Form.order" placeholder="请选择">
            <el-option
              v-for="item in orders"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status" align="left">
          <el-radio-group v-model="Form.status">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal2 = false">取 消</el-button>
        <el-button type="primary" @click="showModal2 = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="设置折扣"
      :visible.sync="showModal3"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="选择地区:" prop="area" required>
          <el-select v-model="setForm.area" placeholder="请选择">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置折扣:" prop="discount" required>
          <el-input v-model="setForm.discount"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status" align="left">
          <el-radio-group v-model="setForm.status">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal3 = false">取 消</el-button>
        <el-button type="primary" @click="showModal3 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  let tableData = []
  for (let i = 0; i < 7; i++) {
    tableData.push({
      name: '通道名称',
      area: '华东',
      isp: '联通',
      order: i,
      status: i < 5 ? true : false,
      if: i < 3 ? '是' : '否',
    })
  }
  console.log(tableData)

  export default {
    name: 'ChannelList',
    data() {
      return {
        currentPage: 5,
        tableData: tableData,
        showModal: false,
        showModal2: false,
        showModal3: false,
        Form: {
          name: '',
          companyName: '',
          interfaceAddress: '',
          interfaceName: '',
          interfacePassword: '',
          interfaceKey: '',
          isp: '',
          area: '',
          if: '',
          order: '',
          status: [],
        },
        setForm: {
          area: '',
          discount: '',
          status: [],
        },
        ifs: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
        areas: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
        isps: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
        orders: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      deleteRow(item) {
        console.log(item)
      },
      showDialog() {
        this.showModal = true
      },
      showDialog2() {
        this.showModal2 = true
      },
      showDialog3() {
        this.showModal3 = true
      },
    },
  }
</script>
