import ProductDetailNav from "@/components/layout/product-detail-nav";

export default function ProductDeatilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-16">
      {children}
      <ProductDetailNav />
    </div>
  );
}
