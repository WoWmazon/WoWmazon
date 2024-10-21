import WishListHeader from "@/components/wish-list/wish-list-header";
import WishListNoContents from "@/components/wish-list/wish-list-nonecontents";

const page = ({ params: { locale } }: PageProps) => {
  const number = 5; //예시
  return (
    <div className="grid gap-4">
      <WishListHeader wishListNumber={number} />
      <WishListNoContents locale={locale} />
    </div>
  );
};
export default page;
