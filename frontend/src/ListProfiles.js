import Profile from "./Profile";

const ListProfiles = (props) => {
    return (
        <div>
            {props.posts.map((post) => (
                <Profile user_id={post.post_id} viewer_id={props.viewer_id}
                />
            ))}
        </div>
     );
}

export default ListProfiles;
