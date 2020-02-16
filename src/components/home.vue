<template>
  <div class="home">
    <div class="home-header">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="home-header-box">
            <div class="home-header-box-up">
              <span class="el-icon-s-custom"></span>
            </div>
            <div class="home-header-box-dowm">用户</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="home-header-box">
            <div class="home-header-box-up">
              <span class="el-icon-picture-outline"></span>
            </div>
            <div class="home-header-box-dowm">图片集</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="home-header-box">
            <div class="home-header-box-up">
              <span class="el-icon-upload"></span>
            </div>
            <div class="home-header-box-dowm">上传图片</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="home-header-box">
            <div class="home-header-box-up">
              <span class="el-icon-s-operation"></span>
            </div>
            <div class="home-header-box-dowm">设置</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-moddle">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="home-moddle-box">
            <el-card class="box-card" style="width:100%;height:400px">
              <div slot="header" class="clearfix">
                <span>本周访问量</span>
              </div>
              <div id="id" style="width:100%;height:300px"></div>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="home-moddle-box">
            <el-card class="box-card" style="width:100%;height:400px;">
              <div slot="header" class="clearfix">
                <span>最近登录</span>
              </div>
              <el-table :data="tableData" style="width: 100%" max-height="340">
                <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>

                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small"
                    >移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scope>
.home {
  margin:10px;
  .home-header {
    height: 100px;
    .el-row {
      height: 100px;
      .el-col {
        height: 100px;
        margin-bottom: 10px;
        overflow: hidden;
        .home-header-box {
          background: white;
          height: 100px;
          height: 100%;
          padding: 15px;
          text-align: center;
          .home-header-box-up {
            span {
              font-size: 60px;
              color: #009688;
            }
          }
        }
      }
      .el-col:hover {
        cursor: pointer;
        color: #7f8c8d;
      }
      .el-col:hover .home-header-box .home-header-box-up span {
        cursor: pointer;
        color: #16a085;
      }
    }
  }
  .home-moddle {
    .home-moddle-box {
      height: 400px;
      margin-bottom: 10px;
    }
  }
}
</style>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("id"));
    window.addEventListener('resize',()=>{
        myChart.resize();
    })
    // 绘制图表
    myChart.setOption({
      tooltip: {},
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            lineStyle:{
                color: '#009688'
            },
            areaStyle: {
                color: '#009688'
            },
            itemStyle:{
                color: '#009688'
            }
        }
      ]
    });
  }
};
</script>