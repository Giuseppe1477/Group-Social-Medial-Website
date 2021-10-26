
import Profile from "./Profile.js"
import {useEffect, useState} from "react";
import ListPosts from "./ListPosts";
import Services from "./Services";

const ProfilePage = props => {

    console.log('profile props:')
    console.log(props)

    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        Services.list_posts({
            user_id: props.user_id,
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    }, [])


    return <div>
        <Profile user_id={props.user_id} viewer_id={props.viewer_id}/>
        <ListPosts user_id={props.user_id} posts={posts} />
    </div>
}

export default ProfilePage;