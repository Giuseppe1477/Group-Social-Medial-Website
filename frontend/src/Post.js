import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player"
// import {faCommentDots, faEnvelope} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//import { ReportIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Services from "./Services";
import { checkImage } from './utils.js';

const Post = ({
  user_id, message_id, user_poster_id, post_id, text,
  imgURL, songURL, is_admin, getPost, list_posts, created_at = 0
}) => {

    const[id, setId] = useState(post_id);
    const date = new Date(created_at*1000)
    const [ profileImgUrl, setProfileImgUrl ] = useState(null);

    useEffect(() => {

        const callback = isImgValid => {
          isImgValid ?
              setProfileImgUrl(imgURL)
          : setProfileImgUrl('https://picsum.photos/200')
        }

        checkImage(imgURL, callback);
    })

    const createMarkup = text => {
        return {__html: String(text)};
    }

    const handleHidePost = () => {
        Services.block_post({
            message_id: message_id
        })
            .then(r => list_posts())
            .catch(err => console.log(err))
    }

    if (is_hidden) {
        return <div />
    } else return (
        <div className="post">
            <div className="post-pic">
              <img src={profileImgUrl} alt="Profile"></img>
            </div>
            <div className="leftside">
                <div className="post-top">
                    <>
                    <Link to={"/profile/" + user_poster_id}>
                        <span className="post-username"><b>{user_poster_id} </b></span>
                    </Link>
                    {date.toLocaleDateString("en-US")}
                    </>
                </div>

                <div className="post-title">

                </div>

                <div className="post-body" dangerouslySetInnerHTML={createMarkup(text)} />

                {
                  imgURL ? <>
                      <img
                        height="100px" width="100px"
                        src={imgURL}
                        alt={text}
                      />
                      <br />
                      </>
                  : null
                }
                {
                  songURL ?
                    <>
                      <br />
                      { ReactPlayer.canPlay(songURL) ?
                        <div class="soundcloudPlayer">
                          <ReactPlayer
                            url={songURL}
                            width={'100%'}
                            height={"100px"}
                          />
                        </div> : <h4> Song @ {songURL} Unavailable </h4> }
                    </> : null
                }
                <div className="comment-icon">
                    <Link to={"/posts/"+id}>
                        <IconButton onClick={()=>getPost({
                          user_poster_id: user_poster_id,
                          text: text,
                          created_at: created_at,
                        })}>
                            <RateReviewIcon/>
                        </IconButton>
                    </Link>

                    {
                      is_admin &&
                        <IconButton
                          onClick={handleHidePost}
                        >
                            <DeleteOutlineIcon/>
                        </IconButton>
                    }

                </div>

            </div>
        </div>
    )
}

export default Post;

/*
            <div className="comment-icon">
                <Link to={"posts/"+id}>
                    <IconButton onClick={()=>getPost({user_poster_id: user_poster_id, text: text})}>
                        <RateReviewIcon/>
                    </IconButton>
                </Link>
            </div>

                {is_admin &&
                    (<IconButton onClick={()=>handleHidePost()}>
                        <ReportIcon/>
                    </IconButton>)
                }
            </div>
            */