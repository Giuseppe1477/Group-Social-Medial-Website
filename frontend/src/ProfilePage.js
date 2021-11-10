
import Profile from "./Profile.js"
import {useEffect, useState} from "react";
import ListPosts from "./ListPosts";
import Services from "./Services";
import { useParams } from "react-router";

const ProfilePage = props => {

    console.log('profile props:')
    console.log(props)

    const { id } = useParams()
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        Services.list_posts({
            user_id: id,
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    }, [])


    return <div>
        <Profile user_id={id} viewer_id={props.viewer_id} setRecipient={props.setRecipient}/>
        <ListPosts user_id={id} posts={posts} getPost={props.getPost}/>
    </div>
}

export default ProfilePage;
