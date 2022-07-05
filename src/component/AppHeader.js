import React from 'react';
import Signup from './header/Signup'
import Login from './header/Login'
import {Layout, Row, Col, Button } from 'antd'
import FavoriteMenu from './favorite/FavoriteMenu';

const {Header} = Layout;

function AppHeader(props) {
    const { loggedIn, signoutOnClick, signinOnSuccess } = props;
    return (
        <Header className="site-layout-background">
            <Row justify='space-between'>
                <Col>
                {loggedIn && <FavoriteMenu />}
                </Col>
                <Col>
                {loggedIn && <Button shape="round" onClick={signoutOnClick}><b>Log out</b></Button>}
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