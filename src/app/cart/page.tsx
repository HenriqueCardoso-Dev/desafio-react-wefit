'use client'

import { useEffect, useState } from "react";
import { MainSection } from "./style";
import emptyImage from './../../assets/empty-cart.png';
import { CardButton } from "@/styles/card";
import { useRouter } from "next/navigation";
import { intMovie } from "@/interfaces/products";
import AddIcon from "@/assets/addIcon";
import SubIcon from "@/assets/SubIcon";
import TrashIcon from "@/assets/TrashIcon";

export default function Cart () {

    const router = useRouter();
    const [emptyCart, setEmptyCart] = useState<boolean>(true);
    const [currentCart, setCurrentCart] = useState<intMovie[]>([]);

    const sum = (ar: intMovie[]) : number => {
        let total : number = 0;
        
        for(let index = 0; index < ar?.length; index += 1) {
            total = total + ((ar[index].qtd ?? 1) * ar[index]. price);
        } 

        console.log(total);
        

        return total;
    }

    const removeProductFromCart = (id: number) => {
        let filteredCart = currentCart.filter(item => item.id !== id);

        setCurrentCart(filteredCart);
        localStorage.setItem('shopping_cart', JSON.stringify(filteredCart));

        if (localStorage.getItem('shopping_cart') === '[]'){
            localStorage.clear();
            window.location.reload();
        }

    }

    useEffect(() => {
        const search = localStorage.getItem('shopping_cart');
    
        if(search !== null && search !== '' && search !== '[]') {
            setEmptyCart(false);
            setCurrentCart(JSON.parse(search));
        }
    
    }, [])

    return (
        <MainSection className="my-6  py-6">
            {emptyCart && <div className="flex flex-col justify-items-center items-center">
                <h1 className="text-xl text-[#2F2E41] font-bold">Parece que não há nada por aqui :(</h1>

                <img src={emptyImage.src} className="my-8" />

                <CardButton className="max-w-[180px]" onClick={() => router.push('/')}  active={false}>
                    <span className="text-sm">VOLTAR</span>
                </CardButton>

            </div>}

            {!emptyCart && <div className="px-8">
                <table className="font-bold w-full">
                    <thead>
                        <tr className="text-[#999] flex w-full justify-between">
                            <th>PRODUTO</th>
                            <th>QTD</th>
                            <th>SUBTOTAL</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentCart?.map((item: intMovie, key: number) => {
                        return <tr className="text-[#2F2E41] flex w-full justify-between max-w-[902px] font-bold" key={key}>
                            <td className="flex items-center">
                                <img src={item.image} width={89}/>
                                <span className="text-sm ml-5">
                                    {item.title}
                                    <br />
                                    R${item.price.toString().replace('.', ',')}
                                </span>
                            </td>

                            <td className="flex items-center">
                                <AddIcon/>
                                <input type="number" defaultValue={item.qtd} className="pl-4 rounded border-[1px] max-w-[62px] h-[26px] mx-2.5"/>
                                <SubIcon/>
                            </td>

                            <td className="flex items-center">
                                <p>R${((item.qtd ?? 1) * item.price).toString().replace('.', ',')}</p>
                            </td>

                            <td className="flex items-center">
                                <button onClick={() => removeProductFromCart(item.id)}>
                                    <TrashIcon/>
                                </button>
                            </td>
                        </tr>
                        })} 
                    </tbody>
                </table>
                <hr className="border-1"/>

                <div className="flex w-full justify-between cart-footer font-bold">
                    <CardButton className="max-w-[235.42px] mt-5" onClick={() => router.push('/purchaseCompleted')}  active={false}>
                        FINALIZAR PEDIDO
                    </CardButton>

                    <div className="mt-5">
                        <span className="text-sm text-[#999] mr-6">TOTAL</span>
                        <span className="text-2xl text-[#2F2E41]">R${sum(currentCart).toString().replace('.', ',')}</span>
                    </div>
                </div>

                   
            </div>}
        </MainSection>
    )
}