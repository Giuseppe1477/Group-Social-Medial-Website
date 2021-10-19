import { IconButton } from "@mui/material";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

const Profile = (props) => {
    return (  
        <div className="prof">
            <div className="prof-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="prof-info">
                <div className="prof-top">
                    <div className="prof-username">
                        <Link to={"user/" + props.user_id}>
                            <h1>{props.user_id}</h1>
                        </Link>
                    </div>
                    <div className="prof-message">
                        {props.viewer_id!==props.user_id &&
                            <Link to={"chat/" + props.user_id} >
                                <IconButton>
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                </IconButton>
                            </Link>
                        }
                    </div>
                </div>
                <div className="prof-descrip">
                    <p>Description</p>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;