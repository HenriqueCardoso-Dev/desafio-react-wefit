'use client'

import BasketIcon from "@/assets/BasketIcon";
import { HeaderSection } from "@/styles/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {

    const router = useRouter();

    const [itemsCount, setItemsCount] = useState<number>(0);

    useEffect(() => {

        const data = localStorage.getItem('shopping_cart');
    
        if(data) {
            setItemsCount(JSON.parse(data).length)
        }

    }, [])

    return (
        <HeaderSection className="mt-6 flex justify-between max-w-[960px] mx-auto">
            <h1 className="text-xl" onClick={() => router.push('/')}>WeMovies</h1>

            <div id="shopping-car" className="flex items-end cursor-pointer" onClick={() => router.push('/cart')}>
                <div className="mr-2">
                    <p className="text-sm">Meu Carrinho</p>
                    <span className="text-xs">{itemsCount} itens</span>
                </div>

                <BasketIcon/>
            </div>
        </HeaderSection>
    )
}