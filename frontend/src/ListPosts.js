import Post from './Post.js';

const ListPosts = ({user_id, is_admin, posts, getPost}) => {
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
                    getPost={getPost}
                />
            )}
        </div>
     );
}

export default ListPosts;
