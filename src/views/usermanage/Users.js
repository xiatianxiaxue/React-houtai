import React, { Component } from 'react'
import { Button,Table,Switch,Modal, Form, Input,Select  } from 'antd';
import axios from 'axios';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

export default class Users extends Component {
    state={
      isShow:false, //添加用户
      setShow:false, //修改用户
      data:[],
      visible:false, // 删除按钮
      users:{},
      updatamgs:''
    }
    // q请求用户权限街口
    componentDidMount() {
        axios.get("http://localhost:5000/users").then(
            res=>this.setState({
              data:res.data
            })
        ).catch()
    }
    // 点击状态按钮触发的函数
     onChange=(item)=> {
       // 判断data 中的数据是否和 传参带来的数据id是否相等 相等就跟新数据
       this.state.data.forEach(listitem=>{
         if(listitem.id===item.id){
           // 如果相等 就修改属性 取反
           listitem['roleState']= !listitem['roleState']
           // 发送put 请求 跟新数据 把 listitem 取反
          axios.put(`http://localhost:5000/users/${item.id}`,{
            ...listitem
          //   console.log(listitem)
          }).then(
            res=>{console.log('更新成功了',res)}
          )
          //  console.log("lailwe")
         }
       })
      }
      // 点击出现modal事件
      addUserClick=()=>{
     
        this.setState({
          isShow:true
        })
      };
      // // 增加用户信息事件 1 获取表单数据 2 获取values 3 取消modal  ？？？？
      handleAddOk=()=>{
   
             // 触发表单事件
                   this.refs.from.validateFields()
                  .then(values => {
                    // console.log(values)
                    let arr = ['小编' ,'管理员', '超级管理员']
                    // 把vaule 结构出来
                    let {username ,password,roleType } = values
                    axios.post('http://localhost:5000/users',{
                      username: username,
                      password: password,
                      roleType: roleType,
                      roleName: arr[roleType-1],
                      roleState: false,

                    }).then(res=>{
                      // 重新渲染页面 过滤点相同的
                      // let newdata = this.state.data.filter(item=>item.id!== res.data.id)
                      
                      
                      setTimeout(() => {
                      this.setState({
                          data:[...this.state.data, res.data],
                          visible:false
                       })
                      }, 0);
                        this.refs.from.resetFields(); // 重置表单 归0

                    })
              
                    // this.renderTable(values) // 调用渲染表格函数
                    // this.refs.from.resetFields(); // 重置表单 归0
                    // console.log(values)
                  })
         this.setState({ isShow:false})

      }
       // 调用渲染表格函数
      renderTable=(value)=>{
       let {username,password,roleType} = value  // 解构函数 把values 中的有用信息给提去出来
        let roleArr=['小编','管理员','超级管理员']
        axios.post('http://localhost:5000/users',{
            username,
            password,
            roleType,
            roleName:roleArr[roleType-1], // 根据roleArr 的下边来确定 要渲染的内容
            roleState: false,
        }).then(res=>{
          // console.log(res.data)
          this.setState({ // 再一次渲染data 并关闭modal
            isShow:false, 
            data:[...this.state.data,  res.data ]
           
          })
        })
        

      }
    
      // 删除函数 detale 请求数据 完成删除任务
      DeteClick=(grade)=>{
      //  console.log(1,grade)
       setTimeout(() => {
        this.setState({
          visible:false,
          data:this.state.data.filter(item=>item.id!==grade.id)
        },()=>{  // setState 第二个参数是是跟新完成后的回掉
             axios.delete(`http://localhost:5000/users/${grade.id}`).then(
                res=>  console.log("删除成功！！",grade.id)
            ).catch()
        })

       }, 0);
        
      }
      // 修改属性出现modal 框
      setClick=(grade)=>{
        //  console.log(1,item)
         this.setState({ 
           setShow:true,
           updatamgs:grade
          })
        let {username,password,roleType} = grade
        setTimeout(() => {
          // this.setState({ setShow:true})
          this.refs.fromteo.setFieldsValue({ // 方法
            username:username,
            password:password,
            roleType:roleType
          })
        }, 0);

      }
      // 修改属性的成功事件
      upDateOk=()=>{
            let upDataMgs = this.state.updatamgs
                 // 触发表单事件
                 this.refs.fromteo.validateFields()
                 .then(values => {
                   console.log("---",values)
                   let arr = ['小编' ,'管理员', '超级管理员']
                   // 把vaule 结构出来
                   let {roleType } = values
                   // 数据库更新 
                   axios.put(`http://localhost:5000/users/${upDataMgs.id}`,{
                    //  username: username,
                    //  password: password,
                    //  roleType: roleType,
                    ...upDataMgs[0],
                    ...values,
                     roleName: arr[roleType-1],

                   }).then(res=>{
                  //   //  重新渲染页面 过滤点相同的
                    let newlist = [...this.state.data]
                     newlist.forEach((item,index)=>{
                           if(item.id===res.data.id){         
                              newlist[index]=res.data

                           }
                     })
                     this.setState({
                         data:newlist,
                         setShow:false
                      })
                       this.refs.fromteo.resetFields(); // 重置表单 归0

                   })
             
                 })
        // this.setState({ isShow:false})
     
      }
    render() {
        //  z这些数据是渲染页面标题的作用
        let columns = [
            {
               title: '角色名称',
               dataIndex: 'roleName',
               key: 'name',
               // render: id => <b>{id}</b>
             },
             {
               title: '用户名',
               dataIndex: 'username',
               key: 'age',
             },
             {
               title: '用户状态',
               roleState: 'roleState',
               key: 'key',
               render:( roleState,intem)=><Switch  disabled={intem.default} defaultChecked={roleState} onChange={(roleState)=>{this.onChange(intem)}} />
                // 组件完全受到状态的控制 就是 受控组件   
                //  不收状态的控制就是非空组件   defaultChecked={}默认是开还是关
                // 注意一点 其中有一个超级管理员 需要 用disabled 来完成禁用功能
                // 通过 roleState 控制每一个状态
             },
             {
               title: '操作',
              //  dataIndex: 'title',
              //  key: 'age',
                render: grade => 
                 <div>
                      {/* 修改按钮 */}
                     <Button onClick={()=>this.setClick(grade)} style={{margin:"0 5px"}} type="primary" shape="circle" disabled={grade.default} icon={<EditOutlined />} />
                     {/* 删除按钮 */}
                     <Button onClick={ ()=>this.setState({ visible:true,}) } type="danger" shape="circle" disabled={grade.default}  icon={<DeleteOutlined  />} />
                     {/* 删除MODAL */}
                       <Modal
                          title="警告"
                          centered
                          type="dashed"
                          // closable
                          // afterClose={this.DeteClick(grade)} // 完全关闭后的回掉
                          visible={this.state.visible}
                          onOk={()=>{this.DeteClick(grade)}}
                          onCancel={()=>this.setState({ visible:false,})} // 取消按钮设置
                          okText="确认"
                          cancelText="取消"
                        >

                          <p style={{color:"red"}}>确定要删除吗？</p>
            
                       </Modal>
                  </div>
    
             },
        
       ]

        return (
            <div>
            <Button type="primary" onClick={this.addUserClick}>添加用户</Button>
            <Table 
              columns={columns} pagination={{pageSize:"5"}} 
              dataSource={this.state.data}
              rowKey={item => item.id} //  //rowKey 接受回调函数， 返回值将作为key,理想的key值是item.id
             />


           {/* 修改属性的modal */}

           <Modal
              keyboard
              visible={this.state.setShow}
              title="修改用户"
              okText="确认修改"
              cancelText="取消"
              onCancel={()=>this.setState({ setShow:false})} // 取消
              onOk={() => {this.upDateOk()}}  // 成功
            >

             <Form
                ref="fromteo"
                // ref={(Form)=>{this.elem=Form}}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                modifier: 'public'
                }}
              >
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Input maxLength={10} />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Input maxLength={10}/>
                </Form.Item>
                <Form.Item label="管理权限" name="roleType">
                <Select
                  showSearch
                  placeholder="管理权限"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={3}>超级管理员</Option>
                  <Option value={2}>管理员</Option>
                  <Option value={1}>小编</Option>
                </Select>
                </Form.Item>
              </Form>

            </Modal>

           {/* add的 模态框 */}
           <Modal
              keyboard
              visible={this.state.isShow}
              title="添加用户"
              okText="确认"
              cancelText="取消"
              onCancel={()=>this.setState({ isShow:false,})}
              onOk={() => {this.handleAddOk()}}
            >
              <Form
                ref="from"
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                modifier: 'public',
                }}
              >
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Input maxLength={10} />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the title of collection!',
                    },
                  ]}
                >
                  <Input maxLength={10}/>
                </Form.Item>
                <Form.Item label="管理权限" name="roleType">
                <Select
                  showSearch
                  placeholder="管理权限"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={3}>超级管理员</Option>
                  <Option value={2}>管理员</Option>
                  <Option value={1}>小编</Option>
                </Select>
                </Form.Item>
              </Form>
            </Modal>
           </div>
        )
    }
}
