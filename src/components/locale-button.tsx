"use client";
import { usePathname, useRouter } from "next/navigation";

const LocaleButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    // router.push(`/${newLocale}${pathname}`); // URL 경로에 locale을 반영
    window.location.href = `/${newLocale}${window.location.pathname}`;
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ko")}>한국어</button>
    </div>
  );
};

export default LocaleButton;
