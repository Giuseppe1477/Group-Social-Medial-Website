import RichTextEditor from "./RichTextEditor";
import Services from "./Services";

const CreatePost = (props) => {
  return ( 
    <div>
      <h1>Create a post</h1>
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.create_comment}
        />
    </div>
  );
}
  
export default CreatePost;