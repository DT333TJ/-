/** 
 * @desc 机构列表
 */
<template>
  <div class="organization-list">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item>机构管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮，搜索框 -->
    <div class="operation-area">
      <el-button plain @click="_handleCreateOrg">添加机构</el-button>
      <el-input
        placeholder="请输入机构名/联系人/联系方式"
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
        <!-- 机构时候显示 -->
        <el-table-column
          label="机构"
          width="180">
          <template slot-scope="scope">
            <router-link
              :to="{ path: 'school-list', query: { id: `${scope.row.id}`, name: `${scope.row.bureauName}` }}"
              tag="span" 
              v-text="scope.row.bureauName ? scope.row.bureauName : '--'"
              class="clickable table-orgName"></router-link>
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
              @click="_handleEditOrg(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="_handleDeleteOrg(scope.$index, scope.row)">删除</el-button>
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
      <el-form ref="dataForm" :model="dataForm" :rules="dataRules" label-width="120px">
        <el-form-item label="名称" prop="bureauName">
          <el-input 
            v-model.trim="dataForm.bureauName" 
            style="width: 220px">
          </el-input>
        </el-form-item>

        <el-form-item label="总部地址">
          <el-select 
            placeholder="省份" 
            v-model="dataForm.provinceName" 
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
            v-model="dataForm.cityName" 
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
            v-model="dataForm.areaName" 
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

        <el-form-item label="联系人" prop="contacts">
          <el-input v-model.trim="dataForm.contacts" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="contactPhone">
          <el-input v-model.trim="dataForm.contactPhone" style="width: 220px" :maxlength="11" :minlength="11"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="comment">
          <el-input type="textarea" v-model="dataForm.comment" style="width: 400px" :autosize="{ minRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="_handleCancle('dataForm')">取 消</el-button>
        <el-button 
          v-if="dialogStatus == 'createOrg'" 
          type="primary" 
          @click.native="_handleCreateOrgSure('dataForm')">
          添加机构确定
        </el-button>
        <el-button 
          v-else-if="dialogStatus == 'editOrg'" 
          type="primary" 
          @click.native="_handleEditOrgSure('dataForm')">
          修改机构确定
        </el-button>
      </div>
    </el-dialog>

    <!-- 删除dialog -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeleteVisible" width="30%">
      <p>是否{{textMap[dialogStatus]}}：<span style="color: red">{{deleteForm.bureauName}}?</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus == 'deleteOrg'" type="primary" @click="_handleDeleteOrgSure">确定删除机构</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { sessionStorageUtil } from 'lib/util'
  import { 
    requestGetProvince,
    requestGetAllOrgs,
    requestPostOrg,
    requestDeleteOrg,
    requestPatchOrg
  } from 'api/org'

  export default {
    name: 'organization-list',
    data: function() {
      return {
        // 面包屑标识和面包屑显示的文字
        isChildOrg: false,  //根据是不是子机构的标识来显示不同的页面内容
        breadOrgName: '',

        // loading
        loading: false,

        // 搜索参数
        queryParams: {
          catcher: '',
          pageNum: 1,
          pageSize: 10,
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
          createOrg: '添加机构',
          editOrg: '修改机构',
          deleteOrg: '删除机构'
        },

        // 表单对象
        dataForm: {
          bureauName: '',
          contacts: '',
          contactPhone: '',
          address: '',
          comment: '',
          provinceCode: '',
          cityCode: '',
          areaCode: '',
          provinceName: '',
          cityName: '',
          areaName: ''
        },
        dataRules: {
          bureauName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },

        // 删除数据的表单
        deleteForm: {
          id: '',
          bureauName: ''
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
          // this._getAllOrgs()
        }
      }
    },
    created: function() {
      // this._getProvinceData()
      // this._getAllOrgs()
    },
    methods: {
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
        this.dataForm.provinceCode = option.provinceCode
        // 清空赋值
        this.citysOptions = []
        this.citysOptions = option.cities
        // 默认使用第一个数据的code值
        this.dataForm.cityCode = option.cities[0].cityCode
      },

      /** 
       * 市级数据变化
       * @param {object} option:当前的数据对象 
       */
      _getCityId: function(option) {
        this.dataForm.cityCode = option.cityCode
        // 清空赋值
        this.countysOptions = []
        this.countysOptions = option.areas
        // 默认设置第一个数据的areaCode
        this.dataForm.areaCode = option.areas[0].areaCode
      },

      /** 
       * 获取区级数据
       * @param {object} option:当前的数据对象 
       */
      _getAreaId: function(option) {
        this.dataForm.areaCode = option.areaCode
      },

      /** 
       * 获取机构列表 
       */
      _getAllOrgs: function() {
        // 设置参数
        let param = {
          catcher: this.queryParams.catcher,
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize
        }
        // 请求获取数据
        this._handleGetAllOrgs(param)
      },

      /** 
       * 请求获取所有的一级机构的方法 
       * @param {object} param: 获取的参数
       */
      _handleGetAllOrgs: function(param) {
        // 显示loading
        this.loading = true
        return requestGetAllOrgs(param)
          .then(response => {
            if (response.code == 0) {
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
       * 点击创建机构,创建的时候要清空对应的表单 
       */
      _handleCreateOrg: function() {
        // 设置状态显示dialog文字内容
        this.dialogStatus = 'createOrg'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.provinceName = ''
          this.dataForm.cityName = ''
          this.dataForm.areaName = ''
        })
      },

      /** 
       * 点击修改机构
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleEditOrg: function(index, scope) {
        this.dialogStatus = 'editOrg'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          // 清空数据
          this.$refs['dataForm'].resetFields()
          // 对象拷贝
          this.dataForm = Object.assign({}, scope)
        })
      },

      /** 
       * 点击删除机构
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleDeleteOrg: function(index, scope) {
        this.dialogDeleteVisible = true
        this.dialogStatus = 'deleteOrg'
        this.deleteForm = {
          id: scope.id,
          bureauName: scope.bureauName
        }
      },

      /** 
       * 添加机构确定
       * @param {String} formName: 表单名称
       */
      _handleCreateOrgSure: function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.dataForm)
            // 添加的请求
            return requestPostOrg(param)
              .then( response => {
                let code = response.code
                switch(code) {
                  case 0:
                    this.dialogFormVisible = false
                    this.$message({
                      message: '恭喜你，添加机构成功',
                      type: 'success',
                      duration: 2000
                    })
                    // 重新获取数据
                    this._getAllOrgs()
                    break
                  case 1:
                    let msg = response.message
                    this.$message({
                      message: '很抱歉,'+ msg,
                      type: 'error',
                      duration: 2000
                    })
                    break
                  case 12011:
                    this.$message({
                      message: '很抱歉，您的权限不足',
                      type: 'error',
                      duration: 2000
                    })
                    break
                }
              })
          }
        })
      },

      /** 
       * 修改机构确定
       * @param {String} formName: 表单名称
       */
      _handleEditOrgSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.dataForm)
            // 修改的请求
            return requestPatchOrg(param)
              .then( response => {
                if (response.code === 0) {
                  this.dialogFormVisible = false
                  this.$message({
                    message: '恭喜你，修改机构成功',
                    type: 'success',
                    duration: 2000
                  })
                  // 重新获取数据
                  this._getAllOrgs()
                } 
              })
          }
        })
      },

      /** 
       * 删除机构确定
       */
      _handleDeleteOrgSure: function() {
        return requestDeleteOrg(this.deleteForm.id)
          .then( response => {
            if (response.code == 0) {
              this.dialogDeleteVisible = false
              this.$message({
                message: '恭喜你，删除机构成功',
                type: 'success',
                duration: 2000
              })
              // 重新获取数据
              this._getAllOrgs()
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
        this.dataForm.province = ''
        this.dataForm.city = ''
        this.dataForm.county = ''
      },

      /** 
       * 分页切换 
       * @param {String} val：当前的页码数
       */
      _handlePageNumChange: function(val) {
        this.queryParams.pageNum = val
        // 重新获取数据
        this._getAllOrgs()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  @import '~style/mixin'

  .organization-list
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
      height 600px
    .table-area .table-text
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .table-area .table-orgName
      &:hover
        color: #409eff      
</style>
