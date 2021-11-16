import Post from './Post.js';
import Services from './Services.js';

const ListPosts = ({user_id, is_admin, posts, getPost, list_posts}) => {
    return (
        <div>
            {posts.map(
                (p, idx) => <Post
                    user_ids={user_id}
                    key={idx}
                    user_poster_id={p.user_id}
                    post_id={p.post_id}
                    text={p.text}
                    created_at={p.created_at}
                    is_admin={is_admin}
                    is_hidden={p.is_hidden}
                    message_id={p.message_id}
                    imgURL={p.img_url}
                    songURL={p.song_url}
                    getPost={getPost}
                    list_posts={list_posts}
                />
            )}
        </div>
     );
}

export default ListPosts;
