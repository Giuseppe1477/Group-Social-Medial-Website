import * as constants from './const.js';
import { useState, useEffect } from "react";
import ListPosts from './ListPosts.js';
import Profile from "./Profile.js";
import Post from './Post.js';

const HomePage = props => {
    const[posts,setPosts] = useState([]);

    useEffect(() => {
        fetch(constants.BASE_URL + 'list_posts',{
        method: 'POST',
        mode: 'cors',
        cache: 'force-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            user_id: props.user_id,
        })
        })
        .then(res => {
        if(!res.ok)
            throw Error("Error");
        return res;
        })
        .then(res  => res.json())
        .then(res => {
            console.log(res);
            setPosts(res.posts);
            return res;
        })
        .catch((err) => {
            console.error(err);
        });
    },[]);

    return (
        <div>
            <div>
                <Profile user_id={props.user_id} viewer_id={props.viewer_id}/>
            {/* <div>Welcome {props.isAdmin ? 'Admin' : 'User'}</div> */}
            {posts &&
                <div>
                    {/* <Profile user_id={props.user_id} viewer_id={props.viewer_id}/> */}
                    {/* <ListPosts post_id={posts}/> */}
                    {posts.map(
                        p => <Post post_id={p.post_id} text={p.text}/>
                    )}
                </div>
            }
            
            {/* <RichTextEditor user_id={props.user_id}/> */}
            
            </div>
        </div>
    )
}

export default HomePage;