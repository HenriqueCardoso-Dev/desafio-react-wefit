'use client'

import { MainSection } from "../cart/style";
import purchaseSuccess from '../../assets/purchase-success.png';
import { CardButton } from "@/styles/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function purchaseCompleted () {

    const router = useRouter();


    useEffect(() => {
        localStorage.clear();
    }, [])

    return (
        <MainSection className="flex flex-col justify-items-center items-center my-6  py-6 text-xl text-[#2F2E41] font-bold">
            <h1 className="mb-8">Compra realizada com sucesso!</h1>

            <img src={purchaseSuccess.src} height={307} className="mb-8"/>

            <CardButton className="max-w-[180px]" onClick={() => router.push('/')} active={false}>
                <span className="text-sm">VOLTAR</span>
            </CardButton>


        </MainSection>
    )
}