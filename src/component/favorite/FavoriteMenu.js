import React, { Component } from 'react';
import { Button, Drawer, Menu } from 'antd'
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, StarFilled } from '@ant-design/icons';
import MenuItem from './MenuItem';

class FavoriteMenu extends Component {
    state = {
        displayDrawer: false,
    }

    onFavoriteClick = () => {
        this.setState({
            displayDrawer: true
        })
    }

    onDrawerClose = () => {
        this.setState({
            displayDrawer: false
        })
    }

    render() {
        // console.log(this.props.favoriteItems);
        const { VIDEO, STREAM, CLIP } = this.props.favoriteItems;
        return (
            <>
                <Button
                    type='primary' shape='round'
                    onClick={this.onFavoriteClick}
                    icon={<StarFilled />}
                >
                    <b>  Following</b>
                </Button>
                <Drawer
                    title='My Favorites'
                    placement='right'
                    width={500}
                    visible={this.state.displayDrawer}
                    onClose={this.onDrawerClose}
                >
                    <Menu
                        mode='inline'
                        defaultOpenKeys={['streams']}
                        style={{ height: '100%', borderRight: 0 }}
                        selectable={false}
                    >
                        <Menu.SubMenu key={'streams'} icon={<EyeOutlined />} title="Streams">
                            <MenuItem items={STREAM} />
                        </Menu.SubMenu>
                        <Menu.SubMenu key={'videos'} icon={<YoutubeOutlined />} title="Videos">
                            <MenuItem items={VIDEO} />
                        </Menu.SubMenu>
                        <Menu.SubMenu key={'clips'} icon={<VideoCameraOutlined />} title="Clips">
                            <MenuItem items={CLIP} />
                        </Menu.SubMenu>
                    </Menu>
                </Drawer>
            </>
        );
    }
}

export default FavoriteMenu;