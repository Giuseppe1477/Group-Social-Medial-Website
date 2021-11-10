import DM from "./DM";

const ListDMs = ({DMs}) => {
    return ( 
        <div>
            {DMs.map(
                (p, idx) => <DM
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
 
export default ListDMs;