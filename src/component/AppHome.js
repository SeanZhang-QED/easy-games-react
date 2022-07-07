import React from 'react';
import { Button, Card, List, Tabs, Tooltip, message } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { deleteFavoriteItem, addFavoriteItem } from '../utils';
 
const { TabPane } = Tabs;

const tabKeys = {
  Streams: 'stream',
  Videos: 'videos',
  Clips: 'clips',
}
 
const processUrl = (item) => {
    if(item.item_type === "STREAM") {
        return item.thumbnail_url
        .replace('%{height}', '252')
        .replace('%{width}', '480')
        .replace('{height}', '252')
        .replace('{width}', '480');
    }
    return item.thumbnail_url
}
 
const renderCardTitle = (item, loggedIn, favs, favOnChange) => {
    let name;
    if(typeof item.broadcaster_name !== "undefined") {
        name = `${item.broadcaster_name}`
    } else {
        name = `${item.user_name}`
    }
    const title = `${name} - ${item.title}`;
    
    // console.log(favs)

    let isFav
    if (typeof favs === 'undefined' || favs.length == 0) {
      isFav = undefined
    } else {
      isFav = favs.find((fav) => fav.id === item.id)
    }

    const favOnClick = () => {
        if (isFav) {
          deleteFavoriteItem(item).then(() => {
            message.success("Unfollowed.")
            favOnChange();
          }).catch(err => {
            message.error(err.message)
          })
          return;
        }
        addFavoriteItem(item).then(() => {
          message.success("Following.")
          favOnChange();
        }).catch(err => {
          message.error(err.message)
        })
    }

    return (
        <>
          {
            loggedIn &&
            <Tooltip title={isFav ? "Remove from favorite list" : "Add to favorite list"}>
              <Button shape="circle" icon={isFav ? <StarFilled /> : <StarOutlined />} onClick={favOnClick} />
            </Tooltip>
          }
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 450 }}>
            <Tooltip title={title}>
              <span>{title}</span>
            </Tooltip>
          </div>
        </>
    )
}
 
const renderCardGrid = (data, loggedIn, favs, favOnChange) => {
  return (
    <List
      grid={{ }}
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ marginRight: '20px' }}>
          <Card
            title={renderCardTitle(item, loggedIn, favs, favOnChange)}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                alt="Placeholder"
                src={processUrl(item)}
              />
            </a>
          </Card>
        </List.Item>
      )}
    />
  )
}
 
const AppHome = ({ resources, loggedIn, favoriteItems, favoriteOnChange }) => {
  const { VIDEO, STREAM, CLIP } = resources;
  const { VIDEO: favVideos, STREAM: favStreams, CLIP: favClips } = favoriteItems;
 
  return (
    <Tabs
      defaultActiveKey={tabKeys.Streams}
    >
      <TabPane tab="Streams" key={tabKeys.Streams} style={{ height: '850px', overflow: 'auto' }} forceRender={true}>
        {renderCardGrid(STREAM, loggedIn, favStreams, favoriteOnChange)}
      </TabPane>
      <TabPane tab="Videos" key={tabKeys.Videos} style={{ height: '850px', overflow: 'auto' }} forceRender={true}>
        {renderCardGrid(VIDEO, loggedIn, favVideos, favoriteOnChange)}
      </TabPane>
      <TabPane tab="Clips" key={tabKeys.Clips} style={{ height: '850px', overflow: 'auto' }} forceRender={true}>
        {renderCardGrid(CLIP, loggedIn, favClips, favoriteOnChange)}
      </TabPane>
    </Tabs>
  );
}
 
export default AppHome;