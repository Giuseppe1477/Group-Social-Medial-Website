import Post from './Post.js';

const ListPosts = ({user_id, posts}) => {
    return ( 
        <div>
            {posts.map(
                (p, idx) => <Post
                    user_id={user_id}
                    key={idx}
                    user_poster_id={p.user_id}
                    post_id={p.post_id}
                    text={p.text}
                    created_at={p.created_at}
                />
            )}
        </div>
     );
}
 
export default ListPosts;