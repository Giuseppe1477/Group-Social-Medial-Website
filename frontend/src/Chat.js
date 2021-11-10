import { Button, Form, FormControl } from 'react-bootstrap'
import { useEffect } from 'react';
import { useState } from 'react';
import Services from "./Services";
import ListDMs from './ListDMs';
import RichTextEditor from './RichTextEditor';

const Chat = (props) => {
    const[ textField, setTextField ] = useState('');
    const [ DMs, setDMs ] = useState([]);

    useEffect(() => {
        Services.list_dms({
            // user_id:props.user_id
            user_id: props.user_id,
            user_recipient_id: props.user_recipient_id
        })
            .then(r => {
                setDMs(r.body.dms)
                console.log(r.body.dms)
            })
            .catch(err => console.log(err));
    },[]);

    // const onChange = e => {
    //     setTextField(e.target.value);
    //     // handleSubmit(e);
    // }

    // const handleSubmit = e => {
    //     e.preventDefault();

    //     Services.block_post({
    //         user_id: "user",
    //         // user_recipient_id: "user",
    //         // text: textField
    //         post_id: "cd94e589-b3d5-4e7c-8cf2-5694b1c490b9"
    //     })
    //         .then(r => {
    //             console.log(r);
    //             return r;
    //         })
    //         .then(r => console.log("Success"))
    //         .catch(err => console.log(err))
    // }

    return ( 
        <div>
            <h1>Chatting with: {props.user_recipient_id}</h1>
            {/* <Form className="d-flex" onSubmit={handleSubmit} onChange={onChange}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
            </Form> */}
            { DMs && <ListDMs user_id={props.user_id} DMs={DMs}/> }
            <br/>
            <RichTextEditor
                user_id={props.user_id}
                user_recipient_id={props.user_recipient_id}
                callback={Services.send_dm}
                type="send_dm"
            />
        </div>
     );
}
 
export default Chat;