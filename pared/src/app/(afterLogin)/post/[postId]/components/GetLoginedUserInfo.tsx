import ServerAxiosApi from "@/app/(beforeLogin)/login/_component/ServerAxiosApi";

export default async function GetLoginedUserInfo(){
    const res = await ServerAxiosApi.get("/api/v1/user/logined-user-info");
    return res.data.data.userDTO;
}