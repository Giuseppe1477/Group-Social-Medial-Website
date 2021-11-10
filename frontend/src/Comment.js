const Comment = props => {
    const createMarkup = text => {
        return {__html: String(text)};
    }

    return (  
        <div className="post">
            <div className="post-pic">
                <img src="https://picsum.photos/200" alt="Profile"></img>
            </div>
            <div className="leftside">
                <div className="post-info">
                    <h5><b>{props.user_poster_id}</b></h5>
                </div>
                <div className="post-title">
                
                </div>
                <div className="post-body" dangerouslySetInnerHTML={createMarkup(props.text)} />
            </div>
        </div>
    );
}
 
export default Comment;