import React, { useState } from "react";
import { IconButton } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';
import Services from "./Services";

const Post = ({
  user_id, message_id, user_poster_id, post_id, text, img = null, is_admin, getPost, created_at, refresh
}) => {

    const[id, setId] = useState(post_id);
    const date = new Date(created_at*1000)

    const createMarkup = text => {
        return {__html: String(text)};
    }

    const handleClick = () => {
        Services.block_post({
            message_id: message_id
        })
            .then(r=>refresh())
            .catch(err=>console.log(err))
    }

    return (
        <div className="post">
            <div className="post-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="leftside">
                <div className="post-top">
                    <Link to={"/profile/" + user_poster_id}>
                        <span className="post-username"><b>{user_poster_id} </b></span>
                    </Link>
                    {date.toLocaleDateString("en-US")}
                </div>
                <div className="post-title">

                </div>
                <div className="post-body" dangerouslySetInnerHTML={createMarkup(text)} />
                <div className="post-img">
                    {
                      img ?

                          <img
                            height="100px" width="100px"
                            src={img}
                            alt={text}
                          />
                      : null
                    }
                </div>
                <div className="comment-icon">
                    <Link to={"posts/"+id}>
                        <IconButton onClick={()=>getPost({user_poster_id: user_poster_id, text: text})}>
                            <RateReviewIcon/>
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div>
                {is_admin &&
                    (<IconButton onClick={()=>handleClick()}>
                        <ReportIcon/>
                    </IconButton>)
                }
            </div>
        </div>
    )
}

export default Post;
