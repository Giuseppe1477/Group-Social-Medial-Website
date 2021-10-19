import Post from './Post.js';

const ListPosts = ({posts}) => {
    return ( 
        <div>
            {posts.map((post) => (
                <Post post_id={post.posts.post_id}/>
            ))}
        </div>
     );
}
 
export default ListPosts;