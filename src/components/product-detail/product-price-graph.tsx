"use client";

import Image from "next/image";
import grahp from "@/assets/images/grahp.jpg";
import { useState } from "react";

type TabOption = "1개월" | "3개월";

// API : price history 목록 조회(가격 그래프) GET _ /v1/price_history

// 그래프 구현
// 그래프 밑에 날짜 -> 탭 선택에 따라서 다르게 출력되어야 함

const ProductPriceGraph = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>("1개월");
  const tabStyle = "w-full text-md content-center rounded-sm";
  const seletedTabStyle = "bg-white text-SYSTEM-black";
  const notSeletedTabStyle =
    "text-ELSE-F8 bg-ELSE-EC hover:bg-white hover:text-SYSTEM-black";
  return (
    <div className="px-4 py-5 bg-SYSTEM-white">
      <p className="font-bold mb-2">가격 그래프</p>
      <ul className="flex h-[31px] items-center text-center content-center">
        {/*  {["1개월", "3개월"].map((tab) => (
            <li key={tab} className="w-full text-md content-center rounded-sm">
              <a
                href="#"
                onClick={() => setSelectedTab(tab as TabOption)}
                className={`
                inline-block w-full p-1 border border-gray-200 
                ${
                  selectedTab === tab
                    ? "bg-white text-SYSTEM-black"
                    : "text-ELSE-F8 bg-ELSE-EC hover:bg-white hover:text-SYSTEM-black"
                  } 
                `}
                >
                {tab}
              </a>
            </li>
          ))}
        </ul> */}
        <li key="1month" className={tabStyle}>
          <a
            href="#"
            onClick={() => setSelectedTab("1개월")}
            className={`
                inline-block w-full p-1 border border-gray-200 
                ${
                  selectedTab === "1개월" ? seletedTabStyle : notSeletedTabStyle
                } 
              `}
          >
            1개월
          </a>
        </li>
        <li key="3month" className={tabStyle}>
          <a
            href="#"
            onClick={() => setSelectedTab("3개월")}
            className={`
              inline-block w-full p-1 border border-gray-200 
              ${selectedTab === "3개월" ? seletedTabStyle : notSeletedTabStyle} 
            `}
          >
            3개월
          </a>
        </li>
        {/* ))} */}
      </ul>
      <Image src={grahp} alt="price-grahp" width={375} height={295} />
    </div>
  );
};
export default ProductPriceGraph;
