import { Button, Form, Input, message, Modal } from 'antd'
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../../utils'
 
function Login({ onSuccess }) {
  const [displayModal, setDisplayModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
 
  const handleCancel = () => {
    setDisplayModal(false)
  }
 
  const signinOnClick = () => {
    setDisplayModal(true)
  }
 
  const onFinish = (data) => {
    setIsLoading(true)
    login(data)
      .then((data) => {
        setDisplayModal(false)
        message.success(`Welcome back, ${data.name}`)
        onSuccess()
      }).catch((err) => {
        message.error(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }
 
  return (
    <>
      <Button 
        onClick={signinOnClick} 
        style={{ marginRight: '20px'}}
        >
        <b>Login</b>
      </Button>
      <Modal
        title="Sign in with Ur Email"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_login"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username(Email)" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              <b>Login</b>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
 
export default Login
