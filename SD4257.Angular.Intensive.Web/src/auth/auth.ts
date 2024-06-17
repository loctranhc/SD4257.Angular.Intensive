import {USER_INFO} from "../services/constants";
import UserInfo from "../models/UserInfo";

const isAuthenticated = ()=>{
  return !!localStorage.getItem(USER_INFO);
}

const setUser = (user: UserInfo)=>{
  localStorage.setItem(USER_INFO, JSON.stringify(user));
}

const removeUser = ()=>{
  localStorage.removeItem(USER_INFO);
}

const getUserInfo = () => {
  return localStorage.getItem(USER_INFO);
}

export {
  isAuthenticated,
  setUser,
  removeUser,
  getUserInfo,
}
