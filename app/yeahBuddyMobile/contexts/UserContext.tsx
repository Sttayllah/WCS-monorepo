import React, { createContext, Dispatch, useContext, useState } from "react";
import { User } from "../model/models";

interface UserContext {
  user: User;
  setLocalUser: Dispatch<React.SetStateAction<User>>;
}

export const userContext = createContext({} as UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [localUser, setLocalUser] = useState<User>({} as User);

  return (
    <userContext.Provider
      value={{
        user: localUser,
        setLocalUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(userContext);
  return user;
};
