import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import {
    SERARCH_USERS,
    CLEAR_USERS,
    GET_REPOS,
    GET_USERS,
    REMOVE_ALERT,
    SET_ALERT,
    SET_LOADING
} from '../types';

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
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
        // setUsers(res.data.items);
        dispatch({
            type: SERARCH_USERS,
            payload: res.data.items
        });
      };

    //Get users

    //Get repos

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
            searchUsers, clearUsers
        }}
    >
        {props.children}
    </GitHubContext.Provider>)
};

export default GithubState;