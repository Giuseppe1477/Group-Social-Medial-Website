import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useHistory } from "react-router-dom";
import Services from "./Services";

const Profile = (props) => {
    //console.log(props)

    // const history = useHistory();

    // const handleProfile = e => {
    //     history.push({"profile/" + props.user_id})
    // }

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
                        <Link to={"/chat"}>
                            <IconButton onClick={()=>props.setRecipient(props.user_id)}>
                                <ChatIcon/>
                            </IconButton>
                        </Link>
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