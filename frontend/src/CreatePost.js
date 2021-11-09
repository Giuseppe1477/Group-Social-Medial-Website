import RichTextEditor from "./RichTextEditor";
import Services from "./Services";

const CreatePost = (props) => {
  return ( 
    <div>
      <h1>Create a post</h1>
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.create_post}
            type="create_post"
        />
    </div>
  );
}
  
export default CreatePost;