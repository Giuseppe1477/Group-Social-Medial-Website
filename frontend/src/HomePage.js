

import React, from "react";


const HomePage = props => {

    return <div>
        Welcome {props.isAdmin ? 'Admin' : 'User'}
    </div>

}

export default HomePage;