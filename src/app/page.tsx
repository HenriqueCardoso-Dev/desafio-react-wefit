'use client'

import CartIcon from "@/assets/CartIcon";
import { intMovie } from "@/interfaces/products";
import { Card, CardButton, Wrapper } from "@/styles/card";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState<intMovie[]>();
  const [shoppingCart, setShoppingCart] = useState<intMovie[]>();

  const getProducts = () : any => {
    fetch('http://localhost:8080/products')
    .then((res) => res.json())
    .then((data) => setMovies(data))
  }

  const handleProduct = async (product : intMovie) => {
    let currentCart = localStorage.getItem('shopping_cart');

    let addProduct = [];

    if (currentCart !== null) {
      addProduct = JSON.parse(currentCart);
    }

    function alreadyHave(item: intMovie) {
      return item.id === product.id;
    }

    if(addProduct.find(alreadyHave) !== undefined) {
      for(let index = 0; index < addProduct.length; index +=1) {
        if (addProduct[index].id === product.id) {
          addProduct[index].qtd = addProduct[index].qtd + 1;
        }
      }
    } else {
      addProduct = [...addProduct, {
        ...product,
        qtd: 1
      }];
    }

    window.location.reload();

    localStorage.setItem('shopping_cart', JSON.stringify(addProduct));

    //window.location.reload();
  }

  useEffect(() => {
    getProducts();
    const search = localStorage.getItem('shopping_cart');
    
      if(search !== null && search !== '' && search !== '[]') {
        setShoppingCart(JSON.parse(search));
      }
  },[])

  return (
    <Wrapper>
      {movies?.map((item : intMovie, key ?: number) => {
        return <Card key={key}>
          <img src={item.image} height={188} width={147} className="mb-[9px]" />

          {item.title}

          <span className="text-[#2F2E41] text-base">R${item.price}</span>

          {shoppingCart?.find((res : intMovie) => res.id === item.id) !== undefined && 
            <CardButton onClick={() => handleProduct(item)} active={true}>
              <CartIcon/>
              <span>
                {shoppingCart?.find((res : intMovie) => res.id === item.id)?.qtd || 0}
              </span>
              <span className="ml-3">ITEM ADICIONADO</span>
            </CardButton>
          }
          
          {shoppingCart?.find((res : intMovie) => res.id === item.id) === undefined && 
            <CardButton onClick={() => handleProduct(item)} active={false}>
              <CartIcon/>
              <span>
                {shoppingCart?.find((res : intMovie) => res.id === item.id)?.qtd || 0}
              </span>
              <span className="ml-3">ADICIONAR AO CARRINHO</span>
            </CardButton>
          }
          
        </Card>
      })}
    </Wrapper>
  );
}
