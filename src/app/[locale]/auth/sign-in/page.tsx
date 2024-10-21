import Image from "next/image";

import NitoLogo from "@/assets/icons/logo_white.svg";
import { getCookie, setCookie } from "@/utils/cookie";
import { isUndefined } from "@/utils/type-guard";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const device = getCookie("device");
  const refreshToken = getCookie("refreshToken");

  const {
    accessToken,
    refreshToken: newRefreshToken,
    error,
  } = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/login`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ device, refreshToken }),
  }).then((res) => res.json());

  if (!isUndefined(error)) {
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", newRefreshToken);

    redirect("/");
  }

  return (
    <div className="absolute flex flex-col top-0 left-0 size-full bg-SYSTEM-main bg-signin text-SYSTEM-white">
      <div className="flex flex-col gap-3 justify-end items-center h-96">
        <div>
          <p className="text-sm leading-[18px]">
            Lowest price notification platform
          </p>
          <p className="text-[26px] leading-[38px]">최저가 알림 플랫폼</p>
        </div>
        <Image src={NitoLogo} alt="nito-logo" width={135} height={50} />
      </div>
    </div>
  );
};
export default SignInPage;
