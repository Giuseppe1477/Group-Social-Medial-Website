
import Profile from "./Profile.js";
import * as constants from './const.js';
import {useEffect, useState} from "react";
import ReactPlayer from "react-player"
import ListPosts from "./ListPosts";
import Services from "./Services";
import { useParams } from "react-router";

const ProfilePage = props => {

    console.log('profile props:')
    console.log(props)

    const { id } = useParams()
    const [ posts, setPosts ] = useState([]);
    const [ song, setSong ] = useState(null)

    useEffect(() => {
        Services.list_posts({
            user_id: id,
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));

        if (props.song) setSong(props.song)
        else {
            const songVals = Object.values(constants.SONG_URI);
            const chosenSongInd = Math.floor(Math.random() * songVals.length);
            const chosenSong = songVals[chosenSongInd];
            setSong(chosenSong);
        }
    }, [])


    return <div>
        <Profile user_id={id} viewer_id={props.viewer_id} setRecipient={props.setRecipient}/>

        { ReactPlayer.canPlay(song) ?
          <div class="soundcloudPlayer">
            <ReactPlayer
              url={song}
              width={'100%'}
              height={"140px"}
            />
          </div> : <h4> cannot play song {song} </h4> }
        <ListPosts user_id={id} posts={posts} getPost={props.getPost}/>
    </div>
}

export default ProfilePage;
