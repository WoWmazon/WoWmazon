import QueryProviders from "@/providers/query-provider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryProviders>{children}</QueryProviders>
);
export default Providers;
