import { Button, message, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { searchGameByName } from '../../utils'

function Search(props) {
    const[displayModal, setDisplayModal] = useState(false);
    const { onSuccess } = props;

    const handleCancle = () => {
        setDisplayModal(false)
    }

    const searchOnClick = () => {
        setDisplayModal(true)
    }

    const onSubmit = (data) => {
        searchGameByName(data.game_name)
            .then((data) => {
                setDisplayModal(false);
                onSuccess(data);
            })
            .catch((err)=>{
                message.error(err.message)
            })
    }

    return (
        <>
            <Button
                shape='round'
                onClick={searchOnClick}
                icon={<SearchOutlined/>}
                style={{ marginRight: '20px', marginTop: '20px'}}
            >
                <b>  Search</b>
            </Button>
            <Modal
                title="Search"
                visible={displayModal}
                onCancel={handleCancle}
                footer={null}
            >
                <Form
                    name='search_form'
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name="game_name"
                        rules={[{ required: true, message: 'Please enter a game name' }]}
                    >
                        <Input placeholder='Game name'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            <b>Search</b>
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>  
    );
}

export default Search;