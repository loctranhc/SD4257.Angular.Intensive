import axios, {AxiosRequestConfig, RawAxiosRequestHeaders} from "axios";
import {environment} from "../environments/environment";

const client = axios.create({
  baseURL: environment.apiHost
});

const config: AxiosRequestConfig = {
  headers: {
    'Accept': 'application/json'
  } as RawAxiosRequestHeaders,
};

export {
  client,
  config
}
