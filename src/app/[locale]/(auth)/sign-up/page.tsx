import SignUpForm from "@/components/user/sign-up/sign-up-form";

const SignUpPage = async () => {
  const { nickname, error } = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/nickname`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <SignUpForm defaultNickname={nickname} />
    </>
  );
};
export default SignUpPage;
