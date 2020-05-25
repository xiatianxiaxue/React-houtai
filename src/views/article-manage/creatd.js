import React, { Component } from 'react'
import { PageHeader, Steps, Button, message,Cascader,Form,Input  } from 'antd';
import Draft from './Draft' // 富文本编辑器
import Axios from 'axios'
import './index.css'
// import "./article.module.less";
const { Step } = Steps;

export default class  Creatd extends Component {
    state = {
        current: 0,
        options: [],
        formdata:[] ,// 添加用户信息
        context:[]

    };
    // 发送ajax 请求级联中的数据
    componentDidMount() {
        Axios.get("http://localhost:5000/categories").then(
            res=>{
                this.setState(()=>({
                    options:res.data 
                }))
            }
        ).catch()
    }
    
    next() {
        // 验证 current===0 是 用户提交表单是否填写信息
        if(this.state.current===0){
           
            //表单验证
            this.refs.form.validateFields()
            .then( value=>{
                this.setState(()=>({ 
                    current:this.state.current + 1,
                    formdata:value
                }));
            })
            .catch()
            

        }else if(this.state.current===1){
            this.setState(()=>({ current:this.state.current + 1 }));
        }
  
      }
    
    prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    }
    // displayRender=(value)=>{
    //     console.log(111,value)
    // }
    // 级联 选择完的事件
    // getValue=(value)=>{
    //    console.log(value);
    // }
    render() {

        const steps = [
            {
              title: '基本信息',
            //   content: '111111111',
            //   render:(item)=><p>oooo</p>
            },
            {
              title: '文章内容',
            //   content: '22222222',
            },
            {
              title: '提交文章',
            //   content: '333333',
            },
          ];
   
        return (
            <div>
                  <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.go(-1)}
                    title="创建文章"
                    subTitle=""
                />,
          

                <div>
                    <Steps current={this.state.current}>
                     <Step key="1" title="基本信息" />
                     <Step key="2" title="文章内容" />
                     <Step key="3" title="提交文章" />
          
                    {/* {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))} */}
                    </Steps>

                    {   <div  style={{margin:'35px 0',display:this.state.current===0? "block": "none"}}>
                           
                         <Form  
                           ref="form"
                           onValuesChange={this.getValue}>
                            <Form.Item name ="title"  label="文章标题" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                          <Form.Item name ="category"  label="文章分类" rules={[{ required: true }]}>
                            {/*  级联菜单 */}
                            <Cascader
                                fieldNames={{label: 'title'}} // 重新配置一下label 属性名 和后端数据对应
                                options={this.state.options}
                                expandTrigger="hover"
                                // displayRender={this.displayRender} // 
                                // onChange={this.onChange} //  级联 选择完的事件
                            />
                          </Form.Item>
                         
                        </Form>
                      
                        </div>  
                   }
                   {    
                    <div   className="box" style={{height:"300px",overflow:"auto", margin:'35px 0',display:this.state.current===1? "block": "none"}}>
                    
                     <Draft getContent={(Content)=>this.getContent(Content)}></Draft>
                    </div>  
                   }
                    {  
                        <div style={{margin:'35px 0',display:this.state.current===2? "block": "none"}}>

                         </div> 
                    }

                    <div className="steps-content">{steps[this.state.current].content}</div>
                    {/* 下面按钮 */}
                    <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                        下一步
                        </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                        <Button type="primary" onClick={this.submit}>
                        提交文章
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                        上一步
                        </Button>
                    )}
                    </div>
                </div>
            </div>
        )
    }
    // 提交信息 保存到数据库中
    submit=()=>{
        message.success('提交成功')
         let mgs = JSON.parse(localStorage.getItem("token"))
         console.log(mgs[0].username)
        Axios.post('http://localhost:5000/articles',{
            title:this.state.formdata.title,
            author:mgs[0].username,
            contentd:this.state.context,
            catagory:this.state.formdata.category

        }).then(res=>{
            // 跳转到 前面
            this.props.history.push('/article-manage/list')
        }).catch()

        // console.log(this.state.formdata)
    }
    // 编写的内用
    getContent=(Content)=>{
        this.setState({
            context: Content
        })
        // console.log("传过来的重儿子哪里",Content)
    }
}
