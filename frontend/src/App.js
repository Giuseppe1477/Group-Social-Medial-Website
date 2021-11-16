import React, { useState } from 'react';
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';
import InputBox from './InputBox.js';
import HomePage from './HomePage.js';
import Navig from './Navig.js';
import PostDetails from './PostDetails.js';
import ProfilePage from "./ProfilePage";
import CreatePost from './CreatePost.js';
import Chat from './Chat.js'
import Spotify from './Spotify';
import SpotifySettings from './SpotifySettings'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import Admin from './Admin.js';
import Search from './Search.js';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [data, setData] = useState({user_id:"", is_admin:false, playlistURI:"", trackURI:"", artistURI:""});
    const [post, setPostData] = useState({user_poster_id:"", text:""});
    const [recipient, setRecipient] = useState("")

    const setAuth = authData => {
        console.log('user info:', authData);
        const {
            user_id,
            is_admin,
            playlistURI,
            trackURI,
            artistURI,
            logged_in
        } = authData;
        setData({
            user_id, is_admin, playlistURI, trackURI, artistURI
        });
        setIsLoggedIn(Boolean(logged_in));
        window.localStorage.setItem('authData', JSON.stringify({
          user_id,
          is_admin,
          logged_in
        }));
    }

    const logout = () => {
      console.log('logging out')
      window.localStorage.clear()
      setAuth({user_id: '', is_admin: false, logged_in: false})
    }

    const getPost = postData => {
        setPostData(postData);
    }


    if (!isLoggedIn) {
        let authData = JSON.parse(window.localStorage.getItem('authData'))
        if (!authData?.logged_in) {
          console.log('You are not logged in. Back to Login')
          return <InputBox setAuth={setAuth} />
        } else {
          console.log('Using Cached Creds')
          setAuth(authData)
        }
    }

    return (
        <HashRouter>
            <div className="App">
                <Navig
                  isAdmin = {data.is_admin}
                  user_id = {data.user_id}
                  logout = {logout}
                />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <HomePage isAdmin={data.is_admin} user_id={data.user_id} is_admin={data.is_admin} getPost={getPost}/>
                        </Route>
                        <Route exact path="/profile/:id">
                            <ProfilePage is_admin={data.is_admin} viewer_id={data.user_id} getPost={getPost} setRecipient={setRecipient} playlistURI={data.playlistURI} trackURI={data.trackURI} artistURI={data.artistURI}/>
                        </Route>
                        <Route exact path="/posts/:id">
                            <PostDetails
                              user_id={data.user_id} user_poster_id={post.user_poster_id} text={post.text}
                            />
                        </Route>
                        <Route exact path="/create">
                            <CreatePost user_id={data.user_id}/>
                        </Route>
                        <Route exact path="/chat">
                            <Chat user_id={data.user_id} user_recipient_id={recipient}/>
                        </Route>
                        <Route exact path="/admin">
                            {data.is_admin ? (<Admin/>):(<h1>You do not have access to this page.</h1>)}
                        </Route>
                        <Route exact path="/search">
                            <Search setRecipient={setRecipient} viewer_id={data.user_id}/>
                        </Route>
                        <Route exact path="/spotify">
                            <Spotify user_id={data.user_id} playlistURI={data.playlistURI} trackURI={data.trackURI} artistURI={data.artistURI}/>
                        </Route>
                        <Route exact path="/spotify-settings">
                            <SpotifySettings user_id={data.user_id} playlistURI={data.playlistURI} trackURI={data.trackURI} artistURI={data.artistURI}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </HashRouter>

    );
}

export default App;
