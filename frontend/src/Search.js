import { Button, Form, FormControl } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import Services from "./Services";
import Profile from "./Profile";
import { Table, TableRow, TableCell, FormControlLabel, Checkbox, TableHead } from "@mui/material";

const Search = props => {
    const [ textField, setTextField ] = useState('');
    const [ resultUsers, setUsers ] = useState([]);
    const [ filterList ] = useState([{tag:"Pop"},{tag:"Rock"},{tag:"Rap"}]);
    const [ filter, setFilter ] = useState([]);

    const onChange = e => {
        setTextField(e.target.value);
        handleSubmit(e);
    }

    const handleFilter = val => {
        //console.log(val.tag)
        //console.log(filter.includes(val.tag))
        if(filter.includes(val.tag)){
            const filterIndex = filter.indexOf(val.tag);
            const newFilter = [...filter];
            newFilter.splice(filterIndex,1);
            setFilter(newFilter)
            
        } else {
            setFilter([...filter, val.tag]);
        }
        //console.log(filter);
    }

    useEffect(() => {
        Services.list_users({
            user_id: textField,
            filter: filter
        })
            .then(r => {
                console.log(r);
                return r;
            })
            .then(r => setUsers(r.user_ids))
            .catch(err => console.log(err))
    },[filter, textField]);

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
            <div className="filters">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {filterList.map(f=>(
                                    <TableCell key={f.tag}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                //checked={info.admin}
                                                onChange={e=>handleFilter({tag: e.target.value})}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                value={f.tag}
                                            />}
                                            label={f.tag}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    </Table>
                </div>
            <div>
                {resultUsers.map(
                    user => <Profile {...user} setRecipient={props.setRecipient} />
                )}
            </div>
        </div>
     );
}
 
export default Search;