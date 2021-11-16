
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

    const refresh = () => {
      Services.list_posts({
        user_id: id,
      })
        .then(r => setPosts(r.posts))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        Services.list_posts({
            user_id: id,
            tags,

        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));

        if (props.song_url) setSong(props.song_url)
        else {
            const songVals = Object.values(constants.SONG_URI);
            const chosenSongInd = Math.floor(Math.random() * songVals.length);
            const chosenSong = songVals[chosenSongInd];
            setSong(chosenSong);
        }
    }, [tags, props.song])

    return <div>
        {user.map(
          u =>
              (u.user_id.localeCompare(id)===0 && <Profile {...u} viewer_id={props.viewer_id} setRecipient={props.setRecipient}/>)
        )}

        { ReactPlayer.canPlay(song) ?
          <div class="soundcloudPlayer">
            <ReactPlayer
              url={song}
              width={'100%'}
              height={"140px"}
            />
            <Filters
              filterList={DEFAULT_TAGS}
              onChange={e => handleFilter(tags, {tag: e.target.value}, setTags)}
            />
          </div> : <h4> Song @ {song} Unavailable </h4> }
        <ListPosts user_id={id} posts={posts} getPost={props.getPost} is_admin={props.is_admin} refresh={refresh}/>
    </div>
}

export default ProfilePage;
