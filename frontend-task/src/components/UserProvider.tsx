import React from 'react'
import { MakeGetRequest } from '../apiCall';



const exampleData = {id: 0, name:""}

export const UserContext = React.createContext({});

type UserProviderProps = { children: React.ReactNode }

export default function UserProvider({ children }: UserProviderProps) {
  const userID = 7;
  const [user, setUser] = React.useState({});

  React.useEffect(()=>{
    MakeGetRequest(`/users/${userID}`).then(data => { setUser(data); });
  }, []);
  console.log("user", user);
  
  return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext);