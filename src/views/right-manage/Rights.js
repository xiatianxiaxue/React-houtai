import React, { Component } from 'react'
import { Table,Tag } from 'antd';
import axios from 'axios';
export default class Rights extends Component {
    state={
           //  数据元
        data:[
            // {
            //     key: '1',
            //     title: '文章列表',
            //     grade: 1,
            //   },
            //   {
            //     key: '2',
            //     title: '文章列表',
            //     grade: 18,
            //   },
        ]
    }

    componentDidMount(){
        // 请求接口 去获取到数据 在渲染到页面 再把数据赋值给原定号的data中
        axios.get('http://localhost:5000/rights').then(res => {
             this.setState({
                data : res.data
            })
            //    console.log(res.data)
        }).catch()
    }


    render() {
     
           let gradeColor = ["processing","warning","error"]
             // 列 
            let columns = [
                {
                    title: '#',
                    dataIndex: 'id',
                    key: 'name',
                    render: id => <b>{id}</b>
                  },
                  {
                    title: '权限管理',
                    dataIndex: 'title',
                    key: 'age',
                  },
                  {
                    title: '权限等级',
                    dataIndex: 'grade',
                    key: 'key',
                    render: grade =>  <Tag color={ gradeColor[grade-1]} >
                                      {grade}
                                     </Tag>,
                  },
             
            ]

        return (
            <div>
                <Table 
                columns={columns} pagination={{pageSize:"5"}} 
                dataSource={this.state.data}
                rowKey={item => item.id} //  //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
                 />
            </div>
        )
    }
}
