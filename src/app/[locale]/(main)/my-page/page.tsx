import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserInfo } from "@/api/user/apis";
import MyPageContainer from "@/components/my-page/my-page-container";
import { USER_INFO } from "@/constants/query-keys";

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [USER_INFO],
    queryFn: () => getUserInfo(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageContainer />
    </HydrationBoundary>
  );
};
export default page;
