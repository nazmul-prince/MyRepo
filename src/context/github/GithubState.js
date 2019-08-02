import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import {
    SERARCH_USERS,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
    SET_LOADING
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) =>  {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    //Search Users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`);
    
        // setUsers(res.data.items);
        dispatch({
            type: SERARCH_USERS,
            payload: res.data.items
        });
      };

    //Get user
    const getUser = async userName => {
        setLoading();
    
        const res = await axios.get(
          `https://api.github.com/users/${userName}?client_id=${githubClientId}
          &client_secret=${githubClientSecret}`
        );
    
        // setUser(res.data);
        // setLoading(false);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
      };

    //Get repos
    const getUserRepos = async userName => {
        setLoading();
    
        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
        &client_secret=${githubClientSecret}`);
    
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      };

  //Clear github users
    const clearUsers = () => dispatch({type: CLEAR_USERS});

    //Set loading
    const setLoading = () => dispatch({ type: SET_LOADING});

    return (<GitHubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GitHubContext.Provider>)
};

export default GithubState;