
import React, { useState } from 'react';
import InputBox from './InputBox.js';
import HomePage from './HomePage.js';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const setOutput = output => {
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
                    setOutput={setOutput}
                />
            }
        </div>
    );
}

export default App;
