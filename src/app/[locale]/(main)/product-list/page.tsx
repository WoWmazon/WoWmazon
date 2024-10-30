"use server";

import ProductList from "@/components/products/product-List";
import ProductListHeader from "@/components/products/product-list-header";

const page = async () => {
  return (
    <>
      <ProductListHeader />
      <ProductList />
    </>
  );
};
export default page;
