"use client";
import { getProductList } from "@/api/product/apis";
import ProductCard from "@/components/products/productCard";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState<productProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList();

        const mappedProducts = data.map((items: productProps) => ({
          id: items.id,
          image: items.image,
          title: items.title,
          price: items.price,
          presentPrice: items.presentPrice,
          discountRate: items.discountRate,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("에러:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" text-xl font-bold w-[375px] h-[62px] text-center content-center">
          상품 리스트
        </div>
      </div>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </>
  );
};
export default page;
