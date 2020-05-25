 // 1.引入需要的包
import {createStore,applyMiddleware ,combineReducers,compose} from 'redux'
import reduxPromise from 'redux-promise' // 安装中间件
import  collapsed from './reducers/collapsed'
import reduxThunk from 'redux-thunk'
import roleListReducer from './reducers/roleListReducer'
// 唯一能修改状态的地方

// 2 设置可视化的代码 -》compose 需要引入
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  3 管理多个 reducer combineReducers（需要引入） 是合并reducer 的
const reducer =combineReducers({
    collapsed : collapsed,
    roleList : roleListReducer
})
// 4 创建创库  reducer 就是有一个值 不能有多个
const store =createStore(reducer,{
    collapsed:false,
    roleList:''
},composeEnhancers(applyMiddleware(reduxPromise,reduxThunk)))// 安装promise中间件
//  风格 reduxPromise  √ ,reduxThunk
//5  导出store
export default store