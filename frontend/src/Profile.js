import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useHistory } from "react-router-dom";
import PlayWidget from "react-spotify-widgets"
import Services from "./Services";

const Profile = (props) => {
    //console.log(props)

    // const history = useHistory();

    // const handleProfile = e => {
    //     history.push({"profile/" + props.user_id})
    // }

    console.log(props.viewer_id)

    return (  
        <div className="prof">
            <div className="prof-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="prof-info">
                <div className="prof-top">
                    <div className="prof-username">
                        <Link to={"/profile/" + props.user_id}>
                            <h1 >{props.user_id}</h1>
                        </Link> 
                    </div>
                    <div className="prof-message">
                        {props.viewer_id.localeCompare(props.user_id)!==0 && 
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
                <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                    <h4>Top 10 From My Favorite Artist:</h4>
                </div>
                    <PlayWidget
                    width={360}
                    height={400}
                    uri={props.artistURI} 
                    lightTheme={true}
                    />
                    <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                        <h4>Favorite Song:</h4>
                    </div>
                    <PlayWidget
                        width={360}
                        height={80}
                        uri={props.trackURI}
                        lightTheme={true}
                    />

                    <div style={{display: 'flex',  justifyContent:'left', alignItems:'left'}}>
                        <h4>Favorite Custom Playlist:</h4>
                    </div>
                    <PlayWidget
                        width={360}
                        height={580}
                        uri={props.playlistURI}
                        lightTheme={true}
                    />
            </div>
        </div>
    );
}
 
export default Profile;