import SignUpForm from "@/components/user/sign-up/signup-contaioner";
const SignUpPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/nickname`,
    {
      cache: "no-store",
    }
  );

  const { nickname, error: nicknameError } = await res.json();

  if (nicknameError) {
    throw new Error(nicknameError);
  }

  return (
    <>
      <SignUpForm defaultNickname={nickname} />
    </>
  );
};

export default SignUpPage;
