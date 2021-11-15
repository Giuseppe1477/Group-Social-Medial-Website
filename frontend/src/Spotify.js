import * as constants from './const.js';
import { useState, useEffect } from "react";
import ListPosts from './ListPosts.js';
import Profile from "./Profile.js";
import Post from './Post.js';
import Services from "./Services";
import React, { Component } from 'react';
import PlayWidget from 'react-spotify-widgets';

const Spotify = (props) => {
  
    return(
      <div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Top 10 From My Favorite Artist:</h2>
          </div>
          <PlayWidget
          width={560}
          height={400}
          uri={props.artistURI} 
          lightTheme={true}
          />

          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Favorite Song:</h2>
          </div>
          <PlayWidget
          width={560}
          height={80}
          uri={props.trackURI}
          lightTheme={true}
          />

          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h2>Favorite Custom Playlist:</h2>
          </div>
          <PlayWidget
          width={560}
          height={580}
          uri={props.playlistURI}
          lightTheme={true}
          />

      </div>
    );
}

export default Spotify;