import WishListContainer from "@/components/wish-list/wish-list-container";

const page = ({ params: { locale } }: PageProps) => {
  return (
    <div className="grid gap-4 p-4">
      <WishListContainer params={locale} />
    </div>
  );
};
export default page;
