import React, { useState } from "react";
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from "@mui/material";
import { Link } from 'react-router-dom';
import { stateToHTML } from "draft-js-export-html";

const Post = ({post_id, text}) => { //[data]
    //const[title, setTitle] = useState(data);
    const[id, setId] = useState(post_id);

    return (
        <div className="post">
            <div className="post-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="leftside">
                <div className="post-info">
                    <b>User User</b>
                </div>
                <div className="post-title">
                
                </div>
                <div className="post-body">
                    <p>{text}</p>
                </div>
                <div className="comment-icon">
                    <Link to={"posts/"+id}>
                        <IconButton>
                            <FontAwesomeIcon icon={faCommentDots}/>
                        </IconButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Post;