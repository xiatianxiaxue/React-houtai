
import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import MenuArr from '../../router/men';
// import store from '../../redux/store'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
const {  Sider } = Layout;
const { SubMenu } = Menu;
 class SiderLeft extends Component {
    state = {
        collapsed: false,
      };

      // toggle = () => {

      //   this.setState({
      //     collapsed: !this.state.collapsed,
      //   });
      // };
          //自己封装渲染函数
        renderMenu = (menus)=>{
          return menus.map(item=>{
              if(item.children){
                  return <SubMenu defaultSelectedKeys={['item.path']} key={item.path} title={
                      <span>
                          <item.icon/>
                          <span>{item.title}</span>
                      </span>
                  }>
                      {
                           //递归用法 在调用函数
                        this.renderMenu(item.children)
                      }
                  </SubMenu>    
              }else{
                  return (
                      <Menu.Item defaultSelectedKeys={['11']} key={item.path} icon={<item.icon />}>
                              {item.title}
                      </Menu.Item>
                  )
              }
          })
      }
      handleChangePage = (obj)=>{
        console.log(obj.key)
        // 高阶组件提供
        this.props.history.push(obj.key)//key路由对应的路径
      }
      componentDidMount() {
        // 订阅模式
        //  this.unsceibe = store.subscribe(()=>{
        //   console.log("订阅者要订阅了")
        //   this.setState({
        //      collapsed:store.getState().collapsed
        //   })
         
        // })
      
      }
      componentWillUnmount(){
        // console.log("componentWillUnmount--销毁订阅")
        // this.unsceibe() // 销毁订阅
      }
      
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={
              // this.state.collapsed
              this.props.collapsed
              }>
            <div className="logo" />
           
            <Menu 
            theme="dark"  // 主题颜色
            mode="inline" // 菜单类型
            defaultSelectedKeys={['/home']} // 默认高亮效果 初始选中的菜单项 key 数组
            // defaultOpenKeys={["/user-manage"]} // 初始展开的 SubMenu 菜单项 key 数组
            onClick={this.handleChangePage} // 点击事件
            >
             {
               this.renderMenu(MenuArr)
             }
          
            </Menu>
          </Sider>
        )
    }
}
// connec拿到了store, store.getState()
const mapStateToProps = state => {

  console.log(state.collapsed)
  return {
      name:"kerwin",
      a:1,
      collapsed:state.collapsed
  } //函数返回值 ，就是将来往sideMeun 组件传来的属性
}// 映射redux 状态==>当前组件属性


export default connect(mapStateToProps)(withRouter(SiderLeft))