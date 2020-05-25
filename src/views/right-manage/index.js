import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Roles from './Roles';
import Rights from './Rights';
import { Tabs } from 'antd';
import { withRouter } from 'react-router';
const { TabPane } = Tabs;

 class Manage extends Component {
     callback=(index) =>{
         if(index==="1"){
            this.props.history.push('/right-manage/roles')
         }else{
            this.props.history.push('/right-manage/rights')
         }
        //  console.log(this.props,index)
        //  let pathone = this.props.location.pathname
        //  this.props.history.push(this.props.location.pathname)
     }
        
    render() {
     
        return (
            <div>
                <div>
                <Tabs defaultActiveKey="1" 
                onChange={this.callback}
                >
                    <TabPane tab="角色管理" key="1" >
{/*                       
                    <Switch>
                        <Route path="/right-manage/roles" component= {Roles}/>
                        <Route path="/right-manage/rights" component= {Rights}/>
                        <Redirect from="/right-manage" to="/right-manage/roles"/>
                    </Switch>   */}
                    </TabPane>
                    <TabPane tab="权限列表" key="2">
                        {/* 22
                        <Switch>
                        <Route path="/right-manage/roles" component= {Roles}/>
                        <Route path="/right-manage/rights" component= {Rights}/>
                        <Redirect from="/right-manage" to="/right-manage/roles"/>
                        </Switch>   */}
                    </TabPane>
                  
                </Tabs>,
                </div>
                <Switch>
                    <Route path="/right-manage/roles" component= {Roles}/>
                    <Route path="/right-manage/rights" component= {Rights}/>
                    <Redirect from="/right-manage/" to="/right-manage/roles"/>
                </Switch>           
            </div>
        )
    }
}
 export default  withRouter(Manage)