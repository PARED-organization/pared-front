import { create } from "zustand"

interface UpdatePostInfo{
    title:string;
    content:string;
    articleTopic:string;
    isPublicOpen:boolean;
    tagNameList?:string[];
    setTitle:(title:string)=>void;
    setBeforeData:(title,content,articleTopic,isPublicOpen,tagNameList)=>void;
    
}

export const useUpdatePostInfo = create<UpdatePostInfo>((set,get)=>({
    title:'',
    content:'',
    articleTopic:'',
    isPublicOpen:false,
    setTitle:(title)=>set({title}),
    setBeforeData:(title, content, articleTopic, isPublicOpen, tagNameList) => set({title,content,articleTopic,isPublicOpen,tagNameList}),
}));