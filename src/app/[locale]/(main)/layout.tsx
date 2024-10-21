import BottomNav from "@/components/layout/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[64px]">
      {children}
      <BottomNav />
    </div>
  );
}
