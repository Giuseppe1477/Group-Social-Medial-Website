
import React, { useState } from 'react';
import InputBox from './InputBox.js';
import HomePage from './HomePage.js';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const getOutput = output => {
        setIsAdmin(output.admin);
        setIsLoggedIn(output.logged_in);
    }

    return (
        <div className="App">

            {isLoggedIn ?
                <HomePage
                    isAdmin={isAdmin}
                />
            :
                <InputBox
                    getOutput={getOutput}
                />
            }
        </div>
    );
}

export default App;
