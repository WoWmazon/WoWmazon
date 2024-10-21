import SignUpForm from "@/components/user/sign-up/signup-contaioner";
import { setCookie } from "@/utils/cookie";
import { randomUUID } from "crypto";

const SignUpPage = async ({ params: { locale } }: PageProps) => {
  const { nickname, error: nicknameError } = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/nickname`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  if (nicknameError) {
    throw new Error(nicknameError);
  }

  const registerUser = async (data: FormInput) => {
    "use server";

    const osList: ("android" | "ios")[] = ["android", "ios"];

    const deviceInfo: DeviceType = {
      os: osList[Math.round(Math.random())],
      uid: "uid:" + randomUUID(),
      token: "token:" + randomUUID(),
    };

    const { nickname, checkAge, checkService, checkMarketing } = data;

    const registerBody = {
      lang: locale,
      isAlarm: true,
      nickname: nickname,
      agreement: {
        isOverAge14: checkAge,
        isServiceAccept: checkService,
        isInfoAccept: checkService,
        isMarketing: checkMarketing,
      },
      device: deviceInfo,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/register`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(registerBody),
      }
    ).then((res) => res.json());

    const { accessToken, refreshToken } = res;

    setCookie("accessToken", accessToken, { httpOnly: true, secure: true });
    setCookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    setCookie("device", JSON.stringify(deviceInfo), {
      httpOnly: true,
      secure: true,
    });
  };

  return (
    <>
      <SignUpForm defaultNickname={nickname} registerUser={registerUser} />
    </>
  );
};

export default SignUpPage;
