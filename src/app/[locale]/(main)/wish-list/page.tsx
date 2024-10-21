import BottomNav from "@/components/layout/bottom-nav";
import WishListHeader from "@/components/wish-list/wish-list-header";
import WishListNoContents from "@/components/wish-list/wish-list-nonecontents";

const page = ({ params: { locale } }: PageProps) => {
  const number = 5; //예시
  return (
    <>
      <div className="grid gap-4 p-4">
        <WishListHeader wishListNumber={number} />
        <WishListNoContents params={{ locale }} />
      </div>
      <BottomNav />
    </>
  );
};
export default page;
