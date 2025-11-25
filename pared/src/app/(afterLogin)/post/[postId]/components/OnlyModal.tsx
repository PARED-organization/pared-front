'use client'

import ParedModal from "@/app/(beforeLogin)/login/_component/ParedModal";
import { useModalStore } from "@/app/(beforeLogin)/login/_component/useModalStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function OnlyModal({message,redirectPath}){

    const {openModal } = useModalStore();
    useEffect(()=>{
        openModal(message,{
            showCancelButton:false,
            onConfirm: ()=>redirect(redirectPath)
        })
    },[])
    return(
        <>
        <ParedModal/>
        </>
    )
}