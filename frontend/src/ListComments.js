import Comment from "./Comment.js";

const ListComments = ({user_id, is_admin, comments, list_comments}) => {
    return ( 
        <div>
            {comments.map(
                (p, idx) => <Comment
                    user_id={user_id}
                    key={idx}
                    user_poster_id={p.user_id}
                    post_id={p.post_id}
                    comment_id={p.comment_id}
                    message_id={p.message_id}
                    text={p.text}
                    created_at={p.created_at}
                    is_admin={is_admin}
                    is_hidden={p.is_hidden}
                    list_comments={list_comments}
                />
            )}
        </div>
    );
}
 
export default ListComments;