import ProductDetailNav from "@/components/layout/product-detail-nav";

export default function ProductDeatilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-[66px] pb-24">{children}</div>;
}
