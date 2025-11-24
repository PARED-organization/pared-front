import ServerAxiosApi from "@/app/(beforeLogin)/login/_component/ServerAxiosApi";
import HomePageDetail from "./components/HomePage";

export default async function Home(){
    const res = await ServerAxiosApi.get("/api/v1/home/entrance");
    const currentUser = await ServerAxiosApi.get("/api/v1/user/logined-user-info");
    console.log(currentUser.data.data);
    return <HomePageDetail/>
}