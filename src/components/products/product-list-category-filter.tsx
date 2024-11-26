"use client";

import CategoryDropDown from "./category-drop-down";
import { useInfiniteCategory } from "@/hooks/useInfiniteCategoryId";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState } from "react";
import ProductList from "./product-list";
import SearchFilter from "../search/search-filter";
import { useInfiniteScrollProductList } from "@/hooks/useInfiniteProductList";
import { useProductParamsStore } from "@/stores/prooduct/stores";

const ProductListCategoryFilter = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  const searchParams = useProductParamsStore((state) => state.searchParams);

  /**[카테고리 인피니티쿼리] */
  const {
    data: categoryData,
    fetchNextPage: categoryFetchNextPage,
    hasNextPage: categoryHasNextPage,
  } = useInfiniteCategory();

  /**[서치필터 인피니티쿼리] */
  const {
    data: productData,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteScrollProductList({
    ...searchParams,
    category_id: selectedCategoryId,
    search: undefined,
  });

  /**[카테고리 옵저버] */
  const categoryIntersectionObserverRef = useIntersectionObserver({
    fetchNextPage: categoryFetchNextPage,
    hasNextPage: categoryHasNextPage,
  });

  /**[서치필터 옵저버] */
  const productIntersectionObserverRef = useIntersectionObserver({
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
  });

  /**[카테고리 맵핑] */
  const categories =
    categoryData?.pages.flatMap((page) =>
      page.results.map((item) => ({ id: item.id, enTitle: item.enTitle }))
    ) || [];

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };
  return (
    <>
      <div className="flex flex-col pt-4 pb-2 px-4 gap-2">
        <CategoryDropDown
          categories={categories.map((category) => category.enTitle)}
          onSelect={(category) => {
            const categoryId =
              categories.find((cat) => cat.enTitle === category)?.id || null;
            handleCategorySelect(categoryId!);
          }}
        />
        <div ref={categoryIntersectionObserverRef} />
        <SearchFilter count={productData?.pages[0].count || 0} />
      </div>
      <ProductList
        products={productData?.pages.flatMap((page) => page.results) || []}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isError={isError}
        productIntersectionObserverRef={productIntersectionObserverRef}
      />
    </>
  );
};
export default ProductListCategoryFilter;
