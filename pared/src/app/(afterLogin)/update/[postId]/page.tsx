import ServerAxiosApi from "@/app/(beforeLogin)/login/_component/ServerAxiosApi";
import UpdateDetail from "./components/UpdateDetail";
export default async function Page({params}){

    const {postId} = await params;

    const res = await ServerAxiosApi.get(
        `api/v1/article/update-single-article/${postId}`
    );

    return <UpdateDetail initialData={res.data.data.articleDTO}/>
}