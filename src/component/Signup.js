import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register } from '../utils';
 
function Signup() {
  const [displayModal, setDisplayModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
 
  const handleCancel = () => {
    setDisplayModal(false)
  }
 
  const signupOnClick = () => {
    setDisplayModal(true)
  }
 
  const onFinish = (data) => {
    console.log(data)
    setIsLoading(true)
    register(data)
      .then(() => {
        setDisplayModal(false)
        message.success('Successfully signed up');
      }).catch((err) => {
        message.error(err.message);
      }).finally(()=>{
        setIsLoading(false)
      })
  }
 
  return (
    <>
      <Button 
        type="primary"
        style={{background: "#9147ff", borderColor: "#9147ff"}} 
        onClick={signupOnClick}
      >
        <b>Sign Up</b>
      </Button>
      <Modal
        title="Sign Up and Enjoy"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email(username)!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Please input your Firstname!' }]}
          >
            <Input
              placeholder="firstname"
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your Lastname!' }]}
          >
            <Input
              placeholder="lastname"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
 
export default Signup;
