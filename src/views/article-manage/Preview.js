import React, { Component } from 'react'
import axios from 'axios'
import {PageHeader} from 'antd'
export default class Preview extends Component {
    state={
        datalist:[]
    }
    componentDidMount() {
        let id = this.props.match.params.myid
        //获取传来的id, 利用id axios请求后端数据， 渲染页面
       axios.get(`http://localhost:5000/articles/${id}`).then(
           res=>{
                this.setState({
                   datalist:res.data
               })

           }
           
       ).catch()
        // console.log("传来id",this.props.match.params.myid)
    }
    
    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        // console.log(this.props)
                        this.props.history.goBack() //返回
                    }}
                    title="退出"
                    subTitle=""
                />
                {/*  吧数据库中的内容给转换成文本 */}
                 <div dangerouslySetInnerHTML={{__html:this.state.datalist.contentd}} ></div>
            </div>
        )
    }
}
