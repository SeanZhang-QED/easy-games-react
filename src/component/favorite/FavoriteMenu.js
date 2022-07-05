import React, { Component } from 'react';
import { getFavoriteItem } from '../../utils';
import { message, Button, Drawer, Menu } from 'antd'
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, StarFilled } from '@ant-design/icons';
import MenuItem from './MenuItem';

const { SubMenu } = Menu;

class FavoriteMenu extends Component {
    state = {
        displayDrawer: false,
        data: {
            VIDEO: [],
            STREAM: [],
            CLIP: []
        }
    }

    onDrawerClose = () => {
        this.setState({
            displayDrawer: false
        })
    }

    onFavoriteClick = () => {
        getFavoriteItem()
            .then((data) => {
                const { VEDIO, STREAM, CLIP } = data;
                if(typeof VEDIO === "undefined") {
                    data.VEDIO = [];
                }
                if(typeof STREAM === "undefined") {
                    data.STREAM = [];
                }
                if(typeof CLIP === "undefined") {
                    data.CLIP = [];
                }
                this.setState({
                    displayDrawer: true,
                    data,
                });
                console.log(data)
            })
            .catch((err) => {
                message.error(err.message)
            })
    }

    render() {
        const { VEDIO, STREAM, CLIP } = this.state.data;
        return (
            <>
                <Button
                    type='primary' shape='round'
                    onClick={this.onFavoriteClick}
                    icon={<StarFilled />}
                >
                    <b>My Favorite</b>
                </Button>
                <Drawer
                    title='My Favorites'
                    placement='right'
                    width={720}
                    visible={this.state.displayDrawer}
                    onClose={this.onDrawerClose}
                >
                    <Menu
                        mode='inline'
                        defaultOpenKeys={['streams']}
                        style={{ height: '100%', borderRight: 0 }}
                        selectable={false}
                    >
                        <SubMenu key={'streams'} icon={<EyeOutlined />} title="Streams">
                            <MenuItem items={STREAM} />
                        </SubMenu>
                        <SubMenu key={'videos'} icon={<YoutubeOutlined />} title="Videos">
                            <MenuItem items={VEDIO} />
                        </SubMenu>
                        <SubMenu key={'clips'} icon={<VideoCameraOutlined />} title="Clips">
                            <MenuItem items={CLIP} />
                        </SubMenu>
                    </Menu>
                </Drawer>
            </>
        );
    }
}

export default FavoriteMenu;