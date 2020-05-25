import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'; // 文章编辑器
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html'// draft对象==》html 方便存储数据库
export default class Draft extends Component {
    state={
        editorState:null,
        contentState:''
    }
    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState:editorState
        })
    }
    onContentStateChange=(contentState)=>{
        // console.log(" wenbangaibian",contentState)
        this.setState({
            contentState
        })
    }
    render() {
        return (
            <div>
                <Editor
                editorState={this.state.editorState} // 编辑器状态
                toolbarClassName="toolbarClassName" // 工具样式
                wrapperClassName="wrapperClassName"  // 内容样式
                editorClassName="editorClassName"    //属性名
                onEditorStateChange={this.onEditorStateChange}
                 onContentStateChange= {this.onContentStateChange} // 文本内容

               onBlur={(contentState)=>{
                    //  console.log("失去焦点",draftjsToHtml(this.state.contentState))
                  // 失去焦点，子传父，把内容传给父组件
                     this.props.getContent(draftjsToHtml(this.state.contentState))
               }}

                />
            </div>
        )
    }
}
