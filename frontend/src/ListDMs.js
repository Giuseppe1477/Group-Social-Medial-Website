import DM from "./DM";

const ListDMs = ({DMs}) => {
    const sorted = [].concat(DMs).sort((a,b)=>a.created_at>b.created_at?1:-1)
    return ( 
        <div>
            {sorted.map(
                (p, idx) => <DM
                    key={p.created_at}
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