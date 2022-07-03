import React, { useState } from 'react';
import { Layout, message } from 'antd';
import { logout } from './utils';
import AppHeader from './component/AppHeader';

const { Header, Content, Sider } = Layout;
 
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
 
  const signinOnSuccess = () => {
    setLoggedIn(true);
  }
 
  const signoutOnClick = () => {
    logout().then(() => {
      setLoggedIn(false)
      message.success('Successfully Signed out')
    }).catch((err) => {
      message.error(err.message)
    })
  }

  return (
    <Layout>
      <Header 
        className="site-layout-background"
      >
        <AppHeader
          loggedIn={loggedIn}
          signoutOnClick={signoutOnClick}
          signinOnSuccess={signinOnSuccess}
        />
      </Header>
      <Layout>
        <Sider 
          width={300} 
          style={{
            backgroundColor: 'lightgray'
          }}
        >
          {'Sider'}
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              borderRadius: 6,
              overflow: 'auto'
            }}
          >
            {'Home'}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
 
export default App;
