import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // let email = "alfren.cordova@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131494";    // Employee ID

    // let email = "alfren.cordova@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131495";    // Employee ID

    // let email = "elbert.bernardo@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131496";    // Employee ID

    // let email = "elbert.bernardo@fpsinc.com";  // The email for which the details are to be fetched
    // let eid = "131497";    // Employee ID

    let email = "*";  // The email for which the details are to be fetched
    let eid = "*";    // Employee ID

    useEffect(() => {
        const fetchUserDetails = async () => {
            const res = await fetch(`/api/employee/getemployee?email=${email}&eid=${eid}`);
            const userData = await res.json();
            setUser(userData);
        };

        fetchUserDetails();
    }, [email, eid]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);



