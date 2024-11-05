const ProductCardSkelton = () => {
  return (
    <div className="relative flex flex-row gap-4 items-center">
      <div className="size-20 skeleton-img" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3">
          <div className="w-[207px] h-10 skeleton-line" />
          <div className="size-7 skeleton-icon" />
        </div>
        <div className="w-[247px] h-6 skeleton-line" />
      </div>
    </div>
  );
};

export default ProductCardSkelton;
