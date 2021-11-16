import { Button, Form, FormControl } from 'react-bootstrap'
import { useEffect } from 'react';
import { useState } from 'react';
import Services from "./Services";
import ListDMs from './ListDMs';
import RichTextEditor from './RichTextEditor';

const Chat = (props) => {
    const[ textField, setTextField ] = useState('');
    const [ DMs, setDMs ] = useState([]);
    //const [response, setResponse] = useState("")

    const updateDMs = () => {
        Services.list_dms({
            user_id: props.user_id,
            user_recipient_id: props.user_recipient_id
        })
            .then(r => {
                setDMs(r.body.dms)
                console.log(r.body.dms)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        let timer = setInterval(() => {
            Services.list_dms({
                // user_id:props.user_id
                user_id: props.user_id,
                user_recipient_id: props.user_recipient_id
            })
                .then(r => {
                    setDMs(r.dms)
                    console.log(r.dms)
                })
                .catch(err => console.log(err));
        }, 5000)
        return () => clearInterval(timer);
    },[]);
    
    return (
        <div>
            <h1>Chatting with: {props.user_recipient_id}</h1>
            { DMs && <ListDMs user_id={props.user_id} DMs={DMs}/> }
            <br/>
            <RichTextEditor
                user_id={props.user_id}
                user_recipient_id={props.user_recipient_id}
                callback={Services.send_dm}
                type="send_dm"
                updateDMs={updateDMs}
            />
        </div>
     );
}
 
export default Chat;