import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useHistory, useParams, } from "react-router-dom";
import PlayWidget from "react-spotify-widgets"
import { useState, useEffect } from 'react';
import Services from "./Services";
import { checkImage } from './utils.js';

const Profile = (props) => {

    const [ profileImgUrl, setProfileImgUrl ] = useState(null);

    useEffect(() => {

        const callback = isImgValid => {
          isImgValid ?
              setProfileImgUrl(props.img_url)
          : setProfileImgUrl('https://picsum.photos/200')
        }

        checkImage(props.img_url, callback);
    })

    const {
      id, img_url, song_url, bio
    } = useParams()

    console.log(props.viewer_id)

    return (
        <div className="prof">
            <div className="prof-pic">
                <img src={profileImgUrl} alt="Profile"></img>
            </div>
            <div className="prof-info">
                <div className="prof-top">
                    <div className="prof-username">
                        <Link to={"/profile/" + props.user_id}>
                            <h1 >{props.user_id}</h1>
                        </Link>
                    </div>
                    <div className="prof-message">
                        {props.viewer_id.localeCompare(props.user_id) !== 0 &&
                            (<Link to={"/chat"}>
                            <IconButton onClick={()=>props.setRecipient(props.user_id)}>
                                <ChatIcon/>
                            </IconButton>
                            </Link>)
                        }
                    </div>
                </div>
                <div className="prof-descrip">
                    <p>{props.bio}</p>
                </div>
                
            </div>
        </div>
    );
}
/*


const Profile = (props) => {

    const profilePicURL = props.img_url || "https://picsum.photos/200";
    const {
      id, img_url, song_url, bio
    } = useParams()

    console.log({id, img_url, song_url, bio})

    return (
        <div className="prof">
            <div className="prof-pic">
                <img src={profilePicURL} alt="Profile"></img>
            </div>
            <div className="prof-info">
                <div className="prof-top">
                    <div className="prof-username">
                        <Link to={`/profile/${props.user_id}/${props.img_url}/${props.song_url}/${props.bio}`}>
                            <h1 >{props.user_id}</h1>
                        </Link>
                    </div>
                    <div className="prof-message">
                        <Link to={"/chat"}>
                            <IconButton onClick={()=>props.setRecipient(props.user_id)}>
                                <ChatIcon/>
                            </IconButton>
                        </Link>
                    </div>
                </div>
                <div className="prof-descrip">
                    <p>{props.bio}</p>
                </div>
            </div>
        </div>
    );
}

*/
export default Profile;
