import { useEffect, useRef } from "react";
type IntersectionObserverProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export const useIntersectionObserver = ({
  fetchNextPage,
  hasNextPage,
}: IntersectionObserverProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const target = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 화면에 보이고 hasNextPage가 true이면
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.25,
      }
    );
    observer.observe(target);
    //컴포넌트가 언마운트되거나 의존성이 변경될 때 실행되며, observerRef.current 요소의 관찰을 중단
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, fetchNextPage]);
  return observerRef;
};
