import React, { Component } from "react";
import {message ,Modal, Form, Button, Row, Col, Input } from "antd";
import "./index.css"; // 引入css样式
import { MinusOutlined } from '@ant-design/icons';
export default class deTailist extends Component {
  state = {
    mtIsshow: false, // 控制模态框的显示隐藏
    baojiaList:[] // 报价的信息
  };
  handReqClick=()=>{
    this.setState({
      mtIsshow:true
    })
  }
  valueChangeclick=(object)=>{
    console.log(object)
  }
  render() {
    return (
      <div>
        <div style={{ borderRadius: "2px", border: "1px solid #f7f7f7" }}>
          <div
            style={{
              padding: "20px",
              height: "26px",
              background: "#ecf1ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", color: "#57585b" }}>
                竞价编号:<span>88888888888</span>
              </span>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#5882fc" }}>
                报价通过
              </span>
            </div>
          </div>
          <strong style={{ padding: "20px", fontSize: "16px", color: "black" }}>
            动力煤/
            <span href="#" style={{ fontSize: "10px", color: "black" }}>
              正统大块
            </span>
          </strong>
          <Row style={{ padding: "20px", fontSize: "11px", color: "#464646" }}>
            <Col span={6}>
              <div>
                <p>
                  采购单位:
                  <span style={{ marginLeft: "5px" }}>
                    山西太原森佳科技有限公司{" "}
                  </span>
                </p>
                <p>
                  采购合同:<span style={{ marginLeft: "5px" }}>2222 </span>
                </p>
                <p>
                  化验标准:<span style={{ marginLeft: "5px" }}>4444 </span>
                </p>
                <p>
                  联系人:<span style={{ marginLeft: "5px" }}>55555 </span>
                </p>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <p>
                  合同数量:<span style={{ marginLeft: "5px" }}>2222 </span>
                </p>
                <p>
                  联系单位:<span style={{ marginLeft: "5px" }}>333 </span>
                </p>
                <p>
                  发货单位:<span style={{ marginLeft: "5px" }}>4444 </span>
                </p>
                <p>
                  联系电话:<span style={{ marginLeft: "5px" }}>188888888 </span>
                </p>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <p>
                  发布日期:
                  <span style={{ marginLeft: "5px" }}>2020年5月22日 </span>
                </p>
                <p>
                  截止日期:
                  <span style={{ marginLeft: "5px" }}>2020年5月22日 </span>
                </p>
                <p style={{ color: "red" }}>
                  竞价类型:<span style={{ marginLeft: "5px" }}>现汇 </span>
                </p>
                <p style={{ color: "red" }}>
                  竞价价格:<span style={{ marginLeft: "5px" }}>300/吨 </span>
                </p>
              </div>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              span={6}
            >
              <div>
                <Button
                  onClick={ this.handReqClick}
                  style={{
                    padding: "0",
                    textAlign: "center",
                    fontSize: "10px",
                    height: "24px",
                    width: "60px",
                    color: "#fff6f4",
                    background: "#fd5920",
                  }}
                  type="primary"
                  danger
                  size="small"
                  shape="round"
                >
                  确认合同
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <div style={{ borderRadius: "2px", border: "1px solid #f7f7f7" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px",
              height: "26px",
              background: "#ecf1ff",
              color: "#5882fc",
            }}
          >
            <div>
              <span
                style={{
                  alignItems: "center",
                  display: "block",
                  lineHeight: "26px",
                  height: "26px",
                  fontSize: "11px",
                  color: "#5882fc",
                }}
              >
                化验指标
              </span>
            </div>
          </div>
          <Row style={{ padding: "20px", fontSize: "11px", color: "#464646" }}>
            <Col span={6}>
              <div>
                <p>
                  水分(M):<span style={{ marginLeft: "5px" }}> </span>
                </p>
                <p>
                  矸石:<span style={{ marginLeft: "5px" }}> </span>
                </p>
                <p>
                  碳粉:<span style={{ marginLeft: "5px" }}> </span>
                </p>
                <p>
                  碳块:<span style={{ marginLeft: "5px" }}> </span>
                </p>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <p>
                  率可磨:<span style={{ marginLeft: "5px" }}> </span>
                </p>
                <p>
                  灰分(AAD):<span style={{ marginLeft: "5px" }}> </span>
                </p>
                <p>
                  硫(S):<span style={{ marginLeft: "5px" }}> </span>
                </p>
                <p>
                  固定碳(C):<span style={{ marginLeft: "5px" }}> </span>
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/*  点击提交的模态框确认 */}

        <Modal
        //  bodyStyle={{width: '800px', background:'#fff',borderRadius: '9px'}}
          wrapClassName={'web'}//对话框外部的类名，主要是用来修改这个modal的样式的
          footer={null} // 底部
          closable={false} // ×
          title="报价"
          // header = {null}
          visible={this.state.mtIsshow}
          onOk={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
           {/*  第一部分的 内容 */}
          <Row gutter={[12, 4]}>
            <Col span={10}>
              <Form
                labelCol={{ span: 8 }} // 控制表格左部大小的越大 8 空间越大
                layout="horizontal"
                size="small"
                ref="form" //拿到组件对象
              >
                <Form.Item
                  className="ant-form-sizeipt"
                  name="ipt1"
                  label="竞价编号"
                >
                  <span className="ant-form-text">188888888</span>
                </Form.Item>
                <Form.Item name="ipt2" label="销售单位">
                  <span className="ant-form-text">山西森甲能源有限公司</span>
                </Form.Item>
                <Form.Item name="ipt2" label="采购单位">
                  <span className="ant-form-text">鸿鹄科技</span>
                </Form.Item>
              </Form>
            </Col>
            <Col pull={2} span={14}>
              <Form
                labelCol={{ span: 8 }} // 控制表格左部大小的越大  空间越大
                layout="horizontal"
                size="small"
                ref="form" //拿到组件对象
              >
                <Form.Item
                  className="ant-form-sizeipt"
                  name="ipt1"
                  label="竞价编号"
                >
                  <span className="ant-form-text">188888888</span>
                </Form.Item>
                <Form.Item name="ipt2" label="销售单位">
                  <span className="ant-form-text">山西森甲能源有限公司</span>
                </Form.Item>
              </Form>
            </Col>
          </Row>
               {/*   第二内容部分的的 gutter={[24, 4]} */}
          <Row gutter={[12, 4]}>
            <Col span={10}>
              <Form
                labelCol={{ span: 8 }} // 控制表格左部大小的越大  空间越大
                //  wrapperCol= {{ span: 8 }}// 表单布局 input 的长短
                layout="horizontal"
                size="small"
                // onValuesChange={this.valueChangeclick()}
                // labelCol={{span:6}} // 布局
                ref="form" //拿到组件对象
              >
                <Form.Item
                  name="ipt4"
                  label="负责人"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 负责人!",
                    },
                  ]}
                >
                  <Input placeholder="王杰" />
                </Form.Item>
                <Form.Item
                  name="ipt5"
                  label=" 联系电话"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 单位地址!",
                    },
                  ]}
                >
                  <Input placeholder="单位地址" />
                </Form.Item>
                <Form.Item
                  name="ipt6"
                  label="企业简称"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 企业简称!",
                    },
                  ]}
                >
                  <Input placeholder=" 森佳科技 " />
                </Form.Item>
                <Form.Item
                  name="ipt7"
                  label="联系电话"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 企业简称!",
                    },
                  ]}
                >
                  <Input placeholder="13888888888" />
                </Form.Item>

                <Form.Item
                  name="ipt7"
                  label="提货开始时间"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 企业简称!",
                    },
                  ]}
                >
                  <Input placeholder=" 现金价格/外汇/转账 " />
                </Form.Item>
                {/* colon 取消冒号 ： */}
                <Form.Item name="ipt7" label=" " colon={false}>
                  <Button
                    type="danger"
                    style={{background:'#fd5920', color:'#fff4f2' ,fontSize:'8px',borderRadius:'5px'}}
                    onClick={
                      this.handleClick
                    }
                  >
                    确认修改
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col pull={2} span={14}>
              <Form
                labelCol={{ span: 8 }} // 控制表格左部大小的越大  空间越大
                //  wrapperCol= {{ span: 8 }}// 表单布局 input 的长短
                layout="horizontal"
                size="small"
                // labelCol={{span:6}} // 布局
                ref="form" //拿到组件对象
              >
                <Form.Item
                  name="ipt4"
                  label="联系人"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 负责人!",
                    },
                  ]}
                >
                  <Input placeholder="王杰" />
                </Form.Item>
                <Form.Item
                  name="ipt5"
                  label=" 备注"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 单位地址!",
                    },
                  ]}
                >
                  <Input placeholder="单位地址" />
                </Form.Item>
                <Form.Item
                  name="ipt6"
                  label="价格一"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 企业简称!",
                    },
                  ]}
                >
                  <Input placeholder=" 森佳科技 " />
                  <Button onClick={this.addClick} htmlType="button" style={{ borderRadius:'2px',color:'#d7e4ff' ,background:'#3c7fff',padding : '0px',fontSize:'8px',width:'60px',marginLeft:'5px'}}  size="small" >
                     + 添加报价
                  </Button>
              
                </Form.Item>
                <Form.Item
                  name="ipt7"
                  label="价格二"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 企业简称!",
                    },
                  ]}
                >
                  <Input placeholder="13888888888" />
                  <Button onClick={this.deleClick} style={{marginLeft:'5px',}} size='small' icon={<MinusOutlined />} type="danger" shape="circle"  /> 
                </Form.Item>
                <Form.Item
                  name="ipt7"
                  label="提货结束日期"
                  rules={[
                    {
                      required: false,
                      message: "Please input your 企业简称!",
                    },
                  ]}
                >
                  <Input placeholder=" 现金价格/外汇/转账 " />
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Row gutter={[24, 4]}>
            <Col span={12}></Col>
          </Row>
        </Modal>
      </div>
    );
  }
  // 1 搜集数据 2 关闭模态框 3 把数据发送到后端数据库 post 发送 4 完成跳转 
  handleClick = () => {

          // 1. 校验表单内容，2. 获取表单value 3.隐藏modal
          this.refs.form
          .validateFields()
          .then(values => {
              console.log(values)
              // this.refs.form.resetFields(); //重置表单
              // this.renderTable(values)
          })
          .catch(info => {
              console.log('Validate Failed:', info);
          });

    this.setState({
      mtIsshow: false,
    },()=>{
      message.success('修改成功！');
    });
  }
  // 点击取消按钮
  deleClick=()=>{console.log('点击减少的事件')}
  // 点击增加按钮 
  addClick=()=>{console.log('点击增加的事件')}
}
