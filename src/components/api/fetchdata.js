import axios from 'axios'


export const papikey = process.env.NEXT_PUBLIC_PAYLOAD_API_KEY
export const gqlapi = process.env.NEXT_PUBLIC_SERVER_URL+"/api/graphql"



const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        Authorization: `account API-Key ${process.env.NEXT_PUBLIC_PAYLOAD_API_KEY}`
    }
});



export const fetcher = (path) => instance.get(path).then(res => res)

export const sender = (path) => instance.post(path)

export const adminfetcher = (path) => instance.get(path).then(res => res)

export const getdata = (path) => instance.get(path).then(res => res)





