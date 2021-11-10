
import * as constants from './const.js';
import { useState, useEffect } from "react";
import ListPosts from './ListPosts.js';
import Profile from "./Profile.js";
import Post from './Post.js';
import Services from "./Services";

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

    //console.log(props.is_admin)

    return (
        <div>
            <div>
            { posts && <ListPosts user_id={props.user_id} posts={posts} is_admin={props.is_admin} getPost={props.getPost}/> }

            </div>
        </div>
    )
}

export default HomePage;