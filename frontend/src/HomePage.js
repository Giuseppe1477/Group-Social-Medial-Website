import React from "react";
import Post from "./Post.js";
import Profile from "./Profile.js";


const HomePage = props => {

    return <div>
        <div>
            {/* <div>Welcome {props.isAdmin ? 'Admin' : 'User'}</div> */}
            <Profile/>
            <Post/>
            <Post/>
        </div>
    </div>

}

export default HomePage;