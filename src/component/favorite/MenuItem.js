import React, { Component } from 'react';
import { Menu } from 'antd';

const renderTitle = (item) => {
    let name;
    if(typeof item.broadcaster_name !== "undefined") {
        name = `${item.broadcaster_name}`
    } else {
        name = `${item.user_name}`
    }

    return(
        <>{`${name} - ${item.title}`}</>
    )
}

class MenuItem extends Component {
    render() {
        return (
        <>
            {
                this.props.items.map((item) => (
                    <Menu.Item key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {renderTitle(item)}
                        </a>
                    </Menu.Item>
                ))
            }
        </>
        );
    }
}

export default MenuItem;