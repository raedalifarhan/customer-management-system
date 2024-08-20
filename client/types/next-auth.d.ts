
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            username: string
            displayName: string
            token: string
        } & DefaultSession['user']
    }
    
    interface User {
        displayName: string,
        username: string
        token: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        token: string
        username: string
        displayName: string
    }
}