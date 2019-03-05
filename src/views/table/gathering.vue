<template>
  <div>
    <br>
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称">
        <el-input v-model="searchMap.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-date-picker type="date" placeholder="选择开始日期" v- model="searchMap.starttime_1"></el-date-picker>
        <el-date-picker type="date" placeholder="选择截止日期" v- model="searchMap.starttime_2"></el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="danger" @click="findById('')">新增</el-button>
    </el-form>
    <br>
    <!-- 表格内容 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="id" label="活动ID" style="width=14%"></el-table-column>
      <el-table-column prop="name" label="活动名称" style="width=14%"></el-table-column>
      <el-table-column prop="sponsor" label="主办方" style="width=14%"></el-table-column>
      <el-table-column prop="address" label="活动地址" style="width=14%"></el-table-column>
      <el-table-column prop="starttime" label="开始日期" style="width=14%"></el-table-column>
      <el-table-column prop="endtime" label="结束日期" style="width=14%"></el-table-column>
      <el-table-column fixed="right" label="操作" style="width=14%">
        <template slot-scope="scope">
          <el-button @click="findById(scope.row.id)" type="text" size="small">修改</el-button>
          <el-button @click="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="page"
      :page-sizes="[5,10,20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 弹出框 -->
    <el-dialog title="活动新增" :visible.sync="dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="pojo.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="基本地址">
          <el-input v-model="pojo.address" placeholder="基本地址"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="pojo.starttime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="pojo.starttime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止">
          <el-date-picker v-model="pojo.starttime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input type="textarea" v-model="pojo.detail" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="选择城市">
          <el-select v-model="pojo.city" placeholder="请选择">
            <el-option v-for="item in citylist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可见">
          <el-switch v-model="pojo.status" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="danger" @click="dialogVisible=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import gatheringApi from "@/api/gathering";
import cityApi from "@/api/city";
export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 10,
      searchMap: {},
      dialogVisible: false,
      pojo: {},
      citylist: [],
      id: ""
    };
  },
  created() {
    this.fetchData();
    this.getCityList();
  },
  methods: {
    fetchData() {
      gatheringApi.search(this.page, this.size, this.searchMap).then(res => {
        this.list = res.data.rows;
        this.total = res.data.total;
      });
    },
    getCityList() {
      cityApi.getCityList().then(res => {
        this.citylist = res.data;
      });
    },
    save() {
      // if (this.id != "") {
      //   gatheringApi.update(this.id, this.pojo).then(res => {
      //     if (res.flag) {
      //       this.fetchData();
      //     }
      //   });
      // } else {
      //   gatheringApi.save(this.pojo).then(res => {
      //     if (res.flag) {
      //       this.$message({
      //         message: res.message,
      //         type: "success"
      //       });
      //       this.fetchData();
      //     }
      //   });
      // }
      gatheringApi.update(this.id, this.pojo).then(res => {
        if (res.flag) {
          this.fetchData();
        }
        this.$message({
          message: res.message,
          type: res.flag ? "success" : "error"
        });
      });
      this.dialogVisible = false;
    },
    findById(id) {
      this.dialogVisible = true;
      this.id = id;
      console.log(this.id);
      if (id != "") {
        gatheringApi.findById(id).then(res => {
          if (res.flag) {
            this.pojo = res.data;
          }
        });
      } else {
        this.pojo = {};
      }
    },
    deleteById(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          gatheringApi.deleteById(id).then(res=>{
            if(res.flag){
              this.$message({
                message:res.message,
                type: 'success'
              })
              this.fetchData()
            }
          })
        })
    }
  }
};
</script>