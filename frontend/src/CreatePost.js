import RichTextEditor from "./RichTextEditor";

const CreatePost = (props) => {
  return ( 
    <div>
      <h1>Create a post</h1>
      <RichTextEditor user_id={props.user_id}></RichTextEditor>
    </div>
  );
}
  
export default CreatePost;