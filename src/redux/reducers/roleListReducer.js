
//只管理 isCollapsed 是 true还是false
// import {fromJS} from 'immutable'
// 唯一能修改状态的地方 prevState=false 要有默认值
const roleList = (prevState=[],action)=>{

    let { type,payload } = action
    // console.log(action)
 switch (type) {
     case "kerwin_save_rolelist":
         let  newstate = payload // 深复制
        //   let newstate= fromJS(payload )  
            // let newImutablestate= newstate.catch(payload)
         return  newstate
        // return newImutablestate.toJS()
         default:
             return  prevState
     
  }
}
export default roleList