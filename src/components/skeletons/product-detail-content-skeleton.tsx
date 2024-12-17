const ProductDetailContentSkeleton = () => {
  return (
    <div className="bg-SYSTEM-white">
      <div className="w-full aspect-square skeleton" />
      <div className="p-4 border">
        <div className="w-52 h-6 skeleton" />
        <div className="mt-3 w-36 h-6 skeleton" />
        <div className="my-3 h-10 flex items-center gap-3">
          <div className="w-24 h-10 skeleton" />
          <div className="w-28 h-6 skeleton" />
        </div>
        <div className="w-80 h-4 skeleton" />
        <div className="mt-4 w-full h-14 skeleton" />
      </div>
    </div>
  );
};

export default ProductDetailContentSkeleton;
