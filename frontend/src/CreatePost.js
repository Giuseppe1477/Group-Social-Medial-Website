import { withRouter, useHistory } from 'react-router-dom';
import { useState, Fragment } from 'react';
import ReactPlayer from "react-player"
import RichTextEditor from "./RichTextEditor";
import Filters from './Filters.js';
import Services from "./Services";
import { DEFAULT_TAGS } from './const.js';
import { handleFilter } from './utils.js';
import "./index.css"
import { TextField } from "@mui/material";


const CreatePost = (props) => {
  const [ tags, setTags ] = useState([]);
  const [ songURL, setSongURL ] = useState('');
  const [ imgURL, setImgURL ] = useState('');

  let history = useHistory();

  const handleRedirect = (redirect) =>{
    if (redirect) {
      history.push("/")
    }
  }

  return (
    <div>
      <h1>Create a post</h1>
      <div className="filters">
        <Filters
            filterList={DEFAULT_TAGS}
            onChange={e => handleFilter(tags, {tag: e.target.value}, setTags)}
        />
      </div>
        <form className="createForm">
          <label className="createField">
            <TextField
                id='outlined-createpost-song'
                label='Song URL'
                variant='standard'
                name="song"
                type="text"
                onChange={e => {
                  setSongURL(e.target.value);
                  if ( ! ReactPlayer.canPlay(e.target.value)) {
                    console.log('Song Unplayable: ', e.target.value);
                  }
                }}
                value={songURL}
            />
          </label>
          <br/>
          <label className="createField">
            <TextField
                id='outlined-createpost-song'
                label='Image URL'
                variant='standard'
                name="song"
                type="text"
                onChange={e => {
                  setImgURL(e.target.value);
                }}
                value={imgURL}
            />

          </label>
          <br/>
        </form>

        <RichTextEditor
            user_id={props.user_id}
            callback={Services.create_post}
            type="create_post"
            handleRedirect={handleRedirect}
            tags={tags}
            song_url={songURL}
            img_url={imgURL}
        />
    </div>
  );
}

export default withRouter(CreatePost);
