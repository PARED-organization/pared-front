import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
import PostDetail from "./components/PostView";
import { cookies } from "next/headers";
import axios from "axios";
import ServerAxiosApi from "@/app/(beforeLogin)/login/_component/ServerAxiosApi";
export default async function Page({params}){

  const {postId} = await params;
  
  const res = await ServerAxiosApi.get(
    `api/v1/article/read-article/${postId}`
  )
  
  return <PostDetail initialData={res.data.data.articleDTO}/>
}