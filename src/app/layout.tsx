import Image from "next/image";
import LocaleButton from "@/components/locale-button";

import MainImage from "@/assets/images/main-mid.png";
import "../css/index.css";
import QueryProviders from "@/providers/query-provider";
import CommonContainer from "@/components/layout/common-container";
import { DEFAULT_METADATA } from "@/utils/metadata-utils";

export const metadata = DEFAULT_METADATA;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta
          name="google-site-verification"
          content="EVkprIhe7vdIDDGFY0-G0Z6Va_DlFFgzm1RUGdbjKWU"
        />
      </head>
      <body className={"font-pretendard"}>
        <div className="absolute z-50">
          <LocaleButton />
        </div>
        <div className="max-h-screen bg-SYSTEM-main overflow-hidden select-none">
          <div className="relative px-0 sm:px-6 md:px-10">
            <div className="flex justify-center lg:justify-around">
              <div className="hidden lg:flex flex-col">
                <Image src={MainImage} alt="nito-main" width={400} priority />
              </div>
              <div className="w-full max-w-[500px] lg:w-[375px] h-screen bg-SYSTEM-white">
                <div
                  id="chidrenWrapper"
                  className="relative h-full overflow-y-auto scrollbar-none"
                >
                  <QueryProviders>
                    {children}
                    <CommonContainer />
                  </QueryProviders>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
