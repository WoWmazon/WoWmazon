const ProductPriceInfoSkeleton = () => {
  return (
    <div className="px-4 py-5 bg-SYSTEM-white">
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA border-b-2 border-ELSE-EC">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <div className="mb-[14px] w-24 h-5 skeleton" />
          <div className="justify-items-end gap-2">
            <div className="mb-2 w-16 h-6 skeleton" />
            <div className="w-24 h-4 skeleton" />
          </div>
        </div>
        <div className="pl-3">
          <div className="mb-[14px] w-24 h-5 skeleton" />
          <div className="justify-items-end gap-2">
            <div className="mb-2 w-16 h-6 skeleton" />
            <div className="w-24 h-4 skeleton" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA">
        <div className="border-r-2 border-ELSE-EC pr-3">
          <div className="mb-[14px] w-14 h-5 skeleton" />
          <div className="justify-items-end gap-2">
            <div className="mb-2 w-16 h-6 skeleton" />
            <div className="w-24 h-4 skeleton" />
          </div>
        </div>
        <div className="pl-3">
          <div className="mb-[14px] w-24 h-5 skeleton" />
          <div className="justify-items-end gap-2">
            <div className="mb-2 w-16 h-6 skeleton" />
            <div className="w-24 h-4 skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPriceInfoSkeleton;
