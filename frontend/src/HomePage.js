import { useState, useEffect } from "react";
import ReactPlayer from "react-player"
import ListPosts from './ListPosts.js';
import Services from "./Services";
import Filters from './Filters.js';
import { DEFAULT_TAGS } from './const.js';
import { handleFilter } from './utils.js';
import { TableRow, TableCell, FormControlLabel, Checkbox, TableHead, Table } from "@mui/material";
import "./index.css"

const HomePage = props => {
    const [ posts, setPosts ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ refresh, setRefresh ] = useState(false)

    const handleRefresh = r => {
        if (r) {
          setRefresh(r);
          setRefresh(false);
        }
    }


    useEffect(() => {
        refreshPosts()
    }, [refresh, tags])



    const refreshPosts = () => {
        Services.list_posts({
          tags,
          user_id: '',
        })
            .then(r => setPosts(r.posts))
            .catch(err => console.log(err));
    }


    return (
        <div class="homeColumn">
            <div>
                <div>
                  <Filters
                    filterList={DEFAULT_TAGS}
                    onChange={e => handleFilter(tags, {tag: e.target.value}, setTags)}
                  />
                </div>
                { posts &&
                  <ListPosts
                    user_id={props.user_id}
                    posts={posts}
                    is_admin={props.is_admin}
                    getPost={props.getPost}
                    list_posts={refreshPosts}
                  />
                }
            </div>
        </div>
    )
}

export default HomePage;
