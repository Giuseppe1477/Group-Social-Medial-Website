import RichTextEditor from "./RichTextEditor";
import Services from "./Services";
import { TextField, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useState } from 'react';

const SpotifySettings = (props) => {

  const [trackUri, setTrackUri] = useState('');
  const [playlistUri, setPlaylistUri] = useState('');
  const [artistUri, setArtistUri] = useState('');

  const handleSubmit = () => {
      Services.create_uri({
          track_uri: trackUri,
          playlist_uri: playlistUri,
          artist_uri: artistUri,
      })
  }

  return <div>

    <form className="createForm">
        <label className="createField">
          <TextField
              id='outlined-track'
              label='Favorite Spotify Track'
              variant='standard'
              name='track'
              type='text'
              onChange={e => setTrackUri(e.target.value)}
              value={trackUri}
          />
        </label>
        <br />
        <label className="createField">
          <TextField
              id='outlined-track'
              label='Favorite Spotify Playlist'
              variant='standard'
              name='playlist'
              type='text'
              onChange={e => setPlaylistUri(e.target.value)}
              value={playlistUri}
          />
        </label>
        <br />
        <label className="createField">
          <TextField
              id='outlined-track'
              label='Favorite Spotify Artist'
              variant='standard'
              name='artist'
              type='text'
              onChange={e => setArtistUri(e.target.value)}
              value={artistUri}
          />
        </label>
        <br />
        <Button size="small" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>

}

export default SpotifySettings;
