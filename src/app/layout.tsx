import type { Metadata } from "next";
import Image from "next/image";
import LocaleButton from "@/components/locale-button";
import QueryProviders from "@/providers/query-provider";

import MainImage from "@/assets/images/main-mid.png";
import "../css/index.css";

export const metadata: Metadata = {
  title: "Nito",
  description: "Amazon Lowest Price Monitoring Service",
  icons: {
    icon: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={"font-pretendard"}>
        <div className="absolute z-50">
          <LocaleButton />
        </div>
        <div className="max-h-screen bg-SYSTEM-main overflow-hidden">
          <div className="relative px-0 sm:px-6 md:px-10">
            <div className="flex justify-center lg:justify-around">
              <div className=" hidden lg:flex flex-col">
                <Image src={MainImage} alt="nito-main" width={400} priority />
              </div>
              <div className="w-full max-w-[375px] h-screen bg-SYSTEM-white">
                <div
                  id="chidrenWrapper"
                  className="relative h-full overflow-y-auto scrollbar-none"
                >
                  <QueryProviders>{children}</QueryProviders>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
