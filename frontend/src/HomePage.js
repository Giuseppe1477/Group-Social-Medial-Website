
import * as constants from './const.js';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player"
import ListPosts from './ListPosts.js';
import Profile from "./Profile.js";
import Post from './Post.js';
import Services from "./Services";
import "./index.css"


const HomePage = props => {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        Services.list_posts({
            // user_id:props.user_id
            user_id: ""
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    },[]);

    let playerUrl = "https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata"


    return (
        <div class="homeColumn">

            { ReactPlayer.canPlay(playerUrl) ?
              <div class="soundcloudPlayer">
                <ReactPlayer
                  url={playerUrl}
                  width={'100%'}
                  height={"100px"}
                />
              </div>
              : null }

            <div>
            { posts && <ListPosts user_id={props.user_id} posts={posts} is_admin={props.is_admin} getPost={props.getPost}/> }

            </div>
        </div>
    )
}

export default HomePage;
