import { Button, Form, FormControl } from 'react-bootstrap'
import { useState } from 'react';
import Services from "./Services";

const Chat = (props) => {
    const[ textField, setTextField ] = useState('');

    const onChange = e => {
        setTextField(e.target.value);
        // handleSubmit(e);
    }

    const handleSubmit = e => {
        e.preventDefault();

        Services.block_post({
            user_id: "user",
            // user_recipient_id: "user",
            // text: textField
            post_id: "cd94e589-b3d5-4e7c-8cf2-5694b1c490b9"
        })
            .then(r => {
                console.log(r);
                return r;
            })
            .then(r => console.log("Success"))
            .catch(err => console.log(err))
    }

    return ( 
        <div>
            <h1>Chat test</h1>
            <Form className="d-flex" onSubmit={handleSubmit} onChange={onChange}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
            </Form>
        </div>
     );
}
 
export default Chat;