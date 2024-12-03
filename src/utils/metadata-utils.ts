import { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {
  applicationName: "Nito",
  title: "Nito | Wowmazon",
  description:
    "관심있는 아마존 상품을 추가하고 최저가 추적 서비스를 통해 최저가 쇼핑이 가능합니다.",
  keywords: [
    "Wowmazon",
    "amazon",
    "Nito",
    "Lowest Price",
    "아마존",
    "와우마존",
    "아마존최저가",
    "쇼핑",
    "최저가쇼핑",
  ],
  icons: {
    icon: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    title: "아마존 최저가 추적 웹사이트 Nito | Wowmazon",
    description:
      "관심있는 아마존 상품을 추가하고 최저가 추적 서비스를 사용해보세요.",
    url: "https://wowmazon.vercel.app",
    siteName: "Nito",
    images: [
      {
        url: "https://wowmazon.vercel.app/images/og/open-graph.png",
      },
    ],
  },
};
