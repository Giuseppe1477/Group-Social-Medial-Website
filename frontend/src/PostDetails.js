import * as constants from './const.js';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Post from "./Post.js";
import RichTextEditor from "./RichTextEditor.js";
import Services from "./Services";
import {convertToRaw} from "draft-js";

const PostDetails = ({ user_id, user_poster_id }) => {
    const { id } = useParams()
    const { comments, setComments } = useState(null);

    useEffect(() => {
        Services.list_comments({
            user_id: "admin",
            post_id: id
        })
            .then(r => {
                console.log({'comments': r})
                setComments(r.comments)
            })
            .catch(err => console.log(err));
    }, [])

    console.log(id)

    const createMarkup = text => {
        return {__html: String(text)};
    }

    return (  
        <div className="post-details">
            <h2>Post - {id}</h2>
            
            <div className="post">
                <div className="post-pic">
                    <img src="https://picsum.photos/200" alt="Profile"></img>
                </div>
                <div className="leftside">
                    <div className="post-info">
                        {/* <h5><b>{user_poster_id}</b></h5> */}
                    </div>
                    <div className="post-title">
                    
                    </div>
                    <div className="post-body" dangerouslySetInnerHTML={createMarkup()} />
                </div>
            </div>

            <div className="detailComments">
                
            </div>
            <div className="writeComments">
                <RichTextEditor user_id={user_id} post_id = {id} callback={Services.create_comment} type="create_comment"/>
            </div>
        </div>
    );
}
 
export default PostDetails;