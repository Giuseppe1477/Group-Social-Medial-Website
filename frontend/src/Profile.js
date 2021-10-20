import { IconButton } from "@mui/material";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

const Profile = (props) => {
    console.log(props)
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

                    </div>
                </div>
                <div className="prof-descrip">
                    <p>I love Music</p>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;