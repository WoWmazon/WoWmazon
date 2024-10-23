"use client";

import { useState } from "react";
import Image from "next/image";
import headset from "@/assets/images/headset.jpg";
import grahp from "@/assets/images/grahp.jpg";
import Badge from "../common/badge";
import arrowUp from "@/assets/icons/badge_arrow_up.svg";
import CustomButton from "../common/custom-button";

type TabOption = "1개월" | "3개월";

// API 연결해서 하드코딩한 거 데이터로 변경
// 그래프 구현
// 그래프 밑에 날짜 -> 탭 선택에 따라서 다르게 출력되어야 함

const ProductDetailContent = async () => {
  const [isActive, setIsActive] = useState(false);

  const handleIconClick = () => {
    setIsActive((prev) => !prev);
  };
  const [selectedTab, setSelectedTab] = useState<TabOption>("1개월");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value as TabOption);
  };

  return (
    <div className="bg-SYSTEM-white">
      <Image src={headset} alt="product-image" width={375} height={295} />
      <div className="p-4 border border-ELSE-EC">
        <p className="mb-3">
          PC, PS4, PS5, Mac, Nintendo Switch용 2.4GHz 무선 게임 헤드셋, 소음
          제거 마이크가 포함된 Bluetooth 5.2 게임 헤드폰.
        </p>
        <div className="flex gap-1.5 mb-1">
          <Badge
            text="역대최저가"
            height="h-[18px]"
            hasIcon={false}
            backgroundColor="bg-ELSE-F0"
            textColor="text-ELSE-C1"
            textSize="text-sm"
            iconWidth={12}
          />
          <Badge
            text="17%"
            height="h-[18px]"
            hasIcon={true}
            iconSrc={arrowUp}
            backgroundColor="bg-ELSE-F0"
            textColor="text-ELSE-C1"
            textSize="text-sm"
            iconWidth={12}
          />
        </div>
        <div className="flex gap-2 text-ELSE-F8">
          <p>List Price</p>
          <p className="line-through">$900.99</p>
        </div>
        <div className="flex gap-2 content-center">
          <p className="text-xxl font-bold">$ 751.99</p>
          <p className="content-center text-ELSE-55">97만 5,226.40원</p>
        </div>
        <p className="text-sm text-ELSE-76 mb-3">
          USD/KRW = 1366.2, 24/10/05 오전 09시15분 기준 UTC+9
        </p>
        <div className="text-md px-3 py-2 bg-ELSE-F5 mb-3">
          <p className="font-bold">아마존 가격</p>
          <p className="text-ELSE-55">
            마지막 업데이트: 1분 전, 마지막 가격 변경: 1일 전
          </p>
        </div>
        <CustomButton variant="outlineColor">
          더 많은 옵션 보러가기
        </CustomButton>
      </div>
      <div className="px-4 py-5">
        <p className="font-bold mb-2">가격 그래프</p>
        <ul className="flex h-[31px] items-center text-center content-center">
          {["1개월", "3개월"].map((tab) => (
            <li key={tab} className="w-full text-md content-center rounded-sm">
              <a
                href="#"
                onClick={() => setSelectedTab(tab as TabOption)}
                className={`
                inline-block w-full p-1 border border-gray-200 
                ${
                  selectedTab === tab
                    ? "bg-white text-ELSE-17"
                    : "text-ELSE-F8 bg-ELSE-EC hover:bg-white hover:text-ELSE-17"
                } 
              `}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
        <Image src={grahp} alt="price-grahp" width={375} height={295} />
        <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA border-b-2 border-ELSE-EC">
          <div className="border-r-2 border-ELSE-EC pr-3">
            <p className="text-sm text-ELSE-76 mb-[14px]">현재가(2024/05/08)</p>
            <div className="text-right">
              <p className="font-bold text-ELSE-33">$780.12</p>
              <p className="text-sm text-ELSE-55">106만 8,530.36원</p>
            </div>
          </div>
          <div className="pl-3">
            <p className="text-sm text-ELSE-76 mb-[14px]">
              역대 최저가(2023/05/11)
            </p>
            <div className="text-right">
              <p className="font-bold text-ELSE-33">$712.00</p>
              <p className="text-sm text-ELSE-55">97만 5,226.40원</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr] px-3 py-4 bg-ELSE-FA">
          <div className="border-r-2 border-ELSE-EC pr-3">
            <p className="text-sm text-ELSE-76 mb-[14px]">평균가</p>
            <div className="text-right">
              <p className="font-bold text-ELSE-33">$760.00</p>
              <p className="text-sm text-ELSE-55">104만 972원</p>
            </div>
          </div>
          <div className="pl-3">
            <p className="text-sm text-ELSE-76 mb-[14px]">
              역대 최고가(2024/05/12)
            </p>
            <div className="text-right">
              <p className="font-bold text-ELSE-33">$800.12</p>
              <p className="text-sm text-ELSE-55">109만 5,924.36 원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailContent;
