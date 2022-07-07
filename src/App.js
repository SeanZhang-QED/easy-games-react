import React, { useState, useEffect } from 'react';
import { Layout, message, Menu } from 'antd';
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import { logout, getFavoriteItem, getTopGames, searchGameById, getRecommendations } from './utils';
import AppHeader from './component/AppHeader';
import AppHome from './component/AppHome'
import { Footer } from 'antd/lib/layout/layout';
import AppFooter from './component/AppFooter';

const { Header, Content, Sider } = Layout;
 
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
    getTopGames()
      .then((data) => {
        setTopGames(data)
      }).catch((err) => {
        message.error(err.message)
      })
  }, [])

  const signinOnSuccess = () => {
    setLoggedIn(true);
    getFavoriteItem()
            .then((data) => {
                const { VIDEO, STREAM, CLIP } = data;
                if(typeof VIDEO === "undefined") {
                    data.VIDEO = [];
                }
                if(typeof STREAM === "undefined") {
                    data.STREAM = [];
                }
                if(typeof CLIP === "undefined") {
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
    if(key === 'recommendation') {
      getRecommendations().then((data) => {
        setResources(data);
        message.success("Successfully get the things may intrest U.")
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
          if(typeof VIDEO === "undefined") {
              data.VIDEO = [];
          }
          if(typeof STREAM === "undefined") {
              data.STREAM = [];
          }
          if(typeof CLIP === "undefined") {
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
    <Layout>
      <Header 
      >
        <AppHeader
          loggedIn={loggedIn}
          signoutOnClick={signoutOnClick}
          signinOnSuccess={signinOnSuccess}
          searchOnSuccess={searchOnSuccess}
          favoriteItems={favoriteItems}
        />
      </Header>
      <Layout>
        <Sider 
          width={300} 
          style={{
            backgroundColor: 'lightgray',
          }}
        >
          <Menu
            mode="inline"
            className='site-top-game-list'
            style={{marginTop: '25px'}}
            onSelect={onGameSelect}
            items={mapTopGamesToProps(topGames)}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 975,
              borderRadius: 6,
              overflow: 'auto'
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
        className='site-layout-background'
      >
        <AppFooter />
      </Footer>
    </Layout>
  )
}
 
export default App;
