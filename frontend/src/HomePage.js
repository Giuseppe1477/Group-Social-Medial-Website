import { useState, useEffect } from "react";
import ReactPlayer from "react-player"
import ListPosts from './ListPosts.js';
import Services from "./Services";
import { TableRow, TableCell, FormControlLabel, Checkbox, TableHead, Table } from "@mui/material";
import "./index.css"

const HomePage = props => {
    const [ posts, setPosts ] = useState([]);
    const [ filterList ] = useState([{tag:"Pop"},{tag:"Rock"},{tag:"Rap"}]);
    const [ filter, setFilter ] = useState([]);

    const handleFilter = val => {
        //console.log("TAG:"+val.tag)
        //console.log(filter.includes(val.tag))
        if(filter.includes(val.tag)){
            const filterIndex = filter.indexOf(val.tag);
            const newFilter = [...filter];
            newFilter.splice(filterIndex,1);
            //console.log("NEW:"+newFilter)
            setFilter(newFilter)
            
        } else {
            setFilter([...filter, val.tag]);
        }
        //console.log(filter);
    }

    const refresh = () => {
        Services.list_posts({
            tags: filter,
            user_id: ""
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        Services.list_posts({
            tags: filter,
            user_id: ""
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    },[filter]);



    return (
        <div class="homeColumn">
            <div>
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
                { posts && <ListPosts user_id={props.user_id} posts={posts} is_admin={props.is_admin} getPost={props.getPost} refresh={refresh}/> }
            </div>
        </div>
    )
}

export default HomePage;
