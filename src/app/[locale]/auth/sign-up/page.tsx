import { fetchRandomNickname } from "@/api/user/apis";
import SignUpContainer from "@/components/user/sign-up/signup-container";

const SignUpPage = async () => {
  const defaultNickname = await fetchRandomNickname();

  return <SignUpContainer defaultNickname={defaultNickname} />;
};

export default SignUpPage;
