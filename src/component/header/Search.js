import { message, Input } from 'antd';
import React from 'react';
import { searchGameByName } from '../../utils'

function Search(props) {
    const { onSuccess } = props;

    const onSubmit = (data) => {
        searchGameByName(data)
            .then((data) => {
                onSuccess(data);
            })
            .catch((err)=>{
                message.error(err.message)
            })
    }

    return (
        <>
            <Input.Search className="search-bar"  placeholder="Search" onSearch={onSubmit} enterButton />
        </>  
    );
}

export default Search;