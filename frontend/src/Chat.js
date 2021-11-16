import { Button, Form, FormControl } from 'react-bootstrap'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {IconButton} from "@mui/material";
import React, { useEffect } from 'react';
import { useState } from 'react';
import Services from "./Services";
import ListDMs from './ListDMs';
import RichTextEditor from './RichTextEditor';

const Chat = (props) => {
    const [ textField, setTextField ] = useState('');
    const [ DMs, setDMs ] = useState([]);
    const [ refresh, setRefresh ] = useState(false)


    const is_admin = JSON.parse(window.localStorage.getItem('authData')).is_admin;

    const handleRefresh = r => {
        if (r) {
          setRefresh(r);
          setRefresh(false);
        }
    }

    const refreshDMs = () => {
        Services.list_dms({
            user_id: props.user_id,
            user_recipient_id: props.user_recipient_id
        })
            .then(r => {
                setDMs(r.dms)
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        refreshDMs();
    },[refresh, props.user_id, props.user_recipient_id]);
    
    return (
        <div>
            <h1>Chatting with: {props.user_recipient_id}</h1>
            { DMs &&
                <ListDMs
                    user_id={props.user_id}
                    DMs={DMs}
                    list_dms={handleRefresh}
                    is_admin={is_admin}
                />
            }
            <br/>
            <RichTextEditor
                user_id={props.user_id}
                user_recipient_id={props.user_recipient_id}
                callback={Services.send_dm}
                type="send_dm"
                handleRefresh={handleRefresh}
            />


        </div>
     );
}
 
export default Chat;