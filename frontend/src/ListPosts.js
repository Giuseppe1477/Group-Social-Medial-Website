import Post from './Post.js';

const ListPosts = ({user_id, is_admin, posts, getPost, refresh}) => {
    return (
        <div>
            {posts.map(
                (p, idx) => <Post
                    user_id={user_id}
                    key={idx}
                    user_poster_id={p.user_id}
                    post_id={p.post_id}
                    text={p.text}
                    img={p.img}
                    created_at={p.created_at}
                    is_admin={is_admin}
                    message_id={p.message_id}
                    getPost={getPost}
                    refresh={refresh}
                />
            )}
        </div>
     );
}

export default ListPosts;
