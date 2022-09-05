import React, { useState, useEffect } from 'react';
import { Layout, message, Menu } from 'antd';
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import { logout, getFavoriteItem, getTopGames, searchGameById, getRecommendations, delete_cookie } from './utils';
import AppHeader from './component/AppHeader';
import AppHome from './component/AppHome'
import { Footer } from 'antd/lib/layout/layout';
import AppFooter from './component/AppFooter';

const { Content, Sider } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([{
    VIDEO: [],
    STREAM: [],
    CLIP: [],
  }]);
  const [topGames, setTopGames] = useState([])
  const [resources, setResources] = useState({
    VIDEO: [],
    STREAM: [],
    CLIP: [],
  });

  useEffect(() => {
    delete_cookie('sessionId');
    getRecommendations().then((data) => {
      setResources(data);
    }).catch((err) => {
      message.error("Something wrong happened: ", err.message);
    })
    getTopGames()
      .then((data) => {
        setTopGames(data)
      }).catch((err) => {
        message.error(err.message)
      });
  }, [])

  const signinOnSuccess = () => {
    setLoggedIn(true);
    getFavoriteItem()
      .then((data) => {
        const { VIDEO, STREAM, CLIP } = data;
        if (typeof VIDEO === "undefined") {
          data.VIDEO = [];
        }
        if (typeof STREAM === "undefined") {
          data.STREAM = [];
        }
        if (typeof CLIP === "undefined") {
          data.CLIP = [];
        }
        setFavoriteItems(data);
        // console.log(data)
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  const signoutOnClick = () => {
    logout().then(() => {
      setLoggedIn(false)
      message.success('Successfully Signed out')
    }).catch((err) => {
      message.error(err.message)
    })
  }

  const searchOnSuccess = (data) => {
    setResources(data);
  }

  const onGameSelect = ({ key }) => {
    if (key === 'recommendation') {
      getRecommendations().then((data) => {
        setResources(data);
        message.success("Something that we think you'll like.")
      })
      return
    }
    searchGameById(key).then((data) => {
      setResources(data);
      message.success("Successfully Loaded.")
    });
  };

  const favoriteOnChange = () => {
    getFavoriteItem()
      .then((data) => {
        const { VIDEO, STREAM, CLIP } = data;
        if (typeof VIDEO === "undefined") {
          data.VIDEO = [];
        }
        if (typeof STREAM === "undefined") {
          data.STREAM = [];
        }
        if (typeof CLIP === "undefined") {
          data.CLIP = [];
        }
        setFavoriteItems(data);
        // console.log(data)
      })
      .catch((err) => {
        message.error(err.message)
      })
  };

  const mapTopGamesToProps = (topGames) => [
    {
      label: "Recommend for you!",
      key: "recommendation",
      icon: <LikeOutlined />,
    },
    {
      label: "Popular Games",
      key: "popular_games",
      icon: <FireOutlined />,
      children: topGames.map((game) => ({
        label: game.name,
        key: game.id,
        icon:
          <img
            alt="placeholder"
            src={game.box_art_url.replace('{height}', '40').replace('{width}', '40')}
            style={{ borderRadius: '50%', marginRight: '20px' }}
          />
      }))
    }
  ]


  return (
    <Layout style={{ minWidth:'800px' }}>
      <AppHeader
        loggedIn={loggedIn}
        signoutOnClick={signoutOnClick}
        signinOnSuccess={signinOnSuccess}
        searchOnSuccess={searchOnSuccess}
        favoriteItems={favoriteItems}
      />
      <Layout style={{ paddingTop: 64, paddingBottom: 50 }}>
        <Sider
          width={300}
        >
          <Menu
            mode="inline"
            style={{ height: '100%', position: 'fixed', left: 0, top: 64, width: 300 }}
            onSelect={onGameSelect}
            items={mapTopGamesToProps(topGames)}
            defaultSelectedKeys={["recommendation"]}
            defaultOpenKeys={['popular_games']}
          />
        </Sider>
        <Layout style={{ minWidth:'500px' }} >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              overflow: 'auto',
              borderRadius: 6,
              height: '100%',
            }}
          >
            <AppHome
              resources={resources}
              loggedIn={loggedIn}
              favoriteItems={favoriteItems}
              favoriteOnChange={favoriteOnChange}
            />
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          position: 'fixed',
          left: '0',
          bottom: '0',
          width: '100%'
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  )
}

export default App;
