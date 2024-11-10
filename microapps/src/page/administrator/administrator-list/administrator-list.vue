/** 
 * @desc 用户列表
 */
<template>
  <div class="administrator-list">
    <!-- 添加按钮，搜索框 -->
    <div class="operation-area">
      <!-- 机构 -->
      <el-select 
        v-show="buttonVisible.rootFlag"
        v-model="queryParams.bureauId"
        @change="_orgDataChange" 
        placeholder="机构" 
        style="width: 120px">
        <el-option
          v-for="item in orgOptions"
          :key="item.bureauId"
          :label="item.bureauName"
          :value="item.bureauId">
        </el-option>
      </el-select>
      <!-- 学校 -->
      <el-select 
        v-show="buttonVisible.superFlag"
        v-model="queryParams.schoolId" 
        placeholder="学校"
        @change="_schoolDataChange" 
        style="width: 120px;margin-right: 10px">
        <el-option
          v-for="item in schoolOptions"
          :key="item.schoolId"
          :label="item.schoolName"
          :value="item.schoolId">
        </el-option>
      </el-select>

      <!-- 添加超级按钮 -->
      <el-button
        v-if="buttonVisible.rootFlag" 
        plain>
        添加机构管理员
      </el-button>

      <!-- 添加学校按钮 -->
      <el-button 
        v-if="buttonVisible.superFlag"
        plain>
        添加学校管理员
      </el-button>

      <!-- 添加教师 -->
      <el-button plain>添加教师</el-button>
      <!-- 批量添加教师 -->
      <el-button plain>批量添加教师</el-button>
      <!-- 导出教师 -->
      <el-button plain>导出教师信息</el-button>

      <el-input
        placeholder="请输入姓名/登录名/手机号"
        style="width:230px;float:right"
        v-model="queryParams.catcher">
      </el-input>  
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <el-table :data="tableData" stripe style="width: 100%" v-loading ="loading">
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <span v-text="scope.row.userName ? scope.row.userName : '--'"></span>
          </template>
        </el-table-column>

        <el-table-column label="身份" width="160">
          <template slot-scope="scope">
            <span 
              v-text="scope.row.type === 2 ? '机构管理员' : scope.row.type === 3 ? '学校管理员' : '教师'"
              :style="{color: scope.row.type === 2 ? '#DBAF00' : scope.row.type === 3 ? '#CC6699' : ''}"></span>
          </template>
        </el-table-column>

        <el-table-column label="年级" width="100">
          <template slot-scope="scope">
            <span v-text="scope.row.grade ? scope.row.grade : '--'">}</span>
          </template>
        </el-table-column>

        <el-table-column label="班级"  width="100">
          <template slot-scope="scope">
            <div 
              class="table-text" 
              v-text="scope.row.clazz ? scope.row.clazz : '--'">
            </div>
          </template>
        </el-table-column>

        <el-table-column label="科目" width="160">
          <template slot-scope="scope">
            <div 
              class="table-text" 
              v-text="scope.row.subject ? scope.row.subject : '--'">
            </div>
          </template>
        </el-table-column>

        <el-table-column label="手机号" width="160">
          <template slot-scope="scope">
            <div 
              class="table-text"
              v-text="scope.row.phone ? scope.row.phone : '--'">
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.type === 2"
              size="mini"
              icon="el-icon-edit"
              @click="_handleEditSuperAdmin(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-else-if="scope.row.type === 3"
              size="mini"
              icon="el-icon-edit"
              @click="_handleEditSchoolAdmin(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-else
              size="mini"
              icon="el-icon-edit"
              @click="_handleEditTeacher(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.type === 2"
              plain
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="_handleDeleteSuperAdmin(scope.$index, scope.row)">删除</el-button>
            <el-button
              v-else-if="scope.row.type === 3"
              plain
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="_handleDeleteSchool(scope.$index, scope.row)">删除</el-button>
            <el-button
              v-else
              plain
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="_handledeleteTeacher(scope.$index, scope.row)">删除</el-button>
            <el-button plain size="mini" icon="el-icon-refresh" @click="_handleReset(scope.$index, scope.row)">重置密码</el-button>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="dataForm" :rules="dataRules" ref="dataForm" label-width="80px">
        <el-form-item v-if="dialogStatus == 'createSuperAdmin' || dialogStatus == 'editSuperAdmin' || dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin'" label="所属机构" prop="org">
          <el-input :disabled="dialogStatus == 'createSuperAdmin' || dialogStatus == 'editSuperAdmin' || dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin'" v-model.trim="dataForm.org" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin'" label="所属学校" prop="school">
          <el-input :disabled="dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin' || dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin'" v-model.trim="dataForm.school" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'createTeacher' || dialogStatus == 'editTeacher'" label="姓名" prop="teacherName">
          <el-input :disabled="dialogStatus == 'editSuperAdmin' || dialogStatus == 'editSchoolAdmin'" v-model.trim="dataForm.teacherName" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item label="登录名" prop="loginName">
          <el-input :disabled="dialogStatus == 'editSuperAdmin' || dialogStatus == 'editSchoolAdmin' || dialogStatus == 'editTeacher'" v-model.trim="dataForm.loginName" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'createSuperAdmin' || dialogStatus == 'editSuperAdmin' || dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin'" label="联系人" prop="userName">
          <el-input v-model.trim="dataForm.userName" style="width: 220px"></el-input>
        </el-form-item>

        <!-- <el-form-item v-if="dialogStatus == 'createSuperAdmin' || dialogStatus == 'editSuperAdmin' || dialogStatus == 'createSchoolAdmin' || dialogStatus == 'editSchoolAdmin'" label="联系方式" prop="contact">
          <el-input v-model.trim="dataForm.contact" style="width: 220px"></el-input>
        </el-form-item> -->

        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="dataForm.phone" style="width: 220px" :maxlength="11" :minlength="11"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'createTeacher' || dialogStatus == 'editTeacher'" label="年级" prop="grade">
          <el-input v-model.trim="dataForm.grade" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'createTeacher' || dialogStatus == 'editTeacher'" label="班级" prop="class">
          <el-input v-model.trim="dataForm.class" style="width: 220px"></el-input>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'createTeacher' || dialogStatus == 'editTeacher'" label="科目" prop="subject">
          <el-input v-model.trim="dataForm.subject" style="width: 220px"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="_handleCancle">取 消</el-button>
        <el-button v-if="dialogStatus == 'createSuperAdmin'" type="primary" @click.native="_handleCreateSuperAdminSure('dataForm')">添加</el-button>
        <el-button v-else-if="dialogStatus == 'editSuperAdmin'" type="primary" @click.native="_handleEditSuperAdminSure('dataForm')">修改</el-button>
        <el-button v-else-if="dialogStatus == 'createSchoolAdmin'" type="primary" @click.native="_handleCreateSchoolAdminSure('dataForm')">添加</el-button>
        <el-button v-else-if="dialogStatus == 'editSchoolAdmin'" type="primary" @click.native="_handleEditSchoolAdminSure('dataForm')">修改</el-button>
        <el-button v-else-if="dialogStatus == 'createTeacher'" type="primary" @click.native="_handleCreateTeacherSure('dataForm')">添加</el-button>
        <el-button v-else-if="dialogStatus == 'editTeacher'" type="primary" @click.native="_handleEditTeacherSure('dataForm')">修改</el-button>
      </div>
    </el-dialog>

    <!-- 删除dialog -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeleteVisible" width="30%">
      <p>是否{{textMap[dialogStatus]}}账号：<span style="color: red">{{dataForm.userName}}?</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus == 'deleteSuperAdmin'" type="primary" @click="_handleDeleteSuperAdminSure">确定</el-button>
        <el-button v-else-if="dialogStatus == 'deleteSchoolAdmin'" type="primary" @click="_handleDeleteSchoolAdminSure">确定</el-button>
        <el-button v-else-if="dialogStatus == 'deleteTeacher'" type="primary" @click="_handleDeleteTeacherSure">确定</el-button>  
      </span>
    </el-dialog>

    <!-- 重置密码dialog -->
    <el-dialog title="重置密码" :visible.sync="dialogResetVisible" width="30%">
      <p>是否重置：<span style="color: red">{{dataForm.userName}}</span>的密码？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogResetVisible = false">取 消</el-button>
        <el-button type="primary" @click="_handleResetSure">确定</el-button>  
      </span>
    </el-dialog>

    <!-- 批量添加教师dialog -->
    <el-dialog title="批量添加职工" :visible.sync="dialogBatchVisible" width="30%">
      <div class="batch-step">
        <span>步骤1 下载模板文件</span>
        <p class="step-text">
          <img src="./img/excle.svg" alt="" style="width:30px;height:30px">
          <span>xlsx文件.xlsx</span>
          <a 
            :href="downloadUrl" 
            :download="downloadUrl" 
            class="download-btn">
            下载文件
          </a>
        </p>
      </div>

      <div class="batch-step">
        <span>步骤2 编辑文件</span>
        <p class="step-text">
          按照文件内样例的形式编辑文件
        </p>
      </div>

       <div class="batch-step">
        <span>步骤3 上传文件</span>
        <p class="step-text">
          <el-input v-model="fileName" style="width: 180px"></el-input>
          <input ref="uploadFile" hidden type="file" @change="_handleUploadFile">
          <button class="download-btn clickable" @click="$refs.uploadFile.click()">上传</button>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_handleUploadExcel">添 加</el-button>  
        <el-button @click="dialogBatchVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'config/config'
  import { sessionStorageUtil } from 'lib/util'
  import { requestGetRole } from 'api/role'
  import { 
    requestGetSelectDatas,
    requestGetAllAdmins,
    requestPostSuperAdmin,
    requestPostSchoolAdmin,
    requestPostTeacher,
    requestPatchAdmin,
    requestPatchTeacher,
    requestDeleteAdmin,
    requestDeleteTeacher,
    requestResetPassword,
    requesteExportTeacherInfo,
    requestUploadExcel,
    requestGetSystemAdmin 
    } from 'api/admin'

  export default {
    name: 'administrator-list',
    data: function() {
      const validatePhone = (rule, value, callback) =>{
        let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if(null == value || value == '') {
          callback(new Error('请输入手机号'))
        } else if (!value.match(pattern) || value.length != 11) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      }
      const validateName = (rule, value, callback) => {
        let pattern = /^([\u4e00-\u9fa5]){2,7}$/
        if (!value.match(pattern)) {
          callback(new Error('请输入2~7位的中文'))
        } else {
          callback()
        }
      }
      return {
        // 下拉和按钮显示标识
        buttonVisible: {
          rootFlag: true,
          superFlag: true
        },

        // loading
        loading: false,
      
        // 获取数据的参数
        queryParams: {
          bureauId: '',
          schoolId: '',
          catcher: '',
          pageSize: 10,
          pageNum: 1,
          totalCount: 0,
          visible: false
        },

        // 列表数据
        tableData: [],
        // dialog标识
        dialogFormVisible: false,
        dialogDeleteVisible: false,
        dialogBatchVisible: false,
        dialogResetVisible: false,

        // 弹窗状态
        dialogStatus: '',
        textMap: {
          createSuperAdmin: '添加机构管理员',
          editSuperAdmin: '修改机构管理员',
          createSchoolAdmin: '添加学校管理员',
          editSchoolAdmin: '修改学校管理员',
          createTeacher: '添加教师',
          editTeacher: '修改教师',
          deleteSuperAdmin: '删除机构管理员',
          deleteSchoolAdmin: '删除学校管理员',
          deleteTeacher: '删除教师'
        },

        // 表单对象
        dataForm: {
          org: '',
          school: '',
          loginName: '',
          userName: '',
          contact: '',
          phone: '',
          teacherName: '',
          grade: '',
          class: '',
          subject: '',
          id: ''
        },
        dataRules: {
          org: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '请输入学校名称', trigger: 'blur' }
          ],
          loginName: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在6到30位字符', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          teacherName: [
            { required: true, message: '请输入教师姓名', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ]
        },

        // 机构选项列表
        orgOptions: [],
        // 学校选项列表
        schoolOptions: [],

        // 上传文件的名称和文件对象
        fileName: '',
        file: {},

        // 当前被选中的机构和学校数据
        selectedData: {
          bureauName: '',
          schoolName: ''
        },

        // 当前的数据对象
        selectedObj: {},

        // excel导出的数据列表
        list:[]
      }
    },
    computed: {
      downloadUrl: function() {
        return baseURL + '/template'
      }
    },
    created: function() {
      // this._fetchData()
    },
    watch: {
      queryParams: {
        deep: true,
        handler() {
          // this._paramsChange()
        }
      }
    },
    methods: {
      /** 
       * 获取数据的方法（同步操作） 
       */
      _fetchData: async function() {
        await this._handleGetRole()
        await this._handleGetSelectData()
      },

      /** 
       * 获取帐号的角色 
       */
      _handleGetRole: function() {
        requestGetRole().then( response => {
          if (response.code === 0) {
            let role = response.data.role
            switch (role) {
              case 'root':
                this.buttonVisible = {
                  rootFlag: true,
                  superFlag: true
                }
                break
              case 'super':
                this.buttonVisible = {
                  rootFlag: false,
                  superFlag: true
                }
                break
              default: 
                this.buttonVisible = {
                  rootFlag: false,
                  superFlag: false
                }
                break    
            }
          }
        })
      },

      /** 
       * 获取机构和学校的下拉列表数据
       */
      _handleGetSelectData: function() {
        requestGetSelectDatas().then(response => {
          // console.log('requestGetSelectDatas sucess', response.data)
          if (response.code === 0) {
            // 如果存在机构和学校列表(root、super帐号)
            if(response.data) {
              this.orgOptions = response.data
              if (this.orgOptions.length) {
                // 默认设置第一个数据
                this.queryParams.bureauId = this.orgOptions[0].bureauId
                // 设置当前的数据对象
                this._getSchooByOrgId(this.queryParams.bureauId)
                // 设置默认选中的当前机构名称
                this.selectedData.bureauName = this.orgOptions[0].bureauName
              }
            }
            // 不需要机构和学校的数据（system帐号的操作） 
            else {
              this._handleGetSystemInfo()
            }
          }
        })
      },

      /** 
       * 普通帐号获取机构和学校ID
      */
      _handleGetSystemInfo: function() {
        return requestGetSystemAdmin().then(response => {
          if(response.code === 0) {
            this.queryParams.bureauId = response.data.bureauId
            this.queryParams.schoolId = response.data.schoolId
            this.selectedData.schoolName = response.data.schoolName
            this._paramsChange()
          }
        })
      },

      /** 
       * 机构数据改变 
       */
      _orgDataChange: function(val) {
        let orgObj = this.orgOptions.filter(item => {
          return val === item.bureauId
        })
        // 清空学校数据
        this.schoolOptions = []
        // 设置请求参数的数据
        this.queryParams.schoolId = ''
        this.queryParams.catcher = ''
        this.queryParams.bureauId = val
        // 设置当前选中的机构的数据,清空对应的学校名称
        this.selectedData.bureauName = orgObj[0].bureauName
        this.selectedData.schoolName = ''
        // 通过机构的Id获取学校的信息
        this._getSchooByOrgId(val)
      },

      /** 
       * 通过机构Id来获取学校数据
      */
      _getSchooByOrgId: function(id) {
        let orgObj = this.orgOptions.filter(item => {
          return id === item.bureauId
        })
        // 赋值当前的对象数据
        this.selectedObj = {}
        this.selectedObj = orgObj[0]
        // 给学校的数据赋值
        this.schoolOptions = orgObj[0].schools

        // 默认显示数据第一个
        if (this.schoolOptions.length) {
          this.queryParams.bureauId = this.schoolOptions[0].bureauId
          this.queryParams.schoolId = this.schoolOptions[0].schoolId
          // 设置当前的学校名称
          this.selectedData.schoolName = this.schoolOptions[0].schoolName
        }
      },

      /** 
       * 学校数据改变
       */
      _schoolDataChange: function(val) {
        let schoolObj = this.selectedObj.schools.filter(item => {
          return val === item.schoolId
        })
        this.queryParams.catcher = ''
        this.selectedData.schoolName = schoolObj[0].schoolName ? schoolObj[0].schoolName : ''
      }, 

      /** 
       * 获取所有的管理员列表
      */
      _paramsChange: function() {
        this._handleGetAllAdmins(this.queryParams)
      },

      /** 
       * 请求获取当前参数对象的所有管理员数据 
       */
      _handleGetAllAdmins: function(param) {
        this.loading = true
        requestGetAllAdmins(param).then(response => {
          if (response.code === 0) {
            // 分页的显示和数据的赋值
            this.queryParams.visible = response.data.totalCount > response.data.pageSize ? true : false
            this.queryParams.pageNum = response.data.pageNum
            this.queryParams.totalCount = response.data.totalCount
            // 处理表格数据，将不同身份的数据放到一个数组中去
            if (response.data.datas.length) {
              this._setAdminsData(response.data.datas)
            } else {
              this.tableData = []
            }
            // 隐藏loading
            setTimeout( () => {
              this.loading = false
            }, 300)
          }
        }).catch(error => {
          // 隐藏loading
          setTimeout( () => {
            this.loading = false
          }, 300)
        })
      },

      /** 
       * 设置表格的数据
       * @param {Object} array: 总的数组数据
      */
      _setAdminsData: function(array) {
        this.tableData = []
        let arr = []
        arr = [].concat(array[0].super, array[0].system, array[0].teacher)
        this.tableData = arr
      },

      /** 
       * 创建机构管理员,创建的时候要清空表单 
       */
      _handleCreateSuperAdmin: function() {
        this.dialogStatus = 'createSuperAdmin'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm = {
            org: this.selectedData.bureauName
          }
        })
      },

      /** 
       * 创建学校管理员
       */
      _handleCreateSchoolAdmin: function() {
        this.dialogStatus = 'createSchoolAdmin'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm = {
            org: this.selectedData.bureauName,
            school: this.selectedData.schoolName
          }
        })
      },

      /** 
       * 创建教师 
       */
      _handleCreateTeacher: function() {
        this.dialogStatus = 'createTeacher'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },

      /** 
       * 编辑机构管理员
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleEditSuperAdmin: function(index, scope) {
        this.dialogStatus = 'editSuperAdmin'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm = {
            org: this.selectedData.bureauName,
            loginName: scope.loginName,
            userName: scope.userName,
            phone: scope.phone.toString(),
            id: scope.id
          }
        })
      },

      /** 
       * 编辑学校管理员
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleEditSchoolAdmin: function(index, scope) {
        this.dialogStatus = 'editSchoolAdmin'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm = {
            org: this.selectedData.bureauName,
            school: this.selectedData.schoolName,
            loginName: scope.loginName,
            userName: scope.userName,
            phone: scope.phone.toString(),
            id: scope.id
          }
        })
      },

      /** 
       * 编辑教师, toString()方法使得number变为String类型，为了通过element-ui的校验规则
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleEditTeacher: function(index, scope) {
        this.dialogStatus = 'editTeacher'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm = {
            id: scope.id,
            teacherName: scope.userName,
            loginName: scope.loginName,
            phone: scope.phone.toString(),
            class: scope.clazz,
            grade: scope.grade,
            subject: scope.subject
          }
        })
      },

      /** 
       * 删除机构管理员按钮点击 
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleDeleteSuperAdmin: function(index, scope) {
        this.dialogDeleteVisible = true
        this.dialogStatus = 'deleteSuperAdmin'
        this.$nextTick(() => {
          this.dataForm = {
            userName: scope.userName,
            id: scope.id
          }
        })
      },

      /** 
       * 删除学校管理员按钮点击 
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleDeleteSchool: function(index, scope) {
        this.dialogDeleteVisible = true
        this.dialogStatus = 'deleteSchoolAdmin'
        this.$nextTick(() => {
          this.dataForm = {
            userName: scope.userName,
            id: scope.id
          }
        })
      },
      
      /** 
       * 删除教师按钮点击 
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handledeleteTeacher: function(index, scope) {
        this.dialogDeleteVisible = true
        this.dialogStatus = 'deleteTeacher'
        this.$nextTick(() => {
          this.dataForm = {
            userName: scope.userName,
            id: scope.id
          }
        })
      },

      /** 
       * 添加机构管理员确定
       */
      _handleCreateSuperAdminSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              bureauId: this.queryParams.bureauId,
              schoolId: this.queryParams.schoolId,
              loginName: this.dataForm.loginName,
              userName: this.dataForm.userName,
              phone: this.dataForm.phone
            }
            // 调用请求
            requestPostSuperAdmin(param).then( response => {
              let code = response.code
              let message = response.message
              switch (code) {
                case 0:
                  this.dialogFormVisible = false
                  this.$message({
                    message: '恭喜你，添加机构管理员成功',
                    type: 'success',
                    duration: 2000
                  })
                  // 重新获取数据
                  this._handleGetAllAdmins(this.queryParams)
                  break
                case 1:
                  this.$message({
                    message: `很抱歉，${message}`,
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
                default:
                  this.$message({
                    message: '很抱歉，添加机构管理员失败',
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
       * 添加学校管理员确定
       */
      _handleCreateSchoolAdminSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              bureauId: this.queryParams.bureauId,
              schoolId: this.queryParams.schoolId,
              loginName: this.dataForm.loginName,
              userName: this.dataForm.userName,
              phone: this.dataForm.phone
            }
            // 调用请求
            requestPostSchoolAdmin(param).then( response => {
              let code = response.code
              let message = response.message
              switch (code) {
                case 0:
                  this.dialogFormVisible = false
                  this.$message({
                    message: '恭喜你，添加学校管理员成功',
                    type: 'success',
                    duration: 2000
                  })
                  // 重新获取数据
                  this._handleGetAllAdmins(this.queryParams)
                  break
                case 1:
                  this.$message({
                    message: `很抱歉，${message}`,
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
                default:
                  this.$message({
                    message: '很抱歉，添加学校管理员失败',
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
       * 添加教师确定
       */
      _handleCreateTeacherSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              bureauId: this.queryParams.bureauId,
              schoolId: this.queryParams.schoolId,
              loginName: this.dataForm.loginName,
              userName: this.dataForm.teacherName,
              phone: this.dataForm.phone,
              clazz: this.dataForm.class,
              grade: this.dataForm.grade,
              subject: this.dataForm.subject
            }
            // 调用请求
            requestPostTeacher(param).then( response => {
              let code = response.code
              let message = response.message
              switch (code) {
                case 0:
                  this.dialogFormVisible = false
                  this.$message({
                    message: '恭喜你，添加教师成功',
                    type: 'success',
                    duration: 2000
                  })
                  // 重新获取数据
                  this._handleGetAllAdmins(this.queryParams)
                  break
                case 1:
                  this.$message({
                    message: `很抱歉，${message}`,
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
                default:
                  this.$message({
                    message: '很抱歉，添加教师失败',
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
       * 修改机构管理员确定
       */
      _handleEditSuperAdminSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              id: this.dataForm.id,
              userName: this.dataForm.userName,
              phone: this.dataForm.phone
            }
            // 调用请求
            requestPatchAdmin(param).then( response => {
              if (response.code === 0) {
                this.dialogFormVisible = false
                this.$message({
                  message: '恭喜你，修改机构管理员成功',
                  type: 'success',
                  duration: 2000
                })
                // 重新获取数据
                this._handleGetAllAdmins(this.queryParams)
              }
            })
          }
        })
      },

      /** 
       * 修改学校管理员确定
       */
      _handleEditSchoolAdminSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              id: this.dataForm.id,
              userName: this.dataForm.userName,
              phone: this.dataForm.phone
            }
            // 调用请求
            requestPatchAdmin(param).then( response => {
              if (response.code === 0) {
                this.dialogFormVisible = false
                this.$message({
                  message: '恭喜你，修改学校管理员成功',
                  type: 'success',
                  duration: 2000
                })
                // 重新获取数据
                this._handleGetAllAdmins(this.queryParams)
              }
            })
          }
        })
      },

      /** 
       * 修改教师确定 
       */
      _handleEditTeacherSure: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              id: this.dataForm.id,
              userName: this.dataForm.teacherName,
              phone: this.dataForm.phone,
              clazz: this.dataForm.class,
              grade: this.dataForm.grade,
              subject: this.dataForm.subject
            }
            // 调用请求
            requestPatchTeacher(param).then( response => {
              if (response.code === 0) {
                this.dialogFormVisible = false
                this.$message({
                  message: '恭喜你，修改教师成功',
                  type: 'success',
                  duration: 2000
                })
                // 重新获取数据
                this._handleGetAllAdmins(this.queryParams)
              }
            })
          }
        })
      },

      /** 
       * 删除机构管理员确定
       */
      _handleDeleteSuperAdminSure: function() {
        let id = this.dataForm.id
        requestDeleteAdmin(id).then( response => {
          if (response.code === 0) {
            this.dialogDeleteVisible = false
            this.$message({
              message: '恭喜你，删除机构管理员成功',
              type: 'success',
              duration: 2000
            })
            // 重新获取数据
            this._handleGetAllAdmins(this.queryParams)
          }
        })
      },

      /** 
       * 删除学校管理员确定
       */
      _handleDeleteSchoolAdminSure: function() {
        let id = this.dataForm.id
        requestDeleteAdmin(id).then( response => {
          if (response.code === 0) {
            this.dialogDeleteVisible = false
            this.$message({
              message: '恭喜你，删除学校管理员成功',
              type: 'success',
              duration: 2000
            })
            // 重新获取数据
            this._handleGetAllAdmins(this.queryParams)
          }
        })
      },

      /** 
       * 删除教师确定
       */
      _handleDeleteTeacherSure: function() {
        let id = this.dataForm.id
        requestDeleteTeacher(id).then( response => {
          if (response.code === 0) {
            this.dialogDeleteVisible = false
            this.$message({
              message: '恭喜你，删除教师账号成功',
              type: 'success',
              duration: 2000
            })
            // 重新获取数据
            this._handleGetAllAdmins(this.queryParams)
          }
        })
      },

      /** 
       * 重置密码按钮点击 
       * @param {Object} scope: 当前点击的信息对象
       * @param {Number} index: 当前数据在数组的下标
       */
      _handleReset: function(index, scope) {
        this.dialogResetVisible = true
        this.$nextTick(() => {
          this.dataForm = {
            userName: scope.userName,
            id: scope.id,
            type: scope.type
          }
        })
      },
      
      /** 
       * 重置密码确定 
       */
      _handleResetSure: function() {
        let param = {
          type: this.dataForm.type,
          id: this.dataForm.id
        }
        // 调用请求 
        requestResetPassword(param).then( response => {
          let code = response.code
          switch (code) {
            case 0:
              this.dialogResetVisible = false
              this.$message({
                message: '恭喜你，重置密码成功',
                type: 'success',
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
            default:
              this.$message({
                message: '很抱歉，重置密码失败',
                type: 'error',
                duration: 2000
              })
              break
          }
        })
      },

      /** 
       * 添加、修改dialog取消按钮点击
       * @param {String} formName: 当前的表单名称 
       */
      _handleCancle: function() {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dialogFormVisible = false
        })
      },

      /** 
       * 分页切换 
       * @param {String} val：当前的页码数
       */
      _handlePageNumChange: function(val) {
        this.queryParams.pageNum = val
        this.queryParams.catcher = ''
        // 重新获取数据
        this._handleGetAllAdmins(this.queryParams)
      },

      /** 
       * 导出教师信息点击
      */
    _handleDownFile: function() {
      let bureauId = this.queryParams.bureauId
      let schoolId = this.queryParams.schoolId
      return
      // 调用请求获取excel数据
      requesteExportTeacherInfo(bureauId, schoolId).then(response => {
        if (response.code === 0) {
          this.list = response.data
          // 如果有对应的excel数据才进行操作
          if (this.list.length) {
            import('vendor/Export2Excel').then(excel => {
              const tHeader = ['姓名','登录名','手机号','年级','班级','科目']
              const filterVal = ['userName', 'loginName', 'phone', 'grade', 'clazz', 'subject']
              const list = this.list
              const data = this.formatJson(filterVal, list)
              const school = this.selectedData.schoolName ? this.selectedData.schoolName : ''
              excel.export_json_to_excel(tHeader, data, `${school}教师列表`)
            })
          } 
          // 没有对应的教师数据
          else {
            this.$message({
              message: '很抱歉,请先添加教师数据再导出',
              type: 'error',
              duration: 2000
            })
          }
        }
      })
    },

    /** 
     * 格式化excel数据
    */
    formatJson: function(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

      /** 
       * 上传excel文件按钮点击
       */
      _handleUploadFile: function(ev) {
        this.file = {}
        this.fileName = ''
        let file = ev.target.files[0]
        // 判断是不是excel
        if (file.name.indexOf('.xls') < 0) {
          this.$message({
            message: '很抱歉，请上传EXCEL文件',
            type: 'error',
            duration: 2000
          })
          return
        }
        // 显示文件的名称
        this.fileName = file.name
        this.file = file
      },

      /** 
       * 批量添加教师按钮点击
      */
     _handleAddTeachers: function() {
       this.dialogBatchVisible = true
       this.fileName = ''
       this.file = {}
       // 设input值为空，避免再次选中同一个文件无法触发change事件
       this.$refs.uploadFile.value = '' 
     },

      /** 
       * 批量添加确定点击 
      */
      _handleUploadExcel: function() {
        if (this.fileName != '') {
          // 请求的一些参数
          let bureauId = this.queryParams.bureauId
          let schoolId = this.queryParams.schoolId
          // formData数据
          let fileData = new FormData()
          fileData.append('excelFile', this.file)
          return
          // 添加的请求
          requestUploadExcel(fileData, bureauId, schoolId).then(response => {
            let code = response.code
            switch (code) {
              case 0:
                this.$message({
                  message: '恭喜你，上传文件成功',
                  type: 'success',
                  duration: 2000
                })
                this.dialogBatchVisible = false
                // 重新获取数据
                this._handleGetAllAdmins(this.queryParams)
                break
              case 1:
                const list = response.data
                // 如果有对应的excel数据才进行操作
                if (list.length) {
                  import('vendor/Export2Excel').then(excel => {
                    const tHeader = ['原因']
                    const filterVal = ['reason']
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel(tHeader, data, '错误数据表')
                  })
                }
                this.$message({
                  message: `很抱歉，文件中有重复数据，请检查核对`,
                  type: 'error',
                  duration: 2000
                })
                break 
              } 
            // 设input值为空，避免再次选中同一个文件无法触发change事件
            this.$refs.uploadFile.value = '' 
          })
        } else {
          this.$message({
            message: '很抱歉，请先选择文件',
            type: 'error',
            duration: 2000
          })
          return
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  @import '~style/mixin'

  .administrator-list
    width 100%
    height 100%
    /* 操作区域*/
    .operation-area
      margin-top 20px
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

    /* dialog中的步骤 */
    .batch-step
      margin-bottom 20px
      .step-text
        padding-left 30px
        img
          width 40px
          height 40px
          margin-right 10px
          vertical-align middle
        .download-btn
          display inline-block
          width 80px
          height 40px
          padding 0 10px
          margin-left 20px
          line-height 40px
          border-radius 4px
          border 1px solid #dcdfe6
          &:hover
            color #409EFF
            border-color #409EFF    
</style>
