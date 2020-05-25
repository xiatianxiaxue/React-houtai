import React, { Component } from 'react'
import { PageHeader, Steps, Button, message,Cascader,Form,Input  } from 'antd';
import Draft from './Draft' // 富文本编辑器
import Axios from 'axios'
import './index.css'
// import "./article.module.less";
const { Step } = Steps;

export default class  upData extends Component {
    state = {
        current: 0, // 步骤数据 0 1 2 
        options: [],
        formdata:null ,// 添加用户信息
        content:[] // 富文本内容

    };
    // 发送ajax 请求级联中的数据
    componentDidMount() {
        // let id= this.props.match.params.id
        let  id = this.props.match.params.id
        // 发送ajax 请求级联中的数据
        Axios.get(`http://localhost:5000/categories/`).then(
            res=>{
                this.setState(()=>({
                    options:res.data 
                }))
                // console.log("2222",res.data )
            }
        ).catch()

        // 发送axios  获取数据
        Axios.get(`http://localhost:5000/articles/${id}`).then(
            res=>{
                console.log(res.data)
                // console.log(res.data, this.props.match.params.id)
                let {title,catagory,contentd } = res.data
                
                this.setState({
                    formdata:{
                        title,
                        catagory
                    },
                    content:contentd,
                    firstNumber:2
                })
            //    console.log(this.refs.form.setFieldsValue())
                    //动态的设置表单的value值，
                  this.refs.form.setFieldsValue(
                  this.state.formdata
                  )
            }
        ).catch()

      
    }

        // 修改属性出现modal 框
        // setClick=(grade)=>{
        //     //  console.log(1,item)
        //      this.setState({ 
        //        setShow:true,
        //        updatamgs:grade
        //       })
        //     let {username,password,roleType} = grade
        //     setTimeout(() => {
        //       // this.setState({ setShow:true})
        //       this.refs.fromteo.setFieldsValue({ // 方法
        //         username:username,
        //         password:password,
        //         roleType:roleType
        //       })
        //     }, 0);
        //   }
    
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
                    title="更改文章"
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
                          <Form.Item name ="catagory"  label="文章分类" rules={[{ required: true }]}>
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
                    {/* 富文本编辑框 */}
                     <Draft 
                     getContent={(Content)=>{
                         this.getContent(Content)
                         console.log("create组件得到content",Content)
                    }}
                     content={this.state.content}
                     key={this.state.firstNumber}
                    //  onEvent={(content)=>{
                    //     console.log("create组件得到content",content)
                    //     this.setState({
                    //         content
                    //     })
                    //   }}
                     ></Draft>
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
        message.success('修改成功')
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
        console.log("111111",Content)

        this.setState({
            context: Content
        })
        console.log("传过来的重儿子哪里",Content)
    }
}



// 222222222222222222222222222222222222222222222222222

// import React, { Component } from 'react'
// import { Steps, PageHeader, Button, message, Form, Input, Cascader } from 'antd';
// import Axios from 'axios';
// import ArticleEditor from './ArticleEditor'
// const { Step } = Steps;

// export default class upData extends Component {
//     state = {
//         current: 0,
//         formdata:null,
//         content:"",
//         firstNumber:1,
//         options: [
//             //默认 ： label 级联菜单的显示内容， value,对应value值， children,    
//         ]
//     }

//     componentDidMount() {
//         let  id = this.props.match.params.id
//         Axios.get("http://localhost:5000/categories").then(res=>{
//             // console.log(res.data) //for 每个title==>babel
//             this.setState({
//                 options:res.data
//             })
//         })

//         // Axios.get("")
//         // console.log(this.props.match.params.id)
//         Axios.get(`http://localhost:5000/articles/${id}`).then(res=>{
//             console.log(res.data)
//             let {title,category,content} = res.data
//             this.setState({
//                 formdata:{
//                     title,
//                     category
//                 },
//                 content,
//                 firstNumber:2
//             })

//             //动态的设置表单的value值，
//             this.refs.form.setFieldsValue(
//                 this.state.formdata
//             )
//         })
//     }
    

//     render() {
//         const layout = {
//             labelCol: { span: 4 },
//             wrapperCol: { span: 20 },
//         };

//         return (
//             <div>
//                 <PageHeader
//                     className="site-page-header"
//                     onBack={() => {
//                         // console.log(this.props)
//                         this.props.history.goBack() //返回
//                     }}
//                     title="更新文章"
//                     subTitle="This is a subtitle"
//                 />

//                 <Steps current={this.state.current}>
//                     <Step key="11111" title="基本信息" />
//                     <Step key="222222" title="文章内容" />
//                     <Step key="33333" title="提交文章" />
//                 </Steps>

//                 <div style={{marginTop:"50px",display:this.state.current===0?'block':'none'}}>
//                     <Form
//                         {...layout}
//                         ref="form" //拿到组件对象
//                         // layout="vertical"
//                         name="form_in_modal"
//                         //初始化，只有第一次好用
//                         // initialValues={this.state.formdata}
//                         className="createKerwinForm"
//                     //initailValue设置后，将不会再受控制
//                     >
//                         <Form.Item
//                             name="title"
//                             label="文章标题"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input the title of collection!',
//                                 },
//                             ]}
//                         >
//                             <Input />
//                         </Form.Item>
//                         <Form.Item
//                             name="category"
//                             label="文章分类"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input the category of collection!',
//                                 },
//                             ]}
//                         >
//                             {/* 可配置 */}
//                             <Cascader options={this.state.options} placeholder="Please select" fieldNames={{
//                                 label:"title" //title 代替 label属性
//                             }}/>
//                         </Form.Item>
//                     </Form>
//                 </div>

//                 <div style={{marginTop:"50px",display:this.state.current===1?'block':'none',height:'500px',overflow:"auto"}}>

//                     {/* 1.textarea  2.富文本编辑  */}
                            
//                     <ArticleEditor onEvent={(content)=>{
//                         // console.log("create组件得到content",content)
//                         this.setState({
//                             content
//                         }) 
//                         //diff key值不同， 组件不会复用， key值相同，才会复用
//                     }} content={this.state.content} key={this.state.firstNumber}/>
//                 </div>

//                 <div style={{marginTop:"50px",display:this.state.current===2?'block':'none'}}>33333333</div>

//                 <div className="steps-action">
//                     {this.state.current < 2 && (
//                         <Button type="primary" onClick={() => this.next()}>
//                             下一步
//                         </Button>
//                     )}
//                     {this.state.current === 2 && (
//                         <Button type="primary" onClick={this.submit}>
//                             更新
//                         </Button>
//                     )}
//                     {this.state.current > 0 && (
//                         <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
//                             上一步
//                         </Button>
//                     )}
//                 </div>
//             </div>
//         )
//     }

//     submit = ()=>{
//         let {username} = JSON.parse(localStorage.getItem("token"))
//         //提交给后端，存到数据库
//         console.log(this.state.formdata,this.state.content)
//         Axios.put(`http://localhost:5000/articles/${this.props.match.params.id}`,{
//             ...this.state.formdata,
//             content:this.state.content,
//             author:username
//         }).then(res=>{
//             message.success("你更新成功了，你知道嘛？")
//             this.props.history.push(`/article-manage/list`)
//         })
//     }

//     prev = () => {
//         this.setState({
//             current: this.state.current - 1
//         })
//     }
//     next = () => {

//         if(this.state.current===0){
//             //此时表示第一步
//             this.refs.form.validateFields().then(values=>{
//                 console.log(values)
//                 this.setState({
//                     current: this.state.current + 1,
//                     formdata:values //收集表单信息， 在最后一步提交给后端
//                 })
//             }).catch(err=>{})
//         }else{
//             this.setState({
//                 current: this.state.current + 1
//             })
//         }
//     }
// }
