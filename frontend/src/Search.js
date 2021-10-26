import { Button, Form, FormControl } from 'react-bootstrap'
import { useState } from 'react';
import * as constants from './const.js';
import Services from "./Services";
import Profile from "./Profile";

const Search = () => {
    const[ textField, setTextField ] = useState('');
    const[ resultUsers, setUsers ] = useState([]);

    const onChange = e => {
        setTextField(e.target.value);
        handleSubmit(e);
    }

    const handleSubmit = e => {
        e.preventDefault();

        Services.list_users({
            user_id: textField
        })
            .then(r => {
                console.log(r);
                return r;
            })
            .then(r => setUsers(r.user_ids))
            .catch(err => console.log(err))
    }

    return ( 
        <div>
            <Form className="d-flex" onSubmit={handleSubmit} onChange={onChange}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            <div>
                {resultUsers.map(
                    user => <Profile {...user} />
                )}
            </div>
        </div>
     );
}
 
export default Search;