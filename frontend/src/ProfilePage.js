
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
import PlayWidget from "react-spotify-widgets"

const ProfilePage = props => {


    const { id } = useParams()
    const [ posts, setPosts ] = useState([]);
    const [ user, setUser ] = useState([])
    const [ song, setSong ] = useState(null)
    const [ tags, setTags ] = useState([]);
    // const [ refresh, setRefresh ] = useState(false);

    const [ userItem, setUserItem ] = useState({});

    useEffect(() => {
        Services.list_users({
            user_id: id,
        })
            .then(r => {
                console.log(r);
                console.log(r.user_ids[0])
                r.user_ids.length && setUserItem(r.user_ids[0]);
                return r;
            })
            .catch(err => console.log('err:', err))
    }, [])

    const refresh = () => {
      Services.list_posts({
        user_id: id,
      })
        .then(r => setPosts(r.posts))
        .catch(err => console.log(err));
    }


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
            user_id: id
        })
            .then(r => setUser(r.user_ids))
    }

    return (<div>
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
            <div>

            <>
                {
                  userItem.artistURI && <>
                  <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                      <h4>Top 10 From My Favorite Artist:</h4>
                  </div>
                  <PlayWidget
                      width={360}
                      height={400}
                      uri={userItem.artist_uri || userItem.artistURI}
                      lightTheme={true}
                  />
                  </>
                }
                {
                  userItem.trackURI && <>
                  <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                      <h4>Favorite Song:</h4>
                  </div>
                  <PlayWidget
                      width={360}
                      height={80}
                      uri={userItem.track_uri || userItem.trackURI}
                      lightTheme={true}
                  />
                  </>
                }
                {
                  userItem.playlistURI && <>
                  <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                      <h4>Favorite Custom Playlist:</h4>
                  </div>
                  <PlayWidget
                      width={360}
                      height={580}
                      uri={userItem.playlist_uri || userItem.playlistURI}
                      lightTheme={true}
                  />
                  </>
                }
              </>
              </div>
            <Filters
              filterList={DEFAULT_TAGS}
              onChange={e => handleFilter(tags, {tag: e.target.value}, setTags)}
            />
          </div> : <h4> Song @ {song} Unavailable </h4> 
          }
        <ListPosts user_id={id} posts={posts} getPost={props.getPost} is_admin={props.is_admin} refresh={refresh}/>
    </div>
    )
}

export default ProfilePage;


/*
<>
                {
                  props.artistURI && <>
                  <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                      <h4>Top 10 From My Favorite Artist:</h4>
                  </div>
                  <PlayWidget
                      width={360}
                      height={400}
                      uri={props.artistURI}
                      lightTheme={true}
                  />
                  </>
                }
                {
                  props.trackURI && <>
                  <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                      <h4>Favorite Song:</h4>
                  </div>
                  <PlayWidget
                      width={360}
                      height={80}
                      uri={props.trackURI}
                      lightTheme={true}
                  />
                  </>
                }
                {
                  props.playlistURI && <>
                  <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                      <h4>Favorite Custom Playlist:</h4>
                  </div>
                  <PlayWidget
                      width={360}
                      height={580}
                      uri={props.playlistURI}
                      lightTheme={true}
                  />
                  </>
                }
              </>
*/