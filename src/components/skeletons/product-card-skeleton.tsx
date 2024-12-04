const ProductCardSkeleton = () => {
  return (
    <div className="w-full h-[105px] relative grid grid-cols-[80px_auto] gap-4 items-center p-4">
      <div className="h-20 skeleton" />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto_28px] gap-3">
          <div className="h-10 skeleton" />
          <div className="size-7 skeleton" />
        </div>
        <div className="h-6 skeleton" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
