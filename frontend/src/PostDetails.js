import * as constants from './const.js';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Post from "./Post.js";
import RichTextEditor from "./RichTextEditor.js";
import Services from "./Services";
import {convertToRaw} from "draft-js";

const PostDetails = ({ user_id }) => {
    const { post_id } = useParams()
    const { comments, setComments } = useState(null);

    useEffect(() => {
        Services.list_comments({
            user_id
        })
            .then(r => {
                console.log({'comments': r})
                setComments(r.comments)
            })
            .catch(err => console.log(err));
    }, [])

    return (  
        <div className="post-details">
            <h2>Post - {post_id}</h2>
            <p>Example text</p>
            <div className="parentPost">
                <Post/>
            </div>
            <div className="detailComments">
                
            </div>
            <div className="writeComments">
                <RichTextEditor user_id={user_id} post_id = {post_id}/>
            </div>
        </div>
    );
}
 
export default PostDetails;