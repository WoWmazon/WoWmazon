const RelatedProductCardSkeleton = () => {
  return (
    <div className="h-full w-[120px]">
      <div className="size-[120px] skeleton" />
      <div className="w-[120px] h-5 mt-3 skeleton" />
      <div className="mt-3 w-14 h-5 skeleton" />
      <div className="mt-2 w-20 h-4 skeleton" />
    </div>
  );
};

export default RelatedProductCardSkeleton;
