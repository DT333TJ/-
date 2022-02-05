/** 
 * @desc 学校列表
 */
<template>
  <div class="school-list">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ path: '/organization' }">机构管理</el-breadcrumb-item>
      <el-breadcrumb-item >{{breadName}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮，搜索框 -->
    <div class="operation-area">
      <el-button plain @click="_handleCreateSchool">添加学校</el-button>
      <el-input
        placeholder="请输入学校名/联系人/联系方式"
        style="width:230px;float:right"
        v-model="queryParams.catcher"
        clearable>
      </el-input>  
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <el-table 
        :data="tableData" 
        style="width: 100%" 
        stripe
        v-loading="loading">
        <!-- 学校时候显示 -->
        <el-table-column
          label="学校"
          width="180">
          <template slot-scope="scope">
            <span v-text="scope.row.schoolName ? scope.row.schoolName : '--'"></span>
          </template>
        </el-table-column>

        <el-table-column
          label="联系人"
          width="180">
          <template slot-scope="scope">
            <span v-text="scope.row.contacts ? scope.row.contacts : '--'"></span>
          </template>
        </el-table-column>

        <el-table-column
          label="联系方式"
          width="180">
          <template slot-scope="scope">
            <span v-text="scope.row.contactPhone ? scope.row.contactPhone : '--'"></span>
          </template>
        </el-table-column>

        <el-table-column
          label="备注"
          width>
          <template slot-scope="scope">
            <div class="table-text" v-text="scope.row.comment ? scope.row.comment : '--' ">
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="_handleEditSchool(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="_handleDeleteSchool(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="manager-pagination"
      style="text-align:center;margin-top: 20px"
      v-show="queryParams.visible"
      layout="prev, pager, next"
      :current-page="queryParams.pageNum"
      :total="queryParams.totalCount"
      :page-size="queryParams.pageSize"
      @current-change="_handlePageNumChange"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>

    <!-- 添加、修改dialog -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="schoolForm" :model="schoolForm" :rules="dataRules" label-width="120px">
        <el-form-item label="学校名称" prop="schoolName">
          <el-input 
            v-model.trim="schoolForm.schoolName" 
            style="width: 220px">
          </el-input>
        </el-form-item>

        <el-form-item label="总部地址">
          <el-select 
            placeholder="省份" 
            v-model="schoolForm.provinceName" 
            style="width: 160px">
            <el-option 
              v-for="option in provincesOptions" 
              :key="option.provinceCode" 
              :value="option.provinceName">
              <span @click="_getProvinceId(option)" v-text="option.provinceName ? option.provinceName : ''"></span>
              <span v-show="false" v-text="option.provinceCode ? option.provinceCode : ''"></span>
            </el-option>
          </el-select>

          <el-select
            placeholder="城市" 
            v-model="schoolForm.cityName" 
            style="width: 160px">
            <el-option 
              v-for="option in citysOptions" 
              :key="option.cityCode" 
              :value="option.cityName">
              <span @click="_getCityId(option)" v-text="option.cityName ? option.cityName : ''"></span>
              <span v-show="false" v-text="option.cityCode ? option.cityCode : ''"></span>
            </el-option>
          </el-select>

          <el-select 
            placeholder="县 / 区" 
            v-model="schoolForm.areaName" 
            style="width: 160px">
            <el-option 
              v-for="option in countysOptions" 
              :key="option.areaCode" 
              :value="option.areaName">
              <span @click="_getAreaId(option)" v-text="option.areaName ? option.areaName : ''"></span>
              <span v-show="false" v-text="option.areaCode ? option.areaCode : ''"></span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址" prop="address" >
          <el-input v-model.trim="schoolForm.address" style="width: 320px"></el-input>
        </el-form-item>

        <el-form-item label="联系人" prop="contacts">
          <el-input v-model.trim="schoolForm.contacts" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="contactPhone">
          <el-input v-model.trim="schoolForm.contactPhone" style="width: 220px" :maxlength="11" :minlength="11"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="comment">
          <el-input type="textarea" v-model="schoolForm.comment" style="width: 400px" :autosize="{ minRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="_handleCancle('schoolForm')">取 消</el-button>
        <el-button v-if="dialogStatus == 'createSchool'" type="primary" @click.native="_handleCreateSchoolSure('schoolForm')">添加学校确定</el-button>
        <el-button v-else type="primary" @click.native="_handleEditSchoolSure('schoolForm')">修改学校确定</el-button>
      </div>
    </el-dialog>

    <!-- 删除dialog -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeleteVisible" width="30%">
      <p>是否{{textMap[dialogStatus]}}：<span style="color: red">{{deleteForm.schoolName}}?</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="_handleDeleteSchoolSure">确定删除学校</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { sessionStorageUtil } from 'lib/util'
  import { requestGetProvince } from 'api/org'
  import { 
    requestGetSchools,
    requestPostSchool,
    requestPatchSchool,
    requestDeleteSchool
  } from 'api/school'

  export default {
    name: 'school-list',
    data: function() {
      return {
        // 面包屑显示的文字
        breadName: '',

        // loading
        loading: false,

        // 搜索参数
        queryParams: {
          catcher: '',
          bureauId: '',
          pageNum: 1,
          pageSize: 5,
          totalCount: 1,
          visible: false
        },

        // 表格数据
        tableData: [],

        // 弹窗显示标识符
        dialogFormVisible: false,
        dialogDeleteVisible: false,
        // 弹窗状态
        dialogStatus: '',
        // dialog的title数据对象
        textMap: {
          createSchool: '添加学校',
          editSchool: '修改学校',
          deleteSchool: '删除学校'
        },

        // 表单对象
        schoolForm: {
          bureauId: '',
          schoolName: '',
          contacts: '',
          contactPhone: '',
          address: '',
          comment: '',
          provinceCode: '',
          cityCode: '',
          areaCode: '',
          provinceName: '',
          cityName: '',
          areaName: '',
          id: ''
        },
        dataRules: {
          schoolName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },

        // 删除数据的表单
        deleteForm: {
          id: '',
          schoolName: ''
        },

        // 省份选项列表
        provincesOptions: [],
        // 城市选项列表
        citysOptions: [],
        // 县区选项列表
        countysOptions: [],
      }
    },
    watch: {
      queryParams: {
        deep: true,
        handler() {
          // this._getSchools()
        }
      }
    },
    created: function() {
      // this._getDataFromQuery()
      // this._getProvinceData()
    },
    methods: {
      /** 
       * 从query中获取信息 
       */
      _getDataFromQuery: function() {
        let query = this.$route.query
        if (query.id && query.name) {
          this.queryParams.bureauId = query.id
          this.breadName = query.name
        }
        // 获取当前机构的所有学校数据
        this._getSchools()
      },

      /** 
       * 设置获得当前机构所有的学校的参数 
       */
      _getSchools: function() {
        let param = {
          catcher: this.queryParams.catcher,
          bureauId: this.queryParams.bureauId,
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
        }
        // 请求获取学校数据
        this._handleGetAllSchools(param) 
      },

      /** 
       * 请求获取所辖的学校 
       * @param {object} param:请求参数
       */
      _handleGetAllSchools: function(param) {
        // 显示loading
        this.loading = true
        return requestGetSchools(param)
          .then( response => {
            if (response.code === 0) {
              this.tableData = response.data.datas
              // 设置分页总数
              this.queryParams.totalCount = response.data.totalCount
              // 隐藏loading
              setTimeout( () => {
                this.loading = false
              }, 300)
              // 分页是否显示 
              this.queryParams.visible = (response.data.totalCount > response.data.pageSize) ? true : false
            }
          })
      },

      /** 
       * 获取省地市数据 
       */
      _getProvinceData: function() {
        return requestGetProvince()
          .then( response => {
            if (response.code == 0) {
              this.provincesOptions = []
              this.provincesOptions = response.data
            }
          })
      },

      /** 
       * 省级数据变化
       * @param {object} option:当前的数据对象
      */
      _getProvinceId: function(option) {
        this.schoolForm.provinceCode = option.provinceCode
        // 清空赋值
        this.citysOptions = []
        this.citysOptions = option.cities
        // 默认使用第一个数据的code值
        this.schoolForm.cityCode = option.cities[0].cityCode
      },

      /** 
       * 市级数据变化
       * @param {object} option:当前的数据对象 
       */
      _getCityId: function(option) {
        this.schoolForm.cityCode = option.cityCode
        // 清空赋值
        this.countysOptions = []
        this.countysOptions = option.areas
        // 默认设置第一个数据的areaCode
        this.schoolForm.areaCode = option.areas[0].areaCode
      },

      /** 
       * 获取区级数据
       * @param {object} option:当前的数据对象 
       */
      _getAreaId: function(option) {
        this.schoolForm.areaCode = option.areaCode
      },

      /** 
       * 点击创建学校
       */
      _handleCreateSchool: function() {
        this.dialogStatus = 'createSchool'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['schoolForm'].resetFields()
          this.schoolForm.provinceName = ''
          this.schoolForm.cityName = ''
          this.schoolForm.areaName = ''
        })
      },

      /** 
       * 点击修改学校
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleEditSchool: function(index, scope) {
        this.dialogStatus = 'editSchool'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['schoolForm'].resetFields()
          // 对象拷贝
          this.schoolForm = Object.assign({}, scope)
        })
      },

      /** 
       * 点击删除学校 
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleDeleteSchool: function(index, scope) {
        this.dialogDeleteVisible = true
        this.dialogStatus = 'deleteSchool'
        this.deleteForm = {
          id: scope.id,
          schoolName: scope.schoolName
        }
      },
      
      /** 
       * 添加学校确定
       * @param {String} formName : 表单名称
       */
      _handleCreateSchoolSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 设置参数,注意添加机构Id
            let param = Object.assign({}, this.schoolForm)
            param.bureauId = this.queryParams.bureauId
            // 添加的请求
            return requestPostSchool(param)
              .then( response => {
                if (response.code == 0) {
                  this.dialogFormVisible = false
                  this.$message({
                    message: '恭喜你，添加学校成功',
                    type: 'success',
                    duration: 2000
                  })
                  // 重新获取数据
                  this._getSchools()
                }
              })
          }
        })
      },

      /** 
       * 修改学校确定
       */
      _handleEditSchoolSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.schoolForm)
            return requestPatchSchool(param)
              .then( response => {
                if (response.code == 0) {
                  this.dialogFormVisible = false
                  this.$message({
                    message: '恭喜你，修改学校成功',
                    type: 'success',
                    duration: 2000
                  })
                  // 重新获取数据
                  this._getSchools()
                }  
              })
          }
        })
      },

      /** 
       * 删除学校确定
       */
      _handleDeleteSchoolSure: function() {
        return requestDeleteSchool(this.deleteForm.id)
          .then( response => {
            if (response.code == 0) {
              this.dialogDeleteVisible = false
              this.$message({
                message: '恭喜你，删除学校成功',
                type: 'success',
                duration: 2000
              })
              // 重新获取数据
              this._getSchools()
            }
          })
      },

      /** 
       * 添加、修改dialog取消按钮点击,清空表单，清空省市区联动数据
       * @param {String} formName: 当前的表单名称 
       */
      _handleCancle: function(formName) {
        this.$refs[formName].resetFields()
        this.dialogFormVisible = false
        this.schoolForm.province = ''
        this.schoolForm.city = ''
        this.schoolForm.county = ''
      },

      /** 
       * 分页切换 
       * @param {String} val：当前的页码数
       */
      _handlePageNumChange: function(val) {
        this.queryParams.pageNum = val
        // 重新获取数据
        this._getSchools()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  @import '~style/mixin'

  .school-list
    width 100%
    height 100%
    /* 面包屑 */
    .bread
      margin 30px 0 30px 5px
    /* 操作区域*/
    .operation-area
      height 40px
      line-height 40px
      clear-float()
      
    /* 表格区域*/
    .table-area
      margin-top 40px
      min-height 400px
    .table-area .table-text
      overflow hidden
      text-overflow ellipsis
      white-space nowrap      
</style>
