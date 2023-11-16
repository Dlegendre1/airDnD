import { useState } from "react";


const DemoUser = () => {
    const [demoUser, setDemoUser] = useState({
        credential: 'demouser',
        password: 'demouser'
    });

    const handleLogin = () => {

    };

    return (
        <>
            <button onClick={handleLogin}>Demo User</button>
        </>
    );
};

export default DemoUser;
