import React, { userReducer } from 'react';
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

    const [state, dispatch] = userReducer(GitHubReducer, initialState);

    //Search Users

    //Get users

    //Get repos

    //Clear users

    //Set loading

    return (<GitHubContext.Provider
        // value={{
        //     users: state.users,
        //     user: state.user,
        //     repos: state.repos,
        //     loading: state.loading
        // }}
    >
        {props.children}
    </GitHubContext.Provider>)
};

export default GithubState;