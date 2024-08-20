"use client"

import { UserType } from '@/types/userTypes';
import React, { createContext, ReactNode, useState } from 'react';

type UserContextType = {
    user: UserType | null;
    setUser: any;
}

type UserContextProviderType = {
    children: ReactNode
}

const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({ children }: UserContextProviderType) => {

    const [user, setUser] = useState<UserType | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );

};

export { UserContext, UserContextProvider };