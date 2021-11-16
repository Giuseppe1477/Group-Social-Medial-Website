
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {IconButton} from "@mui/material";
import React from "react";
import Services from "./Services";


const Comment = props => {
    const createMarkup = text => {
        return {__html: String(text)};
    }

    const handleHidePost = () => {
        Services.block_post({
            message_id: props.message_id
        })
            .then(r => props.list_comments())
            .catch(err => console.log(err))
    }


    if (props.is_hidden) {
        return <div />
    } else return (
        <div className="post">
            <div className="post-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="leftside">
                <div className="post-info">
                    <h5><b>{props.user_poster_id}</b></h5>
                </div>
                <div className="post-title">
                
                </div>
                <div className="post-body" dangerouslySetInnerHTML={createMarkup(props.text)} />

                {
                    props.is_admin &&
                        <IconButton
                          onClick={handleHidePost}
                        >
                            <DeleteOutlineIcon/>
                        </IconButton>
                }

            </div>


        </div>
    );
}
 
export default Comment;