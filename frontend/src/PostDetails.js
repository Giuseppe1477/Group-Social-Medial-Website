import { useParams } from "react-router";
import Post from "./Post.js";
import RichTextEditor from "./RichTextEditor.js";

const PostDetails = () => {
    const{ id } = useParams()

    return (  
        <div className="post-details">
            <h2>Post - {id}</h2>
            <p>Example text</p>
            <div className="parentPost">
                <Post/>
            </div>
            <div className="detailComments">
                
            </div>
            <div className="writeComments">
                <RichTextEditor/>
            </div>
        </div>
    );
}
 
export default PostDetails;