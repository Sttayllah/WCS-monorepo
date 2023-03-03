import { gql } from '@apollo/client';
import React, { useState } from 'react';
import { User } from '../model/models';

interface UserContext {
  user: User;
  setLocalUser: React.Dispatch<React.SetStateAction<User>>;
}

const userContext = React.createContext({} as UserContext);

export const GET_PHOTOS = gql`
  query Query($email: String!) {
    getOne(email: $email) {
      images {
        id
        url
      }
    }
  }
`;

export function UserProvider({ children }: { children: React.ReactNode }) {
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
}

export function useUser() {
  const user = React.useContext(userContext);
  return user;
}

export default userContext;
