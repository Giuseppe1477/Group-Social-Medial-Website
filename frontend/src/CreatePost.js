import { withRouter, useHistory } from 'react-router-dom';
import RichTextEditor from "./RichTextEditor";
import Services from "./Services";

const CreatePost = (props) => {
  let history = useHistory();

  const handleRedirect = (redirect) =>{
    if(redirect){
      history.push("/")
    }
  }

  return ( 
    <div>
      <h1>Create a post</h1>
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.create_post}
            type="create_post"
            handleRedirect={handleRedirect}
        />
    </div>
  );
}
  
export default withRouter(CreatePost);