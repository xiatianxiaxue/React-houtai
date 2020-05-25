import React, { Component } from 'react';
import Home from '../home/Home';
import Manage from '../right-manage/index';
import Users from '../usermanage/Users';
import Error from '../error/Error';
import { Switch,Route, Redirect} from "react-router-dom";
import List from '../article-manage/List';
import Creatd from '../article-manage/creatd';
import updata from '../article-manage/upDate';
import deTailist from '../detal/deTailist';
import Category from '../article-manage/category'
import './index.css';
import Sider from './Sider';
import Headertop from './Headertop.js';
import Preview from '../article-manage/Preview';
import { Layout } from 'antd';
const {  Content } = Layout;
export default class DashBoard extends Component {
      state = {
        collapsed: false,
      };

      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render() {
      // let { roleType } = JSON.parse(localStorage.getItem("token"))
        return (
          
        <Layout>
          <Sider></Sider>
        
          <Layout className="site-layout">
            <Headertop ></Headertop>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 16,
                minHeight: "auto", // 解决出现阴影的bug
              }}
            >
              
                <Switch>
                 <Route path="/home" component={Home}/>


                  {/* 用户权限-用户列表
                  {roleType >= 3 ?
                      <Route path="/user-manage" component={Users} />
                      :
                      null
                  } */}

                  {/* 权限管理-权限列表,角色列表 */}
                  {/* {
                      roleType >= 3 ?
                          <Route path="/right-manage" component={Manage} />
                          : null
                  } */}

                  <Route path="/user-manage" component= {Users}/>
                  <Route path="/article-manage/list" component= {List}/>
                  <Route path="/article-manage/preview/:myid" exact component={Preview}/>
                  {/* <Route path="/article-manage/category" component= {Category}/> */}
                 <Route path="/right-manage" component={Manage}/>
                 {/* article-manage/Category */}
                 <Route path="/article-manage/Category" component={Category}/>
                 <Route path="/article-manage/updata/:id" component={updata}/>
                 <Route path="/article-manage/creatd" component={Creatd}/>
                 <Route path="/deTailist" component={deTailist}/>
                 <Redirect from ="/dashboard" to="/home" exact/>
                 <Redirect from ="/" to="/home" exact/>
                 <Route path="*" component={Error}/>
            
              </Switch>
              
            </Content>
         </Layout>
        </Layout>

        )
    }
}




// import React, { Component } from 'react'
// import { Layout } from 'antd';

// const { Header, Footer, Sider, Content } = Layout;
// export default class DashBoard extends Component {
//   render() {
//     return (
//       <Layout style={{height:"100%"}}>
//       <Header style={{height:"50px",background:"red"}}>Header</Header>
//       <Layout style={{height:"100%",background:"pink"}}>
//         <Sider>Sider</Sider>
//         <Content>Content</Content>
//       </Layout>
//       <Footer style={{height:"50px",background:"#399"}}>Footer</Footer>
//      </Layout>
//     )
//   }
// }
