import { getRandomNickname } from "@/api/user/apis";
import SignUpContainer from "@/components/user/sign-up/signup-container";

const SignUpPage = async () => {
  const defaultNickname = await getRandomNickname();

  return <SignUpContainer defaultNickname={defaultNickname} />;
};

export default SignUpPage;
