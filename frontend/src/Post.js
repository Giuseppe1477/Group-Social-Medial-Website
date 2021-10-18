import React, { useState } from "react";
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from "@mui/material";
import { Link } from 'react-router-dom';

export default function Post() { //[data]
    //const[title, setTitle] = useState(data);
    const[id, setId] = useState(1);

    return (
        <div className="post">
            <div className="post-pic">
                <img src="https://picsum.photos/200"></img>
            </div>
            <div className="leftside">
                <div className="post-info">
                    <b>User User</b> | 1/1/11
                </div>
                <div className="post-title">
                    <h1>Post Title</h1>
                </div>
                <div className="post-body">
                    <p>Post Body</p>
                    <br/>
                    <p>BODY</p>
                    <br/>
                    <p>BODY</p>
                    <br/>
                    <p>BODY</p>
                    <br/>
                    <p>BODY</p>
                    <br/>
                    <p>BODY</p>
                    <br/>
                    <p>BODY</p>
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
