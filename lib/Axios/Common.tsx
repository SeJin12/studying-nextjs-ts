//https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0

import axios, { AxiosInstance, AxiosResponse } from "axios";

const SERVER_URL: string = "http://127.0.0.1:3000/";
const ACCESS_TOKEN: string | undefined = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    access_token: `${ACCESS_TOKEN}`,
  },
});

export const defaultGet = async (api: string, parameters: any) => {
  return await axios.get(api, parameters);
};

export const defaultPost = async (api: string, parameters: any) => {
  return await axios.post(api, parameters);
};

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
