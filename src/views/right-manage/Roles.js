import React, { Component } from 'react'
import { Table ,Button,Tag} from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import axios from 'axios';
import {connect} from 'react-redux'
// import store from '../../redux/store'
 class Roles extends Component {
    state={
        //  数据元
     data:[]
     }
    // 封装axios 函数 action 是一个promis 函数 要有中间件才能使用
    // action = ()=>{
    //    return  axios.get('http://localhost:5000/roles').then(res=>{
    //        return {
    //            type:"xiayu-roler",
    //            payload: res.data
    //        }
    //    }) // 必须有type 和payload 必须有返回值
    // //    console.log(action)
    // }
    


     componentDidMount(){
        // 请求角色的接口

         if( this.props.myRoleList.length===0){
            this.props.getRoleList(); // 回掉函数获取数据 第一次是发送axios 第二次就是在store中获取
         }

    }
    // 删除角色的操作 
    clearclickevent=(id)=>{
        // 新定义一个数组 过滤去点击那个  去没有点击的数组 用filter 不会改变元数组 
        let newdata = this.state.data.filter(item=>item.id !==id)
        // console.log(newdata)
        this.setState({
           data:newdata

        })

        // 删除后需要更新数据库
        axios.delete(`http://localhost:5000/roles/${id}`).then(res=>{
           console.log("删除成功")

        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
                // 列 
                let columns = [
                     {   
                        title: '角色名称',
                        dataIndex: 'roleName',
                        id: 'roleName',
                      },
                   
                      {
                      
                        title: '操作',
                        dataIndex: '',
                        id: 'id',  // 一定要传如id
                        render: (obj) => 
                        // 传入 obj 就能拿到数据  在拿到先对应的id
                           <Button onClick={()=>this.clearclickevent(obj.id)}  icon={<ClearOutlined  />}  shape="round" type="danger">Delete</Button>
                           
                      },

                    //   Function(text, record, index) {}
                ]
        return (
            <div>
                  <Table
                        columns={columns}
                        dataSource={this.props.myRoleList}
                        //  //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
                        rowKey={item => item.id} 
                        expandable={{
                            // rowExpandable	设置是否允许行展开
                        expandedRowRender: (data) => {
                            return   data.roleRight.map(
                                (item, index) => 
                                      <div key={index}>
                                        {
                                           item.list.map(itemdd=> <Tag key={itemdd} style={{ margin: "5px" }} color="green">{itemdd}</Tag>) 
                                        }  
                                      </div>        
                          )
                        }
                        // <p style={{ margin: 0 }}>{Child.roleRight}</p>,
                        // rowExpandable: record => record.name !== 'Not Expandable',
                        }}
          
                    />,
            </div>
        )
    }
}


//1. 为了给roles传redux状态
const mapStateToProps=  (state)=>{
    console.log(state)
    return {
        myRoleList:state.roleList
    }
}
const mapDispatchToProps = {
    async getRoleList(){
        let res = await axios.get("http://localhost:5000/roles")
        return {
            type:"kerwin_save_rolelist",
            payload:res.data
        }
        //dispatch
    }
}
// 第一个参数是 传的属性 第二个是回掉函数
export default connect(mapStateToProps,mapDispatchToProps)(Roles) 