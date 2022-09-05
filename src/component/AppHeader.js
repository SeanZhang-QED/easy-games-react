import React from 'react';
import Signup from './header/Signup'
import Login from './header/Login'
import { Layout, Row, Col, Button } from 'antd'
import FavoriteMenu from './favorite/FavoriteMenu';
import Search from './header/Search';

const { Header } = Layout;

function AppHeader(props) {
    const { loggedIn, signoutOnClick, signinOnSuccess } = props;
    const { favoriteItems, searchOnSuccess } = props;

    return (
        <Header >
            <Row justify='space-between'>
                <Col style={{ display: 'flex', alignItems: 'center'}}>
                    <svg t="1662365428617" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2362" width="40px" height="40px"><path d="M734.378667 890.197333H534.357333L400.896 1024H267.093333v-133.802667H22.357333V178.176L89.258667 0h912.384v623.274667l-267.264 266.922666z m178.176-311.296V89.088H178.005333v645.461333h200.362667v133.461334l133.461333-133.461334h244.736l155.989334-155.648z" fill="#65459B" p-id="2363"></path><path d="M667.818667 267.264v267.264h89.088V267.264h-89.088z m-244.736 266.922667h89.088V267.264h-89.088v266.922667z" fill="#65459B" p-id="2364"></path></svg>
                </Col>
                <Col>
                    {loggedIn && <FavoriteMenu favoriteItems={favoriteItems} />}
                </Col>
                <Col>
                    <Search onSuccess={searchOnSuccess} />
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