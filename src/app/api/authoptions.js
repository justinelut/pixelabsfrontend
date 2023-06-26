import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const results = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/account/login", { email: credentials.email, password: credentials.password }).catch(error => {
                    if (error.response) {
                        return error.response.data
                    } else if (error.request) {
                        return error.request
                    } else {
                        return error.message
                    }
                })

                if (results && !results.errors && results.statusText == 'OK') {
                    const user = { name: results.data.user.firstName + ' ' + results.data.user.lastName, email: results.data.token }
                    return user
                } else if (results && results.errors) {
                    throw new Error(results.errors[0].message)
                } else {
                    throw new Error("Invalid Login credentials")
                }
            }
        })
    ],

    callbacks: {
        async session({ token, session }) {
            if(session){
                const expiryTime = new Date(session.expires);
                const currentTime = new Date();
                if (currentTime >= expiryTime) {
                    return false
                }
            }
            
            if (token) {
                const expiryTime = new Date(token.expires);
                const currentTime = new Date();
                if (currentTime >= expiryTime) {
                    session = null
                    return session
                } else {
                    session.user.id = token.id
                    session.user.fullnames = token.fullnames
                    session.user.email = token.email
                    session.user.role = token.role
                    session.user.image = token.profilephoto
                    session.user.payloadToken = token.payloadToken
                    session.maxAge = token.expiry
                    session.expires = token.expires
                    return session
                }

            }
            return null
        },
        async jwt({ token }) {
            if (token) {
                const expiryTime = new Date(token.expires);
                const currentTime = new Date();
                if (currentTime >= expiryTime){
                    return null
                }

                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/account/me', {
                    headers: {
                        Authorization: `JWT ${token.email}`
                    }
                })
                 
               

                if (response && response.data.user !== null) {
                    const user = response.data.user
                    const payloadToken = response.data.token
                    const expiry = response.data.exp - Math.floor(Date.now() / 1000)
                    const formattedExpDate = new Date(response.data.exp * 1000).toISOString();
                    return {
                        id: user.id,
                        name: user.firstName + ' ' + user.lastName,
                        email: user.email,
                        role: user.roles[0],
                        profilephoto: user.profilephoto,
                        payloadToken,
                        expiry,
                        expires: formattedExpDate
                    }
                }
               
            }

            return token
        }
    },

    pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
    }
}