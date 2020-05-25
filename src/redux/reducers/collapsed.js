
//只管理 isCollapsed 是 true还是false

// 唯一能修改状态的地方 prevState=false 要有默认值
const collapseReducer = (prevState=false,action)=>{
    //  action 传过来的 信息 payload 自动传过来要修改是值
   let { type,payload } = action
   // console.log(action)
switch (type) {
    case "kerwin_change_collapse":
        let  newstate = payload
        return  newstate 
        default:
            return  prevState
    
 }

}
export default collapseReducer