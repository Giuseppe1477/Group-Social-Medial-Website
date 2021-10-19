import * as constants from './const.js';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Post from "./Post.js";
import RichTextEditorComment from "./RichTextEditorComment.js";

const PostDetails = ({user_id}) => {
    const{ post_id } = useParams()
    const{comments, setComments} = useState(null);

    useEffect(({user_id}) => {
        fetch(constants.BASE_URL + 'list_comments',{
        method: 'POST',
        mode: 'cors',
        cache: 'force-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            user_id: user_id,
        })
        })
        .then(res => {
        if(!res.ok)
            throw Error("Error");
        return res;
        })
        .then(res  => res.json())
        .then(res => res.body)
        .then(data => {
        console.log(data);
        })
        .catch((err) => {
        console.error(err);
        });
    },[]);

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
                <RichTextEditorComment user_id={user_id} post_id = {post_id}/>
            </div>
        </div>
    );
}
 
export default PostDetails;