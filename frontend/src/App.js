
import React, { useState } from 'react';
import InputBox from './InputBox.js';
import HomePage from './HomePage.js';


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="App">

            {isLoggedIn ?
                <HomePage
                    isAdmin={isAdmin}
                />
            :
                <InputBox
                    login={() => {
                        console.log('Logging In.');
                        setTimeout(() => setIsLoggedIn(true), 0);
                    }}
                    setAdmin={setIsAdmin}
                />
            }
        </div>
    );
}

export default App;
