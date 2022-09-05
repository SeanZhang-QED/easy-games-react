// const SERVER_ORIGIN = 'http://13.59.49.252:8080';
const SERVER_ORIGIN = '';
 
// Login API
const loginUrl = `${SERVER_ORIGIN}/login`;
export const login = (credential) => {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credential)
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to log in');
    }
    return response.json(); // {"email": "xx", "name": "xxx"}
  })
}
 
// Signup API
const registerUrl = `${SERVER_ORIGIN}/signup`;
export const register = (data) => {
  return fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status !== 201) {
      throw Error('Fail to sign up');
    }
  })
}
 
// Logout API
const logoutUrl = `${SERVER_ORIGIN}/logout`;
export const logout = () => {
  return fetch(logoutUrl, {
    method: 'POST',
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to log out');
    }
  })
}
 
// Get Top games API
const topGamesUrl = `${SERVER_ORIGIN}/game`;
export const getTopGames = () => {
  return fetch(topGamesUrl).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get top games');
    }
    return response.json();
  })
}
 
// Get game br game_name
const getGameDetailsUrl = `${SERVER_ORIGIN}/game?game_name=`;
const getGameDetails = (gameName) => {
  return fetch(`${getGameDetailsUrl}${gameName}`).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to search the game by its name');
    }
    return response.json();
  });
}

// Get items(stream/video/clip) by game_id
const searchGameByIdUrl = `${SERVER_ORIGIN}/search?game_id=`;
export const searchGameById = (gameId) => {
  return fetch(`${searchGameByIdUrl}${gameId}`).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to find items of the game by game id');
    }
    return response.json();
  })
}
 
export const searchGameByName = (gameName) => {
  return getGameDetails(gameName).then((data) => {
    // console.log(data[0]);
    if (data[0] && data[0].id) {
      return searchGameById(data[0].id);
    }
    throw Error('Fail to find the game')
  })
}
 
// Add favorite item API
const favoriteItemUrl = `${SERVER_ORIGIN}/favorite`;
export const addFavoriteItem = (favItem) => {
  return fetch(favoriteItemUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: favItem })
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to add favorite item');
    }
  })
}

// Delete favorite item API
export const deleteFavoriteItem = (favItem) => {
  return fetch(favoriteItemUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: favItem })
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to delete favorite item');
    }
  })
}

// Get all favorite items API
export const getFavoriteItem = () => {
  return fetch(favoriteItemUrl, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get favorite item');
    }
 
    return response.json();
  })
}

// Get recommendations API
const getRecommendedItemsUrl = `${SERVER_ORIGIN}/recommendation`;
export const getRecommendations = (isLoggedIn) => {

  if(isLoggedIn) {
    return fetch(getRecommendedItemsUrl, {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        throw Error('Fail to get recommended item');
      }
      return response.json();
    })
  }
  return fetch(getRecommendedItemsUrl, {
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get recommended item');
    }
    return response.json();
  })
}


export const get_cookie = (name) => {
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(name + '=');
  })
}

export const delete_cookie = ( name, path, domain ) => {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      // ((path) ? ";path="+path:"")+
      // ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}