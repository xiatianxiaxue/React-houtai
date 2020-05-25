import React, { Component } from 'react';
// 引入高阶组件 withRouter
import {withRouter} from 'react-router';
import Particles from 'react-particles-js';
import style  from'./login.module.css'; // 引入自己的样式 1
import 'antd/dist/antd.css'; // 引入antd css 样式
import {  Form, Input, Button ,Space,message } from "antd";
import axios from 'axios';
// import store from '../../redux/store'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
 class Login extends Component {
     state={
         userInfo:{}
     }
    render() {
        return (
            <div style={{background:"rgba(35,39,65)"}} >
                <Particles height={window.innerHeight-20} params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} ></Particles>
           {/* 使用自己引入的样式 className={style.cantext} */}
            <div className={style.cantext}> /

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: '请输入你的用户名!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '请输入你的密码!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
            

                <Form.Item>
                    <Button  type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button>
                    {/* 弹出登录错误信息 */}
                    <Space></Space>
                </Form.Item>
            </Form>
            </div>
          
          

            </div>
        )
    }
  
    // 能够获取到登录 用户名和密码 信息
    onFinish = (value) => {
        //  1 验证用户信息
        axios.get(`http://localhost:5000/users?username=${value.username}&password=${value.password}`)
        .then(res=>{
            // 判断用户名和密码是否一样
           if(value.username===res.data[0].username && value.password===res.data[0].password){
              message.success('登录成功');   // 登录成功发送的提示框        
            // 2 成功后 保存 存储自能是字符串 不能是对象 JSON.stringify()  取出用json.pare
                localStorage.setItem("token",JSON.stringify(res.data)) 
                 
                this.setState({
                    userInfo:JSON.stringify(res.data)
                },()=>{
                    // 33 发布模式 用户信息
                    // store.dispatch({
                                        
                    //     type:"USERINFO",
                    //     payload:this.state.userInfo
                    // })

                })

             
               // 3 登录
               this.props.history.push(`/dashboard`)
      
           }
        })
        .catch(err=>{
            console.log(err)
            message.error('用户名或密码不正确'); // 登录失败发送的提示框 
    
          
        })
      }
}
// 导出高阶组件
export default withRouter(Login)