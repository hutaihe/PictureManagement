<template>
  <div id="app">
    <div class="left-menu" :class="{'collection':toggle,'upleft-menu':toggle}">
      <div class="header-title">
        <span v-if="!toggle||isMobile">layuiAdmin Pro</span>
        <span v-else class="el-icon-star-off"></span>
      </div>
      <ul class="navs">
        <li class="nav" v-for="(nav,index) in navList" :key="nav.text+index">
          <a @click="toggleNavChild($event)">
            <span class="el-icon-user icon"></span>
            <span class="aniword">主页</span>
            <span class="el-icon-caret-bottom aniword" style="margin-left:80px"></span>
          </a>
          <ul class="nav-childs">
            <li class="nav-child" v-for="(v,i) in nav.child" :key="v+i">主页一</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="rigth-box" :class="{'uprigth-box':toggle}">
      <div class="rigth-header">
        <div class="rigth-header-left">
          <ul class="rigth-header-left-ul">
            <li class="rigth-header-left-li1">
              <span class="el-icon-s-fold switchLeftMenu" @click="switchLeftMenu"></span>
            </li>
            <li class="rigth-header-left-li2">
              <el-input class="rigth-header-input" placeholder="请输入内容"></el-input>
            </li>
          </ul>
        </div>
        <div class="rigth-header-rigth">
          <ul class="rigth-header-rigth-ul">
            <li class="rigth-header-rigth-li">
              <span class="el-icon-star-off"></span>
            </li>
            <li class="rigth-header-rigth-li">
              <span class="el-icon-bell"></span>
            </li>
            <li class="rigth-header-rigth-li selectd" @click="isSelected = !isSelected">
              <span>
                胡钛河
                <i class="el-icon-caret-bottom"></i>
              </span>
              <ul class="rigth-header-rigth-selected" v-show="isSelected">
                <li class="rigth-header-rigth-selected-li">基本信息</li>
                <li class="rigth-header-rigth-selected-li">修改密码</li>
                <li class="rigth-header-rigth-selected-li">退出</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="rigth-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" >
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
  font-family: "Helvetica Neue";
}
body,
html {
  height: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
  color: #666;
}
#app {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .left-menu {
    width: 200px;
    height: 100%;
    color: rgba(255, 255, 255, 0.7);
    background-color: #20222a;
    white-space: nowrap;
    overflow: hidden;
    transition: width 0.4s;
    font-size: 15px;
    .header-title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #ecf0f1;
    }
    .navs {
      .nav {
        a {
          color: rgba(255, 255, 255, 0.7);
          list-style: none;
          display: block;
          cursor: pointer;
          span {
            height: 50px;
            line-height: 50px;
          }
          .aniword {
            transition: all 0.4s;
          }
          .icon {
            border-left: 5px solid #20222a;
            padding: 0px 15px;
            padding-right: 20px;
            transition: all 0.4s;
          }
        }
        a:hover span {
          color: white;
        }
        a:hover .icon {
          border-left: 5px solid #5fb878;
          color: white;
        }
        .nav-childs {
          display: none;
          .nav-child {
            height: 40px;
            font-size: 15px;
            line-height: 40px;
            padding-left: 55px;
          }
          .nav-child:hover {
            color: white;
            cursor: pointer;
          }
        }
      }
    }
  }
  .collection {
    width: 55px;
    .aniword {
      opacity: 0;
    }
  }
  .rigth-box {
    overflow: auto;
    flex: 1;
    height: 100%;
    .rigth-header {
      height: 50px;
      background: white;
      display: flex;
      justify-content: space-between;
      .rigth-header-left {
        height: 50px;
        width: 300px;
        line-height: 50px;
        li {
          border-top: 2px solid white;
          transition: all 0.2s;
          margin: 0 15px;
        }
        li:hover {
          border-top: 2px solid black;
        }
        .rigth-header-left-ul {
          height: 50px;
          line-height: 50px;
          display: flex;
          justify-content: space-between;
          .rigth-header-left-li1 {
            width: 50px;
            .switchLeftMenu {
              height: 50px;
              line-height: 50px;
              font-size: 24px;
              padding: 0 15px;
            }
          }
          .rigth-header-left-li2 {
            flex: 1;
            .el-input__inner {
              border: 0px !important;
              width: 100%;
              padding: 0px;
            }
          }
        }
      }
      .rigth-header-rigth {
        flex: 1;
        height: 50px;
        .rigth-header-rigth-ul {
          
          height: 50px;
          line-height: 50px;
          display: flex;
          justify-content: flex-end;
          margin: 0 30px;
        }
        .rigth-header-rigth-li {
          min-width: 40px;
          border-top: 2px solid white;
          padding: 0px 8px;
          text-align: center;
          font-size: 15px;
          white-space: nowrap;
          cursor: pointer;
        }
        .rigth-header-rigth-li:hover {
          transition: all 0.2s;
          border-top: 2px solid black;
        }
        .selectd {
          position: relative;
          transition: all 0.4s;
          .rigth-header-rigth-selected {
            position: absolute;
            background: white;
            z-index: 1;
            width: 100px;
            top: 60px;
            left: -20px;
            border: 1px solid #d2d2d2;
            .rigth-header-rigth-selected-li {
              font-size: 15px;
            }
            .rigth-header-rigth-selected-li:hover {
              background: rgba(194, 178, 178, 0.7);
            }
          }
        }
      }
    }
    // .rigth-content{
    //   padding: 10px;
    // }
  }
}
@media screen and (max-width: 988px) {
  #app {
    width: 100%;
    height: 100%;
  }
  .left-menu {
    position: fixed;
    z-index: 1;
    left: -200px;
    width: 200px;
    height: 100%;
    top: 0px;
    transition: left 0.4s !important;
  }
  .rigth-box {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    transition: left 0.4s;
  }
  .upleft-menu {
    left: 0px;
  }
  .uprigth-box {
    left: 200px;
  }
  .collection {
    width: 200px !important;
    .aniword {
      opacity: 1 !important;
    }
  }
}
@media screen and(max-width:768px) {
  .rigth-header-left {
    width: 100px !important;
  }
  .rigth-header-left-li2 {
    display: none;
  }
}
</style>
<script>
export default {
  data() {
    return {
      toggle: false,
      navList: eval(`
        (function(){
            let arr = [];
            for(let i=0;i<5;i++) arr.push({text:'主页',child:'主页一 '.repeat(5).trim().split(' ')});
            return arr;
        })()
      `),
      activeUlEvent: null,
      isMobile: window.innerWidth <= 988,
      isSelected: false
    };
  },
  created(){
   // this.getUser()
  },
  mounted() {
    window.addEventListener("resize", () => {
      let old = this.isMobile;
      this.isMobile = window.innerWidth <= 988;
      // if (this.isMobile != old) {
      //   this.toggle = !this.toggle;
      // }
    });
  },
  methods: {
    dropdown(e, open = null) {
      //点击下拉列表，如果为null，则是收起整个侧边栏
      let box = e ? e.currentTarget : null;
      //引入jq
      let $ = this.jQuery;
      //获取当前点击对象的兄弟元素
      let $ul = e ? $(box).siblings(".nav-childs") : $(".nav .nav-childs");
      //获取到下拉列表的标签
      let $ele = $ul.siblings("a").find("span:nth-last-of-type(1)");
      if (open === null) open = $ele.hasClass("el-icon-caret-bottom");
      //如果当前状态是收起就张开，否则就收起
      if (open) {
        let activeUlEvent = this.activeUlEvent;
        if (activeUlEvent && box != activeUlEvent.currentTarget)
          this.dropdown(null, false);
        //记录张开的是哪个ul
        this.activeUlEvent = { activeUlEvent: box };
        $ele.removeClass("el-icon-caret-bottom");
        $ele.addClass("el-icon-caret-top");
        $ul.stop(true, false).slideDown(400);
      } else {
        $ele.removeClass("el-icon-caret-top");
        $ele.addClass("el-icon-caret-bottom");
        $ul.stop(true, false).slideUp(400);
      }
    },
    toggleNavChild($event) {
      this.dropdown($event);
      if (this.toggle && !this.isMobile) this.toggle = !this.toggle;
    },
    switchLeftMenu() {
      this.toggle = !this.toggle;
      this.dropdown(null, false);
    },
    // getUser(){
    //   this.$axios.fetch('user/adminuser/1').then(res =>{
    //      console.log(res)
    //    })
    // }
  }
};
</script>