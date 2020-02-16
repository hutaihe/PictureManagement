<template>
  <div id="rolelist">
    <div class="rolelist-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>用户</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="rolelist-content">
      <div class="rolelist-content-lookup">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="input-group">
              <label class="input-group-label">角色</label>
              <div class="input-group-input">
                <el-select v-model="value" placeholder="请选择" class="input-group-select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button type="primary" class="input-group-button el-icon-search"></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="rolelist-content-box">
        <el-row>
          <el-button type="primary" @click="addDialog = !addDialog">添加</el-button>
          <el-button type="primary">删除</el-button>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:15px"
          height="320"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" width="40"></el-table-column>
          <el-table-column prop="id" label="ID" width="110"></el-table-column>
          <el-table-column prop="username" label="角色名" width="150"></el-table-column>
          <el-table-column prop="account" label="拥有权限" width="330"></el-table-column>
          <el-table-column prop="phone" label="具体描述" width="330"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template >
              <el-button type="text" size="small" >编辑</el-button>
              <el-button  type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加的弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="addDialog"
      width="30%"
      custom-class="ddialog"
      :before-close="addhandleClose"
    >
      <div class="dialog-header">添加管理员</div>
      <div class="dialog-content">
        <div class="dialog-input-group" v-show="isaddshow">
          <label class="dialog-input-group-label">角色名</label>
          <el-input class="dialog-input-group-input" placeholder="请输入角色名，长度不超过25字符"></el-input>
        </div>
        <div class="dialog-input-group" v-show="isaddshow">
          <label class="dialog-input-group-label">权限</label>
          <div class="dialog-tree">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[]"
              :default-checked-keys="[]"
              :props="defaultProps"
            ></el-tree>
          </div>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <label class="dialog-input-group-label">拥有权限</label>
          <el-input type="textarea" :rows="4" placeholder="请输入拥有的权限，长度不超过100个字符"></el-input>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <label class="dialog-input-group-label">具体描述</label>
          <el-input type="textarea" :rows="4" placeholder="请输入具体描述，长度不超过100个字符"></el-input>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <el-button plain class="dialog-input-group-submitbtn">提 交</el-button>
        </div>
      </div>
      <div class="dialog-foot">
        <el-button round class="dialog-foot-cancelbtn" @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          round
          class="dialog-foot-nextbtn"
          @click="isaddshow = !isaddshow"
          v-if="isaddshow"
        >下 一 步</el-button>
        <el-button
          type="primary"
          round
          class="dialog-foot-nextbtn"
          @click="isaddshow = !isaddshow"
          v-else
        >上 一 步</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
#rolelist {
  .rolelist-header {
    background: white;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ecf0f1;
    border-top: 1px solid #ecf0f1;
    .el-breadcrumb {
      line-height: 50px;
    }
  }
  .rolelist-content {
    padding: 15px;
    .rolelist-content-lookup {
      background: white;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #ecf0f1;
      padding: 15px;
      .el-col {
        margin-bottom: 15px;
        .input-group {
          overflow: hidden;
          line-height: 40px;
          padding-right: 10px;
          .input-group-label {
            float: left;
            margin-right: 2%;
          }

          .input-group-select {
            width: 65%;
            margin-right: 2%;
          }
          .input-group-button {
            width: 20%;
            padding: 0px;
            float: right;
            height: 40px;
          }
        }
      }
    }
    .rolelist-content-box {
      background: white;
      padding: 15px;
      .el-table__row {
        height: 10px;
      }
      .block {
        margin-top: 20px;
      }
    }
  }
}
.el-dialog__header {
  display: none;
}
.el-dialog__body {
  padding: 0px;
}

.dialog-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}
.dialog-content {
  min-height: 320px;
  background: #f5f5ff;
  padding: 20px;
  .dialog-tree {
    padding: 15px;
    background: white;
  }
  .el-input__inner {
    border-radius: 50px;
    height: 40px;
  }
  .el-textarea__inner {
    color: #666;
  }
  .dialog-input-group {
    width: 100%;
    margin-bottom: 10px;
    .dialog-input-group-label {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
    .dialog-input-group-input {
      border-radius: 50px !important;
    }
    .dialog-input-group-sex {
      margin-right: 20px;
    }
    .dialog-input-group-submitbtn {
      float: right;
    }
    .dialog-input-group-select {
      width: 35%;
    }
  }
}
.dialog-foot {
  height: 50px;
  padding: 10px;
  line-height: 50px;
  .dialog-foot-cancelbtn {
    padding: 10 15px;
    background: #7f8c8d;
    color: white;
  }
  .dialog-foot-nextbtn {
    padding: 10 15px;
    float: right;
  }
}
@media screen and(max-width:988px) {
  .ddialog {
    width: 50% !important;
  }
}
@media screen and(max-width:768px) {
  .ddialog {
    width: 90% !important;
  }
  .el-message-box {
    width: 90%;
  }
}
</style>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "超级管理员"
        },
        {
          value: "2",
          label: "管理员"
        },
        {
          value: "3",
          label: "普通用户"
        },
        {
          value: "4",
          label: "开发人员"
        }
      ],
      value: "",
      tableData: [
        {
          id: "15246502",
          username: "王小虎",
          account: "13622750298",
          phone: "13622750298",
          email: "13622750298@qq.com",
          imageUrl:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          sex: "男",
          describe: "我是一个靓仔",
          rolename: "管理员"
        },
        {
          id: "15246502",
          username: "王小虎",
          account: "13622750298",
          phone: "13622750298",
          email: "13622750298@qq.com",
          imageUrl:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          sex: "男",
          describe: "我是一个靓仔",
          rolename: "管理员"
        },
        {
          id: "15246502",
          username: "王小虎",
          account: "13622750298",
          phone: "13622750298",
          email: "13622750298@qq.com",
          imageUrl:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          sex: "男",
          describe: "我是一个靓仔",
          rolename: "管理员"
        },
        {
          id: "15246502",
          username: "王小虎",
          account: "13622750298",
          phone: "13622750298",
          email: "13622750298@qq.com",
          imageUrl:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          sex: "男",
          describe: "我是一个靓仔",
          rolename: "管理员"
        },
        {
          id: "15246502",
          username: "王小虎",
          phone: "13622750298",
          account: "13622750298",
          email: "13622750298@qq.com",
          imageUrl:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          sex: "男",
          describe: "我是一个靓仔",
          rolename: "管理员"
        },
        {
          id: "15246502",
          username: "王小虎",
          account: "13622750298",
          phone: "13622750298",
          email: "13622750298@qq.com",
          imageUrl:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          sex: "男",
          describe: "我是一个靓仔",
          rolename: "管理员"
        }
      ],
      rolelist: [],
      addDialog: false,
      isaddshow: true,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    //选择角色
    handleSelectionChange(val) {
      this.userlist = val;
    },
    addhandleClose(done) {
      done();
    },
    //取消
    cancel() {
      this.addDialog = this.editDialog = false;
    }
  }
};
</script>