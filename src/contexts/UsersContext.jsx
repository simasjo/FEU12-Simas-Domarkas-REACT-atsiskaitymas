import { createContext, useReducer, useState, useEffect } from "react";

const UsersContext = createContext();

export const UserActionTypes = {
    getAll: 'fetches all data on initial load'
}

const reducer = (state, action) => {
   switch(action.type){
        case UserActionTypes.getAll:
            return action.data;
        default:
            console.error(`No such reducer actions: ${action.type}`);
            return state;
   } 
}

const UsersProvider = ({ children }) => {

    const [loggedInUser, setLoggedInUser] = useState(false);
    const [users, setUsers] = useReducer(reducer, []);

    useEffect(() => {
        fetch(`http://localhost:8080/users`)
            .then(res => res.json())
            .then(data => setUsers({
                type: UserActionTypes.getAll,
                data: data
            }))
    }, []);

    return (
        <UsersContext.Provider
            value={{
                users,
                setUsers,
                loggedInUser,
                setLoggedInUser
            }}
        >
            { children }
        </UsersContext.Provider>
    )
}

export { UsersProvider }
export default UsersContext;