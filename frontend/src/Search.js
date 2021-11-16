import { Button, Form, FormControl } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import Services from "./Services";
import Profile from "./Profile";
import { Table, TableRow, TableCell, FormControlLabel, Checkbox, TableHead } from "@mui/material";

const Search = props => {
    const [ textField, setTextField ] = useState('');
    const [ resultUsers, setUsers ] = useState([]);

    const handleSubmit = e => {
        e?.preventDefault();

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

    const onChange = e => {
        setTextField(e.target.value);
        handleSubmit(e);
    }

    useEffect(() => {
        handleSubmit()
    }, [textField]);


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
            <div className="filters">

                </div>
            <div>
                {resultUsers.map(
                    (user, idx) => {
                      console.log({user});

                      return <Profile
                         key={idx}
                         user_id={user.user_id}
                         viewer_id={props.viewer_id}
                         setRecipient={props.setRecipient}
                         bio={user.bio}
                         img_url={user.img_url}
                         song_url={user.song_url}
                         {...user}
                    />
                  }
                )}
            </div>
        </div>
     );
}


export default Search;
