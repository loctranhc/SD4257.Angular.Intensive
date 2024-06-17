import {client, config} from "./http.client.initial";

const loginAsync = async (userName: string, password: string) => {
  return await client.post('/api/user/login', {
    "UserName": userName,
    "Password": password
  }, config)
}

const upsertAsync = async (fullName: string, userName: string, password: string) => {
  return await client.post('/api/user/upsert', {
    "FullName": fullName,
    "UserName": userName,
    "Password": password
  }, config)
}

export {
  loginAsync,
  upsertAsync
}
