import api from "@/app/(beforeLogin)/login/_component/AxiosApi";
import PostDetail from "./components/PostView";
import { cookies } from "next/headers";
import axios from "axios";
import ServerAxiosApi from "@/app/(beforeLogin)/login/_component/ServerAxiosApi";
import {redirect} from "next/navigation"
import GetLoginedUserInfo from "./components/GetLoginedUserInfo";
import OnlyModal from "./components/OnlyModal";

export default async function Page({params}){

  const {postId} = await params;


  try{
    const res = await ServerAxiosApi.get(
    `api/v1/article/read-article/${postId}`
  )

  if(res.data.status==="ERROR"){
    redirect("/home");
  }

  const currentUser = await ServerAxiosApi.get("/api/v1/user/logined-user-info");
  
  return <PostDetail initialData={res.data.data.articleDTO} postId={postId} currentUser={currentUser.data.data.userDTO}/>
  } catch(e){
    
    return <OnlyModal message={"회원으로만 공개된 게시글입니다."} redirectPath={"/home"}  />
  }
  
}