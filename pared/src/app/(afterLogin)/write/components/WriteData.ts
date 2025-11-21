import {create} from "zustand"

interface WriteInfo{
    title:string;
    content:string;
    articleTopic: 'COMMUNITY'|'QNA'|'INFORMATION'|'ANNOUNCEMENT'
    isOpenRange: boolean
    hashTags: string[];
    setContent:(content:string)=>void;
    setBoard:(title,openRange,hashTags)=>void;
}

export const useWriteInfo = create<WriteInfo>((set,get)=>({
    title:'',
    content:'',
    isOpenRange:true,
    articleTopic:'COMMUNITY',
    hashTags:[],
    setContent: (content:string)=>set({content}),
    setBoard:(title,isOpenRange,hashTags)=>set({title,isOpenRange,hashTags}),
}))