import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InputBox from './InputBox.js';
import HomePage from './HomePage.js';
import Navig from './Navig.js';
import Post from './Post.js';
import PostDetails from './PostDetails.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const getOutput = output => {
        setIsAdmin(output.admin);
        setIsLoggedIn(output.logged_in);
    }

    if(!isLoggedIn){
        return <InputBox getOutput={getOutput}/>
    }

    return (
        <Router>
            <div className="App">
                <Navig/>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <HomePage isAdmin = {isAdmin}/>
                        </Route>
                        <Route exact path="/posts">
                            <Post/>
                            <Post/>
                            <Post/>
                        </Route>
                        <Route path="/posts/:id">
                            <PostDetails/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
