import React, { Component } from 'react';
import { Form, Input, Button ,  message} from 'antd';
// import {  InboxOutlined } from '@ant-design/icons';
import axios from 'axios'

class Category extends Component{
     
    render() {

        return (
          <div>
                 <Form
                  labelCol ={{ span: 6 }}
                   wrapperCol= {{ span: 8 }}// 表单布局 input 的长短
                    layout="horizontal"
                    size="middle"
                    // labelCol={{span:6}} // 布局
                    ref="form" //拿到组件对象
                
                  >
                    {/*  name 加上后 就能通过 ref  和refs.validateFields().then().catch() 完成绑定  */}
                       <Form.Item  label="账户">
                          <span className="ant-form-text">188888888</span>
                        </Form.Item>
                        <Form.Item  label="企业名称">
                          <span className="ant-form-text">山西森甲能源有限公司</span>
                        </Form.Item>
                        <Form.Item  label="社会信用代码">
                          <span className="ant-form-text" style={{color:'red'}}>(搜索企业名称检索出来)</span>
                        </Form.Item>
                    <Form.Item name ="Name" label="负责人"
                                      rules={[
                                        {
                                          required: true,
                                          message: '请输入正确的姓名',
                                        },
                                      ]}  
                    >
                      <Input  placeholder="王杰" />
                    </Form.Item>
                    <Form.Item name ="Addres" label="单位地址"
                                   rules={[
                                    {
                                      required: true,
                                      message: '请输入正确的单位地址!',
                                    },
                                  ]} 
                    >
                      <Input placeholder="山西太原" />
                    </Form.Item>
                    <Form.Item name ="Compone" label="企业简称"
                                      rules={[
                                        {
                                          required: true,
                                          message: '请输入正确的企业简称!',
                                        },
                                      ]} 
                    >
                      <Input placeholder=" 森佳科技 " />
                    </Form.Item>
                    <Form.Item name ="tel" label="联系电话"
                                          rules={[
                                            {
                                              required: true,
                                              message: '请输入正确的联系电话',
                                            },
                                          ]} 
                    >
                      <Input maxLength={11} placeholder="13888888888" />
                    </Form.Item>
                    <Form.Item name ="Cityname" label="所在地区"
                                            rules={[
                                              {
                                                required: true,
                                                message: '请输入正确的所在地区!',
                                              },
                                            ]} 
                    >
                      <Input placeholder="山西太原" />
                    </Form.Item>

                    <Form.Item 
                    // {...buttonItemLayout}
                    label=""
                    >
                      <Button type="primary" onClick={()=>{this.handleClick()}} style={{marginLeft:'44%'}}>确认修改</Button>
                    </Form.Item>
                  </Form>
          </div>
           
        )
    }
    // 点击跳转到列表详情页
    handleClick=()=>{
      // 跳转到 -》/deTailist


       // 1. 校验表单内容，2. 获取表单value 4 . post到后端 3.隐藏modal
       this.refs.form
       .validateFields()
       .then(values => {
          //  console.log(values)
           axios.post('http://localhost:5000/ComInfo',{
             ...values
           })
           message.success('修改成功！')
           // this.refs.form.resetFields(); //重置表单
           // this.renderTable(values)
       })
       .catch(info => {
           console.log('Validate Failed:', info);
       });

      this.props.history.push('/deTailist')
      // console.log( '1', this.refs.form)
  
    }
 }
 export default  Category
