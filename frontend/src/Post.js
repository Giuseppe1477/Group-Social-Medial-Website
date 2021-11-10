import React, { useState } from "react";
import {faCommentDots, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Link } from 'react-router-dom';
import { stateToHTML } from "draft-js-export-html";
import Services from "./Services";

const Post = ({ user_id, user_poster_id, post_id, text, is_admin, getPost, created_at = 0 }) => { //[data]

    const[id, setId] = useState(post_id);
    const[html, setHtml] = useState("");

    const createMarkup = text => {
        return {__html: String(text)};
    }

    return (
        <div className="post">
            <div className="post-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="leftside">
                <div className="post-info">
                    <h5><b>{user_poster_id}</b></h5>
                </div>
                <div className="post-title">
                
                </div>
                <div className="post-body" dangerouslySetInnerHTML={createMarkup(text)} />
                <div className="comment-icon">
                    <Link to={"posts/"+id}>
                        <IconButton onClick={()=>getPost({user_poster_id: user_poster_id, text: text})}>
                            <RateReviewIcon/>
                        </IconButton>
                    </Link>
                    {is_admin && 
                        (<IconButton onClick={()=>Services.block_post({
                            user_id: user_poster_id,
                            post_id: post_id
                        })}>
                            <RateReviewIcon/>
                        </IconButton>)
                    }
                    {/* {user_id !== user_poster_id &&
                        <Link to={"chat/" + user_poster_id} >
                            <IconButton>
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </IconButton>
                        </Link>
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Post;