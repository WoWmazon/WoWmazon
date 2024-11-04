"use client";
import { useEffect, useRef, useState } from "react";
import { getProductList } from "@/api/product/apis";
import ProductCard from "@/components/products/productCard";
import { useInfiniteQuery } from "@tanstack/react-query";

const ProductList = () => {
  const [products, setProducts] = useState<ProductResultType[]>([]);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await getProductList();
  //       console.log(data, "data");
  //       if (data && data.results) {
  //         const mappedProducts = data.results.map((item) => ({
  //           id: item.id,
  //           image: item.image,
  //           title: item.title,
  //           price: item.price,
  //           presentPrice: item.presentPrice,
  //           discountRate: item.discountRate,
  //         })) as ProductResultType[];
  //         setProducts(mappedProducts); // 정상 동작
  //       } else {
  //         setProducts([]); // 데이터가 없을 경우 빈 배열 설정
  //       }
  //     } catch (error: unknown) {
  //       console.error("에러:", error);
  //       setError("상품을 불러오는 중 오류가 발생했습니다.");
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  // if (error) {
  //   return <p>{error}</p>;
  // }
  const {
    data,
    fetchNextPage, //스크롤 다운시 추가데이터를 로드 getNextPageParam에서 정의된 로직에따라 데이터 자동요청
    fetchPreviousPage, //스크롤업시 이전데이터 로드. getPreviousPageParam
    hasNextPage, //true이면 더로드할 다음페이지가 존재
    hasPreviousPage, //true이면 더 로드할 이전페이지가 존재
    isFetchingNextPage, //다음페이지 로딩중인지 여부
    isFetchingPreviousPage, // 이전페이지 로딩중인지 여부
    ...result //data, error, status, isFetching, isError, isLoading, refetch 등의 useQuery 속성 및 메소드가 포함
  } = useInfiniteQuery({
    queryKey: ["productList"],
    queryFn: ({ pageParam = "" }) => getProductList(pageParam),
    initialPageParam: "", //초기페이지매개변수
    //이전 페이지 데이터를어떻게 처리할지 정의.
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.cursor,
    maxPages: 5, //캐시에 저장할 최대 페이지 수
  });

  const observerRef = useRef(null);

  //스크롤 이벤트 핸들러
  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.results);
      setProducts(allProducts);
    }
  }, [data]);
  //observer 설정
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    //요소가 뷰포트에 들어오거나 나갈때 호출되는 콜백함수를정의
    const observer = new IntersectionObserver((entries) => {
      // 요소가 화면에 보이고 hasNextPage가 true이면
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    //observerRef.current가 참조하는 요소를 IntersectionObserver에 관찰 대상으로 추가
    //해당 요소가 화면에 보일때마다 IntersectionObserver의 콜백 함수가 호출
    observer.observe(observerRef.current);
    //컴포넌트가 언마운트되거나 의존성이 변경될 때 실행되며, observerRef.current 요소의 관찰을 중단
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, fetchNextPage]);
  console.log(data, "dataaa");
  return (
    <>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      ) : (
        <div ref={observerRef}>{isFetchingNextPage && <p>로딩 중...</p>}</div>
      )}
    </>
  );
};

export default ProductList;
