
import ReactPlayer from "react-player"
import React, { useState, useEffect } from "react";
import { checkImage } from './utils'
import {IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Services from "./Services";


const DM = props => {

    const [isImg, setIsImg ] = useState(false);

    useEffect(() => {
        checkImage(props.text, setIsImg);
    }, [])

    const handleHideDM = () => {
        Services.block_post({
            message_id: props.message_id
        })
            .then(r => props.list_dms(r))
            .catch(err => console.log(err))
    }


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

                {
                    ReactPlayer.canPlay(props.text) ?
                        <ReactPlayer
                            url={props.text}
                            width={'90%'}
                        />
                    : ( isImg ? <>
                        <img
                            height="100px" width="100px"
                            src={props.text}
                            alt={props.text}
                      />
                      <br />
                      </> : <div className="post-body" dangerouslySetInnerHTML={createMarkup(props.text)} />
                    )
                }

                 {
                  props.is_admin &&
                      <IconButton
                          onClick={handleHideDM}
                      >
                          <DeleteOutlineIcon/>
                      </IconButton>
            }

            </div>
        </div>
     );
}
 
export default DM;