<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                v-model="listQuery.menuName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">创建网站
      </el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
              style="width: 100%">

      <el-table-column min-width="50px" label="Id">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="网站标题">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="网站链接">
        <template scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="网站图片">
        <template scope="scope">
          <img :src="scope.row.image" height="80" width="80"></img>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="所属菜单">
        <template scope="scope">
          <span>{{scope.row.menuName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="位置排序">
        <template scope="scope">
          <span>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作"  width="250">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>

          <el-button size="small" type="success" @click="handleDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" close = "onClose">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="网站标题">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="网站链接">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="后台链接">
          <el-input v-model="temp.adminUrl"></el-input>
        </el-form-item>

        <el-form-item label="排序号">
          <el-input v-model="temp.sort"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select class="filter-item" filterable v-model="temp.menuId" placeholder="请选择">
            <el-option v-for="item in  parentMenuList" :key="item.menuId" :label="item.menuName" :value="item.menuId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站图片">
          <el-upload action="http://47.75.167.230:8123/admin/content/upload"
                     name="image"
                     drag :multiple="false"
                     :on-success = "uploadOk"
                     ref="indexImage">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片1">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadDetailImage1"
                     name="detailImage1" drag :multiple="false"
                     :on-success = "uploadDetail1Ok"
                     list-type="picture" ref="detailImage1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片2">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadDetailImage2"
                     list-type="picture"
                     name="detailImage2"
                     drag :multiple="false"
                     :on-success = "uploadDetail2Ok"
                     ref="detailImage2">

            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片3">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadDetailImage3"  list-type="picture"
                     name="detailImage3"
                     ref="detailImage3"
                     drag :multiple="false" :on-success = "uploadDetail3Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片4">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadDetailImage4"  list-type="picture"
                     name="detailImage4"
                     ref="detailImage4"
                     drag :multiple="false"
                     :on-success = "uploadDetail4Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片5">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadDetailImage5"  list-type="picture"
                     name="detailImage5"
                     drag :multiple="false"
                     :on-success = "uploadDetail5Ok"
                     ref="detailImage5">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="功能图片1">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadFuncImage1"  list-type="picture"
                     name="funcImage1"
                     ref="funcImage1"
                     drag :multiple="false"
                     :on-success = "uploadFunc1Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="功能图片2">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadFuncImage2"  list-type="picture"
                     name="funcImage2"
                     ref="funcImage2"
                     drag :multiple="false" :on-success = "uploadFunc2Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="功能图片3">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadFuncImage3"  list-type="picture"
                     name="funcImage3"
                     ref="funcImage3"
                     drag :multiple="false" :on-success = "uploadFunc3Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="功能图片4">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadFuncImage4"  list-type="picture"
                     name="funcImage4"
                     ref="funcImage4"
                     drag :multiple="false"
                     :on-success = "uploadFunc4Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="功能图片5">
          <el-upload action="http://47.75.167.230:8123/admin/content/uploadFuncImage5"  list-type="picture"
                     name="funcImage5"
                     ref="funcImage5"
                     drag :multiple="false" :on-success = "uploadFunc5Ok">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { queryContentList, queryContentCount, insertContent, updateContent, deleteContent } from '@/api/content'
  import { queryMenuListForContent } from '@/api/menu'
  import waves from '@/directive/waves'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 50,
          name: undefined
        },
        parentMenuList: [],
        temp: {
          id: undefined,
          name: '',
          parentId: -1,
          sort: 0,
          url: '',
          adminUrl: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        downloadLoading: false
      }
    },
    filters: {},
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryContentCount(this.listQuery).then(response => {
          this.total = response.data.data
        })
        queryContentList(this.listQuery).then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          menuId: '',
          sort: 0,
          parentId: '',
          detailImage1: '',
          detailImage2: '',
          detailImage3: '',
          detailImage4: '',
          detailImage5: '',
          funcImage1: '',
          funcImage2: '',
          funcImage3: '',
          funcImage4: '',
          funcImage5: '',
          url: '',
          adminUrl: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        queryMenuListForContent().then(response => {
          this.parentMenuList = response.data.data
        })
      },
      createData() {
        insertContent(this.temp).then(() => {
          this.handleFilter()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      uploadOk(response, file, fileList) {
        if (response.code === 200) {
          this.temp.image = response.data
        }
      },
      uploadDetail1Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.detailImage1 = response.data
        }
      },
      uploadDetail2Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.detailImage2 = response.data
        }
      },
      uploadDetail3Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.detailImage3 = response.data
        }
      },
      uploadDetail4Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.detailImage4 = response.data
        }
      },
      uploadDetail5Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.detailImage5 = response.data
        }
      },
      uploadFunc1Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.funcImage1 = response.data
        }
      },
      uploadFunc2Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.funcImage2 = response.data
        }
      },
      uploadFunc3Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.funcImage3 = response.data
        }
      },
      uploadFunc4Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.funcImage4 = response.data
        }
      },
      uploadFunc5Ok(response, file, fileList) {
        if (response.code === 200) {
          this.temp.funcImage5 = response.data
        }
      },
      handleUpdate(row) {
        queryMenuListForContent().then(response => {
          this.parentMenuList = response.data.data
        })
        this.temp = {
          id: row.id,
          name: row.name,
          url: row.url,
          sort: row.sort,
          menuId: row.menuId,
          adminUrl: row.adminUrl
        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      handleDelete(id) {
        deleteContent(id).then(() => {
          this.handleFilter()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      onClose() {
        console.log('关闭对话框')
      },
      updateData() {
      }
    }
  }
</script>
