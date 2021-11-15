import { withRouter, useHistory } from 'react-router-dom';
import { useState } from 'react';
import RichTextEditor from "./RichTextEditor";
import Services from "./Services";
import { Table, TableRow, TableCell, FormControlLabel, Checkbox, TableHead } from "@mui/material";

const CreatePost = (props) => {
  const [ filterList ] = useState([{tag:"Pop"},{tag:"Rock"},{tag:"Rap"}]);
  const [ filter, setFilter ] = useState([]);

  let history = useHistory();

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
    console.log(filter);
  }

  const handleRedirect = (redirect) =>{
    if(redirect){
      history.push("/")
    }
  }

  return ( 
    <div>
      <h1>Create a post</h1>
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
        <RichTextEditor
            user_id={props.user_id}
            callback={Services.create_post}
            type="create_post"
            handleRedirect={handleRedirect}
            tags={filter}
        />
    </div>
  );
}
  
export default withRouter(CreatePost);