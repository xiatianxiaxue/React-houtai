import React, { Component } from 'react'
import { Button,Table } from 'antd';
import axios from 'axios';
import { EditOutlined,DeleteOutlined,EyeOutlined } from '@ant-design/icons';
export default class List extends Component {
    state = {
        dataList:[
        ]
    }
    componentDidMount() {
        axios.get("http://localhost:5000/articles").then(
            res=>this.setState(()=>({ // 记住是（）=>({  })
              dataList:res.data
            
            }))
        ).catch()
    }
    // 点击完成业务跳转去creatd 页面
    goCreatd=()=>{
      // 编程式跳转 
      this.props.history.push('/article-manage/creatd')
    }
    // 删除事件 发送请求  然后再修改状态 
    deleteClick=(grade)=>{
       let newdataList = this.state.dataList.filter(item=>item.id !==grade.id)

      axios.delete(`http://localhost:5000/articles/${grade.id}`)
      .then(
        res=>{
          this.setState(()=>({
            dataList:newdataList
          }))

        }
      )
      .catch()
      console.log(grade.id)
    }
    // 预览事件 /article-manage/preview/id
    preview=(grade)=>{
      // console.log(grade)
      this.props.history.push(`/article-manage/preview/${grade.id}`)
    }
    // 修改项目事件
    modify=(data)=>{
      this.props.history.push(`/article-manage/updata/${data.id}`)
      //  console.log(11111,data.id)
    }
    
    render() {
         //  z这些数据是渲染页面标题的作用
        let columns = [
             {
                title: '文章标题',
                dataIndex: 'title',
                key: 'id',
                // render: id => <b>{id}</b>
              },
              {
                title: '文章作者',
                dataIndex: 'author',
                key: 'id',
              },
              {
                title: '文章类别',
                dataIndex: 'catagory',
                key: 'catagory', 
                // render: catagory =>  catagory.join("/")   报错
        
              },
              {
                title: '操作',
                // dataIndex: 'title',
                // key: 'age',
                 render: grade => 
                  <div>
                    {/* 预览按钮 */}
                      <Button  onClick={()=>{this.preview(grade)}} type="primary" ghost shape="circle" icon={<EyeOutlined />} />
                     {/* 修改按钮 */}
                      <Button onClick={()=>{this.modify(grade)}} style={{margin:"0 5px"}} type="primary" shape="circle" icon={<EditOutlined />} />
                      {/* 删除按钮 */}
                      <Button type="danger" onClick={()=>this.deleteClick(grade)} shape="circle" icon={<DeleteOutlined  />} />
                   </div>
     
              },
         
        ]
        return (
            <div>
                <Button type="primary" onClick={this.goCreatd}>添加文章</Button>
                <Table 
                columns={columns} pagination={{pageSize:"5"}} 
                dataSource={this.state.dataList}
                rowKey={item => item.id} //  //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
                 />
            </div>
        )
    }

    handlePreview=(item)=>{
        // console.log(this.props)
        this.props.history.push(`/article-manage/preview/${item}`);

    }
}
