export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full px-4">{children}</div>;
}
