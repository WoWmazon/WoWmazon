"use client";

import CategoryDropDown from "./category-drop-down";
import { useInfiniteCategory } from "@/hooks/useInfiniteCategoryId";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState } from "react";
import ProductList from "./product-lists";

const ProductListCategoryFilter = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  const intersectionObserverRef = useIntersectionObserver({
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
  });
  const categories =
    data?.pages.flatMap((page) =>
      page.results.map((item) => ({ id: item.id, enTitle: item.enTitle }))
    ) || [];

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };
  return (
    <>
      <div className=" flex flex-col pt-4 pb-2 px-4 gap-4 ">
        <CategoryDropDown
          categories={categories.map((category) => category.enTitle)}
          onSelect={(category) => {
            const categoryId =
              categories.find((cat) => cat.enTitle === category)?.id || null;
            handleCategorySelect(categoryId!); // 카테고리 ID를 전달
          }}
        />
        <div ref={intersectionObserverRef} />
        <div className="bg-blue-400">필터추가할곳임</div>
      </div>
      <ProductList category_id={selectedCategoryId} />
    </>
  );
};
export default ProductListCategoryFilter;
