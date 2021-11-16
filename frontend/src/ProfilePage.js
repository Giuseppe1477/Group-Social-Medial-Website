
import Profile from "./Profile.js";
import * as constants from './const.js';
import {useEffect, useState} from "react";
import ReactPlayer from "react-player"
import ListPosts from "./ListPosts";
import Services from "./Services";
import Filters from './Filters.js';
import { handleFilter } from './utils.js';
import { DEFAULT_TAGS } from './const.js';
import { useParams } from "react-router";

const ProfilePage = props => {


    const { id } = useParams()
    const [ posts, setPosts ] = useState([]);
    const [ user, setUser ] = useState([])
    const [ song, setSong ] = useState(null)
    const [ tags, setTags ] = useState([]);
    const [ refresh, setRefresh ] = useState(false);

    const user_id = JSON.parse(window.localStorage.getItem('authData')).user_id;


    const refreshPosts = () => {
        Services.list_posts({
          tags,
          user_id: id,
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        initialGetSong()
        initialGetUser()
    }, [])

    useEffect(() => {
        refreshPosts()
    }, [tags, props.song])

    const initialGetSong = () => {
        if (props.song_url) setSong(props.song_url)
        else {
            const songVals = Object.values(constants.SONG_URI);
            const chosenSongInd = Math.floor(Math.random() * songVals.length);
            const chosenSong = songVals[chosenSongInd];
            setSong(chosenSong);
        }
    }

    const initialGetUser = () => {
        Services.list_users({
            user_id
        })
            .then(r => setUser(r.user_ids))
    }

    return <div>
        {user.map(
          u =>
              (u.user_id.localeCompare(id)===0 && <Profile {...u} viewer_id={props.viewer_id} setRecipient={props.setRecipient}/>)
        )}

        <Filters
              filterList={DEFAULT_TAGS}
              onChange={e => handleFilter(tags, {tag: e.target.value}, setTags)}
            />
        <ListPosts user_id={id} posts={posts} getPost={props.getPost} is_admin={props.is_admin} list_posts={refreshPosts}/>
    </div>
}

export default ProfilePage;
