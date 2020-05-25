import React, { Component } from 'react'
import { Layout ,Avatar,Menu,Dropdown} from 'antd';
import { withRouter } from 'react-router';
// import store from '../../redux/store'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import {connect} from 'react-redux'
const { Header } = Layout;
 class Headertop extends Component {
    state = {
        collapsed: false,
        getuser:'',
      
      };

      toggle = () => {
       
      //  //  发布模式 setiscollapsed
      //    store.dispatch({
      //      type:"setiscollapsed",
      //      payload:!this.state.collapsed
      //    })
      this.props.change({
        type:"kerwin_change_collapse",
        payload:!this.state.collapsed
      });//回调父组件传来的方法

        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      componentDidMount() {

        

         let ues = JSON.parse(localStorage.getItem('token'))
         this.setState({
              getuser:ues[0]
          })
          // console.log(ues[0])


         //  订阅 userinfo
        //  this.unscribe=store.subscribe(()=>{
        //   console.log("user订阅",store.getStore())
        //   this.setState({
        //     getuser:store.getStore().userInfo[0]
        //   })
        //   // console.log(getuser)
        // })
       

      }
      
      guanli=()=>{console.log(1)} ;
      //实现退出去到登录功能  需要引入高阶组件 withRouter 
      tuichu=()=>{
      
      } 
    render() {
      const menu = (
        <Menu onClick={(obj)=>{
          if(obj.key==="a"){
             console.log(1)
          }else{
            // 清楚token  跳转到login页面
            localStorage.removeItem("token")

            this.props.history.push('/login')
          
          }
        }}>
          <Menu.Item key="a">
            {this.state.getuser.roleName}
          </Menu.Item>
          <Menu.Item key="b">
            退出
          </Menu.Item>
      
        </Menu>
      );
    
        return (
            <Header className="site-layout-background" style={{ padding: "0 0 0 20px" }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <span style={{float:"right",marginRight:"75px"}}>
             欢迎 <span style={{color:"red"}}>{this.state.getuser.username}</span>回来
            </span>
           <Dropdown overlay={menu}>
              <Avatar size="large" icon={<UserOutlined />} /> 
            </Dropdown>
          </Header>
        )
    }
}

const  mapStateToProps = ()=>{
  return {
      a:1
  }
}
//给TopHeader 传哪些回调函数
const mapDispatchToProps = {
  change(obj){
      console.log("change-connect约定好，传给topheader的回调",obj)
      return obj
  },
  aaa(){

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Headertop))