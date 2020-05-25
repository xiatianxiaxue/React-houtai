import React from 'react';
import BlogRouter from './router'
import { Provider } from 'react-redux'; //引入react-redux
import store from './redux/store'   // 引入创库
// import DashBoard from './views/dashboard/DashBoard.js'
//根组件 把路由也当成了组件去看待
export default class App extends React.Component{
  render(){
    return (
      // 用Provider 取包裹跟组件
      <Provider store={store}> 
        <BlogRouter/> 
      </Provider>
    )
     
   
  }
}


