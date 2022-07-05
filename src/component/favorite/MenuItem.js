import React, { Component } from 'react';
import { Menu } from 'antd';

class MenuItem extends Component {
    render() {
        return (
        <>
            {
                this.props.items.map((item) => (
                    <Menu.Item key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {`${item.broadcaster_name} - ${item.title}`}
                        </a>
                    </Menu.Item>
                ))
            }
        </>
        );
    }
}

export default MenuItem;