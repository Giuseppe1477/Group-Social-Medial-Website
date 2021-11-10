import Comment from "./Comment.js";

const ListComments = ({user_id, is_admin, comments}) => {
    return ( 
        <div>
            {comments.map(
                (p, idx) => <Comment
                    user_id={user_id}
                    key={idx}
                    user_poster_id={p.user_id}
                    post_id={p.post_id}
                    text={p.text}
                    created_at={p.created_at}
                    is_admin={is_admin}
                />
            )}
        </div>
    );
}
 
export default ListComments;