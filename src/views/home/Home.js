import React, { Component } from "react";
import echarts from "echarts";
import axios from "axios";
import _ from "lodash";
export default class Home extends Component {
  // 基于准备好的dom，初始化echarts实例
  componentDidMount() {
    axios.get("http://localhost:5000/articles").then((res) => {
      this.group = _.groupBy(res.data, "author");

      // 1初始化.
      this.myChart = echarts.init(this.refs.mychart);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
        },
        tooltip: {},
        legend: {
          data: ["文章数"],
        },
        xAxis: {
          data: Object.keys(this.group),
        },
        yAxis: {
          minInterval: 1,
        },
        series: [
          {
            name: "文章数",
            type: "bar",
            data: Object.values(this.group).map((item) => item.length),
          },
        ],
      };

      //3  还用配置信息
      this.myChart.setOption(option);
      window.onresize = () => {
        this.myChart.resize();
      };
    });
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <div
          ref="mychart"
          style={{ width: "100%", height: "100%", margin: "50px" }}
        ></div>
        {/* <div ref="mychartone" style={{width: "300px",height:'300px'}}></div> */}
      </div>
    );
  }
}
