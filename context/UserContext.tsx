import { createContext, Dispatch, SetStateAction, useState } from 'react';


interface UserContextParams {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}


export const UserContext = createContext<UserContextParams>({
  setUser: () => {
  },
  user: {} as User
});


export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({} as User);

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );

};