import React from 'react';
import Signup from './Signup'
import Login from './Login'
import {Layout, Row, Col, Button } from 'antd'
const {Header} = Layout;


function AppHeader({ loggedIn, signoutOnClick, signinOnSuccess }) {
    return (
        <Header className="site-layout-background">
            <Row justify='space-between'>
                <Col>
                {'Favorites'}
                </Col>
                <Col>
                {loggedIn && <Button shape="round" onClick={signoutOnClick}>Logout</Button>}
                {!loggedIn && (
                    <>
                    <Login onSuccess={signinOnSuccess} />
                    <Signup />
                    </>
                )}
                </Col>
            </Row>
        </Header>
    );
}

export default AppHeader;