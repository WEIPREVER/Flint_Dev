import React, { useState } from 'react';

const initialState = {
    accountNumber:  '',
}

export const Context = React.createContext();

const UseContext = ({ children }) => {
    const [state, setState] = useState(initialState)


    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )
}

export default UseContext;