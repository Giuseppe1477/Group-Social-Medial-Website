
import * as constants from './const.js';
import { useState, useEffect } from "react";
import ListPosts from './ListPosts.js';
import Profile from "./Profile.js";
import Post from './Post.js';
import Services from "./Services";


const HomePage = props => {

    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Services.list_posts({})
            .then(r => setPosts(r.posts))
            .then(() => setIsLoading(false))
            .catch(err => console.log(err));
    },[]);

    return (
        <div>
            <div>
            { isLoading ?
                <div>
                    Loading...
                </div>
                :
                <ListPosts user_id={props.user_id} posts={posts}/>
            }

            </div>
        </div>
    )
}

export default HomePage;