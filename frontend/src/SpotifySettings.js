import RichTextEditor from "./RichTextEditor";
import Services from "./Services";

const SpotifySettings = (props) => {
  return ( 
    <div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Please Enter The URI Of Your Favorite Playlist</h2>
          </div>
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.createURI}
            type="createPlaylistURI"
        />

<          div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Please Enter The URI Of Your Favorite Artist</h2>
          </div>
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.createURI}
            type="createArtistURI"
        />

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Please Enter The URI Of Your Favorite Song</h2>
          </div>
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.createURI}
            type="createTrackURI"
        />
    </div>
  );
}
  
export default SpotifySettings;