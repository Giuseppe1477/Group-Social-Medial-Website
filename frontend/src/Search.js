import { Button, Form, FormControl } from 'react-bootstrap'
import { useState } from 'react';
import * as constants from './const.js';

const Search = () => {
    const[field, setField] = useState("");
    const[resultPosts, setPosts] = useState(null);
    const[resultProfiles, setProfiles] = useState(null);

    const handleSubmit=e=>{
        e.preventDefault();
        console.log(field);
        // console.log(`You are submitting ${info.name} - ${info.password} - HASH:${sha256(info.password)}`);
        fetch(constants.BASE_URL + 'list_posts',{
          method: 'POST',
          mode: 'cors',
          cache: 'force-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            user_id: "",
          })
        })
        .then(res => {
          if(!res.ok)
            throw Error("Error");
          return res;
        })
        .then(res  => res.json())
        .then(res => res.body)
        .then(data => {
          console.log(data);
        })
        .catch((err) => {
          console.err(err);
        });
        fetch(constants.BASE_URL + 'list_users',{
            method: 'POST',
            mode: 'cors',
            cache: 'force-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              user_id: "",
            })
          })
          .then(res => {
            if(!res.ok)
              throw Error("Error");
            return res;
          })
          .then(res  => res.json())
          .then(res => res.body)
          .then(data => {
            console.log(data);
          })
          .catch((err) => {
            console.err(err);
          });
      }

    return ( 
        <div>
            <Form className="d-flex" onSubmit={handleSubmit} onChange={e=>setField(e.target.value)}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            <div>
            </div>
        </div>
     );
}
 
export default Search;