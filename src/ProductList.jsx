import { useParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import SimpleProductList from "./components/SimpleProductList";
import ShopProductList from "./components/ShopProductList";

function ProductList() {
  const params = useParams();
  const list = useSelector((state) => state.lists).find(
    (list) => list.id === params.id
  );
  const products = useSelector((state) => state.products).filter(
    (product) => product.idList === params.id
  );

  return (
    <>
      {list.type != "shopping-list" ? (
        <SimpleProductList list={list} products={products} />
      ) : (
        <>
          <ShopProductList list={list} products={products} />
        </>
      )}
    </>
  );
}

export default ProductList;
