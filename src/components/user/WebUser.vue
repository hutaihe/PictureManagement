<template>
  <div class="webuser">
    <div class="webuser-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>用户</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="webuser-content">
      <div class="webuser-content-lookup">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="input-group">
              <label class="input-group-label">ID</label>
              <el-input class="input-group-input" v-model="select.id" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="input-group">
              <label class="input-group-label">账号</label>
              <el-input class="input-group-input" v-model="select.account" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="input-group">
              <label class="input-group-label">邮箱</label>
              <el-input class="input-group-input" v-model="select.email" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class="input-group">
              <label class="input-group-label">性别</label>
              <div class="input-group-input">
                <el-select v-model="select.sex" placeholder="请选择" class="input-group-select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button
                  type="primary"
                  class="input-group-button el-icon-search"
                  @click="selectUser"
                ></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="webuser-content-box">
        <el-row>
          <el-button type="primary" @click="addDialog = true ;isaddshow = true">添加</el-button>
          <el-button type="primary" @click="deleteUsers">删除</el-button>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:15px"
          height="270"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" width="40"></el-table-column>
          <el-table-column prop="id" label="ID" width="110"></el-table-column>
          <el-table-column prop="username" label="用户名" width="120"></el-table-column>
          <el-table-column prop="account" label="账号" width="130"></el-table-column>
          <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="sex" label="性别" width="50"></el-table-column>
          <el-table-column prop="imageurl" label="头像" width="300" v-if="false"></el-table-column>
          <el-table-column prop="describes" label="描述" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button @click="deleteuser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :small="isMobile"
            :current-page="pageno"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :layout="!isMobile ? 'total, prev, pager, next, jumper' : 'prev, pager, next'"
            :total="totalsize"
          ></el-pagination>
        </div>
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
      <div class="dialog-header">添加用户</div>
      <div class="dialog-content">
        <div class="dialog-input-group" v-show="isaddshow">
          <label class="dialog-input-group-label">用户名</label>
          <el-input
            class="dialog-input-group-input"
            v-model="form.username"
            placeholder="请输入用户名，长度不超过25字符"
          ></el-input>
        </div>
        <div class="dialog-input-group" v-show="isaddshow">
          <label class="dialog-input-group-label">账号</label>
          <el-input
            class="dialog-input-group-input"
            v-model="form.account"
            placeholder="请输入账户，长度6~16个字符"
          ></el-input>
        </div>
        <div class="dialog-input-group" v-show="isaddshow">
          <label class="dialog-input-group-label">手机号码</label>
          <el-input class="dialog-input-group-input" v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </div>
        <div class="dialog-input-group" v-show="isaddshow">
          <label class="dialog-input-group-label">邮箱</label>
          <el-input class="dialog-input-group-input" v-model="form.email" placeholder="请输入邮箱"></el-input>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <label class="dialog-input-group-label">头像</label>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:10010/upload/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageurl" :src="form.imageurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <label class="dialog-input-group-sex">性别</label>
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <label class="dialog-input-group-label">描述</label>
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.describe"
            placeholder="请输入描述内容，长度不超过100个字符"
          ></el-input>
        </div>
        <div class="dialog-input-group" v-show="!isaddshow">
          <el-button plain class="dialog-input-group-submitbtn" @click="submit(1)">提 交</el-button>
        </div>
      </div>
      <div class="dialog-foot">
        <el-button round class="dialog-foot-cancelbtn" @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          round
          class="dialog-foot-nextbtn"
          @click="next"
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
    <!-- 修改的弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialog"
      width="30%"
      custom-class="ddialog"
      :before-close="edithandleClose"
    >
      <div class="dialog-header">编辑用户</div>
      <div class="dialog-content">
        <div class="dialog-input-group" v-show="iseditshow">
          <label class="dialog-input-group-label">用户名</label>
          <el-input
            class="dialog-input-group-input"
            v-model="form.username"
            placeholder="请输入用户名，长度不超过25字符"
          ></el-input>
        </div>
        <div class="dialog-input-group" v-show="iseditshow">
          <label class="dialog-input-group-label">账号</label>
          <el-input
            class="dialog-input-group-input"
            v-model="form.account"
            placeholder="请输入账户，长度6~16个字符"
          ></el-input>
        </div>
        <div class="dialog-input-group" v-show="iseditshow">
          <label class="dialog-input-group-label">手机号码</label>
          <el-input class="dialog-input-group-input" v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </div>
        <div class="dialog-input-group" v-show="iseditshow">
          <label class="dialog-input-group-label">邮箱</label>
          <el-input class="dialog-input-group-input" v-model="form.email" placeholder="请输入邮箱"></el-input>
        </div>
        <div class="dialog-input-group" v-show="!iseditshow">
          <label class="dialog-input-group-label">头像</label>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageurl" :src="form.imageurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="dialog-input-group" v-show="!iseditshow">
          <label class="dialog-input-group-sex">性别</label>
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </div>
        <div class="dialog-input-group" v-show="!iseditshow">
          <label class="dialog-input-group-label">描述</label>
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.describe"
            placeholder="请输入描述内容，长度不超过100个字符"
          ></el-input>
        </div>
        <div class="dialog-input-group" v-show="!iseditshow">
          <el-button plain class="dialog-input-group-submitbtn" @click="submit(2)">提 交</el-button>
        </div>
      </div>
      <div class="dialog-foot">
        <el-button round class="dialog-foot-cancelbtn" @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          round
          class="dialog-foot-nextbtn"
          @click="next"
          v-if="iseditshow"
        >下 一 步</el-button>
        <el-button
          type="primary"
          round
          class="dialog-foot-nextbtn"
          @click="iseditshow = !iseditshow"
          v-else
        >上 一 步</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scope>
.webuser {
  background: white;
  border-top: 1px solid #ecf0f1;
  .webuser-header {
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ecf0f1;
    .el-breadcrumb {
      line-height: 50px;
    }
  }
  .webuser-content {
    padding: 10px;
    .webuser-content-lookup {
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
          }
          .input-group-input {
            width: 80%;
            float: right;
          }
          .input-group-select {
            width: 75%;
            margin-right: 5%;
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
    .webuser-content-box {
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
  height: 300px;
  background: #f5f5ff;
  padding: 20px;
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
// 用户头像
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
@media screen and(max-width:988px) {
  .block {
    text-align: center;
  }
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
import common from "@/js/common.js";
export default {
  data() {
    return {
      form: {
        id: null,
        username: null,
        account: null,
        phone: null,
        email: null,
        imageurl: null,
        sex: "1",
        describe: null
      },
      select: {
        id: null,
        account: null,
        sex: "3",
        phone: null,
        email: null
      },
      pageno: 1,
      pagesize: 5,
      totalsize: 0,
      addDialog: false, //控制添加的弹出框
      isaddshow: true, //控制弹出框的上下页
      editDialog: false, //控制修改的弹出框
      iseditshow: true, //控制修改弹出框的上下页
      isMobile: window.innerWidth <= 988, //监听窗口的大小
      userlist: [], // 多选用户
      imageurl: "",
      radio: "1",
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        },
        {
          value: "3",
          label: "不限"
        }
      ],
      tableData: [],
      value: ""
    };
  },
  created() {
    this.getUserByPage({
      pageno: 1,
      pagesize: 5
    });
  },
  methods: {
    //页数改变时触发
    handleCurrentChange(val) {
      console.log(val);
      let pageParams = {
        pageno: val,
        pagesize: 5
      };
      this.getUserByPage(pageParams);
    },
    addhandleClose(done) {
      this.isaddshow = true;
      done();
    },
    edithandleClose(done) {
      this.iseditshow = true;
      this.form.username = this.form.phone = this.form.email = this.form.account = this.form.imageurl = this.form.describe = null;
      this.form.sex = "1";
      done();
    },
    //分页查询用户
    getUserByPage(pageParams) {
      this.$axios
        .post("user/webuser/page", pageParams)
        .then(res => {
          if (res.code == 200) {
            this.totalsize = res.data.totalsize;
            this.tableData = res.data.list;
            this.pageno = res.data.pageno;
          } else {
            common.warning(res.message);
            this.tableData = [];
          }
        })
        .catch(res => {
          common.warning("系统错误！");
        });
    },
    //查询用户
    selectUser() {
      if (isNaN(this.select.id)) {
        common.warning("ID不能为字符串！");
        return;
      }
      if (
        this.select.id == null &&
        this.select.account == null &&
        this.select.email == null
      )
        common.tips("请输入搜索条件！");
      let pageParmas = {
        pageno: 1,
        pagesize: 5,
        id: this.select.id,
        account: this.select.account,
        email: this.select.email,
        sex:
          this.select.sex == "3" ? null : this.select.sex == "1" ? "男" : "女"
      };
      console.log();
      this.getUserByPage(pageParmas);
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.form.imageurl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //选择用户
    handleSelectionChange(val) {
      this.userlist = val;
    },
    //添加用户--下一步
    next() {
      if (this.form.username == null || this.form.username == "") {
        common.warning("请输入用户名！");
        return;
      } else {
        if (this.form.username.length > 25) {
          common.warning("用户名过长，请重新输入！");
          return;
        }
      }
      if (this.form.account == null || this.form.account == "") {
        common.warning("请输入账号！");
        return;
      } else {
        if (this.form.account.length > 25) {
          common.warning("用户名不能过长，请重新输入！");
          return;
        }
      }
      if (this.form.phone == null || this.form.phone == "") {
        common.warning("请输入手机号码！");
        return;
      } else {
        if (!common.checkPhone(this.form.phone)) {
          common.warning("手机格式不正确，请重新输入！");
          return;
        }
      }
      if (this.form.email == null || this.form.email == "") {
        common.warning("请输入邮箱！");
        return;
      } else {
        if (!common.checkEmail(this.form.email)) {
          common.warning("邮箱格式不正确，请重新输入！");
          return;
        }
      }
      this.isaddshow = !this.isaddshow;
      this.iseditshow = !this.iseditshow;
    },
    //提交
    submit(num) {
      if (this.form.imageurl == null) {
        common.warning("请上传一张图片作为头像！");
        return;
      }
      if (this.form.describe == null) {
        common.warning("请输入一段话来描述自己！");
        return;
      } else {
        if (this.form.describe.length > 100) {
          common.warning("输入文字过多，请重新输入！");
          return;
        }
      }
      const webuser = {
        id: null,
        username: this.form.username,
        account: this.form.account,
        phone: this.form.phone,
        email: this.form.email,
        imageurl: this.form.imageurl,
        sex: this.form.sex == "1" ? "男" : "女",
        describes: this.form.describe
      };
      if (num == 1) {
        
        this.$axios.post("user/webuser", webuser).then(res => {
          if (res.code == 200) {
            common.success("保存用户成功！");
            this.isaddshow = true;
            this.form.username = this.form.phone = this.form.email = this.form.account = this.form.imageurl = this.form.describe = null;
            this.form.sex = "1";
            this.getUserByPage({ pageno: 1, pagesize: 5 });

          } else {
            console.log("1");
            common.error("账户名已经存在！");}
        });
      } else {
        webuser.id = this.form.id;
        this.$axios.put("user/webuser", webuser).then(res => {
          if (res.code == 200) {
            common.success("修改用户成功！");
            this.getUserByPage({ pageno: 1, pagesize: 5 });
          } else{ console.log("1");common.error("账户名已经存在！");}
        });
      }
    },
    //取消
    cancel() {
      this.form.username = this.form.phone = this.form.email = this.form.account = this.form.imageurl = this.form.describe = null;
      this.form.sex = "1";
      this.addDialog = this.editDialog = false;
      this.isaddshow = this.iseditshow = true;
    },
    //编辑
    edit(row) {
      (this.form.id = row.id), (this.form.username = row.username);
      this.form.account = row.account;
      this.form.phone = row.phone;
      this.form.email = row.email;
      this.form.sex = row.sex == "男" ? "1" : "2";
      this.form.imageurl = row.imageurl;
      this.form.describe = row.describes;
      this.editDialog = true;
    },
    //批量删除用户
    deleteUsers() {
      let userlist = this.userlist;
      if (userlist.length <= 0) {
        common.tips("请选择要删除的用户！");
      } else {
        this.$confirm(
          "此操作将永久删除【" + userlist.length + "】条数据, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            let ids = [];
            let userlist= this.userlist;
           userlist.forEach(id => {
              ids.push(id.id)
           })
            //删除用户
            this.$axios
              .deleteIds("user/webuser/ids", ids)
              .then(res => {
                if (res.code == 200) {
                  common.success("批量删除成功！");
                  this.getUserByPage({ pageno: 1, pagesize: 5 });
                } else {
                  common.error("删除失败！");
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //删除一个用户
    deleteuser(row) {
      this.$confirm(
        "此操作将永久删除【" + row.username + "】, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios.delete("user/webuser/" + row.id).then(res => {
            if (res.code == 200) {
              common.success("删除成功!");
              this.getUserByPage({ pageno: 1, pagesize: 5 });
            } else {
              common.error("删除失败!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 988;
    });
  }
};
</script>