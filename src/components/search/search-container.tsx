"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchProducts } from "@/api/product/queries";
import SearchHeader from "@/components/search/search-header";
import SearchResult from "@/components/search/search-result";
import RecentSearch from "./recent-search";
import { isUndefined } from "@/utils/type-guard";

const SearchContainer = () => {
  const method = useForm<ProductParamsType>({
    defaultValues: {
      ordering: "-discount_rate",
    },
  });
  const { watch, handleSubmit, getValues } = method;

  // debounce 적용할 객체
  const formParams: ProductParamsType = {
    search: watch("search"),
    is_out_of_stock: watch("is_out_of_stock"),
    is_lowest_price_ever: watch("is_lowest_price_ever"),
    ordering: watch("ordering"),
  };

  // formParams에 debounce 적용
  const debouncedParams = useDebounce(formParams);

  // react-query로 데이터 페칭
  const { data, isLoading, refetch } = useSearchProducts(debouncedParams);

  const onSubmit = handleSubmit(() => {
    if (isLoading) return;
    refetch();
  });

  useEffect(() => {
    if (debouncedParams.search) {
      refetch();
    }
  }, [debouncedParams]);

  return (
    <FormProvider {...method}>
      <form className="px-4 pt-16 text-ELSE-33 " onSubmit={onSubmit}>
        <SearchHeader />
        {isUndefined(getValues("search")) || getValues("search") === "" ? (
          <RecentSearch />
        ) : (
          <SearchResult data={data} isLoading={isLoading} />
        )}
      </form>
    </FormProvider>
  );
};

export default SearchContainer;
