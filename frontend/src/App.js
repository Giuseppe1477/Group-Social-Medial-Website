import React, { useState } from 'react';
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';
import InputBox from './InputBox.js';
import HomePage from './HomePage.js';
import Navig from './Navig.js';
import Post from './Post.js';
import PostDetails from './PostDetails.js';
import ProfilePage from "./ProfilePage";
import CreatePost from './CreatePost.js';
import Chat from './Chat.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import Admin from './Admin.js';
import Search from './Search.js';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [data, setData] = useState({user_id:"", is_admin:false});

    const setAuth = authData => {
        console.log('user info:', authData);
        const {
            user_id,
            is_admin,
            logged_in
        } = authData;
        setData({
            user_id, is_admin
        });
        setIsLoggedIn(Boolean(logged_in));
    }

    if(!isLoggedIn){
        return <InputBox setAuth={setAuth}/>
    }

    return (
        <HashRouter>
            <div className="App">
                <Navig isAdmin = {data.is_admin}/>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <HomePage isAdmin={data.is_admin} user_id={data.user_id}/>
                        </Route>
                        <Route exact path="/profile">
                            <ProfilePage user_id={data.user_id}/>
                        </Route>
                        <Route path="/posts/:id">
                            <PostDetails user_id={data.user_id}/>
                        </Route>
                        <Route exact path="/user/:id">
                            <HomePage user_id={data.user_id}/>
                        </Route>
                        <Route exact path="/create">
                            <CreatePost user_id={data.user_id}/>
                        </Route>
                        <Route exact path="/chat">
                            <Chat user_id={data.user_id}/>
                        </Route>
                        <Route exact path="/admin">
                            {data.is_admin ? (<Admin/>):(<h1>You do not have access to this page.</h1>)}
                        </Route>
                        <Route path="/search">
                            <Search/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </HashRouter>

    );
}

export default App;
