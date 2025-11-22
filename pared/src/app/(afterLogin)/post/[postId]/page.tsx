import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
import PostDetail from "./components/PostView";
import { cookies } from "next/headers";
import axios from "axios";
export default async function Page({params}){

  const {postId} = await params;
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("Authorization");
  const refreshToken = (await cookieStore).get("Authorization-refresh");

  const res = await axios.get(`/api/v1/article/read-article/${postId}`,{
    headers:{
        'Cookie':`Authorization=${accessToken?.value};Authorization-refresh=${refreshToken?.value}`,
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true
  });
  
  return <PostDetail initialData={res.data.data.articleDTO}/>
}