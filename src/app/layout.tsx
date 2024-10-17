import LocaleButton from "@/components/locale-button";
import "../css/index.css";
import type { Metadata } from "next";
import Head from "next/head";

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={"font-pretendard"}>
        <LocaleButton />
        <div className="min-h-screen flex justify-center items-center bg-gray-300">
          <br />
          <div className="w-full sm:w-[375px] min-h-screen md:min-h-[738px] bg-white p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
